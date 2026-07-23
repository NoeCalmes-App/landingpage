import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

// Helper to patch all SEO meta tags
function patchHtml(html, {
  path,
  canonicalPath = path,
  title,
  description,
  heading,
  content,
  backLink = '← Retour à l\'accueil',
  backHref = 'https://noecalmes.fr/',
  breadcrumb,
  ogImage,
  ogImageAlt,
}) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="https://noecalmes.fr${canonicalPath}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="https://noecalmes.fr${canonicalPath}" />`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)

  if (ogImage) {
    html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${ogImage}" />`)
    html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${ogImage}" />`)
    html = html.replace(/"image":\s*"[^"]*"/, `"image": "${ogImage}"`)
  }
  if (ogImageAlt) {
    html = html.replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${ogImageAlt}" />`)
    html = html.replace(/<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${ogImageAlt}" />`)
  }

  const breadcrumbJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumb,
  }, null, 6)
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{[^}]*"@type":\s*"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${breadcrumbJson}\n    </script>`
  )

  const siteNav = '<nav aria-label="Pages du site"><a href="https://noecalmes.fr/">Accueil</a> · <a href="https://noecalmes.fr/expertise">Concevoir une application qui rapporte</a> · <a href="https://noecalmes.fr/creation-application-mobile">Ma méthode</a> · <a href="https://noecalmes.fr/blog">Blog</a> · <a href="https://noecalmes.fr/audit-app">Tester ton idée</a> · <a href="https://noecalmes.fr/faq">FAQ</a></nav>'
  const seoContent = `<div id="root"></div><div data-seo-prerender style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden"><h1>${heading}</h1><p>${content}</p><a href="${backHref}">${backLink}</a>${siteNav}</div><noscript><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif"><h1>${heading}</h1><p>${content}</p><a href="${backHref}">${backLink}</a>${siteNav}</div></noscript>`
  html = html.replace('<div id="root"></div>', seoContent)

  return html
}

// ─── Section routes (5 sections + their SEO pages) ───────────────────────────

