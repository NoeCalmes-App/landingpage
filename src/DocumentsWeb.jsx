// LA FAMILLE « SITE WEB » : `/documents/app-web`.
//
// POURQUOI UNE PAGE À PART, et pas une carte de plus sous `app-mobile`. Un
// client qui vient pour un site vitrine n'a ni Firebase, ni Google Play, ni
// compte Apple Developer à créer. Lui montrer trois cartes qui ne le concernent
// pas lui fait douter de la quatrième — la seule qui le concerne — et le fait
// écrire pour demander lesquelles sont pour lui.
//
// UNE SEULE CARTE, ET LA PAGE NE FAIT PAS SEMBLANT D'EN AVOIR PLUSIEURS. Le
// gabarit reste celui de l'autre famille (mêmes marges, même grille) : les deux
// écrans se suivent depuis le sommaire, un décalage se verrait au clic.
//
// LE TITRE NE PARLE PAS D'URGENCE ICI. Côté mobile, « À faire maintenant »
// répond à un blocage réel : sans les accès, le développement ne démarre pas.
// Côté site, il n'y a qu'un achat, et le presser ne le rend pas plus rapide.

import NavDocuments from './NavDocuments.jsx'
import { DocumentCard, A_FAIRE_WEB } from './Documents.jsx'

function DocumentsWeb({ onOpenDocument }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <NavDocuments />

      <div className="px-5 md:px-8 lg:px-11 pt-14 pb-9 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          {/* UN GLOBE, PAS UN TÉLÉPHONE. C'est le seul pictogramme de la page,
              il doit dire de quelle famille on parle sans être lu. */}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wash text-brand shrink-0">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
            </svg>
          </span>
          <h1 className="font-heading text-text text-3xl md:text-4xl font-extrabold tracking-tight">
            Mettre le site en ligne
          </h1>
        </div>
        {/* DIRE CE QUI EST BLOQUÉ, ET À QUI ÇA APPARTIENT. Le domaine reste au
            client : c'est ce qui justifie qu'il l'achète lui-même plutôt que
            moi à sa place, et c'est aussi ce qui le rassure sur le fait qu'il
            ne dépend pas de moi pour le garder. */}
        <p className="text-grey text-[1rem] leading-relaxed max-w-xl">
          <strong className="text-text font-semibold">Le nom de domaine est à votre nom.</strong>{' '}
          C&apos;est l&apos;adresse à laquelle votre site répondra : je ne peux pas le publier avant
          qu&apos;elle existe.
        </p>
      </div>

      <div className="px-5 md:px-8 lg:px-11 pb-24 max-w-4xl mx-auto">
        {/* MÊME GRILLE QUE L'AUTRE FAMILLE, à une carte près. En pleine largeur,
            la carte unique se déformait : dessinée pour une demi-colonne, elle
            devenait un bandeau et ne se lisait plus comme une carte. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {A_FAIRE_WEB.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onClick={() => onOpenDocument(doc)} />
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-brand-pale bg-brand-wash px-4 py-3.5">
          <span className="text-brand shrink-0 mt-[1px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </span>
          <p className="text-[0.82rem] leading-relaxed">
            <span className="text-text font-semibold">Le plus simple : le faire depuis un ordinateur.</span>{' '}
            <span className="text-grey">C&apos;est plus rapide au clavier, et tout reste sous les yeux.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DocumentsWeb
