import { useEffect } from 'react'

const mePhoto = '/assets/images/profile/me.webp'

export const BLOG_ARTICLES = [
  {
    slug: 'creation-application-mobile-toulouse',
    title: "Création d'application mobile à Toulouse",
    metaTitle: "Création d'application mobile à Toulouse | Noé Calmes",
    description: "Développeur d'applications mobiles à Toulouse : je conçois ton application iOS et Android pour qu'elle génère des revenus, de l'idée au lancement.",
    date: '2026-06-24',
    readTime: '5 min',
    finalCta: 'audit',
    content: `
      <p>Tu cherches un <strong>développeur d'application mobile à Toulouse</strong> pour concrétiser ton projet ? Avant même de parler de code, il y a une question plus importante : est-ce que ton application va vraiment te <strong>rapporter</strong> ? C'est exactement là-dessus que je travaille.</p>
      <p>Je m'appelle Noé Calmes, je conçois et développe des applications mobiles iOS et Android, et je suis basé près de Toulouse. Mon métier ne se limite pas à écrire du code propre : je conçois ton application pour qu'elle <strong>génère des revenus</strong>, de la première idée jusqu'au lancement sur l'App Store et Google Play.</p>

      <h2>Pas juste un développeur, un concepteur d'applications qui rapportent</h2>
      <p>La plupart des applications ne rapportent jamais un euro. La différence ne vient pas de l'idée, mais de la <strong>conception</strong> : comment l'application transforme ses utilisateurs en clients, quel modèle économique tient la route (abonnement, essai gratuit, fidélisation), et comment garder les gens sur la durée. C'est ce que je pense <strong>avant</strong> la première ligne de code.</p>
      <p>Cette approche, je ne la sors pas d'un livre. Une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>, j'ai publié plus de 20 applications, et j'ai développé la première version d'une application qui a dépassé 300 000 utilisateurs. Quand on travaille ensemble, tu profites de cette expérience concrète.</p>

      <h2>Créer, reprendre ou faire évoluer ton application</h2>
      <p>Que tu partes d'une simple idée ou d'un projet déjà avancé, je peux intervenir à trois niveaux : <strong>créer</strong> ton application de zéro avec une première version pensée pour le business, <strong>reprendre</strong> une application existante instable ou mal codée pour la remettre sur de bonnes bases, ou <strong>faire évoluer</strong> une application déjà en ligne avec de nouvelles fonctionnalités.</p>

      <h2>Un indépendant à Toulouse, pas une agence</h2>
      <p>Avec moi, tu ne passes pas par un commercial, puis un chef de projet, puis un sous-traitant. Tu parles <strong>directement</strong> à la personne qui conçoit et développe ton application. Pas d'intermédiaire, pas de compteur qui tourne, un tarif fixe décidé avant de commencer. Je travaille avec des entrepreneurs et des porteurs de projet à Toulouse, en Haute-Garonne et partout en Occitanie, et à distance dans toute la France.</p>
      <p>Pour être clair sur mon périmètre : je conçois et développe une application qui transforme tes utilisateurs en clients. Je ne fais pas la publicité qui amène les utilisateurs. Toi tu amènes les gens, moi je les transforme en clients.</p>

      <h2>Ma méthode, de l'idée au lancement</h2>
      <p>On commence par cadrer ton projet et ton modèle économique. Je te livre un cahier des charges clair, un devis transparent et une première maquette de ton application pour que tu visualises avant de décider quoi que ce soit. Ensuite je développe, avec des points réguliers, et je publie sur l'App Store et Google Play. Compte en général 4 à 6 semaines pour une première version.</p>

      <h2>Teste ton idée avant d'investir</h2>
      <p>Avant même qu'on échange, tu peux tester gratuitement ton idée d'application en 2 minutes : tu obtiens une première lecture sur son potentiel, le budget à prévoir et le délai. C'est par ici, fais ton <a href="/audit-app">audit gratuit</a>. Et si tu veux creuser le budget, regarde aussi <a href="/blog/combien-coute-application-mobile">combien coûte une application mobile</a>.</p>
    `,
  },
  {
    slug: 'application-mobile-meilleur-investissement',
    title: 'Créer une application mobile : le meilleur investissement en 2026 !',
    metaTitle: 'Créer une application mobile : meilleur investissement en 2026 ! | Noé Calmes',
    description: 'Communauté, réseau métier, revenus récurrents, valorisation : pourquoi une application mobile bien pensée peut devenir un vrai actif business.',
    date: '2026-06-16',
    readTime: '-2min',
    finalCta: 'audit',
    compactHeader: true,
    content: `
      <p>Quand on parle d'investissement, on pense souvent immobilier, publicité ou matériel. Mais il y a un actif que beaucoup d'entrepreneurs sous-estiment encore : <strong>l'application mobile</strong>.</p>
      <p>Peu d'investissements cochent autant de cases : revenus mensuels, faibles frais, distribution mondiale, valorisation et revente possible.</p>

      <h2>Communauté, métier, réseau : vous avez déjà un point d'entrée</h2>
      <p>Si vous avez une audience, une clientèle ou une communauté, vous avez déjà le plus dur : l'attention. Une application peut transformer cette attention en revenus récurrents.</p>
      <p>Et si vous n'avez pas de communauté, partez de votre métier. Un plombier connaît les problèmes des techniciens. Un restaurateur connaît les contraintes de réservation. Un consultant connaît les blocages de ses clients. Cette expérience peut devenir une application B2B ou B2C.</p>

      <h2>Une application, c'est un actif</h2>
      <p>Bien pensée, une application mobile peut avoir des utilisateurs, des revenus, une marque, une base de données et un parcours de vente. Ce n'est pas juste un outil : c'est un actif.</p>
      <p>Comme l'immobilier, elle peut produire du revenu. Mais avec un coût de départ souvent plus accessible, peu de frais de fonctionnement, et une distribution possible partout dès le premier jour.</p>
      <p>Si elle génère du revenu mensuel, elle peut aussi se valoriser. Et si elle ne décolle pas tout de suite, vous pouvez ajuster, vous associer avec quelqu'un de fort en marketing, ou repartir d'une première version plus claire.</p>

      <h2>Le point clé : ne pas construire au hasard</h2>
      <p>Une application mal pensée ne rapporte rien. Avant de développer, il faut valider le besoin, le public, le modèle économique et la première version à lancer.</p>
      <p>C'est là que se joue la différence entre une application qui existe et une application qui peut rapporter.</p>

    `,
  },
  {
    slug: 'combien-coute-application-mobile',
    title: 'Combien coûte une application mobile en 2026 ?',
    metaTitle: 'Combien coûte une application mobile en 2026 ? Prix & fourchettes | Noé Calmes',
    description: 'Prix réels pour créer une application mobile en 2026 : MVP, app complète, expert indépendant vs agence. Fourchettes claires et facteurs qui influencent le budget.',
    date: '2026-04-29',
    readTime: '6 min',
    content: `
      <p>C'est souvent la première question. Et c'est une bonne question. Créer une application mobile représente un investissement réel — autant savoir à quoi s'attendre avant de commencer.</p>

      <h2>Les fourchettes de prix en France en 2026</h2>
      <p>Le coût d'une application mobile dépend du périmètre, du type de projet et de l'interlocuteur que vous choisissez. Voici les grandes catégories :</p>
      <ul>
        <li><strong>MVP — première version</strong> : à partir de 5 000 €. Une version ciblée sur les fonctionnalités essentielles, livrée en 45 jours environ. L'objectif : valider votre idée sans tout miser d'un coup.</li>
        <li><strong>Projet plus complet</strong> : pour des besoins plus larges, le budget peut atteindre une dizaine de milliers d'euros selon le périmètre fonctionnel et les intégrations nécessaires.</li>
        <li><strong>Reprise ou évolution d'une app existante</strong> : variable selon l'état de la base technique et le périmètre des évolutions. Souvent plus rapide et moins cher que de repartir de zéro.</li>
        <li><strong>Grande agence ou ESN</strong> : 50 000 € à 300 000 €+. Des équipes importantes, des délais longs, des processus lourds — pertinent pour des projets très complexes.</li>
      </ul>

      <h2>Expert indépendant vs agence : ce que ça change vraiment</h2>
      <p>Travailler avec un <strong>expert en applications mobiles indépendant</strong> coûte en moyenne 30 à 50 % moins cher qu'une agence. Les raisons sont concrètes : pas de marge d'agence, pas de chef de projet intermédiaire, pas de dispersion entre plusieurs prestataires.</p>
      <p>Vous travaillez directement avec la personne qui comprend votre besoin et qui construit votre application. La communication est directe, les décisions vont vite.</p>
      <p>Autre avantage souvent sous-estimé : un expert indépendant spécialisé vous apporte une <strong>vision produit</strong> en plus de l'exécution technique. Il vous aide à cadrer, prioriser et faire les bons choix dès le départ — ce qui évite des aller-retours coûteux.</p>

      <h2>Les facteurs qui influencent le prix</h2>
      <ul>
        <li><strong>Type de projet</strong> : création de zéro, reprise d'un existant, ou évolution d'une app déjà en ligne. Ce ne sont pas les mêmes enjeux ni le même travail.</li>
        <li><strong>Complexité des fonctionnalités</strong> : authentification, paiement en ligne, géolocalisation, chat en temps réel, notifications push — chaque fonctionnalité a un coût.</li>
        <li><strong>Design et UX</strong> : une expérience utilisateur travaillée demande plus de temps, mais elle fait la différence sur la rétention et l'usage réel.</li>
        <li><strong>Intégrations</strong> : API tierces, bases de données, outils internes — plus les connexions sont complexes, plus le développement prend de temps.</li>
        <li><strong>Plateformes cibles</strong> : iOS uniquement, Android uniquement, ou les deux. Avec une technologie cross-platform, une seule codebase couvre les deux plateformes — ce qui réduit le coût par rapport à deux développements séparés.</li>
      </ul>

      <h2>Ce qui fait vraiment monter le budget</h2>
      <p>Dans la plupart des projets qui dépassent le budget prévu, la cause est la même : le besoin n'était pas assez cadré au départ. On ajoute des fonctionnalités en cours de route, on change d'avis sur des choix techniques, on repense l'UX à mi-chemin.</p>
      <p>C'est pourquoi le <strong>cadrage</strong> est la première étape de tout projet sérieux. Avant de commencer à développer, il faut définir précisément ce qu'on lance, pour qui, et pourquoi.</p>

      <h2>MVP ou application complète : que choisir ?</h2>
      <p>Si vous lancez votre premier projet ou si vous n'avez pas encore validé votre idée : partez sur un MVP. Une première version simple, livrée rapidement, qui vous permet de tester votre concept avec de vrais utilisateurs avant d'investir davantage.</p>
      <p>Si votre besoin est clair, votre marché validé et vos fonctionnalités bien définies : une application plus complète peut être la bonne approche dès le départ.</p>
      <p>Dans tous les cas, <strong>une application pensée pour générer des revenus commence par un besoin clair</strong> — pas par une liste de fonctionnalités.</p>

      <h2>Comment obtenir une estimation précise ?</h2>
      <p>Chaque projet est unique. La meilleure façon d'avoir une fourchette réaliste est d'en discuter directement. Je propose un appel gratuit de 30 minutes pour comprendre votre projet — création, reprise ou évolution — et vous donner une estimation claire.</p>
    `,
  },
  {
    slug: 'creer-application-mobile-guide',
    title: 'Comment créer une application mobile en 2026 : le guide complet',
    metaTitle: 'Comment créer une application mobile en 2026 — Guide complet | Noé Calmes',
    description: 'Guide complet pour créer une application mobile en 2026 : les étapes concrètes, les erreurs à éviter, le choix de la technologie et comment passer de l\'idée au lancement en 45 jours.',
    date: '2026-04-29',
    readTime: '8 min',
    content: `
      <p>Vous avez une idée d'application mobile. Vous voulez la lancer. Mais vous ne savez pas par où commencer — ni comment éviter de perdre du temps et de l'argent sur des faux problèmes.</p>
      <p>Ce guide vous explique les étapes concrètes pour créer une application mobile qui fonctionne, qui est utilisée, et qui peut générer des revenus.</p>

      <h2>Étape 1 — Cadrer le besoin avant de penser au code</h2>
      <p>C'est l'étape que la plupart des gens sautent. Et c'est souvent là que les projets partent dans le mauvais sens.</p>
      <p>Avant d'écrire une seule ligne de code, posez-vous ces questions :</p>
      <ul>
        <li>Quel problème concret résout votre application ?</li>
        <li>Qui sont vos utilisateurs cibles ? Comment ils se comportent aujourd'hui ?</li>
        <li>Qu'est-ce qui vous différencie de ce qui existe déjà ?</li>
        <li>Quelle est la version minimale pertinente à lancer ?</li>
      </ul>
      <p>Un projet bien cadré avance vite. Un projet flou accumule les aller-retours, gonfle le budget et aboutit rarement à quelque chose d'utilisable.</p>

      <h2>Étape 2 — Définir votre MVP</h2>
      <p>Un MVP (Minimum Viable Product) est une première version concentrée sur l'essentiel. Pas toutes les fonctionnalités rêvées — juste ce qui permet de valider que votre idée fonctionne avec de vrais utilisateurs.</p>
      <p>Les avantages d'un MVP :</p>
      <ul>
        <li>Lancement rapide — environ 45 jours pour une application mobile bien définie</li>
        <li>Budget maîtrisé — vous investissez sur ce qui compte vraiment</li>
        <li>Retours utilisateurs réels avant d'aller plus loin</li>
        <li>Capacité à pivoter si nécessaire sans avoir tout construit</li>
      </ul>
      <p>Une première version simple et utile vaut mieux qu'une application complète qui n'est jamais terminée.</p>

      <h2>Étape 3 — Choisir la bonne technologie</h2>
      <p>En 2026, deux grandes approches dominent le développement d'applications mobiles :</p>
      <ul>
        <li><strong>Développement natif</strong> : une application dédiée iOS (Swift) et une dédiée Android (Kotlin). Performances maximales, mais deux fois plus de travail, de coût et de délai.</li>
        <li><strong>Développement cross-platform</strong> : une seule codebase pour iOS et Android. Plus rapide, moins cher, et les performances sont excellentes pour la grande majorité des projets.</li>
      </ul>
      <p>Pour la majorité des projets — startup, PME, porteur de projet — le cross-platform est le choix le plus pertinent. Il permet de couvrir iOS et Android d'un seul développement, avec des performances quasi-natives.</p>

      <h2>Étape 4 — Design et expérience utilisateur</h2>
      <p>Une application mobile qui génère des revenus, c'est avant tout une application que les gens utilisent. Et les gens n'utilisent que ce qui est simple et agréable.</p>
      <p>Le design ne se résume pas à "faire beau". C'est penser les parcours utilisateurs, la navigation, les micro-interactions. C'est s'assurer que l'utilisateur comprend ce qu'il doit faire sans avoir besoin d'explications.</p>
      <p>Un bon design dès le départ évite des refontes coûteuses après le lancement.</p>

      <h2>Étape 5 — Développement structuré et transparent</h2>
      <p>Le développement d'une application mobile doit être structuré et visible. Vous ne devez pas attendre des mois pour voir quelque chose — vous devez voir l'avancement régulièrement.</p>
      <p>Ce que ça implique concrètement :</p>
      <ul>
        <li>Des échanges réguliers sur l'avancement — pas juste un livrable final</li>
        <li>Des démos intermédiaires pour valider chaque étape</li>
        <li>Des tests sur de vrais appareils iOS et Android</li>
        <li>Un interlocuteur unique qui comprend à la fois le produit et la technique</li>
      </ul>

      <h2>Étape 6 — Mise en ligne sur les stores</h2>
      <p>La publication sur l'App Store (Apple) et Google Play est une étape technique qui a ses propres règles. Elle nécessite :</p>
      <ul>
        <li>Un compte développeur Apple et/ou Google</li>
        <li>Le respect des guidelines de chaque store (et elles changent régulièrement)</li>
        <li>Des captures d'écran et descriptions optimisées</li>
        <li>Des tests de validation avant la soumission</li>
      </ul>
      <p>Un expert expérimenté prend en charge cette étape pour vous, jusqu'à la publication effective. Ce n'est pas une formalité — c'est une étape qui peut bloquer un projet si elle est mal préparée.</p>

      <h2>Étape 7 — Après le lancement</h2>
      <p>Une application ne s'arrête pas à la mise en ligne. Elle a besoin d'évoluer — corrections, nouvelles fonctionnalités, optimisations techniques, mise à jour des stores.</p>
      <p>C'est pourquoi il est important de travailler avec quelqu'un qui reste disponible après le lancement — et pas seulement jusqu'à la livraison.</p>

      <h2>Les erreurs les plus fréquentes à éviter</h2>
      <ul>
        <li><strong>Vouloir tout dans la première version.</strong> Ça rallonge les délais, gonfle le budget et dilue ce qui compte vraiment.</li>
        <li><strong>Négliger le cadrage.</strong> Commencer à développer sans avoir défini précisément le besoin, c'est la garantie de faire des aller-retours coûteux.</li>
        <li><strong>Choisir un prestataire sur le seul critère du prix.</strong> Le développement le moins cher n'est presque jamais le moins cher sur la durée.</li>
        <li><strong>Sous-estimer la phase de design.</strong> Une app mal pensée n'est pas utilisée — peu importe la qualité du code.</li>
      </ul>

      <h2>Prêt à lancer votre projet mobile ?</h2>
      <p>Que vous partiez de zéro, que vous ayez un projet à reprendre ou une application à faire évoluer, commençons par en discuter. Un appel gratuit de 30 minutes suffit pour cadrer les contours de votre projet et vous donner une première estimation.</p>
    `,
  },
  {
    slug: 'reprendre-application-mobile-existante',
    title: 'Reprendre une application mobile existante : comment ça se passe ?',
    metaTitle: 'Reprendre une application mobile existante — Guide 2026 | Noé Calmes',
    description: 'Vous avez une application mobile à reprendre après un développeur ou une agence ? Guide complet : audit, reprise technique, remise sur de bonnes bases et étapes concrètes.',
    date: '2026-04-29',
    readTime: '6 min',
    content: `
      <p>Vous avez une application mobile qui existe déjà. Peut-être développée par un prestataire qui n'est plus disponible. Peut-être une base technique qui s'est accumulée sans architecture claire. Peut-être une app qui fonctionnait, mais qui ne tient plus la route aujourd'hui.</p>
      <p>La reprise d'une application mobile existante est un cas fréquent — et souvent plus complexe qu'une création de zéro, parce qu'il faut d'abord comprendre ce qui existe avant de pouvoir avancer.</p>

      <h2>Pourquoi reprendre une application mobile plutôt que la recréer ?</h2>
      <p>La réponse dépend de l'état de la base existante. Dans certains cas, une reprise est clairement plus rapide et moins chère que de repartir de zéro. Dans d'autres, la base est tellement désorganisée qu'une reconstruction est plus sage.</p>
      <p>Un audit technique honnête permet de trancher. L'objectif n'est pas de tout garder — c'est de garder ce qui vaut la peine d'être gardé, et de remettre sur de bonnes bases ce qui ne tient pas.</p>

      <h2>Les situations les plus fréquentes</h2>
      <ul>
        <li><strong>Le développeur précédent n'est plus disponible.</strong> L'app existe, elle tourne, mais personne ne peut la faire évoluer. Il faut reprendre le code, le comprendre, le documenter, puis continuer à partir de là.</li>
        <li><strong>La base technique est trop fragile.</strong> Des raccourcis pris sous pression, des dépendances obsolètes, un code qui casse dès qu'on y touche. La reprise consiste à remettre les fondations sur de bonnes bases.</li>
        <li><strong>L'app a été développée par une agence généraliste.</strong> Parfois les choix techniques faits par une équipe multi-projets ne sont pas optimaux pour une application mobile. Un spécialiste reprend et réoriente.</li>
        <li><strong>Le projet a changé de direction.</strong> La première version ne correspond plus aux besoins actuels. Il faut évaluer ce qui peut être conservé et ce qui doit être revu.</li>
      </ul>

      <h2>Comment se passe une reprise d'application mobile ?</h2>
      <h3>1. L'audit technique</h3>
      <p>Avant tout, comprendre ce qui existe. L'audit couvre : l'architecture du projet, la qualité du code, les dépendances utilisées et leur état de maintenance, les points de fragilité, et les fonctionnalités existantes.</p>
      <p>L'audit donne une vision claire de ce qui est repris tel quel, ce qui est amélioré, et ce qui est reconstruit.</p>

      <h3>2. La remise en contexte produit</h3>
      <p>Reprendre une application, c'est aussi reprendre le projet dans sa globalité — comprendre l'intention initiale, ce qui a fonctionné, ce qui n'a pas fonctionné, et où vous voulez aller.</p>

      <h3>3. La phase de reprise technique</h3>
      <p>Selon les conclusions de l'audit : mise à jour des dépendances, refactoring des parties critiques, mise en place d'une architecture plus claire, correction des points de fragilité identifiés.</p>

      <h3>4. La reprise des évolutions</h3>
      <p>Une fois la base stabilisée, on peut avancer. Nouvelles fonctionnalités, améliorations UX, optimisations — sur une base saine cette fois.</p>

      <h2>Les questions à poser avant de confier une reprise</h2>
      <ul>
        <li>Avez-vous accès au code source complet ?</li>
        <li>Avez-vous les accès aux comptes développeurs (App Store, Google Play) ?</li>
        <li>Y a-t-il une documentation technique existante ?</li>
        <li>Quelles sont les fonctionnalités prioritaires à faire évoluer ?</li>
      </ul>
      <p>Ces éléments déterminent directement la complexité et le coût d'une reprise.</p>

      <h2>Reprendre ou reconstruire ?</h2>
      <p>La réponse honnête : ça dépend. Si la base est saine — même imparfaite — une reprise est souvent plus rapide. Si la base est trop fragile ou trop éloignée de ce que vous voulez faire, reconstruire sur des bases claires peut être plus efficace sur le long terme.</p>
      <p>Dans tous les cas, cette décision doit être prise après un audit sérieux — pas sur une impression ou une hypothèse.</p>

      <h2>Vous avez une application mobile à reprendre ?</h2>
      <p>Discutons-en. Un appel de 30 minutes permet de comprendre votre situation, d'évaluer les enjeux et de vous donner une première orientation — gratuit, sans engagement.</p>
    `,
  },
  {
    slug: 'faire-evoluer-application-mobile',
    title: 'Faire évoluer une application mobile : par où commencer ?',
    metaTitle: 'Faire évoluer une application mobile en 2026 — Guide pratique | Noé Calmes',
    description: 'Votre application mobile est en ligne et vous voulez la faire évoluer ? Guide pratique : prioriser les évolutions, éviter les erreurs fréquentes, et faire avancer votre produit mobile.',
    date: '2026-04-29',
    readTime: '5 min',
    content: `
      <p>Votre application mobile est en ligne. Elle fonctionne. Mais elle doit avancer — nouvelles fonctionnalités, améliorations UX, optimisations techniques, adaptation aux retours utilisateurs.</p>
      <p>Faire évoluer une application mobile, ce n'est pas juste "ajouter des choses". C'est arbitrer, prioriser, et construire de façon à ce que le produit reste maintenable et cohérent dans le temps.</p>

      <h2>Pourquoi l'évolution d'une app est souvent sous-estimée</h2>
      <p>La mise en ligne n'est pas la fin du projet — c'est le début. Une application qui ne change pas est une application qui prend du retard sur ses concurrents, qui accumule de la dette technique, et qui perd progressivement ses utilisateurs.</p>
      <p>Les erreurs les plus fréquentes à ce stade :</p>
      <ul>
        <li>Ajouter des fonctionnalités sans réfléchir à la cohérence d'ensemble</li>
        <li>Négliger la dette technique au profit de nouvelles features — jusqu'à ce que tout casse</li>
        <li>Ne pas prioriser selon l'usage réel des utilisateurs</li>
        <li>Vouloir tout faire en même temps</li>
      </ul>

      <h2>Comment prioriser les évolutions ?</h2>
      <p>Avant de commencer à développer quoi que ce soit, posez-vous trois questions :</p>
      <ul>
        <li><strong>Quel est l'impact utilisateur ?</strong> Cette évolution améliore-t-elle vraiment l'expérience ou la valeur pour l'utilisateur ?</li>
        <li><strong>Quel est l'impact business ?</strong> Est-ce que ça génère plus de revenus, réduit le churn, améliore la rétention ?</li>
        <li><strong>Quel est l'effort technique ?</strong> Certaines évolutions à fort impact peuvent être réalisées rapidement. D'autres demandent un travail de fond important.</li>
      </ul>
      <p>Les meilleures évolutions sont celles qui ont un fort impact et un effort raisonnable. Commencez par là.</p>

      <h2>Dette technique : ce qu'il faut savoir</h2>
      <p>Toute application accumule de la dette technique avec le temps. Des dépendances qui vieillissent, des raccourcis pris sous pression, du code qui n'a jamais été refactorisé.</p>
      <p>Ignorer la dette technique, c'est comme ignorer une fuite d'eau. Ça s'aggrave. Et à un moment, ça empêche d'avancer.</p>
      <p>Un expert mobile identifie et traite la dette technique progressivement — sans tout arrêter, en maintenant l'app en production.</p>

      <h2>Les mises à jour des stores : une contrainte réelle</h2>
      <p>Apple et Google imposent régulièrement des mises à jour obligatoires — nouvelles versions du SDK, nouvelles guidelines, nouvelles exigences de sécurité. Ne pas les suivre, c'est risquer le retrait de l'app des stores.</p>
      <p>Un expert en applications mobiles qui reste disponible après le lancement prend en charge ces mises à jour techniques — vous n'avez pas à vous en préoccuper.</p>

      <h2>Évolution vs refonte : quelle différence ?</h2>
      <p>Une évolution, c'est faire avancer ce qui existe — en ajoutant, en améliorant, en optimisant. Une refonte, c'est remettre en question l'architecture ou l'UX de façon profonde.</p>
      <p>La plupart du temps, une série d'évolutions bien priorisées est plus efficace qu'une grande refonte. Les grandes refontes prennent du temps, coûtent cher, et introduisent souvent de nouveaux problèmes.</p>
      <p>Quand une refonte s'impose, c'est en général parce que la dette technique est trop importante ou parce que le positionnement du produit a fondamentalement changé.</p>

      <h2>Vous avez une application mobile à faire évoluer ?</h2>
      <p>Discutons de votre situation concrète. Un appel de 30 minutes permet d'identifier les priorités et de voir comment avancer de façon structurée — gratuit, sans engagement.</p>
    `,
  },
  {
    slug: 'mvp-application-mobile',
    title: 'MVP application mobile : lancer votre idée en 45 jours',
    metaTitle: 'MVP application mobile : comment lancer en 45 jours | Noé Calmes',
    description: 'Qu\'est-ce qu\'un MVP d\'application mobile ? Comment le définir, le construire et le lancer en 45 jours. Guide pratique pour valider votre idée rapidement.',
    date: '2026-04-29',
    readTime: '5 min',
    content: `
      <p>Vous avez une idée d'application mobile. Vous voulez la lancer sans y mettre toutes vos économies, sans attendre un an, et sans construire quelque chose que personne n'utilisera.</p>
      <p>La réponse, c'est le MVP.</p>

      <h2>Qu'est-ce qu'un MVP d'application mobile ?</h2>
      <p>MVP signifie Minimum Viable Product — produit minimum viable. C'est la version la plus simple de votre application qui permet quand même de répondre au besoin principal de vos utilisateurs.</p>
      <p>Ce n'est pas une version bâclée ou incomplète. C'est une version <strong>ciblée</strong> — qui fait une chose bien, plutôt que dix choses moyennement.</p>
      <p>L'objectif du MVP est de valider votre idée avec de vrais utilisateurs, le plus vite possible, avec le minimum d'investissement.</p>

      <h2>Pourquoi commencer par un MVP ?</h2>
      <ul>
        <li><strong>Valider avant d'investir.</strong> Vous testez votre idée sur le marché réel avant de tout construire.</li>
        <li><strong>Obtenir des retours utilisateurs réels.</strong> Ce que vous imaginez et ce que les utilisateurs veulent sont souvent différents.</li>
        <li><strong>Réduire le risque.</strong> Un MVP mal reçu se corrige. Une application complète mal reçue, c'est des dizaines de milliers d'euros perdus.</li>
        <li><strong>Aller vite.</strong> Un MVP bien défini peut être livré en 45 jours — versus 6 à 9 mois pour une application complète.</li>
      </ul>

      <h2>Comment définir votre MVP ?</h2>
      <p>La question centrale : <strong>quel est le problème numéro un que votre application résout ?</strong></p>
      <p>Votre MVP doit résoudre ce problème, et ce problème seulement. Tout le reste vient après.</p>
      <p>Exercice utile : listez toutes les fonctionnalités que vous voulez. Divisez-les en deux colonnes — "indispensable pour résoudre le problème principal" et "tout le reste". Le MVP, c'est la première colonne.</p>

      <h2>45 jours : comment c'est possible ?</h2>
      <p>45 jours est un délai réaliste pour un MVP bien cadré. Ce qui le permet :</p>
      <ul>
        <li>Un périmètre clairement défini avant de commencer</li>
        <li>Un interlocuteur unique qui comprend à la fois le produit et la technique — pas de perte de temps en réunions de coordination</li>
        <li>Une technologie cross-platform qui couvre iOS et Android en une seule passe</li>
        <li>Un processus de travail structuré, sans dispersion</li>
      </ul>
      <p>45 jours ne veut pas dire "fait vite et mal". Ça veut dire concentré sur l'essentiel, sans superflu.</p>

      <h2>MVP : ce que ça n'est pas</h2>
      <ul>
        <li>Ce n'est pas une application sans design — l'UX compte dès la première version</li>
        <li>Ce n'est pas un prototype cliquable — c'est une vraie application publiée sur les stores</li>
        <li>Ce n'est pas une version "jetable" — la base technique doit permettre d'évoluer ensuite</li>
      </ul>

      <h2>Après le MVP : et ensuite ?</h2>
      <p>Le MVP est le point de départ, pas la destination. Une fois en ligne, vous collectez des données et des retours réels. Vous identifiez ce qui fonctionne, ce qui bloque, ce que les utilisateurs veulent vraiment.</p>
      <p>C'est cette boucle — lancer, mesurer, améliorer — qui transforme un MVP en un produit qui génère des revenus.</p>

      <h2>Vous avez une idée à lancer ?</h2>
      <p>Discutons de votre projet. Un appel de 30 minutes suffit pour évaluer si un MVP est la bonne approche, définir le périmètre et voir comment avancer concrètement.</p>
    `,
  },
  {
    slug: 'choisir-expert-application-mobile',
    title: 'Comment choisir son expert en développement d\'application mobile ?',
    metaTitle: 'Comment choisir un expert en développement d\'application mobile | Noé Calmes',
    description: 'Agence, freelance ou expert indépendant ? Comment choisir le bon profil pour créer votre application mobile : les critères clés, les questions à poser et les erreurs à éviter.',
    date: '2026-04-29',
    readTime: '6 min',
    content: `
      <p>Vous avez un projet d'application mobile. Vous devez maintenant choisir avec qui le réaliser. Agence digitale, freelance, expert indépendant — les options ne manquent pas. Et les erreurs de casting coûtent cher.</p>
      <p>Voici les critères qui comptent vraiment.</p>

      <h2>Les 3 profils principaux</h2>

      <h3>L'agence digitale</h3>
      <p>Une équipe pluridisciplinaire : chef de projet, designer, développeurs, parfois un consultant. Des processus structurés, une capacité à gérer des projets complexes et de grande envergure.</p>
      <p>Les limites : coût élevé (marges d'agence, équipes importantes), délais longs, communication souvent filtrée par un chef de projet. Pour un projet de 5 000 à 20 000 €, la plupart des agences ne sont pas le bon choix.</p>

      <h3>Le freelance généraliste</h3>
      <p>Un profil technique qui développe selon votre brief. Moins cher qu'une agence, disponible rapidement. Mais souvent sans vision produit — il exécute ce que vous lui demandez, sans forcément vous aider à faire les bons choix.</p>
      <p>Le risque : vous vous retrouvez à prendre toutes les décisions techniques et produit sans en avoir forcément l'expertise.</p>

      <h3>L'expert indépendant spécialisé</h3>
      <p>Un profil qui combine expertise technique et compréhension produit. Il connaît son domaine en profondeur, il vous aide à cadrer autant qu'à construire. Il est joignable directement — pas de chef de projet intermédiaire.</p>
      <p>C'est le profil le plus pertinent pour la majorité des projets d'application mobile : plus accessible qu'une agence, plus structuré qu'un généraliste.</p>

      <h2>Les critères qui comptent vraiment</h2>

      <h3>La spécialisation mobile</h3>
      <p>Créer une application mobile, ce n'est pas créer un site web. Les contraintes sont différentes : performances sur mobile, publication sur les stores, UX tactile, gestion des mises à jour. Un expert spécialisé mobile connaît ces enjeux par cœur.</p>

      <h3>La vision produit</h3>
      <p>Un bon prestataire ne se contente pas d'exécuter votre liste de fonctionnalités. Il vous aide à réfléchir à ce qui est vraiment utile, à ce qui peut être simplifié, à ce qui fera revenir vos utilisateurs. C'est cette capacité qui fait la différence entre une app qui fonctionne et une app qui génère des revenus.</p>

      <h3>La transparence sur le tarif</h3>
      <p>Méfiez-vous des devis flous ou des facturations à la journée sans périmètre clair. Un bon prestataire vous donne un tarif fixe pour un périmètre défini — vous savez ce que vous payez avant de commencer.</p>

      <h3>La disponibilité après le lancement</h3>
      <p>Votre application aura besoin d'évoluer. Les stores imposent des mises à jour. Des bugs apparaissent en production. Vérifiez que votre prestataire est disponible après la mise en ligne — pas seulement jusqu'à la livraison.</p>

      <h3>Les références concrètes</h3>
      <p>Des applications réellement publiées sur les stores, utilisées par de vrais utilisateurs. Pas des maquettes, pas des "projets en cours". Demandez à voir des apps en production.</p>

      <h2>Les questions à poser avant de choisir</h2>
      <ul>
        <li>Avez-vous déjà réalisé des projets similaires au mien ? (création, reprise ou évolution)</li>
        <li>Comment se passe le cadrage en début de projet ?</li>
        <li>Quel est votre process de suivi pendant le développement ?</li>
        <li>Êtes-vous disponible après la mise en ligne ?</li>
        <li>Le tarif est-il fixe ou à la journée ?</li>
        <li>Qui fait réellement le travail — vous ou un sous-traitant ?</li>
      </ul>

      <h2>Les signaux d'alerte</h2>
      <ul>
        <li>Un devis sans périmètre clair</li>
        <li>Une promesse de "tout faire" sans spécialisation affichée</li>
        <li>Pas de références en production</li>
        <li>Une communication qui passe par des intermédiaires dès le départ</li>
        <li>Un tarif anormalement bas — le développement de qualité a un coût</li>
      </ul>

      <h2>Vous cherchez un expert en applications mobiles ?</h2>
      <p>Je travaille sur des projets de création, de reprise et d'évolution d'applications mobiles, avec une approche qui combine vision produit et exécution technique. Un appel gratuit de 30 minutes pour discuter de votre projet.</p>
    `,
  },
]

