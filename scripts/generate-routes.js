import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

// Helper to patch all SEO meta tags
function patchHtml(html, { path, canonicalPath = path, title, description, heading, content, backLink = '← Retour à l\'accueil', backHref = 'https://noecalmes.fr/', breadcrumb }) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="https://noecalmes.fr${canonicalPath}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="https://noecalmes.fr${canonicalPath}" />`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)

  const breadcrumbJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumb,
  }, null, 6)
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[^}]*"@type":\s*"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>`
  )

  const seoContent = `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif"><h1>${heading}</h1><p>${content}</p><a href="${backHref}">${backLink}</a></div></div>`
  html = html.replace('<div id="root"></div>', seoContent)

  return html
}

// ─── Section routes (5 sections + their SEO pages) ───────────────────────────

const sectionRoutes = [
  {
    path: '/expertise',
    title: 'Pourquoi travailler avec Noé Calmes — Expert en applications mobiles',
    description: 'Expert en applications mobiles indépendant. Création, reprise et évolution d\'applications iOS et Android — de la stratégie au lancement, pour les entreprises en France.',
    heading: 'Expert en applications mobiles — Noé Calmes',
    content: 'Expert en applications mobiles indépendant. J\'aide les entreprises à créer, reprendre et faire évoluer leur application mobile — en pensant business avant de penser code. Stratégie, design et développement de la conception au lancement sur les stores.',
  },
  {
    path: '/creation-application-mobile',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvrez ma méthode pour créer votre application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
    heading: 'Méthode de création d\'application mobile',
    content: 'Une méthode simple pour créer votre application mobile : un échange pour cadrer le projet, un développement suivi avec des points réguliers, puis la mise en ligne sur l\'App Store et Google Play.',
  },
  {
    path: '/avis',
    title: 'Avis clients — Noé Calmes, expert en applications mobiles',
    description: 'Ce que disent les clients qui ont fait confiance à Noé Calmes pour créer, reprendre ou faire évoluer leur application mobile.',
    heading: 'Avis clients — Noé Calmes',
    content: 'Découvrez les avis de clients qui ont confié leur projet d\'application mobile à Noé Calmes. Création de MVP, reprise d\'application existante, évolution de fonctionnalités — ce qu\'ils en disent.',
  },
  {
    path: '/faq',
    title: 'FAQ — Création d\'application mobile | Noé Calmes',
    description: 'Questions fréquentes sur la création, la reprise et l\'évolution d\'application mobile : délais, tarifs, livraison et suivi après mise en ligne.',
    heading: 'FAQ — Création d\'application mobile',
    content: 'Retrouvez les réponses aux questions les plus fréquentes sur la création, la reprise et l\'évolution d\'application mobile : délais, tarification, livraison, publication sur les stores et suivi après mise en ligne.',
  },
  {
    path: '/rendez-vous',
    title: 'Réserver un appel gratuit — Application mobile | Noé Calmes',
    description: 'Vous avez un projet d\'application mobile ? Réservez un appel gratuit de 30 minutes pour en discuter. Création, reprise ou évolution — sans engagement.',
    heading: 'Réserver un appel découverte gratuit',
    content: 'Vous avez un projet d\'application mobile ? Réservez un appel gratuit de 30 minutes pour discuter de votre idée, vos besoins et vos objectifs. Création, reprise ou évolution — sans engagement.',
  },
]

