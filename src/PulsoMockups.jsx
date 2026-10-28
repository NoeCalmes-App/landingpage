import { createElement } from 'react'
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Copy,
  CreditCard,
  Download,
  Dumbbell,
  Flag,
  Flower2,
  Home,
  House,
  LayoutDashboard,
  ListFilter,
  Mail,
  MapPin,
  Menu,
  Minus,
  PersonStanding,
  Phone,
  Plus,
  ReceiptText,
  RefreshCw,
  ScanLine,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Users,
  Volleyball,
  UserRound,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import './pulso-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// PULSO, MAQUETTE V1 (26 octobre 2026) · devis APP-2026-208
// Avant signature : aperçu non contractuel, pas tous les écrans.
// Application mobile (particuliers) PUIS application web (coachs,
// billetterie, administration), comme demandé par Noé.
// Architecture reprise de BailoraMockups.jsx, page et téléphone
// d'ArethaMockups.jsx, cadres web de VietCollab.
// Guides : nowork/documentation/guides/creation-maquette.md (V1)
//          .claude/skills/maquette/SKILL.md (méthode)
// Périmètre = « Écrans prévus dans la première version » du CDC Pulso.
// Rien ici que le devis ne vend pas : pas de panel coach ni de prix
// d'abonnement dans l'application, pas de carte, pas de messagerie,
// pas d'avis, pas de Wallet.
// ============================================================

const REFERENCE = 'APP-2026-208'

// Photos : numéros et identifiants fixes, jamais d'URL aléatoire.
// Sans réseau, l'initiale ou le fond reste visible sous l'image.
const FACE = {
  lea: 'https://i.pravatar.cc/160?img=5',
  marco: 'https://i.pravatar.cc/160?img=3',
  hugo: 'https://i.pravatar.cc/160?img=12',
  sofia: 'https://i.pravatar.cc/160?img=32',
  karim: 'https://i.pravatar.cc/160?img=68',
  clara: 'https://i.pravatar.cc/160?img=44',
  thomas: 'https://i.pravatar.cc/160?img=13',
  julien: 'https://i.pravatar.cc/160?img=53',
  ines: 'https://i.pravatar.cc/160?img=16',
}
const PHOTO = {
  sea: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80',
  coaching: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80',
  fitness: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
  tennis: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',
  yoga: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  boxing: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80',
  pilates: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
  run: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
  track: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  ropes: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=900&q=80',
}

// Mêmes personnes, mêmes prix, mêmes dates sur tous les écrans.
// Lundi 26 octobre 2026 = aujourd'hui dans la maquette.
const COACH = {
  marco: { name: 'Marco Valenti', job: 'Préparation physique', area: 'Larvotto', price: 80, face: FACE.marco, photo: PHOTO.fitness },
  hugo: { name: 'Hugo Marchetti', job: 'Tennis', area: 'Saint-Roman', price: 90, face: FACE.hugo, photo: PHOTO.tennis },
  clara: { name: 'Clara Rossi', job: 'Pilates', area: 'Monte-Carlo', price: 70, face: FACE.clara, photo: PHOTO.pilates },
  karim: { name: 'Karim Benali', job: 'Boxe anglaise', area: 'La Condamine', price: 75, face: FACE.karim, photo: PHOTO.boxing },
}

