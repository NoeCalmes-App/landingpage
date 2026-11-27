import test from 'node:test'
import assert from 'node:assert/strict'

import { UI_CAL, VIOLET, configCal, utmDepuis } from './reserverAppel.js'

test('sans UTM, la page de la reservation est notee', () => {
  assert.deepEqual(utmDepuis('https://noecalmes.fr/'), {
    utm_source: 'site', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '/',
  })
  assert.equal(utmDepuis('https://noecalmes.fr/?utm_source=meta&utm_campaign=novembre').utm_campaign, 'novembre')
})

test('le widget Cal.com garde la provenance, en vue mois et en theme clair', () => {
  const config = configCal('https://noecalmes.fr/?utm_source=meta&utm_campaign=pub%20novembre')
  assert.equal(config.layout, 'month_view')
  assert.equal(config.theme, 'light')
  assert.equal(config.utm_source, 'meta')
  assert.equal(config.utm_campaign, 'pub novembre')
  assert.equal(config.utm_content, '/')
  assert.equal('utm_term' in config, false, 'un UTM vide ne part pas')
})

test('le violet du site remplace le noir de Cal.com', () => {
  assert.equal(UI_CAL.cssVarsPerTheme.light['cal-brand'], VIOLET)
})
