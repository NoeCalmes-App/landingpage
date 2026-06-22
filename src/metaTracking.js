const META_ONCE_PREFIX = 'noecalmes-meta:'

function canTrack() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

function shouldTrackOnce(key) {
  if (!key) return true

  try {
    const storageKey = `${META_ONCE_PREFIX}${key}`
    if (window.sessionStorage.getItem(storageKey)) return false
    window.sessionStorage.setItem(storageKey, '1')
  } catch {
    // Le tracking reste fonctionnel si sessionStorage est indisponible.
  }

  return true
}

function trackStandardOnce(eventName, parameters, onceKey) {
  if (!canTrack() || !shouldTrackOnce(onceKey)) return
  window.fbq('track', eventName, parameters)
}

function trackCustomOnce(eventName, parameters, onceKey) {
  if (!canTrack() || !shouldTrackOnce(onceKey)) return
  window.fbq('trackCustom', eventName, parameters)
}

export function trackWhatsAppLead(source) {
  trackStandardOnce(
    'Lead',
    { channel: 'whatsapp', source },
    'whatsapp-lead'
  )
}

export function trackAuditStart() {
  trackCustomOnce('AuditStart', { funnel: 'audit-app' }, 'audit-start')
}

export function trackAuditComplete() {
  trackCustomOnce('AuditComplete', { funnel: 'audit-app' }, 'audit-complete')
}

export function trackQualifiedAuditLead(source) {
  trackWhatsAppLead(source)
  trackCustomOnce(
    'QualifiedAuditLead',
    { channel: 'whatsapp', funnel: 'audit-app', source },
    'qualified-audit-lead'
  )
}
