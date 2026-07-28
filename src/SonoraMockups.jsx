import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Flag,
  Heart,
  Home,
  ListMusic,
  Play,
  Plus,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkle,
  Upload,
  UserRound,
} from 'lucide-react'
import './sonora-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes. Une connexion internet est necessaire pour
// afficher ces visuels dans la proposition de maquette.
const FACE = {
  aicha: 'https://i.pravatar.cc/96?img=45',
  malik: 'https://i.pravatar.cc/96?img=59',
  lea: 'https://i.pravatar.cc/96?img=31',
  sam: 'https://i.pravatar.cc/96?img=68',
}

const COVER = {
  mamaAfrica: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80',
  sableChaud: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
  bamako: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&q=80',
  racines: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80',
  lumiere: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80',
  scene: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80',
}

/* ─────────────── Composants partages ─────────────── */

function StatusBar() {
  return (
    <div className="sn-statusbar">
      <span>9:41</span>
      <div className="sn-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false }) {
  return (
    <div className={`sn-phone-export${tall ? ' sn-phone-export-tall' : ''}`}>
      <div className="sn-phone">
        <div className="sn-screen">
          <StatusBar />
          {children}
          <div className="sn-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`sn-app-mark${large ? ' sn-app-mark-large' : ''}`}>
      <span className="sn-wave" aria-hidden="true"><i /><i /><i /><i /></span>
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`sn-ui-button sn-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`sn-icon-button ${className}`}>{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`sn-pill sn-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md' }) {
  return <span className={`sn-avatar sn-avatar-${size}`}><img src={src} alt="" /></span>
}

function TopBar({ title, subtitle, back = false, action }) {
  return (
    <div className="sn-topbar">
      {back
        ? <IconButton><ChevronRight className="sn-back-icon" size={18} /></IconButton>
        : <Avatar src={FACE.lea} size="top" />}
      <div className="sn-topbar-title">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <IconButton>{action || <Search size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <Home size={19} />, label: 'Découvrir' },
    { id: 'search', icon: <Search size={19} />, label: 'Rechercher' },
    { id: 'upload', icon: <Plus size={22} />, label: 'Publier' },
    { id: 'library', icon: <ListMusic size={19} />, label: 'Bibliothèque' },
    { id: 'profile', icon: <UserRound size={19} />, label: 'Profil' },
  ]
  return (
    <div className="sn-tabbar">
      {tabs.map((tab) => (
        <div key={tab.id} className={`sn-tab sn-tab-${tab.id}${active === tab.id ? ' sn-tab-active' : ''}`}>
          <span className="sn-tab-icon">{tab.icon}</span>
          {tab.id !== 'upload' && <small>{tab.label}</small>}
        </div>
      ))}
    </div>
  )
}

function SectionHead({ children, action }) {
  return (
    <div className="sn-section-head">
      <span>{children}</span>
      {action && <small>{action}</small>}
    </div>
  )
}

function TrackRow({ cover, title, artist, meta, trailing, index }) {
  return (
    <div className="sn-track-row">
      {index
        ? <span className="sn-track-index">{index}</span>
        : <span className="sn-track-cover"><img src={cover} alt="" /></span>}
      <div className="sn-track-body">
        <strong>{title}</strong>
        <small>{artist}{meta ? ` · ${meta}` : ''}</small>
      </div>
      {trailing || <span className="sn-track-play"><Play size={13} /></span>}
    </div>
  )
}

function UniverseTile({ cover, name, count, active = false }) {
  return (
    <div className={`sn-universe${active ? ' sn-universe-active' : ''}`}>
      <img src={cover} alt="" />
      <span className="sn-universe-veil" aria-hidden="true" />
      <div className="sn-universe-text">
        <strong>{name}</strong>
        <small>{count}</small>
      </div>
    </div>
  )
}

function MiniPlayer() {
  return (
    <div className="sn-mini-player">
      <span className="sn-track-cover"><img src={COVER.mamaAfrica} alt="" /></span>
      <div className="sn-track-body">
        <strong>Mama Africa</strong>
        <small>Aïcha Diallo</small>
      </div>
      <IconButton className="sn-mini-play"><Play size={15} /></IconButton>
    </div>
  )
}

/* ─────────────── Ecrans ─────────────── */

function OnboardingScreen() {
  return (
    <div className="sn-content sn-onboarding">
      <div className="sn-hero">
        <div className="sn-hero-photo">
          <img src={PHOTO.hero} alt="" />
          <span className="sn-hero-veil" aria-hidden="true" />
          <span className="sn-hero-sticker">0 label, 0 filtre</span>
        </div>
        <span className="sn-hero-mark"><AppMark large /></span>
      </div>
      <div className="sn-onboarding-text">
        <p className="sn-eyebrow-screen">SONORA</p>
        <h1>La musique que personne ne vous pousse.</h1>
        <p>Publiez votre morceau en trois minutes, choisissez votre univers, et laissez ceux qui cherchent ce son vous trouver.</p>
      </div>
      <div className="sn-dots" aria-hidden="true"><i className="sn-dot-on" /><i /><i /></div>
      <div className="sn-onboarding-actions">
        <UiButton>Créer mon compte <ArrowRight size={16} /></UiButton>
        <UiButton tone="ghost">J&apos;ai déjà un compte</UiButton>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Découvrir" subtitle="Bonsoir Léa" />
      <SectionHead action="Tout voir">Univers du moment</SectionHead>
      <div className="sn-universe-row">
        <UniverseTile cover={COVER.mamaAfrica} name="Sonorités africaines" count="128 titres" active />
        <UniverseTile cover={COVER.racines} name="Afrobeat" count="94 titres" />
      </div>
      <SectionHead action="Nouveautés">Publiés cette semaine</SectionHead>
      <div className="sn-panel">
        <TrackRow cover={COVER.sableChaud} title="Sable chaud" artist="Malik Sow" meta="3:42" />
        <TrackRow cover={COVER.bamako} title="Nuit à Bamako" artist="Aïcha Diallo" meta="4:08" />
        <TrackRow cover={COVER.lumiere} title="Lumière" artist="Sam Kéita" meta="2:57" />
      </div>
      <div className="sn-partner">
        <span className="sn-partner-label">Avec le soutien de</span>
        <div className="sn-partner-body">
          <span className="sn-partner-logo">SR</span>
          <div><strong>Studio Rivage</strong><small>Enregistrement à Bordeaux</small></div>
          <ChevronRight size={15} className="sn-chevron" />
        </div>
      </div>
      <MiniPlayer />
      <TabBar active="home" />
    </div>
  )
}

function UniversesScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Univers musicaux" back />
      <p className="sn-helper">Chaque morceau publié rejoint un univers. C&apos;est ce qui permet à un artiste inconnu d&apos;être trouvé.</p>
      <div className="sn-universe-grid">
        <UniverseTile cover={COVER.mamaAfrica} name="Sonorités africaines" count="128 titres" />
        <UniverseTile cover={COVER.racines} name="Afrobeat" count="94 titres" />
        <UniverseTile cover={COVER.scene} name="Rap" count="212 titres" />
        <UniverseTile cover={COVER.bamako} name="Acoustique" count="76 titres" />
        <UniverseTile cover={COVER.lumiere} name="Soul" count="61 titres" />
        <UniverseTile cover={COVER.sableChaud} name="Électro" count="88 titres" />
      </div>
      <TabBar active="home" />
    </div>
  )
}

function UniverseScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Sonorités africaines" subtitle="128 titres" back action={<Shuffle size={17} />} />
      <div className="sn-universe-hero">
        <img src={COVER.mamaAfrica} alt="" />
        <span className="sn-hero-veil" aria-hidden="true" />
        <div className="sn-universe-hero-text">
          <strong>Sonorités africaines</strong>
          <small>Kora, percussions, voix, des artistes qui publient depuis chez eux.</small>
        </div>
      </div>
      <div className="sn-chips">
        <span className="sn-chip sn-chip-on">Récents</span>
        <span className="sn-chip">Les plus écoutés</span>
      </div>
      <div className="sn-panel">
        <TrackRow index="1" title="Mama Africa" artist="Aïcha Diallo" meta="1 204 écoutes" />
        <TrackRow index="2" title="Nuit à Bamako" artist="Aïcha Diallo" meta="812 écoutes" />
        <TrackRow index="3" title="Racines" artist="Malik Sow" meta="643 écoutes" />
        <TrackRow index="4" title="Sable chaud" artist="Malik Sow" meta="518 écoutes" />
      </div>
      <TabBar active="home" />
    </div>
  )
}

function PlayerScreen() {
  return (
    <div className="sn-content sn-player">
      <div className="sn-player-top">
        <IconButton><ChevronDown size={18} /></IconButton>
        <span className="sn-player-context">Sonorités africaines</span>
        <IconButton><Flag size={16} /></IconButton>
      </div>
      <div className="sn-player-cover">
        <img src={COVER.mamaAfrica} alt="" />
      </div>
      <div className="sn-player-meta">
        <div>
          <h1>Mama Africa</h1>
          <p>Aïcha Diallo</p>
        </div>
        <IconButton className="sn-fav-on"><Heart size={17} /></IconButton>
      </div>
      <div className="sn-progress">
        <span className="sn-progress-bar"><i style={{ width: '42%' }} /><b style={{ left: '42%' }} /></span>
        <div className="sn-progress-time"><span>1:44</span><span>4:08</span></div>
      </div>
      <div className="sn-player-controls">
        <IconButton><Shuffle size={17} /></IconButton>
        <IconButton><SkipBack size={19} /></IconButton>
        <button className="sn-play-big"><Play size={24} /></button>
        <IconButton><SkipForward size={19} /></IconButton>
        <IconButton><Repeat size={17} /></IconButton>
      </div>
      <div className="sn-support">
        <Avatar src={FACE.aicha} size="row" />
        <div><strong>Soutenir Aïcha Diallo</strong><small>Le don va directement à l&apos;artiste.</small></div>
        <Pill tone="amber">Ouvrir</Pill>
      </div>
      <div className="sn-next-up">
        <span className="sn-next-label"><Sparkle size={12} />À suivre, même univers</span>
        <TrackRow cover={COVER.racines} title="Racines" artist="Malik Sow" trailing={<Pill tone="soft">Suggéré</Pill>} />
      </div>
    </div>
  )
}

function ArtistScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Aïcha Diallo" back action={<Flag size={16} />} />
      <div className="sn-artist-head">
        <Avatar src={FACE.aicha} size="xl" />
        <div className="sn-artist-info">
          <strong>Aïcha Diallo</strong>
          <small>Sonorités africaines · Dakar</small>
          <Pill tone="violet">Artiste vérifié</Pill>
        </div>
      </div>
      <p className="sn-artist-bio">Voix et kora. J&apos;enregistre chez moi et je publie tout ici, sans label.</p>
      <div className="sn-stat-row">
        <div><strong>4</strong><span>titres</span></div>
        <div><strong>2 656</strong><span>écoutes</span></div>
        <div><strong>184</strong><span>abonnés</span></div>
      </div>
      <div className="sn-artist-actions">
        <UiButton>Suivre</UiButton>
        <UiButton tone="ghost">Soutenir <Heart size={15} /></UiButton>
      </div>
      <SectionHead>Ses titres</SectionHead>
      <div className="sn-panel">
        <TrackRow index="1" title="Mama Africa" artist="1 204 écoutes" />
        <TrackRow index="2" title="Nuit à Bamako" artist="812 écoutes" />
      </div>
      <TabBar active="home" />
    </div>
  )
}

function BecomeArtistScreen() {
  return (
    <div className="sn-content">
      <TopBar title="Devenir artiste" back />
      <p className="sn-helper">Votre page publique et vos engagements. Votre compte est validé avant votre première publication.</p>
      <div className="sn-field"><label>Nom d&apos;artiste</label><div className="sn-input">Aïcha Diallo</div></div>
      <div className="sn-field"><label>Description</label><div className="sn-input sn-input-area">Voix et kora, enregistré à la maison.</div></div>
      <div className="sn-field"><label>Univers principal</label><div className="sn-input">Sonorités africaines</div></div>
      <div className="sn-field"><label>Lien de soutien (facultatif)</label><div className="sn-input sn-input-soft">paypal.me/aichadiallo</div></div>
      <SectionHead>Vos engagements</SectionHead>
      <div className="sn-consent">
        <span className="sn-check sn-check-on"><Check size={12} /></span>
        <p>Je suis l&apos;auteur des morceaux que je publie, ou je détiens toutes les autorisations nécessaires.</p>
      </div>
      <div className="sn-consent">
        <span className="sn-check sn-check-on"><Check size={12} /></span>
        <p>Je n&apos;ai pas confié la gestion de mes droits à une société comme la SACEM.</p>
      </div>
      <div className="sn-bottom-actions">
        <UiButton>Envoyer ma demande</UiButton>
      </div>
    </div>
  )
}