// Prototype cliquable : les vrais boutons naviguent entre les cartes.
function goTo(id) {
  const el = document.getElementById(`mk-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function onGo(id) {
  return id ? { role: 'button', tabIndex: 0, onClick: () => goTo(id) } : {}
}

// QR code réel (encode PULSO-RB-1411-0042-A), 21 × 21 modules.
const QR_PATH = 'M0 0h7v1h-7zM10 0h2v1h-2zM14 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h4v1h-4zM14 1h1v1h-1zM20 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h1v1h-1zM11 2h2v1h-2zM14 2h1v1h-1zM16 2h3v1h-3zM20 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h1v1h-1zM11 3h2v1h-2zM14 3h1v1h-1zM16 3h3v1h-3zM20 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h3v1h-3zM12 4h1v1h-1zM14 4h1v1h-1zM16 4h3v1h-3zM20 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h2v1h-2zM12 5h1v1h-1zM14 5h1v1h-1zM20 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h7v1h-7zM8 7h2v1h-2zM0 8h1v1h-1zM2 8h5v1h-5zM9 8h1v1h-1zM11 8h1v1h-1zM14 8h5v1h-5zM2 9h4v1h-4zM8 9h1v1h-1zM11 9h1v1h-1zM13 9h1v1h-1zM17 9h4v1h-4zM0 10h1v1h-1zM2 10h1v1h-1zM4 10h6v1h-6zM11 10h2v1h-2zM14 10h2v1h-2zM17 10h1v1h-1zM4 11h1v1h-1zM7 11h1v1h-1zM10 11h1v1h-1zM14 11h3v1h-3zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM11 12h1v1h-1zM14 12h1v1h-1zM17 12h2v1h-2zM20 12h1v1h-1zM8 13h2v1h-2zM16 13h1v1h-1zM0 14h7v1h-7zM9 14h1v1h-1zM11 14h3v1h-3zM15 14h1v1h-1zM17 14h1v1h-1zM19 14h1v1h-1zM0 15h1v1h-1zM6 15h1v1h-1zM8 15h1v1h-1zM11 15h1v1h-1zM13 15h1v1h-1zM16 15h1v1h-1zM18 15h1v1h-1zM20 15h1v1h-1zM0 16h1v1h-1zM2 16h3v1h-3zM6 16h1v1h-1zM8 16h2v1h-2zM13 16h1v1h-1zM17 16h2v1h-2zM20 16h1v1h-1zM0 17h1v1h-1zM2 17h3v1h-3zM6 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM0 18h1v1h-1zM2 18h3v1h-3zM6 18h1v1h-1zM8 18h2v1h-2zM12 18h1v1h-1zM18 18h1v1h-1zM0 19h1v1h-1zM6 19h1v1h-1zM9 19h2v1h-2zM12 19h1v1h-1zM15 19h4v1h-4zM20 19h1v1h-1zM0 20h7v1h-7zM8 20h2v1h-2zM12 20h1v1h-1z'

// ============================================================
// COMPOSANTS PARTAGÉS
// ============================================================

function StatusBar({ light = false }) {
  return (
    <div className={`pl-statusbar${light ? ' pl-statusbar-light' : ''}`}>
      <span>9:41</span>
      <div className="pl-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

// Téléphone : application (par défaut) ou page web (barre d'adresse en
// bas, sans cadenas). Même coque, même hauteur totale dans les deux cas.
function PhoneFrame({ children, tall = false, lightBar = false, url, night = false }) {
  return (
    <div className={`pl-phone-export${tall ? ' pl-phone-export-tall' : ''}`}>
      <div className={`pl-phone${night ? ' pl-night' : ''}`}>
        <div className="pl-screen">
          <StatusBar light={lightBar || night} />
          {children}
          {url && (
            <div className="pl-browser-chrome" aria-label="Barre d’adresse du navigateur">
              <div className="pl-browser"><span>aA</span><b>{url}</b><RefreshCw size={12} /></div>
            </div>
          )}
          <div className={`pl-home-indicator${night ? ' pl-home-indicator-light' : ''}`} />
        </div>
      </div>
    </div>
  )
}

// Fenêtre d'ordinateur : le nom de domaine du produit dans la barre.
function DeskFrame({ url, children, app = true }) {
  return (
    <div className="pl-desk">
      <div className="pl-desk-bar"><i /><i /><i /><span className="pl-desk-url">{url}</span></div>
      <div className={app ? 'pl-desk-app pl-light' : 'pl-desk-page'}>{children}</div>
    </div>
  )
}

// Logo provisoire : le pouls citron sur noir. Le logo définitif se
// dessine après signature ; il remplacera ce seul bloc.
function PulseGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 13h5l2-5 3.5 11L15 9l1.6 4H22" fill="none" stroke="#bdee63" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function AppMark({ large = false }) {
  return <span className={`pl-app-mark${large ? ' pl-app-mark-large' : ''}`} aria-label="Pulso"><PulseGlyph size={large ? 36 : 22} /></span>
}
function Wordmark() {
  return <span className="pl-wordmark"><AppMark />Pulso</span>
}

function AppleMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
    </svg>
  )
}
function GoogleMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="#4285F4" d="M15.68 8.18c0-.57-.05-1.12-.15-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87Z" />
      <path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2a4.8 4.8 0 0 1-7.15-2.52H.9v2.07A8 8 0 0 0 8 16Z" />
      <path fill="#FBBC05" d="M3.56 9.54a4.8 4.8 0 0 1 0-3.08V4.39H.9a8 8 0 0 0 0 7.22l2.66-2.07Z" />
      <path fill="#EA4335" d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.3-2.3A8 8 0 0 0 .9 4.39l2.66 2.07A4.77 4.77 0 0 1 8 3.18Z" />
    </svg>
  )
}

function UiButton({ children, tone = '', goto }) {
  return <button className={`pl-ui-button${tone ? ` pl-ui-button-${tone}` : ''}`} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function IconButton({ children, goto, glass = false, label }) {
  return <button className={`pl-icon-button${glass ? ' pl-icon-button-glass' : ''}`} aria-label={label} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function DeskButton({ children, tone = '', goto }) {
  return <button className={`pl-d-btn${tone ? ` pl-d-btn-${tone}` : ''}`} onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}
function Pill({ tone = 'neutral', children }) {
  return <span className={`pl-pill pl-pill-${tone}`}>{children}</span>
}
function Avatar({ src, name, size = 'md' }) {
  return (
    <span className={`pl-avatar pl-avatar-${size}`}>
      <span className="pl-avatar-initial">{name.charAt(0)}</span>
      {src && <img src={src} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />}
    </span>
  )
}
function Photo({ src, className = '', children, alt = '' }) {
  return (
    <div className={`pl-photo ${className}`}>
      <img src={src} alt={alt} onError={(e) => { e.currentTarget.style.display = 'none' }} />
      {children}
    </div>
  )
}
function TopBar({ title, back, action, actionLabel, onAction }) {
  return (
    <div className="pl-topbar">
      {back
        ? <IconButton goto={back} label="Retour"><ChevronLeft size={18} /></IconButton>
        : <span {...onGo('bookings')}><Avatar src={FACE.lea} name="Léa" size="md" /></span>}
      <strong className="pl-topbar-title">{title}</strong>
      {action ? <IconButton goto={onAction} label={actionLabel}>{action}</IconButton> : <span />}
    </div>
  )
}
// En-tête des écrans racines, à la manière d'iOS : un grand titre aligné
// à gauche, les actions à droite, la photo de profil en dernier.
function LargeHeader({ kicker, title, avatar = true, guest = false }) {
  return (
    <div className="pl-large-header">
      <div>
        {kicker}
        <h1>{title}</h1>
      </div>
      <div className="pl-large-header-tools">
        {guest
          ? <IconButton label="Se connecter"><UserRound size={17} /></IconButton>
          : <IconButton label="Notifications"><Bell size={17} /></IconButton>}
        {avatar && !guest && <span {...onGo('bookings')}><Avatar src={FACE.lea} name="Léa" size="md" /></span>}
      </div>
    </div>
  )
}

// Quatre onglets : le profil passe par la photo, en haut à droite.
function TabBar({ active }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil', goto: 'home' },
    { id: 'events', icon: CalendarDays, label: 'Événements', goto: 'event' },
    { id: 'bookings', icon: CalendarCheck, label: 'Séances', goto: 'bookings' },
    { id: 'tickets', icon: Ticket, label: 'Billets', goto: 'ticket' },
  ]
  return (
    <div className="pl-tabbar">
      {tabs.map(({ id, icon, label, goto }) => (
        <div key={id} className={`pl-tab${active === id ? ' pl-tab-active' : ''}`} {...onGo(goto)}>
          {createElement(icon, { size: 19, strokeWidth: active === id ? 2.4 : 1.9 })}
          <small>{label}</small>
        </div>
      ))}
    </div>
  )
}
function SectionHead({ children, action }) {
  return <div className="pl-section-head"><strong>{children}</strong>{action && <span>{action}</span>}</div>
}
function ListRow({ lead, title, meta, trailing, goto }) {
  return (
    <div className="pl-row" {...onGo(goto)}>
      {lead}
      <div className="pl-row-copy"><strong>{title}</strong>{meta && <small>{meta}</small>}</div>
      {trailing === undefined ? <ChevronRight size={15} className="pl-row-chevron" /> : trailing}
    </div>
  )
}
function Chip({ on = false, off = false, children }) {
  return <span className={`pl-chip${on ? ' pl-chip-on' : ''}${off ? ' pl-chip-off' : ''}`}>{children}</span>
}
function Note({ tone = '', icon, title, text }) {
  return (
    <div className={`pl-note${tone ? ` pl-note-${tone}` : ''}`}>
      {icon}
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
    </div>
  )
}
function Field({ label, children, placeholder = false, on = false, icon }) {
  return (
    <>
      {label && <span className="pl-field-label">{label}</span>}
      <div className={`pl-input${on ? ' pl-input-on' : ''}`}>
        {icon}
        <span className={placeholder ? 'pl-input-placeholder' : ''}>{children}</span>
        {on && <i className="pl-caret" />}
      </div>
    </>
  )
}

// LE SIGNE SIGNATURE : le pouls des créneaux. La ligne court de l'heure
// d'ouverture à la fermeture ; chaque créneau libre la fait battre à sa
// vraie heure. Le battement rouge est le créneau choisi.
function Pulse({ slots, selected, from = 7, to = 21, height = 46, mini = false, hours = false, fixed }) {
  const W = 300
  const H = height
  const base = Math.round(H * 0.7)
  const x = (h) => ((h - from) / (to - from)) * (W - 16) + 8
  const spike = (h) => {
    const c = x(h)
    const peak = mini ? 2 : 4
    return `M${c - 9} ${base} L${c - 5} ${base + H * 0.12} L${c - 1.5} ${peak} L${c + 3} ${H - 2} L${c + 6} ${base} L${c + 9} ${base}`
  }
  return (
    <div className="pl-pulse">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" preserveAspectRatio={fixed ? 'none' : undefined} style={fixed ? { height: fixed } : undefined}>
        <path className="pl-pulse-base" d={`M2 ${base} H${W - 2}`} />
        {slots.filter((h) => h !== selected).map((h) => <path key={h} className="pl-pulse-free" d={spike(h)} style={mini ? { strokeWidth: 1.7 } : undefined} />)}
        {selected !== undefined && (
          <>
            <path className="pl-pulse-on" d={spike(selected)} style={mini ? { strokeWidth: 1.8 } : undefined} />
            {!mini && <circle className="pl-pulse-dot" cx={x(selected) - 1.5} cy={4} r={4.5} />}
          </>
        )}
      </svg>
      {hours && (
        <div className="pl-pulse-hours pl-num">
          {[8, 12, 16, 20].map((h) => <span key={h} style={{ left: `${(x(h) / W) * 100}%` }}>{h} h</span>)}
        </div>
      )}
    </div>
  )
}

function CoachCard({ coach, slots, next, goto }) {
  return (
    <div className="pl-card pl-coach-card" {...onGo(goto)}>
      <Photo src={coach.face} />
      <div>
        <div className="pl-coach-top">
          <div><strong>{coach.name}</strong><small>{coach.job} · {coach.area}</small></div>
          <span className="pl-coach-price pl-num">{coach.price} € <small>/ h</small></span>
        </div>
        <div className="pl-coach-next">
          <Pulse slots={slots} height={20} mini />
          <span className="pl-num">{next}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION MOBILE · 01 TROUVER SON COACH
// ============================================================

function OnboardingScreen() {
  return (
    <div className="pl-content pl-content-bleed">
      <Photo src={PHOTO.sea} className="pl-onb-photo" alt="Séance de yoga face à la mer">
        <div className="pl-onb-skip"><Pill tone="glass">Passer</Pill></div>
        <div className="pl-onb-sticker"><Sparkles size={12} /> Les meilleurs coachs, sélectionnés</div>
      </Photo>
      <div className="pl-onb-mark"><AppMark large /></div>
      <div className="pl-onb-copy">
        <span className="pl-kicker">Pulso</span>
        <h1 className="pl-display">Le bon coach,<br /><em>au bon moment.</em></h1>
        <p className="pl-lead">Fitness, tennis, yoga, boxe… Choisissez votre coach à Monaco, réservez un créneau et payez en un geste.</p>
      </div>
      <div className="pl-onb-bottom">
        <div className="pl-dots"><i className="pl-dot-on" /><i /><i /></div>
        <UiButton goto="home">Découvrir les coachs <ArrowRight size={15} /></UiButton>
      </div>
    </div>
  )
}

function HomeScreen() {
  const cats = [
    ['Fitness', PHOTO.fitness, true],
    ['Tennis', PHOTO.tennis],
    ['Yoga', PHOTO.yoga],
    ['Boxe', PHOTO.boxing],
    ['Running', PHOTO.track],
    ['Pilates', PHOTO.pilates],
  ]
  return (
    <div className="pl-content pl-with-tab">
      <LargeHeader kicker={<span className="pl-place"><MapPin size={12} /> Monaco <ChevronDown size={12} /></span>} title="Bonjour" guest />
      <div className="pl-search-row">
        <Field placeholder icon={<Search size={14} />}>Un coach, un sport, un quartier</Field>
        <IconButton label="Filtres"><SlidersHorizontal size={16} /></IconButton>
      </div>
      <div className="pl-cats">
        {cats.map(([label, src, on]) => (
          <div key={label} className={`pl-cat${on ? ' pl-cat-on' : ''}`}>
            <Photo src={src} />
            <small>{label}</small>
          </div>
        ))}
      </div>
      <SectionHead action="Tout voir">Libres aujourd’hui</SectionHead>
      <CoachCard coach={COACH.marco} slots={[17]} next="17:00" goto="coach" />
      <CoachCard coach={COACH.hugo} slots={[9, 16]} next="16:00" />
      <SectionHead action="Tout voir">Prochain événement</SectionHead>
      <div className="pl-card pl-event-mini" {...onGo('event')}>
        <Photo src={PHOTO.run} />
        <div>
          <strong>Run & Brunch avec Marco Valenti</strong>
          <small className="pl-num">sam. 14 nov. · 8:30 · Port Hercule</small>
          <Pill tone="action">10 € la place</Pill>
        </div>
      </div>
      <TabBar active="home" />
    </div>
  )
}

function CoachScreen() {
  return (
    <div className="pl-content pl-content-bleed">
      <Photo src={PHOTO.coaching} className="pl-cover" alt="Marco Valenti en séance">
        <div className="pl-cover-tools">
          <IconButton glass goto="home" label="Retour"><ChevronLeft size={18} /></IconButton>
          <IconButton glass label="Partager"><Share2 size={16} /></IconButton>
        </div>
      </Photo>
      <div className="pl-coach-id">
        <Avatar src={FACE.marco} name="Marco" size="xl" />
        <div>
          <h1>Marco Valenti</h1>
          <small>Préparation physique · Larvotto</small>
        </div>
      </div>
      <div className="pl-coach-body">
        <div className="pl-facts">
          <div><strong className="pl-num">80 €</strong><small>de l’heure</small></div>
          <div><strong className="pl-num">1 h</strong><small>minimum</small></div>
          <div><strong><House size={15} style={{ margin: '0 auto' }} /></strong><small>se déplace</small></div>
        </div>
        <SectionHead action="Cette semaine">Ses créneaux</SectionHead>
        <div className="pl-card pl-slots-card">
          <div className="pl-segmented">
            <button>Auj.</button><button>Mar. 27</button><button>Mer. 28</button><button className="pl-seg-on">Jeu. 29</button>
          </div>
          <div style={{ marginTop: 10 }}><Pulse slots={[7, 12.5, 17, 18.5]} hours /></div>
          <div className="pl-chips pl-num">
            <Chip>7:00</Chip><Chip>12:30</Chip><Chip>17:00</Chip><Chip>18:30</Chip>
          </div>
        </div>
        <SectionHead>À propos</SectionHead>
        <p className="pl-about">Ancien préparateur physique en club pro. Renforcement, remise en forme et préparation aux courses, du débutant à l’athlète.</p>
        <SectionHead>Où ont lieu les séances</SectionHead>
        <div className="pl-card pl-list pl-where">
          <ListRow lead={<span className="pl-doc"><MapPin size={15} /></span>} title="Studio Larvotto" meta="Avenue Princesse Grace, Monaco" trailing={null} />
          <ListRow lead={<span className="pl-doc"><House size={15} /></span>} title="À domicile" meta="Dans tout Monaco, sur demande" trailing={null} />
        </div>
        <div className="pl-bottom-actions">
          <UiButton goto="slot">Choisir un créneau <ArrowRight size={15} /></UiButton>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION MOBILE · 02 RÉSERVER ET PAYER
// ============================================================

function SlotScreen() {
  const days = [['lun.', 26], ['mar.', 27], ['mer.', 28], ['jeu.', 29, true], ['ven.', 30], ['sam.', 31]]
  return (
    <div className="pl-content">
      <TopBar title="Réserver avec Marco" back="coach" />
      <div className="pl-days">
        {days.map(([d, n, on, off]) => (
          <div key={n} className={`pl-day${on ? ' pl-day-on' : ''}${off ? ' pl-day-off' : ''}`}>
            <small>{d}</small><strong className="pl-num">{n}</strong>
          </div>
        ))}
      </div>
      <div className="pl-card pl-pulse-card">
        <div className="pl-pulse-card-head">
          <strong>Jeudi 29 octobre</strong>
          <span><i className="pl-legend-line" /> 4 créneaux libres</span>
        </div>
        <Pulse slots={[7, 12.5, 17, 18.5]} selected={17} hours />
        <div className="pl-chips pl-num" style={{ marginTop: 10 }}>
          <Chip>7:00</Chip><Chip>12:30</Chip><Chip on>17:00</Chip><Chip>18:30</Chip>
        </div>
      </div>
      <span className="pl-field-label">Durée</span>
      <div className="pl-segmented pl-num">
        <button>1 h</button><button className="pl-seg-on">1 h 30</button><button>2 h</button>
      </div>
      <span className="pl-field-label">Lieu</span>
      <div className="pl-option pl-option-on">
        <i className="pl-radio pl-radio-on" />
        <div><strong>Studio Larvotto</strong><small>Confirmation immédiate</small></div>
      </div>
      <div className="pl-option">
        <i className="pl-radio" />
        <div><strong>À domicile</strong><small>Marco accepte ou refuse sous 24 h. Vous n’êtes débité qu’à l’acceptation.</small></div>
      </div>
      <div className="pl-bottom-actions">
        <div className="pl-sumbar">
          <div><small>1 h 30 · jeu. 17:00</small><strong className="pl-num">120 €</strong></div>
          <UiButton goto="signup">Continuer</UiButton>
        </div>
      </div>
    </div>
  )
}

function SignupScreen() {
  const rows = ['azertyuiop', 'qsdfghjklm']
  return (
    <div className="pl-content">
      <TopBar title="Votre compte" back="slot" />
      <div className="pl-auth-head">
        <h1 className="pl-title">Encore un pas pour réserver</h1>
        <p className="pl-lead">Un compte pour retrouver vos séances et vos billets.</p>
      </div>
      <div className="pl-auth-buttons">
        <UiButton tone="apple"><AppleMark /> Continuer avec Apple</UiButton>
        <UiButton tone="light"><GoogleMark /> Continuer avec Google</UiButton>
      </div>
      <div className="pl-or">ou avec votre e-mail</div>
      <Field label="E-mail" on>lea.fontana@</Field>
      <small className="pl-legal" style={{ marginTop: 10 }}>En continuant, vous acceptez les <b>conditions</b> et la <b>politique de confidentialité</b>.</small>
      <div className="pl-keyboard" aria-hidden="true">
        <div className="pl-kb-suggest"><span>gmail.com</span><span>icloud.com</span><span>outlook.fr</span></div>
        {rows.map((r) => <div key={r} className="pl-kb-row">{r.split('').map((k) => <span key={k}>{k}</span>)}</div>)}
        <div className="pl-kb-row"><span className="pl-kb-wide">⇧</span>{'wxcvbn'.split('').map((k) => <span key={k}>{k}</span>)}<span className="pl-kb-wide">⌫</span></div>
        <div className="pl-kb-row"><span className="pl-kb-wide">123</span><span>@</span><span className="pl-kb-space">espace</span><span>.</span><span className="pl-kb-go" {...onGo('recap')}>suivant</span></div>
      </div>
    </div>
  )
}

function RecapScreen() {
  return (
    <div className="pl-content">
      <TopBar title="Récapitulatif" back="signup" />
      <div className="pl-card pl-recap">
        <div className="pl-recap-head">
          <Avatar src={FACE.marco} name="Marco" size="lg" />
          <div><strong>Marco Valenti</strong><small>Préparation physique</small></div>
        </div>
        <div className="pl-recap-lines">
          <div><CalendarDays size={14} /><span className="pl-num">jeu. 29 oct. · 17:00 à 18:30</span></div>
          <div><MapPin size={14} />Studio Larvotto, avenue Princesse Grace</div>
        </div>
        <div className="pl-price pl-num">
          <div><span>80 € × 1 h 30</span><b>120 €</b></div>
          <div className="pl-price-total"><span>Total</span><b>120 €</b></div>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <Note icon={<CalendarCheck size={16} />} title="Annulation gratuite jusqu’à mer. 28 oct., 17:00" text="Ensuite, la séance n’est plus remboursable." />
      </div>
      <SectionHead>Paiement</SectionHead>
      <div className="pl-card pl-list">
        <ListRow lead={<span className="pl-pay-mark"><AppleMark />Pay</span>} title="Apple Pay" trailing={<i className="pl-radio pl-radio-on" />} />
        <ListRow lead={<span className="pl-doc"><CreditCard size={15} /></span>} title="Carte bancaire" meta="Visa •••• 4417" trailing={<i className="pl-radio" />} />
      </div>
      <div className="pl-bottom-actions">
        <UiButton goto="confirmed">Payer 120 €</UiButton>
        <small className="pl-legal">Paiement sécurisé par Stripe. Le reçu arrive par e-mail.</small>
      </div>
    </div>
  )
}

function ConfirmedScreen() {
  return (
    <div className="pl-content">
      <div className="pl-confirm">
        <Pulse slots={[17]} selected={17} from={9} to={23} height={64} />
        <span className="pl-kicker">Séance réservée</span>
        <h1 className="pl-display" style={{ marginTop: 8 }}>À jeudi, Léa.</h1>
        <p className="pl-lead">Marco a reçu votre réservation. Le reçu de paiement est dans votre boîte mail.</p>
      </div>
      <div className="pl-card pl-list pl-ticket-sum">
        <ListRow lead={<Avatar src={FACE.marco} name="Marco" size="sm" />} title="Marco Valenti" meta="Préparation physique" trailing={<span className="pl-coach-price pl-num">120 €</span>} />
        <ListRow lead={<span className="pl-doc"><CalendarDays size={15} /></span>} title="Jeudi 29 octobre" meta="17:00 à 18:30" trailing={null} />
        <ListRow lead={<span className="pl-doc"><MapPin size={15} /></span>} title="Studio Larvotto" meta="Avenue Princesse Grace" trailing={null} />
      </div>
      <div style={{ marginTop: 10 }}>
        <Note icon={<Bell size={15} />} title="Un rappel vous sera envoyé la veille" text="Annulation gratuite jusqu’à mercredi, 17:00." />
      </div>
      <div className="pl-bottom-actions">
        <UiButton tone="light"><CalendarPlus size={15} /> Ajouter à mon agenda</UiButton>
        <UiButton goto="bookings">Voir mes séances</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION MOBILE · 03 APRÈS LA RÉSERVATION
// ============================================================

function BookingsScreen() {
  return (
    <div className="pl-content pl-with-tab">
      <LargeHeader title="Mes séances" />
      <div className="pl-segmented"><button className="pl-seg-on">À venir</button><button>Passées</button></div>
      <div style={{ marginTop: 10 }}>
        <div className="pl-card pl-booking">
          <div className="pl-booking-head">
            <Avatar src={FACE.marco} name="Marco" size="md" />
            <div><strong>Marco Valenti</strong><small>Studio Larvotto</small></div>
            <Pill tone="positive"><CircleCheck size={11} /> Confirmée</Pill>
          </div>
          <div className="pl-booking-when pl-num">
            <span><CalendarDays size={13} />jeu. 29 oct. · 17:00</span>
            <span>120 €</span>
          </div>
          <div className="pl-booking-actions">
            <button className="pl-act"><Phone size={13} /> Appeler Marco</button>
            <button className="pl-act">Annuler</button>
          </div>
        </div>
        <div className="pl-card pl-booking">
          <div className="pl-booking-head">
            <Avatar src={COACH.clara.face} name="Clara" size="md" />
            <div><strong>Clara Rossi</strong><small>Pilates · à domicile</small></div>
            <Pill tone="warning"><Clock3 size={11} /> En attente</Pill>
          </div>
          <div className="pl-booking-when pl-num">
            <span><CalendarDays size={13} />sam. 31 oct. · 10:00</span>
            <span>70 €</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <Note tone="warning" icon={<Clock3 size={15} />} title="Clara répond avant demain, 10:00" text="Somme réservée sur votre carte, débitée seulement si elle accepte." />
          </div>
        </div>
      </div>
      <SectionHead>Terminée récemment</SectionHead>
      <div className="pl-card pl-list">
        <ListRow lead={<Avatar src={FACE.hugo} name="Hugo" size="sm" />} title="Hugo Marchetti" meta="24 oct. · avant 19:00" trailing={<button className="pl-act"><Flag size={12} /> Signaler</button>} />
      </div>
      <TabBar active="bookings" />
    </div>
  )
}

// ============================================================
// APPLICATION MOBILE · 04 STAGES ET ÉVÉNEMENTS
// ============================================================

function EventScreen() {
  return (
    <div className="pl-content pl-content-bleed">
      <Photo src={PHOTO.run} className="pl-event-hero" alt="Coureurs au lever du soleil">
        <div className="pl-cover-tools">
          <IconButton glass goto="home" label="Retour"><ChevronLeft size={18} /></IconButton>
          <IconButton glass label="Partager"><Share2 size={16} /></IconButton>
        </div>
        <div className="pl-event-hero-copy">
          <Pill tone="glass">Événement</Pill>
          <h1>Run & Brunch avec Marco Valenti</h1>
        </div>
      </Photo>
      <div className="pl-event-body">
        <div className="pl-event-facts">
          <div><CalendarDays size={16} /><div><strong>sam. 14 nov.</strong><small className="pl-num">8:30 à 11:00</small></div></div>
          <div><MapPin size={16} /><div><strong>Port Hercule</strong><small>Quai Albert Ier</small></div></div>
        </div>
        <div className="pl-card pl-headliner">
          <Avatar src={FACE.marco} name="Marco" size="md" />
          <div><strong>Marco Valenti</strong><small>En tête d’affiche</small></div>
          <ChevronRight size={15} className="pl-row-chevron" />
        </div>
        <div className="pl-seats">
          <div className="pl-seats-head pl-num"><span><b>12 places</b> restantes</span><span>28 sur 40</span></div>
          <div className="pl-seats-bar"><i style={{ width: '70%' }} /></div>
        </div>
        <SectionHead>Au programme</SectionHead>
        <div className="pl-card pl-list pl-program pl-num">
          <ListRow lead={<b>8:15</b>} title="Accueil et échauffement" trailing={null} />
          <ListRow lead={<b>8:30</b>} title="8 km en groupe, allure libre" trailing={null} />
          <ListRow lead={<b>9:45</b>} title="Brunch sur le port" trailing={null} />
        </div>
        <div className="pl-bottom-actions">
          <div className="pl-sumbar">
            <div><small>La place</small><strong className="pl-num">10 €</strong></div>
            <UiButton goto="seats">Prendre mes places</UiButton>
          </div>
          <small className="pl-legal">Billet non remboursable, sauf si l’événement est annulé.</small>
        </div>
      </div>
    </div>
  )
}

function SeatsScreen() {
  return (
    <div className="pl-content">
      <TopBar title="Vos places" back="event" />
      <div className="pl-card pl-stepper">
        <div><strong>Run & Brunch</strong><small className="pl-num">sam. 14 nov. · 10 € la place</small></div>
        <div className="pl-stepper-ctrl pl-num">
          <IconButton label="Une place de moins"><Minus size={15} /></IconButton>
          <b>2</b>
          <IconButton label="Une place de plus"><Plus size={15} /></IconButton>
        </div>
      </div>
      <SectionHead action="Modifier">Vos coordonnées</SectionHead>
      <div className="pl-card pl-list pl-buyer">
        <ListRow lead={<Avatar src={FACE.lea} name="Léa" size="sm" />} title="Léa Fontana" meta="lea.fontana@gmail.com · +377 6 12 34 56 78" trailing={null} />
      </div>
      <SectionHead>Un nom par billet</SectionHead>
      <div className="pl-ticket-field"><span>Billet 1</span><div className="pl-input">Léa Fontana</div></div>
      <div className="pl-ticket-field"><span>Billet 2</span><div className="pl-input">Thomas Rossi</div></div>
      <div style={{ marginTop: 12 }}>
        <Note icon={<Mail size={15} />} title="Pas de compte ? Aucun problème" text="Vos billets arrivent aussi par e-mail, en PDF." />
      </div>
      <div className="pl-bottom-actions">
        <div className="pl-sumbar">
          <div><small>2 places</small><strong className="pl-num">20 €</strong></div>
          <UiButton goto="ticket">Payer 20 €</UiButton>
        </div>
        <small className="pl-legal">Billets non remboursables, sauf annulation de l’événement.</small>
      </div>
    </div>
  )
}

function TicketScreen() {
  return (
    <div className="pl-content">
      <TopBar title="Billet confirmé" back="seats" action={<Share2 size={16} />} actionLabel="Partager" />
      <div className="pl-ticket">
        <Photo src={PHOTO.run}>
          <div className="pl-ticket-title"><strong>Run & Brunch</strong><small>avec Marco Valenti</small></div>
        </Photo>
        <div className="pl-ticket-body">
          <div className="pl-ticket-qr">
            <svg viewBox="-1 -1 23 23" shapeRendering="crispEdges" aria-label="QR code du billet"><path d={QR_PATH} fill="#21201c" /></svg>
          </div>
          <div className="pl-ticket-who"><strong>Léa Fontana</strong><small>Billet 1 sur 2 · valable une seule fois</small></div>
          <div className="pl-ticket-meta pl-num">
            <div><small>Date</small><strong>sam. 14 nov.</strong></div>
            <div><small>Ouverture</small><strong>8:15</strong></div>
            <div><small>Lieu</small><strong>Port Hercule</strong></div>
          </div>
        </div>
      </div>
      <div className="pl-dots" style={{ marginTop: 12 }}><i className="pl-dot-on" /><i /></div>
      <div className="pl-bottom-actions">
        <UiButton><Download size={15} /> Télécharger les 2 billets en PDF</UiButton>
        <small className="pl-legal">Aussi envoyés à lea.fontana@gmail.com</small>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION WEB · 05 LES COACHS
// ============================================================

function CoachSide({ active }) {
  const nav = [
    ['dash', LayoutDashboard, 'Tableau de bord', null, 'dashboard'],
    ['planning', CalendarDays, 'Planning', null, 'planning'],
    ['bookings', CalendarCheck, 'Réservations', 1, 'requests'],
    ['clients', Users, 'Clients', null],
    ['tickets', Ticket, 'Mes billets', null],
    ['profile', Settings, 'Profil et tarifs', null],
    ['money', Wallet, 'Versements', null],
    ['sub', ReceiptText, 'Abonnement', null],
  ]
  return (
    <aside className="pl-side">
      <div className="pl-side-brand"><AppMark /><strong>Pulso</strong><em>Coach</em></div>
      {nav.map(([id, icon, label, badge, goto]) => (
        <div key={id} className={`pl-nav${active === id ? ' pl-nav-on' : ''}`} {...onGo(goto)}>
          {createElement(icon, { size: 16 })}<span>{label}</span>{badge && <b>{badge}</b>}
        </div>
      ))}
      <div className="pl-side-account">
        <Avatar src={FACE.marco} name="Marco" size="sm" />
        <div><strong>Marco Valenti</strong><small>Coach · Monaco</small></div>
      </div>
    </aside>
  )
}

function BecomeCoachDesk() {
  return (
    <DeskFrame url="pulso.mc/devenir-coach" app={false}>
      <nav className="pl-site-nav">
        <Wordmark />
        <a>Événements</a>
        <a className="pl-site-nav-on">Devenir coach</a>
        <a>Aide</a>
        <DeskButton tone="light" goto="dashboard">Se connecter</DeskButton>
      </nav>
      <div className="pl-site-hero">
        <div>
          <span className="pl-kicker">Pour les meilleurs coachs</span>
          <h4>Vos séances réservées et payées, <em>sans commission.</em></h4>
          <p>Fitness, tennis, yoga, boxe, running : Pulso réunit les meilleurs coachs, à Monaco pour commencer. Vous fixez vos tarifs et vos créneaux, les clients réservent depuis l’application.</p>
          <div className="pl-site-cta">
            <DeskButton goto="dashboard">Créer mon compte coach <ArrowRight size={15} /></DeskButton>
            <small>Un abonnement mensuel,<br /><b>100 % du prix de vos séances</b> pour vous.</small>
          </div>
        </div>
        <div className="pl-site-visual">
          <Photo src={PHOTO.ropes} alt="Coach à l’entraînement" />
          <div className="pl-float pl-float-pulse">
            <strong>Vos créneaux de jeudi</strong>
            <Pulse slots={[7, 12.5, 18.5]} selected={17} hours />
          </div>
          <div className="pl-float pl-float-booking">
            <Avatar src={FACE.lea} name="Léa" size="md" />
            <div><strong>Nouvelle réservation</strong><small className="pl-num">Léa F. · jeu. 17:00 · 120 €</small></div>
          </div>
        </div>
      </div>
      <div className="pl-site-steps">
        {[['1', 'Créez votre profil', 'Photos, spécialités, tarif horaire, lieux de séance. Validé par l’équipe Pulso avant sa mise en ligne.'],
          ['2', 'Recevez les réservations', 'Chaque séance arrive dans votre planning, avec un e-mail. Les séances à domicile, vous les acceptez ou non.'],
          ['3', 'Soyez payé après la séance', 'Le paiement arrive sur votre compte 48 h après la séance, frais bancaires Stripe déduits.']].map(([n, t, p]) => (
          <div key={n} className="pl-d-card pl-site-step"><span>{n}</span><strong>{t}</strong><p>{p}</p></div>
        ))}
      </div>
    </DeskFrame>
  )
}

function CoachDashboardDesk() {
  const today = [
    ['7:00', '1 h', 'Thomas Rossi', 'Studio Larvotto', FACE.thomas, <Pill tone="positive" key="p">Payée</Pill>],
    ['12:30', '1 h', 'Inès Garnier', 'Studio Larvotto', FACE.ines, <Pill tone="positive" key="p">Payée</Pill>],
    ['18:30', '1 h 30', 'Julien Mercier', 'À domicile · Fontvieille', FACE.julien, <Pill tone="positive" key="p">Payée</Pill>],
  ]
  return (
    <DeskFrame url="pulso.mc/coach">
      <CoachSide active="dash" />
      <main className="pl-main">
        <div className="pl-main-top">
          <div><h3>Bonjour Marco</h3><small>Lundi 26 octobre</small></div>
          <div className="pl-main-tools"><IconButton label="Notifications"><Bell size={17} /></IconButton><DeskButton goto="planning"><CalendarDays size={15} /> Mon planning</DeskButton></div>
        </div>
        <div className="pl-main-body">
          <div className="pl-kpis">
            <div className="pl-d-card pl-kpi"><small>Séances cette semaine</small><strong className="pl-num">9</strong><span>dont 3 aujourd’hui</span></div>
            <div className="pl-d-card pl-kpi"><small>À recevoir</small><strong className="pl-num">840 €</strong><span>48 h après chaque séance</span></div>
            <div className="pl-d-card pl-kpi"><small>Demande à domicile</small><strong className="pl-num">1</strong><span style={{ color: 'var(--warning)' }}><Clock3 size={13} /> à traiter avant demain</span></div>
            <div className="pl-d-card pl-kpi"><small>Signalement</small><strong className="pl-num">1</strong><span><Flag size={13} /> votre réponse est attendue</span></div>
          </div>
          <div className="pl-split">
            <div className="pl-d-card pl-d-pad">
              <div className="pl-d-h"><strong>Aujourd’hui</strong><span>3 séances</span></div>
              <Pulse slots={[17]} height={46} fixed={40} />
              <div className="pl-today" style={{ marginTop: 6 }}>
                {today.map(([h, d, who, where, face, pill]) => (
                  <div key={h} className="pl-today-row">
                    <span className="pl-num">{h}<small>{d}</small></span>
                    <div className="pl-cell-person"><Avatar src={face} name={who} size="sm" /><div className="pl-row-copy"><strong>{who}</strong><small>{where}</small></div></div>
                    {pill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pl-todo">
                <div className="pl-todo-head">
                  <Avatar src={FACE.julien} name="Julien" size="md" />
                  <div><strong>Demande à domicile</strong><small>Julien Mercier · répondre avant demain, 9:00</small></div>
                </div>
                <p className="pl-num">Sam. 31 oct., 9:00 à 10:00 · 80 €<br />7 rue du Gabian, Fontvieille</p>
                <div className="pl-todo-actions"><DeskButton tone="light">Refuser</DeskButton><DeskButton goto="requests">Accepter</DeskButton></div>
              </div>
              <div className="pl-d-card pl-d-pad pl-payouts" style={{ marginTop: 10 }}>
                <div className="pl-d-h"><strong>Derniers versements</strong><span>Stripe</span></div>
                <div className="pl-list" style={{ padding: 0 }}>
                  <ListRow lead={<span className="pl-doc"><Wallet size={15} /></span>} title="Séance de Léa Fontana" meta="Versé le 24 oct." trailing={<div className="pl-amount pl-num"><b>117,95 €</b></div>} />
                  <ListRow lead={<span className="pl-doc"><Wallet size={15} /></span>} title="Séance de Thomas Rossi" meta="Versé le 23 oct." trailing={<div className="pl-amount pl-num"><b>78,55 €</b></div>} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DeskFrame>
  )
}

function PlanningDesk() {
  const days = [['Lun.', 26, [17], true], ['Mar.', 27, [7, 12.5, 17, 18.5]], ['Mer.', 28, [17]], ['Jeu.', 29, [7, 12.5, 18.5]], ['Ven.', 30, [17, 18.5]], ['Sam.', 31, [10, 11]], ['Dim.', 1, []]]
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const top = (h) => (h - 7) * 44 + 2
  const blocks = {
    0: [[7, 1, 'booked', 'Thomas', 'Studio'], [12.5, 1, 'booked', 'Inès', 'Studio'], [18.5, 1.5, 'booked', 'Julien', 'Domicile']],
    1: [[7, 1, 'free', 'Libre', '7:00'], [12.5, 1, 'free', 'Libre', '12:30'], [17, 1, 'free', 'Libre', '17:00'], [18.5, 1, 'free', 'Libre', '18:30']],
    2: [[7, 5, 'off', 'Absent', ''], [12.5, 1, 'booked', 'Thomas', 'Studio'], [17, 1, 'free', 'Libre', '17:00']],
    3: [[7, 1, 'free', 'Libre', '7:00'], [12.5, 1, 'free', 'Libre', '12:30'], [17, 1.5, 'booked', 'Léa', 'Studio'], [18.5, 1, 'free', 'Libre', '18:30']],
    4: [[7, 1, 'booked', 'Inès', 'Studio'], [17, 1, 'free', 'Libre', '17:00'], [18.5, 1, 'free', 'Libre', '18:30']],
    5: [[9, 1, 'pending', 'Julien', 'Domicile'], [10, 1, 'free', 'Libre', '10:00'], [11, 1, 'free', 'Libre', '11:00']],
    6: [[8, 12, 'off', 'Fermé', '']],
  }
  return (
    <DeskFrame url="pulso.mc/coach/planning">
      <CoachSide active="planning" />
      <main className="pl-main">
        <div className="pl-main-top">
          <div><h3>Planning</h3><small>Semaine du 26 octobre au 1er novembre</small></div>
          <div className="pl-main-tools">
            <IconButton label="Semaine précédente"><ChevronLeft size={17} /></IconButton>
            <IconButton label="Semaine suivante"><ChevronRight size={17} /></IconButton>
            <DeskButton tone="light"><Plus size={15} /> Ajouter une absence</DeskButton>
          </div>
        </div>
        <div className="pl-main-body">
          <div className="pl-legend">
            <span><i style={{ background: 'var(--action)' }} />Séance réservée</span>
            <span><i style={{ background: 'var(--action-soft)', boxShadow: 'inset 0 0 0 1.5px #9cc45a' }} />Créneau libre</span>
            <span><i style={{ background: 'var(--warning-soft)', boxShadow: 'inset 0 0 0 1.5px var(--warning)' }} />Demande à domicile</span>
            <span><i style={{ background: 'repeating-linear-gradient(135deg, var(--card-soft) 0 3px, var(--line-strong) 3px 6px)' }} />Absent ou fermé</span>
          </div>
          <div className="pl-split">
            <div className="pl-d-card pl-scroll-x" style={{ overflow: 'hidden' }}>
              <div className="pl-week">
                <div className="pl-week-head" />
                {days.map(([d, n, free, on]) => (
                  <div key={n} className={`pl-week-head${on ? ' pl-week-head-on' : ''}`}>
                    <small>{d}</small><strong className="pl-num">{n}</strong>
                    <small className="pl-week-free">{free.length ? `${free.length} libre${free.length > 1 ? 's' : ''}` : 'fermé'}</small>
                  </div>
                ))}
                <div>{hours.map((h) => <div key={h} className="pl-week-hour pl-num">{h}:00</div>)}</div>
                {days.map(([, n], i) => (
                  <div key={n} className="pl-week-col" style={{ height: hours.length * 44 }}>
                    {(blocks[i] || []).map(([h, len, kind, a, b]) => (
                      <div key={h} className={`pl-slot pl-slot-${kind}`} style={{ top: top(h), height: len * 44 - 4 }}>
                        <strong>{a}</strong>{b && <small>{b}</small>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="pl-d-card pl-d-pad pl-rule">
              <div className="pl-d-h"><strong>Mes créneaux habituels</strong><span>Modifier</span></div>
              <div className="pl-list" style={{ padding: 0 }}>
                <ListRow lead={<span className="pl-doc"><Clock3 size={15} /></span>} title="Lundi au vendredi" meta="7:00, 12:30, 17:00, 18:30 · 1 h minimum" trailing={null} />
                <ListRow lead={<span className="pl-doc"><Clock3 size={15} /></span>} title="Samedi" meta="9:00 à 12:00" trailing={null} />
              </div>
              <div className="pl-d-h" style={{ marginTop: 14 }}><strong>Exceptions</strong><span>1</span></div>
              <div className="pl-list" style={{ padding: 0 }}>
                <ListRow lead={<span className="pl-doc"><CalendarDays size={15} /></span>} title="Mercredi 28 octobre" meta="Absent le matin, jusqu’à 12:00" trailing={<button className="pl-act">Retirer</button>} />
              </div>
              <div style={{ marginTop: 14 }}>
                <Note icon={<Sparkles size={15} />} title="Une réservation remplit le créneau toute seule" text="Une séance annulée le libère aussitôt pour les autres clients." />
              </div>
            </div>
          </div>
        </div>
      </main>
    </DeskFrame>
  )
}

// La même page, sur le téléphone du coach : l'écran clé du web à 390 pt.
function RequestsWebScreen() {
  return (
    <div className="pl-content pl-content-web">
      <div className="pl-web-header"><Wordmark /><IconButton label="Menu"><Menu size={17} /></IconButton></div>
      <div className="pl-web-tabs"><span className="pl-web-tab-on">Demandes <b>1</b></span><span>À venir</span><span>Passées</span></div>
      <div className="pl-card pl-request">
        <div className="pl-booking-head">
          <Avatar src={FACE.julien} name="Julien" size="md" />
          <div><strong>Julien Mercier</strong><small>Séance à domicile</small></div>
          <Pill tone="warning"><Clock3 size={11} /> 23 h</Pill>
        </div>
        <div className="pl-request-lines pl-num">
          <span><CalendarDays size={13} />Sam. 31 oct. · 9:00 à 10:00</span>
          <span><MapPin size={13} />7 rue du Gabian, Fontvieille</span>
          <span><Wallet size={13} />80 €, débités s’il est accepté</span>
        </div>
        <div className="pl-request-actions">
          <UiButton tone="light">Refuser</UiButton>
          <UiButton>Accepter la séance</UiButton>
        </div>
      </div>
      <SectionHead action="Tout voir">Signalement à traiter</SectionHead>
      <div className="pl-card pl-booking">
        <div className="pl-booking-head">
          <Avatar src={FACE.thomas} name="Thomas" size="md" />
          <div><strong>Thomas Rossi · sam. 24 oct.</strong><small>« Fini 25 min plus tôt que prévu »</small></div>
        </div>
        <div className="pl-booking-actions">
          <button className="pl-act">Rembourser</button>
          <button className="pl-act">Donner ma version</button>
        </div>
      </div>
      <SectionHead>Ensuite</SectionHead>
      <div className="pl-card pl-list">
        <ListRow lead={<Avatar src={FACE.lea} name="Léa" size="sm" />} title="Léa Fontana" meta="jeu. 29 oct. · 17:00 · Studio" trailing={<Pill tone="positive">Confirmée</Pill>} />
        <div className="pl-booking-actions pl-agenda-action">
          <button className="pl-act"><CalendarPlus size={13} /> Ajouter à mon agenda</button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION WEB · 06 LA BILLETTERIE
// ============================================================

function EventWebScreen() {
  return (
    <div className="pl-content pl-content-web">
      <Photo src={PHOTO.run} className="pl-web-event-photo">
        <div className="pl-web-header"><span className="pl-wordmark" style={{ color: '#fff' }}><AppMark />Pulso</span><Pill tone="glass">Sans compte</Pill></div>
      </Photo>
      <h1 className="pl-title" style={{ marginTop: 12 }}>Run & Brunch avec Marco Valenti</h1>
      <p className="pl-lead pl-num" style={{ marginTop: 6 }}>sam. 14 nov. · 8:30 · Port Hercule · 10 €</p>
      <div className="pl-form-section">Vos coordonnées</div>
      <div className="pl-field-grid">
        <div><Field label="Prénom">Julien</Field></div>
        <div><Field label="Nom">Mercier</Field></div>
      </div>
      <Field label="E-mail, pour recevoir les billets">julien.mercier@orange.fr</Field>
      <Field label="Téléphone">+33 6 21 45 87 90</Field>
      <div className="pl-form-section">Les billets</div>
      <div className="pl-card pl-stepper" style={{ marginTop: 8 }}>
        <div><strong>Nombre de places</strong><small className="pl-num">12 restantes</small></div>
        <div className="pl-stepper-ctrl pl-num">
          <IconButton label="Une place de moins"><Minus size={15} /></IconButton><b>2</b><IconButton label="Une place de plus"><Plus size={15} /></IconButton>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div className="pl-ticket-field"><span>Billet 1</span><div className="pl-input">Julien Mercier</div></div>
        <div className="pl-ticket-field"><span>Billet 2</span><div className="pl-input pl-input-on"><span className="pl-input-placeholder">Prénom et nom</span></div></div>
        <small className="pl-legal" style={{ marginTop: 6, textAlign: 'left', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 5 }}><CircleAlert size={12} /> Indiquez le nom de la 2e personne.</small>
      </div>
      <div className="pl-bottom-actions">
        <UiButton>Payer 20 €</UiButton>
        <small className="pl-legal">Billets non remboursables, sauf annulation de l’événement. <b>Conditions de vente</b></small>
      </div>
    </div>
  )
}

function ScanWebScreen() {
  return (
    <div className="pl-content pl-content-web">
      <div className="pl-scan-head">
        <div><strong>Run & Brunch · sam. 14 nov.</strong><small>Code d’accès vérifié · 7K4P-92QX</small></div>
        <Pill tone="neutral"><ScanLine size={11} /> Scanner</Pill>
      </div>
      <div className="pl-viewfinder">
        <div className="pl-viewfinder-qr"><svg viewBox="-1 -1 23 23" shapeRendering="crispEdges" aria-hidden="true"><path d={QR_PATH} fill="#21201c" /></svg></div>
        <div className="pl-viewfinder-frame pl-viewfinder-frame-ok"><i /><i /><i /><i /></div>
      </div>
      <div className="pl-scan-result">
        <div className="pl-scan-result-top">
          <span className="pl-scan-ok"><CircleCheck size={22} /></span>
          <div><strong>Billet valide</strong><small>Billet 1 sur 2 · scanné à 8:21</small></div>
        </div>
        <div className="pl-scan-name">Léa Fontana</div>
        <div className="pl-scan-count pl-num"><span>Entrées</span><b>27 sur 40</b></div>
      </div>
      <div className="pl-card pl-list pl-scan-log pl-num">
        <ListRow lead={<span className="pl-scan-dot pl-scan-dot-bad"><X size={12} strokeWidth={3} /></span>} title="Déjà utilisé · Paul Lemaire" meta="Premier passage à 8:14, entrée refusée" trailing={null} />
      </div>
      <div className="pl-bottom-actions">
        <UiButton><ScanLine size={15} /> Scanner le billet suivant</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// APPLICATION WEB · 07 L'ADMINISTRATION
// ============================================================

function AdminSide({ active }) {
  const nav = [
    ['dash', LayoutDashboard, 'Tableau de bord'],
    ['coachs', ShieldCheck, 'Coachs', 2],
    ['users', Users, 'Particuliers'],
    ['bookings', CalendarCheck, 'Réservations'],
    ['reports', Flag, 'Signalements', 1, 'report'],
    ['events', Ticket, 'Événements', null, 'adminEvent'],
    ['payments', Wallet, 'Paiements'],
    ['settings', Settings, 'Réglages'],
  ]
  return (
    <aside className="pl-side">
      <div className="pl-side-brand"><AppMark /><strong>Pulso</strong><em>Admin</em></div>
      {nav.map(([id, icon, label, badge, goto]) => (
        <div key={id} className={`pl-nav${active === id ? ' pl-nav-on' : ''}`} {...onGo(goto)}>
          {createElement(icon, { size: 16 })}<span>{label}</span>{badge && <b>{badge}</b>}
        </div>
      ))}
      <div className="pl-side-account">
        <Avatar name="Équipe" size="sm" />
        <div><strong>Équipe Pulso</strong><small>Administrateur</small></div>
      </div>
    </aside>
  )
}

function ReportDesk() {
  const rows = [
    ['Inès Garnier', 'Karim Benali', 'Écourtée', '22 oct.', '75 €', <Pill tone="warning" key="w"><Clock3 size={11} /> À trancher</Pill>, true],
    ['Paul Lemaire', 'Hugo Marchetti', 'Coach absent', '20 oct.', '90 €', <Pill tone="positive" key="p"><CircleCheck size={11} /> Remboursé</Pill>],
    ['Nadia Kessler', 'Clara Rossi', 'Autre', '17 oct.', '70 €', <Pill tone="neutral" key="n">Refusé</Pill>],
  ]
  return (
    <DeskFrame url="pulso.mc/admin/signalements">
      <AdminSide active="reports" />
      <main className="pl-main">
        <div className="pl-main-top">
          <div><h3>Signalements</h3><small>1 à trancher · 14 traités ce mois-ci</small></div>
          <div className="pl-main-tools"><div className="pl-d-search"><Search size={15} /> Client, coach…</div><DeskButton tone="light"><ListFilter size={15} /> À trancher</DeskButton></div>
        </div>
        <div className="pl-main-body">
          <div className="pl-split">
            <div className="pl-d-card pl-scroll-x" style={{ overflow: 'hidden' }}>
              <table className="pl-table">
                <thead><tr><th>Client</th><th>Coach</th><th className="pl-right">Montant</th><th>Statut</th></tr></thead>
                <tbody>
                  {rows.map(([client, coach, why, date, amount, pill, on]) => (
                    <tr key={client} className={on ? 'pl-row-on' : ''}>
                      <td><strong>{client}</strong><small>{why} · {date}</small></td><td>{coach}</td><td className="pl-right pl-num"><strong>{amount}</strong></td><td>{pill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pl-pager"><span>1 à 3 sur 15</span><div><IconButton label="Page précédente"><ChevronLeft size={15} /></IconButton><IconButton label="Page suivante"><ChevronRight size={15} /></IconButton></div></div>
            </div>
            <div className="pl-d-card pl-d-pad pl-detail-panel">
              <div className="pl-d-h"><strong>Séance du jeu. 22 oct.</strong><Pill tone="warning">À trancher</Pill></div>
              <div className="pl-kv pl-num">
                <span>Séance</span><b>Boxe · 18:00 à 19:00 · 75 €</b>
                <span>Versement</span><b>Bloqué jusqu’à la décision</b>
              </div>
              <div className="pl-versions" style={{ marginTop: 12 }}>
                <div className="pl-version">
                  <div className="pl-version-head"><Avatar src={FACE.ines} name="Inès" size="sm" /><div><strong>Inès</strong><small>Cliente</small></div></div>
                  <p>« Arrivé à 18:20, séance finie à 18:35. »</p>
                </div>
                <div className="pl-version">
                  <div className="pl-version-head"><Avatar src={FACE.karim} name="Karim" size="sm" /><div><strong>Karim</strong><small>Coach</small></div></div>
                  <p>« Bouchon au tunnel, 20 min de retard, prévenue par SMS. »</p>
                </div>
              </div>
              <div className="pl-d-h" style={{ margin: '14px 0 8px' }}><strong>Décision</strong></div>
              <div className="pl-decision">
                <div className="pl-decision-opt"><i className="pl-radio" /><span>Rembourser tout</span><b className="pl-num">75 €</b></div>
                <div className="pl-decision-opt pl-decision-opt-on"><i className="pl-radio pl-radio-on" /><span>Rembourser une partie</span><span className="pl-amount-input pl-num">40 €</span></div>
                <div className="pl-decision-opt"><i className="pl-radio" /><span>Refuser, payer le coach</span></div>
              </div>
              <div className="pl-decision-foot"><DeskButton>Valider la décision</DeskButton><small>40 € rendus à Inès, 35 € versés à Karim</small></div>
            </div>
          </div>
        </div>
      </main>
    </DeskFrame>
  )
}

function AdminEventDesk() {
  return (
    <DeskFrame url="pulso.mc/admin/evenements/run-brunch">
      <AdminSide active="events" />
      <main className="pl-main">
        <div className="pl-main-top">
          <div><h3>Run & Brunch</h3><small>Sam. 14 nov. · en vente depuis le 12 oct.</small></div>
          <div className="pl-main-tools"><DeskButton tone="light"><Share2 size={15} /> Copier le lien de vente</DeskButton><DeskButton>Enregistrer</DeskButton></div>
        </div>
        <div className="pl-main-body">
          <div className="pl-split">
            <div className="pl-d-card pl-d-pad">
              <div className="pl-form-grid">
                <div className="pl-d-field pl-full"><label>Titre</label><div className="pl-input">Run & Brunch avec Marco Valenti</div></div>
                <div className="pl-d-field"><label>Coach en tête d’affiche</label><div className="pl-input"><Avatar src={FACE.marco} name="Marco" size="sm" />Marco Valenti<ChevronDown size={15} style={{ marginLeft: 'auto' }} /></div></div>
                <div className="pl-d-field"><label>Zone</label><div className="pl-input">Monaco<ChevronDown size={15} style={{ marginLeft: 'auto' }} /></div></div>
                <div className="pl-d-field"><label>Date et heure</label><div className="pl-input pl-num"><CalendarDays size={15} />14 nov. 2026 · 8:30 à 11:00</div></div>
                <div className="pl-d-field"><label>Lieu</label><div className="pl-input"><MapPin size={15} />Port Hercule, quai Albert Ier</div></div>
                <div className="pl-d-field"><label>Prix de la place, toutes taxes comprises</label><div className="pl-input pl-num">10 €</div></div>
                <div className="pl-d-field"><label>Nombre de places</label><div className="pl-input pl-num">40</div><small>28 vendues, impossible de descendre sous ce nombre.</small></div>
                <div className="pl-d-field pl-full"><label>Description</label><div className="pl-input pl-input-area">8 km en groupe le long du port à allure libre, puis brunch sur le quai. Tous niveaux.</div></div>
                <div className="pl-d-field pl-full"><label>Remboursement</label><div className="pl-input">Non remboursable (par défaut)<ChevronDown size={15} style={{ marginLeft: 'auto' }} /></div><small>En cas d’annulation de l’événement, tous les billets sont remboursés automatiquement.</small></div>
              </div>
              <div className="pl-danger-zone" style={{ marginTop: 16 }}>
                <small>Annuler l’événement rembourse les 28 billets et prévient chaque acheteur par e-mail.</small>
                <DeskButton tone="danger"><X size={15} /> Annuler l’événement</DeskButton>
              </div>
            </div>
            <div>
              <div className="pl-d-card pl-d-pad pl-sales">
                <div className="pl-d-h"><strong>Ventes</strong><span>Tout voir</span></div>
                <strong className="pl-num">28 / 40</strong><small className="pl-num">280 € encaissés · 12 places restantes</small>
                <div className="pl-seats-bar" style={{ marginTop: 10 }}><i style={{ width: '70%' }} /></div>
              </div>
              <div className="pl-d-card pl-d-pad" style={{ marginTop: 10 }}>
                <div className="pl-d-h"><strong>Accès au scanner</strong><Pill tone="positive">Actif</Pill></div>
                <div className="pl-code"><small>Code à donner à l’équipe à l’entrée</small><strong>7K4P-92QX</strong></div>
                <small className="pl-legal pl-num" style={{ marginTop: 8 }}>Valable du ven. 13 nov. au sam. 14 nov., 23:59. Page : pulso.mc/scan</small>
                <div className="pl-code-actions"><DeskButton tone="light"><Copy size={14} /> Copier</DeskButton><DeskButton tone="light" goto="scan"><RefreshCw size={14} /> Nouveau code</DeskButton></div>
              </div>
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

const MOBILE_FLOWS = [
  {
    n: '01',
    title: 'Trouver son coach',
    note: 'On découvre les coachs sans créer de compte. Les créneaux libres du jour se lisent d’un coup d’œil.',
    mockups: [
      { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier des 3 écrans de présentation', screen: <OnboardingScreen />, lightBar: true, notes: ['Passable à tout moment'] },
      { id: 'home', title: 'Accueil', subtitle: 'Libres aujourd’hui, puis le prochain événement', screen: <HomeScreen />, notes: ['Fitness, tennis, yoga, boxe…', 'Cliquable : Marco'] },
      { id: 'coach', title: 'Fiche coach', subtitle: 'Son tarif, ses créneaux, ses lieux', screen: <CoachScreen />, lightBar: true, tall: true, scroll: true, notes: ['Le pouls : un pic = un créneau libre'] },
    ],
  },
  {
    n: '02',
    title: 'Réserver et payer',
    note: 'Un créneau, une durée, un lieu, puis le paiement. Le compte n’est demandé qu’au moment de réserver.',
    mockups: [
      { id: 'slot', title: 'Choix du créneau', subtitle: 'Date, heure, durée et lieu', screen: <SlotScreen />, notes: ['Prix calculé tout seul', 'À domicile : le coach accepte d’abord'] },
      { id: 'signup', title: 'Création de compte', subtitle: 'Apple, Google ou e-mail, clavier ouvert', screen: <SignupScreen />, notes: ['Prénom, nom, téléphone et ville juste après'] },
      { id: 'recap', title: 'Récapitulatif et paiement', subtitle: 'Apple Pay ou carte, via Stripe', screen: <RecapScreen />, notes: ['Règle d’annulation affichée avant de payer'] },
      { id: 'confirmed', title: 'Séance réservée', subtitle: 'Confirmation et ajout à l’agenda', screen: <ConfirmedScreen />, notes: ['Le coach reçoit un e-mail'] },
    ],
  },
  {
    n: '03',
    title: 'Après la réservation',
    note: 'Toutes les séances au même endroit : confirmées, en attente du coach ou à signaler.',
    mockups: [
      { id: 'bookings', title: 'Mes séances', subtitle: 'Appeler, annuler, signaler un problème', screen: <BookingsScreen />, notes: ['Signalement possible 48 h après la séance'] },
    ],
  },
  {
    n: '04',
    title: 'Stages et événements',
    note: 'Les événements créés par Pulso, avec un coach en tête d’affiche. Avec ou sans compte, un QR code par personne.',
    mockups: [
      { id: 'event', title: 'Fiche événement', subtitle: 'Le coach, le lieu, les places restantes', screen: <EventScreen />, lightBar: true, notes: ['Non remboursable, affiché avant l’achat'] },
      { id: 'seats', title: 'Achat des places', subtitle: 'Un nom par billet', screen: <SeatsScreen />, notes: ['Cliquable : Payer'] },
      { id: 'ticket', title: 'Billet confirmé', subtitle: 'QR code, PDF, e-mail', screen: <TicketScreen />, notes: ['Un billet = une seule entrée'] },
    ],
  },
]

const WEB_FLOWS = [
  {
    n: '05',
    title: 'Les coachs',
    note: 'Tout se gère sur le site, sur ordinateur comme sur téléphone. L’abonnement des coachs ne passe jamais par l’application.',
    mockups: [
      { id: 'become', title: 'Devenir coach', subtitle: 'La page publique pour recruter les coachs', desk: <BecomeCoachDesk />, notes: ['Prix de l’abonnement réglé par l’administrateur'] },
      { id: 'dashboard', title: 'Tableau de bord du coach', subtitle: 'Sa journée, ses demandes, ses versements', desk: <CoachDashboardDesk />, notes: ['Payé 48 h après la séance'] },
      { id: 'planning', title: 'Planning et disponibilités', subtitle: 'La semaine, les créneaux habituels, les absences', desk: <PlanningDesk />, notes: ['Une réservation remplit le créneau, une annulation le libère'] },
      { id: 'requests', title: 'Les demandes, sur téléphone', subtitle: 'Le même site, depuis le téléphone du coach', screen: <RequestsWebScreen />, url: 'pulso.mc/coach/reservations', notes: ['Accepter ou refuser en un geste', 'Chaque séance s’ajoute à son agenda en un geste'] },
    ],
  },
  {
    n: '06',
    title: 'La billetterie',
    note: 'Le lien de l’événement se partage sur les réseaux. À l’entrée, un simple code suffit pour scanner.',
    mockups: [
      { id: 'eventweb', title: 'Achat sans compte', subtitle: 'Depuis un lien partagé sur Instagram', screen: <EventWebScreen />, url: 'pulso.mc/evenements/run-brunch', lightBar: true, tall: true, scroll: true, notes: ['Erreur écrite sous le champ concerné'] },
      { id: 'scan', title: 'Scanner à l’entrée', subtitle: 'Sans compte, avec le code de l’événement', screen: <ScanWebScreen />, url: 'pulso.mc/scan', night: true, notes: ['Mode sombre, lisible le soir', 'Déjà scanné : entrée refusée'] },
    ],
  },
  {
    n: '07',
    title: 'L’administration',
    note: 'Réservée au compte de Pulso : coachs, signalements, événements, zones Monaco et France.',
    mockups: [
      { id: 'report', title: 'Trancher un signalement', subtitle: 'Les deux versions côte à côte', desk: <ReportDesk />, notes: ['Le coach n’est payé qu’après la décision'] },
      { id: 'adminEvent', title: 'Créer et suivre un événement', subtitle: 'Ventes, code du scanner, annulation', desk: <AdminEventDesk />, notes: ['Nouveau code : l’ancien ne marche plus'] },
    ],
  },
]

function MockupCard({ mockup }) {
  const wide = Boolean(mockup.desk)
  return (
    <article id={`mk-${mockup.id}`} className={`pl-mockup-card${wide ? ' pl-mockup-card-wide' : ''}`}>
      <div className="pl-card-head">
        <h3>{mockup.title}</h3>
        <p>{mockup.subtitle}</p>
        {(mockup.scroll || mockup.notes) && (
          <div className="pl-annotations">
            {mockup.scroll && <span className="pl-scroll-chip"><ChevronDown size={12} /> Écran défilable</span>}
            {(mockup.notes || []).map((n) => <span key={n}>{n}</span>)}
          </div>
        )}
      </div>
      {wide
        ? mockup.desk
        : <div className="pl-export-wrap"><PhoneFrame tall={mockup.tall} lightBar={mockup.lightBar} url={mockup.url} night={mockup.night}>{mockup.screen}</PhoneFrame></div>}
    </article>
  )
}

function Flow({ flow }) {
  return (
    <section className="pl-flow">
      <div className="pl-flow-head"><span>{flow.n}</span><h2>{flow.title}</h2><p>{flow.note}</p></div>
      <div className="pl-gallery">{flow.mockups.map((m) => <MockupCard key={m.id} mockup={m} />)}</div>
    </section>
  )
}

// La charte (couleurs, textes, pouls) : gardée pour la V2, masquée en V1.
// Passer SHOW_CHARTE à true pour l'afficher en haut de la page.
const SHOW_CHARTE = false

function Charte() {
  return (
    <section className="pl-flow">
      <div className="pl-flow-head"><span>00</span><h2>L’identité de Pulso</h2><p>Sobre, minimaliste, haut de gamme : noir, blanc, et une seule touche de couleur.</p></div>
      <div className="pl-charte">
        <div>
          <h3>Les couleurs, chacune a un rôle</h3>
          <div className="pl-swatches">
            <div className="pl-swatch"><i style={{ background: '#111210' }} /><div><strong>Noir profond</strong><span>le fond de l’application, sobre et élégant</span></div></div>
            <div className="pl-swatch"><i style={{ background: '#bdee63' }} /><div><strong>Citron</strong><span>la seule couleur vive : le bouton principal et le pouls</span></div></div>
            <div className="pl-swatch"><i style={{ background: '#eceeec' }} /><div><strong>Blanc</strong><span>les textes, et le fond des outils de travail</span></div></div>
            <div className="pl-swatch"><i style={{ background: 'var(--positive)' }} /><div><strong>Vert</strong><span>une séance confirmée, un billet valide</span></div></div>
            <div className="pl-swatch"><i style={{ background: 'var(--warning)' }} /><div><strong>Ambre</strong><span>en attente d’une réponse</span></div></div>
          </div>
        </div>
        <div>
          <h3>Les textes</h3>
          <div className="pl-type-sample">
            <div><b style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em' }}>Le bon coach</b><span>titres en Inter Tight, serrés et affirmés</span></div>
            <div><b style={{ fontSize: 16, fontWeight: 800 }}>Marco Valenti · 80 € / h</b><span>noms et prix, nets et lisibles</span></div>
            <div><b style={{ fontSize: 13 }}>Texte courant en Inter, simple et clair partout.</b><span>le texte que l’on lit le plus</span></div>
          </div>
          <div className="pl-charte-buttons">
            <UiButton>Action principale, une par écran</UiButton>
            <UiButton tone="light">Action secondaire</UiButton>
          </div>
        </div>
        <div>
          <h3>Le signe de Pulso : le pouls</h3>
          <div className="pl-charte-pulse">
            <Pulse slots={[7, 12.5, 17, 18.5]} selected={17} hours />
            <p>La ligne représente la journée d’un coach. Chaque battement est un créneau libre, à sa vraie heure ; le battement citron, c’est celui que vous choisissez. Un coach chargé bat peu, un coach disponible bat souvent.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PulsoMockupsPage() {
  return (
    <main className="pulso-mockups-page">
      <section className="pl-landing-hero">
        <p className="pl-eyebrow">Proposition d’accompagnement</p>
        <h1>Maquettes visuelles</h1>
        <p className="pl-reference">Pulso · {REFERENCE}</p>
        <p className="pl-disclaimer">
          Aperçu rapide pour visualiser l’idée : toutes les pages ne sont pas illustrées
          et le design n’est pas définitif (couleurs, logo, typo). Non contractuel.
        </p>
        <span className="pl-proto-note"><Sparkles size={14} /> Maquette interactive, touchez les boutons</span>
      </section>

      {SHOW_CHARTE && <Charte />}

      {MOBILE_FLOWS.map((flow) => <Flow key={flow.n} flow={flow} />)}
      {WEB_FLOWS.map((flow) => <Flow key={flow.n} flow={flow} />)}
    </main>
  )
}
