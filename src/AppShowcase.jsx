import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronRight, Repeat2 } from 'lucide-react'
import './app-showcase.css'

const SCREENS = [
  { file: 'smoothride-premiers-pas', name: 'SmoothRide', kind: 'Maquette', alt: 'Deux itinéraires comparés pour choisir le trajet le plus doux' },
  { file: 'bailora-accueil', name: 'Bailora', kind: 'Maquette', alt: 'Tableau de bord des loyers, paiements et actions à traiter' },
  { file: 'smoothride-navigation', name: 'SmoothRide', kind: 'Maquette', alt: 'Navigation avec signalement des dos-d’âne sur le trajet' },
  { file: 'plouff-habitudes', name: 'Plouff Habitudes', kind: 'Application', alt: 'Suivi quotidien des habitudes avec une mascotte et les objectifs du jour' },
  { file: 'sonora-decouvrir', name: 'Sonora', kind: 'Maquette', alt: 'Découverte musicale, playlists et lecteur audio' },
  { file: 'wakeup-alarme', name: 'WakeUp Alarme', kind: 'Application', alt: 'Accueil du réveil à missions avec une alarme activée' },
  { file: 'wakeup-personnalisation', name: 'WakeUp Alarme', kind: 'Application', alt: 'Choix du fond d’écran du réveil parmi plusieurs ambiances' },
]

function PhoneCarousel() {
  const [active, setActive] = useState(0)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [resumeAt, setResumeAt] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const root = useRef(null)
  const pointer = useRef(null)
  const playing = !keyboardFocused && !reducedMotion

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(media.matches)
    const onVisibility = () => setPageVisible(!document.hidden)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(root.current)
    media.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!playing || dragging || !visible || !pageVisible) return
    const delay = Math.max(3500, resumeAt - Date.now())
    const timer = window.setTimeout(() => setActive(index => (index + 1) % SCREENS.length), delay)
    return () => window.clearTimeout(timer)
  }, [playing, dragging, visible, pageVisible, active, resumeAt])

  const move = (direction) => {
    setResumeAt(Date.now() + 30000)
    setActive(index => (index + direction + SCREENS.length) % SCREENS.length)
  }

  return (
    <div className="app-gallery" ref={root} role="region" aria-roledescription="carrousel" aria-label="Interfaces conçues par Noé Calmes"
      onFocusCapture={(event) => { if (event.target.matches(':focus-visible')) setKeyboardFocused(true) }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false) }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          setKeyboardFocused(true)
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
      <div className="app-gallery-stage"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          pointer.current = { x: event.clientX, y: event.clientY }
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(true)
          setResumeAt(Date.now() + 30000)
        }}
        onPointerCancel={() => { pointer.current = null; setDragging(false) }}
        onPointerUp={(event) => {
          setDragging(false)
          if (!pointer.current) return
          const dx = event.clientX - pointer.current.x
          const dy = event.clientY - pointer.current.y
          pointer.current = null
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1)
        }}>
        <div className="app-gallery-halo" aria-hidden="true" />
        {SCREENS.map((screen, index) => {
          const offset = (index - active + SCREENS.length + 3) % SCREENS.length - 3
          return (
            <div key={screen.file} className="app-phone-position" data-position={offset}
              role="group" aria-roledescription="diapositive" aria-label={`${index + 1} sur ${SCREENS.length} : ${screen.name}, ${screen.kind}`} aria-hidden={offset !== 0}>
              <div className="app-phone">
                <i className="app-phone-button app-phone-action" aria-hidden="true" />
                <i className="app-phone-button app-phone-volume-up" aria-hidden="true" />
                <i className="app-phone-button app-phone-volume-down" aria-hidden="true" />
                <i className="app-phone-button app-phone-power" aria-hidden="true" />
                <div className="app-phone-screen">
                  <img src={`/assets/images/apps/captures/${screen.file}.webp`} alt={screen.alt} width="660" height="1431" loading="lazy" decoding="async" draggable="false" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="app-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Capture précédente"><ArrowLeft size={18} /></button>
        <div className="app-gallery-dots" aria-hidden="true">{SCREENS.map((screen, index) => <span key={screen.file} className={index === active ? 'is-active' : ''} />)}</div>
        <button type="button" onClick={() => move(1)} aria-label="Capture suivante"><ArrowRight size={18} /></button>
      </div>
    </div>
  )
}

export default function AppShowcase() {
  return (
    <section className="app-proof" id="calories-proof" aria-labelledby="app-proof-title">
      <div className="app-proof-inner">
        <div className="app-proof-main">
          <PhoneCarousel />
          <div className="app-proof-copy">
            <h2 id="app-proof-title">Une stratégie<br /><span>derrière chaque écran.</span></h2>
            <p className="app-proof-intro">Que ton idée d’application soit inédite ou ait déjà des concurrents, je pense chaque écran pour <strong>convertir et fidéliser.</strong></p>
            <ol className="app-proof-journey" aria-label="Un parcours pensé pour générer des revenus">
              {['Premiers écrans', 'Essai gratuit', 'Habitude', 'Abonnement / commission', 'Revenus récurrents'].map((step, index, steps) => (
                <li key={step}>
                  <span className={index === steps.length - 1 ? 'app-proof-chip app-proof-chip-result' : 'app-proof-chip'}>
                    {index === steps.length - 1 && <Repeat2 size={15} aria-hidden="true" />}{step}
                  </span>
                  {index < steps.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <div className="app-proof-example">
              <img src="/assets/images/apps/calorie.webp" alt="" width="36" height="36" loading="lazy" />
              <p><strong>Ton idée existe déjà ?</strong> Calorie a atteint <b>13 000 €/mois</b> sur un marché totalement saturé.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
