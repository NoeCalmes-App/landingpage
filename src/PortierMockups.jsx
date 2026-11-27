import {
  Banknote,
  Bell,
  Building2,
  Car,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ConciergeBell,
  CreditCard,
  Download,
  Ellipsis,
  FileText,
  Grape,
  House,
  IdCard,
  Landmark,
  LayoutDashboard,
  ListFilter,
  LoaderCircle,
  Luggage,
  MessageSquareWarning,
  Minus,
  Navigation,
  Percent,
  Phone,
  Plane,
  Plus,
  ReceiptText,
  Route,
  ScanFace,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrainFront,
  TriangleAlert,
  UserRound,
  Users,
  Wallet,
  Wine,
  X,
} from 'lucide-react'
import './portier-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// PORTIER, MAQUETTE VITRINE (27 novembre 2026)
// L'idée de GuestRide (MOB-2026-144) retravaillée pour le site de
// Noé : des hôtels commandent un chauffeur privé, le client paie en
// ligne, le chauffeur est payé chaque vendredi. Marque inventée,
// AUCUN devis derrière : la maquette du client reste
// /maquette/guestride, et rien ici ne doit y être recopié (le
// paiement en ligne et l'application web ne sont pas dans son devis).
// Application mobile (chauffeur) + page web du client + application
// web (réception, administration).
// Direction : fond clair, bloc bleu nuit, bleu électrique, vraies
// cartes de Bordeaux (voir l'en-tête de portier-mockups.css).
// Architecture : BailoraMockups.jsx et PulsoMockups.jsx ; page et
// téléphone d'Aretha. Guides : nowork/documentation/guides/
// creation-maquette.md et .claude/skills/maquette/SKILL.md.
// ============================================================

// Photos : identifiants fixes, jamais d'URL aléatoire. Sans réseau,
// le fond dégradé ou l'initiale restent visibles sous l'image.
const FACE = {
  lucas: 'https://i.pravatar.cc/160?img=12',
  hugo: 'https://i.pravatar.cc/160?img=53',
  julien: 'https://i.pravatar.cc/160?img=13',
  antoine: 'https://i.pravatar.cc/160?img=11',
  maxime: 'https://i.pravatar.cc/160?img=56',
  thomas: 'https://i.pravatar.cc/160?img=8',
  lea: 'https://i.pravatar.cc/160?img=32',
  nicolas: 'https://i.pravatar.cc/160?img=53',
}
const PHOTO = {
  driver: 'https://images.unsplash.com/photo-1628280351994-5641d1f3232a?w=900&q=80',
  hotel: 'https://images.unsplash.com/photo-1737807478452-260777e0505d?w=300&q=80',
  lobby: 'https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?w=300&q=80',
  facade: 'https://images.unsplash.com/photo-1628280351994-5641d1f3232a?w=300&q=80',
}

// Mêmes personnes, mêmes prix, mêmes heures sur tous les écrans.
// Vendredi 27 novembre 2026, 9:41. Prix ferme fixé par la plateforme,
// commission de 15 %. Claire va à la gare : 26,00 €, dont 22,10 € pour Lucas.
const HOTEL = { name: 'Hôtel des Quais', address: '4 quai Richelieu' }
const DRIVER = {
  lucas: { name: 'Lucas Morel', short: 'Lucas M.', car: 'Mercedes Classe E noire', plate: 'GT-428-BX', face: FACE.lucas },
  hugo: { name: 'Hugo Bernard', short: 'Hugo B.', car: 'Mercedes Classe V noire', plate: 'FR-772-QM', face: FACE.hugo },
  julien: { name: 'Julien Roux', short: 'Julien R.', car: 'BMW Série 5 noire', plate: 'HK-115-RT', face: FACE.julien },
  antoine: { name: 'Antoine Lefèvre', short: 'Antoine L.', car: 'Mercedes Classe S noire', plate: 'EZ-903-LA', face: FACE.antoine },
}

// Prototype cliquable : les vrais boutons mènent à l'écran suivant.
function goTo(id) {
  const el = document.getElementById(`pt-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function onGo(id) {
  return id ? { role: 'button', tabIndex: 0, onClick: () => goTo(id) } : {}
}

// ============================================================
// LA CARTE : de vraies cartes de Bordeaux, composées une fois par
// scratchpad/cartes.py (fond Esri), une image par cadrage. Tout ce
// qui est posé dessus l'est en coordonnées GPS [lat, lon].
// ============================================================
const MAPS = {
  home: { src: '/assets/portier/carte-home.webp', n: 44.847221, s: 44.837179, w: -0.577023, e: -0.563977 },
  offer: { src: '/assets/portier/carte-offer.webp', n: 44.843547, s: 44.822852, w: -0.579346, e: -0.553254 },
  ride: { src: '/assets/portier/carte-ride.webp', n: 44.839369, s: 44.818429, w: -0.574046, e: -0.547954 },
  guest: { src: '/assets/portier/carte-guest.webp', n: 44.841761, s: 44.837439, w: -0.577036, e: -0.565364 },
  console: { src: '/assets/portier/carte-console.webp', n: 44.849241, s: 44.829157, w: -0.593516, e: -0.548884 },
}

// Les lieux de l'histoire (relevés sur la carte, pas inventés).
const AT = {
  hotel: [44.83834, -0.5681],              // quai Richelieu, face à la Garonne
  gare: [44.8262, -0.558],                 // gare Saint-Jean
  lucas: [44.8417, -0.5701],               // place de la Bourse, disponible
  lucasOffer: [44.8404, -0.5718],          // à 650 m de l'hôtel quand la course arrive
  hugo: [44.8412, -0.576],                // arrive par le cours de l'Intendance
  julien: [44.8377, -0.5639],              // sur le pont de pierre, vers la Bastide
  carRide: [44.8317, -0.5645],             // sur les quais, à mi-chemin de la gare
  carGuest: [44.8405, -0.5696],            // à deux rues de l'hôtel
  grandHotel: [44.8426, -0.5743],          // place de la Comédie
  hotelBourse: [44.8398, -0.5684],
  hotelJardin: [44.8437, -0.5672],
}
// Le chemin des quais, de l'hôtel à la gare : relevé sur la carte.
const QUAIS = [AT.hotel, [44.837, -0.56755], [44.83594, -0.56647], [44.83411, -0.56454], [44.83168, -0.56218], [44.82985, -0.56025], [44.82833, -0.55875], AT.gare]
const ROUTES = {
  pickup: [AT.lucasOffer, [44.8402, -0.5700], [44.8395, -0.5688], AT.hotel],
  trip: QUAIS,
  tripDone: [AT.hotel, QUAIS[1], QUAIS[2], QUAIS[3], AT.carRide],
  tripAhead: [AT.carRide, QUAIS[4], QUAIS[5], QUAIS[6], AT.gare],
  guest: [AT.carGuest, [44.8398, -0.569], [44.839, -0.5684], AT.hotel],
  hugo: [AT.hugo, [44.8418, -0.5735], [44.8413, -0.571], [44.8405, -0.569], AT.hotel],
  julien: [AT.hotel, [44.8378, -0.566], [44.8376, -0.564], [44.8374, -0.56], [44.838, -0.557]],
}

// Courbe lisse (Catmull-Rom) entre les points relevés.
function smooth(points, steps = 8) {
  const out = []
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps
      const t2 = t * t
      const t3 = t2 * t
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])])
    }
  }
  out.push(points[points.length - 1])
  return out
}

function MapView({ name, className = '', routes = [], children, creditBottom = 8 }) {
  const m = MAPS[name]
  const px = ([lat, lon]) => [((lon - m.w) / (m.e - m.w)) * 100, ((m.n - lat) / (m.n - m.s)) * 100]
  const at = (p) => { const [x, y] = px(p); return { left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%` } }
  const d = (pts) => `M${smooth(pts).map((p) => px(p).map((n) => n.toFixed(2)).join(' ')).join('L')}`
  return (
    <div className={`pt-map ${className}`}>
      <img src={m.src} alt="" loading="lazy" decoding="async" draggable="false" />
      <span className="pt-map-tint" aria-hidden="true" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {routes.map((r) => {
          const path = d(r.points)
          return (
            <g key={path.slice(0, 40)}>
              {!r.dashed && <path className="pt-route-glow" d={path} vectorEffect="non-scaling-stroke" />}
              {!r.dashed && <path className="pt-route-casing" d={path} vectorEffect="non-scaling-stroke" />}
              <path className={`pt-route${r.dashed ? ' pt-route-dashed' : ''}${r.tone ? ` pt-route-${r.tone}` : ''}`} d={path} vectorEffect="non-scaling-stroke" />
            </g>
          )
        })}
      </svg>
      <div className="pt-map-layer">{children ? children(at) : null}</div>
      <span className="pt-map-credit" style={{ bottom: creditBottom }}>© Esri · © OpenStreetMap</span>
    </div>
  )
}

