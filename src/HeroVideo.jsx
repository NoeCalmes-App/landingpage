import { useCallback, useEffect, useRef, useState } from 'react'
import './hero-video.css'

// Vidéo du hero, sur le modèle du lecteur d'Ikovaline (ikovaline.com) : la vidéo démarre seule, muette et en
// boucle, quand elle arrive à l'écran, avec une barre toujours visible en bas : lecture/pause, avancement
// (on peut cliquer ou glisser dedans), son, plein écran. Un clic sur la vidéo la met en pause ou la relance.
//
// Ce qu'on fait en plus d'eux :
// - le premier « Activer le son » (ou un premier clic sur la vidéo, ou le plein écran) repart du début, pour
//   entendre le film en entier. Ensuite, le bouton du son coupe et remet le son sans revenir en arrière ;
// - si le navigateur refuse la lecture automatique (iPhone en économie d'énergie, Safari ou Firefox réglés
//   pour bloquer, navigateur intégré d'une application), ou si la personne a demandé moins d'animations ou
//   économise ses données : l'affiche reste, avec un gros bouton « Lancer la vidéo » ;
// - plein écran : le bloc entier (ordinateur, Android, iPad), le lecteur natif sur iPhone ;
// - la vidéo muette se met en pause hors de l'écran et dans un onglet masqué. Avec le son, elle continue :
//   la personne écoute peut-être en lisant la suite.
//
// iPhone : la lecture auto ne marche que si la vidéo est muette ET « inline » : les attributs sont posés à la
// main, parce que React ne pose pas l'attribut `muted`.

const SOURCES = {
  hd: '/assets/videos/hero-v10-1080.mp4',
  sd: '/assets/videos/hero-v10-720.mp4',
}
// L'affiche est une vraie image (et pas l'attribut `poster`) : le navigateur choisit la bonne taille et la
// charge en priorité. Elle couvre la vidéo jusqu'à sa première image.
const AFFICHE = { petite: '/assets/videos/hero-v10-poster-960.jpg', grande: '/assets/videos/hero-v10-poster.jpg' }
const TAILLES_AFFICHE = '(min-width: 1172px) 1100px, (min-width: 768px) calc(100vw - 72px), calc(100vw - 24px)'
const DUREE_PAR_DEFAUT = 26
// Part de la vidéo qui doit être à l'écran pour qu'elle joue : sur un portable 1366×768, on n'en voit
// qu'environ un tiers au chargement, et elle doit déjà bouger.
const SEUIL_VISIBLE = 0.15
// La page s'affiche d'abord (texte, boutons, affiche), la vidéo ne se charge qu'ensuite, comme chez Ikovaline.
const DELAI_DEMARRAGE = 700

function choisirQualite() {
  if (typeof window === 'undefined') return 'sd'
  const c = navigator.connection
  if (c && (c.saveData || /(^|[^4])[23]g/.test(c.effectiveType || ''))) return 'sd'
  return window.matchMedia('(min-width: 900px)').matches ? 'hd' : 'sd'
}

// Pas de lecture automatique : moins d'animations demandées, ou économiseur de données activé
const sansLectureAuto = () => typeof window !== 'undefined' && (
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || Boolean(navigator.connection?.saveData)
)

function horloge(s) {
  const t = Math.max(0, Math.round(s || 0))
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
}

const IcoSon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
    <path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18.5 6.5a8 8 0 0 1 0 11" />
  </svg>
)
const IcoMuet = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
    <path d="m16 9 5 6M21 9l-5 6" />
  </svg>
)
const IcoLecture = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor" /></svg>
)
const IcoPause = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" /></svg>
)
const IcoGrand = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
)
const IcoPetit = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </svg>
)

