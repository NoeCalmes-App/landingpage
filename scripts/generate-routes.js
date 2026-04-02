import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

const routes = [
  {
    path: '/a-propos',
    title: 'Expert mobile spécialisé Flutter — Noé Calmes',
    description: "Expert mobile indépendant spécialisé Flutter. Création, reprise et évolution d'applications mobiles iOS et Android pour les entreprises en France.",
    heading: 'Expert mobile spécialisé Flutter',
    content: "Expert mobile indépendant spécialisé Flutter, j'aide les entreprises à créer, reprendre et faire évoluer leur application mobile. Du cadrage au développement et à la mise en ligne sur l'App Store et Google Play.",
  },
  {
    path: '/offre',
    title: 'Créer ou reprendre une application mobile | Noé Calmes',
    description: "Création, reprise ou évolution de votre application mobile Flutter. MVP en 45 jours ou app complète, cadre clair et budget défini jusqu'à la mise en ligne.",
    heading: 'Créer, reprendre ou faire évoluer votre application mobile',
    content: "Création d'application mobile, reprise d'un existant ou évolution d'une app déjà lancée. MVP en 45 jours ou application complète, avec un cadre clair, un budget défini et une mise en ligne sur les stores.",
  },
  {
    path: '/etapes',
    title: 'Comment créer une application mobile en 3 étapes | Noé Calmes',
    description: "Créer votre application mobile simplement : cadrage de votre projet, développement Flutter, puis mise en ligne sur l'App Store et Google Play.",
    heading: 'Comment créer une application mobile',
    content: "Créer une application mobile en 3 étapes : cadrage pour comprendre votre besoin, développement de l'application mobile avec Flutter, puis mise en ligne sur l'App Store et Google Play.",
  },
  {
    path: '/faq',
    title: 'FAQ — Création et développement application mobile | Noé Calmes',
    description: "Questions fréquentes sur la création, la reprise et l'évolution d'application mobile : délais, tarifs, livraison et suivi après mise en ligne.",
    heading: 'Questions fréquentes — Application mobile',
    content: "Retrouvez les réponses aux questions les plus fréquentes sur la création, la reprise et l'évolution d'application mobile : délais, tarification, livraison, publication sur les stores et suivi après mise en ligne.",
  },
  {
    path: '/contact',
    title: 'Contact — Projet application mobile | Noé Calmes',
    description: "Un projet d'application mobile ? Création, reprise ou évolution — réservez un appel gratuit de 15 minutes pour en discuter.",
    heading: 'Discutons de votre projet mobile',
    content: "Vous avez un projet d'application mobile ? Création, reprise ou évolution — réservez un appel gratuit de 15 minutes pour en discuter. Je vous réponds sous 24h.",
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

  // Replace BreadcrumbList with route-specific breadcrumb
  const breadcrumbJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": route.heading, "item": `https://noecalmes.fr${route.path}` }
    ]
  }, null, 6)
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[^}]*"@type":\s*"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>`
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

// Blog routes
const blogRoutes = [
  {
    path: '/blog',
    title: 'Blog — Développement application mobile | Noé Calmes',
    description: 'Conseils et guides pour créer votre application mobile : coûts, technologies, bonnes pratiques et retours d\'expérience.',
    heading: 'Blog — Application mobile',
    content: 'Conseils et guides pour créer, reprendre ou faire évoluer votre application mobile : coûts, technologies, Flutter et retours d\'expérience d\'un expert mobile indépendant.',
  },
  {
    path: '/blog/combien-coute-application-mobile',
    title: 'Combien coûte une application mobile en 2026 ? | Noé Calmes',
    description: 'Découvrez le vrai coût de création d\'une application mobile en France : freelance vs agence, MVP vs app complète, et les facteurs qui influencent le prix.',
    heading: 'Combien coûte une application mobile en 2026 ?',
    content: 'Découvrez le vrai coût de création d\'une application mobile en France. Comparaison freelance vs agence, MVP vs app complète, et les facteurs qui influencent le prix de votre application.',
  },
  {
    path: '/blog/creer-application-mobile-guide',
    title: 'Comment créer une application mobile en 2026 — Guide complet | Noé Calmes',
    description: 'Guide complet pour créer une application mobile : les étapes, les choix techniques, les erreurs à éviter et comment passer de l\'idée au lancement sur les stores.',
    heading: 'Comment créer une application mobile : le guide complet',
    content: 'Guide complet pour créer une application mobile : les étapes clés, les choix techniques (Flutter, natif), les erreurs à éviter et comment passer de l\'idée au lancement sur l\'App Store et Google Play.',
  },
  {
    path: '/blog/flutter-vs-natif-quel-choix',
    title: 'Flutter vs natif — Quel choix pour votre app mobile en 2026 ? | Noé Calmes',
    description: 'Flutter ou développement natif pour votre application mobile ? Comparaison complète : coûts, performances, délais et cas d\'usage pour faire le bon choix.',
    heading: 'Flutter vs natif : quel choix pour votre application mobile ?',
    content: 'Flutter ou développement natif pour votre application mobile ? Comparaison complète des coûts, performances, délais de développement et cas d\'usage pour faire le bon choix en 2026.',
  },
]

for (const route of blogRoutes) {
  let html = baseHtml

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="https://noecalmes.fr${route.path}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="https://noecalmes.fr${route.path}" />`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)

  const breadcrumbItems = [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://noecalmes.fr/blog" },
  ]
  if (route.path !== '/blog') {
    breadcrumbItems.push({ "@type": "ListItem", "position": 3, "name": route.heading, "item": `https://noecalmes.fr${route.path}` })
  }
  const breadcrumbJson = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": breadcrumbItems }, null, 6)
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[^}]*"@type":\s*"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>`
  )

  const seoContent = `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif"><h1>${route.heading}</h1><p>${route.content}</p><a href="https://noecalmes.fr/blog">← Retour au blog</a></div></div>`
  html = html.replace('<div id="root"></div>', seoContent)

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

// Utility/legal routes — serve the SPA shell with noindex so Google doesn't flag redirect errors
const noindexRoutes = ['/mentions', '/privacy', '/cgv', '/documents', '/merci', '/contactnoe', '/legal']

for (const path of noindexRoutes) {
  let html = baseHtml
  // Add noindex so Google ignores these pages
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  )
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>Noé Calmes</title>`
  )

  const routeDir = join(distDir, path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${path}/index.html (noindex)`)
}

console.log('Done! All route pages generated.')
