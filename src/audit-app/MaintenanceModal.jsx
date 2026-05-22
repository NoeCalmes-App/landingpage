// Popup affichee quand /verdictWeb echoue (reseau, timeout, IA toutes KO).
//
// Remplace l'ancien message inline rouge "Connexion impossible".
// L'utilisateur peut :
//   - Cliquer "Reessayer maintenant" pour relancer la generation sans
//     refaire tout le formulaire (le payload est conserve par AuditApp).
//   - Fermer la popup et revenir plus tard : son etape, ses reponses et
//     son prenom sont deja persistes (cf. storage.js + AuditAppForm).
//     A son retour, il retombe sur la meme question et peut relancer
//     en revalidant la derniere etape.

export default function MaintenanceModal({ onRetry, onClose, retrying }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 bg-text/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-title"
    >
      <div className="relative w-full max-w-[460px] bg-surface rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-card-border overflow-hidden">
        {/* Bouton fermer en haut a droite */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full text-grey hover:text-text hover:bg-card transition-colors cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="px-7 pt-9 pb-8 md:px-9 md:pt-10 md:pb-9 text-center">
          {/* Icone maintenance (cle a molette) dans un cercle brand */}
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-brand/12 text-brand mb-5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>

          <h2
            id="maintenance-title"
            className="font-heading text-text text-xl md:text-2xl font-bold leading-tight mb-3"
          >
            Audit indisponible quelques instants
          </h2>

          <p className="text-grey text-[0.94rem] md:text-[0.98rem] leading-relaxed mb-7">
            Notre service d'analyse est actuellement en travaux. Vos réponses
            sont enregistrées — vous pourrez relancer l'audit dans un instant
            ou revenir un peu plus tard, vous retrouverez votre progression.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onRetry}
              disabled={retrying}
              className={`group inline-flex items-center justify-center gap-2 bg-brand text-surface font-semibold text-[0.95rem] px-7 py-3 rounded-full shadow-sm transition-all ${
                retrying
                  ? 'opacity-70 cursor-wait'
                  : 'hover:shadow-md cursor-pointer'
              }`}
            >
              {retrying ? (
                <>
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-surface/40 border-t-surface animate-spin" />
                  Nouvelle tentative…
                </>
              ) : (
                <>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Réessayer maintenant
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-grey font-semibold text-[0.88rem] hover:text-text transition-colors cursor-pointer"
            >
              Revenir plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
