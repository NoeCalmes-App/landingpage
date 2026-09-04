// LES ADRESSES DE L'ESPACE DOCUMENTS, hors des composants.
//
// Fichier séparé de `Documents.jsx` pour la même raison que `iconesDocument.js` :
// un module qui exporte un composant ET des fonctions casse le rafraîchissement
// à chaud de Vite. Ici ne vivent que les adresses et la façon de les résoudre ;
// la liste des documents, elle, reste avec la page qui l'affiche.
//
// DEUX NIVEAUX, ET C'EST VOULU :
//
//   /documents              → le sommaire : les familles de documents
//   /documents/app-mobile   → les accès à créer pour un projet d'application
//
// `/documents` ne redirige donc PAS vers `/documents/app-mobile`. C'est
// l'adresse générique, celle qu'on retient et qu'on tape de mémoire : elle doit
// mener à un endroit qui tient encore quand une deuxième famille de documents
// arrivera à côté de l'application mobile.

/** Le sommaire. Adresse générique, stable, celle qu'on donne de vive voix. */
export const ROUTE_DOCUMENTS = '/documents'

/** Le singulier et les abréviations viennent tout seuls : elles mènent au sommaire. */
export const ALIAS_DOCUMENTS = ['/document', '/docs', '/doc']

/**
 * LA FAMILLE « CRÉATION D'APPLICATION MOBILE ». C'est cette adresse qui est
 * collée dans les devis et dans les PDF ; les routes des guides en découlent,
 * aucune n'est réécrite à la main.
 */
export const ROUTE_APP_MOBILE = '/documents/app-mobile'

/**
 * LES ADRESSES QUI MÈNENT À CETTE FAMILLE SANS ÊTRE LA BONNE : la variante
 * sans tiret, et le raccourci `/mobile`. Le routeur les réécrit en
 * `ROUTE_APP_MOBILE` sans recharger, donc un lien copié depuis la page est
 * toujours le bon. Un client bloqué sur une 404 n'insiste pas, il attend — et
 * c'est justement la page qui débloque le développement.
 */
export const ALIAS_APP_MOBILE = ['/documents/appmobile', '/mobile']

/**
 * LES GUIDES, par identifiant. La route de chacun est ROUTE_APP_MOBILE/<id> :
 * une seule façon de la fabriquer, ici, pour que `Documents.jsx` (qui les
 * affiche) et `scripts/generate-routes.js` (qui écrit leurs dossiers dans
 * `dist/`) ne puissent pas diverger.
 *
 * ⚠️ POURQUOI LE BUILD DOIT LES ÉCRIRE. Ces adresses sont collées dans des
 * devis et des PDF déjà envoyés. Sans dossier à servir, l'hébergeur répond
 * 404 : la page finit par s'afficher grâce au script de rattrapage du
 * `404.html`, mais Google, lui, voit un 404 et le client voit passer une
 * page d'erreur. Un guide ajouté ici est donc servi le jour même.
 */
export const IDS_GUIDES = ['nom-de-domaine', 'new-membre', 'google-play-console', 'apple-developer', 'flutter-firebase']

/** La route canonique d'un guide. */
export function routeGuide(id) {
  return `${ROUTE_APP_MOBILE}/${id}`
}

export const ROUTES_GUIDES = IDS_GUIDES.map(routeGuide)

/**
 * LA FAMILLE « SITE WEB », deuxième du sommaire.
 *
 * POURQUOI UNE FAMILLE À PART ET PAS UNE CARTE DE PLUS SOUS `app-mobile`. Un
 * client qui vient pour un site vitrine n'a ni Firebase, ni Google Play, ni
 * Apple à créer : lui montrer trois cartes qui ne le concernent pas lui fait
 * douter de la quatrième, la seule qui le concerne. Et le guide du domaine
 * n'est pas le même des deux côtés — celui du mobile justifie l'achat par la
 * licence Apple, ce qui ne veut rien dire ici.
 */
export const ROUTE_APP_WEB = '/documents/app-web'

/** Les raccourcis qu'on tape ou qu'on recopie de travers. */
export const ALIAS_APP_WEB = ['/documents/appweb', '/documents/site-web', '/appweb', '/site-web', '/web']

/**
 * Les guides de la famille site web. Le nom de domaine y a le MÊME
 * identifiant que dans l'autre famille — deux documents distincts, deux PDF
 * distincts, mais le même sujet : c'est la route complète qui les sépare, pas
 * une astuce de nommage.
 */
export const IDS_GUIDES_WEB = ['nom-de-domaine']

/** La route canonique d'un guide de la famille site web. */
export function routeGuideWeb(id) {
  return `${ROUTE_APP_WEB}/${id}`
}

export const ROUTES_GUIDES_WEB = IDS_GUIDES_WEB.map(routeGuideWeb)

/**
 * Les adresses d'AVANT le déménagement sous `/documents/app-mobile`, servies
 * elles aussi : elles vivent dans des devis signés, elles ne peuvent pas
 * cesser de répondre. Le routeur les réécrit en canonique une fois la page
 * affichée (`anciennesRoutes` de chaque document, dans `Documents.jsx`).
 */
export const ANCIENNES_ROUTES_GUIDES = [
  '/new-membre',
  '/google-play-console',
  '/apple-developer',
  '/documents/flutter-firebase',
]

/** Chemin comparable : sans barre finale, en minuscules. */
function normaliser(chemin) {
  return (chemin || '').replace(/\/+$/, '').toLowerCase() || '/'
}

/** Vrai si l'adresse donnée doit afficher le SOMMAIRE des documents. */
export function estRouteDocuments(chemin) {
  const propre = normaliser(chemin)
  return propre === ROUTE_DOCUMENTS || ALIAS_DOCUMENTS.includes(propre)
}

/** Vrai si l'adresse donnée doit afficher la liste des accès à créer. */
export function estRouteAppMobile(chemin) {
  const propre = normaliser(chemin)
  return propre === ROUTE_APP_MOBILE || ALIAS_APP_MOBILE.includes(propre)
}

/** Vrai si l'adresse donnée doit afficher la famille « site web ». */
export function estRouteAppWeb(chemin) {
  const propre = normaliser(chemin)
  return propre === ROUTE_APP_WEB || ALIAS_APP_WEB.includes(propre)
}

/**
 * Retrouve un document par son adresse, ACTUELLE OU ANCIENNE.
 *
 * Les adresses des guides sont collées dans des devis déjà envoyés et dans des
 * PDF déjà signés : elles ne peuvent pas cesser de fonctionner parce que la
 * page a déménagé sous `/documents/app-mobile`. Chaque document porte donc ses
 * `anciennesRoutes`, et c'est le routeur qui remet l'adresse canonique dans la
 * barre une fois le bon guide affiché.
 */
export function trouverDocument(documents, chemin) {
  const propre = normaliser(chemin)
  return (
    documents.find(
      (d) =>
        normaliser(d.route) === propre ||
        (d.anciennesRoutes || []).some((r) => normaliser(r) === propre)
    ) || null
  )
}
