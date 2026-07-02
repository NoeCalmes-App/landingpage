import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  Bell,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  FileText,
  Hand,
  Layers,
  Lock,
  Map as MapIcon,
  MapPin,
  Navigation,
  Plus,
  Route,
  Ruler,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  TriangleAlert,
  UserRound,
} from 'lucide-react'
import './convoipilote-mockups.css'
import StatusBarIcons from './StatusBarIcons'

/* ---------- Leaflet (real map) loaded from CDN ---------- */
let leafletPromise = null
function loadLeaflet() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.L) return Promise.resolve(window.L)
  if (leafletPromise) return leafletPromise
  leafletPromise = new Promise((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(css)
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => resolve(window.L)
    script.onerror = reject
    document.head.appendChild(script)
  })
  return leafletPromise
}

function LeafletMap({ center, zoom, markers = [], route = null, network = null, interactive = false, tilt = false }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    let disposed = false
    loadLeaflet().then((L) => {
      if (!L || disposed || !elRef.current || mapRef.current) return
      const map = L.map(elRef.current, {
        center,
        zoom,
        zoomControl: false,
        attributionControl: false,
        dragging: interactive,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: interactive,
      })
      mapRef.current = map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map)

      if (network) {
        network.forEach((line) => {
          L.polyline(line, {
            color: '#f2b90a',
            weight: 11,
            opacity: 0.38,
            lineJoin: 'round',
            lineCap: 'round',
          }).addTo(map)
        })
      }

      if (route) {
        L.polyline(route, {
          color: '#1f6feb',
          weight: 5,
          opacity: 0.95,
          lineJoin: 'round',
          lineCap: 'round',
        }).addTo(map)
      }

      markers.forEach((m) => {
        const isNav = m.tone === 'nav'
        const html = isNav
          ? '<span class="cp-nav-arrow"><svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2l7 18-7-4-7 4z"/></svg></span>'
          : `<span class="cp-pin cp-pin-${m.tone}"></span>`
        const size = isNav ? 36 : 22
        const icon = L.divIcon({
          className: 'cp-div-icon',
          html,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
        L.marker(m.pos, { icon }).addTo(map)
      })

      setTimeout(() => map.invalidateSize(), 60)
    })

    return () => {
      disposed = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={elRef} className={`cp-leaflet${tilt ? ' cp-leaflet-tilt' : ''}`} />
}

/* Toulouse-area coordinates used across the map screens */
const CENTER = [43.6045, 1.4442]
/* Ouvrages placés sur de vraies routes */
const OUVRAGES = [
  { pos: [43.615717, 1.434792], tone: 'pont' },
  { pos: [43.59491, 1.45337], tone: 'tunnel' },
  { pos: [43.610844, 1.457369], tone: 'pn' },
  { pos: [43.598099, 1.432223], tone: 'travaux' },
]
/* Tracé réel qui suit les rues (routing OSRM) */
const ROUTE = [
  [43.597213, 1.429857], [43.597607, 1.429746], [43.597698, 1.430861], [43.59786, 1.430997],
  [43.598731, 1.430215], [43.601944, 1.427932], [43.608223, 1.428365], [43.610179, 1.426557],
  [43.612294, 1.425213], [43.613025, 1.428975], [43.613464, 1.430383], [43.613989, 1.431621],
  [43.615058, 1.433371], [43.615717, 1.434792], [43.616353, 1.438691], [43.61623, 1.439688],
  [43.615345, 1.442866], [43.615342, 1.443834], [43.615675, 1.446916], [43.615585, 1.447559],
  [43.615272, 1.44838], [43.614069, 1.451066], [43.613683, 1.451653], [43.610204, 1.453583],
  [43.609474, 1.454366], [43.609906, 1.455054], [43.609886, 1.455879], [43.610844, 1.457369],
  [43.611108, 1.457629], [43.611722, 1.457712], [43.612975, 1.459568], [43.612646, 1.459966],
]
const ROUTE_START = [43.597213, 1.429857]
const ROUTE_END = [43.612646, 1.459966]
/* Réseau TE (routes autorisées surlignées) — vraies géométries de rues */
const NETWORK = [
  ROUTE,
  [
    [43.603964, 1.444554], [43.60384, 1.444489], [43.603579, 1.444802], [43.602659, 1.44483],
    [43.602414, 1.444825], [43.60219, 1.444565], [43.60169, 1.444959], [43.600459, 1.445083],
    [43.600369, 1.443658], [43.599605, 1.440425], [43.598099, 1.432223], [43.597964, 1.430857],
    [43.601944, 1.427932], [43.607434, 1.428303], [43.610392, 1.420153], [43.610657, 1.419986],
    [43.611483, 1.419918], [43.61131, 1.418392], [43.611424, 1.41792], [43.61198, 1.417786],
    [43.614224, 1.418303],
  ],
  [
    [43.599887, 1.436931], [43.599807, 1.436578], [43.599136, 1.436821], [43.599062, 1.436459],
    [43.598892, 1.436551], [43.597875, 1.430632], [43.592537, 1.434548], [43.592596, 1.435058],
    [43.591996, 1.442115], [43.592269, 1.442401], [43.595408, 1.451182], [43.594855, 1.452372],
    [43.59491, 1.45337], [43.595323, 1.453909], [43.596084, 1.453934], [43.596842, 1.455863],
    [43.597228, 1.456012], [43.598465, 1.455973], [43.598614, 1.456167], [43.596258, 1.462262],
    [43.595003, 1.461973],
  ],
]

/* ---------- shared UI ---------- */
function StatusBar({ onMap = false }) {
  return (
    <div className={`cp-statusbar${onMap ? ' cp-statusbar-onmap' : ''}`}>
      <span>9:41</span>
      <div className="cp-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children, onMap = false }) {
  return (
    <div className="cp-phone-export">
      <div className="cp-phone">
        <div className="cp-screen">
          <StatusBar onMap={onMap} />
          {children}
          <div className="cp-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '', style }) {
  return <button className={`cp-ui-button cp-ui-button-${tone} ${className}`} style={style}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`cp-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`cp-screen-title${centered ? ' cp-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopNavigation({ title }) {
  return (
    <div className="cp-top-navigation">
      <IconButton>
        <UserRound size={17} />
      </IconButton>
      {title && <strong>{title}</strong>}
      <IconButton>
        <Settings size={17} />
      </IconButton>
    </div>
  )
}

function Field({ label, value, result = false }) {
  return (
    <div className={`cp-field${result ? ' cp-field-result' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ListRow({ icon, title, meta }) {
  return (
    <div className="cp-list-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <ChevronRight size={15} />
    </div>
  )
}

function Benefit({ text }) {
  return (
    <div className="cp-benefit">
      <Check size={15} />
      <span>{text}</span>
    </div>
  )
}

function SourceRow({ tone, icon, title, meta }) {
  return (
    <div className="cp-source-row">
      <i className={`cp-si-${tone}`}>{icon}</i>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <ChevronRight size={15} />
    </div>
  )
}

/* ---------- screens ---------- */
function OnboardingScreen() {
  return (
    <div className="cp-phone-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="cp-intro-center" style={{ position: 'static', marginTop: 78 }}>
        <div className="cp-app-mark">
          <Truck size={30} />
        </div>
        <ScreenTitle
          centered
          eyebrow="Transport exceptionnel"
          title="Le bon itinéraire, adapté à votre convoi."
          subtitle="ConvoiPilote propose un trajet selon votre gabarit, que vous vérifiez avant de rouler."
        />
      </div>
      <div className="cp-intro-bottom">
        <UiButton>
          Commencer
          <ArrowRight size={17} />
        </UiButton>
        <div className="cp-step-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function ConvoiProfileScreen() {
  return (
    <div className="cp-phone-content cp-form-screen">
      <TopNavigation title="Mon convoi" />
      <ScreenTitle title="Votre convoi" subtitle="La catégorie et le réseau autorisé sont calculés automatiquement." />
      <div className="cp-field-list">
        <Field label="Largeur" value="3,80 m" />
        <Field label="Longueur" value="24 m" />
        <Field label="Hauteur" value="4,50 m" />
        <Field label="Poids" value="65 t" />
        <Field label="Charge à l'essieu" value="11 t" />
        <Field label="Catégorie · réseau" value="2e cat. · TE72" result />
      </div>
    </div>
  )
}

function HomeMapScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap center={CENTER} zoom={14} network={NETWORK} markers={[...OUVRAGES, { pos: CENTER, tone: 'user' }]} />
      <div className="cp-map-topbar">
        <button className="cp-avatar">N</button>
        <div className="cp-search-pill">
          <Search size={16} />
          <span className="cp-search-text">Rechercher un lieu, un ouvrage…</span>
        </div>
        <IconButton>
          <Layers size={17} />
        </IconButton>
      </div>
      <div className="cp-cat-badge">
        <Truck size={13} />
        Réseau TE72
      </div>
      <div className="cp-legend">
        <div><i className="cp-legend-line" style={{ background: '#f2b90a' }} />Réseau TE72</div>
        <div><i style={{ background: '#e5484d' }} />Pont</div>
        <div><i style={{ background: '#8b5cf6' }} />Tunnel</div>
        <div><i style={{ background: '#f5920b' }} />Passage à niveau</div>
        <div><i style={{ background: '#eab308' }} />Travaux</div>
      </div>
      <IconButton className="cp-floating-locate">
        <Navigation size={18} />
      </IconButton>
      <div className="cp-bottom-card cp-home-card">
        <div>
          <span>Convoi 2e catégorie</span>
          <strong>Prêt à préparer un trajet</strong>
        </div>
        <UiButton className="cp-ui-button-full">Itinéraire</UiButton>
      </div>
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap center={CENTER} zoom={13} markers={[{ pos: CENTER, tone: 'user' }]} />
      <div className="cp-sheet" style={{ top: 58, bottom: 14 }}>
        <div className="cp-sheet-grip" />
        <div className="cp-trip-field">
          <span className="cp-trip-dot cp-trip-dot-start" />
          <div>
            <small>DÉPART</small>
            <strong>Dépôt, Toulouse</strong>
          </div>
        </div>
        <div className="cp-trip-field">
          <span className="cp-trip-dot cp-trip-dot-mid" />
          <div>
            <small>POINT DE PASSAGE</small>
            <strong>Ajouter une étape</strong>
          </div>
        </div>
        <div className="cp-trip-field">
          <span className="cp-trip-dot cp-trip-dot-end" />
          <div>
            <small>ARRIVÉE</small>
            <strong>Chantier, Millau</strong>
          </div>
        </div>
        <div className="cp-section-label">Récents</div>
        <ListRow icon={<MapPin size={16} />} title="Zone industrielle Nord" meta="Blagnac" />
        <ListRow icon={<MapPin size={16} />} title="Viaduc de Millau" meta="A75" />
        <UiButton className="cp-ui-button-full cp-ui-button-blue" style={{ marginTop: 12 }}>
          Calculer l'itinéraire
        </UiButton>
      </div>
    </div>
  )
}

function ProposedRouteScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap
        center={CENTER}
        zoom={13}
        route={ROUTE}
        network={NETWORK}
        markers={[
          { pos: ROUTE_START, tone: 'start' },
          { pos: ROUTE_END, tone: 'end' },
          { pos: [43.610204, 1.453583], tone: 'tunnel' },
        ]}
      />
      <div className="cp-sheet">
        <div className="cp-sheet-grip" />
        <div className="cp-sheet-title">Itinéraire proposé</div>
        <div className="cp-route-meta">
          <div><span>Distance</span><strong>142 km</strong></div>
          <div><span>Durée</span><strong>2 h 40</strong></div>
          <div><span>Gabarit</span><strong>TE72</strong></div>
        </div>
        <div className="cp-warn">
          <TriangleAlert size={16} />
          <p><b>Brouillon à vérifier.</b> Calculé selon votre gabarit. Ne garantit pas le réseau TE ni les prescriptions. Vérifiez sur la carte et sur le terrain.</p>
        </div>
        <div className="cp-check-row">
          <span className="cp-check-box"><Check size={13} /></span>
          J'ai vérifié mon itinéraire
        </div>
        <UiButton className="cp-ui-button-full">Démarrer la navigation</UiButton>
      </div>
    </div>
  )
}

function EditRouteScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap
        center={CENTER}
        zoom={14}
        route={ROUTE}
        network={NETWORK}
        markers={[
          { pos: ROUTE_START, tone: 'start' },
          { pos: ROUTE_END, tone: 'end' },
          { pos: CENTER, tone: 'user' },
        ]}
      />
      <div className="cp-cat-badge">
        <Layers size={13} />
        Réseau TE affiché
      </div>
      <div className="cp-floating-stack">
        <IconButton><Layers size={17} /></IconButton>
        <IconButton><Plus size={17} /></IconButton>
      </div>
      <div className="cp-sheet">
        <div className="cp-sheet-grip" />
        <div className="cp-ouvrage-head" style={{ marginBottom: 10 }}>
          <div className="cp-ouvrage-pin" style={{ background: '#1f6feb' }}>
            <Hand size={18} />
          </div>
          <div>
            <strong>Ajustez votre tracé</strong>
            <span>Déplacez un point pour rester sur le réseau autorisé</span>
          </div>
        </div>
        <div className="cp-warn" style={{ background: '#eaf1fe', borderColor: '#cfe0f6' }}>
          <MapIcon size={16} color="#1f6feb" />
          <p style={{ color: '#1c4d86' }}>
            À chaque modification, l'itinéraire se <b style={{ color: '#1f6feb' }}>recalcule automatiquement</b> en évitant les obstacles.
          </p>
        </div>
        <UiButton className="cp-ui-button-full cp-ui-button-blue">Enregistrer le tracé</UiButton>
      </div>
    </div>
  )
}

function OuvrageScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap center={[43.615717, 1.434792]} zoom={16} markers={[{ pos: [43.615717, 1.434792], tone: 'pont' }]} />
      <div className="cp-sheet">
        <div className="cp-sheet-grip" />
        <div className="cp-ouvrage-head">
          <div className="cp-ouvrage-pin" style={{ background: '#e5484d' }}>
            <Route size={18} />
          </div>
          <div>
            <strong>Pont de la D515<span className="cp-tag">D515</span></strong>
            <span>Voie portée · pigé communauté</span>
          </div>
        </div>
        <div className="cp-spec-grid">
          <div className="cp-spec"><span>Hauteur</span><strong>4,34 m</strong></div>
          <div className="cp-spec"><span>Largeur</span><strong>3,50 m</strong></div>
          <div className="cp-spec"><span>Poids limite</span><strong>48 t</strong></div>
          <div className="cp-spec"><span>Charge essieu</span><strong>13 t</strong></div>
        </div>
        <div className="cp-streetview">
          <span className="cp-streetview-tag">▶ STREET VIEW</span>
          <span><Camera size={13} /> Voir l'endroit en vrai</span>
        </div>
        <UiButton className="cp-ui-button-full cp-ui-button-ghost">
          <Plus size={16} />
          Contribuer / corriger
        </UiButton>
        <div className="cp-participatif">Données participatives · vérification terrain obligatoire</div>
      </div>
    </div>
  )
}

function NavigationScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <div className="cp-drive-scene">
        <div className="cp-drive-horizon">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="cp-road">
          <div className="cp-guidance-lane">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="cp-turn-panel">
        <div className="cp-turn-icon">
          <ArrowRight size={24} />
        </div>
        <div className="cp-turn-text">
          <span>Dans 300 m</span>
          <strong>Tournez à droite · N88</strong>
        </div>
      </div>
      <div className="cp-nav-alert">
        <ShieldCheck size={15} />
        Guidage sur le tracé validé, sans recalcul libre
      </div>
      <div className="cp-nav-bottom">
        <div className="cp-metric"><span>Arrivée</span><strong>18:56</strong></div>
        <div className="cp-metric"><span>Distance</span><strong>12,7</strong><small>km</small></div>
        <div className="cp-metric"><span>Prochain</span><strong>Pont</strong><small>4,50 m</small></div>
      </div>
    </div>
  )
}

function LaunchGpsScreen() {
  return (
    <div className="cp-phone-content cp-map-screen">
      <LeafletMap
        center={CENTER}
        zoom={13}
        route={ROUTE}
        network={NETWORK}
        markers={[{ pos: ROUTE_START, tone: 'start' }, { pos: ROUTE_END, tone: 'end' }]}
      />
      <div className="cp-launch-backdrop" />
      <div className="cp-launch-modal">
        <div className="cp-launch-icon">
          <ShieldCheck size={26} />
        </div>
        <h3>Itinéraire vérifié</h3>
        <p>Votre trajet est prêt. Lancez la navigation guidée le long du tracé validé.</p>
        <UiButton className="cp-ui-button-full">
          <Navigation size={17} />
          Lancer le GPS
        </UiButton>
        <UiButton className="cp-ui-button-full" tone="ghost">Revoir le tracé</UiButton>
      </div>
    </div>
  )
}

function ContributionScreen() {
  return (
    <div className="cp-phone-content cp-form-screen">
      <TopNavigation title="Contribuer" />
      <ScreenTitle title="D'où vient l'info ?" subtitle="Indiquez la source pour que les autres sachent à quel point elle est fiable." />
      <div className="cp-source-list">
        <SourceRow tone="warn" icon={<TriangleAlert size={18} />} title="Panneau B12 officiel" meta="Limitation sur place" />
        <SourceRow tone="measure" icon={<Ruler size={18} />} title="Mesure terrain" meta="Laser, pige..." />
        <SourceRow tone="doc" icon={<FileText size={18} />} title="Document" meta="Plan, arrêté, permis" />
        <SourceRow tone="map" icon={<MapIcon size={18} />} title="Carte de référence" meta="Atlas, IGN, réseau TE" />
        <SourceRow tone="xp" icon={<Star size={18} />} title="Retour d'expérience" meta="Passage connu" />
      </div>
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="cp-phone-content cp-paywall-screen">
      <div className="cp-paywall-card">
        <div className="cp-premium-icon">
          <Sparkles size={25} />
        </div>
        <ScreenTitle
          centered
          eyebrow="ConvoiPilote Plus"
          title="Roulez sans limite"
          subtitle="Après l'essai gratuit, l'abonnement débloque toutes les fonctions."
        />
        <div className="cp-benefits">
          <Benefit text="Itinéraires et navigation illimités" />
          <Benefit text="Réseaux TE et prescriptions détaillés" />
          <Benefit text="Marqueurs communauté et Street View" />
          <Benefit text="Sauvegarde et synchro des trajets" />
        </div>
        <div className="cp-price-line">
          <strong>12,99 €</strong>
          <span>/ mois</span>
        </div>
        <UiButton className="cp-ui-button-full">Commencer 7 jours gratuits</UiButton>
        <UiButton className="cp-ui-button-full" tone="ghost">Restaurer mes achats</UiButton>
      </div>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="cp-phone-content cp-list-screen">
      <TopNavigation title="Profil" />
      <ScreenTitle title="Compte" subtitle="Convois, abonnement et préférences." />
      <div className="cp-list-panel">
        <ListRow icon={<CircleUserRound size={16} />} title="Mon compte" meta="noe@email.fr" />
        <ListRow icon={<Truck size={16} />} title="Mes convois" meta="2 profils enregistrés" />
        <ListRow icon={<CreditCard size={16} />} title="Abonnement" meta="Essai gratuit" />
        <ListRow icon={<Bell size={16} />} title="Notifications" meta="Alertes et rappels" />
        <ListRow icon={<Lock size={16} />} title="À propos" meta="CGU, confidentialité, données" />
      </div>
    </div>
  )
}

function AdminDashboardScreen() {
  return (
    <div className="cp-phone-content cp-admin-screen">
      <TopNavigation title="Administration" />
      <ScreenTitle title="Modération" subtitle="Contributions et qualité des données." />
      <div className="cp-admin-grid">
        <div className="cp-admin-stat"><span>Ouvrages</span><strong>140k</strong></div>
        <div className="cp-admin-stat"><span>À valider</span><strong>38</strong></div>
        <div className="cp-admin-stat"><span>Convoyeurs</span><strong>612</strong></div>
        <div className="cp-admin-stat"><span>Cette semaine</span><strong>94</strong></div>
      </div>
      <div className="cp-admin-list">
        <div className="cp-section-label">Contributions récentes</div>
        <div className="cp-admin-report">
          <div>
            <strong>Pont D515 · hauteur 4,34 m</strong>
            <span>Source : panneau officiel</span>
          </div>
          <div className="cp-admin-actions">
            <button><Check size={14} /></button>
            <button className="cp-danger-action"><TriangleAlert size={13} /></button>
          </div>
        </div>
        <div className="cp-admin-report">
          <div>
            <strong>Tunnel A75 · largeur 3,80 m</strong>
            <span>Source : mesure terrain</span>
          </div>
          <div className="cp-admin-actions">
            <button><Check size={14} /></button>
            <button className="cp-danger-action"><TriangleAlert size={13} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Onboarding', subtitle: 'Promesse produit', onMap: false, screen: <OnboardingScreen /> },
  { id: 'convoi', title: 'Profil du convoi', subtitle: 'Gabarit et catégorie', onMap: false, screen: <ConvoiProfileScreen /> },
  { id: 'home', title: 'Accueil carte', subtitle: 'Vraie carte, ouvrages colorés', onMap: true, screen: <HomeMapScreen /> },
  { id: 'search', title: 'Préparation', subtitle: 'Départ, arrivée, étapes', onMap: true, screen: <SearchScreen /> },
  { id: 'proposed', title: 'Itinéraire proposé', subtitle: 'Tracé sur la carte, à valider', onMap: true, screen: <ProposedRouteScreen /> },
  { id: 'edit', title: 'Édition du tracé', subtitle: 'Ajuster au doigt', onMap: true, screen: <EditRouteScreen /> },
  { id: 'ouvrage', title: 'Fiche ouvrage', subtitle: 'Clic sur un point', onMap: true, screen: <OuvrageScreen /> },
  { id: 'launch', title: 'Lancer le GPS', subtitle: 'Confirmation avant départ', onMap: true, screen: <LaunchGpsScreen /> },
  { id: 'navigation', title: 'Navigation GPS', subtitle: 'Vue inclinée, guidage sur le tracé', onMap: true, screen: <NavigationScreen /> },
  { id: 'contribution', title: 'Contribution', subtitle: 'Source de la donnée', onMap: false, screen: <ContributionScreen /> },
  { id: 'paywall', title: 'Abonnement', subtitle: 'Freemium', onMap: false, screen: <PaywallScreen /> },
  { id: 'settings', title: 'Paramètres', subtitle: 'Compte et convois', onMap: false, screen: <SettingsScreen /> },
  { id: 'admin', title: 'Administration', subtitle: 'Modération interne', onMap: false, screen: <AdminDashboardScreen /> },
]

export default function ConvoiPiloteMockups() {
  return (
    <main className="convoipilote-mockups-page">
      <section className="cp-landing-hero">
        <p className="cp-eyebrow">Proposition d'accompagnement</p>
        <h1>Maquettes visuelles</h1>
        <p className="cp-reference">ConvoiPilote · nom provisoire</p>
        <p className="cp-disclaimer">
          Aperçu rapide pour visualiser l'idée, toutes les pages ne sont pas illustrées
          et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.
          Fonds de carte © OpenStreetMap, © CARTO.
        </p>
      </section>

      <section className="cp-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="cp-mockup-card">
            <div className="cp-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
            </div>
            <div id={`cp-export-${mockup.id}`} className="cp-export-wrap">
              <PhoneFrame onMap={mockup.onMap}>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
