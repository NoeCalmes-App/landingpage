// Persistance de l'etat de l'audit dans localStorage.
//
// Si le prospect ferme l'onglet ou rafraichit la page au milieu du tunnel,
// on restaure ou il en etait : etape courante, reponses deja saisies,
// piece jointe extraite, et meme verdict deja genere.
//
// La cle est versionnee — si on change la structure des donnees plus tard,
// on bump v1 → v2 et les anciens etats sont automatiquement ignores.

const STORAGE_KEY = 'noecalmes-audit-app-v1'

/**
 * Charge l'etat persiste. Renvoie null si rien n'est stocke ou si la
 * lecture echoue (localStorage indispo, JSON malforme, mode prive, etc).
 */
export function loadAuditState() {
  try {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed
  } catch {
    return null
  }
}

/**
 * Merge l'objet `patch` dans l'etat persiste (les champs absents du
 * patch sont conserves). Permet a plusieurs composants d'ecrire dans
 * la meme cle sans s'ecraser mutuellement.
 */
export function saveAuditState(patch) {
  try {
    if (typeof window === 'undefined') return
    const current = loadAuditState() || {}
    const next = { ...current, ...patch }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* localStorage plein ou desactive — on ignore */
  }
}

/**
 * Vide completement l'etat persiste. Utilise quand le prospect choisit
 * "Recommencer un audit" depuis la page verdict.
 */
export function clearAuditState() {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
