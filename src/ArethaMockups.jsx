import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  Globe,
  Inbox,
  ListMusic,
  Mic2,
  Music2,
  Plus,
  Receipt,
  Settings,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import './aretha-mockups.css'
import StatusBarIcons from './StatusBarIcons'

function StatusBar() {
  return (
    <div className="ar-statusbar">
      <span>9:41</span>
      <div className="ar-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="ar-phone-export">
      <div className="ar-phone">
        <div className="ar-screen">
          <StatusBar />
          {children}
          <div className="ar-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`ar-app-mark${large ? ' ar-app-mark-large' : ''}`}>
      <Music2 size={large ? 28 : 18} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`ar-ui-button ar-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`ar-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`ar-screen-title${centered ? ' ar-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, action }) {
  return (
    <div className="ar-topbar">
      <span className="ar-topbar-avatar">N</span>
      <strong>{title}</strong>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <CalendarDays size={20} />, label: 'Agenda' },
    { id: 'inbox', icon: <Inbox size={20} />, label: 'Demandes' },
    { id: 'music', icon: <ListMusic size={20} />, label: 'Répertoire' },
    { id: 'money', icon: <Receipt size={20} />, label: 'Finances' },
  ]
  return (
    <div className="ar-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`ar-tab${t.id === active ? ' ar-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, title, meta, trailing }) {
  return (
    <div className="ar-list-row">
      <span className="ar-list-ico">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={16} />}
    </div>
  )
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`ar-pill ar-pill-${tone}`}>{children}</span>
}

/* ───────────────────────── Screens ───────────────────────── */

function LoginScreen() {
  return (
    <div className="ar-content ar-login">
      <div className="ar-login-top">
        <AppMark large />
        <ScreenTitle
          centered
          eyebrow="ARETHA"
          title="Toute votre activité d'artiste, au même endroit."
          subtitle="De la demande du client à la fin du concert, sans rien noter à la main."
        />
      </div>
      <div className="ar-login-bottom">
        <UiButton>Continuer avec l'e-mail<ArrowRight size={17} /></UiButton>
        <UiButton tone="ghostline" className="ar-auth-btn">
          Continuer avec Google
        </UiButton>
        <UiButton tone="dark" className="ar-auth-btn">
          Continuer avec Apple
        </UiButton>
        <p className="ar-legal-note">En continuant, vous acceptez les CGU et la politique de confidentialité.</p>
      </div>
    </div>
  )
}

function DashboardScreen() {
  return (
    <div className="ar-content ar-pad-tab">
      <TopBar title="Bonjour, Noémie" />
      <div className="ar-next-card">
        <div className="ar-next-head">
          <Pill tone="gold">Prochain concert</Pill>
          <span className="ar-next-when">Sam. 14 juin · 21h00</span>
        </div>
        <h2>Mariage — Domaine de la Roseraie</h2>
        <p>Aix-en-Provence · Set 2×45 min · Jazz / Soul</p>
        <div className="ar-next-foot">
          <div className="ar-next-prog"><span style={{ width: '72%' }} /></div>
          <small>Préparation 72 %</small>
        </div>
      </div>

      <div className="ar-stat-grid">
        <div className="ar-stat"><span>À traiter</span><strong>3</strong><small>demandes</small></div>
        <div className="ar-stat"><span>Ce mois</span><strong>4 200 €</strong><small>encaissé</small></div>
        <div className="ar-stat"><span>En attente</span><strong>1 350 €</strong><small>2 devis</small></div>
        <div className="ar-stat"><span>Concerts</span><strong>6</strong><small>à venir</small></div>
      </div>

      <div className="ar-section-label">À faire aujourd'hui</div>
      <div className="ar-panel">
        <ListRow icon={<FileText size={16} />} title="Envoyer le devis à Camille" meta="Anniversaire · 800 €" trailing={<Pill tone="alert">À faire</Pill>} />
        <ListRow icon={<Music2 size={16} />} title="Valider la setlist du 14 juin" meta="12 titres proposés" />
      </div>
      <TabBar active="home" />
    </div>
  )
}

