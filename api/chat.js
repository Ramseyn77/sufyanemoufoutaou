// api/chat.js — Endpoint principal du chatbot RAG avec streaming

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { InferenceClient } from '@huggingface/inference'
import { findTopChunks } from './_lib/retrieve.js'

const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2'
const LLM_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

let knowledgeCache = null

function loadKnowledge() {
  if (knowledgeCache) return knowledgeCache
  const path = resolve(process.cwd(), 'public/knowledge.json')
  knowledgeCache = JSON.parse(readFileSync(path, 'utf8'))
  return knowledgeCache
}

async function embedWithRetry(hf, text, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await hf.featureExtraction({
        model: EMBEDDING_MODEL,
        inputs: text,
        parameters: { wait_for_model: true },
      })
    } catch (err) {
      if (attempt === maxRetries) throw err
      console.warn(`[embed] Retry ${attempt}: ${err.message}`)
      await new Promise((r) => setTimeout(r, 2000))
    }
  }
}

function buildSystemPrompt(topChunks) {
  const context = topChunks
    .map((c, i) => `[Source ${i + 1} — ${c.source}]\n${c.text}`)
    .join('\n\n---\n\n')

  return `Tu es l'assistant virtuel de Sufyane Moufoutaou, IA Developer freelance basé au Bénin. Tu réponds aux visiteurs de son portfolio en t'appuyant EXCLUSIVEMENT sur le contexte ci-dessous.

RÈGLES STRICTES :
- Réponds toujours en français, ton chaleureux et professionnel
- Sois concis : 2 à 4 phrases sauf pour une question technique précise
- Parle de Sufyane à la troisième personne ("Sufyane propose...", "il a réalisé...")
- Ne mens JAMAIS, n'invente JAMAIS de tarifs, dates ou faits non présents dans le contexte

RÈGLES DE CONTACT (CRITIQUE) :
- N'écris JAMAIS de numéro de téléphone ou de WhatsApp dans tes réponses (tu réordonnes parfois les chiffres, c'est une faille connue des LLM)
- N'écris JAMAIS l'email de Sufyane non plus
- Si l'utilisateur veut prendre contact, demander un devis ou échanger, redirige-le toujours vers la page Contact en disant exactement : "Pour échanger directement avec Sufyane, rendez-vous sur la page Contact du portfolio où vous trouverez son WhatsApp, son email et ses réseaux sociaux."
- Si l'information demandée n'est pas dans le contexte, dis-le honnêtement et redirige vers la page Contact

=== CONTEXTE (extraits pertinents de ses documents) ===
${context}
=== FIN DU CONTEXTE ===`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  try {
    const { messages } = req.body || {}
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return res.status(400).json({ error: 'No user message found' })

    const hf = new InferenceClient(process.env.HF_TOKEN)

    // 1. Embedder la question
    const questionEmbedding = await embedWithRetry(hf, lastUser.content)

    // 2. Trouver les 3 chunks les plus pertinents
    const knowledge = loadKnowledge()
    const topChunks = findTopChunks(questionEmbedding, knowledge, 3)

    // 3. Construire les messages enrichis pour le LLM
    const systemPrompt = buildSystemPrompt(topChunks)
    const llmMessages = [
      { role: 'system', content: systemPrompt },
      // On garde les 6 derniers messages pour le fil de conversation
      ...messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
    ]

    // 4. Configurer le streaming SSE vers le client
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no') // désactive le buffering nginx/proxy

    // 5. Appeler Llama en streaming
    const stream = hf.chatCompletionStream({
      model: LLM_MODEL,
      messages: llmMessages,
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.9,
    })

    // 6. Streamer chaque token vers le client
    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    console.error('[/api/chat] Error:', err)
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message })
    }
    // Si on est déjà en streaming, envoyer l'erreur dans le flux
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
    res.end()
  }
}