export default function HeroVideo() {
  const boite = useRef(null)
  const video = useRef(null)
  const barre = useRef(null)       // remplissage de la barre d'avancement
  const piste = useRef(null)
  const [qualite] = useState(choisirQualite)
  const [enLecture, setEnLecture] = useState(false)
  const [image, setImage] = useState(false)          // la vidéo montre déjà une image : l'affiche s'efface
  const [bloquee, setBloquee] = useState(sansLectureAuto)   // lecture auto refusée ou non souhaitée
  const [muette, setMuette] = useState(true)
  const [temps, setTemps] = useState(0)
  const [duree, setDuree] = useState(DUREE_PAR_DEFAUT)
  const [pleinEcran, setPleinEcran] = useState(false)
  const [calme, setCalme] = useState(false)          // plein écran sans bouger : la barre s'efface
  const visible = useRef(false)
  const veutJouer = useRef(!sansLectureAuto())        // faux quand la personne a mis en pause elle-même
  const sonDejaMis = useRef(false)
  const glisse = useRef(false)
  const minuterie = useRef(null)

  const jouer = useCallback(() => {
    const v = video.current
    if (!v) return
    const p = v.play()
    if (p && p.catch) p.catch((err) => {
      // refus du navigateur : on attend un geste. Une pause demandée pendant le chargement (AbortError) n'en est pas un.
      if (err && err.name === 'NotAllowedError') { setBloquee(true); setEnLecture(false) }
    })
  }, [])

  // préparation : attributs pour iPhone, source adaptée à l'écran, lecture quand la vidéo est à l'écran
  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.loop = true
    v.src = SOURCES[qualite]

    let obs = null
    // `isIntersecting` ne veut pas dire la même chose partout (seuil atteint pour Chrome, un pixel pour d'autres) :
    // on décide sur la part réellement visible, avec deux seuils pour être prévenu à l'entrée comme à la sortie.
    const observer = () => {
      obs = new IntersectionObserver(([e]) => {
        const vu = e.isIntersecting && e.intersectionRatio >= SEUIL_VISIBLE - 0.001
        visible.current = vu
        if (vu) { if (veutJouer.current && v.paused) jouer() }
        else if (!v.paused && v.muted) v.pause()
      }, { threshold: [0, SEUIL_VISIBLE] })
      obs.observe(v)
    }
    const minuteur = setTimeout(observer, DELAI_DEMARRAGE)

    const auRetour = () => {
      if (document.hidden) { if (!v.paused && v.muted) v.pause() }
      else if (visible.current && veutJouer.current && v.paused) jouer()
    }
    document.addEventListener('visibilitychange', auRetour)
    return () => { clearTimeout(minuteur); obs?.disconnect(); document.removeEventListener('visibilitychange', auRetour) }
  }, [qualite, jouer])

  // barre d'avancement fluide, sans re-rendu React, et seulement pendant la lecture
  useEffect(() => {
    const v = video.current
    if (!v) return
    let id = 0
    const peindre = () => {
      if (!v.duration || !barre.current) return
      barre.current.style.transform = `scaleX(${Math.min(1, v.currentTime / v.duration)})`
    }
    const boucle = () => { peindre(); id = v.paused ? 0 : requestAnimationFrame(boucle) }
    const lancer = () => { if (!id) id = requestAnimationFrame(boucle) }
    v.addEventListener('play', lancer)
    v.addEventListener('seeked', peindre)
    v.addEventListener('loadedmetadata', peindre)
    return () => {
      cancelAnimationFrame(id)
      v.removeEventListener('play', lancer)
      v.removeEventListener('seeked', peindre)
      v.removeEventListener('loadedmetadata', peindre)
    }
  }, [])

  // le plein écran (bureau, Android, iPad) et le plein écran natif de l'iPhone
  useEffect(() => {
    const maj = () => setPleinEcran(Boolean(document.fullscreenElement || document.webkitFullscreenElement))
    const v = video.current
    const debutIos = () => setPleinEcran(true)
    const finIos = () => setPleinEcran(false)
    document.addEventListener('fullscreenchange', maj)
    document.addEventListener('webkitfullscreenchange', maj)
    v?.addEventListener('webkitbeginfullscreen', debutIos)
    v?.addEventListener('webkitendfullscreen', finIos)
    return () => {
      document.removeEventListener('fullscreenchange', maj)
      document.removeEventListener('webkitfullscreenchange', maj)
      v?.removeEventListener('webkitbeginfullscreen', debutIos)
      v?.removeEventListener('webkitendfullscreen', finIos)
    }
  }, [])

  // en plein écran, la barre s'efface quand on ne bouge plus
  const reveiller = useCallback(() => {
    setCalme(false)
    clearTimeout(minuterie.current)
    minuterie.current = setTimeout(() => { if (!glisse.current) setCalme(true) }, 2500)
  }, [])
  useEffect(() => () => clearTimeout(minuterie.current), [])

  // regarder pour de vrai : le son, et la première fois depuis le début
  const regarderAvecSon = useCallback(() => {
    const v = video.current
    if (!v) return
    v.muted = false
    if (!sonDejaMis.current) { try { v.currentTime = 0 } catch { /* rien de chargé : elle part déjà de 0 */ } }
    sonDejaMis.current = true
    veutJouer.current = true
    setBloquee(false); setMuette(false)
    jouer()
  }, [jouer])

  const basculerLecture = useCallback(() => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      if (bloquee) { regarderAvecSon(); return }
      veutJouer.current = true
      jouer()
    } else { veutJouer.current = false; v.pause() }
  }, [bloquee, regarderAvecSon, jouer])

  const basculerSon = useCallback(() => {
    const v = video.current
    if (!v) return
    if (!v.muted) { v.muted = true; setMuette(true); return }
    if (!sonDejaMis.current || bloquee) { regarderAvecSon(); return }
    v.muted = false; setMuette(false)
  }, [bloquee, regarderAvecSon])

  const basculerPleinEcran = useCallback(() => {
    const b = boite.current, v = video.current
    if (!b || !v) return
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
      return
    }
    // agrandir, c'est vouloir regarder : avec le son (depuis le début la première fois)
    if (v.muted && !sonDejaMis.current) regarderAvecSon()
    else if (v.paused) { veutJouer.current = true; jouer() }
    // l'iPhone ne sait pas mettre un bloc en plein écran : il ouvre son lecteur natif sur la vidéo
    const natif = () => { try { v.webkitEnterFullscreen?.() } catch { /* refusé tant que la vidéo n'a rien chargé */ } }
    const blocPossible = document.fullscreenEnabled || document.webkitFullscreenEnabled
    if (blocPossible && b.requestFullscreen) b.requestFullscreen().catch(natif)
    else if (blocPossible && b.webkitRequestFullscreen) b.webkitRequestFullscreen()
    else natif()
    reveiller()
  }, [regarderAvecSon, jouer, reveiller])

  const allerA = useCallback((clientX) => {
    const v = video.current, p = piste.current
    if (!v || !p || !v.duration) return
    const r = p.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    v.currentTime = x * v.duration
    if (barre.current) barre.current.style.transform = `scaleX(${x})`
  }, [])

  const surPiste = {
    onPointerDown: (e) => { glisse.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); allerA(e.clientX) },
    onPointerMove: (e) => { if (glisse.current) allerA(e.clientX) },
    onPointerUp: (e) => { glisse.current = false; e.currentTarget.releasePointerCapture?.(e.pointerId) },
    onPointerCancel: () => { glisse.current = false },
    onKeyDown: (e) => {
      const v = video.current
      if (!v) return
      if (e.key === 'ArrowRight') { v.currentTime = Math.min(v.duration || 0, v.currentTime + 5); e.preventDefault() }
      if (e.key === 'ArrowLeft') { v.currentTime = Math.max(0, v.currentTime - 5); e.preventDefault() }
    },
  }

  const surClavier = (e) => {
    if (e.target.closest?.('[role="slider"]')) return
    const k = e.key.toLowerCase()
    if ((k === ' ' || k === 'enter') && e.target.closest?.('button')) return   // un bouton garde son comportement normal
    if (k === ' ' || k === 'k') { e.preventDefault(); basculerLecture() }
    else if (k === 'm') basculerSon()
    else if (k === 'f') basculerPleinEcran()
  }

  // clic sur la vidéo : la première fois, on la regarde avec le son ; ensuite, pause et reprise
  const surVideo = () => {
    const v = video.current
    if (!v) return
    if (v.muted && !sonDejaMis.current) { regarderAvecSon(); return }
    basculerLecture()
  }

  const evts = {
    onPlay: () => { setEnLecture(true); setBloquee(false) },
    onPlaying: () => setImage(true),
    onSeeked: () => setImage(true),
    onPause: () => setEnLecture(false),
    onTimeUpdate: (e) => setTemps(e.currentTarget.currentTime),
    onLoadedMetadata: (e) => setDuree(e.currentTarget.duration || DUREE_PAR_DEFAUT),
    onVolumeChange: (e) => setMuette(e.currentTarget.muted),
  }

  const classes = ['hv', enLecture ? 'hv--lecture' : 'hv--pause', image ? 'hv--image' : '', pleinEcran ? 'hv--plein' : '',
    pleinEcran && calme && enLecture ? 'hv--calme' : ''].filter(Boolean).join(' ')

  return (
    <div className="hv-zone">
      <div
        ref={boite}
        className={classes}
        onPointerMove={() => { if (pleinEcran) reveiller() }}
        onPointerDown={() => { if (pleinEcran) reveiller() }}
        onKeyDown={surClavier}
        role="region"
        aria-label={`Vidéo de présentation, ${Math.round(duree)} secondes`}
      >
        <video
          ref={video}
          className="hv-video"
          preload="none"
          playsInline
          muted
          loop
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          onClick={surVideo}
          {...evts}
        />
        <img
          className="hv-affiche"
          src={AFFICHE.grande}
          srcSet={`${AFFICHE.petite} 960w, ${AFFICHE.grande} 1600w`}
          sizes={TAILLES_AFFICHE}
          width="1600"
          height="900"
          alt=""
          fetchPriority="high"
          decoding="async"
        />

        {/* Lecture auto refusée ou non souhaitée : la vidéo attend un geste, on le demande franchement */}
        {bloquee && !enLecture && (
          <button type="button" className="hv-lancer" onClick={regarderAvecSon} aria-label="Lancer la vidéo avec le son">
            <span className="hv-lancer-rond"><IcoLecture /></span>
            <span className="hv-lancer-txt">Lancer la vidéo <em>· {horloge(duree)}</em></span>
          </button>
        )}

        {/* Barre toujours visible, comme chez Ikovaline */}
        <div className="hv-barre">
          <button type="button" className="hv-btn" onClick={basculerLecture} aria-label={enLecture ? 'Mettre en pause' : 'Lire la vidéo'}>
            {enLecture ? <IcoPause /> : <IcoLecture />}
          </button>
          <div
            ref={piste}
            className="hv-piste"
            role="slider"
            tabIndex={0}
            aria-label="Avancement de la vidéo"
            aria-valuemin={0}
            aria-valuemax={Math.round(duree)}
            aria-valuenow={Math.round(temps)}
            aria-valuetext={`${horloge(temps)} sur ${horloge(duree)}`}
            {...surPiste}
          >
            <span className="hv-piste-fond"><i ref={barre} /></span>
          </div>
          <button
            type="button"
            className={muette ? 'hv-btn hv-son' : 'hv-btn'}
            onClick={basculerSon}
            aria-label={muette ? 'Activer le son' : 'Couper le son'}
          >
            {muette ? <IcoMuet /> : <IcoSon />}
            {muette && <span className="hv-son-txt" aria-hidden="true">Activer le son</span>}
          </button>
          <button type="button" className="hv-btn" onClick={basculerPleinEcran} aria-label={pleinEcran ? 'Quitter le plein écran' : 'Plein écran'}>
            {pleinEcran ? <IcoPetit /> : <IcoGrand />}
          </button>
        </div>
      </div>
    </div>
  )
}
