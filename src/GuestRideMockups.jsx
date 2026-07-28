import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  Car,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import './guestride-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// Photos fixes et deterministes (cf. guide creation-maquette).
// Une connexion internet est necessaire pour les afficher.
const FACE = {
  marc: 'https://i.pravatar.cc/96?img=52',
}

const PHOTO = {
  cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
  map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80',
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

/* ───────────── Composants partages ───────────── */

function Mark({ large = false }) {
  return <span className={`gr-mark${large ? ' gr-mark-lg' : ''}`}><CarFront size={large ? 28 : 21} /></span>
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
      {back ? <IconBtn><ChevronRight className="gr-back" size={17} /></IconBtn> : <span className="gr-topbar-ghost" />}
      <strong>{title}</strong>
      {action || <span className="gr-topbar-ghost" />}
    </div>
  )
}

function Tag({ tone = 'neutral', children }) {
  return <span className={`gr-tag${tone === 'neutral' ? '' : ` gr-tag-${tone}`}`}>{children}</span>
}

function Row({ title, meta, value, valueTone, tag }) {
  return (
    <div className="gr-row">
      <div>
        <strong>{title}</strong>
        {meta && <small>{meta}</small>}
      </div>
      {value && <span className={`gr-row-value${valueTone ? ` gr-row-value-${valueTone}` : ''}`}>{value}</span>}
      {tag}
    </div>
  )
}

function Field({ label, value, empty = false }) {
  return (
    <div className={`gr-field${empty ? ' gr-field-empty' : ''}`}>
      <span className="gr-label">{label}</span>
      <div>{value}</div>
    </div>
  )
}

function Route({ from, fromMeta, to, toMeta }) {
  return (
    <div className="gr-route">
      <div className="gr-route-step"><i /><div><strong>{from}</strong><small>{fromMeta}</small></div></div>
      <div className="gr-route-link" />
      <div className="gr-route-step gr-route-step-end"><i /><div><strong>{to}</strong><small>{toMeta}</small></div></div>
    </div>
  )
}

function Step({ done, title, meta, tag }) {
  return (
    <div className="gr-step">
      <span className={`gr-step-ico${done ? '' : ' gr-step-ico-wait'}`}>{done ? <Check size={14} /> : <Clock3 size={13} />}</span>
      <div><strong>{title}</strong>{meta && <small>{meta}</small>}</div>
      {tag}
    </div>
  )
}

function QrMini() {
  const cells = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1]
  return <span className="gr-qr"><span className="gr-qr-grid">{cells.map((c, i) => <i key={i} className={c ? 'on' : ''} />)}</span></span>
}

/* ───────────── Ecrans chauffeur ───────────── */

function OnboardingScreen() {
  return (
    <div className="gr-content">
      <div className="gr-cover">
        <img src={PHOTO.cover} alt="" />
        <span className="gr-cover-mark"><Mark large /></span>
      </div>
      <div>
        <p className="gr-label">GUESTRIDE</p>
        <h1 className="gr-title">La voiture arrive, le prix est connu.</h1>
      </div>
      <p className="gr-sub">Les hôtels commandent, les chauffeurs conduisent. Sur Bordeaux.</p>
      <div className="gr-roles">
        <div className="gr-role gr-role-on"><CarFront size={22} /><strong>Chauffeur</strong></div>
        <div className="gr-role"><Building2 size={22} /><strong>Établissement</strong></div>
      </div>
      <div className="gr-spacer" />
      <Button>Créer mon compte <ArrowRight size={17} /></Button>
      <Button tone="light">J&apos;ai déjà un compte</Button>
      <p className="gr-legal">Connexion par email et mot de passe.</p>
    </div>
  )
}

