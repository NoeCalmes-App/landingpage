import { createContext, useContext, useEffect, useRef, useState } from 'react'
import DATA from './smoothride-data.json'
import './smoothride-mockups.css'

// ============================================================
// SmoothRide — maquette V2. Ref. MOB-2026-088.
// Perimetre : cahier des charges NOE-2026-088, ni plus ni moins.
//
// REGLE DE STYLE DE CE FICHIER : aucun style={{}}, aucune couleur ecrite a
// la main. Tout passe par une classe de `smoothride-mockups.css` et par les
// jetons de la charte. C'est la seule facon d'empecher les incoherences de
// revenir ecran par ecran.
//
// Deux registres visuels, volontairement separes :
//  - OUVERTURE : schema stylise. A 336 px de large, un fond cartographique
//    reel est bruite ; le schema dit la promesse en une seconde.
//  - NAVIGATION : vraie carte Mapbox, traces calcules par Directions,
//    dos-d'ane releves dans OpenStreetMap.
// ============================================================

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''
const D = DATA
// Les couleurs des traces sont EXACTEMENT celles de la charte, sans variante.
// Un vert de carte different du vert de marque, c'est deux verts : ce que
// l'on veut precisement eviter.
// L'API Mapbox peint en JavaScript : elle ne lit pas les variables CSS. Les
// valeurs sont donc dupliquees ici — mais elles suivent la MEME regle que la
// charte : un seul vert par ambiance, celui de l'interface. Un trace d'un
// vert et un bouton d'un autre, c'est le defaut que le client a releve.
const C = {
  jade:   { sombre: '#3FE0AC', clair: '#07845E' },
  rouge:  { sombre: '#FF6B5E', clair: '#FF6B5E' },  // le dos-d'ane, jamais autre chose
  neutre: { sombre: '#9AA8A2', clair: '#8A9A94' },  // le trace non retenu, sans couleur
  gaine:  '#0A1F19',                                // lisere sombre sous chaque trace
}
const teinte = (nom, sombre) => C[nom][sombre ? 'sombre' : 'clair']

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
function urlStatique({ routes, center, zoom, bearing, pitch, sombre }) {
  if (!TOKEN) return null
  const ov = []
  routes.forEach((r) => {
    const p = encodeURIComponent(encPoly(r.coords))
    ov.push(`path-${r.w + 3}+${C.gaine.replace('#', '')}-0.45(${p})`)
    ov.push(`path-${r.w}+${teinte(r.ton, sombre).replace('#', '')}-1(${p})`)
  })
  // Volontairement AUCUN marqueur sur le socle : les `pin-s` de l'API Static
  // sont des gouttes d'eau avec une ombre, impossibles a accorder a la
  // charte. Les dos-d'ane se dessinent en pastilles nettes sur la carte GL.
  return `https://api.mapbox.com/styles/v1/mapbox/${styleDe(sombre)}/static/`
    + `${ov.length ? ov.join(',') + '/' : ''}`
    + `${center[0]},${center[1]},${zoom},${bearing},${pitch}/600x1180@2x`
    + `?access_token=${TOKEN}&logo=false&attribution=false`
}

const MAPBOX_VER = 'v3.9.0'
const BASE = import.meta.env.BASE_URL || '/'
// LES DEUX COUCHES UTILISENT LE MEME STYLE.
//
// C'est la correction la plus importante ici : le socle fixe chargeait
// `streets-v12` pendant que la carte vivante chargeait `standard`. Deux
// dessins differents du meme endroit, l'un remplacant l'autre a l'ecran —
// d'ou l'impression de carte « satellite » qui ne ressemblait a rien de
// connu. `standard` rend en plus le bati en volume avec un eclairage
// dynamique : joli sur une demo Mapbox, illisible dans un cadre de 336 px.
//
// On prend donc les deux styles classiques, ceux de l'exemple officiel
// mapbox-gl-js : `streets-v12` de jour, `dark-v11` de nuit. Tous deux sont
// servis par l'API Static Images, donc le socle et la carte vivante montrent
// enfin exactement la meme chose.
//
// A savoir, et c'est la reponse a la question : une URL `mapbox://styles/...`
// est la MEME pour mapbox-gl-js (web) et pour les SDK iOS et Android. Le
// rendu de cette page est donc bien celui de l'application mobile.
const STYLE = { clair: 'streets-v12', sombre: 'dark-v11' }
const styleDe = (sombre) => (sombre ? STYLE.sombre : STYLE.clair)

/** Le theme descend par contexte : la carte doit se reconstruire quand il
 *  change, un style Mapbox ne se remplace pas a chaud sans perdre les
 *  couches qu'on a posees dessus. */
const ThemeCtx = createContext('dark')

// Nombre de cartes qu'un IntersectionObserver a reellement allumees. S'il
// reste a zero, c'est que l'observer ne fonctionne pas dans ce contexte
// (onglet en arriere-plan, fenetre repliee) et le filet prend le relais.
let allumeesParObserver = 0
let glPromise = null
/** Charge mapbox-gl-js.
 *
 *  La bibliotheque est SERVIE PAR LE PROJET (`public/vendor/mapbox-gl/`), pas
 *  par le CDN de Mapbox. C'est la raison pour laquelle la carte pouvait rester
 *  une image chez le client : un bloqueur de contenu, un pare-feu ou une
 *  politique de securite qui refuse `api.mapbox.com` empeche le script de se
 *  charger, la carte vivante ne se pose jamais, et le socle statique — qui
 *  est un `<img>` — reste seul a l'ecran. Servie depuis la meme origine que
 *  la page, elle ne peut plus etre bloquee.
 *
 *  Le CDN reste en secours si le fichier local manque (projet non deploye). */
function chargerGL() {
  if (glPromise) return glPromise
  glPromise = new Promise((resolve, reject) => {
    if (window.mapboxgl) return resolve(window.mapboxgl)
    const poser = (href) => {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = href
      document.head.appendChild(css)
    }
    const charger = (js, css, secours) => {
      poser(css)
      const sc = document.createElement('script')
      sc.src = js
      sc.async = true
      sc.onload = () => resolve(window.mapboxgl)
      sc.onerror = secours || reject
      document.body.appendChild(sc)
    }
    charger(
      `${BASE}vendor/mapbox-gl/mapbox-gl.js`,
      `${BASE}vendor/mapbox-gl/mapbox-gl.css`,
      () => charger(
        `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VER}/mapbox-gl.js`,
        `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VER}/mapbox-gl.css`,
      ),
    )
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
/**
 * Fond de secours, dessine SANS aucune cle externe.
 *
 * Constate en production : `.env.local` n'etant pas commite, le build
 * GitHub sortait sans jeton Mapbox. La carte renvoyait alors un cadre vide
 * et seul le quadrillage d'attente restait visible, sur tous les ecrans.
 *
 * Une maquette ne doit jamais dependre d'un service tiers pour montrer
 * quelque chose. On projette donc les VRAIES coordonnees en Mercator et on
 * trace les itineraires : le client voit son trajet, meme sans jeton, meme
 * sans reseau.
 */
function FondDeSecours({ routes, bumps, depart, arrivee, sombre }) {
  const pts = routes.flatMap((r) => r.coords)
  if (!pts.length) return null
  // Mercator. Le facteur 180/PI est indispensable : sans lui, x reste en
  // degres de longitude pendant que y sort en radians, soit ~30 fois plus
  // petit aux latitudes francaises. L'itineraire s'aplatissait alors en un
  // trait horizontal de quelques pixels de haut.
  const my = (lat) => (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => my(p[1]))
  const x0 = Math.min(...xs), x1 = Math.max(...xs)
  const y0 = Math.min(...ys), y1 = Math.max(...ys)
  const W = 300, H = 560, pad = 38
  const e = Math.min((W - pad * 2) / (x1 - x0 || 1), (H - pad * 2) / (y1 - y0 || 1))
  const px = (p) => [
    (W - (x1 - x0) * e) / 2 + (p[0] - x0) * e,
    (H + (y1 - y0) * e) / 2 - (my(p[1]) - y0) * e,
  ]
  const d = (co) => co.map((p, i) => `${i ? 'L' : 'M'}${px(p).map((v) => v.toFixed(1)).join(' ')}`).join(' ')
  return (
    <svg className="srv-map-secours" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0.18, 0.38, 0.58, 0.78].map((f) => (
        <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="currentColor" strokeWidth="1" opacity=".1" />
      ))}
      {[0.24, 0.52, 0.8].map((f) => (
        <line key={f} x1={W * f} y1="0" x2={W * f} y2={H} stroke="currentColor" strokeWidth="1" opacity=".1" />
      ))}
      {routes.map((r, i) => (
        <g key={i}>
          <path d={d(r.coords)} fill="none" stroke={C.gaine} strokeWidth={r.w + 4} strokeOpacity=".35" strokeLinecap="round" strokeLinejoin="round" />
          {/* La route porte `ton` (un nom de teinte), jamais une couleur toute
              faite : c'est `teinte()` qui tranche selon le theme, exactement
              comme la couche Mapbox plus haut. Lire `r.color` renvoyait
              undefined, donc `stroke: none` : seul le liseré sombre restait,
              invisible sur fond sombre. */}
          <path d={d(r.coords)} fill="none" stroke={teinte(r.ton, sombre)} strokeWidth={r.w} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {bumps.slice(0, 22).map((b, i) => {
        const [cx, cy] = px(b)
        return <circle key={i} cx={cx} cy={cy} r="5.5" fill={teinte('rouge', sombre)} stroke={sombre ? '#0A1310' : '#FFFFFF'} strokeWidth="2.5" />
      })}
      {[[depart, teinte('jade', sombre)], [arrivee, C.gaine]].map(([pt, col], i) => {
        if (!pt) return null
        const [cx, cy] = px(pt)
        return <circle key={i} cx={cx} cy={cy} r="7" fill={col} stroke="#fff" strokeWidth="3" />
      })}
    </svg>
  )
}

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

    // FILET DE SECURITE. L'IntersectionObserver ne rapporte aucune
    // intersection tant que le document n'est pas peint : onglet en
    // arriere-plan, fenetre repliee, capture automatisee. Sans repli la carte
    // reste vide POUR TOUJOURS, et une carte vide passe pour un bug.
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
        // La carte se tourne et se bascule a deux doigts, comme la vraie
        // application. C'est ce qui separe une carte d'une image.
        dragRotate: true,
        pitchWithRotate: true,
        // `cooperativeGestures` est la reponse de Mapbox au conflit entre le
        // zoom d'une carte et le defilement d'une page de dix-neuf ecrans :
        // la molette seule fait defiler la PAGE, Ctrl+molette zoome la CARTE,
        // et un bandeau le dit au premier essai. C'est aussi ce bandeau qui
        // prouve, en une seconde, qu'on n'a pas affaire a une image.
        cooperativeGestures: true,
      })
      // Pas de `NavigationControl` : les boutons +/- de Mapbox sont du
      // mobilier Mapbox, pas de la maquette. Glisser, double-cliquer, pincer
      // et tourner suffisent, et le bandeau annonce Ctrl+molette.

      // `load` : le signal standard de mapbox-gl-js, celui de l'exemple
      // officiel. La V2 ne pouvait pas s'en servir — le style « Standard »
      // ne declenche ni `load` ni `isStyleLoaded` de facon fiable — et
      // compensait par une boucle de 150 tentatives et un sondage des tuiles.
      // Avec `streets-v12` et `dark-v11`, tout ce filet devient inutile.
      m.on('load', () => {
        if (mort) return
        routes.forEach((r, i2) => {
          const id = `r${i2}`
          m.addSource(id, { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: r.coords } } })
          // gaine sombre sous le trace, puis le trace : il se detache de la
          // carte sans qu'on ait a l'epaissir
          m.addLayer({ id: `${id}-c`, type: 'line', source: id, layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': C.gaine, 'line-width': r.w + 4, 'line-opacity': 0.35 } })
          m.addLayer({ id, type: 'line', source: id, layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': teinte(r.ton, sombre), 'line-width': r.w } })
        })
        if (bumps.length) {
          m.addSource('b', { type: 'geojson', data: { type: 'FeatureCollection',
            features: bumps.map((c) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: c }, properties: {} })) } })
          m.addLayer({ id: 'b', type: 'circle', source: 'b',
            paint: { 'circle-radius': 5.5, 'circle-color': teinte('rouge', sombre),
                     'circle-stroke-width': 2.5, 'circle-stroke-color': sombre ? '#0A1310' : '#FFFFFF' } })
        }
        ;[[depart, teinte('jade', sombre)], [arrivee, C.gaine]].forEach(([pt, col]) => {
          if (!pt) return
          const el2 = document.createElement('div')
          el2.style.cssText = `width:15px;height:15px;border-radius:50%;background:${col};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)`
          new gl.Marker({ element: el2 }).setLngLat(pt).addTo(m)
        })
        setPrete(true)
      })

      carte.current = m
    })
    return () => { mort = true; if (carte.current) { carte.current.remove(); carte.current = null } }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, sombre])

  if (!TOKEN) {
    return (
      <div className="srv-map" aria-hidden="true">
        <FondDeSecours routes={routes} bumps={bumps} depart={depart} arrivee={arrivee} sombre={sombre} />
      </div>
    )
  }
  const fixe = urlStatique({ routes, center, zoom, bearing, pitch, sombre })
  return (
    <div className="srv-map" aria-hidden="true">
      {/* L'image statique s'affiche TOUT DE SUITE. La carte deplacable se
          pose par-dessus des qu'elle a peint. Sans ce socle, une page dont
          le rendu WebGL est suspendu montre un rectangle vide, ce qui passe
          pour une panne. */}
      {fixe && <img className="srv-map-fixe" src={fixe} alt="" />}
      <div className="srv-map-live" ref={hote} data-pret={prete ? 'yes' : undefined} />
    </div>
  )
}