function BlogArticlePage({ article, onBack, onBookCall, onAuditApp }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = article.metaTitle || article.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', article.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://noecalmes.fr/blog/${article.slug}`)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', article.metaTitle || article.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', article.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://noecalmes.fr/blog/${article.slug}`)
  }, [article])

  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed inset-x-0 top-2.5 md:top-4.5 z-50 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-230">
          <div className="backdrop-blur-md border border-[#70707029] shadow-[0_1px_3px_#00000017] rounded-[40px] bg-[#fffefc3d]">
            <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-5 md:px-7">
              <button onClick={onBack} className="flex items-center gap-3 text-left cursor-pointer min-w-0">
                <img
                  src={mePhoto}
                  alt="Noé Calmes"
                  width="44"
                  height="44"
                  className="h-11 w-11 rounded-full object-cover shrink-0"
                />
                <span className="flex flex-col min-w-0">
                  <span className="text-text font-bold text-lg md:text-1xl leading-tight tracking-tight truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Noé Calmes
                  </span>
                  <span className="text-grey text-xs md:text-md leading-tight font-normal truncate">
                    Expert en applications mobiles
                  </span>
                </span>
              </button>
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

      <article className={`max-w-180 mx-auto px-5 pb-20 ${article.compactHeader ? 'pt-32 md:pt-36' : 'pt-36 md:pt-40'}`}>
        {article.compactHeader ? (
          <div className="flex items-center justify-between gap-4 text-[0.85rem] mb-4">
            <button onClick={onBack} className="text-brand font-medium inline-flex items-center gap-1.5 hover:underline cursor-pointer shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Retour au blog
            </button>
            <span className="text-grey text-right">
              {article.readTime} de lecture
            </span>
          </div>
        ) : (
          <button onClick={onBack} className="text-brand text-[0.9rem] font-medium mb-6 inline-flex items-center gap-1.5 hover:underline cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Retour au blog
          </button>
        )}

        {!article.compactHeader && (
          <div className="flex items-center gap-3 text-grey text-[0.85rem] mb-4">
            <>
              <time>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
              <span>&bull;</span>
            </>
            <span>{article.readTime} de lecture</span>
          </div>
        )}

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-8">
          {article.title}
        </h1>

        <div
          className="prose-blog text-text text-[0.95rem] md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.finalCta === 'audit' ? (
          <div className="mt-12 p-7 md:p-8 bg-card border border-card-border rounded-[15px] text-center">
            <h3 className="font-heading text-text text-lg md:text-xl font-bold mb-3">
              Tu penses que ton idée d'app a du potentiel ?
            </h3>
            <p className="text-grey text-[0.93rem] mb-5 max-w-130 mx-auto">
              Audit gratuit en 2 min : potentiel, budget à prévoir et délai réaliste pour une première version.
            </p>
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
        ) : (
          <div className="mt-12 p-8 bg-card border border-card-border rounded-[15px] text-center">
            <h3 className="font-heading text-text text-lg md:text-xl font-bold mb-3">
              Vous avez un projet d'application mobile ?
            </h3>
            <p className="text-grey text-[0.93rem] mb-5">
              Écrivez-moi sur WhatsApp, on en discute directement.
            </p>
            <button
              onClick={onBookCall}
              className="inline-flex items-center gap-2.5 bg-brand text-surface font-semibold text-[0.95rem] px-8 py-3.5 rounded-full cursor-pointer"
            >
              Écrire à Noé sur WhatsApp
            </button>
          </div>
        )}
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
            <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-5 md:px-7">
              <button onClick={onBack} className="flex items-center gap-3 text-left cursor-pointer min-w-0">
                <img
                  src={mePhoto}
                  alt="Noé Calmes"
                  width="44"
                  height="44"
                  className="h-11 w-11 rounded-full object-cover shrink-0"
                />
                <span className="flex flex-col min-w-0">
                  <span className="text-text font-bold text-lg md:text-1xl leading-tight tracking-tight truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Noé Calmes
                  </span>
                  <span className="text-grey text-xs md:text-md leading-tight font-normal truncate">
                    Expert en applications mobiles
                  </span>
                </span>
              </button>
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

      <div className="max-w-230 mx-auto px-5 pt-36 md:pt-40 pb-20">
        <h1 className="font-heading text-text text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-center mb-4">
          Blog — Application mobile
        </h1>
        <p className="text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed text-center mb-12 max-w-160 mx-auto">
          Guides pratiques pour créer, reprendre ou faire évoluer votre application mobile : coûts, MVP, choix du bon prestataire et retours d'expérience.
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