const sectionRoutes = [
  {
    path: '/expertise',
    title: 'Concevoir une application mobile qui génère des revenus | Noé Calmes',
    description: 'Je ne fais pas que développer ton application mobile : je la conçois pour qu\'elle génère des revenus. Stratégie, modèle économique, design et développement iOS et Android.',
    heading: 'Concevoir une application mobile qui génère des revenus',
    content: 'Je ne suis pas un développeur à la mission ni une agence. Je conçois ton application mobile pour qu\'elle génère des revenus : modèle économique, conversion des utilisateurs en clients, de la stratégie au lancement sur l\'App Store et Google Play. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/creation-application-mobile',
    title: 'Créer une application mobile rentable : ma méthode | Noé Calmes',
    description: 'Ma méthode pour créer une application mobile pensée pour rapporter : cadrage du modèle économique, conception, développement, puis lancement sur l\'App Store et Google Play.',
    heading: 'Ma méthode pour créer une application mobile qui rapporte',
    content: 'Une méthode simple pour créer ton application mobile en pensant revenus avant de penser code : on cadre le besoin et le modèle économique, on conçoit comment l\'application transforme tes utilisateurs en clients, on développe, puis on lance sur l\'App Store et Google Play. Première version en 4 à 6 semaines.',
  },
  {
    path: '/faq',
    title: 'FAQ, créer une application mobile qui rapporte | Noé Calmes',
    description: 'Questions fréquentes : combien coûte une application mobile, combien de temps, comment elle génère des revenus, livraison et suivi après mise en ligne.',
    heading: 'FAQ, créer une application mobile',
    content: 'Les réponses aux questions fréquentes : budget (en général 5 à 10k en mobile), délai (première version en 4 à 6 semaines), comment une application est pensée pour générer des revenus, livraison et suivi après mise en ligne.',
  },
  {
    path: '/projets',
    title: 'Les applications que j\'ai conçues | Noé Calmes',
    description: 'Applications conçues 100% sur-mesure : 13 000 € générés par mois, 300 000 utilisateurs, lancement en 45 jours. +20 applications publiées sur iOS et Android.',
    heading: 'Les applications que j\'ai conçues',
    content: 'Applications mobiles conçues sur-mesure, de la stratégie au lancement : Calorie (13 000 € générés par mois), Hush (300 000 utilisateurs), Plouff Habitudes (lancée en 45 jours), Wake Up Alarme, Purge. +20 applications publiées sur iOS et Android.',
  },
  {
    path: '/projet',
    canonicalPath: '/projets',
    title: 'Les applications que j\'ai conçues | Noé Calmes',
    description: 'Applications conçues 100% sur-mesure : 13 000 € générés par mois, 300 000 utilisateurs, lancement en 45 jours. +20 applications publiées sur iOS et Android.',
    heading: 'Les applications que j\'ai conçues',
    content: 'Applications mobiles conçues sur-mesure, de la stratégie au lancement : Calorie (13 000 € générés par mois), Hush (300 000 utilisateurs), Plouff Habitudes (lancée en 45 jours), Wake Up Alarme, Purge. +20 applications publiées sur iOS et Android.',
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
    title: 'Créer une application mobile rentable : ma méthode | Noé Calmes',
    description: 'Ma méthode pour créer une application mobile pensée pour rapporter : cadrage du modèle économique, conception, développement, puis lancement sur l\'App Store et Google Play.',
    heading: 'Ma méthode pour créer une application mobile qui rapporte',
    content: 'Cette page a évolué : retrouve ma méthode pour créer une application mobile pensée pour générer des revenus, du cadrage au lancement sur les stores.',
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
    path: '/blog/application-par-abonnement',
    title: 'Application par abonnement : combien ça rapporte | Noé Calmes',
    description: 'Comment marche une application par abonnement, combien elle peut rapporter, et comment convertir tes utilisateurs en abonnés qui restent.',
    heading: 'Application par abonnement : comment ça marche et combien ça rapporte',
    content: 'Fonctionnement, revenu mensuel récurrent, formules mensuelles et annuelles, conversion et rétention : comment concevoir une application par abonnement qui transforme ses utilisateurs en clients qui restent.',
  },
  {
    path: '/blog/modele-economique-application-mobile',
    title: 'Modèle économique d\'une application mobile | Noé Calmes',
    description: 'Abonnement, freemium, achats intégrés ou publicité : quel modèle économique choisir pour ton application mobile ? Le guide pour décider selon ton cas.',
    heading: 'Modèle économique d\'une application mobile : lequel choisir',
    content: 'Abonnement, freemium, achats intégrés ou publicité : comment choisir le modèle économique de ton application mobile selon la valeur qu\'elle apporte, la fréquence d\'usage et ton public. Le modèle ne suffit pas, la conception de la conversion fait la différence.',
  },
  {
    path: '/blog/combien-rapporte-application-mobile',
    title: 'Combien rapporte une application mobile en 2026 ? | Noé Calmes',
    description: 'Combien rapporte vraiment une application mobile en 2026 ? Chiffres réels, leviers de revenus et l\'exemple d\'une app à 13 000 € par mois.',
    heading: 'Combien rapporte une application mobile en 2026 ?',
    content: 'Combien rapporte réellement une application mobile en 2026 ? Le calcul du revenu (utilisateurs, conversion, prix, rétention), pourquoi la plupart des applications ne rapportent rien, et l\'exemple d\'une application que j\'ai conçue qui génère 13 000 € par mois.',
  },
  {
    path: '/blog/rentabiliser-application-mobile',
    title: 'Comment rentabiliser une application mobile | Noé Calmes',
    description: 'Comment rentabiliser ton application mobile : abonnement, freemium, conversion, rétention. La méthode concrète qui transforme tes utilisateurs en clients.',
    heading: 'Comment rentabiliser une application mobile',
    content: 'Les modèles de revenus d\'une application mobile (abonnement, freemium, achats intégrés, publicité) et surtout ce qui fait la différence : la conception qui transforme tes utilisateurs en clients. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/blog/creation-application-mobile-toulouse',
    title: 'Création d\'application mobile à Toulouse | Noé Calmes',
    description: 'Développeur d\'applications mobiles à Toulouse : je conçois ton application iOS et Android pour qu\'elle génère des revenus, de l\'idée au lancement.',
    heading: 'Création d\'application mobile à Toulouse',
    content: 'Développeur d\'applications mobiles à Toulouse et en Occitanie. Je conçois ton application iOS et Android pour qu\'elle génère des revenus, pas juste pour exister, de la stratégie au lancement sur l\'App Store et Google Play. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/blog/application-mobile-meilleur-investissement',
    title: 'Créer une application mobile : meilleur investissement en 2026 ! | Noé Calmes',
    description: 'Communauté, réseau métier, revenus récurrents, valorisation : pourquoi une application mobile bien pensée peut devenir un vrai actif business.',
    heading: 'Créer une application mobile : le meilleur investissement en 2026 !',
    content: 'Une application mobile bien pensée peut devenir un actif business : revenus récurrents, valorisation, usage B2B ou B2C et coût d\'entrée plus accessible que beaucoup d\'autres investissements.',
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

  let html = patchHtml(baseHtml, {
    ...route,
    backLink: '← Retour au blog',
    backHref: 'https://noecalmes.fr/blog',
    breadcrumb,
  })

  // Article structured data for individual blog posts (not the blog index)
  if (route.path !== '/blog') {
    const articleJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": route.heading,
      "description": route.description,
      "author": { "@type": "Person", "name": "Noé Calmes", "url": "https://noecalmes.fr" },
      "publisher": { "@id": "https://noecalmes.fr/#person" },
      "mainEntityOfPage": `https://noecalmes.fr${route.path}`,
      "image": "https://noecalmes.fr/assets/images/meta/new-og-image.png",
    }, null, 6)
    html = html.replace('</head>', `    <script type="application/ld+json">\n    ${articleJson}\n    </script>\n  </head>`)
  }

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  console.log(`✓ Generated ${route.path}/index.html`)
}

