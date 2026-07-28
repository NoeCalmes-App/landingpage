import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  Flag,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
import './guestride-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes (cf. guide creation-maquette).
// Une connexion internet est necessaire pour les afficher.
const FACE = { marc: 'https://i.pravatar.cc/96?img=52' }
const PHOTO = {
  cover: 'https://www.partners-formation.fr/wp-content/uploads/formation-VTC-91-chauffeur-ecoutant-son-passager-partners-formation.jpg',
}

/* ───────────── Cadre telephone ───────────── */

function StatusBar() {
  return (
    <div className="gr-statusbar">
      <span>9:41</span>
      <div className="gr-status-icons"><StatusBarIcons /></div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="gr-phone-export">
      <div className="gr-phone">
        <div className="gr-screen">
          <StatusBar />
          {children}
          <div className="gr-home-indicator" />
        </div>
      </div>
    </div>
  )
}

/* ───────────── Composants ───────────── */

function Mark({ large = false }) {
  return <span className={`gr-mark${large ? ' gr-mark-lg' : ''}`}><CarFront size={large ? 28 : 21} strokeWidth={1.9} /></span>
}

function Button({ children, tone = 'primary' }) {
  return <button className={`gr-btn${tone === 'primary' ? '' : ` gr-btn-${tone}`}`}>{children}</button>
}

function IconBtn({ children }) {
  return <button className="gr-icon-btn">{children}</button>
}

function TopBar({ title, back = false, action }) {
  return (
    <div className="gr-topbar">
      {back ? <IconBtn><ChevronRight className="gr-back" size={17} /></IconBtn> : <span className="gr-ghost" />}
      <strong>{title}</strong>
      {action || <span className="gr-ghost" />}
    </div>
  )
}

function Tag({ tone = 'neutral', children }) {
  return <span className={`gr-tag${tone === 'neutral' ? '' : ` gr-tag-${tone}`}`}>{children}</span>
}

function Row({ icon, chip = 'wine', title, meta, value, tag }) {
  return (
    <div className={`gr-row${icon ? '' : ' gr-row-plain'}`}>
      {icon && <span className={`gr-chip${chip === 'wine' ? '' : ` gr-chip-${chip}`}`}>{icon}</span>}
      <div className="gr-row-copy">
        <strong>{title}</strong>
        {meta && <small>{meta}</small>}
      </div>
      {value && <span className="gr-row-value">{value}</span>}
      {tag}
    </div>
  )
}

function Hero({ label, value, meta, tone = 'wine', small = false, countdown }) {
  return (
    <div className={`gr-hero gr-hero-center${tone === 'green' ? ' gr-hero-green' : ''}${small ? ' gr-hero-small' : ''}`}>
      {countdown && <span className="gr-hero-countdown"><Clock3 size={12} />{countdown}</span>}
      <span>{label}</span>
      <strong>{value}</strong>
      {meta && <small>{meta}</small>}
    </div>
  )
}

function Field({ label, value, empty = false, typing = false }) {
  return (
    <div className={`gr-field${empty ? ' gr-field-empty' : ''}${typing ? ' gr-field-typing' : ''}`}>
      <span className="gr-label">{label}</span>
      <div>{value}</div>
    </div>
  )
}

function Route({ from, fromMeta, to, toMeta }) {
  return (
    <div>
      <div className="gr-route-step"><i /><div><strong>{from}</strong><small>{fromMeta}</small></div></div>
      <div className="gr-route-link" />
      <div className="gr-route-step gr-route-step-end"><i /><div><strong>{to}</strong><small>{toMeta}</small></div></div>
    </div>
  )
}

function Step({ done, title, meta, tag }) {
  return (
    <div className="gr-step">
      <span className={`gr-step-ico${done ? '' : ' gr-step-ico-wait'}`}>{done ? <Check size={13} /> : <Clock3 size={12} />}</span>
      <div><strong>{title}</strong>{meta && <small>{meta}</small>}</div>
      {tag}
    </div>
  )
}

