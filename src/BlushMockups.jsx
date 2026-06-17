import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Flame,
  Globe,
  Heart,
  Image as ImageIcon,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Send,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import './blush-mockups.css'
import StatusBarIcons from './StatusBarIcons'

function StatusBar() {
  return (
    <div className="bl-statusbar">
      <span>9:41</span>
      <div className="bl-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="bl-phone-export">
      <div className="bl-phone">
        <div className="bl-screen">
          <StatusBar />
          {children}
          <div className="bl-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`bl-app-mark${large ? ' bl-app-mark-large' : ''}`}>
      <Heart size={large ? 30 : 18} fill="currentColor" />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.4l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.5ZM14.2 5.8c.6-.7 1-1.7.9-2.8-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`bl-ui-button bl-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`bl-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`bl-screen-title${centered ? ' bl-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, action, leading }) {
  return (
    <div className="bl-topbar">
      {leading || <span className="bl-topbar-avatar">L</span>}
      <strong>{title}</strong>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'discover' }) {
  const tabs = [
    { id: 'discover', icon: <Flame size={20} />, label: 'Découvrir' },
    { id: 'likes', icon: <Heart size={20} />, label: 'Matchs' },
    { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
    { id: 'profile', icon: <User size={20} />, label: 'Profil' },
  ]
  return (
    <div className="bl-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`bl-tab${t.id === active ? ' bl-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, title, meta, trailing }) {
  return (
    <div className="bl-list-row">
      <span className="bl-list-ico">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={16} />}
    </div>
  )
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`bl-pill bl-pill-${tone}`}>{children}</span>
}

// Photo de profil "révélée" partiellement : un dégradé coloré rendu flou selon
// le niveau de révélation (0 = très flou, 100 = net). Pas de personnage dessiné,
// juste une vraie image floutée façon défloutage progressif.
function BlurPhoto({ from, to, reveal = 0, src, className = '', children }) {
  const blur = Math.max(0, 18 - (reveal / 100) * 18)
  return (
    <div className={`bl-photo ${className}`}>
      <div
        className="bl-photo-img"
        style={{ background: `linear-gradient(150deg, ${from}, ${to})`, filter: src ? 'none' : `blur(${blur}px)` }}
      />
      {src && (
        <img
          className="bl-photo-real"
          src={src}
          alt=""
          loading="lazy"
          style={{ filter: `blur(${blur}px)` }}
        />
      )}
      {children}
    </div>
  )
}

// Photos de démonstration (vraies images via pravatar.cc, service gratuit
// de portraits). Le flou progressif s'applique dessus. Remplaçables plus tard
// par les vraies photos du client ou des fichiers locaux dans public/assets.
const FACE = {
  thomas: 'https://i.pravatar.cc/360?img=12',
  lea: 'https://i.pravatar.cc/360?img=45',
  hugo: 'https://i.pravatar.cc/360?img=33',
  adrien: 'https://i.pravatar.cc/360?img=51',
  sami: 'https://i.pravatar.cc/360?img=68',
}

function RevealBar({ reveal }) {
  return (
    <div className="bl-reveal">
      <div className="bl-reveal-head">
        <span className="bl-reveal-ico"><ImageIcon size={13} /></span>
        <strong>Photo révélée à {reveal}%</strong>
        <small>{reveal < 100 ? 'continuez la discussion' : 'photo nette'}</small>
      </div>
      <div className="bl-reveal-bar"><span style={{ width: `${reveal}%` }} /></div>
    </div>
  )
}

/* ───────────────────────── Screens ───────────────────────── */

function LoginScreen() {
  return (
    <div className="bl-content bl-login">
      <div className="bl-login-top">
        <AppMark large />
        <ScreenTitle
          centered
          eyebrow="BLUSH"
          title="On discute d'abord. La photo se révèle ensuite."
          subtitle="Des rencontres qui commencent par une vraie conversation, pas par un visage."
        />
      </div>
      <div className="bl-login-bottom">
        <UiButton>Continuer avec l'e-mail<ArrowRight size={17} /></UiButton>
        <UiButton tone="ghostline" className="bl-auth-btn"><GoogleIcon />Continuer avec Google</UiButton>
        <UiButton tone="dark" className="bl-auth-btn"><AppleIcon />Continuer avec Apple</UiButton>
        <p className="bl-legal-note">En continuant, vous acceptez les CGU et la politique de confidentialité.</p>
      </div>
    </div>
  )
}

