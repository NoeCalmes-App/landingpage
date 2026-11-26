import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './app-showcase.css'
import './exemples-metier.css'

// LE CARROUSEL DE « CE QUE J'AI DÉJÀ CONSTRUIT » (page test, 25/11/2026). Une application par métier, montrée sur
// ordinateur ET sur téléphone, que l'on fait défiler avec les flèches. Il remplace l'ancien carrousel de téléphones
// (AppShowcase.jsx, qui reste celui de l'accueil en ligne). RÈGLES, toutes de Noé le 25/11/2026 au soir :
//   - TOUJOURS un écran d'ordinateur et, à côté, un écran de téléphone. Quand l'application n'existe que sur
//     téléphone, l'écran d'ordinateur montre SON SITE, celui que Noé a fait pour elle (captures de bailora-app.fr,
//     smoothride.fr et plouff-habitudes.com prises dans Chrome, puis outils/rogner_site.py).
//   - JAMAIS le mot « exemple » ni « imaginé ». Sous les écrans : le MÉTIER, une pastille, puis à quoi sert
//     l'application en UNE ligne courte (« pas autant de texte »). Pas le nom du produit.
//   - AUCUNE ADRESSE dans la barre du navigateur (Noé, 25/11/2026, 23 h : « enlève le lien du site, ou floute,
//     mais pas ton-application.fr ») : ni la vraie adresse du projet, ni une adresse inventée. Le champ est
//     là, avec un trait gris à la place du texte, comme une adresse masquée.
//   - RIEN D'INVENTÉ N'EST PRÉSENTÉ COMME RÉEL. Le titre du bloc dit « déjà construit » : la pastille dit donc
//     « Application » pour ce qui est construit, et « Maquette » pour la maquette de coaching, qui ne l'est pas
//     encore (elle passe en dernier). Pas de faux écran d'ordinateur, pas d'application inventée.
//   - ⚠️ AVANT DE METTRE CE BLOC SUR L'ACCUEIL EN LIGNE : la maquette de coaching montre le nom et le logo d'un
//     projet qui n'est pas celui de Noé. Il faut l'accord de son porteur, ou masquer le nom et le logo dans les
//     deux images.
//   - les écrans FLOTTENT doucement (« animation flottement »), l'ordinateur et le téléphone pas au même rythme.
//   - L'ORDRE : Bailora d'abord (un artisan qui gère ses logements : c'est le visiteur que la page vise), puis
//     WakeUp Alarme (ajoutée le 26/11/2026 à la demande de Noé), SmoothRide, Plouff Habitudes, et la maquette. Les
//     deux applications de Noé (WakeUp et Plouff) ne se suivent pas, comme dans le carrousel de l'accueil en ligne.
//   - WakeUp Alarme : son écran d'ordinateur est le visuel de présentation de l'application, faute de site. Une
//     capture de son site le remplacerait.
// Les images de la maquette sont fabriquées par outils/capture_ecran.py à partir de la page /maquette/… (les noms de
// fichiers ne portent pas le nom du projet).
const IMAGES = '/assets/images/apps'
const APPLICATIONS = [
  {
    id: 'immobilier',
    metier: 'Immobilier',
    statut: 'Application',
    role: 'Loyers, paiements et locataires au même endroit.',
    ordinateur: {
      src: `${IMAGES}/exemples/bailora-ordinateur.webp`, largeur: 1298, hauteur: 730,
      alt: 'Sur ordinateur, le site de l’application : « Vos SCI, enfin simples »',
    },
    telephones: [
      { src: `${IMAGES}/captures/bailora-accueil.webp`, largeur: 660, hauteur: 1431,
        alt: 'Sur téléphone, le tableau de bord des loyers, des paiements et des actions à traiter' },
    ],
  },
  {
    id: 'reveil',
    metier: 'Réveil',
    statut: 'Application',
    role: 'Un réveil qu’on n’éteint qu’en se levant.',
    ordinateur: {
      // Le visuel de présentation de l'application (960 × 540), pas la capture d'un site : WakeUp Alarme n'a pas de
      // site à montrer ici. Il est posé dans la fenêtre comme les sites des autres.
      src: `${IMAGES}/exemples/wakeup-ordinateur.webp`, largeur: 960, hauteur: 540,
      alt: 'Sur ordinateur, la présentation de l’application : « Le réveil qu’on ne peut pas éteindre sans se lever »',
    },
    telephones: [
      { src: `${IMAGES}/captures/wakeup-alarme.webp`, largeur: 660, hauteur: 1431,
        alt: 'Sur téléphone, l’accueil du réveil à missions avec une alarme activée' },
    ],
  },
  {
    id: 'automobile',
    metier: 'Automobile',
    statut: 'Application',
    role: 'Le trajet le plus doux, sans dos-d’âne.',
    ordinateur: {
      src: `${IMAGES}/exemples/smoothride-ordinateur.webp`, largeur: 1245, hauteur: 700,
      alt: 'Sur ordinateur, le site de l’application : « Votre trajet, sans les dos-d’âne »',
    },
    telephones: [
      { src: `${IMAGES}/captures/smoothride-navigation.webp`, largeur: 660, hauteur: 1431,
        alt: 'Sur téléphone, la navigation avec les dos-d’âne signalés sur le trajet' },
    ],
  },
  {
    id: 'bien-etre',
    metier: 'Bien-être',
    statut: 'Application',
    role: 'Des habitudes qui durent, un jour après l’autre.',
    ordinateur: {
      src: `${IMAGES}/exemples/plouff-ordinateur.webp`, largeur: 1245, hauteur: 700,
      alt: 'Sur ordinateur, le site de l’application : « Crée des habitudes qui durent »',
    },
    telephones: [
      { src: `${IMAGES}/captures/plouff-habitudes.webp`, largeur: 660, hauteur: 1431,
        alt: 'Sur téléphone, les habitudes du jour avec la mascotte' },
    ],
  },
  {
    id: 'coaching',
    metier: 'Coaching sportif',
    statut: 'Maquette',
    role: 'Réserver et payer son coach en quelques secondes.',
    ordinateur: {
      src: `${IMAGES}/exemples/coaching-ordinateur.webp`, largeur: 1668, hauteur: 898,
      alt: 'Sur ordinateur, le tableau de bord du coach : ses séances du jour, ses paiements et une demande à accepter',
    },
    telephones: [
      { src: `${IMAGES}/exemples/coaching-telephone.webp`, largeur: 912, hauteur: 2052,
        alt: 'Sur téléphone, l’accueil du client : les coachs libres aujourd’hui et le prochain événement' },
    ],
  },
]

