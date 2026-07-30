import {
  ArrowRight,
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Home,
  Images,
  KeyRound,
  Landmark,
  Mail,
  MessageSquareText,
  Mic,
  MoreHorizontal,
  Paperclip,
  PenLine,
  Percent,
  Plus,
  ReceiptText,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import './bailora-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes. Une connexion internet est necessaire pour
// afficher ces visuels dans la proposition de maquette.
const FACE = {
  sofiane: 'https://i.pravatar.cc/96?img=11',
  yacine: 'https://i.pravatar.cc/96?img=12',
  sarah: 'https://i.pravatar.cc/96?img=47',
  mehdi: 'https://i.pravatar.cc/96?img=15',
  clara: 'https://i.pravatar.cc/96?img=32',
  jules: 'https://i.pravatar.cc/96?img=5',
  ibrahim: 'https://i.pravatar.cc/96?img=13',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80',
  victorHugo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
  saintCyprien: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
  ormes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  livingExit: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
}

function StatusBar() {
  return (
    <div className="blr-statusbar">
      <span>9:41</span>
      <div className="blr-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false }) {
  return (
    <div className={`blr-phone-export${tall ? ' blr-phone-export-tall' : ''}`}>
      <div className="blr-phone">
        <div className="blr-screen">
          <StatusBar />
          {children}
          <div className="blr-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`blr-app-mark${large ? ' blr-app-mark-large' : ''}`}>
      <Landmark size={large ? 29 : 18} strokeWidth={2.25} />
    </div>
  )
}

function GoogleMark() {
  return (
    <svg className="blr-google-mark" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.703-1.568 2.684-3.879 2.684-6.614Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.18l-2.91-2.259c-.806.54-1.835.859-3.046.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.963 10.706A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.167.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.44 1.346l2.582-2.582C13.464.892 11.426 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z" />
    </svg>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`blr-ui-button blr-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`blr-icon-button ${className}`}>{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`blr-pill blr-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md' }) {
  return <span className={`blr-avatar blr-avatar-${size}`}><img src={src} alt="" /></span>
}

function TopBar({ title, back = false, action, filter }) {
  return (
    <div className="blr-topbar">
      {back ? <IconButton><ChevronRight className="blr-back-icon" size={18} /></IconButton> : <Avatar src={FACE.sofiane} size="top" />}
      <div className="blr-topbar-title">
        <strong>{title}</strong>
        {filter && <span>{filter}<ChevronDown size={11} /></span>}
      </div>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <Home size={19} />, label: 'Accueil' },
    { id: 'assets', icon: <Building2 size={19} />, label: 'Biens' },
    { id: 'add', icon: <Plus size={22} />, label: 'Ajouter' },
    { id: 'messages', icon: <MessageSquareText size={19} />, label: 'Messages' },
    { id: 'docs', icon: <FolderOpen size={19} />, label: 'Documents' },
  ]
  return (
    <div className="blr-tabbar">
      {tabs.map((tab) => (
        <div key={tab.id} className={`blr-tab blr-tab-${tab.id}${active === tab.id ? ' blr-tab-active' : ''}`}>
          <span className="blr-tab-icon">{tab.icon}</span>
          {tab.id !== 'add' && <small>{tab.label}</small>}
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, tone = 'blue', title, meta, amount, trailing }) {
  return (
    <div className="blr-list-row">
      <span className={`blr-list-icon blr-list-icon-${tone}`}>{icon}</span>
      <div className="blr-list-copy">
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {amount ? <div className="blr-row-amount">{amount}</div> : trailing || <ChevronRight size={15} />}
    </div>
  )
}

function ScreenHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="blr-screen-heading">
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function SectionHead({ children, action }) {
  return <div className="blr-section-head"><strong>{children}</strong>{action && <span>{action}</span>}</div>
}

function OnboardingScreen() {
  return (
    <div className="blr-content blr-onboarding">
      <div className="blr-hero-photo">
        <img src={PHOTO.hero} alt="" />
        <div className="blr-hero-overlay" />
        <span className="blr-sticker"><Check size={13} /> Zéro oubli</span>
        <div className="blr-hero-mark"><AppMark large /></div>
      </div>
      <div className="blr-onboarding-copy">
        <p>BAILORA</p>
        <h1>Vos SCI,<br />enfin simples.</h1>
        <span>Biens, loyers, documents et actions. Tout est prêt, au bon moment.</span>
      </div>
      <div className="blr-onboarding-actions">
        <UiButton tone="dark"><span className="blr-apple"></span> Continuer avec Apple</UiButton>
        <UiButton tone="light"><GoogleMark /> Continuer avec Google</UiButton>
        <small>En continuant, vous acceptez les CGU et la politique de confidentialité.</small>
      </div>
    </div>
  )
}

function DashboardScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Bonjour Sofiane" filter="Toutes les SCI" />
      <div className="blr-dashboard-intro">
        <div><span>Jeudi 23 juillet</span><h1>3 actions à traiter</h1></div>
        <span className="blr-seal">Tout sous<br />contrôle</span>
      </div>

      <div className="blr-focus-card">
        <div className="blr-focus-top">
          <Pill tone="glass">À valider · SCI Horizon</Pill>
          <span>Aujourd’hui</span>
        </div>
        <div className="blr-person-row">
          <Avatar src={FACE.yacine} />
          <div><h2>Avez-vous reçu 850 € ?</h2><p>Yacine Martin · Appartement 1</p></div>
        </div>
        <div className="blr-focus-actions">
          <button><Check size={15} /> Oui, payé</button>
          <button>Non reçu</button>
        </div>
      </div>

      <div className="blr-mini-stats">
        <div><span>Reçus en juillet</span><strong>4 390 €</strong><small>sur 5 240 €</small></div>
        <div><span>Occupation</span><strong>6 / 7</strong><small>lots occupés</small></div>
      </div>

      <SectionHead action="Tout voir">Ensuite</SectionHead>
      <div className="blr-action-thread">
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-amber" /><div><strong>Assurance à renouveler</strong><small>Sarah · expire dans 12 jours</small></div><ChevronRight size={15} /></div>
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-teal" /><div><strong>État des lieux demain</strong><small>Appartement 2 · 14:00</small></div><ChevronRight size={15} /></div>
      </div>
      <TabBar active="home" />
    </div>
  )
}

function ActionsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Actions" action={<SlidersHorizontal size={17} />} />
      <div className="blr-segmented">
        <button className="blr-seg-on">Aujourd’hui <b>3</b></button>
        <button>À venir</button>
        <button>Terminées</button>
      </div>
      <div className="blr-action-list">
        <article className="blr-task-card blr-task-blue">
          <span className="blr-task-rail" />
          <div className="blr-task-head"><Pill tone="blue">Paiement</Pill><small>SCI Horizon</small></div>
          <h2>Vérifier le loyer de Yacine</h2>
          <p>850 € · Résidence Victor-Hugo</p>
          <div><button className="blr-task-main"><Check size={14} /> Payé</button><button>Reporter</button></div>
        </article>
        <article className="blr-task-card blr-task-amber">
          <span className="blr-task-rail" />
          <div className="blr-task-head"><Pill tone="amber">Document</Pill><small>SCI Horizon</small></div>
          <h2>Demander l’attestation de Sarah</h2>
          <p>Expiration dans 12 jours</p>
          <div><button className="blr-task-main"><Mail size={14} /> Préparer l’email</button><button>Reporter</button></div>
        </article>
        <article className="blr-task-card blr-task-teal">
          <span className="blr-task-rail" />
          <div className="blr-task-head"><Pill tone="teal">Rendez-vous</Pill><small>Demain · 14:00</small></div>
          <h2>État des lieux de sortie</h2>
          <p>Sarah Bernard · Appartement 2</p>
        </article>
      </div>
      <TabBar active="home" />
    </div>
  )
}

function PortfolioScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Patrimoine" filter="Toutes les SCI" action={<Plus size={18} />} />
      <div className="blr-search"><Search size={16} /><span>Rechercher une adresse ou un bien</span></div>
      <div className="blr-portfolio-summary">
        <div><span>3 biens</span><strong>7 lots</strong></div>
        <div><span>Loyers mensuels</span><strong>5 240 €</strong></div>
      </div>
      <SectionHead action="2 SCI">Mes biens</SectionHead>
      <div className="blr-property-card">
        <img src={PHOTO.victorHugo} alt="" />
        <div className="blr-property-overlay" />
        <div className="blr-property-body">
          <Pill tone="glass">SCI Horizon</Pill>
          <h2>Résidence Victor-Hugo</h2>
          <p>Toulouse · 4 lots occupés</p>
          <strong>3 430 € <small>/ mois</small></strong>
        </div>
      </div>
      <div className="blr-property-list">
        <div><img src={PHOTO.saintCyprien} alt="" /><span><strong>Immeuble Saint-Cyprien</strong><small>SCI Les Cèdres · 2 lots</small></span><b>1 810 €</b></div>
        <div><img src={PHOTO.ormes} alt="" /><span><strong>Maison des Ormes</strong><small>SCI Horizon · vacant</small></span><Pill tone="amber">À louer</Pill></div>
      </div>
      <TabBar active="assets" />
    </div>
  )
}

