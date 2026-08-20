// Pages SEO autonomes : /expertise, /creation-application-mobile, /faq.
//
// POURQUOI CES PAGES EXISTENT (20/08/2026)
//
// Ces trois URLs etaient dans le sitemap depuis des mois, mais elles ne
// servaient PAS de page : elles rendaient la page d'accueil entiere puis
// faisaient defiler jusqu'a une section. Verifie en direct sur `/expertise/` :
// 599 mots strictement identiques a la home, seuls le title et la description
// changeaient. Pour Google c'est du contenu duplique : il choisit une URL,
// ignore les autres, et aucune ne se positionne sur son propre sujet.
//
// Elles ont maintenant un contenu unique, un seul <h1>, un maillage sortant et
// leurs propres donnees structurees. La navigation de la home continue de
// faire defiler vers ses sections, mais via une ancre (`/#offre`) et non plus
// en poussant ces URLs : le visuel de la landing est inchange.

import { useEffect } from 'react'
import { lienInterne, appliquerMeta, retirerPrerender } from './seo.js'
import { ResumerAvecIA, RetourEnHaut } from './BlogUI.jsx'

const mePhoto = '/assets/images/profile/me.webp'

// Les 3 premieres alimentent aussi l'accordeon de la home (App.jsx en prend
// un slice), pour qu'il n'existe qu'une seule liste de questions.
export const FAQ_ITEMS = [
  {
    q: 'Comment fonctionne la tarification ?',
    a: "Tarif fixe, défini avant de commencer : en général 5 à 12k en mobile selon la complexité. Pas de compteur qui tourne, tu sais exactement ce que tu paies. Et tu vois une maquette de ton application avant de décider quoi que ce soit.",
  },
  {
    q: 'Combien de temps faut-il pour avoir une application mobile ?',
    a: "Une première version en 4 à 6 semaines en moyenne. Pour une application complète, le délai dépend du périmètre, on le cale ensemble.",
  },
  {
    q: "Après la livraison de l'application ?",
    a: "Je disparais pas après la mise en ligne : corrections, mises à jour, évolutions, accompagnement, je reste dispo. On définit ensemble ce qui est nécessaire selon comment ton app évolue.",
  },
  {
    q: "Est-ce que mon application va vraiment générer des revenus ?",
    a: "Aucun sérieux ne peut te le garantir, et méfie-toi de qui le promet. Ce que je peux faire, c'est concevoir ton application pour qu'elle en ait la capacité : un modèle économique décidé avant la première ligne de code, un moment de valeur atteint vite, et une offre placée là où elle a du sens. C'est exactement ce qui sépare une application à zéro euro d'une application qui rapporte. Une application que j'ai conçue génère environ 13 000 € par mois.",
  },
  {
    q: "Quelle différence avec une agence ?",
    a: "Une agence te livre une application sur les stores et passe au projet suivant. Tu parles à un chef de projet, rarement à la personne qui conçoit. Chez moi il n'y a qu'un interlocuteur, joignable directement 6j/7, un tarif fixe posé à l'avance, et une application pensée pour générer des revenus plutôt que simplement livrée.",
  },
  {
    q: "Je peux créer mon application avec une IA, non ?",
    a: "Tu peux générer du code avec une IA, je m'en sers moi-même. Mais l'IA écrit ce que tu lui demandes, elle ne te dira jamais que tu lui demandes la mauvaise chose. Elle ne décide pas ce qui est payant, où placer l'offre, à quel prix, ni pourquoi quelqu'un reviendrait demain. Résultat courant : une application qui existe, qui compile, et qui ne rapporte rien.",
  },
  {
    q: "Tu reprends une application déjà développée ?",
    a: "Oui, c'est un cas fréquent : une application instable, abandonnée par un prestataire, ou dont le code est devenu impossible à faire évoluer. On commence par un audit technique, on stabilise, puis on repart sur de bonnes bases sans tout jeter quand ce n'est pas nécessaire.",
  },
  {
    q: "Sur quelles plateformes tu développes ?",
    a: "iOS et Android, avec une seule base de code. Ton application est publiée sur l'App Store et sur Google Play, et je m'occupe de la mise en ligne, des fiches et des allers-retours de validation avec les stores.",
  },
  {
    q: "Il me faut quoi avant de te contacter ?",
    a: "Une idée et à qui elle s'adresse, ça suffit pour commencer. Tu n'as besoin ni de cahier des charges, ni de maquette, ni de vocabulaire technique. Si tu veux arriver avec une première lecture du potentiel, du budget et du délai, fais l'audit gratuit, il prend deux minutes.",
  },
  {
    q: "Tu travailles à distance ou sur place ?",
    a: "À distance partout en France, et en direct sur Toulouse et l'Occitanie. Le suivi se fait sur WhatsApp, c'est moi qui réponds, pas un intermédiaire.",
  },
]

