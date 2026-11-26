import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, BadgeEuro, FileText, MessageCircle, Phone, Smartphone } from 'lucide-react'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { AvisClients } from './AvisClients.jsx'
import './app-showcase.css'
import './exemples-metier.css'
import './projets-test.css'

// PAGE TEST DE LA NOUVELLE PAGE « PROJETS » (26/11/2026) : /projetstest, EN LOCAL SEULEMENT (voir App.jsx). La page en
// ligne /projets (src/Projets.jsx) ne change pas tant que Noé n'a pas validé celle-ci.
//
// À QUOI ELLE SERT : Noé l'envoie APRÈS LE PREMIER APPEL. Le prospect vient de lui parler : il ne faut pas lui
// redire la méthode ni le budget (c'était l'ancienne page, qui se lisait comme le CV d'un freelance). Il faut lui
// montrer que c'est vrai, puis lui dire ce qui l'attend à la visio. D'où l'ordre :
//   1. les applications DE MÉTIER, en grand (celles de clients : le prospect s'y reconnaît) ;
//   2. les applications de Noé, en plus petit (elles sont en ligne et payantes : il sait vendre, pour son compte) ;
//   3. les avis ;
//   4. LA SUITE : ce qu'il verra à la visio, avant de payer.
// RÈGLES (les mêmes que la page d'accueil test) : pas de sur-titre au-dessus des titres, peu de texte, une chose dite
// une seule fois, « téléphone » et « ordinateur », jamais « abonnement » ni « paywall » (« offre payante »), jamais
// « gratuit » pour la maquette (« avant de payer »). Rien d'inventé : chaque phrase vient de la page en ligne ou des
// décisions de Noé. Calorie n'y est pas (retirée le 26/11/2026). Pas de maquette de projet non signé.
// ⚠️ AVANT DE LA METTRE À LA PLACE DE /projets : scripts/generate-routes.js lit le texte de Projets.jsx et la liste
// ANNUAIRES (lien retour vers l'annuaire, à garder au pied de page) ; la page reste « noindex, follow ».
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  'Bonjour Noé, j’ai une question après avoir consulté la page des réalisations.'
)}`

const IMAGES = '/assets/images/apps'

// Les applications de métier, celles de clients. Les textes reprennent les études de cas de la page en ligne,
// raccourcis ; les écrans sont ceux du carrousel de l'accueil test (le site de l'application et son écran de téléphone).
const CAS = [
  {
    id: 'bailora',
    metier: 'Immobilier',
    nom: 'Bailora',
    icone: `${IMAGES}/bailora.webp`,
    phrase: 'La gestion de ses locations, sur téléphone.',
    besoin: 'Un propriétaire, seul ou en SCI familiale, suit ses loyers, ses quittances et ses états des lieux entre un tableur, des courriers et des photos éparpillées.',
    construit: 'Une application qui suit les loyers, prépare les quittances et les courriers, guide l’état des lieux pièce par pièce jusqu’à la signature, et range chaque document. Un assistant répond aux questions sur les logements, à l’écrit comme à la voix.',
    reperes: ['Application d’un client', 'iPhone et Android'],
    ordinateur: { src: `${IMAGES}/exemples/bailora-ordinateur.webp`, largeur: 1298, hauteur: 730, alt: 'Sur ordinateur, le site de Bailora : « Vos SCI, enfin simples »' },
    telephone: { src: `${IMAGES}/captures/bailora-accueil.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, le tableau de bord des loyers, des paiements et des actions à traiter' },
  },
  {
    id: 'smoothride',
    metier: 'Automobile',
    nom: 'SmoothRide',
    icone: `${IMAGES}/smoothride.svg`,
    phrase: 'Le GPS qui évite les dos-d’âne.',
    besoin: 'Les GPS cherchent le trajet le plus rapide, jamais le plus doux. Avec un dos fragile, un véhicule chargé ou des journées entières sur la route, chaque dos-d’âne compte.',
    construit: 'Une navigation complète, guidée à la voix, qui compare deux trajets et compte les ralentisseurs sur chacun : plus de 120 000 sont référencés en France. Elle s’affiche aussi sur l’écran de la voiture. Une offre Pro payante lève la limite de trajets.',
    reperes: ['Application d’un client', 'En ligne sur l’App Store et Google Play', 'CarPlay et Android Auto'],
    ordinateur: { src: `${IMAGES}/exemples/smoothride-ordinateur.webp`, largeur: 1245, hauteur: 700, alt: 'Sur ordinateur, le site de SmoothRide : « Votre trajet, sans les dos-d’âne »' },
    telephone: { src: `${IMAGES}/captures/smoothride-navigation.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, la navigation avec les dos-d’âne signalés sur le trajet' },
  },
]

// Les applications de Noé. Un seul repère chacune, le plus parlant.
const MIENNES = [
  {
    nom: 'WakeUp Alarme',
    icone: '/assets/images/app-icons/wackupalarme.webp',
    visuel: { src: '/assets/images/projets/wakeup-alarme.webp', alt: 'WakeUp Alarme : une mission de calcul à réussir pour couper l’alarme' },
    phrase: 'Le réveil qu’on n’éteint qu’en se levant : il faut réussir une mission pour le couper.',
    repere: 'Une semaine d’essai, puis une offre payante au mois ou à l’année.',
  },
  {
    nom: 'Plouff Habitudes',
    icone: '/assets/images/app-icons/plouffhabitudes.webp',
    visuel: { src: '/assets/images/projets/plouff-habitudes.webp', alt: 'Plouff Habitudes : l’écran du jour, avec la loutre et les habitudes à cocher' },
    phrase: 'De bonnes habitudes sans pression, avec une loutre qui évolue à mesure qu’on avance.',
    repere: 'Du design au lancement en 30 jours.',
  },
]

// Ce que le prospect verra à la visio (appel 2, 30 minutes : nowork/documentation/guides/appels-prospects.md).
const SUITE = [
  { Icone: Smartphone, titre: 'Ta maquette', texte: 'Les écrans de ton application, comme elle sera.' },
  { Icone: FileText, titre: 'Ton cahier des charges', texte: 'Tout ce qu’elle fait, écrit point par point.' },
  { Icone: BadgeEuro, titre: 'Ton prix fixe', texte: 'Le montant et le délai, fixés avant de commencer.' },
]

function Ecrans({ ordinateur, telephone }) {
  return (
    <div className="pjt-ecrans">
      <div className="ex-scene ex-scene-duo est-active">
        <div className="ex-scene-ordi">
          <div className="ex-ordi-barre" aria-hidden="true"><i /><i /><i /><span><b /></span></div>
          <img src={ordinateur.src} alt={ordinateur.alt} width={ordinateur.largeur} height={ordinateur.hauteur} loading="lazy" decoding="async" draggable="false" />
        </div>
        <div className="ex-scene-tel">
          <div className="app-phone">
            <i className="app-phone-button app-phone-action" aria-hidden="true" />
            <i className="app-phone-button app-phone-volume-up" aria-hidden="true" />
            <i className="app-phone-button app-phone-volume-down" aria-hidden="true" />
            <i className="app-phone-button app-phone-power" aria-hidden="true" />
            <div className="app-phone-screen">
              <img src={telephone.src} alt={telephone.alt} width={telephone.largeur} height={telephone.hauteur} loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjetsTest({ onBack }) {
  useEffect(() => {
    document.title = 'Projets (page test) | Noé Calmes'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pjt-page">
      <header className="pjt-barre-zone">
        <div className="pjt-barre">
          <button type="button" onClick={onBack} className="pjt-marque" aria-label="Retour à l'accueil">
            <img src="/assets/images/profile/me.webp" alt="" width="40" height="40" />
            <span><strong>Noé Calmes</strong><small>Expert en applications</small></span>
          </button>
          <a className="pjt-barre-bouton" href="#contact">Une question ?</a>
        </div>
      </header>

      <main>
        {/* ===== HAUT DE PAGE : le titre et les deux chiffres, rien d'autre. Les écrans arrivent juste dessous. ===== */}
        <section className="pjt-haut" aria-labelledby="pjt-titre">
          <h1 id="pjt-titre" className="pjt-h1">Ce que j’ai <span>déjà construit</span></h1>
          <p className="pjt-haut-texte">Pour des professionnels qui lancent l’application de leur métier, et pour moi.</p>
          <div className="pjt-chiffres">
            <p className="ex-chiffre"><strong>+20</strong> applications déjà publiées</p>
            <p className="ex-chiffre pjt-chiffre-fort"><strong>+1 million</strong> de téléchargements sur l’une d’elles</p>
          </div>
        </section>

        {/* ===== LES APPLICATIONS DE MÉTIER : en grand, l'une sous l'autre, écrans d'un côté et texte de l'autre. ===== */}
        <section className="pjt-section pjt-section-cas" aria-label="Applications de métier construites pour des clients">
          <div className="pjt-int">
            {CAS.map((cas, i) => (
              <article key={cas.id} className={`pjt-cas${i % 2 ? ' pjt-cas-inverse' : ''}`}>
                <Ecrans ordinateur={cas.ordinateur} telephone={cas.telephone} />
                <div className="pjt-cas-texte">
                  <p className="pjt-metier">{cas.metier}</p>
                  <h2 className="pjt-cas-nom"><img src={cas.icone} alt="" width="44" height="44" loading="lazy" />{cas.nom}</h2>
                  <p className="pjt-cas-phrase">{cas.phrase}</p>
                  <p className="pjt-cas-detail"><strong>Le besoin.</strong> {cas.besoin}</p>
                  <p className="pjt-cas-detail"><strong>Ce que j’ai construit.</strong> {cas.construit}</p>
                  <ul className="pjt-reperes">{cas.reperes.map((r) => <li key={r}>{r}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== MES APPLICATIONS : plus petites. Elles prouvent qu'il sait faire payer, pour son propre compte. ===== */}
        <section className="pjt-section pjt-gris" aria-labelledby="pjt-miennes-titre">
          <div className="pjt-int">
            <h2 id="pjt-miennes-titre" className="pjt-h2">Mes propres <span>applications</span></h2>
            <p className="pjt-h2-texte">Elles sont en ligne et payantes. C’est là que je vois ce qui fait payer et revenir.</p>
            <div className="pjt-miennes">
              {MIENNES.map((app) => (
                <article key={app.nom} className="pjt-mienne">
                  <img className="pjt-mienne-visuel" src={app.visuel.src} alt={app.visuel.alt} width="960" height="540" loading="lazy" decoding="async" />
                  <h3 className="pjt-mienne-nom"><img src={app.icone} alt="" width="36" height="36" loading="lazy" />{app.nom}</h3>
                  <p className="pjt-mienne-phrase">{app.phrase}</p>
                  <p className="pjt-mienne-repere">{app.repere}</p>
                </article>
              ))}
            </div>
            {/* Le million, en une ligne : c'est ce que compte « +1 million » en haut de page. Noé garde le nom ici
                (26/11/2026 : « tu peux laisser », la page n'est pas indexée et il l'envoie lui-même). */}
            <p className="pjt-million">
              <img src={`${IMAGES}/hushapp.webp`} alt="" width="48" height="48" loading="lazy" />
              <span><strong>Et la première version de Hush, une messagerie anonyme.</strong> 300 000 utilisateurs sur ma version. L’application dépasse aujourd’hui le million de téléchargements.</span>
            </p>
          </div>
        </section>

        {/* ===== LES AVIS : le composant partagé avec l'accueil, tel quel. ===== */}
        <section id="avis" className="pjt-section" aria-labelledby="pjt-avis-titre">
          <div className="pjt-int">
            <h2 id="pjt-avis-titre" className="pjt-h2 pjt-h2-seul">Ce que disent <span>mes clients</span></h2>
            <AvisClients />
          </div>
        </section>

        {/* ===== LA SUITE : le seul bloc bleu nuit de la page. Ce qu'il verra à la visio, avant de payer. ===== */}
        <section className="pjt-suite-zone" aria-labelledby="pjt-suite-titre">
          <div className="pjt-suite">
            <h2 id="pjt-suite-titre" className="pjt-suite-titre">La suite : tu vois ton application <span>avant de payer.</span></h2>
            <p className="pjt-suite-texte">En visio, 30 minutes. Je te présente :</p>
            <ul className="pjt-suite-liste">
              {SUITE.map((etape) => {
                const Icone = etape.Icone
                return (
                  <li key={etape.titre}>
                    <Icone size={26} strokeWidth={1.6} aria-hidden="true" />
                    <strong>{etape.titre}</strong>
                    <span>{etape.texte}</span>
                  </li>
                )
              })}
            </ul>
            <p className="pjt-suite-fin">Et tu décides après.</p>
          </div>
        </section>

        <section id="contact" className="pjt-section pjt-contact" aria-labelledby="pjt-contact-titre">
          <h2 id="pjt-contact-titre" className="pjt-h2 pjt-h2-seul">Une question d’ici là ?</h2>
          <p className="pjt-h2-texte">Je réponds directement, par message ou par téléphone.</p>
          <div className="pjt-contact-liens">
            <a className="pjt-bouton" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDirectWhatsAppLead('projets_contact')}><MessageCircle size={17} aria-hidden="true" /> M’écrire <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="pjt-bouton pjt-bouton-clair" href="tel:+33658308210"><Phone size={16} aria-hidden="true" /> M’appeler</a>
          </div>
        </section>
      </main>

      <footer className="pjt-pied">
        <span>Noé Calmes, expert en applications</span>
        <button type="button" onClick={onBack}>Retour à l’accueil <ArrowRight size={15} aria-hidden="true" /></button>
      </footer>
    </div>
  )
}
