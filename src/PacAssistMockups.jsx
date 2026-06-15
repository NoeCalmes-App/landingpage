import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Database,
  FileText,
  Gauge,
  History,
  Home,
  Lock,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Snowflake,
  Thermometer,
  UserRound,
  Wrench,
  Zap,
} from 'lucide-react'
import './pac-assist-mockups.css'
import StatusBarIcons from './StatusBarIcons'

function StatusBar() {
  return (
    <div className="pa-statusbar">
      <span>9:41</span>
      <div className="pa-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="pa-phone-export">
      <div className="pa-phone">
        <div className="pa-screen">
          <StatusBar />
          {children}
          <div className="pa-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`pa-app-mark${large ? ' pa-app-mark-large' : ''}`}>
      <Snowflake size={large ? 29 : 18} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`pa-ui-button pa-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, tone = 'default' }) {
  return <button className={`pa-icon-button pa-icon-button-${tone}`}>{children}</button>
}

function TopBar({ title, action = <Settings size={16} /> }) {
  return (
    <div className="pa-topbar">
      <IconButton>
        <UserRound size={16} />
      </IconButton>
      <strong>{title}</strong>
      <IconButton>{action}</IconButton>
    </div>
  )
}

function ScreenTitle({ eyebrow, title, subtitle, compact = false }) {
  return (
    <div className={`pa-screen-title${compact ? ' pa-screen-title-compact' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'search', label: 'Recherche', icon: Search },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'account', label: 'Compte', icon: UserRound },
  ]

  return (
    <nav className="pa-bottom-nav">
      {items.map(({ id, label, icon: Icon }) => (
        <button key={id} className={active === id ? 'is-active' : ''}>
          <Icon size={16} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function SearchPill({ children = 'Marque, modele ou code erreur' }) {
  return (
    <div className="pa-search-pill">
      <Search size={16} />
      <span>{children}</span>
    </div>
  )
}

function MetricCard({ icon, label, value, tone = 'blue' }) {
  return (
    <div className={`pa-metric-card pa-metric-${tone}`}>
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function ActionCard({ icon, title, subtitle, tone = 'default' }) {
  return (
    <button className={`pa-action-card pa-action-${tone}`}>
      <span className="pa-action-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      <ChevronRight size={16} />
    </button>
  )
}

function ListRow({ icon, title, meta, badge }) {
  return (
    <div className="pa-list-row">
      <span className="pa-list-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {badge ? <em>{badge}</em> : <ChevronRight size={15} />}
    </div>
  )
}

function Chip({ children, active = false, tone = 'default' }) {
  return <span className={`pa-chip pa-chip-${tone}${active ? ' is-active' : ''}`}>{children}</span>
}

function CheckLine({ children, checked = false, warning = false }) {
  return (
    <div className={`pa-check-line${checked ? ' is-checked' : ''}${warning ? ' is-warning' : ''}`}>
      <span>{checked ? <Check size={13} /> : warning ? <AlertTriangle size={13} /> : null}</span>
      <p>{children}</p>
    </div>
  )
}

function DataCard({ title, count, icon, tone = 'blue' }) {
  return (
    <div className={`pa-data-card pa-data-${tone}`}>
      <span>{icon}</span>
      <strong>{count}</strong>
      <small>{title}</small>
    </div>
  )
}

function OnboardingScreen() {
  return (
    <div className="pa-phone-content pa-intro-screen">
      <div className="pa-intro-grid" />
      <div className="pa-intro-orb pa-intro-orb-a" />
      <div className="pa-intro-orb pa-intro-orb-b" />
      <div className="pa-intro-center">
        <AppMark large />
        <ScreenTitle
          eyebrow="Assistant terrain CVC"
          title="Le bon diagnostic, plus vite sur chantier."
          subtitle="PAC Assist centralise les codes erreur, procedures et verifications utiles aux techniciens."
        />
      </div>
      <div className="pa-intro-benefits">
        <MetricCard icon={<Zap size={16} />} label="IA texte" value="Rapide" />
        <MetricCard icon={<Database size={16} />} label="Base metier" value="Evolutive" tone="green" />
      </div>
      <UiButton>
        Commencer
        <ArrowRight size={17} />
      </UiButton>
    </div>
  )
}

function LoginScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-login-screen">
      <div className="pa-login-head">
        <AppMark />
        <ScreenTitle
          eyebrow="Connexion securisee"
          title="Acces technicien"
          subtitle="Connectez-vous pour retrouver vos diagnostics et procedures."
        />
      </div>
      <div className="pa-form-panel">
        <label>
          <span>Email</span>
          <input value="technicien@exemple.fr" readOnly />
        </label>
        <label>
          <span>Mot de passe</span>
          <input value="••••••••" readOnly />
        </label>
        <UiButton className="pa-full-button">
          Se connecter
          <Lock size={15} />
        </UiButton>
        <button className="pa-text-button">Mot de passe oublie</button>
      </div>
      <div className="pa-security-note">
        <ShieldCheck size={16} />
        <span>Acces reserve aux comptes autorises.</span>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-home-screen">
      <TopBar title="PAC Assist" />
      <ScreenTitle title="Bonjour Jean-Marc" subtitle="Que voulez-vous faire pendant l'intervention ?" />
      <SearchPill />
      <div className="pa-actions-grid">
        <ActionCard
          tone="warning"
          icon={<AlertTriangle size={20} />}
          title="Diagnostic panne"
          subtitle="Code erreur ou symptomes"
        />
        <ActionCard
          tone="green"
          icon={<ClipboardCheck size={20} />}
          title="Plan d'entretien"
          subtitle="Etapes et controles"
        />
      </div>
      <div className="pa-usage-card">
        <div>
          <small>Essai freemium</small>
          <strong>2 diagnostics gratuits restants</strong>
        </div>
        <Gauge size={20} />
      </div>
      <div className="pa-section-head">
        <strong>Recherches recentes</strong>
        <span>Voir tout</span>
      </div>
      <div className="pa-list-panel">
        <ListRow icon={<Snowflake size={16} />} title="Daikin Altherma 3" meta="Code U4 · hier" badge="A verifier" />
      </div>
      <BottomNav active="home" />
    </div>
  )
}

function EquipmentSearchScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-search-screen">
      <TopBar title="Recherche" action={<Plus size={16} />} />
      <ScreenTitle title="Quel equipement ?" subtitle="Selectionnez une marque ou continuez en saisie libre." />
      <SearchPill>Rechercher une marque ou un modele</SearchPill>
      <div className="pa-brand-grid">
        {['Daikin', 'Atlantic', 'Mitsubishi', 'Panasonic'].map((brand, index) => (
          <button key={brand} className={index === 0 ? 'is-selected' : ''}>
            <span>{brand.slice(0, 2).toUpperCase()}</span>
            <strong>{brand}</strong>
          </button>
        ))}
      </div>
      <div className="pa-field-card">
        <span>Modele</span>
        <strong>Altherma 3</strong>
        <small>3 resultats disponibles</small>
      </div>
      <button className="pa-inline-choice">
        Je ne trouve pas l'equipement
        <ChevronRight size={15} />
      </button>
      <UiButton className="pa-bottom-button">Continuer</UiButton>
      <BottomNav active="search" />
    </div>
  )
}

function DiagnosticInputScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-diagnostic-screen">
      <TopBar title="Diagnostic" action={<Bot size={16} />} />
      <div className="pa-equipment-card">
        <span>Equipement selectionne</span>
        <strong>Daikin · Altherma 3</strong>
        <small>Pompe a chaleur air/eau</small>
      </div>
      <ScreenTitle compact title="Que se passe-t-il ?" subtitle="Ajoutez le code erreur si vous l'avez, puis decrivez les symptomes." />
      <div className="pa-code-field">
        <span>Code erreur</span>
        <strong>U4</strong>
      </div>
      <div className="pa-textarea-card">
        <span>Symptomes observes</span>
        <p>L'unite exterieure ne demarre plus et le voyant rouge clignote.</p>
      </div>
      <div className="pa-chip-grid">
        <Chip active>Ne chauffe plus</Chip>
        <Chip>Voyant rouge</Chip>
        <Chip>Bruit anormal</Chip>
        <Chip>Unite arretee</Chip>
      </div>
      <UiButton className="pa-bottom-button">
        Lancer le diagnostic
        <ArrowRight size={16} />
      </UiButton>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-loading-screen">
      <div className="pa-ai-pulse">
        <Bot size={28} />
        <span />
        <span />
      </div>
      <ScreenTitle
        title="Analyse en cours"
        subtitle="Recherche dans la base metier, puis preparation d'une reponse claire."
      />
      <div className="pa-progress-card">
        <CheckLine checked>Base Daikin consultee</CheckLine>
        <CheckLine checked>Code U4 trouve</CheckLine>
        <CheckLine>Reponse IA en preparation</CheckLine>
      </div>
    </div>
  )
}

function DiagnosticResultScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-result-screen">
      <TopBar title="Resultat" action={<FileText size={16} />} />
      <div className="pa-result-summary">
        <div>
          <span>Daikin · Altherma 3</span>
          <strong>Diagnostic U4</strong>
        </div>
        <Chip tone="blue">Donnees disponibles</Chip>
      </div>
      <div className="pa-result-block pa-result-blue">
        <span>Resume</span>
        <p>Probable probleme de communication entre les deux unites.</p>
      </div>
      <div className="pa-result-block">
        <span>Causes probables</span>
        <div className="pa-cause-list">
          <small>Cable de communication</small>
          <small>Alimentation exterieure</small>
          <small>Carte electronique</small>
        </div>
      </div>
      <div className="pa-checklist-card">
        <span>Verifications a effectuer</span>
        <CheckLine checked>Couper puis remettre l'alimentation.</CheckLine>
        <CheckLine checked>Controler le cable entre les unites.</CheckLine>
        <CheckLine>Verifier l'unite exterieure.</CheckLine>
      </div>
      <div className="pa-warning-callout">
        <AlertTriangle size={15} />
        <p>Aide au diagnostic, a confirmer sur place par le technicien.</p>
      </div>
      <UiButton className="pa-result-action">Nouveau diagnostic</UiButton>
    </div>
  )
}

function MaintenanceScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-maintenance-screen">
      <TopBar title="Entretien" action={<CheckCircle2 size={16} />} />
      <div className="pa-equipment-card compact">
        <span>Atlantic · Alfea Extensa</span>
        <strong>Plan d'entretien</strong>
      </div>
      <div className="pa-maintenance-progress">
        <strong>4 etapes</strong>
        <div><span style={{ width: '62%' }} /></div>
        <small>2 controles termines</small>
      </div>
      <div className="pa-checklist-card pa-maintenance-list">
        <span>Controles visuels</span>
        <CheckLine checked>Verifier l'etat general de l'unite exterieure.</CheckLine>
        <CheckLine checked>Controler l'absence d'obstruction autour de l'appareil.</CheckLine>
        <CheckLine>Nettoyer les filtres et points accessibles.</CheckLine>
        <CheckLine warning>Noter toute anomalie visible avant redemarrage.</CheckLine>
      </div>
      <UiButton className="pa-bottom-button">
        Terminer l'entretien
        <Check size={16} />
      </UiButton>
    </div>
  )
}

function HistoryScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-history-screen">
      <TopBar title="Historique" action={<Search size={16} />} />
      <ScreenTitle title="Dernieres recherches" subtitle="Retrouvez les diagnostics et entretiens consultes recemment." />
      <div className="pa-chip-grid pa-filter-row">
        <Chip active>Tous</Chip>
        <Chip>Diagnostic</Chip>
        <Chip>Entretien</Chip>
      </div>
      <div className="pa-timeline">
        <ListRow icon={<AlertTriangle size={16} />} title="Daikin Altherma 3" meta="Code U4 · aujourd'hui 14:20" badge="Diagnostic" />
        <ListRow icon={<ClipboardCheck size={16} />} title="Atlantic Alfea" meta="Plan d'entretien · hier" badge="Entretien" />
        <ListRow icon={<AlertTriangle size={16} />} title="Mitsubishi Ecodan" meta="Symptome libre · lundi" badge="A verifier" />
      </div>
      <BottomNav active="history" />
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-paywall-screen">
      <div className="pa-paywall-hero">
        <AppMark />
        <ScreenTitle
          title="Passez a l'acces complet"
          subtitle="Vous avez utilise vos diagnostics gratuits. Continuez avec un abonnement mensuel ou annuel."
        />
      </div>
      <div className="pa-plan-card is-featured">
        <div>
          <span>Mensuel</span>
          <strong>Tarif a definir</strong>
        </div>
        <CreditCard size={19} />
      </div>
      <div className="pa-plan-card">
        <div>
          <span>Annuel</span>
          <strong>Meilleur prix</strong>
        </div>
        <ShieldCheck size={19} />
      </div>
      <div className="pa-benefit-list">
        <CheckLine checked>Diagnostics et entretiens sans limite definie.</CheckLine>
        <CheckLine checked>Historique des recherches conserve.</CheckLine>
        <CheckLine checked>Base metier enrichie au fil du temps.</CheckLine>
      </div>
      <UiButton className="pa-bottom-button">Choisir l'abonnement</UiButton>
    </div>
  )
}

function AdminDashboardScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-admin-screen">
      <TopBar title="Administration" action={<Plus size={16} />} />
      <ScreenTitle title="Base metier" subtitle="Ajoutez les informations utiles aux techniciens." />
      <div className="pa-data-grid">
        <DataCard icon={<Database size={17} />} title="Marques" count="38" />
        <DataCard icon={<Wrench size={17} />} title="Modeles" count="124" tone="green" />
        <DataCard icon={<AlertTriangle size={17} />} title="Codes" count="312" tone="amber" />
        <DataCard icon={<Activity size={17} />} title="Demandes IA" count="86" />
      </div>
      <div className="pa-admin-list">
        <div className="pa-section-head">
          <strong>Codes a verifier</strong>
          <span>3 nouveaux</span>
        </div>
        <ListRow icon={<AlertTriangle size={16} />} title="U4 · Daikin" meta="Communication entre unites" badge="A verifier" />
        <ListRow icon={<AlertTriangle size={16} />} title="E7 · Mitsubishi" meta="Ventilateur exterieur" badge="Brouillon" />
      </div>
      <UiButton className="pa-bottom-button">
        Ajouter une donnee
        <Plus size={16} />
      </UiButton>
    </div>
  )
}

function AdminEditScreen() {
  return (
    <div className="pa-phone-content pa-light-screen pa-admin-edit-screen">
      <TopBar title="Ajouter" action={<Check size={16} />} />
      <ScreenTitle compact title="Nouvelle donnee" subtitle="Completez uniquement les informations connues." />
      <div className="pa-admin-form">
        <label><span>Marque</span><strong>Daikin</strong></label>
        <label><span>Modele</span><strong>Altherma 3</strong></label>
        <label><span>Code erreur</span><strong>U4</strong></label>
        <label className="pa-large-field"><span>Signification</span><p>Probleme de communication entre l'unite interieure et l'unite exterieure.</p></label>
        <label className="pa-large-field"><span>Verifications</span><p>Alimentation, cable de communication, connexions et redemarrage controle.</p></label>
      </div>
      <UiButton className="pa-bottom-button">Enregistrer</UiButton>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Onboarding', subtitle: 'Promesse terrain', screen: <OnboardingScreen /> },
  { id: 'login', title: 'Connexion', subtitle: 'Acces technicien', screen: <LoginScreen /> },
  { id: 'home', title: 'Accueil', subtitle: 'Entretien ou diagnostic', screen: <HomeScreen /> },
  { id: 'equipment', title: 'Recherche equipement', subtitle: 'Marque et modele', screen: <EquipmentSearchScreen /> },
  { id: 'diagnostic', title: 'Saisie panne', subtitle: 'Code erreur + symptomes', screen: <DiagnosticInputScreen /> },
  { id: 'loading', title: 'Analyse IA', subtitle: 'Recherche dans la base', screen: <LoadingScreen /> },
  { id: 'result', title: 'Resultat diagnostic', subtitle: 'Causes + verifications', screen: <DiagnosticResultScreen /> },
  { id: 'maintenance', title: 'Plan entretien', subtitle: 'Checklist terrain', screen: <MaintenanceScreen /> },
  { id: 'history', title: 'Historique', subtitle: 'Recherches recentes', screen: <HistoryScreen /> },
  { id: 'paywall', title: 'Abonnement', subtitle: 'Freemium', screen: <PaywallScreen /> },
  { id: 'admin', title: 'Administration', subtitle: 'Base metier', screen: <AdminDashboardScreen /> },
  { id: 'admin-edit', title: 'Ajout donnee', subtitle: 'Edition admin', screen: <AdminEditScreen /> },
]

function getProjectLabel(slug) {
  if (!slug) return 'PAC Assist'
  if (['pac-assist', 'pacassist', 'cvc-assist', 'cvcassist'].includes(slug.toLowerCase())) return 'PAC Assist'
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function PacAssistMockupsPage() {
  const appSlug = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'pac-assist'
  const appName = getProjectLabel(appSlug)

  return (
    <main className="pac-assist-mockups-page">
      <section className="pa-landing-hero">
        <div>
          <p className="pa-eyebrow">Maquettes projet client</p>
          <h1>{appName}</h1>
          <p className="pa-reference">Jean-Marc · Assistant CVC/PAC · nom provisoire</p>
          <p className="pa-disclaimer">
            Proposition visuelle pour cadrer l'experience mobile : application terrain, diagnostic guide,
            base metier evolutive et abonnement freemium. Maquette non contractuelle.
          </p>
        </div>
      </section>

      <section className="pa-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="pa-mockup-card">
            <div className="pa-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="pa-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
