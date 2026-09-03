// Les logos de marque, à taille optiquement égale.
//
// LE PROBLÈME A ÉTÉ RÉGLÉ À LA SOURCE, le 18 août 2026. Les fichiers SVG
// déclaraient un viewBox bien plus large que leur dessin : Firebase n'occupait
// que 61 % de son cadre en largeur, Apple 79 %, Gmail 76 % en hauteur, quand
// WhatsApp touchait les quatre bords. Posés dans des cadres identiques avec
// `object-contain`, ils paraissaient donc de tailles très différentes — et
// décentrés, puisque le vide n'était pas réparti symétriquement.
//
// La boîte réelle de chaque dessin a été calculée (échantillonnage des courbes
// de Bézier), et le `viewBox` des fichiers recadré dessus. Ils remplissent
// maintenant tous leur cadre et se centrent d'eux-mêmes.
//
// L'ÉCHELLE EST DONC À 1 PARTOUT, sauf une exception documentée plus bas.
// J'avais d'abord réduit les formes pleines (disque WhatsApp, tuile Outlook)
// en pensant compenser leur poids visuel : c'était une correction en trop.
// Le recadrage suffisait, et WhatsApp se retrouvait plus petit que Gmail.
// Quand la mesure a réglé le problème, il ne faut pas rajouter du réglage
// par-dessus.

const BASE = '/assets/icons/document'

export const ICONES = {
  // PAS UN LOGO DE MARQUE, et c'est le seul. Le guide du nom de domaine
  // renvoie chez OVHcloud, mais la carte ne porte pas leur logo : le domaine
  // s'achète où le client veut, et un logo sur la carte se lirait comme une
  // obligation. Un globe dit « adresse web » sans engager personne. Dessiné
  // dans la couleur de marque, il tient sa place à côté des vrais logos.
  domaine: { src: `${BASE}/Domaine.svg`, echelle: 1 },
  firebase: { src: `${BASE}/Firebase.svg`, echelle: 1 },
  android: { src: `${BASE}/Android.svg`, echelle: 1 },
  gmail: { src: `${BASE}/Mail.svg`, echelle: 1 },
  // L'enveloppe de l'application mail est très large et sans détail : elle
  // occupe le regard plus que les logos voisins. Légèrement réduite.
  appMail: { src: `${BASE}/App-mail.svg`, echelle: 0.92 },
  whatsapp: { src: `${BASE}/Whatsapp.svg`, echelle: 1 },
  outlook: { src: `${BASE}/microsoft-outlook-icon.svg`, echelle: 1 },
  yahoo: { src: `${BASE}/Yahoo.svg`, echelle: 1 },
  // SEULE EXCEPTION. La pomme est une silhouette pleine, haute et étroite :
  // à cadre égal elle remplit toute la hauteur là où les logos larges
  // remplissent la largeur, et elle paraît donc plus grosse. Réduite pour
  // peser autant que les autres.
  apple: { src: `${BASE}/Apple.svg`, echelle: 0.86 },
}