// Carte dessinee : rues, parc, trace du trajet, position de la voiture
// et destination. Rien de photographique, tout est vectoriel et stable.
function MapView() {
  return (
    <svg viewBox="0 0 300 268" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="300" height="268" fill="#e9e6e3" />
      <rect x="18" y="24" width="86" height="66" rx="6" fill="#e0ddd9" />
      <rect x="196" y="34" width="92" height="58" rx="6" fill="#e0ddd9" />
      <rect x="30" y="150" width="74" height="80" rx="6" fill="#e0ddd9" />
      <rect x="206" y="164" width="80" height="72" rx="6" fill="#e0ddd9" />
      <path d="M118 0 L118 268" stroke="#fdfcfb" strokeWidth="17" />
      <path d="M182 0 L182 268" stroke="#fdfcfb" strokeWidth="11" />
      <path d="M0 108 L300 108" stroke="#fdfcfb" strokeWidth="19" />
      <path d="M0 236 L300 236" stroke="#fdfcfb" strokeWidth="11" />
      <path d="M118 60 L300 60" stroke="#fdfcfb" strokeWidth="9" />
      <path d="M124 46 C124 46 124 104 124 104 L176 104 C176 104 176 168 176 168" fill="none" stroke="#8c1d33" strokeOpacity=".22" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M124 46 C124 46 124 104 124 104 L176 104" fill="none" stroke="#8c1d33" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(176 168)">
        <circle r="16" fill="#171516" opacity=".14" />
        <circle r="13" fill="#171516" />
        <path d="M-4.5 -1 h9 M0 -5.5 v11" stroke="#fff" strokeWidth="0" />
        <circle r="4" fill="#fff" />
      </g>
      <g transform="translate(124 46)">
        <circle r="19" fill="#8c1d33" opacity=".16" />
        <circle r="14" fill="#8c1d33" />
        <path d="M-6 1.5 h12 M-4.5 -2.5 l1.5 -3 h6 l1.5 3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="-3.5" cy="3.5" r="1.5" fill="#fff" />
        <circle cx="3.5" cy="3.5" r="1.5" fill="#fff" />
      </g>
    </svg>
  )
}

/* ───────────── Chauffeur ───────────── */

function OnboardingScreen() {
  return (
    <div className="gr-content">
      <div className="gr-cover">
        <img src={PHOTO.cover} alt="" />
        <div className="gr-cover-brand">
          <span className="gr-cover-mark"><CarFront size={26} strokeWidth={1.9} /></span>
          <strong>GuestRide</strong>
        </div>
      </div>
      <h1 className="gr-title">La voiture arrive, le prix est connu.</h1>
      <p className="gr-sub">Les hôtels commandent, les chauffeurs conduisent.</p>
      <div className="gr-roles">
        <div className="gr-role gr-role-on"><CarFront size={22} strokeWidth={1.8} /><strong>Chauffeur</strong></div>
        <div className="gr-role"><Building2 size={22} strokeWidth={1.8} /><strong>Établissement</strong></div>
      </div>
      <div className="gr-spacer" />
      <Button>Créer mon compte <ArrowRight size={17} /></Button>
      <Button tone="light">J&apos;ai déjà un compte</Button>
    </div>
  )
}

function VerificationScreen() {
  return (
    <div className="gr-content">
      <TopBar back title="Vérification" />
      <h1 className="gr-title">Votre dossier est vérifié tout seul.</h1>
      <div className="gr-card">
        <div className="gr-steps">
          <Step done title="Identité confirmée" meta="Pièce d'identité et selfie" />
          <Step done title="Entreprise active" meta="SIRET vérifié auprès de l'INSEE" />
          <Step done title="Carte VTC au bon nom" meta="Correspond à votre identité" />
          <Step title="Assurance" meta="Lecture du document en cours" tag={<Tag>···</Tag>} />
        </div>
      </div>
      <Hero label="Vérification terminée en 1 min 48" value="Compte activé" meta="Vous pouvez recevoir des courses dès maintenant" tone="green" small />
      <div className="gr-card gr-card-flush">
        <Row icon={<CarFront size={18} />} chip="neutral" title="Mercedes Classe E, noire" meta="GA-418-RT, 4 places" />
        <Row icon={<MapPin size={18} />} chip="neutral" title="Bordeaux Métropole" meta="Secteur de vos courses" />
      </div>
      <div className="gr-spacer" />
      <Button>Passer en disponible <ArrowRight size={17} /></Button>
    </div>
  )
}

function DriverHomeScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Marc Delaunay" action={<IconBtn><Bell size={17} /></IconBtn>} />
      <div className="gr-hero gr-hero-split">
        <div>
          <span>Vous êtes disponible</span>
          <strong>184 €</strong>
          <small>Gains du jour, 6 courses</small>
        </div>
        <span className="gr-hero-toggle"><i /></span>
      </div>
      <p className="gr-label">Courses du jour</p>
      <div className="gr-card gr-card-flush">
        <Row icon={<Building2 size={18} />} title="Le Palais Gallien" meta="Aéroport Mérignac" value="38 €" />
        <Row icon={<Building2 size={18} />} title="Villa Royale" meta="Gare Saint-Jean" value="24 €" />
        <Row icon={<Building2 size={18} />} title="Les Quinconces" meta="Saint-Émilion" value="72 €" />
      </div>
      <div className="gr-spacer" />
      <div className="gr-card">
        <Row icon={<FileText size={18} />} chip="neutral" title="Facture de juillet" meta="Commission à régler avant le 15" value="127 €" />
      </div>
    </div>
  )
}

function OfferScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Nouvelle course" />
      <Hero label="Votre gain net" value="32,30 €" meta="38 € de course, commission déduite" tone="green" countdown="24 s" />
      <div className="gr-card">
        <Route from="Le Palais Gallien" fromMeta="À 4 minutes de vous" to="Aéroport de Mérignac" toMeta="14 km, environ 22 minutes" />
      </div>
      <div className="gr-card">
        <Row icon={<Users size={18} />} chip="neutral" title="M. Ferrand, chambre 214" meta="2 passagers, 3 bagages" />
      </div>
      <div className="gr-spacer" />
      <Button tone="green">Accepter <Check size={17} /></Button>
      <Button tone="light">Refuser</Button>
    </div>
  )
}

// Le chauffeur est devant l'hotel et le client ne descend pas : il doit
// pouvoir appeler la reception d'un geste, sans chercher le numero.
function WaitingScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Arrivé à l'hôtel" />
      <Hero label="Vous êtes sur place" value="4 min d'attente" meta="La réception a été prévenue de votre arrivée" small />
      <div className="gr-card gr-card-flush">
        <Row icon={<Users size={18} />} chip="neutral" title="M. Ferrand, chambre 214" meta="2 passagers, 3 bagages" />
        <Row icon={<Phone size={18} />} title="Réception du Palais Gallien" meta="05 56 52 92 71" tag={<Tag tone="wine">Appeler</Tag>} />
        <Row icon={<MapPin size={18} />} chip="neutral" title="6 rue Abbé de l&apos;Épée" meta="Entrée principale, Bordeaux" />
      </div>
      <div className="gr-spacer" />
      <Button tone="green">Client à bord <Check size={17} /></Button>
      <Button tone="light">Le client ne descend pas</Button>
      <p className="gr-legal">Sans réponse au bout de 10 minutes, la réception est alertée et vous êtes libéré.</p>
    </div>
  )
}

function DriveScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Course en cours" action={<IconBtn><Phone size={16} /></IconBtn>} />
      <div className="gr-card">
        <Route from="Le Palais Gallien" fromMeta="Client à bord" to="Aéroport de Mérignac" toMeta="Arrivée estimée 11:42" />
      </div>
      <div className="gr-nav-pair">
        <button className="gr-btn gr-btn-light"><MapPin size={16} strokeWidth={2.1} /> Waze</button>
        <button className="gr-btn gr-btn-light"><MapPin size={16} strokeWidth={2.1} /> Google Maps</button>
      </div>
      <p className="gr-label">Étapes</p>
      <div className="gr-card">
        <div className="gr-steps">
          <Step done title="Arrivé à l'hôtel" tag={<Tag>11:18</Tag>} />
          <Step done title="Course démarrée" tag={<Tag>11:21</Tag>} />
          <Step title="Arrivée à destination" tag={<Tag>18 min</Tag>} />
        </div>
      </div>
      <div className="gr-card gr-card-flush">
        <Row icon={<Users size={18} />} chip="neutral" title="M. Ferrand, chambre 214" meta="2 passagers, 3 bagages" />
        <Row icon={<MapPin size={18} />} chip="neutral" title="Terminal B, départs" meta="Aéroport de Mérignac" />
      </div>
      <div className="gr-spacer" />
      <p className="gr-legal">Le montant à encaisser s&apos;affiche une fois à destination.</p>
    </div>
  )
}

function ArrivalScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Arrivé à destination" />
      <Hero label="Montant à encaisser" value="38,00 €" meta="Prix verrouillé à la réservation" />
      <div className="gr-card gr-card-flush">
        <Row icon={<Users size={18} />} chip="neutral" title="M. Ferrand" meta="Le Palais Gallien, chambre 214" />
        <Row icon={<CreditCard size={18} />} title="Commission plateforme" meta="15 % de la course" value="5,70 €" />
      </div>
      <div className="gr-card">
        <Route from="Le Palais Gallien" fromMeta="Départ 11:21" to="Aéroport de Mérignac" toMeta="Arrivée 11:43, 14 km" />
      </div>
      <div className="gr-spacer" />
      <Button tone="blue"><CreditCard size={17} /> Paiement encaissé</Button>
      <p className="gr-legal">Encaissez sur votre terminal, puis validez ici.</p>
    </div>
  )
}

/* ───────────── Etablissement ───────────── */

function PartnerLoginScreen() {
  return (
    <div className="gr-content">
      <TopBar back title="Votre établissement" />
      <h1 className="gr-title">Connectez la tablette de la réception.</h1>
      <Field label="Nom de l'établissement" value="Hôtel Le Palais Gallien" />
      <Field label="Adresse" value="6 rue Abbé de l'Épée, Bordeaux" />
      <Field label="Email de la réception" value="reception@palaisgallien.fr" />
      <Field label="Mot de passe" value="••••••••••" />
      <div className="gr-spacer" />
      <Button>Se connecter <ArrowRight size={17} /></Button>
      <p className="gr-legal">La session reste ouverte sur la tablette du comptoir.</p>
    </div>
  )
}

function OrderScreen() {
  return (
    <div className="gr-content">
      <TopBar back title="Commander une voiture" />
      <Field label="Destination" value="Aéroport de Méri|" typing />
      <div className="gr-suggest">
        <Row icon={<MapPin size={18} />} chip="neutral" title="Aéroport de Bordeaux Mérignac" meta="Terminal B, 33700 Mérignac" />
      </div>
      <div className="gr-duo">
        <div><span>Passagers</span><strong>2</strong></div>
        <div><span>Bagages</span><strong>3</strong></div>
      </div>
      <Hero label="Prix de la course" value="38 €" meta="Ferme, quel que soit le trafic" />
      <div className="gr-card">
        <Row icon={<CarFront size={18} />} chip="green" title="4 chauffeurs disponibles" meta="Le plus proche à 4 minutes" />
      </div>
      <div className="gr-spacer" />
      <Button>Confirmer la course <Check size={17} /></Button>
    </div>
  )
}

