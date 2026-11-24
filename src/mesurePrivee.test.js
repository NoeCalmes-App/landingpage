import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

// Les vrais scripts de index.html, executes dans l'ordre sur une fausse page.
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const scripts = [...html.matchAll(/<script(?![^>]*(?:src=|application\/ld\+json))[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])

function ouvrir(pathname, { redirect = null, hash = '' } = {}) {
  const ajoutes = []
  const noeud = () => ({})
  const page = {
    location: { pathname, hash, href: `https://noecalmes.fr${pathname}${hash}` },
    sessionStorage: { getItem: c => (c === 'redirect' ? redirect : null) },
    document: { readyState: 'complete', createElement: noeud, head: { appendChild: n => ajoutes.push(n) } },
    addEventListener() {}, removeEventListener() {},
    setTimeout: f => f(), requestIdleCallback: f => f(),
  }
  page.window = page
  vm.createContext(page)
  for (const s of scripts) vm.runInContext(s, page)
  return {
    charges: ajoutes.map(n => n.src).filter(Boolean),
    evenements: [...(page.dataLayer || []).map(a => [...a].join(' ')), ...((page.fbq && page.fbq.queue) || []).map(a => [...a].join(' '))],
    referrer: ajoutes.find(n => n.name === 'referrer')?.content ?? null,
    fbq: typeof page.fbq,
  }
}

const JETON = 'JETON-SECRET-0001'

test('page privee : rien de charge, rien en file, pas de provenance complete', () => {
  for (const [chemin, o] of [
    ['/espace-client/', { hash: `#client/${JETON}` }],
    ['/espace-client', { hash: `#client/${JETON}` }],
    [`/espace-client/client/${JETON}`, {}],
    ['/', { redirect: `/espace-client/client/${JETON}` }],
    ['/', { redirect: `/app-devis/espace-client/client/${JETON}` }],
    ['/maquette-visuel/', { hash: `#client/${JETON}` }],
    ['/', { redirect: `/maquette-visuel/client/${JETON}` }],
    ['/signature/', { hash: `#${JETON}` }],
    ['/', { redirect: '/espace' }],
    ['/panel', {}],
    [`/nowork/espace-client/client/${JETON}`, {}],
  ]) {
    const r = ouvrir(chemin, o)
    const nom = `${chemin} ${JSON.stringify(o)}`
    assert.deepEqual(r.charges, [], nom)
    assert.deepEqual(r.evenements, [], nom)
    assert.equal(r.fbq, 'undefined', nom)
    assert.equal(r.referrer, 'origin', nom)
  }
})

test('le reste du site mesure comme avant', () => {
  for (const [chemin, o] of [
    ['/', {}], ['/blog/un-article/', {}], ['/expertise/', {}], ['/maquette/bailora/', {}], ['/maquette', {}],
    ['/', { redirect: '/blog/un-article' }], ['/espaces-verts/', {}], ['/documents/app-mobile/', {}], ['/rendez-vous/', {}],
  ]) {
    const r = ouvrir(chemin, o)
    const nom = `${chemin} ${JSON.stringify(o)}`
    assert.equal(r.charges.length, 2, nom)
    assert.ok(r.charges.some(u => u.includes('googletagmanager')) && r.charges.some(u => u.includes('fbevents')), nom)
    assert.ok(r.evenements.includes('config G-K5SWRR85PN') && r.evenements.includes('init 952622783774477') && r.evenements.includes('track PageView'), nom)
    assert.equal(r.referrer, null, nom)
  }
})
