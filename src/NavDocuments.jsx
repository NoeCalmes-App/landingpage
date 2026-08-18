// La barre de navigation des pages Documents / Légal / Contact.
//
// EXTRAITE LE 18 AOÛT 2026. Elle était recopiée à l'identique dans trois
// fichiers : changer un onglet demandait trois modifications, et une seule
// oubliée donnait une navigation différente selon la page où on arrivait.
//
// PLUS AUCUN ONGLET. « Contact » puis « Légal » ont été retirés : sur une page
// qui demande TROIS actions au client, deux onglets qui mènent ailleurs sont
// autant d'occasions de partir sans les faire. Les deux pages existent
// toujours, `/contactnoe` et `/legal`, atteignables par leur adresse et depuis
// le pied de page du site.
//
// Il ne reste que les deux moyens de JOINDRE Noé, à droite : un client bloqué
// dans une étape doit pouvoir demander de l'aide sans quitter la page.

import { useState } from 'react'
import EmailModal from './EmailModal.jsx'
import { ICONES, IconeMarque } from './iconesDocument.jsx'

/** Le numéro de Noé, aligné sur `App.jsx`. */
export const WHATSAPP_NUMBER = '33658308210'

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/** La photo de Noé, la même que la navbar du site et que le chatbot. */
const PHOTO_NOE = '/assets/images/profile/me.webp'

/** Taille cible des deux logos. `IconeMarque` applique la correction optique
 *  propre à chacun : une seule valeur ici, et ils se voient identiques. */
const TAILLE_ICONE = 20
/** Gabarit des deux pastilles. `border-box` : la bordure du bouton e-mail ne
 *  l'agrandit donc pas par rapport au bouton WhatsApp. */
const PASTILLE = 'flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e5e5] bg-white transition-colors hover:bg-[#f5f5f5]'

function NavDocuments() {
  // La fenêtre e-mail est la MÊME que celle de la page Contact et du pied de
  // page : Gmail, Outlook, Yahoo, application mail, et la copie de l'adresse.
  // Une seule définition, dans `EmailModal.jsx`.
  const [emailOuvert, setEmailOuvert] = useState(false)

  return (
    // LA MARGE S'ÉLARGIT AVEC L'ÉCRAN. La barre traverse toute la largeur, le
    // contenu en dessous est borné à `max-w-4xl` : à 20 px des bords sur un
    // grand écran, le nom se retrouvait très loin à gauche du premier texte de
    // la page. Sur mobile la marge reste courte, la place y est comptée.
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-[#e5e5e5] px-5 md:px-8 lg:px-11 py-3 flex items-center justify-between">
      {/* LE VISAGE AVANT LE NOM. Ces pages sont ouvertes par un client qui
          vient de signer : il reconnaît la photo avant de lire le nom, et
          l'étape administrative reste rattachée à quelqu'un. C'est la même
          photo que la navbar du site et que le chatbot — un autre portrait ici
          casserait la reconnaissance. */}
      <a href="/" className="flex items-center gap-2.5 min-w-0 hover:opacity-70 transition-opacity">
        <img
          src={PHOTO_NOE}
          alt=""
          aria-hidden="true"
          width="36"
          height="36"
          className="h-9 w-9 rounded-full object-cover shrink-0"
        />
        <span className="font-heading text-text font-bold text-[0.95rem] truncate">
          Noé Calmes
        </span>
      </a>

      {/* Les deux canaux de contact, à droite : WhatsApp d'abord (c'est là
          que mène tout le funnel), l'e-mail ensuite pour ceux qui préfèrent
          l'écrit. Ils remplacent l'ancien onglet « Contact », qui coûtait un
          clic de plus pour arriver aux mêmes liens.
          MÊME GABARIT ET MÊME TAILLE D'ICÔNE pour les deux : la pastille en
          `h-11 w-11`, le pictogramme en `TAILLE_ICONE`. Deux valeurs
          différentes côte à côte se lisent comme une hiérarchie qui n'existe
          pas, et l'écart se voit même à deux pixels près. La constante partagée
          empêche qu'elles redivergent. */}
      <div className="flex items-center gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Écrire à Noé sur WhatsApp"
          title="Écrire à Noé sur WhatsApp"
          className={PASTILLE}
        >
          <IconeMarque icone={ICONES.whatsapp} taille={TAILLE_ICONE} />
        </a>

        <button
          type="button"
          onClick={() => setEmailOuvert(true)}
          aria-label="Envoyer un email à Noé"
          title="Envoyer un email à Noé"
          className={`${PASTILLE} cursor-pointer`}
        >
          <IconeMarque icone={ICONES.gmail} taille={TAILLE_ICONE} />
        </button>
      </div>

      {emailOuvert && <EmailModal onClose={() => setEmailOuvert(false)} />}
    </div>
  )
}

export default NavDocuments
