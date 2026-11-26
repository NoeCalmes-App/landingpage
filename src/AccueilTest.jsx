// PAGE TEST DE LA NOUVELLE PAGE D'ACCUEIL (25 novembre 2026).
//
// Adresse : /accueiltest, EN LOCAL SEULEMENT (`npm run dev`). La route est branchée dans App.jsx derrière
// `import.meta.env.DEV` : elle n'existe pas dans le site construit pour la mise en ligne, et ce fichier n'y est
// pas embarqué. Rien ici ne remplace l'accueil actuel tant que Noé n'a pas validé les textes.
//
// D'où viennent les textes : le travail du module « Offres » (dossier Drive « offre », document « Ma nouvelle page
// d'accueil - Plan et textes à valider »). L'ordre suit les questions du visiteur. La cible, précisée par Noé le
// 25/11/2026 : il a un métier et une idée d'application, le plus souvent en rapport avec ce métier. Il n'a PAS
// forcément des clients pour elle : il connaît quelques personnes de son métier à qui la montrer. Ne jamais écrire
// « tes clients » comme s'ils étaient acquis. C'est un travail à deux : lui connaît son métier, Noé les applications.
//   1. C'est pour moi ? (le haut de page parle de SA situation, pas de Noé)
//   2. Il sait faire ? (réalisations : un chiffre vrai aujourd'hui, les écrans de vrais projets, les avis)
//   3. Pourquoi lui et pas un développeur moins cher ? (l'argument face à l'IA, quatre exemples)
//   4. Comment ça se passe, et combien ? (quatre étapes, le prix, le délai)
//   5. Qu'est-ce que je risque ? (les quatre engagements)
//   6. On est faits pour travailler ensemble ? puis le bouton, les avis, la FAQ.
//
// Les règles de l'accueil actuel restent vraies ici (documentation/architecture/landing-page.md) : presque tous
// les visiteurs sont sur téléphone, donc des phrases courtes ; une chose n'est dite qu'une fois sur la page ; on
// dit « application », jamais « SaaS » ni « site » pour une application ; aucun résultat promis.
//
// CE QUI EST RÉUTILISÉ TEL QUEL : le film (HeroVideo), le défilé d'écrans (AppShowcase), les avis (AvisClients),
// le pied de page et le bouton WhatsApp flottant. CE QUI EST NOUVEAU est mis en forme dans accueil-test.css.
//
// LES ÉCRANS DU BLOC « POURQUOI AVEC MOI » SONT DES SCHÉMAS DESSINÉS, pas des captures : quelques traits, deux ou
// trois mots, de petits montants. La mention « Écrans d'exemple. Chiffres fictifs. » a été retirée à la demande de
// Noé (25/11/2026 : « c'est un schéma, il le sait »). C'est ce qui les garde honnêtes : ils doivent RESTER des
// schémas. Une capture réaliste d'un tableau de bord avec de gros revenus inventés n'a pas sa place sur cette page :
// elle se lirait comme le résultat d'un client. « Réalisations » ne montre que du vrai.
import { createElement, useEffect, useRef, useState } from 'react'
import { Bell, Eye, FileCheck2, KeyRound, Rocket, Timer, UserRound, Wallet } from 'lucide-react'
import './App.css'
import './accueil-test.css'
import ExemplesMetier from './ExemplesMetier.jsx'
import { AvisClients } from './AvisClients.jsx'
import HeroVideo from './HeroVideo.jsx'
import { trackBookingStep, trackDirectWhatsAppLead } from './metaTracking.js'
import Footer from './Footer.jsx'
import ReserverAppel from './ReserverAppel.jsx'
import { lienInterne } from './seo.js'

const mePhoto = '/assets/images/profile/me.webp'

// PLUS DE BOUTON WHATSAPP EN BAS DE PAGE (26/11/2026) : tous les boutons mènent au calendrier Calendly
// (ReserverAppel.jsx). Le bouton WhatsApp flottant du site est retiré de cette page.

// LES LIENS DE LA BARRE DU HAUT suivent l'ordre de la page (26/11/2026) et répondent aux quatre questions d'un
// visiteur avant de réserver : qu'a-t-il déjà fait, pourquoi lui, comment ça se passe, qu'en disent ses clients.
// « Pourquoi moi » manquait : c'est le bloc qui le sépare d'un simple développeur. « Questions » n'est que dans le
// menu du téléphone (`menuSeul`) : sur ordinateur, cinq liens ne tiennent pas entre le nom et le bouton.
const NAV_LINKS = [
  { ancre: 'realisations', label: 'Réalisations' },
  { ancre: 'pourquoi-avec-moi', label: 'Pourquoi moi' },
  { ancre: 'etapes-et-tarif', label: 'Les étapes' },
  { ancre: 'avis-clients', label: 'Avis clients' },
  { ancre: 'faq', label: 'Questions', menuSeul: true },
]

