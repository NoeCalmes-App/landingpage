import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

// Chemins de toutes les pages ecrites, pour le controle de liens en fin de script.
const pagesGenerees = []

// URLs indexables, pour la generation du sitemap. Une page noindex (mentions,
// maquettes, routes legacy) n'y entre jamais : declarer dans le sitemap une URL
// qu'on demande a Google d'ignorer est contradictoire, et Search Console le
// remonte en avertissement.
const urlsSitemap = []
function declarerSitemap(path, { priority, changefreq, lastmod }) {
  urlsSitemap.push({ loc: urlPublique(path), priority, changefreq, lastmod })
}

// Date du build, pour les pages dont le contenu suit le code.
const dateBuild = new Date().toISOString().slice(0, 10)

// URL publique d'un chemin — TOUJOURS avec la barre finale.
//
// POURQUOI, et c'est la correction du 8 août 2026 : ces pages sont écrites en
// `chemin/index.html`, donc GitHub Pages les sert à l'adresse `/chemin/` et
// répond à `/chemin` (sans barre) par une redirection 301. Or la canonique et
// le sitemap disaient `/chemin` : Google suivait le sitemap → redirection →
// lisait la page → la canonique le renvoyait sur `/chemin` → redirection à
// nouveau. Une canonique qui pointe sur une URL qui redirige vers la page
// elle-même = « Erreur liée à des redirections » dans Search Console. C'est ce
// qui a tenu 27 pages (dont /audit-app et tout le blog) HORS de Google de
// mars à août, pendant que le site marchait parfaitement pour les humains.
//
// La règle est donc : canonique = l'URL EXACTE que le serveur sert en 200,
// barre comprise. Toute nouvelle URL absolue écrite ici doit passer par cette
// fonction.
function urlPublique(path) {
  if (path === '/' || path === '') return 'https://noecalmes.fr/'
  return `https://noecalmes.fr${path}/`
}

