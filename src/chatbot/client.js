// Client chatbot — gestion sessionId, persistance localStorage, fetch vers
// la Cloud Function Firebase. Toute la logique réseau est ici.

const STORAGE_KEY = 'noecalmes-chatbot-v1'
const API_URL = import.meta.env.VITE_CHATBOT_API_URL

const generateSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed.sessionId || !Array.isArray(parsed.history)) return null
    return parsed
  } catch {
    return null
  }
}

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* localStorage plein ou désactivé — on ignore */
  }
}

export const initSession = () => {
  const existing = loadState()
  if (existing) return existing
  const fresh = { sessionId: generateSessionId(), history: [] }
  saveState(fresh)
  return fresh
}

export const persistMessage = (sessionId, message) => {
  const state = loadState() || { sessionId, history: [] }
  state.history.push(message)
  state.history = state.history.slice(-30)
  saveState(state)
}

export const resetSession = () => {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}

export const sendMessage = async ({ sessionId, message, history }) => {
  if (!API_URL) {
    throw new Error('VITE_CHATBOT_API_URL not configured')
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      message,
      history: (history || []).slice(-20),
    }),
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}
