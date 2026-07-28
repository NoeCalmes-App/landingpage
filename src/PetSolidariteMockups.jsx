import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Crosshair,
  Heart,
  Home,
  ImagePlus,
  ListFilter,
  Lock,
  MapPin,
  MessageCircle,
  Navigation,
  PawPrint,
  Plus,
  Ruler,
  Send,
  Share2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import './pet-solidarite-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes. Une connexion internet est necessaire pour
// afficher ces visuels dans la proposition de maquette.
const FACE = {
  camille: 'https://i.pravatar.cc/96?img=47',
  julien: 'https://i.pravatar.cc/96?img=12',
  marc: 'https://i.pravatar.cc/96?img=15',
}

const PET = {
  minou: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  roux: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80',
  noiraud: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80',
  gribouille: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&q=80',
  jack: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  nala: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&q=80',
}

/* ─────────────── Composants partages ─────────────── */

function StatusBar() {
  return (
    <div className="ps-statusbar">
      <span>9:41</span>
      <div className="ps-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false, browser = false }) {
  return (
    <div className={`ps-phone-export${tall ? ' ps-phone-export-tall' : ''}`}>
      <div className="ps-phone">
        <div className="ps-screen">
          <StatusBar />
          {browser && (
            <div className="ps-browser-bar">
              <span className="ps-url"><Lock size={10} />petsolidarite.fr/annonce/minou</span>
            </div>
          )}
          {children}
          <div className="ps-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`ps-app-mark${large ? ' ps-app-mark-large' : ''}`}>
      <PawPrint size={large ? 30 : 18} strokeWidth={2.2} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`ps-ui-button ps-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`ps-icon-button ${className}`}>{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`ps-pill ps-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md', ring = '' }) {
  return (
    <span className={`ps-avatar ps-avatar-${size}${ring ? ` ps-avatar-ring-${ring}` : ''}`}>
      <img src={src} alt="" />
    </span>
  )
}

function TopBar({ title, subtitle, back = false, action }) {
  return (
    <div className="ps-topbar">
      {back
        ? <IconButton><ChevronRight className="ps-back-icon" size={18} /></IconButton>
        : <Avatar src={FACE.camille} size="top" />}
      <div className="ps-topbar-title">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'map' }) {
  const tabs = [
    { id: 'map', icon: <MapPin size={19} />, label: 'Carte' },
    { id: 'pets', icon: <Home size={19} />, label: 'Mes animaux' },
    { id: 'declare', icon: <Plus size={22} />, label: 'Déclarer' },
    { id: 'chat', icon: <MessageCircle size={19} />, label: 'Messages' },
    { id: 'community', icon: <Heart size={19} />, label: 'Entraide' },
  ]
  return (
    <div className="ps-tabbar">
      {tabs.map((tab) => (
        <div key={tab.id} className={`ps-tab ps-tab-${tab.id}${active === tab.id ? ' ps-tab-active' : ''}`}>
          <span className="ps-tab-icon">{tab.icon}</span>
          {tab.id !== 'declare' && <small>{tab.label}</small>}
        </div>
      ))}
    </div>
  )
}

function SectionHead({ children, action }) {
  return (
    <div className="ps-section-head">
      <span>{children}</span>
      {action && <small>{action}</small>}
    </div>
  )
}

function ListRow({ photo, emoji, tone = 'lost', title, meta, trailing }) {
  return (
    <div className="ps-list-row">
      {photo
        ? <Avatar src={photo} size="row" ring={tone} />
        : <span className={`ps-list-icon ps-list-icon-${tone}`}>{emoji}</span>}
      <div className="ps-list-body">
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={15} className="ps-chevron" />}
    </div>
  )
}

function FilterChips({ items }) {
  return (
    <div className="ps-chips">
      {items.map((item) => (
        <span key={item.label} className={`ps-chip${item.on ? ' ps-chip-on' : ''}`}>
          {item.emoji && <i>{item.emoji}</i>}
          {item.label}
        </span>
      ))}
    </div>
  )
}

// Carte stylisee : fond de plan abstrait, epingles photo des animaux.
function MapCanvas({ pins = [], trail = false, compact = false }) {
  return (
    <div className={`ps-map${compact ? ' ps-map-compact' : ''}`}>
      <div className="ps-map-grid" aria-hidden="true">
        <i className="ps-road ps-road-h1" />
        <i className="ps-road ps-road-h2" />
        <i className="ps-road ps-road-v1" />
        <i className="ps-road ps-road-v2" />
        <i className="ps-park" />
        <i className="ps-water" />
      </div>
      {trail && (
        <svg className="ps-trail" viewBox="0 0 280 200" aria-hidden="true">
          <path d="M58 152 C 96 140, 108 108, 142 96 S 196 74, 214 52" />
        </svg>
      )}
      {pins.map((pin) => (
        <span
          key={pin.id}
          className={`ps-pin ps-pin-${pin.tone}${pin.self ? ' ps-pin-self' : ''}`}
          style={{ left: pin.x, top: pin.y }}
        >
          {pin.photo
            ? <img src={pin.photo} alt="" />
            : <b>{pin.step}</b>}
        </span>
      ))}
      {!compact && <span className="ps-map-me" aria-hidden="true"><i /></span>}
    </div>
  )
}

/* ─────────────── Ecrans ─────────────── */

function OnboardingScreen() {
  return (
    <div className="ps-content ps-onboarding">
      <div className="ps-hero">
        <div className="ps-hero-photo">
          <img src={PHOTO.hero} alt="" />
          <span className="ps-hero-veil" aria-hidden="true" />
          <span className="ps-hero-sticker">312 retrouvés</span>
        </div>
        <span className="ps-hero-mark"><AppMark large /></span>
      </div>
      <div className="ps-onboarding-text">
        <p className="ps-eyebrow-screen">PET SOLIDARITÉ</p>
        <h1>Personne ne cherche seul.</h1>
        <p>Déclarez une disparition, alertez tout le quartier en une seconde, et suivez chaque endroit où votre animal a été vu.</p>
      </div>
      <div className="ps-dots" aria-hidden="true"><i className="ps-dot-on" /><i /><i /></div>
      <div className="ps-onboarding-actions">
        <UiButton>Créer mon compte <ArrowRight size={16} /></UiButton>
        <UiButton tone="light">J&apos;ai déjà un compte</UiButton>
      </div>
    </div>
  )
}

function MapScreen() {
  const pins = [
    { id: 'p1', tone: 'lost', photo: PET.minou, x: '18%', y: '30%' },
    { id: 'p2', tone: 'found', photo: PET.roux, x: '62%', y: '20%' },
    { id: 'p3', tone: 'seen', photo: PET.noiraud, x: '44%', y: '54%' },
    { id: 'p4', tone: 'lost', photo: PET.jack, x: '74%', y: '62%' },
  ]
  return (
    <div className="ps-content ps-with-tab ps-map-screen">
      <TopBar title="Autour de moi" subtitle="Talence · 5 km" action={<ListFilter size={17} />} />
      <FilterChips items={[
        { label: 'Tous', on: true },
        { label: 'Chats', emoji: '🐱' },
        { label: 'Chiens', emoji: '🐶' },
        { label: '48 h' },
      ]} />
      <MapCanvas pins={pins} />
      <div className="ps-map-legend">
        <span><i className="ps-dot-lost" />Perdu</span>
        <span><i className="ps-dot-found" />Trouvé</span>
        <span><i className="ps-dot-seen" />Aperçu</span>
        <b className="ps-map-support">Avec le soutien de <i>🏥</i> Clinique des Ormes</b>
      </div>
      <div className="ps-map-sheet">
        <ListRow
          photo={PET.minou}
          tone="lost"
          title="Minou, chat roux"
          meta="Perdu hier · rue Peydavant · 600 m"
          trailing={<Pill tone="lost">Perdu</Pill>}
        />
        <ListRow
          photo={PET.roux}
          tone="found"
          title="Chat tigré recueilli"
          meta="Trouvé ce matin · place Alcala · 1,2 km"
          trailing={<Pill tone="found">Trouvé</Pill>}
        />
      </div>
      <TabBar active="map" />
    </div>
  )
}

function AnnounceScreen() {
  const pins = [
    { id: 's1', tone: 'seen', step: '1', x: '16%', y: '70%' },
    { id: 's2', tone: 'seen', step: '2', x: '46%', y: '46%' },
    { id: 's3', tone: 'lost', step: '3', x: '72%', y: '22%' },
  ]
  return (
    <div className="ps-content" >
      <TopBar title="Minou" subtitle="Chat roux · perdu depuis 2 jours" back action={<Share2 size={17} />} />
      <div className="ps-pet-hero">
        <img src={PET.minou} alt="" />
        <Pill tone="lost">Perdu</Pill>
      </div>
      <div className="ps-tags">
        <span>🐱 Chat européen</span>
        <span>Roux et blanc</span>
        <span>Mâle</span>
        <span>Pucé</span>
      </div>
      <SectionHead action="3 signalements">Où il a été vu</SectionHead>
      <MapCanvas pins={pins} trail compact />
      <div className="ps-timeline">
        <div><b>3</b><span><strong>Hier 18 h 40, allée des Chênes</strong><small>Sabrina, il courait vers le parc</small></span></div>
        <div><b>2</b><span><strong>Hier 12 h 10, rue Peydavant</strong><small>Julien, aperçu sous une voiture</small></span></div>
      </div>
      <div className="ps-bottom-actions">
        <UiButton>Je l&apos;ai vu ici <MapPin size={16} /></UiButton>
        <UiButton tone="light">Contacter Camille</UiButton>
      </div>
    </div>
  )
}

function DeclareScreen() {
  return (
    <div className="ps-content">
      <TopBar title="Déclarer une disparition" subtitle="Étape 2 sur 2" back action={<Crosshair size={17} />} />
      <div className="ps-pet-select">
        <Avatar src={PET.minou} size="lg" ring="lost" />
        <div><strong>Minou</strong><small>Chat européen roux, 4 ans, pucé</small></div>
        <Pill tone="soft">Modifier</Pill>
      </div>
      <SectionHead action="Ajuster">Dernier endroit où il a été vu</SectionHead>
      <MapCanvas pins={[{ id: 'd1', tone: 'lost', photo: PET.minou, x: '48%', y: '44%', self: true }]} compact />
      <div className="ps-field-grid">
        <div className="ps-field"><label>Date</label><div className="ps-input">26 juillet</div></div>
        <div className="ps-field"><label>Heure</label><div className="ps-input">18 h 30</div></div>
      </div>
      <div className="ps-field">
        <label>Circonstances</label>
        <div className="ps-input ps-input-area">Sorti par la fenêtre du salon, il est craintif avec les inconnus.</div>
      </div>
      <div className="ps-photo-drop">
        <span><ImagePlus size={17} /></span>
        <div><strong>Photo principale</strong><small>Reprise de sa fiche, modifiable ici.</small></div>
      </div>
      <div className="ps-alert-note">
        <span><Navigation size={15} /></span>
        <div><strong>84 personnes seront alertées</strong><small>Toutes celles dont la zone couvre ce secteur.</small></div>
      </div>
      <div className="ps-bottom-actions">
        <UiButton>Publier et alerter <Send size={16} /></UiButton>
      </div>
    </div>
  )
}

function FoundScreen() {
  return (
    <div className="ps-content">
      <TopBar title="J'ai trouvé un animal" back action={<Crosshair size={17} />} />
      <div className="ps-photo-drop">
        <span><ImagePlus size={17} /></span>
        <div><strong>2 photos ajoutées</strong><small>Plus il y en a, plus la reconnaissance est facile.</small></div>
      </div>
      <SectionHead>Où l&apos;avez-vous trouvé</SectionHead>
      <MapCanvas pins={[{ id: 'f1', tone: 'found', photo: PET.roux, x: '50%', y: '44%', self: true }]} compact />
      <SectionHead>La situation</SectionHead>
      <FilterChips items={[
        { label: 'Je l\'ai recueilli', on: true },
        { label: 'Je l\'ai seulement vu' },
      ]} />
      <SectionHead action="2 dans 3 km">Ces animaux sont perdus ici</SectionHead>
      <div className="ps-panel">
        <ListRow photo={PET.minou} tone="lost" title="Minou, chat roux" meta="Perdu il y a 2 jours · à 900 m" trailing={<Pill tone="lost">C&apos;est lui</Pill>} />
        <ListRow photo={PET.gribouille} tone="lost" title="Gribouille, chatte tigrée" meta="Perdue il y a 6 jours · à 2,4 km" trailing={<Pill tone="soft">Voir</Pill>} />
      </div>
      <div className="ps-bottom-actions">
        <UiButton tone="light">Aucun ne correspond, publier</UiButton>
      </div>
    </div>
  )
}

function SightingScreen() {
  return (
    <div className="ps-content">
      <TopBar title="Je l'ai vu ici" subtitle="Signalement sur Minou" back action={<Crosshair size={17} />} />
      <MapCanvas pins={[{ id: 'v1', tone: 'seen', photo: PET.minou, x: '52%', y: '42%', self: true }]} compact />
      <p className="ps-helper">Placez le point à l&apos;endroit exact où vous l&apos;avez aperçu. Camille reçoit une alerte immédiatement.</p>
      <div className="ps-field-grid">
        <div className="ps-field"><label>Date</label><div className="ps-input">Aujourd&apos;hui</div></div>
        <div className="ps-field"><label>Heure</label><div className="ps-input">18 h 40</div></div>
      </div>
      <SectionHead>Direction prise</SectionHead>
      <FilterChips items={[
        { label: 'Vers le parc', on: true },
        { label: 'Vers l\'école' },
        { label: 'Je ne sais pas' },
      ]} />
      <div className="ps-photo-drop">
        <span><ImagePlus size={17} /></span>
        <div><strong>Ajouter une photo</strong><small>Facultatif, mais très utile pour confirmer.</small></div>
      </div>
      <div className="ps-bottom-actions">
        <UiButton>Envoyer le signalement <Send size={16} /></UiButton>
      </div>
    </div>
  )
}

function MatchScreen() {
  return (
    <div className="ps-content ps-with-tab">
      <TopBar title="Rapprochements" subtitle="2 pistes pour Minou" back />
      <div className="ps-match-card">
        <div className="ps-match-pair">
          <Avatar src={PET.minou} size="lg" ring="lost" />
          <span className="ps-match-link"><Ruler size={13} /></span>
          <Avatar src={PET.roux} size="lg" ring="found" />
        </div>
        <div className="ps-match-score">
          <strong>Correspondance élevée</strong>
          <span className="ps-score-bar"><i style={{ width: '86%' }} /></span>
          <small>86 %</small>
        </div>
        <ul className="ps-match-reasons">
          <li><Check size={13} />À <b>900 m</b> du lieu de disparition</li>
          <li><Check size={13} />Trouvé <b>1 jour après</b></li>
          <li><Check size={13} />Chat roux et blanc, mâle</li>
        </ul>
        <div className="ps-match-actions">
          <UiButton>Contacter Julien</UiButton>
          <UiButton tone="light">Ce n&apos;est pas lui</UiButton>
        </div>
      </div>
      <SectionHead>Autre piste</SectionHead>
      <ListRow
        photo={PET.gribouille}
        tone="found"
        title="Chat roux aperçu"
        meta="À 3,4 km · il y a 4 jours"
        trailing={<Pill tone="soft">41 %</Pill>}
      />
      <TabBar active="map" />
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="ps-content ps-chat-screen">
      <TopBar title="Julien" subtitle="À propos de Minou" back />
      <div className="ps-chat-context">
        <Avatar src={PET.minou} size="row" ring="lost" />
        <div><strong>Minou, chat roux</strong><small>Perdu le 26 juillet, rue Peydavant</small></div>
      </div>
      <div className="ps-chat-flow">
        <div className="ps-bubble ps-bubble-them"><small>Julien</small>Bonjour, je crois avoir recueilli votre chat hier soir près de la place.</div>
        <div className="ps-bubble ps-bubble-me">C&apos;est peut-être lui ! Il a une tache blanche sous le menton.</div>
        <div className="ps-photo-message">
          <img src={PET.roux} alt="" />
          <span>Julien · 09:38</span>
        </div>
        <div className="ps-bubble ps-bubble-me">C&apos;est bien Minou. J&apos;arrive tout de suite, merci infiniment.</div>
      </div>
      <div className="ps-chat-input">
        <span>Écrire un message…</span>
        <IconButton className="ps-send"><Send size={15} /></IconButton>
      </div>
    </div>
  )
}

function AlertsScreen() {
  return (
    <div className="ps-content">
      <TopBar title="Mes alertes" subtitle="Zone et notifications" back />
      <div className="ps-zone-card">
        <MapCanvas compact pins={[]} />
        <span className="ps-zone-circle" aria-hidden="true" />
        <div className="ps-zone-info">
          <strong>Talence et alentours</strong>
          <small>Rayon de 5 km autour de chez vous</small>
        </div>
      </div>
      <div className="ps-slider" aria-hidden="true">
        <span className="ps-slider-track"><i style={{ width: '38%' }} /><b style={{ left: '38%' }} /></span>
        <div className="ps-slider-scale"><span>2 km</span><span>5 km</span><span>10 km</span><span>20 km</span></div>
      </div>
      <SectionHead>Ce que je reçois</SectionHead>
      <div className="ps-switch-list">
        <div><span>🚨</span><div><strong>Disparition dans ma zone</strong><small>Immédiat</small></div><i className="ps-switch ps-switch-on" /></div>
        <div><span>📍</span><div><strong>Signalement sur mes annonces</strong><small>Immédiat</small></div><i className="ps-switch ps-switch-on" /></div>
        <div><span>🔎</span><div><strong>Rapprochement trouvé</strong><small>Immédiat</small></div><i className="ps-switch ps-switch-on" /></div>
        <div><span>💬</span><div><strong>Nouveau message</strong><small>Immédiat</small></div><i className="ps-switch ps-switch-on" /></div>
      </div>
      <div className="ps-quiet-note">
        <span><ShieldCheck size={15} /></span>
        <div><strong>Jamais de spam</strong><small>Alertes regroupées, plafond quotidien, silence de 22 h à 7 h.</small></div>
      </div>
    </div>
  )
}

function ReunionScreen() {
  return (
    <div className="ps-content ps-reunion">
      <div className="ps-reunion-photo">
        <img src={PET.minou} alt="" />
        <span className="ps-hero-veil" aria-hidden="true" />
        <span className="ps-confetti">🎉</span>
      </div>
      <div className="ps-reunion-text">
        <h1>Minou est rentré.</h1>
        <p>Grâce à Julien et aux 3 personnes qui l&apos;ont signalé.</p>
      </div>
      <div className="ps-counter">
        <span className="ps-counter-heart"><Heart size={15} /></span>
        <strong>313</strong>
        <span>animaux retrouvés grâce à vous</span>
      </div>
      <div className="ps-thanks">
        <Avatar src={FACE.julien} size="row" />
        <div><strong>Remercier Julien</strong><small>Un badge apparaîtra sur son profil.</small></div>
        <Pill tone="found">Envoyé</Pill>
      </div>
      <div className="ps-bottom-actions">
        <UiButton>Soutenir l&apos;association <Heart size={16} /></UiButton>
        <UiButton tone="light">Publier notre histoire</UiButton>
      </div>
    </div>
  )
}

// Page web publique : ce que voit une personne qui clique sur un lien partagé
// dans le groupe Facebook, sans avoir installé l'application.
function PublicPageScreen() {
  return (
    <div className="ps-content ps-content-browser">
      <div className="ps-install-banner">
        <AppMark />
        <div><strong>Pet Solidarité</strong><small>Soyez alerté près de chez vous</small></div>
        <Pill tone="lost">Installer</Pill>
      </div>
      <div className="ps-pet-hero">
        <img src={PET.minou} alt="" />
        <Pill tone="lost">Perdu</Pill>
      </div>
      <div className="ps-public-title">
        <strong>Minou, chat roux et blanc</strong>
        <small>Disparu le 26 juillet, rue Peydavant à Talence</small>
      </div>
      <MapCanvas
        pins={[
          { id: 'w1', tone: 'seen', step: '1', x: '20%', y: '68%' },
          { id: 'w2', tone: 'seen', step: '2', x: '48%', y: '46%' },
          { id: 'w3', tone: 'lost', step: '3', x: '74%', y: '24%' },
        ]}
        trail
        compact
      />
      <div className="ps-bottom-actions">
        <UiButton>J&apos;ai vu cet animal <MapPin size={16} /></UiButton>
        <p className="ps-no-account">Sans créer de compte, en 10 secondes.</p>
        <UiButton tone="light">Installer pour être alerté près de chez moi</UiButton>
      </div>
    </div>
  )
}

function CommunityScreen() {
  return (
    <div className="ps-content ps-with-tab">
      <TopBar title="Entraide" subtitle="Talence" action={<Users size={17} />} />
      <div className="ps-counter ps-counter-inline">
        <span className="ps-counter-heart"><Heart size={15} /></span>
        <strong>313</strong>
        <span>animaux retrouvés grâce à vous</span>
      </div>
      <SectionHead action="Tout voir">Le mur des retrouvailles</SectionHead>
      <div className="ps-story">
        <img src={PET.jack} alt="" />
        <div>
          <strong>Jack, 6 jours dehors</strong>
          <small>« Un voisin l&apos;a vu près du stade, on l&apos;a retrouvé le soir même. »</small>
          <span><Avatar src={FACE.marc} size="xs" />Marc · Pessac</span>
        </div>
      </div>
      <div className="ps-support">
        <span className="ps-support-label">Avec le soutien de</span>
        <div className="ps-partners">
          <a><i>🏥</i>Clinique des Ormes</a>
          <a><i>🛍️</i>Animalerie Pastel</a>
        </div>
      </div>
      <div className="ps-bottom-actions">
        <UiButton>Faire un don à l&apos;association <Heart size={16} /></UiButton>
        <p className="ps-no-account">Page de dons sécurisée, 100 % reversé.</p>
      </div>
      <TabBar active="community" />
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="ps-admin">
      <div className="ps-admin-bar">
        <span className="ps-admin-brand"><AppMark />Pet Solidarité</span>
        <span className="ps-admin-nav">
          <b>Modération</b><i>Annonces</i><i>Partenaires</i><i>Statistiques</i>
        </span>
        <Avatar src={FACE.camille} size="row" />
      </div>
      <div className="ps-admin-body">
        <div className="ps-admin-stats">
          <div><span>Annonces actives</span><strong>128</strong></div>
          <div><span>Animaux retrouvés</span><strong>313</strong></div>
          <div><span>Utilisateurs</span><strong>2 470</strong></div>
          <div><span>À modérer</span><strong className="ps-admin-alert">2</strong></div>
        </div>
        <div className="ps-admin-panel">
          <div className="ps-admin-panel-head"><strong>Contenus signalés</strong><Pill tone="lost">2 en attente</Pill></div>
          <ListRow photo={PET.gribouille} tone="seen" title="Annonce signalée par 2 personnes" meta="Photo non conforme · Bordeaux Bastide" trailing={<Pill tone="soft">Examiner</Pill>} />
          <ListRow photo={PET.nala} tone="seen" title="Commentaire inapproprié" meta="Signalé il y a 3 heures" trailing={<Pill tone="soft">Examiner</Pill>} />
        </div>
        <div className="ps-admin-panel">
          <div className="ps-admin-panel-head"><strong>Partenaires affichés</strong><Pill tone="found">2 actifs</Pill></div>
          <ListRow emoji="🏥" tone="found" title="Clinique des Ormes" meta="Mécénat · visible jusqu'au 31 décembre" trailing={<Pill tone="soft">Modifier</Pill>} />
          <ListRow emoji="🛍️" tone="found" title="Animalerie Pastel" meta="Mécénat · visible jusqu'au 30 septembre" trailing={<Pill tone="soft">Modifier</Pill>} />
        </div>
      </div>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier écran (onboarding)', screen: <OnboardingScreen /> },
  { id: 'map', title: 'Carte autour de moi', subtitle: 'Écran d’accueil, filtres et épingles photo', screen: <MapScreen /> },
  { id: 'announce', title: 'Détail d’une annonce', subtitle: 'Le trajet reconstitué par les signalements', screen: <AnnounceScreen />, tall: true, scrollable: true },
  { id: 'declare', title: 'Déclaration de disparition', subtitle: 'Publiée et diffusée en moins d’une minute', screen: <DeclareScreen />, tall: true, scrollable: true },
  { id: 'found', title: 'J’ai trouvé un animal', subtitle: 'Les animaux perdus du secteur sont proposés', screen: <FoundScreen /> },
  { id: 'sighting', title: 'Signalement « je l’ai vu ici »', subtitle: 'Le point qui fait avancer les recherches', screen: <SightingScreen /> },
  { id: 'match', title: 'Rapprochements suggérés', subtitle: 'Distance, date et description, jamais de photo devinée', screen: <MatchScreen /> },
  { id: 'chat', title: 'Mise en relation', subtitle: 'Discussion et photos rattachées à l’annonce', screen: <ChatScreen /> },
  { id: 'alerts', title: 'Zone et notifications', subtitle: 'Chacun choisit son secteur et son rayon', screen: <AlertsScreen /> },
  { id: 'public', title: 'Page publique partagée', subtitle: 'Vue sans installer, depuis un lien Facebook', screen: <PublicPageScreen />, browser: true },
  { id: 'reunion', title: 'Retrouvailles', subtitle: 'Le compteur et le soutien à l’association', screen: <ReunionScreen /> },
  { id: 'community', title: 'Entraide et mur des retrouvailles', subtitle: 'Ce qui donne envie de rester', screen: <CommunityScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Page web réservée à l’association', screen: <AdminScreen />, wide: true },
]

export default function PetSolidariteMockupsPage() {
  return (
    <main className="pet-solidarite-mockups-page">
      <section className="ps-landing-hero">
        <div>
          <p className="ps-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="ps-reference">Pet Solidarité · MOB-2026-pet-solidarite</p>
          <p className="ps-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="ps-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className={`ps-mockup-card${mockup.wide ? ' ps-mockup-card-wide' : ''}`}>
            <div className="ps-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
              {mockup.scrollable && (
                <span className="ps-scroll-hint"><ChevronDown size={13} /> Écran à faire défiler</span>
              )}
            </div>
            <div className="ps-export-wrap">
              {mockup.wide
                ? mockup.screen
                : <PhoneFrame tall={mockup.tall} browser={mockup.browser}>{mockup.screen}</PhoneFrame>}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
