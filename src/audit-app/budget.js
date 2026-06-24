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

  if (
    answer.includes('inférieur') ||
    answer.includes('moins de 3') ||
    answer.includes('moins de 3500')
  ) {
    return AUDIT_BUDGET_TIER.LOW
  }

  if (
    answer.includes('supérieur') &&
    (answer.includes('12 000') || answer.includes('12000'))
  ) {
    return AUDIT_BUDGET_TIER.HIGH
  }

  if (
    answer.includes('3 500') ||
    answer.includes('3500') ||
    answer.includes('7 500') ||
    answer.includes('7500')
  ) {
    return AUDIT_BUDGET_TIER.MID
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