// « COMMENT ÇA MARCHE » (25/11/2026, quatrième version). Le modèle que Noé aime est celui d'Ikovaline, vu dans son
// Chrome : PAS DE CASE autour d'une étape, un numéro, un nom, UNE phrase, puis un dessin dans un cadre large comme la
// colonne. Trois essais refusés le même soir : des cartes avec une petite vignette (« leurs dessins sont plus
// beaux »), des cartes avec des dessins à plusieurs pièces, des étiquettes et du vert, du rouge, du bleu nuit
// (« trop d'éléments, on est perdu », « beaucoup de couleurs »), puis des dessins posés sans cadre, avec de grandes
// ombres (« beaucoup d'ombres », « pas centré »). LES RÈGLES QUI EN SORTENT :
//   - une étape = un numéro, un nom, une phrase, un dessin. Rien d'autre : pas d'étiquette, la durée est dans la phrase.
//   - un dessin = peu de pièces, À PLAT (trait fin, pas d'ombre), dans UNE couleur (le violet, du blanc, du gris).
//   - le dessin est dans un cadre violet très pâle, large comme la colonne : c'est lui qui centre le bloc sous le titre.
//   - pas de sur-titre au-dessus de « Comment ça marche ? ».
//   - « 30 min » ressort dans le dessin de l'appel (demande de Noé ; 15 min jusqu'au 26/11/2026, l'appel en dure 30). Pas de bouton ni de logo de boutique dans celui
//     du lancement : une fenêtre de navigateur et un téléphone, le web et le mobile.
// « Prix et délai, noir sur blanc, sous 48 h. » est la phrase voulue par Noé : c'est aussi, mot pour mot, celle
// d'Ikovaline (dit à Noé le 25/11/2026).
// Les quatre étapes sont nommées par ce qui arrive au client (l'appel, la proposition, la construction, le lancement).
// « Sous 48 h » est une idée de Noé : c'est un délai sur lequel il s'engage. « Maquette, développement, tests » sont
// ses mots pour la construction. La maquette OFFERTE n'apparaît pas : elle se propose à l'appel (18/11/2026). Deux par
// deux sur ordinateur, l'une sous l'autre sur téléphone.
const ETAPES = [
  {
    titre: "L'appel",
    texte: "30 minutes, gratuit. Tu repars avec mes conseils et une fourchette de prix.",
    schema: (
      <div className="at-sc">
        <div className="at-sc-appel">
          {/* Le message s'écrit (trois points), puis s'affiche, en boucle. « 30 min » ne bouge pas : un chrono à
              côté dit que c'est la durée de l'appel (Noé, 25/11/2026). */}
          <span className="at-sc-message">
            <span className="at-sc-saisie"><i /><i /><i /></span>
            <span className="at-sc-bulle">J'ai une idée d'application</span>
          </span>
          <div className="at-sc-carte at-sc-rdv">
            <img src={mePhoto} alt="" width="36" height="36" loading="lazy" />
            <span><b>Appel avec Noé</b><small>Mardi, 14&nbsp;h</small></span>
            <strong><Timer size={15} strokeWidth={2.4} />30&nbsp;min</strong>
          </div>
        </div>
      </div>
    ),
  },
  {
    titre: 'La proposition',
    texte: "Prix et délai, noir sur blanc, sous 48\u00a0h.",
    schema: (
      <div className="at-sc">
        <i className="at-sc-feuille at-sc-feuille-gauche" />
        <i className="at-sc-feuille at-sc-feuille-droite" />
        <div className="at-sc-feuille at-sc-feuille-devant">
          <b>Ton projet</b>
          <span className="at-coche">Ses fonctions</span>
          <span className="at-coche">Son prix fixe</span>
          <span className="at-coche">Son délai</span>
        </div>
      </div>
    ),
  },
  {
    titre: 'La construction',
    texte: "1 à 2\u00a0mois. Chaque semaine, tu vois où on en est.",
    schema: (
      <div className="at-sc">
        <div className="at-sc-carte at-sc-tableau">
          <b>Ton application</b>
          <span className="at-sc-phase at-sc-phase-faite"><i /><span>Maquette</span><small>Validée</small></span>
          <span className="at-sc-phase at-sc-phase-encours"><i /><span>Développement</span><u><s style={{ width: '62%' }} /></u></span>
          <span className="at-sc-phase"><i /><span>Tests</span><small>À venir</small></span>
        </div>
      </div>
    ),
  },
  {
    titre: 'Le lancement',
    texte: "En ligne sur internet, ou sur l'App\u00a0Store et Google\u00a0Play. 30\u00a0jours de corrections compris.",
    schema: (
      <div className="at-sc">
        <div className="at-sc-lancement">
          <div className="at-sc-fenetre">
            <span className="at-sc-points"><i /><i /><i /></span>
            <span className="at-sc-lignes"><i /><i /></span>
          </div>
          <div className="at-sc-url"><i />ton-application.fr</div>
          {/* Une fiche de boutique d'applications, dessinée : une petite icône, deux lignes à la place du nom, et
              une coche qui se pose. Elle ne flotte pas (Noé, 25/11/2026 : pas de téléphone qui bouge). */}
          <div className="at-sc-fiche">
            <small>App Store</small>
            <span className="at-sc-fiche-ligne">
              <i className="at-sc-fiche-icone"><Rocket size={17} strokeWidth={2.3} /></i>
              <span className="at-sc-fiche-texte"><i /><i /></span>
              <b className="at-sc-fiche-ok">Obtenir</b>
            </span>
          </div>
        </div>
      </div>
    ),
  },
]

// Les quatre engagements dits à voix haute (leçons 2.15 et 2.17). Ni « garantie » ni « remboursé » : ce sont des
// engagements déjà tenus, pas une promesse de résultat.
const ENGAGEMENTS = [
  { icone: Eye, titre: 'Tu la vois avant de payer', texte: "Tu décides après l'avoir vue, pas avant." },
  { icone: FileCheck2, titre: 'Le prix est fixe et écrit', texte: 'Un ajout passe par un nouveau devis, que tu acceptes ou non.' },
  { icone: Wallet, titre: 'Tu paies en trois fois', texte: 'À chaque paiement, tu as quelque chose de plus entre les mains.' },
  { icone: KeyRound, titre: 'Elle est à toi, code compris', texte: 'Une fois payée, tu peux partir quand tu veux.' },
]

// LA FAQ DE LA PAGE TEST (25/11/2026, 21 h 45). Noé : « la FAQ d'Ikovaline est tellement mieux » : plus de questions,
// des réponses courtes, pas de cases. Dix questions. L'ORDRE : le prix, puis « mon idée n'a pas de rapport avec mon
// métier » (remontée à la demande de Noé : le titre de la page dit « ton métier », c'est le premier doute de celui
// dont l'idée est ailleurs), le délai, le support, « je n'y connais rien », « ce n'est qu'une idée », la
// concurrence, les deux comparaisons, et la suite. RÈGLES :
//   - une réponse = deux ou trois phrases, avec ses mots. Pas de « SaaS », « MVP », « abonnement », « paywall »,
//     ni « plateforme », « avatar », « solution applicative » (Noé doute lui-même que sa cible les comprenne).
//   - rien qui ne le met pas en valeur : « Et pour trouver des utilisateurs ? » reste retirée. « Et si je ne donne
//     pas suite après la proposition ? » aussi (retirée par Noé le 25/11/2026 au soir).
//   - ce que les engagements disent déjà n'est pas redit ici (« tu la vois avant de payer », le paiement en trois
//     fois, « elle est à toi »). La maquette offerte ne s'annonce pas sur le site.
//   - jamais un prix par support ; « site » ne désigne jamais une application web.
//   - « Application mobile ou application web ? » : les deux mots sont DITS (Noé, 25/11/2026 : il veut qu'on lise
//     « mobile » et « web ») et expliqués dans la même réponse par « téléphone » et « ordinateur », les mots que sa
//     cible comprend (règle 10 de documentation/context/vocabulaire-mobile-web.md).
//   - « Je conçois la tienne comme si c'était la mienne » : ses mots (« et je le mets dans la tienne », refusé).
//   - le prix : UN chiffre (« autour de 10 000 € ») et la comparaison à une agence (« autour de 30 000 € »).
//   - LA PREUVE DU MILLION (réponse sur le développeur moins cher, voulue par Noé) s'écrit comme en haut de page :
//     une application qu'il a CONÇUE, et des TÉLÉCHARGEMENTS, jamais « utilisateurs », jamais « mon application »
//     (accord de son patron du 23/11/2026).
//   - « Il construit ce que tu lui demandes » : on ne dénigre pas le développeur moins cher, on dit ce qui manque.
const QUESTIONS = [
  {
    q: 'Combien coûte une application ?',
    a: "Autour de 10 000 €, selon la taille et la complexité de ton projet. En agence, c'est plutôt autour de 30 000 €. Tu as ta fourchette dès le premier appel, et ton prix fixe dans ton devis.",
  },
  {
    q: "Mon idée n'a pas de rapport avec mon métier, c'est possible ?",
    a: "Oui. Ce qui compte, c'est que tu saches à qui elle s'adresse, et que ton budget soit prêt.",
  },
  {
    q: 'En combien de temps est-elle en ligne ?',
    a: "1 à 2 mois, selon la complexité et l'envergure de ton projet. Ton délai est écrit dans ton devis, à côté du prix.",
  },
  {
    q: 'Application mobile ou application web ?',
    a: "Une application mobile se télécharge sur téléphone. Une application web s'ouvre sur internet, sur ordinateur comme sur téléphone. Je te dis laquelle choisir dès le premier appel, selon tes futurs utilisateurs.",
  },
  {
    q: "Je n'y connais rien en technique, c'est un problème ?",
    a: "Non, c'est le cas de la plupart de mes clients. Tu m'expliques ton projet avec tes mots, et je le cadre pour en faire une application qui rapporte.",
  },
  {
    q: "Je n'ai qu'une idée, c'est trop tôt pour t'appeler ?",
    a: "Non, c'est le bon moment. Une idée suffit : à l'appel, je te donne mes conseils pour qu'elle fonctionne, et par où commencer.",
  },
  {
    q: "Et s'il existe déjà des applications comme la mienne ?",
    a: "C'est bon signe : ça prouve que des gens paient pour ça. Pas besoin d'être le seul : il te faut un avantage que les autres n'ont pas. On le cherche ensemble dès le premier appel.",
  },
  {
    q: "J'ai trouvé un développeur moins cher. Quelle différence ?",
    a: "Il construit ce que tu lui demandes. Moi, j'ai conçu une application téléchargée plus d'un million de fois\u00a0: je sais ce qui fait qu'une application rapporte, et je conçois la tienne comme si c'était la mienne.",
  },
  {
    q: 'Quelle différence avec une agence ?',
    a: "Tu parles directement à celui qui conçoit et construit ton application, sans chef de projet ni intermédiaire. Et sans le prix d'une agence.",
  },
  {
    q: 'Et après la mise en ligne ?',
    a: "Je ne disparais pas. Après les 30 jours de corrections, tu peux me demander de nouvelles fonctions quand tu veux, sur devis.",
  },
]

