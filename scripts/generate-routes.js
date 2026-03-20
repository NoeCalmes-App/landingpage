import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

const routes = [
  {
    path: '/a-propos',
    title: 'À propos — Noé Calmes',
    description: "Développeur mobile spécialisé Flutter, je transforme une idée d'application en produit réel, de la conception au déploiement sur les stores.",
  },
  {
    path: '/offre',
    title: 'Offre — Noé Calmes',
    description: "MVP en 45 jours ou application complète prête à scaler, avec un cadre clair, un budget défini et un accompagnement jusqu'au lancement.",
  },
  {
    path: '/etapes',
    title: 'Étapes — Noé Calmes',
    description: "Un process simple en 3 étapes : échange, construction, puis mise en ligne sur l'App Store et Google Play.",
  },
  {
    path: '/faq',
    title: 'FAQ — Noé Calmes',
    description: 'Retrouvez les réponses sur les délais, la tarification, la livraison, la publication sur les stores et le suivi après mise en ligne.',
  },
  {
    path: '/contact',
    title: 'Contact — Noé Calmes',
    description: "Réservez un appel gratuit de 15 minutes pour discuter de votre projet d'application mobile.",
  },
]

for (const route of routes) {
  let html = baseHtml

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  )

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  )

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="https://noecalmes.fr${route.path}" />`
  )

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  )

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  )

  // Replace og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="https://noecalmes.fr${route.path}" />`
  )

  // Replace twitter:title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )

  // Replace twitter:description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  )

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

console.log('Done! All route pages generated.')
