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