// Le même mécanisme que l'accueil : une section apparaît quand elle entre à l'écran.
function useApparition() {
  const ref = useRef(null)
  useEffect(() => {
    const racine = ref.current
    if (!racine) return
    const cibles = racine.querySelectorAll('.reveal, .reveal-stagger')
    if (typeof IntersectionObserver !== 'function') {
      cibles.forEach((el) => el.classList.add('visible'))
      return
    }
    const observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible')
          observateur.unobserve(entree.target)
        }
      })
    }, { threshold: 0.15 })
    cibles.forEach((el) => observateur.observe(el))
    return () => observateur.disconnect()
  }, [])
  return ref
}

// `bas` : la flèche pointe vers le bas, pour un bouton qui fait descendre dans la page (celui du haut de page mène
// au calendrier, plus bas). Sans `bas`, elle pointe à droite.
// WHATSAPP DANS LA BARRE DU HAUT (Noé, 26/11/2026) : une icône au trait, de la couleur du menu, à gauche de lui. Elle
// remplace le gros bouton vert flottant, retiré le même jour : WhatsApp reste possible pour celui qui préfère écrire,
// sans faire concurrence au calendrier. Le message est déjà écrit et finit ouvert, pour qu'il n'ait qu'à dire son idée.
// Le clic est mesuré comme les autres boutons WhatsApp du site (« Lead », une fois par visite).
// « Depuis la page : … » (Noé, 26/11/2026, vu chez Ikovaline) : Noé sait d'où vient le message, et celui qui écrit se
// rappelle à qui. L'adresse est celle de la page où il a cliqué, sur le site en ligne ; la page test compte pour
// l'accueil. « Mon idée : » reste à la fin, pour qu'il n'ait qu'à écrire la suite.
const SITE = 'https://noecalmes.fr'
function messageWhatsApp(chemin = '/') {
  const page = SITE + (chemin === '/accueiltest' ? '/' : chemin)
  return `Bonjour Noé, j'ai une idée d'application et j'aimerais en discuter avec toi.\nDepuis la page : ${page}\n\nMon idée : `
}
const lienWhatsApp = (chemin) => `https://wa.me/33658308210?text=${encodeURIComponent(messageWhatsApp(chemin))}`
const WHATSAPP_URL = lienWhatsApp('/')

function IconeWhatsApp() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

