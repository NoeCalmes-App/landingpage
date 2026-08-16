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
  Droplets,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Flame,
  FolderOpen,
  Home,
  KeyRound,
  Landmark,
  Lock,
  Mail,
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
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import './bailora-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// BAILORA, MAQUETTE V2 · dossier de conception
// Thème Warm premium (bordeaux patrimoine), exécution minimale.
// 28 écrans du CDC (complet) + 2 écrans d’états = 30 cartes.
// Guide : nowork/documentation/guides/creation-maquette-v2.md
// ============================================================

const FACE = {
  sofiane: 'https://i.pravatar.cc/96?img=11',
  yacine: 'https://i.pravatar.cc/96?img=12',
  sarah: 'https://i.pravatar.cc/96?img=47',
  mehdi: 'https://i.pravatar.cc/96?img=15',
  clara: 'https://i.pravatar.cc/96?img=32',
  jules: 'https://i.pravatar.cc/96?img=5',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80',
  victorHugo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
  saintCyprien: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
  ormes: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  livingExit: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
}

// Prototype cliquable : les vrais boutons naviguent entre les cartes.
function goTo(id) {
  const el = document.getElementById(`mk-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function StatusBar({ light = false }) {
  return (
    <div className={`blr-statusbar${light ? ' blr-statusbar-light' : ''}`}>
      <span>9:41</span>
      <div className="blr-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false, lightBar = false }) {
  return (
    <div className={`blr-phone-export${tall ? ' blr-phone-export-tall' : ''}`}>
      <div className="blr-phone">
        <div className="blr-screen">
          <StatusBar light={lightBar} />
          {children}
          <div className="blr-home-indicator" />
        </div>
      </div>
    </div>
  )
}

// Logo officiel Bailora — « Le toit-clé » (choix Noé, 2026-08-16) :
// le toit qui protège, la clé qui habite. Grille de 96, deux formes.
function BailoraLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="7 5 82 82" fill="currentColor" aria-hidden="true">
      <path d="M48 8 86 39.5l-6.4 7.7L48 21.4 16.4 47.2 10 39.5Z" />
      <path fillRule="evenodd" d="M48 34a16 16 0 0 1 6.5 30.6V78a6.5 6.5 0 0 1-13 0V64.6A16 16 0 0 1 48 34Zm0 10.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
    </svg>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`blr-app-mark${large ? ' blr-app-mark-large' : ''}`}>
      <BailoraLogo size={large ? 38 : 22} />
    </div>
  )
}

function AppleMark() {
  return (
    <svg className="blr-google-mark" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <g transform="translate(1.6 1.2)">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702" />
      </g>
    </svg>
  )
}

function UiButton({ children, tone = '', className = '', goto }) {
  return (
    <button
      className={`blr-ui-button${tone ? ` blr-ui-button-${tone}` : ''} ${className}`}
      onClick={goto ? () => goTo(goto) : undefined}
    >
      {children}
    </button>
  )
}

function IconButton({ children }) {
  return <button className="blr-icon-button">{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`blr-pill blr-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md' }) {
  return <span className={`blr-avatar blr-avatar-${size}`}><img src={src} alt="" /></span>
}

function TopBar({ title, back = false, action, filter, noAction = false }) {
  return (
    <div className="blr-topbar">
      {back
        ? <IconButton><ChevronRight className="blr-back-icon" size={18} /></IconButton>
        : <span role="button" tabIndex={0} onClick={() => goTo('settings')} style={{ cursor: 'pointer', display: 'inline-flex' }}><Avatar src={FACE.sofiane} size="top" /></span>}
      <div className="blr-topbar-title">
        <strong>{title}</strong>
        {filter && <span>{filter}<ChevronDown size={11} /></span>}
      </div>
      {action ? <IconButton>{action}</IconButton> : <span />}
    </div>
  )
}

function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', icon: <Home size={19} />, label: 'Accueil' },
    { id: 'assets', icon: <Building2 size={19} />, label: 'Patrimoine' },
    { id: 'add', icon: <Plus size={22} />, label: 'Ajouter' },
    { id: 'money', icon: <Wallet size={19} />, label: 'Argent' },
    { id: 'docs', icon: <FolderOpen size={19} />, label: 'Documents' },
  ]
  return (
    <div className="blr-tabbar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`blr-tab blr-tab-${tab.id}${active === tab.id ? ' blr-tab-active' : ''}`}
          role={tab.id === 'add' ? 'button' : undefined}
          tabIndex={tab.id === 'add' ? 0 : undefined}
          onClick={tab.id === 'add' ? () => goTo('assistant') : undefined}
          style={tab.id === 'add' ? { cursor: 'pointer' } : undefined}
        >
          <span className="blr-tab-icon">{tab.icon}</span>
          {tab.id !== 'add' && <small>{tab.label}</small>}
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, tone = 'brand', title, meta, amount, trailing }) {
  return (
    <div className="blr-list-row">
      <span className={`blr-list-icon blr-list-icon-${tone}`}>{icon}</span>
      <div className="blr-list-copy">
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {amount ? <div className="blr-row-amount blr-num">{amount}</div> : trailing || <ChevronRight size={15} />}
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

function Note({ tone = 'brand', icon, title, text }) {
  return (
    <div className={`blr-note blr-note-${tone}`}>
      {icon}
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
    </div>
  )
}

// ============================================================
// FLUX A, DÉCOUVERTE & COMPTE (5 écrans)
// ============================================================

function Onboarding1Screen() {
  return (
    <div className="blr-content blr-onboarding">
      <div className="blr-hero-photo">
        <img src={PHOTO.hero} alt="" />
        <div className="blr-photo-overlay" />
        <div className="blr-hero-mark"><AppMark large /></div>
      </div>
      <div className="blr-onboarding-copy">
        <p>BAILORA</p>
        <h1>Vos SCI,<br />enfin simples.</h1>
        <span>Biens, locataires, loyers et documents. Tout au même endroit, depuis votre téléphone.</span>
      </div>
      <div className="blr-dots"><i className="blr-dot-on" /><i /><i /></div>
      <div className="blr-onboarding-actions">
        <UiButton goto="onboarding-2">Continuer <ArrowRight size={15} /></UiButton>
        <UiButton tone="light" goto="signup">Passer</UiButton>
        <small className="blr-legal" role="button" tabIndex={0} onClick={() => goTo('signup')} style={{ cursor: 'pointer', color: 'var(--accent)', fontWeight: 700 }}>
          Je suis locataire, j’ai reçu une invitation
        </small>
      </div>
    </div>
  )
}

function Onboarding2Screen() {
  return (
    <div className="blr-content blr-onboarding">
      <div className="blr-onboarding-copy">
        <p>CE QUE BAILORA FAIT POUR VOUS</p>
        <h1>Les corvées,<br />en un geste.</h1>
      </div>
      <div className="blr-value-list">
        <div className="blr-value-card">
          <i><Wallet size={18} /></i>
          <div><strong>Loyers suivis chaque mois</strong><small>Les retards remontent en premier, vous confirmez d’un geste.</small></div>
        </div>
        <div className="blr-value-card">
          <i><FileText size={18} /></i>
          <div><strong>Dix documents produits tout seuls</strong><small>Quittances, relances, régularisations : préremplies, datées, propres.</small></div>
        </div>
        <div className="blr-value-card">
          <i><PenLine size={18} /></i>
          <div><strong>État des lieux signé du doigt</strong><small>Photos horodatées, comparaison entrée / sortie, double signature.</small></div>
        </div>
        <div className="blr-value-card">
          <i><FileSpreadsheet size={18} /></i>
          <div><strong>Le dossier annuel du comptable</strong><small>Recettes, dépenses et justificatifs exportés en un geste.</small></div>
        </div>
      </div>
      <div className="blr-dots"><i /><i className="blr-dot-on" /><i /></div>
      <div className="blr-onboarding-actions">
        <UiButton goto="onboarding-3">Continuer <ArrowRight size={15} /></UiButton>
      </div>
    </div>
  )
}

function Onboarding3Screen() {
  return (
    <div className="blr-content blr-onboarding">
      <div className="blr-hero-photo">
        <img src={PHOTO.victorHugo} alt="" />
        <div className="blr-photo-overlay" />
      </div>
      <div className="blr-onboarding-copy">
        <p>VOTRE LOCATAIRE AUSSI</p>
        <h1>Ses quittances,<br />sans les réclamer.</h1>
        <span>Chaque locataire dispose d’un accès en lecture : quittances, bail et états des lieux, toujours disponibles.</span>
      </div>
      <div className="blr-dots"><i /><i /><i className="blr-dot-on" /></div>
      <div className="blr-onboarding-actions">
        <UiButton goto="signup">Créer mon compte</UiButton>
        <small className="blr-legal">En continuant, vous acceptez les CGU et la politique de confidentialité.</small>
      </div>
    </div>
  )
}

function SignupScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Bailora" back noAction />
      <div className="blr-segmented" style={{ marginBottom: 16 }}>
        <button className="blr-seg-on">Créer un compte</button>
        <button>Se connecter</button>
      </div>
      <ScreenHeading title="Bienvenue" subtitle="30 jours d’essai offerts, sans carte bancaire." />
      <div style={{ marginTop: 12 }}>
        <div className="blr-input"><Mail size={15} /><span>sofiane@horizon-sci.fr</span></div>
        <div className="blr-input"><Lock size={15} /><span>Mot de passe</span></div>
      </div>
      <div className="blr-auth-divider">ou</div>
      <UiButton tone="dark"><AppleMark /> Continuer avec Apple</UiButton>
      <small className="blr-legal" style={{ marginTop: 6 }}>Sur Android, ce bouton devient « Continuer avec Google ».</small>
      <Note
        tone="brand"
        icon={<KeyRound size={16} />}
        title="Je suis locataire"
        text="Connectez-vous avec le code à 6 chiffres reçu sur votre adresse email."
      />
      <div className="blr-bottom-actions">
        <UiButton goto="paywall">Créer mon compte</UiButton>
      </div>
    </div>
  )
}

