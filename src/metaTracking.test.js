import test from 'node:test'
import assert from 'node:assert/strict'

import {
  trackAuditComplete,
  trackAuditWhatsAppClick,
  trackDirectWhatsAppLead,
} from './metaTracking.js'

function createTrackingWindow() {
  const values = new Map()
  const calls = []

  globalThis.window = {
    fbq: (...args) => calls.push(args),
    sessionStorage: {
      getItem: (key) => values.get(key) || null,
      setItem: (key, value) => values.set(key, value),
    },
  }

  return calls
}

test('un clic WhatsApp direct reste un Prospect a qualification inconnue', () => {
  const calls = createTrackingWindow()
  trackDirectWhatsAppLead('audit_skip')

  assert.deepEqual(calls.map(([method, event]) => [method, event]), [
    ['track', 'Lead'],
    ['trackCustom', 'DirectWhatsAppLead'],
  ])
  assert.equal(calls[0][2].qualification_status, 'unknown')
})

test('un petit budget est mesure sans envoyer le signal Prospect', () => {
  const calls = createTrackingWindow()
  trackAuditComplete('low', false)
  trackAuditWhatsAppClick('audit_price', 'low', false)

  assert.deepEqual(calls.map(([method, event]) => [method, event]), [
    ['trackCustom', 'AuditComplete'],
    ['trackCustom', 'LowBudgetAudit'],
    ['trackCustom', 'WhatsAppClick'],
    ['trackCustom', 'LowBudgetLead'],
  ])
  assert.equal(calls.some(([, event]) => event === 'Lead'), false)
  assert.equal(calls.some(([, event]) => event === 'QualifiedAuditLead'), false)
})

test('un budget qualifie et un clic WhatsApp alimentent Prospect', () => {
  const calls = createTrackingWindow()
  trackAuditComplete('mid', true)
  trackAuditWhatsAppClick('audit_verdict', 'mid', true)

  assert.deepEqual(calls.map(([method, event]) => [method, event]), [
    ['trackCustom', 'AuditComplete'],
    ['trackCustom', 'QualifiedAuditComplete'],
    ['trackCustom', 'WhatsAppClick'],
    ['track', 'Lead'],
    ['trackCustom', 'QualifiedAuditLead'],
  ])
  assert.equal(calls[3][2].qualification_status, 'qualified')
  assert.equal(calls[3][2].budget_tier, 'mid')
})
