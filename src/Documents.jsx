import NavDocuments from './NavDocuments.jsx'
import { ICONES, IconeMarque } from './iconesDocument.jsx'
import { ROUTE_APP_MOBILE, routeGuide } from './routesDocuments.js'

// L'adresse à inviter sur les comptes du client (Firebase, Play Console,
// Apple Developer). Affichée SUR LA PAGE et copiable, pas seulement écrite
// dans le PDF : une adresse dans un PDF ne se copie pas au doigt sur mobile,
// et une adresse retapée à la main finit par avoir une faute.
export const EMAIL_A_INVITER = 'noecalmes.pro@gmail.com'

const nomDeDomainePdf = '/assets/documents/guides/Achat nom de domaine.pdf'
const ajoutMembrePdf = '/assets/documents/guides/Ajout_Membre_Firebase.pdf'
const googlePlayPdf = '/assets/documents/guides/Création Compte Google Play Console.pdf'
const appleDevPdf = '/assets/documents/guides/Création compte Apple Développeur.pdf'

// DANS `guides/` COMME LES AUTRES, ET C'EST UNE CORRECTION. La page servait
// `/assets/documents/document.pdf`, une copie figée en mars. Le document a été
// refait depuis (trois pages, refonte complète) et seule la version de
// `guides/` a suivi : le client qui ouvrait « Flutter & Firebase » depuis le
// site tombait donc sur l'ancienne, pendant que le lien collé dans les
// diapositives du devis pointait la même adresse. Un seul fichier, celui que
// l'on tient à jour.
const flutterFirebasePdf = '/assets/documents/guides/Doc Expliquatif Flutter,Firebase.pdf'

// FLUTTER & FIREBASE N'EST PAS DANS LA LISTE, volontairement. C'est un
// document d'EXPLICATION, dont le lien est collé dans les diapositives du
// devis : `https://noecalmes.fr/documents/app-mobile/flutter-firebase`, son
// ancienne adresse `/documents/flutter-firebase` restant servie. Sa route est
// donc bien là, mais l'afficher ici diluerait la page — elle ne doit contenir
// que ce qui est À FAIRE.
const EXPLICATIONS = [
  {
    id: 'flutter-firebase',
    route: routeGuide('flutter-firebase'),
    anciennesRoutes: ['/documents/flutter-firebase'],
    title: 'Flutter & Firebase',
    pdf: flutterFirebasePdf,
    icone: ICONES.firebase,
  },
]

