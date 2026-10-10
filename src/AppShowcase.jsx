import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './app-showcase.css'

// Les écrans de la section « Ce que j'ai déjà construit » de l'accueil (refonte du 10/10/2026).
// Chaque écran porte une légende qui dit à quoi il sert : c'est là que « une stratégie derrière chaque écran »
// se voit, au lieu d'être annoncée (la vidéo du hero le dit déjà). `kind` reste affiché : une maquette n'est
// pas présentée comme une application publiée.
const SCREENS = [
  { file: 'smoothride-premiers-pas', name: 'SmoothRide', kind: 'Maquette', alt: 'Deux itinéraires comparés pour choisir le trajet le plus doux',
    role: 'Dès le premier écran, il voit ce qu’il gagne : le trajet le plus doux.' },
  { file: 'bailora-accueil', name: 'Bailora', kind: 'Maquette', alt: 'Tableau de bord des loyers, paiements et actions à traiter',
    role: 'Ce qui demande une action est en haut : il sait quoi faire en 3 secondes.' },
  { file: 'smoothride-navigation', name: 'SmoothRide', kind: 'Maquette', alt: 'Navigation avec signalement des dos-d’âne sur le trajet',
    role: 'Les dos-d’âne annoncés pendant le trajet : la raison de rouvrir l’application.' },
  { file: 'plouff-habitudes', name: 'Plouff Habitudes', kind: 'Application', alt: 'Suivi quotidien des habitudes avec une mascotte et les objectifs du jour',
    role: 'Une mascotte et les objectifs du jour : l’habitude qui fait revenir chaque matin.' },
  { file: 'sonora-decouvrir', name: 'Sonora', kind: 'Maquette', alt: 'Découverte musicale, playlists et lecteur audio',
    role: 'Des playlists prêtes dès l’arrivée : jamais d’écran vide pour un nouveau venu.' },
  { file: 'wakeup-alarme', name: 'WakeUp Alarme', kind: 'Application', alt: 'Accueil du réveil à missions avec une alarme activée',
    role: 'Une mission pour couper le réveil : on ouvre l’application chaque matin.' },
  { file: 'wakeup-personnalisation', name: 'WakeUp Alarme', kind: 'Application', alt: 'Choix du fond d’écran du réveil parmi plusieurs ambiances',
    role: 'Des ambiances à choisir : chacun fait son réveil à son goût, et le garde.' },
]

// Une légende se lit en 4 à 5 secondes : l'écran suivant attend 5,5 s (3,5 s quand il n'y avait pas de légende).
const DUREE_ECRAN_MS = 5500

export default function PhoneCarousel() {
  const [active, setActive] = useState(0)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [resumeAt, setResumeAt] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const root = useRef(null)
  const pointer = useRef(null)
  const playing = !keyboardFocused && !reducedMotion

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(media.matches)
    const onVisibility = () => setPageVisible(!document.hidden)
    // isIntersecting alone is true as soon as a single pixel enters the viewport.
    // Keep the first screen until at least half the gallery is actually visible.
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5)
    }, { threshold: [0, 0.5] })
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
    const delay = Math.max(DUREE_ECRAN_MS, resumeAt - Date.now())
    const timer = window.setTimeout(() => setActive(index => (index + 1) % SCREENS.length), delay)
    return () => window.clearTimeout(timer)
  }, [playing, dragging, visible, pageVisible, active, resumeAt])

  const move = (direction) => {
    setResumeAt(Date.now() + 30000)
    setActive(index => (index + direction + SCREENS.length) % SCREENS.length)
  }

  const courant = SCREENS[active]

  return (
    <div className="app-gallery" ref={root} role="region" aria-roledescription="carrousel" aria-label="Écrans conçus par Noé Calmes"
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
              role="group" aria-roledescription="diapositive" aria-label={`${index + 1} sur ${SCREENS.length} : ${screen.name}, ${screen.kind}. ${screen.role}`} aria-hidden={offset !== 0}>
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
      <p className="app-gallery-caption" aria-hidden="true">
        <span className="app-gallery-caption-name">{courant.name} <span>{courant.kind}</span></span>
        <span key={courant.file} className="app-gallery-caption-role">{courant.role}</span>
      </p>
      <div className="app-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Écran précédent"><ArrowLeft size={18} /></button>
        <div className="app-gallery-dots" aria-hidden="true">{SCREENS.map((screen, index) => <span key={screen.file} className={index === active ? 'is-active' : ''} />)}</div>
        <button type="button" onClick={() => move(1)} aria-label="Écran suivant"><ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
