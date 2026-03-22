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
    heading: 'À propos',
    content: "Développeur mobile spécialisé Flutter, je transforme une idée d'application en produit réel, de la conception au déploiement sur les stores. Un interlocuteur unique qui vous accompagne de la stratégie produit à la mise en ligne sur l'App Store et Google Play.",
  },
  {
    path: '/offre',
    title: 'Offre — Noé Calmes',
    description: "MVP en 45 jours ou application complète prête à scaler, avec un cadre clair, un budget défini et un accompagnement jusqu'au lancement.",
    heading: 'Offre',
    content: "MVP en 45 jours ou application complète prête à scaler, avec un cadre clair, un budget défini et un accompagnement jusqu'au lancement. Chaque projet est unique : je m'adapte à vos besoins pour livrer une application mobile performante.",
  },
  {
    path: '/etapes',
    title: 'Étapes — Noé Calmes',
    description: "Un process simple en 3 étapes : échange, construction, puis mise en ligne sur l'App Store et Google Play.",
    heading: 'Étapes',
    content: "Un process simple en 3 étapes : échange pour comprendre votre besoin, construction de l'application mobile, puis mise en ligne sur l'App Store et Google Play. Un accompagnement clair du début à la fin.",
  },
  {
    path: '/faq',
    title: 'FAQ — Noé Calmes',
    description: 'Retrouvez les réponses sur les délais, la tarification, la livraison, la publication sur les stores et le suivi après mise en ligne.',
    heading: 'Questions fréquentes',
    content: 'Retrouvez les réponses aux questions les plus fréquentes sur les délais, la tarification, la livraison, la publication sur les stores et le suivi après mise en ligne de votre application mobile.',
  },
  {
    path: '/contact',
    title: 'Contact — Noé Calmes',
    description: "Réservez un appel gratuit de 15 minutes pour discuter de votre projet d'application mobile.",
    heading: 'Contact',
    content: "Réservez un appel gratuit de 15 minutes pour discuter de votre projet d'application mobile. Je vous réponds sous 24h pour planifier notre échange.",
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

  // Inject unique visible content into <div id="root"> for SEO
  // React will hydrate over this on load
  const seoContent = `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif"><h1>${route.heading}</h1><p>${route.content}</p><a href="https://noecalmes.fr/">← Retour à l'accueil</a></div></div>`
  html = html.replace('<div id="root"></div>', seoContent)

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

console.log('Done! All route pages generated.')