function VerificationScreen() {
  return (
    <div className="gr-content">
      <TopBar back title="Vérification" />
      <div>
        <h1 className="gr-title">Votre dossier est vérifié automatiquement.</h1>
      </div>
      <div className="gr-card">
        <div className="gr-steps">
          <Step done title="Identité confirmée" meta="Pièce d'identité et selfie" tag={<Tag tone="green">Validé</Tag>} />
          <Step done title="Entreprise active" meta="SIRET vérifié auprès de l'INSEE" tag={<Tag tone="green">Validé</Tag>} />
          <Step done title="Carte VTC au bon nom" meta="Correspond à votre identité" tag={<Tag tone="green">Validé</Tag>} />
          <Step title="Assurance" meta="Lecture du document en cours" tag={<Tag>···</Tag>} />
        </div>
      </div>
      <div className="gr-banner">
        <strong>Compte activé en 1 min 48</strong>
        <small>Vous pouvez recevoir des courses dès maintenant, à toute heure.</small>
      </div>
      <div className="gr-card gr-card-tight">
        <Row title="Mercedes Classe E, noire" meta="GA-418-RT, 4 places" tag={<Tag>Véhicule</Tag>} />
        <Row title="Bordeaux Métropole" meta="Secteur des courses proposées" tag={<Tag>Zone</Tag>} />
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
      <div className="gr-duo">
        <div><span>Gains du jour</span><strong>184 €</strong></div>
        <div className="gr-duo-wine"><span>Commission due</span><strong>127 €</strong></div>
      </div>
      <div className="gr-card">
        <Row title="Vous êtes disponible" meta="Bordeaux Métropole" tag={<Tag tone="green">En ligne</Tag>} />
      </div>
      <p className="gr-label">Courses du jour</p>
      <div className="gr-card gr-card-tight">
        <Row title="Le Palais Gallien" meta="Aéroport Mérignac, 11:20" value="38 €" />
        <Row title="Villa Royale" meta="Gare Saint-Jean, 09:45" value="24 €" />
        <Row title="Hôtel des Quinconces" meta="Saint-Émilion, 08:10" value="72 €" />
      </div>
      <div className="gr-spacer" />
      <div className="gr-card">
        <Row title="Facture de juillet" meta="À régler avant le 15 août" value="127 €" valueTone="green" />
      </div>
    </div>
  )
}

function OfferScreen() {
  return (
    <div className="gr-content">
      <TopBar title="Nouvelle course" action={<Tag tone="wine">24 s</Tag>} />
      <div className="gr-hero-figure gr-hero-figure-green">
        <span>Votre gain net</span>
        <strong>32,30 €</strong>
        <small>38 € de course, commission déduite</small>
      </div>
      <div className="gr-card">
        <Route
          from="Le Palais Gallien"
          fromMeta="À 4 minutes de vous"
          to="Aéroport de Mérignac"
          toMeta="14 km, environ 22 minutes"
        />
      </div>
      <div className="gr-card">
        <Row title="M. Ferrand, chambre 214" meta="2 passagers, 3 bagages" tag={<Tag>11:20</Tag>} />
      </div>
      <div className="gr-spacer" />
      <Button tone="green">Accepter <Check size={17} /></Button>
      <Button tone="light">Refuser</Button>
    </div>
  )
}

function DriveScreen() {
  return (
    <div className="gr-content gr-dark-screen">
      <TopBar title="Course en cours" action={<IconBtn><Phone size={16} /></IconBtn>} />
      <div className="gr-card">
        <Route
          from="Le Palais Gallien"
          fromMeta="Client à bord"
          to="Aéroport de Mérignac"
          toMeta="Arrivée estimée 11:42"
        />
      </div>
      <Button tone="light">Ouvrir dans Waze <Navigation size={16} /></Button>
      <p className="gr-label">Étapes</p>
      <div className="gr-card">
        <div className="gr-steps">
          <Step done title="Arrivé à l'hôtel" tag={<Tag>11:18</Tag>} />
          <Step done title="Course démarrée" tag={<Tag>11:21</Tag>} />
          <Step title="Arrivée à destination" tag={<Tag>18 min</Tag>} />
        </div>
      </div>
      <div className="gr-card">
        <Row title="M. Ferrand, chambre 214" meta="2 passagers, 3 bagages" tag={<Tag>38 €</Tag>} />
      </div>
      <div className="gr-spacer" />
      <p className="gr-legal">Le montant à encaisser s&apos;affiche une fois à destination.</p>
    </div>
  )
}

function ArrivalScreen() {
  return (
    <div className="gr-content gr-dark-screen">
      <TopBar title="Arrivé à destination" />
      <div className="gr-hero-figure">
        <span>Montant à encaisser</span>
        <strong>38,00 €</strong>
        <small>Prix verrouillé à la réservation</small>
      </div>
      <div className="gr-card">
        <Row title="M. Ferrand" meta="Le Palais Gallien, chambre 214" tag={<Tag>14 km</Tag>} />
      </div>
      <div className="gr-card">
        <Row title="Commission plateforme" meta="15 % du montant de la course" value="5,70 €" />
      </div>
      <div className="gr-card">
        <Route
          from="Le Palais Gallien"
          fromMeta="Départ 11:21"
          to="Aéroport de Mérignac"
          toMeta="Arrivée 11:43"
        />
      </div>
      <div className="gr-spacer" />
      <Button tone="green">Paiement encaissé <Check size={17} /></Button>
      <p className="gr-legal">Encaissez sur votre terminal, puis validez ici.</p>
    </div>
  )
}

