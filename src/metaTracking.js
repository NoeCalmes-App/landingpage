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

function buildLeadParameters(source, parameters = {}) {
  return {
    channel: 'whatsapp',
    source,
    ...parameters,
  }
}

export function trackWhatsAppLead(source, parameters = {}) {
  trackStandardOnce(
    'Lead',
    buildLeadParameters(source, parameters),
    'whatsapp-lead'
  )
}

export function trackDirectWhatsAppLead(source) {
  const parameters = buildLeadParameters(source, {
    qualification_status: 'unknown',
  })

  trackWhatsAppLead(source, { qualification_status: 'unknown' })
  trackCustomOnce(
    'DirectWhatsAppLead',
    parameters,
    'direct-whatsapp-lead'
  )
}

export function trackAuditStart() {
  trackCustomOnce('AuditStart', { funnel: 'audit-app' }, 'audit-start')
}

export function trackAuditComplete(budgetTier, isQualified) {
  const parameters = {
    funnel: 'audit-app',
    budget_tier: budgetTier,
    qualification_status: isQualified ? 'qualified' : 'unqualified',
  }

  trackCustomOnce('AuditComplete', parameters, 'audit-complete')

  if (isQualified) {
    trackCustomOnce(
      'QualifiedAuditComplete',
      parameters,
      'qualified-audit-complete'
    )
    return
  }

  if (budgetTier === 'low') {
    trackCustomOnce('LowBudgetAudit', parameters, 'low-budget-audit')
  }
}

export function trackAuditWhatsAppClick(source, budgetTier, isQualified) {
  const parameters = buildLeadParameters(source, {
    funnel: 'audit-app',
    budget_tier: budgetTier,
    qualification_status: isQualified ? 'qualified' : 'unqualified',
  })

  trackCustomOnce('WhatsAppClick', parameters, 'audit-whatsapp-click')

  if (isQualified) {
    trackWhatsAppLead(source, {
      funnel: 'audit-app',
      budget_tier: budgetTier,
      qualification_status: 'qualified',
    })
    trackCustomOnce(
      'QualifiedAuditLead',
      parameters,
      'qualified-audit-lead'
    )
    return
  }

  if (budgetTier === 'low') {
    trackCustomOnce('LowBudgetLead', parameters, 'low-budget-lead')
  }
}