function PaywallScreen() {
  return (
    <div className="blr-content">
      <div style={{ textAlign: 'center', paddingTop: 2, marginBottom: 14 }}><AppMark large /></div>
      <ScreenHeading title="Abonnement" subtitle="Essai en cours : 22 jours restants, sur les deux formules." />
      <div className="blr-plan-list">
        <div className="blr-plan blr-plan-on">
          <div className="blr-plan-head">
            <div><strong>Particulier</strong><small>Avec ou sans SCI · 3 logements au total</small></div>
            <b className="blr-num">19,99 € <i>/ mois</i></b>
          </div>
          <ul>
            <li><Check size={12} /> En SCI ou en votre nom : appartement, maison, saisonnier</li>
            <li><Check size={12} /> Tout Bailora : documents, états des lieux, espace locataire</li>
          </ul>
        </div>
        <div className="blr-plan">
          <div className="blr-plan-head">
            <div><strong>Professionnel</strong><small>Jusqu’à 10 SCI · 30 logements</small></div>
            <b className="blr-num">39,99 € <i>/ mois</i></b>
          </div>
          <ul>
            <li><Check size={12} /> Un vrai portefeuille locatif, une seule application</li>
          </ul>
        </div>
      </div>
      <div className="blr-bottom-actions">
        <UiButton goto="empty-sci">Continuer l’essai gratuit</UiButton>
        <small className="blr-legal" style={{ maxWidth: 'none' }}>Via l’App Store · résiliable à tout moment · données conservées</small>
      </div>
    </div>
  )
}

// ============================================================
// FLUX B, PILOTAGE (2 écrans)
// ============================================================

function DashboardScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Bonjour Sofiane" filter="Toutes les SCI" />
      <div className="blr-dashboard-intro">
        <span>Jeudi 23 juillet</span>
        <h1>3 actions à traiter</h1>
      </div>
      <div className="blr-hero-card">
        <span className="blr-hero-label">Loyers de juillet</span>
        <strong className="blr-hero-amount">4 390 € <small style={{ fontSize: 9, opacity: 0.7 }}>sur 5 240 €</small></strong>
        <div className="blr-hero-progress"><span style={{ width: '84%' }} /></div>
        <div className="blr-person-row">
          <Avatar src={FACE.yacine} />
          <div><h2>Avez-vous reçu 850 € ?</h2><p>Yacine Martin · Appartement 1</p></div>
        </div>
        <div className="blr-focus-actions">
          <button onClick={() => goTo('payments')}><Check size={15} /> Oui, reçu</button>
          <button>Pas encore</button>
        </div>
      </div>
      <div className="blr-stat-pair">
        <div><span>En retard</span><strong className="blr-num">1 loyer</strong><small>relance prête à partir</small></div>
        <div><span>Occupation</span><strong className="blr-num">6 / 7</strong><small>lots occupés</small></div>
      </div>
      <SectionHead action="Tout voir">Échéances proches</SectionHead>
      <div className="blr-thread">
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-warning" /><div><strong>Assurance à renouveler</strong><small>Sarah Bernard · expire dans 12 jours</small></div><ChevronRight size={15} /></div>
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-positive" /><div><strong>État des lieux demain</strong><small>Appartement 2 · 14:00</small></div><ChevronRight size={15} /></div>
      </div>
      <TabBar active="home" />
    </div>
  )
}

function PaymentsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Suivi des loyers" filter="Juillet 2026" />
      <div className="blr-hero-card">
        <span className="blr-hero-label">Encaissé ce mois-ci</span>
        <strong className="blr-hero-amount">4 390 €</strong>
        <span className="blr-hero-sub">5 loyers reçus · 1 en retard · 1 attendu</span>
        <div className="blr-hero-progress"><span style={{ width: '84%' }} /></div>
      </div>
      <div className="blr-segmented" style={{ marginTop: 9 }}>
        <button className="blr-seg-on">Loyers</button>
        <button onClick={() => goTo('expenses')}>Dépenses</button>
        <button onClick={() => goTo('fiscal')}>Exercice</button>
      </div>
      <div className="blr-rent-list">
        <div className="blr-rent-row">
          <Avatar src={FACE.mehdi} size="sm" />
          <div><strong>Mehdi Alaoui</strong><small>Studio 2 · Saint-Cyprien · échu le 5</small></div>
          <div><b className="blr-num">560 €</b><Pill tone="late">En retard · 18 j</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.yacine} size="sm" />
          <div><strong>Yacine Martin</strong><small>Appartement 1 · Victor-Hugo</small></div>
          <div><b className="blr-num">850 €</b><button className="blr-confirm-btn"><Check size={11} /> Reçu ?</button></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.sarah} size="sm" />
          <div><strong>Sarah Bernard</strong><small>Appartement 2 · Victor-Hugo</small></div>
          <div><b className="blr-num">920 €</b><Pill tone="paid">Reçu le 3</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.clara} size="sm" />
          <div><strong>Clara Fontan</strong><small>T2 · Les Ormes · paiement partiel</small></div>
          <div><b className="blr-num">400 / 780 €</b><Pill tone="late">Solde attendu</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.jules} size="sm" />
          <div><strong>Jules Robin</strong><small>T3 · Victor-Hugo</small></div>
          <div><b className="blr-num">1 020 €</b><Pill tone="paid">Reçu le 2</Pill></div>
        </div>
      </div>
      <div role="button" tabIndex={0} onClick={() => goTo('receipt')} style={{ cursor: 'pointer' }}>
        <Note
          tone="positive"
          icon={<ReceiptText size={16} />}
          title="Quittance prête pour Sarah"
          text="Générée dès la confirmation, envoyez-la en un geste."
        />
      </div>
      <TabBar active="money" />
    </div>
  )
}

// ============================================================
// FLUX C, PATRIMOINE (5 écrans)
// ============================================================

function SciCreateScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Nouvelle SCI" back noAction />
      <div style={{ marginTop: 2 }}>
        <div className="blr-input"><Landmark size={15} /><span>Nom de la SCI</span></div>
        <div className="blr-input"><FileText size={15} /><span>Forme juridique · SCI</span></div>
        <div className="blr-input"><ShieldCheck size={15} /><span>Numéro SIREN</span></div>
        <div className="blr-input"><Home size={15} /><span>Adresse du siège</span></div>
        <div className="blr-input"><Banknote size={15} /><span>IBAN</span></div>
        <div className="blr-input"><Banknote size={15} /><span>BIC</span></div>
        <div className="blr-input"><Mail size={15} /><span>Email d’expédition</span></div>
      </div>
      <Note
        tone="brand"
        icon={<ReceiptText size={15} />}
        title="L’IBAN apparaîtra sur vos quittances"
        text="Et dans l’espace de vos locataires, pour leurs virements."
      />
      <div className="blr-bottom-actions">
        <UiButton goto="sci-detail"><Check size={15} /> Enregistrer la SCI</UiButton>
      </div>
    </div>
  )
}

function PropertyCreateScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Nouveau logement" back noAction />
      <div className="blr-segmented" style={{ marginBottom: 8 }}>
        <button className="blr-seg-on">Appartement</button>
        <button>Maison</button>
        <button>Autre</button>
      </div>
      <div className="blr-input"><Home size={15} /><span>Adresse</span></div>
      <div className="blr-input"><Home size={15} /><span>Complément d’adresse (facultatif)</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 7, marginTop: 7 }}>
        <div className="blr-input" style={{ marginTop: 0 }}><span>Code postal</span></div>
        <div className="blr-input" style={{ marginTop: 0 }}><span>Ville</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginTop: 7 }}>
        <div className="blr-input" style={{ marginTop: 0 }}><span>Surface</span></div>
        <div className="blr-input" style={{ marginTop: 0 }}><span>Pièces</span></div>
        <div className="blr-input" style={{ marginTop: 0 }}><span>Lot (facult.)</span></div>
      </div>
      <SectionHead>Rattacher à</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Landmark size={16} />} tone="brand" title="SCI Horizon" meta="les loyers et documents iront dans cette société" trailing={<CircleCheck size={16} style={{ color: 'var(--positive)' }} />} />
        <ListRow icon={<Home size={16} />} tone="positive" title="En nom propre" meta="sans société, détenu en direct" />
      </div>
      <div className="blr-bottom-actions">
        <UiButton goto="property"><Check size={15} /> Enregistrer le logement</UiButton>
      </div>
    </div>
  )
}

function SciListScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Mon patrimoine" action={<Plus size={18} />} />
      <div className="blr-segmented" style={{ marginBottom: 8 }}>
        <button className="blr-seg-on">Patrimoine</button>
        <button onClick={() => goTo('tenants')}>Locataires</button>
      </div>
      <div className="blr-search"><Search size={16} /><span>Rechercher une SCI ou un bien</span></div>
      <div className="blr-stat-pair">
        <div><span>2 sociétés</span><strong className="blr-num">3 biens · 7 lots</strong><small>6 occupés</small></div>
        <div><span>Loyers attendus</span><strong className="blr-num">5 240 €</strong><small>par mois</small></div>
      </div>
      <SectionHead action="Formule Particulier">Mes SCI</SectionHead>
      <div className="blr-panel">
        <div role="button" tabIndex={0} onClick={() => goTo('sci-detail')} style={{ cursor: 'pointer' }}>
          <ListRow
            icon={<Landmark size={17} />}
            tone="brand"
            title="SCI Horizon"
            meta="2 biens · 5 lots · Sofiane, gérant"
            amount="3 430 €"
          />
        </div>
        <ListRow
          icon={<Landmark size={17} />}
          tone="terra"
          title="SCI Les Cèdres"
          meta="1 bien · 2 lots · gestion familiale"
          amount="1 810 €"
        />
      </div>
      <SectionHead>En nom propre</SectionHead>
      <div className="blr-panel">
        <ListRow
          icon={<Home size={17} />}
          tone="positive"
          title="Appartement Rangueil"
          meta="T2 · détenu en direct, sans société"
          amount="480 €"
        />
      </div>
      <Note
        tone="brand"
        icon={<Sparkles size={16} />}
        title="Besoin de plus ?"
        text="La formule Professionnel retire toutes les limites, vos données restent intactes."
      />
      <TabBar active="assets" />
    </div>
  )
}

function SciDetailScreen() {
  return (
    <div className="blr-content">
      <TopBar title="SCI Horizon" back action={<MoreHorizontal size={18} />} />
      <div className="blr-hero-card">
        <Pill tone="glass">Gestion à jour</Pill>
        <h2 style={{ margin: '10px 0 2px', fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700 }}>SCI Horizon</h2>
        <span className="blr-hero-sub">SIREN 912 845 237 · Sofiane, gérant</span>
      </div>
      <div className="blr-sci-stats">
        <div><strong className="blr-num">2</strong><span>biens</span></div>
        <div><strong className="blr-num">5</strong><span>lots</span></div>
        <div><strong className="blr-num">3 430 €</strong><span>loyers / mois</span></div>
      </div>
      <div className="blr-iban-card">
        <div><Banknote size={15} /><span>COORDONNÉES BANCAIRES</span><Pill tone="neutral">Sur les quittances</Pill></div>
        <code>FR76 3000 4028 3798 7654 3210 907 · BIC BNPAFRPP</code>
      </div>
      <SectionHead action="Tout voir">Biens rattachés</SectionHead>
      <div className="blr-property-list">
        <div role="button" tabIndex={0} onClick={() => goTo('property')} style={{ cursor: 'pointer' }}>
          <img src={PHOTO.victorHugo} alt="" />
          <span><strong>Résidence Victor-Hugo</strong><small>Toulouse · 4 lots occupés</small></span>
          <b className="blr-num">3 430 €</b>
        </div>
        <div>
          <img src={PHOTO.ormes} alt="" />
          <span><strong>Maison des Ormes</strong><small>Balma · vacant</small></span>
          <Pill tone="late">À louer</Pill>
        </div>
      </div>
      <div className="blr-bottom-actions">
        <UiButton tone="secondary"><PenLine size={14} /> Modifier la SCI</UiButton>
      </div>
    </div>
  )
}

function PropertyScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Fiche du bien" back action={<PenLine size={16} />} />
      <div className="blr-photo-card blr-room-photo" style={{ height: 150 }}>
        <img src={PHOTO.victorHugo} alt="" />
        <span className="blr-photo-badge"><Building2 size={12} /> SCI Horizon</span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <strong style={{ fontSize: 15, fontWeight: 850 }}>Résidence Victor-Hugo</strong>
        <Pill tone="brand">SCI Horizon</Pill>
      </div>
      <p style={{ margin: '3px 0 0', color: 'var(--ink-soft)', fontSize: 'var(--type-meta)' }}>12 rue Victor-Hugo · 31000 Toulouse</p>
      <div className="blr-sci-stats" style={{ gridTemplateColumns: '1.1fr 0.9fr 1fr' }}>
        <div><strong>Appartement</strong><span>T3 · lot n° 4</span></div>
        <div><strong className="blr-num">64 m²</strong><span>surface</span></div>
        <div><strong className="blr-num">3 pièces</strong><span>dont 2 chambres</span></div>
      </div>
      <SectionHead>Locataire en place</SectionHead>
      <div className="blr-panel">
        <div role="button" tabIndex={0} onClick={() => goTo('tenant-file')} style={{ cursor: 'pointer' }}>
          <ListRow
            icon={<Users size={17} />}
            tone="positive"
            title="Yacine Martin"
            meta="Bail depuis mars 2024 · 850 € / mois"
          />
        </div>
      </div>
      <SectionHead action="Historique">Occupation</SectionHead>
      <div className="blr-thread">
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-positive" /><div><strong>Yacine Martin</strong><small>mars 2024 → aujourd’hui</small></div><Pill tone="paid">En cours</Pill></div>
        <div className="blr-thread-row"><span className="blr-thread-dot blr-dot-warning" /><div><strong>Inès Caron</strong><small>2021 → 2024 · dossier archivé</small></div><ChevronRight size={15} /></div>
      </div>
    </div>
  )
}

function TenantsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Mes locataires" filter="Toutes les SCI" />
      <div className="blr-segmented" style={{ marginBottom: 8 }}>
        <button onClick={() => goTo('sci-list')}>Patrimoine</button>
        <button className="blr-seg-on">Locataires</button>
      </div>
      <div className="blr-search"><Search size={16} /><span>Rechercher un locataire</span></div>
      <div className="blr-rent-list" style={{ marginTop: 9 }}>
        <div className="blr-rent-row">
          <Avatar src={FACE.yacine} size="sm" />
          <div><strong>Yacine Martin</strong><small>Appartement 1 · Victor-Hugo</small></div>
          <div><b className="blr-num">850 €</b><Pill tone="neutral">Attendu</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.sarah} size="sm" />
          <div><strong>Sarah Bernard</strong><small>Appartement 2 · fin de bail dans 2 mois</small></div>
          <div><b className="blr-num">920 €</b><Pill tone="paid">Payé</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.mehdi} size="sm" />
          <div><strong>Mehdi Alaoui</strong><small>Studio 2 · Saint-Cyprien</small></div>
          <div><b className="blr-num">560 €</b><Pill tone="late">Retard</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.clara} size="sm" />
          <div><strong>Clara Fontan</strong><small>T2 · Les Ormes</small></div>
          <div><b className="blr-num">780 €</b><Pill tone="paid">Payé</Pill></div>
        </div>
        <div className="blr-rent-row">
          <Avatar src={FACE.jules} size="sm" />
          <div><strong>Jules Robin</strong><small>T3 · Victor-Hugo</small></div>
          <div><b className="blr-num">1 020 €</b><Pill tone="paid">Payé</Pill></div>
        </div>
      </div>
      <TabBar active="assets" />
    </div>
  )
}

function TenantFileScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Dossier locataire" back action={<MoreHorizontal size={18} />} />
      <div className="blr-person-card">
        <Avatar src={FACE.yacine} size="lg" />
        <div>
          <Pill tone="paid">À jour</Pill>
          <h1>Yacine Martin</h1>
          <p>yacine.martin@mail.fr · 06 12 34 56 78</p>
        </div>
      </div>
      <div className="blr-field-list">
        <div><span>Loyer HC</span><strong className="blr-num">760 €</strong><Pill tone="neutral">échéance le 5</Pill></div>
        <div><span>Charges</span><strong className="blr-num">90 €</strong><span /></div>
        <div><span>Dépôt de garantie</span><strong className="blr-num">760 €</strong><span /></div>
        <div><span>Bail</span><strong>3 ans · depuis mars 2024</strong><span /></div>
      </div>
      <div className="blr-quick-actions">
        <button onClick={() => goTo('receipt')}><ReceiptText size={17} /><span>Quittance</span></button>
        <button onClick={() => goTo('generator')}><FileText size={17} /><span>Courrier</span></button>
        <button onClick={() => goTo('edl-room')}><KeyRound size={17} /><span>État des lieux</span></button>
        <button onClick={() => goTo('tenant-home')}><Send size={17} /><span>Inviter</span></button>
      </div>
      <SectionHead action="4 fichiers">Documents du bail</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<FileCheck2 size={16} />} tone="positive" title="Bail signé" meta="importé le 12 mars 2024" />
        <ListRow icon={<ReceiptText size={16} />} tone="brand" title="Quittance de juin" meta="envoyée le 4 juillet" />
      </div>
    </div>
  )
}

// ============================================================
// FLUX D, DOCUMENTS & COURRIERS (6 écrans)
// ============================================================

function ReceiptScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Quittance de loyer" back />
      <div className="blr-paper">
        <div className="blr-paper-head">
          <div className="blr-mini-mark"><BailoraLogo size={16} /></div>
          <div><strong>SCI Horizon</strong><small>FR76 3000 4028 · SIREN 912 845 237</small></div>
        </div>
        <h2>Quittance, juillet 2026</h2>
        <p className="blr-paper-to">Yacine Martin · Appartement 1, Résidence Victor-Hugo</p>
        <div className="blr-paper-lines">
          <div><span>Loyer hors charges</span><strong className="blr-num">760,00 €</strong></div>
          <div><span>Provision pour charges</span><strong className="blr-num">90,00 €</strong></div>
          <div className="blr-paper-total"><span>Total reçu le 23 juillet</span><strong className="blr-num">850,00 €</strong></div>
        </div>
        <p className="blr-paper-body">Le bailleur reconnaît avoir reçu la somme ci-dessus au titre du loyer et des charges de la période, et en donne quittance.</p>
      </div>
      <Note
        tone="positive"
        icon={<ShieldCheck size={16} />}
        title="Montants calculés, jamais ressaisis"
        text="Classée automatiquement dans les documents de Yacine."
      />
      <div className="blr-bottom-actions">
        <UiButton goto="email"><Send size={15} /> Générer le PDF et envoyer</UiButton>
      </div>
    </div>
  )
}

const LETTERS = [
  { icon: <CalendarDays size={16} />, tone: 'brand', title: 'Avis d’échéance', meta: 'Avant le paiement du loyer' },
  { icon: <Percent size={16} />, tone: 'positive', title: 'Régularisation des charges', meta: 'Provisions contre charges réelles' },
  { icon: <TrendingUp size={16} />, tone: 'terra', title: 'Révision du loyer', meta: 'Selon l’indice IRL que vous saisissez' },
  { icon: <FileCheck2 size={16} />, tone: 'brand', title: 'Attestation de loyer', meta: 'Pour le dossier CAF' },
  { icon: <Bell size={16} />, tone: 'warning', title: 'Relance d’impayé', meta: 'Périodes et montants dus' },
  { icon: <CircleAlert size={16} />, tone: 'warning', title: 'Mise en demeure', meta: 'Si la relance reste sans réponse' },
  { icon: <Banknote size={16} />, tone: 'positive', title: 'Restitution du dépôt', meta: 'Retenues justifiées détaillées' },
]

function GeneratorScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Générer un courrier" back />
      <ScreenHeading title="Les 7 courriers" subtitle="Préremplis depuis vos données. Vérifiés avant envoi, jamais envoyés seuls." />
      <div className="blr-panel" style={{ marginTop: 12 }}>
        {LETTERS.slice(0, 5).map((l) => (
          <div key={l.title} role="button" tabIndex={0} onClick={() => goTo('generator-preview')} style={{ cursor: 'pointer' }}>
            <ListRow icon={l.icon} tone={l.tone} title={l.title} meta={l.meta} />
          </div>
        ))}
        <ListRow icon={LETTERS[5].icon} tone={LETTERS[5].tone} title={LETTERS[5].title} meta={LETTERS[5].meta} />
        <ListRow icon={LETTERS[6].icon} tone={LETTERS[6].tone} title={LETTERS[6].title} meta={LETTERS[6].meta} />
      </div>
      <div className="blr-scan-card" role="button" tabIndex={0} onClick={() => goTo('custom-letter')} style={{ cursor: 'pointer' }}>
        <PenLine size={16} />
        <div><strong>Courrier personnalisé</strong><small>Texte libre à l’en-tête de la SCI, réutilisable.</small></div>
        <ChevronRight size={15} />
      </div>
    </div>
  )
}

function GeneratorPreviewScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Régularisation des charges" back />
      <div className="blr-step-progress" style={{ marginTop: 0 }}><span style={{ width: '66%' }} /></div>
      <div className="blr-field-list">
        <div><span>Locataire</span><strong>Yacine Martin</strong><span /></div>
        <div><span>Période</span><strong>Année 2025</strong><span /></div>
        <div><span>Provisions versées</span><strong className="blr-num">1 080,00 €</strong><span /></div>
        <div><span>Charges réelles</span><strong className="blr-num">1 214,60 €</strong><Pill tone="brand">Saisi</Pill></div>
      </div>
      <div className="blr-paper" style={{ marginTop: 10 }}>
        <div className="blr-paper-head">
          <div className="blr-mini-mark"><BailoraLogo size={16} /></div>
          <div><strong>Aperçu avant validation</strong><small>SCI Horizon · régularisation 2025</small></div>
        </div>
        <div className="blr-paper-lines">
          <div><span>Solde à réclamer</span><strong className="blr-num">134,60 €</strong></div>
        </div>
        <p className="blr-paper-body">Le détail des charges réelles et le calcul complet figurent dans le courrier joint, prêt à être envoyé ou imprimé.</p>
      </div>
      <div className="blr-bottom-actions">
        <UiButton goto="email"><Check size={15} /> Valider et préparer l’envoi</UiButton>
      </div>
    </div>
  )
}

function CustomLetterScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Courrier personnalisé" back />
      <Note
        tone="brand"
        icon={<Sparkles size={16} />}
        title="En-tête et coordonnées insérés tout seuls"
        text="SCI, locataire et adresse du logement, déjà en place."
      />
      <div className="blr-compose-rows" style={{ marginTop: 9 }}>
        <div><span>DE</span><strong>SCI Horizon</strong></div>
        <div><span>À</span><strong>Yacine Martin</strong></div>
        <div><span>OBJET</span><strong>Travaux dans les parties communes</strong></div>
      </div>
      <div className="blr-mail-body">
        <p>Bonjour,</p>
        <p>Des travaux de réfection de la cage d’escalier auront lieu du 2 au 6 septembre. L’accès à votre logement restera possible à tout moment…</p>
      </div>
      <div className="blr-note blr-note-brand" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <FileText size={16} />
        <div><strong>Enregistrer comme modèle</strong><small>Réutilisable pour un autre locataire.</small></div>
        <span className="blr-toggle blr-toggle-on" />
      </div>
      <div className="blr-bottom-actions">
        <UiButton goto="email">Continuer vers l’envoi</UiButton>
      </div>
    </div>
  )
}

function EmailScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Envoyer par email" back />
      <div className="blr-compose-rows">
        <div><span>DE</span><strong>SCI Horizon</strong><Pill tone="neutral">expéditeur</Pill></div>
        <div><span>À</span><strong>yacine.martin@mail.fr</strong></div>
        <div><span>MODÈLE</span><strong>Envoi de quittance</strong><Pill tone="brand">prérempli</Pill></div>
      </div>
      <div className="blr-mail-body">
        <p>Bonjour Yacine,</p>
        <p>Veuillez trouver ci-joint votre quittance de loyer pour juillet 2026. Bonne réception,</p>
        <p>SCI Horizon</p>
      </div>
      <div className="blr-note blr-note-positive" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <Paperclip size={15} />
        <div><strong>Quittance-juillet-2026.pdf</strong><small>joint automatiquement</small></div>
        <Check size={15} />
      </div>
      <div className="blr-send-options">
        <UiButton tone="light"><Clock3 size={15} /> Programmer</UiButton>
        <UiButton><Send size={15} /> Envoyer</UiButton>
      </div>
    </div>
  )
}

function DocumentsScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Documents" filter="Toutes les SCI" />
      <div className="blr-search"><Search size={16} /><span>Rechercher par nom, bien ou locataire</span></div>
      <div className="blr-doc-categories">
        <button className="blr-cat-brand"><FileCheck2 size={17} /><strong>Baux</strong><small>7 fichiers</small></button>
        <button className="blr-cat-positive"><ReceiptText size={17} /><strong>Quittances</strong><small>64 fichiers</small></button>
        <button className="blr-cat-terra"><ShieldCheck size={17} /><strong>Assurances</strong><small>5 fichiers</small></button>
        <button className="blr-cat-warning"><KeyRound size={17} /><strong>États des lieux</strong><small>9 fichiers</small></button>
      </div>
      <SectionHead action="Récents">Derniers fichiers</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, Sarah · juillet" meta="générée hier · classée automatiquement" />
        <ListRow icon={<FileCheck2 size={16} />} tone="brand" title="Bail signé, Yacine Martin" meta="importé · visible par le locataire" />
        <ListRow icon={<ShieldCheck size={16} />} tone="warning" title="Attestation d’assurance, Sarah" meta="expire dans 12 jours" />
      </div>
      <div className="blr-scan-card">
        <Camera size={16} />
        <div><strong>Ajouter un document</strong><small>Depuis les fichiers ou l’appareil photo.</small></div>
        <Plus size={15} />
      </div>
      <TabBar active="docs" />
    </div>
  )
}

// ============================================================
// FLUX E, ÉTAT DES LIEUX (3 écrans)
// ============================================================

function EdlRoomScreen() {
  return (
    <div className="blr-content">
      <TopBar title="État des lieux · sortie" back />
      <div className="blr-step-head">
        <div><span>Pièce 3 sur 6</span><strong>Séjour</strong></div>
        <Pill tone="brand">Sarah · Apt 2</Pill>
      </div>
      <div className="blr-step-progress"><span style={{ width: '50%' }} /></div>
      <div className="blr-photo-card blr-room-photo">
        <img src={PHOTO.livingExit} alt="" />
        <span className="blr-photo-badge"><Camera size={12} /> 3 photos · horodatées</span>
        <button aria-label="Prendre une photo"><Camera size={16} /></button>
      </div>
      <div className="blr-condition-row">
        <button>Bon état</button>
        <button className="blr-condition-on">Usure normale</button>
        <button>Dégradé</button>
      </div>
      <Note
        tone="brand"
        icon={<Mic size={16} />}
        title="« Trace de meuble sur le mur ouest, peinture à rafraîchir »"
        text="Observation dictée, modifiable avant validation."
      />
      <div className="blr-bottom-actions">
        <UiButton goto="edl-meters">Pièce suivante <ArrowRight size={15} /></UiButton>
      </div>
    </div>
  )
}

function EdlMetersScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Compteurs et clés" back />
      <div className="blr-step-head">
        <div><span>Dernière étape</span><strong>Relevés de sortie</strong></div>
        <Pill tone="brand">Sarah · Apt 2</Pill>
      </div>
      <div className="blr-step-progress"><span style={{ width: '92%' }} /></div>
      <div className="blr-meter-grid">
        <div><i><Droplets size={16} /></i><strong className="blr-num">412,8 m³</strong><small>Eau</small></div>
        <div><i><Zap size={16} /></i><strong className="blr-num">28 640 kWh</strong><small>Électricité</small></div>
        <div><i><Flame size={16} /></i><strong className="blr-num">1 093 m³</strong><small>Gaz</small></div>
      </div>
      <div className="blr-field-list">
        <div><span>Clés remises</span><strong>3 clés + 1 badge</strong><Pill tone="paid">Complet</Pill></div>
        <div><span>Photos compteurs</span><strong>3 photos</strong><Pill tone="neutral">horodatées</Pill></div>
      </div>
      <Note
        tone="positive"
        icon={<CircleCheck size={16} />}
        title="Progression enregistrée sur le téléphone"
        text="Une coupure réseau ne fait rien perdre, synchronisation au retour."
      />
      <div className="blr-bottom-actions">
        <UiButton goto="edl-compare">Comparer avec l’entrée <ArrowRight size={15} /></UiButton>
      </div>
    </div>
  )
}

function EdlCompareScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Comparaison" back />
      <div className="blr-step-head">
        <div><span>Séjour · mur ouest</span><strong>Entrée / Sortie</strong></div>
        <Pill tone="late">1 différence</Pill>
      </div>
      <div className="blr-photo-compare">
        <figure>
          <img src={PHOTO.victorHugo} alt="" />
          <figcaption><span>ENTRÉE</span><strong>12 mars 2024</strong></figcaption>
        </figure>
        <figure>
          <i className="blr-diff-dot" />
          <img src={PHOTO.livingExit} alt="" />
          <figcaption><span>SORTIE</span><strong>23 juillet 2026</strong></figcaption>
        </figure>
      </div>
      <Note
        tone="warning"
        icon={<CircleAlert size={16} />}
        title="Trace de meuble sur le mur ouest"
        text="Constatée à la sortie, retenue éventuelle à décider par vous."
      />
      <div className="blr-signature-row">
        <div>
          <span>PROPRIÉTAIRE</span>
          <svg viewBox="0 0 90 24" width="90" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 18c8-12 14-12 16-6s6 8 12 2 10-10 16-4 10 8 14 4 10-8 14-2" /></svg>
          <small>Signé · 23 juil. 15:42</small>
        </div>
        <div>
          <span>LOCATAIRE</span>
          <svg viewBox="0 0 90 24" width="90" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 16c6-8 10-10 14-4s8 10 14 4 8-12 14-6 8 10 12 6 8-6 12-2" /></svg>
          <small>Signé · 23 juil. 15:44</small>
        </div>
      </div>
      <div className="blr-bottom-actions">
        <UiButton><FileCheck2 size={15} /> Générer le PDF signé</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// FLUX F, ARGENT & EXPORT (2 écrans)
// ============================================================

function ExpensesScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Dépenses" filter="SCI Horizon · 2026" />
      <div className="blr-segmented" style={{ marginBottom: 8 }}>
        <button onClick={() => goTo('payments')}>Loyers</button>
        <button className="blr-seg-on">Dépenses</button>
        <button onClick={() => goTo('fiscal')}>Exercice</button>
      </div>
      <div className="blr-receipt-shot">
        <div className="blr-receipt-paper">
          <strong>BRICO DÉPÔT</strong>
          <span>23/07/2026 · Toulouse</span>
          <b className="blr-num">184,90 €</b>
        </div>
        <span className="blr-photo-badge" style={{ top: 'auto', bottom: 10 }}><ScanLine size={12} /> Lecture automatique</span>
      </div>
      <div className="blr-field-list">
        <div><span>Montant</span><strong className="blr-num">184,90 €</strong><Pill tone="paid">prélu</Pill></div>
        <div><span>Fournisseur</span><strong>Brico Dépôt</strong><Pill tone="paid">prélu</Pill></div>
        <div><span>Catégorie</span><strong>Travaux</strong><Pill tone="neutral">à choisir</Pill></div>
      </div>
      <SectionHead action="Juillet · 3 dépenses">Dernières dépenses</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Wallet size={16} />} tone="terra" title="Assurance PNO, Les Cèdres" meta="12 juillet · Assurance" amount="38,20 €" />
        <ListRow icon={<Wallet size={16} />} tone="brand" title="Taxe foncière, acompte" meta="4 juillet · Impôts" amount="612,00 €" />
      </div>
      <TabBar active="money" />
    </div>
  )
}

function FiscalScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Exercice 2026" filter="SCI Horizon" />
      <div className="blr-segmented" style={{ marginBottom: 8 }}>
        <button onClick={() => goTo('payments')}>Loyers</button>
        <button onClick={() => goTo('expenses')}>Dépenses</button>
        <button className="blr-seg-on">Exercice</button>
      </div>
      <div className="blr-hero-card">
        <span className="blr-hero-label">Résultat provisoire</span>
        <strong className="blr-hero-amount">+ 24 130 €</strong>
        <span className="blr-hero-sub">38 620 € de recettes · 14 490 € de dépenses</span>
      </div>
      <SectionHead>Dépenses par catégorie</SectionHead>
      <div className="blr-bar-list">
        <div><span>Travaux</span><i><b style={{ width: '72%' }} /></i><strong className="blr-num">6 240 €</strong></div>
        <div><span>Taxe foncière</span><i><b style={{ width: '58%' }} /></i><strong className="blr-num">4 890 €</strong></div>
        <div><span>Assurances</span><i><b style={{ width: '24%' }} /></i><strong className="blr-num">1 980 €</strong></div>
        <div><span>Intérêts d’emprunt</span><i><b style={{ width: '17%' }} /></i><strong className="blr-num">1 380 €</strong></div>
      </div>
      <div className="blr-export-card">
        <div className="blr-export-head">
          <Download size={17} />
          <div><strong>Dossier de l’expert-comptable</strong><small>Tout l’exercice, en un geste.</small></div>
        </div>
        <div className="blr-export-files">
          <span><FileSpreadsheet size={12} /> recettes-2026.csv</span>
          <span><FileText size={12} /> bilan-2026.pdf</span>
          <span><FolderOpen size={12} /> justificatifs.zip</span>
        </div>
        <UiButton><Download size={15} /> Exporter le dossier complet</UiButton>
      </div>
      <TabBar active="money" />
    </div>
  )
}

