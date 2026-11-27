import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, Car, MessageCircle, Phone } from 'lucide-react'
import { appliquerMeta, retirerPrerender } from './seo.js'
import { trackDirectWhatsAppLead } from './metaTracking.js'
import { AvisClients } from './AvisClients.jsx'
import './app-showcase.css'
import './exemples-metier.css'
import './projets.css'

// LA PAGE « PROJETS » (/projets et son alias /projet). Refaite le 26/11/2026 sur une page test (/projetstest), validée
// par Noé le même jour (13 h 06) et mise à la place de l'ancienne. Elle n'est PAS INDEXÉE (« noindex, follow », hors
// sitemap et hors llms.txt : scripts/generate-routes.js) : c'est le support envoyé après un premier appel.
//
// À QUOI ELLE SERT : Noé l'envoie APRÈS LE PREMIER APPEL. Le prospect vient de lui parler : il ne faut pas lui
// redire la méthode ni le budget (c'était l'ancienne page, qui se lisait comme le CV d'un freelance). Il faut lui
// montrer que c'est vrai, puis lui laisser poser sa question. D'où l'ordre :
//   1. LE HAUT DE L'ANCIENNE PAGE, qui avait plus d'impact : « Je crée chaque application comme si c'était la mienne. »
//      et deux téléphones penchés (Noé, 26/11/2026 : « pas beau par rapport à la page d'avant », « un mix des deux ») ;
//   2. la messagerie au million de téléchargements : c'est la preuve qui pèse le plus, avec un écran de l'application ;
//   3. QUATRE APPLICATIONS, toutes dans le MÊME FORMAT, chacune dans son panneau (« bien délimité ») : l'écran
//      d'ordinateur et le téléphone côté à côté (« j'aime bien »), celles de métier d'abord. Le texte part de CELUI QUI A
//      EU L'IDÉE et de son métier, parce que c'est le lecteur de la page : quelqu'un qui connaît son sujet et veut
//      son application. La page ne dit pas à qui est chaque application : pas de bloc « Mes propres applications ».
//      ⚠️ On n'écrit donc « client » ni « fondateur » à côté de WakeUp Alarme ni de Plouff Habitudes : ce serait faux ;
//   4. les avis ;
//   5. UNE SEULE FIN : « Une question avant de lancer ton projet ? », dans le seul bloc bleu nuit de la page. Le bloc
//      « La suite : tu vois ton application avant de payer » a été retiré (Noé, 26/11/2026 : « horrible »).
// RÈGLES (les mêmes que la page d'accueil test) : pas de sur-titre au-dessus des titres, peu de texte, une chose dite
// une seule fois, « téléphone » et « ordinateur », jamais « abonnement » ni « paywall » (« offre payante »), jamais
// « gratuit » pour la maquette (« avant de payer »). Rien d'inventé : chaque phrase vient de la page en ligne ou des
// décisions de Noé. Calorie n'y est pas (retirée le 26/11/2026). Pas de maquette de projet non signé.
// JAMAIS « en ligne » à côté d'une application, aucune (Noé, 26/11/2026, 12 h 03). JAMAIS « iPhone et Android » non
// plus, ni aucune pastille qui ne sert à rien (12 h 25) : une seule mise en avant, quand elle compte (CarPlay).
// scripts/generate-routes.js lit ses meta (appliquerMeta, garder ce format), le texte du composant Projets et la liste
// ANNUAIRES (lien retour demandé par l'annuaire, au pied de page).
const WHATSAPP_URL = `https://wa.me/33658308210?text=${encodeURIComponent(
  'Bonjour Noé, j’ai une question après avoir consulté la page des réalisations.'
)}`

// Annuaires qui référencent Noé et demandent un lien retour. Une seule ligne,
// discrète, au pied de cette page : jamais dans le pied de page global du site.
// Lu aussi par scripts/generate-routes.js pour le pré-rendu de /projets.
export const ANNUAIRES = [
  { nom: 'jesuisnumerique.fr', url: 'https://www.jesuisnumerique.fr' },
]

const IMAGES = '/assets/images/apps'

