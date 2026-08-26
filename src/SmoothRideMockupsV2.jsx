import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Bell, Check, ChevronRight, CircleCheck, Clock3,
  CreditCard, Crosshair, Home, LocateFixed, Lock, MapPin, Navigation,
  Route, Search, Settings, ShieldCheck, SlidersHorizontal, TriangleAlert,
  User, Users, WifiOff, X,
} from 'lucide-react'
import DATA from './smoothride-data.json'
import './smoothride-v2.css'

// ============================================================
// SmoothRide — maquette V2. Ref. MOB-2026-088.
// Perimetre : cahier des charges NOE-2026-088, ni plus ni moins.
//
// Deux registres visuels, volontairement separes :
//  - ONBOARDING : schema stylise. A 300 px de large, un fond
//    cartographique reel est bruite ; le schema dit la promesse
//    en une seconde.
//  - NAVIGATION : vraie carte Mapbox navigation-night, traces
//    calcules par Directions, dos-d'ane releves dans OSM.
// ============================================================

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''
const D = DATA
const C = { jade: '3FE0AC', rouge: 'FF6B5E', casing: '05100D',
            // sur la carte claire, le jade pale se perd : trace plus soutenu
            jadeMap: '0E9E70', rougeMap: 'E5453A' }

/** Polyline Google, precision 5 : indispensable pour que l'URL de l'image
 *  statique reste sous les 8 192 caracteres admis par Mapbox. */
function encPoly(coords) {
  let out = '', pLat = 0, pLng = 0
  const chunk = (v) => {
    let x = v < 0 ? ~(v << 1) : (v << 1), s2 = ''
    while (x >= 0x20) { s2 += String.fromCharCode((0x20 | (x & 0x1f)) + 63); x >>= 5 }
    return s2 + String.fromCharCode(x + 63)
  }
  for (const [lng, lat] of coords) {
    const la = Math.round(lat * 1e5), ln = Math.round(lng * 1e5)
    out += chunk(la - pLat) + chunk(ln - pLng)
    pLat = la; pLng = ln
  }
  return out
}

/** URL d'image statique equivalente a la carte interactive. */
function urlStatique({ routes, center, zoom, bearing, pitch, style }) {
  if (!TOKEN) return null
  const ov = []
  routes.forEach((r) => {
    const p = encodeURIComponent(encPoly(r.coords))
    ov.push(`path-${r.w + 3}+${style === STYLE_NUIT ? '02100C' : '0A1F19'}-0.45(${p})`)
    ov.push(`path-${r.w}+${r.color.replace('#', '')}-1(${p})`)
  })
  // Volontairement AUCUN marqueur sur le socle : les `pin-s` de l'API Static
  // sont des gouttes d'eau avec une ombre, impossibles a accorder a la
  // charte. Les dos-d'ane se dessinent en pastilles nettes sur la carte GL.
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/`
    + `${ov.length ? ov.join(',') + '/' : ''}`
    + `${center[0]},${center[1]},${zoom},${bearing},${pitch}/600x1180@2x`
    + `?access_token=${TOKEN}&logo=false&attribution=false`
}

const MAPBOX_VER = 'v3.9.0'
// Les styles `navigation-*` sont ceux que Mapbox concoit POUR la conduite :
// routes accentuees, vegetation et bati attenues. `streets-v12` peignait
// toute la foret en vert vif, d'ou l'impression de photo satellite.
// Le fond suit le theme : un chrome sombre sur une carte claire jure, et
// aucune application de navigation ne fait ca.
// Meme tarification pour tous les styles : un chargement reste un chargement.
const STYLE_JOUR = 'navigation-day-v1'
const STYLE_NUIT = 'navigation-night-v1'
const styleDe = (sombre) => (sombre ? STYLE_NUIT : STYLE_JOUR)

/** Le theme descend par contexte : la carte doit se reconstruire quand il
 *  change, un style Mapbox ne se remplace pas a chaud sans perdre les
 *  couches qu'on a posees dessus. */
const ThemeCtx = createContext('dark')

/** Charge mapbox-gl une seule fois pour toute la page, a la demande. */
// Nombre de cartes qu'un IntersectionObserver a reellement allumees. S'il
// reste a zero, c'est que l'observer ne fonctionne pas dans ce contexte
// (onglet en arriere-plan, fenetre repliee) et le filet prend le relais.
let allumeesParObserver = 0
let glPromise = null
function chargerGL() {
  if (glPromise) return glPromise
  glPromise = new Promise((resolve, reject) => {
    if (window.mapboxgl) return resolve(window.mapboxgl)
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VER}/mapbox-gl.css`
    document.head.appendChild(css)
    const sc = document.createElement('script')
    sc.src = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VER}/mapbox-gl.js`
    sc.async = true
    sc.onload = () => resolve(window.mapboxgl)
    sc.onerror = reject
    document.body.appendChild(sc)
  })
  return glPromise
}

/**
 * Vraie carte Mapbox, deplacable et zoomable.
 *
 * Elle ne s'initialise QUE lorsque son cadre entre dans l'ecran : une page
 * de dix-neuf ecrans qui lancerait dix cartes WebGL d'un coup serait
 * injouable sur telephone. Le zoom a la molette est desactive, sinon la
 * page ne defile plus des qu'on survole une carte.
 */
function MapLive({
  routes = [], bumps = [], depart, arrivee,
  center = D.centre, zoom = 12.4, bearing = 0, pitch = 0,
  interactive = true,
}) {
  const sombre = useContext(ThemeCtx) === 'dark'
  const hote = useRef(null)
  const carte = useRef(null)
  const [visible, setVisible] = useState(false)
  const [prete, setPrete] = useState(false)

  useEffect(() => {
    const el = hote.current
    if (!el) return undefined
    let fait = false
    const allumer = (parObserver) => {
      if (fait) return
      fait = true
      if (parObserver) allumeesParObserver += 1
      setVisible(true)
    }

    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { allumer(true); io.disconnect() }
    }, { rootMargin: '400px' })
    io.observe(el)

    // FILET DE SÉCURITÉ. L'IntersectionObserver ne rapporte aucune
    // intersection tant que le document n'est pas peint : onglet en
    // arriere-plan, fenetre repliee, capture automatisee. Sans repli la carte
    // reste vide POUR TOUJOURS, et une carte vide passe pour un bug.
    // On ne force que si l'observer n'a allume AUCUNE carte de la page :
    // en fonctionnement normal il en allume au moins une, et le chargement
    // paresseux des autres est preserve.
    const secours = setTimeout(() => {
      if (!fait && allumeesParObserver === 0) { allumer(false); io.disconnect() }
    }, 2000)

    return () => { io.disconnect(); clearTimeout(secours) }
  }, [])

  useEffect(() => {
    if (!visible || !TOKEN) return undefined
    if (carte.current) { carte.current.remove(); carte.current = null }
    let mort = false
    chargerGL().then((gl) => {
      if (mort || !hote.current) return
      gl.accessToken = TOKEN
      const m = new gl.Map({
        container: hote.current,
        style: `mapbox://styles/mapbox/${styleDe(sombre)}`,
        center, zoom, bearing, pitch,
        interactive,
        attributionControl: false,
        dragRotate: false,
      })
      m.scrollZoom.disable()
      // `idle` ne se declenche qu'apres une vraie peinture : c'est le seul
      // signal qui garantit que la carte est reellement visible.
      m.once('idle', () => { if (!mort) setPrete(true) })
      // Deux pieges Mapbox, mesures sur cette page :
      //  - `load` attend une premiere peinture : il ne se declenche JAMAIS
      //    tant que le document n'est pas visible.
      //  - `isStyleLoaded()` reste false dans le meme cas, alors meme que le
      //    style est telecharge et parse (134 couches relevees) et que les
      //    tuiles sont la.
      // Le seul signal fiable est la presence des couches dans getStyle().
      let essais = 0
      const quandPret = () => {
        if (!m || !m.getContainer()) return
        const st = (() => { try { return m.getStyle() } catch { return null } })()
        if (!st || !st.layers || !st.layers.length) {
          if (essais < 120) { essais += 1; setTimeout(quandPret, 60) }
          return
        }
        try {
        routes.forEach((r, i) => {
          const id = `r${i}`
          m.addSource(id, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: r.coords } } })
          // gaine sombre dessous, trait couleur dessus
          m.addLayer({ id: `${id}-c`, type: 'line', source: id, layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': sombre ? '#02100C' : '#0A1F19', 'line-width': r.w + 4, 'line-opacity': 0.35 } })
          m.addLayer({ id, type: 'line', source: id, layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': r.color, 'line-width': r.w } })
        })
        if (bumps.length) {
          m.addSource('b', { type: 'geojson', data: { type: 'FeatureCollection',
            features: bumps.map((c) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: c }, properties: {} })) } })
          m.addLayer({ id: 'b', type: 'circle', source: 'b',
            paint: {
              'circle-radius': 5.5,
              'circle-color': '#FF6B5E',
              'circle-stroke-width': 2.5,
              'circle-stroke-color': sombre ? '#0B1512' : '#FFFFFF',
            } })
        }
        ;[[depart, '#076B4C'], [arrivee, '#0A1F19']].forEach(([pt, col]) => {
          if (!pt) return
          const el2 = document.createElement('div')
          el2.style.cssText = `width:15px;height:15px;border-radius:50%;background:${col};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)`
          new gl.Marker({ element: el2 }).setLngLat(pt).addTo(m)
        })
        } catch {
          // le style peut encore bouger sous nos pieds : on retente
          if (essais < 120) { essais += 1; setTimeout(quandPret, 120) }
        }
      }
      quandPret()
      carte.current = m
    })
    return () => { mort = true; if (carte.current) { carte.current.remove(); carte.current = null } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, sombre])

  if (!TOKEN) return <div className="srv-map" aria-hidden="true" />
  const fixe = urlStatique({ routes, center, zoom, bearing, pitch, style: styleDe(sombre) })
  return (
    <div className="srv-map" aria-hidden="true">
      {/* L'image statique s'affiche TOUT DE SUITE. La carte deplacable se
          pose par-dessus des qu'elle a peint. Sans ce socle, une page dont
          le rendu WebGL est suspendu (onglet en arriere-plan, mobile
          econome) montre un rectangle vide, ce qui passe pour une panne. */}
      {fixe && <img className="srv-map-fixe" src={fixe} alt="" />}
      <div className="srv-map-live" ref={hote} data-pret={prete ? 'yes' : undefined} />
    </div>
  )
}

