import {
  ArrowRight,
  Ban,
  Bell,
  Check,
  ChevronRight,
  Flag,
  Home,
  KeyRound,
  ListChecks,
  MessageCircle,
  Plus,
  Receipt,
  Settings,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import './colocool-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Vraies photos par URL (cf. guide creation-maquette : pravatar = visages
// stables et deterministes, Unsplash = photos precises). Necessite une
// connexion internet a l'affichage.
const FACE = {
  lea: 'https://i.pravatar.cc/96?img=47',
  max: 'https://i.pravatar.cc/96?img=12',
  sofia: 'https://i.pravatar.cc/96?img=32',
  tom: 'https://i.pravatar.cc/96?img=15',
}
const PHOTO = {
  flat: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
  friends: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
}

function StatusBar() {
  return (
    <div className="cc-statusbar">
      <span>9:41</span>
      <div className="cc-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="cc-phone-export">
      <div className="cc-phone">
        <div className="cc-screen">
          <StatusBar />
          {children}
          <div className="cc-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`cc-app-mark${large ? ' cc-app-mark-large' : ''}`}>
      <Home size={large ? 28 : 18} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`cc-ui-button cc-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`cc-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`cc-screen-title${centered ? ' cc-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, action }) {
  return (
    <div className="cc-topbar">
      <span className="cc-topbar-avatar"><img src={FACE.tom} alt="" /></span>
      <strong>{title}</strong>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <Home size={20} />, label: 'Accueil' },
    { id: 'money', icon: <Receipt size={20} />, label: 'Dépenses' },
    { id: 'tasks', icon: <ListChecks size={20} />, label: 'Tâches' },
    { id: 'chat', icon: <MessageCircle size={20} />, label: 'Discussion' },
  ]
  return (
    <div className="cc-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`cc-tab${t.id === active ? ' cc-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, title, meta, trailing, iconTone = '' }) {
  return (
    <div className="cc-list-row">
      <span className={`cc-list-ico ${iconTone}`}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={16} />}
    </div>
  )
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`cc-pill cc-pill-${tone}`}>{children}</span>
}

function Avatar({ src, letter, tone = 'violet', size = 'md' }) {
  return (
    <span className={`cc-av cc-av-${tone} cc-av-${size}`}>
      {src ? <img src={src} alt="" /> : letter}
    </span>
  )
}

/* ───────────────────────── Screens ───────────────────────── */

function OnboardingScreen() {
  return (
    <div className="cc-content cc-login">
      <div className="cc-hero-photo">
        <img src={PHOTO.friends} alt="" />
        <div className="cc-hero-glow" />
        <span className="cc-hero-badge">😎 0 prise de tête</span>
        <div className="cc-hero-mark"><AppMark large /></div>
      </div>
      <div className="cc-login-top">
        <ScreenTitle
          centered
          eyebrow="COLOCOOL"
          title="La coloc sans prise de tête."
          subtitle="Dépenses, tâches ménagères, discussion et rappels : toute la vie de votre coloc, au même endroit."
        />
      </div>
      <div className="cc-login-bottom">
        <UiButton>Créer mon compte<ArrowRight size={17} /></UiButton>
        <UiButton tone="ghostline" className="cc-auth-btn">J&apos;ai déjà un compte</UiButton>
        <p className="cc-legal-note">Connexion par email et mot de passe. En continuant, vous acceptez les CGU et la politique de confidentialité.</p>
      </div>
    </div>
  )
}

function CreateJoinScreen() {
  return (
    <div className="cc-content cc-form-screen">
      <div className="cc-public-head">
        <AppMark />
        <span>Bienvenue, Tom</span>
      </div>
      <ScreenTitle title="Créer ou rejoindre une coloc" subtitle="Une coloc = un espace partagé entre tous les colocataires." />
      <div className="cc-field"><label>Nom de la coloc</label><div className="cc-input">Coloc Rue Verte</div></div>
      <div className="cc-field"><label>Photo</label><div className="cc-input cc-input-soft">Ajouter une photo de la coloc</div></div>
      <UiButton className="cc-w-full">Créer la coloc</UiButton>
      <div className="cc-divider"><span>ou</span></div>
      <div className="cc-field"><label>Code d&apos;invitation</label>
        <div className="cc-code-row">
          <span className="cc-code-ico"><KeyRound size={16} /></span>
          <div className="cc-input cc-code-input">COLO-8FT2</div>
        </div>
      </div>
      <UiButton tone="ghostline" className="cc-w-full">Rejoindre avec le code</UiButton>
    </div>
  )
}

function DashboardScreen() {
  return (
    <div className="cc-content cc-pad-tab">
      <TopBar title="Coloc Rue Verte" />
      <div className="cc-next-card cc-photo-card">
        <img className="cc-card-photo" src={PHOTO.flat} alt="" />
        <div className="cc-photo-overlay" />
        <div className="cc-photo-body">
          <div className="cc-next-head">
            <Pill tone="onGlass">Ton solde</Pill>
            <span className="cc-next-when">Juin</span>
          </div>
          <h2>+ 18,50 € en ta faveur</h2>
          <p>Max te doit 12,00 € · Sofia te doit 6,50 €</p>
          <div className="cc-next-foot">
            <div className="cc-next-prog"><span style={{ width: '80%' }} /></div>
            <small>Tâches de la semaine 12/15</small>
          </div>
        </div>
      </div>

      <div className="cc-stat-grid">
        <div className="cc-stat"><span>Dépenses juin</span><strong>486 €</strong><small>4 colocataires</small></div>
        <div className="cc-stat"><span>Tâches faites</span><strong>12/15</strong><small>cette semaine</small></div>
        <div className="cc-stat"><span>Sondages</span><strong>1</strong><small>en cours</small></div>
        <div className="cc-stat"><span>Colocs</span><strong>4</strong><small>membres</small></div>
      </div>

      <div className="cc-section-label">Aujourd&apos;hui</div>
      <div className="cc-panel">
        <ListRow iconTone="cc-ico-amber" icon={<span className="cc-emoji">🗑️</span>} title="Sortir les poubelles" meta="À toi de jouer · ce soir" trailing={<Pill tone="alert">À faire</Pill>} />
        <ListRow iconTone="cc-ico-green" icon={<span className="cc-emoji">🛒</span>} title="Courses ajoutées par Léa" meta="64,90 € · 4 participants" trailing={<Pill tone="neutral">Répartie</Pill>} />
      </div>
      <TabBar active="home" />
    </div>
  )
}

function ExpensesScreen() {
  return (
    <div className="cc-content cc-pad-tab">
      <TopBar title="Dépenses" action={<Plus size={18} />} />
      <div className="cc-balance">
        <span>Dépenses de juin</span>
        <strong>486,20 €</strong>
        <small>réparties automatiquement entre 4 colocataires</small>
      </div>
      <div className="cc-segmented">
        <button className="cc-seg cc-seg-on">Toutes</button>
        <button className="cc-seg">À rembourser</button>
        <button className="cc-seg">Remboursées</button>
      </div>
      <div className="cc-panel cc-panel-flush">
        <ListRow iconTone="cc-ico-green" icon={<span className="cc-emoji">🛒</span>} title="Courses Carrefour" meta="Léa · hier · 4 participants" trailing={<span className="cc-row-amount">64,90 €</span>} />
        <ListRow iconTone="cc-ico-blue" icon={<span className="cc-emoji">📶</span>} title="Internet Free" meta="Tom · 1 juin · 4 participants" trailing={<span className="cc-row-amount">34,99 €</span>} />
        <ListRow iconTone="cc-ico-amber" icon={<span className="cc-emoji">🧽</span>} title="Produits ménage" meta="Sofia · 28 mai · 4 participants" trailing={<span className="cc-row-amount">18,40 €</span>} />
        <ListRow iconTone="cc-ico-red" icon={<span className="cc-emoji">🍕</span>} title="Soirée pizza" meta="Max · 24 mai · 3 participants" trailing={<Pill tone="green">Remboursée</Pill>} />
      </div>
      <TabBar active="money" />
    </div>
  )
}

function AddExpenseScreen() {
  return (
    <div className="cc-content cc-form-screen">
      <div className="cc-public-head">
        <AppMark />
        <span>Nouvelle dépense</span>
      </div>
      <div className="cc-amount-input">
        <span>Montant</span>
        <strong>64,90 €</strong>
      </div>
      <div className="cc-field"><label>Titre</label><div className="cc-input">Courses de la semaine</div></div>
      <div className="cc-field"><label>Catégorie</label>
        <div className="cc-chips"><span className="cc-chip cc-chip-on">Courses</span><span className="cc-chip">Loyer</span><span className="cc-chip">Sorties</span><span className="cc-chip">Autre</span></div>
      </div>
      <div className="cc-field"><label>Payée par</label>
        <div className="cc-av-chips">
          <span className="cc-av-chip cc-av-chip-on"><Avatar src={FACE.lea} letter="L" size="sm" />Léa</span>
          <span className="cc-av-chip"><Avatar src={FACE.tom} letter="T" tone="green" size="sm" />Toi</span>
        </div>
      </div>
      <div className="cc-field"><label>Répartie entre</label>
        <div className="cc-av-chips">
          <span className="cc-av-chip cc-av-chip-on"><Avatar src={FACE.lea} letter="L" size="sm" />Léa</span>
          <span className="cc-av-chip cc-av-chip-on"><Avatar src={FACE.max} letter="M" tone="dark" size="sm" />Max</span>
          <span className="cc-av-chip cc-av-chip-on"><Avatar src={FACE.sofia} letter="S" tone="green" size="sm" />Sofia</span>
          <span className="cc-av-chip cc-av-chip-on"><Avatar src={FACE.tom} letter="T" tone="green" size="sm" />Toi</span>
        </div>
      </div>
      <div className="cc-field"><label>Répartition</label>
        <div className="cc-segmented cc-m-0">
          <button className="cc-seg cc-seg-on">À parts égales</button>
          <button className="cc-seg">Personnalisée</button>
        </div>
      </div>
      <UiButton className="cc-w-full">Ajouter la dépense</UiButton>
    </div>
  )
}

function BalancesScreen() {
  return (
    <div className="cc-content cc-pad-tab">
      <TopBar title="Soldes" />
      <div className="cc-balance cc-balance-green cc-balance-refunds">
        <span>Équilibre de la coloc</span>
        <strong>2 remboursements</strong>
        <small>suffisent pour remettre tout le monde à zéro</small>
      </div>
      <div className="cc-section-label">À rembourser</div>
      <div className="cc-panel cc-panel-flush">
        <div className="cc-pay-row">
          <span className="cc-av-pair">
            <Avatar src={FACE.max} letter="M" tone="dark" />
            <Avatar src={FACE.lea} letter="L" />
          </span>
          <div className="cc-pay-txt">
            <strong>Max <ArrowRight size={11} /> Léa</strong>
            <small>Courses + soirée pizza</small>
          </div>
          <span className="cc-row-amount">12,00 €</span>
          <button className="cc-pay-check"><Check size={14} /></button>
        </div>
        <div className="cc-pay-row">
          <span className="cc-av-pair">
            <Avatar src={FACE.sofia} letter="S" tone="green" />
            <Avatar src={FACE.lea} letter="L" />
          </span>
          <div className="cc-pay-txt">
            <strong>Sofia <ArrowRight size={11} /> Léa</strong>
            <small>Courses de la semaine</small>
          </div>
          <span className="cc-row-amount">6,50 €</span>
          <button className="cc-pay-check"><Check size={14} /></button>
        </div>
      </div>
      <p className="cc-hint">Touchez la coche une fois remboursé, l&apos;autre colocataire valide.</p>
      <div className="cc-suggest">
        <Sparkles size={15} />
        <span>Remboursements simplifiés : 5 dettes regroupées en 2 transferts</span>
      </div>
      <div className="cc-section-label">Historique</div>
      <div className="cc-panel cc-panel-flush">
        <ListRow icon={<Check size={16} />} title="Tom a remboursé Léa" meta="21,00 € · 12 juin" trailing={<Pill tone="green">Validé par Léa</Pill>} />
      </div>
      <TabBar active="money" />
    </div>
  )
}

function TasksScreen() {
  return (
    <div className="cc-content cc-pad-tab">
      <TopBar title="Tâches" action={<Plus size={18} />} />
      <div className="cc-segmented">
        <button className="cc-seg cc-seg-on">Cette semaine</button>
        <button className="cc-seg">Toutes les tâches</button>
      </div>
      <div className="cc-tasks">
        <div className="cc-task cc-task-done">
          <span className="cc-task-check"><Check size={13} /></span>
          <div><strong>🍽️ Vaisselle</strong><small>Sofia · mardi</small></div>
          <Pill tone="green">Faite</Pill>
        </div>
        <div className="cc-task">
          <span className="cc-task-check" />
          <div><strong>🗑️ Sortir les poubelles</strong><small>Toi · ce soir</small></div>
          <Pill tone="alert">À toi</Pill>
        </div>
        <div className="cc-task">
          <span className="cc-task-check" />
          <div><strong>🛁 Salle de bain</strong><small>Max · samedi</small></div>
          <Pill tone="neutral">À venir</Pill>
        </div>
        <div className="cc-task">
          <span className="cc-task-check" />
          <div><strong>🧹 Aspirateur</strong><small>Léa · dimanche</small></div>
          <Pill tone="neutral">À venir</Pill>
        </div>
      </div>
      <div className="cc-section-label">Compteur d&apos;équité · juin</div>
      <div className="cc-equity">
        <div className="cc-eq"><span>Léa</span><div className="cc-eq-bar"><i style={{ width: '90%' }} /></div><small>9</small></div>
        <div className="cc-eq"><span>Toi</span><div className="cc-eq-bar"><i style={{ width: '80%' }} /></div><small>8</small></div>
        <div className="cc-eq"><span>Sofia</span><div className="cc-eq-bar"><i style={{ width: '70%' }} /></div><small>7</small></div>
        <div className="cc-eq"><span>Max</span><div className="cc-eq-bar"><i style={{ width: '40%' }} /></div><small>4</small></div>
      </div>
      <TabBar active="tasks" />
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="cc-content cc-pad-tab cc-chat">
      <TopBar title="Discussion" />
      <div className="cc-chat-flow">
        <div className="cc-sys"><Receipt size={12} />Léa a ajouté « Courses Carrefour » · 64,90 €</div>
        <div className="cc-msg">
          <Avatar src={FACE.max} letter="M" tone="dark" size="sm" />
          <div className="cc-bubble"><small>Max</small>Qui est chaud pour une soirée pizza vendredi ?</div>
        </div>
        <div className="cc-msg cc-msg-me">
          <div className="cc-bubble cc-bubble-me">Carrément, je ramène le dessert</div>
        </div>
        <div className="cc-msg">
          <Avatar src={FACE.sofia} letter="S" tone="green" size="sm" />
          <div className="cc-bubble"><small>Sofia</small>Vendredi c&apos;est parfait, je lance un sondage pour l&apos;heure</div>
        </div>
        <div className="cc-sys"><Check size={12} />Tâche « Vaisselle » validée par Sofia</div>
      </div>
      <div className="cc-chat-input">
        <span>Écrire un message…</span>
        <button className="cc-send"><ArrowRight size={15} /></button>
      </div>
      <TabBar active="chat" />
    </div>
  )
}

function LeisureScreen() {
  return (
    <div className="cc-content">
      <TopBar title="Loisirs" action={<Plus size={18} />} />
      <div className="cc-section-label">Sondage en cours</div>
      <div className="cc-poll">
        <div className="cc-poll-photo"><img src={PHOTO.pizza} alt="" /></div>
        <div className="cc-poll-head">
          <strong>Soirée pizza : quel soir ?</strong>
          <Pill tone="violet">3/4 ont voté</Pill>
        </div>
        <div className="cc-poll-opt cc-poll-opt-on"><i style={{ width: '66%' }} /><span>🔥 Vendredi</span><small>2 votes</small></div>
        <div className="cc-poll-opt"><i style={{ width: '33%' }} /><span>Samedi</span><small>1 vote</small></div>
        <div className="cc-poll-opt"><i style={{ width: '0%' }} /><span>Dimanche</span><small>0 vote</small></div>
      </div>
      <div className="cc-section-label">Liste partagée · Courses</div>
      <div className="cc-checklist">
        <div className="cc-check cc-check-done"><span><Check size={12} /></span>🍝 Pâtes<small>Léa</small></div>
        <div className="cc-check"><span />🧻 Papier toilette<small>Max</small></div>
        <div className="cc-check"><span />🧴 Liquide vaisselle<small>Sofia</small></div>
        <div className="cc-check cc-check-add"><span><Plus size={12} /></span>Ajouter un élément<small /></div>
      </div>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="cc-content">
      <TopBar title="Administration" action={<Settings size={17} />} />
      <div className="cc-stat-grid">
        <div className="cc-stat"><span>Colocs actives</span><strong>128</strong><small>+ 9 cette semaine</small></div>
        <div className="cc-stat"><span>Utilisateurs</span><strong>512</strong><small>inscrits</small></div>
        <div className="cc-stat"><span>Signalements</span><strong>2</strong><small>à traiter</small></div>
        <div className="cc-stat"><span>Actifs 7 jours</span><strong>73 %</strong><small>des utilisateurs</small></div>
      </div>
      <div className="cc-section-label">Signalements</div>
      <div className="cc-panel cc-panel-flush">
        <ListRow icon={<Flag size={16} />} title="Message signalé" meta="Coloc Bastille · hier" trailing={<Pill tone="alert">À traiter</Pill>} />
        <ListRow icon={<Ban size={16} />} title="Utilisateur suspendu" meta="Spam répété · 12 juin" trailing={<Pill tone="neutral">Suspendu</Pill>} />
      </div>
      <div className="cc-section-label">Accès</div>
      <div className="cc-panel cc-panel-flush">
        <ListRow icon={<User size={16} />} title="Votre compte administrateur" meta="Accès réservé · dans l'application" trailing={<Pill tone="violet">Admin</Pill>} />
        <ListRow icon={<Users size={16} />} title="Utilisateurs et colocations" meta="Recherche et consultation" />
      </div>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier écran (onboarding)', screen: <OnboardingScreen /> },
  { id: 'createjoin', title: 'Créer ou rejoindre une coloc', subtitle: 'Code d’invitation ou lien', screen: <CreateJoinScreen /> },
  { id: 'dashboard', title: 'Tableau de bord', subtitle: 'Vue d’ensemble (dashboard)', screen: <DashboardScreen /> },
  { id: 'expenses', title: 'Dépenses', subtitle: 'Réparties automatiquement', screen: <ExpensesScreen /> },
  { id: 'addexpense', title: 'Ajout de dépense', subtitle: 'Montant, participants, répartition', screen: <AddExpenseScreen /> },
  { id: 'balances', title: 'Soldes et remboursements', subtitle: 'Qui doit quoi à qui', screen: <BalancesScreen /> },
  { id: 'tasks', title: 'Tâches ménagères', subtitle: 'Rotation automatique et équité', screen: <TasksScreen /> },
  { id: 'chat', title: 'Discussion', subtitle: 'Le fil de la coloc en temps réel', screen: <ChatScreen /> },
  { id: 'leisure', title: 'Loisirs', subtitle: 'Sondages, votes et listes partagées', screen: <LeisureScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Panel administrateur, dans l’app', screen: <AdminScreen /> },
]

export default function ColocoolMockupsPage() {
  return (
    <main className="colocool-mockups-page">
      <section className="cc-landing-hero">
        <div>
          <p className="cc-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="cc-reference">Colocool · MOB-2026-colocool</p>
          <p className="cc-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="cc-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="cc-mockup-card">
            <div className="cc-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="cc-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
