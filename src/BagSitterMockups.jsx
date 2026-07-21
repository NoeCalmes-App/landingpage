import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  Star,
  User,
  Wallet,
} from 'lucide-react'
import './bagsitter-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Vraies photos par URL (cf. guide creation-maquette : pravatar = visages
// stables et deterministes, Unsplash = photos precises). Necessite une
// connexion internet a l'affichage. Un fond degrade sert de fallback.
const FACE = {
  tom: 'https://i.pravatar.cc/96?img=15',
  lea: 'https://i.pravatar.cc/96?img=47',
  karim: 'https://i.pravatar.cc/96?img=12',
  sofia: 'https://i.pravatar.cc/96?img=32',
}
const PHOTO = {
  station: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&q=80',
  place: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
}

function StatusBar() {
  return (
    <div className="bs-statusbar">
      <span>9:41</span>
      <div className="bs-status-icons">
        <StatusBarIcons />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="bs-phone-export">
      <div className="bs-phone">
        <div className="bs-screen">
          <StatusBar />
          {children}
          <div className="bs-home-indicator" />
        </div>
      </div>
    </div>
  )
}

function AppMark({ large = false }) {
  return (
    <div className={`bs-app-mark${large ? ' bs-app-mark-large' : ''}`}>
      <span className="bs-mark-emoji">{'\u{1F9F3}'}</span>
    </div>
  )
}

function UiButton({ children, tone = 'primary', className = '' }) {
  return <button className={`bs-ui-button bs-ui-button-${tone} ${className}`}>{children}</button>
}

function IconButton({ children, className = '' }) {
  return <button className={`bs-icon-button ${className}`}>{children}</button>
}

function ScreenTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`bs-screen-title${centered ? ' bs-screen-title-centered' : ''}`}>
      {eyebrow && <p>{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

function TopBar({ title, action }) {
  return (
    <div className="bs-topbar">
      <span className="bs-topbar-avatar"><img src={FACE.tom} alt="" /></span>
      <strong>{title}</strong>
      <IconButton>{action || <Bell size={17} />}</IconButton>
    </div>
  )
}

function TabBar({ active = 'search' }) {
  const tabs = [
    { id: 'search', icon: <Search size={20} />, label: 'Rechercher' },
    { id: 'bags', icon: <Clock size={20} />, label: 'Mes gardes' },
    { id: 'chat', icon: <MessageCircle size={20} />, label: 'Messages' },
    { id: 'profile', icon: <User size={20} />, label: 'Profil' },
  ]
  return (
    <div className="bs-tabbar">
      {tabs.map((t) => (
        <div key={t.id} className={`bs-tab${t.id === active ? ' bs-tab-active' : ''}`}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

function ListRow({ icon, title, meta, trailing, iconTone = '' }) {
  return (
    <div className="bs-list-row">
      <span className={`bs-list-ico ${iconTone}`}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      {trailing || <ChevronRight size={16} />}
    </div>
  )
}

function Pill({ tone = 'neutral', children }) {
  return <span className={`bs-pill bs-pill-${tone}`}>{children}</span>
}

function Avatar({ src, letter, tone = 'brand', size = 'md' }) {
  return (
    <span className={`bs-av bs-av-${tone} bs-av-${size}`}>
      {src ? <img src={src} alt="" /> : letter}
    </span>
  )
}

function CodeBoxes({ digits }) {
  return (
    <div className="bs-code-boxes">
      {digits.split('').map((d, i) => (
        <span key={i}>{d}</span>
      ))}
    </div>
  )
}

/* ───────────────────────── Screens ───────────────────────── */

function OnboardingScreen() {
  return (
    <div className="bs-content bs-login">
      <div className="bs-hero-photo">
        <img src={PHOTO.station} alt="" />
        <div className="bs-hero-glow" />
        <span className="bs-hero-badge">{'\u{1F9F3}'} Posez-la, on s&apos;en occupe</span>
        <div className="bs-hero-mark"><AppMark large /></div>
      </div>
      <div className="bs-login-top">
        <ScreenTitle
          centered
          eyebrow="BAGSITTER"
          title="Laissez vos bagages, pas votre journée."
          subtitle="Trouvez près de vous quelqu'un de vérifié qui garde votre valise le temps qu'il vous faut."
        />
      </div>
      <div className="bs-login-bottom">
        <UiButton>Trouver un gardien<ArrowRight size={17} /></UiButton>
        <UiButton tone="ghostline" className="bs-auth-btn">J&apos;ai déjà un compte</UiButton>
        <p className="bs-legal-note">Connexion par email, Apple ou Google. En continuant, vous acceptez les CGU et la politique de confidentialité.</p>
      </div>
    </div>
  )
}

function AccountScreen() {
  return (
    <div className="bs-content bs-form-screen">
      <div className="bs-public-head">
        <AppMark />
        <span>Créer mon compte</span>
      </div>
      <ScreenTitle title="On fait connaissance" subtitle="Votre numéro est vérifié par SMS, c'est ce qui rassure les gardiens." />
      <div className="bs-field"><label>Prénom</label><div className="bs-input">Tom</div></div>
      <div className="bs-field"><label>Email</label><div className="bs-input">tom.bernard@email.fr</div></div>
      <div className="bs-field"><label>Mot de passe</label><div className="bs-input">••••••••••</div></div>
      <div className="bs-field"><label>Numéro de téléphone</label><div className="bs-input">06 24 88 41 07</div></div>
      <UiButton className="bs-w-full">Continuer<ArrowRight size={16} /></UiButton>
      <div className="bs-divider"><span>ou</span></div>
      <UiButton tone="ghostline" className="bs-w-full">Continuer avec Apple</UiButton>
      <UiButton tone="ghostline" className="bs-w-full">Continuer avec Google</UiButton>
    </div>
  )
}

function IdentityScreen() {
  return (
    <div className="bs-content bs-form-screen">
      <div className="bs-public-head">
        <AppMark />
        <span>Vérification d&apos;identité</span>
      </div>
      <ScreenTitle title="Une minute, une seule fois" subtitle="Tout le monde est vérifié sur BagSitter. C'est ce qui fait qu'on se confie une valise sans stress." />
      <div className="bs-steps">
        <div className="bs-step bs-step-done">
          <span className="bs-step-ico"><Check size={14} /></span>
          <div><strong>Numéro de téléphone</strong><small>Vérifié par SMS</small></div>
          <Pill tone="green">Fait</Pill>
        </div>
        <div className="bs-step bs-step-on">
          <span className="bs-step-ico"><Camera size={14} /></span>
          <div><strong>Pièce d&apos;identité</strong><small>Recto et verso, dans l&apos;application</small></div>
          <Pill tone="brand">En cours</Pill>
        </div>
        <div className="bs-step">
          <span className="bs-step-ico"><User size={14} /></span>
          <div><strong>Photo de vous</strong><small>Pour confirmer que c&apos;est bien vous</small></div>
          <Pill tone="neutral">À venir</Pill>
        </div>
      </div>
      <div className="bs-secure">
        <ShieldCheck size={15} />
        <span>Vos documents sont contrôlés par un prestataire agréé. BagSitter ne les conserve jamais.</span>
      </div>
      <UiButton className="bs-w-full">Photographier ma pièce<Camera size={16} /></UiButton>
    </div>
  )
}

function SearchScreen() {
  return (
    <div className="bs-content bs-pad-tab">
      <div className="bs-search-bar">
        <Search size={16} />
        <div><strong>Gare Part-Dieu, Lyon</strong><small>Aujourd&apos;hui 9h30 · 18h00 · 2 bagages</small></div>
      </div>
      <div className="bs-map">
        <span className="bs-map-road bs-map-road-a" />
        <span className="bs-map-road bs-map-road-b" />
        <span className="bs-map-road bs-map-road-c" />
        <span className="bs-map-park" />
        <span className="bs-map-zone bs-map-zone-1"><i /></span>
        <span className="bs-map-zone bs-map-zone-2"><i /></span>
        <span className="bs-map-pin bs-map-pin-1">7,90 €</span>
        <span className="bs-map-pin bs-map-pin-2 bs-map-pin-on">7,90 €</span>
        <span className="bs-map-me" />
        <span className="bs-map-note"><MapPin size={11} />Zone approximative tant que la réservation n&apos;est pas payée</span>
      </div>
      <div className="bs-section-label">4 gardiens disponibles autour</div>
      <div className="bs-panel bs-panel-flush">
        <div className="bs-host-row">
          <Avatar src={FACE.lea} letter="L" />
          <div className="bs-host-txt">
            <strong>Léa <BadgeCheck size={13} /></strong>
            <small>À 220 m · 4,9 <Star size={10} /> · 3 places</small>
          </div>
          <span className="bs-row-amount">7,90 €</span>
        </div>
        <div className="bs-host-row">
          <Avatar src={FACE.karim} letter="K" tone="dark" />
          <div className="bs-host-txt">
            <strong>Karim <BadgeCheck size={13} /></strong>
            <small>À 480 m · 4,8 <Star size={10} /> · 5 places</small>
          </div>
          <span className="bs-row-amount">7,90 €</span>
        </div>
        <div className="bs-host-row">
          <Avatar src={FACE.sofia} letter="S" tone="green" />
          <div className="bs-host-txt">
            <strong>Sofia <BadgeCheck size={13} /></strong>
            <small>À 650 m · Nouvelle · 2 places</small>
          </div>
          <span className="bs-row-amount">7,90 €</span>
        </div>
      </div>
      <TabBar active="search" />
    </div>
  )
}

function HostScreen() {
  return (
    <div className="bs-content">
      <div className="bs-host-head">
        <Avatar src={FACE.lea} letter="L" size="lg" />
        <div>
          <strong>Léa, 29 ans</strong>
          <small>Quartier Part-Dieu · à 220 m de vous</small>
          <div className="bs-badges">
            <Pill tone="green"><BadgeCheck size={11} />Identité vérifiée</Pill>
            <Pill tone="neutral">4,9 <Star size={10} /> · 47 gardes</Pill>
          </div>
        </div>
      </div>
      <div className="bs-place">
        <img src={PHOTO.place} alt="" />
        <span className="bs-place-tag">Le lieu de garde</span>
      </div>
      <div className="bs-quote">
        <span className="bs-emoji">{'\u{1F44B}'}</span>
        <p>« J&apos;habite juste derrière la gare, vos bagages sont dans une pièce fermée à clé. Je suis là de 8h à 20h. »</p>
      </div>
      <div className="bs-section-label">Ce qu&apos;elle peut accueillir</div>
      <div className="bs-cat-grid">
        <div className="bs-cat"><span className="bs-emoji">{'\u{1F9F3}'}</span>Valises<small>3 places</small></div>
        <div className="bs-cat"><span className="bs-emoji">{'\u{1F392}'}</span>Sacs à dos<small>illimité</small></div>
        <div className="bs-cat"><span className="bs-emoji">{'\u{1F6C4}'}</span>Cabine<small>3 places</small></div>
      </div>
      <div className="bs-price-bar">
        <div><strong>7,90 €</strong><small>par bagage et par jour</small></div>
        <UiButton>Réserver</UiButton>
      </div>
    </div>
  )
}

function PaymentScreen() {
  return (
    <div className="bs-content bs-form-screen">
      <div className="bs-public-head">
        <AppMark />
        <span>Récapitulatif</span>
      </div>
      <div className="bs-recap">
        <div className="bs-recap-row"><span>Chez Léa, Part-Dieu</span><strong>Aujourd&apos;hui</strong></div>
        <div className="bs-recap-row"><span>De 9h30 à 18h00</span><strong>1 journée</strong></div>
        <div className="bs-recap-row"><span>2 bagages × 7,90 €</span><strong>15,80 €</strong></div>
        <div className="bs-recap-total"><span>Total</span><strong>15,80 €</strong></div>
      </div>
      <div className="bs-field"><label>Valeur déclarée de vos bagages</label>
        <div className="bs-chips"><span className="bs-chip">Jusqu&apos;à 150 €</span><span className="bs-chip bs-chip-on">Jusqu&apos;à 500 €</span><span className="bs-chip">Jusqu&apos;à 1 500 €</span></div>
      </div>
      <div className="bs-field"><label>Moyen de paiement</label>
        <div className="bs-card-row">
          <span className="bs-card-ico"><CreditCard size={16} /></span>
          <div><strong>Visa •••• 4192</strong><small>Expire 08/28</small></div>
          <Check size={16} />
        </div>
      </div>
      <UiButton tone="dark" className="bs-w-full">Payer avec Apple Pay</UiButton>
      <div className="bs-secure">
        <ShieldCheck size={15} />
        <span>Rien n&apos;est prélevé maintenant. Le paiement part au dépôt, et une caution de 100 € est simplement bloquée.</span>
      </div>
    </div>
  )
}

function ConfirmScreen() {
  return (
    <div className="bs-content">
      <div className="bs-confirm-head">
        <span className="bs-confirm-ico"><Check size={22} /></span>
        <strong>C&apos;est réservé</strong>
        <small>Léa vous attend jusqu&apos;à 10h30</small>
      </div>
      <div className="bs-code-card">
        <span>Votre code de dépôt</span>
        <CodeBoxes digits="472916" />
        <small>Montrez-le à Léa, c&apos;est elle qui le saisit.</small>
      </div>
      <div className="bs-address">
        <span className="bs-address-ico"><MapPin size={16} /></span>
        <div><strong>14 rue de la Villette</strong><small>69003 Lyon · 4 min à pied</small></div>
        <button className="bs-go">Itinéraire</button>
      </div>
      <div className="bs-section-label">Votre réservation</div>
      <div className="bs-panel bs-panel-flush">
        <ListRow icon={<span className="bs-emoji">{'\u{1F9F3}'}</span>} title="2 bagages" meta="Valeur déclarée jusqu'à 500 €" trailing={<span className="bs-row-amount">15,80 €</span>} />
        <ListRow icon={<Wallet size={16} />} title="Caution bloquée" meta="Libérée à la récupération" trailing={<Pill tone="neutral">100 €</Pill>} />
      </div>
      <UiButton tone="ghostline" className="bs-w-full">Écrire à Léa</UiButton>
    </div>
  )
}

function DropoffScreen() {
  return (
    <div className="bs-content">
      <div className="bs-public-head">
        <AppMark />
        <span>Dépôt des bagages</span>
      </div>
      <ScreenTitle title="Photographiez vos bagages" subtitle="Quatre photos prises maintenant, dans l'application. Elles serviront de preuve à la récupération." />
      <div className="bs-photo-grid">
        <div className="bs-shot bs-shot-done"><span className="bs-emoji">{'\u{1F9F3}'}</span><i><Check size={12} /></i>Face</div>
        <div className="bs-shot bs-shot-done"><span className="bs-emoji">{'\u{1F9F3}'}</span><i><Check size={12} /></i>Dos</div>
        <div className="bs-shot bs-shot-on"><Camera size={20} />Dessus</div>
        <div className="bs-shot"><Camera size={20} />Fermeture</div>
      </div>
      <div className="bs-stamp">
        <Clock size={13} />
        <span>Chaque photo est datée, située et rattachée à la réservation</span>
      </div>
      <div className="bs-section-label">Validation</div>
      <div className="bs-panel bs-panel-flush">
        <div className="bs-valid-row"><Avatar src={FACE.tom} letter="T" size="sm" /><div><strong>Vous</strong><small>État confirmé</small></div><Pill tone="green">Validé</Pill></div>
        <div className="bs-valid-row"><Avatar src={FACE.lea} letter="L" size="sm" /><div><strong>Léa</strong><small>En attente du code</small></div><Pill tone="alert">À faire</Pill></div>
      </div>
      <UiButton className="bs-w-full">Donner le code à Léa</UiButton>
    </div>
  )
}

function ActiveScreen() {
  return (
    <div className="bs-content bs-pad-tab">
      <TopBar title="Garde en cours" />
      <div className="bs-timer">
        <span>Temps restant</span>
        <strong>5 h 12</strong>
        <small>Récupération avant 18h00 chez Léa</small>
        <div className="bs-timer-bar"><i style={{ width: '38%' }} /></div>
      </div>
      <div className="bs-section-label">Votre garde</div>
      <div className="bs-panel bs-panel-flush">
        <ListRow icon={<Avatar src={FACE.lea} letter="L" size="sm" />} title="Léa" meta="14 rue de la Villette, Lyon" trailing={<Pill tone="green">En sécurité</Pill>} />
        <ListRow icon={<span className="bs-emoji">{'\u{1F9F3}'}</span>} title="2 bagages déposés" meta="9h32 · 4 photos enregistrées" />
        <ListRow icon={<Wallet size={16} />} title="Déjà payé" meta="Caution de 100 € bloquée" trailing={<span className="bs-row-amount">15,80 €</span>} />
      </div>
      <div className="bs-hint-card">
        <span className="bs-emoji">{'\u{23F0}'}</span>
        <div><strong>Vous serez en retard ?</strong><small>Chaque tranche de 12 h en plus est facturée 3 €, prévenue à l&apos;avance.</small></div>
      </div>
      <UiButton tone="ghostline" className="bs-w-full">Signaler un problème</UiButton>
      <TabBar active="bags" />
    </div>
  )
}

function PickupScreen() {
  return (
    <div className="bs-content">
      <div className="bs-public-head">
        <AppMark />
        <span>Récupération</span>
      </div>
      <div className="bs-code-card bs-code-card-green">
        <span>Votre code de récupération</span>
        <CodeBoxes digits="836204" />
        <small>Aussi envoyé par SMS et par email, au cas où.</small>
      </div>
      <div className="bs-compare">
        <div className="bs-compare-col"><span>Au dépôt · 9h32</span><div className="bs-compare-box"><span className="bs-emoji">{'\u{1F9F3}'}</span></div></div>
        <div className="bs-compare-col"><span>Maintenant · 17h44</span><div className="bs-compare-box"><span className="bs-emoji">{'\u{1F9F3}'}</span></div></div>
      </div>
      <div className="bs-secure">
        <ShieldCheck size={15} />
        <span>Fermeture intacte : le contenu n&apos;a pas été touché.</span>
      </div>
      <div className="bs-section-label">Ce qui se passe ensuite</div>
      <div className="bs-panel bs-panel-flush">
        <ListRow icon={<Check size={16} />} title="Caution libérée" meta="Les 100 € sont débloqués" trailing={<Pill tone="green">Immédiat</Pill>} />
        <ListRow icon={<Clock size={16} />} title="Léa est payée" meta="Après 24 h, le temps de signaler un souci" trailing={<Pill tone="neutral">Demain</Pill>} />
      </div>
      <UiButton className="bs-w-full">Noter Léa</UiButton>
    </div>
  )
}

function HostSpaceScreen() {
  return (
    <div className="bs-content bs-pad-tab">
      <TopBar title="Mon point de garde" action={<Settings size={17} />} />
      <div className="bs-toggle-card">
        <div><strong>Je suis disponible</strong><small>Votre annonce est visible sur la carte</small></div>
        <span className="bs-toggle bs-toggle-on"><i /></span>
      </div>
      <div className="bs-stat-grid">
        <div className="bs-stat"><span>Ce mois</span><strong>142 €</strong><small>18 gardes</small></div>
        <div className="bs-stat"><span>Prochain virement</span><strong>39,50 €</strong><small>demain</small></div>
        <div className="bs-stat"><span>Note</span><strong>4,9</strong><small>47 avis</small></div>
        <div className="bs-stat"><span>Places libres</span><strong>1 / 3</strong><small>aujourd&apos;hui</small></div>
      </div>
      <div className="bs-section-label">Demandes reçues</div>
      <div className="bs-panel bs-panel-flush">
        <div className="bs-req-row">
          <Avatar src={FACE.tom} letter="T" size="sm" />
          <div className="bs-req-txt"><strong>Tom · 2 bagages</strong><small>9h30 à 18h00 · expire dans 8 min</small></div>
          <span className="bs-row-amount">10,00 €</span>
          <button className="bs-req-ok"><Check size={14} /></button>
        </div>
        <ListRow icon={<Avatar src={FACE.sofia} letter="S" tone="green" size="sm" />} title="Sofia · 1 sac à dos" meta="Demain 7h00 à 12h00" trailing={<Pill tone="neutral">Acceptée</Pill>} />
      </div>
      <p className="bs-hint">Vous pouvez couper les demandes à tout moment sans supprimer votre annonce.</p>
      <TabBar active="profile" />
    </div>
  )
}

function AdminScreen() {
  return (
    <div className="bs-content">
      <TopBar title="Administration" action={<Settings size={17} />} />
      <div className="bs-stat-grid">
        <div className="bs-stat"><span>Gardes du mois</span><strong>412</strong><small>+ 38 cette semaine</small></div>
        <div className="bs-stat"><span>Gardiens actifs</span><strong>46</strong><small>tous vérifiés</small></div>
        <div className="bs-stat"><span>Litiges ouverts</span><strong>2</strong><small>à traiter</small></div>
        <div className="bs-stat"><span>Commission</span><strong>30 %</strong><small>modifiable</small></div>
      </div>
      <div className="bs-section-label">Litige à trancher</div>
      <div className="bs-dispute">
        <div className="bs-dispute-head">
          <strong>Bagage endommagé</strong>
          <Pill tone="alert">Versement gelé</Pill>
        </div>
        <small>Tom / Léa · réservation du 12 juin · valeur déclarée 500 €</small>
        <div className="bs-compare bs-compare-sm">
          <div className="bs-compare-col"><span>Au dépôt</span><div className="bs-compare-box"><span className="bs-emoji">{'\u{1F9F3}'}</span></div></div>
          <div className="bs-compare-col"><span>Au retour</span><div className="bs-compare-box"><span className="bs-emoji">{'\u{1F9F3}'}</span></div></div>
        </div>
        <div className="bs-dispute-actions">
          <button className="bs-act bs-act-on">Rembourser</button>
          <button className="bs-act">Partiel</button>
          <button className="bs-act">Rejeter</button>
        </div>
      </div>
      <div className="bs-section-label">Réglages du service</div>
      <div className="bs-panel bs-panel-flush">
        <ListRow icon={<Wallet size={16} />} title="Tarif par bagage et par jour" meta="Appliqué à toute la plateforme" trailing={<span className="bs-row-amount">7,90 €</span>} />
        <ListRow icon={<User size={16} />} title="Votre compte administrateur" meta="Même connexion, section réservée" trailing={<Pill tone="brand">Admin</Pill>} />
      </div>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Premier écran (onboarding)', screen: <OnboardingScreen /> },
  { id: 'account', title: 'Création de compte', subtitle: 'Email, Apple ou Google', screen: <AccountScreen /> },
  { id: 'identity', title: 'Vérification d’identité', subtitle: 'Pièce officielle et photo', screen: <IdentityScreen /> },
  { id: 'search', title: 'Carte et recherche de lieu', subtitle: 'Les gardiens disponibles autour', screen: <SearchScreen /> },
  { id: 'host', title: 'Fiche d’un gardien', subtitle: 'Note, badges et lieu de garde', screen: <HostScreen /> },
  { id: 'payment', title: 'Récapitulatif et paiement', subtitle: 'Valeur déclarée et caution', screen: <PaymentScreen /> },
  { id: 'confirm', title: 'Confirmation et code de dépôt', subtitle: 'L’adresse exacte apparaît ici', screen: <ConfirmScreen /> },
  { id: 'dropoff', title: 'Dépôt du bagage', subtitle: 'Photos horodatées et validation', screen: <DropoffScreen /> },
  { id: 'active', title: 'Garde en cours', subtitle: 'Temps restant et suivi', screen: <ActiveScreen /> },
  { id: 'pickup', title: 'Récupération du bagage', subtitle: 'Code de retrait et comparaison', screen: <PickupScreen /> },
  { id: 'hostspace', title: 'Mon point de garde', subtitle: 'Côté gardien, avec le même compte', screen: <HostSpaceScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Panel administrateur, dans l’app', screen: <AdminScreen /> },
]

export default function BagSitterMockupsPage() {
  return (
    <main className="bagsitter-mockups-page">
      <section className="bs-landing-hero">
        <div>
          <p className="bs-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="bs-reference">BagSitter · MOB-2026-bagsitter</p>
          <p className="bs-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="bs-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="bs-mockup-card">
            <div className="bs-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="bs-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
