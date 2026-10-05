import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  GripVertical,
  Home,
  ListMusic,
  Lock,
  MapPin,
  Mic,
  Navigation,
  PartyPopper,
  Plus,
  Search,
  Receipt,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Timer,
  TriangleAlert,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import './aretha-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// ARETHA, MAQUETTE V1 refaite (5 octobre 2026)
// Avant signature : aperçu non contractuel, pas tous les écrans.
// Thème « Scène » : encre et laiton, jour pour gérer, nuit pour le Jour J.
// Architecture reprise de BailoraMockups.jsx (référence du guide V2).
// Guides : nowork/documentation/guides/creation-maquette.md (V1)
//          nowork/documentation/guides/creation-maquette-v2.md (discipline)
// Fil conducteur demandé par Noé : le plus simple possible pour l'utilisateur.
// Un écran = un travail, un seul bouton principal.
// ============================================================

// Photos de profil : numéros fixes, jamais d'URL aléatoire. Sans réseau,
// l'initiale reste visible sous la photo.
const FACE = {
  noemie: 'https://i.pravatar.cc/160?img=45',
  camille: 'https://i.pravatar.cc/160?img=32',
  thomas: 'https://i.pravatar.cc/160?img=12',
  hugo: 'https://i.pravatar.cc/160?img=33',
  sami: 'https://i.pravatar.cc/160?img=68',
  clara: 'https://i.pravatar.cc/160?img=47',
  julien: 'https://i.pravatar.cc/160?img=51',
}

// Prototype cliquable : les vrais boutons naviguent entre les cartes.
function goTo(id) {
  const el = document.getElementById(`mk-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function StatusBar({ light = false }) {
  return (
    <div className={`ar-statusbar${light ? ' ar-statusbar-light' : ''}`}>
      <span>9:41</span>
      <div className="ar-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false, night = false }) {
  return (
    <div className={`ar-phone-export${tall ? ' ar-phone-export-tall' : ''}`}>
      <div className={`ar-phone${night ? ' ar-phone-night' : ''}`}>
        <div className="ar-screen">
          <StatusBar light={night} />
          {children}
          <div className="ar-home-indicator" />
        </div>
      </div>
    </div>
  )
}

// Logo provisoire : le « A » à empattements, encre sur laiton. Le micro en
// carré noir a été jugé pas esthétique (Noé, 5 octobre 2026). Le logo
// définitif se dessine après signature (CGV 8.7), il remplacera ce seul bloc.
function AppMark({ large = false }) {
  return (
    <div className={`ar-app-mark${large ? ' ar-app-mark-large' : ''}`} aria-label="Aretha">
      <span>A</span>
    </div>
  )
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
  return (
    <button
      className={`ar-ui-button${tone ? ` ar-ui-button-${tone}` : ''}`}
      onClick={goto ? () => goTo(goto) : undefined}
    >
      {children}
    </button>
  )
}

function IconButton({ children, goto }) {
  return <button className="ar-icon-button" onClick={goto ? () => goTo(goto) : undefined}>{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`ar-pill ar-pill-${tone}`}>{children}</span>
}

function Avatar({ src, name, size = 'md' }) {
  return (
    <span className={`ar-avatar ar-avatar-${size}`}>
      <span className="ar-avatar-initial">{name.charAt(0)}</span>
      {src && <img src={src} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />}
    </span>
  )
}

function TopBar({ title, back = false, action, goBack, goAction }) {
  return (
    <div className="ar-topbar">
      {back
        ? <IconButton goto={goBack}><ChevronRight className="ar-back-icon" size={18} /></IconButton>
        : <span role="button" tabIndex={0} onClick={() => goTo('settings')} className="ar-topbar-avatar"><Avatar src={FACE.noemie} name="Noémie" size="top" /></span>}
      <strong className="ar-topbar-title">{title}</strong>
      {action ? <IconButton goto={goAction}>{action}</IconButton> : <span />}
    </div>
  )
}

// Quatre onglets, pas un de plus : le profil passe par la photo, en haut.
function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <Home size={19} />, label: 'Accueil', goto: 'dashboard' },
    { id: 'events', icon: <CalendarDays size={19} />, label: 'Concerts', goto: 'event' },
    { id: 'music', icon: <ListMusic size={19} />, label: 'Répertoire', goto: 'setlist' },
    { id: 'money', icon: <Wallet size={19} />, label: 'Finances', goto: 'finances' },
  ]
  return (
    <div className="ar-tabbar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`ar-tab${active === tab.id ? ' ar-tab-active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => goTo(tab.goto)}
        >
          {tab.icon}
          <small>{tab.label}</small>
        </div>
      ))}
    </div>
  )
}

