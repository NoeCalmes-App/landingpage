import { useCallback, useEffect, useRef, useState } from 'react'
import './hero-video.css'

// Vidéo du hero, sur le modèle du lecteur d'Ikovaline (ikovaline.com) : la vidéo joue seule, muette et en
// boucle, avec une barre toujours visible en bas : lecture/pause, avancement (on peut cliquer ou glisser
// dedans), son, plein écran. Un clic sur la vidéo la met en pause ou la relance.
//
// Ce qu'on fait en plus d'eux :
// - elle attend que la personne fasse défiler la page jusqu'à elle (demande de Noé, octobre 2026) : au
//   chargement, on lit encore le titre, et on raterait le début du film. En attendant, une couverture
//   violette est à sa place (photo de Noé, « Ton idée a du potentiel ? », bouton lecture). Le film se charge
//   quand même en fond, pour partir sans attendre ;
// - le premier geste pour la regarder (lecture, « Activer le son », clic sur la vidéo, plein écran) la lance
//   avec le son, depuis le début. Ensuite, le bouton du son coupe et remet le son sans revenir en arrière ;
// - si le navigateur refuse la lecture automatique (iPhone en économie d'énergie, Safari ou Firefox réglés
//   pour bloquer, navigateur intégré d'une application), ou si la personne a demandé moins d'animations ou
//   économise ses données : la couverture reste, avec son bouton « Regarde la vidéo » ;
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
// La couverture (tant que la vidéo ne joue pas) : fond violet, photo de Noé, une question qui donne envie de
// regarder, sans répéter le titre du hero. Elle est en HTML et pas en image : texte net à toutes les tailles,
// et une mise en page propre au téléphone. C'est aussi le bouton pour lancer la vidéo avec le son.
const PORTRAIT = '/assets/images/profile/noe-portrait.webp'
const DUREE_PAR_DEFAUT = 26
// Premier départ : il faut avoir fait défiler la page (un vrai geste, pas un rebond) et voir au moins la
// moitié de la vidéo.
const DEFILEMENT_MIN = 24
const SEUIL_DEPART = 0.5
// Une fois partie, la vidéo muette se met en pause sous 15 % à l'écran, et reprend au-dessus.
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
  const dejaPartie = useRef(false)                    // la vidéo a déjà joué au moins une fois
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

  // préparation : attributs pour iPhone, source adaptée à l'écran, chargement en fond, puis lecture quand on a
  // fait défiler la page jusqu'à la vidéo
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
    let part = 0            // part de la vidéo à l'écran, de 0 à 1
    let aDefile = false     // la personne a fait défiler la page

    const decider = () => {
      const vu = part >= SEUIL_VISIBLE - 0.001
      visible.current = vu
      if (!vu) { if (!v.paused && v.muted) v.pause(); return }
      if (document.hidden || !v.paused || !veutJouer.current) return
      // la première fois, seulement quand on est arrivé jusqu'à elle ; ensuite, dès qu'elle revient à l'écran
      if (dejaPartie.current || (aDefile && part >= SEUIL_DEPART - 0.001)) jouer()
    }
    const surDefilement = () => {
      if (window.scrollY <= DEFILEMENT_MIN) return
      aDefile = true
      window.removeEventListener('scroll', surDefilement)
      decider()
    }
    const preparer = () => {
      // le film se charge en fond (sauf si la lecture auto est exclue) : il part sans attendre quand on arrive dessus
      if (veutJouer.current && v.paused) { v.preload = 'auto'; if (v.readyState === 0) v.load() }
      // `isIntersecting` ne veut pas dire la même chose partout (seuil atteint pour Chrome, un pixel pour d'autres) :
      // on décide sur la part réellement visible, avec un seuil à l'entrée, un au départ et un à la sortie.
      obs = new IntersectionObserver(([e]) => {
        part = e.isIntersecting ? e.intersectionRatio : 0
        decider()
      }, { threshold: [0, SEUIL_VISIBLE, SEUIL_DEPART] })
      obs.observe(v)
      window.addEventListener('scroll', surDefilement, { passive: true })
      surDefilement()   // page rouverte plus bas (retour en arrière) : on a déjà fait défiler
    }
    const minuteur = setTimeout(preparer, DELAI_DEMARRAGE)

    const auRetour = () => {
      if (document.hidden) { if (!v.paused && v.muted) v.pause() }
      else decider()
    }
    document.addEventListener('visibilitychange', auRetour)
    return () => {
      clearTimeout(minuteur); obs?.disconnect()
      window.removeEventListener('scroll', surDefilement)
      document.removeEventListener('visibilitychange', auRetour)
    }
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
      // lecture refusée, ou pas encore partie : appuyer sur lecture, c'est vouloir la regarder, avec le son
      if (bloquee || !dejaPartie.current) { regarderAvecSon(); return }
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
    onPlay: () => { dejaPartie.current = true; setEnLecture(true); setBloquee(false) },
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
        {/* Couverture tant que la vidéo n'a rien montré : elle s'efface à la première image */}
        <button
          type="button"
          className="hv-affiche hv-couv"
          onClick={regarderAvecSon}
          tabIndex={image ? -1 : 0}
          aria-hidden={image || undefined}
          aria-label={`Regarder la vidéo avec le son, ${Math.round(duree)} secondes`}
        >
          <span className="hv-couv-portrait">
            <img src={PORTRAIT} alt="" width="600" height="600" decoding="async" fetchPriority="high" />
          </span>
          <span className="hv-couv-texte">
            <span className="hv-couv-titre">Ton idée a<br />du <em>potentiel</em>&nbsp;?</span>
            <span className="hv-couv-lire">
              <span className="hv-couv-rond"><IcoLecture /></span>
              <span className="hv-couv-lire-txt">Regarde la vidéo <i>· {horloge(duree)}</i></span>
            </span>
          </span>
        </button>

        {/* Lecture refusée alors que la vidéo a déjà une image (la couverture n'est plus là) : on demande un geste */}
        {bloquee && !enLecture && image && (
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
