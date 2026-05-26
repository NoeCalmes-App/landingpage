import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Download,
  Flag,
  Home,
  LocateFixed,
  Lock,
  MapPin,
  Navigation,
  Route,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  UserRound,
  X,
} from 'lucide-react'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'
import './smoothride-mockups.css'

function StatusBar() {
  return (
    <div className="sr-statusbar">
      <span>9:41</span>
      <div className="sr-status-icons">
        <span className="sr-signal" />
        <span className="sr-wifi" />
        <span className="sr-battery" />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="sr-phone-export">
      <div className="sr-phone">
        <div className="sr-screen">
          <StatusBar />
          {children}
          <div className="sr-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`sr-app-mark${large ? ' sr-app-mark-large' : ''}`}>
      <Route size={large ? 26 : 18} />
    </div>
  )
}

function UiButton({
  children,
  tone = 'primary',
  className = '',
}) {
  return <button className={`sr-ui-button sr-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`sr-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({
  eyebrow,
  title,
  subtitle,
  centered = false,
}) {
  return (
    <div className={`sr-screen-title${centered ? ' sr-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopNavigation({ title }) {
  return (
    <div className="sr-top-navigation">
      <IconButton>
        <UserRound size={17} />
      </IconButton>
      {title && <strong>{title}</strong>}
      <IconButton>
        <SlidersHorizontal size={17} />
      </IconButton>
    </div>
  )
}

function MapboxSurface({
  children,
  routeMode = 'none',
  soft = false,
}) {
  return (
    <div className={`sr-mapbox-surface${soft ? ' sr-mapbox-soft' : ''}`}>
      <svg className="sr-map-svg" viewBox="0 0 300 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sr-block" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#202522" />
            <stop offset="100%" stopColor="#101312" />
          </linearGradient>
          <linearGradient id="sr-safe-route" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.2" />
            <stop offset="52%" stopColor="#CCFF00" />
            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.64" />
          </linearGradient>
          <linearGradient id="sr-fast-route" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#6C8CFF" stopOpacity="0.18" />
            <stop offset="54%" stopColor="#6C8CFF" />
            <stop offset="100%" stopColor="#6C8CFF" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        <rect width="300" height="620" fill="#0d100f" />

        <g className="sr-map-blocks">
          <path d="M-26 42 L84 8 L120 94 L6 132 Z" />
          <path d="M135 16 L274 -26 L330 82 L182 126 Z" />
          <path d="M26 178 L128 134 L176 238 L58 282 Z" />
          <path d="M184 152 L318 104 L362 246 L226 294 Z" />
          <path d="M-34 326 L102 284 L146 414 L-4 458 Z" />
          <path d="M152 338 L286 300 L336 438 L188 490 Z" />
          <path d="M18 504 L150 462 L204 604 L58 652 Z" />
        </g>

        <g className="sr-map-minor-roads">
          <path d="M-28 132 C46 164 88 202 146 270 C198 334 244 382 332 414" />
          <path d="M-18 384 C72 344 142 326 310 300" />
          <path d="M42 -18 C68 116 88 214 98 344 C106 444 126 520 166 650" />
          <path d="M236 -18 C198 88 188 188 206 294 C222 388 246 478 318 636" />
          <path d="M-24 522 C68 488 154 452 322 438" />
          <path d="M-12 242 C68 220 158 204 326 184" />
        </g>

        <g className="sr-map-main-roads">
          <path d="M-32 454 C48 416 90 392 128 348 C176 292 214 240 336 214" />
          <path d="M-30 92 C58 144 132 194 190 266 C238 326 274 376 342 408" />
          <path d="M126 -22 C142 96 146 202 134 318 C122 426 132 520 186 648" />
        </g>

        <g className="sr-map-labels">
          <text x="46" y="155" transform="rotate(26 46 155)">Avenue Victor Hugo</text>
          <text x="167" y="274" transform="rotate(-16 167 274)">Rue Centrale</text>
          <text x="108" y="438" transform="rotate(-13 108 438)">Boulevard Ouest</text>
        </g>

        {routeMode === 'home' && (
          <g className="sr-map-routes">
            <path className="sr-map-route-safe" d="M72 484 C98 418 134 396 132 330 C130 268 168 232 224 208" />
          </g>
        )}

        {routeMode === 'compare' && (
          <g className="sr-map-routes">
            <path className="sr-map-route-fast" d="M52 468 C84 408 118 366 168 326 C214 288 238 254 256 200" />
            <path className="sr-map-route-safe" d="M52 468 C60 398 112 388 126 330 C144 256 202 246 256 200" />
          </g>
        )}
      </svg>
      <div className="sr-map-vignette" />
      {children}
    </div>
  )
}

function MapMarker({
  className = '',
  tone = 'lime',
  children,
}) {
  return <div className={`sr-map-marker sr-map-marker-${tone} ${className}`}>{children}</div>
}

function ListRow({ icon, title, meta }) {
  return (
    <div className="sr-list-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <ChevronRight size={15} />
    </div>
  )
}

function Metric({ label, value, suffix }) {
  return (
    <div className="sr-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {suffix && <small>{suffix}</small>}
    </div>
  )
}

function Benefit({ text }) {
  return (
    <div className="sr-benefit">
      <Check size={15} />
      <span>{text}</span>
    </div>
  )
}

function AdminStat({ label, value }) {
  return (
    <div className="sr-admin-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function AdminReport({ street, status }) {
  return (
    <div className="sr-admin-report">
      <div>
        <strong>{street}</strong>
        <span>{status}</span>
      </div>
      <div className="sr-admin-actions">
        <button>
          <Check size={14} />
        </button>
        <button className="sr-danger-action">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

function OnboardingScreen() {
  return (
    <div className="sr-phone-content sr-intro-screen">
      <MapboxSurface soft routeMode="home" />
      <div className="sr-intro-center">
        <AppMark large />
        <ScreenTitle
          centered
          eyebrow="Navigation confort"
          title="Évitez les ralentisseurs. Gardez le plaisir de conduire."
          subtitle="SmoothRide trouve un trajet rapide et un trajet qui évite les ralentisseurs connus."
        />
      </div>
      <div className="sr-intro-bottom">
        <UiButton>
          Commencer
          <ArrowRight size={17} />
        </UiButton>
        <div className="sr-step-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function HomeMapScreen() {
  return (
    <div className="sr-phone-content sr-map-screen">
      <MapboxSurface routeMode="home">
        <div className="sr-map-topbar">
          <button className="sr-avatar">N</button>
          <div className="sr-search-pill">
            <Search size={16} />
            <span>Où allez-vous ?</span>
          </div>
          <IconButton>
            <SlidersHorizontal size={17} />
          </IconButton>
        </div>

        <MapMarker className="sr-marker-user" tone="lime">
          <Navigation size={15} />
        </MapMarker>
        <MapMarker className="sr-marker-bump-one" tone="red">
          <TriangleAlert size={14} />
        </MapMarker>
        <MapMarker className="sr-marker-bump-two" tone="gray">
          <TriangleAlert size={14} />
        </MapMarker>
        <MapMarker className="sr-marker-bump-three" tone="red">
          <TriangleAlert size={14} />
        </MapMarker>

        <IconButton className="sr-floating-locate">
          <LocateFixed size={18} />
        </IconButton>

        <div className="sr-bottom-card sr-home-card">
          <div>
            <span>Position actuelle</span>
            <strong>Trajet prêt</strong>
          </div>
          <UiButton className="sr-home-button">
            Démarrer
          </UiButton>
        </div>
      </MapboxSurface>
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="sr-phone-content sr-search-screen">
      <MapboxSurface soft />
      <TopNavigation title="Nouveau trajet" />
      <div className="sr-search-sheet">
        <div className="sr-trip-field">
          <span className="sr-trip-dot sr-trip-dot-start" />
          <div>
            <small>Départ</small>
            <strong>Position actuelle</strong>
          </div>
        </div>
        <div className="sr-trip-field">
          <span className="sr-trip-dot sr-trip-dot-end" />
          <div>
            <small>Arrivée</small>
            <strong>Rechercher une adresse</strong>
          </div>
        </div>

        <div className="sr-section-label">Favoris</div>
        <ListRow icon={<Home size={16} />} title="Domicile" meta="12 rue des Pins" />
        <ListRow icon={<MapPin size={16} />} title="Travail" meta="24 avenue Victor Hugo" />

        <div className="sr-section-label">Récents</div>
        <ListRow icon={<Clock3 size={16} />} title="Circuit Paul Ricard" meta="Le Castellet" />
        <ListRow icon={<Clock3 size={16} />} title="Garage Premium Auto" meta="Lyon" />
      </div>
    </div>
  )
}

function RouteComparisonScreen() {
  return (
    <div className="sr-phone-content sr-map-screen">
      <MapboxSurface routeMode="compare">
        <div className="sr-route-chip sr-route-chip-fast">Rapide</div>
        <div className="sr-route-chip sr-route-chip-safe">Confort</div>
        <MapMarker className="sr-marker-start" tone="lime">
          <Navigation size={14} />
        </MapMarker>
        <MapMarker className="sr-marker-end" tone="blue">
          <Flag size={14} />
        </MapMarker>

        <div className="sr-bottom-card sr-route-sheet">
          <ScreenTitle title="Choisir un trajet" subtitle="Comparez le temps ajouté et les ralentisseurs évités." />
          <div className="sr-route-options">
            <button className="sr-route-option">
              <span>Rapide</span>
              <strong>24 min</strong>
              <small>6 ralentisseurs</small>
            </button>
            <button className="sr-route-option sr-route-option-active">
              <span>Confort</span>
              <strong>36 min</strong>
              <small>6 évités</small>
            </button>
          </div>
          <UiButton>
            Choisir confort
          </UiButton>
        </div>
      </MapboxSurface>
    </div>
  )
}

function DriveScene() {
  return (
    <div className="sr-drive-scene">
      <div className="sr-drive-map">
        <span className="sr-drive-road-line sr-drive-road-line-a" />
        <span className="sr-drive-road-line sr-drive-road-line-b" />
        <span className="sr-drive-road-line sr-drive-road-line-c" />
      </div>
      <div className="sr-horizon">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="sr-road-perspective">
        <div className="sr-guidance-lane">
          <i />
          <i />
          <i />
        </div>
        <div className="sr-road-edge sr-road-edge-left" />
        <div className="sr-road-edge sr-road-edge-right" />
      </div>
    </div>
  )
}

function NavigationScreen() {
  return (
    <div className="sr-phone-content sr-navigation-screen">
      <DriveScene />
      <div className="sr-turn-panel">
        <div className="sr-turn-icon">
          <ArrowRight size={25} />
        </div>
        <div>
          <span>Dans 200 m</span>
          <strong>Tournez à droite</strong>
        </div>
      </div>
      <button className="sr-report-button">
        <TriangleAlert size={19} />
        Signaler
      </button>
      <div className="sr-nav-bottom">
        <Metric label="Arrivée" value="18:42" />
        <Metric label="Distance" value="12.4" suffix="km" />
        <Metric label="Vitesse" value="48" suffix="km/h" />
      </div>
    </div>
  )
}

function ReportScreen() {
  return (
    <div className="sr-phone-content sr-map-screen">
      <MapboxSurface soft routeMode="home">
        <MapMarker className="sr-marker-report" tone="red">
          <TriangleAlert size={22} />
        </MapMarker>
        <div className="sr-bottom-card sr-report-sheet">
          <div className="sr-confirm-icon">
            <Check size={24} />
          </div>
          <ScreenTitle
            centered
            title="Signalement envoyé"
            subtitle="Le ralentisseur sera validé après confirmations de la communauté."
          />
          <div className="sr-status-pill">En attente</div>
          <UiButton>OK</UiButton>
        </div>
      </MapboxSurface>
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="sr-phone-content sr-paywall-screen">
      <MapboxSurface soft />
      <div className="sr-paywall-card">
        <div className="sr-premium-icon">
          <Sparkles size={25} />
        </div>
        <ScreenTitle
          centered
          eyebrow="Premium"
          title="Trajets confort illimités"
          subtitle="Après les trajets gratuits, l'abonnement débloque la navigation sans limite."
        />
        <div className="sr-benefits">
          <Benefit text="Trajets illimités" />
          <Benefit text="Signalements illimités" />
          <Benefit text="Base enrichie par la communauté" />
        </div>
        <div className="sr-price-line">
          <strong>15 €</strong>
          <span>/ mois environ</span>
        </div>
        <UiButton>Essayer 7 jours</UiButton>
        <UiButton tone="ghost">Restaurer mes achats</UiButton>
      </div>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="sr-phone-content sr-list-screen">
      <TopNavigation title="Paramètres" />
      <ScreenTitle title="Compte" subtitle="Profil, abonnement et préférences de conduite." />
      <div className="sr-list-panel">
        <ListRow icon={<CircleUserRound size={16} />} title="Mon compte" meta="alex@email.fr" />
        <ListRow icon={<CreditCard size={16} />} title="Abonnement" meta="Gratuit" />
        <ListRow icon={<Settings size={16} />} title="Préférences" meta="Km, langue, thème" />
        <ListRow icon={<MapPin size={16} />} title="Adresses favorites" meta="Domicile, travail" />
        <ListRow icon={<Bell size={16} />} title="Notifications" meta="Alertes et rappels" />
        <ListRow icon={<Lock size={16} />} title="À propos" meta="CGU, confidentialité, OSM" />
      </div>
    </div>
  )
}

function AdminDashboardScreen() {
  return (
    <div className="sr-phone-content sr-admin-screen">
      <TopNavigation title="Administration" />
      <ScreenTitle title="Gestion" subtitle="Suivi des signalements et de l'activité." />
      <div className="sr-admin-grid">
        <AdminStat label="Validés" value="121k" />
        <AdminStat label="En attente" value="42" />
        <AdminStat label="Utilisateurs" value="834" />
        <AdminStat label="Semaine" value="128" />
      </div>
      <div className="sr-admin-list">
        <div className="sr-section-label">Signalements récents</div>
        <AdminReport street="Rue Victor Hugo" status="3 confirmations" />
        <AdminReport street="Avenue des Alpes" status="Nouveau point" />
        <AdminReport street="Route du Port" status="À vérifier" />
      </div>
    </div>
  )
}

function EmptyRouteScreen() {
  return (
    <div className="sr-phone-content sr-map-screen">
      <MapboxSurface soft routeMode="home">
        <div className="sr-empty-card">
          <div className="sr-confirm-icon">
            <ShieldCheck size={26} />
          </div>
          <ScreenTitle
            centered
            title="Aucun ralentisseur connu"
            subtitle="Le trajet rapide ne contient aucun ralentisseur détecté dans les données disponibles."
          />
          <UiButton>
            Démarrer
            <ArrowRight size={17} />
          </UiButton>
        </div>
      </MapboxSurface>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Onboarding', subtitle: 'Promesse produit', screen: <OnboardingScreen /> },
  { id: 'home-map', title: 'Accueil carte', subtitle: 'Recherche + GPS', screen: <HomeMapScreen /> },
  { id: 'search', title: 'Recherche', subtitle: 'Départ, arrivée, favoris', screen: <SearchScreen /> },
  { id: 'routes', title: 'Comparaison', subtitle: 'Rapide vs confort', screen: <RouteComparisonScreen /> },
  { id: 'navigation', title: 'Navigation', subtitle: 'Guidage conduite', screen: <NavigationScreen /> },
  { id: 'report', title: 'Signalement', subtitle: 'Confirmation', screen: <ReportScreen /> },
  { id: 'paywall', title: 'Abonnement', subtitle: 'Freemium', screen: <PaywallScreen /> },
  { id: 'settings', title: 'Paramètres', subtitle: 'Compte utilisateur', screen: <SettingsScreen /> },
  { id: 'admin', title: 'Administration', subtitle: 'Gestion interne', screen: <AdminDashboardScreen /> },
  { id: 'empty', title: 'État sans danger', subtitle: 'Aucun ralentisseur', screen: <EmptyRouteScreen /> },
]

function getAppName(slug) {
  if (!slug || slug.toLowerCase() === 'smoothride' || slug.toLowerCase() === 'smooth-ride') {
    return 'SmoothRide'
  }

  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function SmoothRideMockupsPage() {
  const appSlug = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'smoothride'
  const appName = getAppName(appSlug)

  async function downloadMockup(id, title) {
    const el = document.getElementById(`sr-export-${id}`)
    if (!el) return
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = `smoothride-${id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success(`${title} téléchargé`)
    } catch {
      toast.error('Téléchargement impossible')
    }
  }

  return (
    <main className="smoothride-mockups-page">
      <section className="sr-landing-hero">
        <div>
          <p className="sr-eyebrow">Proposition d'accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="sr-reference">SmoothRide · MOB-2026-088</p>
          <p className="sr-disclaimer">
            Maquette rapide pour illustrer une piste d'interface — aucune charte graphique ni design
            définitif appliqué. Non contractuelle.
          </p>
        </div>
      </section>

      <section className="sr-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="sr-mockup-card">
            <div className="sr-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
              <button onClick={() => downloadMockup(mockup.id, mockup.title)}>
                <Download size={14} />
                PNG
              </button>
            </div>
            <div id={`sr-export-${mockup.id}`} className="sr-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