function ProfileSetupScreen() {
  return (
    <div className="bl-content bl-form-screen">
      <ScreenTitle eyebrow="ÉTAPE 3 / 4" title="Votre profil" subtitle="C'est ce que les autres verront avant la photo." />
      <div className="bl-field"><label>Prénom</label><div className="bl-input">Léa</div></div>
      <div className="bl-field-row">
        <div className="bl-field"><label>Âge</label><div className="bl-input">27</div></div>
        <div className="bl-field"><label>Genre</label><div className="bl-input">Femme</div></div>
      </div>
      <div className="bl-field"><label>Votre bio</label><div className="bl-textarea">Café, randos et concerts le week-end. Je cherche quelqu'un avec qui rire…</div></div>
      <div className="bl-field"><label>Je recherche</label>
        <div className="bl-chips"><span className="bl-chip">Femmes</span><span className="bl-chip bl-chip-on">Hommes</span><span className="bl-chip">Tous</span></div>
      </div>
      <div className="bl-field"><label>Centres d'intérêt</label>
        <div className="bl-chips"><span className="bl-chip bl-chip-on">Voyage</span><span className="bl-chip bl-chip-on">Musique</span><span className="bl-chip">Sport</span><span className="bl-chip bl-chip-on">Cuisine</span><span className="bl-chip">Cinéma</span></div>
      </div>
      <UiButton className="bl-w-full">Continuer<ArrowRight size={16} /></UiButton>
    </div>
  )
}

function DiscoverScreen() {
  return (
    <div className="bl-content bl-pad-tab bl-discover">
      <TopBar title="Découvrir" action={<Settings size={17} />} leading={<span className="bl-quota-chip"><Flame size={13} />3/5</span>} />
      <div className="bl-swipe-card">
        <BlurPhoto from="#f5b7c4" to="#b96b8f" reveal={0} src={FACE.thomas} className="bl-swipe-photo">
          <span className="bl-photo-lock"><Lock size={15} /></span>
          <div className="bl-swipe-info">
            <h2>Thomas, 29</h2>
            <p>à 4 km · Marseille</p>
            <p className="bl-swipe-bio">Guitariste le week-end, accro aux petits restos et aux voyages improvisés.</p>
            <div className="bl-tag-row"><Pill tone="soft">Musique</Pill><Pill tone="soft">Voyage</Pill><Pill tone="soft">Cuisine</Pill></div>
          </div>
        </BlurPhoto>
      </div>
      <p className="bl-swipe-hint">La photo se dévoile au fil de vos échanges après le match.</p>
      <div className="bl-swipe-actions">
        <button className="bl-swipe-btn bl-swipe-pass"><X size={26} /></button>
        <button className="bl-swipe-btn bl-swipe-like"><Heart size={28} fill="currentColor" /></button>
      </div>
      <TabBar active="discover" />
    </div>
  )
}

function MatchScreen() {
  return (
    <div className="bl-content bl-match">
      <div className="bl-match-glow" />
      <div className="bl-match-avatars">
        <BlurPhoto from="#ffd1dc" to="#e5709a" reveal={14} src={FACE.lea} className="bl-match-av" />
        <span className="bl-match-heart"><Heart size={22} fill="currentColor" /></span>
        <BlurPhoto from="#f7b7c8" to="#b96b8f" reveal={14} src={FACE.thomas} className="bl-match-av" />
      </div>
      <ScreenTitle centered title="C'est un match !" subtitle="Vous et Thomas vous êtes aimés. Lancez la conversation pour révéler vos photos." />
      <div className="bl-match-actions">
        <UiButton className="bl-w-full">Envoyer un message<Send size={16} /></UiButton>
        <UiButton tone="ghostline" className="bl-w-full">Continuer à découvrir</UiButton>
      </div>
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="bl-content bl-chat">
      <div className="bl-chat-top">
        <IconButton><ChevronRight size={18} className="bl-flip" /></IconButton>
        <div className="bl-chat-peer">
          <BlurPhoto from="#f7b7c8" to="#b96b8f" reveal={60} src={FACE.thomas} className="bl-chat-av" />
          <div><strong>Thomas, 29</strong><small>en ligne</small></div>
        </div>
        <IconButton><MoreHorizontal size={18} /></IconButton>
      </div>
      <RevealBar reveal={60} />
      <div className="bl-chat-thread">
        <div className="bl-bubble bl-bubble-in">Salut Léa ! Ta bio m'a fait sourire, c'était quoi le dernier concert ?</div>
        <div className="bl-bubble bl-bubble-out">Hello ! Fred again à Marseille, incroyable. Et toi tu voyages beaucoup ?</div>
        <div className="bl-bubble bl-bubble-in">Pas mal oui, je rentre du Portugal. On dirait qu'on va bien s'entendre 😄</div>
        <div className="bl-reveal-toast"><Sparkles size={14} />Vous avez débloqué 60% de la photo</div>
        <div className="bl-bubble bl-bubble-out">Carrément ! Tu fais quoi ce week-end ?</div>
      </div>
      <div className="bl-chat-input">
        <div className="bl-chat-field">Votre message…</div>
        <button className="bl-chat-send"><Send size={18} /></button>
      </div>
    </div>
  )
}