function goTo(id) {
  const el = document.getElementById(`srv-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/* ---------------------------------------------------------------------------
   LES ICONES

   Dessinees sur une grille de 256, trait plein et extremites franches :
   l'aplomb d'une icone de systeme d'exploitation, pas le filament d'une
   bibliotheque generique a 2 px sur 24 — a 14 px, ce filament disparait.

   Les traces sont ceux de Phosphor Icons (licence MIT), INTEGRES au projet
   plutot qu'importes : pas de paquet a installer, pas de derive de version,
   et le poids du trait est fige une fois pour toutes, au meme endroit.
   Une seule variante : le trait. Le plein alourdit et, a ces tailles, ne
   gagne rien en lisibilite.
--------------------------------------------------------------------------- */
const T = {
  ArrowBendUpRight: ['M232.49,112.49l-48,48a12,12,0,0,1-17-17L195,116H128a84.09,84.09,0,0,0-84,84,12,12,0,0,1-24,0A108.12,108.12,0,0,1,128,92h67L167.51,64.48a12,12,0,0,1,17-17l48,48A12,12,0,0,1,232.49,112.49Z', -0, 0],
  ArrowLeft: ['M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z', 0, -0],
  Bell: ['M225.29,165.93C216.61,151,212,129.57,212,104a84,84,0,0,0-168,0c0,25.58-4.59,47-13.27,61.93A20.08,20.08,0,0,0,30.66,186,19.77,19.77,0,0,0,48,196H84.18a44,44,0,0,0,87.64,0H208a19.77,19.77,0,0,0,17.31-10A20.08,20.08,0,0,0,225.29,165.93ZM128,212a20,20,0,0,1-19.6-16h39.2A20,20,0,0,1,128,212ZM54.66,172C63.51,154,68,131.14,68,104a60,60,0,0,1,120,0c0,27.13,4.48,50,13.33,68Z', 0, -0],
  CaretRight: ['M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z', -8, 0],
  Check: ['M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z', -4, -8],
  CheckCircle: ['M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z', 0, 0],
  Clock: ['M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm68-84a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V72a12,12,0,0,1,24,0v44h44A12,12,0,0,1,196,128Z', 0, 0],
  CreditCard: ['M224,44H32A20,20,0,0,0,12,64V192a20,20,0,0,0,20,20H224a20,20,0,0,0,20-20V64A20,20,0,0,0,224,44Zm-4,24V88H36V68ZM36,188V112H220v76Zm172-24a12,12,0,0,1-12,12H164a12,12,0,0,1,0-24h32A12,12,0,0,1,208,164Zm-68,0a12,12,0,0,1-12,12H116a12,12,0,0,1,0-24h12A12,12,0,0,1,140,164Z', 0, 0],
  Crosshair: ['M232,116h-4.72A100.21,100.21,0,0,0,140,28.72V24a12,12,0,0,0-24,0v4.72A100.21,100.21,0,0,0,28.72,116H24a12,12,0,0,0,0,24h4.72A100.21,100.21,0,0,0,116,227.28V232a12,12,0,0,0,24,0v-4.72A100.21,100.21,0,0,0,227.28,140H232a12,12,0,0,0,0-24Zm-92,87v-3a12,12,0,0,0-24,0v3a76.15,76.15,0,0,1-63-63h3a12,12,0,0,0,0-24H53a76.15,76.15,0,0,1,63-63v3a12,12,0,0,0,24,0V53a76.15,76.15,0,0,1,63,63h-3a12,12,0,0,0,0,24h3A76.15,76.15,0,0,1,140,203ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z', 0, 0],
  GearSix: ['M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm113.86-49.57A12,12,0,0,0,236,98.34L208.21,82.49l-.11-31.31a12,12,0,0,0-4.25-9.12,116,116,0,0,0-38-21.41,12,12,0,0,0-9.68.89L128,37.27,99.83,21.53a12,12,0,0,0-9.7-.9,116.06,116.06,0,0,0-38,21.47,12,12,0,0,0-4.24,9.1l-.14,31.34L20,98.35a12,12,0,0,0-5.85,8.11,110.7,110.7,0,0,0,0,43.11A12,12,0,0,0,20,157.66l27.82,15.85.11,31.31a12,12,0,0,0,4.25,9.12,116,116,0,0,0,38,21.41,12,12,0,0,0,9.68-.89L128,218.73l28.14,15.74a12,12,0,0,0,9.7.9,116.06,116.06,0,0,0,38-21.47,12,12,0,0,0,4.24-9.1l.14-31.34,27.81-15.81a12,12,0,0,0,5.85-8.11A110.7,110.7,0,0,0,241.86,106.43Zm-22.63,33.18-26.88,15.28a11.94,11.94,0,0,0-4.55,4.59c-.54,1-1.11,1.93-1.7,2.88a12,12,0,0,0-1.83,6.31L184.13,199a91.83,91.83,0,0,1-21.07,11.87l-27.15-15.19a12,12,0,0,0-5.86-1.53h-.29c-1.14,0-2.3,0-3.44,0a12.08,12.08,0,0,0-6.14,1.51L93,210.82A92.27,92.27,0,0,1,71.88,199l-.11-30.24a12,12,0,0,0-1.83-6.32c-.58-.94-1.16-1.91-1.7-2.88A11.92,11.92,0,0,0,63.7,155L36.8,139.63a86.53,86.53,0,0,1,0-23.24l26.88-15.28a12,12,0,0,0,4.55-4.58c.54-1,1.11-1.94,1.7-2.89a12,12,0,0,0,1.83-6.31L71.87,57A91.83,91.83,0,0,1,92.94,45.17l27.15,15.19a11.92,11.92,0,0,0,6.15,1.52c1.14,0,2.3,0,3.44,0a12.08,12.08,0,0,0,6.14-1.51L163,45.18A92.27,92.27,0,0,1,184.12,57l.11,30.24a12,12,0,0,0,1.83,6.32c.58.94,1.16,1.91,1.7,2.88A11.92,11.92,0,0,0,192.3,101l26.9,15.33A86.53,86.53,0,0,1,219.23,139.61Z', -0, 0],
  House: ['M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z', 0, 4],
  Lock: ['M208,76H180V56A52,52,0,0,0,76,56V76H48A20,20,0,0,0,28,96V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V96A20,20,0,0,0,208,76ZM100,56a28,28,0,0,1,56,0V76H100ZM204,204H52V100H204Zm-60-52a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z', 0, 12],
  MagnifyingGlass: ['M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z', 0.1, 0.1],
  MapPin: ['M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z', 0, 0],
  // la seule correction optique du jeu : la masse du curseur est haute dans
  // sa boite, on le descend de 6 unites sur 256
  NavigationArrow: ['M238.7,102.46,62.81,37.21l-.25-.09A20,20,0,0,0,37.12,62.56l.09.25L102.46,238.7A20,20,0,0,0,121.3,252h.35a20,20,0,0,0,18.77-14.12l.09-.29,21.23-75.85,75.85-21.23.29-.09a20,20,0,0,0,.82-38Zm-89.93,38a12,12,0,0,0-8.32,8.32l-19.68,70.29L62.8,62.8l156.26,58Z', -16, -10],
  Path: ['M200,164a36.07,36.07,0,0,0-33.94,24H72a28,28,0,0,1,0-56h96a44,44,0,0,0,0-88H72a12,12,0,0,0,0,24h96a20,20,0,0,1,0,40H72a52,52,0,0,0,0,104h94.06A36,36,0,1,0,200,164Zm0,48a12,12,0,1,1,12-12A12,12,0,0,1,200,212Z', -0, -12],
  ShieldCheck: ['M208,36H48A20,20,0,0,0,28,56v56c0,54.29,26.32,87.22,48.4,105.29,23.71,19.39,47.44,26,48.44,26.29a12.1,12.1,0,0,0,6.32,0c1-.28,24.73-6.9,48.44-26.29,22.08-18.07,48.4-51,48.4-105.29V56A20,20,0,0,0,208,36Zm-4,76c0,35.71-13.09,64.69-38.91,86.15A126.28,126.28,0,0,1,128,219.38a126.14,126.14,0,0,1-37.09-21.23C65.09,176.69,52,147.71,52,112V60H204ZM79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0Z', -0, -12],
  SlidersHorizontal: ['M40,92H70.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24H137.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24Zm64-24A12,12,0,1,1,92,80,12,12,0,0,1,104,68Zm112,96H201.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24h94.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24Zm-48,24a12,12,0,1,1,12-12A12,12,0,0,1,168,188Z', 0, 0],
  User: ['M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z', 0.2, 3.8],
  Users: ['M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z', 0, 2],
  Warning: ['M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z', 0, 4],
  WifiSlash: ['M216.88,207.93a12,12,0,1,1-17.76,16.14L147.78,167.6a56.06,56.06,0,0,0-52.71,7.1,12,12,0,0,1-14.14-19.4,79.35,79.35,0,0,1,41.92-15.12L103.51,118.9a104.18,104.18,0,0,0-40.06,19.55,12,12,0,0,1-14.9-18.81A128.46,128.46,0,0,1,85.61,99.21l-17.31-19a151.14,151.14,0,0,0-36.68,22.28A12,12,0,1,1,16.39,83.91a175.52,175.52,0,0,1,35-22.38L39.12,48.07A12,12,0,1,1,56.88,31.93ZM128,188a16,16,0,1,0,16,16A16,16,0,0,0,128,188Zm64.55-49.55a12,12,0,0,0,14.9-18.81A127.27,127.27,0,0,0,170,99.05a12,12,0,0,0-7.87,22.67A103.62,103.62,0,0,1,192.55,138.45Zm47.06-54.54A176.33,176.33,0,0,0,128,44c-3.94,0-7.93.13-11.86.39a12,12,0,1,0,1.59,24c3.4-.23,6.86-.34,10.27-.34a152.24,152.24,0,0,1,96.38,34.46,12,12,0,1,0,15.23-18.55Z', 0, -0],
  X: ['M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z', 0, 0],
}

/** Une icone = un trace dans une boite de 256, RECENTRE dans cette boite.
 *
 *  Le decalage vient avec le trace : plusieurs glyphes sont dessines hors du
 *  centre de leur boite (la fleche de direction l'etait de 16 unites vers le
 *  bas et la gauche, soit 6 % — tres visible dans une pastille de 29 px).
 *  Le recalage est CALCULE une fois sur la boite englobante de chaque trace,
 *  pas corrige a la main icone par icone : aucune ne peut plus deriver. */
function glyphe(nom) {
  return function Glyphe({ size = 15, className }) {
    const [d, dx, dy] = T[nom]
    return (
      <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor"
        className={className} aria-hidden="true" focusable="false">
        <g transform={`translate(${dx} ${dy})`}><path d={d} /></g>
      </svg>
    )
  }
}

const ArrowBendUpRight = glyphe('ArrowBendUpRight')
const ArrowLeft = glyphe('ArrowLeft')
const Bell = glyphe('Bell')
const CaretRight = glyphe('CaretRight')
const Check = glyphe('Check')
const CheckCircle = glyphe('CheckCircle')
const Clock = glyphe('Clock')
const CreditCard = glyphe('CreditCard')
const Crosshair = glyphe('Crosshair')
const GearSix = glyphe('GearSix')
const House = glyphe('House')
const Lock = glyphe('Lock')
const MagnifyingGlass = glyphe('MagnifyingGlass')
const MapPin = glyphe('MapPin')
const NavigationArrow = glyphe('NavigationArrow')
const Path = glyphe('Path')
const ShieldCheck = glyphe('ShieldCheck')
const SlidersHorizontal = glyphe('SlidersHorizontal')
const User = glyphe('User')
const Users = glyphe('Users')
const Warning = glyphe('Warning')
const WifiSlash = glyphe('WifiSlash')
const X = glyphe('X')

/* ==========================================================================
   COMPOSANTS — chaque bloc qui apparait deux fois vit ici, et nulle part
   ailleurs. Un ecran n'ecrit plus de style : il assemble.
   ========================================================================== */

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

/* ---------------------------------------------------------------------------
   LE SIGNE. Un seul dessin, une seule fois.
   La route entre par une bosse et repart plate : les deux idees du produit
   fondues en une forme. Le trace est calibre pour que, STRIE COMPRISE, il
   occupe exactement la boite de 40 et reste centre optiquement. Le logo et
   l'icone d'application partagent ce trace au meme pourcentage (74 %) : ce
   sont litteralement la meme image, ce qui n'etait pas le cas avant.
--------------------------------------------------------------------------- */
const GLYPHE = 'M2.5 25 C2.5 12 14.5 12 14.5 25 L37.5 25'

function Mark({ size = 26, store = 'apple' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect className="srv-mark-tile" width="40" height="40" rx={store === 'google' ? 1.6 : 8.95} />
      <g transform="translate(5.2 5.2) scale(0.74)">
        <path className="srv-mark-glyph" d={GLYPHE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

const Logotype = ({ size = 26 }) => (
  <span className="srv-logotype"><Mark size={size} /><b>SmoothRide</b></span>
)

/**
 * Icone d'application.
 *  - Apple : squircle a 22,37 % du cote, c'est le masque iOS.
 *  - Google Play : CARRE, jamais de coins arrondis faits main. Le store
 *    applique son propre masque, et un coin deja arrondi est rogne deux fois.
 */
const AppIcon = ({ px = 96, store = 'apple', ombre = true }) => (
  <span className="srv-appicon-tile" data-store={store} data-shadow={ombre ? 'yes' : undefined}>
    <Mark size={px} store={store} />
  </span>
)

/* ---------------------------------------------------------------------------
   DRAPEAU D'ARRIVEE — vectorise depuis flag.png (fourni par le client,
   conserve dans public/assets/images/maquettes/smoothride/flag.png).

   Le fichier d'origine est NOIR SUR TRANSPARENT : ses carreaux clairs sont
   des trous. Pose tel quel il disparaissait sur le theme sombre et n'avait
   aucun contour.

   Il est donc traite comme un vrai repere de carte : une PLAQUETTE blanche
   arrondie, la meme dans les deux ambiances, avec le damier en encre
   dessus. Une plaquette est un objet physique — elle n'a pas de raison de
   changer de couleur selon l'heure qu'il est. Elle se pose au-dessus du
   point d'arrivee, qui reste le vrai reperage geographique.
--------------------------------------------------------------------------- */
const FLAG_SIL = 'M1405 5059 c-342 -35 -654 -160 -975 -387 -18 -13 -21 -9 -48 47 -24 50 -28 70 -24 114 12 153 -150 248 -279 162 -42 -27 -79 -96 -79 -146 0 -47 38 -120 76 -144 18 -11 39 -24 47 -30 9 -5 514 -1046 1123 -2312 1016 -2114 1109 -2305 1141 -2324 82 -51 195 22 180 116 -3 18 -228 496 -501 1062 -273 567 -496 1034 -496 1039 1 5 29 30 63 55 204 153 442 257 707 311 98 20 144 23 315 22 177 0 215 -4 326 -27 178 -38 275 -74 514 -193 127 -63 257 -119 330 -143 358 -117 765 -109 1118 19 90 33 130 65 158 125 24 51 24 93 0 152 -48 124 -995 2071 -1019 2096 -66 70 -129 76 -282 27 -183 -57 -255 -71 -421 -77 -173 -6 -266 3 -424 44 -132 34 -203 63 -431 175 -269 133 -459 192 -705 218 -109 11 -300 11 -414 -1z'
const FLAG_INK = 'M1405 5059 c-342 -35 -654 -160 -975 -387 -18 -13 -21 -9 -48 47 -24 50 -28 70 -24 114 12 153 -150 248 -279 162 -42 -27 -79 -96 -79 -146 0 -47 38 -120 76 -144 18 -11 39 -24 47 -30 9 -5 514 -1046 1123 -2312 1016 -2114 1109 -2305 1141 -2324 82 -51 195 22 180 116 -3 18 -228 496 -501 1062 -273 567 -496 1034 -496 1039 1 5 29 30 63 55 204 153 442 257 707 311 98 20 144 23 315 22 177 0 215 -4 326 -27 178 -38 275 -74 514 -193 127 -63 257 -119 330 -143 358 -117 765 -109 1118 19 90 33 130 65 158 125 24 51 24 93 0 152 -48 124 -995 2071 -1019 2096 -66 70 -129 76 -282 27 -183 -57 -255 -71 -421 -77 -173 -6 -266 3 -424 44 -132 34 -203 63 -431 175 -269 133 -459 192 -705 218 -109 11 -300 11 -414 -1z m665 -296 c123 -34 232 -79 405 -167 77 -40 163 -81 190 -92 l50 -20 99 -210 c54 -115 101 -215 104 -222 2 -8 -35 6 -84 31 -179 90 -382 152 -576 178 l-93 12 -117 246 c-65 135 -120 255 -124 265 -8 22 -10 22 146 -21z m-814 -297 c74 -154 134 -284 134 -290 0 -6 -28 -22 -62 -35 -133 -50 -331 -167 -457 -268 -30 -24 -58 -40 -62 -36 -9 10 -290 595 -287 598 2 1 31 23 65 48 81 62 201 135 288 177 90 43 216 90 234 87 7 -1 74 -128 147 -281z m2804 -279 c88 -182 134 -290 127 -292 -153 -51 -500 -94 -523 -64 -15 20 -254 525 -254 536 0 6 37 13 82 17 94 8 216 33 333 70 44 13 84 24 88 23 5 -2 71 -132 147 -290z m-1739 -274 l165 -348 -170 -6 c-181 -7 -330 -30 -476 -73 -47 -14 -88 -22 -91 -18 -19 22 -328 687 -322 693 24 20 298 83 403 92 25 2 108 4 186 5 l140 2 165 -347z m729 47 c121 -62 328 -119 506 -140 l101 -12 91 -191 c50 -106 125 -263 167 -351 l75 -158 -67 7 c-186 18 -390 76 -545 154 l-92 46 -109 230 c-60 127 -133 280 -162 342 -59 124 -60 121 35 73z m-321 -451 c131 -27 312 -89 433 -149 57 -28 108 -57 114 -63 14 -15 306 -628 301 -633 -2 -2 -39 14 -83 35 -172 84 -383 148 -564 172 -47 6 -89 13 -95 14 -8 2 -288 578 -313 644 -6 17 61 10 207 -20z m-835 -381 c81 -172 147 -317 146 -323 -2 -5 -40 -24 -84 -41 -164 -63 -298 -135 -431 -231 -32 -24 -62 -43 -65 -43 -6 0 -75 140 -236 477 l-63 132 62 49 c139 108 281 193 437 259 41 18 77 32 80 33 3 0 72 -141 154 -312z m2811 -281 l154 -318 -27 -10 c-106 -41 -319 -79 -438 -79 l-71 0 -152 321 c-84 176 -151 323 -148 325 2 3 66 9 141 14 124 9 296 39 350 60 12 5 25 8 30 6 4 -1 77 -145 161 -319z'
const FLAG_BOX = [512, 509]

function Flag({ x, y, plaque = 23, ecart = 5 }) {
  const g = plaque * 0.74                       // le damier, dans la plaquette
  const k = g / FLAG_BOX[1]
  const cx = x, cy = y - ecart - plaque / 2     // centre de la plaquette
  return (
    <g>
      <rect
        className="srv-flag-plaque"
        x={cx - plaque / 2} y={cy - plaque / 2}
        width={plaque} height={plaque} rx={plaque * 0.3}
      />
      <g transform={`translate(${cx - (FLAG_BOX[0] * k) / 2} ${cy - g / 2}) scale(${k})`}>
        <g transform="translate(0,509) scale(0.1,-0.1)">
          <path className="srv-flag-paper" d={FLAG_SIL} />
          <path className="srv-flag-ink" d={FLAG_INK} />
        </g>
      </g>
    </g>
  )
}

/* ---------------------------------------------------------------------------
   CONTROLES
--------------------------------------------------------------------------- */
function UiButton({ children, tone = '', size = '', goto }) {
  const cls = ['srv-btn', tone && `srv-btn-${tone}`, size && `srv-btn-${size}`].filter(Boolean).join(' ')
  return <button type="button" className={cls} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
const LinkButton = ({ children, goto }) => (
  <button type="button" className="srv-link" onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
)
const IconButton = ({ children, goto, small = false, label }) => (
  <button type="button" className={`srv-icon-btn${small ? ' srv-icon-btn-sm' : ''}`} aria-label={label} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
)
const Pill = ({ tone = '', children }) => (
  <span className={`srv-pill${tone ? ` srv-pill-${tone}` : ''}`}>{children}</span>
)
/** Illustration des ecrans d'entree.
 *
 *  Un grand cadre quadrille avec une icone seule au milieu, ce n'est pas une
 *  illustration : c'est un etat vide. Celle-ci MONTRE ce que l'ecran demande —
 *  ta position sur une route, avec ses cercles de precision. Refusee, le point
 *  s'eteint et la route se coupe. */
const IllusPosition = ({ actif = true }) => (
  <div className="srv-illus" data-on={actif ? 'yes' : undefined} aria-hidden="true">
    <svg viewBox="0 0 200 107" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="srv-fondu" cx="50%" cy="50%" r="52%">
          <stop offset="55%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="srv-masque"><rect width="200" height="107" fill="url(#srv-fondu)" /></mask>
      </defs>
      {/* Le quadrillage se dissout sur les bords : sans cadre ni liseré, la
          vignette se pose sur la page au lieu d'y decouper un rectangle. */}
      <g className="srv-illus-grille" mask="url(#srv-masque)">
        {[27, 54, 81].map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} />)}
        {[40, 80, 120, 160].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="107" />)}
      </g>
      {/* Les cercles de precision passent SOUS la route : au-dessus, ils la
          coupaient en deux troncons et on lisait une route cassee. */}
      <circle className="srv-illus-onde" cx="100" cy="53.5" r="32" />
      <circle className="srv-illus-onde srv-illus-onde-2" cx="100" cy="53.5" r="19.5" />
      <path className="srv-illus-route" d="M4 96 L48 90 L100 53.5 L152 34 L196 10" mask="url(#srv-masque)" />
      <circle className="srv-illus-point" cx="100" cy="53.5" r="8" />
      {/* Barre de refus, PERPENDICULAIRE a la route : posee dans le meme sens,
          elle passait pour un second troncon de route. Une gaine de la couleur
          du fond la detache, sinon le rouge sur le rouge du point disparait. */}
      {!actif && <path className="srv-illus-gaine" d="M89 38 L111 69" />}
      {!actif && <path className="srv-illus-barre" d="M89 38 L111 69" />}
    </svg>
  </div>
)
const Tile = ({ tone, size = '', children }) => (
  <span className={`srv-tile${size ? ` srv-tile-${size}` : ''}`} data-t={tone}>{children}</span>
)
const TopBar = ({ title, back = false, action, end = false }) => (
  <div className={`srv-top${end ? ' srv-top-end' : ''}`}>
    {back && <span className="srv-back"><ArrowLeft size={14} /></span>}
    {title !== undefined && <h2>{title}</h2>}
    {action}
  </div>
)
const Head = ({ children, action }) => (
  <div className="srv-head"><span>{children}</span>{action && <span>{action}</span>}</div>
)
/** Encart d'information. Avec `goto`, le MEME composant devient une ligne
 *  qu'on peut toucher : un chevron apparait, la boite devient un bouton. Sans
 *  `text`, il tient sur une seule ligne. Pas de second composant a maintenir. */
const Note = ({ tone, icon, title, text, goto }) => {
  const Boite = goto ? 'button' : 'div'
  return (
    <Boite
      className="srv-note"
      data-t={tone}
      data-clic={goto ? 'yes' : undefined}
      type={goto ? 'button' : undefined}
      onClick={goto ? () => goTo(goto) : undefined}
    >
      {icon}
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
      {goto && <CaretRight size={13} />}
    </Boite>
  )
}
const Row = ({ icon, tone, title, meta, trailing, goto }) => (
  <button type="button" className="srv-row" onClick={goto ? () => goTo(goto) : undefined}>
    <Tile tone={tone}>{icon}</Tile>
    <span className="srv-row-b"><strong>{title}</strong>{meta && <small>{meta}</small>}</span>
    <span className="srv-row-end">{trailing ?? <CaretRight size={14} />}</span>
  </button>
)
/** Bandeau « icone + titre + sous-titre », le bloc le plus repete de la
 *  maquette : il apparaissait cinq fois, ecrit cinq fois differemment. */
const Banner = ({ icon, tone = 'jade', title, text, action }) => (
  <div className="srv-inline">
    <Tile tone={tone} size="md">{icon}</Tile>
    <div className="srv-row-b srv-grow"><strong>{title}</strong>{text && <small>{text}</small>}</div>
    {action}
  </div>
)
const Field = ({ icon, dot = false, on = false, strong, grow = false, children }) => (
  <div className={`srv-field${on ? ' srv-field-on' : ''}${grow ? ' srv-grow' : ''}`}>
    {dot ? <i /> : icon}
    {strong ? <strong>{strong}</strong> : <span>{children}</span>}
  </div>
)
const Benef = ({ children }) => (
  <div className="srv-benef"><span className="srv-benef-i"><Check size={11} /></span><span>{children}</span></div>
)
const Kpi = ({ label, value, note }) => (
  <div className="srv-kpi"><span>{label}</span><strong className="num">{value}</strong><small>{note}</small></div>
)
const Skel = ({ v = 'row' }) => <div className={`srv-skel srv-skel-${v}`} />
const Dots = ({ i = 0, n = 3 }) => (
  <div className="srv-dots">{Array.from({ length: n }, (_, k) => <i key={k} data-on={k === i ? 'yes' : undefined} />)}</div>
)
/** Feuille du bas. `card` = posee, ne touche pas le bord de l'ecran. */
const Sheet = ({ children, card = false, grab = true }) => (
  <div className={`srv-sheet${card ? ' srv-sheet-card' : ''}`}>
    {grab && !card && <span className="srv-grab" />}
    {children}
  </div>
)

function TabBar({ active = 'map', admin = false }) {
  // L'onglet Admin n'existe que pour le proprietaire de l'application : il
  // n'a rien a faire dans la barre d'un conducteur.
  const tabs = [
    { id: 'map', l: 'Carte', ic: <Path size={19} />, g: 'home-map' },
    { id: 'hist', l: 'Trajets', ic: <Clock size={19} />, g: 'history' },
    { id: 'me', l: 'Compte', ic: <User size={19} />, g: 'settings' },
    ...(admin ? [{ id: 'adm', l: 'Admin', ic: <ShieldCheck size={19} />, g: 'admin' }] : []),
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

/** Profil de secousse : LA chaussee, et les dos-d'ane poses dessus.
 *
 *  Une dent verticale par bosse, c'etait un graphique ; une bosse arrondie,
 *  c'est la chose elle-meme, vue de profil — et c'est exactement l'arrondi
 *  du glyphe pose dans les pastilles du schema d'ouverture. Un seul signe,
 *  deux contextes.
 *
 *  Chaque bosse est un petit SVG a taille fixe, distribue par le flux : un
 *  seul SVG etire sur toute la largeur (`preserveAspectRatio="none"`)
 *  ecraserait les arrondis d'autant plus que la carte est large.
 *
 *  C'est la DENSITE qui se compare. La seule donnee que SmoothRide mesure et
 *  qu'aucun concurrent n'affiche. */
const Profil = ({ n, kind }) => (
  <span className="srv-profile" data-k={kind} aria-hidden="true">
    {Array.from({ length: n }, (_, i) => (
      <svg key={i} className="srv-bosse" viewBox="0 0 11 10" width="11" height="10">
        <path d="M1.2 9.2 Q5.5 -4 9.8 9.2" />
      </svg>
    ))}
  </span>
)

/** Carte d'itineraire. La duree a sa propre COLONNE : sur la meme ligne que
 *  le nom et la pastille, « 20 min » sortait du cadre et se faisait couper.
 *  C'est le bug de mise en page le plus visible de la V2. */
function RouteRow({ soft, min, bumps, on, goto }) {
  const k = soft ? 'soft' : 'fast'
  return (
    <button type="button" className="srv-route" data-on={on ? 'yes' : undefined} onClick={goto ? () => goTo(goto) : undefined}>
      <span className="srv-route-main">
        <span className="srv-route-name" data-k={k}>
          <i /><span className="srv-troncature">{soft ? 'Le plus doux' : 'Le plus rapide'}</span>
        </span>
        <Pill tone={k === 'soft' ? 'jade' : 'rouge'}><span className="num">{bumps}</span> dos-d&apos;âne</Pill>
      </span>
      <span className="srv-route-time num">{min} min</span>
      {/* le profil passe SOUS les deux colonnes : arrete a la hauteur du
          chiffre, il avait l'air coupe */}
      {bumps > 0 && <Profil n={Math.min(bumps, 22)} kind={k} />}
    </button>
  )
}

/* ==========================================================================
   ECRAN D'OUVERTURE — schema, pas carte.
   ========================================================================== */

// Les deux traces partent du MEME point et arrivent au MEME point : c'est la
// promesse du produit.
const DEPART = [30, 158]
const ARRIVEE = [216, 58]
const RAPIDE = [DEPART, [95, 162], [144, 122], [180, 100], ARRIVEE]
const DOUX = [DEPART, [45, 96], [115, 76], [172, 62], ARRIVEE]
const versD = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')

/** Position ET direction a une fraction du parcours.
 *
 *  Les dos-d'ane etaient poses a la main, coordonnee par coordonnee : ils
 *  floattaient a cote du trace des que celui-ci bougeait d'une unite. Ils se
 *  calculent maintenant SUR la polyligne, avec l'angle du segment qui les
 *  porte — ils ne peuvent plus s'en decrocher. */
function surLaRoute(pts, t) {
  const seg = []
  let total = 0
  for (let i = 1; i < pts.length; i += 1) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    seg.push(d); total += d
  }
  let reste = t * total
  for (let i = 0; i < seg.length; i += 1) {
    if (reste <= seg[i] || i === seg.length - 1) {
      const k = seg[i] ? reste / seg[i] : 0
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1]
      return {
        x: x1 + (x2 - x1) * k,
        y: y1 + (y2 - y1) * k,
        a: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
      }
    }
    reste -= seg[i]
  }
  return { x: pts[0][0], y: pts[0][1], a: 0 }
}

// Quatre dos-d'ane, repartis sur le trace rapide.
const BOSSES = [0.2, 0.44, 0.66, 0.86]

/** Un dos-d'ane sur le schema : une pastille corail avec la bosse dessinee
 *  dedans. C'est la forme retenue par le client. */
const Bosse = ({ x, y }) => (
  <g>
    <circle className="srv-scheme-bump" cx={x} cy={y} r="8" />
    <path className="srv-scheme-bump-glyph" d={`M${x - 3.6} ${y + 1.4} q3.6 -4.6 7.2 0`} />
  </g>
)

function SchemeArt() {
  return (
    <div className="srv-scheme" aria-hidden="true">
      <svg viewBox="0 0 260 190" preserveAspectRatio="xMidYMid meet">
        <g className="srv-scheme-grid">
          {[38, 76, 114, 152].map((y) => <line key={y} x1="12" y1={y} x2="248" y2={y} />)}
          {[70, 130, 190].map((x) => <line key={x} x1={x} y1="14" x2={x} y2="176" />)}
        </g>
        <path className="srv-scheme-fast" d={versD(RAPIDE)} />
        {BOSSES.map((t) => { const b = surLaRoute(RAPIDE, t); return <Bosse key={t} x={b.x} y={b.y} /> })}
        <path className="srv-scheme-halo" d={versD(DOUX)} />
        <path className="srv-scheme-soft" d={versD(DOUX)} />
        {/* Depart en vert : c'est TOI, comme le point bleu d'une carte.
            Arrivee en encre, sous la plaquette : la destination est un
            reperage, pas une action. */}
        <Flag x={ARRIVEE[0]} y={ARRIVEE[1]} />
        <circle className="srv-scheme-start" cx={DEPART[0]} cy={DEPART[1]} r="5.5" />
        <circle className="srv-scheme-end" cx={ARRIVEE[0]} cy={ARRIVEE[1]} r="5" />
      </svg>
    </div>
  )
}

function Onboarding() {
  return (
    <div className="srv-body">
      <div className="srv-brand"><Mark size={22} /><span>SmoothRide</span></div>
      <SchemeArt />
      {/* Le titre et son chapeau sont UNE idee : ils se serrent, et c'est
          l'ecart avec le bloc suivant qui fait la hierarchie. Des ecarts tous
          egaux donnent une page reguliere et sans relief. */}
      <div className="srv-stack srv-stack-tight">
        <h1 className="srv-h">Le même trajet,<em>sans les secousses.</em></h1>
        <p className="srv-lead">
          Deux routes, le nombre de dos-d&apos;âne sur chacune, et ce que le confort coûte
          en minutes.
        </p>
      </div>
      <div className="srv-stack srv-stack-tight">
        <RouteRow min={18} bumps={4} />
        <RouteRow soft min={20} bumps={0} on />
      </div>
      <div className="srv-bottom">
        <Dots i={0} n={2} />
        <UiButton goto="permission">Commencer</UiButton>
        <LinkButton goto="signup">J&apos;ai déjà un compte</LinkButton>
      </div>
    </div>
  )
}

/* ========================= ENTREE ========================= */

function Permission() {
  return (
    <div className="srv-body srv-body-entree">
      <TopBar title="" back />
      <IllusPosition />
      <div className="srv-stack srv-stack-tight">
        <h1 className="srv-h">Où es-tu ?</h1>
        <p className="srv-lead">
          Sans ta position, SmoothRide ne peut ni calculer ton trajet ni te guider en roulant.
        </p>
      </div>
      <div className="srv-bottom">
        <Dots i={1} n={2} />
        <UiButton goto="home-map">Autoriser</UiButton>
        <LinkButton goto="denied">Plus tard</LinkButton>
      </div>
    </div>
  )
}

function Denied() {
  return (
    <div className="srv-body srv-body-entree">
      <TopBar title="Position" back />
      <IllusPosition actif={false} />
      <div className="srv-stack srv-stack-tight">
        <h1 className="srv-h">La navigation est coupée</h1>
        <p className="srv-lead">Tu peux consulter la carte et les dos-d&apos;âne connus, mais pas lancer de trajet.</p>
      </div>
      {/* Le chemin exact, sur UNE ligne, et on peut appuyer dessus. En deux
          lignes de prose, personne ne le lit au moment ou il en a besoin. */}
      <Note tone="rouge" icon={<GearSix size={14} />} title="Réglages › SmoothRide › Position" goto="settings" />
      <div className="srv-bottom">
        <UiButton goto="settings">Ouvrir les réglages</UiButton>
        <LinkButton goto="home-map">Continuer sans navigation</LinkButton>
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
      <div className="srv-stack">
        <Field icon={<User size={14} />} on strong="alex.moreau@mail.fr" />
        <Field icon={<Lock size={14} />}>Mot de passe</Field>
      </div>
      <Note tone="neutral" icon={<ShieldCheck size={14} />} title="Tes trajets restent sur ton téléphone" text="Seuls les dos-d'âne que tu signales sont partagés, sans ton identité." />
      <div className="srv-bottom">
        <UiButton goto="paywall">Créer mon compte</UiButton>
        {/* Hors cahier des charges, qui ne prevoit qu'email et mot de passe.
            A savoir : des qu'une application propose Google, Apple impose
            « Se connecter avec Apple » (regle App Store 4.8). Les deux vont
            donc ensemble, jamais l'un sans l'autre. */}
        <button type="button" className="srv-sso" data-p="apple">
          <svg viewBox="4.2 3 15 18" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.3zM14.3 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2z" />
          </svg>
          Continuer avec Apple
        </button>
        <button type="button" className="srv-sso" data-p="google">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/>
            <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21 7.5 23.5 12 23.5z"/>
            <path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z"/>
            <path fill="#EA4335" d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.6 15.1.5 12 .5 7.5.5 3.7 3 1.8 6.8l3.8 3C6.5 7.1 9 5.1 12 5.1z"/>
          </svg>
          Continuer avec Google
        </button>
      </div>
    </div>
  )
}

/* ========================= TROUVER UN TRAJET ========================= */

function HomeMap() {
  return (
    <div className="srv-body srv-body-flush srv-body-tab">
      <MapLive bumps={D.zone.slice(0, 26)} depart={D.depart} center={D.depart} zoom={14.4} />
      <div className="srv-layer srv-layer-tab">
        <div className="srv-inline">
          <button type="button" className="srv-search srv-grow" onClick={() => goTo('search')}>
            <MagnifyingGlass size={14} /><span>Où vas-tu ?</span>
          </button>
          <IconButton goto="settings" label="Filtres"><SlidersHorizontal size={15} /></IconButton>
        </div>
        <div className="srv-spacer srv-stack">
          <div className="srv-inline srv-end"><IconButton label="Me recentrer"><Crosshair size={15} /></IconButton></div>
          <Sheet card>
            <Banner
              tone="rouge"
              icon={<Warning size={14} />}
              title={<><span className="num">{D.zone.length}</span> dos-d&apos;âne autour de toi</>}
              text="Source OpenStreetMap"
            />
          </Sheet>
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
      <div className="srv-stack">
        <Field dot strong="Ma position" />
        <Field dot on>Où vas-tu ?</Field>
      </div>
      <Head>Favoris</Head>
      <div className="srv-panel">
        <Row icon={<House size={14} />} tone="jade" title="Domicile" meta="12 rue des Pins, Colombes" goto="compare" />
        <Row icon={<MapPin size={14} />} title="Travail" meta="24 av. Victor Hugo, Paris 16e" goto="compare" />
      </div>
      <Head>Récemment</Head>
      <div className="srv-panel">
        <Row icon={<Clock size={14} />} title="Garage Premium Auto" meta="Levallois-Perret" goto="compare" />
        <Row icon={<Clock size={14} />} title="Circuit Carole" meta="Tremblay-en-France" goto="no-bump" />
      </div>
    </div>
  )
}

// Le squelette REPREND la forme de la feuille de comparaison : meme titre,
// meme nombre de blocs, memes hauteurs. Un chargement qui ne ressemble pas
// a ce qui arrive fait sursauter l'ecran au moment du remplacement.
function Loading() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, ton: 'neutre', w: 4 }]} depart={D.depart} arrivee={D.arrivee} zoom={12.6} />
      <div className="srv-layer">
        <div className="srv-search"><Path size={14} /><span>Je compare les deux trajets…</span></div>
        <Sheet>
          <Skel v="title" />
          <Skel v="route" />
          <Skel v="route" />
          <Skel v="btn" />
        </Sheet>
      </div>
    </div>
  )
}

function Compare() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive
        routes={[{ coords: D.rapide.coords, ton: 'rouge', w: 4 }, { coords: D.confort.coords, ton: 'jade', w: 6 }]}
        bumps={D.rapide.bumps} depart={D.depart} arrivee={D.arrivee} zoom={12.6}
      />
      <div className="srv-layer">
        <div className="srv-inline">
          <IconButton goto="search" label="Retour"><ArrowLeft size={16} /></IconButton>
          <div className="srv-search srv-grow"><MapPin size={15} /><strong>Travail</strong></div>
        </div>
        <span className="srv-tag" data-k="soft" data-y="1">
          <span className="num">{D.evites}</span> dos-d&apos;âne évités
        </span>
        <span className="srv-tag" data-k="fast" data-y="2">Le plus rapide</span>
        <Sheet>
          <h2 className="srv-sheet-title">
            <span className="num">{D.ecart}</span> minutes de plus,
            <span className="num"> {D.evites}</span> secousses en moins
          </h2>
          <p className="srv-sheet-sub">Choisis ton trajet.</p>
          <RouteRow min={D.rapide.min} bumps={D.rapide.bumps.length} />
          <RouteRow soft min={D.confort.min} bumps={D.confort.bumps.length} on />
          <UiButton goto="navigation"><NavigationArrow size={13} />C&apos;est parti</UiButton>
        </Sheet>
      </div>
    </div>
  )
}

function NoBump() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, ton: 'jade', w: 6 }]} depart={D.depart} arrivee={D.arrivee} zoom={12.6} />
      <div className="srv-layer">
        <div className="srv-inline">
          <IconButton goto="search" label="Retour"><ArrowLeft size={16} /></IconButton>
          <div className="srv-search srv-grow"><MapPin size={15} /><strong>Circuit Carole</strong></div>
        </div>
        <Sheet>
          <Banner icon={<CheckCircle size={18} />} title="Aucun dos-d'âne" text="Le plus rapide est aussi le plus doux." />
          <RouteRow soft min={26} bumps={0} on />
          <UiButton goto="navigation"><NavigationArrow size={13} />C&apos;est parti</UiButton>
        </Sheet>
      </div>
    </div>
  )
}

/* ========================= ROULER ========================= */

const Instruction = () => (
  <div className="srv-instr">
    <ArrowBendUpRight size={26} weight="bold" className="srv-instr-turn" />
    <div>
      <span className="srv-instr-d num">{D.instruction.m} m</span>
      <small>{D.instruction.texte}</small>
    </div>
  </div>
)

function NavScreen() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.confort.coords, ton: 'jade', w: 8 }]} depart={D.confort.coords[18]} arrivee={D.arrivee} center={D.confort.coords[18]} zoom={16.2} bearing={34} pitch={58} />
      <div className="srv-layer">
        <Instruction />
        <div className="srv-drive-row">
          <Pill tone="jade"><CheckCircle size={11} /><span className="num">{D.evites}</span> évités</Pill>
          <button type="button" className="srv-fab" onClick={() => goTo('report')} aria-label="Signaler un dos-d'âne">
            <Warning size={24} />
          </button>
        </div>
        <div className="srv-drive">
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
      <MapLive routes={[{ coords: D.confort.coords, ton: 'jade', w: 8 }]} bumps={[D.confort.bumps[0]]} center={D.confort.bumps[0]} zoom={15.8} bearing={34} pitch={54} />
      <div className="srv-layer">
        <Instruction />
        <Sheet>
          <Banner
            icon={<CheckCircle size={18} />}
            title="C'est noté"
            text="Position enregistrée, tu n'as rien d'autre à faire."
            action={<IconButton small label="Fermer"><X size={14} /></IconButton>}
          />
          <Note tone="neutral" icon={<Users size={14} />} title="Visible après 3 confirmations" text="D'autres conducteurs doivent passer au même endroit." />
        </Sheet>
      </div>
    </div>
  )
}

function Reroute() {
  return (
    <div className="srv-body srv-body-flush">
      <MapLive routes={[{ coords: D.rapide.coords, ton: 'neutre', w: 4 }, { coords: D.confort.coords, ton: 'jade', w: 6 }]} bumps={D.rapide.bumps.slice(0, 6)} depart={D.depart} arrivee={D.arrivee} zoom={12.6} />
      <div className="srv-layer">
        <div className="srv-instr">
          <Path size={23} />
          <div><span className="srv-instr-d">Nouveau trajet</span><small>Tu t&apos;es écarté de l&apos;itinéraire</small></div>
        </div>
        <span className="srv-tag" data-k="soft" data-y="2">
          <span className="num">3</span> dos-d&apos;âne évités
        </span>
        <Sheet>
          <h2 className="srv-sheet-title">Reprendre par le plus doux ?</h2>
          <p className="srv-sheet-sub">
            <span className="num">2</span> minutes de plus, <span className="num">3</span> dos-d&apos;âne en moins.
          </p>
          <div className="srv-inline">
            <UiButton tone="ghost" goto="navigation">Continuer</UiButton>
            <UiButton goto="navigation">Nouveau trajet</UiButton>
          </div>
        </Sheet>
      </div>
    </div>
  )
}

/* ========================= ABONNEMENT ========================= */

function Paywall() {
  return (
    <div className="srv-body">
      <TopBar end action={<IconButton small label="Fermer"><X size={14} /></IconButton>} />
      <h1 className="srv-h">Tes 10 trajets<em>sont passés.</em></h1>
      <p className="srv-lead">Tu as évité <b>34 dos-d&apos;âne</b> depuis ton inscription. On continue ?</p>
      <div className="srv-stack srv-stack-flush">
        <Benef><strong>Trajets illimités</strong>, sans compteur</Benef>
        <Benef>La comparaison sur <strong>chaque trajet</strong></Benef>
        <Benef><span className="num">+ 120 000</span> dos-d&apos;âne référencés</Benef>
      </div>
      <button type="button" className="srv-plan" data-on="yes">
        <strong>Sans engagement</strong>
        <span className="srv-plan-p num">9,99 €</span>
        <small>Par mois, résiliable quand tu veux</small>
      </button>
      <div className="srv-bottom">
        <UiButton goto="subscribed">S&apos;abonner</UiButton>
        <LinkButton>Restaurer un achat</LinkButton>
        <p className="srv-legal">Paiement via l&apos;App Store. Résiliation dans tes réglages Apple.</p>
      </div>
    </div>
  )
}

function Subscribed() {
  return (
    <div className="srv-body srv-body-scroll">
      <TopBar title="Abonnement" back />
      <div className="srv-panel srv-panel-pad">
        <Banner
          icon={<CreditCard size={17} />}
          title="Abonnement actif"
          text={<><span className="num">9,99 €</span> par mois, prochain le <span className="num">26 septembre</span></>}
          action={<Pill tone="jade">Actif</Pill>}
        />
      </div>
      <Head>Depuis ton abonnement</Head>
      <div className="srv-kpis">
        <Kpi label="Évités" value="147" note="sur 38 trajets" />
        <Kpi label="Temps ajouté" value="2 h 12" note="3 min par trajet" />
      </div>
      <div className="srv-panel">
        <Row icon={<CreditCard size={14} />} title="Restaurer mes achats" meta="après un changement de téléphone" />
        <Row icon={<GearSix size={14} />} title="Gérer dans l'App Store" meta="résiliation, paiement" />
      </div>
      <Note tone="neutral" icon={<ShieldCheck size={14} />} title="La résiliation passe par Apple" text="Comme tout abonnement iPhone, depuis tes réglages." />
    </div>
  )
}

/* ========================= COMPTE ========================= */

function SettingsScreen() {
  return (
    <div className="srv-body srv-body-scroll srv-body-tab">
      <TopBar title="Compte" />
      <div className="srv-panel">
        <Row icon={<User size={14} />} tone="jade" title="alex.moreau@mail.fr" meta="Compte créé le 12 août 2026" />
        <Row icon={<CreditCard size={14} />} title="Abonnement" meta="Actif, 9,99 € par mois" trailing={<Pill tone="jade">Actif</Pill>} goto="subscribed" />
      </div>
      <Head>Conduite</Head>
      <div className="srv-panel">
        <Row icon={<Path size={14} />} title="Trajet préféré" meta="Proposer le plus doux en premier" />
        <Row icon={<MapPin size={14} />} title="Adresses favorites" meta="Domicile, travail" />
        <Row icon={<Bell size={14} />} title="Alertes" meta="Prévenir avant un dos-d'âne" />
      </div>
      <Head>Application</Head>
      <div className="srv-panel">
        <Row icon={<GearSix size={14} />} title="Unités et thème" meta="Kilomètres, sombre" />
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
        <Kpi label="Ce mois-ci" value="38" note="trajets" />
        <Kpi label="Évités" value="147" note="dos-d'âne" />
      </div>
      <Head action="Aujourd'hui">Derniers trajets</Head>
      <div className="srv-panel">
        <Row icon={<House size={14} />} tone="jade" title="Domicile" meta="18:42 · 14,1 km · 22 min" trailing={<Pill tone="jade">6 évités</Pill>} />
        <Row icon={<MapPin size={14} />} title="Travail" meta="08:15 · 12,9 km · 19 min" trailing={<Pill tone="jade">4 évités</Pill>} />
        <Row icon={<MapPin size={14} />} title="Garage Premium Auto" meta="Hier · 8,4 km · 14 min" trailing={<Pill tone="rouge">2 subis</Pill>} />
      </div>
      <Note tone="neutral" icon={<Lock size={14} />} title="Tes trajets restent sur ce téléphone" text="Ils ne sont ni envoyés ni partagés." />
      <TabBar active="hist" />
    </div>
  )
}

function NetworkError() {
  // Cet ecran s'affiche a quelqu'un qui est probablement AU VOLANT. Il ne se
  // lit pas, il se reconnait : un grand signe, trois mots, un bouton. Le
  // panneau est donc au CENTRE, la ou l'oeil tombe, et pas dans une feuille
  // en bas parmi d'autres blocs de texte.
  return (
    <div className="srv-body srv-body-flush">
      <MapLive bumps={D.zone.slice(0, 26)} center={D.depart} zoom={14.4} />
      <div className="srv-layer">
        <div className="srv-inline">
          <IconButton goto="home-map" label="Retour"><ArrowLeft size={16} /></IconButton>
          <div className="srv-search srv-grow"><MapPin size={15} /><strong>Nouveau trajet</strong></div>
        </div>
        <div className="srv-milieu">
          <div className="srv-alerte">
            <span className="srv-alerte-i"><WifiSlash size={30} /></span>
            <strong>Pas de réseau</strong>
            <p>Le trajet n&apos;a pas pu être calculé.</p>
            <UiButton goto="compare">Réessayer</UiButton>
            <small><MapPin size={12} />Les dos-d&apos;âne déjà téléchargés restent visibles</small>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================= ADMINISTRATION ========================= */

const SIGNALEMENTS = [
  ['Rue Brenu, Gennevilliers', '3 fois · il y a 2 h'],
  ['Av. Victor Hugo, Colombes', '1 fois · il y a 5 h'],
]

function Admin() {
  return (
    <div className="srv-body srv-body-scroll srv-body-tab">
      <TopBar title="Signalements" action={<Pill tone="wait">42 en attente</Pill>} />
      <div className="srv-panel">
        {SIGNALEMENTS.map(([t, m]) => (
          <div className="srv-row srv-row-top" key={t}>
            <Tile tone="rouge"><Warning size={14} /></Tile>
            <div className="srv-row-b">
              <strong>{t}</strong><small>{m}</small>
              <div className="srv-inline srv-inline-wrap">
                <button type="button" className="srv-btn srv-btn-compact">Valider</button>
                <button type="button" className="srv-btn srv-btn-ghost srv-btn-compact">Rejeter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Head>Base</Head>
      <div className="srv-kpis">
        <Kpi label="Référencés" value="+ 121 480" note="dont 1 480 communautaires" />
        <Kpi label="Abonnés" value="108" note="+ 14 ce mois-ci" />
      </div>
      <Note tone="neutral" icon={<Lock size={14} />} title="Les revenus se lisent chez Apple et Google" text="SmoothRide n'encaisse rien directement." />
      <TabBar active="adm" admin />
    </div>
  )
}

/* ==========================================================================
   LE DOSSIER
   ========================================================================== */

const FLOWS = [
  {
    n: '04', title: "L'entrée",
    note: "Deux écrans avant la carte. La position est expliquée avant d'être demandée, et refusée, l'application reste consultable. Le compte, lui, n'arrive que plus tard.",
    items: [
      { id: 'permission', t: 'Ta position', s: "Expliquée avant d'être demandée", el: <Permission />, notes: ['Cliquable : Autoriser'] },
      { id: 'denied', t: 'Position refusée', s: "L'app reste consultable", el: <Denied />, notes: ["État d'erreur"] },
    ],
  },
  {
    n: '05', title: 'Trouver un trajet',
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
    n: '06', title: 'Rouler',
    note: "Au volant tout se lit en une fraction de seconde. Le signalement se fait d'un seul appui, là où les autres applications en demandent deux.",
    items: [
      { id: 'navigation', t: 'Navigation', s: 'Vue conduite, prochaine instruction', el: <NavScreen />, notes: ['Signalement en un appui', 'Cliquable : le bouton rouge'] },
      { id: 'report', t: 'Signalement envoyé', s: 'Sans quitter la route', el: <Report /> },
      { id: 'reroute', t: 'Recalcul', s: 'Une proposition chiffrée', el: <Reroute />, notes: ['Cliquable : les deux boutons'] },
    ],
  },
  {
    n: '07', title: "L'abonnement",
    note: "Dix trajets offerts, une fois pour toutes. L'écran rappelle ce qui a déjà été évité avant de demander quoi que ce soit.",
    items: [
      { id: 'signup', t: 'Création de compte', s: 'Demandée quand elle sert', el: <Signup />, notes: ['Après le moment de valeur'] },
      { id: 'paywall', t: 'Fin des trajets offerts', s: 'La preuve avant la demande', el: <Paywall />, notes: ["Cliquable : S'abonner"] },
      { id: 'subscribed', t: 'Abonnement actif', s: 'Suivi et restauration', el: <Subscribed />, scroll: true },
    ],
  },
  {
    n: '08', title: 'Son compte',
    note: 'Réglages et historique, accessibles depuis la barre du bas. Rien ne quitte le téléphone.',
    items: [
      { id: 'settings', t: 'Compte', s: 'Abonnement, conduite, application', el: <SettingsScreen />, scroll: true },
      { id: 'history', t: 'Historique', s: "Ce que l'app a évité", el: <History />, scroll: true },
      { id: 'network-error', t: 'Pas de réseau', s: 'Ce qui reste possible hors ligne', el: <NetworkError />, notes: ["État d'erreur"] },
    ],
  },
  {
    n: '09', title: "L'espace d'administration",
    note: "Le second profil, réservé au propriétaire. Il vit dans l'app, sans outil séparé à installer.",
    items: [
      { id: 'admin', t: 'Signalements et base', s: 'Valider, rejeter, suivre', el: <Admin />, scroll: true },
    ],
  },
]

/* ==========================================================================
   LA PLANCHE DE CHARTE

   Elle se MESURE elle-meme : les tailles et les valeurs affichees sont lues
   dans le rendu, pas recopiees a la main. La version precedente annoncait
   19 px pour une duree que le CSS fixait a 17 px — une planche qui ment sur
   sa propre echelle est pire que pas de planche du tout.
   ========================================================================== */

const ECHELLE = [
  { k: 'display', ex: 'Le même trajet', role: 'la promesse' },
  { k: 'title',   ex: '3 minutes de plus', role: 'un titre de feuille' },
  { k: 'metric',  ex: '23 min',         role: 'la durée' },
  { k: 'lead',    ex: 'Le plus doux',   role: 'un titre de carte' },
  { k: 'body',    ex: 'Ce que le confort coûte en minutes', role: 'le texte courant' },
  { k: 'label',   ex: "11 dos-d'âne",   role: 'une étiquette' },
]

const COULEURS = [
  { k: 'jade',     nom: 'Jade',         role: "le vert de l'ambiance : bouton, texte, tracé, logo" },
  { k: 'jade-ink', nom: 'Sur le jade',  role: "l'encre posée sur un aplat vert" },
  { k: 'rouge',    nom: 'Corail',       role: "un dos-d'âne, rien d'autre" },
  { k: 'rouge-fg', nom: 'Corail écrit', role: 'le même corail, quand il est du texte' },
  { k: 'nuit',     nom: 'Nuit',         role: "le fond de l'écran de conduite" },
  { k: 'jour',     nom: 'Jour',         role: 'le fond de tous les autres écrans' },
  { k: 'encre',    nom: 'Encre',        role: 'le texte, jamais de noir dur' },
]

/** Lit dans le rendu ce que la charte affiche. Aucun chiffre en dur.
 *  Relit a chaque changement d'ambiance : les encres de marque suivent le
 *  fond, une mesure prise au montage aurait affiche les valeurs de l'autre
 *  theme — la planche se serait remise a mentir. */
function useMesures(ref, theme) {
  const [m, setM] = useState({})
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cs = getComputedStyle(el)
    const px = (n) => cs.getPropertyValue(`--t-${n}`).trim()
    const hex = (n) => {
      const probe = el.querySelector(`[data-c="${n}"]`)
      return probe ? getComputedStyle(probe).backgroundColor : ''
    }
    const rgbToHex = (s) => {
      const p = s.match(/\d+/g)
      if (!p) return s
      return '#' + p.slice(0, 3).map((v) => Number(v).toString(16).padStart(2, '0')).join('').toUpperCase()
    }
    setM({
      t: Object.fromEntries(ECHELLE.map((e) => [e.k, px(e.k)])),
      c: Object.fromEntries(COULEURS.map((c) => [c.k, rgbToHex(hex(c.k))])),
    })
  }, [ref, theme])
  return m
}

function Charte({ theme }) {
  const ref = useRef(null)
  const m = useMesures(ref, theme)
  return (
    <div className="srv-da" ref={ref}>
      <div className="srv-da-card srv-da-wide">
        <h3>Le logo</h3>
        <div className="srv-logos">
          <div className="srv-logo-box srv-light" data-bg="clair"><Logotype size={30} /><small>Sur fond clair</small></div>
          <div className="srv-logo-box srv-dark" data-bg="sombre"><Logotype size={30} /><small>Sur fond sombre</small></div>
          <div className="srv-logo-box" data-bg="clair">
            <div className="srv-appicons">
              {/* A surface egale, un squircle parait plus petit qu'un carre :
                  ses coins mangent 6 % de l'aire. L'icone Apple est donc
                  rendue legerement plus grande ICI, pour que la comparaison
                  soit juste a l'oeil. Le fichier livre est le meme. */}
              <span className="srv-appicon"><AppIcon px={86} store="apple" /><span>App Store</span></span>
              <span className="srv-appicon"><AppIcon px={80} store="google" /><span>Google Play</span></span>
            </div>
            <small>Icône de l&apos;application</small>
          </div>
          <div className="srv-logo-box" data-bg="clair">
            <div className="srv-appicons">
              <span className="srv-appicon"><AppIcon px={60} /><span>60 px</span></span>
              <span className="srv-appicon"><AppIcon px={40} /><span>40 px</span></span>
              <span className="srv-appicon"><AppIcon px={22} ombre={false} /><span>22 px</span></span>
            </div>
            <small>Aux tailles réelles d&apos;iOS</small>
          </div>
        </div>
        <p>
          La route entre par une bosse et repart plate : les deux idées du produit
          fondues en une forme. Le logo et l&apos;icône partagent le même tracé, au même
          pourcentage — c&apos;est littéralement la même image. Elle reste lisible jusqu&apos;à
          22 px, la taille d&apos;un réglage iPhone. On livre <b>un seul fichier</b>, carré,
          en 1024 px : chaque store applique son propre masque, et un coin déjà arrondi
          se retrouve rogné deux fois. Le squircle d&apos;Apple mange 6 % de l&apos;aire du
          carré — les deux sont montrés ici à taille optiquement égale, pas à taille
          mathématiquement égale.
        </p>
      </div>

      <div className="srv-da-card">
        <h3>Les couleurs</h3>
        <div className={`srv-swatches srv-${theme}`}>
          {COULEURS.map((c) => (
            <div className="srv-swatch" key={c.k}>
              <i data-c={c.k} />
              <div>
                <b>{c.nom}</b>
                <span>{c.role}</span>
                <code>{m.c?.[c.k] || '…'}</code>
              </div>
            </div>
          ))}
        </div>
        <p>
          <b>Un seul vert par ambiance</b>, et il sert à tout : le bouton, le titre, le
          tracé, la puce, le logo. Sur un écran donné, l&apos;œil ne rencontre jamais deux
          verts. Les deux valeurs ont la <b>même teinte</b> — 161°, au degré près ; seule
          leur clarté suit le fond, comme une encre. Bascule l&apos;ambiance et regarde
          l&apos;écran de promesse : tout le vert bouge ensemble, d&apos;un bloc.
        </p>
      </div>

      <div className="srv-da-card">
        <h3>Les textes</h3>
        <div className="srv-scale">
          {ECHELLE.map((e) => (
            <div key={e.k}>
              <b data-t={e.k}>{e.ex}</b>
              <span>{e.role}<i>{m.t?.[e.k] || ''}</i></span>
            </div>
          ))}
        </div>
        <p>Six crans, et rien entre les deux. Les tailles affichées ici sont lues dans le rendu, pas recopiées.</p>
      </div>

      <div className="srv-da-card">
        <h3>Les boutons</h3>
        <div className={`srv-da-buttons srv-${theme}`}>
          <button type="button" className="srv-btn srv-btn-inline">C&apos;est parti</button>
          <button type="button" className="srv-btn srv-btn-ghost srv-btn-inline">Continuer</button>
          <button type="button" className="srv-btn srv-btn-off srv-btn-inline">Indisponible</button>
        </div>
        <p>Une seule action pleine par écran. Chaque bouton s&apos;enfonce sous le doigt.</p>
      </div>

      <div className="srv-da-card srv-da-wide">
        <h3>Et quand ça ne va pas, quatre situations prévues</h3>
        <div className={`srv-da-states srv-${theme}`}>
          <div className="srv-da-state">
            <h4>Une erreur</h4>
            <Note tone="rouge" icon={<Warning size={14} />} title="La navigation est coupée" text="Ta position est refusée." />
          </div>
          <div className="srv-da-state">
            <h4>Rien à signaler</h4>
            <Note tone="neutral" icon={<CheckCircle size={14} />} title="Aucun dos-d'âne" text="Le plus rapide est aussi le plus doux." />
          </div>
          <div className="srv-da-state">
            <h4>Un chargement</h4>
            <div className="srv-stack">
              <Skel v="title" />
              <Skel v="row" />
              <Skel v="row-short" />
            </div>
          </div>
          <div className="srv-da-state">
            <h4>Une réussite</h4>
            <Note icon={<CheckCircle size={14} />} title="C'est noté" text="Position enregistrée." />
          </div>
        </div>
      </div>
    </div>
  )
}


/* ==========================================================================
   LA PLANCHE DES COMPOSANTS

   Ce que la maquette assemble, sorti des ecrans et pose a plat. Chaque piece
   n'existe qu'une fois dans le code : la voir seule, c'est verifier qu'elle
   tient sans le contexte qui la sauvait.
   ========================================================================== */

const Spec = ({ label, note, wide = false, children }) => (
  <div className={`srv-spec${wide ? ' srv-spec-wide' : ''}`}>
    <h4>{label}</h4>
    <div className="srv-spec-stage">{children}</div>
    {note && <p>{note}</p>}
  </div>
)

function Composants({ theme }) {
  return (
    <div className={`srv-specs-wrap srv-${theme}`}>
      <Spec label="Carte d'itinéraire" note="Le composant signature : la densité de secousses se compare d'un coup d'œil, et la durée a sa propre colonne." wide>
        <div className="srv-spec-duo">
          <RouteRow min={20} bumps={17} />
          <RouteRow soft min={23} bumps={11} on />
        </div>
      </Spec>
      <div className="srv-specs">
      <Spec label="Boutons" note="Une seule action pleine par écran.">
        <UiButton>C&apos;est parti</UiButton>
        <UiButton tone="ghost">Continuer</UiButton>
        <UiButton tone="off">Indisponible</UiButton>
        <div className="srv-spec-row">
          <button type="button" className="srv-btn srv-btn-compact">Valider</button>
          <button type="button" className="srv-btn srv-btn-ghost srv-btn-compact">Rejeter</button>
        </div>
      </Spec>

      <Spec label="Pastilles" note="Elles informent. Une pastille ne s'appuie pas.">
        <div className="srv-spec-row">
          <Pill tone="jade"><span className="num">11</span> dos-d&apos;âne</Pill>
          <Pill tone="rouge"><span className="num">17</span> dos-d&apos;âne</Pill>
        </div>
        <div className="srv-spec-row">
          <Pill>Neutre</Pill>
          <Pill tone="wait">42 en attente</Pill>
        </div>
      </Spec>

      <Spec label="Champs" note="L'état actif se lit au liseré, pas à la couleur du texte.">
        <Field dot strong="Ma position" />
        <Field dot on>Où vas-tu ?</Field>
      </Spec>

      <Spec label="Chrome flottant" note="Une seule matière : translucide et floutée.">
        <div className="srv-spec-row">
          <IconButton label="Retour"><ArrowLeft size={15} /></IconButton>
          <IconButton label="Me recentrer"><Crosshair size={15} /></IconButton>
          <IconButton small label="Fermer"><X size={14} /></IconButton>
        </div>
        <div className="srv-search"><MagnifyingGlass size={14} /><span>Où vas-tu ?</span></div>
      </Spec>

      <Spec label="Lignes de liste">
        <div className="srv-panel">
          <Row icon={<House size={14} />} tone="jade" title="Domicile" meta="12 rue des Pins, Colombes" />
          <Row icon={<MapPin size={14} />} title="Travail" meta="24 av. Victor Hugo" trailing={<Pill tone="jade">4 évités</Pill>} />
        </div>
      </Spec>

      <Spec label="Bandeau">
        <Banner icon={<CheckCircle size={18} />} title="C'est noté" text="Position enregistrée." />
        <Banner tone="rouge" icon={<Warning size={18} />} title="150 dos-d'âne" text="Source OpenStreetMap" />
      </Spec>

      <Spec label="Encarts" note="Trois tons, jamais un quatrième.">
        <Note icon={<CheckCircle size={14} />} title="Aucun dos-d'âne" />
        <Note tone="rouge" icon={<Warning size={14} />} title="La navigation est coupée" />
        <Note tone="neutral" icon={<Lock size={14} />} title="Tout reste sur ce téléphone" />
      </Spec>

      <Spec label="Chiffres clés">
        <div className="srv-kpis">
          <Kpi label="Évités" value="147" note="sur 38 trajets" />
          <Kpi label="Temps ajouté" value="2 h 12" note="3 min par trajet" />
        </div>
      </Spec>

      <Spec label="Chargement" note="Le squelette a la forme de ce qui va le remplacer.">
        <Skel v="title" />
        <Skel v="route" />
        <Skel v="btn" />
      </Spec>


      <Spec label="Le signe" note="Un seul tracé, du logo à l'icône de réglage.">
        <div className="srv-spec-row srv-spec-marks srv-spec-center">
          <Mark size={44} /><Mark size={30} /><Mark size={22} />
        </div>
      </Spec>

      <Spec label="Progression">
        <div className="srv-spec-row srv-spec-center"><Dots i={0} n={2} /></div>
        <div className="srv-spec-row srv-spec-center"><Dots i={1} n={2} /></div>
      </Spec>
      </div>
    </div>
  )
}

const AMBIANCES = [['dark', 'Sombre'], ['light', 'Clair']]

export default function SmoothRideMockups() {
  // Un seul jeu d'ecrans, deux ambiances. Le client bascule et compare,
  // plutot que de lire deux galeries en parallele.
  const [theme, setTheme] = useState('dark')

  // Les fleches du clavier basculent l'ambiance depuis n'importe ou dans la
  // page : gauche = sombre, droite = clair, dans l'ordre ou elles sont
  // posees a l'ecran. On laisse passer les raccourcis systeme et la saisie,
  // sinon une fleche deviendrait inutilisable ailleurs.
  useEffect(() => {
    const auClavier = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      const c = e.target
      if (c && (c.tagName === 'INPUT' || c.tagName === 'TEXTAREA' || c.isContentEditable)) return
      if (e.key === 'ArrowLeft') { setTheme('dark'); e.preventDefault() }
      else if (e.key === 'ArrowRight') { setTheme('light'); e.preventDefault() }
    }
    window.addEventListener('keydown', auClavier)
    return () => window.removeEventListener('keydown', auClavier)
  }, [])
  return (
    <main className="srv">
      <div className="srv-wrap">
        <header className="srv-hero">
          <p className="srv-hero-eyebrow">Proposition design</p>
          <div className={`srv-hero-logo srv-${theme}`}><Logotype size={44} /></div>
          <p className="srv-hero-ref">SmoothRide · MOB-2026-088</p>
          <span className="srv-chip"><i />Maquette interactive, touche les boutons</span>
        </header>

        <div className="srv-center srv-center-col">
          <div className="srv-switch" role="radiogroup" aria-label="Choisir l'ambiance">
            {AMBIANCES.map(([id, l]) => (
              <button key={id} type="button" role="radio" aria-checked={theme === id}
                tabIndex={theme === id ? 0 : -1} onClick={() => setTheme(id)}>{l}</button>
            ))}
          </div>
          <p className="srv-switch-hint">
            <kbd>&larr;</kbd> sombre &nbsp;·&nbsp; <kbd>&rarr;</kbd> clair
          </p>
        </div>

        <section className="srv-sec">
          <p className="srv-sec-num">01</p>
          <h2>La charte graphique</h2>
          <p className="srv-sec-note">
            L&apos;identité de SmoothRide, posée avant les écrans : le logo, l&apos;icône de
            l&apos;application, les couleurs et ce qu&apos;elles veulent dire, les textes et les
            boutons. Tout ce qui suit en découle.
          </p>
          <Charte theme={theme} />
        </section>

        <section className="srv-sec">
          <p className="srv-sec-num">02</p>
          <h2>Les composants</h2>
          <p className="srv-sec-note">
            Les dix-neuf écrans sont assemblés à partir de ces pièces, et de rien d&apos;autre.
            Chacune n&apos;existe qu&apos;une seule fois dans le code : corriger une pastille ici,
            c&apos;est la corriger sur tous les écrans à la fois. Chaque pièce est posée sur la
            vraie surface de l&apos;ambiance choisie — si elle ne tient pas ici, elle ne tient
            nulle part.
          </p>
          <Composants theme={theme} />
        </section>

        <section className="srv-sec" id="srv-onboarding">
          <p className="srv-sec-num">03</p>
          <h2>L&apos;écran de promesse</h2>
          <p className="srv-sec-note">
            Le premier écran ne montre pas une carte : à cette taille elle serait illisible.
            Un schéma dit la promesse en une seconde, la route rouge pointillée contre la route
            jade continue, et le drapeau d&apos;arrivée que les deux partagent. Basculez
            l&apos;ambiance en haut de page : seuls le fond et le texte changent, la marque ne
            bouge pas d&apos;un pixel.
          </p>
          <div className="srv-center">
            <PhoneFrame theme={theme}><Onboarding /></PhoneFrame>
          </div>
        </section>

        {FLOWS.map((f) => (
          <section className="srv-sec" key={f.n}>
            <p className="srv-sec-num">{f.n}</p>
            <h2>{f.title}</h2>
            <p className="srv-sec-note">{f.note}</p>
            <div className="srv-gallery">
              {f.items.map((mk) => (
                <div className="srv-slot" key={mk.id} id={`srv-${mk.id}`}>
                  <div className="srv-slot-head"><h4>{mk.t}</h4><p>{mk.s}</p></div>
                  <PhoneFrame theme={theme}>{mk.el}</PhoneFrame>
                  {(mk.notes || mk.scroll) && (
                    <div className="srv-notes">
                      {mk.scroll && <span data-s="yes">Écran défilable</span>}
                      {(mk.notes || []).map((x) => <span key={x}>{x}</span>)}
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
