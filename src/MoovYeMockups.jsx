import {
  Bell,
  Check,
  ChevronRight,
  ClipboardList,
  Lock,
  Luggage,
  MapPin,
  Phone,
  Plus,
  Printer,
  QrCode,
  Settings,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import './moovye-mockups.css'
import StatusBarIcons from './StatusBarIcons'

function StatusBar() {
  return (
    <div className="mv-statusbar">
      <span>9:41</span>
      <div className="mv-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="mv-phone-export">
      <div className="mv-phone">
        <div className="mv-screen">
          <StatusBar />
          {children}
          <div className="mv-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`mv-app-mark${large ? ' mv-app-mark-large' : ''}`}>
      <Luggage size={large ? 28 : 18} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`mv-ui-button mv-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`mv-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`mv-screen-title${centered ? ' mv-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, action }) {
  return (
    <div className="mv-topbar">
      <span className="mv-topbar-avatar">K</span>
      <strong>{title}</strong>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'new' }) {
  const tabs = [
    { id: 'new', icon: <Plus size={20} />, label: 'Nouveau' },
    { id: 'scan', icon: <QrCode size={20} />, label: 'Scanner' },
    { id: 'tracking', icon: <ClipboardList size={20} />, label: 'Suivi' },
    { id: 'profile', icon: <User size={20} />, label: 'Profil' },
  ]
  return (
    <div className="mv-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`mv-tab${t.id === active ? ' mv-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, title, meta, trailing }) {
  return (
    <div className="mv-list-row">
      <span className="mv-list-ico">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={16} />}
    </div>
  )
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`mv-pill mv-pill-${tone}`}>{children}</span>
}

/* ───────────────────────── Screens ───────────────────────── */

function LoginScreen() {
  return (
    <div className="mv-content mv-login">
      <div className="mv-login-top">
        <AppMark large />
        <ScreenTitle
          centered
          eyebrow="MOOVYÉ"
          title="Chaque bagage suivi, du départ à la remise."
          subtitle="Enregistrement, scan et sécurisation du retrait, même sans connexion."
        />
      </div>
      <div className="mv-login-bottom">
        <div className="mv-field"><label>Identifiant agent</label><div className="mv-input">kouassi.yao</div></div>
        <div className="mv-field"><label>Mot de passe</label><div className="mv-input mv-input-pw"><Lock size={14} />••••••••</div></div>
        <UiButton className="mv-w-full">Se connecter</UiButton>
        <p className="mv-legal-note">Compte agent · Gare d'Abidjan · Compagnie UTB</p>
      </div>
    </div>
  )
}

function NewBagageScreen() {
  return (
    <div className="mv-content mv-form-screen">
      <TopBar title="Nouveau bagage" />
      <div className="mv-section-label">Expéditeur</div>
      <div className="mv-field"><label>Nom</label><div className="mv-input">Adjoua Kouamé</div></div>
      <div className="mv-field"><label>Téléphone</label><div className="mv-input">+225 07 08 12 34 56</div></div>

      <div className="mv-section-label">Destinataire</div>
      <div className="mv-field"><label>Nom</label><div className="mv-input">Yao Brou</div></div>
      <div className="mv-field"><label>Téléphone</label><div className="mv-input">+225 01 45 67 89 01</div></div>

      <div className="mv-section-label">Destination</div>
      <div className="mv-chips">
        <span className="mv-chip">Yamoussoukro</span>
        <span className="mv-chip mv-chip-on">Bouaké</span>
        <span className="mv-chip">San-Pédro</span>
      </div>

      <div className="mv-price-card">
        <span>Prix calculé automatiquement</span>
        <strong>3 500 FCFA</strong>
        <small>Trajet Abidjan → Bouaké</small>
      </div>

      <UiButton className="mv-w-full"><Printer size={16} />Imprimer le ticket</UiButton>
    </div>
  )
}

function TicketScreen() {
  return (
    <div className="mv-content mv-ticket-screen">
      <TopBar title="Ticket du bagage" />
      <div className="mv-ticket-card">
        <div className="mv-qr-box"><QrCode size={64} /></div>
        <strong className="mv-ticket-ref">MVY-2607-00214</strong>
        <span>Abidjan → Bouaké · 3 500 FCFA</span>
        <div className="mv-ticket-sep" />
        <div className="mv-ticket-row"><span>Expéditeur</span><strong>Adjoua Kouamé</strong></div>
        <div className="mv-ticket-row"><span>Destinataire</span><strong>Yao Brou</strong></div>
      </div>
      <Pill tone="success"><Check size={12} />Ticket imprimé</Pill>
      <p className="mv-note">Collez ce ticket directement sur le bagage. Un SMS de confirmation a été envoyé à l'expéditeur.</p>
      <UiButton className="mv-w-full">Terminer l'enregistrement</UiButton>
    </div>
  )
}

function ScanScreen() {
  return (
    <div className="mv-content mv-scan-screen">
      <TopBar title="Scanner un bagage" />
      <div className="mv-viewfinder">
        <span className="mv-vf-corner mv-vf-tl" />
        <span className="mv-vf-corner mv-vf-tr" />
        <span className="mv-vf-corner mv-vf-bl" />
        <span className="mv-vf-corner mv-vf-br" />
        <QrCode size={40} className="mv-vf-icon" />
      </div>
      <p className="mv-note mv-note-center">Visez le code du ticket, ou saisissez le numéro manuellement.</p>
      <div className="mv-scan-result">
        <div className="mv-scan-result-head">
          <strong>MVY-2607-00214</strong>
          <Pill tone="gold">En transit</Pill>
        </div>
        <span>Abidjan → Bouaké · Yao Brou</span>
      </div>
      <UiButton className="mv-w-full">Confirmer la mise en soute</UiButton>
      <TabBar active="scan" />
    </div>
  )
}

function TrackingScreen() {
  return (
    <div className="mv-content mv-pad-tab">
      <TopBar title="Suivi des bagages" />
      <div className="mv-segmented">
        <button className="mv-seg mv-seg-on">Tous</button>
        <button className="mv-seg">En transit</button>
        <button className="mv-seg">Disponibles</button>
      </div>
      <div className="mv-panel mv-panel-flush">
        <ListRow icon={<Luggage size={16} />} title="MVY-2607-00214" meta="Abidjan → Bouaké · Yao Brou" trailing={<Pill tone="gold">En transit</Pill>} />
        <ListRow icon={<Luggage size={16} />} title="MVY-2607-00198" meta="Abidjan → Yamoussoukro · Awa Touré" trailing={<Pill tone="alert">Disponible</Pill>} />
        <ListRow icon={<Luggage size={16} />} title="MVY-2607-00187" meta="Abidjan → San-Pédro · Koffi N'Dri" trailing={<Pill tone="success">Livré</Pill>} />
        <ListRow icon={<Luggage size={16} />} title="MVY-2607-00176" meta="Abidjan → Bouaké · Fatou Diabaté" trailing={<Pill tone="success">Livré</Pill>} />
      </div>
      <TabBar active="tracking" />
    </div>
  )
}

function PickupScreen() {
  return (
    <div className="mv-content mv-pickup-screen">
      <TopBar title="Remise du bagage" />
      <div className="mv-pickup-card">
        <Pill tone="alert">Disponible</Pill>
        <strong className="mv-ticket-ref">MVY-2607-00198</strong>
        <span>Abidjan → Yamoussoukro</span>
        <div className="mv-ticket-sep" />
        <div className="mv-ticket-row"><span>Destinataire</span><strong>Awa Touré</strong></div>
        <div className="mv-ticket-row"><span>Téléphone</span><strong>+225 05 22 33 44 55</strong></div>
      </div>
      <div className="mv-section-label">Code de sécurité reçu par SMS</div>
      <div className="mv-otp-row">
        <span className="mv-otp-box">4</span>
        <span className="mv-otp-box">8</span>
        <span className="mv-otp-box">1</span>
        <span className="mv-otp-box">2</span>
      </div>
      <p className="mv-note">Le destinataire donne ce code à l'agent pour valider la remise du bagage.</p>
      <UiButton className="mv-w-full"><ShieldCheck size={16} />Valider la remise</UiButton>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="mv-content">
      <TopBar title="Espace admin" action={<Settings size={17} />} />

      <div className="mv-section-label">Trajets et tarifs</div>
      <div className="mv-panel mv-panel-flush">
        <ListRow icon={<MapPin size={16} />} title="Abidjan → Bouaké" meta="Tarif actuel" trailing={<span className="mv-tariff">3 500 FCFA</span>} />
        <ListRow icon={<MapPin size={16} />} title="Abidjan → Yamoussoukro" meta="Tarif actuel" trailing={<span className="mv-tariff">2 800 FCFA</span>} />
        <ListRow icon={<MapPin size={16} />} title="Abidjan → San-Pédro" meta="Tarif actuel" trailing={<span className="mv-tariff">4 200 FCFA</span>} />
      </div>

      <div className="mv-section-label">Comptes agents</div>
      <div className="mv-panel mv-panel-flush">
        <ListRow icon={<User size={16} />} title="Kouassi Yao" meta="Gare d'Abidjan" trailing={<Pill tone="success">Actif</Pill>} />
        <ListRow icon={<User size={16} />} title="Awa Coulibaly" meta="Gare de Bouaké" trailing={<Pill tone="success">Actif</Pill>} />
      </div>

      <div className="mv-section-label">Compagnies partenaires</div>
      <div className="mv-panel mv-panel-flush">
        <ListRow icon={<Users size={16} />} title="UTB" meta="Phase pilote" trailing={<Pill tone="success">Active</Pill>} />
        <ListRow icon={<Users size={16} />} title="AVS" meta="Phase d'extension" trailing={<Pill tone="neutral">À venir</Pill>} />
      </div>
    </div>
  )
}

const mockups = [
  { id: 'login', title: 'Connexion', subtitle: 'Identifiant et mot de passe agent', screen: <LoginScreen /> },
  { id: 'new-bagage', title: 'Nouveau bagage', subtitle: 'Enregistrement et calcul du prix', screen: <NewBagageScreen /> },
  { id: 'ticket', title: 'Ticket du bagage', subtitle: 'Code de suivi à coller sur le bagage', screen: <TicketScreen /> },
  { id: 'scan', title: 'Scanner un bagage', subtitle: 'Mise en soute et suivi du parcours', screen: <ScanScreen /> },
  { id: 'tracking', title: 'Suivi des bagages', subtitle: 'Statut en temps réel de chaque bagage', screen: <TrackingScreen /> },
  { id: 'pickup', title: 'Remise du bagage', subtitle: 'Validation par code reçu par SMS', screen: <PickupScreen /> },
  { id: 'admin', title: 'Espace admin', subtitle: 'Trajets, tarifs et comptes agents', screen: <AdminScreen /> },
]

export default function MoovYeMockupsPage() {
  return (
    <main className="moovye-mockups-page">
      <section className="mv-landing-hero">
        <div>
          <p className="mv-eyebrow">Proposition d'accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="mv-reference">MoovYé · MOB-2026-moovye</p>
          <p className="mv-disclaimer">
            Aperçu rapide pour visualiser l'idée — toutes les pages ne sont pas illustrées
            et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="mv-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="mv-mockup-card">
            <div className="mv-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="mv-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
