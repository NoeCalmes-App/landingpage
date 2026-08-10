import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookMarked,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  Database,
  ExternalLink,
  FileText,
  Gavel,
  Landmark,
  Link2,
  ListFilter,
  LogOut,
  RefreshCw,
  Scale,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  TriangleAlert,
  User,
} from 'lucide-react'
import './juridik-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes. Une connexion internet est necessaire pour
// afficher ces visuels dans la proposition de maquette.
const FACE = {
  patrick: 'https://i.pravatar.cc/96?img=13',
}

const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80',
}

/* ─────────────────────────── Cadre telephone ─────────────────────────── */

function StatusBar() {
  return (
    <div className="jk-statusbar">
      <span>9:41</span>
      <div className="jk-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children, tall = false }) {
  return (
    <div className={`jk-phone-export${tall ? ' jk-phone-export-tall' : ''}`}>
      <div className="jk-phone">
        <div className="jk-screen">
          <StatusBar />
          {children}
          <div className="jk-home-indicator" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Composants partages ─────────────────────── */

function AppMark({ large = false }) {
  return (
    <div className={`jk-app-mark${large ? ' jk-app-mark-large' : ''}`}>
      <Scale size={large ? 32 : 20} strokeWidth={2} />
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`jk-ui-button jk-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`jk-icon-button ${className}`}>{children}</button>
}

function Chip({ children, active = false }) {
  return <button className={`jk-chip${active ? ' jk-chip-on' : ''}`}>{children}</button>
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`jk-pill jk-pill-${tone}`}>{children}</span>
}

function Avatar({ src, size = 'md' }) {
  return <span className={`jk-avatar jk-avatar-${size}`}><img src={src} alt="" /></span>
}

function TopBar({ title, subtitle, back = false, action }) {
  return (
    <div className="jk-topbar">
      {back
        ? <IconButton><ChevronRight className="jk-back-icon" size={18} /></IconButton>
        : <Avatar src={FACE.patrick} size="top" />}
      <div className="jk-topbar-title">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'search' }) {
  const tabs = [
    { id: 'search', icon: <Search size={19} />, label: 'Rechercher' },
    { id: 'library', icon: <BookMarked size={19} />, label: 'Documents' },
    { id: 'history', icon: <Clock3 size={19} />, label: 'Historique' },
    { id: 'profile', icon: <User size={19} />, label: 'Profil' },
  ]
  return (
    <div className="jk-tabbar">
      {tabs.map((tab) => (
        <div key={tab.id} className={`jk-tab${active === tab.id ? ' jk-tab-active' : ''}`}>
          <span className="jk-tab-icon">{tab.icon}</span>
          <small>{tab.label}</small>
        </div>
      ))}
    </div>
  )
}

function SectionHead({ children, action }) {
  return <div className="jk-section-head"><strong>{children}</strong>{action && <span>{action}</span>}</div>
}

function ScreenHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="jk-screen-heading">
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function ListRow({ icon, tone = 'bordeaux', title, meta, trailing }) {
  return (
    <div className="jk-list-row">
      <span className={`jk-list-icon jk-list-icon-${tone}`}>{icon}</span>
      <div className="jk-list-copy">
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={15} />}
    </div>
  )
}

function Field({ label, value, hint }) {
  return (
    <label className="jk-field">
      <span>{label}</span>
      <div className="jk-input">{value}</div>
      {hint && <small>{hint}</small>}
    </label>
  )
}

// Signature du projet : chaque texte porte un filet vertical dont la couleur
// dit son niveau dans la hierarchie des normes congolaises. En parcourant une
// liste de resultats, on lit la hierarchie avant meme de lire les titres.
function NormRow({ level, label, title, meta, excerpt, sources, alert }) {
  return (
    <article className={`jk-norm jk-norm-${level}`}>
      <span className="jk-norm-rule" />
      <div className="jk-norm-body">
        <div className="jk-norm-head">
          <strong>{title}</strong>
          <span className="jk-norm-tag">{label}</span>
        </div>
        <small className="jk-norm-meta">{meta}</small>
        {excerpt && <p className="jk-quote">{excerpt}</p>}
        {sources && (
          <span className="jk-sources"><CircleCheck size={11} strokeWidth={2.4} />{sources}</span>
        )}
        {alert && (
          <span className="jk-divergence"><TriangleAlert size={11} strokeWidth={2.4} />{alert}</span>
        )}
      </div>
    </article>
  )
}

/* ─────────────────────────────── Ecrans ──────────────────────────────── */

function OnboardingScreen() {
  return (
    <div className="jk-content jk-onboarding">
      <div className="jk-hero-photo">
        <img src={PHOTO.hero} alt="" />
        <div className="jk-hero-overlay" />
        <span className="jk-sticker"><Database size={12} strokeWidth={2.4} /> Mis à jour chaque nuit</span>
        <div className="jk-hero-mark"><AppMark large /></div>
      </div>
      <div className="jk-onboarding-copy">
        <p>JURIDIK</p>
        <h1>Le droit congolais,<br />dans votre poche.</h1>
        <span>Une référence, une question, et tous les textes qui s&apos;y rapportent. Avec leur source et leur date.</span>
      </div>
      <div className="jk-onboarding-actions">
        <UiButton>Rechercher un texte<ArrowRight size={16} /></UiButton>
        <UiButton tone="light">J&apos;ai déjà un compte</UiButton>
        <small>La consultation est libre. Le compte sert à conserver vos textes et vos notes.</small>
      </div>
    </div>
  )
}

function AccountScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="Créer mon compte" />
      <ScreenHeading
        eyebrow="INSCRIPTION"
        title="Retrouvez vos textes partout"
        subtitle="Vos documents et vos notes vous suivent sur tous vos appareils."
      />
      <div className="jk-form">
        <Field label="Nom complet" value="Patrick Mulumba" />
        <Field label="Adresse email" value="p.mulumba@cabinet-mulumba.cd" />
        <Field label="Mot de passe" value="••••••••••" hint="8 caractères minimum" />
        <Field label="Profession (facultatif)" value="Avocat au barreau de Kinshasa" />
      </div>
      <div className="jk-stack-bottom">
        <UiButton>Créer mon compte<ArrowRight size={16} /></UiButton>
        <small className="jk-legal-note">En continuant, vous acceptez les conditions générales et la politique de confidentialité.</small>
      </div>
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="jk-content jk-with-tab">
      <TopBar title="Bonjour Maître" subtitle="Barreau de Kinshasa" />
      <div className="jk-searchbar">
        <Search size={17} strokeWidth={2.2} />
        <span>Un article, un code, ou votre question</span>
      </div>
      <div className="jk-hint-strip">
        <Scale size={12} strokeWidth={2.3} />
        <span>Posez votre question comme à un confrère, en français courant.</span>
      </div>
      <SectionHead>Les codes les plus consultés</SectionHead>
      <div className="jk-code-grid">
        <button className="jk-code-tile jk-norm-loi">
          <Scale size={17} strokeWidth={2.1} />
          <strong>Code du travail</strong>
          <small>318 articles</small>
        </button>
        <button className="jk-code-tile jk-norm-loi">
          <Gavel size={17} strokeWidth={2.1} />
          <strong>Code pénal</strong>
          <small>442 articles</small>
        </button>
        <button className="jk-code-tile jk-norm-decret">
          <Building2 size={17} strokeWidth={2.1} />
          <strong>Code minier</strong>
          <small>344 articles</small>
        </button>
        <button className="jk-code-tile jk-norm-jurisprudence">
          <Landmark size={17} strokeWidth={2.1} />
          <strong>Actes OHADA</strong>
          <small>10 actes uniformes</small>
        </button>
      </div>
      <SectionHead action="Tout voir">Vos recherches récentes</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<Clock3 size={16} />} title="Rupture du contrat de bail commercial" meta="Hier, 11 textes trouvés" />
        <ListRow icon={<Clock3 size={16} />} title="Article 62 du Code du travail" meta="Hier" />
      </div>
      <TabBar active="search" />
    </div>
  )
}

function ResultsScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="23 textes trouvés" subtitle="Licenciement, arrêt maladie" action={<SlidersHorizontal size={17} />} />
      <div className="jk-summary">
        <span className="jk-summary-tag"><Scale size={11} strokeWidth={2.4} />Ce que disent ces textes</span>
        <p>
          La suspension du contrat pour maladie est encadrée par l&apos;<strong>article 62 du Code du travail</strong>,
          complété par le <strong>décret 073 de 2011</strong> sur la durée de la suspension.
        </p>
      </div>

      <SectionHead>Lois et ordonnances-lois</SectionHead>
      <NormRow
        level="loi"
        label="Loi"
        title="Code du travail, article 62"
        meta="Loi 015/2002 · Journal Officiel du 25/10/2002"
        excerpt="Le contrat est suspendu pendant la période d'incapacité de travail résultant d'une maladie ou d'un accident."
        sources="3 sources concordantes"
      />
      <NormRow
        level="loi"
        label="Loi"
        title="Code du travail, article 63"
        meta="Loi 015/2002 · Journal Officiel du 25/10/2002"
        sources="3 sources concordantes"
      />

      <SectionHead>Décrets d&apos;application</SectionHead>
      <NormRow
        level="decret"
        label="Décret"
        title="Décret 073/2011, article 4"
        meta="Durée de la suspension · publié le 12/12/2011"
        excerpt="La suspension ne peut excéder six mois consécutifs, sauf accord écrit des parties."
        sources="2 sources concordantes"
      />

      <SectionHead>Arrêtés ministériels</SectionHead>
      <NormRow
        level="arrete"
        label="Arrêté"
        title="Arrêté 12/CAB.MIN/TPS/2013"
        meta="Constat médical · Ministère du Travail"
        alert="Deux versions divergentes, à vérifier"
      />

      <SectionHead>Jurisprudence</SectionHead>
      <NormRow
        level="jurisprudence"
        label="Arrêt"
        title="Cour de cassation, 12 juin 2019"
        meta="RC 4128 · licenciement pendant suspension"
        excerpt="La rupture notifiée durant la période de suspension est déclarée sans effet."
        sources="2 sources concordantes"
      />
      <NormRow
        level="jurisprudence"
        label="Arrêt"
        title="Cour d&apos;appel de Kinshasa, 3 mars 2021"
        meta="RTA 8802 · indemnité compensatoire"
        sources="1 source"
      />
    </div>
  )
}

function FiltersScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="Filtrer" subtitle="23 textes trouvés" action={<ListFilter size={17} />} />
      <div className="jk-filter-block">
        <SectionHead>Type de texte</SectionHead>
        <div className="jk-chips">
          <Chip active>Tous · 23</Chip>
          <Chip>Loi · 3</Chip>
          <Chip>Ordonnance-loi · 1</Chip>
          <Chip>Décret · 2</Chip>
          <Chip>Arrêté · 4</Chip>
          <Chip>Jurisprudence · 13</Chip>
        </div>
      </div>
      <div className="jk-filter-block">
        <SectionHead>Matière</SectionHead>
        <div className="jk-chips">
          <Chip active>Travail · 18</Chip>
          <Chip>Civil · 3</Chip>
          <Chip>Commercial · 2</Chip>
        </div>
      </div>
      <div className="jk-filter-block">
        <SectionHead>Juridiction</SectionHead>
        <div className="jk-chips">
          <Chip>Cour constitutionnelle</Chip>
          <Chip active>Cour de cassation · 6</Chip>
          <Chip>Cour d&apos;appel · 7</Chip>
        </div>
      </div>
      <div className="jk-filter-block">
        <SectionHead>Province</SectionHead>
        <div className="jk-chips">
          <Chip active>Toutes</Chip>
          <Chip>Kinshasa</Chip>
          <Chip>Haut-Katanga</Chip>
        </div>
      </div>
      <div className="jk-filter-block">
        <SectionHead>Période</SectionHead>
        <div className="jk-chips">
          <Chip active>Toutes</Chip>
          <Chip>Depuis 1960</Chip>
          <Chip>Avant 1960</Chip>
        </div>
      </div>
      <div className="jk-stack-bottom">
        <UiButton>Afficher les 23 textes</UiButton>
      </div>
    </div>
  )
}

function TextScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="Code du travail" subtitle="Article 62" action={<Star size={17} />} />
      <div className="jk-text-head jk-norm-loi">
        <span className="jk-norm-tag">Loi</span>
        <h2>Article 62</h2>
        <small>Loi 015/2002 portant Code du travail</small>
      </div>
      <div className="jk-trust">
        <span className="jk-sources"><CircleCheck size={11} strokeWidth={2.4} />3 sources concordantes</span>
        <span className="jk-collected"><Clock3 size={11} strokeWidth={2.4} />Collecté le 8 août 2026</span>
      </div>
      <p className="jk-quote jk-quote-full">
        Le contrat de travail est suspendu pendant la période d&apos;incapacité de travail résultant
        d&apos;une maladie ou d&apos;un accident non professionnel, dans la limite fixée par voie
        réglementaire. Durant cette période, l&apos;employeur ne peut notifier la rupture du contrat,
        sauf faute lourde étrangère à l&apos;état de santé du travailleur.
      </p>
      <SectionHead>Provenance</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<Landmark size={16} />} tone="gold" title="Journal Officiel" meta="Publié le 25/10/2002" trailing={<ExternalLink size={14} />} />
        <ListRow icon={<Database size={16} />} title="leganet.cd" meta="Relevé le 8 août 2026" trailing={<ExternalLink size={14} />} />
        <ListRow icon={<Database size={16} />} title="droitcongolais.info" meta="Relevé le 8 août 2026" trailing={<ExternalLink size={14} />} />
      </div>
      <SectionHead>Textes liés</SectionHead>
      <NormRow
        level="decret"
        label="Décret"
        title="Décret 073/2011, article 4"
        meta="Fixe la durée maximale de suspension"
        sources="2 sources concordantes"
      />
      <NormRow
        level="jurisprudence"
        label="Arrêt"
        title="Cour de cassation, 12 juin 2019"
        meta="Applique l'article 62 à une rupture notifiée"
        sources="2 sources concordantes"
      />
      <div className="jk-text-actions">
        <UiButton tone="light"><Star size={15} />Enregistrer</UiButton>
        <UiButton tone="light"><Share2 size={15} />Partager</UiButton>
      </div>
    </div>
  )
}

function LibraryScreen() {
  return (
    <div className="jk-content jk-with-tab">
      <TopBar title="Mes documents" subtitle="14 textes conservés" action={<ListFilter size={17} />} />
      <div className="jk-folder-row">
        <Chip active>Tous · 14</Chip>
        <Chip>Affaire Kasongo · 6</Chip>
        <Chip>Veille sociale · 5</Chip>
      </div>
      <SectionHead>Avec vos notes</SectionHead>
      <NormRow
        level="loi"
        label="Loi"
        title="Code du travail, article 62"
        meta="Affaire Kasongo · note ajoutée le 7 août"
        excerpt="Vérifier la date exacte du constat médical avant l'audience du 22."
      />
      <SectionHead>Conservés</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<FileText size={16} />} title="Décret 073/2011, article 4" meta="Affaire Kasongo" trailing={<Star size={14} className="jk-star-on" />} />
        <ListRow icon={<Gavel size={16} />} tone="green" title="Cour de cassation, 12 juin 2019" meta="Affaire Kasongo" trailing={<Star size={14} className="jk-star-on" />} />
        <ListRow icon={<FileText size={16} />} title="Code du travail, article 63" meta="Veille sociale" trailing={<Star size={14} className="jk-star-on" />} />
        <ListRow icon={<Landmark size={16} />} tone="gold" title="Acte uniforme OHADA, article 91" meta="Veille sociale" trailing={<Star size={14} className="jk-star-on" />} />
      </div>
      <TabBar active="library" />
    </div>
  )
}

function SubscriptionScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="Passer à l&apos;illimité" />
      <ScreenHeading
        eyebrow="ESSAI DE 14 JOURS"
        title="Cherchez sans compter"
        subtitle="La consultation des textes reste libre. L'abonnement ouvre l'assistant de recherche et vos dossiers."
      />
      <div className="jk-plans">
        <button className="jk-plan">
          <div className="jk-plan-head">
            <strong>Particulier</strong>
            <span className="jk-plan-price">9 $<small>/mois</small></span>
          </div>
          <ul>
            <li><CircleCheck size={13} strokeWidth={2.4} />Questions illimitées</li>
            <li><CircleCheck size={13} strokeWidth={2.4} />Documents et notes</li>
          </ul>
        </button>
        <button className="jk-plan jk-plan-on">
          <Pill tone="gold">Le plus choisi</Pill>
          <div className="jk-plan-head">
            <strong>Cabinet</strong>
            <span className="jk-plan-price">29 $<small>/mois</small></span>
          </div>
          <ul>
            <li><CircleCheck size={13} strokeWidth={2.4} />Tout le particulier</li>
            <li><CircleCheck size={13} strokeWidth={2.4} />Jusqu&apos;à 5 collaborateurs</li>
            <li><CircleCheck size={13} strokeWidth={2.4} />Dossiers partagés</li>
          </ul>
        </button>
      </div>
      <div className="jk-stack-bottom">
        <UiButton>Démarrer l&apos;essai gratuit<ArrowRight size={16} /></UiButton>
        <small className="jk-legal-note">Souscription en deux gestes via l&apos;App Store, sans quitter l&apos;application. Résiliable à tout moment.</small>
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="jk-content jk-with-tab">
      <TopBar title="Profil" action={<Settings size={17} />} />
      <div className="jk-profile-head">
        <Avatar src={FACE.patrick} size="lg" />
        <strong>Patrick Mulumba</strong>
        <small>Avocat au barreau de Kinshasa</small>
      </div>
      <div className="jk-sub-card">
        <div className="jk-sub-head">
          <span className="jk-sub-name">Formule Cabinet</span>
          <Pill tone="green">Actif</Pill>
        </div>
        <p>Renouvellement automatique le 8 septembre 2026.</p>
      </div>
      <SectionHead>Mon abonnement</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<ExternalLink size={16} />} title="Gérer ou résilier" meta="Depuis les réglages de votre téléphone" />
        <ListRow icon={<RefreshCw size={16} />} tone="gold" title="Restaurer mes achats" meta="Après un changement d'appareil" />
      </div>
      <SectionHead>Mon compte</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<BookMarked size={16} />} title="Mes documents" meta="14 textes conservés" />
        <ListRow icon={<Settings size={16} />} title="Paramètres" meta="Notifications et informations légales" />
        <ListRow icon={<LogOut size={16} />} tone="clay" title="Se déconnecter" meta="" trailing={<span />} />
      </div>
      <TabBar active="profile" />
    </div>
  )
}

function ReportScreen() {
  return (
    <div className="jk-content">
      <TopBar back title="Signaler une erreur" />
      <div className="jk-report-target jk-norm-arrete">
        <span className="jk-norm-tag">Arrêté</span>
        <strong>Arrêté 12/CAB.MIN/TPS/2013</strong>
        <small>Collecté le 8 août 2026 depuis leganet.cd</small>
      </div>
      <SectionHead>Que se passe-t-il ?</SectionHead>
      <div className="jk-chips">
        <Chip active>Texte abrogé</Chip>
        <Chip>Version périmée</Chip>
        <Chip>Texte incomplet</Chip>
        <Chip>Mauvaise référence</Chip>
      </div>
      <div className="jk-form">
        <Field
          label="Précisions"
          value="Abrogé par l'arrêté 034 du 9 mai 2018."
        />
        <Field label="Source correcte (facultatif)" value="journalofficiel.cd/2018/034" />
      </div>
      <div className="jk-notice">
        <ShieldCheck size={15} strokeWidth={2.2} />
        <span>Les textes sont collectés automatiquement depuis les sources officielles et ne sont pas relus un par un. Vos signalements sont traités en priorité.</span>
      </div>
      <div className="jk-stack-bottom">
        <UiButton>Envoyer le signalement</UiButton>
      </div>
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="jk-content">
      <TopBar title="Administration" subtitle="Compte administrateur" action={<SlidersHorizontal size={17} />} />
      <div className="jk-stat-grid">
        <div className="jk-stat"><span>Textes en base</span><strong>4 218</strong><small>+ 37 cette nuit</small></div>
        <div className="jk-stat"><span>Sources actives</span><strong>6</strong><small>toutes officielles</small></div>
        <div className="jk-stat"><span>Abonnés</span><strong>142</strong><small>dont 31 cabinets</small></div>
        <div className="jk-stat"><span>Dépense du mois</span><strong>58 $</strong><small>plafond 150 $</small></div>
      </div>

      <SectionHead action="Gérer">Collecte de la nuit</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<CircleCheck size={16} />} tone="green" title="Journal Officiel" meta="04:12 · 21 nouveaux textes" trailing={<Pill tone="green">À jour</Pill>} />
        <ListRow icon={<CircleCheck size={16} />} tone="green" title="leganet.cd" meta="04:19 · 16 nouveaux textes" trailing={<Pill tone="green">À jour</Pill>} />
        <ListRow icon={<CircleAlert size={16} />} tone="clay" title="droitcongolais.info" meta="04:26 · site injoignable" trailing={<Pill tone="clay">Échec</Pill>} />
      </div>

      <SectionHead>Recherches sans résultat</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<Search size={16} />} tone="gold" title="Édit provincial minier Lualaba" meta="Demandé 9 fois cette semaine" trailing={<Pill tone="gold">À ajouter</Pill>} />
        <ListRow icon={<Search size={16} />} tone="gold" title="Statut du personnel de carrière" meta="Demandé 4 fois cette semaine" trailing={<Pill tone="gold">À ajouter</Pill>} />
      </div>

      <SectionHead>Erreurs signalées</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<TriangleAlert size={16} />} tone="clay" title="Arrêté 12/CAB.MIN/TPS/2013" meta="Signalé abrogé par 2 avocats" trailing={<Pill tone="clay">À traiter</Pill>} />
      </div>

      <SectionHead>Réglages du service</SectionHead>
      <div className="jk-panel">
        <ListRow icon={<Link2 size={16} />} tone="bordeaux" title="Liste des sources collectées" meta="6 sites officiels" />
        <ListRow icon={<ShieldCheck size={16} />} tone="bordeaux" title="Plafond de dépense mensuel" meta="Recherche internet suspendue au-delà" trailing={<Pill tone="neutral">150 $</Pill>} />
        <ListRow icon={<BadgeCheck size={16} />} tone="bordeaux" title="Administrateurs" meta="Vous et 1 collaborateur" />
      </div>
    </div>
  )
}

/* ────────────────────────────── Galerie ──────────────────────────────── */

const mockups = [
  { id: 'onboarding', title: 'Ouverture de Juridik', subtitle: 'Le premier écran, consultation libre', screen: <OnboardingScreen /> },
  { id: 'search', title: 'Recherche', subtitle: 'Une référence précise ou une question', screen: <SearchScreen /> },
  { id: 'results', title: 'Résultats de recherche', subtitle: 'Classés par hiérarchie des normes', screen: <ResultsScreen />, tall: true, scrollable: true },
  { id: 'filters', title: 'Filtres', subtitle: 'Type, matière, juridiction et province', screen: <FiltersScreen /> },
  { id: 'text', title: 'Fiche d’un texte', subtitle: 'Le texte, sa provenance et ses liens', screen: <TextScreen />, tall: true, scrollable: true },
  { id: 'library', title: 'Mes documents', subtitle: 'Textes conservés et notes personnelles', screen: <LibraryScreen /> },
  { id: 'account', title: 'Création de compte', subtitle: 'Email et mot de passe', screen: <AccountScreen /> },
  { id: 'subscription', title: 'Écran d’abonnement', subtitle: 'Essai gratuit puis achat intégré', screen: <SubscriptionScreen /> },
  { id: 'profile', title: 'Profil', subtitle: 'Abonnement en cours et restauration', screen: <ProfileScreen /> },
  { id: 'report', title: 'Signaler une erreur', subtitle: 'Le contrôle qualité vient des utilisateurs', screen: <ReportScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Collecte, manques et dépenses', screen: <AdminScreen />, tall: true, scrollable: true },
]

export default function JuridikMockupsPage() {
  return (
    <main className="juridik-mockups-page">
      <section className="jk-landing-hero">
        <div>
          <p className="jk-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="jk-reference">Juridik · MOB-2026-juridik</p>
          <p className="jk-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="jk-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="jk-mockup-card">
            <div className="jk-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
              {mockup.scrollable && (
                <span className="jk-scroll-hint"><ChevronDown size={13} /> Écran à faire défiler</span>
              )}
            </div>
            <div className="jk-export-wrap"><PhoneFrame tall={mockup.tall}>{mockup.screen}</PhoneFrame></div>
          </article>
        ))}
      </section>
    </main>
  )
}