// ─── Briques partagees ───────────────────────────────────────────────────────

function EnteteSeo({ onAccueil, onBookCall }) {
  return (
    <nav className="fixed inset-x-0 top-2.5 md:top-4.5 z-50 flex justify-center px-4 md:px-6">
      <div className="w-full max-w-230">
        <div className="backdrop-blur-md border border-[#70707029] shadow-[0_1px_3px_#00000017] rounded-[40px] bg-[#fffefc3d]">
          <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-5 md:px-7">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onAccueil() }}
              className="flex items-center gap-3 text-left cursor-pointer min-w-0"
            >
              <img src={mePhoto} alt="Noé Calmes" width="44" height="44" className="h-11 w-11 rounded-full object-cover shrink-0" />
              <span className="flex flex-col min-w-0">
                <span className="text-text font-bold text-lg md:text-1xl leading-tight tracking-tight truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Noé Calmes
                </span>
                <span className="text-grey text-xs md:text-md leading-tight font-normal truncate">
                  Expert en applications mobiles
                </span>
              </span>
            </a>
            <button
              onClick={onBookCall}
              className="hidden sm:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer"
            >
              Discuter avec Noé
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Fil d'Ariane visible. Il double le BreadcrumbList en JSON-LD et donne surtout
// un lien remontant vers l'accueil sur chaque page.
function FilAriane({ courant, onAccueil }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[0.82rem] text-grey mb-5">
      <a href="/" onClick={(e) => { e.preventDefault(); onAccueil() }} className="text-brand hover:underline">Accueil</a>
      <span className="mx-2">/</span>
      <span>{courant}</span>
    </nav>
  )
}

function BlocAudit({ onAuditApp, onBookCall, titre, texte }) {
  return (
    <div className="mt-14 p-7 md:p-8 bg-card border border-card-border rounded-[15px] text-center">
      <h2 className="font-heading text-text text-lg md:text-xl font-bold mb-3">{titre}</h2>
      <p className="text-grey text-[0.93rem] mb-5 max-w-130 mx-auto">{texte}</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <button
          onClick={onAuditApp}
          className="inline-flex justify-center items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] px-7 py-3.5 rounded-full cursor-pointer"
        >
          Faire l'audit gratuit
        </button>
        <button
          onClick={onBookCall}
          className="inline-flex justify-center items-center gap-2.5 bg-[#ececf0] text-text font-semibold text-[0.95rem] px-7 py-3.5 rounded-full cursor-pointer"
        >
          Écrire à Noé sur WhatsApp
        </button>
      </div>
    </div>
  )
}

// Hub de maillage interne, present au bas de chaque page SEO.
// C'est lui qui relie les pages service entre elles et au cluster du blog :
// sans ce bloc, /expertise et /creation-application-mobile n'auraient aucun
// lien sortant vers le contenu.
const LIENS_MAILLAGE = [
  { href: '/expertise', titre: 'Concevoir une application qui rapporte', texte: "Ce que je fais qu'un développeur ne fait pas, et les preuves derrière." },
  { href: '/creation-application-mobile', titre: 'Ma méthode, étape par étape', texte: 'Du cadrage du modèle économique au lancement sur les stores.' },
  { href: '/projets', titre: 'Les applications que j\'ai conçues', texte: '13 000 € par mois, 300 000 utilisateurs, +20 applications publiées.' },
  { href: '/faq', titre: 'Questions fréquentes', texte: 'Budget, délai, reprise, stores, ce qui se passe après la mise en ligne.' },
  { href: '/quiz', titre: 'Tester ton projet en 2 minutes', texte: 'Trois tests courts : besoin réel, application ou site web, budget à prévoir.' },
  { href: '/blog/rentabiliser-application-mobile', titre: 'Comment rentabiliser une application mobile', texte: 'Le guide de fond sur les modèles de revenus et la conversion.' },
  { href: '/blog/combien-coute-application-mobile', titre: 'Combien coûte une application mobile', texte: 'Les fourchettes réelles et ce qui fait varier le budget.' },
]

function MaillageInterne({ exclure = [], onNaviguer }) {
  const liens = LIENS_MAILLAGE.filter((l) => !exclure.includes(l.href))
  return (
    <nav aria-label="Pages liées" className="mt-14 pt-10 border-t border-card-border">
      <h2 className="font-heading text-text text-lg md:text-xl font-bold mb-5">Pour aller plus loin</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {liens.map((l) => (
          <li key={l.href}>
            <a
              href={lienInterne(l.href)}
              onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer(l.href) } }}
              className="group block h-full bg-card border border-card-border rounded-[15px] p-5 transition-colors hover:border-brand/40"
            >
              <span className="block font-heading text-text text-[0.98rem] font-bold leading-snug mb-1.5 group-hover:text-brand transition-colors">
                {l.titre}
              </span>
              <span className="block text-grey text-[0.85rem] leading-relaxed">{l.texte}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Coquille({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      {children}
    </div>
  )
}

// Styles de corps de page, alignes sur ceux du blog (classe `prose-blog`).
function Corps({ children }) {
  return (
    <div className="prose-blog text-text text-[0.95rem] md:text-base leading-relaxed">
      {children}
    </div>
  )
}

// ─── /expertise ──────────────────────────────────────────────────────────────

export function PageExpertise({ onAccueil, onBookCall, onAuditApp, onNaviguer }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    retirerPrerender()
    appliquerMeta({
      path: '/expertise',
      title: "Concevoir une application mobile qui rapporte | Noé Calmes",
      description: "Je ne fais pas que développer ton application : je la conçois pour qu'elle génère des revenus. Stratégie, modèle économique, design et développement.",
    })
  }, [])

  return (
    <Coquille>
      <EnteteSeo onAccueil={onAccueil} onBookCall={onBookCall} />
      <main className="max-w-160 mx-auto px-5 pt-32 md:pt-36 pb-20">
        <FilAriane courant="Concevoir une application qui rapporte" onAccueil={onAccueil} />

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-8">
          Concevoir une application mobile qui génère des revenus
        </h1>

        <Corps>
          <p>La plupart des applications ne rapportent rien. Ce n'est presque jamais un problème de code : elles sont bien développées, elles fonctionnent, elles sont en ligne. Elles n'ont simplement jamais été pensées pour encaisser quoi que ce soit.</p>
          <p>Je m'appelle Noé Calmes, je suis expert en application mobile. J'ai publié plus de 20 applications sur l'App Store et Google Play, et une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>. Mon métier ne s'arrête pas au développement : je conçois ton application comme un actif, pas comme une livraison technique.</p>

          <h2>Ce que je fais qu'un développeur ne fait pas</h2>
          <p>Un développeur exécute ce que tu lui demandes. C'est utile quand tu sais déjà exactement quoi demander. Le problème, c'est que la question qui décide des revenus se pose avant : qu'est-ce qui sera payant, pourquoi quelqu'un accepterait de payer, et à quel moment il comprend que ça vaut le coup.</p>
          <p>Mon travail commence là. Concrètement, je prends en charge trois choses :</p>
          <ul>
            <li><strong>La stratégie</strong> : je cadre le besoin, je définis la première version et j'arbitre ce qui est utile ou non. Beaucoup de projets échouent parce qu'ils développent trop, pas parce qu'ils développent mal.</li>
            <li><strong>Le design</strong> : ton application est pensée pour ses utilisateurs et pour les amener à la valeur vite. Un écran qui existe ne sert à rien si personne ne l'atteint.</li>
            <li><strong>Le développement</strong> : du code propre et maintenable, une seule base pour iOS et Android, prêt à évoluer sans repartir de zéro dans six mois.</li>
          </ul>

          <h2>Ce qui fait réellement qu'une application rapporte</h2>
          <p>Il n'y a pas de secret, il y a des décisions. Elles ne sont ni techniques ni mystérieuses, elles sont simplement rarement prises au bon moment :</p>
          <ul>
            <li><strong>Le modèle économique décidé avant le code</strong> : abonnement, freemium, achat intégré ou commission. Ce choix détermine l'architecture et les écrans, il ne se rajoute pas à la fin.</li>
            <li><strong>Le moment de valeur atteint vite</strong> : la seconde où l'utilisateur comprend à quoi sert ton application. S'il ne l'atteint jamais, aucune offre ne le convaincra.</li>
            <li><strong>L'offre placée au bon endroit</strong> : l'écran qui propose de payer arrive après la valeur, pas avant. Mal placé, il fait fuir. Bien placé, il transforme un curieux en client.</li>
            <li><strong>Une raison de revenir</strong> : un revenu récurrent suppose une valeur qui se renouvelle. Si ton application est consommée une seule fois, l'abonnement ne tiendra pas.</li>
          </ul>
          <p>Tu n'as pas besoin de maîtriser ces leviers. C'est précisément pour ça que tu fais appel à un expert. Si tu veux le détail, j'ai écrit un guide de fond sur <a href={lienInterne('/blog/rentabiliser-application-mobile')} onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer('/blog/rentabiliser-application-mobile') } }}>comment rentabiliser une application mobile</a>.</p>

          <h2>Les preuves</h2>
          <ul>
            <li><strong>13 000 € par mois</strong> générés par une application que j'ai conçue.</li>
            <li><strong>300 000 utilisateurs</strong> sur la première version de Hush.</li>
            <li><strong>Plus de 20 applications</strong> publiées sur l'App Store et Google Play.</li>
            <li><strong>Mes propres applications</strong> en production, donc une vision de l'usage réel et pas seulement de la commande client.</li>
          </ul>

          <h2>Expert indépendant, agence ou intelligence artificielle</h2>
          <p>Une agence te livre une application et passe au projet suivant. Tu parles à un chef de projet, rarement à la personne qui conçoit, et le budget démarre souvent au-dessus de 15 000 €. De mon côté il y a un seul interlocuteur, joignable directement 6j/7, et un tarif fixe posé avant de commencer.</p>
          <p>Quant à l'intelligence artificielle, je l'utilise moi-même. Elle génère du code très vite. Elle ne décide pas ce qui est payant, ni où placer l'offre, ni à quel prix, ni pourquoi quelqu'un reviendrait demain. Elle te permet surtout d'arriver plus vite à une application qui ne rapporte rien. C'est développé dans <a href={lienInterne('/blog/creer-application-avec-ia')} onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer('/blog/creer-application-avec-ia') } }}>créer une application avec l'IA</a>.</p>

          <h2>Les trois situations dans lesquelles j'interviens</h2>
          <ul>
            <li><strong>Créer</strong> une application à partir d'une idée, avec une première version pensée business.</li>
            <li><strong>Reprendre</strong> une application existante, instable ou abandonnée, et la remettre sur de bonnes bases.</li>
            <li><strong>Faire évoluer</strong> une application déjà en ligne, sans casser ce qui fonctionne.</li>
          </ul>
        </Corps>

        <BlocAudit
          onAuditApp={onAuditApp}
          onBookCall={onBookCall}
          titre="Ton idée peut-elle générer des revenus ?"
          texte="Audit gratuit en 2 minutes : potentiel, budget à prévoir et délai réaliste pour une première version."
        />

        <ResumerAvecIA chemin="/expertise" titre="Concevoir une application mobile qui génère des revenus" />

        <MaillageInterne exclure={['/expertise']} onNaviguer={onNaviguer} />
      </main>
      <RetourEnHaut />
    </Coquille>
  )
}

// ─── /creation-application-mobile ────────────────────────────────────────────

const ETAPES = [
  {
    n: '01',
    titre: 'Cadrage : on décide ce qui rapporte avant de coder',
    texte: "On part de ton activité et de ta cible, pas d'une liste de fonctionnalités. On définit ce que l'application doit produire (un abonnement, une réservation, une vente, des leads), puis on arbitre le périmètre de la première version. C'est l'étape qui évite de payer pour des écrans que personne n'utilisera.",
  },
  {
    n: '02',
    titre: 'Conception : le parcours qui mène à la valeur, puis à l\'achat',
    texte: "Tu vois des maquettes de ton application avant que la moindre ligne de code soit écrite. On dessine le chemin le plus court entre l'ouverture et le moment où l'utilisateur comprend l'intérêt, puis l'endroit où l'offre payante a du sens. Rien n'est validé au feeling, tout se discute sur écran.",
  },
  {
    n: '03',
    titre: 'Développement : une base propre pour iOS et Android',
    texte: "Une seule base de code pour les deux plateformes, écrite pour être maintenue et reprise. Tu as des points réguliers et des versions testables, pas un tunnel de plusieurs semaines pendant lequel tu n'as aucune visibilité.",
  },
  {
    n: '04',
    titre: 'Lancement : mise en ligne sur l\'App Store et Google Play',
    texte: "Je m'occupe de la publication, des fiches store et des allers-retours de validation, qui sont la première source de retard imprévu sur un projet mobile. Tu n'as pas à apprendre les règles d'Apple et de Google.",
  },
  {
    n: '05',
    titre: 'Après la mise en ligne : je ne disparais pas',
    texte: "Corrections, mises à jour, évolutions et lecture de ce qui se passe réellement dans l'application. C'est souvent là que les revenus se jouent : les premiers chiffres disent ce qu'il faut ajuster, et personne ne le devine à l'avance.",
  },
]

