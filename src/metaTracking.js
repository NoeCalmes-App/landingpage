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

// LA RÉSERVATION D'UN APPEL (Cal.com, 26/11/2026). C'est l'événement standard « Schedule » de Meta (« Planifier »
// dans le gestionnaire de publicités) : celui sur lequel régler une campagne qui doit amener des rendez-vous.
// Envoyé une seule fois par visite, quand Cal.com confirme la réservation (jamais au clic sur le bouton). Aucune
// donnée du visiteur ne part : ni nom, ni numéro, ni réponses aux questions.
export function trackCallBooked(source) {
  trackStandardOnce('Schedule', { channel: 'calcom', source }, 'call-booked')
}

// LES ÉTAPES AVANT LA RÉSERVATION (26/11/2026) : pour que Meta sache où les visiteurs s'arrêtent, et pour pouvoir
// régler une campagne sur une étape plus fréquente tant que les réservations sont rares. Des événements
// personnalisés, chacun une fois par visite, sans aucune donnée du visiteur :
//   BookingClick     un bouton qui mène au calendrier a été cliqué
//   CalendarViewed   le calendrier est arrivé à l'écran
//   CalendarUsed     le visiteur a touché au calendrier : un autre jour, un autre mois, ou un créneau choisi
//                    (Cal.com ne dit pas lequel des trois)
//   BookingRescheduled / BookingCancelled   rendez-vous déplacé ou annulé depuis le calendrier de la page
const ETAPES_RESERVATION = {
  clic: 'BookingClick',
  calendrier: 'CalendarViewed',
  usage: 'CalendarUsed',
  deplace: 'BookingRescheduled',
  annule: 'BookingCancelled',
}

export function trackBookingStep(etape, source) {
  const evenement = ETAPES_RESERVATION[etape]
  if (!evenement) return
  trackCustomOnce(evenement, { channel: 'calcom', source }, `booking-${etape}`)
}