/* ───────────── Ecrans etablissement ───────────── */

function PartnerLoginScreen() {
  return (
    <div className="gr-content">
      <TopBar back title="Votre établissement" />
      <div>
        <h1 className="gr-title">Connectez la tablette de la réception.</h1>
      </div>
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
      <Field label="Destination" value="Aéroport de Bordeaux Mérignac" />
      <Field label="Client" value="M. Ferrand, chambre 214" />
      <div className="gr-duo">
        <div><span>Passagers</span><strong>2</strong></div>
        <div><span>Bagages</span><strong>3</strong></div>
      </div>
      <div className="gr-hero-figure">
        <span>Prix de la course</span>
        <strong>38 €</strong>
        <small>Ferme, quel que soit le trafic</small>
      </div>
      <div className="gr-card">
        <Row title="4 chauffeurs disponibles" meta="Le plus proche à 4 minutes" tag={<Tag tone="green">Prêt</Tag>} />
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
        <img src={PHOTO.map} alt="" />
        <span className="gr-map-eta"><Clock3 size={14} /> Marc arrive dans 4 min</span>
        <span className="gr-map-pin gr-map-pin-car"><CarFront size={17} /></span>
        <span className="gr-map-pin gr-map-pin-dest"><MapPin size={17} /></span>
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
      <div className="gr-card">
        <Row title="Course de M. Ferrand" meta="Vers l'aéroport de Mérignac" value="38 €" />
      </div>
      <div className="gr-card">
        <div className="gr-qr-line">
          <QrMini />
          <div><strong style={{ fontSize: 12, fontWeight: 700 }}>Suivi client</strong><small style={{ display: 'block', marginTop: 3, color: 'var(--gr-muted)', fontSize: 10 }}>Le client scanne et suit l&apos;arrivée sur son téléphone.</small></div>
        </div>
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
      <div className="gr-duo">
        <div><span>Chauffeurs actifs</span><strong>18</strong></div>
        <div><span>Établissements</span><strong>7</strong></div>
      </div>
      <div className="gr-hero-figure">
        <span>Commissions du mois</span>
        <strong>2 840 €</strong>
        <small>412 courses, 15 % de commission</small>
      </div>
      <div className="gr-alert">
        <BadgeCheck size={22} />
        <div><strong>2 dossiers à traiter</strong><small>Documents illisibles ou nom qui ne correspond pas</small></div>
      </div>
      <p className="gr-label">À vérifier</p>
      <div className="gr-card gr-card-tight">
        <Row title="Julien Meyer" meta="Carte VTC illisible" tag={<Tag tone="wine">Bloqué</Tag>} />
        <Row title="Karim Belhadj" meta="Assurance expire dans 21 jours" tag={<Tag>Alerte</Tag>} />
      </div>
      <div className="gr-spacer" />
      <Button tone="light">Voir tous les chauffeurs <Car size={16} /></Button>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Ouverture de l’application', subtitle: 'Chauffeur ou établissement', screen: <OnboardingScreen /> },
  { id: 'verification', title: 'Vérification du chauffeur', subtitle: 'Automatique, à toute heure', screen: <VerificationScreen /> },
  { id: 'driver-home', title: 'Accueil chauffeur', subtitle: 'Gains, commission et courses du jour', screen: <DriverHomeScreen /> },
  { id: 'offer', title: 'Proposition de course', subtitle: 'Le gain net avant d’accepter', screen: <OfferScreen /> },
  { id: 'drive', title: 'Course en cours', subtitle: 'Étapes du trajet, navigation dans Waze', screen: <DriveScreen /> },
  { id: 'arrival', title: 'Arrivée à destination', subtitle: 'Montant à encaisser et commission', screen: <ArrivalScreen /> },
  { id: 'partner-login', title: 'Connexion de l’établissement', subtitle: 'Sur la tablette de la réception', screen: <PartnerLoginScreen /> },
  { id: 'order', title: 'Commander une voiture', subtitle: 'Le prix avant de confirmer', screen: <OrderScreen /> },
  { id: 'tracking', title: 'Suivi de la course', subtitle: 'Où est le chauffeur, en direct', screen: <TrackingScreen /> },
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