function RequestsScreen() {
  return (
    <div className="ar-content ar-pad-tab">
      <TopBar title="Demandes clients" action={<Plus size={18} />} />
      <div className="ar-segmented">
        <button className="ar-seg ar-seg-on">Nouvelles</button>
        <button className="ar-seg">En cours</button>
        <button className="ar-seg">Confirmées</button>
      </div>
      <div className="ar-panel ar-panel-flush">
        <ListRow icon={<User size={16} />} title="Camille Bernard" meta="Anniversaire · 22 juin · Marseille" trailing={<Pill tone="gold">Nouveau</Pill>} />
        <ListRow icon={<User size={16} />} title="Hôtel Le Pavillon" meta="Soirée privée · 5 juil. · Cassis" trailing={<Pill tone="gold">Nouveau</Pill>} />
        <ListRow icon={<User size={16} />} title="Léa & Thomas" meta="Mariage · 14 juin · Aix" trailing={<Pill tone="neutral">Devis envoyé</Pill>} />
        <ListRow icon={<User size={16} />} title="Brasserie du Port" meta="Concert · 28 juin · Marseille" trailing={<Pill tone="success">Confirmé</Pill>} />
      </div>
      <TabBar active="inbox" />
    </div>
  )
}

function ClientFormScreen() {
  return (
    <div className="ar-content ar-form-screen">
      <div className="ar-public-head">
        <AppMark />
        <span>noemie-jazz.aretha.app</span>
      </div>
      <ScreenTitle title="Réservez Noémie pour votre événement" subtitle="Quelques infos et je reviens vers vous sous 24 h." />
      <div className="ar-field"><label>Type d'événement</label><div className="ar-input">Mariage</div></div>
      <div className="ar-field-row">
        <div className="ar-field"><label>Date</label><div className="ar-input">14 juin 2025</div></div>
        <div className="ar-field"><label>Ville</label><div className="ar-input">Aix-en-Provence</div></div>
      </div>
      <div className="ar-field"><label>Style souhaité</label>
        <div className="ar-chips"><span className="ar-chip ar-chip-on">Jazz</span><span className="ar-chip ar-chip-on">Soul</span><span className="ar-chip">Pop</span><span className="ar-chip">Variété</span></div>
      </div>
      <div className="ar-field"><label>Votre message</label><div className="ar-textarea">Cérémonie en extérieur puis cocktail…</div></div>
      <UiButton className="ar-w-full">Envoyer ma demande</UiButton>
    </div>
  )
}

function EventDetailScreen() {
  return (
    <div className="ar-content">
      <TopBar title="Événement" action={<Settings size={17} />} />
      <div className="ar-event-hero">
        <Pill tone="success">Confirmé</Pill>
        <h2>Mariage — Léa &amp; Thomas</h2>
        <p>Samedi 14 juin · 21h00 · Domaine de la Roseraie, Aix</p>
      </div>
      <div className="ar-mini-grid">
        <div className="ar-mini"><CreditCard size={15} /><span>Cachet</span><strong>1 200 €</strong></div>
        <div className="ar-mini"><Clock3 size={15} /><span>Durée</span><strong>2×45 min</strong></div>
      </div>
      <div className="ar-section-label">Étapes</div>
      <div className="ar-timeline">
        <div className="ar-tl ar-tl-done"><span /><div><strong>Demande reçue</strong><small>2 mai</small></div></div>
        <div className="ar-tl ar-tl-done"><span /><div><strong>Devis signé</strong><small>6 mai · 1 200 €</small></div></div>
        <div className="ar-tl ar-tl-now"><span /><div><strong>Acompte réglé</strong><small>360 € · 30 %</small></div></div>
        <div className="ar-tl"><span /><div><strong>Setlist validée</strong><small>À faire</small></div></div>
        <div className="ar-tl"><span /><div><strong>Jour J</strong><small>14 juin</small></div></div>
      </div>
      <UiButton className="ar-w-full">Ouvrir le mode Jour J<ArrowRight size={16} /></UiButton>
    </div>
  )
}

function FinanceScreen() {
  return (
    <div className="ar-content ar-pad-tab">
      <TopBar title="Finances" action={<Plus size={18} />} />
      <div className="ar-balance">
        <span>Encaissé en 2025</span>
        <strong>18 750 €</strong>
        <small>+ 1 350 € en attente de règlement</small>
      </div>
      <div className="ar-segmented">
        <button className="ar-seg ar-seg-on">Devis</button>
        <button className="ar-seg">Factures</button>
        <button className="ar-seg">Cachets</button>
      </div>
      <div className="ar-panel ar-panel-flush">
        <ListRow icon={<FileText size={16} />} title="DEV-2025-014 · Léa &amp; Thomas" meta="1 200 €" trailing={<Pill tone="success">Signé</Pill>} />
        <ListRow icon={<FileText size={16} />} title="DEV-2025-015 · Camille B." meta="800 €" trailing={<Pill tone="alert">Envoyé</Pill>} />
        <ListRow icon={<FileText size={16} />} title="DEV-2025-016 · Hôtel Le Pavillon" meta="550 €" trailing={<Pill tone="neutral">Brouillon</Pill>} />
      </div>
      <TabBar active="money" />
    </div>
  )
}