function SectionHead({ children, action }) {
  return <div className="ar-section-head"><strong>{children}</strong>{action && <span>{action}</span>}</div>
}

function Row({ lead, title, meta, trailing, goto }) {
  return (
    <div className="ar-row" role={goto ? 'button' : undefined} tabIndex={goto ? 0 : undefined} onClick={goto ? () => goTo(goto) : undefined}>
      {lead}
      <div className="ar-row-copy">
        <strong>{title}</strong>
        {meta && <small>{meta}</small>}
      </div>
      {trailing === undefined ? <ChevronRight size={15} className="ar-row-chevron" /> : trailing}
    </div>
  )
}

function Chip({ on = false, children }) {
  return <span className={`ar-chip${on ? ' ar-chip-on' : ''}`}>{on && <Check size={11} strokeWidth={3} />}{children}</span>
}

// ============================================================
// 01 · UNE DEMANDE ARRIVE
// ============================================================

function LoginScreen() {
  return (
    <div className="ar-content">
      <div className="ar-lang"><span className="ar-lang-on">FR</span><span>EN</span></div>
      <div className="ar-login-hero">
        <AppMark large />
        <p className="ar-eyebrow-app">Aretha</p>
        <h1 className="ar-display">Toute votre vie d’artiste, au même endroit.</h1>
        <p className="ar-lead">Les demandes, les cachets, les setlists et le Jour J. Sans tableur, sans fil WhatsApp.</p>
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="form"><AppleMark /> Continuer avec Apple</UiButton>
        <UiButton tone="light" goto="form"><GoogleMark /> Continuer avec Google</UiButton>
        <UiButton tone="light" goto="form">Continuer avec l’e-mail</UiButton>
        <small className="ar-legal">En continuant, vous acceptez les <b>conditions</b> et la <b>politique de confidentialité</b>.</small>
      </div>
    </div>
  )
}

function ClientFormScreen() {
  return (
    <div className="ar-content ar-content-web">
      <div className="ar-browser"><Lock size={10} /> aretha.app/noemie</div>
      <div className="ar-artist">
        <Avatar src={FACE.noemie} name="Noémie" size="lg" />
        <div>
          <strong>Noémie</strong>
          <small>Chanteuse · jazz & soul · Marseille</small>
        </div>
      </div>
      <h1 className="ar-title">Parlez-moi de votre événement</h1>
      <div className="ar-field-label">Type d’événement</div>
      <div className="ar-chips">
        <Chip on>Mariage</Chip><Chip>Anniversaire</Chip><Chip>Entreprise</Chip><Chip>Autre</Chip>
      </div>
      <div className="ar-field-grid">
        <div><div className="ar-field-label">Date</div><div className="ar-input"><CalendarDays size={13} /> 21 nov. 2026</div></div>
        <div><div className="ar-field-label">Ville</div><div className="ar-input"><MapPin size={13} /> Marseille</div></div>
      </div>
      <div className="ar-field-label">Pour un mariage, quels moments ?</div>
      <div className="ar-chips">
        <Chip>Cérémonie</Chip><Chip on>Cocktail</Chip><Chip on>Soirée dansante</Chip>
      </div>
      <div className="ar-field-label">Vos coordonnées</div>
      <div className="ar-input">Camille Bernard · camille.b@mail.fr</div>
      <div className="ar-bottom-actions">
        <UiButton goto="dashboard">Envoyer ma demande <ArrowRight size={15} /></UiButton>
        <small className="ar-legal">Sans compte. Vous recevez une confirmation par e-mail.</small>
      </div>
    </div>
  )
}

function DashboardScreen() {
  return (
    <div className="ar-content ar-with-tab">
      <TopBar title="Bonjour Noémie" action={<Bell size={17} />} />
      <div className="ar-month" role="button" tabIndex={0} onClick={() => goTo('finances')}>
        <span><i className="ar-dot ar-dot-paid" /><b className="ar-num">3 400 €</b> encaissés</span>
        <span><i className="ar-dot ar-dot-wait" /><b className="ar-num">1 350 €</b> en attente</span>
      </div>
      <div className="ar-hero" role="button" tabIndex={0} onClick={() => goTo('event')}>
        <div className="ar-hero-top">
          <span>Prochain concert</span>
          <span className="ar-num">sam. 14 nov. · 21:00</span>
        </div>
        <h2>Mariage de Léa et Thomas</h2>
        <p><MapPin size={12} /> Domaine de la Roseraie, Aix</p>
        <div className="ar-hero-bottom">
          <div><small>Cachet</small><strong className="ar-num">1 200 €</strong></div>
          <Pill tone="gold">Acompte reçu</Pill>
        </div>
      </div>

      <SectionHead action="1 nouvelle">Demandes</SectionHead>
      <div className="ar-card ar-request">
        <div className="ar-request-head">
          <Avatar src={FACE.camille} name="Camille" />
          <div>
            <strong>Camille Bernard</strong>
            <small>Mariage · sam. 21 nov. · Marseille</small>
          </div>
        </div>
        <div className="ar-request-actions">
          <button className="ar-act ar-act-main" onClick={() => goTo('finances')}><Check size={13} strokeWidth={2.6} /> Accepter</button>
          <button className="ar-act">Plus d’infos</button>
          <button className="ar-act">Refuser</button>
        </div>
      </div>

      <SectionHead>À faire</SectionHead>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-dot ar-dot-gold" />} title="Envoyer le devis à Camille" meta="800 € · mariage du 21 nov." goto="finances" />
        <Row lead={<span className="ar-dot" />} title="Valider la setlist du 14 nov." meta="Léa et Thomas ont choisi 2 titres" goto="setlist" />
      </div>
      <TabBar active="home" />
    </div>
  )
}

// ============================================================
// 02 · L'ARGENT
// ============================================================

function FinancesScreen() {
  return (
    <div className="ar-content ar-with-tab">
      <TopBar title="Finances" action={<Plus size={18} />} />
      <div className="ar-money">
        <small>Encaissé en novembre</small>
        <strong className="ar-num">3 400 €</strong>
        <span className="ar-num">1 350 € en attente · 2 factures</span>
      </div>
      <div className="ar-alert">
        <TriangleAlert size={15} />
        <div><strong>Une facture attend depuis 32 jours</strong><small>Hôtel Le Pavillon · 650 €</small></div>
        <button className="ar-act ar-act-main">Relancer</button>
      </div>
      <div className="ar-segmented"><button className="ar-seg-on">Tout</button><button>Devis</button><button>Factures</button></div>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-doc"><Receipt size={15} /></span>} title="Léa et Thomas" meta="Facture F-2026-021" trailing={<div className="ar-amount"><b className="ar-num">1 200 €</b><Pill tone="paid">Acompte reçu</Pill></div>} goto="invoice" />
        <Row lead={<span className="ar-doc"><Receipt size={15} /></span>} title="Hôtel Le Pavillon" meta="Facture F-2026-019" trailing={<div className="ar-amount"><b className="ar-num">650 €</b><Pill tone="late">En retard</Pill></div>} />
        <Row lead={<span className="ar-doc"><FileText size={15} /></span>} title="Camille Bernard" meta="Devis D-2026-034" trailing={<div className="ar-amount"><b className="ar-num">800 €</b><Pill>À envoyer</Pill></div>} />
      </div>
      <small className="ar-footnote">Micro-entreprise · TVA non applicable</small>
      <TabBar active="money" />
    </div>
  )
}

function InvoiceScreen() {
  return (
    <div className="ar-content">
      <TopBar title="Facture F-2026-021" back goBack="finances" action={<Share2 size={16} />} />
      <div className="ar-paper">
        <div className="ar-paper-head">
          <div><strong>Noémie</strong><small>SIRET 912 345 678 00012</small></div>
          <span className="ar-paper-tag">Facture</span>
        </div>
        <div className="ar-paper-meta">
          <div><small>Pour</small><strong>Léa et Thomas Martin</strong></div>
          <div><small>Date</small><strong className="ar-num">2 nov. 2026</strong></div>
        </div>
        <div className="ar-paper-lines">
          <div><span>Chant, 2 sets de 45 min</span><strong className="ar-num">1 000 €</strong></div>
          <div><span>Déplacement à Aix</span><strong className="ar-num">200 €</strong></div>
          <div><span>Acompte reçu le 20 oct.</span><strong className="ar-num">− 360 €</strong></div>
          <div className="ar-paper-total"><span>Reste à payer</span><strong className="ar-num">840 €</strong></div>
        </div>
        {/* LE CLIENT PAIE HORS DE L'APP, par virement : l'IBAN de l'artiste est
            sur la facture, l'app ne fait que suivre le paiement (devis, ligne 6).
            Le seul achat dans l'app est l'abonnement Premium de l'artiste. */}
        <div className="ar-paper-iban"><small>Règlement par virement</small><strong className="ar-num">FR76 3000 4000 0312 3456 7890 143</strong></div>
        <p className="ar-paper-note">TVA non applicable, art. 293 B du CGI. À régler avant le 14 nov. 2026.</p>
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="event"><Send size={15} /> Envoyer à Léa et Thomas</UiButton>
        <UiButton tone="light"><Download size={15} /> Télécharger le PDF</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// 03 · PRÉPARER LE CONCERT
// ============================================================

function EventScreen() {
  return (
    <div className="ar-content">
      <TopBar title="Concert" back goBack="dashboard" action={<Share2 size={16} />} />
      <Pill tone="paid">Confirmé</Pill>
      <h1 className="ar-title ar-title-event">Mariage de Léa et Thomas</h1>
      <p className="ar-meta-line"><CalendarDays size={13} /> sam. 14 nov. · 21:00 <MapPin size={13} /> Aix</p>
      <div className="ar-stat-pair">
        <div><small>Cachet</small><strong className="ar-num">1 200 €</strong></div>
        <div><small>Durée</small><strong className="ar-num">2 × 45 min</strong></div>
      </div>
      <SectionHead action="4 personnes">L’équipe</SectionHead>
      <div className="ar-card ar-team">
        {[['Thomas', FACE.thomas, 'Piano', true], ['Hugo', FACE.hugo, 'Ingé son', true], ['Sami', FACE.sami, 'DJ', true], ['Clara', FACE.clara, 'Chœurs', false]].map(([n, src, role, ok]) => (
          <div key={n} className="ar-team-member">
            <span className="ar-team-face"><Avatar src={src} name={n} />{ok && <i className="ar-team-ok"><Check size={8} strokeWidth={4} /></i>}</span>
            <strong>{n}</strong>
            <small>{role}</small>
          </div>
        ))}
      </div>
      <SectionHead>Préparation</SectionHead>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-check ar-check-on"><Check size={11} strokeWidth={3} /></span>} title="Devis signé, acompte reçu" meta="360 € le 20 oct." trailing={null} />
        <Row lead={<span className="ar-check ar-check-on"><Check size={11} strokeWidth={3} /></span>} title="Setlist validée" meta="12 titres, dont 2 choisis par les mariés" goto="setlist" />
        <Row lead={<span className="ar-check" />} title="Rider envoyé à l’équipe" meta="automatique le 11 nov., 72 h avant" trailing={null} />
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="live">Ouvrir le Jour J <ArrowRight size={15} /></UiButton>
      </div>
    </div>
  )
}

// LE CLIENT CHOISIT SES TITRES dans le répertoire de l'artiste (CDC :
// « Suggestion côté client » et « Action client : valider, modifier ou
// laisser l'artiste décider »). C'est l'artiste qui remplit son répertoire ;
// le client ne voit que ses chansons, triées par moment de la soirée.
function SongPickScreen() {
  const songs = [
    ['At Last', 'Etta James', true, true],
    ['La Vie en rose', 'Édith Piaf', true, false],
    ['L-O-V-E', 'Nat King Cole', false, true],
    ['Can’t Help Falling in Love', 'Elvis Presley', false, false],
  ]
  return (
    <div className="ar-content ar-content-web">
      <div className="ar-browser"><Lock size={10} /> aretha.app/noemie/titres</div>
      <p className="ar-pick-for">Léa et Thomas · mariage du 14 nov.</p>
      <h1 className="ar-title">Choisissez vos titres</h1>
      <p className="ar-lead ar-pick-lead">Dans le répertoire de Noémie, moment par moment.</p>
      <div className="ar-chips ar-pick-moments">
        <Chip>Cocktail</Chip><Chip on>Première danse</Chip><Chip>Soirée</Chip>
      </div>
      <div className="ar-input ar-pick-search"><Search size={13} /> Chercher parmi 86 titres</div>
      <div className="ar-card ar-list">
        {songs.map(([t, a, picked, advised]) => (
          <div key={t} className="ar-row">
            <span className={`ar-check${picked ? ' ar-check-on' : ''}`}>{picked && <Check size={11} strokeWidth={3} />}</span>
            <div className="ar-row-copy"><strong>{t}</strong><small>{advised ? <em>Conseillé pour ce moment</em> : a}</small></div>
          </div>
        ))}
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="setlist">Valider mes 2 titres <ArrowRight size={15} /></UiButton>
        <button className="ar-text-link">Laisser Noémie choisir</button>
      </div>
    </div>
  )
}

function SetlistScreen() {
  // Le set 2 ouvre le bal : c'est là que tombent les deux titres choisis
  // par les mariés sur l'écran précédent (Jour J : 22:30).
  const songs = [
    ['At Last', 'Etta James', '3:00', 'Choisi par les mariés'],
    ['La Vie en rose', 'Édith Piaf', '3:07', 'Choisi par les mariés'],
    ['Valerie', 'Amy Winehouse', '3:53', null],
    ['Feeling Good', 'Nina Simone', '3:52', null],
    ['Fly Me to the Moon', 'Frank Sinatra', '2:28', null],
  ]
  return (
    <div className="ar-content ar-with-tab">
      <TopBar title="Setlist · 14 nov." back goBack="event" action={<Plus size={18} />} />
      <div className="ar-set-head">
        <div><strong>Set 2 · ouverture du bal</strong><small>Glissez un titre pour changer l’ordre</small></div>
        <span className="ar-num">12 titres · 44 min</span>
      </div>
      <div className="ar-card ar-list">
        {songs.map(([t, a, d, tag], i) => (
          <div key={t} className="ar-song">
            <GripVertical size={14} className="ar-grip" />
            <span className="ar-song-n ar-num">{i + 1}</span>
            <div className="ar-row-copy"><strong>{t}</strong><small>{tag ? <em>{tag}</em> : a}</small></div>
            <span className="ar-song-d ar-num">{d}</span>
          </div>
        ))}
      </div>
      <div className="ar-suggest" role="button" tabIndex={0}>
        <Sparkles size={15} />
        <div><strong>3 titres conseillés pour un mariage</strong><small>d’après vos chansons et l’ambiance demandée</small></div>
        <ChevronRight size={15} />
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="rehearsal"><Share2 size={15} /> Partager à l’équipe</UiButton>
      </div>
      <TabBar active="music" />
    </div>
  )
}

function RehearsalScreen() {
  const team = [
    ['Thomas', FACE.thomas, 'Piano', 'yes'],
    ['Hugo', FACE.hugo, 'Ingé son', 'yes'],
    ['Sami', FACE.sami, 'DJ', 'maybe'],
    ['Clara', FACE.clara, 'Chœurs', 'none'],
  ]
  const label = { yes: ['paid', 'Oui'], maybe: ['late', 'Peut-être'], none: ['neutral', 'Pas répondu'] }
  return (
    <div className="ar-content">
      <TopBar title="Répétition" back goBack="setlist" />
      <div className="ar-card ar-rehearsal">
        <div className="ar-date-block"><small>jeu.</small><strong className="ar-num">12</strong><small>nov.</small></div>
        <div>
          <strong>19:00 à 21:00</strong>
          <small><MapPin size={11} /> Studio Pigalle, Marseille</small>
          <small><Mic size={11} /> Pour le mariage du 14 nov.</small>
        </div>
      </div>
      <SectionHead action="2 sur 4">Présences</SectionHead>
      <div className="ar-card ar-list">
        {team.map(([n, src, role, st]) => (
          <Row key={n} lead={<Avatar src={src} name={n} size="sm" />} title={n} meta={role} trailing={<Pill tone={label[st][0]}>{label[st][1]}</Pill>} />
        ))}
      </div>
      <div className="ar-note">
        <Bell size={15} />
        <div><strong>Rappels automatiques</strong><small>2 jours avant et 2 heures avant. Clara sera relancée demain.</small></div>
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="crew"><Send size={15} /> Relancer Clara</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// 04 · LE JOUR J
// ============================================================

function CrewScreen() {
  return (
    <div className="ar-content ar-content-web">
      <div className="ar-browser"><Lock size={10} /> aretha.app/equipe</div>
      <div className="ar-crew-hello">
        <Avatar src={FACE.thomas} name="Thomas" size="md" />
        <div><strong>Bonjour Thomas</strong><small>Invité par Noémie, sans compte à créer</small></div>
      </div>
      <div className="ar-card ar-crew-hero">
        <small>Demain · Mariage de Léa et Thomas</small>
        <div className="ar-crew-call">
          <div><span>Ton heure d’arrivée</span><strong className="ar-num">17:30</strong></div>
          <button className="ar-act"><Navigation size={13} /> Itinéraire</button>
        </div>
        <p><MapPin size={12} /> Domaine de la Roseraie, Aix-en-Provence</p>
      </div>
      <SectionHead>Ta feuille de route</SectionHead>
      <div className="ar-card ar-sheet">
        {[['17:30', 'Arrivée et installation'], ['18:00', 'Balances avec tout le groupe'], ['20:30', 'Set 1 · cocktail'], ['22:30', 'Set 2 · ouverture du bal']].map(([h, t]) => (
          <div key={h}><span className="ar-num">{h}</span><strong>{t}</strong></div>
        ))}
      </div>
      <div className="ar-files">
        <span><ListMusic size={13} /> Setlist</span>
        <span><FileText size={13} /> Rider</span>
      </div>
      <div className="ar-bottom-actions">
        <UiButton goto="live"><Check size={15} strokeWidth={2.6} /> Je serai là</UiButton>
      </div>
    </div>
  )
}

function LiveScreen() {
  const steps = [
    ['17:30', 'Arrivée de l’équipe', 'done', '4 sur 4'],
    ['18:00', 'Balances', 'done', null],
    ['20:30', 'Set 1 · cocktail', 'done', null],
    ['21:45', 'Entrée des mariés', 'now', '3 sur 4 prêts'],
    ['22:30', 'Set 2 · ouverture du bal', 'next', null],
    ['00:30', 'Fin du concert', 'next', null],
  ]
  return (
    <div className="ar-content ar-night">
      <div className="ar-live-top">
        <span className="ar-live-badge"><i /> En direct</span>
        <span className="ar-num">21:41</span>
      </div>
      <h1 className="ar-title ar-live-title">Mariage de Léa et Thomas</h1>
      <p className="ar-live-sub">Domaine de la Roseraie · étape 4 sur 6</p>
      <div className="ar-timeline">
        {steps.map(([h, t, st, who]) => (
          <div key={h} className={`ar-step ar-step-${st}`}>
            <span className="ar-step-h ar-num">{h}</span>
            <span className="ar-step-dot">{st === 'done' && <Check size={9} strokeWidth={4} />}</span>
            <div><strong>{t}</strong>{who && <small>{who}</small>}</div>
          </div>
        ))}
      </div>
      <div className="ar-bottom-actions">
        <div className="ar-toast"><Timer size={14} /> Retard de 10 min envoyé à l’équipe</div>
        <UiButton tone="gold"><Check size={16} strokeWidth={2.6} /> Étape terminée</UiButton>
        <UiButton tone="danger-ghost"><Clock3 size={15} /> Signaler un retard</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// 05 · LE COMPTE
// ============================================================

function PaywallScreen() {
  return (
    <div className="ar-content">
      <div className="ar-paywall-close"><IconButton><X size={16} /></IconButton></div>
      <div className="ar-paywall-hero">
        <AppMark large />
        <h1 className="ar-display">Aretha Premium</h1>
        <p className="ar-lead">Le Jour J reste gratuit, pour toujours.</p>
      </div>
      <div className="ar-card ar-list ar-benefits">
        <Row lead={<Check size={14} className="ar-benefit-check" />} title="Demandes et devis illimités" trailing={null} />
        <Row lead={<Check size={14} className="ar-benefit-check" />} title="Factures en PDF et alertes de paiement" trailing={null} />
        <Row lead={<Check size={14} className="ar-benefit-check" />} title="Setlists et répétitions illimitées" trailing={null} />
      </div>
      <div className="ar-plans">
        <div className="ar-plan ar-plan-on">
          <Pill tone="gold">2 mois offerts</Pill>
          <strong>Annuel</strong>
          <b className="ar-plan-price ar-num">79,99 € / an</b>
        </div>
        <div className="ar-plan">
          <strong>Mensuel</strong>
          <b className="ar-plan-price ar-num">7,99 € / mois</b>
        </div>
      </div>
      <div className="ar-bottom-actions">
        <button className="ar-text-link">Restaurer un achat</button>
        <UiButton goto="settings">Passer à Premium</UiButton>
        <small className="ar-legal">Renouvellement automatique, annulable à tout moment dans vos réglages Apple.</small>
        <small className="ar-legal ar-legal-links"><b>Conditions</b> · <b>Confidentialité</b> · <b>Mentions légales</b></small>
      </div>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="ar-content">
      <TopBar title="Réglages" back goBack="dashboard" />
      <div className="ar-card ar-profile">
        <Avatar src={FACE.noemie} name="Noémie" size="lg" />
        <div><strong>Noémie</strong><small>Chanteuse · jazz & soul</small></div>
        <Pill tone="gold">Premium</Pill>
      </div>
      <SectionHead>Mon activité</SectionHead>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-doc"><Receipt size={15} /></span>} title="Statut juridique" meta="Micro-entreprise · TVA non applicable" />
        <Row lead={<span className="ar-doc"><PartyPopper size={15} /></span>} title="Mes prestations" meta="Mariage, anniversaire, entreprise" />
        <Row lead={<span className="ar-doc"><Users size={15} /></span>} title="Mon équipe" meta="4 personnes" />
      </div>
      <SectionHead>Notifications</SectionHead>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-doc"><Bell size={15} /></span>} title="Nouvelles demandes" trailing={<span className="ar-toggle ar-toggle-on" />} />
        <Row lead={<span className="ar-doc"><Clock3 size={15} /></span>} title="Rappels du Jour J" trailing={<span className="ar-toggle ar-toggle-on" />} />
        <Row lead={<span className="ar-doc"><Wallet size={15} /></span>} title="Paiements reçus" trailing={<span className="ar-toggle" />} />
      </div>
      <SectionHead>Préférences</SectionHead>
      <div className="ar-card ar-list">
        <Row lead={<span className="ar-doc ar-doc-text">FR</span>} title="Langue" trailing={<div className="ar-mini-seg"><span className="ar-mini-on">FR</span><span>EN</span></div>} />
        <Row lead={<span className="ar-doc"><Sparkles size={15} /></span>} title="Premium annuel" meta="Renouvellement le 12 nov. 2027" goto="paywall" />
      </div>
      <div className="ar-legal-block">
        <span><b>Conditions</b> · <b>Confidentialité</b> · <b>Mentions légales</b></span>
        <button className="ar-text-link ar-text-danger">Supprimer mon compte</button>
        <small>Version 1.0.0</small>
      </div>
    </div>
  )
}

function AdminScreen() {
  const artists = [
    ['Noémie', FACE.noemie, 'Marseille', 'gold', 'Premium'],
    ['Julien Moreau', FACE.julien, 'Lyon', 'neutral', 'Gratuit'],
    ['Inès Dahan', null, 'Paris', 'gold', 'Premium'],
    ['Malik Benali', null, 'Toulouse', 'neutral', 'Gratuit'],
    ['Chloé Martin', null, 'Nantes', 'gold', 'Premium'],
  ]
  return (
    <div className="ar-content">
      <TopBar title="Administration" back goBack="settings" action={<ShieldCheck size={17} />} />
      <div className="ar-stat-pair">
        <div><small>Artistes inscrits</small><strong className="ar-num">214</strong><span>+ 18 ce mois-ci</span></div>
        <div><small>En Premium</small><strong className="ar-num">61</strong><span>29 %</span></div>
      </div>
      <div className="ar-card ar-mix">
        <small>Concerts gérés ce mois-ci</small>
        <strong className="ar-num">386</strong>
        <div className="ar-mix-bar"><i style={{ width: '71%' }} /></div>
        <span>71 % avec un Jour J suivi en direct</span>
      </div>
      <SectionHead action="Tout voir">Artistes</SectionHead>
      <div className="ar-card ar-list">
        {artists.map(([n, src, city, tone, plan]) => (
          <Row key={n} lead={<Avatar src={src} name={n} size="sm" />} title={n} meta={city} trailing={<Pill tone={tone}>{plan}</Pill>} />
        ))}
        <Row lead={<Avatar name="Studio" size="sm" />} title="Studio Nova" meta="Signalé 3 fois" trailing={<button className="ar-act ar-act-danger">Bloquer</button>} />
      </div>
    </div>
  )
}

// ============================================================
// LA PAGE
// ============================================================

const FLOWS = [
  {
    n: '01',
    title: 'Une demande arrive',
    note: 'Le client remplit un lien, sans compte. La demande arrive sur l’accueil de l’artiste, qui répond en un geste.',
    mockups: [
      { id: 'login', title: 'Connexion', subtitle: 'Apple, Google ou e-mail', screen: <LoginScreen />, notes: ['Français ou anglais dès l’ouverture'] },
      { id: 'form', title: 'Formulaire client', subtitle: 'Une page par lien, sans compte', screen: <ClientFormScreen />, notes: ['Les questions s’adaptent au type d’événement', 'Cliquable : Envoyer'] },
      { id: 'dashboard', title: 'Accueil de l’artiste', subtitle: 'Le prochain concert, puis les demandes', screen: <DashboardScreen />, notes: ['Accepter en un geste', 'Cliquable : Accepter'] },
    ],
  },
  {
    n: '02',
    title: 'L’argent',
    note: 'Le devis naît de la demande acceptée, la facture du devis signé. Rien n’est ressaisi.',
    mockups: [
      { id: 'finances', title: 'Cachets, devis et factures', subtitle: 'Ce qui est payé, ce qui attend', screen: <FinancesScreen />, notes: ['Les retards en premier', 'Cliquable : la facture'] },
      { id: 'invoice', title: 'La facture', subtitle: 'Prête à envoyer, en PDF', screen: <InvoiceScreen />, notes: ['Mentions adaptées au statut de l’artiste', 'Le client paie par virement'] },
    ],
  },
  {
    n: '03',
    title: 'Préparer le concert',
    note: 'Tout ce qui concerne un concert au même endroit : l’équipe, la setlist, les répétitions.',
    mockups: [
      { id: 'event', title: 'Fiche du concert', subtitle: 'L’équipe et ce qui reste à préparer', screen: <EventScreen />, notes: ['Cliquable : Ouvrir le Jour J'] },
      { id: 'pick', title: 'Le choix des mariés', subtitle: 'Côté client, par lien, sans compte', screen: <SongPickScreen />, notes: ['Seulement les chansons de l’artiste', 'Cliquable : Valider'] },
      { id: 'setlist', title: 'Setlist', subtitle: 'Glisser-déposer, durée calculée', screen: <SetlistScreen />, notes: ['Les choix des mariés repérés'] },
      { id: 'rehearsal', title: 'Répétition', subtitle: 'Qui vient, qui n’a pas répondu', screen: <RehearsalScreen />, notes: ['Rappels envoyés tout seuls'] },
    ],
  },
  {
    n: '04',
    title: 'Le Jour J',
    note: 'Chaque membre de l’équipe reçoit sa feuille de route la veille. Le soir même, tout le monde suit le même déroulé, en direct.',
    mockups: [
      { id: 'crew', title: 'Espace équipe', subtitle: 'Par lien, sans compte à créer', screen: <CrewScreen />, notes: ['Son heure d’arrivée en grand'] },
      { id: 'live', title: 'Jour J en direct', subtitle: 'Le déroulé, minute par minute', screen: <LiveScreen />, night: true, notes: ['Mode nuit, lisible en coulisses', 'Un retard prévient toute l’équipe'] },
    ],
  },
  {
    n: '05',
    title: 'Le compte',
    note: 'Un plan gratuit pour commencer, Premium pour aller plus loin. Le Jour J reste toujours inclus.',
    mockups: [
      { id: 'paywall', title: 'Premium', subtitle: 'Annuel ou mensuel, via les stores', screen: <PaywallScreen />, notes: ['Prix indicatifs'] },
      { id: 'settings', title: 'Réglages', subtitle: 'Statut, prestations, notifications, langue', screen: <SettingsScreen />, tall: true, scroll: true, notes: ['Ses prestations remplissent le formulaire client'] },
      { id: 'admin', title: 'Administration', subtitle: 'Réservé à la propriétaire de l’application', screen: <AdminScreen /> },
    ],
  },
]

function MockupCard({ mockup }) {
  return (
    <article id={`mk-${mockup.id}`} className="ar-mockup-card">
      <div className="ar-card-head">
        <h3>{mockup.title}</h3>
        <p>{mockup.subtitle}</p>
        {(mockup.scroll || mockup.notes) && (
          <div className="ar-annotations">
            {mockup.scroll && <span className="ar-scroll-chip"><ChevronDown size={12} /> Écran défilable</span>}
            {(mockup.notes || []).map((n) => <span key={n}>{n}</span>)}
          </div>
        )}
      </div>
      <div className="ar-export-wrap">
        <PhoneFrame tall={mockup.tall} night={mockup.night}>{mockup.screen}</PhoneFrame>
      </div>
    </article>
  )
}

export default function ArethaMockupsPage() {
  return (
    <main className="aretha-mockups-page">
      <section className="ar-landing-hero">
        <p className="ar-eyebrow">Proposition d’accompagnement</p>
        <h1>Maquettes visuelles</h1>
        <p className="ar-reference">Aretha · MOB-2026-092</p>
        <p className="ar-disclaimer">
          Aperçu rapide pour visualiser l’idée : toutes les pages ne sont pas illustrées
          et le design n’est pas définitif (couleurs, logo, typo). Non contractuel.
        </p>
        <span className="ar-proto-note"><Sparkles size={14} /> Maquette interactive, touchez les boutons</span>
      </section>

      {FLOWS.map((flow) => (
        <section key={flow.n} className="ar-flow">
          <div className="ar-flow-head">
            <span>{flow.n}</span>
            <h2>{flow.title}</h2>
            <p>{flow.note}</p>
          </div>
          <div className="ar-gallery">
            {flow.mockups.map((mockup) => <MockupCard key={mockup.id} mockup={mockup} />)}
          </div>
        </section>
      ))}
    </main>
  )
}
