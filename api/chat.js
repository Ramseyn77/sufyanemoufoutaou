// api/chat.js — Endpoint principal du chatbot RAG avec streaming

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { InferenceClient } from '@huggingface/inference'
import { findTopChunks } from './_lib/retrieve.js'
import { checkRateLimit } from './_lib/rateLimit.js'


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

function detectLanguage(text) {
  const lower = text.toLowerCase()
  // Mots typiquement anglais (peu/pas d'ambiguïté avec le français)
  const enMarkers = /\b(the|what|how|when|where|why|which|who|whose|are|is|am|was|were|do|does|did|don|doesn|you|your|yours|i|my|mine|we|our|can|could|would|should|will|shall|tell|give|show|about|of|hello|hi|hey|please|thanks|thank|good|great|nice|name|him|his|her|she|he|it|its)\b/gi
  // Mots typiquement français (peu/pas d'ambiguïté avec l'anglais)
  const frMarkers = /\b(le|la|les|un|une|des|du|de|tu|vous|nous|je|qu|qui|que|quoi|où|comment|pourquoi|combien|avec|pour|dans|sur|sans|chez|vers|ton|ta|tes|son|sa|ses|votre|vos|notre|nos|ai|as|est|sont|était|étiez|fais|fait|peut|peux|veux|propose|bonjour|salut|merci|parcours|aussi|déjà|toujours|jamais|c'est|qu'est)\b/gi
  const en = (lower.match(enMarkers) || []).length
  const fr = (lower.match(frMarkers) || []).length
  // Heuristique secondaire en cas d'égalité : présence d'accents → français
  if (en === fr) {
    const hasAccents = /[àâäéèêëîïôöùûüÿç]/i.test(text)
    return hasAccents ? 'fr' : (en > 0 ? 'en' : 'fr')
  }
  return en > fr ? 'en' : 'fr'
}

function buildSystemPrompt(topChunks, lang) {
  const context = topChunks
    .map((c, i) => `[Source ${i + 1} — ${c.source}]\n${c.text}`)
    .join('\n\n---\n\n')

  if (lang === 'en') {
    return `MANDATORY LANGUAGE RULE: You MUST respond in ENGLISH ONLY. The user wrote in English. Even though the context below is in French, you must translate and answer in English. Never respond in French.

You are the virtual assistant of Sufyane Moufoutaou, a freelance AI Developer based in Benin. You answer portfolio visitors based on the context provided below.

STRICT RULES:
- Always respond in English, with a warm and professional tone.
- Be concise: 2 to 4 sentences, unless the question is technical and precise.
- Refer to Sufyane in the third person ("Sufyane offers...", "he has built...").
- Use the available context even if partial. If the question is broad (e.g., "tell me about him"), summarize what is relevant from the excerpts.
- Never invent prices, dates or facts that are not in the context.

CONTACT RULES (CRITICAL):
- Never write phone numbers, WhatsApp or email addresses in your answers.
- For any contact, quote or collaboration request, say exactly: "To reach Sufyane directly, please visit the Contact page of the portfolio where you'll find his WhatsApp, email and social media."
- If the requested information is not in the context, say so honestly and redirect to the Contact page.

=== CONTEXT (relevant excerpts from his documents, in French) ===
${context}
=== END OF CONTEXT ===`
  }

  return `RÈGLE OBLIGATOIRE DE LANGUE : Tu DOIS répondre uniquement en FRANÇAIS. L'utilisateur a écrit en français.

Tu es l'assistant virtuel de Sufyane Moufoutaou, IA Developer freelance basé au Bénin. Tu réponds aux visiteurs de son portfolio en t'appuyant sur le contexte ci-dessous.

RÈGLES STRICTES :
- Réponds toujours en français, avec un ton chaleureux et professionnel.
- Sois concis : 2 à 4 phrases sauf pour une question technique précise.
- Parle de Sufyane à la troisième personne ("Sufyane propose...", "il a réalisé...").
- Utilise le contexte disponible même partiel. Si la question est large ("parle-moi de son parcours"), synthétise ce qui est pertinent dans les extraits plutôt que de refuser de répondre.
- N'invente JAMAIS de tarifs, dates ou faits non présents dans le contexte.

RÈGLES DE CONTACT (CRITIQUE) :
- N'écris JAMAIS de numéro de téléphone, WhatsApp ou email dans tes réponses.
- Pour toute demande de contact, devis ou échange, dis exactement : "Pour échanger directement avec Sufyane, rendez-vous sur la page Contact du portfolio où vous trouverez son WhatsApp, son email et ses réseaux sociaux."
- Si l'information demandée n'est pas dans le contexte, dis-le honnêtement et redirige vers la page Contact.

=== CONTEXTE (extraits pertinents de ses documents) ===
${context}
=== FIN DU CONTEXTE ===`
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

   // 🔒 Rate limit par IP
   const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
   || req.socket?.remoteAddress 
   || 'unknown'
 const rl = checkRateLimit(ip)
 if (!rl.allowed) {
   res.setHeader('Retry-After', rl.retryAfter)
   return res.status(429).json({
     error: `Trop de requêtes. Réessayez dans ${rl.retryAfter} secondes.`,
   })
 }

  try {
    const { messages } = req.body || {}
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return res.status(400).json({ error: 'No user message found' })

    // 🔒 Limite de longueur (anti-abus)
    if (lastUser.content.length > 500) {
      return res.status(400).json({
        error: 'Question trop longue (max 500 caractères).',
      })
    }
      
    const hf = new InferenceClient(process.env.HF_TOKEN)

    // 1. Embedder la question
    const questionEmbedding = await embedWithRetry(hf, lastUser.content)

    // 2. Trouver les 3 chunks les plus pertinents
    const knowledge = loadKnowledge()
    const topChunks = findTopChunks(questionEmbedding, knowledge, 3)

    // 3. Construire les messages enrichis pour le LLM
    const userLang = detectLanguage(lastUser.content)
    const systemPrompt = buildSystemPrompt(topChunks, userLang)

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
