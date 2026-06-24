import test from 'node:test'
import assert from 'node:assert/strict'

import {
  AUDIT_BUDGET_TIER,
  classifyAuditBudget,
  isQualifiedAuditBudget,
} from './budget.js'

test('classe les tranches fixes du formulaire sans dependre de l IA', () => {
  assert.equal(
    classifyAuditBudget('Mon budget est inférieur à 3 500 €.', 'HIGH'),
    AUDIT_BUDGET_TIER.LOW
  )
  assert.equal(
    classifyAuditBudget('Mon budget se situe entre 3 500 € et 7 500 €.', 'OUT'),
    AUDIT_BUDGET_TIER.MID
  )
  assert.equal(
    classifyAuditBudget('Mon budget se situe entre 7 500 € et 12 000 €.', 'OUT'),
    AUDIT_BUDGET_TIER.MID
  )
  assert.equal(
    classifyAuditBudget('Mon budget est supérieur à 12 000 €.', 'OUT'),
    AUDIT_BUDGET_TIER.HIGH
  )
})

test('utilise le tag du verdict uniquement en fallback', () => {
  assert.equal(classifyAuditBudget('', 'OUT'), AUDIT_BUDGET_TIER.LOW)
  assert.equal(classifyAuditBudget('', 'MID'), AUDIT_BUDGET_TIER.MID)
  assert.equal(classifyAuditBudget('', 'HIGH'), AUDIT_BUDGET_TIER.HIGH)
  assert.equal(classifyAuditBudget('', ''), AUDIT_BUDGET_TIER.UNKNOWN)
})

test('qualifie uniquement les budgets mid et high', () => {
  assert.equal(isQualifiedAuditBudget(AUDIT_BUDGET_TIER.LOW), false)
  assert.equal(isQualifiedAuditBudget(AUDIT_BUDGET_TIER.UNKNOWN), false)
  assert.equal(isQualifiedAuditBudget(AUDIT_BUDGET_TIER.MID), true)
  assert.equal(isQualifiedAuditBudget(AUDIT_BUDGET_TIER.HIGH), true)
})