/** Les comptes à créer avant que le développement puisse commencer. */
const A_FAIRE = [
  {
    // ⚠️ EN PREMIER, ET CE N'EST PAS UN CHOIX D'ORDRE. Le compte Apple
    // Developer réclame un site web au nom de la société ET une adresse e-mail
    // à ce domaine : un client qui commence par Apple se fait arrêter au
    // milieu du formulaire le plus long des quatre, et repart acheter un
    // domaine qu'il aurait pu prendre en dix minutes le premier jour.
    //
    // « NOM DE DOMAINE », PAS « ACHAT DU NOM DE DOMAINE ». Les autres cartes
    // nomment la chose, pas le geste ; et le mot « achat » en tête de la
    // première carte fait passer la page entière pour une note de frais.
    //
    // « + E-MAIL PRO » DANS LE TITRE : l'adresse professionnelle vient du même
    // achat, et c'est la deuxième chose qu'Apple réclame. Sans elle dans le
    // titre, le client croyait avoir fini en achetant le domaine.
    id: 'nom-de-domaine',
    route: routeGuide('nom-de-domaine'),
    title: 'Nom de domaine + e-mail pro',
    soustitre: 'Exigés pour publier sur l’App Store',
    pdf: nomDeDomainePdf,
    icone: ICONES.domaine,
    // Pas d'`emailAInviter` : il n'y a personne à inviter sur un domaine. La
    // barre du guide n'affiche donc pas d'adresse à copier — elle n'aurait
    // rien à faire là, et on ne met pas un bouton pour l'équilibre.
  },
  {
    id: 'new-membre',
    route: routeGuide('new-membre'),
    anciennesRoutes: ['/new-membre'],
    // UN PROJET, PAS UN COMPTE. Le compte, c'est le compte Google que le
    // client a déjà ; Firebase ne demande que de créer un projet dedans.
    // « Création compte » laissait croire à une inscription de plus.
    // « SANS ABONNEMENT », PAS « GRATUIT ». Le guide juste derrière demande une
    // carte bancaire et explique qu'on paie à l'usage : promettre « gratuit »
    // sur la carte, c'est se faire démentir au clic suivant. Ce qui est vrai
    // et rassurant, c'est l'absence de mensualité.
    title: 'Projet Firebase',
    soustitre: 'Le serveur de l’application. Sans abonnement.',
    pdf: ajoutMembrePdf,
    icone: ICONES.firebase,
    emailAInviter: EMAIL_A_INVITER,
  },
  {
    id: 'google-play-console',
    route: routeGuide('google-play-console'),
    anciennesRoutes: ['/google-play-console'],
    // LE NOM COMPLET PORTE LA DISTINCTION. « Création compte Google » faisait
    // dire « j'en ai déjà un » et sauter l'étape ; « Google Play Console » ne
    // se confond avec rien. Le nom exact suffit, une phrase pour expliquer
    // qu'il ne s'agit pas du même compte serait le doute qu'on veut éviter.
    title: 'Compte Google Play Console',
    soustitre: 'Pour publier sur Android',
    pdf: googlePlayPdf,
    icone: ICONES.android,
    emailAInviter: EMAIL_A_INVITER,
  },
  {
    id: 'apple-developer',
    route: routeGuide('apple-developer'),
    anciennesRoutes: ['/apple-developer'],
    // Même piège, en pire : tout le monde a un compte Apple. « Developer » est
    // le mot qui dit que ce n'est pas celui-là — un abonnement annuel par
    // dessus, sans lequel rien ne sort sur l'App Store.
    title: 'Compte Apple Developer',
    soustitre: 'Pour publier sur iPhone',
    pdf: appleDevPdf,
    icone: ICONES.apple,
    // L'ADRESSE MANQUAIT SUR CETTE PAGE, et c'est celle des trois où elle est
    // le plus difficile à retrouver : le guide renvoie l'étape d'invitation à
    // une capture d'écran, donc rien dans le texte ne la donne. Affichée dans
    // la barre, copiable au doigt, elle ne dépend plus d'une image.
    emailAInviter: EMAIL_A_INVITER,
  },
]

function DocumentCard({ doc, onClick }) {
  return (
    // PLUS DE MARGE INTÉRIEURE SUR GRAND ÉCRAN. À 20 px partout, le texte
    // touchait presque le bord et la carte se lisait comme un bloc serré. Sur
    // mobile la carte occupe déjà toute la largeur : lui reprendre de la place
    // au profit du blanc rendrait les titres plus étroits pour rien.
    <button
      onClick={onClick}
      className="group bg-white border border-[#e8e8e8] rounded-[18px] p-5 md:p-6 flex flex-col text-left h-full hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(102,93,255,0.10)] transition-all duration-200 cursor-pointer w-full"
    >
      {/* LE LOGO À DROITE, LE TEXTE À GAUCHE. Centré, il poussait le titre
          vers le bas et les trois cartes ne s'alignaient pas entre elles : un
          logo large et un logo étroit ne réservent pas la même hauteur. À
          droite, il ne pèse plus sur la mise en page, le titre commence
          toujours au même endroit.
          Les SVG sont recadrés sur leur dessin (cf. `iconesDocument.js`), ils
          remplissent donc ce carré à l'identique. */}
      <div className="flex items-start justify-between gap-4 w-full mb-5">
        <div className="min-w-0">
          <h3 className="font-heading text-text text-[1rem] font-bold leading-snug">
            {doc.title}
          </h3>
          {doc.soustitre && (
            <p className="text-grey text-[0.82rem] leading-snug mt-1">{doc.soustitre}</p>
          )}
        </div>
        <span className="w-12 h-12 shrink-0 rounded-[14px] bg-card border border-card-border flex items-center justify-center">
          <IconeMarque icone={doc.icone} taille={27} />
        </span>
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-brand text-[0.85rem] font-semibold group-hover:gap-2.5 transition-all duration-200">
        Ouvrir
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  )
}