// LE CARROUSEL DÉFILE TOUT SEUL (Noé, 25/11/2026 : « tourner tout seul au bout de quelques secondes, rapide ») :
// une application toutes les 4 secondes. Après un geste du visiteur (flèche, clavier, doigt), il repose l'écran
// choisi 8 secondes puis REPREND tout seul (Noé, 26/11/2026 : « ça doit passer à la suivante automatiquement » : avant,
// il s'arrêtait pour de bon au premier clic). Il se met en pause sous la souris (jamais au doigt) ou au clavier,
// ne tourne pas quand le bloc n'est pas à l'écran ni quand l'onglet est caché, et ne démarre jamais si le visiteur a
// demandé moins d'animations. IL NE COMPTE QU'À L'ARRIVÉE (Noé, 26/11/2026 : « ça passe à la suivante quand
// j'arrive sur la page, pas avant ») : le délai ne part que lorsque les écrans sont vus aux deux tiers, et dès que le bloc
// est entièrement sorti de l'écran il revient à la première application, pour que chaque arrivée commence par elle.
const DELAI = 4000
const DELAI_APRES_GESTE = 8000
// La première application (Bailora) reste plus longtemps : c'est celle que le visiteur voit en arrivant (Noé,
// 26/11/2026, 01 h 26 : « la première mais plus de temps avant de passer à la deuxième, léger »).
const DELAI_PREMIERE = 6500

function Telephone({ image }) {
  return (
    <div className="ex-scene-tel">
      <div className="app-phone">
        <i className="app-phone-button app-phone-action" aria-hidden="true" />
        <i className="app-phone-button app-phone-volume-up" aria-hidden="true" />
        <i className="app-phone-button app-phone-volume-down" aria-hidden="true" />
        <i className="app-phone-button app-phone-power" aria-hidden="true" />
        <div className="app-phone-screen">
          <img src={image.src} alt={image.alt} width={image.largeur} height={image.hauteur} loading="lazy" decoding="async" draggable="false" />
        </div>
      </div>
    </div>
  )
}

