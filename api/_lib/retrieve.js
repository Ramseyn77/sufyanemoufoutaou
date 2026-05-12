// api/_lib/retrieve.js
// Calcul de similarité cosinus + sélection des top-K chunks pertinents

/**
 * Similarité cosinus entre deux vecteurs.
 * @param {number[]} vecA
 * @param {number[]} vecB
 * @returns {number} entre -1 et 1
 */
export function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0
    let normA = 0
    let normB = 0
  
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i]
      normA += vecA[i] * vecA[i]
      normB += vecB[i] * vecB[i]
    }
  
    // Garde-fou : éviter une division par 0 si un vecteur est nul
    if (normA === 0 || normB === 0) return 0
  
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  }
  
  /**
   * Retourne les K chunks les plus proches sémantiquement de queryEmbedding.
   * @param {number[]} queryEmbedding   - vecteur de la question
   * @param {Array}    knowledge        - tableau de chunks {id, source, text, embedding}
   * @param {number}   topK             - combien de chunks renvoyer (défaut: 3)
   * @returns {Array}  chunks triés par score décroissant, avec un champ `score` ajouté
   */
  export function findTopChunks(queryEmbedding, knowledge, topK = 3) {
    const scored = knowledge.map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
  
    scored.sort((a, b) => b.score - a.score)
  
    return scored.slice(0, topK)
  }
  