import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
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
// montrer que c'est vrai, puis lui laisser poser sa question. D'où l'ordre :
//   1. la messagerie au million de téléchargements, EN PREMIER : c'est la preuve qui pèse le plus (Noé, 26/11/2026) ;
//   2. QUATRE APPLICATIONS, toutes dans le MÊME FORMAT, chacune dans son panneau (« bien délimité ») : celles de
//      métier d'abord. La page ne dit pas à qui est chaque application : pas de bloc « Mes propres applications ».
//      ⚠️ On n'écrit donc « client » à côté d'AUCUNE : l'écrire sur WakeUp Alarme ou Plouff Habitudes serait faux ;
//   3. les avis ;
//   4. UNE SEULE FIN : « Une question avant de lancer ton projet ? », dans le seul bloc bleu nuit de la page. Le bloc
//      « La suite : tu vois ton application avant de payer » a été retiré (Noé, 26/11/2026 : « horrible ») : à la place
//      du prospect, on ne lui annonce pas la visio sur cette page, on lui laisse la main.
// RÈGLES (les mêmes que la page d'accueil test) : pas de sur-titre au-dessus des titres, peu de texte, une chose dite
// une seule fois, « téléphone » et « ordinateur », jamais « abonnement » ni « paywall » (« offre payante »), jamais
// « gratuit » pour la maquette (« avant de payer »). Rien d'inventé : chaque phrase vient de la page en ligne ou des
// décisions de Noé. Calorie n'y est pas (retirée le 26/11/2026). Pas de maquette de projet non signé.
// JAMAIS « en ligne » à côté d'une application, aucune (Noé, 26/11/2026, 12 h 03) : on dit ce qu'elle est (« iPhone et
// Android »), pas si elle est publiée.
// ⚠️ AVANT DE LA METTRE À LA PLACE DE /projets : scripts/generate-routes.js lit le texte de Projets.jsx et la liste
// ANNUAIRES (lien retour vers l'annuaire, à garder au pied de page) ; la page reste « noindex, follow ».
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  'Bonjour Noé, j’ai une question après avoir consulté la page des réalisations.'
)}`

const IMAGES = '/assets/images/apps'

// Quatre applications, même format. Les textes reprennent les études de cas de la page en ligne, raccourcis ; les écrans
// sont ceux du carrousel de l'accueil test (le site de l'application et son écran de téléphone).
const CAS = [
  {
    id: 'bailora',
    metier: 'Immobilier',
    nom: 'Bailora',
    icone: `${IMAGES}/bailora.webp`,
    phrase: 'La gestion de ses locations, sur téléphone.',
    besoin: 'Un propriétaire, seul ou en SCI familiale, suit ses loyers, ses quittances et ses états des lieux entre un tableur, des courriers et des photos éparpillées.',
    construit: 'Une application qui suit les loyers, prépare les quittances et les courriers, guide l’état des lieux pièce par pièce jusqu’à la signature, et range chaque document. Un assistant répond aux questions sur les logements, à l’écrit comme à la voix.',
    reperes: ['iPhone et Android', 'Assistant à la voix'],
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
    construit: 'Une navigation complète, guidée à la voix, qui compare deux trajets et compte les ralentisseurs sur chacun : plus de 120 000 sont référencés en France. Elle s’affiche aussi sur l’écran de la voiture. Une offre Pro payante lève la limite de trajets.',
    reperes: ['iPhone et Android', 'CarPlay et Android Auto'],
    ordinateur: { src: `${IMAGES}/exemples/smoothride-ordinateur.webp`, largeur: 1245, hauteur: 700, alt: 'Sur ordinateur, le site de SmoothRide : « Votre trajet, sans les dos-d’âne »' },
    telephone: { src: `${IMAGES}/captures/smoothride-navigation.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, la navigation avec les dos-d’âne signalés sur le trajet' },
  },
  {
    id: 'wakeup',
    metier: 'Réveil',
    nom: 'WakeUp Alarme',
    icone: '/assets/images/app-icons/wackupalarme.webp',
    phrase: 'Le réveil qu’on n’éteint qu’en se levant.',
    besoin: 'On coupe l’alarme sans même ouvrir les yeux, et on se rendort.',
    construit: 'Pour couper l’alarme, il faut réussir une mission : résoudre un calcul, scanner un QR code posé dans une autre pièce, secouer son téléphone ou faire quelques pas. On choisit sa musique comme sonnerie. Une semaine d’essai, puis une offre payante au mois ou à l’année.',
    reperes: ['iPhone et Android', 'Essai d’une semaine'],
    // Le visuel de présentation de l'application, faute de site à montrer (comme dans le carrousel de l'accueil test).
    ordinateur: { src: `${IMAGES}/exemples/wakeup-ordinateur.webp`, largeur: 960, hauteur: 540, alt: 'Sur ordinateur, la présentation de WakeUp Alarme : « Le réveil qu’on ne peut pas éteindre sans se lever »' },
    telephone: { src: `${IMAGES}/captures/wakeup-alarme.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, l’accueil du réveil à missions avec une alarme activée' },
  },
  {
    id: 'plouff',
    metier: 'Bien-être',
    nom: 'Plouff Habitudes',
    icone: '/assets/images/app-icons/plouffhabitudes.webp',
    phrase: 'De bonnes habitudes, sans pression.',
    besoin: 'Les applications d’habitudes misent sur la pression et les séries à ne pas casser : on rate un jour, on culpabilise, on abandonne.',
    construit: 'Une application douce : on planifie ses habitudes à son rythme, avec une loutre qui évolue à mesure qu’on avance, un exercice de respiration guidé, un suivi de l’humeur et des statistiques. Une offre premium payante.',
    reperes: ['iPhone et Android', 'Du design au lancement en 30 jours'],
    ordinateur: { src: `${IMAGES}/exemples/plouff-ordinateur.webp`, largeur: 1245, hauteur: 700, alt: 'Sur ordinateur, le site de Plouff Habitudes : « Crée des habitudes qui durent »' },
    telephone: { src: `${IMAGES}/captures/plouff-habitudes.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, les habitudes du jour avec la mascotte' },
  },
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
        {/* ===== HAUT DE PAGE : le titre et « +20 ». Le million est dit juste dessous, une seule fois. ===== */}
        <section className="pjt-haut" aria-labelledby="pjt-titre">
          <h1 id="pjt-titre" className="pjt-h1">Ce que j’ai <span>déjà construit</span></h1>
          <p className="pjt-haut-texte">Des applications conçues de l’idée au lancement, pour être utilisées et pour rapporter.</p>
          <div className="pjt-chiffres">
            <p className="ex-chiffre"><strong>+20</strong> applications déjà publiées</p>
          </div>
        </section>

        {/* ===== LA MESSAGERIE AU MILLION, EN PREMIER (Noé, 26/11/2026 : « celle qui me donne le plus de valeur, tu la
            mets à la fin »). Noé garde le nom sur cette page (« tu peux laisser » : elle n'est pas indexée et il
            l'envoie lui-même). ===== */}
        <section className="pjt-million-zone" aria-labelledby="pjt-million-titre">
          <div className="pjt-million">
            <h2 id="pjt-million-titre" className="pjt-million-app">
              <img src={`${IMAGES}/hushapp.webp`} alt="" width="56" height="56" />
              <span>Hush<small>Messagerie anonyme, iPhone et Android</small></span>
            </h2>
            <p className="pjt-million-chiffre"><strong>+1 million</strong><span>de téléchargements</span></p>
            <p className="pjt-million-texte">J’ai conçu la première version de cette messagerie, qui a réuni 300&nbsp;000 utilisateurs.</p>
          </div>
        </section>

        {/* ===== LES APPLICATIONS : quatre panneaux identiques, l'un sous l'autre, écrans d'un côté et texte de l'autre
            (les côtés alternent sur ordinateur). ===== */}
        <section className="pjt-section pjt-section-cas" aria-label="Applications conçues par Noé Calmes">
          <div className="pjt-int pjt-liste-cas">
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

        {/* ===== LES AVIS : le composant partagé avec l'accueil, tel quel. ===== */}
        <section id="avis" className="pjt-section" aria-labelledby="pjt-avis-titre">
          <div className="pjt-int">
            <h2 id="pjt-avis-titre" className="pjt-h2 pjt-h2-seul">Ce que disent <span>mes clients</span></h2>
            <AvisClients />
          </div>
        </section>

        {/* ===== LA FIN : une seule question, dans le seul bloc bleu nuit de la page. ===== */}
        <section id="contact" className="pjt-fin-zone" aria-labelledby="pjt-contact-titre">
          <div className="pjt-fin">
            <h2 id="pjt-contact-titre" className="pjt-fin-titre">Une question avant de <span>lancer ton projet ?</span></h2>
            <p className="pjt-fin-texte">Je réponds directement, par message ou par téléphone.</p>
            <div className="pjt-contact-liens">
              <a className="pjt-bouton" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDirectWhatsAppLead('projets_contact')}><MessageCircle size={17} aria-hidden="true" /> M’écrire <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a className="pjt-bouton pjt-bouton-clair" href="tel:+33658308210"><Phone size={16} aria-hidden="true" /> M’appeler</a>
            </div>
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
