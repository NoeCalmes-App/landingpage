import { useEffect } from 'react'

export const BLOG_ARTICLES = [
  {
    slug: 'combien-coute-application-mobile',
    title: 'Combien coûte une application mobile en 2026 ?',
    metaTitle: 'Combien coûte une application mobile en 2026 ? | Noé Calmes',
    description: 'Découvrez le vrai coût de création d\'une application mobile en France : expert indépendant vs agence, MVP vs app complète, et les facteurs qui influencent le prix.',
    date: '2026-03-26',
    readTime: '5 min',
    content: `
      <p>Vous avez un projet d'application mobile et vous vous demandez <strong>combien ça coûte</strong> ? Que ce soit pour créer une app de zéro, reprendre un existant ou faire évoluer une application déjà lancée, la réponse dépend de plusieurs facteurs. Voici une vision claire.</p>

      <h2>Les fourchettes de prix en France</h2>
      <p>Le coût d'une application mobile varie selon le type de projet :</p>
      <ul>
        <li><strong>MVP (première version)</strong> : entre 5 000 € et 20 000 € — idéal pour valider votre idée rapidement</li>
        <li><strong>Application complète</strong> : entre 20 000 € et 80 000 € — pour un produit prêt à scaler</li>
        <li><strong>Reprise ou évolution d'un existant</strong> : variable selon l'état de la base technique et le périmètre</li>
        <li><strong>Application complexe via agence</strong> : 80 000 € à 300 000 €+ — grandes équipes, longs délais</li>
      </ul>

      <h2>Expert indépendant vs agence : quelle différence ?</h2>
      <p>Travailler avec un <strong>expert mobile indépendant</strong> coûte en moyenne 30 à 50% moins cher qu'une agence. Pourquoi ? Pas de chef de projet intermédiaire, pas de marge d'agence, pas de dispersion. Vous travaillez directement avec la personne qui comprend votre besoin et qui construit votre application.</p>
      <p>Avec un expert spécialisé Flutter, vous bénéficiez en plus d'une <strong>seule codebase pour iOS et Android</strong>, ce qui réduit le coût par rapport au développement natif.</p>
      <p>Contrairement à un simple exécutant, un expert mobile indépendant apporte aussi une <strong>vision produit</strong> : il vous aide à cadrer, prioriser et faire les bons choix dès le départ.</p>

      <h2>Les facteurs qui influencent le prix</h2>
      <ul>
        <li><strong>Type de projet</strong> : création de zéro, reprise d'un existant, ou évolution d'une app déjà en ligne</li>
        <li><strong>Complexité des fonctionnalités</strong> : authentification, paiement, géolocalisation, chat en temps réel…</li>
        <li><strong>Design et UX</strong> : maquettes sur mesure ou design standard</li>
        <li><strong>Intégrations</strong> : API tierces, base de données, notifications push</li>
        <li><strong>Plateformes</strong> : iOS seul, Android seul, ou les deux (Flutter fait les deux d'un coup)</li>
      </ul>

      <h2>Comment obtenir un devis précis ?</h2>
      <p>Chaque projet est unique. La meilleure façon de connaître le coût de votre application mobile est d'en discuter directement. Je propose un <strong>appel gratuit de 30 minutes</strong> pour comprendre votre besoin — création, reprise ou évolution — et vous donner une estimation réaliste.</p>
    `,
  },
  {
    slug: 'creer-application-mobile-guide',
    title: 'Comment créer une application mobile : le guide complet',
    metaTitle: 'Comment créer une application mobile en 2026 — Guide complet | Noé Calmes',
    description: 'Guide complet pour créer une application mobile : les étapes, les choix techniques, les erreurs à éviter et comment passer de l\'idée au lancement sur les stores.',
    date: '2026-03-26',
    readTime: '7 min',
    content: `
      <p>Vous avez une idée d'application mobile mais vous ne savez pas par où commencer ? Que ce soit une création de zéro ou la reprise d'un projet existant, ce guide vous explique <strong>les étapes concrètes</strong> pour passer de l'idée au lancement.</p>

      <h2>Étape 1 : Cadrer le besoin</h2>
      <p>Avant de penser au code, il faut poser les fondations. C'est le cadrage :</p>
      <ul>
        <li>Quel problème résout votre application ?</li>
        <li>Qui sont vos utilisateurs cibles ?</li>
        <li>Qu'est-ce qui vous différencie de la concurrence ?</li>
        <li>Quelle est la première version pertinente à lancer ?</li>
      </ul>
      <p>Un bon projet d'application mobile commence toujours par une <strong>compréhension claire du besoin</strong>. Le cadrage évite beaucoup d'erreurs et de budget gaspillé.</p>

      <h2>Étape 2 : Définir la première version</h2>
      <p>Si vous lancez votre premier projet, commencez par un <strong>MVP (Minimum Viable Product)</strong>. C'est une version minimale avec les fonctionnalités essentielles. Avantages :</p>
      <ul>
        <li>Valider votre idée rapidement (45 jours environ)</li>
        <li>Réduire les coûts de développement</li>
        <li>Obtenir des retours utilisateurs avant d'investir davantage</li>
      </ul>
      <p>Une première version simple vaut mieux qu'un projet flou qui n'aboutit jamais.</p>

      <h2>Étape 3 : Choisir la bonne technologie</h2>
      <p>Deux grandes approches pour <strong>créer une application mobile</strong> :</p>
      <ul>
        <li><strong>Développement natif</strong> (Swift pour iOS, Kotlin pour Android) : performant mais deux fois plus de travail et de budget</li>
        <li><strong>Développement cross-platform avec Flutter</strong> : une seule codebase pour iOS et Android, performances quasi-natives, développement plus rapide</li>
      </ul>
      <p>Pour la majorité des projets, <strong>Flutter est le choix le plus pertinent</strong> en 2026 : rapide, performant, et il permet de couvrir iOS et Android d'un seul coup.</p>

      <h2>Étape 4 : Développement et suivi</h2>
      <p>Le développement doit être transparent et structuré. Un expert mobile vous montre l'avancement régulièrement, pas juste le résultat final :</p>
      <ul>
        <li>Échanges réguliers sur l'avancement</li>
        <li>Démos intermédiaires pour valider chaque étape</li>
        <li>Tests sur de vrais appareils iOS et Android</li>
      </ul>
      <p>L'avantage de travailler avec un interlocuteur unique : la communication est directe, sans intermédiaire.</p>

      <h2>Étape 5 : Mise en ligne sur les stores</h2>
      <p>La mise en ligne sur l'App Store et Google Play est une étape technique qui nécessite :</p>
      <ul>
        <li>Un compte développeur Apple et/ou Google</li>
        <li>Le respect des guidelines de chaque store</li>
        <li>Des captures d'écran, une description optimisée, et des métadonnées</li>
      </ul>
      <p>Un expert mobile expérimenté prend en charge cette étape pour vous, jusqu'à la publication effective.</p>

      <h2>Et après le lancement ?</h2>
      <p>Une application mobile ne s'arrête pas à la mise en ligne. Elle a besoin d'<strong>évoluer</strong> : nouvelles fonctionnalités, corrections, optimisations. C'est pourquoi il est important de travailler avec quelqu'un qui reste disponible après le lancement.</p>

      <h2>Prêt à lancer votre projet mobile ?</h2>
      <p>Que vous partiez de zéro, que vous ayez un existant à reprendre ou une app à faire évoluer, commençons par en discuter. Un <strong>appel de 30 minutes</strong> suffit pour cadrer les contours de votre projet.</p>
    `,
  },
  {
    slug: 'flutter-vs-natif-quel-choix',
    title: 'Flutter vs natif : quel choix pour votre application mobile ?',
    metaTitle: 'Flutter vs natif — Quel choix pour votre app mobile en 2026 ? | Noé Calmes',
    description: 'Flutter ou développement natif pour votre application mobile ? Comparaison complète : coûts, performances, délais et cas d\'usage pour faire le bon choix.',
    date: '2026-03-26',
    readTime: '5 min',
    content: `
      <p>Quand on veut <strong>faire développer une application mobile</strong>, la question de la technologie arrive rapidement. Faut-il partir sur du natif (Swift/Kotlin) ou choisir Flutter ? Voici une comparaison honnête.</p>

      <h2>Qu'est-ce que Flutter ?</h2>
      <p>Flutter est un framework open-source créé par Google qui permet de <strong>créer une application mobile pour iOS et Android avec un seul code</strong>. Utilisé par des entreprises comme BMW, Alibaba et Google Pay.</p>

      <h2>Comparaison : Flutter vs développement natif</h2>

      <h3>Coût de développement</h3>
      <p><strong>Flutter gagne.</strong> Une seule codebase = un seul développement. En natif, il faut deux développeurs (ou le double de temps) pour couvrir iOS et Android.</p>

      <h3>Délai de mise sur le marché</h3>
      <p><strong>Flutter gagne.</strong> Un MVP Flutter peut être prêt en 45 jours. En natif, comptez 2 à 3 fois plus longtemps pour couvrir les deux plateformes.</p>

      <h3>Performances</h3>
      <p><strong>Quasi-égalité.</strong> Flutter compile en code natif. Pour 95% des applications, la différence de performance est imperceptible. Seules les apps très gourmandes (jeux 3D, réalité augmentée) peuvent justifier du natif pur.</p>

      <h3>Expérience utilisateur</h3>
      <p><strong>Égalité.</strong> Flutter reproduit parfaitement les composants natifs iOS et Android. Vos utilisateurs ne verront pas la différence.</p>

      <h3>Maintenance</h3>
      <p><strong>Flutter gagne.</strong> Un seul code à maintenir, une seule mise à jour à déployer. En natif, chaque correction doit être faite deux fois.</p>

      <h2>Quand choisir le natif ?</h2>
      <ul>
        <li>Jeux 3D haute performance</li>
        <li>Applications de réalité augmentée avancée</li>
        <li>Vous avez déjà une équipe native en interne</li>
      </ul>

      <h2>Quand choisir Flutter ?</h2>
      <ul>
        <li>Vous voulez lancer sur iOS et Android rapidement</li>
        <li>Votre budget est défini et vous cherchez le meilleur rapport qualité/prix</li>
        <li>Vous voulez un MVP pour valider votre idée</li>
        <li>Vous avez déjà une app Flutter à reprendre ou faire évoluer</li>
        <li>Vous cherchez un expert mobile capable de prendre le projet en main de A à Z</li>
      </ul>

      <h2>Flutter et les 3 cas d'usage</h2>
      <p>Flutter est pertinent quel que soit le type de projet mobile :</p>
      <ul>
        <li><strong>Création</strong> : lancer une première version rapidement sur les deux plateformes</li>
        <li><strong>Reprise</strong> : remettre sur de bonnes bases une application existante</li>
        <li><strong>Évolution</strong> : ajouter des fonctionnalités ou optimiser une app déjà en ligne</li>
      </ul>

      <h2>Mon avis en tant qu'expert mobile</h2>
      <p>Pour la majorité des projets d'application mobile en 2026, <strong>Flutter est le choix le plus pertinent</strong>. Il combine rapidité de développement, coût maîtrisé et performances excellentes. C'est pourquoi j'ai choisi de me spécialiser sur cette technologie et d'intervenir sur des projets de création, de reprise et d'évolution.</p>
    `,
  },
]