// ─── Meta des pages SEO : source unique ──────────────────────────────────────
//
// Meme regle que pour les articles : les title/description de /expertise,
// /creation-application-mobile et /faq sont lus depuis `src/PagesSeo.jsx`
// (les appels a `appliquerMeta`). Les redefinir ici les ferait diverger du
// DOM rendu, qui est la version que Google indexe.
// FAQ propre a chaque article, lue depuis `src/Blog.jsx`.
//
// POURQUOI : une FAQ par article capte des requetes longue traine que le corps
// du texte ne couvre pas, et rend la page eligible aux resultats enrichis. Le
// balisage doit correspondre EXACTEMENT aux questions affichees, donc il est
// genere depuis la meme source que l'affichage, jamais reecrit a la main.
function lireFaqArticles() {
  const blog = readFileSync(join(__dirname, '..', 'src', 'Blog.jsx'), 'utf-8')
  const corps = blog.split('export const ARTICLES_LIES')[0]
  const parSlug = {}

  const positions = [...corps.matchAll(/^    slug: '([^']+)',$/gm)]
  for (let i = 0; i < positions.length; i += 1) {
    const slug = positions[i][1]
    const debut = positions[i].index
    const fin = i + 1 < positions.length ? positions[i + 1].index : corps.length
    const morceau = corps.slice(debut, fin)

    const blocFaq = morceau.match(/\n    faq: \[([\s\S]*?)\n    \],/)
    if (!blocFaq) continue

    const items = []
    const motif = /\{ q: "((?:[^"\\]|\\.)*)", a: "((?:[^"\\]|\\.)*)" \}/g
    for (const m of blocFaq[1].matchAll(motif)) {
      items.push({
        q: m[1].replace(/\\(["'])/g, '$1'),
        a: m[2].replace(/\\(["'])/g, '$1'),
      })
    }
    if (items.length) parSlug[slug] = items
  }
  return parSlug
}

// Fichiers qui declarent des meta de page via `appliquerMeta`. Chaque page a
// exactement un endroit ou son titre est ecrit.
const SOURCES_META = [
  ['src', 'PagesSeo.jsx'],
  ['src', 'Projets.jsx'],
  ['src', 'audit-app', 'AuditApp.jsx'],
  ['src', 'Blog.jsx'],   // index /blog (les articles passent par lireMetaArticles)
  ['src', 'Quiz.jsx'],   // hub /quiz (les quizz ont un path en gabarit, non capte)
]

function lireMetaPagesSeo() {
  const motif = /appliquerMeta\(\{\s*path: '([^']+)',\s*title: "((?:[^"\\]|\\.)*)",\s*description: "((?:[^"\\]|\\.)*)",/g
  const meta = {}
  for (const parties of SOURCES_META) {
    const src = readFileSync(join(__dirname, '..', ...parties), 'utf-8')
    for (const m of src.matchAll(motif)) {
      meta[m[1]] = { title: m[2].replace(/\\(["'])/g, '$1'), description: m[3].replace(/\\(["'])/g, '$1') }
    }
  }
  if (!Object.keys(meta).length) throw new Error('Aucune meta lue depuis les sources de PagesSeo')
  return meta
}

// Questions/reponses de la page /faq, pour le balisage FAQPage.
function lireFaq() {
  const src = readFileSync(join(__dirname, '..', 'src', 'PagesSeo.jsx'), 'utf-8')
  const bloc = src.match(/export const FAQ_ITEMS = \[([\s\S]*?)\n\]/)
  if (!bloc) throw new Error('FAQ_ITEMS introuvable dans src/PagesSeo.jsx')
  const motif = /q: (?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'),\s*\n\s*a: (?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'),/g
  const items = []
  for (const m of bloc[1].matchAll(motif)) {
    items.push({
      q: (m[1] ?? m[2]).replace(/\\(["'])/g, '$1'),
      a: (m[3] ?? m[4]).replace(/\\(["'])/g, '$1'),
    })
  }
  if (!items.length) throw new Error('Aucune question lue dans FAQ_ITEMS')
  return items
}

// ─── Meta des articles : source unique ───────────────────────────────────────
//
// Les titres et descriptions des articles vivaient en DOUBLE : dans
// `src/Blog.jsx` (applique par React a l'hydratation) et ici (ecrit dans le
// HTML servi). Les deux ont diverge sur 6 articles sur 17. Google executant le
// JavaScript, c'est la version de Blog.jsx qui gagnait, et des titres
// raccourcis exprès ici etaient re-rallonges au rendu, donc tronques dans les
// resultats de recherche.
//
// `src/Blog.jsx` est desormais la seule source de verite pour metaTitle et
// description. Ce script ne garde que la copie du pre-rendu (heading, content),
// qui n'existe nulle part ailleurs.
const LIMITE_META_TITRE = 65
const LIMITE_DESCRIPTION = 155

function lireMetaArticles() {
  const blog = readFileSync(join(__dirname, '..', 'src', 'Blog.jsx'), 'utf-8')
  const corps = blog.split('export const ARTICLES_LIES')[0]
  const chaine = "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')"
  const motif = new RegExp(
    `slug: '([^']+)',\\s*\\n\\s*title: ${chaine},\\s*\\n\\s*metaTitle: ${chaine},\\s*\\n\\s*description: ${chaine},\\s*\\n\\s*date: '([^']+)',`,
    'g'
  )
  const litteral = (v) => v.slice(1, -1).replace(/\\(['"])/g, '$1')

  const meta = {}
  for (const m of corps.matchAll(motif)) {
    meta[m[1]] = {
      title: litteral(m[3]),
      description: litteral(m[4]),
      heading: litteral(m[2]),
      date: m[5],
    }
  }
  if (!Object.keys(meta).length) throw new Error('Aucun article lu depuis src/Blog.jsx')
  return meta
}

// Les limites ne sont pas cosmetiques : au-dela, Google tronque le titre ou la
// description dans les resultats, et le message d'accroche saute.
// `finalCta` decide vers quoi pointent les DEUX appels a l'action de l'article
// (celui du milieu et celui de fin) :
//
//   'audit'    -> /audit-app, qui demande « decris ton idee d'application »
//   'whatsapp' -> conversation directe
//
// Le champ etait facultatif, et son absence tombait silencieusement dans la
// branche WhatsApp. Six articles a forte intention d'achat y sont restes des
// mois sans que ca se voie. Il est desormais obligatoire et explicite : mieux
// vaut un build qui echoue qu'un appel a l'action qui parle d'« idee » a
// quelqu'un dont l'application est deja en ligne.
function verifierAppelsAction(slugsPublies) {
  const blog = readFileSync(join(__dirname, '..', 'src', 'Blog.jsx'), 'utf-8')
  const corps = blog.split('export const ARTICLES_LIES')[0]
  const positions = [...corps.matchAll(/^    slug: '([^']+)',$/gm)]
  const erreurs = []

  for (let i = 0; i < positions.length; i += 1) {
    const slug = positions[i][1]
    if (!slugsPublies.includes(slug)) continue
    const fin = i + 1 < positions.length ? positions[i + 1].index : corps.length
    const morceau = corps.slice(positions[i].index, fin)
    const m = morceau.match(/finalCta: '([^']+)'/)

    if (!m) {
      erreurs.push(`« ${slug} » n'a pas de champ finalCta.`)
    } else if (!['audit', 'whatsapp'].includes(m[1])) {
      erreurs.push(`« ${slug} » : finalCta vaut '${m[1]}', attendu 'audit' ou 'whatsapp'.`)
    }
  }

  if (erreurs.length) {
    console.error('\n✗ Appels a l\'action mal declares :')
    for (const e of erreurs) console.error(`  - ${e}`)
    console.error("\n'audit' si le lecteur n'a PAS encore d'application (l'audit valide une idee).")
    console.error("'whatsapp' si son application existe deja (reprise, evolution, monetisation).\n")
    process.exit(1)
  }
  console.log(`✓ Appels a l'action : ${slugsPublies.length} articles avec une cible explicite`)
}

// Un article present dans BLOG_ARTICLES mais absent de `blogRoutes` n'a PAS de
// page generee, alors que l'index du blog le liste et pointe vers son URL.
// Resultat : un lien en dur, depuis une page indexee, vers une 404.
//
// C'est le scenario « j'ai ajoute l'article et oublie la route ». Il passait au
// vert avant le 20/08/2026 : le build ne verifiait que le sens inverse (une
// route sans article), pas celui-ci, qui est pourtant le plus frequent.
function verifierArticlesPublies(meta, slugsPublies) {
  const orphelins = Object.keys(meta).filter((slug) => !slugsPublies.includes(slug))
  if (!orphelins.length) return

  console.error('\n✗ Articles presents dans BLOG_ARTICLES mais jamais publies :')
  for (const slug of orphelins) {
    console.error(`  - « ${slug} » : l'index du blog pointerait vers /blog/${slug}/, qui renverrait une 404.`)
  }
  console.error('\nAjoute la route correspondante dans le tableau `blogRoutes` de ce fichier')
  console.error('(seulement path, heading et content), ou retire l\'article de BLOG_ARTICLES.\n')
  process.exit(1)
}

function verifierLongueurs(meta, slugsPublies) {
  const erreurs = []

  for (const slug of slugsPublies) {
    const m = meta[slug]
    if (!m) {
      erreurs.push(`« ${slug} » est une route publiee mais n'existe pas dans src/Blog.jsx.`)
      continue
    }
    if (m.title.length > LIMITE_META_TITRE) {
      erreurs.push(`« ${slug} » : metaTitle de ${m.title.length} caracteres (max ${LIMITE_META_TITRE}).`)
    }
    if (m.description.length > LIMITE_DESCRIPTION) {
      erreurs.push(`« ${slug} » : description de ${m.description.length} caracteres (max ${LIMITE_DESCRIPTION}).`)
    }
  }
  if (erreurs.length) {
    console.error('\n✗ Meta hors limites :')
    for (const e of erreurs) console.error(`  - ${e}`)
    console.error('\nCorrige metaTitle / description dans src/Blog.jsx.\n')
    process.exit(1)
  }
  console.log(`✓ Meta verifiees : ${slugsPublies.length} articles dans les limites (${LIMITE_META_TITRE} / ${LIMITE_DESCRIPTION})`)
}

// ─── Garde-fou maillage interne ──────────────────────────────────────────────
//
// Le 20/08/2026, 11 des 17 articles ne recevaient aucun lien entrant. La table
// `ARTICLES_LIES` de `src/Blog.jsx` corrige ca, mais rien n'empechait la
// regression de revenir en ajoutant un article sans le citer nulle part.
// Ce controle lit la table et fait ECHOUER le build si un article publie a
// moins de 2 liens entrants. Un article sans lien entrant est un cul-de-sac :
// Google le decouvre par le sitemap, ne lui transmet aucune autorite et le
// recrawle rarement.
const LIENS_ENTRANTS_MINIMUM = 2

function lireArticlesLies() {
  const blog = readFileSync(join(__dirname, '..', 'src', 'Blog.jsx'), 'utf-8')
  const bloc = blog.match(/export const ARTICLES_LIES = \{([\s\S]*?)\n\}/)
  if (!bloc) throw new Error('ARTICLES_LIES introuvable dans src/Blog.jsx')
  const table = {}
  const ligne = /'([^']+)':\s*\[([^\]]*)\]/g
  let m
  while ((m = ligne.exec(bloc[1])) !== null) {
    table[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1])
  }
  return table
}

function verifierMaillage(slugsPublies) {
  const table = lireArticlesLies()
  const entrants = Object.fromEntries(slugsPublies.map((s) => [s, 0]))
  const erreurs = []

  for (const [source, cibles] of Object.entries(table)) {
    if (!slugsPublies.includes(source)) {
      erreurs.push(`ARTICLES_LIES contient « ${source} », qui n'est pas une route publiee.`)
    }
    for (const cible of cibles) {
      if (!(cible in entrants)) {
        erreurs.push(`« ${source} » pointe vers « ${cible} », qui n'est pas une route publiee.`)
        continue
      }
      entrants[cible] += 1
    }
  }

  for (const slug of slugsPublies) {
    if (!table[slug]) erreurs.push(`« ${slug} » n'a aucun lien sortant defini dans ARTICLES_LIES.`)
    if (entrants[slug] < LIENS_ENTRANTS_MINIMUM) {
      erreurs.push(`« ${slug} » n'a que ${entrants[slug]} lien(s) entrant(s), minimum ${LIENS_ENTRANTS_MINIMUM}.`)
    }
  }

  if (erreurs.length) {
    console.error('\n✗ Maillage interne casse :')
    for (const e of erreurs) console.error(`  - ${e}`)
    console.error('\nCorrige la table ARTICLES_LIES dans src/Blog.jsx.\n')
    process.exit(1)
  }
  console.log(`✓ Maillage interne verifie : ${slugsPublies.length} articles, tous avec >= ${LIENS_ENTRANTS_MINIMUM} liens entrants`)
  return table
}

// Retire le bloc FAQPage herite de index.html.
//
// POURQUOI : `patchHtml` part de `dist/index.html`, qui contient le FAQPage de
// la page d'accueil. Sans ce retrait, TOUTES les pages generees (articles de
// blog, mentions legales, maquettes, audit-app) declaraient a Google une FAQ
// qui n'apparait nulle part sur elles. Les regles de Google demandent que le
// contenu balise FAQPage soit visible sur la page concernee ; un balisage
// orphelin est au mieux ignore, au pire signale comme trompeur.
// Seules la home et /faq gardent un FAQPage, regenere depuis FAQ_ITEMS.
function retirerFaqPage(html) {
  return html.replace(
    /\n?\s*(<!-- FAQPage Structured Data -->\s*)?<script type="application\/ld\+json">\s*\{[^{]*"@type":\s*"FAQPage"[\s\S]*?<\/script>/,
    ''
  )
}

function baliseFaq(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  }, null, 6)
}

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
  liensLies = [],
  liensLiesTitre = 'À lire aussi',
}) {
  html = retirerFaqPage(html)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${urlPublique(canonicalPath)}" />`)
  // hreflang auto-referent, aligne sur la canonique de CETTE page. Sans ce
  // remplacement, toutes les pages generees heriteraient du hreflang de la
  // home (pointant sur `/`), ce qui contredirait leur propre canonique.
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="fr-fr"\s+href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="fr-fr" href="${urlPublique(canonicalPath)}" />`)
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${urlPublique(canonicalPath)}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${urlPublique(canonicalPath)}" />`)
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

  // Liens internes en forme finale (barre comprise) : chaque lien sans barre
  // coûte une redirection 301 à chaque passage de robot, et un maillage qui
  // pointe partout sur des redirections brouille la version canonique.
  const siteNav = `<nav aria-label="Pages du site"><a href="https://noecalmes.fr/">Accueil</a> · <a href="${urlPublique('/expertise')}">Concevoir une application qui rapporte</a> · <a href="${urlPublique('/creation-application-mobile')}">Ma méthode</a> · <a href="${urlPublique('/blog')}">Blog</a> · <a href="${urlPublique('/audit-app')}">Tester ton idée</a> · <a href="${urlPublique('/faq')}">FAQ</a></nav>`
  // Maillage du cluster dans le HTML brut : Google explore d'abord le HTML
  // servi, avant tout rendu JavaScript. Les liens « A lire aussi » doivent donc
  // exister ici aussi, pas seulement dans le DOM rendu par React.
  const navLies = liensLies.length
    ? `<nav aria-label="${liensLiesTitre}"><p>${liensLiesTitre} :</p><ul>${liensLies.map((l) => `<li><a href="${urlPublique(l.path)}">${l.heading}</a></li>`).join('')}</ul></nav>`
    : ''

  const corpsSeo = `<h1>${heading}</h1><p>${content}</p>${navLies}<a href="${backHref}">${backLink}</a>${siteNav}`
  const seoContent = `<div id="root"></div><div data-seo-prerender style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden">${corpsSeo}</div><noscript><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif">${corpsSeo}</div></noscript>`
  html = html.replace('<div id="root"></div>', seoContent)

  return html
}

// ─── Section routes (5 sections + their SEO pages) ───────────────────────────

// Ces entrees ne portent que la copie du pre-rendu (heading, content) et le
// chemin. Les title/description viennent de `src/PagesSeo.jsx` : ne pas les
// redefinir ici, ils seraient ignores.
const sectionRoutes = [
  {
    path: '/expertise',
    heading: 'Concevoir une application mobile qui génère des revenus',
    content: 'La plupart des applications ne rapportent rien, et ce n\'est presque jamais un problème de code. Je conçois ton application comme un actif : modèle économique décidé avant la première ligne de code, moment de valeur atteint vite, offre placée là où elle a du sens. Plus de 20 applications publiées, et une application que j\'ai conçue génère environ 13 000 € par mois.',
  },
  {
    path: '/creation-application-mobile',
    heading: 'Ma méthode pour créer une application mobile qui rapporte',
    content: 'Cinq étapes : cadrage du besoin et du modèle économique, conception du parcours qui mène à la valeur puis à l\'achat, développement sur une base propre iOS et Android, lancement sur l\'App Store et Google Play, puis suivi après la mise en ligne. Première version en 4 à 6 semaines, tarif fixe défini avant de commencer.',
  },
  {
    path: '/faq',
    heading: 'FAQ, créer une application mobile',
    content: 'Budget et tarification, délai d\'une première version, capacité réelle d\'une application à générer des revenus, différence avec une agence, limites de l\'intelligence artificielle, reprise d\'une application existante, publication sur les stores et suivi après la mise en ligne.',
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

const metaPagesSeo = lireMetaPagesSeo()
const faqItems = lireFaq()

// Donnees structurees FAQPage : rendent la page eligible aux resultats
// enrichis (questions depliables directement dans Google). Ecrites uniquement
// ici, dans le HTML servi. React n'y touche pas, donc pas de doublon apres
// rendu, et un doublon de FAQPage serait traite comme une erreur.
const faqJson = baliseFaq(faqItems)

for (const route of sectionRoutes) {
  const meta = metaPagesSeo[route.path]

  let html = patchHtml(baseHtml, {
    ...route,
    ...(meta ? { title: meta.title, description: meta.description } : {}),
    breadcrumb: [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": route.heading, "item": urlPublique(route.canonicalPath || route.path) },
    ],
  })

  if (route.path === '/faq') {
    html = html.replace('</head>', `    <script type="application/ld+json">\n    ${faqJson}\n    </script>\n  </head>`)
  }

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  pagesGenerees.push(join(routeDir, 'index.html'))
  // /projet est un alias canonique de /projets : une seule des deux entre au
  // sitemap, sinon on declare deux URLs pour une meme page.
  if (!route.canonicalPath) declarerSitemap(route.path, { priority: '0.8', changefreq: 'monthly', lastmod: dateBuild })
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
  // Une route legacy pointe en canonique sur une autre page : elle doit en
  // porter les memes meta, sinon on maintient deux textes pour une seule page
  // indexee, et ils divergent.
  const metaCible = metaPagesSeo[route.canonicalPath]
  const html = patchHtml(baseHtml, {
    ...route,
    ...(metaCible || {}),
    breadcrumb: [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": route.heading, "item": urlPublique(route.canonicalPath) },
    ],
  })
  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  pagesGenerees.push(join(routeDir, 'index.html'))
  console.log(`✓ Generated ${route.path}/index.html (legacy canonical)`)
}

// ─── Blog routes ──────────────────────────────────────────────────────────────

// Ces entrees ne portent QUE la copie du pre-rendu (heading, content) et le
// chemin. Les title et description viennent de `src/Blog.jsx` via
// `lireMetaArticles()` : ne pas les redefinir ici, ils seraient ignores.
const blogRoutes = [
  {
    // title/description lus depuis src/Blog.jsx (appel a appliquerMeta dans
    // BlogList) : ne pas les redefinir ici.
    path: '/blog',
    heading: 'Blog, créer une application mobile qui rapporte',
    content: 'Guides et conseils pour créer, reprendre ou faire évoluer votre application mobile. Coûts, MVP, choix d\'expert, évolution — rédigés par un expert en applications mobiles indépendant.',
  },
  {
    path: '/blog/application-audience-revenus-recurrents',
    heading: 'Comment une application transforme une audience en revenus récurrents',
    content: 'Pourquoi une audience ne se transforme pas toute seule en revenus, ce qu\'une application fait qu\'un lien en bio ne fait pas (fréquence, paiement récurrent, propriété du lien), les trois formats qui convertissent une communauté (programme suivi, bibliothèque vivante, outil du quotidien), le calcul de rentabilité (environ 68 abonnés pour rembourser une application à 9 000 €) et l\'erreur de confondre volume d\'utilisateurs et revenus.',
  },
  {
    path: '/blog/application-mobile-coach-formateur',
    heading: 'Application mobile pour coach, formateur ou consultant : transformer ton expertise en revenus',
    content: 'Quand une application a du sens pour une activité de coaching, de formation ou de conseil : les vrais déclencheurs, les quatre formats qui fonctionnent (suivi client, contenu premium, réservation, espace membre), ce que tu dois déjà avoir avant de te lancer, le calcul de rentabilité (environ 45 abonnés pour rembourser une application à 8 000 €) et l\'erreur de l\'application vitrine.',
  },
  {
    path: '/blog/creer-application-avec-ia',
    heading: 'Créer une application avec l\'IA : la pire idée si tu veux qu\'elle rapporte',
    content: 'L\'IA génère une application en quelques heures, mais le revenu ne vient pas du code. Ce qu\'elle fait bien, ce qu\'elle ne peut pas décider à ta place (ce qui est payant, où se place l\'offre, le prix, la rétention), la dette de sécurité et de maintenance, et la bonne façon de l\'utiliser.',
  },
  {
    path: '/blog/pourquoi-applications-ne-rapportent-rien',
    heading: 'Pourquoi 90 % des applications ne rapportent rien (et comment éviter ça)',
    content: 'Modèle de revenu décidé trop tard, moment de valeur jamais atteint, offre mal placée, prix fixé au hasard, valeur qui ne se renouvelle pas, mauvais indicateurs suivis : les six raisons qui expliquent l\'absence de revenus d\'une application, et comment les corriger. Ce n\'est pas l\'idée qui décide, c\'est la conception.',
  },
  {
    path: '/blog/idee-application-business-rentable',
    heading: 'Comment transformer une idée d\'application en business rentable',
    content: 'De l\'idée au premier euro récurrent : formuler un problème payant, valider avant de développer, choisir le modèle de revenu avant la première ligne de code, construire un scénario chiffré prudent et mesurer les bons indicateurs. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/blog/application-par-abonnement',
    heading: 'Application par abonnement : comment ça marche et combien ça rapporte',
    content: 'Fonctionnement, revenu mensuel récurrent, formules mensuelles et annuelles, conversion et rétention : comment concevoir une application par abonnement qui transforme ses utilisateurs en clients qui restent.',
  },
  {
    path: '/blog/modele-economique-application-mobile',
    heading: 'Modèle économique d\'une application mobile : lequel choisir',
    content: 'Abonnement, freemium, achats intégrés ou publicité : comment choisir le modèle économique de ton application mobile selon la valeur qu\'elle apporte, la fréquence d\'usage et ton public. Le modèle ne suffit pas, la conception de la conversion fait la différence.',
  },
  {
    path: '/blog/combien-rapporte-application-mobile',
    heading: 'Combien rapporte une application mobile en 2026 ?',
    content: 'Combien rapporte réellement une application mobile en 2026 ? Le calcul du revenu (utilisateurs, conversion, prix, rétention), pourquoi la plupart des applications ne rapportent rien, et l\'exemple d\'une application que j\'ai conçue qui génère 13 000 € par mois.',
  },
  {
    path: '/blog/rentabiliser-application-mobile',
    heading: 'Comment rentabiliser une application mobile',
    content: 'Les modèles de revenus d\'une application mobile (abonnement, freemium, achats intégrés, publicité) et surtout ce qui fait la différence : la conception qui transforme tes utilisateurs en clients. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/blog/creation-application-mobile-toulouse',
    heading: 'Création d\'application mobile à Toulouse',
    content: 'Développeur d\'applications mobiles à Toulouse et en Occitanie. Je conçois ton application iOS et Android pour qu\'elle génère des revenus, pas juste pour exister, de la stratégie au lancement sur l\'App Store et Google Play. Une application que j\'ai conçue génère 13 000 € par mois.',
  },
  {
    path: '/blog/application-mobile-meilleur-investissement',
    heading: 'Créer une application mobile : le meilleur investissement en 2026 !',
    content: 'Une application mobile bien pensée peut devenir un actif business : revenus récurrents, valorisation, usage B2B ou B2C et coût d\'entrée plus accessible que beaucoup d\'autres investissements.',
  },
  {
    path: '/blog/combien-coute-application-mobile',
    heading: 'Combien coûte une application mobile en 2026 ?',
    content: 'Freelance, agence, no-code : combien faut-il réellement budgétiser pour créer une application mobile en 2026 ? Analyse complète des prix selon le type de projet et les acteurs du marché.',
  },
  {
    path: '/blog/creer-application-mobile-guide',
    heading: 'Comment créer une application mobile : le guide complet',
    content: 'De l\'idée au lancement sur les stores : guide complet pour créer une application mobile en 2026. Étapes, choix techniques, erreurs à éviter et bonnes pratiques pour réussir votre projet mobile.',
  },
  {
    path: '/blog/reprendre-application-mobile-existante',
    heading: 'Reprendre une application mobile existante',
    content: 'Votre application mobile est instable, abandonnée ou mal codée ? Découvrez comment reprendre une app existante : audit technique, plan d\'action et remise sur de bonnes bases pour la faire évoluer sereinement.',
  },
  {
    path: '/blog/faire-evoluer-application-mobile',
    heading: 'Comment faire évoluer une application mobile sans tout casser',
    content: 'Ajouter des fonctionnalités, réduire la dette technique, améliorer les performances : guide pratique pour faire évoluer votre application mobile sans tout casser ni repartir de zéro.',
  },
  {
    path: '/blog/mvp-application-mobile',
    heading: 'MVP application mobile : lancer vite sans sacrifier la qualité',
    content: 'Qu\'est-ce qu\'un MVP mobile, pourquoi en avoir un et comment le construire ? Guide complet pour lancer votre première version d\'application en 45 jours, valider votre idée et éviter les erreurs classiques.',
  },
  {
    path: '/blog/choisir-expert-application-mobile',
    heading: 'Comment choisir le bon expert pour créer votre application mobile',
    content: 'Freelance spécialisé, agence digitale ou no-code : comment choisir le bon partenaire pour créer votre application mobile ? Les critères essentiels, les questions à poser et les pièges à éviter.',
  },
]

// Verification du maillage avant generation : le build echoue si un article
// publie n'a pas assez de liens entrants.
const slugsPublies = blogRoutes
  .filter((r) => r.path !== '/blog')
  .map((r) => r.path.replace('/blog/', ''))
const tableLiens = verifierMaillage(slugsPublies)

// Titres et descriptions lus depuis src/Blog.jsx, jamais redefinis ici.
const metaArticles = lireMetaArticles()
verifierArticlesPublies(metaArticles, slugsPublies)
verifierAppelsAction(slugsPublies)
verifierLongueurs(metaArticles, slugsPublies)

// FAQ par article, pour le balisage FAQPage de chaque page de blog.
const faqParArticle = lireFaqArticles()
const sansFaq = slugsPublies.filter((s) => !faqParArticle[s])
if (sansFaq.length) {
  console.log(`  (info) ${sansFaq.length} article(s) sans FAQ : ${sansFaq.join(', ')}`)
} else {
  console.log(`✓ FAQ articles : ${slugsPublies.length} articles avec balisage FAQPage`)
}

const routeParSlug = Object.fromEntries(
  blogRoutes.filter((r) => r.path !== '/blog').map((r) => [r.path.replace('/blog/', ''), r])
)

for (const route of blogRoutes) {
  const slug = route.path.replace('/blog/', '')
  // Sur l'index du blog, le pre-rendu liste TOUS les articles : c'est la page
  // qui doit distribuer l'autorite vers le cluster. Sur un article, ce sont ses
  // articles lies.
  const liensLies = route.path === '/blog'
    ? blogRoutes.filter((r) => r.path !== '/blog')
    : (tableLiens[slug] || []).map((s) => routeParSlug[s]).filter(Boolean)

  const breadcrumb = [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": urlPublique('/blog') },
  ]
  if (route.path !== '/blog') {
    breadcrumb.push({ "@type": "ListItem", "position": 3, "name": route.heading, "item": urlPublique(route.path) })
  }

  // Les meta de l'article ecrasent celles du tableau : source unique.
  // `null` et non `{}` pour l'index du blog : un objet vide reste truthy, et
  // le spread plus bas ecrasait alors title/description avec undefined.
  // C'est exactement ce qui a produit <title>undefined</title> sur /blog/.
  const meta = route.path === '/blog' ? metaPagesSeo['/blog'] : metaArticles[slug]

  let html = patchHtml(baseHtml, {
    ...route,
    ...(meta ? { title: meta.title, description: meta.description } : {}),
    backLink: '← Retour au blog',
    backHref: urlPublique('/blog'),
    breadcrumb,
    liensLies,
    liensLiesTitre: route.path === '/blog' ? 'Tous les articles' : 'À lire aussi',
  })

  // Balisage local sur la page Toulouse.
  //
  // POURQUOI seulement celle-ci : « application mobile toulouse » est la
  // requete numero 1 du site en impressions (97, zero clic au dernier releve).
  // ProfessionalService avec `areaServed` dit explicitement a Google quelle
  // zone est desservie, ce qu'aucune autre page ne declare. Ne pas le poser
  // sur les pages nationales : un service local declare partout dilue le
  // signal au lieu de le renforcer.
  if (route.path === '/blog/creation-application-mobile-toulouse') {
    const localJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${urlPublique(route.path)}#service-local`,
      "name": "Noé Calmes, création d'application mobile à Toulouse",
      "description": "Conception et développement d'applications mobiles iOS et Android à Toulouse et en Occitanie, pensées pour générer des revenus.",
      "url": urlPublique(route.path),
      "provider": { "@id": "https://noecalmes.fr/#person" },
      "areaServed": [
        { "@type": "City", "name": "Toulouse" },
        { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
        { "@type": "AdministrativeArea", "name": "Occitanie" },
      ],
      "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressRegion": "Occitanie", "addressCountry": "FR" },
      "priceRange": "€€",
      "serviceType": ["Création d'application mobile", "Développement iOS et Android", "Reprise d'application existante"],
    }, null, 6)
    html = html.replace('</head>', `    <script type="application/ld+json">\n    ${localJson}\n    </script>\n  </head>`)
  }

  // Article structured data for individual blog posts (not the blog index)
  if (route.path !== '/blog') {
    // `author` pointe sur la fiche Person du site plutot que sur un simple
    // nom : Google relie ainsi l'article a l'entite Noe Calmes, ses profils
    // et son domaine d'expertise. C'est le signal E-E-A-T le plus direct.
    const articleJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": route.heading,
      "description": meta?.description || route.description,
      "author": { "@id": "https://noecalmes.fr/#person" },
      "publisher": { "@id": "https://noecalmes.fr/#person" },
      "mainEntityOfPage": urlPublique(route.path),
      "datePublished": meta?.date,
      "dateModified": meta?.date,
      "inLanguage": "fr-FR",
      "image": "https://noecalmes.fr/assets/images/meta/new-og-image.png",
    }, null, 6)
    html = html.replace('</head>', `    <script type="application/ld+json">\n    ${articleJson}\n    </script>\n  </head>`)

    // FAQPage de l'article. Les questions sont affichees sur la page (bloc
    // « Questions frequentes »), condition exigee par Google pour ce balisage.
    const faqArticle = faqParArticle[slug]
    if (faqArticle?.length) {
      html = html.replace('</head>', `    <script type="application/ld+json">\n    ${baliseFaq(faqArticle)}\n    </script>\n  </head>`)
    }
  }

  const routeDir = join(distDir, route.path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  pagesGenerees.push(join(routeDir, 'index.html'))
  declarerSitemap(route.path, {
    priority: route.path === '/blog' ? '0.8' : '0.9',
    changefreq: route.path === '/blog' ? 'weekly' : 'monthly',
    // Pour un article, la date de publication fait foi. Mettre la date du
    // build partout donnerait un sitemap ou tout a change le meme jour, signal
    // que Google considere comme peu fiable et finit par ignorer.
    lastmod: route.path === '/blog' ? dateBuild : (meta?.date || dateBuild),
  })
  console.log(`✓ Generated ${route.path}/index.html`)
}

// ─── Pages quizz ─────────────────────────────────────────────────────────────
//
// Meta et copie de pre-rendu lues depuis `src/Quiz.jsx` : source unique, meme
// regle que pour les articles et les pages SEO.
//
// Le pre-rendu porte l'intro ET les sections de fond, PAS les questions. Le
// contenu qui doit ranker est le texte, pas le formulaire : un robot qui ne
// rend pas le JavaScript doit quand meme lire un vrai article.
function lireQuizzes() {
  const src = readFileSync(join(__dirname, '..', 'src', 'Quiz.jsx'), 'utf-8')
  const bloc = src.match(/export const QUIZZES = \[([\s\S]*?)\n\]\n/)
  if (!bloc) throw new Error('QUIZZES introuvable dans src/Quiz.jsx')

  const quizzes = []
  const morceaux = bloc[1].split(/\n  \{\n    slug: /).slice(1)
  for (const morceau of morceaux) {
    const champ = (nom) => {
      const m = morceau.match(new RegExp(`${nom}: "((?:[^"\\\\]|\\\\.)*)"`))
      return m ? m[1].replace(/\\(["'])/g, '$1') : null
    }
    const slug = morceau.match(/^'([^']+)'/)?.[1]
    const intro = [...(morceau.match(/intro: \[([\s\S]*?)\n    \]/)?.[1] || '').matchAll(/"((?:[^"\\]|\\.)*)"/g)]
      .map((m) => m[1].replace(/\\(["'])/g, '$1'))
    const contenu = [...(morceau.match(/contenu: \[([\s\S]*?)\n    \],?\n  \}/)?.[1] || '').matchAll(/h2: "((?:[^"\\]|\\.)*)",\s*\n\s*p: "((?:[^"\\]|\\.)*)"/g)]
      .map((m) => ({ h2: m[1].replace(/\\(["'])/g, '$1'), p: m[2].replace(/\\(["'])/g, '$1') }))

    if (!slug || !champ('metaTitle')) throw new Error(`Quizz mal lu : ${slug || '?'}`)
    quizzes.push({
      slug,
      title: champ('metaTitle'),
      description: champ('description'),
      heading: champ('h1'),
      intro,
      contenu,
    })
  }
  if (!quizzes.length) throw new Error('Aucun quizz lu depuis src/Quiz.jsx')
  return quizzes
}

const quizzes = lireQuizzes()

// title/description lus depuis src/Quiz.jsx (PageQuizHub).
const quizHub = {
  path: '/quiz',
  ...metaPagesSeo['/quiz'],
  heading: "Teste ton projet d'application avant d'investir",
  content: "Trois tests courts pour répondre aux questions qui reviennent avant tout projet d'application : est-ce que j'en ai vraiment besoin, est-ce qu'un site web ne suffirait pas, et quel budget prévoir. Sans inscription, réponse immédiate.",
}

const hubHtml = patchHtml(baseHtml, {
  ...quizHub,
  breadcrumb: [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": "Tests", "item": urlPublique('/quiz') },
  ],
  liensLies: quizzes.map((q) => ({ path: `/quiz/${q.slug}`, heading: q.heading })),
  liensLiesTitre: 'Les tests',
})
mkdirSync(join(distDir, quizHub.path), { recursive: true })
writeFileSync(join(distDir, quizHub.path, 'index.html'), hubHtml)
pagesGenerees.push(join(distDir, quizHub.path, 'index.html'))
declarerSitemap(quizHub.path, { priority: '0.8', changefreq: 'monthly', lastmod: dateBuild })
console.log(`✓ Generated ${quizHub.path}/index.html`)

for (const quiz of quizzes) {
  const chemin = `/quiz/${quiz.slug}`
  // Le pre-rendu reprend l'intro puis les sections de fond, pour que le HTML
  // servi contienne le meme contenu de fond que la page rendue.
  const corps = [...quiz.intro, ...quiz.contenu.map((c) => `${c.h2}. ${c.p}`)].join(' ')

  const html = patchHtml(baseHtml, {
    path: chemin,
    title: quiz.title,
    description: quiz.description,
    heading: quiz.heading,
    content: corps,
    backLink: '← Tous les tests',
    backHref: urlPublique('/quiz'),
    breadcrumb: [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Tests", "item": urlPublique('/quiz') },
      { "@type": "ListItem", "position": 3, "name": quiz.heading, "item": urlPublique(chemin) },
    ],
    liensLies: quizzes.filter((q) => q.slug !== quiz.slug).map((q) => ({ path: `/quiz/${q.slug}`, heading: q.heading })),
    liensLiesTitre: 'Les autres tests',
  })

  mkdirSync(join(distDir, chemin), { recursive: true })
  writeFileSync(join(distDir, chemin, 'index.html'), html)
  pagesGenerees.push(join(distDir, chemin, 'index.html'))
  declarerSitemap(chemin, { priority: '0.8', changefreq: 'monthly', lastmod: dateBuild })
  console.log(`✓ Generated ${chemin}/index.html`)
}

// ─── Audit app route — landing dediee /audit-app ─────────────────────────────

// title/description viennent de src/audit-app/AuditApp.jsx : ne pas les
// redefinir ici, ils seraient ignores.
const auditAppRoute = {
  path: '/audit-app',
  heading: 'Tester ton idée d\'application mobile',
  content: 'Réponds à quelques questions et obtiens une première lecture claire avant d\'investir dans le développement : potentiel, budget réaliste, délai, et si ton idée peut générer des revenus.',
  ogImage: 'https://noecalmes.fr/assets/images/meta/audit-app-og.png',
  ogImageAlt: 'Audit gratuit pour tester si ton idée d\'application mobile peut générer des revenus.',
}

const auditHtml = patchHtml(baseHtml, {
  ...auditAppRoute,
  ...(metaPagesSeo['/audit-app'] || {}),
  breadcrumb: [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://noecalmes.fr/" },
    { "@type": "ListItem", "position": 2, "name": auditAppRoute.heading, "item": urlPublique(auditAppRoute.path) },
  ],
})
const auditDir = join(distDir, auditAppRoute.path)
mkdirSync(auditDir, { recursive: true })
writeFileSync(join(auditDir, 'index.html'), auditHtml)
pagesGenerees.push(join(auditDir, 'index.html'))
declarerSitemap(auditAppRoute.path, { priority: '0.9', changefreq: 'monthly', lastmod: dateBuild })
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
  '/maquette/pet-solidarite',
  '/maquette/sonora',
  '/maquette/guestride',
  '/maquette/juridik',
]

for (const path of mockupRoutes) {
  let html = retirerFaqPage(baseHtml)
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  )
  html = html.replace(/<title>[^<]*<\/title>/, `<title>Maquettes visuelles — Noé Calmes</title>`)
  const routeDir = join(distDir, path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  pagesGenerees.push(join(routeDir, 'index.html'))
  console.log(`✓ Generated ${path}/index.html (mockup noindex)`)
}

// ─── Legacy routes — noindex (old URLs that may still be indexed by Google) ──

const legacyRoutes = ['/a-propos', '/offre', '/contact', '/merci']
const noindexRoutes = ['/avis', '/rendez-vous', '/mentions', '/privacy', '/cgv', '/documents', '/contactnoe', '/legal', '/espace-client', '/maquette-visuel', ...legacyRoutes]

for (const path of noindexRoutes) {
  let html = retirerFaqPage(baseHtml)
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />'
  )
  html = html.replace(/<title>[^<]*<\/title>/, `<title>Noé Calmes</title>`)

  const routeDir = join(distDir, path)
  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), html)
  pagesGenerees.push(join(routeDir, 'index.html'))
  const isLegacy = legacyRoutes.includes(path)
  console.log(`✓ Generated ${path}/index.html (${isLegacy ? 'legacy noindex' : 'noindex'})`)
}

// ─── Home page — pre-render hero for Lighthouse FCP ──────────────────────────

// Le FAQPage de la home est reecrit depuis FAQ_ITEMS : la home affiche les 3
// premieres questions (App.jsx fait `FAQ_ITEMS.slice(0, 3)`), le balisage doit
// dire exactement la meme chose. Avant, index.html portait 3 questions
// reformulees a la main qui ne correspondaient plus au texte visible.
const homeFaqJson = baliseFaq(faqItems.slice(0, 3))
const baseHome = retirerFaqPage(baseHtml).replace(
  '</head>',
  `    <script type="application/ld+json">\n    ${homeFaqJson}\n    </script>\n  </head>`
)

// Liens du pre-rendu en forme canonique : sans la barre finale, chacun coute
// une 301 a chaque passage de robot.
const navHome = ['/expertise', '/creation-application-mobile', '/projets', '/blog', '/audit-app', '/faq']
const libelles = {
  '/expertise': 'Concevoir une application qui rapporte',
  '/creation-application-mobile': 'Ma méthode',
  '/projets': 'Les applications que j\'ai conçues',
  '/blog': 'Blog',
  '/audit-app': 'Tester ton idée',
  '/faq': 'FAQ',
}
const navHomeHtml = navHome.map((p) => `<a href="${urlPublique(p)}">${libelles[p]}</a>`).join(' · ')

const homeHtml = baseHome.replace(
  '<div id="root"></div>',
  `<div id="root"><div style="max-width:700px;margin:40px auto;padding:0 20px;font-family:Inter,sans-serif;visibility:hidden" aria-hidden="true"><h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin-bottom:1rem">Je transforme ton idée en app qui génère des revenus.</h1><p style="font-size:1rem;color:#555;margin-bottom:1.5rem">Je ne fais pas que développer ton application : je la conçois pour qu'elle génère des revenus. Une application que j'ai conçue fait 13 000 €/mois. Plus de 20 applications publiées.</p><a href="${urlPublique('/audit-app')}" style="display:inline-block;background:#6760ff;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600">Tester mon idée d'application</a><nav aria-label="Pages du site" style="margin-top:1.5rem;font-size:0.85rem">${navHomeHtml}</nav></div></div>`
)
writeFileSync(join(distDir, 'index.html'), homeHtml)
pagesGenerees.push(join(distDir, 'index.html'))
declarerSitemap('/', { priority: '1.0', changefreq: 'weekly', lastmod: dateBuild })
console.log('✓ Injected pre-rendered content into home index.html')

// ─── Sitemap genere ──────────────────────────────────────────────────────────
//
// Le sitemap etait maintenu a la main dans `public/sitemap.xml`, et le process
// de publication documente demandait de ne pas oublier d'y ajouter chaque
// nouvelle URL. Resultat previsible : /projets, en ligne depuis des mois,
// n'y figurait pas. Il est desormais derive des pages reellement generees.
//
// Les URLs sont ecrites par `urlPublique()`, donc toujours avec la barre
// finale, en accord avec la canonique de chaque page. C'est la moitie du
// correctif du 08/08/2026 : un sitemap qui pointe sur une URL qui redirige
// envoie Google dans une boucle.
// `public/sitemap.xml` a ete supprime le 20/08/2026 : il etait copie tel quel
// dans dist par Vite puis ecrase ici, ce qui laissait un fichier obsolete dans
// le depot et invitait a l'editer pour rien.
urlsSitemap.sort((a, b) => (b.priority.localeCompare(a.priority)) || a.loc.localeCompare(b.loc))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsSitemap.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
console.log(`✓ Sitemap genere : ${urlsSitemap.length} URLs`)

// Un doublon dans le sitemap signale presque toujours un alias declare deux
// fois. On echoue plutot que de le laisser passer.
const doublons = urlsSitemap.map((u) => u.loc).filter((l, i, t) => t.indexOf(l) !== i)
if (doublons.length) {
  console.error(`\n✗ URLs en double dans le sitemap : ${[...new Set(doublons)].join(', ')}\n`)
  process.exit(1)
}

// ─── Controle final : aucun lien interne sans barre finale ───────────────────
//
// C'est le garde-fou qui ferme le sujet ouvert le 08/08/2026. Un lien interne
// sans barre finale pointe sur une URL que GitHub Pages sert en 301. Multiplie
// par le nombre de pages, ca donne un maillage qui pointe partout sur des
// redirections, ce qui brouille la version canonique et gaspille le budget de
// crawl. On verifie donc le HTML REELLEMENT genere, pas les intentions du code.
//
// Sont ignores : les ancres (#), les fichiers avec extension, les assets, et
// les liens externes.
function liensSansBarre(html) {
  const trouves = new Set()
  const motif = /href="((?:https:\/\/noecalmes\.fr)?\/[^"#?]*)"/g
  for (const m of html.matchAll(motif)) {
    const url = m[1]
    const chemin = url.replace('https://noecalmes.fr', '')
    if (chemin === '/' || chemin.endsWith('/')) continue
    if (chemin.startsWith('/assets/')) continue
    if (/\.[a-z0-9]{2,5}$/i.test(chemin)) continue
    trouves.add(url)
  }
  return [...trouves]
}

const fautes = []
for (const fichier of pagesGenerees) {
  const html = readFileSync(fichier, 'utf-8')
  const mauvais = liensSansBarre(html)
  if (mauvais.length) fautes.push(`${fichier.replace(distDir, '')} : ${mauvais.join(', ')}`)
}

if (fautes.length) {
  console.error('\n✗ Liens internes sans barre finale (chacun = une redirection 301) :')
  for (const f of fautes) console.error(`  - ${f}`)
  console.error('\nUtilise lienInterne() / urlPublique() au lieu d\'ecrire le chemin a la main.\n')
  process.exit(1)
}
console.log(`✓ Liens internes verifies : ${pagesGenerees.length} pages, aucune redirection interne`)

console.log('Done! All route pages generated.')
