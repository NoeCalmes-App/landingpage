import { createContext, createElement, useContext, useState } from 'react'
import {
  ArrowLeft, ArrowRight, CalendarDays, Check, CheckCheck, ChevronDown,
  CircleCheck, Clock3, Compass, CreditCard, Menu, Music2, RotateCw, X,
  Film, Gift, Handshake, Instagram, Link2, LockKeyhole, Mail, MapPin,
  MessageCircle, Send, ShieldCheck, Store, Upload,
} from 'lucide-react'
import StatusBarIcons from './StatusBarIcons'
import './vietcollab-mockups.css'

// V1 commerciale : données fictives, aucun compte, paiement ou message réel.
// Français pour la présentation client ; produit prévu en anglais/vietnamien.
const FACE = { linh: 'https://i.pravatar.cc/96?img=47', minh: 'https://i.pravatar.cc/96?img=12' }
const PHOTO = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85',
  food: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=85',
  cafe: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=85',
}
const DemoContext = createContext(null)
const OFFERS = {
  restaurant: { name: 'Bếp & Basil', category: 'Restaurant', photo: PHOTO.restaurant, title: 'Une table pour deux. Votre regard en échange.', description: 'Cuisine vietnamienne contemporaine, dans une salle pleine de vie.', benefit: 'Le dîner, pour vous + 1 invité', details: '2 plats, 2 desserts et 2 boissons sans alcool. Alcool et suppléments non inclus.', slots: 'Du mardi au jeudi, le soir' },
  cafe: { name: 'Mây Coffee', category: 'Café', photo: PHOTO.cafe, title: 'Un brunch, une nouvelle histoire.', description: 'Une pause gourmande au cœur de Hô Chi Minh-Ville.', benefit: 'Un brunch pour 1 personne', details: '1 plat de brunch et 1 boisson chaude. Invité et suppléments non inclus.', slots: 'Du mardi au jeudi, le matin' },
}
function goTo(id) {
  document.getElementById(`vc-${id}`)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}