// ============================================================
// FLUX G, ASSISTANT VOCAL (1 écran)
// ============================================================

function AssistantScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Assistant" back />
      <ScreenHeading eyebrow="JE VOUS ÉCOUTE" title="Dictez, je prépare." subtitle="Rien n’est enregistré tant que vous n’avez pas validé le récapitulatif." />
      <div className="blr-listen">
        <span className="blr-listen-ring" />
        <span className="blr-listen-core"><Mic size={24} /></span>
      </div>
      <div className="blr-transcript">
        <span>ENTENDU</span>
        <p>« Le loyer de Yacine est arrivé aujourd’hui »</p>
      </div>
      <div className="blr-field-list">
        <div><span>Action</span><strong>Confirmer un loyer reçu</strong><Pill tone="brand">comprise</Pill></div>
        <div><span>Locataire</span><strong>Yacine Martin</strong><span /></div>
        <div><span>Montant</span><strong className="blr-num">850,00 €</strong><span /></div>
        <div><span>Date</span><strong>23 juillet 2026</strong><Pill tone="neutral">modifiable</Pill></div>
      </div>
      <div className="blr-bottom-actions">
        <UiButton goto="payments"><Check size={15} /> Valider, enregistrer le loyer</UiButton>
        <UiButton tone="light">Corriger à la main</UiButton>
      </div>
    </div>
  )
}

// ============================================================
// FLUX H, ESPACE LOCATAIRE (2 écrans)
// ============================================================

function TenantHomeScreen() {
  return (
    <div className="blr-content">
      <div className="blr-topbar">
        <Avatar src={FACE.yacine} size="top" />
        <div className="blr-topbar-title"><strong>Mon logement</strong><span>Espace locataire</span></div>
        <span />
      </div>
      <div className="blr-hero-card">
        <Pill tone="glass">Appartement 1 · Victor-Hugo</Pill>
        <span className="blr-hero-label" style={{ display: 'block', marginTop: 12 }}>Loyer mensuel</span>
        <strong className="blr-hero-amount">850,00 €</strong>
        <span className="blr-hero-sub">Prochaine échéance : le 5 août</span>
      </div>
      <div className="blr-iban-card">
        <div><Banknote size={15} /><span>VIREMENT À</span><Pill tone="neutral">SCI Horizon</Pill></div>
        <code>FR76 3000 4028 3798 7654 3210 907</code>
      </div>
      <SectionHead action="Tout voir">Derniers documents</SectionHead>
      <div className="blr-panel">
        <div role="button" tabIndex={0} onClick={() => goTo('tenant-docs')} style={{ cursor: 'pointer' }}>
          <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, juillet 2026" meta="mise à disposition hier" trailing={<Download size={15} />} />
        </div>
      </div>
      <Note
        tone="brand"
        icon={<Lock size={15} />}
        title="Espace en lecture seule"
        text="Vous consultez et téléchargez, rien à gérer, rien à payer."
      />
    </div>
  )
}

function TenantDocsScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Mes documents" back />
      <div className="blr-segmented">
        <button className="blr-seg-on">Quittances <b>16</b></button>
        <button>Bail</button>
        <button>États des lieux</button>
      </div>
      <div className="blr-panel" style={{ marginTop: 9 }}>
        <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, juillet 2026" meta="850,00 € · reçue le 23 juillet" trailing={<Download size={15} />} />
        <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, juin 2026" meta="850,00 € · reçue le 4 juillet" trailing={<Download size={15} />} />
        <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, mai 2026" meta="850,00 € · reçue le 5 juin" trailing={<Download size={15} />} />
        <ListRow icon={<FileCheck2 size={16} />} tone="brand" title="Bail signé" meta="3 ans · depuis mars 2024" trailing={<Download size={15} />} />
        <ListRow icon={<KeyRound size={16} />} tone="terra" title="État des lieux d’entrée" meta="12 mars 2024 · signé" trailing={<Download size={15} />} />
      </div>
      <Note
        tone="positive"
        icon={<Bell size={15} />}
        title="Prévenu à chaque nouveau document"
        text="Plus besoin d’écrire à votre propriétaire en fin de mois."
      />
    </div>
  )
}

// ============================================================
// FLUX I, RÉGLAGES & ADMINISTRATION (2 écrans)
// ============================================================

function SettingsScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Réglages" back />
      <div className="blr-person-card">
        <Avatar src={FACE.sofiane} size="lg" />
        <div>
          <Pill tone="brand">Formule Particulier</Pill>
          <h1>Sofiane Moussaoui</h1>
          <p>sofiane@horizon-sci.fr</p>
        </div>
      </div>
      <div className="blr-note blr-note-brand" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <Wallet size={16} />
        <div><strong>Particulier · 19,99 € / mois</strong><small>Renouvellement le 12 août · 1 SCI · 2 logements</small></div>
        <button className="blr-confirm-btn" style={{ background: 'var(--accent)', height: 'var(--control-compact)', borderRadius: 'var(--radius-inner)' }}>Passer en Professionnel</button>
      </div>
      <SectionHead>Préférences</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Bell size={16} />} tone="brand" title="Notifications" meta="échéances, retards, fins de bail" trailing={<span className="blr-toggle blr-toggle-on" />} />
        <ListRow icon={<Mail size={16} />} tone="terra" title="Modèles d’emails" meta="quittance, relance, information" />
        <ListRow icon={<Settings size={16} />} tone="positive" title="Compte et sécurité" meta="email, mot de passe" />
      </div>
      <SectionHead>Légal</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<FileText size={16} />} tone="brand" title="Conditions et confidentialité" meta="CGU, mentions légales" />
      </div>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Administration" back action={<ShieldCheck size={17} />} />
      <div className="blr-admin-kpis">
        <div><span>Abonnés actifs</span><strong className="blr-num">248</strong><small>+ 12 ce mois-ci</small></div>
        <div><span>Revenu mensuel</span><strong className="blr-num">6 132 €</strong><small>via App Store / Play</small></div>
      </div>
      <div className="blr-panel" style={{ marginTop: 9, padding: '10px 12px' }}>
        <span style={{ color: 'var(--ink-soft)', fontSize: 'var(--type-meta)', fontWeight: 700 }}>RÉPARTITION DES FORMULES</span>
        <div className="blr-mix-bar"><i className="blr-mix-a" style={{ width: '68%' }} /><i className="blr-mix-b" style={{ width: '32%' }} /></div>
        <div className="blr-mix-legend">
          <span><i className="blr-mix-a" /> Particulier · 168</span>
          <span><i className="blr-mix-b" /> Professionnel · 80</span>
        </div>
      </div>
      <SectionHead action="Aujourd’hui">Envois d’emails</SectionHead>
      <div className="blr-panel">
        <ListRow icon={<Send size={16} />} tone="positive" title="212 emails délivrés" meta="quittances et relances des abonnés" />
        <ListRow icon={<CircleAlert size={16} />} tone="warning" title="2 adresses en erreur" meta="à signaler aux propriétaires concernés" />
      </div>
      <Note
        tone="brand"
        icon={<Lock size={15} />}
        title="Vous voyez les comptes, jamais leurs données"
        text="Ni SCI, ni baux, ni documents des abonnés, par construction."
      />
    </div>
  )
}

// ============================================================
// ÉTATS, la signature du travail pro (2 écrans)
// ============================================================

