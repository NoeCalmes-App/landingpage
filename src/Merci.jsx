import { useEffect } from 'react'

export default function Merci({ onBack }) {
  useEffect(() => {
    if (typeof fbq === 'function') {
      fbq('track', 'Lead')
    }
  }, [])

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-5">
      <button
        onClick={onBack}
        className="absolute top-5 left-5 inline-flex items-center gap-2 text-brand font-semibold text-[0.95rem] hover:underline cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Retour au site
      </button>
      <div className="max-w-md w-full">
        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#665dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-heading text-text text-xl md:text-2xl font-bold mb-3">
          C'est confirmé.
        </h1>

        <p className="text-grey text-sm leading-relaxed mb-6">
          Tu vas recevoir un email de confirmation dans quelques secondes.
        </p>

        <div className="bg-brand/5 border border-brand/15 rounded-xl p-5 mb-6 text-left">
          <h2 className="font-heading text-text text-sm font-bold mb-3">
            Pour tirer le maximum de nos 30 minutes, prépare :
          </h2>
          <ul className="space-y-2 text-grey text-sm leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5 shrink-0">&#10003;</span>
              Ton projet en clair : pour qui, ce qu'il apporte, où tu veux aller
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5 shrink-0">&#10003;</span>
              Tout document qui aide à cadrer ton projet : note d'intention, cahier des charges, maquettes, éléments visuels
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
