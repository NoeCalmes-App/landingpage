export const AUDIT_BUDGET_TIER = {
  LOW: 'low',
  MID: 'mid',
  HIGH: 'high',
  UNKNOWN: 'unknown',
}

/**
 * Classe le budget a partir de la reponse exacte du formulaire.
 * Le tag du verdict IA ne sert que de fallback : le tracking commercial ne
 * doit pas dependre d'une interpretation du modele quand la reponse est connue.
 */
export function classifyAuditBudget(q4Answer, verdictBudgetTag) {
  const answer = (q4Answer || '').toLowerCase()

  // Seuil commercial public : 5 000 EUR.
  if (
    answer.includes('inférieur') ||
    answer.includes('inferieur') ||
    answer.includes('moins de 5') ||
    answer.includes('moins de 5000')
  ) {
    return AUDIT_BUDGET_TIER.LOW
  }

  if (
    (answer.includes('10 000') || answer.includes('10000')) &&
    (answer.includes('ou plus') || answer.includes('supérieur') || answer.includes('superieur') || answer.includes('plus de'))
  ) {
    return AUDIT_BUDGET_TIER.HIGH
  }

  // Compatibilite avec les audits commences avant le changement de seuil.
  // L'ancienne tranche 3 500-7 500 reste non qualifiee par prudence : elle
  // ne garantit pas que le prospect dispose du nouveau minimum de 5 000 EUR.
  if (
    (answer.includes('3 500') || answer.includes('3500')) &&
    (answer.includes('7 500') || answer.includes('7500'))
  ) {
    return AUDIT_BUDGET_TIER.LOW
  }

  if (
    answer.includes('5 000') ||
    answer.includes('5000') ||
    answer.includes('7 500') ||
    answer.includes('7500')
  ) {
    return AUDIT_BUDGET_TIER.MID
  }

  if (answer.includes('moins de 3') || answer.includes('moins de 3500')) {
    return AUDIT_BUDGET_TIER.LOW
  }

  if (
    (answer.includes('7 500') || answer.includes('7500')) &&
    (answer.includes('12 000') || answer.includes('12000'))
  ) {
    return AUDIT_BUDGET_TIER.MID
  }

  if (
    (answer.includes('12 000') || answer.includes('12000')) &&
    (answer.includes('supérieur') || answer.includes('superieur') || answer.includes('plus de'))
  ) {
    return AUDIT_BUDGET_TIER.HIGH
  }

  const tag = (verdictBudgetTag || '').toUpperCase()
  if (tag === 'OUT') return AUDIT_BUDGET_TIER.LOW
  if (tag === 'MID') return AUDIT_BUDGET_TIER.MID
  if (tag === 'HIGH') return AUDIT_BUDGET_TIER.HIGH

  return AUDIT_BUDGET_TIER.UNKNOWN
}

export function isQualifiedAuditBudget(budgetTier) {
  return (
    budgetTier === AUDIT_BUDGET_TIER.MID ||
    budgetTier === AUDIT_BUDGET_TIER.HIGH
  )
}
