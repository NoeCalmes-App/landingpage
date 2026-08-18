// Le composant qui rend un logo à sa taille optiquement corrigée.
//
// Séparé des DONNÉES (`iconesDocument.js`) : un fichier qui exporte à la fois
// un composant et des constantes casse le rafraîchissement à chaud de Vite.

import { ICONES } from './iconesDocument.js'

export { ICONES }

/**
 * Un logo, à la taille demandée, optiquement aligné sur les autres.
 *
 * `taille` est la taille CIBLE commune ; l'échelle du logo l'ajuste. On passe
 * donc partout la même valeur, sans avoir à se souvenir des corrections.
 */
export function IconeMarque({ icone, taille, className = '' }) {
  const cote = Math.round(taille * icone.echelle)
  return (
    <img
      src={icone.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`object-contain ${className}`}
      style={{ width: cote, height: cote }}
    />
  )
}
