import NavDocuments from './NavDocuments.jsx'
import { ICONES, IconeMarque } from './iconesDocument.jsx'

// L'adresse à inviter sur les comptes du client (Firebase, Play Console,
// Apple Developer). Affichée SUR LA PAGE et copiable, pas seulement écrite
// dans le PDF : une adresse dans un PDF ne se copie pas au doigt sur mobile,
// et une adresse retapée à la main finit par avoir une faute.
export const EMAIL_A_INVITER = 'noecalmes.pro@gmail.com'

const ajoutMembrePdf = '/assets/documents/guides/Ajout_Membre_Firebase.pdf'
const googlePlayPdf = '/assets/documents/guides/Création Compte Google Play Console.pdf'
const appleDevPdf = '/assets/documents/guides/Création compte Apple Développeur.pdf'

// FLUTTER & FIREBASE N'EST PAS DANS LA LISTE, volontairement. C'est un
// document d'EXPLICATION, dont le lien est collé dans les diapositives du
// devis : `https://noecalmes.fr/documents/flutter-firebase`. Sa route reste
// donc servie, mais l'afficher ici diluerait la page — elle ne doit contenir
// que ce qui est À FAIRE.
const EXPLICATIONS = [
  {
    id: 'flutter-firebase',
    route: '/documents/flutter-firebase',
    title: 'Flutter & Firebase',
    pdf: '/assets/documents/document.pdf',
    icone: ICONES.firebase,
  },
]

/** Les comptes à créer avant que le développement puisse commencer. */
const A_FAIRE = [
  {
    id: 'new-membre',
    route: '/new-membre',
    // UN PROJET, PAS UN COMPTE. Le compte, c'est le compte Google que le
    // client a déjà ; Firebase ne demande que de créer un projet dedans.
    // « Création compte » laissait croire à une inscription de plus.
    title: 'Création projet Firebase',
    soustitre: 'Et inviter Noé dessus',
    pdf: ajoutMembrePdf,
    icone: ICONES.firebase,
    emailAInviter: EMAIL_A_INVITER,
  },
  {
    id: 'google-play-console',
    route: '/google-play-console',
    title: 'Création compte Google Play',
    soustitre: 'Pour publier sur Android',
    pdf: googlePlayPdf,
    icone: ICONES.android,
    emailAInviter: EMAIL_A_INVITER,
  },
  {
    id: 'apple-developer',
    route: '/apple-developer',
    title: 'Création compte Apple',
    soustitre: 'Pour publier sur iPhone',
    pdf: appleDevPdf,
    icone: ICONES.apple,
  },
]

function DocumentCard({ doc, onClick }) {
  return (
    // PLUS DE MARGE INTÉRIEURE SUR GRAND ÉCRAN. À 20 px partout, le texte
    // touchait presque le bord et la carte se lisait comme un bloc serré. Sur
    // mobile la carte occupe déjà toute la largeur : lui reprendre de la place
    // au profit du blanc rendrait les titres plus étroits pour rien.
    <button
      onClick={onClick}
      className="group bg-white border border-[#e8e8e8] rounded-[18px] p-5 md:p-6 flex flex-col text-left h-full hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(102,93,255,0.10)] transition-all duration-200 cursor-pointer w-full"
    >
      {/* LE LOGO À DROITE, LE TEXTE À GAUCHE. Centré, il poussait le titre
          vers le bas et les trois cartes ne s'alignaient pas entre elles : un
          logo large et un logo étroit ne réservent pas la même hauteur. À
          droite, il ne pèse plus sur la mise en page, le titre commence
          toujours au même endroit.
          Les SVG sont recadrés sur leur dessin (cf. `iconesDocument.js`), ils
          remplissent donc ce carré à l'identique. */}
      <div className="flex items-start justify-between gap-4 w-full mb-5">
        <div className="min-w-0">
          <h3 className="font-heading text-text text-[1rem] font-bold leading-snug">
            {doc.title}
          </h3>
          {doc.soustitre && (
            <p className="text-grey text-[0.82rem] leading-snug mt-1">{doc.soustitre}</p>
          )}
        </div>
        <span className="w-12 h-12 shrink-0 rounded-[14px] bg-card border border-card-border flex items-center justify-center">
          <IconeMarque icone={doc.icone} taille={27} />
        </span>
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-brand text-[0.85rem] font-semibold group-hover:gap-2.5 transition-all duration-200">
        Ouvrir
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  )
}

// Pas de `onBack` : le retour vers le site passe par le nom « Noé Calmes » de
// la barre, qui est un vrai lien vers `/`. Le prop existait sans être utilisé.
function Documents({ onOpenDocument }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header sticky */}
      <NavDocuments />

      {/* LE CHRONO PORTE L'URGENCE, la phrase porte la raison. Un titre seul
          se lit comme une rubrique ; avec le pictogramme, il se lit comme une
          échéance. Et la phrase dit ce qui est BLOQUÉ tant que ce n'est pas
          fait — c'est ça qui fait agir, pas un paragraphe d'explication. */}
      {/* Même marge latérale que la barre au-dessus : le titre s'aligne
          verticalement avec le nom, sinon les deux blocs semblent décalés
          tant que l'écran n'est pas assez large pour que `max-w-4xl` morde. */}
      <div className="px-5 md:px-8 lg:px-11 pt-14 pb-9 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wash text-brand shrink-0">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2" />
              <path d="M9 2h6" />
            </svg>
          </span>
          <h1 className="font-heading text-text text-3xl md:text-4xl font-extrabold tracking-tight">
            À faire maintenant
          </h1>
        </div>
        <p className="text-grey text-[1rem] leading-relaxed max-w-xl">
          Pour que Noé puisse commencer la phase de développement (code), il faut créer ces trois comptes.
        </p>
      </div>

      <div className="px-5 md:px-8 lg:px-11 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {A_FAIRE.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onClick={() => onOpenDocument(doc)} />
          ))}
        </div>

        {/* APRÈS LES CARTES, PAS AVANT. C'est un conseil, pas une condition :
            placé au-dessus il ressemblerait à un prérequis de plus et
            retarderait le clic. Ici, il ne se lit qu'au moment où le client
            choisit son moment.
            Et ce n'est pas une quatrième carte : ni bouton, ni logo, ni ombre
            au survol — sinon on croit qu'il y a une étape supplémentaire. */}
        <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-brand-pale bg-brand-wash px-4 py-3.5">
          <span className="text-brand shrink-0 mt-[1px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </span>
          {/* NE PAS DÉCRIRE L'EFFORT. La première version parlait de
              « formulaires longs » et de carte bancaire : c'était vrai, mais
              ça donnait surtout une bonne raison de remettre à plus tard. Un
              conseil ne doit pas peser plus lourd que la chose conseillée —
              on dit ce qu'on y gagne, pas ce que ça coûte. */}
          <p className="text-[0.82rem] leading-relaxed">
            <span className="text-text font-semibold">Le plus simple : le faire depuis un ordinateur.</span>{' '}
            <span className="text-grey">C&apos;est plus rapide au clavier, et tout reste sous les yeux.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// `DOCUMENTS` reste exporté avec TOUT : c'est lui que le routeur parcourt
// pour retrouver un document par son adresse, y compris `/documents/flutter-firebase`.
const DOCUMENTS = [...A_FAIRE, ...EXPLICATIONS]

export { DOCUMENTS }
export default Documents