function MessagesScreen() {
  const convos = [
    { id: 1, name: 'Thomas, 29', last: 'Carrément ! Tu fais quoi…', reveal: 60, from: '#f7b7c8', to: '#b96b8f', src: FACE.thomas, unread: true },
    { id: 2, name: 'Hugo, 31', last: 'Trop bien ce resto, merci !', reveal: 100, from: '#ffd9c0', to: '#d98a5a', src: FACE.hugo, unread: false },
    { id: 3, name: 'Adrien, 26', last: 'On se capte demain alors', reveal: 35, from: '#cdd6ff', to: '#7d8ad6', src: FACE.adrien, unread: false },
    { id: 4, name: 'Sami, 28', last: 'Vous avez matché', reveal: 8, from: '#d5f0d8', to: '#6fb681', src: FACE.sami, unread: true },
  ]
  return (
    <div className="bl-content bl-pad-tab">
      <TopBar title="Messages" action={<Settings size={17} />} />
      <div className="bl-section-label">Nouveaux matchs</div>
      <div className="bl-new-matchs">
        {convos.map((c) => (
          <div key={c.id} className="bl-new-match">
            <BlurPhoto from={c.from} to={c.to} reveal={c.reveal} src={c.src} className="bl-new-av" />
            <small>{c.name.split(',')[0]}</small>
          </div>
        ))}
      </div>
      <div className="bl-section-label">Conversations</div>
      <div className="bl-panel bl-panel-flush">
        {convos.map((c) => (
          <div key={c.id} className="bl-convo-row">
            <BlurPhoto from={c.from} to={c.to} reveal={c.reveal} src={c.src} className="bl-convo-av" />
            <div className="bl-convo-body">
              <strong>{c.name}</strong>
              <small>{c.last}</small>
            </div>
            <div className="bl-convo-side">
              <span className="bl-convo-reveal">{c.reveal}%</span>
              {c.unread && <span className="bl-convo-dot" />}
            </div>
          </div>
        ))}
      </div>
      <TabBar active="messages" />
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="bl-content bl-paywall">
      <div className="bl-quota-icon"><Flame size={24} /></div>
      <ScreenTitle centered eyebrow="QUOTA ATTEINT" title="Vous avez utilisé vos 5 matchs" subtitle="Vos matchs gratuits reviennent dans 4 jours. Passez en illimité pour continuer dès maintenant." />
      <div className="bl-benefits">
        <div className="bl-benefit"><Check size={15} />Matchs illimités, sans attente</div>
        <div className="bl-benefit"><Check size={15} />Révélation des photos plus rapide</div>
        <div className="bl-benefit"><Check size={15} />Voyez qui vous a déjà aimé</div>
      </div>
      <div className="bl-plans">
        <button className="bl-plan bl-plan-on">
          <Pill tone="rose">−58%</Pill>
          <span>Annuel</span><strong>59,99 €</strong><small>soit 1,15 €/sem.</small>
        </button>
        <button className="bl-plan">
          <span>Hebdo</span><strong>4,99 €</strong><small>par semaine</small>
        </button>
      </div>
      <UiButton className="bl-w-full">Passer en illimité</UiButton>
      <p className="bl-legal-note">Paiement via l'App Store / Google Play. Sans engagement, résiliable à tout moment.</p>
    </div>
  )
}