function BlogArticlePage({ article, onBack, onBookCall }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed inset-x-0 top-2.5 md:top-4.5 z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-230">
          <div className="backdrop-blur-md border border-[#70707029] shadow-[0_1px_3px_#00000017] rounded-[40px] bg-[#fffefc3d]">
            <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-6 md:px-7">
              <button onClick={onBack} className="flex flex-col text-left cursor-pointer">
                <span className="text-text font-bold text-xl md:text-1xl leading-tight tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Noé Calmes
                </span>
                <span className="text-grey text-sm md:text-md leading-tight font-normal">
                  Expert mobile spécialisé Flutter
                </span>
              </button>
              <button
                onClick={onBookCall}
                className="hidden min-[480px]:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer"
              >
                Réserver un appel
              </button>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-180 mx-auto px-5 pt-36 md:pt-40 pb-20">
        <button onClick={onBack} className="text-brand text-[0.9rem] font-medium mb-6 inline-flex items-center gap-1.5 hover:underline cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Retour au blog
        </button>

        <div className="flex items-center gap-3 text-grey text-[0.85rem] mb-4">
          <time>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          <span>&bull;</span>
          <span>{article.readTime} de lecture</span>
        </div>

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-8">
          {article.title}
        </h1>

        <div
          className="prose-blog text-text text-[0.95rem] md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 p-8 bg-card border border-card-border rounded-[15px] text-center">
          <h3 className="font-heading text-text text-lg md:text-xl font-bold mb-3">
            Vous avez un projet d'application mobile ?
          </h3>
          <p className="text-grey text-[0.93rem] mb-5">
            Discutons-en gratuitement pendant 30 minutes.
          </p>
          <button
            onClick={onBookCall}
            className="inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] px-8 py-3.5 rounded-full cursor-pointer"
          >
            Réserver un appel gratuit
          </button>
        </div>
      </article>
    </div>
  )
}