function UploadScreen() {
  return (
    <div className="sn-content">
      <TopBar title="Publier un titre" back />
      <div className="sn-upload-drop">
        <span className="sn-upload-icon"><Upload size={18} /></span>
        <div><strong>mama-africa.mp3</strong><small>8,4 Mo · envoi terminé</small></div>
        <Pill tone="green"><Check size={11} />Prêt</Pill>
      </div>
      <div className="sn-upload-progress"><i style={{ width: '100%' }} /></div>
      <div className="sn-field-row">
        <div className="sn-cover-pick"><img src={COVER.mamaAfrica} alt="" /><span>Pochette</span></div>
        <div className="sn-field-stack">
          <div className="sn-field"><label>Titre</label><div className="sn-input">Mama Africa</div></div>
          <div className="sn-field"><label>Univers</label><div className="sn-input">Sonorités africaines</div></div>
        </div>
      </div>
      <div className="sn-field"><label>Description</label><div className="sn-input sn-input-area">Enregistré à Dakar, voix et kora.</div></div>
      <div className="sn-consent">
        <span className="sn-check sn-check-on"><Check size={12} /></span>
        <p>Je confirme détenir les droits sur ce morceau.</p>
      </div>
      <div className="sn-bottom-actions">
        <UiButton>Publier maintenant</UiButton>
      </div>
    </div>
  )
}

function MyTracksScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Mes titres" subtitle="Espace artiste" action={<Plus size={18} />} />
      <div className="sn-stat-row">
        <div><strong>4</strong><span>publiés</span></div>
        <div><strong>2 656</strong><span>écoutes</span></div>
        <div><strong>+184</strong><span>ce mois</span></div>
      </div>
      <SectionHead action="Trier">Publiés</SectionHead>
      <div className="sn-panel">
        <TrackRow cover={COVER.mamaAfrica} title="Mama Africa" artist="1 204 écoutes" trailing={<Pill tone="green">En ligne</Pill>} />
        <TrackRow cover={COVER.bamako} title="Nuit à Bamako" artist="812 écoutes" trailing={<Pill tone="green">En ligne</Pill>} />
        <TrackRow cover={COVER.racines} title="Racines" artist="Brouillon" trailing={<Pill tone="soft">Reprendre</Pill>} />
      </div>
      <MiniPlayer />
      <TabBar active="profile" />
    </div>
  )
}

function LibraryScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Bibliothèque" />
      <div className="sn-chips">
        <span className="sn-chip sn-chip-on">Favoris</span>
        <span className="sn-chip">Artistes suivis</span>
        <span className="sn-chip">Historique</span>
      </div>
      <div className="sn-panel">
        <TrackRow cover={COVER.mamaAfrica} title="Mama Africa" artist="Aïcha Diallo" meta="4:08" trailing={<span className="sn-fav"><Heart size={13} /></span>} />
        <TrackRow cover={COVER.sableChaud} title="Sable chaud" artist="Malik Sow" meta="3:42" trailing={<span className="sn-fav"><Heart size={13} /></span>} />
        <TrackRow cover={COVER.lumiere} title="Lumière" artist="Sam Kéita" meta="2:57" trailing={<span className="sn-fav"><Heart size={13} /></span>} />
      </div>
      <SectionHead action="Voir tout">Artistes suivis</SectionHead>
      <div className="sn-follow-row">
        <div className="sn-follow"><Avatar src={FACE.aicha} size="lg" /><small>Aïcha</small></div>
        <div className="sn-follow"><Avatar src={FACE.malik} size="lg" /><small>Malik</small></div>
        <div className="sn-follow"><Avatar src={FACE.sam} size="lg" /><small>Sam</small></div>
      </div>
      <MiniPlayer />
      <TabBar active="library" />
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="sn-content sn-with-tab">
      <TopBar title="Rechercher" />
      <div className="sn-search-field"><Search size={15} /><span>kora</span></div>
      <div className="sn-chips">
        <span className="sn-chip sn-chip-on">Tout</span>
        <span className="sn-chip">Titres</span>
        <span className="sn-chip">Artistes</span>
        <span className="sn-chip">Univers</span>
      </div>
      <SectionHead>Artistes</SectionHead>
      <div className="sn-panel">
        <TrackRow cover={FACE.aicha} title="Aïcha Diallo" artist="Sonorités africaines · 184 abonnés" trailing={<Pill tone="soft">Suivre</Pill>} />
      </div>
      <SectionHead>Titres</SectionHead>
      <div className="sn-panel">
        <TrackRow cover={COVER.mamaAfrica} title="Mama Africa" artist="Aïcha Diallo" meta="4:08" />
        <TrackRow cover={COVER.racines} title="Racines" artist="Malik Sow" meta="3:19" />
      </div>
      <TabBar active="search" />
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="sn-content">
      <TopBar title="Administration" subtitle="Votre compte" action={<ChevronDown size={16} />} />
      <div className="sn-admin-stats">
        <div><span>Titres publiés</span><strong>412</strong></div>
        <div><span>Écoutes du mois</span><strong>18 240</strong></div>
        <div><span>Artistes actifs</span><strong>63</strong></div>
        <div><span>À traiter</span><strong className="sn-alert">3</strong></div>
      </div>
      <SectionHead action="3 en attente">Demandes de compte artiste</SectionHead>
      <div className="sn-panel">
        <TrackRow cover={FACE.malik} title="Malik Sow" artist="Afrobeat · demande du 26 juillet" trailing={<Pill tone="green"><Check size={11} />Valider</Pill>} />
        <TrackRow cover={FACE.sam} title="Sam Kéita" artist="Soul · demande du 25 juillet" trailing={<Pill tone="green"><Check size={11} />Valider</Pill>} />
      </div>
      <SectionHead>Titres signalés</SectionHead>
      <div className="sn-panel">
        <TrackRow
          cover={COVER.scene}
          title="Titre signalé 2 fois"
          artist="Revendication de droits d'auteur"
          trailing={<Pill tone="alert"><CircleAlert size={11} />Retirer</Pill>}
        />
      </div>
      <TabBar active="profile" />
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier écran (onboarding)', screen: <OnboardingScreen /> },
  { id: 'home', title: 'Découvrir', subtitle: 'Écran d’accueil, univers et nouveautés', screen: <HomeScreen /> },
  { id: 'universes', title: 'Univers musicaux', subtitle: 'Le chemin vers les artistes inconnus', screen: <UniversesScreen /> },
  { id: 'universe', title: 'Page d’un univers', subtitle: 'Tous les titres d’un même son', screen: <UniverseScreen /> },
  { id: 'player', title: 'Lecteur plein écran', subtitle: 'Écoute, soutien et suggestion à suivre', screen: <PlayerScreen />, tall: true, scrollable: true },
  { id: 'artist', title: 'Profil artiste', subtitle: 'Page publique, suivre et soutenir', screen: <ArtistScreen /> },
  { id: 'become', title: 'Devenir artiste', subtitle: 'Les engagements sur les droits', screen: <BecomeArtistScreen /> },
  { id: 'upload', title: 'Publier un titre', subtitle: 'Depuis le téléphone, en trois minutes', screen: <UploadScreen /> },
  { id: 'tracks', title: 'Mes titres', subtitle: 'Espace artiste et écoutes', screen: <MyTracksScreen /> },
  { id: 'library', title: 'Bibliothèque', subtitle: 'Favoris, artistes suivis, historique', screen: <LibraryScreen /> },
  { id: 'search', title: 'Rechercher', subtitle: 'Par titre, artiste ou univers', screen: <SearchScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Validation des artistes et signalements', screen: <AdminScreen /> },
]

export default function SonoraMockupsPage() {
  return (
    <main className="sonora-mockups-page">
      <section className="sn-landing-hero">
        <div>
          <p className="sn-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="sn-reference">Sonora · MOB-2026-sonora</p>
          <p className="sn-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="sn-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="sn-mockup-card">
            <div className="sn-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
              {mockup.scrollable && (
                <span className="sn-scroll-hint"><ChevronDown size={13} /> Écran à faire défiler</span>
              )}
            </div>
            <div className="sn-export-wrap">
              <PhoneFrame tall={mockup.tall}>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
