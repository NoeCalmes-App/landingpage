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
          C'est confirmé.
        </h1>

        <p className="text-grey text-sm leading-relaxed mb-6">
          Tu vas recevoir un email de confirmation Calendly dans quelques secondes.
        </p>

        <div className="bg-brand/5 border border-brand/15 rounded-xl p-5 mb-6 text-left">
          <h2 className="font-heading text-text text-sm font-bold mb-3">
            Pour qu'on tire le max de nos 30 minutes, viens avec en tête :
          </h2>
          <ul className="space-y-2 text-grey text-sm leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5 shrink-0">&#10003;</span>
              Ton objectif business derrière l'app — l'utilisateur, le problème à résoudre, l'enjeu
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5 shrink-0">&#10003;</span>
              Si tu as un existant à reprendre ou faire évoluer : un accès, une capture ou un brief rapide
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5 shrink-0">&#10003;</span>
              Tes contraintes : deadline, équipe en place, point de blocage actuel
            </li>
          </ul>
          <p className="text-grey/70 text-xs mt-3 italic">
            Pas de panique si tout n'est pas prêt — on fera le point ensemble.
          </p>
        </div>

        <p className="text-text text-xs italic mb-8">
          En cas d'empêchement, préviens-moi via le lien d'annulation Calendly.
          <br />
          Sans nouvelle, je ne rouvre pas de créneau.
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