function ReportScreen() {
  const reasons = [
    'Photos ou propos inappropriés',
    'Faux profil ou usurpation',
    'Harcèlement ou insultes',
    'Arnaque ou demande d\'argent',
    'Mineur',
  ]
  return (
    <div className="bl-content">
      <TopBar title="Signaler Thomas" action={<X size={18} />} leading={<span className="bl-report-lead"><ShieldAlert size={18} /></span>} />
      <ScreenTitle title="Que se passe-t-il ?" subtitle="Votre signalement est anonyme. Notre équipe vérifie chaque cas." />
      <div className="bl-radio-list">
        {reasons.map((r, i) => (
          <div key={r} className={`bl-radio-row${i === 0 ? ' bl-radio-on' : ''}`}>
            <span className="bl-radio" />
            <strong>{r}</strong>
          </div>
        ))}
      </div>
      <div className="bl-block-note"><Shield size={15} />Bloquer cette personne en même temps</div>
      <UiButton tone="danger" className="bl-w-full">Envoyer le signalement</UiButton>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="bl-content bl-pad-tab">
      <TopBar title="Modération" action={<Settings size={17} />} leading={<span className="bl-admin-lead"><Shield size={18} /></span>} />
      <div className="bl-stat-grid">
        <div className="bl-stat"><span>À traiter</span><strong>7</strong><small>signalements</small></div>
        <div className="bl-stat"><span>Cette semaine</span><strong>23</strong><small>traités</small></div>
      </div>
      <div className="bl-segmented">
        <button className="bl-seg bl-seg-on">À traiter</button>
        <button className="bl-seg">Traités</button>
        <button className="bl-seg">Comptes</button>
      </div>
      <div className="bl-panel bl-panel-flush">
        <ListRow icon={<ShieldAlert size={16} />} title="Profil signalé · Kevin82" meta="3 signalements · propos déplacés" trailing={<Pill tone="alert">Urgent</Pill>} />
        <ListRow icon={<ShieldAlert size={16} />} title="Message signalé · Marc_M" meta="1 signalement · harcèlement" trailing={<Pill tone="neutral">Nouveau</Pill>} />
        <ListRow icon={<User size={16} />} title="Faux profil · lea_officiel" meta="2 signalements · usurpation" trailing={<Pill tone="neutral">Nouveau</Pill>} />
      </div>
      <div className="bl-admin-actions">
        <UiButton tone="danger" className="bl-w-full">Suspendre le compte</UiButton>
        <UiButton tone="ghostline" className="bl-w-full">Ignorer</UiButton>
      </div>
      <TabBar active="profile" />
    </div>
  )
}

function MyProfileScreen() {
  return (
    <div className="bl-content bl-pad-tab">
      <TopBar title="Profil" action={<Settings size={17} />} />
      <div className="bl-profile">
        <BlurPhoto from="#ffd1dc" to="#e5709a" reveal={100} src={FACE.lea} className="bl-profile-av" />
        <div><strong>Léa, 27</strong><small>Marseille</small></div>
        <Pill tone="rose">Gratuit</Pill>
      </div>
      <div className="bl-section-label">Mon compte</div>
      <div className="bl-panel bl-panel-flush">
        <ListRow icon={<Heart size={16} />} title="Passer en illimité" meta="Matchs sans limite" trailing={<Pill tone="rose">Pro</Pill>} />
        <ListRow icon={<ImageIcon size={16} />} title="Mes photos" meta="3 photos · floutage activé" />
        <ListRow icon={<User size={16} />} title="Modifier mon profil" meta="Bio, intérêts, recherche" />
      </div>
      <div className="bl-section-label">Sécurité & préférences</div>
      <div className="bl-panel bl-panel-flush">
        <ListRow icon={<Bell size={16} />} title="Notifications" meta="Matchs et messages" />
        <ListRow icon={<Shield size={16} />} title="Profils bloqués" meta="2 personnes" />
        <ListRow icon={<Globe size={16} />} title="Confidentialité" meta="Données & RGPD" />
      </div>
    </div>
  )
}

const mockups = [
  { id: 'login', title: 'Connexion', subtitle: 'E-mail, Google, Apple', screen: <LoginScreen /> },
  { id: 'profile-setup', title: 'Création du profil', subtitle: 'Bio, intérêts, recherche', screen: <ProfileSetupScreen /> },
  { id: 'discover', title: 'Découverte', subtitle: 'Profils floutés · aimer ou passer', screen: <DiscoverScreen /> },
  { id: 'match', title: 'C\'est un match', subtitle: 'Intérêt réciproque', screen: <MatchScreen /> },
  { id: 'chat', title: 'Conversation', subtitle: 'Défloutage progressif de la photo', screen: <ChatScreen /> },
  { id: 'messages', title: 'Messages', subtitle: 'Matchs et conversations', screen: <MessagesScreen /> },
  { id: 'paywall', title: 'Quota & abonnement', subtitle: '5 matchs / 7 jours · hebdo ou annuel', screen: <PaywallScreen /> },
  { id: 'report', title: 'Signalement', subtitle: 'Signaler & bloquer', screen: <ReportScreen /> },
  { id: 'admin', title: 'Modération', subtitle: 'Espace administrateur intégré', screen: <AdminScreen /> },
  { id: 'profile', title: 'Mon profil', subtitle: 'Compte & sécurité', screen: <MyProfileScreen /> },
]

export default function BlushMockupsPage() {
  return (
    <main className="blush-mockups-page">
      <section className="bl-landing-hero">
        <div>
          <p className="bl-eyebrow">Proposition d'accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="bl-reference">Blush Rencontre · MOB-2026-blush</p>
          <p className="bl-disclaimer">
            Aperçu rapide pour visualiser l'idée — toutes les pages ne sont pas illustrées
            et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="bl-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="bl-mockup-card">
            <div className="bl-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="bl-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