// La voiture vue de dessus, comme dans les applications de VTC :
// carrosserie, toit plus clair, pare-brise et lunette, rétroviseurs,
// phares et feux. Trois tons : bleu nuit (les courses de l'hôtel), bleu
// (le chauffeur qu'on suit), gris (les chauffeurs libres).
const CAR_TONES = {
  navy: { body: '#171e2b', roof: '#2b3446', glass: '#aab6cc' },
  blue: { body: '#2f7cf6', roof: '#5b98ff', glass: '#dbe8ff' },
  muted: { body: '#9aa3b4', roof: '#b4bcc9', glass: '#e6eaf1' },
}
function CarTop({ heading = 0, tone = 'navy', size = 22 }) {
  const c = CAR_TONES[tone] || CAR_TONES.navy
  return (
    <svg width={size} height={size * (40 / 24)} viewBox="0 0 24 40" style={{ transform: `rotate(${heading}deg)` }} aria-hidden="true">
      <rect x="0.6" y="11" width="3" height="1.8" rx="0.8" fill={c.body} />
      <rect x="20.4" y="11" width="3" height="1.8" rx="0.8" fill={c.body} />
      <rect x="2" y="1" width="20" height="38" rx="7" fill={c.body} stroke="#fff" strokeWidth="1.5" />
      <rect x="4.2" y="2.2" width="4.2" height="1.8" rx="0.9" fill="#fff3c4" />
      <rect x="15.6" y="2.2" width="4.2" height="1.8" rx="0.9" fill="#fff3c4" />
      <path d="M4.6 13.5c0-1.2.8-2.2 2-2.5l1.2-2.6c.3-.6.9-1 1.5-1h5.4c.6 0 1.2.4 1.5 1l1.2 2.6c1.2.3 2 1.3 2 2.5V15H4.6z" fill={c.glass} />
      <rect x="5.2" y="15" width="13.6" height="13" rx="3" fill={c.roof} />
      <rect x="5.4" y="29" width="13.2" height="4.2" rx="1.6" fill={c.glass} opacity="0.92" />
      <rect x="4.2" y="36" width="4.6" height="1.6" rx="0.8" fill="#ff6b6b" />
      <rect x="15.2" y="36" width="4.6" height="1.6" rx="0.8" fill="#ff6b6b" />
    </svg>
  )
}

// ============================================================
// COMPOSANTS PARTAGÉS
// ============================================================