function SciScreen() {
  return (
    <div className="blr-content">
      <TopBar title="SCI Horizon" back action={<MoreHorizontal size={18} />} />
      <div className="blr-sci-hero">
        <div className="blr-sci-hero-top">
          <div className="blr-sci-mark"><Landmark size={21} /></div>
          <Pill tone="glass">Gestion à jour</Pill>
        </div>
        <div><h1>SCI Horizon</h1><p>SIREN 912 845 237 · Sofiane, gérant</p></div>
        <span className="blr-sci-line" />
      </div>
      <div className="blr-sci-stats">
        <div><strong>2</strong><span>biens</span></div>
        <div><strong>5</strong><span>lots</span></div>
        <div><strong>3 430 €</strong><span>loyers</span></div>
      </div>
      <SectionHead>Gestion de la SCI</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Building2 size={16} />} tone="blue" title="Patrimoine" meta="2 biens · 5 lots" />
        <ListRow icon={<Users size={16} />} tone="violet" title="Locataires" meta="4 actifs · 1 lot vacant" />
        <ListRow icon={<FileCheck2 size={16} />} tone="teal" title="Documents annuels" meta="Rapport 2025 archivé" trailing={<Pill tone="teal">À jour</Pill>} />
        <ListRow icon={<CalendarDays size={16} />} tone="amber" title="Prochaine échéance" meta="Taxe foncière · 15 octobre" />
      </div>
      <div className="blr-sci-footer-card">
        <ShieldCheck size={17} />
        <div><strong>Dossier complet à 92 %</strong><small>Ajoutez le justificatif manquant.</small></div>
        <ChevronRight size={15} />
      </div>
    </div>
  )
}

function LotScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Appartement 1" back action={<MoreHorizontal size={18} />} />
      <div className="blr-lot-person">
        <Avatar src={FACE.yacine} size="lg" />
        <div><Pill tone="teal">Bail actif</Pill><h1>Yacine Martin</h1><p>Résidence Victor-Hugo · Toulouse</p></div>
      </div>
      <div className="blr-rent-card">
        <span>Prochaine échéance</span>
        <strong>850 €</strong>
        <small>5 août · 790 € + 60 € de charges</small>
        <div className="blr-rent-progress"><span /></div>
      </div>
      <div className="blr-quick-actions">
        <button><Mail size={17} /><span>Écrire</span></button>
        <button><ReceiptText size={17} /><span>Quittances</span></button>
        <button><FolderOpen size={17} /><span>Documents</span></button>
        <button><Bell size={17} /><span>Rappels</span></button>
      </div>
      <SectionHead>Dossier locataire</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<FileText size={16} />} tone="blue" title="Bail d’habitation" meta="Depuis le 5 septembre 2024" />
        <ListRow icon={<ShieldCheck size={16} />} tone="teal" title="Assurance habitation" meta="Valide jusqu’au 4 septembre 2026" />
        <ListRow icon={<Images size={16} />} tone="violet" title="État des lieux d’entrée" meta="Signé · 26 photos" />
      </div>
      <TabBar active="assets" />
    </div>
  )
}

const rentRows = [
  { face: FACE.yacine, name: 'Yacine Martin', lot: 'Victor-Hugo · Apt. 1', amount: '850 €', status: 'À vérifier', tone: 'amber' },
  { face: FACE.sarah, name: 'Sarah Bernard', lot: 'Victor-Hugo · Apt. 2', amount: '920 €', status: 'Payé', tone: 'teal' },
  { face: FACE.mehdi, name: 'Mehdi Laurent', lot: 'Victor-Hugo · Apt. 3', amount: '790 €', status: 'Payé', tone: 'teal' },
  { face: FACE.clara, name: 'Clara Morel', lot: 'Victor-Hugo · Apt. 4', amount: '870 €', status: 'Payé', tone: 'teal' },
  { face: FACE.jules, name: 'Jules Perrin', lot: 'Saint-Cyprien · Apt. 1', amount: '840 €', status: 'Payé', tone: 'teal' },
  { face: FACE.ibrahim, name: 'Ibrahim Benali', lot: 'Saint-Cyprien · Apt. 2', amount: '970 €', status: 'Payé', tone: 'teal' },
]

function PaymentsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Loyers" filter="Juillet 2026" action={<SlidersHorizontal size={17} />} />
      <div className="blr-payment-summary">
        <span>Reçus ce mois</span>
        <strong>4 390 €</strong>
        <small>sur 5 240 € attendus</small>
        <div><span style={{ width: '84%' }} /></div>
      </div>
      <div className="blr-segmented blr-payment-segments">
        <button className="blr-seg-on">Tous <b>6</b></button>
        <button>À vérifier <b>1</b></button>
        <button>Payés <b>5</b></button>
      </div>
      <div className="blr-rent-list">
        {rentRows.map((row) => (
          <div className="blr-rent-row" key={row.name}>
            <Avatar src={row.face} size="sm" />
            <div><strong>{row.name}</strong><small>{row.lot}</small></div>
            <div><b>{row.amount}</b><Pill tone={row.tone}>{row.status}</Pill></div>
          </div>
        ))}
      </div>
      <TabBar active="home" />
    </div>
  )
}

function PaymentValidationScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Paiement" back action={<MoreHorizontal size={18} />} />
      <div className="blr-success-orbit">
        <div className="blr-orbit-ring" />
        <span><Check size={26} /></span>
      </div>
      <ScreenHeading eyebrow="PAIEMENT ENREGISTRÉ" title="850 € reçus" subtitle="Yacine Martin · Loyer de juillet 2026" />
      <div className="blr-receipt-card">
        <div><span>Loyer hors charges</span><strong>790 €</strong></div>
        <div><span>Charges</span><strong>60 €</strong></div>
        <div className="blr-receipt-total"><span>Total reçu</span><strong>850 €</strong></div>
      </div>
      <div className="blr-ready-card">
        <div className="blr-ready-icon"><ReceiptText size={19} /></div>
        <div><strong>La quittance est prête</strong><small>Elle sera classée dans le bail après l’envoi.</small></div>
        <CircleCheck size={17} />
      </div>
      <div className="blr-bottom-actions">
        <UiButton><Send size={16} /> Envoyer la quittance</UiButton>
        <UiButton tone="light"><Clock3 size={16} /> Programmer l’envoi</UiButton>
      </div>
    </div>
  )
}

function MessageComposerScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Nouvel email" back action={<MoreHorizontal size={18} />} />
      <div className="blr-message-context">
        <span>Envoyé par</span>
        <div><span className="blr-mini-mark"><Landmark size={14} /></span><strong>SCI Horizon</strong><ChevronDown size={14} /></div>
      </div>
      <div className="blr-recipient-row">
        <span>À</span><Avatar src={FACE.yacine} size="xs" /><strong>Yacine Martin</strong><small>yacine.m@email.fr</small>
      </div>
      <div className="blr-template-row"><span>Modèle</span><Pill tone="blue">Quittance de loyer</Pill><ChevronRight size={14} /></div>
      <div className="blr-mail-subject"><span>Objet</span><strong>Votre quittance de juillet 2026</strong></div>
      <div className="blr-mail-body">
        <p>Bonjour Yacine,</p>
        <p>Votre paiement a bien été reçu. Vous trouverez votre quittance de juillet en pièce jointe.</p>
        <p>Bonne journée,<br />SCI Horizon</p>
        <button className="blr-dictation"><Mic size={15} /><span>Dicter pour modifier</span><b>FR</b></button>
      </div>
      <div className="blr-attachment"><Paperclip size={15} /><span><strong>Quittance-juillet-2026.pdf</strong><small>PDF · 124 Ko</small></span><CircleCheck size={16} /></div>
      <div className="blr-send-options"><button><Clock3 size={15} /> Programmer</button><button className="blr-send-main"><Send size={15} /> Envoyer</button></div>
    </div>
  )
}

function DocumentsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Documents" filter="Toutes les SCI" action={<Plus size={18} />} />
      <div className="blr-search"><Search size={16} /><span>Rechercher dans les documents</span><Mic size={15} /></div>
      <div className="blr-doc-categories">
        <button className="blr-cat-blue"><ReceiptText size={18} /><strong>Quittances</strong><small>42 fichiers</small></button>
        <button className="blr-cat-violet"><FileCheck2 size={18} /><strong>Baux</strong><small>7 fichiers</small></button>
        <button className="blr-cat-teal"><ShieldCheck size={18} /><strong>Assurances</strong><small>6 fichiers</small></button>
        <button className="blr-cat-amber"><FileText size={18} /><strong>Factures</strong><small>18 fichiers</small></button>
      </div>
      <SectionHead action="Voir tout">Récents</SectionHead>
      <div className="blr-panel blr-doc-panel">
        <ListRow icon={<ReceiptText size={16} />} tone="blue" title="Quittance · Juillet 2026" meta="Yacine · SCI Horizon · aujourd’hui" trailing={<Pill tone="teal">Envoyée</Pill>} />
        <ListRow icon={<ShieldCheck size={16} />} tone="teal" title="Assurance habitation" meta="Sarah · expire le 4 août" trailing={<CircleAlert className="blr-alert-icon" size={17} />} />
        <ListRow icon={<FileText size={16} />} tone="amber" title="Facture Plomberie Martin" meta="Victor-Hugo · 246 € · 18 juillet" />
        <ListRow icon={<Images size={16} />} tone="violet" title="État des lieux d’entrée" meta="Yacine · 26 photos · signé" />
      </div>
      <button className="blr-scan-card"><Camera size={18} /><span><strong>Scanner un document</strong><small>Il sera classé dans le bon dossier.</small></span><ArrowRight size={16} /></button>
      <TabBar active="docs" />
    </div>
  )
}

function InspectionCaptureScreen() {
  return (
    <div className="blr-content">
      <TopBar title="État des lieux" back action={<MoreHorizontal size={18} />} />
      <div className="blr-step-head">
        <div><span>Sortie · Appartement 2</span><strong>Séjour</strong></div>
        <Pill tone="blue">4 / 7 pièces</Pill>
      </div>
      <div className="blr-step-progress"><span style={{ width: '57%' }} /></div>
      <div className="blr-room-photo">
        <img src={PHOTO.livingExit} alt="" />
        <span className="blr-photo-count"><Images size={14} /> 4 photos</span>
        <button><Camera size={18} /></button>
      </div>
      <SectionHead>État de la pièce</SectionHead>
      <div className="blr-condition-row">
        <button>Très bon</button><button className="blr-condition-on">Bon état</button><button>Dégradé</button>
      </div>
      <div className="blr-room-items">
        <div><CircleCheck size={17} /><span><strong>Murs et plafond</strong><small>Bon état général</small></span><ChevronRight size={15} /></div>
        <div><CircleAlert size={17} /><span><strong>Sol</strong><small>Rayure près de la fenêtre</small></span><ChevronRight size={15} /></div>
        <div><CircleCheck size={17} /><span><strong>Fenêtres et prises</strong><small>Fonctionnement vérifié</small></span><ChevronRight size={15} /></div>
      </div>
      <button className="blr-voice-note"><span className="blr-mic-pulse"><Mic size={13} /></span><span><strong>Dicter une observation</strong><small>Parlez, Bailora écrit pour vous.</small></span></button>
      <UiButton className="blr-room-next">Pièce suivante <ArrowRight size={16} /></UiButton>
    </div>
  )
}

function InspectionCompareScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Comparaison" back action={<MoreHorizontal size={18} />} />
      <div className="blr-compare-title">
        <div><span>Appartement 2 · Séjour</span><h1>Entrée / sortie</h1></div>
        <Pill tone="amber">1 différence</Pill>
      </div>
      <div className="blr-photo-compare">
        <figure><img src={PHOTO.livingExit} alt="" /><figcaption><span>ENTRÉE</span><strong>05 sept. 2024</strong></figcaption></figure>
        <figure className="blr-photo-difference"><img src={PHOTO.livingExit} alt="" /><i aria-hidden="true" /><figcaption><span>SORTIE</span><strong>24 juil. 2026</strong></figcaption></figure>
      </div>
      <div className="blr-difference-card">
        <span className="blr-difference-icon"><CircleAlert size={18} /></span>
        <div><strong>Rayure près de la fenêtre</strong><p>Ajoutée à la sortie. À confirmer avant finalisation.</p></div>
      </div>
      <SectionHead>Résumé du séjour</SectionHead>
      <div className="blr-compare-summary">
        <div><span>Photos</span><strong>8</strong></div>
        <div><span>Éléments vérifiés</span><strong>6 / 6</strong></div>
        <div><span>Observations</span><strong>1</strong></div>
      </div>
      <div className="blr-signature-ready"><PenLine size={18} /><div><strong>Signatures sur le téléphone</strong><small>Sofiane et Sarah signent avec le doigt.</small></div><Pill tone="teal">0 / 2</Pill></div>
      <div className="blr-bottom-actions blr-compare-actions">
        <UiButton>Signer et finaliser <PenLine size={16} /></UiButton>
        <UiButton tone="light">Revenir au séjour</UiButton>
      </div>
    </div>
  )
}

function SubscriptionScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Abonnement" back action={<MoreHorizontal size={18} />} />
      <div className="blr-plan-hero">
        <AppMark large />
        <h1>Passez à Bailora</h1>
        <p>7 jours d’essai offerts. Résiliable depuis votre téléphone.</p>
      </div>
      <div className="blr-plan-list">
        <div className="blr-plan blr-plan-on">
          <span className="blr-plan-badge">Le plus choisi</span>
          <div className="blr-plan-head">
            <div><strong>Illimité</strong><small>SCI et lots sans limite</small></div>
            <b>39 €<i>/mois</i></b>
          </div>
          <ul>
            <li><Check size={12} /> SCI illimitées</li>
            <li><Check size={12} /> Les 10 documents générés</li>
            <li><Check size={12} /> Espace locataire inclus</li>
          </ul>
        </div>
        <div className="blr-plan">
          <div className="blr-plan-head">
            <div><strong>Essentiel</strong><small>Jusqu’à 2 SCI</small></div>
            <b>19 €<i>/mois</i></b>
          </div>
          <ul>
            <li><Check size={12} /> 2 SCI, lots illimités</li>
            <li><Check size={12} /> Quittances et courriers</li>
          </ul>
        </div>
      </div>
      <div className="blr-plan-note">
        <ShieldCheck size={16} />
        <span>Changement de formule à tout moment. Vos données sont conservées.</span>
      </div>
      <div className="blr-bottom-actions">
        <UiButton>Commencer l’essai gratuit <ArrowRight size={16} /></UiButton>
        <small className="blr-plan-legal">Paiement via l’App Store, renouvellement automatique.</small>
      </div>
    </div>
  )
}

const docTemplates = [
  { icon: <CalendarDays size={16} />, tone: 'blue', title: 'Avis d’échéance', meta: 'Avant le paiement du loyer' },
  { icon: <Percent size={16} />, tone: 'teal', title: 'Régularisation des charges', meta: 'Provisions contre charges réelles' },
  { icon: <TrendingUp size={16} />, tone: 'violet', title: 'Révision du loyer', meta: 'Selon l’indice IRL que vous saisissez' },
  { icon: <FileCheck2 size={16} />, tone: 'blue', title: 'Attestation de loyer', meta: 'Pour le dossier CAF' },
  { icon: <Bell size={16} />, tone: 'amber', title: 'Relance d’impayé', meta: 'Périodes et montants dus' },
  { icon: <CircleAlert size={16} />, tone: 'amber', title: 'Mise en demeure', meta: 'Si la relance reste sans réponse' },
  { icon: <Banknote size={16} />, tone: 'teal', title: 'Restitution du dépôt', meta: 'Retenues justifiées détaillées' },
]

function DocumentGeneratorScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Créer un document" back action={<Search size={17} />} />
      <div className="blr-generator-intro">
        <div><span>SCI Horizon · Yacine Martin</span><h1>7 courriers prêts</h1></div>
        <Pill tone="teal">Préremplis</Pill>
      </div>
      <div className="blr-panel blr-template-panel">
        {docTemplates.map((tpl) => (
          <ListRow key={tpl.title} icon={tpl.icon} tone={tpl.tone} title={tpl.title} meta={tpl.meta} />
        ))}
      </div>
      <button className="blr-scan-card blr-free-letter">
        <PenLine size={18} />
        <span><strong>Courrier libre</strong><small>Votre texte, l’en-tête de la SCI ajouté seul.</small></span>
        <ArrowRight size={16} />
      </button>
      <TabBar active="docs" />
    </div>
  )
}

function DocumentPreviewScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Aperçu" back action={<MoreHorizontal size={18} />} />
      <div className="blr-paper">
        <div className="blr-paper-head">
          <span className="blr-mini-mark"><Landmark size={14} /></span>
          <div><strong>SCI Horizon</strong><small>12 rue des Lilas, 31000 Toulouse</small></div>
        </div>
        <h2>Régularisation des charges 2025</h2>
        <p className="blr-paper-to">Yacine Martin · Résidence Victor-Hugo, Apt. 1</p>
        <div className="blr-paper-lines">
          <div><span>Provisions versées (12 mois)</span><strong>720 €</strong></div>
          <div><span>Charges réelles constatées</span><strong>846 €</strong></div>
          <div className="blr-paper-total"><span>Solde à votre charge</span><strong>126 €</strong></div>
        </div>
        <p className="blr-paper-body">
          Conformément au bail, le décompte détaillé des charges est joint au présent
          courrier. Le solde est exigible au prochain terme.
        </p>
      </div>
      <div className="blr-check-strip">
        <CircleCheck size={16} />
        <span>Montants calculés à partir des dépenses enregistrées. Modifiables avant validation.</span>
      </div>
      <div className="blr-bottom-actions">
        <UiButton><Send size={16} /> Valider et envoyer</UiButton>
        <UiButton tone="light"><PenLine size={16} /> Corriger un montant</UiButton>
      </div>
    </div>
  )
}

function CustomLetterScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Courrier libre" back action={<MoreHorizontal size={18} />} />
      <div className="blr-auto-fill">
        <Sparkles size={15} />
        <span><strong>En-tête ajouté pour vous</strong><small>SCI, locataire, adresse du logement et date.</small></span>
      </div>
      <div className="blr-letter-head">
        <div><span>De</span><strong>SCI Horizon</strong></div>
        <div><span>À</span><strong>Yacine Martin</strong></div>
      </div>
      <div className="blr-mail-subject blr-letter-subject"><span>Objet</span><strong>Intervention plomberie du 6 août</strong></div>
      <div className="blr-mail-body blr-letter-body">
        <p>Bonjour Yacine,</p>
        <p>Un plombier interviendra le mercredi 6 août entre 9h et 12h pour le remplacement du mitigeur de la salle de bain.</p>
        <p>Merci de me confirmer votre présence.</p>
        <button className="blr-dictation"><Mic size={15} /><span>Dicter le texte</span><b>FR</b></button>
      </div>
      <div className="blr-save-template">
        <FileText size={15} />
        <span>Enregistrer comme modèle réutilisable</span>
        <span className="blr-toggle blr-toggle-on" />
      </div>
      <div className="blr-send-options">
        <button><Clock3 size={15} /> Programmer</button>
        <button className="blr-send-main"><Send size={15} /> Envoyer</button>
      </div>
    </div>
  )
}

function VoiceAssistantScreen() {
  return (
    <div className="blr-content blr-assistant">
      <TopBar title="Assistant" back action={<MoreHorizontal size={18} />} />
      <div className="blr-listen">
        <span className="blr-listen-ring" />
        <span className="blr-listen-core"><Mic size={26} /></span>
      </div>
      <div className="blr-transcript">
        <span>VOUS AVEZ DIT</span>
        <p>« Ajoute une dépense de 246 euros, plomberie Martin, pour Victor-Hugo. »</p>
      </div>
      <SectionHead>Ce que j’ai compris</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Wallet size={16} />} tone="amber" title="Dépense · 246 €" meta="Plomberie Martin · 24 juillet" trailing={<PenLine size={14} />} />
        <ListRow icon={<Building2 size={16} />} tone="blue" title="Résidence Victor-Hugo" meta="SCI Horizon · travaux" trailing={<PenLine size={14} />} />
      </div>
      <div className="blr-guard-card">
        <ShieldCheck size={16} />
        <span>Rien n’est enregistré tant que vous n’avez pas validé.</span>
      </div>
      <div className="blr-bottom-actions">
        <UiButton><Check size={16} /> Enregistrer la dépense</UiButton>
        <UiButton tone="light">Reprendre la dictée</UiButton>
      </div>
    </div>
  )
}

function ExpenseCaptureScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Nouvelle dépense" back action={<MoreHorizontal size={18} />} />
      <div className="blr-receipt-shot">
        <div className="blr-receipt-paper">
          <strong>PLOMBERIE MARTIN</strong>
          <span>Facture n° 2026-0418</span>
          <span>24 juillet 2026</span>
          <b>246,00 €</b>
        </div>
        <span className="blr-scan-badge"><ScanLine size={13} /> Lu automatiquement</span>
      </div>
      <div className="blr-field-list">
        <div><span>Montant</span><strong>246,00 €</strong><Pill tone="teal">Lu</Pill></div>
        <div><span>Date</span><strong>24 juillet 2026</strong><Pill tone="teal">Lu</Pill></div>
        <div><span>Fournisseur</span><strong>Plomberie Martin</strong><Pill tone="teal">Lu</Pill></div>
        <div><span>Catégorie</span><strong>Travaux</strong><ChevronDown size={14} /></div>
        <div><span>SCI et bien</span><strong>Horizon · Victor-Hugo</strong><ChevronDown size={14} /></div>
      </div>
      <div className="blr-check-strip">
        <CircleAlert size={16} />
        <span>Vérifiez les champs lus avant d’enregistrer, ils restent modifiables.</span>
      </div>
      <div className="blr-bottom-actions">
        <UiButton><Check size={16} /> Enregistrer la dépense</UiButton>
      </div>
    </div>
  )
}

function FiscalYearScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Exercice 2025" filter="SCI Horizon" action={<SlidersHorizontal size={17} />} />
      <div className="blr-fiscal-hero">
        <span>Résultat de l’exercice</span>
        <strong>+ 28 640 €</strong>
        <small>41 880 € de recettes · 13 240 € de dépenses</small>
      </div>
      <SectionHead action="Détail">Dépenses par catégorie</SectionHead>
      <div className="blr-bar-list">
        <div><span>Travaux</span><i><b style={{ width: '78%' }} /></i><strong>5 180 €</strong></div>
        <div><span>Intérêts d’emprunt</span><i><b style={{ width: '62%' }} /></i><strong>4 120 €</strong></div>
        <div><span>Taxe foncière</span><i><b style={{ width: '34%' }} /></i><strong>2 260 €</strong></div>
        <div><span>Assurance</span><i><b style={{ width: '24%' }} /></i><strong>1 680 €</strong></div>
      </div>
      <div className="blr-export-card">
        <div className="blr-export-head"><FileSpreadsheet size={18} /><div><strong>Dossier pour l’expert-comptable</strong><small>Tableur, récapitulatif et justificatifs datés.</small></div></div>
        <div className="blr-export-files">
          <span><FileSpreadsheet size={13} /> exercice-2025.csv</span>
          <span><FileText size={13} /> recapitulatif.pdf</span>
          <span><FolderOpen size={13} /> 64 justificatifs</span>
        </div>
        <UiButton><Download size={16} /> Exporter en un geste</UiButton>
      </div>
      <TabBar active="docs" />
    </div>
  )
}

function TenantSpaceScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Mon logement" back action={<Bell size={17} />} />
      <div className="blr-tenant-hero">
        <Pill tone="glass">Bail actif</Pill>
        <h1>Résidence Victor-Hugo</h1>
        <p>Appartement 1 · Toulouse</p>
        <div className="blr-tenant-amount"><span>Prochaine échéance</span><strong>850 €</strong><small>le 5 août</small></div>
      </div>
      <div className="blr-iban-card">
        <div><span>Virement à</span><strong>SCI Horizon</strong></div>
        <code>FR76 3000 4000 0312 3456 7890 143</code>
      </div>
      <SectionHead action="Tout voir">Mes documents</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<ReceiptText size={16} />} tone="blue" title="Quittance de juillet 2026" meta="Disponible aujourd’hui" trailing={<Download size={15} />} />
        <ListRow icon={<FileCheck2 size={16} />} tone="violet" title="Bail d’habitation" meta="Signé le 5 septembre 2024" trailing={<Download size={15} />} />
        <ListRow icon={<Images size={16} />} tone="teal" title="État des lieux d’entrée" meta="26 photos · signé" trailing={<Download size={15} />} />
      </div>
      <div className="blr-readonly-note"><KeyRound size={15} /><span>Accès en lecture seule, ouvert par votre propriétaire.</span></div>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Administration" action={<SlidersHorizontal size={17} />} />
      <div className="blr-admin-kpis">
        <div><span>Abonnés actifs</span><strong>184</strong><small>+12 ce mois</small></div>
        <div><span>Revenu mensuel</span><strong>4 690 €</strong><small>récurrent</small></div>
      </div>
      <div className="blr-mix-bar">
        <i className="blr-mix-a" style={{ width: '62%' }} />
        <i className="blr-mix-b" style={{ width: '38%' }} />
      </div>
      <div className="blr-mix-legend">
        <span><i className="blr-mix-a" /> 114 en Essentiel</span>
        <span><i className="blr-mix-b" /> 70 en Illimité</span>
      </div>
      <SectionHead action="Tout voir">Derniers comptes</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Users size={16} />} tone="blue" title="Camille Roussel" meta="Illimité · inscrite le 22 juillet" trailing={<Pill tone="teal">39 €</Pill>} />
        <ListRow icon={<Users size={16} />} tone="violet" title="Thomas Nguyen" meta="Essentiel · 2 SCI" trailing={<Pill tone="blue">19 €</Pill>} />
        <ListRow icon={<Users size={16} />} tone="amber" title="Farid Belkacem" meta="Prélèvement échoué · relancé" trailing={<Pill tone="amber">Suspendu</Pill>} />
      </div>
      <div className="blr-privacy-card">
        <ShieldCheck size={16} />
        <span><strong>Vous voyez les comptes, jamais leurs données</strong><small>Baux, locataires et documents restent privés.</small></span>
      </div>
      <TabBar active="home" />
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de Bailora', subtitle: 'Connexion Apple ou Google', screen: <OnboardingScreen /> },
  { id: 'subscription', title: 'Écran d’abonnement', subtitle: '19 € jusqu’à 2 SCI, 39 € en illimité', screen: <SubscriptionScreen /> },
  { id: 'dashboard', title: 'Tableau de bord', subtitle: 'Les actions utiles, immédiatement', screen: <DashboardScreen /> },
  { id: 'actions', title: 'Centre des actions', subtitle: 'Valider, agir ou reporter en un geste', screen: <ActionsScreen /> },
  { id: 'portfolio', title: 'Patrimoine', subtitle: 'Toutes les SCI et tous les biens', screen: <PortfolioScreen /> },
  { id: 'sci', title: 'Fiche d’une SCI', subtitle: 'Patrimoine, associés et échéances', screen: <SciScreen /> },
  { id: 'lot', title: 'Dossier locataire', subtitle: 'Le bail et son historique au même endroit', screen: <LotScreen /> },
  { id: 'payments', title: 'Suivi des loyers', subtitle: 'Reçus, attendus et à vérifier', screen: <PaymentsScreen />, tall: true, scrollable: true },
  { id: 'payment-validation', title: 'Validation d’un paiement', subtitle: 'La quittance est préparée automatiquement', screen: <PaymentValidationScreen /> },
  { id: 'message', title: 'Email intégré', subtitle: 'Prérempli, dicté ou programmé', screen: <MessageComposerScreen /> },
  { id: 'doc-generator', title: 'Générateur de courriers', subtitle: 'Les 7 documents de la gestion locative', screen: <DocumentGeneratorScreen />, tall: true, scrollable: true },
  { id: 'doc-preview', title: 'Aperçu avant envoi', subtitle: 'Les montants sont calculés, jamais ressaisis', screen: <DocumentPreviewScreen /> },
  { id: 'custom-letter', title: 'Courrier libre', subtitle: 'Pour tout ce que les modèles ne couvrent pas', screen: <CustomLetterScreen /> },
  { id: 'documents', title: 'Coffre-fort documentaire', subtitle: 'Chaque fichier dans le bon dossier', screen: <DocumentsScreen />, tall: true, scrollable: true },
  { id: 'inspection', title: 'État des lieux guidé', subtitle: 'Photos, vérifications et dictée vocale', screen: <InspectionCaptureScreen /> },
  { id: 'comparison', title: 'Comparaison et signatures', subtitle: 'Les différences sont validées avant le PDF final', screen: <InspectionCompareScreen /> },
  { id: 'expense', title: 'Dépense par photo', subtitle: 'Le justificatif remplit les champs tout seul', screen: <ExpenseCaptureScreen /> },
  { id: 'assistant', title: 'Assistant vocal', subtitle: 'On dicte, on relit, on valide', screen: <VoiceAssistantScreen /> },
  { id: 'fiscal', title: 'Exercice et export annuel', subtitle: 'Le dossier de l’expert-comptable en un geste', screen: <FiscalYearScreen />, tall: true, scrollable: true },
  { id: 'tenant', title: 'Espace locataire', subtitle: 'Ses quittances, sans jamais les réclamer', screen: <TenantSpaceScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Les comptes abonnés, jamais leurs données', screen: <AdminScreen />, tall: true, scrollable: true },
]

export default function BailoraMockupsPage() {
  return (
    <main className="bailora-mockups-page">
      <section className="blr-landing-hero">
        <div>
          <p className="blr-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="blr-reference">Bailora · MOB-2026-bailora</p>
          <p className="blr-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="blr-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="blr-mockup-card">
            <div className="blr-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
              {mockup.scrollable && (
                <span className="blr-scroll-hint"><ChevronDown size={13} /> Écran à faire défiler</span>
              )}
            </div>
            <div className="blr-export-wrap"><PhoneFrame tall={mockup.tall}>{mockup.screen}</PhoneFrame></div>
          </article>
        ))}
      </section>
    </main>
  )
}