export function PageMethode({ onAccueil, onBookCall, onAuditApp, onNaviguer }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    retirerPrerender()
    appliquerMeta({
      path: '/creation-application-mobile',
      title: "Créer une application mobile rentable : ma méthode | Noé Calmes",
      description: "Ma méthode en 5 étapes pour créer une application mobile pensée pour rapporter : cadrage, conception, développement, lancement sur les stores et suivi.",
    })
  }, [])

  return (
    <Coquille>
      <EnteteSeo onAccueil={onAccueil} onBookCall={onBookCall} />
      <main className="max-w-160 mx-auto px-5 pt-32 md:pt-36 pb-20">
        <FilAriane courant="Ma méthode" onAccueil={onAccueil} />

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-8">
          Ma méthode pour créer une application mobile qui rapporte
        </h1>

        <Corps>
          <p>Créer une application mobile n'est pas un problème technique. C'est une suite de décisions, prises dans un ordre précis, dont la plupart n'ont rien à voir avec le code. Voici comment je travaille, du premier message au suivi après la mise en ligne.</p>
        </Corps>

        <ol className="mt-10 flex flex-col gap-4 list-none p-0">
          {ETAPES.map((e) => (
            <li key={e.n} className="bg-card border border-card-border rounded-[15px] p-6 md:p-7">
              <span className="block text-brand font-bold text-[0.8rem] tracking-widest mb-2">ÉTAPE {e.n}</span>
              <h2 className="font-heading text-text text-[1.05rem] md:text-[1.15rem] font-bold leading-snug mb-2.5">
                {e.titre}
              </h2>
              <p className="text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed">{e.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Corps>
            <h2>Combien de temps, et pour quel budget</h2>
            <p>Une première version prend en général 4 à 6 semaines. Quand le périmètre est clair et que le projet a une vraie urgence, un lancement en 45 jours est possible. Pour une application complète, le délai dépend de ce qu'on décide à l'étape de cadrage, et il est posé avant de commencer.</p>
            <p>Côté budget, le tarif est fixe et défini à l'avance : en général 5 000 à 12 000 € en mobile selon la complexité. Pas de compteur qui tourne, pas de rallonge en cours de route. Le détail des fourchettes du marché est dans <a href={lienInterne('/blog/combien-coute-application-mobile')} onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer('/blog/combien-coute-application-mobile') } }}>combien coûte une application mobile</a>.</p>

            <h2>Ce que tu dois avoir avant de me contacter</h2>
            <p>Une idée et une cible. C'est tout. Pas de cahier des charges, pas de maquette, pas de vocabulaire technique : traduire une idée en périmètre, c'est justement une partie de mon travail. Si tu veux arriver avec une première lecture du potentiel, du budget et du délai, l'audit gratuit prend deux minutes.</p>

            <h2>Et si ton application existe déjà</h2>
            <p>La méthode s'adapte. Pour une application instable ou abandonnée, on commence par un audit technique avant tout développement, comme décrit dans <a href={lienInterne('/blog/reprendre-application-mobile-existante')} onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer('/blog/reprendre-application-mobile-existante') } }}>reprendre une application mobile existante</a>. Pour une application en ligne qui doit grandir, l'enjeu est d'ajouter sans casser, c'est le sujet de <a href={lienInterne('/blog/faire-evoluer-application-mobile')} onClick={(e) => { if (onNaviguer) { e.preventDefault(); onNaviguer('/blog/faire-evoluer-application-mobile') } }}>faire évoluer une application mobile</a>.</p>
          </Corps>
        </div>

        <BlocAudit
          onAuditApp={onAuditApp}
          onBookCall={onBookCall}
          titre="On cadre ton projet ?"
          texte="Audit gratuit en 2 minutes : potentiel, budget à prévoir et délai réaliste pour une première version."
        />

        <ResumerAvecIA chemin="/creation-application-mobile" titre="Ma méthode pour créer une application mobile qui rapporte" />

        <MaillageInterne exclure={['/creation-application-mobile']} onNaviguer={onNaviguer} />
      </main>
      <RetourEnHaut />
    </Coquille>
  )
}

// ─── /faq ────────────────────────────────────────────────────────────────────
//
// Les donnees structurees FAQPage ne sont PAS injectees ici : elles sont
// ecrites dans le HTML servi par `scripts/generate-routes.js`, qui lit
// `FAQ_ITEMS` ci-dessus. React ne touche pas au <head> sur ce point, donc le
// balisage survit au rendu. En injecter une seconde copie cote client
// creerait un doublon de FAQPage, que Google traite comme une erreur.

export function PageFaq({ onAccueil, onBookCall, onAuditApp, onNaviguer }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    retirerPrerender()
    appliquerMeta({
      path: '/faq',
      title: "FAQ, créer une application mobile qui rapporte | Noé Calmes",
      description: "Budget, délai, reprise d'une application existante, stores, suivi après la mise en ligne : les réponses aux questions qu'on me pose le plus.",
    })
  }, [])

  return (
    <Coquille>
      <EnteteSeo onAccueil={onAccueil} onBookCall={onBookCall} />
      <main className="max-w-160 mx-auto px-5 pt-32 md:pt-36 pb-20">
        <FilAriane courant="FAQ" onAccueil={onAccueil} />

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-6">
          FAQ, créer une application mobile
        </h1>

        <Corps>
          <p>Les questions qu'on me pose le plus souvent, avec des réponses directes. Si la tienne n'y est pas, écris-moi sur WhatsApp, c'est moi qui réponds.</p>
        </Corps>

        <div className="mt-10 flex flex-col gap-4">
          {FAQ_ITEMS.map(({ q, a }) => (
            // <details> ouvert par defaut : le contenu doit etre lisible sans
            // interaction. Un accordeon ferme reste indexable, mais autant ne
            // pas dependre de ca sur une page dont le contenu EST la reponse.
            <details key={q} open className="group bg-card border border-card-border rounded-[15px] px-6 py-1">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer text-text font-semibold text-[0.95rem] md:text-base">
                <h2 className="font-heading text-[0.95rem] md:text-base font-semibold m-0">{q}</h2>
                <span className="text-brand text-xl shrink-0 w-6 text-center group-open:hidden">+</span>
                <span className="text-brand text-xl shrink-0 w-6 text-center hidden group-open:block">&minus;</span>
              </summary>
              <p className="pb-5 text-grey text-[0.9rem] md:text-[0.93rem] leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <BlocAudit
          onAuditApp={onAuditApp}
          onBookCall={onBookCall}
          titre="Une question sur ton projet précis ?"
          texte="Audit gratuit en 2 minutes : potentiel, budget à prévoir et délai réaliste pour une première version."
        />

        <ResumerAvecIA chemin="/faq" titre="FAQ, créer une application mobile qui rapporte" />

        <MaillageInterne exclure={['/faq']} onNaviguer={onNaviguer} />
      </main>
      <RetourEnHaut />
    </Coquille>
  )
}