function SetlistScreen() {
  const songs = [
    { n: '1', t: 'Feeling Good', a: 'Nina Simone', tag: 'Ouverture' },
    { n: '2', t: 'Fly Me to the Moon', a: 'F. Sinatra', tag: '' },
    { n: '3', t: "Ain't No Sunshine", a: 'Bill Withers', tag: '' },
    { n: '4', t: 'Valerie', a: 'Amy Winehouse', tag: 'Demande client' },
    { n: '5', t: 'At Last', a: 'Etta James', tag: 'Première danse' },
  ]
  return (
    <div className="ar-content ar-pad-tab">
      <TopBar title="Setlist · 14 juin" action={<Plus size={18} />} />
      <div className="ar-setlist-head">
        <div><strong>Set 1 — Cocktail</strong><small>5 titres · ~22 min</small></div>
        <Pill tone="gold">Brouillon</Pill>
      </div>
      <div className="ar-songs">
        {songs.map((s) => (
          <div key={s.n} className="ar-song">
            <span className="ar-drag">⋮⋮</span>
            <div className="ar-song-num">{s.n}</div>
            <div className="ar-song-body">
              <strong>{s.t}</strong>
              <small>{s.a}</small>
            </div>
            {s.tag && <span className="ar-song-tag">{s.tag}</span>}
          </div>
        ))}
      </div>
      <div className="ar-suggest">
        <Sparkles size={15} />
        <span>3 titres suggérés selon le style « Soul »</span>
      </div>
      <TabBar active="music" />
    </div>
  )
}

function LiveDayScreen() {
  return (
    <div className="ar-content ar-live">
      <div className="ar-live-top">
        <Pill tone="liveDot">EN DIRECT</Pill>
        <span className="ar-live-clock">21:47</span>
      </div>
      <div className="ar-live-now">
        <small>EN COURS · Set 2</small>
        <h2>Valerie</h2>
        <p>Amy Winehouse · 3:24</p>
        <div className="ar-live-bar"><span style={{ width: '58%' }} /></div>
      </div>
      <div className="ar-live-next">
        <span>À SUIVRE</span>
        <div className="ar-live-next-row"><strong>At Last</strong><small>Etta James · Première danse</small></div>
        <div className="ar-live-next-row ar-dim"><strong>Feeling Good</strong><small>Nina Simone</small></div>
      </div>
      <div className="ar-live-actions">
        <button className="ar-live-btn"><Check size={18} />Titre joué</button>
        <button className="ar-live-btn ar-live-btn-ghost"><Clock3 size={18} />Pause</button>
      </div>
    </div>
  )
}

function TeamScreen() {
  return (
    <div className="ar-content">
      <div className="ar-public-head">
        <AppMark />
        <span>Espace musiciens · 14 juin</span>
      </div>
      <ScreenTitle title="Mariage — Domaine de la Roseraie" subtitle="Tout ce dont le groupe a besoin pour le concert." />
      <div className="ar-mini-grid">
        <div className="ar-mini"><Clock3 size={15} /><span>Balances</span><strong>19h30</strong></div>
        <div className="ar-mini"><Mic2 size={15} /><span>Début</span><strong>21h00</strong></div>
      </div>
      <div className="ar-section-label">Le groupe</div>
      <div className="ar-team">
        <div className="ar-avatar-row"><span className="ar-av">N</span><span className="ar-av">P</span><span className="ar-av">M</span><span className="ar-av">+2</span></div>
      </div>
      <div className="ar-section-label">Documents</div>
      <div className="ar-panel ar-panel-flush">
        <ListRow icon={<ListMusic size={16} />} title="Setlist complète" meta="2 sets · 24 titres" />
        <ListRow icon={<FileText size={16} />} title="Feuille de route" meta="PDF · 320 Ko" />
      </div>
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="ar-content ar-paywall">
      <div className="ar-premium-icon"><Sparkles size={24} /></div>
      <ScreenTitle centered eyebrow="ARETHA PRO" title="Gérez sans limite" subtitle="Devis, factures, événements et setlists illimités." />
      <div className="ar-benefits">
        <div className="ar-benefit"><Check size={15} />Demandes &amp; devis illimités</div>
        <div className="ar-benefit"><Check size={15} />Factures et suivi des cachets</div>
        <div className="ar-benefit"><Check size={15} />Mode Jour J en temps réel</div>
        <div className="ar-benefit"><Check size={15} />Espace musiciens partagé</div>
      </div>
      <div className="ar-plans">
        <button className="ar-plan ar-plan-on">
          <span>Annuel</span><strong>170 €</strong><small>soit 14 €/mois · 2 mois offerts</small>
        </button>
        <button className="ar-plan">
          <span>Mensuel</span><strong>17 €</strong><small>par mois</small>
        </button>
      </div>
      <UiButton className="ar-w-full">Essayer 14 jours gratuits</UiButton>
      <p className="ar-legal-note">Sans engagement. Résiliable à tout moment.</p>
    </div>
  )
}