function EmptySciScreen() {
  return (
    <div className="blr-content blr-with-tab">
      <TopBar title="Mon patrimoine" noAction />
      <div className="blr-empty" style={{ paddingBottom: 10 }}>
        <div className="blr-empty-icon"><BailoraLogo size={26} /></div>
        <h2>Par où commencer ?</h2>
        <p>Deux façons de gérer, choisissez la vôtre. Vous pourrez toujours ajouter l’autre plus tard.</p>
      </div>
      <div className="blr-value-list" style={{ marginTop: 0 }}>
        <div className="blr-value-card" role="button" tabIndex={0} onClick={() => goTo('sci-create')} style={{ cursor: 'pointer' }}>
          <i><Landmark size={18} /></i>
          <div><strong>J’ai une ou plusieurs SCI</strong><small>Créez vos sociétés, puis rangez-y vos logements et leurs locataires.</small></div>
        </div>
        <div className="blr-value-card" role="button" tabIndex={0} onClick={() => goTo('property-create')} style={{ cursor: 'pointer' }}>
          <i><Home size={18} /></i>
          <div><strong>Je loue en mon nom</strong><small>Ajoutez directement un appartement ou une maison, sans société.</small></div>
        </div>
      </div>
      <TabBar active="assets" />
    </div>
  )
}

function ErrorCodeScreen() {
  return (
    <div className="blr-content">
      <TopBar title="Espace locataire" back />
      <ScreenHeading title="Code de vérification" subtitle="Saisissez le code à 6 chiffres reçu par email." />
      <div className="blr-error-banner" style={{ marginTop: 14 }}>
        <CircleAlert size={17} />
        <div>
          <strong>Ce code a expiré</strong>
          <small>Demandez-en un nouveau, l’ancien devient aussitôt inutilisable.</small>
        </div>
      </div>
      <div className="blr-input blr-input-error" style={{ justifyContent: 'center', gap: 12, fontSize: 15, fontWeight: 850, letterSpacing: '0.35em' }}>
        <span className="blr-num" style={{ color: 'var(--ink)' }}>4 8 2 · · ·</span>
      </div>
      <div className="blr-bottom-actions">
        <UiButton><Send size={15} /> Recevoir un nouveau code</UiButton>
        <small className="blr-legal">Le code est envoyé à y•••@mail.fr, vérifiez vos indésirables.</small>
      </div>
    </div>
  )
}

// ============================================================
// LE DOSSIER DE CONCEPTION, assemblage de la page
// ============================================================

const FLOWS = [
  {
    n: '02',
    title: 'L’installation',
    note: 'Ce que voit un nouveau propriétaire, dans l’ordre : la découverte, son compte, et la première décision. L’essai démarre sans carte.',
    mockups: [
      { id: 'onboarding-1', title: 'Ouverture 1 · promesse', subtitle: 'La première impression décide', screen: <Onboarding1Screen />, notes: ['Cliquable : Continuer'] },
      { id: 'onboarding-2', title: 'Ouverture 2 · la valeur', subtitle: 'Ce que Bailora fait pour vous', screen: <Onboarding2Screen /> },
      { id: 'onboarding-3', title: 'Ouverture 3 · le locataire', subtitle: 'L’argument que personne d’autre n’a', screen: <Onboarding3Screen /> },
      { id: 'signup', title: 'Création de compte', subtitle: 'Créer ou se connecter, email ou compte du téléphone', screen: <SignupScreen />, notes: ['Sur Android : Google', 'Cliquable : Créer mon compte'] },
      { id: 'paywall', title: 'Abonnement', subtitle: 'Passable pendant l’essai, bloquant à J+30', screen: <PaywallScreen />, notes: ['Cliquable : continuer l’essai'] },
      { id: 'empty-sci', title: 'Premier lancement', subtitle: 'La première décision, expliquée', screen: <EmptySciScreen />, notes: ['SCI ou nom propre, chacun sa porte'] },
    ],
  },
  {
    n: '03',
    title: 'Le patrimoine',
    note: 'Il crée sa SCI ou son logement en nom propre, puis tout s’emboîte : la société, ses biens, leurs locataires et les baux.',
    mockups: [
      { id: 'sci-create', title: 'Créer une SCI', subtitle: 'Nom, SIREN, IBAN : tout ce que les documents rempliront', screen: <SciCreateScreen />, notes: ['Cliquable : Enregistrer'] },
      { id: 'property-create', title: 'Ajouter un logement', subtitle: 'En SCI ou en nom propre, au choix', screen: <PropertyCreateScreen />, notes: ['Cliquable : Enregistrer'] },
      { id: 'sci-list', title: 'Mon patrimoine', subtitle: 'Sociétés et biens en nom propre', screen: <SciListScreen />, notes: ['Cliquable : ouvrir une SCI'] },
      { id: 'sci-detail', title: 'Fiche SCI', subtitle: 'SIREN, IBAN et biens rattachés', screen: <SciDetailScreen />, notes: ['IBAN repris sur les quittances'] },
      { id: 'property', title: 'Fiche bien', subtitle: 'Le logement, son lot, son historique', screen: <PropertyScreen />, notes: ['Historique conservé'] },
      { id: 'tenants', title: 'Mes locataires', subtitle: 'Qui a payé, qui arrive en fin de bail', screen: <TenantsScreen />, notes: ['Statut de paiement en couleur'] },
      { id: 'tenant-file', title: 'Fiche locataire et bail', subtitle: 'Le dossier complet, actions comprises', screen: <TenantFileScreen />, notes: ['4 raccourcis cliquables'] },
    ],
  },
  {
    n: '04',
    title: 'Le quotidien',
    note: 'Une fois installé, voilà ses deux écrans de chaque mois : ce qu’il faut faire aujourd’hui, et l’état des loyers, retards en premier.',
    mockups: [
      { id: 'dashboard', title: 'Tableau de bord', subtitle: 'Le loyer à confirmer, en premier', screen: <DashboardScreen />, notes: ['Une seule question posée', 'Cliquable : Oui, reçu'] },
      { id: 'payments', title: 'Suivi des loyers', subtitle: 'L’écran le plus ouvert du mois', screen: <PaymentsScreen />, scroll: true, notes: ['Les retards en premier'], tall: true },
    ],
  },
  {
    n: '05',
    title: 'Documents et courriers',
    note: 'Les dix documents produits par l’application : quittance, les sept courriers, le modèle personnalisé. Préremplis, vérifiés, envoyés.',
    mockups: [
      { id: 'receipt', title: 'Quittance de loyer', subtitle: 'Aperçu exact avant envoi', screen: <ReceiptScreen />, notes: ['Montants jamais ressaisis'] },
      { id: 'generator', title: 'Générateur · choix', subtitle: 'Les 7 courriers de la gestion locative', screen: <GeneratorScreen />, notes: ['Cliquable : choisir un courrier'] },
      { id: 'generator-preview', title: 'Générateur · aperçu', subtitle: 'Saisie minimale, calcul automatique', screen: <GeneratorPreviewScreen />, notes: ['Aperçu avant validation'] },
      { id: 'custom-letter', title: 'Courrier personnalisé', subtitle: 'Texte libre, en-tête automatique', screen: <CustomLetterScreen />, notes: ['Réutilisable en modèle'] },
      { id: 'email', title: 'Envoi d’un email', subtitle: 'Au nom de la SCI, pièce jointe comprise', screen: <EmailScreen />, notes: ['Envoi programmable'] },
      { id: 'documents', title: 'Documents et photos', subtitle: 'Chaque fichier dans le bon dossier', screen: <DocumentsScreen />, scroll: true, notes: ['Recherche et catégories'] },
    ],
  },
  {
    n: '06',
    title: 'L’état des lieux',
    note: 'Trois temps : pièce par pièce, relevés et clés, puis comparaison photo et double signature horodatée.',
    mockups: [
      { id: 'edl-room', title: 'Parcours pièce par pièce', subtitle: 'Photos horodatées, observations dictées', screen: <EdlRoomScreen />, notes: ['Une étape à la fois', 'Cliquable : suivant'] },
      { id: 'edl-meters', title: 'Compteurs et clés', subtitle: 'Relevés, remise des clés', screen: <EdlMetersScreen />, notes: ['Fonctionne sans réseau'] },
      { id: 'edl-compare', title: 'Comparaison et signatures', subtitle: 'Entrée / sortie côte à côte, signé du doigt', screen: <EdlCompareScreen />, notes: ['Signatures horodatées'] },
    ],
  },
  {
    n: '07',
    title: 'L’argent et l’export',
    note: 'La dépense se photographie, l’exercice s’exporte : le dossier annuel de l’expert-comptable tient en un geste.',
    mockups: [
      { id: 'expenses', title: 'Dépenses', subtitle: 'Le justificatif remplit les champs tout seul', screen: <ExpensesScreen />, notes: ['Champs remplis par la photo'] },
      { id: 'fiscal', title: 'Exercice et export annuel', subtitle: 'CSV, PDF et justificatifs datés', screen: <FiscalScreen />, scroll: true, notes: ['Le dossier du comptable'], tall: true },
    ],
  },
  {
    n: '08',
    title: 'L’assistant vocal',
    note: 'On dicte, l’application comprend, rien ne s’enregistre sans validation.',
    mockups: [
      { id: 'assistant', title: 'Assistant vocal', subtitle: 'On dicte, on relit, on valide', screen: <AssistantScreen />, notes: ['Ouvert par le bouton + de la barre', 'Validation obligatoire'], tall: true },
    ],
  },
  {
    n: '09',
    title: 'Les réglages et l’administration',
    note: 'Le compte, la formule et les préférences du propriétaire, puis l’espace réservé de l’éditeur, qui voit les comptes, jamais leurs données.',
    mockups: [
      { id: 'settings', title: 'Paramètres et abonnement', subtitle: 'Formule, notifications, modèles, légal', screen: <SettingsScreen />, notes: ['Ouvert par l’avatar, en haut à gauche', 'Changement de formule intégré'] },
      { id: 'admin', title: 'Espace d’administration', subtitle: 'Abonnés, formules et envois d’emails', screen: <AdminScreen />, scroll: true, notes: ['Réservé à l’éditeur'], tall: true },
    ],
  },
  {
    n: '10',
    title: 'Et côté locataire',
    note: 'Le voyage se termine chez celui qui reçoit : invité par email, il consulte son loyer et télécharge ses quittances sans jamais les réclamer. En lecture seule, toujours.',
    mockups: [
      { id: 'error-code', title: 'Connexion locataire', subtitle: 'Le code à 6 chiffres, et l’erreur qui dit quoi faire', screen: <ErrorCodeScreen />, notes: ['Champ en faute souligné'] },
      { id: 'tenant-home', title: 'Accueil locataire', subtitle: 'Son logement, son loyer, l’IBAN', screen: <TenantHomeScreen />, notes: ['Lecture seule', 'Cliquable : documents'] },
      { id: 'tenant-docs', title: 'Quittances et documents', subtitle: 'Tout se télécharge, rien ne se demande', screen: <TenantDocsScreen />, notes: ['Prévenu à chaque document'] },
    ],
  },
]