for (const route of sectionRoutes) {
  const html = patchHtml(baseHtml, {
    ...route,
    breadcrumb: [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": route.heading, "item": `https://noecalmes.fr${route.path}` },
    ],
  })
  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

const legacySectionRoutes = [
  {
    path: '/etapes',
    canonicalPath: '/creation-application-mobile',
    title: 'Méthode de création d\'application mobile | Noé Calmes',
    description: 'Découvrez ma méthode pour créer votre application mobile : cadrage clair, développement, puis lancement sur l\'App Store et Google Play.',
    heading: 'Méthode de création d\'application mobile',
    content: 'Cette page a évolué : retrouvez ma méthode de création d\'application mobile, du cadrage au lancement sur les stores.',
  },
]

for (const route of legacySectionRoutes) {
  const html = patchHtml(baseHtml, {
    ...route,
    breadcrumb: [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": route.heading, "item": `https://noecalmes.fr${route.canonicalPath}` },
    ],
  })
  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html (legacy canonical)`)
}

// ─── Blog routes ──────────────────────────────────────────────────────────────

const blogRoutes = [
  {
    path: '/blog',
    title: 'Blog — Création d\'application mobile | Noé Calmes',
    description: 'Guides et conseils pour créer, reprendre ou faire évoluer votre application mobile. Coûts, MVP, choix techniques — par un expert en applications mobiles.',
    heading: 'Blog — Application mobile',
    content: 'Guides et conseils pour créer, reprendre ou faire évoluer votre application mobile. Coûts, MVP, choix d\'expert, évolution — rédigés par un expert en applications mobiles indépendant.',
  },
  {
    path: '/blog/combien-coute-application-mobile',
    title: 'Combien coûte une application mobile en 2026 ? | Noé Calmes',
    description: 'Découvrez le vrai coût d\'une application mobile en 2026 : freelance vs agence, MVP vs app complète. Prix indicatifs et facteurs qui influencent le budget.',
    heading: 'Combien coûte une application mobile en 2026 ?',
    content: 'Freelance, agence, no-code : combien faut-il réellement budgétiser pour créer une application mobile en 2026 ? Analyse complète des prix selon le type de projet et les acteurs du marché.',
  },
  {
    path: '/blog/creer-application-mobile-guide',
    title: 'Comment créer une application mobile en 2026 — Guide complet | Noé Calmes',
    description: 'Guide complet pour créer une application mobile : les étapes, les choix techniques, les erreurs à éviter et comment passer de l\'idée au lancement sur les stores.',
    heading: 'Comment créer une application mobile : le guide complet',
    content: 'De l\'idée au lancement sur les stores : guide complet pour créer une application mobile en 2026. Étapes, choix techniques, erreurs à éviter et bonnes pratiques pour réussir votre projet mobile.',
  },
  {
    path: '/blog/reprendre-application-mobile-existante',
    title: 'Reprendre une application mobile existante — Comment faire ? | Noé Calmes',
    description: 'Vous avez une application mobile à reprendre ? Guide complet pour auditer, stabiliser et relancer une app existante sans repartir de zéro.',
    heading: 'Reprendre une application mobile existante',
    content: 'Votre application mobile est instable, abandonnée ou mal codée ? Découvrez comment reprendre une app existante : audit technique, plan d\'action et remise sur de bonnes bases pour la faire évoluer sereinement.',
  },
  {
    path: '/blog/faire-evoluer-application-mobile',
    title: 'Comment faire évoluer une application mobile sans tout casser | Noé Calmes',
    description: 'Ajouter des fonctionnalités, corriger la dette technique, améliorer l\'expérience utilisateur : guide pratique pour faire évoluer votre application mobile.',
    heading: 'Comment faire évoluer une application mobile sans tout casser',
    content: 'Ajouter des fonctionnalités, réduire la dette technique, améliorer les performances : guide pratique pour faire évoluer votre application mobile sans tout casser ni repartir de zéro.',
  },
  {
    path: '/blog/mvp-application-mobile',
    title: 'MVP application mobile : comment lancer vite sans sacrifier la qualité | Noé Calmes',
    description: 'Qu\'est-ce qu\'un MVP mobile et comment le construire ? Guide pour lancer votre première version en 45 jours, tester votre idée et éviter les pièges courants.',
    heading: 'MVP application mobile : lancer vite sans sacrifier la qualité',
    content: 'Qu\'est-ce qu\'un MVP mobile, pourquoi en avoir un et comment le construire ? Guide complet pour lancer votre première version d\'application en 45 jours, valider votre idée et éviter les erreurs classiques.',
  },
  {
    path: '/blog/choisir-expert-application-mobile',
    title: 'Comment choisir le bon expert pour créer votre application mobile | Noé Calmes',
    description: 'Freelance, agence, no-code : comment choisir le bon partenaire pour créer votre application mobile ? Les critères essentiels pour ne pas se tromper.',
    heading: 'Comment choisir le bon expert pour créer votre application mobile',
    content: 'Freelance spécialisé, agence digitale ou no-code : comment choisir le bon partenaire pour créer votre application mobile ? Les critères essentiels, les questions à poser et les pièges à éviter.',
  },
]

for (const route of blogRoutes) {
  const breadcrumb = [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://noecalmes.fr/blog" },
  ]
  if (route.path !== '/blog') {
    breadcrumb.push({ "@type": "ListItem", "position": 3, "name": route.heading, "item": `https://noecalmes.fr${route.path}` })
  }

  const html = patchHtml(baseHtml, {
    ...route,
    backLink: '← Retour au blog',
    backHref: 'https://noecalmes.fr/blog',
    breadcrumb,
  })
  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

// ─── Audit app route — landing dediee /audit-app ─────────────────────────────

const auditAppRoute = {
  path: '/audit-app',
  title: 'Tester une idée d\'application mobile — Noé Calmes',
  description: 'Testez votre idée d\'application mobile avant d\'investir : potentiel business, budget, délai et points à valider en 2 minutes.',
  heading: 'Tester votre idée d\'application mobile',
  content: 'Répondez à 5 questions et obtenez une première lecture claire avant d\'investir dans le développement : potentiel business, budget MVP, délai réaliste et points à clarifier.',
}

const auditHtml = patchHtml(baseHtml, {
  ...auditAppRoute,
  breadcrumb: [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": auditAppRoute.heading, "item": `https://noecalmes.fr${auditAppRoute.path}` },
  ],
})
const auditDir = join(distDir, auditAppRoute.path)
mkdirSync(auditDir, { recursive: true })
writeFileSync(join(auditDir, 'index.html'), auditHtml)
console.log(`✓ Generated ${auditAppRoute.path}/index.html`)

// ─── Client mockup routes — noindex autonomous visual proposal pages ─────────

const mockupRoutes = ['/maquette/smoothride', '/maquette/pac-assist', '/maquette/cvc-assist']

for (const path of mockupRoutes) {
  let html = baseHtml
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  )
  html = html.replace(/<title>[^<]*<\/title>/, `<title>Maquettes visuelles — Noé Calmes</title>`)
  const routeDir = join(distDir, path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${path}/index.html (mockup noindex)`)
}

// ─── Legacy routes — noindex (old URLs that may still be indexed by Google) ──

const legacyRoutes = ['/a-propos', '/offre', '/contact']
const noindexRoutes = ['/mentions', '/privacy', '/cgv', '/documents', '/merci', '/contactnoe', '/legal', ...legacyRoutes]

for (const path of noindexRoutes) {
  let html = baseHtml
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  )
  html = html.replace(/<title>[^<]*<\/title>/, `<title>Noé Calmes</title>`)

  const routeDir = join(distDir, path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  const isLegacy = legacyRoutes.includes(path)
  console.log(`✓ Generated ${path}/index.html (${isLegacy ? 'legacy noindex' : 'noindex'})`)
}

// ─── Home page — pre-render hero for Lighthouse FCP ──────────────────────────

const homeHtml = baseHtml.replace(
  '<div id="root"></div>',
  `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif;visibility:hidden" aria-hidden="true"><h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin-bottom:1rem">Je transforme votre idée en app mobile en 45 jours.</h1><p style="font-size:1rem;color:#555;margin-bottom:1.5rem">Votre application pensée pour générer des revenus, de la stratégie au lancement. Création, reprise et évolution d'applications iOS et Android. Tarif fixe, MVP en 45 jours.</p><a href="/rendez-vous" style="display:inline-block;background:#645cff;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600">Obtenir mes premières maquettes</a></div></div>`
)
writeFileSync(join(distDir, 'index.html'), homeHtml)
console.log('✓ Injected pre-rendered content into home index.html')

console.log('Done! All route pages generated.')