function goTo(id) {
  const el = document.getElementById(`srv-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/* ================= COMPOSANTS ================= */

function StatusBar() {
  return (
    <div className="srv-status">
      <span className="num">9:41</span>
      <span className="srv-status-r">
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor"><rect y="6" width="2.6" height="4" rx="1"/><rect x="4" y="4" width="2.6" height="6" rx="1"/><rect x="8" y="2" width="2.6" height="8" rx="1"/><rect x="12" width="2.6" height="10" rx="1"/></svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><path d="M7 9.6 4.2 6.8a4 4 0 0 1 5.6 0L7 9.6ZM1.4 4a8 8 0 0 1 11.2 0l-1.3 1.3a6.1 6.1 0 0 0-8.6 0L1.4 4Z"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x=".5" y=".5" width="18" height="10" rx="3" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="14" height="7" rx="1.6" fill="currentColor"/><path d="M20 4v3a2 2 0 0 0 0-3Z" fill="currentColor" opacity=".45"/></svg>
      </span>
    </div>
  )
}

function PhoneFrame({ children, theme = 'dark', tall = false }) {
  return (
    <ThemeCtx.Provider value={theme}>
      <div className={`srv-phone srv-${theme}${tall ? ' srv-phone-tall' : ''}`}>
        <span className="srv-island" />
        <StatusBar />
        {children}
        <span className="srv-home" />
      </div>
    </ThemeCtx.Provider>
  )
}

/** Logomark : une route dont l'ondulation s'aplanit. */
/** Logomark : la route entre par une bosse et repart plate. Deux idees
 *  fondues en une forme, lisible jusqu'a 16 px. Teste en niveaux de gris. */
function Mark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11.5" fill="var(--jade, #3FE0AC)" />
      <path
        d="M8 26.5q4-13 8 0h16"
        stroke="var(--jade-ink, #04231A)" strokeWidth="3.8"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

/** Logotype : le mark plus le nom. Sur fond clair ou sombre. */
function Logotype({ size = 26 }) {
  return (
    <span className="srv-logotype"><Mark size={size} /><b>SmoothRide</b></span>
  )
}

/**
 * Icone d'application.
 *
 *  - Apple : squircle a 22,37 % du cote, c'est le masque iOS.
 *  - Google Play : CARRE PARFAIT, jamais de coins arrondis faits main. Le
 *    store applique son propre masque, et un coin deja arrondi se retrouve
 *    rogne deux fois.
 *
 * Le glyphe occupe 74 % de la tuile : en dessous il flotte, au-dessus il
 * touche les bords une fois le masque applique.
 */
function AppIcon({ px = 96, store = 'apple', ombre = true }) {
  const g = Math.round(px * 0.74)
  return (
    <span
      className="srv-appicon-tile"
      data-shadow={ombre ? 'yes' : undefined}
      style={{
        width: px, height: px, background: '#3FE0AC',
        borderRadius: store === 'google' ? Math.round(px * 0.04) : '22.37%',
      }}
    >
      <svg width={g} height={g} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M5 27.5q6-18 12 0h18" stroke="#04231A" strokeWidth="4.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function UiButton({ children, tone = '', size = '', goto }) {
  const cls = ['srv-btn', tone && `srv-btn-${tone}`, size && `srv-btn-${size}`].filter(Boolean).join(' ')
  return <button type="button" className={cls} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
const IconButton = ({ children, goto }) => (
  <button type="button" className="srv-icon-btn" onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
)
const Pill = ({ tone = '', children }) => (
  <span className={`srv-pill${tone ? ` srv-pill-${tone}` : ''}`}>{children}</span>
)
const TopBar = ({ title, back = false, action }) => (
  <div className="srv-top">
    {back && <span className="srv-back"><ArrowLeft size={14} /></span>}
    <h2>{title}</h2>
    {action}
  </div>
)
const Head = ({ children, action }) => (
  <div className="srv-head"><span>{children}</span>{action && <span>{action}</span>}</div>
)
const Note = ({ tone, icon, title, text }) => (
  <div className="srv-note" data-t={tone}>{icon}<div><strong>{title}</strong>{text && <small>{text}</small>}</div></div>
)
const Row = ({ icon, tone, title, meta, trailing, goto }) => (
  <button type="button" className="srv-row" onClick={goto ? () => goTo(goto) : undefined}>
    <span className="srv-row-i" data-t={tone}>{icon}</span>
    <span className="srv-row-b"><strong>{title}</strong>{meta && <small>{meta}</small>}</span>
    <span style={{ color: 'var(--ink-3)', fontSize: 'var(--t-label)' }}>{trailing ?? <ChevronRight size={14} />}</span>
  </button>
)
const Dots = ({ i = 0, n = 3 }) => (
  <div className="srv-dots">{Array.from({ length: n }, (_, k) => <i key={k} data-on={k === i ? 'yes' : undefined} />)}</div>
)

function TabBar({ active = 'map' }) {
  const tabs = [
    { id: 'map', l: 'Carte', ic: <Route size={16} />, g: 'home-map' },
    { id: 'hist', l: 'Trajets', ic: <Clock3 size={16} />, g: 'history' },
    { id: 'adm', l: 'Gestion', ic: <ShieldCheck size={16} />, g: 'admin' },
    { id: 'me', l: 'Compte', ic: <User size={16} />, g: 'settings' },
  ]
  return (
    <nav className="srv-tabs">
      {tabs.map((t) => (
        <button key={t.id} type="button" className="srv-tab" data-on={t.id === active ? 'yes' : undefined} onClick={() => goTo(t.g)}>
          {t.ic}<span>{t.l}</span>
        </button>
      ))}
    </nav>
  )
}

/** Profil de secousse : une dent par dos-d'ane. C'est la DENSITE qui se
 *  compare. La seule donnee que SmoothRide mesure et qu'aucun concurrent
 *  n'affiche. */
const Profil = ({ n, kind }) => (
  <svg className="srv-profile" data-k={kind} viewBox="0 0 100 13" preserveAspectRatio="none" aria-hidden="true">
    <line className="srv-profile-base" x1="2" y1="11" x2="98" y2="11" vectorEffect="non-scaling-stroke" />
    {Array.from({ length: n }, (_, i) => 3 + ((i + 0.5) * 94) / n).map((x, i) => (
      <line key={i} className="srv-profile-t" x1={x} y1="11" x2={x} y2="2" vectorEffect="non-scaling-stroke" />
    ))}
  </svg>
)

function RouteRow({ soft, min, bumps, on, goto }) {
  return (
    <button type="button" className="srv-route" data-on={on ? 'yes' : undefined} onClick={goto ? () => goTo(goto) : undefined}>
      <span className="srv-route-name">
        <i style={{ background: soft ? 'var(--jade)' : 'var(--rouge)' }} />
        {soft ? 'Le plus doux' : 'Le plus rapide'}
      </span>
      <Pill tone={soft ? 'jade' : 'rouge'}><span className="num">{bumps}</span> dos-d&apos;âne</Pill>
      <span className="srv-route-time num">{min} min</span>
      {bumps > 0 && (
        <span style={{ gridColumn: '1 / -1' }}>
          <Profil n={Math.min(bumps, 22)} kind={soft ? 'soft' : 'fast'} />
        </span>
      )}
    </button>
  )
}

/* ============ ÉCRAN DE PROMESSE — schema, pas carte ============ */

function SchemeArt() {
  return (
    <div className="srv-scheme" aria-hidden="true">
      <svg viewBox="0 0 260 190" preserveAspectRatio="xMidYMid meet">
        <g className="srv-scheme-grid">
          {[38, 76, 114, 152].map((y) => <line key={y} x1="12" y1={y} x2="248" y2={y} />)}
          {[70, 130, 190].map((x) => <line key={x} x1={x} y1="14" x2={x} y2="176" />)}
        </g>
        <path className="srv-scheme-fast" d="M28 158 L96 162 L150 120 L196 92 L228 50" />
        {[[96, 162], [150, 120], [196, 92], [216, 66]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8" fill="var(--rouge)" />
            <path d={`M${cx - 3.6} ${cy + 1.4} q3.6 -4.6 7.2 0`} stroke="#FFF" strokeWidth="1.7" fill="none" strokeLinecap="round" />
          </g>
        ))}
        <path className="srv-scheme-halo" d="M28 158 L42 96 L120 74 L186 60 L232 44" />
        <path className="srv-scheme-soft" d="M28 158 L42 96 L120 74 L186 60 L232 44" />
        <circle cx="28" cy="158" r="7" fill="var(--ink)" stroke="var(--bg)" strokeWidth="3" />
        <circle cx="232" cy="44" r="11" fill="var(--jade)" />
        <path d="M227 44.5 l3.4 3.4 L237 41" stroke="var(--jade-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Onboarding() {
  return (
    <div className="srv-body">
      <div className="srv-brand"><Mark size={24} /><span>SmoothRide</span></div>
      <SchemeArt />
      <h1 className="srv-h">Le même trajet,<em>sans les secousses.</em></h1>
      <p className="srv-lead">
        Deux routes, le nombre de dos-d&apos;âne sur chacune, et ce que le confort coûte
        en minutes.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <RouteRow min={18} bumps={4} />
        <RouteRow soft min={20} bumps={0} on />
      </div>
      <Dots i={0} />
      <div className="srv-bottom">
        <UiButton goto="permission">Commencer</UiButton>
        <button type="button" className="srv-link" onClick={() => goTo('signup')}>J&apos;ai déjà un compte</button>
      </div>
    </div>
  )
}

/* ================= ENTRÉE ================= */

function Permission() {
  return (
    <div className="srv-body">
      <TopBar title="" back />
      <div className="srv-empty" style={{ justifyContent: 'flex-start', paddingTop: 6 }}>
        <span className="srv-empty-i" style={{ background: 'var(--jade-soft)', borderColor: 'var(--jade-line)', color: 'var(--jade)' }}>
          <LocateFixed size={24} />
        </span>
        <h2 className="srv-title" style={{ marginTop: 4 }}>Où es-tu ?</h2>
        <p>Sans ta position, SmoothRide ne peut ni calculer ton trajet ni te guider en roulant.</p>
      </div>
      <div className="srv-panel">
        <Row icon={<Navigation size={14} />} tone="jade" title="Pendant que tu roules" meta="pour calculer et suivre le trajet" trailing={<Check size={14} />} />
        <Row icon={<MapPin size={14} />} title="Écran éteint" meta="pour continuer à te guider" trailing={<Check size={14} />} />
      </div>
      <Dots i={1} />
      <div className="srv-bottom">
        <UiButton goto="home-map">Autoriser</UiButton>
        <button type="button" className="srv-link" onClick={() => goTo('denied')}>Plus tard</button>
      </div>
    </div>
  )
}

function Denied() {
  return (
    <div className="srv-body">
      <TopBar title="Position" back />
      <div className="srv-empty" style={{ justifyContent: 'flex-start', paddingTop: 10 }}>
        <span className="srv-empty-i" style={{ background: 'var(--rouge-soft)', borderColor: 'rgba(255,107,94,.34)', color: 'var(--rouge)' }}>
          <TriangleAlert size={24} />
        </span>
        <h2 className="srv-title" style={{ marginTop: 4 }}>La navigation est coupée</h2>
        <p>Tu peux consulter la carte et les dos-d&apos;âne connus, mais pas lancer de trajet.</p>
      </div>
      <Note tone="rouge" icon={<Settings size={14} />} title="Deux gestes pour réactiver" text="Réglages, SmoothRide, puis Position : pendant l'utilisation." />
      <div className="srv-bottom">
        <UiButton>Ouvrir les réglages</UiButton>
        <button type="button" className="srv-link" onClick={() => goTo('home-map')}>Continuer sans navigation</button>
      </div>
    </div>
  )
}

function Signup() {
  return (
    <div className="srv-body">
      <TopBar title="Enregistrer ce trajet" back />
      <h1 className="srv-title">Crée ton compte</h1>
      <p className="srv-lead">Pour retrouver tes adresses et ton abonnement sur un autre téléphone.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="srv-field srv-field-on"><User size={14} /><strong>alex.moreau@mail.fr</strong></div>
        <div className="srv-field"><Lock size={14} /><span>Mot de passe</span></div>
      </div>
      <Note tone="neutral" icon={<ShieldCheck size={14} />} title="Tes trajets restent sur ton téléphone" text="Seuls les dos-d'âne que tu signales sont partagés, sans ton identité." />
      <div className="srv-bottom">
        <UiButton goto="paywall">Créer mon compte</UiButton>
        <button type="button" className="srv-link">Se connecter</button>
      </div>
    </div>
  )
}

/* ============ TROUVER UN TRAJET — vraie carte ============ */

function HomeMap() {
  return (
    <div className="srv-body srv-body-flush srv-body-tab">
      <MapLive bumps={D.zone.slice(0, 26)} depart={D.depart} center={D.depart} zoom={13.4} />
      <div className="srv-layer">
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="srv-search" style={{ flex: '1 1 auto' }} onClick={() => goTo('search')}>
            <Search size={14} /><span>Où vas-tu ?</span>
          </button>
          <IconButton goto="settings"><SlidersHorizontal size={15} /></IconButton>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 9, paddingBottom: 72 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}><IconButton><Crosshair size={15} /></IconButton></div>
          <div className="srv-sheet" style={{ margin: 0, borderRadius: 'var(--r-card)', maxHeight: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="srv-row-i" data-t="rouge"><TriangleAlert size={14} /></span>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--t-body)', fontWeight: 800 }}>
                  <span className="num">{D.zone.length}</span> dos-d&apos;âne autour de toi
                </strong>
                <small style={{ display: 'block', fontSize: 'var(--t-label)', color: 'var(--ink-2)' }}>Source OpenStreetMap</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabBar active="map" />
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="srv-body">
      <TopBar title="Nouveau trajet" back />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div className="srv-field"><i style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--ink-3)', display: 'block' }} /><strong>Ma position</strong></div>
        <div className="srv-field srv-field-on"><i style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--jade)', display: 'block' }} /><span>Où vas-tu ?</span></div>
      </div>
      <Head>Favoris</Head>
      <div className="srv-panel">
        <Row icon={<Home size={14} />} tone="jade" title="Domicile" meta="12 rue des Pins, Colombes" goto="compare" />
        <Row icon={<MapPin size={14} />} title="Travail" meta="24 av. Victor Hugo, Paris 16e" goto="compare" />
      </div>
      <Head>Récemment</Head>
      <div className="srv-panel">
        <Row icon={<Clock3 size={14} />} title="Garage Premium Auto" meta="Levallois-Perret" goto="compare" />
        <Row icon={<Clock3 size={14} />} title="Circuit Carole" meta="Tremblay-en-France" goto="no-bump" />
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, color: '#9AA8A2', w: 4 }]} zoom={11.3} interactive={false} />
      <div className="srv-layer">
        <div className="srv-search"><Route size={14} /><span>Je compare les deux trajets…</span></div>
        <div className="srv-sheet">
          <span className="srv-grab" />
          <div className="srv-skel" style={{ height: 56 }} />
          <div className="srv-skel" style={{ height: 56 }} />
          <div className="srv-skel" style={{ height: 48, borderRadius: 999 }} />
        </div>
      </div>
    </div>
  )
}

function Compare() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive
        routes={[{ coords: D.rapide.coords, color: '#E5453A', w: 4 }, { coords: D.confort.coords, color: '#076B4C', w: 6 }]}
        bumps={D.rapide.bumps} depart={D.depart} arrivee={D.arrivee} zoom={11.3}
      />
      <div className="srv-layer">
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton goto="search"><ArrowLeft size={15} /></IconButton>
          <div className="srv-search" style={{ flex: '1 1 auto' }}><MapPin size={14} /><strong>Travail</strong></div>
        </div>
        <span className="srv-tag" data-k="soft" style={{ top: 116, left: 20 }}>
          <span className="num">{D.evites}</span> dos-d&apos;âne évités
        </span>
        <span className="srv-tag" data-k="fast" style={{ top: 206, right: 18 }}>Le plus rapide</span>
        <div className="srv-sheet">
          <span className="srv-grab" />
          <RouteRow min={D.rapide.min} bumps={D.rapide.bumps.length} />
          <RouteRow soft min={D.confort.min} bumps={D.confort.bumps.length} on />
          <UiButton goto="navigation"><Navigation size={14} />C&apos;est parti</UiButton>
        </div>
      </div>
    </div>
  )
}

function NoBump() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, color: '#076B4C', w: 6 }]} depart={D.depart} arrivee={D.arrivee} zoom={11.3} />
      <div className="srv-layer">
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton goto="search"><ArrowLeft size={15} /></IconButton>
          <div className="srv-search" style={{ flex: '1 1 auto' }}><MapPin size={14} /><strong>Circuit Carole</strong></div>
        </div>
        <div className="srv-sheet">
          <span className="srv-grab" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="srv-row-i" data-t="jade" style={{ width: 36, height: 36, borderRadius: 11 }}><CircleCheck size={18} /></span>
            <div>
              <strong style={{ display: 'block', fontSize: 'var(--t-lead)', fontWeight: 800 }}>Aucun dos-d&apos;âne</strong>
              <small style={{ display: 'block', fontSize: 'var(--t-label)', color: 'var(--ink-2)' }}>Le plus rapide est aussi le plus doux.</small>
            </div>
          </div>
          <RouteRow soft min={26} bumps={0} on />
          <UiButton goto="navigation"><Navigation size={14} />C&apos;est parti</UiButton>
        </div>
      </div>
    </div>
  )
}

/* ============ ROULER — vue GPS ============ */

function NavScreen() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.confort.coords, color: '#076B4C', w: 8 }]} center={D.confort.coords[18]} zoom={15.6} bearing={34} pitch={58} />
      <div className="srv-layer">
        <div className="srv-instr">
          <ArrowRight size={25} color="var(--jade)" style={{ transform: 'rotate(-45deg)' }} />
          <div>
            <span className="srv-instr-d num">{D.instruction.m} m</span>
            <small>{D.instruction.texte}</small>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Pill tone="jade"><CircleCheck size={11} /><span className="num">{D.evites}</span> évités</Pill>
          <button type="button" className="srv-fab" onClick={() => goTo('report')} aria-label="Signaler un dos-d'âne">
            <TriangleAlert size={21} />
          </button>
        </div>
        <div className="srv-drive" style={{ marginTop: 9, marginBottom: 4 }}>
          <div><strong className="num">14 min</strong><small>Restant</small></div>
          <div><strong className="num">18:42</strong><small>Arrivée</small></div>
          <div><strong className="num">{String(D.confort.km).replace('.', ',')} km</strong><small>Distance</small></div>
        </div>
      </div>
    </div>
  )
}

function Report() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.confort.coords, color: '#076B4C', w: 8 }]} bumps={[D.confort.bumps[0]]} center={D.confort.bumps[0]} zoom={15.8} bearing={34} pitch={54} />
      <div className="srv-layer">
        <div className="srv-instr">
          <ArrowRight size={25} color="var(--jade)" style={{ transform: 'rotate(-45deg)' }} />
          <div><span className="srv-instr-d num">{D.instruction.m} m</span><small>{D.instruction.texte}</small></div>
        </div>
        <div className="srv-sheet">
          <span className="srv-grab" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="srv-row-i" data-t="jade" style={{ width: 36, height: 36, borderRadius: 11 }}><CircleCheck size={18} /></span>
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
              <strong style={{ display: 'block', fontSize: 'var(--t-lead)', fontWeight: 800 }}>C&apos;est noté</strong>
              <small style={{ display: 'block', fontSize: 'var(--t-label)', color: 'var(--ink-2)' }}>Position enregistrée, tu n&apos;as rien d&apos;autre à faire.</small>
            </div>
            <button type="button" className="srv-icon-btn" style={{ width: 30, height: 30 }}><X size={14} /></button>
          </div>
          <Note tone="neutral" icon={<Users size={14} />} title="Visible après 3 confirmations" text="D'autres conducteurs doivent passer au même endroit." />
        </div>
      </div>
    </div>
  )
}

function Reroute() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, color: '#9AA8A2', w: 4 }, { coords: D.confort.coords, color: '#076B4C', w: 6 }]} bumps={D.rapide.bumps.slice(0, 6)} zoom={11.4} />
      <div className="srv-layer">
        <div className="srv-instr">
          <Route size={23} color="var(--jade)" />
          <div><span className="srv-instr-d">Nouveau trajet</span><small>Tu t&apos;es écarté de l&apos;itinéraire</small></div>
        </div>
        <span className="srv-tag" data-k="soft" style={{ top: 138, left: 22 }}>
          <span className="num">3</span> dos-d&apos;âne évités
        </span>
        <div className="srv-sheet">
          <span className="srv-grab" />
          <strong style={{ fontSize: 'var(--t-lead)', fontWeight: 800 }}>Reprendre par le plus doux ?</strong>
          <small style={{ fontSize: 'var(--t-body)', color: 'var(--ink-2)' }}>
            <span className="num">2</span> minutes de plus, <span className="num">3</span> dos-d&apos;âne en moins.
          </small>
          <div style={{ display: 'flex', gap: 7 }}>
            <UiButton tone="ghost" goto="navigation">Continuer</UiButton>
            <UiButton goto="navigation">Nouveau trajet</UiButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= ABONNEMENT ================= */

function Paywall() {
  return (
    <div className="srv-body">
      <div className="srv-top" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="srv-icon-btn" style={{ width: 30, height: 30 }}><X size={14} /></button>
      </div>
      <h1 className="srv-h">Tes 10 trajets<em>sont passés.</em></h1>
      <p className="srv-lead">Tu as évité <b style={{ color: 'var(--ink)' }}>34 dos-d&apos;âne</b> depuis ton inscription. On continue ?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div className="srv-benef"><CircleCheck size={14} color="var(--jade)" /><span><strong>Trajets illimités</strong>, sans compteur</span></div>
        <div className="srv-benef"><CircleCheck size={14} color="var(--jade)" /><span>La comparaison sur <strong>chaque trajet</strong></span></div>
        <div className="srv-benef"><CircleCheck size={14} color="var(--jade)" /><span><span className="num">120 000</span> dos-d&apos;âne référencés</span></div>
      </div>
      <button type="button" className="srv-plan" data-on="yes">
        <strong>Sans engagement</strong>
        <span className="srv-plan-p num">15 €</span>
        <small>Par mois, résiliable quand tu veux</small>
      </button>
      <div className="srv-bottom">
        <UiButton goto="subscribed">S&apos;abonner</UiButton>
        <button type="button" className="srv-link">Restaurer un achat</button>
        <p className="srv-legal">Paiement via l&apos;App Store. Résiliation dans tes réglages Apple.</p>
      </div>
    </div>
  )
}

function Subscribed() {
  return (
    <div className="srv-body srv-body-scroll">
      <TopBar title="Abonnement" back />
      <div className="srv-panel" style={{ padding: '12px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <span className="srv-row-i" data-t="jade" style={{ width: 36, height: 36, borderRadius: 11 }}><CreditCard size={17} /></span>
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <strong style={{ display: 'block', fontSize: 'var(--t-body)', fontWeight: 800 }}>Abonnement actif</strong>
          <small style={{ display: 'block', fontSize: 'var(--t-label)', color: 'var(--ink-2)' }}>
            <span className="num">15 €</span> par mois, prochain le <span className="num">26 septembre</span>
          </small>
        </div>
        <Pill tone="jade">Actif</Pill>
      </div>
      <Head>Depuis ton abonnement</Head>
      <div className="srv-kpis">
        <div className="srv-kpi"><span>Évités</span><strong className="num">147</strong><small>sur 38 trajets</small></div>
        <div className="srv-kpi"><span>Temps ajouté</span><strong className="num">2 h 12</strong><small>3 min par trajet</small></div>
      </div>
      <div className="srv-panel">
        <Row icon={<CreditCard size={14} />} title="Restaurer mes achats" meta="après un changement de téléphone" />
        <Row icon={<Settings size={14} />} title="Gérer dans l'App Store" meta="résiliation, paiement" />
      </div>
      <Note tone="neutral" icon={<ShieldCheck size={14} />} title="La résiliation passe par Apple" text="Comme tout abonnement iPhone, depuis tes réglages." />
    </div>
  )
}

/* ================= COMPTE ================= */

function SettingsScreen() {
  return (
    <div className="srv-body srv-body-scroll srv-body-tab">
      <TopBar title="Compte" />
      <div className="srv-panel">
        <Row icon={<User size={14} />} tone="jade" title="alex.moreau@mail.fr" meta="Compte créé le 12 août 2026" />
        <Row icon={<CreditCard size={14} />} title="Abonnement" meta="Actif, 15 € par mois" trailing={<Pill tone="jade">Actif</Pill>} goto="subscribed" />
      </div>
      <Head>Conduite</Head>
      <div className="srv-panel">
        <Row icon={<Route size={14} />} title="Trajet préféré" meta="Proposer le plus doux en premier" />
        <Row icon={<MapPin size={14} />} title="Adresses favorites" meta="Domicile, travail" />
        <Row icon={<Bell size={14} />} title="Alertes" meta="Prévenir avant un dos-d'âne" />
      </div>
      <Head>Application</Head>
      <div className="srv-panel">
        <Row icon={<Settings size={14} />} title="Unités et thème" meta="Kilomètres, sombre" />
        <Row icon={<Lock size={14} />} title="Confidentialité" meta="CGU, données personnelles" />
        <Row icon={<MapPin size={14} />} title="Données cartographiques" meta="© OpenStreetMap, © Mapbox" />
      </div>
      <TabBar active="me" />
    </div>
  )
}

function History() {
  return (
    <div className="srv-body srv-body-scroll srv-body-tab">
      <TopBar title="Mes trajets" />
      <div className="srv-kpis">
        <div className="srv-kpi"><span>Ce mois-ci</span><strong className="num">38</strong><small>trajets</small></div>
        <div className="srv-kpi"><span>Évités</span><strong className="num">147</strong><small>dos-d&apos;âne</small></div>
      </div>
      <Head action="Aujourd'hui">Derniers trajets</Head>
      <div className="srv-panel">
        <Row icon={<Home size={14} />} tone="jade" title="Domicile" meta="18:42 · 14,1 km · 22 min" trailing={<Pill tone="jade">6 évités</Pill>} />
        <Row icon={<MapPin size={14} />} title="Travail" meta="08:15 · 12,9 km · 19 min" trailing={<Pill tone="jade">4 évités</Pill>} />
        <Row icon={<MapPin size={14} />} title="Garage Premium Auto" meta="Hier · 8,4 km · 14 min" trailing={<Pill tone="rouge">2 subis</Pill>} />
      </div>
      <Note tone="neutral" icon={<Lock size={14} />} title="Tes trajets restent sur ce téléphone" text="Ils ne sont ni envoyés ni partagés." />
      <TabBar active="hist" />
    </div>
  )
}

function NetworkError() {
  return (
    <div className="srv-body">
      <TopBar title="Nouveau trajet" back />
      <div className="srv-empty">
        <span className="srv-empty-i" style={{ background: 'var(--rouge-soft)', borderColor: 'rgba(255,107,94,.34)', color: 'var(--rouge)' }}>
          <WifiOff size={24} />
        </span>
        <h2 className="srv-title">Pas de réseau</h2>
        <p>Le trajet n&apos;a pas pu être calculé. Les dos-d&apos;âne déjà téléchargés restent visibles.</p>
      </div>
      <div className="srv-bottom">
        <UiButton goto="compare">Réessayer</UiButton>
        <button type="button" className="srv-link" onClick={() => goTo('home-map')}>Revenir à la carte</button>
      </div>
    </div>
  )
}

/* ================= ADMINISTRATION ================= */

function Admin() {
  return (
    <div className="srv-body srv-body-scroll srv-body-tab">
      <TopBar title="Signalements" action={<Pill tone="wait">42 en attente</Pill>} />
      <div className="srv-panel">
        {[['Rue Brenu, Gennevilliers', '3 fois · il y a 2 h'], ['Av. Victor Hugo, Colombes', '1 fois · il y a 5 h']].map(([t, m]) => (
          <div className="srv-row" key={t} style={{ gridTemplateColumns: 'auto 1fr', alignItems: 'flex-start' }}>
            <span className="srv-row-i" data-t="rouge"><TriangleAlert size={14} /></span>
            <div className="srv-row-b">
              <strong>{t}</strong><small>{m}</small>
              <div style={{ display: 'flex', gap: 6, marginTop: 7 }}>
                <button type="button" className="srv-pill" style={{ background: 'var(--jade)', color: 'var(--jade-ink)' }}>Valider</button>
                <button type="button" className="srv-pill">Rejeter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Head>Base</Head>
      <div className="srv-kpis">
        <div className="srv-kpi"><span>Référencés</span><strong className="num">121 480</strong><small>dont 1 480 communautaires</small></div>
        <div className="srv-kpi"><span>Abonnés</span><strong className="num">108</strong><small>+ 14 ce mois-ci</small></div>
      </div>
      <Note tone="neutral" icon={<Lock size={14} />} title="Les revenus se lisent chez Apple et Google" text="SmoothRide n'encaisse rien directement." />
      <TabBar active="adm" />
    </div>
  )
}

/* ================= LE DOSSIER ================= */

const FLOWS = [
  {
    n: '03', title: "L'entrée",
    note: "Deux écrans avant la carte. Le compte n'est pas demandé ici : il arrive quand il sert. Quatre appuis suffisent pour atteindre la comparaison.",
    items: [
      { id: 'permission', t: 'Ta position', s: "Expliquée avant d'être demandée", el: <Permission />, notes: ['Cliquable : Autoriser'] },
      { id: 'denied', t: 'Position refusée', s: "L'app reste consultable", el: <Denied />, notes: ["État d'erreur"] },
    ],
  },
  {
    n: '04', title: 'Trouver un trajet',
    note: "La carte est l'écran d'accueil. Les fonds sont de vrais rendus Mapbox, les itinéraires viennent de l'API Directions et les dos-d'âne d'OpenStreetMap.",
    items: [
      { id: 'home-map', t: 'Carte', s: "Les dos-d'âne connus autour de toi", el: <HomeMap />, notes: ['Cliquable : Où vas-tu ?'] },
      { id: 'search', t: 'Recherche', s: 'Favoris et trajets récents', el: <SearchScreen />, notes: ['Cliquable : une adresse'] },
      { id: 'loading', t: 'Calcul', s: 'Pendant la comparaison', el: <Loading />, notes: ['État de chargement'] },
      { id: 'compare', t: 'Comparaison', s: "L'écran qui porte toute la valeur", el: <Compare />, notes: ['Le gain est écrit sur le tracé', "Cliquable : C'est parti"] },
      { id: 'no-bump', t: "Aucun dos-d'âne", s: 'Un seul trajet, dit clairement', el: <NoBump />, notes: ['État neutre'] },
    ],
  },
  {
    n: '05', title: 'Rouler',
    note: "Au volant tout se lit en une fraction de seconde. Le signalement se fait d'un seul appui, là où les autres applications en demandent deux.",
    items: [
      { id: 'navigation', t: 'Navigation', s: 'Vue conduite, prochaine instruction', el: <NavScreen />, notes: ['Signalement en un appui', 'Cliquable : le bouton rouge'] },
      { id: 'report', t: 'Signalement envoyé', s: 'Sans quitter la route', el: <Report /> },
      { id: 'reroute', t: 'Recalcul', s: 'Une proposition chiffrée', el: <Reroute />, notes: ['Cliquable : les deux boutons'] },
    ],
  },
  {
    n: '06', title: "L'abonnement",
    note: "Dix trajets offerts, une fois pour toutes. L'écran rappelle ce qui a déjà été évité avant de demander quoi que ce soit.",
    items: [
      { id: 'signup', t: 'Création de compte', s: 'Demandée quand elle sert', el: <Signup />, notes: ['Après le moment de valeur'] },
      { id: 'paywall', t: 'Fin des trajets offerts', s: 'La preuve avant la demande', el: <Paywall />, notes: ["Cliquable : S'abonner"] },
      { id: 'subscribed', t: 'Abonnement actif', s: 'Suivi et restauration', el: <Subscribed />, scroll: true },
    ],
  },
  {
    n: '07', title: 'Son compte',
    note: 'Réglages et historique, accessibles depuis la barre du bas. Rien ne quitte le téléphone.',
    items: [
      { id: 'settings', t: 'Compte', s: 'Abonnement, conduite, application', el: <SettingsScreen />, scroll: true },
      { id: 'history', t: 'Historique', s: "Ce que l'app a évité", el: <History />, scroll: true },
      { id: 'network-error', t: 'Pas de réseau', s: 'Ce qui reste possible hors ligne', el: <NetworkError />, notes: ["État d'erreur"] },
    ],
  },
  {
    n: '08', title: "L'espace d'administration",
    note: 'Le second profil, réservé au propriétaire. Il vit dans l’app, sans outil séparé à installer.',
    items: [
      { id: 'admin', t: 'Signalements et base', s: 'Valider, rejeter, suivre', el: <Admin />, scroll: true },
    ],
  },
]

export default function SmoothRideMockupsV2() {
  // Un seul jeu d'ecrans, deux ambiances. Le client bascule et compare,
  // plutot que de lire deux galeries en parallele.
  const [theme, setTheme] = useState('dark')
  return (
    <main className="srv">
      <div className="srv-wrap">
        <header className="srv-hero">
          <p className="srv-hero-eyebrow">Proposition design</p>
          <div className="srv-light" style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <Logotype size={44} />
          </div>
          <p className="srv-hero-ref">SmoothRide · MOB-2026-088</p>
          <span className="srv-chip"><i />Maquette interactive, touche les boutons</span>
        </header>

        <div style={{ textAlign: 'center' }}>
          <div className="srv-switch" role="group" aria-label="Choisir l'ambiance">
            {[['dark', 'Sombre'], ['light', 'Clair']].map(([id, l]) => (
              <button key={id} type="button" aria-pressed={theme === id} onClick={() => setTheme(id)}>{l}</button>
            ))}
          </div>
        </div>

        <section className="srv-sec">
          <p className="srv-sec-num">01</p>
          <h2>La charte graphique</h2>
          <p className="srv-sec-note">
            L&apos;identité de SmoothRide, posée avant les écrans : le logo, l&apos;icône de
            l&apos;application, les couleurs et ce qu&apos;elles veulent dire, les textes et les boutons.
            Tout ce qui suit en découle.
          </p>

          <div className="srv-da">
            <div className="srv-da-card srv-da-wide">
              <h3>Le logo</h3>
              <div className="srv-logos">
                <div className="srv-logo-box" data-bg="clair"><Logotype size={30} /><small>Sur fond clair</small></div>
                <div className="srv-logo-box" data-bg="sombre"><Logotype size={30} /><small>Sur fond sombre</small></div>
                <div className="srv-logo-box" data-bg="clair" data-full="yes">
                  <div className="srv-appicons">
                    <span className="srv-appicon"><AppIcon px={92} store="apple" /><span>App Store</span></span>
                    <span className="srv-appicon"><AppIcon px={92} store="google" /><span>Google Play</span></span>
                    <span className="srv-appicon"><AppIcon px={44} /><span>44 px</span></span>
                    <span className="srv-appicon"><AppIcon px={22} ombre={false} /><span>22 px</span></span>
                  </div>
                  <small>Icône de l&apos;application</small>
                </div>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'var(--canvas-soft)', lineHeight: 1.55 }}>
                La route entre par une bosse et repart plate : les deux idées du produit
                fondues en une forme. Elle reste lisible jusqu&apos;à 22 px, la taille d&apos;un
                réglage iPhone. Apple arrondit la tuile lui-même, Google Play aussi :
                l&apos;icône se livre donc carrée pour Android, sinon les coins sont rognés deux fois.
              </p>
            </div>

            <div className="srv-da-card">
              <h3>Les couleurs</h3>
              <div className="srv-swatches">
                <div className="srv-swatch"><i style={{ background: '#3FE0AC' }} /><div><b>Jade</b><span>la route douce, et l&apos;action</span></div></div>
                <div className="srv-swatch"><i style={{ background: '#FF6B5E' }} /><div><b>Corail</b><span>un dos-d&apos;âne, rien d&apos;autre</span></div></div>
                <div className="srv-swatch"><i style={{ background: '#0B1512' }} /><div><b>Nuit</b><span>le fond de l&apos;écran de conduite</span></div></div>
                <div className="srv-swatch"><i style={{ background: '#F7FAF9', borderColor: '#DDE7E3' }} /><div><b>Jour</b><span>le fond de tous les autres écrans</span></div></div>
                <div className="srv-swatch"><i style={{ background: '#0A1F19' }} /><div><b>Encre</b><span>le texte, jamais de noir dur</span></div></div>
              </div>
            </div>

            <div className="srv-da-card">
              <h3>Les textes</h3>
              <div className="srv-scale">
                <div><b style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em' }}>Le même trajet</b><span>promesse</span></div>
                <div><b style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.022em' }}>23 min</b><span>la durée</span></div>
                <div><b style={{ fontSize: 13, fontWeight: 800 }}>Le plus doux</b><span>titre de carte</span></div>
                <div><b style={{ fontSize: 11.5 }}>Ce que le confort coûte en minutes</b><span>texte courant</span></div>
                <div><b style={{ fontSize: 10, fontWeight: 800 }}>11 dos-d&apos;âne</b><span>étiquette</span></div>
              </div>
            </div>

            <div className="srv-da-card">
              <h3>Les boutons</h3>
              <div className="srv-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button type="button" className="srv-btn srv-btn-inline">C&apos;est parti</button>
                <button type="button" className="srv-btn srv-btn-ghost srv-btn-inline">Continuer</button>
                <button type="button" className="srv-btn srv-btn-off srv-btn-inline">Indisponible</button>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--canvas-soft)', lineHeight: 1.5 }}>
                  Une seule action pleine par écran. Chaque bouton s&apos;enfonce sous le doigt.
                </p>
              </div>
            </div>

            <div className="srv-da-card srv-da-wide">
              <h3>Et quand ça ne va pas, quatre situations prévues</h3>
              <div className="srv-da-states srv-dark">
                <div className="srv-da-state">
                  <h4>Une erreur</h4>
                  <Note tone="rouge" icon={<TriangleAlert size={14} />} title="La navigation est coupée" text="Ta position est refusée." />
                </div>
                <div className="srv-da-state">
                  <h4>Rien à signaler</h4>
                  <Note tone="neutral" icon={<CircleCheck size={14} />} title="Aucun dos-d&apos;âne" text="Le plus rapide est aussi le plus doux." />
                </div>
                <div className="srv-da-state">
                  <h4>Un chargement</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <div className="srv-skel" style={{ height: 13, width: '58%' }} />
                    <div className="srv-skel" style={{ height: 32 }} />
                    <div className="srv-skel" style={{ height: 32, width: '82%' }} />
                  </div>
                </div>
                <div className="srv-da-state">
                  <h4>Une réussite</h4>
                  <Note icon={<CircleCheck size={14} />} title="C&apos;est noté" text="Position enregistrée." />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="srv-sec" id="srv-onboarding">
          <p className="srv-sec-num">02</p>
          <h2>L&apos;écran de promesse</h2>
          <p className="srv-sec-note">
            Le premier écran ne montre pas une carte : à cette taille elle serait illisible.
            Un schéma dit la promesse en une seconde, la route rouge pointillée contre la route
            jade continue. Basculez l&apos;ambiance en haut de page : seuls le fond et le texte
            changent, les couleurs de la marque restent identiques.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame theme={theme}><Onboarding /></PhoneFrame>
          </div>
        </section>

        {FLOWS.map((f) => (
          <section className="srv-sec" key={f.n}>
            <p className="srv-sec-num">{f.n}</p>
            <h2>{f.title}</h2>
            <p className="srv-sec-note">{f.note}</p>
            <div className="srv-gallery">
              {f.items.map((m) => (
                <div className="srv-slot" key={m.id} id={`srv-${m.id}`}>
                  <div className="srv-slot-head"><h4>{m.t}</h4><p>{m.s}</p></div>
                  <PhoneFrame theme={theme}>{m.el}</PhoneFrame>
                  {(m.notes || m.scroll) && (
                    <div className="srv-notes">
                      {m.scroll && <span data-s="yes">Écran défilable</span>}
                      {(m.notes || []).map((x) => <span key={x}>{x}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