// Quatre applications, même format : le métier, le nom, une phrase, puis trois phrases au plus. `atout` est facultatif :
// une seule ligne mise en avant, quand elle compte vraiment (Noé : « CarPlay, Android Auto, ça, le mettre, important »).
// Les écrans sont ceux du carrousel de l'accueil test (le site de l'application et son écran de téléphone).
const CAS = [
  {
    id: 'smoothride',
    metier: 'Automobile',
    nom: 'SmoothRide',
    icone: `${IMAGES}/smoothride.svg`,
    phrase: 'Le GPS qui évite les dos-d’âne.',
    // ⚠️ La première phrase vient de Noé (26/11/2026 : « il possède une voiture de prestige, souhaite créer une app »).
    // À faire relire par le fondateur avant la mise en ligne.
    texte: 'Son fondateur possède une voiture de prestige\u00a0: chaque dos-d’âne peut l’abîmer. Il voulait le GPS qui choisit le trajet le plus doux, pas le plus rapide. L’application compare deux trajets, compte les dos-d’âne sur chacun et guide à la voix.',
    atout: 'CarPlay et Android Auto',
    ordinateur: { src: `${IMAGES}/exemples/smoothride-ordinateur.webp`, largeur: 1245, hauteur: 700, alt: 'Sur ordinateur, le site de SmoothRide : « Votre trajet, sans les dos-d’âne »' },
    telephone: { src: `${IMAGES}/captures/smoothride-navigation.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, la navigation avec les dos-d’âne signalés sur le trajet' },
  },
  {
    id: 'bailora',
    metier: 'Immobilier',
    nom: 'Bailora',
    icone: `${IMAGES}/bailora.webp`,
    phrase: 'La gestion de ses locations, sur téléphone.',
    texte: 'Son fondateur est artisan et gère ses propres logements en location. Loyers, quittances, états des lieux\u00a0: tout était éparpillé entre un tableur, des courriers et des photos. L’application réunit tout, et un assistant IA répond à ses questions.',
    ordinateur: { src: `${IMAGES}/exemples/bailora-ordinateur.webp`, largeur: 1298, hauteur: 730, alt: 'Sur ordinateur, le site de Bailora : « Vos SCI, enfin simples »' },
    telephone: { src: `${IMAGES}/captures/bailora-accueil.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, le tableau de bord des loyers, des paiements et des actions à traiter' },
  },
  {
    id: 'wakeup',
    metier: 'Réveil',
    nom: 'WakeUp Alarme',
    icone: '/assets/images/app-icons/wackupalarme.webp',
    phrase: 'Le réveil qu’on n’éteint qu’en se levant.',
    texte: 'On coupe l’alarme sans ouvrir les yeux, et on se rendort. Ici, il faut réussir une mission pour la couper\u00a0: un calcul, un QR code à scanner dans une autre pièce, quelques pas. Une semaine d’essai, puis une offre payante.',
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
    texte: 'Les applications d’habitudes misent sur la pression\u00a0: on rate un jour, on culpabilise, on abandonne. Celle-ci avance au rythme de chacun, avec une loutre qui évolue à mesure qu’on progresse. Conçue et lancée en 30 jours.',
    ordinateur: { src: `${IMAGES}/exemples/plouff-ordinateur.webp`, largeur: 1245, hauteur: 700, alt: 'Sur ordinateur, le site de Plouff Habitudes : « Crée des habitudes qui durent »' },
    telephone: { src: `${IMAGES}/captures/plouff-habitudes.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, les habitudes du jour avec la mascotte' },
  },
]

// « D'autres projets d'applications » (Noé, 27/11/2026 ; « Et pour d'autres métiers » ne se comprenait pas) : après la ligne de confidentialité, une rangée qui défile avec les
// maquettes de MARQUES INVENTÉES, en petit, comme dans le carrousel de l'accueil : le métier et une ligne, sans nom, sans
// icône, sans texte, sans pastille. Elles ne se mélangent pas aux quatre réalisations : ce sont des maquettes, pas des
// applications livrées. Jamais la maquette d'un prospect ici (règle de la page : pas de maquette de projet non signé).
const MAQUETTES = [
  {
    id: 'chauffeur',
    metier: 'Chauffeur privé',
    ligne: 'L’hôtel commande, le client paie, le chauffeur roule.',
    ordinateur: { src: `${IMAGES}/exemples/chauffeur-ordinateur.webp`, largeur: 2224, hauteur: 1270, alt: 'Sur ordinateur, la régie de la réception d’un hôtel : les courses en cours et la carte en direct' },
    telephone: { src: `${IMAGES}/exemples/chauffeur-telephone.webp`, largeur: 915, hauteur: 2025, alt: 'Sur téléphone, une course arrive pour le chauffeur : le gain net, 30 secondes pour accepter' },
  },
  {
    id: 'mariage',
    metier: 'Mariage',
    ligne: 'Invités, menu, plan de table, cagnotte : le mariage dans une app.',
    ordinateur: { src: `${IMAGES}/exemples/mariage-ordinateur.webp`, largeur: 2224, hauteur: 1270, alt: 'Sur ordinateur, le plan de table des mariés : chaque table, ses invités, les chaises libres' },
    telephone: { src: `${IMAGES}/exemples/mariage-telephone.webp`, largeur: 915, hauteur: 2025, alt: 'Sur téléphone, l’app de l’invité : répondre, choisir son menu, le programme, la cagnotte' },
  },
]

// Le cadre de téléphone du carrousel de l'accueil (app-showcase.css), seul : il sert aux écrans des applications et à
// l'écran de la messagerie.
function Telephone({ image }) {
  return (
    <div className="app-phone">
      <i className="app-phone-button app-phone-action" aria-hidden="true" />
      <i className="app-phone-button app-phone-volume-up" aria-hidden="true" />
      <i className="app-phone-button app-phone-volume-down" aria-hidden="true" />
      <i className="app-phone-button app-phone-power" aria-hidden="true" />
      <div className="app-phone-screen">
        <img src={image.src} alt={image.alt} width={image.largeur} height={image.hauteur} loading="lazy" decoding="async" draggable="false" />
      </div>
    </div>
  )
}

function Ecrans({ ordinateur, telephone }) {
  return (
    <div className="pjt-ecrans">
      <div className="ex-scene ex-scene-duo est-active">
        <div className="ex-scene-ordi">
          <div className="ex-ordi-barre" aria-hidden="true"><i /><i /><i /><span><b /></span></div>
          <img src={ordinateur.src} alt={ordinateur.alt} width={ordinateur.largeur} height={ordinateur.hauteur} loading="lazy" decoding="async" draggable="false" />
        </div>
        <div className="ex-scene-tel"><Telephone image={telephone} /></div>
      </div>
    </div>
  )
}

export default function Projets({ onBack }) {
  useEffect(() => {
    appliquerMeta({
      path: '/projets',
      title: "Réalisations : applications mobiles et web | Noé Calmes",
      description: "SmoothRide, Bailora, Wake Up Alarme, Plouff Habitudes : les applications conçues par Noé Calmes, le besoin de départ et le résultat.",
      ogImage: 'https://noecalmes.fr/assets/images/meta/projets-og.jpg',
      ogImageAlt: "Mes réalisations : des applications conçues de l’idée au lancement par Noé Calmes.",
    })
    retirerPrerender()
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
        {/* ===== HAUT DE PAGE : celui de l'ancienne page, sans son sur-titre. Le titre à gauche, deux téléphones penchés à
            droite (dessous sur téléphone). ===== */}
        <section className="pjt-haut" aria-labelledby="pjt-titre">
          <div className="pjt-haut-texte">
            <h1 id="pjt-titre" className="pjt-h1">Je crée chaque application <span>comme si c’était la mienne.</span></h1>
            <p className="pjt-haut-phrase"><strong>+20 applications publiées.</strong> De l’idée au lancement, je conçois chacune pour qu’elle soit utilisée, et pour qu’elle rapporte.</p>
          </div>
          <div className="pjt-haut-visuel" aria-hidden="true">
            <div className="pjt-haut-rond" />
            <div className="pjt-haut-tel pjt-haut-tel-1"><img src={`${IMAGES}/captures/smoothride-navigation.webp`} alt="" width="660" height="1431" /></div>
            <div className="pjt-haut-tel pjt-haut-tel-2"><img src={`${IMAGES}/captures/wakeup-alarme.webp`} alt="" width="660" height="1431" /></div>
          </div>
        </section>

        {/* ===== LA MESSAGERIE AU MILLION : la preuve qui pèse le plus, avec un écran de l'application (Noé, 26/11/2026).
            L'ÉCRAN : l'écran d'entrée de l'application, choisi par Noé parmi deux (26/11/2026, 12 h 41). L'autre, le fil
            avec le profil d'un vrai utilisateur (pseudo, âge, message), n'est pas montré. L'encoche a été ajoutée à
            l'image, à la place qu'elle a sur les autres captures du site (une vraie capture d'écran n'en a pas). Le
            téléphone est grand et coupé par le bas du bloc : on voit le logo et les pastilles, pas les boutons.
            Noé garde le nom sur cette page (« tu peux laisser » : elle n'est pas indexée et il l'envoie lui-même). ===== */}
        <section className="pjt-million-zone" aria-labelledby="pjt-million-titre">
          <div className="pjt-million">
            <div className="pjt-million-texte">
              <h2 id="pjt-million-titre" className="pjt-million-app">
                {/* Pas d'icône à côté du nom (Noé, 26/11/2026, 12 h 47) : le logo est déjà sur l'écran du téléphone. */}
                <span>Hush<small>Messagerie anonyme</small></span>
              </h2>
              <p className="pjt-million-chiffre"><strong>+1 million</strong><span>de téléchargements au total</span></p>
              <p className="pjt-million-phrase">J’ai conçu la première version de cette messagerie.</p>
            </div>
            <div className="pjt-million-ecran">
              <Telephone image={{ src: `${IMAGES}/captures/messagerie-accueil.webp`, largeur: 660, hauteur: 1431, alt: 'Sur téléphone, l’écran d’entrée de l’application, avec son logo' }} />
            </div>
          </div>
        </section>

        {/* ===== LES APPLICATIONS : quatre panneaux identiques, l'un sous l'autre, écrans d'un côté et texte de l'autre
            (les côtés alternent sur ordinateur). ===== */}
        <section className="pjt-section pjt-section-cas" aria-labelledby="pjt-cas-titre">
          <div className="pjt-int">
            <h2 id="pjt-cas-titre" className="pjt-h2 pjt-h2-seul">Mes <span>réalisations</span></h2>
            <div className="pjt-liste-cas">
              {CAS.map((cas, i) => (
                <article key={cas.id} className={`pjt-cas${i % 2 ? ' pjt-cas-inverse' : ''}`}>
                  <Ecrans ordinateur={cas.ordinateur} telephone={cas.telephone} />
                  <div className="pjt-cas-texte">
                    <p className="pjt-metier">{cas.metier}</p>
                    <h3 className="pjt-cas-nom"><img src={cas.icone} alt="" width="44" height="44" loading="lazy" />{cas.nom}</h3>
                    <p className="pjt-cas-phrase">{cas.phrase}</p>
                    <p className="pjt-cas-detail">{cas.texte}</p>
                    {cas.atout && <p className="pjt-atout"><Car size={18} strokeWidth={1.8} aria-hidden="true" />{cas.atout}</p>}
                  </div>
                </article>
              ))}
            </div>
            {/* Noé, 26/11/2026 : montrer que ces quatre ne sont qu'une partie des +20. Une seule ligne, discrète, sous la
                liste : là où le lecteur se demande « et les autres ? ». L'icône : un cadenas plein, dessiné ici (celui de la
                bibliothèque d'icônes, en simple trait, se lisait mal) ; en blanc sur un carré noir (Noé : « en noir au lieu du violet »). */}
            <p className="pjt-confidentiel"><span className="pjt-confidentiel-icone"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 10.5V7.2a4.5 4.5 0 0 1 9 0v3.3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><rect x="4.5" y="10" width="15" height="11.5" rx="3" fill="currentColor" /><circle cx="12" cy="15" r="1.7" fill="#0d1548" /><rect x="11.15" y="15.4" width="1.7" height="3.2" rx=".85" fill="#0d1548" /></svg></span><span>Ce n’est qu’une petite partie de mes réalisations. Les autres sont protégées par un <strong>accord de confidentialité</strong>.</span></p>
            <div className="pjt-autres">
              <h3 id="pjt-autres-titre" className="pjt-autres-titre">D’autres projets <span>d’applications</span></h3>
              <div className="pjt-autres-rangee" role="list" aria-labelledby="pjt-autres-titre">
                {MAQUETTES.map((m) => (
                  <article key={m.id} className="pjt-autre" role="listitem">
                    <Ecrans ordinateur={m.ordinateur} telephone={m.telephone} />
                    <p className="pjt-autre-legende"><strong>{m.metier}</strong><span>{m.ligne}</span></p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== LES AVIS : le composant partagé avec l'accueil, tel quel. ===== */}
        <section id="avis" className="pjt-section pjt-section-avis" aria-labelledby="pjt-avis-titre">
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
      <p className="pjt-annuaires">Référencé sur {ANNUAIRES.map((a, i) => <span key={a.url}>{i > 0 && ' · '}<a href={a.url} target="_blank" rel="noopener">{a.nom}</a></span>)}</p>
    </div>
  )
}
