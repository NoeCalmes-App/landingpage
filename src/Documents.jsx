import ajoutMembrePdf from './assets/docs/Ajout_Membre_Firebase.pdf'
import googlePlayPdf from './assets/docs/Création Compte Google Play Console.pdf'
import appleDevPdf from './assets/docs/Création compte Apple Développeur.pdf'

const DOCUMENTS = [
  {
    id: 'flutter-firebase',
    route: '/documents/flutter-firebase',
    title: 'Flutter & Firebase',
    description: "Firebase & Flutter c'est quoi ?",
    category: 'Informations',
    pdf: '/document.pdf',
  },
  {
    id: 'new-membre',
    route: '/new-membre',
    title: 'Ajout Membre Firebase',
    description: "Création du compte firebase et ajout du compte Noé Calmes",
    category: 'Guide technique',
    pdf: ajoutMembrePdf,
  },
  {
    id: 'google-play-console',
    route: '/google-play-console',
    title: 'Compte Google Play Console',
    description: "Création et configuration d'un compte Google Play Console pour publier une application Android.",
    category: 'Guide technique',
    pdf: googlePlayPdf,
  },
  {
    id: 'apple-developer',
    route: '/apple-developer',
    title: 'Compte Apple Développeur',
    description: "Création et configuration d'un compte Apple Développeur pour publier une application iOS",
    category: 'Guide technique',
    pdf: appleDevPdf,
  },
]

function DocumentCard({ doc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border border-[#e8e8e8] rounded-[18px] p-6 text-left hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(102,93,255,0.10)] transition-all duration-200 cursor-pointer w-full"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-[13px] bg-[#665dff] flex items-center justify-center mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>

      {/* Category badge */}
      <span className="inline-block text-[0.72rem] font-semibold text-[#665dff] bg-[#665dff]/10 px-2.5 py-1 rounded-full mb-3">
        {doc.category}
      </span>

      {/* Title */}
      <h3 className="font-heading text-[#131313] text-[1rem] font-bold leading-snug mb-3">
        {doc.title}
      </h3>

      {/* Description */}
      <p className="text-[#888] text-[0.85rem] leading-relaxed mb-5">
        {doc.description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-[#665dff] text-[0.85rem] font-semibold group-hover:gap-2.5 transition-all duration-200">
        Voir le document
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  )
}

function Documents({ onBack, onOpenDocument }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header sticky */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-[#e5e5e5] px-5 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#665dff] font-semibold text-sm hover:opacity-70 transition-opacity cursor-pointer shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour
        </button>
        <span className="text-[#131313] font-bold text-sm md:text-base">
          Site noecalmes
        </span>
      </div>

      {/* Page title */}
      <div className="px-5 pt-12 pb-8 max-w-4xl mx-auto">
        <h1 className="font-heading text-[#131313] text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Documents
        </h1>
        <p className="text-[#888] text-[0.95rem]">
          Guides de démarrage pour lancer ton projet Flutter.
        </p>
      </div>

      <div className="px-5 pb-20 max-w-4xl mx-auto space-y-10">
        {/* Flutter & Firebase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <DocumentCard doc={DOCUMENTS[0]} onClick={() => onOpenDocument(DOCUMENTS[0])} />
        </div>

        {/* Configuration avant code */}
        <div>
          <h2 className="text-[#888] text-[0.95rem] mb-5">
            Configuration avant code
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOCUMENTS.slice(1).map((doc) => (
              <DocumentCard key={doc.id} doc={doc} onClick={() => onOpenDocument(doc)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { DOCUMENTS }
export default Documents