function StatusBar({ light = false }) {
  return (
    <div className={`pt-statusbar${light ? ' pt-statusbar-light' : ''}`}>
      <span>9:41</span>
      <div className="pt-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

// Téléphone : application, ou page web (barre d'adresse en bas, sans
// cadenas). Même coque, même hauteur totale dans les deux cas.
function PhoneFrame({ children, lightBar = false, url }) {
  return (
    <div className="pt-phone-export">
      <div className="pt-phone">
        <div className="pt-screen">
          <span className="pt-island" aria-hidden="true" />
          <StatusBar light={lightBar} />
          {children}
          {url && (
            <div className="pt-browser-chrome" aria-label="Barre d’adresse du navigateur">
              <div className="pt-browser"><span>aA</span><b>{url}</b><ChevronDown size={12} style={{ opacity: 0 }} /></div>
            </div>
          )}
          <div className="pt-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function DeskFrame({ url, children }) {
  return (
    <div className="pt-desk">
      <div className="pt-desk-bar"><i /><i /><i /><span className="pt-desk-url">{url}</span></div>
      <div className="pt-desk-app">{children}</div>
    </div>
  )
}

// Le logo provisoire : l'onde d'appel, un point et deux anneaux.
function WaveGlyph({ size = 20, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2.7" fill="#2f7cf6" />
      <circle cx="12" cy="12" r="6.4" fill="none" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="10.1" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.45" />
    </svg>
  )
}
function Mark({ large = false }) {
  return <span className={`pt-mark${large ? ' pt-mark-large' : ''}`} aria-label="Portier"><CarFront size={large ? 32 : 20} strokeWidth={2.2} /></span>
}

function AppleMark({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
    </svg>
  )
}

function UiButton({ children, tone = '', goto }) {
  return <button className={`pt-ui-button${tone ? ` pt-ui-button-${tone}` : ''}`} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function IconButton({ children, label, goto, glass = false }) {
  return <button className={`pt-icon-button${glass ? ' pt-icon-button-glass' : ''}`} aria-label={label} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function DeskButton({ children, tone = '', goto, wide = false }) {
  return <button className={`pt-d-btn${tone ? ` pt-d-btn-${tone}` : ''}${wide ? ' pt-d-btn-wide' : ''}`} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function Pill({ tone = 'neutral', children }) {
  return <span className={`pt-pill pt-pill-${tone}`}>{children}</span>
}
function Avatar({ src, name, size = 'md' }) {
  return (
    <span className={`pt-avatar pt-avatar-${size}`}>
      <span className="pt-avatar-initial">{name.charAt(0)}</span>
      {src && <img src={src} alt="" loading="lazy" />}
    </span>
  )
}
function Photo({ src, className = '', children }) {
  return (
    <div className={`pt-photo ${className}`}>
      <img src={src} alt="" loading="lazy" />
      {children}
    </div>
  )
}
function Plate({ children }) {
  return <span className="pt-plate" aria-label={`Plaque ${children}`}><i>F</i><span>{children}</span></span>
}
function TopBar({ title, back, right }) {
  return (
    <div className="pt-topbar">
      {back ? <IconButton label="Retour" goto={back}><ChevronLeft size={18} /></IconButton> : <span />}
      <span className="pt-topbar-title">{title}</span>
      {right || <span />}
    </div>
  )
}
function TabBar({ active }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: House, goto: 'home' },
    { id: 'rides', label: 'Courses', icon: Route },
    { id: 'gains', label: 'Gains', icon: Wallet, goto: 'paid' },
    { id: 'account', label: 'Compte', icon: UserRound, goto: 'dossier' },
  ]
  return (
    <nav className="pt-tabbar" aria-label="Navigation principale">
      {tabs.map((t) => {
        const Icon = t.icon
        return <span key={t.id} className={`pt-tab${active === t.id ? ' pt-tab-on' : ''}`} {...onGo(t.goto)}><Icon size={20} /><small>{t.label}</small></span>
      })}
    </nav>
  )
}
function Note({ tone = '', icon, title, text }) {
  const Icon = icon
  return (
    <div className={`pt-note${tone ? ` pt-note-${tone}` : ''}`}>
      {Icon && <Icon size={17} />}
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
    </div>
  )
}
// L'onde d'appel : trois anneaux, de la taille voulue, centrés sur un point.
function Waves({ style, size = 180, live = false }) {
  return <span className={`pt-waves${live ? ' pt-waves-live' : ''}`} style={{ ...style, '--size': `${size}px` }} aria-hidden="true"><i /><i /><i /></span>
}
function Countdown({ left = 18, total = 30 }) {
  const c = 2 * Math.PI * 21
  return (
    <div className="pt-countdown" aria-label={`${left} secondes pour accepter`}>
      <svg viewBox="0 0 50 50"><circle className="pt-cd-track" cx="25" cy="25" r="21" /><circle className="pt-cd-left" cx="25" cy="25" r="21" strokeDasharray={`${(c * left) / total} ${c}`} /></svg>
      <strong>{left}<small> s</small></strong>
    </div>
  )
}
function HotelPin({ style, small = false }) {
  return <span className={`pt-pin pt-pin-hotel${small ? ' pt-pin-hotel-sm' : ''}`} style={style}><ConciergeBell size={small ? 11 : 15} strokeWidth={2.2} /></span>
}
function PhotoPin({ style, src }) {
  return <span className="pt-pin pt-pin-photo" style={style}><img src={src} alt="" loading="lazy" /></span>
}
function DestPin({ style, icon: Icon = TrainFront }) {
  return <span className="pt-pin pt-pin-dest" style={style}><Icon size={15} strokeWidth={2.2} /></span>
}
function MyCar({ style, heading = 160, size = 24 }) {
  return <span className="pt-car pt-car-me" style={style}><CarTop heading={heading} tone="blue" size={size} /></span>
}

// ============================================================
// APPLICATION DU CHAUFFEUR
// ============================================================

function OnboardingScreen() {
  return (
    <div className="pt-content pt-bleed">
      <Photo src={PHOTO.driver} className="pt-onb-photo"><div className="pt-onb-veil" /></Photo>
      <span className="pt-onb-sticker"><Banknote size={14} /> Payé chaque vendredi</span>
      <div className="pt-onb-body">
        <Mark large />
        <p className="pt-kicker">Chauffeurs privés · Bordeaux</p>
        <h1 className="pt-display">Les hôtels de Bordeaux <em>vous appellent.</em></h1>
        <p className="pt-lead">36 hôtels commandent leurs voitures ici. Chaque course est déjà payée, et votre gain s’affiche avant d’accepter.</p>
        <div className="pt-dots" aria-hidden="true"><i className="on" /><i /><i /></div>
        <div className="pt-bottom-actions">
          <UiButton goto="dossier">Devenir chauffeur Portier</UiButton>
          <button className="pt-text-link">J’ai déjà un compte</button>
        </div>
      </div>
    </div>
  )
}

function DossierScreen() {
  const c = 2 * Math.PI * 27
  const checks = [
    { icon: ScanFace, tile: '', title: 'Identité et selfie', meta: 'Vérifiée à 9:31', done: true },
    { icon: Building2, tile: 'violet', title: 'Entreprise', meta: 'SIRET 912 404 518 00027 · active', done: true },
    { icon: IdCard, tile: 'green', title: 'Carte professionnelle VTC', meta: 'Valide jusqu’en mars 2031', done: true },
    { icon: Car, tile: 'rose', title: 'Carte grise', meta: 'GT-428-BX · Mercedes Classe E', done: true },
    { icon: ShieldCheck, tile: 'amber', title: 'Attestation d’assurance', meta: 'Lecture du document…', done: false },
    { icon: Landmark, tile: 'green', title: 'Compte pour vos virements', meta: 'FR76 •••• •••• 4821 · chaque vendredi', done: true },
  ]
  return (
    <div className="pt-content">
      <TopBar title="Mon dossier" back="onboarding" />
      <div className="pt-dossier-hero">
        <div className="pt-progress-ring">
          <svg viewBox="0 0 62 62"><circle cx="31" cy="31" r="27" stroke="var(--line-strong)" /><circle cx="31" cy="31" r="27" stroke="var(--action)" strokeLinecap="round" strokeDasharray={`${c * 0.8} ${c}`} /></svg>
          <strong className="pt-num">4<small>/5</small></strong>
        </div>
        <div>
          <h2 className="pt-title">Presque prêt, Lucas</h2>
          <p className="pt-lead" style={{ marginTop: 5 }}>Vérification automatique, à toute heure. Comptez moins de 2 minutes.</p>
        </div>
      </div>
      <div className="pt-card pt-list">
        {checks.map((r) => {
          const Icon = r.icon
          return (
            <div key={r.title} className="pt-row">
              <span className={`pt-tile${r.tile ? ` pt-tile-${r.tile}` : ''}`}><Icon size={16} /></span>
              <div className="pt-row-copy"><strong>{r.title}</strong><small>{r.meta}</small></div>
              {r.done ? <span className="pt-check"><Check size={13} strokeWidth={3} /></span> : <LoaderCircle size={18} className="pt-spin" />}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 10 }}>
        <Note icon={Bell} title="Vous pouvez fermer l’application, une notification arrive dès que tout est vérifié." />
      </div>
      <div className="pt-bottom-actions">
        <UiButton tone="off">Commencer à rouler</UiButton>
      </div>
    </div>
  )
}

function DriverHomeScreen() {
  return (
    <div className="pt-content pt-bleed">
      <MapView name="home" className="pt-map-top pt-home-map" creditBottom={46}>
        {(at) => (
          <>
            <PhotoPin style={at(AT.grandHotel)} src={PHOTO.hotel} />
            <PhotoPin style={at(AT.hotelBourse)} src={PHOTO.lobby} />
            <PhotoPin style={at(AT.hotelJardin)} src={PHOTO.facade} />
            <Waves style={at(AT.lucas)} size={116} live />
            <MyCar style={at(AT.lucas)} heading={150} />
          </>
        )}
      </MapView>
      <div className="pt-float-top">
        <span className="pt-pill pt-pill-glass" style={{ padding: '6px 10px 6px 6px', gap: 7 }}><Avatar src={FACE.lucas} name="Lucas" size="sm" /> Bonjour Lucas</span>
        <IconButton label="Notifications" glass><Bell size={17} /></IconButton>
      </div>
      <div className="pt-sheet pt-home-sheet">
        <div className="pt-sheet-grip" />
        <div className="pt-dispo" {...onGo('offer')}>
          <span className="pt-dispo-dot" />
          <div><strong>Disponible</strong><small>Les hôtels autour de vous peuvent vous appeler</small></div>
          <span className="pt-switch pt-switch-on" role="switch" aria-checked="true" aria-label="Disponible" />
        </div>
        <div className="pt-stats">
          <div className="pt-card pt-stat"><small>Aujourd’hui</small><strong>86,40 €</strong><span>4 courses</span></div>
          <div className="pt-card pt-stat pt-stat-blue"><small>Cette semaine</small><strong>590,30 €</strong><span>Versé ven. 4 décembre</span></div>
        </div>
        <div style={{ marginTop: 10 }}>
          <Note tone="positive" icon={Landmark} title="648,20 € virés ce matin" text="Vos 27 courses de la semaine dernière, commission déduite." />
        </div>
        <TabBar active="home" />
      </div>
    </div>
  )
}

// L'ÉCRAN CLÉ : la course arrive, le gain se lit avant tout le reste.
function OfferScreen() {
  return (
    <div className="pt-content pt-bleed">
      <MapView name="offer" className="pt-map-top pt-offer-map" routes={[{ points: ROUTES.pickup, dashed: true }, { points: ROUTES.trip }]} creditBottom={36}>
        {(at) => (
          <>
            <Waves style={at(AT.hotel)} size={110} live />
            <PhotoPin style={at(AT.hotel)} src={PHOTO.hotel} />
            <span className="pt-map-chip pt-map-chip-right" style={at(AT.hotel)}>Prise en charge <b>2 min</b></span>
            <MyCar style={at(AT.lucasOffer)} heading={150} />
            <DestPin style={at(AT.gare)} />
            <span className="pt-map-chip pt-map-chip-left" style={at(AT.gare)}>Gare Saint-Jean</span>
          </>
        )}
      </MapView>
      <div className="pt-sheet pt-sheet-navy pt-navy pt-offer-sheet">
        <div className="pt-sheet-grip" />
        <div className="pt-offer-head">
          <div>
            <p className="pt-kicker">Vague 1 · le plus proche</p>
            <div className="pt-figure">22,10<small> €</small></div>
            <p className="pt-offer-sub">net pour vous, commission déduite</p>
          </div>
          <Countdown left={18} />
        </div>
        <p className="pt-offer-sub pt-offer-sub-wide">Déjà payée par carte · 2 passagers · 2 bagages</p>
        <div className="pt-card pt-stops">
          <div className="pt-stop"><strong>Claire · Hôtel des Quais</strong><span>650 m · 2 min</span></div>
          <div className="pt-stop"><strong>Gare Saint-Jean</strong><span>3,1 km · 11 min</span></div>
        </div>
        <div className="pt-decide">
          <UiButton tone="light">Refuser</UiButton>
          <UiButton goto="ride">Accepter la course</UiButton>
        </div>
      </div>
    </div>
  )
}

function RideScreen() {
  return (
    <div className="pt-content pt-bleed">
      <MapView name="ride" className="pt-map-top pt-ride-map" routes={[{ points: ROUTES.tripDone, tone: 'done' }, { points: ROUTES.tripAhead }]} creditBottom={34}>
        {(at) => (
          <>
            <MyCar style={at(AT.carRide)} heading={150} />
            <DestPin style={at(AT.gare)} />
            <span className="pt-map-chip pt-map-chip-navy pt-map-chip-left" style={at(AT.gare)}>Arrivée <b>9:58</b></span>
          </>
        )}
      </MapView>
      <div className="pt-float-top">
        <div className="pt-steps pt-glass" style={{ flex: 1 }}>
          <span className="pt-step pt-step-done"><i />En route</span>
          <span className="pt-step pt-step-done"><i />Sur place</span>
          <span className="pt-step pt-step-on"><i />À bord</span>
          <span className="pt-step"><i />Arrivée</span>
        </div>
      </div>
      <div className="pt-sheet pt-ride-sheet">
        <div className="pt-sheet-grip" />
        <p className="pt-kicker">À bord · direction</p>
        <h2 className="pt-title" style={{ marginTop: 7 }}>Gare Saint-Jean</h2>
        <p className="pt-offer-sub">Arrivée prévue à 9:58 · encore 2,1 km</p>
        <div className="pt-card pt-passenger">
          <Avatar name="Claire" size="md" />
          <div className="pt-row-copy"><strong>Claire · 2 bagages</strong><small>Commandée par l’Hôtel des Quais</small></div>
          <IconButton label="Appeler la réception"><Phone size={16} /></IconButton>
        </div>
        <div style={{ marginTop: 10 }}>
          <Note tone="positive" icon={CreditCard} title="Payée par carte, rien à encaisser" text="Le paiement est validé dès votre arrivée." />
        </div>
        <div className="pt-bottom-actions" style={{ flexDirection: 'row' }}>
          <UiButton tone="light"><Navigation size={15} /> Waze</UiButton>
          <UiButton tone="navy" goto="paid">Je suis arrivé</UiButton>
        </div>
      </div>
    </div>
  )
}

function PaidScreen() {
  return (
    <div className="pt-content">
      <div className="pt-paid-medal">
        <Waves size={150} />
        <span className="pt-check-xl"><Check size={26} strokeWidth={3} /></span>
      </div>
      <div className="pt-paid-title">
        <h2 className="pt-display">Course payée</h2>
        <p>Claire a payé avec Apple Pay · 9:58</p>
      </div>
      <div className="pt-card pt-receipt">
        <div className="pt-receipt-row"><span>Prix de la course</span><b>26,00 €</b></div>
        <div className="pt-receipt-row"><span>Commission Portier · 15 %</span><b>− 3,90 €</b></div>
        <div className="pt-receipt-row pt-receipt-total"><span>Pour vous</span><b>22,10 €</b></div>
      </div>
      <div className="pt-card pt-week">
        <div>
          <small>Cette semaine · 24 courses</small>
          <strong>612,40 €</strong>
          <span>Versé vendredi 4 décembre</span>
        </div>
        <div className="pt-bars pt-week-bars" aria-label="Gains par jour">
          <i data-d="L" style={{ height: '62%' }} /><i data-d="M" style={{ height: '48%' }} /><i data-d="M" style={{ height: '80%' }} /><i data-d="J" style={{ height: '70%' }} /><i data-d="V" className="on" style={{ height: '34%' }} />
        </div>
      </div>
      <div className="pt-bottom-actions">
        <UiButton goto="home">Je redeviens disponible</UiButton>
        <button className="pt-text-link">Voir le reçu</button>
      </div>
    </div>
  )
}

// ============================================================
// PAGE DU CLIENT DE L'HÔTEL (web, sur son téléphone)
// ============================================================

function GuestScreen() {
  return (
    <div className="pt-content pt-content-web">
      <div className="pt-guest-hotel"><span className="pt-pin-hotel" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><ConciergeBell size={11} strokeWidth={2.2} /></span><b>{HOTEL.name}</b> · avec Portier</div>
      <div className="pt-guest-title">
        <h2 className="pt-display">Bonjour Claire, votre voiture arrive dans <em>3 min.</em></h2>
      </div>
      <MapView name="guest" className="pt-guest-map" routes={[{ points: ROUTES.guest }]} creditBottom={6}>
        {(at) => (
          <>
            <PhotoPin style={at(AT.hotel)} src={PHOTO.hotel} />
            <MyCar style={at(AT.carGuest)} heading={165} size={22} />
          </>
        )}
      </MapView>
      <div className="pt-card pt-driver">
        <Avatar src={DRIVER.lucas.face} name="Lucas" size="md" />
        <div><strong>Lucas · chauffeur vérifié</strong><small>{DRIVER.lucas.car}</small></div>
        <Plate>{DRIVER.lucas.plate}</Plate>
      </div>
      <div className="pt-card pt-pay">
        <div className="pt-pay-top">
          <div><small>Prix ferme</small><strong>Gare Saint-Jean</strong></div>
          <span className="pt-figure">26,00 €</span>
        </div>
        <div className="pt-pay-buttons">
          <UiButton tone="apple">Payer avec <AppleMark /> Pay</UiButton>
          <UiButton tone="light"><CreditCard size={15} /> Carte bancaire</UiButton>
        </div>
        <p className="pt-pay-note"><ShieldCheck size={12} /> Rien n’est débité avant votre arrivée</p>
      </div>
      <p className="pt-legal" style={{ marginTop: 'auto' }}><b>Conditions</b> · <b>Confidentialité</b> · <b>Mentions légales</b></p>
    </div>
  )
}

// ============================================================
// APPLICATION WEB : RÉCEPTION DE L'HÔTEL
// ============================================================

function HotelSide({ active }) {
  const items = [
    { id: 'console', label: 'Console', icon: LayoutDashboard, goto: 'console' },
    { id: 'rides', label: 'Courses', icon: Route, goto: 'history' },
    { id: 'invoices', label: 'Factures', icon: ReceiptText, goto: 'history' },
    { id: 'reports', label: 'Signal.', icon: MessageSquareWarning },
    { id: 'settings', label: 'Réglages', icon: Settings },
  ]
  return (
    <aside className="pt-rail" aria-label="Navigation de la réception">
      <Mark />
      <Photo src={PHOTO.hotel} className="pt-rail-place" />
      {items.map((it) => {
        const Icon = it.icon
        return <div key={it.id} className={`pt-rail-nav${active === it.id ? ' pt-rail-on' : ''}`} {...onGo(it.goto)}><Icon size={19} />{it.label}</div>
      })}
      <div className="pt-rail-account" title="Léa Martin · réception"><Avatar src={FACE.lea} name="Léa" size="md" /></div>
    </aside>
  )
}

function LiveRides() {
  return (
    <div className="pt-live">
      <div className="pt-live-head"><strong>En ce moment</strong><span>3 courses</span></div>
      <div className="pt-d-card pt-ride pt-ride-on">
        <div className="pt-ride-top"><Pill tone="info"><WaveGlyph size={12} /> Recherche · vague 1</Pill><time>commandée 9:39</time></div>
        <h4>Claire <ChevronRight size={14} /> Gare Saint-Jean</h4>
        <p>2 passagers · 2 bagages · Lucas M. répond (18 s)</p>
        <div className="pt-ride-foot"><strong>26,00 €</strong><span>Lien de paiement envoyé</span><button className="pt-act">Annuler</button></div>
      </div>
      <div className="pt-d-card pt-ride">
        <div className="pt-ride-top"><Pill tone="info"><Car size={12} /> Arrive dans 3 min</Pill><time>commandée 9:28</time></div>
        <h4>M. Garnier <ChevronRight size={14} /> Aéroport de Mérignac</h4>
        <div className="pt-ride-driver"><Avatar src={DRIVER.hugo.face} name="Hugo" size="sm" /><span>Hugo · Classe V</span><Plate>{DRIVER.hugo.plate}</Plate></div>
        <div className="pt-ride-foot"><strong>58,00 €</strong><span className="ok"><CircleCheck size={13} /> Payée · Apple Pay</span><button className="pt-d-icon" aria-label="Appeler Hugo"><Phone size={14} /></button></div>
      </div>
      <div className="pt-d-card pt-ride">
        <div className="pt-ride-top"><Pill tone="positive"><Navigation size={11} /> En course</Pill><time>arrivée 10:42</time></div>
        <h4>Famille Okafor <ChevronRight size={14} /> Saint-Émilion</h4>
        <p>Château Figeac · Julien R. · 4 passagers</p>
        <div className="pt-ride-foot"><strong>145,00 €</strong><span>Sur la chambre 214</span><button className="pt-d-icon" aria-label="Plus d’actions"><Ellipsis size={14} /></button></div>
      </div>
    </div>
  )
}

function ConsoleMap() {
  const free = [[44.8468, -0.5725, 30], [44.8446, -0.5560, 200], [44.8340, -0.5640, 90], [44.8330, -0.5760, 300], [44.8322, -0.5560, 160], [44.8472, -0.5600, 250], [44.8405, -0.5520, 120]]
  return (
    <div className="pt-main-map">
      <MapView name="console" routes={[{ points: ROUTES.hugo, tone: 'navy' }, { points: ROUTES.julien }]} creditBottom={14}>
        {(at) => (
          <>
            <Waves style={at(AT.hotel)} size={250} live />
            <HotelPin style={at(AT.hotel)} />
            <span className="pt-map-chip pt-map-chip-right" style={at(AT.hotel)}>{HOTEL.name}</span>
            <span className="pt-car" style={at(AT.lucas)}><CarTop heading={150} tone="blue" /></span>
            <span className="pt-map-chip pt-map-chip-navy" style={at(AT.lucas)}>Lucas · vague 1 · <b>18 s</b></span>
            <span className="pt-car" style={at(AT.hugo)}><CarTop heading={80} /></span>
            <span className="pt-map-chip pt-map-chip-below" style={at(AT.hugo)}>Hugo · <b>3 min</b></span>
            <span className="pt-car" style={at(AT.julien)}><CarTop heading={95} /></span>
            <span className="pt-map-chip pt-map-chip-below" style={at(AT.julien)}>Julien · vers Saint-Émilion</span>
            {free.map(([lat, lon, h]) => <span key={lat} className="pt-car" style={at([lat, lon])}><CarTop heading={h} tone="muted" size={17} /></span>)}
          </>
        )}
      </MapView>
      <div className="pt-legend pt-glass"><span><i style={{ background: '#2f7cf6' }} />Vague en cours</span><span><i style={{ background: '#171e2b' }} />Vos courses</span><span><i style={{ background: '#8b93a3' }} />17 chauffeurs libres</span></div>
      <div className="pt-zoom pt-glass"><button aria-label="Zoomer"><Plus size={15} /></button><button aria-label="Dézoomer"><Minus size={15} /></button></div>
    </div>
  )
}

// La régie de la réception : la carte sur tout l'écran, et par-dessus le
// titre, la recherche, le bouton de commande et les courses du moment.
function ConsoleBody() {
  return (
    <>
      <ConsoleMap />
      <div className="pt-overlay-top">
        <div className="pt-overlay-title pt-glass"><h3>Console</h3><small>Vendredi 27 novembre · 9:41</small></div>
        <div className="pt-overlay-tools">
          <div className="pt-d-search pt-glass"><Search size={15} /> Client, chambre, course</div>
          <DeskButton goto="order"><Plus size={16} /> Nouvelle course</DeskButton>
        </div>
      </div>
      <div className="pt-live-float"><LiveRides /></div>
    </>
  )
}

function ConsoleDesk() {
  return (
    <DeskFrame url="app.portier.fr/reception">
      <HotelSide active="console" />
      <main className="pt-main"><ConsoleBody /></main>
    </DeskFrame>
  )
}

function OrderDesk() {
  return (
    <DeskFrame url="app.portier.fr/reception/nouvelle-course">
      <HotelSide active="console" />
      <main className="pt-main">
        <ConsoleBody />
        <div className="pt-scrim" />
        <section className="pt-drawer" aria-label="Nouvelle course">
          <div className="pt-drawer-head">
            <div><h4>Nouvelle course</h4><p>Le prix est fixé avant de commander, il ne bouge plus.</p></div>
            <button className="pt-d-icon" aria-label="Fermer"><X size={15} /></button>
          </div>
          <label className="pt-d-label">Destination</label>
          <div className="pt-d-input pt-d-input-on"><TrainFront size={16} /> Gare Saint-Jean <small>33800 Bordeaux</small></div>
          <div className="pt-d-chips">
            <span className="pt-d-chip"><Plane size={13} /> Aéroport</span>
            <span className="pt-d-chip pt-d-chip-on"><TrainFront size={13} /> Gare</span>
            <span className="pt-d-chip"><Grape size={13} /> Saint-Émilion</span>
            <span className="pt-d-chip"><Wine size={13} /> Cité du Vin</span>
          </div>
          <div className="pt-d-grid">
            <div><label className="pt-d-label">Prénom du client</label><div className="pt-d-input">Claire</div></div>
            <div><label className="pt-d-label">Téléphone <em>(facultatif)</em></label><div className="pt-d-input">06 12 48 90 33</div></div>
          </div>
          <div className="pt-d-grid">
            <div><label className="pt-d-label">Passagers</label><div className="pt-stepper"><button aria-label="Moins"><Minus size={14} /></button><span><Users size={14} /> 2</span><button aria-label="Plus"><Plus size={14} /></button></div></div>
            <div><label className="pt-d-label">Bagages</label><div className="pt-stepper"><button aria-label="Moins"><Minus size={14} /></button><span><Luggage size={14} /> 2</span><button aria-label="Plus"><Plus size={14} /></button></div></div>
          </div>
          <label className="pt-d-label">Paiement</label>
          <div className="pt-radio pt-radio-on"><i /><div><strong>Le client paie maintenant</strong><small>Lien Apple Pay ou carte, envoyé par SMS</small></div><CreditCard size={17} /></div>
          <div className="pt-radio"><i /><div><strong>Sur la note de la chambre</strong><small>Facturé à l’hôtel en fin de mois</small></div><ConciergeBell size={17} /></div>
          <div className="pt-quote" style={{ marginTop: 14 }}>
            <div className="pt-quote-row">
              <div><small>Prix ferme</small><strong>3,1 km · 11 min · voiture dans 4 min</strong></div>
              <span className="pt-quote-price">26,00 €</span>
            </div>
            <DeskButton wide goto="console">Commander la voiture</DeskButton>
          </div>
        </section>
      </main>
    </DeskFrame>
  )
}

function HistoryDesk() {
  const rows = [
    { at: '27 nov. · 9:39', who: 'Claire', to: 'Gare Saint-Jean', driver: 'lucas', pay: <Pill tone="warning"><Send size={11} /> Lien envoyé</Pill>, price: '26,00 €' },
    { at: '27 nov. · 9:28', who: 'M. Garnier', to: 'Aéroport de Mérignac', driver: 'hugo', pay: <Pill tone="positive"><Check size={11} /> Apple Pay</Pill>, price: '58,00 €' },
    { at: '27 nov. · 8:55', who: 'Famille Okafor', to: 'Château Figeac, Saint-Émilion', driver: 'julien', pay: <Pill tone="navy"><ConciergeBell size={11} /> Chambre 214</Pill>, price: '145,00 €' },
    { at: '27 nov. · 8:05', who: 'Mme Duval', to: 'Aéroport de Mérignac', driver: 'antoine', pay: <Pill tone="positive"><Check size={11} /> Carte</Pill>, price: '58,00 €' },
    { at: '26 nov. · 19:40', who: 'M. Weber', to: 'Cité du Vin', driver: 'lucas', pay: <Pill tone="navy"><ConciergeBell size={11} /> Chambre 108</Pill>, price: '19,00 €' },
    { at: '26 nov. · 18:12', who: 'Sofia R.', to: 'Gare Saint-Jean', driver: 'hugo', pay: <Pill tone="positive"><Check size={11} /> Apple Pay</Pill>, price: '26,00 €' },
    { at: '26 nov. · 11:30', who: 'M. et Mme Lambert', to: 'Arcachon, port', driver: 'antoine', pay: <Pill tone="navy"><ConciergeBell size={11} /> Chambre 305</Pill>, price: '132,00 €', flag: true },
    { at: '25 nov. · 22:15', who: 'Mme Rossi', to: 'Aéroport · tarif de nuit', driver: 'julien', pay: <Pill tone="positive"><Check size={11} /> Carte</Pill>, price: '69,60 €' },
  ]
  return (
    <DeskFrame url="app.portier.fr/reception/courses">
      <HotelSide active="rides" />
      <main className="pt-main">
        <div className="pt-main-top">
          <div><h3>Courses et factures</h3><small>Novembre 2026 · 63 courses</small></div>
          <div className="pt-main-tools">
            <div className="pt-d-search" style={{ width: 230 }}><Search size={15} /> Client, chambre, chauffeur</div>
            <span className="pt-d-select">Novembre <ChevronDown size={14} /></span>
            <span className="pt-d-select"><ListFilter size={14} /> Tous les paiements</span>
          </div>
        </div>
        <div className="pt-main-body">
          <div className="pt-split">
            <div className="pt-d-card" style={{ overflow: 'hidden' }}>
              <table className="pt-table">
                <thead><tr><th>Date</th><th>Client et trajet</th><th>Chauffeur</th><th>Paiement</th><th className="pt-right">Prix</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.at}>
                      <td className="pt-num" style={{ color: 'var(--ink-soft)' }}>{r.at}</td>
                      <td><span className="pt-cell-trip"><strong>{r.who}</strong>{r.flag && <Pill tone="danger"><TriangleAlert size={11} /> Signalée</Pill>}</span><small>{r.to}</small></td>
                      <td><span className="pt-cell-person"><Avatar src={DRIVER[r.driver].face} name={DRIVER[r.driver].short} size="sm" />{DRIVER[r.driver].short}</span></td>
                      <td>{r.pay}</td>
                      <td className="pt-right"><strong>{r.price}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pt-pager"><span>1 à 8 sur 63</span><div><button className="pt-d-icon" aria-label="Page précédente"><ChevronLeft size={14} /></button><button className="pt-d-icon" aria-label="Page suivante"><ChevronRight size={14} /></button></div></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="pt-d-card pt-d-pad pt-kpi-navy">
                <div className="pt-d-h"><strong>Ce mois-ci</strong><span>63 courses</span></div>
                <div className="pt-invoice-figure">3 872,00 €</div>
                <div className="pt-split-bar" style={{ background: 'rgba(255,255,255,0.12)' }}><i style={{ width: '62%' }} /><i style={{ width: '38%', background: '#fff' }} /></div>
                <div className="pt-split-legend">
                  <span style={{ color: 'var(--on-navy-soft)' }}><em><i style={{ background: '#2f7cf6' }} />Payé par les clients</em><b style={{ color: '#fff' }}>2 386,00 €</b></span>
                  <span style={{ color: 'var(--on-navy-soft)' }}><em><i style={{ background: '#fff' }} />Sur la note des chambres</em><b style={{ color: '#fff' }}>1 486,00 €</b></span>
                </div>
              </div>
              <div className="pt-d-card pt-d-pad">
                <div className="pt-d-h"><strong>Factures de l’hôtel</strong><FileText size={16} /></div>
                <p className="pt-invoice-meta">Les courses mises sur la note des chambres, réunies en une facture le dernier jour du mois.</p>
                <div className="pt-mini-rows" style={{ marginTop: 10 }}>
                  <div className="pt-mini-row"><span>Novembre · 23</span><span><b>1 486,00 €</b><Pill tone="neutral">Le 30</Pill></span></div>
                  <div className="pt-mini-row"><span>Octobre · 21</span><span><b>1 312,00 €</b><Pill tone="positive"><Check size={11} /> Payée</Pill></span></div>
                  <div className="pt-mini-row"><span>Septembre · 18</span><span><b>1 104,00 €</b><Pill tone="positive"><Check size={11} /> Payée</Pill></span></div>
                </div>
                <div style={{ marginTop: 12 }}><DeskButton tone="light" wide><Download size={15} /> Facture d’octobre (PDF)</DeskButton></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DeskFrame>
  )
}

// ============================================================
// APPLICATION WEB : ADMINISTRATION (le patron de la flotte)
// ============================================================

function AdminSide() {
  const items = [
    { id: 'pilot', label: 'Pilotage', icon: LayoutDashboard, on: true },
    { id: 'drivers', label: 'Chauffeurs', icon: Users, badge: 2 },
    { id: 'hotels', label: 'Établissements', short: 'Hôtels', icon: Building2 },
    { id: 'rides', label: 'Courses', icon: Route },
    { id: 'payouts', label: 'Virements', icon: Landmark },
    { id: 'prices', label: 'Grille et commission', short: 'Tarifs', icon: Percent },
    { id: 'reports', label: 'Signalements', short: 'Signal.', icon: MessageSquareWarning, badge: 1 },
  ]
  return (
    <aside className="pt-rail" aria-label="Navigation de l’administration">
      <Mark />
      {items.map((it) => {
        const Icon = it.icon
        return <div key={it.id} className={`pt-rail-nav${it.on ? ' pt-rail-on' : ''}`}><Icon size={19} />{it.short || it.label}{it.badge && <b>{it.badge}</b>}</div>
      })}
      <div className="pt-rail-account" title="Nicolas Ferrand · administrateur"><Avatar src={FACE.nicolas} name="Nicolas" size="md" /></div>
    </aside>
  )
}

function AdminDesk() {
  const payouts = [
    { d: 'lucas', rides: 27, amount: '648,20 €' },
    { d: 'hugo', rides: 31, amount: '702,90 €' },
    { d: 'antoine', rides: 24, amount: '588,75 €' },
    { d: 'julien', rides: 22, amount: '534,10 €' },
  ]
  return (
    <DeskFrame url="app.portier.fr/admin">
      <AdminSide />
      <main className="pt-main">
        <div className="pt-main-top">
          <div><h3>Pilotage</h3><small>Vendredi 27 novembre · Bordeaux · 36 hôtels</small></div>
          <div className="pt-main-tools">
            <DeskButton tone="light"><Percent size={15} /> 15 % · grille de jour</DeskButton>
          </div>
        </div>
        <div className="pt-main-body">
          <div className="pt-kpis">
            <div className="pt-d-card pt-kpi"><small><Route size={14} /> Courses aujourd’hui</small><strong>21</strong><span><b>+4</b> sur vendredi dernier</span></div>
            <div className="pt-d-card pt-kpi"><small><CreditCard size={14} /> Payé par les clients</small><strong>1 284,00 €</strong><span>dont 412 € sur les chambres</span></div>
            <div className="pt-d-card pt-kpi pt-kpi-navy"><small><Percent size={14} /> Votre commission</small><strong>192,60 €</strong><span>calculée course par course</span></div>
            <div className="pt-d-card pt-kpi"><small><Car size={14} /> Chauffeurs en ligne</small><strong>17<span style={{ display: 'inline', fontSize: 15, color: 'var(--ink-soft)', fontWeight: 700 }}> / 58</span></strong><span>3 en course</span></div>
          </div>
          <div className="pt-admin-grid">
            <div className="pt-d-card pt-d-pad">
              <div className="pt-d-h"><strong>Dossiers à trancher</strong><span>bloqués par un contrôle</span></div>
              <div className="pt-case">
                <Avatar src={FACE.maxime} name="Maxime" size="md" />
                <div><strong>Maxime D. <Pill tone="warning"><TriangleAlert size={11} /> Nom différent</Pill></strong><p>Le nom de la carte VTC ne correspond pas à celui de la pièce d’identité.</p></div>
                <DeskButton tone="light">Ouvrir</DeskButton>
              </div>
              <div className="pt-case">
                <Avatar src={FACE.thomas} name="Thomas" size="md" />
                <div><strong>Thomas L. <Pill tone="danger"><ShieldCheck size={11} /> Assurance expirée</Pill></strong><p>Expirée le 20 novembre. Compte suspendu, plus aucune course proposée.</p></div>
                <DeskButton tone="light">Ouvrir</DeskButton>
              </div>
              <div className="pt-case">
                <span className="pt-tile pt-tile-rose" style={{ width: 36, height: 36 }}><MessageSquareWarning size={17} /></span>
                <div><strong>Signalement · Hôtel Saint-Pierre</strong><p>Retard de 15 minutes, course du 26 novembre avec Antoine L.</p></div>
                <DeskButton tone="light">Traiter</DeskButton>
              </div>
            </div>
            <div className="pt-d-card" style={{ overflow: 'hidden' }}>
              <div className="pt-d-pad" style={{ paddingBottom: 10 }}><div className="pt-d-h" style={{ marginBottom: 0 }}><strong>Virements de ce matin</strong><Pill tone="positive"><Check size={11} /> Envoyés à 7:00</Pill></div></div>
              <table className="pt-table">
                <thead><tr><th>Chauffeur</th><th>Courses</th><th className="pt-right">Versé</th></tr></thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.d}>
                      <td><span className="pt-cell-person"><Avatar src={DRIVER[p.d].face} name={DRIVER[p.d].short} size="sm" />{DRIVER[p.d].name}</span></td>
                      <td className="pt-num">{p.rides}</td>
                      <td className="pt-right"><strong>{p.amount}</strong></td>
                    </tr>
                  ))}
                  <tr className="pt-total-row"><td><strong>58 chauffeurs</strong></td><td className="pt-num">1 318</td><td className="pt-right"><strong>23 418,60 €</strong></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </DeskFrame>
  )
}

// ============================================================
// LA PAGE
// ============================================================

const FLOWS = [
  {
    n: '01',
    title: 'Le chauffeur',
    note: 'Application iPhone et Android. Le chauffeur s’inscrit seul, reçoit les courses des hôtels autour de lui, et n’encaisse plus rien : le client a déjà payé.',
    mockups: [
      { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier des 3 écrans de présentation', screen: <OnboardingScreen />, lightBar: true },
      { id: 'dossier', title: 'Dossier vérifié tout seul', subtitle: 'Identité, entreprise, papiers, compte bancaire', screen: <DossierScreen />, notes: ['Moins de 2 minutes, même la nuit'] },
      { id: 'home', title: 'Accueil', subtitle: 'Disponible, gains du jour, prochain virement', screen: <DriverHomeScreen />, notes: ['Les hôtels partenaires autour de lui'] },
      { id: 'offer', title: 'Une course arrive', subtitle: 'Le gain net d’abord, 30 secondes pour décider', screen: <OfferScreen />, notes: ['L’écran clé', 'Sans réponse : la course part aux 3 suivants'] },
      { id: 'ride', title: 'Course en cours', subtitle: 'Étapes, itinéraire dans Waze, rien à encaisser', screen: <RideScreen /> },
      { id: 'paid', title: 'Course payée', subtitle: 'Le détail de la commission, la semaine en cours', screen: <PaidScreen /> },
    ],
  },
  {
    n: '02',
    title: 'Le client de l’hôtel',
    note: 'Aucune application à installer : un lien reçu par SMS. Il voit sa voiture arriver et paie avant de monter, ou la course va sur sa chambre.',
    mockups: [
      { id: 'guest', title: 'Suivre et payer', subtitle: 'Une page web, depuis le SMS de l’hôtel', screen: <GuestScreen />, url: 'portier.fr/c/Q7K2', notes: ['Apple Pay ou carte', 'Débité à l’arrivée seulement'] },
    ],
  },
  {
    n: '03',
    title: 'La réception',
    note: 'Sur l’ordinateur du comptoir. Commander prend trente secondes, et la voiture se suit sur la carte au lieu d’appeler le chauffeur.',
    mockups: [
      { id: 'console', title: 'La console', subtitle: 'Les courses en cours et la carte en direct', desk: <ConsoleDesk />, notes: ['L’onde d’appel autour de l’hôtel : vague 1, 2, 3'] },
      { id: 'order', title: 'Commander une voiture', subtitle: 'Destination, client, paiement, prix ferme', desk: <OrderDesk />, notes: ['Le panneau s’ouvre à côté, la console reste visible'] },
      { id: 'history', title: 'Courses et factures', subtitle: 'Ce que les clients ont payé, ce qui va sur les chambres', desk: <HistoryDesk />, notes: ['Une facture par mois pour les chambres'] },
    ],
  },
  {
    n: '04',
    title: 'L’administration',
    note: 'Pour celui qui fait tourner le réseau : dossiers bloqués, signalements, commission et virements des chauffeurs.',
    mockups: [
      { id: 'admin', title: 'Pilotage', subtitle: 'L’activité du jour, ce qui attend une décision', desk: <AdminDesk />, notes: ['Virements chaque vendredi, commission déduite'] },
    ],
  },
]

function MockupCard({ mockup }) {
  const wide = Boolean(mockup.desk)
  return (
    <article id={`pt-${mockup.id}`} className={`pt-mockup-card${wide ? ' pt-mockup-card-wide' : ''}`}>
      <div className="pt-card-head">
        <h3>{mockup.title}</h3>
        <p>{mockup.subtitle}</p>
        {(mockup.scroll || mockup.notes) && (
          <div className="pt-annotations">
            {mockup.scroll && <span className="pt-scroll-chip"><ChevronDown size={12} /> Écran défilable</span>}
            {(mockup.notes || []).map((n) => <span key={n}>{n}</span>)}
          </div>
        )}
      </div>
      {wide
        ? mockup.desk
        : <div className="pt-export-wrap"><PhoneFrame lightBar={mockup.lightBar} url={mockup.url}>{mockup.screen}</PhoneFrame></div>}
    </article>
  )
}

function Flow({ flow }) {
  return (
    <section className="pt-flow">
      <div className="pt-flow-head"><span>{flow.n}</span><h2>{flow.title}</h2><p>{flow.note}</p></div>
      <div className="pt-gallery">{flow.mockups.map((m) => <MockupCard key={m.id} mockup={m} />)}</div>
    </section>
  )
}

function Charte() {
  return (
    <section className="pt-flow">
      <div className="pt-flow-head"><span>00</span><h2>L’identité de Portier</h2><p>Claire et nette comme une application de navigation : fond clair, un bloc bleu nuit qui porte la décision, un seul bleu pour l’action.</p></div>
      <div className="pt-charte">
        <div>
          <h3>Les couleurs, chacune a un rôle</h3>
          <div className="pt-swatches">
            <div className="pt-swatch"><i style={{ background: '#f4f6f9' }} /><div><strong>Clair</strong><span>le fond de tous les écrans, la carte reste lisible</span></div></div>
            <div className="pt-swatch"><i style={{ background: '#171e2b' }} /><div><strong>Bleu nuit</strong><span>le bloc de la décision : la course à accepter, le prix à commander</span></div></div>
            <div className="pt-swatch"><i style={{ background: '#2f7cf6' }} /><div><strong>Bleu</strong><span>la seule couleur vive : le bouton principal, le trajet, l’onde d’appel</span></div></div>
            <div className="pt-swatch"><i style={{ background: '#16a34a' }} /><div><strong>Vert</strong><span>payé, vérifié, disponible</span></div></div>
            <div className="pt-swatch"><i style={{ background: '#c2410c' }} /><div><strong>Orange</strong><span>ce qui attend une réponse</span></div></div>
          </div>
        </div>
        <div>
          <h3>Les textes</h3>
          <div className="pt-type-sample">
            <div><b style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Bonjour Claire</b><span>les titres en Manrope, gras et serrés</span></div>
            <div><b style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="pt-num">22,10 €</b><span>les montants, gros, en chiffres alignés</span></div>
            <div><b style={{ fontSize: 13, fontWeight: 600 }}>Le reste en Manrope aussi, net à petite taille.</b><span>le texte que l’on lit le plus</span></div>
          </div>
          <div className="pt-charte-buttons">
            <UiButton>Accepter</UiButton>
            <UiButton tone="light">Refuser</UiButton>
          </div>
        </div>
        <div>
          <h3>Le signe de Portier : l’onde d’appel</h3>
          <div className="pt-charte-signature">
            <Waves size={190} live style={{ left: '50%', top: '52%' }} />
            <HotelPin style={{ left: '50%', top: '52%' }} />
            <div className="pt-charte-sig-labels">
              <span style={{ left: '50%', top: '33%' }}>Vague 1 · le plus proche</span>
              <span style={{ left: '22%', top: '72%' }}>Vague 2 · les trois suivants</span>
              <span style={{ left: '80%', top: '86%' }}>Vague 3 · toute la zone</span>
            </div>
          </div>
          <p className="pt-charte-text">Quand l’hôtel commande, l’appel part de l’hôtel en vagues. Les mêmes anneaux sont dans le logo, sur la carte de la réception, autour du chauffeur disponible et dans ses 30 secondes pour accepter.</p>
        </div>
      </div>
    </section>
  )
}

export default function PortierMockupsPage() {
  return (
    <main className="portier-mockups-page">
      <section className="pt-landing-hero">
        <p className="pt-eyebrow">Proposition d’accompagnement</p>
        <h1>Maquettes visuelles</h1>
        <p className="pt-reference">Portier · Application mobile et web</p>
        <p className="pt-disclaimer">
          Aperçu rapide pour visualiser l’idée : toutes les pages ne sont pas illustrées
          et le design n’est pas définitif (couleurs, logo, typo). Non contractuel.
        </p>
        <span className="pt-proto-note"><Sparkles size={14} /> Maquette interactive, touchez les boutons</span>
      </section>
      <Charte />
      {FLOWS.map((flow) => <Flow key={flow.n} flow={flow} />)}
    </main>
  )
}