export default function ExemplesMetier() {
  const [actif, setActif] = useState(0)
  // Le défilement automatique (voir DELAI) : `apresGeste` allonge le premier délai quand le visiteur vient de choisir
  // un écran, `pause` le temps d'un survol à la souris ou d'un passage au clavier, `aLecran` quand le bloc se voit
  // et que l'onglet est ouvert.
  const [apresGeste, setApresGeste] = useState(false)
  const [pause, setPause] = useState(false)
  const [aLecran, setALecran] = useState(false)
  const racine = useRef(null)
  const scenes = useRef(null)
  const doigt = useRef(null)
  const application = APPLICATIONS[actif]
  const suivante = (sens) => setActif((i) => (i + sens + APPLICATIONS.length) % APPLICATIONS.length)
  // Un geste du visiteur (flèche, clavier, doigt) : on lui obéit, et le défilement reprend 8 secondes plus tard.
  const aller = (sens) => { setApresGeste(true); suivante(sens) }

  useEffect(() => {
    const bloc = racine.current
    const ecrans = scenes.current
    if (!bloc || !ecrans || typeof IntersectionObserver === 'undefined') return undefined
    let dansLaPage = false
    const maj = () => setALecran(dansLaPage && !document.hidden)
    // Les écrans doivent être vus aux deux tiers : avant, le délai partait dès qu'un tiers du bloc entrait (titre
    // encore hors de l'écran), et la première application avait déjà changé quand le visiteur arrivait.
    const guetteur = new IntersectionObserver(([entree]) => { dansLaPage = entree.isIntersecting; maj() }, { threshold: 0.66 })
    guetteur.observe(ecrans)
    // Sorti de l'écran : on revient à la première, pour que la prochaine arrivée commence par elle.
    const sortie = new IntersectionObserver(([entree]) => {
      if (!entree.isIntersecting) { setActif(0); setApresGeste(false) }
    }, { threshold: 0 })
    sortie.observe(bloc)
    document.addEventListener('visibilitychange', maj)
    return () => { guetteur.disconnect(); sortie.disconnect(); document.removeEventListener('visibilitychange', maj) }
  }, [])

  useEffect(() => {
    if (pause || !aLecran) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const minuteur = window.setTimeout(() => {
      setApresGeste(false)
      setActif((i) => (i + 1) % APPLICATIONS.length)
    }, apresGeste ? DELAI_APRES_GESTE : (actif === 0 ? DELAI_PREMIERE : DELAI))
    return () => window.clearTimeout(minuteur)
  }, [pause, aLecran, actif, apresGeste])

  return (
    <div ref={racine} className="ex-galerie" role="region" aria-roledescription="carrousel" aria-label="Applications construites par Noé Calmes, par métier"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setPause(true) }} onPointerLeave={(e) => { if (e.pointerType === 'mouse') setPause(false) }}
      onFocus={(e) => { if (e.target.matches?.(':focus-visible')) setPause(true) }} onBlur={() => setPause(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); aller(e.key === 'ArrowLeft' ? -1 : 1) }
      }}>
      {/* Toutes les scènes sont posées l'une sur l'autre : le bloc garde la hauteur de la plus grande, rien ne saute
          quand on passe de l'une à l'autre. On peut aussi glisser le doigt. */}
      <div ref={scenes} className="ex-scenes"
        onPointerDown={(e) => { doigt.current = { x: e.clientX, y: e.clientY } }}
        onPointerCancel={() => { doigt.current = null }}
        onPointerUp={(e) => {
          if (!doigt.current) return
          const dx = e.clientX - doigt.current.x
          const dy = e.clientY - doigt.current.y
          doigt.current = null
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) aller(dx < 0 ? 1 : -1)
        }}>
        <div className="ex-halo" aria-hidden="true" />
        {/* Sur grand écran (≥ 1100 px), deux petites flèches grises de part et d'autre de l'image, en plus de celles
            de la rangée sous la légende (Noé, 26/11/2026). Elles doublent celles du bas : cachées aux lecteurs
            d'écran et au clavier, qui passent par la rangée du bas. */}
        <button type="button" className="ex-fleche-cote ex-fleche-gauche" onClick={() => aller(-1)} aria-hidden="true" tabIndex={-1}><ArrowLeft size={20} strokeWidth={1.6} /></button>
        <button type="button" className="ex-fleche-cote ex-fleche-droite" onClick={() => aller(1)} aria-hidden="true" tabIndex={-1}><ArrowRight size={20} strokeWidth={1.6} /></button>
        {APPLICATIONS.map((app, i) => (
          <div key={app.id} className={`ex-scene ${app.ordinateur ? 'ex-scene-duo' : 'ex-scene-telephones'}${i === actif ? ' est-active' : ''}`}
            role="group" aria-roledescription="diapositive" aria-label={`${i + 1} sur ${APPLICATIONS.length} : ${app.metier}. ${app.role}`} aria-hidden={i !== actif}>
            {app.ordinateur && (
              <div className="ex-scene-ordi">
                <div className="ex-ordi-barre" aria-hidden="true"><i /><i /><i /><span><b /></span></div>
                <img src={app.ordinateur.src} alt={app.ordinateur.alt} width={app.ordinateur.largeur} height={app.ordinateur.hauteur} loading="lazy" decoding="async" draggable="false" />
              </div>
            )}
            {app.telephones.map((image) => <Telephone key={image.src} image={image} />)}
          </div>
        ))}
      </div>
      <p className="app-gallery-caption ex-legende" aria-hidden="true">
        <span className="app-gallery-caption-name">{application.metier} <span>{application.statut}</span></span>
        <span key={application.id} className="app-gallery-caption-role">{application.role}</span>
      </p>
      <div className="app-gallery-controls ex-fleches">
        <button type="button" onClick={() => aller(-1)} aria-label="Application précédente"><ArrowLeft size={18} /></button>
        <div className="app-gallery-dots" aria-hidden="true">{APPLICATIONS.map((app, i) => <span key={app.id} className={i === actif ? 'is-active' : ''} />)}</div>
        <button type="button" onClick={() => aller(1)} aria-label="Application suivante"><ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
