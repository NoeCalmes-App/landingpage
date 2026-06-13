// Fetch vers l'endpoint Firebase /verdictWeb.
// Toute la logique reseau est isolee ici pour faciliter le test et le mock.

import { API_URL } from './config'

const NETWORK_RETRY_DELAYS_MS = [0, 900, 1800]

/**
 * Envoie les reponses au backend et retourne le verdict V3 (JSON enrichi).
 *
 * @param {Object} payload
 * @param {string} payload.first_name
 * @param {string} payload.idea_text
 * @param {string} payload.project_stage_answer
 * @param {string} payload.known_competitors  (optionnel)
 * @param {string} payload.q1_answer
 * @param {string} payload.q2_answer
 * @param {string} payload.q3_answer
 * @param {string} payload.q4_answer
 * @returns {Promise<{
 *   pincettes_disclaimer: string,
 *   pitch_reformule: string,
 *   ce_qui_est_solide: string[],
 *   ce_qui_manque: string[],
 *   concurrents: Array<{nom:string, positionnement:string, force:string, faille:string, votre_angle:string}>,
 *   differenciation: string[],
 *   defi_principal: string,
 *   plan_action: string[],
 *   prix_indicatif: string | null,
 *   delai_indicatif: string,
 *   cta_message: string,
 *   branch: 'A' | 'C',
 *   budget_tag: 'HIGH' | 'MID' | 'OUT'
 * }>}
 */
export async function generateVerdict(payload) {
  if (!API_URL) {
    throw new Error(
      "VITE_AUDIT_API_URL n'est pas configuré. Ajoutez-le dans .env.local."
    )
  }

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }

  let response
  try {
    response = await fetchWithRetry(API_URL, request)
  } catch {
    throw new Error('Connexion impossible. Vérifiez votre réseau et réessayez.')
  }

  if (response.status === 429) {
    throw new Error(
      'Trop de tentatives. Patientez quelques minutes avant de réessayer.'
    )
  }

  if (!response.ok) {
    throw new Error(
      `Erreur serveur (${response.status}). Réessayez dans un instant.`
    )
  }

  const data = await response.json()
  if (!data || typeof data.pitch_reformule !== 'string') {
    throw new Error('Réponse incomplète du serveur.')
  }
  return data
}

async function fetchWithRetry(url, request) {
  let lastError

  for (let i = 0; i < NETWORK_RETRY_DELAYS_MS.length; i++) {
    const delay = NETWORK_RETRY_DELAYS_MS[i]
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    try {
      const response = await fetch(url, request)
      if (![502, 503, 504].includes(response.status)) {
        return response
      }
      lastError = new Error(`Temporary server error: ${response.status}`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('Network request failed')
}
