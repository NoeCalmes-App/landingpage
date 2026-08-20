// Helpers SEO partages entre App.jsx, Blog.jsx et les pages generees.
//
// POURQUOI CE FICHIER EXISTE (regression du 20/08/2026)
//
// Le 8 aout 2026, une boucle de canonique a ete corrigee dans
// `scripts/generate-routes.js` : les pages sont ecrites en `chemin/index.html`,
// donc GitHub Pages les sert a `/chemin/` et repond a `/chemin` par une 301.
// Une canonique sans barre finale pointe donc sur une URL qui redirige vers la
// page elle-meme, ce que Search Console signale en « erreur liee a des
// redirections ». C'est ce qui a tenu 27 pages hors de Google de mars a aout.
//
// Le correctif n'avait ete applique qu'au HTML genere au build. Or Google
// execute le JavaScript : a l'hydratation, React reecrivait la balise
// canonique SANS barre finale (App.jsx et Blog.jsx), et le DOM rendu, celui
// que Google indexe reellement, repartait en boucle. Verifie en direct le
// 20/08/2026 sur `/blog/rentabiliser-application-mobile/` : HTML servi correct,
// DOM rendu casse.
//
// Regle : plus aucune URL absolue ni aucun lien interne n'est ecrit a la main.
// Tout passe par `urlPublique()` ou `lienInterne()`.

export const ORIGINE = 'https://noecalmes.fr'

// URL publique absolue d'un chemin, TOUJOURS avec la barre finale.
export function urlPublique(path) {
  return `${ORIGINE}${lienInterne(path)}`
}

// Chemin interne normalise, TOUJOURS avec la barre finale.
// Utilise pour tous les `href` du site : un lien sans barre coute une 301 a
// chaque passage de robot, et un maillage qui pointe partout sur des
// redirections brouille la version canonique.
export function lienInterne(path) {
  if (!path || path === '/') return '/'
  const propre = path.replace(/\/+$/, '')
  return `${propre.startsWith('/') ? propre : `/${propre}`}/`
}

// Chemin courant normalise, sans barre finale, pour le routage interne.
export function cheminCourant(path = window.location.pathname) {
  return path.replace(/\/+$/, '') || '/'
}

function poserBalise(selecteur, creer) {
  let el = document.head.querySelector(selecteur)
  if (!el) {
    el = creer()
    document.head.appendChild(el)
  }
  return el
}

// hreflang auto-referent. Le site est monolingue (fr-FR) : ces balises ne font
// pas ranker, elles declarent explicitement la langue et l'URL canonique de
// reference pour les moteurs et evitent qu'une autre version soit supposee.
// Le jour ou une version anglaise existe, c'est ici qu'on ajoute la ligne `en`.
export function poserHreflang(path) {
  const href = urlPublique(path)
  for (const lang of ['fr-fr', 'x-default']) {
    const el = poserBalise(`link[rel="alternate"][hreflang="${lang}"]`, () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'alternate')
      l.setAttribute('hreflang', lang)
      return l
    })
    el.setAttribute('href', href)
  }
}

// Point d'entree unique pour la mise a jour des meta cote client.
// Ecrit title, description, canonique, Open Graph, Twitter et hreflang, tous
// alignes sur la MEME URL canonique (barre finale comprise).
export function appliquerMeta({ path, title, description, ogImage }) {
  const url = urlPublique(path)

  if (title) document.title = title

  const meta = (attr, nom, valeur) => {
    if (!valeur) return
    const el = poserBalise(`meta[${attr}="${nom}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute(attr, nom)
      return m
    })
    el.setAttribute('content', valeur)
  }

  meta('name', 'description', description)
  meta('property', 'og:title', title)
  meta('property', 'og:description', description)
  meta('property', 'og:url', url)
  meta('name', 'twitter:title', title)
  meta('name', 'twitter:description', description)
  if (ogImage) {
    meta('property', 'og:image', ogImage)
    meta('name', 'twitter:image', ogImage)
  }

  const canonique = poserBalise('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  })
  canonique.setAttribute('href', url)

  poserHreflang(path)
}

// Le bloc pre-rendu (`[data-seo-prerender]`) sert aux robots qui n'executent
// pas le JavaScript. Une fois React monte, il fait doublon : deux <h1>
// identiques dans le DOM, et un pave de texte cache en `left:-10000px` que
// Google deprecie et peut lire comme une tentative de dissimulation. On le
// retire donc des que le vrai contenu est affiche.
export function retirerPrerender() {
  document.querySelectorAll('[data-seo-prerender]').forEach((el) => el.remove())
}
