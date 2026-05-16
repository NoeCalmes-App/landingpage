// Point d'entree de la page /audit-app.
//
// Machine a etats simple : 'hero' -> 'form' -> ('verdict' | 'form-with-error')
// Pas de routeur tiers — on suit la convention deja en place dans App.jsx
// (manipulation directe de l'historique HTML5 via history.pushState).

import { useEffect, useState } from 'react'
import AuditAppHero from './AuditAppHero'
import AuditAppForm from './AuditAppForm'
import AuditAppVerdict from './AuditAppVerdict'
import { generateVerdict } from './api'
import { loadAuditState, saveAuditState, clearAuditState } from './storage'
import mePhoto from '../assets/lib/me.webp'

export default function AuditApp({ onBack, onBookCall, onLegal }) {
  // Restauration de l'etat persiste : si le prospect a deja commence
  // un audit ou genere un verdict, on l'amene la ou il s'etait arrete.
  const [stage, setStage] = useState(() => {
    const s = loadAuditState()
    if (!s) return 'hero'
    if (s.verdict) return 'verdict'
    if (s.firstName || (s.answers && Object.values(s.answers).some(Boolean))) {
      return 'form'
    }
    return 'hero'
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [verdict, setVerdict] = useState(() => loadAuditState()?.verdict || null)
  const [firstName, setFirstName] = useState(() => loadAuditState()?.firstName || '')

  // Synchronise les changements de stage/verdict/firstName dans localStorage
  useEffect(() => {
    saveAuditState({ stage, firstName, verdict })
  }, [stage, firstName, verdict])

  // Meta tags propres a la page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Audit app gratuit — Noé Calmes'
    const meta = document.querySelector('meta[name="description"]')
    const previousDesc = meta?.getAttribute('content')
    meta?.setAttribute(
      'content',
      'Évaluez la viabilité de votre idée d\'application mobile en 2 minutes. Audit gratuit par un expert indépendant.'
    )
    return () => {
      document.title = previousTitle
      if (previousDesc) meta?.setAttribute('content', previousDesc)
    }
  }, [])

  // Remonte en haut a chaque changement d'etape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [stage])

  const handleStart = () => {
    setStage('form')
  }

  const handleSubmit = async (payload) => {
    setSubmitting(true)
    setError(null)
    setFirstName(payload.first_name || '')

    // Temps mini d'affichage de l'ecran d'analyse pour la credibilite.
    // Si l'API repond en 2s, on attend quand meme jusqu'a 12s avant de
    // basculer sur le verdict. Si elle prend plus de 12s, on bascule
    // immediatement quand la reponse arrive.
    const MIN_ANALYSIS_MS = 12000
    const startedAt = Date.now()

    try {
      const data = await generateVerdict(payload)
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_ANALYSIS_MS) {
        await new Promise((r) => setTimeout(r, MIN_ANALYSIS_MS - elapsed))
      }
      setVerdict(data)
      setStage('verdict')
    } catch (e) {
      setError(e?.message || 'Erreur inattendue. Réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRestart = () => {
    clearAuditState()
    setVerdict(null)
    setError(null)
    setFirstName('')
    setStage('hero')
  }

  // La navbar n'apparait que sur le hero — pendant le formulaire (focus action)
  // et sur la page verdict (focus contenu de l'audit), on la masque.
  const showNav = stage === 'hero'

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <AuditAppTopBar onBack={onBack} onBookCall={onBookCall} />}

      <div className="flex-1 flex flex-col">
        {stage === 'hero' && <AuditAppHero onStart={handleStart} />}

        {stage === 'form' && (
          <AuditAppForm
            initialFirstName={firstName}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}

        {stage === 'verdict' && verdict && (
          <AuditAppVerdict
            firstName={firstName}
            verdict={verdict}
            onRestart={handleRestart}
            onBookCall={onBookCall}
          />
        )}
      </div>

      <AuditAppLegalFooter onLegal={onLegal} />
    </div>
  )
}

// Footer minimal pour les ecrans /audit-app : juste les liens legaux centres
// sur un fond gris clair (--color-card). Pas de nom, pas de socials —
// la page est focus conversion, on garde le bas neutre.
function AuditAppLegalFooter({ onLegal }) {
  const go = (target) => {
    if (typeof onLegal === 'function') onLegal(target)
  }
  return (
    <div className="bg-card py-6 px-5">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-275 mx-auto">
        <button onClick={() => go('cgv')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">CGV</button>
        <button onClick={() => go('mentions')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">Mentions légales</button>
        <button onClick={() => go('privacy')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">Politique de confidentialité</button>
      </div>
    </div>
  )
}

// Barre du haut premium : photo Noe + CTA "Discuter avec Noé" qui redirige
// vers /rendez-vous (Calendly de la home). Le logo + photo restent
// cliquables pour revenir a l'accueil — pas besoin de bouton "Retour" textuel.
// Objectif : maximiser la confiance + offrir un raccourci aux prospects deja
// chauds qui veulent skipper le formulaire.
function AuditAppTopBar({ onBack, onBookCall }) {
  // Faux check de disponibilite : on simule une verification ~1.6s avant
  // d'afficher le badge vert "disponible". Effet de presence + credibilite.
  const [checking, setChecking] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setChecking(false), 1600)
    return () => clearTimeout(t)
  }, [])

  const handleBookCall = () => {
    if (typeof onBookCall === 'function') {
      onBookCall()
    } else if (typeof onBack === 'function') {
      onBack()
    }
  }

  return (
    <header className="anim-nav fixed inset-x-0 top-2.5 md:top-[18px] z-50 flex justify-center px-4 md:px-6">
      <div className="w-full max-w-200">
        <div className="backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] bg-[#fffefc99] rounded-[40px]">
          <div className="flex items-center justify-between h-[68px] md:h-[72px] pl-3 pr-2 md:pl-3.5 md:pr-3">
            {/* Brand : photo + nom + statut (clic = retour accueil) */}
            <button
              onClick={onBack}
              className="flex items-center gap-3 cursor-pointer group"
              aria-label="Retour à l'accueil"
            >
              <img
                src={mePhoto}
                alt="Noé Calmes"
                loading="eager"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover shrink-0 border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col items-start text-left">
                <span
                  className="text-text font-bold text-[1rem] md:text-[1.05rem] leading-tight tracking-tight group-hover:text-brand transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Noé Calmes
                </span>
                <span className="flex items-center gap-1.5 text-grey text-[0.72rem] md:text-[0.78rem] leading-tight font-normal">
                  {checking ? (
                    <>
                      <span className="inline-block w-2.5 h-2.5 rounded-full border border-grey/40 border-t-grey animate-spin" />
                      <span>Vérification de la disponibilité…</span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                      </span>
                      Expert · disponible
                    </>
                  )}
                </span>
              </div>
            </button>

            {/* CTA droite : Discuter avec Noé → /rendez-vous (Calendly home) */}
            <button
              onClick={handleBookCall}
              className="inline-flex items-center gap-1.5 md:gap-2 bg-text text-surface text-[0.82rem] md:text-[0.9rem] font-semibold px-4 py-2.5 md:px-5 md:py-3 rounded-full hover:bg-brand transition-colors cursor-pointer shadow-sm"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden sm:inline">Discuter avec Noé</span>
              <span className="sm:hidden">Discuter</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