// ─── Audit app route — landing dediee /audit-app ─────────────────────────────

const auditAppRoute = {
  path: '/audit-app',
  title: 'Tester ton idée d\'application mobile en 2 minutes | Noé Calmes',
  description: 'Teste ton idée d\'application mobile avant d\'investir : potentiel, budget, délai et si elle peut générer des revenus, en 2 minutes.',
  heading: 'Tester ton idée d\'application mobile',
  content: 'Réponds à quelques questions et obtiens une première lecture claire avant d\'investir dans le développement : potentiel, budget réaliste, délai, et si ton idée peut générer des revenus.',
  ogImage: 'https://noecalmes.fr/assets/images/meta/audit-app-og.png',
  ogImageAlt: 'Audit gratuit pour tester si ton idée d\'application mobile peut générer des revenus.',
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

const mockupRoutes = [
  '/maquette/smoothride',
  '/maquette/aretha',
  '/maquette/kingfit-coach',
  '/maquette/pac-assist',
  '/maquette/cvc-assist',
  '/maquette/blush',
  '/maquette/moovye',
  '/maquette/colocool',
  '/maquette/bagsitter',
  '/maquette/bailora',
]

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

const legacyRoutes = ['/a-propos', '/offre', '/contact', '/merci']
const noindexRoutes = ['/avis', '/rendez-vous', '/mentions', '/privacy', '/cgv', '/documents', '/contactnoe', '/legal', '/espace-client', '/maquette-visuel', ...legacyRoutes]

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
  `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif;visibility:hidden" aria-hidden="true"><h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin-bottom:1rem">Je transforme ton idée en app qui génère des revenus.</h1><p style="font-size:1rem;color:#555;margin-bottom:1.5rem">Je ne fais pas que développer ton application : je la conçois pour qu'elle génère des revenus. Une application que j'ai conçue fait 13 000 €/mois. Plus de 20 applications publiées.</p><a href="/audit-app" style="display:inline-block;background:#6760ff;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600">Tester mon idée d'application</a><nav aria-label="Pages du site" style="margin-top:1.5rem;font-size:0.85rem"><a href="/expertise">Concevoir une application qui rapporte</a> · <a href="/creation-application-mobile">Ma méthode</a> · <a href="/blog">Blog</a> · <a href="/audit-app">Tester ton idée</a> · <a href="/faq">FAQ</a></nav></div></div>`
)
writeFileSync(join(distDir, 'index.html'), homeHtml)
console.log('✓ Injected pre-rendered content into home index.html')

console.log('Done! All route pages generated.')