function TrackingScreen() {
  return (
    <div className="gr-content">
      <div className="gr-map">
        <MapView />
        <span className="gr-map-eta"><Clock3 size={12} />Marc arrive dans 4 min</span>
      </div>
      <div className="gr-card">
        <div className="gr-driver">
          <img src={FACE.marc} alt="" />
          <div>
            <strong>Marc D.</strong>
            <small>Mercedes Classe E, noire</small>
            <span className="gr-plate">GA-418-RT</span>
          </div>
          <IconBtn><Phone size={16} /></IconBtn>
        </div>
      </div>
      <div className="gr-card gr-card-flush">
        <Row icon={<MapPin size={18} />} title="Vers l'aéroport de Mérignac" meta="Course de M. Ferrand" value="38 €" />
        <Row icon={<Flag size={18} />} chip="neutral" title="Signaler un problème" meta="Transmis à l&apos;administrateur" />
      </div>
      <div className="gr-spacer" />
      <Button tone="light">Annuler la course</Button>
    </div>
  )
}

/* ───────────── Administration ───────────── */

function AdminScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Gestion" action={<IconBtn><ShieldCheck size={17} /></IconBtn>} />
      <Hero label="Commissions du mois" value="2 840 €" meta="412 courses, 15 % de commission" />
      <div className="gr-duo">
        <div><span>Chauffeurs</span><strong>18</strong></div>
        <div><span>Établissements</span><strong>7</strong></div>
      </div>
      <p className="gr-label">À vérifier</p>
      <div className="gr-card gr-card-flush">
        <Row icon={<BadgeCheck size={18} />} title="Julien Meyer" meta="Carte VTC illisible" tag={<Tag tone="wine">Bloqué</Tag>} />
        <Row icon={<ShieldCheck size={18} />} chip="neutral" title="Karim Belhadj" meta="Assurance expire dans 21 jours" tag={<Tag>Alerte</Tag>} />
      </div>
      <div className="gr-spacer" />
      <Button tone="light">Voir tous les chauffeurs <ChevronRight size={16} /></Button>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Chauffeur ou établissement', screen: <OnboardingScreen /> },
  { id: 'verification', title: 'Vérification du chauffeur', subtitle: 'Automatique, à toute heure', screen: <VerificationScreen /> },
  { id: 'driver-home', title: 'Accueil chauffeur', subtitle: 'Disponibilité, gains et commission', screen: <DriverHomeScreen /> },
  { id: 'offer', title: 'Proposition de course', subtitle: 'Le gain net avant d’accepter', screen: <OfferScreen /> },
  { id: 'waiting', title: 'Attente du client', subtitle: 'Appel direct de la réception', screen: <WaitingScreen /> },
  { id: 'drive', title: 'Course en cours', subtitle: 'Étapes du trajet, navigation dans Waze', screen: <DriveScreen /> },
  { id: 'arrival', title: 'Arrivée à destination', subtitle: 'Montant à encaisser et commission', screen: <ArrivalScreen /> },
  { id: 'partner-login', title: 'Connexion de l’établissement', subtitle: 'Sur la tablette de la réception', screen: <PartnerLoginScreen /> },
  { id: 'order', title: 'Commander une voiture', subtitle: 'Le prix avant de confirmer', screen: <OrderScreen /> },
  { id: 'tracking', title: 'Suivi de la course', subtitle: 'Le trajet et la voiture en direct', screen: <TrackingScreen /> },
  { id: 'admin', title: 'Espace d’administration', subtitle: 'Chauffeurs, commissions et alertes', screen: <AdminScreen /> },
]

export default function GuestRideMockupsPage() {
  return (
    <main className="guestride-mockups-page">
      <section className="gr-landing-hero">
        <div>
          <p className="gr-eyebrow">Proposition d&apos;accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="gr-reference">GuestRide · MOB-2026-guestride</p>
          <p className="gr-disclaimer">
            Aperçu rapide pour visualiser l&apos;idée — toutes les pages ne sont pas illustrées
            et le design n&apos;est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="gr-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="gr-mockup-card">
            <div className="gr-card-head">
              <h2>{mockup.title}</h2>
              <p>{mockup.subtitle}</p>
            </div>
            <div className="gr-export-wrap"><PhoneFrame>{mockup.screen}</PhoneFrame></div>
          </article>
        ))}
      </section>
    </main>
  )
}
