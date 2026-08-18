import { useState, useEffect } from 'react'

// Les téléphones n'affichent pas un PDF dans une `<iframe>` : iOS rend une
// page figée et non défilable, Android ouvre un lecteur externe. D'où une vue
// séparée — pas une redirection, voir plus bas.
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

/**
 * Le bouton qui copie l'adresse à inviter.
 *
 * POURQUOI PAS SEULEMENT DANS LE PDF. Une adresse écrite dans un PDF ne se
 * copie pas au doigt sur mobile, et une adresse retapée à la main finit par
 * avoir une faute : le client invite une adresse qui n'existe pas, ne voit
 * aucune erreur, et Noé attend un accès qui n'arrivera jamais.
 */
function BoutonCopier({ email, className = '' }) {
  const [copie, setCopie] = useState(false)

  const copier = () => {
    navigator.clipboard.writeText(email)
    setCopie(true)
    setTimeout(() => setCopie(false), 2000)
  }

  return (
    <button
      onClick={copier}
      title="Copier l'adresse"
      className={`flex min-w-0 items-center gap-2 rounded-[10px] border border-brand-pale bg-white px-2.5 sm:px-3 py-1.5 font-mono text-[0.78rem] sm:text-[0.85rem] text-text hover:bg-[#fafaff] transition-colors cursor-pointer ${className}`}
    >
      <span className="truncate">{email}</span>
      {copie ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

/** La flèche « retour », identique sur les deux vues. */
function BoutonRetour({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-brand font-semibold text-sm hover:opacity-70 transition-opacity cursor-pointer shrink-0"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Retour
    </button>
  )
}

/** L'icône de téléchargement. Le mot disparaît sous 640 px : la barre porte
 *  aussi l'adresse à copier, seul élément qui ne peut pas se raccourcir. */
function BoutonTelecharger({ pdf }) {
  return (
    <a
      href={pdf}
      download
      aria-label="Télécharger le PDF"
      title="Télécharger le PDF"
      className="flex items-center gap-1.5 text-brand font-semibold text-sm hover:opacity-70 transition-opacity shrink-0"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="hidden sm:inline">Télécharger</span>
    </a>
  )
}

/**
 * LE PDF REMPLACE CETTE PAGE DANS L'HISTORIQUE, il ne s'ajoute pas derrière.
 *
 * `location.href` empilait une entrée : reculer depuis le PDF ramenait sur
 * `/new-membre`, qui redirigeait aussitôt vers le PDF. On tournait en rond,
 * sans jamais revenir à la liste. `location.replace` écrase l'entrée du guide
 * par celle du PDF : le cran précédent est `/documents`, et un seul retour y
 * ramène.
 *
 * Le PDF s'affiche donc en plein écran dans le lecteur du téléphone, sans
 * barre à nous — c'est assumé : une `<iframe>` de PDF ne défile pas sur iOS,
 * et l'y enfermer serait pire que ne rien afficher.
 */
function Document({ doc, onBack }) {
  useEffect(() => {
    if (isMobile) window.location.replace(doc.pdf)
  }, [doc.pdf])

  if (isMobile) return null

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* UNE SEULE BARRE : Retour à gauche, l'adresse au centre, Télécharger
          à droite. Le titre du document a sauté, il est déjà écrit en haut du
          PDF juste en dessous. Et l'adresse occupait sa propre bande sous
          l'en-tête : deux barres empilées pour trois éléments, autant de
          hauteur en moins pour le document lui-même. */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e5e5] px-5 md:px-8 lg:px-11 py-4 flex items-center justify-between gap-4">
        <BoutonRetour onBack={onBack} />

        {/* Seuls les guides qui demandent une invitation la portent : le
            document d'explication « Flutter & Firebase » n'a personne à
            inviter, et une adresse affichée là serait du bruit. */}
        {doc.emailAInviter && (
          <div className="flex min-w-0 items-center justify-center gap-2.5 whitespace-nowrap">
            <span className="hidden md:inline text-grey text-[0.82rem] shrink-0">
              Adresse à inviter
            </span>
            <BoutonCopier email={doc.emailAInviter} />
          </div>
        )}

        <BoutonTelecharger pdf={doc.pdf} />
      </div>

      <div className="flex-1 w-full">
        <iframe
          src={doc.pdf}
          title={doc.title}
          className="w-full h-full min-h-[calc(100vh-65px)]"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}

export default Document
