// LE SOMMAIRE DE `/documents`.
//
// POURQUOI UNE PAGE ET PAS UNE REDIRECTION. `/documents` est l'adresse
// générique : celle qu'on retient, qu'on tape de mémoire, qu'on donne au
// téléphone. La faire sauter directement sur les accès d'un projet
// d'application mobile la rendrait fausse le jour où une deuxième famille de
// documents existe — et il faudrait alors reprendre tous les liens déjà
// donnés. Le sommaire coûte un clic ; il rend l'adresse générique durable.
//
// DEUX FAMILLES DEPUIS LE 4 SEPTEMBRE 2026 : les projets d'application mobile,
// et les sites web seuls. Elles ne partagent qu'un document, le nom de domaine,
// et encore : pas le même PDF — celui du mobile justifie l'achat par la licence
// Apple et fait créer une adresse e-mail qu'Apple exige, deux choses qui ne
// veulent rien dire pour un site vitrine.

import NavDocuments from './NavDocuments.jsx'
import { ROUTE_APP_MOBILE, ROUTE_APP_WEB } from './routesDocuments.js'
import { lienInterne } from './seo.js'

/** Les familles de documents. `route` est l'adresse canonique de chacune. */
const FAMILLES = [
  {
    id: 'app-mobile',
    route: ROUTE_APP_MOBILE,
    titre: "Création d'application mobile",
    // QUATRE CARTES DERRIÈRE, PLUS TROIS. Le nom de domaine s'est ajouté à la
    // liste et le sommaire annonçait encore « trois accès » : le compte n'y
    // était plus, et un domaine ne s'accorde pas, il s'achète. On le nomme
    // donc à part, ce qui dit au passage par quoi commencer.
    soustitre: 'Le nom de domaine et les accès à créer avant le développement.',
    // Un téléphone, pas un logo de marque : la famille couvre Firebase, Google
    // et Apple à la fois, aucun des trois ne peut la représenter seul.
    icone: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
      </svg>
    ),
  },
  {
    id: 'app-web',
    route: ROUTE_APP_WEB,
    titre: 'Création de site web',
    // ON DIT CE QUI EST BLOQUÉ, pas ce qu'il y a dedans. « Un document » ne
    // donne aucune raison de cliquer ; « je ne peux pas publier sans » en donne
    // une, et c'est vrai.
    soustitre: 'Le nom de domaine, sans lequel le site ne peut pas être publié.',
    // Un globe : la famille ne parle que du site et de son adresse.
    icone: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
      </svg>
    ),
  },
]

function CarteFamille({ famille, onOuvrir }) {
  return (
    // UN VRAI LIEN, pas un bouton : cette carte porte une adresse qu'on veut
    // pouvoir ouvrir dans un nouvel onglet ou copier. Le `onClick` fait la
    // navigation interne sans rechargement, le `href` garde le reste.
    <a
      href={lienInterne(famille.route)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onOuvrir()
      }}
      className="group bg-white border border-[#e8e8e8] rounded-[18px] p-5 md:p-6 flex flex-col text-left h-full hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(102,93,255,0.10)] transition-all duration-200 w-full"
    >
      <div className="flex items-start justify-between gap-4 w-full mb-5">
        <div className="min-w-0">
          <h2 className="font-heading text-text text-[1rem] font-bold leading-snug">
            {famille.titre}
          </h2>
          <p className="text-grey text-[0.82rem] leading-snug mt-1">{famille.soustitre}</p>
        </div>
        <span className="w-12 h-12 shrink-0 rounded-[14px] bg-card border border-card-border flex items-center justify-center text-brand">
          {famille.icone}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-brand text-[0.85rem] font-semibold group-hover:gap-2.5 transition-all duration-200">
        Voir
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </a>
  )
}

function DocumentsIndex({ onOuvrirFamille }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <NavDocuments />

      {/* Mêmes marges et même gabarit que la page des accès en dessous : les
          deux écrans se suivent, un décalage de titre se verrait au clic. */}
      <div className="px-5 md:px-8 lg:px-11 pt-14 pb-9 max-w-4xl mx-auto">
        <h1 className="font-heading text-text text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Vos documents
        </h1>
        <p className="text-grey text-[1rem] leading-relaxed max-w-xl">
          Les guides et les accès de votre projet, rangés par sujet.
        </p>
      </div>

      <div className="px-5 md:px-8 lg:px-11 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FAMILLES.map((famille) => (
            <CarteFamille key={famille.id} famille={famille} onOuvrir={() => onOuvrirFamille(famille.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocumentsIndex
