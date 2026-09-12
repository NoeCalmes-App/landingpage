import {
  ArrowRight,
  Banknote,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Flag,
  Home,
  Inbox,
  Lock,
  MapPin,
  MessageCircle,
  Plus,
  Ruler,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
  Users,
  X,
} from 'lucide-react'
import './immomatch-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// IMMOMATCH · maquette V1 (avant-vente, liée au devis)
// Vendeurs volontaires · acheteurs qualifiés · matching.
// Thème : émeraude patrimoine + crème, photos réelles.
// Périmètre : bloc « Écrans prévus dans la première version » du CDC.
// ============================================================

// Photos stables (guide creation-maquette : pravatar déterministe,
// Unsplash en URL directe). Connexion internet requise à l'affichage.
const FACE = {
  marc: 'https://i.pravatar.cc/96?img=33',
  camille: 'https://i.pravatar.cc/96?img=44',
  hugo: 'https://i.pravatar.cc/96?img=13',
  nadia: 'https://i.pravatar.cc/96?img=26',
  julien: 'https://i.pravatar.cc/96?img=59',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  caude: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
  chartrons: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
  pessac: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
}

function StatusBar() {
  return (
    <div className="im-statusbar">
      <span>9:41</span>
      <div className="im-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="im-phone-export">
      <div className="im-phone">
        <div className="im-screen">
          <StatusBar />
          {children}
          <div className="im-home-indicator" />
        </div>
      </div>
    </div>
  )
}

// Logo provisoire : le toit + la rencontre (deux points qui se rejoignent).
function ImmoMatchLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.2 12 4l9 7.2" />
      <path d="M5.4 10v9h13.2v-9" />
      <circle cx="9.4" cy="15" r="1.55" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="15" r="1.55" fill="currentColor" stroke="none" />
    </svg>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`im-app-mark${large ? ' im-app-mark-large' : ''}`}>
      <ImmoMatchLogo size={large ? 30 : 18} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`im-ui-button im-ui-button-${tone} ${className}`}>{children}</button>
}

function InlineButton({ children, tone = '', className = '' }) {
  return <button className={`im-inline-button${tone ? ` im-inline-button-${tone}` : ''} ${className}`}>{children}</button>
}

function IconButton({ children }) {
  return <button className="im-icon-button">{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`im-pill im-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md' }) {
  return <span className={`im-avatar im-avatar-${size}`}><img src={src} alt="" /></span>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`im-screen-title${centered ? ' im-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, back = false, avatar, action, meta }) {
  return (
    <div className="im-topbar">
      {back
        ? <IconButton><ChevronLeft size={18} /></IconButton>
        : <span className="im-topbar-avatar"><img src={avatar || FACE.marc} alt="" /></span>}
      <div className="im-topbar-title">
        <strong>{title}</strong>
        {meta && <span>{meta}</span>}
      </div>
      {action ? <IconButton>{action}</IconButton> : <span className="im-topbar-spacer" />}
    </div>
  )
}

function TabBar({ variant = 'vendeur', active = 'home' }) {
  const tabs = variant === 'vendeur'
    ? [
        { id: 'home', icon: <Home size={20} />, label: 'Accueil' },
        { id: 'requests', icon: <Inbox size={20} />, label: 'Demandes' },
        { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
        { id: 'profile', icon: <User size={20} />, label: 'Profil' },
      ]
    : [
        { id: 'matches', icon: <Sparkles size={20} />, label: 'Matchs' },
        { id: 'search', icon: <Search size={20} />, label: 'Projet' },
        { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
        { id: 'profile', icon: <User size={20} />, label: 'Profil' },
      ]
  return (
    <div className="im-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`im-tab${t.id === active ? ' im-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function SectionLabel({ children }) {
  return <div className="im-section-label">{children}</div>
}

function Note({ tone = 'brand', icon, title, text }) {
  return (
    <div className={`im-note im-note-${tone}`}>
      {icon}
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
    </div>
  )
}

function Field({ label, icon, value, soft = false }) {
  return (
    <div className="im-field">
      <label>{label}</label>
      <div className={`im-input${soft ? ' im-input-soft' : ''}`}>{icon}{value}</div>
    </div>
  )
}

/* ───────────────────────── Écrans ───────────────────────── */

// 1 · Ouverture (onboarding) — choix vendre / acheter
function OnboardingScreen() {
  return (
    <div className="im-content im-onboarding">
      <div className="im-hero-wrap">
        <div className="im-hero-photo">
          <img src={PHOTO.hero} alt="" />
          <div className="im-hero-glow" />
          <span className="im-hero-badge">🔕 Fin de la prospection</span>
        </div>
        <div className="im-hero-mark"><AppMark large /></div>
      </div>
      <div className="im-onboarding-copy">
        <ScreenTitle
          centered
          eyebrow="IMMOMATCH"
          title="Vendez sans subir la prospection."
          subtitle="Vous déclarez votre bien quand vous le décidez. Nous vous présentons des acheteurs qualifiés, jamais l'inverse."
        />
      </div>
      <div className="im-onboarding-actions">
        <UiButton>Je souhaite vendre<ArrowRight size={16} /></UiButton>
        <UiButton tone="secondary">Je souhaite acheter</UiButton>
        <p className="im-legal-note">Connexion par email et mot de passe. En continuant, vous acceptez les CGU et la politique de confidentialité.</p>
      </div>
    </div>
  )
}

// 2 · Création de la fiche du bien — étape prix, délai, confidentialité
function PropertyCreateScreen() {
  return (
    <div className="im-content">
      <TopBar back title="Mon bien" meta="Étape 3 sur 3" />
      <div className="im-step-progress"><span style={{ width: '92%' }} /></div>
      <ScreenTitle title="Prix, délai et confidentialité" />
      <Field label="Prix souhaité" icon={<Banknote size={15} />} value="420 000 €" />
      <div className="im-field">
        <label>Délai de vente</label>
        <div className="im-chips">
          <span className="im-chip">Dès que possible</span>
          <span className="im-chip im-chip-on">Sous 3 mois</span>
          <span className="im-chip">Sous 6 mois</span>
        </div>
      </div>
      <SectionLabel>Confidentialité</SectionLabel>
      <div className="im-panel">
        <div className="im-toggle-row">
          <span className="im-list-ico im-ico-brand"><ShieldCheck size={16} /></span>
          <div><strong>Vendeur invisible</strong><small>Coordonnées et adresse exacte masquées jusqu'à votre accord.</small></div>
          <span className="im-toggle im-toggle-on" />
        </div>
        <div className="im-toggle-row">
          <span className="im-list-ico im-ico-gold"><Lock size={16} /></span>
          <div><strong>Mode confidentiel</strong><small>Visible uniquement des profils qui correspondent.</small></div>
          <span className="im-toggle" />
        </div>
      </div>
      <div className="im-bottom-actions">
        <UiButton>Prévisualiser et publier<ArrowRight size={16} /></UiButton>
        {/* Un vendeur peut avoir deux biens à placer : une succession, un
            déménagement en deux temps. Sans cette porte, il doit publier
            celui-ci puis chercher où recommencer. */}
        <UiButton tone="secondary"><Plus size={16} />Ajouter un autre bien</UiButton>
      </div>
    </div>
  )
}

// 3 · Tableau de bord vendeur
function SellerDashboardScreen() {
  return (
    <div className="im-content im-pad-tab">
      <TopBar title="Bonjour Marc" avatar={FACE.marc} action={<Bell size={17} />} />
      <div className="im-photo-card">
        <img className="im-card-photo" src={PHOTO.caude} alt="" />
        <div className="im-photo-overlay" />
        <div className="im-photo-body">
          <div className="im-photo-head">
            <Pill tone="glass">En ligne</Pill>
            <span className="im-photo-when">Vendeur invisible</span>
          </div>
          <h2>Maison · Caudéran</h2>
          <p>120 m² · 5 pièces · 420 000 €</p>
          <div className="im-photo-foot">
            <Sparkles size={13} />
            <small>3 acheteurs correspondent à votre bien</small>
          </div>
        </div>
      </div>
      <div className="im-stat-grid">
        <div className="im-stat"><span>Correspondances</span><strong>3</strong><small>acheteurs qualifiés</small></div>
        <div className="im-stat"><span>Demandes</span><strong>2</strong><small>à traiter</small></div>
      </div>
      <SectionLabel>Demandes à traiter</SectionLabel>
      <div className="im-panel im-panel-flush">
        <div className="im-list-row">
          <Avatar src={FACE.camille} />
          <div><strong>Camille &amp; Hugo P.</strong><small>Budget 450 000 € · achat sous 3 mois</small></div>
          <Pill tone="gold">Match 92 %</Pill>
        </div>
        <div className="im-list-row">
          <Avatar src={FACE.nadia} />
          <div><strong>Nadia B.</strong><small>Budget 430 000 € · financement en cours</small></div>
          <Pill tone="neutral">Match 81 %</Pill>
        </div>
      </div>
      <TabBar variant="vendeur" active="home" />
    </div>
  )
}

// 4 · Demandes de mise en relation reçues
function RequestsScreen() {
  return (
    <div className="im-content im-pad-tab">
      <TopBar title="Demandes reçues" avatar={FACE.marc} action={<Bell size={17} />} />
      <div className="im-segmented">
        <button className="im-seg im-seg-on">À traiter · 2</button>
        <button className="im-seg">Acceptées</button>
        <button className="im-seg">Refusées</button>
      </div>
      <div className="im-request-card">
        <div className="im-request-head">
          <Avatar src={FACE.camille} size="lg" />
          <div>
            <strong>Camille &amp; Hugo Perret</strong>
            <small>Budget 450 000 € · apport 90 000 €</small>
          </div>
          <Pill tone="gold">92 %</Pill>
        </div>
        <div className="im-request-tags">
          <Pill tone="success"><UserCheck size={11} /> Financement avancé</Pill>
          <Pill tone="neutral">Achat sous 3 mois</Pill>
        </div>
        <div className="im-request-actions">
          <InlineButton tone="primary"><Check size={14} /> Accepter</InlineButton>
          <InlineButton><X size={14} /> Refuser</InlineButton>
        </div>
      </div>
      <div className="im-request-card">
        <div className="im-request-head">
          <Avatar src={FACE.nadia} size="lg" />
          <div>
            <strong>Nadia Belkacem</strong>
            <small>Budget 430 000 € · apport 60 000 €</small>
          </div>
          <Pill tone="neutral">81 %</Pill>
        </div>
        <div className="im-request-tags">
          <Pill tone="gold">Financement en cours</Pill>
          <Pill tone="neutral">Achat sous 6 mois</Pill>
        </div>
        <div className="im-request-actions">
          <InlineButton tone="primary"><Check size={14} /> Accepter</InlineButton>
          <InlineButton><X size={14} /> Refuser</InlineButton>
        </div>
      </div>
      <TabBar variant="vendeur" active="requests" />
    </div>
  )
}

// 5 · Définition du projet d'achat
function BuyerProjectScreen() {
  return (
    <div className="im-content">
      <TopBar back title="Mon projet d'achat" meta="Modifiable à tout moment" />
      <div className="im-field-row">
        <Field label="Budget" icon={<Banknote size={15} />} value="450 000 €" />
        <Field label="Apport" icon={<Banknote size={15} />} value="90 000 €" />
      </div>
      <Field label="Zone de recherche" icon={<MapPin size={15} />} value="Bordeaux · rayon 15 km" />
      <div className="im-field">
        <label>Type de bien</label>
        <div className="im-chips">
          <span className="im-chip im-chip-on">Maison</span>
          <span className="im-chip">Appartement</span>
        </div>
      </div>
      <div className="im-field-row">
        <Field label="Surface minimum" icon={<Ruler size={15} />} value="110 m²" />
        <Field label="Chambres" icon={<BedDouble size={15} />} value="3 ou 4" />
      </div>
      <div className="im-field">
        <label>Financement</label>
        <div className="im-segmented im-segmented-plain">
          <button className="im-seg">Recherche</button>
          <button className="im-seg">En cours</button>
          <button className="im-seg im-seg-on">Avancé</button>
        </div>
      </div>
      <Note
        tone="gold"
        icon={<UserCheck size={16} />}
        title="Votre sérieux, votre meilleur atout"
        text="Votre niveau d'avancement est affiché aux vendeurs : c'est lui qui ouvre les portes."
      />
      <div className="im-bottom-actions">
        <UiButton>Voir mes correspondances<ArrowRight size={16} /></UiButton>
      </div>
    </div>
  )
}

// 6 · Mes correspondances (match inversé)
function MatchesScreen() {
  return (
    <div className="im-content im-pad-tab">
      <TopBar title="Correspondances" avatar={FACE.camille} action={<Bell size={17} />} />
      <div className="im-match-intro">
        <strong>3 biens correspondent à votre projet</strong>
        <small>Des vendeurs volontaires, venus à vous. Pas l'inverse.</small>
      </div>
      <div className="im-match-list">
        <div className="im-match-row">
          <span className="im-match-thumb"><img src={PHOTO.caude} alt="" /></span>
          <div>
            <strong>Maison · Caudéran</strong>
            <small>120 m² · 4 ch · sous 3 mois</small>
            <b>420 000 €</b>
          </div>
          <span className="im-score im-score-gold">92 %</span>
        </div>
        <div className="im-match-row">
          <span className="im-match-thumb"><img src={PHOTO.chartrons} alt="" /></span>
          <div>
            <strong>Appartement · Chartrons</strong>
            <small>115 m² · 3 ch · sous 3 mois</small>
            <b>398 000 €</b>
          </div>
          <span className="im-score">84 %</span>
        </div>
        <div className="im-match-row">
          <span className="im-match-thumb"><img src={PHOTO.pessac} alt="" /></span>
          <div>
            <strong>Maison · Pessac</strong>
            <small>118 m² · 4 ch · sous 6 mois</small>
            <b>445 000 €</b>
          </div>
          <span className="im-score">78 %</span>
        </div>
      </div>
      <Note
        tone="brand"
        icon={<Bell size={16} />}
        title="Match inversé"
        text="Dès qu'un nouveau bien correspond à votre projet, vous êtes prévenu."
      />
      <TabBar variant="acheteur" active="matches" />
    </div>
  )
}

// 7 · Fiche du bien (vue acheteur) — écran défilable
function PropertyDetailScreen() {
  return (
    <div className="im-content">
      <TopBar back title="Fiche du bien" action={<Send size={16} />} />
      <div className="im-detail-photo">
        <img src={PHOTO.caude} alt="" />
        <span className="im-detail-badge"><ShieldCheck size={12} /> Vendeur volontaire</span>
        <span className="im-detail-score">92 %</span>
      </div>
      <div className="im-detail-title">
        <h2>Maison · Caudéran</h2>
        <b>420 000 €</b>
      </div>
      <div className="im-detail-loc">
        <MapPin size={13} />
        <span>Bordeaux · quartier Caudéran</span>
        <Pill tone="lock"><Lock size={10} /> Adresse exacte masquée</Pill>
      </div>
      <div className="im-detail-stats">
        <div><Ruler size={14} /><strong>120 m²</strong><span>surface</span></div>
        <div><Home size={14} /><strong>5 pièces</strong><span>dont séjour</span></div>
        <div><BedDouble size={14} /><strong>4 ch.</strong><span>chambres</span></div>
      </div>
      <SectionLabel>Score de compatibilité, en détail</SectionLabel>
      <div className="im-score-panel">
        <div className="im-score-line">
          <span>Prix</span>
          <div className="im-score-bar"><i className="im-bar-prix" style={{ width: '95%' }} /></div>
          <b>95 %</b>
        </div>
        <div className="im-score-line">
          <span>Localisation</span>
          <div className="im-score-bar"><i className="im-bar-loc" style={{ width: '90%' }} /></div>
          <b>90 %</b>
        </div>
        <div className="im-score-line">
          <span>Surface</span>
          <div className="im-score-bar"><i className="im-bar-surface" style={{ width: '100%' }} /></div>
          <b>100 %</b>
        </div>
        <div className="im-score-line">
          <span>Chambres</span>
          <div className="im-score-bar"><i className="im-bar-chambres" style={{ width: '85%' }} /></div>
          <b>85 %</b>
        </div>
        <div className="im-score-line">
          <span>Délai</span>
          <div className="im-score-bar"><i className="im-bar-delai" style={{ width: '100%' }} /></div>
          <b>100 %</b>
        </div>
      </div>
      <p className="im-score-note">Le score est une aide à la décision, pas une garantie de transaction.</p>
      <Note
        tone="brand"
        icon={<Lock size={16} />}
        title="Coordonnées communiquées après accord"
        text="Le vendeur accepte ou refuse chaque demande. Rien ne part sans lui."
      />
      <div className="im-bottom-actions">
        <UiButton>Demander la mise en relation<ArrowRight size={16} /></UiButton>
      </div>
    </div>
  )
}

// 8 · Messagerie
function MessagesScreen() {
  return (
    <div className="im-content im-chat">
      <TopBar back title="Marc D." meta="Maison · Caudéran" action={<CalendarDays size={16} />} />
      <div className="im-chat-banner">
        <CircleCheck size={13} />
        <span>Mise en relation acceptée le 2 septembre</span>
      </div>
      <div className="im-chat-thread">
        <div className="im-bubble im-bubble-them">
          <p>Bonjour Camille, merci pour votre demande. Votre profil correspond bien à ce que je cherche.</p>
          <small>Marc · 14:02</small>
        </div>
        <div className="im-bubble im-bubble-me">
          <p>Bonjour Marc, merci à vous ! Nous serions ravis de visiter la maison cette semaine.</p>
          <small>Vous · 14:10</small>
        </div>
        <div className="im-visit-card">
          <div className="im-visit-head">
            <span className="im-list-ico im-ico-brand"><CalendarDays size={15} /></span>
            <div><strong>Visite proposée</strong><small>Samedi 6 septembre · 10h30</small></div>
          </div>
          <div className="im-visit-actions">
            <InlineButton tone="primary"><Check size={14} /> Confirmer</InlineButton>
            <InlineButton>Autre créneau</InlineButton>
          </div>
        </div>
      </div>
      <div className="im-chat-input">
        <span>Écrire un message…</span>
        <button aria-label="Envoyer"><Send size={15} /></button>
      </div>
    </div>
  )
}

// 9 · Suivi de transaction (9 étapes) — écran défilable
function TransactionScreen() {
  const steps = [
    { t: 'Mise en relation', m: 'Acceptée le 2 sept. · 14:02', done: true },
    { t: 'Contact', m: 'Premier échange le 2 sept.', done: true },
    { t: 'Visite', m: 'Réalisée le 6 sept. · 10h30', done: true },
    { t: 'Négociation', m: 'Ouverte le 9 sept.', done: true },
    { t: 'Offre', m: "Offre en cours de rédaction", now: true },
    { t: 'Accord', m: 'À venir' },
    { t: 'Compromis / promesse', m: 'Chez le notaire' },
    { t: 'Acte authentique', m: 'Signature définitive' },
    { t: 'Transaction finalisée', m: 'Remise des clés' },
  ]
  return (
    <div className="im-content">
      <TopBar back title="Suivi de la vente" meta="Maison · Caudéran" />
      <div className="im-deal-card">
        <div className="im-avatar-pair">
          <Avatar src={FACE.marc} />
          <Avatar src={FACE.camille} />
        </div>
        <div>
          <strong>Marc &amp; Camille</strong>
          <small>Visible par les deux parties</small>
        </div>
        <Pill tone="gold">Étape 5 / 9</Pill>
      </div>
      <div className="im-timeline">
        {steps.map((s) => (
          <div key={s.t} className={`im-tl${s.done ? ' im-tl-done' : ''}${s.now ? ' im-tl-now' : ''}`}>
            <span>{s.done ? <Check size={11} /> : null}</span>
            <div>
              <strong>{s.t}</strong>
              <small>{s.m}</small>
            </div>
          </div>
        ))}
      </div>
      <Note
        tone="brand"
        icon={<ShieldCheck size={16} />}
        title="Chaque étape est horodatée"
        text="Identités, bien, date et heure : l'historique complet reste consultable."
      />
    </div>
  )
}

// 10 · Espace d'administration (dans l'app, compte marqué administrateur)
function AdminScreen() {
  return (
    <div className="im-content">
      <TopBar title="Administration" avatar={FACE.julien} action={<Flag size={16} />} />
      <div className="im-admin-banner">
        <ShieldCheck size={13} />
        <span>Section visible uniquement de votre compte administrateur</span>
      </div>
      <div className="im-stat-grid">
        <div className="im-stat"><span>Vendeurs</span><strong>84</strong><small>inscrits</small></div>
        <div className="im-stat"><span>Acheteurs</span><strong>233</strong><small>inscrits</small></div>
        <div className="im-stat"><span>Mises en relation</span><strong>27</strong><small>depuis le lancement</small></div>
        <div className="im-stat"><span>Signalements</span><strong>1</strong><small>à traiter</small></div>
      </div>
      <SectionLabel>Profils à valider</SectionLabel>
      <div className="im-panel im-panel-flush">
        <div className="im-list-row">
          <Avatar src={FACE.nadia} />
          <div><strong>Nadia Belkacem</strong><small>Acheteuse · financement en cours</small></div>
          <div className="im-row-actions">
            <button className="im-mini-btn im-mini-btn-ok" aria-label="Valider"><Check size={13} /></button>
            <button className="im-mini-btn" aria-label="Refuser"><X size={13} /></button>
          </div>
        </div>
        <div className="im-list-row">
          <Avatar src={FACE.hugo} />
          <div><strong>Hugo Perret</strong><small>Acheteur · financement avancé</small></div>
          <div className="im-row-actions">
            <button className="im-mini-btn im-mini-btn-ok" aria-label="Valider"><Check size={13} /></button>
            <button className="im-mini-btn" aria-label="Refuser"><X size={13} /></button>
          </div>
        </div>
      </div>
      <SectionLabel>Signalements</SectionLabel>
      <div className="im-panel im-panel-flush">
        <div className="im-list-row">
          <span className="im-list-ico im-ico-alert"><Flag size={16} /></span>
          <div><strong>Annonce à vérifier</strong><small>Studio · Talence · signalée hier</small></div>
          <Pill tone="alert">À traiter</Pill>
        </div>
        <div className="im-list-row">
          <span className="im-list-ico im-ico-brand"><Users size={16} /></span>
          <div><strong>Statistiques du pilote</strong><small>Bordeaux Métropole · temps moyen de match : 6 j</small></div>
          <ChevronRight size={15} />
        </div>
      </div>
      <Note
        tone="gold"
        icon={<Building2 size={16} />}
        title="Validation manuelle des profils"
        text="C'est vous qui attribuez les niveaux de confiance, depuis cet écran."
      />
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Deux parcours : vendre ou acheter', screen: <OnboardingScreen /> },
  { id: 'property-create', title: 'Création de la fiche du bien', subtitle: 'Prix, délai et confidentialité', screen: <PropertyCreateScreen /> },
  { id: 'seller-dashboard', title: 'Tableau de bord vendeur', subtitle: 'Son bien, ses correspondances', screen: <SellerDashboardScreen /> },
  { id: 'requests', title: 'Demandes reçues', subtitle: 'Le vendeur accepte ou refuse', screen: <RequestsScreen /> },
  { id: 'buyer-project', title: 'Projet d’achat', subtitle: 'Budget, zone et qualification', screen: <BuyerProjectScreen /> },
  { id: 'matches', title: 'Mes correspondances', subtitle: 'Le match inversé, classé par score', screen: <MatchesScreen /> },
  { id: 'property-detail', title: 'Fiche du bien', subtitle: 'Score décomposé, adresse masquée', screen: <PropertyDetailScreen />, scrollable: true },
  { id: 'messages', title: 'Messagerie', subtitle: 'Échanges et visites, dans l’app', screen: <MessagesScreen /> },
  { id: 'transaction', title: 'Suivi de transaction', subtitle: 'Les 9 étapes, horodatées', screen: <TransactionScreen />, scrollable: true },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Panel administrateur, dans l’app', screen: <AdminScreen />, scrollable: true },
]

export default function ImmoMatchMockupsPage() {
  return (
    <main className="immomatch-mockups-page">
      <section className="im-landing-hero">
        <div>
          <p className="im-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="im-reference">ImmoMatch · MOB-2026-immomatch</p>
          <p className="im-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="im-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="im-mockup-card">
            <div className="im-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
              {mockup.scrollable && (
                <span className="im-scroll-chip"><ChevronDown size={12} /> Écran à faire défiler</span>
              )}
            </div>
            <div className="im-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
