// Point d'entree de la page /audit-app.
//
// Machine a etats simple : 'hero' -> 'form' -> ('verdict' | 'form-with-error')
// Pas de routeur tiers — on suit la convention deja en place dans App.jsx
// (manipulation directe de l'historique HTML5 via history.pushState).

import { useEffect, useState } from 'react'
import AuditAppHero from './AuditAppHero'
import AuditAppForm from './AuditAppForm'
import AuditAppVerdict from './AuditAppVerdict'
import MaintenanceModal from './MaintenanceModal'
import { generateVerdict } from './api'
import {
  clearAuditState,
  consumeAuditRelaunchQuota,
  loadAuditRelaunchQuota,
  loadAuditState,
  saveAuditState,
} from './storage'

const mePhoto = '/assets/images/profile/me.webp'

export default function AuditApp({ onBack, onLegal }) {
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
  const [appType, setAppType] = useState(() => loadAuditState()?.appType || '')
  const [budgetAnswer, setBudgetAnswer] = useState(
    () =>
      loadAuditState()?.budgetAnswer ||
      loadAuditState()?.answers?.q4_answer ||
      ''
  )
  // Dernier payload soumis : on le garde en memoire (et en localStorage) pour
  // que la popup "Reessayer" puisse relancer la generation sans refaire le
  // formulaire. Restaure aussi a l'ouverture : si l'user a ferme l'onglet
  // pendant une erreur, il revient sur sa derniere question et peut relancer.
  const [pendingPayload, setPendingPayload] = useState(
    () => loadAuditState()?.pendingPayload || null
  )
  const [relaunchQuota, setRelaunchQuota] = useState(() =>
    loadAuditRelaunchQuota()
  )

  // Synchronise les changements de stage/verdict/firstName dans localStorage
  useEffect(() => {
    saveAuditState({ stage, firstName, verdict, appType, budgetAnswer })
  }, [stage, firstName, verdict, appType, budgetAnswer])

  // Meta tags propres a la page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Tester une idée d\'application mobile — Noé Calmes'
    const meta = document.querySelector('meta[name="description"]')
    const previousDesc = meta?.getAttribute('content')
    meta?.setAttribute(
      'content',
      'Teste ton idée d\'application mobile avant d\'investir : potentiel business, budget, délai et points à valider en 2 minutes.'
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
    setAppType(payload.app_type || '')
    setBudgetAnswer(payload.q4_answer || '')
    // Memorise le payload pour permettre un "Reessayer" depuis la popup
    // sans avoir a refaire tout le tunnel.
    setPendingPayload(payload)
    saveAuditState({ pendingPayload: payload })

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
      // Verdict OK : on n'a plus besoin de garder le payload en attente
      setPendingPayload(null)
      saveAuditState({ pendingPayload: null })
    } catch (e) {
      setError(e?.message || 'Erreur inattendue. Réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    if (!pendingPayload) {
      // Pas de payload en memoire — on ferme juste la popup, l'user
      // pourra revalider sa derniere question pour relancer.
      setError(null)
      return
    }
    handleSubmit(pendingPayload)
  }

  const handleCloseMaintenance = () => {
    setError(null)
  }

  const handleRelaunchAudit = () => {
    const result = consumeAuditRelaunchQuota()
    setRelaunchQuota(result.quota)
    if (!result.allowed) return

    clearAuditState()
    setStage('form')
    setSubmitting(false)
    setError(null)
    setVerdict(null)
    setFirstName('')
    setAppType('')
    setBudgetAnswer('')
    setPendingPayload(null)
  }

  // La navbar n'apparait que sur le hero — pendant le formulaire (focus action)
  // et sur la page verdict (focus contenu de l'audit), on la masque.
  const showNav = stage === 'hero'

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <AuditAppTopBar onBack={onBack} />}

      <div className="flex-1 flex flex-col">
        {stage === 'hero' && <AuditAppHero onStart={handleStart} onLegal={onLegal} />}

        {stage === 'form' && (
          <AuditAppForm
            initialFirstName={firstName}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}

        {stage === 'verdict' && verdict && (
          <AuditAppVerdict
            firstName={firstName}
            appType={appType}
            budgetAnswer={budgetAnswer}
            verdict={verdict}
          />
        )}
      </div>

      {/* Footer legal affiche uniquement sur le verdict.
          Le hero a deja ses propres liens legaux integres (cf. AuditAppHero).
          Le formulaire reste epure : focus action, pas de distraction. */}
      {stage === 'verdict' && (
        <AuditAppLegalFooter
          onLegal={onLegal}
          onRelaunchAudit={handleRelaunchAudit}
          relaunchQuota={relaunchQuota}
        />
      )}

      {/* Popup maintenance : remplace l'ancien message d'erreur inline.
          S'affiche tant que `error` est set et qu'on n'est pas en train de
          relancer une tentative (sinon on garde l'ecran d'analyse visible). */}
      {error && !submitting && (
        <MaintenanceModal
          onRetry={handleRetry}
          onClose={handleCloseMaintenance}
          retrying={false}
        />
      )}
    </div>
  )
}

// Footer minimal pour les ecrans /audit-app : juste les liens legaux centres
// sur un fond gris clair (--color-card). Pas de nom, pas de socials —
// la page est focus conversion, on garde le bas neutre.
function AuditAppLegalFooter({ onLegal, onRelaunchAudit, relaunchQuota }) {
  const go = (target) => {
    if (typeof onLegal === 'function') onLegal(target)
  }
  const remaining = relaunchQuota?.remaining ?? 0
  const limit = relaunchQuota?.limit ?? 2
  const blocked = relaunchQuota?.blocked ?? remaining <= 0

  return (
    <div className="bg-card py-6 px-5">
      <div className="max-w-275 mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={onRelaunchAudit}
            disabled={blocked}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              blocked
                ? 'cursor-not-allowed border-card-border bg-surface text-grey/60'
                : 'cursor-pointer border-card-border bg-surface text-text hover:border-brand/30 hover:text-brand'
            }`}
          >
            <ReloadIcon />
            {blocked ? 'Limite mensuelle atteinte' : "Relancer l'audit"}
          </button>
          <p className="text-[0.68rem] text-grey">
            {blocked
              ? `${limit} relances utilisées ce mois-ci`
              : `${remaining} relance${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''} ce mois-ci`}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button onClick={() => go('cgv')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">CGV</button>
          <button onClick={() => go('mentions')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">Mentions légales</button>
          <button onClick={() => go('privacy')} className="text-grey text-xs hover:text-text transition-colors cursor-pointer">Politique de confidentialité</button>
        </div>
      </div>
    </div>
  )
}

function ReloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  )
}

// Barre du haut premium : photo Noe + marque. Le raccourci WhatsApp reste
// sous le CTA principal du hero pour ne pas concurrencer l'audit dans la nav.
function AuditAppTopBar({ onBack }) {
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
                <span className="text-grey text-[0.72rem] md:text-[0.78rem] leading-tight font-normal">
                  Expert en applications
                </span>
              </div>
            </button>
            <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-card-border bg-white/55 px-3 py-1.5 text-grey/70 text-[0.76rem] font-semibold tracking-wide uppercase">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              100% confidentiel
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