// Composants partagés : les tailles suivent exclusivement le rôle UX.
function UiButton({ children, tone = 'primary', goto, onClick, disabled = false, type = 'button' }) {
  return <button type={type} className={`vc-button vc-button-${tone}`} data-role="primary" disabled={disabled} onClick={onClick || (goto ? () => goTo(goto) : undefined)}>{children}</button>
}
function IconButton({ children, label, goto, onClick }) {
  return <button type="button" className="vc-icon-button" data-role="inline" aria-label={label} onClick={onClick || (goto ? () => goTo(goto) : undefined)}>{children}</button>
}
function Pill({ children, tone = 'green' }) { return <span className={`vc-pill vc-pill-${tone}`}><span>{children}</span></span> }
function Avatar({ person = 'linh' }) { return <img className="vc-avatar" src={FACE[person]} alt={person === 'linh' ? 'Portrait de démonstration de Linh' : 'Portrait de démonstration de Minh'} /> }
function Brand() { return <div className="vc-brand"><span className="vc-mark"><Handshake size={20} /></span><strong>vietcollab<span>.</span></strong></div> }
function TopBar({ title, back, merchant = false, publicPage = false }) {
  const [open, setOpen] = useState(false)
  const links = publicPage
    ? [['join', 'Accueil'], ['explore', 'Découvrir les commerces'], ['establishment', 'Je suis commerçant'], ['connect', 'Je suis créateur']]
    : merchant
    ? [['dashboard', 'Mon tableau de bord'], ['creator', 'Demande de Linh'], ['review', 'Contenu à examiner'], ['establishment', 'Mon établissement'], ['subscription', 'Mon abonnement']]
    : [['explore', 'Explorer les commerces'], ['agreement', 'Mon dossier illustré'], ['proof', 'Transmettre ma publication'], ['connect', 'Mon profil']]
  return <header className="vc-web-header" aria-label={title}>
    <Brand />
    <button type="button" className="vc-icon-button" data-role="inline" aria-label={open ? 'Fermer le menu du site' : 'Ouvrir le menu du site'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
    {open && <nav className="vc-web-menu" aria-label="Menu du site"><strong>{title}</strong>{back && <button type="button" data-role="inline" onClick={() => { setOpen(false); goTo(back) }}><ArrowLeft size={15} /> Revenir à la page précédente</button>}{links.map(([id, label]) => <button type="button" data-role="inline" key={id} onClick={() => { setOpen(false); goTo(id) }}>{label}<ArrowRight size={15} /></button>)}</nav>}
  </header>
}
function Heading({ eyebrow, title, children }) {
  return <header className="vc-heading">{eyebrow && <span className="vc-kicker">{eyebrow}</span>}<h3>{title}</h3>{children && <p>{children}</p>}</header>
}
function InfoCard({ title, children, icon: Icon = Clock3, tone = 'green' }) {
  return <div className={`vc-info vc-info-${tone}`}>{createElement(Icon, { size: 18 })}<div><strong>{title}</strong><p>{children}</p></div></div>
}
function ListRow({ icon: Icon, title, meta, trailing }) {
  return <div className="vc-list-row"><span className="vc-list-icon">{createElement(Icon, { size: 18 })}</span><div><strong>{title}</strong><small>{meta}</small></div>{trailing}</div>
}
function Field({ label, value, multiline = false, ...inputProps }) {
  return <label className="vc-field"><span>{label}</span>{multiline ? <textarea defaultValue={value} rows={3} {...inputProps} /> : <input defaultValue={value} {...inputProps} />}</label>
}
function SocialAccounts() {
  return <div className="vc-panel vc-social-accounts">
    <div className="vc-social-account"><Instagram size={19} /><div><strong>Instagram</strong><small>@linh.eats.saigon</small></div><div className="vc-follower-count"><strong>18 400</strong><small>abonnés</small></div></div>
    <div className="vc-social-account"><Music2 size={19} /><div><strong>TikTok</strong><small>@linh.eats</small></div><div className="vc-follower-count"><strong>32 600</strong><small>abonnés</small></div></div>
    <p className="vc-social-sync"><CircleCheck size={13} /> Comptes connectés · synchro du 18 sept.</p>
  </div>
}
function Screen({ children, className = '' }) {
  return <div className={`vc-content ${className}`}>{children}</div>
}
function PhoneFrame({ children, scrollable }) {
  return <div className={`vc-phone-export${scrollable ? ' vc-phone-long' : ''}`}><div className="vc-phone"><div className="vc-screen"><div className="vc-statusbar"><span>9:41</span><div><StatusBarIcons /></div></div>{children}<div className="vc-browser-chrome" aria-label="Barre d’adresse du navigateur, distincte du site"><div className="vc-browser"><span className="vc-browser-aa">aA</span><LockKeyhole size={11} /><span>vietcollab.example</span><RotateCw size={13} /></div></div><div className="vc-home-indicator" /></div></div></div>
}
function RestaurantCard({ cafe = false }) {
  const { setOfferKey } = useContext(DemoContext)
  return <article className="vc-place-card"><div className="vc-place-image"><img src={cafe ? PHOTO.cafe : PHOTO.restaurant} alt={cafe ? 'Intérieur de café, photo illustrative' : 'Salle de restaurant, photo illustrative'} /><Pill tone="cream">{cafe ? 'Café' : 'Restaurant'}</Pill></div><div className="vc-place-copy"><div className="vc-split"><h4>{cafe ? 'Mây Coffee' : 'Bếp & Basil'}</h4><IconButton label="Voir l'offre de démonstration" onClick={() => { setOfferKey(cafe ? 'cafe' : 'restaurant'); goTo('offer') }}><ArrowRight size={17} /></IconButton></div><small><MapPin size={12} /> Hô Chi Minh-Ville</small><p><Gift size={15} />{cafe ? 'Brunch pour 1 personne' : 'Dîner pour 2 personnes'}</p><span className="vc-meta">En échange d’un Reel Instagram</span></div></article>
}

// 01–04 : l'influenceur initie la rencontre.
function JoinScreen() {
  const [role, setRole] = useState('creator')
  return <Screen className="vc-join">
    <TopBar title="Bienvenue sur VietCollab" publicPage />
    <div className="vc-join-photo"><img src={PHOTO.restaurant} alt="Un restaurant accueillant" /><span className="vc-photo-label">LOCAL PLACES. REAL STORIES.</span><div className="vc-overlap-mark"><Handshake size={26} /></div></div>
    <Heading eyebrow="COMMERCES & CRÉATEURS AU VIETNAM" title="De bonnes adresses. De belles histoires.">Une expérience offerte. Un contenu authentique. Des conditions claires, ensemble.</Heading>
    <div className="vc-segment">{[['creator', 'Je crée du contenu'], ['merchant', 'J’ai un commerce']].map(([id, label]) => <button type="button" key={id} data-role="compact" aria-pressed={role === id} onClick={() => setRole(id)}>{label}</button>)}</div>
    <UiButton goto={role === 'creator' ? 'explore' : 'establishment'}>{role === 'creator' ? 'Rejoindre les créateurs' : 'Présenter mon commerce'}<ArrowRight size={17} /></UiButton>
    <p className="vc-fine">Depuis votre navigateur, sans application à télécharger.</p>
    <section className="vc-landing-section"><Heading eyebrow="COMMENT ÇA MARCHE" title="Une rencontre. Trois étapes." /><div className="vc-panel"><ListRow icon={Compass} title="1. Trouvez le bon lieu" meta="Des expériences dans votre ville, avec les conditions affichées." /><ListRow icon={Handshake} title="2. Mettez-vous d’accord" meta="Le commerce choisit le créateur. Vous confirmez la date et les engagements." /><ListRow icon={Film} title="3. Créez, puis partagez" meta="Après la visite, la vidéo est validée avant sa publication." /></div></section>
    <section className="vc-landing-section"><Heading eyebrow="DEUX PROFILS, UN MÊME ESPACE" title="À chacun sa bonne rencontre." /><InfoCard icon={Store} title="Vous avez un commerce ?">Présentez ce que vous offrez, choisissez vos créateurs et retrouvez les contenus dans vos dossiers.</InfoCard><InfoCard icon={Instagram} title="Vous créez du contenu ?">Découvrez les offres, puis connectez le réseau concerné pour candidater. L’accès créateur est gratuit.</InfoCard></section>
    <section className="vc-landing-section vc-landing-signup"><Heading title="Votre prochaine histoire commence ici." /><UiButton goto={role === 'creator' ? 'explore' : 'establishment'}>Continuer avec Google <ArrowRight size={17} /></UiButton><UiButton tone="secondary" goto={role === 'creator' ? 'explore' : 'establishment'}><Mail size={17} /> S’inscrire avec son e-mail</UiButton><p className="vc-fine">Aperçu de l’inscription. L’acceptation des CGU et de la confidentialité précède la création du compte.</p></section>
    <div className="vc-site-footer"><Brand /><p>De vraies rencontres, des engagements clairs.</p><span>VietCollab · Vietnam</span></div>
  </Screen>
}
function ConnectScreen() {
  const { instagram, setInstagram, tiktok, setTiktok, resumeApplication } = useContext(DemoContext)
  const [accountType, setAccountType] = useState('creator')
  return <Screen>
    <TopBar title="Mon profil créateur" back="join" />
    <Heading title="Votre profil, à votre rythme.">Découvrez les offres maintenant. Connectez le réseau concerné avant votre première candidature.</Heading>
    <div className="vc-profile-line"><Avatar /><div><strong>Linh Nguyễn</strong><small>Food & bonnes adresses</small></div><Pill>Créateur</Pill></div>
    <Field label="Ma ville" value="Hô Chi Minh-Ville" />
    <p className="vc-fine">En voyage ? Une ville temporaire et ses dates peuvent compléter votre profil.</p>
    <section className="vc-social-connect" aria-label="Connexion Instagram">
      <ListRow icon={Instagram} title="Instagram" meta={instagram ? '@linh.eats.saigon · 18 400 abonnés' : 'Compte non connecté'} trailing={<Pill tone={instagram ? 'green' : 'amber'}>{instagram ? 'Connecté' : 'À relier'}</Pill>} />
      {instagram ? <><p className="vc-fine">Chiffre de démonstration · relevé le 18 septembre.</p><UiButton tone="secondary" onClick={() => setInstagram(false)}>Déconnecter Instagram</UiButton></> : <>
        <label className="vc-field"><span>Type de compte Instagram</span><select value={accountType} onChange={e => setAccountType(e.target.value)}><option value="creator">Créateur ou Business</option><option value="personal">Personnel</option></select></label>
        {accountType === 'personal' && <InfoCard icon={Instagram} title="Un compte personnel ?">Dans Instagram : profil → menu → type de compte et outils → passer à un compte professionnel → Créateur. Le profil devient public. Revenez ici après le changement.</InfoCard>}
        <UiButton onClick={() => setInstagram(true)}>{accountType === 'personal' ? 'J’ai changé de type · connecter' : 'Connecter Instagram'}<ArrowRight size={16} /></UiButton>
        <p className="vc-fine">Connexion simulée. Dans le produit, Instagram vérifie le type du compte et demande votre autorisation ; votre mot de passe ne nous est jamais transmis.</p>
      </>}
    </section>
    <section className="vc-social-connect" aria-label="Connexion TikTok">
      <ListRow icon={Music2} title="TikTok" meta={tiktok ? '@linh.eats · 32 600 abonnés' : 'Aucun passage en Business demandé'} trailing={<Pill tone={tiktok ? 'green' : 'amber'}>{tiktok ? 'Connecté' : 'À relier'}</Pill>} />
      <UiButton tone="secondary" onClick={() => setTiktok(!tiktok)}>{tiktok ? 'Déconnecter TikTok' : 'Connecter TikTok'}</UiButton>
      <p className="vc-fine">Simulation. TikTok connecté ne valide pas votre compte Instagram.</p>
    </section>
    <InfoCard icon={ShieldCheck} title="Compte connecté, pas audience certifiée">Abonnés récupérés selon les autorisations. Actualisation tentée chaque jour ; dernière date conservée ou donnée indiquée indisponible.</InfoCard>
    <div className="vc-bottom">
      {resumeApplication && <UiButton goto="offer">Revenir à ma candidature <ArrowRight size={17} /></UiButton>}
      <UiButton tone={resumeApplication ? 'secondary' : 'primary'} goto="explore">Découvrir sans connecter de réseau</UiButton>
      <p className="vc-fine">Un compte Instagram personnel peut explorer les offres, mais pas candidater sur Instagram sans conversion et connexion.</p>
    </div>
  </Screen>
}
function ExploreScreen() {
  const [category, setCategory] = useState('Tout')
  return <Screen><TopBar title="Bonjour, Linh" /><Heading eyebrow="VOTRE PROCHAINE HISTOIRE" title="À découvrir, ici.">Des lieux qui aiment votre regard.</Heading><div className="vc-location"><MapPin size={17} /><strong>Hô Chi Minh-Ville</strong><span>Ma ville</span></div><div className="vc-chips">{['Tout', 'Restaurants', 'Cafés'].map(x => <button type="button" key={x} data-role="compact" aria-pressed={category === x} onClick={() => setCategory(x)}>{x}</button>)}</div><RestaurantCard cafe={category === 'Cafés'} /><div className="vc-panel"><ListRow icon={Gift} title={category === 'Cafés' ? 'Des rencontres autour d’un café' : 'Des tables à découvrir'} meta="Une expérience offerte contre votre contenu" /></div><p className="vc-fine">Les conditions sont visibles avant toute demande. Aucun paiement pour les créateurs.</p></Screen>
}
function OfferScreen() {
  const { offerKey, instagram, setResumeApplication } = useContext(DemoContext)
  const offer = OFFERS[offerKey]
  const [applying, setApplying] = useState(false)
  const [sent, setSent] = useState(false)
  return <Screen><TopBar title="L’expérience" back="explore" />
    <div className="vc-cover"><img src={offer.photo} alt={`Ambiance de ${offer.name}, illustration`} /><Pill tone="cream">{offer.category} · Hô Chi Minh-Ville</Pill></div>
    <Heading eyebrow={offer.name} title={offer.title}>{offer.description}</Heading>
    <div className="vc-offer-box"><span className="vc-kicker">CE QUI EST OFFERT</span><h4>{offer.benefit}</h4><p>{offer.details}</p></div>
    <div className="vc-panel"><ListRow icon={Film} title="1 Reel Instagram" meta="30 à 60 secondes · nom du lieu dans la vidéo" /><ListRow icon={CalendarDays} title={offer.slots} meta="Date et heure à convenir ensemble" /><ListRow icon={CheckCheck} title="Vidéo à valider avant publication" meta="1 retour de correction prévu" /></div>
    <InfoCard title="Un accord avant de venir" icon={Handshake}>La visite est confirmée après accord des deux participants sur les mêmes conditions. Une candidature ne réserve pas la visite.</InfoCard>
    {sent ? <InfoCard title="Demande envoyée · démonstration" icon={Check}>{offer.name} reçoit un e-mail. Vous serez prévenue de sa réponse. Aucun envoi réel ici.</InfoCard> : applying ? <form className="vc-application" onSubmit={e => { e.preventDefault(); if (instagram) { setSent(true); setResumeApplication(false) } }}>
      <Heading title="Votre candidature" />
      <Field label="Réseau demandé" value="Instagram · 1 Reel" readOnly />
      <Field label="Date et heure proposées · Vietnam" name="date" type="datetime-local" value={offerKey === 'cafe' ? '2026-09-24T10:00' : '2026-09-24T19:00'} required />
      <Field label="Votre message" name="message" value={`Bonjour, j’aimerais faire découvrir ${offer.name} à ma communauté.`} multiline maxLength={2000} required />
      <label className="vc-checkbox"><input type="checkbox" required /><span>Je suis disponible à cette date et j’ai lu les conditions.</span></label>
      {instagram ? <InfoCard icon={Instagram} title="Compte utilisé : @linh.eats.saigon">Instagram connecté dans cette démonstration. L’envoi concerne ce compte, pas votre TikTok.</InfoCard> : <><InfoCard icon={Instagram} title="Connectez Instagram pour candidater">Vos informations restent ici pendant la connexion. Un compte TikTok seul ne suffit pas pour cette offre.</InfoCard><UiButton onClick={() => { setResumeApplication(true); goTo('connect') }}>Connecter mon compte Instagram</UiButton></>}
      <UiButton type="submit" disabled={!instagram}>Envoyer ma candidature <Send size={17} /></UiButton>
    </form> : <UiButton onClick={() => setApplying(true)}>Proposer une collaboration <ArrowRight size={17} /></UiButton>}
    <p className="vc-fine">{sent ? '1 demande en attente' : '5 demandes en attente maximum'} · 2 collaborations confirmées en cours maximum. Aucun engagement avant l’accord réciproque.</p>
  </Screen>
}

// 05–08 : le commerçant prépare son offre et choisit un créateur.
function EstablishmentScreen() {
  return <Screen><TopBar title="Mon établissement" merchant back="join" /><Heading eyebrow="PRÉPARER MON OFFRE" title="Votre lieu, votre offre.">Les créateurs consultent votre offre avant de postuler.</Heading><Pill tone="amber">Fiche en préparation</Pill><Field label="Nom de l’établissement" value="Bếp & Basil" /><Field label="Ville" value="Hô Chi Minh-Ville" /><Field label="Votre expérience offerte" value="2 plats + 2 desserts + 2 boissons sans alcool. Pour 2 personnes. Hors suppléments." multiline /><div className="vc-panel"><ListRow icon={Film} title="Le contenu demandé" meta="1 Reel Instagram · 30 à 60 secondes" /><ListRow icon={Store} title="Plusieurs commerces ?" meta="Une offre et un abonnement par établissement." /></div><div className="vc-bottom"><UiButton goto="subscription">Enregistrer et continuer <ArrowRight size={17} /></UiButton></div></Screen>
}
function SubscriptionScreen() {
  return <Screen><TopBar title="Activer mon établissement" merchant back="establishment" /><Heading eyebrow="ABONNEMENT COMMERÇANT" title="Invitez de nouveaux regards.">Bếp & Basil · Hô Chi Minh-Ville</Heading><div className="vc-plan"><Pill tone="cream">Une offre par établissement</Pill><div className="vc-price">Tarif à définir <span>/ mois · USD</span></div><p>Durée d’essai à définir avant le lancement.</p></div><div className="vc-panel"><ListRow icon={Check} title="Vos collaborations au même endroit" meta="Demandes, accords, vidéos et rappels" /><ListRow icon={CreditCard} title="Carte enregistrée via Stripe" meta="Montant et date du premier paiement avant confirmation" /></div><InfoCard icon={ShieldCheck} title="Vous gardez la main">Renouvellement annulable dans le compte. Les dossiers confirmés restent accessibles.</InfoCard><div className="vc-bottom"><UiButton goto="dashboard">Aperçu de l’espace activé <ArrowRight size={17} /></UiButton><p className="vc-fine">Aucun paiement réel dans cette maquette.</p></div></Screen>
}
function DashboardScreen() {
  return <Screen><TopBar title="Bonjour, Minh" merchant /><div className="vc-establishment-select"><Store size={17} /><div><strong>Bếp & Basil</strong><small>Mon établissement actif</small></div><ChevronDown size={16} /></div><div className="vc-dashboard-hero"><span className="vc-kicker">À VOUS DE CHOISIR</span><h3>Votre prochaine rencontre.</h3><p>Linh souhaite découvrir votre table.</p><UiButton tone="white" goto="creator">Voir sa demande <ArrowRight size={17} /></UiButton></div><div className="vc-stats"><div><strong>1</strong><span>demande reçue</span></div><div><strong>0</strong><span>vidéo publiée</span></div></div><div className="vc-panel"><ListRow icon={Handshake} title="Linh Nguyễn · Instagram" meta="18 400 abonnés · Food" trailing={<Avatar />} /></div><InfoCard icon={Mail} title="Pas besoin de rester connecté">Demande, accord, vidéo : un e-mail vous prévient.</InfoCard></Screen>
}
function CreatorScreen() {
  return <Screen><TopBar title="La demande de Linh" merchant back="dashboard" /><div className="vc-creator-hero"><Avatar /><Pill>Instagram + TikTok connectés</Pill><h3>Linh Nguyễn</h3><p>@linh.eats.saigon</p><small><MapPin size={13} /> Hô Chi Minh-Ville</small></div><SocialAccounts /><div className="vc-chips"><Pill tone="cream">Food</Pill><Pill tone="cream">VN · EN</Pill></div><div className="vc-quote"><p>« J’aimerais faire découvrir votre cuisine. Disponible jeudi 24, en soirée. »</p></div><InfoCard icon={ShieldCheck} title="Données du réseau">Abonnés issus des comptes connectés, pas saisis à la main. Audience non certifiée.</InfoCard><div className="vc-bottom"><UiButton goto="agreement">Proposer les conditions <ArrowRight size={17} /></UiButton></div></Screen>
}

// 09–12 : un même dossier, une prochaine action toujours explicite.
function AgreementScreen() {
  const [accepted, setAccepted] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  return <Screen><TopBar title="Linh × Bếp & Basil" back="creator" /><Pill tone={accepted ? 'green' : 'amber'}>{accepted ? 'Accord confirmé' : 'À accepter par Linh'}</Pill><Heading title="Tout est clair avant la visite.">Conditions proposées par Minh · version 1</Heading><div className="vc-panel"><ListRow icon={CalendarDays} title="Jeudi 24 septembre · 19 h" meta="Heure locale du Vietnam" /><ListRow icon={Gift} title="Un dîner pour 2 personnes" meta="2 plats, 2 desserts, 2 boissons sans alcool" /><ListRow icon={Film} title="1 Reel de 30 à 60 secondes" meta="Brouillon avant le 1er octobre · 1 correction" /><ListRow icon={Instagram} title="Publication le 5 octobre" meta="Après validation · partenariat et nom du restaurant à mentionner" /></div><p className="vc-fine">Hors alcool et suppléments. Pas de réutilisation publicitaire incluse. Tout changement demande un nouvel accord des deux parties.</p><InfoCard title={accepted ? 'À faire ensuite · la visite' : 'À faire maintenant · Linh'} icon={accepted ? CircleCheck : Handshake}>{accepted ? 'Rendez-vous le 24 septembre. Après le repas, chacun confirme que la visite a eu lieu.' : 'Accepter cette version des conditions. Le restaurant a déjà donné son accord.'}</InfoCard><UiButton onClick={() => setAccepted(true)} disabled={accepted}>{accepted ? <><CheckCheck size={18} /> Conditions acceptées</> : <>Accepter ces conditions <Check size={18} /></>}</UiButton><div className="vc-section-head"><h4>La discussion du dossier</h4><MessageCircle size={17} /></div><div className="vc-message"><strong>Minh · Bếp & Basil</strong><p>Bonjour Linh, je vous propose une table pour deux jeudi. Confirmez les conditions pour réserver la visite.</p><small>18 sept. · 10:24</small></div>{messages.map((text, i) => <div className="vc-message vc-message-own" key={i}><strong>Vous · démonstration</strong><p>{text}</p></div>)}<form className="vc-composer" onSubmit={e => { e.preventDefault(); if (message.trim()) { setMessages([...messages, message.trim()]); setMessage('') } }}><input aria-label="Écrire un message de démonstration" placeholder="Votre message…" maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} /><IconButton label="Ajouter le message à la maquette" onClick={() => { if (message.trim()) { setMessages([...messages, message.trim()]); setMessage('') } }}><Send size={17} /></IconButton></form><p className="vc-fine">Réponses et rappels par e-mail, avec un lien direct vers ce dossier.</p></Screen>
}
function UploadScreen() {
  const [sent, setSent] = useState(false)
  return <Screen><TopBar title="Mon contenu" back="agreement" /><Pill>Visite confirmée par les deux</Pill><Heading eyebrow="LINH × BẾP & BASIL" title="Votre brouillon.">Après la visite du 24 septembre.</Heading><div className="vc-video"><img src={PHOTO.food} alt="Repas illustrant le brouillon de la vidéo" /><span className="vc-video-label"><Film size={17} /> Aperçu du brouillon · 00:42</span></div><div className="vc-panel"><ListRow icon={Upload} title="bep-basil-reel-v1.mp4" meta="42 secondes · 86 Mo · version 1 sur 2" /><ListRow icon={LockKeyhole} title="Vidéo privée" meta="Participants ; équipe uniquement en cas d’intervention justifiée" /></div><InfoCard title={sent ? 'Brouillon transmis · démonstration' : 'Prochaine action · Linh'} icon={sent ? Mail : Clock3}>{sent ? 'Minh reçoit un e-mail pour valider ou demander une correction.' : 'À envoyer avant le 1er octobre. Attendre la validation pour publier.'}</InfoCard><div className="vc-bottom"><UiButton disabled={sent} onClick={() => setSent(true)}>{sent ? <><Check size={17} /> Envoyé pour validation</> : <>Envoyer pour validation <Send size={17} /></>}</UiButton><p className="vc-fine">MP4 H.264 / AAC · 250 Mo max. Fichier de démonstration.</p></div></Screen>
}
function ReviewScreen() {
  const [decision, setDecision] = useState('pending')
  return <Screen><TopBar title="Valider le contenu" merchant back="dashboard" /><Pill tone={decision === 'approved' ? 'green' : 'amber'}>{decision === 'approved' ? 'Contenu validé' : decision === 'correction' ? 'Correction à préciser' : decision === 'requested' ? 'Correction demandée' : 'Votre réponse est attendue'}</Pill><Heading title="La vidéo de Linh.">Version 1 · reçue le 1er octobre</Heading><div className="vc-video"><img src={PHOTO.food} alt="Aperçu illustratif du contenu proposé" /><span className="vc-video-label"><Film size={17} /> Reel Instagram · 00:42</span></div><div className="vc-panel"><ListRow icon={Check} title="Un Reel pour votre restaurant" meta="Format convenu : 30 à 60 secondes" /><ListRow icon={CalendarDays} title="Publication prévue le 5 octobre" meta="Après votre validation" /></div>{decision === 'correction' ? <Field label="Le point à corriger selon l’accord" value="Merci d’ajouter le nom du restaurant dans la vidéo, comme convenu." multiline /> : <InfoCard title={decision === 'approved' || decision === 'requested' ? 'À faire ensuite · Linh' : 'Prochaine action · Minh'} icon={decision === 'approved' ? Mail : Clock3}>{decision === 'approved' ? 'Linh est prévenue par e-mail. Elle peut publier à la date convenue.' : decision === 'requested' ? 'Linh doit déposer la version corrigée avant toute publication.' : 'Réponse sous 72 h. Rappel prévu, sans validation automatique.'}</InfoCard>}<div className="vc-bottom">{decision === 'approved' ? <UiButton goto="proof">Voir l’étape de publication <ArrowRight size={17} /></UiButton> : decision === 'correction' ? <UiButton onClick={() => setDecision('requested')}>Envoyer le retour <Send size={17} /></UiButton> : decision === 'requested' ? <UiButton disabled><Check size={17} /> Retour envoyé · démonstration</UiButton> : <><UiButton onClick={() => setDecision('approved')}><Check size={17} /> Valider cette version</UiButton><UiButton tone="secondary" onClick={() => setDecision('correction')}>Demander une correction</UiButton></>}</div></Screen>
}
function ProofScreen() {
  const [submitted, setSubmitted] = useState(false)
  return <Screen><TopBar title="La dernière étape" back="review" /><Heading title="À vous de publier, Linh.">Le 5 octobre : publiez sur Instagram, puis ajoutez le lien.</Heading><div className="vc-panel"><ListRow icon={Check} title="24 septembre · visite réalisée" meta="Confirmée par Linh et Minh" /><ListRow icon={Check} title="2 octobre · vidéo validée" meta="Version 1 approuvée par le restaurant" /><ListRow icon={Instagram} title="5 octobre · publication prévue" meta="Mentionner la collaboration commerciale" /></div><Field label="Lien de votre publication Instagram" value="https://www.instagram.com/reel/exemple/" /><InfoCard title={submitted ? 'Lien transmis · démonstration' : 'Une preuve, pas une promesse'} icon={submitted ? Mail : Link2}>{submitted ? 'Minh est prévenu par e-mail. Il confirme la publication pour clôturer le dossier.' : 'Le restaurant confirme le lien pour clôturer le dossier.'}</InfoCard><div className="vc-bottom"><UiButton disabled={submitted} onClick={() => setSubmitted(true)}>{submitted ? <><Check size={17} /> En attente du restaurant</> : <>Envoyer le lien <ArrowRight size={17} /></>}</UiButton></div></Screen>
}