// Pas de `onBack` : le retour vers le site passe par le nom « Noé Calmes » de
// la barre, qui est un vrai lien vers `/`. Le prop existait sans être utilisé.
function Documents({ onOpenDocument }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header sticky */}
      <NavDocuments />

      {/* LE CHRONO PORTE L'URGENCE, la phrase porte la raison. Un titre seul
          se lit comme une rubrique ; avec le pictogramme, il se lit comme une
          échéance. Et la phrase dit ce qui est BLOQUÉ tant que ce n'est pas
          fait — c'est ça qui fait agir, pas un paragraphe d'explication. */}
      {/* Même marge latérale que la barre au-dessus : le titre s'aligne
          verticalement avec le nom, sinon les deux blocs semblent décalés
          tant que l'écran n'est pas assez large pour que `max-w-4xl` morde. */}
      <div className="px-5 md:px-8 lg:px-11 pt-14 pb-9 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wash text-brand shrink-0">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2" />
              <path d="M9 2h6" />
            </svg>
          </span>
          <h1 className="font-heading text-text text-3xl md:text-4xl font-extrabold tracking-tight">
            À faire maintenant
          </h1>
        </div>
        {/* DIRE « OBLIGATOIRE », ET DIRE À QUI ILS APPARTIENNENT. Sans ces
            accès, le développement ne peut pas commencer : ce n'est pas de
            l'administratif qu'on repousse. Et ils restent au client — c'est ce
            qui justifie qu'il les crée lui-même plutôt que Noé à sa place. */}
        {/* TROIS PHRASES, PAS DAVANTAGE. La version longue expliquait aussi que
            « c'est sur eux que l'application sera publiée » : vrai, mais
            personne n'en avait besoin pour agir, et chaque ligne de plus
            repousse les cartes sous la ligne de flottaison.
            On ne dit plus « ces trois accès » : un domaine n'est pas un accès,
            il s'achète. Et on donne l'ORDRE, parce que le nom de domaine
            débloque le compte Apple — un client qui commence par Apple se fait
            arrêter au milieu du formulaire. */}
        <p className="text-grey text-[1rem] leading-relaxed max-w-xl">
          <strong className="text-text font-semibold">Obligatoire avant de commencer le développement.</strong>{' '}
          Ces quatre éléments sont à votre nom.{' '}
          <strong className="text-text font-semibold">Commencez par le nom de domaine</strong> : la licence
          Apple l&apos;exige.
        </p>
      </div>

      <div className="px-5 md:px-8 lg:px-11 pb-24 max-w-4xl mx-auto">
        {/* DEUX PAR DEUX, PAS QUATRE DE FRONT. Sur quatre colonnes dans cette
            largeur, « Compte Google Play Console » tombait sur quatre lignes
            et les sous-titres sur cinq : la rangée disait bien l'ordre, mais
            plus rien ne se lisait. Trois colonnes plus une orpheline en
            dessous, non plus. À deux, les cartes gardent la largeur pour
            laquelle elles ont été dessinées, et l'ordre reste évident. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {A_FAIRE.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onClick={() => onOpenDocument(doc)} />
          ))}
        </div>

        {/* APRÈS LES CARTES, PAS AVANT. C'est un conseil, pas une condition :
            placé au-dessus il ressemblerait à un prérequis de plus et
            retarderait le clic. Ici, il ne se lit qu'au moment où le client
            choisit son moment.
            Et ce n'est pas une carte de plus : ni bouton, ni logo, ni ombre
            au survol — sinon on croit qu'il y a une étape supplémentaire. */}
        <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-brand-pale bg-brand-wash px-4 py-3.5">
          <span className="text-brand shrink-0 mt-[1px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </span>
          {/* NE PAS DÉCRIRE L'EFFORT. La première version parlait de
              « formulaires longs » et de carte bancaire : c'était vrai, mais
              ça donnait surtout une bonne raison de remettre à plus tard. Un
              conseil ne doit pas peser plus lourd que la chose conseillée —
              on dit ce qu'on y gagne, pas ce que ça coûte. */}
          <p className="text-[0.82rem] leading-relaxed">
            <span className="text-text font-semibold">Le plus simple : le faire depuis un ordinateur.</span>{' '}
            <span className="text-grey">C&apos;est plus rapide au clavier, et tout reste sous les yeux.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// `DOCUMENTS` reste exporté avec TOUT : c'est lui que le routeur parcourt
// pour retrouver un document par son adresse, y compris le document
// d'explication `flutter-firebase` absent de la page.
const DOCUMENTS = [...A_FAIRE, ...EXPLICATIONS]

export { DOCUMENTS }
export default Documents
