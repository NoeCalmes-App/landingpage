import { useEffect } from 'react'

export default function Merci({ onBack }) {
  useEffect(() => {
    if (typeof fbq === 'function') {
      fbq('track', 'Lead')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
      <div className="max-w-md w-full">
        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#665dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-heading text-text text-xl md:text-2xl font-bold mb-3">
          Votre appel est confirmé.
        </h1>

        <p className="text-grey text-sm leading-relaxed mb-6">
          Merci pour votre confiance. Vous allez recevoir un email de confirmation avec le lien de la visio.
        </p>

        <p className="text-text text-xs italic mb-8">
          Merci de prévenir en cas d'empêchement.
          <br />
          Sans réponse, aucun nouveau créneau ne pourra être réservé.
        </p>

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-brand font-semibold text-[0.95rem] hover:underline cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Retour au site
        </button>
      </div>
    </div>
  )
}