function SettingsScreen() {
  return (
    <div className="ar-content">
      <TopBar title="Profil" action={<Settings size={17} />} />
      <div className="ar-profile">
        <span className="ar-profile-av">N</span>
        <div><strong>Noémie Laurent</strong><small>Chanteuse · Jazz &amp; Soul</small></div>
        <Pill tone="gold">PRO</Pill>
      </div>
      <div className="ar-section-label">Mon activité</div>
      <div className="ar-panel ar-panel-flush">
        <ListRow icon={<Globe size={16} />} title="Page de réservation" meta="noemie-jazz.aretha.app" />
        <ListRow icon={<Users size={16} />} title="Mes musiciens" meta="4 membres" />
        <ListRow icon={<CreditCard size={16} />} title="Abonnement" meta="Pro · annuel" />
      </div>
      <div className="ar-section-label">Préférences</div>
      <div className="ar-panel ar-panel-flush">
        <ListRow icon={<Bell size={16} />} title="Notifications" meta="Push, e-mail, SMS" />
        <ListRow icon={<Globe size={16} />} title="Langue" meta="Français / English" />
        <ListRow icon={<Settings size={16} />} title="Confidentialité" meta="Données &amp; RGPD" />
      </div>
    </div>
  )
}

const mockups = [
  { id: 'login', title: 'Connexion', subtitle: 'E-mail, Google, Apple', screen: <LoginScreen /> },
  { id: 'dashboard', title: 'Tableau de bord', subtitle: 'Vue d\'ensemble artiste', screen: <DashboardScreen /> },
  { id: 'requests', title: 'Demandes clients', subtitle: 'Suivi des réservations', screen: <RequestsScreen /> },
  { id: 'form', title: 'Formulaire client', subtitle: 'Page publique de réservation', screen: <ClientFormScreen /> },
  { id: 'event', title: 'Détail événement', subtitle: 'Du devis au Jour J', screen: <EventDetailScreen /> },
  { id: 'finance', title: 'Finances', subtitle: 'Devis, factures, cachets', screen: <FinanceScreen /> },
  { id: 'setlist', title: 'Setlist', subtitle: 'Répertoire glisser-déposer', screen: <SetlistScreen /> },
  { id: 'live', title: 'Jour J en direct', subtitle: 'Déroulé du concert', screen: <LiveDayScreen /> },
  { id: 'team', title: 'Espace musiciens', subtitle: 'Partagé par lien', screen: <TeamScreen /> },
  { id: 'paywall', title: 'Abonnement', subtitle: 'Freemium · Pro', screen: <PaywallScreen /> },
  { id: 'settings', title: 'Profil', subtitle: 'Compte &amp; préférences', screen: <SettingsScreen /> },
]

export default function ArethaMockupsPage() {
  return (
    <main className="aretha-mockups-page">
      <section className="ar-landing-hero">
        <div>
          <p className="ar-eyebrow">Proposition d'accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="ar-reference">Aretha · MOB-2026-aretha</p>
          <p className="ar-disclaimer">
            Aperçu rapide pour visualiser l'idée — toutes les pages ne sont pas illustrées
            et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="ar-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="ar-mockup-card">
            <div className="ar-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="ar-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
