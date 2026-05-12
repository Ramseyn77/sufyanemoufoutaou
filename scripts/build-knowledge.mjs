// scripts/build-knowledge.mjs
// Pipeline d'indexation : docs-source/ → public/knowledge.json

import { config } from 'dotenv'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { InferenceClient } from '@huggingface/inference'

// Hack pour importer les packages (CommonJS) depuis un fichier ESM
const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')
const XLSX = require('xlsx') 


// 1. Charger le token HF depuis .env.local
config({ path: '.env.local' })

// 2. Reconstituer __dirname (n'existe pas en ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 3. Chemins absolus vers nos fichiers source et destination
const PROJECT_ROOT = resolve(__dirname, '..')
const PDF_PATH = resolve(PROJECT_ROOT, 'docs-source/profil-sufyane.pdf')
const XLSX_PATH = resolve(PROJECT_ROOT, 'docs-source/services-sufyane.xlsx')
const OUTPUT_PATH = resolve(PROJECT_ROOT, 'public/knowledge.json')

// 4. Constantes de configuration
const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2'

// 5. Fonctions placeholder (on les remplira aux leçons 3.3 → 3.6)
async function parsePDF(path) {
    console.log(`📄 Lecture du PDF : ${path}`)

    // 1. Lire le fichier en binaire (Buffer)
    const dataBuffer = readFileSync(path)

    // 2. Extraire le texte avec pdf-parse
    const data = await pdfParse(dataBuffer)
    const rawText = data.text
    console.log(`   ${data.numpages} pages, ${rawText.length} caractères`)

    // 3. Découper en paragraphes : 2 retours à la ligne ou plus = séparateur
    const paragraphs = rawText
        .split(/\n\s*\n/)                    // split sur lignes vides
        .map(p => p.replace(/\s+/g, ' ').trim())  // nettoyer les espaces
        .filter(p => p.length > 50)          // filtrer le bruit

    // 4. Construire un objet chunk pour chacun
    const chunks = paragraphs.map((text, i) => ({
        id: `pdf-${i}`,
        source: 'profil-sufyane.pdf',
        text,
    }))

    console.log(`   → ${chunks.length} chunks créés\n`)
    return chunks
} 

async function parseExcel(path) {
    console.log(`📊 Lecture de l'Excel : ${path}`)

    // 1. Lire le fichier .xlsx
    const workbook = XLSX.readFile(path)

    // 2. Prendre la première feuille
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    // 3. Convertir en tableau d'objets : 1 ligne = 1 objet { categorie, titre, ... }
    const rows = XLSX.utils.sheet_to_json(sheet)
    console.log(`   Feuille "${sheetName}", ${rows.length} lignes`)

    // 4. Transformer chaque ligne en paragraphe narratif
    const chunks = rows.map((row, i) => {
        const text = [
        `Service ${row.categorie} : ${row.titre}.`,
        row.description,
        `Cas d'usage typiques : ${row.use_cases}.`,
        `Technologies utilisées : ${row.technologies}.`,
        `Livrables fournis : ${row.livrables}.`,
        `Délai indicatif : ${row.delai_indicatif}.`,
        ].join(' ')

        return {
        id: `xlsx-${i}`,
        source: 'services-sufyane.xlsx',
        text,
        }
    })

    console.log(`   → ${chunks.length} chunks créés\n`)
    return chunks
}

// Utilitaire : appel HF avec retry exponentiel pour les erreurs de connexion instable et autres 
async function embedWithRetry(hf, text, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await hf.featureExtraction({
          model: EMBEDDING_MODEL,
          inputs: text,
          parameters: { wait_for_model: true },
        })
      } catch (err) {
        if (attempt === maxRetries) throw err
        const delay = 3000 * attempt // 3s, 6s, 9s
        console.log(`   ⚠️  Tentative ${attempt}/${maxRetries} échouée (${err.message}), retry dans ${delay / 1000}s...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
} 
  
async function embedChunks(chunks) {
    console.log(`🧠 Génération des embeddings pour ${chunks.length} chunks...`)
    console.log(`   Modèle : ${EMBEDDING_MODEL}`)
    console.log(`   ⏳ Cela peut prendre 30 à 90 secondes...\n`)
  
    // 1. Initialiser le client HF
    const hf = new InferenceClient(process.env.HF_TOKEN)
  
    const embedded = []
  
    // 2. Boucler séquentiellement sur chaque chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
  
      try {
        // 3. Appel API : transformer le texte en vecteur de 384 dimensions
        const embedding = await hf.featureExtraction({
          model: EMBEDDING_MODEL,
          inputs: chunk.text,
        })
  
        // 4. Ajouter le vecteur au chunk existant
        embedded.push({ ...chunk, embedding })
  
        // 5. Feedback de progression toutes les 5 itérations
        if ((i + 1) % 5 === 0 || i === chunks.length - 1) {
          console.log(`   ${i + 1}/${chunks.length} chunks embeddés`)
        }
      } catch (err) {
        console.error(`   ❌ Erreur sur chunk "${chunk.id}" : ${err.message}`)
        throw err
      }
    }
  
    // 6. Validation finale
    const dim = embedded[0]?.embedding?.length ?? 0
    console.log(`\n   → ${embedded.length} embeddings générés (${dim} dimensions)\n`)
    return embedded
}
  
function saveKnowledge(chunks, path) {
    // 1. Sérialiser en JSON compact (pas de pretty-print pour gagner ~40% de poids)
    const json = JSON.stringify(chunks)
  
    // 2. Écrire le fichier en UTF-8
    writeFileSync(path, json, 'utf8')
  
    // 3. Afficher des stats utiles
    const sizeKB = (Buffer.byteLength(json, 'utf8') / 1024).toFixed(1)
    const avgLen = Math.round(
      chunks.reduce((sum, c) => sum + c.text.length, 0) / chunks.length
    )
  
    console.log(`💾 Sauvegardé : ${path}`)
    console.log(`   ${chunks.length} chunks • ${sizeKB} KB • ${avgLen} caractères/chunk en moyenne`)
}
  
// 6. Orchestration principale
async function main() {
  console.log('🚀 Démarrage de l\'indexation...\n')

  // Vérification du token HF
  if (!process.env.HF_TOKEN) {
    console.error('❌ HF_TOKEN absent. Vérifiez votre .env.local')
    process.exit(1)
  }
  console.log('✅ Token HF trouvé\n')

  // Pipeline
  const pdfChunks = await parsePDF(PDF_PATH)
  const xlsxChunks = await parseExcel(XLSX_PATH)
  const allChunks = [...pdfChunks, ...xlsxChunks]
  const embeddedChunks = await embedChunks(allChunks)
  saveKnowledge(embeddedChunks, OUTPUT_PATH)

  console.log('\n✨ Indexation terminée')
}

main().catch((err) => {
  console.error('💥 Erreur fatale:', err)
  process.exit(1)
})
