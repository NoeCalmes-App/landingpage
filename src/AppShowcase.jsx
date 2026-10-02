import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play, Repeat2, Sparkles, Target } from 'lucide-react'
import { lienInterne } from './seo.js'
import './app-showcase.css'

const SCREENS = [
  { file: 'smoothride-premiers-pas', name: 'SmoothRide', detail: 'Les premiers pas', kind: 'Maquette', alt: 'Deux itinéraires comparés pour choisir le trajet le plus doux' },
  { file: 'bailora-accueil', name: 'Bailora', detail: 'L’essentiel, au premier regard', kind: 'Maquette', alt: 'Tableau de bord des loyers, paiements et actions à traiter' },
  { file: 'smoothride-navigation', name: 'SmoothRide', detail: 'Une valeur concrète à chaque trajet', kind: 'Maquette', alt: 'Navigation avec signalement des dos-d’âne sur le trajet' },
  { file: 'plouff-habitudes', name: 'Plouff Habitudes', detail: 'Une raison de revenir chaque jour', kind: 'Application', alt: 'Suivi quotidien des habitudes avec une mascotte et les objectifs du jour' },
  { file: 'sonora-decouvrir', name: 'Sonora', detail: 'Une découverte qui donne envie', kind: 'Maquette', alt: 'Découverte musicale, playlists et lecteur audio' },
  { file: 'wakeup-alarme', name: 'WakeUp Alarme', detail: 'Un usage simple et récurrent', kind: 'Application', alt: 'Accueil du réveil à missions avec une alarme activée' },
  { file: 'wakeup-personnalisation', name: 'WakeUp Alarme', detail: 'Une expérience à personnaliser', kind: 'Application', alt: 'Choix du fond d’écran du réveil parmi plusieurs ambiances' },
]

function PhoneCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const root = useRef(null)
  const pointer = useRef(null)
  const rotationIntent = useRef(null)
  const playing = !paused && !reducedMotion

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
    if (!playing || hovered || !visible || !pageVisible) return
    const timer = window.setInterval(() => setActive(index => (index + 1) % SCREENS.length), 4500)
    return () => window.clearInterval(timer)
  }, [playing, hovered, visible, pageVisible, active])

  const move = (direction) => {
    setPaused(true)
    setActive(index => (index + direction + SCREENS.length) % SCREENS.length)
  }

  return (
    <div className="app-gallery" ref={root} role="region" aria-roledescription="carrousel" aria-label="Interfaces conçues par Noé Calmes"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(true) }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
      <p className="app-gallery-eyebrow"><span /> Quelques interfaces que j’ai conçues</p>
      <button className="app-gallery-play" type="button" disabled={reducedMotion}
        aria-label={playing ? 'Mettre le défilement en pause' : 'Lancer le défilement automatique'}
        onPointerDown={() => { rotationIntent.current = playing }}
        onPointerCancel={() => { rotationIntent.current = null }}
        onClick={(event) => {
          // Keyboard focus pauses first; preserve a pointer click's original intent.
          setPaused(event.detail > 0 ? (rotationIntent.current ?? !paused) : !paused)
          rotationIntent.current = null
        }}>
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <div className="app-gallery-stage"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          pointer.current = { x: event.clientX, y: event.clientY }
          event.currentTarget.setPointerCapture(event.pointerId)
          setPaused(true)
        }}
        onPointerCancel={() => { pointer.current = null }}
        onPointerUp={(event) => {
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
              role="group" aria-roledescription="diapositive" aria-label={`${index + 1} sur ${SCREENS.length} : ${screen.name}`} aria-hidden={offset !== 0}>
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
      <div className="app-gallery-caption" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <p><strong>{SCREENS[active].name}</strong><span>{SCREENS[active].kind}</span></p>
        <p>{SCREENS[active].detail}</p>
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
            <p className="app-proof-eyebrow">Le produit fait la différence</p>
            <h2 id="app-proof-title">Une idée simple.<br />Un marché saturé.<br /><span>13 000 € par mois.</span></h2>
            <p className="app-proof-intro">Calorie, l’application de suivi nutritionnel que j’ai conçue, a atteint ce revenu mensuel deux mois après son lancement. L’idée existait déjà. <strong>Tout se joue dans l’exécution.</strong></p>
            <div className="app-proof-method">
              <h3>Le système que je pense pour ton application</h3>
              <ol>
                <li><span className="app-proof-step">01</span><div><h4>Comprendre l’intérêt, tout de suite</h4><p>Des premiers écrans clairs, un premier résultat rapide. Ton utilisateur sait pourquoi il est là.</p></div></li>
                <li><span className="app-proof-step">02</span><div><h4>Passer de l’usage à l’achat</h4><p>Essai gratuit, abonnement ou commission sur une transaction : le bon modèle, proposé au bon moment.</p></div></li>
                <li><span className="app-proof-step">03</span><div><h4>Avoir une bonne raison de revenir</h4><p>Un service utile, des progrès visibles, une habitude qui s’installe. C’est ce qui construit la fidélité.</p></div></li>
              </ol>
            </div>
          </div>
        </div>
        <div className="app-market-grid">
          <article><span className="app-market-icon"><Target size={20} /></span><div><h3>Ton idée existe déjà ?</h3><p>Comme Calorie. On choisit une cible précise et une raison de préférer ton application aux autres.</p></div></article>
          <article><span className="app-market-icon"><Sparkles size={20} /></span><div><h3>Tu explores un nouveau marché ?</h3><p>On cadre une première version pour tester la demande et voir si les premiers utilisateurs sont prêts à payer.</p></div></article>
        </div>
        <div className="app-proof-next"><p><Repeat2 size={17} /> Après le lancement, on mesure, on apprend, on améliore.</p><a href={lienInterne('/audit-app')}>Évaluer le potentiel de mon idée <ArrowRight size={17} /></a></div>
      </div>
    </section>
  )
}