function BlogList({ onBack, onArticle, onBookCall }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed inset-x-0 top-2.5 md:top-4.5 z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-230">
          <div className="backdrop-blur-md border border-[#70707029] shadow-[0_1px_3px_#00000017] rounded-[40px] bg-[#fffefc3d]">
            <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-6 md:px-7">
              <button onClick={onBack} className="flex flex-col text-left cursor-pointer">
                <span className="text-text font-bold text-xl md:text-1xl leading-tight tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Noé Calmes
                </span>
                <span className="text-grey text-sm md:text-md leading-tight font-normal">
                  Expert mobile spécialisé Flutter
                </span>
              </button>
              <button
                onClick={onBookCall}
                className="hidden min-[480px]:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer"
              >
                Réserver un appel
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-230 mx-auto px-5 pt-36 md:pt-40 pb-20">
        <h1 className="font-heading text-text text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-center mb-4">
          Blog — Application mobile
        </h1>
        <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed text-center mb-12 max-w-160 mx-auto">
          Conseils et guides pour créer, reprendre ou faire évoluer votre application mobile : coûts, technologies, Flutter et retours d'expérience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <button
              key={article.slug}
              onClick={() => onArticle(article)}
              className="bg-card border border-card-border rounded-[15px] p-7 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)] cursor-pointer"
            >
              <div className="flex items-center gap-3 text-grey text-[0.8rem] mb-4">
                <time>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                <span>&bull;</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="font-heading text-text text-[1.05rem] md:text-[1.1rem] font-bold leading-snug mb-3">
                {article.title}
              </h2>
              <p className="text-grey text-[0.88rem] leading-relaxed">
                {article.description}
              </p>
              <span className="inline-block text-brand text-[0.88rem] font-semibold mt-4">
                Lire l'article &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export { BlogList, BlogArticlePage }