function Fleche({ className = '', bas = false }) {
  return (
    <svg className={`shrink-0 w-[18px] h-[18px] min-[360px]:w-[22px] min-[360px]:h-[22px] transition-transform duration-300 ${bas ? 'rotate-90 group-hover:translate-y-1' : 'group-hover:translate-x-1'} ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function Questions() {
  const [ouverte, setOuverte] = useState(null)
  return (
    <div className="reveal at-faq-liste">
      {QUESTIONS.map(({ q, a }, i) => (
        <details
          key={q}
          open={ouverte === i}
          onToggle={(e) => {
            if (e.target.open) setOuverte(i)
            else if (ouverte === i) setOuverte(null)
          }}
        >
          <summary>{q}<i aria-hidden="true" /></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

export default function AccueilTest() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const racine = useApparition()
  // Variante à comparer : /accueiltest?haut=nuit (le haut de page sur le bleu nuit).
  const hautNuit = new URLSearchParams(window.location.search).get('haut') === 'nuit'
  // Une page de travail : pas dans Google, et un titre d'onglet qui dit ce que c'est.
  useEffect(() => {
    const ancienTitre = document.title
    document.title = "Page test · nouvelle page d'accueil"
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    return () => {
      document.title = ancienTitre
      robots.remove()
    }
  }, [])

  const allerA = (id) => (evenement) => {
    evenement?.preventDefault()
    setMenuOuvert(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // SUR TÉLÉPHONE, les boutons descendent au TITRE du bloc de réservation (#reserver-titre), posé juste sous la
  // barre : on lit « 30 minutes avec Noé. Pas un commercial. », la phrase, puis le haut du calendrier. Avant le
  // 26/11/2026 au soir ils descendaient au calendrier lui-même (#reserver), parce que quatre lignes de texte le
  // repoussaient sous l'écran ; il n'en reste que deux, et viser le calendrier cachait le titre (vérification).
  // Sur ordinateur, tout tient : la section entière, titre compris.
  const allerAuContact = (evenement) => {
    trackBookingStep('clic', 'accueil')
    const surTelephone = window.matchMedia('(max-width: 899px)').matches
    return allerA(surTelephone ? 'reserver-titre' : 'contact')(evenement)
  }
  // Le pied de page est celui du site : ses liens rechargent la page demandée, « Contact » descend au bouton.
  const allerVers = (chemin) => {
    if (chemin === '/rendez-vous') return allerAuContact()
    window.location.assign(lienInterne(chemin))
  }
  const ouvrirLegal = (cible) => window.location.assign(lienInterne(`/${cible}`))

  return (
    <div ref={racine} className="at-page">
      {/* ========== BARRE DU HAUT (celle de l'accueil) ========== */}
      <nav className="anim-nav fixed inset-x-0 top-2.5 md:top-[18px] z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-235">
          <div className={`backdrop-blur-[12px] border border-[#70707029] shadow-[0_1px_3px_#00000017] overflow-hidden rounded-[40px] transition-[background-color] duration-300 ease-in-out ${menuOuvert ? 'bg-[#ffffffee]' : 'bg-[#fffefceb]'}`}>
            <div className="at-barre flex items-center justify-between h-[68px] px-6 md:px-7">
              <a href="#" className="flex items-center gap-3 min-w-0">
                <img src={mePhoto} alt="Noé Calmes" width="40" height="40" className="h-10 w-10 rounded-full object-cover shrink-0" />
                <span className="flex flex-col gap-[5px] min-w-0">
                  <span className="font-jakarta text-text font-extrabold text-lg md:text-1xl leading-none tracking-tight truncate">Noé Calmes</span>
                  {/* Sous le nom : « Expert en applications », choix de Noé (25/11/2026, 20 h 05 : « je fais du web
                      et du mobile, c'est mieux »). Plus court que « Expert en applications mobiles & web », et il ne
                      range pas le visiteur dans un support : la page montre les deux plus bas. L'essai
                      « Applications pensées pour rapporter » ne disait pas ce qu'il fait. Sur le site en ligne, la
                      ligne est sur toutes les pages : à changer partout le jour de la mise en ligne. */}
                  <span className="at-sous-nom text-grey text-[0.68rem] md:text-[0.75rem] leading-none font-normal truncate">Expert en applications</span>
                </span>
              </a>
              <div className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.filter((lien) => !lien.menuSeul).map(({ ancre, label }) => (
                  <a key={label} href={`#${ancre}`} onClick={allerA(ancre)} className="text-text text-[0.95rem] font-semibold hover:text-brand transition-colors">{label}</a>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {/* L'icône WhatsApp est à gauche du bouton sur ordinateur, à gauche du menu sur téléphone (Noé, 26/11/2026). */}
                <a href={WHATSAPP_URL} onClick={(evenement) => { evenement.currentTarget.href = lienWhatsApp(window.location.pathname); trackDirectWhatsAppLead('barre-du-haut') }} target="_blank" rel="noopener noreferrer" aria-label="Écrire à Noé sur WhatsApp" className="flex items-center justify-center w-10 h-10 -mr-3 sm:-mr-1 text-text hover:text-brand transition-colors">
                  <IconeWhatsApp />
                </a>
                <a href="#contact" onClick={allerAuContact} className="btn-reflet hidden sm:inline-block bg-[#0d1548] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#090f33] transition-colors cursor-pointer whitespace-nowrap">
                  J'ai une idée
                </a>
                <button type="button" onClick={() => setMenuOuvert(!menuOuvert)} aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOuvert} className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1 cursor-pointer focus:outline-none">
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 origin-center ${menuOuvert ? 'translate-y-[7px] rotate-45' : ''}`} />
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 ${menuOuvert ? 'opacity-0' : ''}`} />
                  <span className={`block h-[3px] w-6 rounded-full bg-text transition-all duration-300 origin-center ${menuOuvert ? '-translate-y-[7px] -rotate-45' : ''}`} />
                </button>
              </div>
            </div>
            <div className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out ${menuOuvert ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="border-t border-black/5 px-6 pb-5 pt-4 flex flex-col gap-3">
                  {NAV_LINKS.map(({ ancre, label }) => (
                    <a key={label} href={`#${ancre}`} onClick={allerA(ancre)} className="text-text text-base font-medium hover:text-brand transition-colors">{label}</a>
                  ))}
                  <a href="#contact" onClick={allerAuContact} className="btn-reflet sm:hidden text-center bg-[#0d1548] text-white font-medium text-sm px-5 py-2.5 rounded-full mt-1 cursor-pointer">
                    J'ai une idée
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HAUT DE PAGE ========== */}
      {/* LE HAUT DE PAGE. Le visiteur arrive le plus souvent d'une pub ou d'Instagram, sur téléphone : il doit
          comprendre tout de suite ce que Noé fait, se dire « il cible mon profil » et voir que ce n'est pas un
          simple développeur.
          LE TITRE : « Je transforme ton idée en application qui rapporte vraiment. » Choisi par Noé le 26/11/2026
          parmi trois, vus côte à côte sur téléphone (« la deuxième, parfait »). À la première personne : on sait
          ce qu'il fait. « Qui rapporte vraiment » reste, c'est ce qui le sépare d'un développeur.
          DESSOUS : « Tu connais ton métier. On en fait une nouvelle source de revenus. » C'est cette phrase qui
          cible maintenant (le professionnel installé), plus le titre. « Nouvelle source de revenus » est le mot de
          Noé : pour sa cible, qui a un métier et des contacts à qui montrer l'application, c'est son marketing.
          TITRE D'AVANT (25/11/2026) : « Fais de ton métier une application qui rapporte vraiment. », où « ton
          métier » alternait avec « ton activité ». Les styles du mot qui alterne (.at-titre-metier, .at-mot) sont
          gardés dans accueil-test.css.
          LE BOUTON DE LA BARRE DU HAUT dit « J'ai une idée » depuis le 26/11/2026 au soir (Noé), le bouton du haut de page
          disant maintenant « Réserver mon appel gratuit ». Avant, « Discuter avec Noé » : « J'ai une idée » et « J'ai une idée
          d'application » à dix centimètres l'un de l'autre, c'était deux fois le même bouton.
          Écartés le 25/11/2026 : la question seule (« pas une grosse promesse »), « Je la construis pour que tes
          utilisateurs paient chaque mois » (« un développeur dit la même chose »), « Elle mérite mieux qu'un simple
          développeur », « Tu ne veux pas une application qui existe… ».
          VARIANTE À COMPARER : /accueiltest?haut=nuit affiche ce haut de page sur le bleu nuit. */}
      <section className={`hero-bg at-hero ${hautNuit ? 'at-hero-nuit' : ''} relative min-h-screen flex items-center justify-center text-center px-3 sm:px-5 md:px-10 lg:px-16 pt-36 pb-16 sm:pt-40 md:pt-44 lg:pt-50 md:pb-24 overflow-hidden`}>
        <div className="hero-visual" aria-hidden="true" />
        <div className="hero-content anim-hero relative z-10 max-w-4xl mx-auto w-full">
          <h1 className="at-titre font-heading font-extrabold text-text tracking-tight w-full mx-auto mb-4 md:mb-6">
            <span className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans Local', 'Plus Jakarta Sans', sans-serif" }}>
              Je transforme<br />
              <span className="at-titre-metier">ton idée</span> en application<br />
              <span className="at-titre-application">qui rapporte vraiment.</span>
            </span>
          </h1>

          <p className="at-hero-sous text-grey text-[0.98rem] sm:text-[1.08rem] md:text-[1.18rem] leading-relaxed mx-auto mb-8 md:mb-10">
            Tu connais ton métier. <span className="at-hero-sous-suite">On en fait une nouvelle source de revenus.</span>
          </p>

          {/* L'ORDRE DÉPEND DE L'ÉCRAN (Noé, 26/11/2026, en vue de la vidéo où il parle face caméra) : sur téléphone,
              la vidéo, puis « Regarde la vidéo avant de réserver ton appel. », puis le bouton, pour qu'on regarde
              avant de réserver ; sur ordinateur, le bouton reste au-dessus de la vidéo (« laissé ici »), la phrase
              sous la vidéo. Le bouton n'est jamais bloqué tant que la vidéo n'est pas vue.
              LE BOUTON dit « Réserver mon appel gratuit » : « audit » ne parle pas à tout le monde (Noé), et
              « appel gratuit » dit ce qu'il réserve et ce que ça coûte. Avant : « J'ai une idée d'application ». */}
          <div className="at-hero-bas">
          <div className="at-hero-bouton flex flex-col items-center">
            <a href="#contact" onClick={allerAuContact} className="btn-reflet group inline-flex items-center gap-2 min-[360px]:gap-2.5 whitespace-nowrap bg-brand text-surface font-semibold text-[0.95rem] min-[360px]:text-[1rem] sm:text-[1.06rem] md:text-[1.15rem] px-5 min-[360px]:px-8 py-3.5 sm:px-9 md:px-11 md:py-[1.05rem] rounded-full cursor-pointer shadow-[0_10px_28px_-8px_rgba(102,93,255,0.55)] hover:bg-[#5a50f5] transition-colors">
              Réserver mon appel gratuit
              <Fleche bas />
            </a>
            {/* PAS DE CHIFFRE ICI (Noé, 26/11/2026, 11 h 39 : « le million pas ici, à côté de +20 app »). Le haut de page
                reste léger ; le million est sous « Mes réalisations », à côté de « +20 applications ». */}
          </div>

          <p className="at-hero-avant text-grey text-[0.9rem] md:text-[0.95rem]">Regarde la vidéo avant de réserver ton appel.</p>
          <div className="at-hero-film"><HeroVideo unSeulPassage /></div>
          </div>
        </div>
      </section>

      {/* ========== RÉALISATIONS ========== */}
      {/* UN SEUL BLOC de réalisations, juste après la vidéo (Noé, 25/11/2026 : « on a déjà les designs mobile et
          web, on enlève les anciens ? »). L'ancien carrousel de téléphones et le bloc « Et dans ton métier ? »
          montraient deux fois les mêmes applications : il reste UN carrousel, qui montre chaque application sur
          ordinateur ET sur téléphone, et qui défile tout seul. Le métier de chaque application est dit sous ses
          écrans. Tout ce qui est montré est RÉEL ; la maquette de coaching, qui n'est pas encore construite, porte
          la pastille « Maquette » et passe en dernier. Règles du carrousel : ExemplesMetier.jsx.
          LE TITRE : « Mes réalisations » (le mot de Noé ; il couvre aussi la maquette, ce que « déjà construit » ne
          faisait pas). Pas de sur-titre.
          « +20 applications déjà publiées », sans « App Store et Google Play » (« je fais SaaS et app mobile »), dans
          une petite case blanche arrondie.
          LES MARGES du bloc sont celles du reste du site : voir exemples-metier.css.
          CE QUI N'EST PLUS ICI : Calorie et ses 13 000 € par mois (l'application n'est plus sur les boutiques,
          leçon 2.17), le total « 1,3 million sur toutes mes applications » de l'accueil en ligne, la case « avis »
          (avec cinq avis, les afficher en haut n'est pas crédible : ils restent près du bouton, en bas) et les cases
          de chiffres.
          L'ORDRE ET LES FONDS (Noé, 26/11/2026, 01 h 09 : la carte « Ce que rapporte » va « en dessous de la section
          Pourquoi avec moi ») : réalisations, bloc sombre, puis la carte, tous sur le fond de la page ; les étapes
          suivent sur gris et les fonds alternent ensuite, une section sur deux. Le bloc sombre fait office de bande.
          LE BLOC « CE QUE RAPPORTE L'APPLICATION D'UN CLIENT » juste dessous est un APERÇU À CHIFFRES D'ESSAI (26/11/2026) :
          il ne prendra de vrais chiffres que d'une capture réelle d'un client, avec son accord. RÈGLE : seulement de
          vrais chiffres, datés. Jamais les chiffres d'un écran d'exemple présentés comme ceux d'un client. */}
      <section className="ex-section" id="realisations" aria-labelledby="at-realisations-titre">
        <div className="ex-interieur">
          <h2 id="at-realisations-titre" className="reveal ex-titre">Mes <span>réalisations</span></h2>
          {/* DEUX CHIFFRES côte à côte (Noé, 26/11/2026 : le million « à côté de +20 app »). Le million est sa preuve la
              plus forte : on la lit là où on vient vérifier ce qu'il a fait. Sur téléphone, l'un sous l'autre. Ni nom ni
              logo de la messagerie (Hush). */}
          <div className="reveal at-chiffres">
            <p className="ex-chiffre"><strong>+20</strong> applications déjà publiées</p>
            <p className="ex-chiffre ex-chiffre-fort"><strong>+1 million</strong> de téléchargements sur l'une d'elles</p>
          </div>
          <ExemplesMetier />
        </div>
      </section>

      {/* ========== POURQUOI AVEC MOI ========== */}
      {/* L'argument décidé à la leçon 2.17, face à celui qui se dit « j'ai juste besoin d'un développeur » : il déplace
          la comparaison du prix vers ce qui fait marcher une application. Les quatre exemples sont ceux de « Mon offre
          sur une page », avec les mots du client (pas « écrans qui convertissent »). La dernière ligne répond à sa
          première peur, « comment je vais trouver des utilisateurs ? » (leçon 2.3) : il connaît son métier, donc il
          connaît les premières personnes à qui la montrer. On n'écrit pas « tes clients » : il n'en a pas forcément
          (Noé, 25/11/2026). Ce n'est pas une promesse : c'est le partage des rôles. */}
      <section className="px-2.5 sm:px-4 md:px-6 pt-2 pb-10 md:pb-28" id="pourquoi-avec-moi">
        <div className="at-nuit">
          <p className="reveal at-nuit-kicker font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">Pourquoi avec moi</p>
          {/* Réécrit le 25/11/2026 (Noé : « plus convaincant », « ça paraît un peu trop texte », et sa suite : « il y
              en a très peu qui génèrent des revenus »). Deux phrases courtes qui s'opposent, puis une ligne qui mène
              aux quatre schémas : ce sont eux qui portent l'explication, plus un paragraphe. « Avec une IA » reste :
              sans ces mots, « tout le monde peut créer une application » est faux pour un visiteur qui ne code pas,
              et c'est son argument de la leçon 2.17. « Très peu rapportent » est un constat général, pas une
              promesse sur les siennes. « Chaque mois » n'y est plus : c'est dit dans le titre de la page. */}
          <h2 className="reveal at-nuit-titre font-jakarta font-extrabold tracking-tight text-center mb-4 md:mb-5">
            Avec une IA, tout le monde peut créer une application.
            <span>Très peu rapportent de l'argent.</span>
          </h2>
          <p className="reveal at-nuit-texte text-[0.95rem] md:text-[1.05rem] leading-relaxed text-center max-w-[40rem] mx-auto mb-8 md:mb-12 text-balance">
            La différence ne vient pas du code. Elle se joue à quatre moments&nbsp;:
          </p>

          {/* QUATRE MOMENTS, dans l'ordre où l'utilisateur les vit : il s'inscrit, il paie, il revient, il en amène
              d'autres. Chacun fait gagner ou perdre de l'argent, et chacun est une chose que le visiteur a déjà
              vécue lui-même dans une application. Relus avec Noé le 25/11/2026, 19 h :
              - « Des notifications » devient « Des rappels » : une application sur internet rappelle par e-mail.
              - « Un espace où tu vois ce que tu encaisses » est sorti : « un développeur peut le faire », et voir
                ses encaissements ne rapporte rien. À sa place, l'invitation : c'est elle qui amène les utilisateurs
                suivants (« faire rester, revenir, recommander », fil conducteur de la leçon 2.8).
              Relus encore à 21 h 30 : « un ami » et non « un collègue » ; le titre de l'invitation dit ce qui la
              déclenche, un AVANTAGE (« incité, avantage », Noé), et le dessin le montre (« 1 mois offert ») ; les trois
              personnes ont le même rond, plus clair que le bouton ; une cloche dans le rappel. « Une inscription
              rapide » devient « en 10 secondes » : Noé cherchait plus fort (« rapide et intelligente ? »), un chiffre
              se voit mieux qu'un adjectif.
              Ce sont des schémas dessinés, pas des captures. */}
          <ul className="reveal-stagger at-exemples">
            <li>
              <div className="at-ecran" aria-hidden="true">
                <div className="at-fragment">
                  <span className="at-champ">ton@email.fr</span>
                  <span className="at-bouton">Je m'inscris</span>
                </div>
              </div>
              <h3>Une inscription en 10&nbsp;secondes</h3>
            </li>
            <li>
              <div className="at-ecran" aria-hidden="true">
                <div className="at-fragment">
                  <span className="at-pastille">7 jours gratuits</span>
                  <span className="at-prix"><b>9,90&nbsp;€</b> par mois ensuite</span>
                  <span className="at-bouton">Essayer</span>
                </div>
              </div>
              <h3>L'offre payante au bon moment</h3>
            </li>
            <li>
              <div className="at-ecran" aria-hidden="true">
                <div className="at-notif at-notif-fond" />
                <div className="at-notif">
                  <i><Bell size={15} strokeWidth={2.4} /></i>
                  <span><b>Rappel</b>Séance à 18&nbsp;h</span>
                </div>
              </div>
              <h3>Des rappels qui font revenir l'utilisateur</h3>
            </li>
            <li>
              <div className="at-ecran" aria-hidden="true">
                <div className="at-fragment at-fragment-invite">
                  <span className="at-avatars">
                    <i><UserRound size={15} strokeWidth={2.4} /></i>
                    <i><UserRound size={15} strokeWidth={2.4} /></i>
                    <i><UserRound size={15} strokeWidth={2.4} /></i>
                  </span>
                  <span className="at-pastille">1 mois offert</span>
                  <span className="at-bouton">Inviter<span className="at-invite-long"> un ami</span></span>
                </div>
              </div>
              <h3>Un avantage pour chaque ami invité</h3>
            </li>
          </ul>

          <p className="reveal at-roles">
            <span>Toi, tu connais ton métier, et les premières personnes à qui la montrer.</span>
            <span className="at-roles-moi">Moi, je construis l'application qui les garde.</span>
          </p>
        </div>
      </section>

      {/* ========== CE QUE RAPPORTE L'APPLICATION D'UN CLIENT : APERÇU AVEC DES CHIFFRES D'ESSAI ========== */}
      {/* ⚠️ CHIFFRES D'ESSAI, PAS CEUX D'UN CLIENT VÉRIFIÉ. Noé, 26/11/2026, 01 h 03 : « pour avoir un rendu, pour
          voir à quoi ça ressemblerait, tu peux mettre les vrais chiffres de 18 450, toujours en test, pour voir ce
          que ça donnerait », nom de l'application masqué. Ce sont les chiffres de l'ancien écran d'exemple (commit
          d5cfbaa, données fictives) : la page n'a PAS la capture d'origine d'un client. Aperçu de mise en page.
          ⛔ AVANT TOUTE MISE EN LIGNE SUR L'ACCUEIL : comparer chaque nombre à la capture RÉELLE du client, avec son
          accord écrit, ou retirer le bloc (version à zéro : commit aaf4952). La page de test n'est visible qu'en
          local (import.meta.env.DEV) : rien de ce bloc n'est dans le site en ligne.
          COMME UNE IMAGE, SANS ANIMATION (Noé, 25/11/2026) : rien ne bouge, rien ne se sélectionne. Ni nom, ni
          icône lisibles : une icône et un nom floutés.
          LE TITRE est au présent (« rapporte ») : il ne sera vrai qu'avec de vrais chiffres, et le mois devra
          s'écrire si l'application ne fait plus ces montants (erreur faite avec Calorie et ses 13 000 €). */}
      <section className="pt-0 pb-14 md:pb-28 px-5" id="resultat" aria-labelledby="at-resultat-titre">
        <h2 id="at-resultat-titre" className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
          Ce que rapporte<br className="sm:hidden" /> <span className="text-brand">l'application d'un client</span>
        </h2>
        <figure className="reveal at-resultat" aria-labelledby="at-resultat-titre">
          <div className="at-resultat-carte" role="img" aria-label="Aperçu du tableau de bord d'une application, nom masqué. Revenus de décembre 2025 : 18 450 euros, en hausse de 10,8 % par rapport au mois dernier. App Store : 12 200 euros. Google Play : 6 250 euros. 2 390 abonnés, 10 300 installations, 118 700 euros sur 12 mois.">
            <div className="at-res-gauche">
              <p className="at-res-app"><i /><b>Nom masqué</b></p>
              <p className="at-res-label">Revenus du mois</p>
              <p className="at-res-montant">18&nbsp;450&nbsp;€</p>
              <p className="at-res-evol"><span>+10,8&nbsp;%</span> par rapport au mois dernier</p>
              <div className="at-res-courbe" aria-hidden="true">
                <svg viewBox="0 0 320 110" preserveAspectRatio="none" focusable="false">
                  <defs>
                    <linearGradient id="at-res-fond" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#18a572" stopOpacity=".2" />
                      <stop offset="1" stopColor="#18a572" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 30H320M0 59H320M0 88H320" stroke="#eceaf3" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
                  <path d="M8 96C96 82 190 50 302 13V110H8Z" fill="url(#at-res-fond)" />
                  <path d="M8 96C96 82 190 50 302 13" stroke="#18a572" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
                </svg>
                <i className="at-res-point" />
                <span className="at-res-bulle"><small>Déc. 2025</small>18&nbsp;450&nbsp;€</span>
              </div>
              <p className="at-res-mois" aria-hidden="true"><span>Janv.</span><span>Juin</span><span>Déc.</span></p>
            </div>
            <div className="at-res-droite">
              <ul className="at-res-boutiques">
                <li><span>App Store</span><i><i style={{ '--part': 1 }} /></i><b>12&nbsp;200&nbsp;€</b></li>
                <li><span>Google Play</span><i><i style={{ '--part': 0.51 }} /></i><b>6&nbsp;250&nbsp;€</b></li>
              </ul>
              <ul className="at-res-cases">
                <li><span>Abonnés</span><b>2&nbsp;390</b><em>+9,6&nbsp;%</em></li>
                <li><span>Installations</span><b>10&nbsp;300</b><em>+13,2&nbsp;%</em></li>
                <li><span>Sur 12&nbsp;mois</span><b>118&nbsp;700&nbsp;€</b></li>
              </ul>
            </div>
          </div>
          <p className="at-resultat-note">Nom de l'application masqué à sa demande, pour éviter la concurrence.</p>
        </figure>
      </section>

      {/* ========== COMMENT ÇA SE PASSE ========== */}
      {/* Quatre étapes, deux par deux sur ordinateur, chacune avec son schéma et sa durée (voir ETAPES).
          LE PRIX N'EST PLUS ICI (25/11/2026, 19 h 45). Noé : « le prix, peut-être le mettre en FAQ, pas au-dessus »,
          et « ce qui ne me met pas en valeur, ne pas le mettre ». Une étiquette de prix au milieu du déroulé fait
          du prix le sujet de la page. Il reste écrit à deux endroits discrets, parce qu'il trie les visiteurs sans
          budget (la plupart de ses prospects perdus) : dans « Pour qui » (« Ton budget est prêt : autour de
          10 000 € ») et dans la FAQ, avec la comparaison à une agence. Toujours UN chiffre, celui du milieu, jamais
          « à partir de » ni une fourchette (le visiteur retient le chiffre du bas), jamais un prix par support
          (règle du 05/10/2026). Les fourchettes par support se donnent au premier appel.
          LE PRIX D'UNE AGENCE : « autour de 30 000 € » (budget médian d'une application mobile en agence, fourchette
          courante 15 000 à 50 000 €, baromètre 2026 de La Fabrique du Net, plus de 100 budgets réels). Le reste du
          site dit encore « à partir de 20 000 € » : à aligner le jour de la mise en ligne.
          ⚠️ Ce prix devra changer LE MÊME JOUR dans la pub et le formulaire Meta. */}
      <section className="pt-14 pb-14 md:py-28 px-5 bg-card" id="etapes-et-tarif">
        <div className="max-w-275 mx-auto">
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
            Comment <span className="text-brand">ça marche ?</span>
          </h2>

          <ol className="reveal-stagger at-marche">
            {ETAPES.map(({ titre, texte, schema }, i) => (
              <li key={titre}>
                <div className="at-marche-tete">
                  <span className="at-marche-num">{i + 1}</span>
                  <h3>{titre}</h3>
                </div>
                <p>{texte}</p>
                <div className="at-dessin" aria-hidden="true">{schema}</div>
              </li>
            ))}
          </ol>

          <div className="reveal flex flex-col items-center mt-10 md:mt-14">
            <a href="#contact" onClick={allerAuContact} className="btn-reflet group inline-flex items-center gap-2 min-[360px]:gap-2.5 whitespace-nowrap bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-5 min-[360px]:px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer">
              {/* Même texte et même flèche que le bouton du haut de page : les deux boutons violets font la même
                  chose (vérification du 26/11/2026 ; avant, « Discuter avec Noé », l'ancien texte de la barre). */}
              Réserver mon appel gratuit
              <Fleche bas />
            </a>
          </div>
        </div>
      </section>

      {/* ========== CE À QUOI JE M'ENGAGE ========== */}
      {/* Sa peur est de payer et de ne rien avoir (leçon 2.3). Les quatre engagements existent déjà dans le devis et les
          conditions de vente : il manquait de les dire. C'est ICI, et seulement ici, que la page dit « tu la vois
          avant de payer ». La phrase « Je ne te promets pas un nombre d'utilisateurs… » est retirée (Noé,
          25/11/2026 : « ça me rabaisse »). La règle ne change pas pour autant : la page ne promet aucun résultat. */}
      <section className="py-14 md:py-28 px-5" id="engagements">
        <div className="max-w-275 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">Mes engagements</p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14 text-balance">
            Tu sais où <span className="text-brand">tu mets les pieds</span>
          </h2>
          <ul className="reveal-stagger at-engagements">
            {ENGAGEMENTS.map(({ icone, titre, texte }) => (
              <li key={titre}>
                <span className="at-engagement-icone" aria-hidden="true">{createElement(icone, { size: 20, strokeWidth: 2 })}</span>
                <span className="at-engagement-texte">
                  <strong>{titre}</strong>
                  {texte}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== ON EST FAITS POUR TRAVAILLER ENSEMBLE ? ========== */}
      {/* Les trois « oui » et les trois « non » du brouillon de la liste « Offre - À changer après validation ». Le
          budget est la ligne rouge (leçon 2.13), pas le réseau ni le métier : celui dont l'idée ne touche pas son
          métier n'est pas dans les « non ». Le premier « oui » dit le vrai critère : il connaît les gens à qui son
          application s'adresse (Noé, 25/11/2026 : on ne suppose pas qu'il a déjà des clients). */}
      <section className="pt-14 pb-14 md:py-28 px-5 bg-card" id="pour-qui">
        <div className="max-w-240 mx-auto">
          <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">Pour qui</p>
          <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
            On est faits pour <span className="text-brand">travailler ensemble ?</span>
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-surface border border-brand/25 rounded-[18px] p-6 md:p-8">
              <p className="text-brand font-bold text-[1.05rem] mb-5">Oui, si…</p>
              <ul className="space-y-4">
                {[
                  "Tu as une idée d'application, et tu connais les gens à qui elle s'adresse.",
                  'Ton budget est prêt : autour de 10\u00a0000\u00a0€.',
                  "Tu veux un résultat, sans t'occuper de la technique.",
                ].map((ligne) => (
                  <li key={ligne} className="flex items-start gap-3 text-text text-[0.95rem] font-medium leading-relaxed">
                    <svg className="shrink-0 mt-0.5 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    {ligne}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-card-border rounded-[18px] p-6 md:p-8">
              <p className="text-grey font-bold text-[1.05rem] mb-5">Non, si…</p>
              <ul className="space-y-4">
                {[
                  'Tu cherches le prix le plus bas.',
                  "Ton budget n'est pas encore prêt.",
                  'Tu veux juste un développeur qui exécute tes consignes.',
                ].map((ligne) => (
                  <li key={ligne} className="flex items-start gap-3 text-grey text-[0.95rem] font-medium leading-relaxed">
                    <svg className="shrink-0 mt-0.5 text-red-text" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    {ligne}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PARLONS DE TON PROJET ========== */}
      {/* La pastille dit la vraie règle (un seul nouveau projet par mois, leçon 2.11), sans compte à rebours ni « place
          disponible » calculée : on ne dit jamais qu'une place est prise ou libre si ce n'est pas vrai.
          LA PRISE DE RENDEZ-VOUS (26/11/2026) remplace le bouton WhatsApp : le calendrier Cal.com de l'appel de
          30 minutes, directement ; les questions sont posées par Cal.com, après le choix du créneau
          (ReserverAppel.jsx). La réservation et le clic WhatsApp sont mesurés (Meta, depuis le 26/11/2026 au soir) ; aucune fiche ne part à Nowork : seule la
          réservation arrive chez Noé, par Calendly. */}
      <section className="py-16 md:py-28 px-5" id="contact">
        <div className="max-w-275 mx-auto text-center">
          {/* Le titre est la question de la leçon 2.10 (« une question plutôt qu'un reproche : c'est lui qui fait le
              calcul »), le seul levier d'urgence honnête. La phrase du dessous a été refaite deux fois le 25/11/2026 :
              « Dans quelques semaines, tu peux dire voilà mon application » (« c'est nul », Noé), puis « Tu y crois,
              mais tu ne sais pas par où commencer » (« ça fait enfant ») : on ne dit pas à un professionnel installé
              qu'il est perdu. Celle-ci parle d'adulte à adulte et finit le calcul que le titre lui fait commencer :
              une idée, tant qu'elle n'existe pas, ne rapporte rien. C'est un fait, pas une promesse sur son
              application. Titre d'avant, à remettre si Noé le préfère : « Parlons de ton projet ». */}
          {/* Les retours à la ligne sont posés à la main (Noé, 25/11/2026 : « ça fait bizarre ») : chaque ligne finit
              là où la phrase respire, jamais au milieu de « elle ne te / rapporte rien ». */}
          {/* LE TITRE DIT QUI EST AU BOUT DU FIL (Noé, 26/11/2026, tard : « 30 min avec Noé. Pas un commercial », sur le
              modèle d'Ikovaline). Il remplace « Depuis combien de temps tu as cette idée ? », que Noé ne comprenait plus
              une fois sa chute retirée (« Tant qu'elle reste une idée, elle ne te rapporte rien »), et « Réserve ton
              appel stratégique », qui répétait le nom affiché par le calendrier. DESSOUS : « Je prends un seul nouveau
              projet par mois. Réserve ton appel. » Retirée une heure par Claude (la rareté avant un appel gratuit),
              remise par Noé : « c'était bien ». Elle finit par « Réserve ton appel : », avec les deux-points (Noé) : la phrase mène au
              calendrier, juste dessous. */}
          <h2 id="reserver-titre" className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-0 scroll-mt-28">
            30&nbsp;minutes avec Noé.<br />
            <span className="text-brand">Pas un commercial.</span>
          </h2>
          <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-140 mx-auto mt-3 md:mt-4 text-balance">
            Je prends un seul nouveau projet par mois. Réserve ton appel&nbsp;:
          </p>
          <div className="reveal">
            <ReserverAppel />
          </div>

          <div id="avis-clients" className="mt-14 md:mt-28 pt-14 md:pt-28 border-t border-card-border scroll-mt-24">
            <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase text-center mb-3">Avis clients</p>
            <h3 className="reveal font-jakarta text-text text-xl md:text-[1.6rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
              Ce que disent <span className="text-brand">mes clients</span>
            </h3>
            <div className="reveal">
              {/* L'ORDRE (Noé, 26/11/2026 : « on met Trustpilot, et après les captures ; tu mettrais pas l'inverse, avec du
                  texte entre ? ») : Trustpilot d'abord, car c'est la seule preuve qu'un inconnu peut vérifier ; les messages
                  WhatsApp ensuite, plus personnels. Une ligne entre les deux, pour qu'on comprenne que ce sont deux
                  sortes d'avis. Ordre d'avant, à remettre si Noé le préfère : les captures d'abord. */}
              <AvisClients texteEntre="Et ce qu'ils m'écrivent directement, sur WhatsApp." />
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUESTIONS FRÉQUENTES ========== */}
      {/* Refaite le 25/11/2026 sur le modèle d'Ikovaline (Noé : « tellement mieux ») : pas de sur-titre, pas de cases.
          Le titre à gauche, la liste à droite sur ordinateur ; l'un sous l'autre sur téléphone. Des lignes séparées
          par un trait fin, un « + » qui tourne en croix. Toutes fermées à l'arrivée, une seule ouverte à la fois.
          Pas de trait au-dessus de la première question. « Une autre question ? Écris-moi sur WhatsApp. » est
          RETIRÉE (Noé, 25/11/2026 : « ça va ramener des touristes ») : on écrit à Noé par le bouton du bas, pas ici. */}
      <section className="py-14 md:py-28 px-5 bg-card" id="faq">
        <div className="at-faq">
          <h2 className="reveal at-faq-titre font-jakarta text-text font-extrabold tracking-tight">
            Tes questions,<br /><span className="text-brand">mes réponses</span>
          </h2>
          <Questions />
        </div>
      </section>

      {/* ========== INSTAGRAM (inchangé) ========== */}
      <section className="py-16 md:py-28 px-5" id="instagram">
        <div className="max-w-275 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-14 items-center">
            <div className="reveal text-center md:text-left">
              <p className="text-brand font-semibold text-[0.78rem] tracking-widest uppercase mb-3">Instagram</p>
              <h2 className="font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-4">
                Je décortique tout ça <span className="text-brand whitespace-nowrap">sur mon Insta</span>
              </h2>
              <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed mb-8">
                Comment une application rapporte, combien coûte un vrai projet, pourquoi 90&nbsp;% des apps ne gagnent rien.
              </p>
              <a href="https://www.instagram.com/noecalmes.app/" target="_blank" rel="noopener noreferrer" className="btn-reflet group inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] md:text-base px-8 py-3.5 md:px-10 md:py-4 rounded-full cursor-pointer">
                <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                <span>Voir mon Instagram</span>
              </a>
            </div>
            <div className="reveal flex justify-center md:justify-end">
              <div className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-card-border bg-white" style={{ aspectRatio: '1 / 1.16' }}>
                <iframe src="https://www.instagram.com/p/DZS67wXiPRM/embed" title="Post Instagram de Noé Calmes" className="w-full h-full block" scrolling="no" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AUDIT (inchangé) ========== */}
      <section className="py-14 md:py-20 px-5 bg-card" id="audit">
        <div className="reveal max-w-150 mx-auto text-center">
          <p className="font-jakarta text-text font-extrabold text-[1.15rem] md:text-[1.3rem] tracking-tight leading-tight mb-2">Pas encore prêt à écrire&nbsp;?</p>
          <p className="text-grey text-[0.92rem] md:text-[0.98rem] leading-relaxed mb-5">Teste ton idée&nbsp;: potentiel, budget et délai, en 2&nbsp;minutes.</p>
          <a href={lienInterne('/audit-app')} className="group inline-flex items-center gap-2 font-semibold text-brand text-[0.92rem] md:text-[0.95rem] border border-brand/35 rounded-full px-6 py-3 hover:bg-brand/5 transition-colors">
            Tester mon idée
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      <Footer allerVers={allerVers} onLegal={ouvrirLegal} />
      {/* PAS DE BOUTON WHATSAPP FLOTTANT ICI (Noé, 26/11/2026) : il faisait concurrence au calendrier. WhatsApp
          reste accessible par l'icône discrète de la barre du haut (IconeWhatsApp). */}
    </div>
  )
}