// Planche de direction artistique, en langage CLIENT : ce que les couleurs
// veulent dire et ce que ça change pour lui. Le jargon (tokens, px, crans)
// vit dans le CSS, pas sur cette page.
function DirectionArtistique() {
  return (
    <section className="blr-flow" id="direction-artistique">
      <div className="blr-flow-head">
        <span>01</span>
        <h2>La charte graphique</h2>
      </div>
      <div className="blr-da">
        <div className="blr-da-grid">
          <div>
            <h3>Le logo</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
              <AppMark />
              <span style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, color: 'var(--accent)', background: 'var(--accent-soft)' }}><BailoraLogo size={22} /></span>
              <span style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, color: 'var(--ink)', background: 'var(--card-soft)' }}><BailoraLogo size={22} /></span>
            </div>
          </div>
          <div>
            <h3>Les couleurs, chacune a un sens</h3>
            <div className="blr-swatches">
              <div className="blr-swatch"><i style={{ background: '#7a2e3a' }} /><code>Bordeaux</code><span>la couleur de Bailora</span></div>
              <div className="blr-swatch"><i style={{ background: '#c46a4a' }} /><code>Terracotta</code><span>la touche chaleureuse</span></div>
              <div className="blr-swatch"><i style={{ background: '#2e7d5b' }} /><code>Vert</code><span>un loyer reçu, une confirmation</span></div>
              <div className="blr-swatch"><i style={{ background: '#be8a2f' }} /><code>Ambre</code><span>un retard, une échéance</span></div>
              <div className="blr-swatch"><i style={{ background: '#b3362b' }} /><code>Rouge</code><span>mise en demeure, uniquement</span></div>
              <div className="blr-swatch"><i style={{ background: '#faf6f0', border: '1px solid #d6c9b9' }} /><code>Crème</code><span>le fond, chaleureux et calme</span></div>
              <div className="blr-swatch"><i style={{ background: '#2b2320' }} /><code>Encre</code><span>le texte, jamais de noir dur</span></div>
            </div>
          </div>
          <div>
            <h3>Les textes, une hiérarchie claire</h3>
            <div className="blr-type-scale">
              <div><b style={{ fontFamily: 'var(--font-display)', fontSize: 27 }}>Titre d’écran</b><span>élégant, patrimonial</span></div>
              <div><b style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>Titre de carte</b><span>même famille</span></div>
              <div><b style={{ fontSize: 15, fontWeight: 800 }}>Sous-titre</b><span>net, moderne</span></div>
              <div><b style={{ fontSize: 12 }}>Texte courant, ce que vous lisez le plus</b><span>lisible partout</span></div>
              <div><b style={{ fontSize: 10.5, fontWeight: 750 }}>Boutons et étiquettes</b><span>toujours nets</span></div>
            </div>
          </div>
          <div>
            <h3>Les boutons, trois niveaux</h3>
            <div className="blr-da-buttons">
              <UiButton>Action principale, une par écran</UiButton>
              <UiButton tone="secondary">Action secondaire</UiButton>
              <UiButton tone="light">Action discrète</UiButton>
              <p>Chaque bouton réagit sous le doigt, l’application se sent vivante.</p>
            </div>
          </div>
          <div>
            <h3>Les composants, les mêmes partout</h3>
            <div className="blr-da-sample">
              <div className="blr-panel">
                <ListRow icon={<ReceiptText size={16} />} tone="positive" title="Quittance, juillet" meta="classée automatiquement" amount="850 €" />
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Pill tone="paid">Reçu le 3</Pill>
                <Pill tone="late">En retard · 18 j</Pill>
                <Pill tone="brand">Prérempli</Pill>
                <Pill tone="neutral">Attendu</Pill>
              </div>
              <div className="blr-input"><Mail size={15} /><span>Champ de saisie confortable</span></div>
            </div>
          </div>
        </div>
        <div className="blr-da-states">
          <h3>Et quand tout ne va pas bien, quatre situations prévues</h3>
          <div className="blr-da-states-grid">
            <div className="blr-state-mini">
              <h4>Une erreur</h4>
              <div className="blr-error-banner" style={{ margin: 0 }}>
                <CircleAlert size={16} />
                <div><strong>Ce code a expiré</strong><small>Demandez-en un nouveau.</small></div>
              </div>
            </div>
            <div className="blr-state-mini">
              <h4>Un écran vide</h4>
              <div style={{ textAlign: 'center', padding: '6px 0' }}>
                <div className="blr-empty-icon" style={{ width: 44, height: 44, margin: '0 auto', borderRadius: 14 }}><Landmark size={19} /></div>
                <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--ink-soft)' }}>Aucune SCI, créez la première.</p>
              </div>
            </div>
            <div className="blr-state-mini">
              <h4>Un chargement</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div className="blr-skeleton" style={{ height: 14, width: '62%' }} />
                <div className="blr-skeleton" style={{ height: 34 }} />
                <div className="blr-skeleton" style={{ height: 34, width: '84%' }} />
              </div>
            </div>
            <div className="blr-state-mini">
              <h4>Une réussite</h4>
              <div className="blr-note blr-note-positive" style={{ margin: 0 }}>
                <CircleCheck size={16} />
                <div><strong>Quittance envoyée</strong><small>Classée chez Yacine.</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MockupCard({ mockup }) {
  return (
    <article id={`mk-${mockup.id}`} className="blr-mockup-card">
      <div className="blr-card-head">
        <h3>{mockup.title}</h3>
        <p>{mockup.subtitle}</p>
        {(mockup.scroll || mockup.notes) && (
          <div className="blr-annotations">
            {mockup.scroll && <span className="blr-scroll-chip"><ChevronDown size={12} /> Écran défilable</span>}
            {(mockup.notes || []).map((n) => <span key={n}>{n}</span>)}
          </div>
        )}
      </div>
      <div className="blr-export-wrap"><PhoneFrame tall={mockup.tall}>{mockup.screen}</PhoneFrame></div>
    </article>
  )
}

export default function BailoraMockupsPage() {
  return (
    <main className="bailora-mockups-page">
      <section className="blr-landing-hero">
        <div>
          <p className="blr-eyebrow">Proposition design</p>
          <h1>Bailora, Maquette V2</h1>
          <p className="blr-reference">Bailora · MOB-2026-157</p>
          <span className="blr-proto-note"><Sparkles size={14} /> Maquette interactive, touchez les boutons</span>
        </div>
      </section>

      <DirectionArtistique />

      {FLOWS.map((flow) => (
        <section key={flow.n} className="blr-flow">
          <div className="blr-flow-head">
            <span>{flow.n}</span>
            <h2>{flow.title}</h2>
            <p>{flow.note}</p>
          </div>
          <div className="blr-gallery">
            {flow.mockups.map((mockup) => <MockupCard key={mockup.id} mockup={mockup} />)}
          </div>
        </section>
      ))}
    </main>
  )
}