function MockupGallery() {
  const { offerKey } = useContext(DemoContext)
  const mockups = [
  { id: 'join', title: '01. La page d’accueil du site', subtitle: 'Une page défilable : présentation, fonctionnement et inscription.', scrollable: true, screen: <JoinScreen /> },
  { id: 'connect', title: '02. Connecter Instagram et TikTok', subtitle: 'Connexion au bon moment et guide pour les comptes Instagram personnels.', scrollable: true, screen: <ConnectScreen /> },
  { id: 'explore', title: '03. Découvrir dans sa ville', subtitle: 'Le créateur prend l’initiative. Filtres cliquables.', screen: <ExploreScreen /> },
  { id: 'offer', title: '04. Comprendre et demander', subtitle: 'Ce qui est offert et attendu, avant de s’engager.', scrollable: true, screen: <OfferScreen key={offerKey} /> },
  { id: 'establishment', title: '05. Présenter son commerce', subtitle: 'Une fiche et une offre distinctes par établissement.', screen: <EstablishmentScreen /> },
  { id: 'subscription', title: '06. Activer son abonnement', subtitle: 'Paiement web via Stripe, pas un achat dans un store.', screen: <SubscriptionScreen /> },
  { id: 'dashboard', title: '07. Savoir quoi faire', subtitle: 'Une priorité claire, avec des notifications par e-mail.', screen: <DashboardScreen /> },
  { id: 'creator', title: '08. Choisir son créateur', subtitle: 'Exemple Bếp & Basil : le commerçant examine le profil et sa demande.', scrollable: true, screen: <CreatorScreen /> },
  { id: 'agreement', title: '09. Se mettre d’accord', subtitle: 'Conditions, date et discussion dans le même dossier.', scrollable: true, screen: <AgreementScreen /> },
  { id: 'upload', title: '10. Déposer le brouillon', subtitle: 'Après la visite, un envoi privé et une échéance explicite.', screen: <UploadScreen /> },
  { id: 'review', title: '11. Valider ou faire corriger', subtitle: 'Essayez les deux décisions : jamais de validation tacite.', screen: <ReviewScreen /> },
  { id: 'proof', title: '12. Publier et transmettre', subtitle: 'Un lien de publication à confirmer par le commerçant.', screen: <ProofScreen /> },
]

  return <main className="vietcollab-mockups-page"><section className="vc-landing-hero"><div><p className="vc-eyebrow">Proposition d'accompagnement</p><h1>Maquettes visuelles</h1><p className="vc-reference">VietCollab · MOB-2026-vietcollab</p><p className="vc-disclaimer">Aperçu rapide pour visualiser l'idée, toutes les pages ne sont pas illustrées et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.</p></div><div className="vc-project-stamp"><Handshake size={30} /><span>DES LIEUX.<br />DES CRÉATEURS.<br /><strong>UN ACCORD CLAIR.</strong></span></div></section><section className="vc-gallery" aria-label="Douze écrans de la web application">{mockups.map(mockup => <article key={mockup.id} id={`vc-${mockup.id}`} className="vc-mockup-card" data-scrollable={Boolean(mockup.scrollable)}><div className="vc-card-head"><span className="vc-card-audience">{['join','connect','explore','offer'].includes(mockup.id) ? 'DÉCOUVRIR & SE PRÉSENTER' : ['establishment','subscription','dashboard','creator'].includes(mockup.id) ? 'ACCUEILLIR & CHOISIR' : 'COLLABORER & PUBLIER'}</span><h2>{mockup.title}</h2><p>{mockup.subtitle}</p>{mockup.scrollable && <span className="vc-scroll-label">Écran à faire défiler</span>}</div><PhoneFrame scrollable={mockup.scrollable}>{mockup.screen}</PhoneFrame></article>)}</section><footer className="vc-footer"><Brand /><p>Qui a promis quoi ? Quelle est la prochaine action ? Qui doit la faire ?</p><span>Une sélection des parcours V1, pas l’ensemble des écrans ni l’administration.</span></footer></main>
}

export default function VietCollabMockups() {
  const [instagram, setInstagram] = useState(false)
  const [tiktok, setTiktok] = useState(false)
  const [offerKey, setOfferKey] = useState('restaurant')
  const [resumeApplication, setResumeApplication] = useState(false)
  return <DemoContext.Provider value={{ instagram, setInstagram, tiktok, setTiktok, offerKey, setOfferKey, resumeApplication, setResumeApplication }}><MockupGallery /></DemoContext.Provider>
}
