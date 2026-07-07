// Persistance de l'etat de l'audit dans localStorage.
//
// Si le prospect ferme l'onglet ou rafraichit la page au milieu du tunnel,
// on restaure ou il en etait : etape courante, reponses deja saisies,
// piece jointe extraite, et meme verdict deja genere.
//
// La cle est versionnee — si on change la structure des donnees plus tard,
// on bump v1 → v2 et les anciens etats sont automatiquement ignores.

const STORAGE_KEY = 'noecalmes-audit-app-v1'
const RELAUNCH_QUOTA_KEY = 'noecalmes-audit-app-relaunch-quota-v1'
const RELAUNCH_LIMIT_PER_MONTH = 2

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
 * Supprime l'etat du tunnel pour repartir sur un audit vierge, sans toucher au
 * compteur mensuel de relances.
 */
export function clearAuditState() {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* localStorage indispo — on ignore */
  }
}

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function normalizeRelaunchQuota(value) {
  const currentMonth = getMonthKey()
  if (!value || typeof value !== 'object' || value.month !== currentMonth) {
    return { month: currentMonth, used: 0 }
  }
  const used = Number.isFinite(value.used) ? Math.max(0, Math.floor(value.used)) : 0
  return { month: currentMonth, used }
}

export function loadAuditRelaunchQuota() {
  try {
    if (typeof window === 'undefined') {
      return {
        used: 0,
        limit: RELAUNCH_LIMIT_PER_MONTH,
        remaining: RELAUNCH_LIMIT_PER_MONTH,
        blocked: false,
      }
    }
    const raw = window.localStorage.getItem(RELAUNCH_QUOTA_KEY)
    const quota = normalizeRelaunchQuota(raw ? JSON.parse(raw) : null)
    window.localStorage.setItem(RELAUNCH_QUOTA_KEY, JSON.stringify(quota))
    const remaining = Math.max(0, RELAUNCH_LIMIT_PER_MONTH - quota.used)
    return {
      used: quota.used,
      limit: RELAUNCH_LIMIT_PER_MONTH,
      remaining,
      blocked: remaining <= 0,
    }
  } catch {
    return {
      used: 0,
      limit: RELAUNCH_LIMIT_PER_MONTH,
      remaining: RELAUNCH_LIMIT_PER_MONTH,
      blocked: false,
    }
  }
}

export function consumeAuditRelaunchQuota() {
  try {
    if (typeof window === 'undefined') {
      return { allowed: true, quota: loadAuditRelaunchQuota() }
    }
    const current = loadAuditRelaunchQuota()
    if (current.blocked) return { allowed: false, quota: current }

    const nextUsed = current.used + 1
    window.localStorage.setItem(
      RELAUNCH_QUOTA_KEY,
      JSON.stringify({ month: getMonthKey(), used: nextUsed })
    )
    const quota = loadAuditRelaunchQuota()
    return { allowed: true, quota }
  } catch {
    return { allowed: true, quota: loadAuditRelaunchQuota() }
  }
}

/**
 * Retourne (ou génère et persiste) un identifiant unique pour cette
 * session d'audit. Envoyé uniquement à la requête finale afin de relier
 * proprement les données du tunnel au verdict IA.
 *
 * crypto.randomUUID() est dispo dans tous les navigateurs modernes
 * (Chrome 92+, Safari 15.4+, Firefox 95+). Fallback minimal si absent.
 */
export function getOrCreateSessionId() {
  const current = loadAuditState() || {}
  if (current.sessionId && typeof current.sessionId === 'string') {
    return current.sessionId
  }
  const sessionId =
    typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
  saveAuditState({ sessionId })
  return sessionId
}
