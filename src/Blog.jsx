import { useEffect } from 'react'

const mePhoto = '/assets/images/profile/me.webp'

export const BLOG_ARTICLES = [
  {
    slug: 'idee-application-business-rentable',
    title: "Comment transformer une idée d'application en business rentable",
    metaTitle: "Idée d'application : en faire un business rentable | Noé Calmes",
    description: "La méthode pour passer d'une idée d'application à un vrai business : valider la valeur, choisir le revenu, concevoir la conversion, mesurer.",
    date: '2026-07-27',
    readTime: '7 min',
    finalCta: 'audit',
    content: `
      <p>Une idée d'application ne vaut rien tant qu'elle n'a pas rencontré une personne prête à payer pour ce qu'elle résout. C'est la partie que la plupart des porteurs de projet sautent : ils passent de l'idée au développement, puis découvrent après la mise en ligne que personne ne sort sa carte bancaire. La méthode qui suit remet les étapes dans l'ordre, de l'idée au premier euro récurrent.</p>
      <p>Je m'appelle Noé Calmes, je conçois des applications mobiles pensées pour générer des revenus. J'ai publié plus de 20 applications, et une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>. J'ai aussi vu de près l'autre face : la première version de Hush a atteint 300 000 utilisateurs sans modèle de revenu construit dès le départ. Une idée peut donc très bien marcher et ne rien rapporter. C'est exactement le problème que cet article traite.</p>

      <h2>Étape 1 : transformer l'idée en problème payant</h2>
      <p>Une idée se formule en général comme une fonctionnalité : « une application pour suivre ses entraînements ». Un business se formule comme un problème et une personne : « les coachs indépendants perdent du temps à envoyer des programmes par message et n'ont aucun moyen de faire payer ce suivi ». La deuxième formulation contient déjà un client, une douleur et une raison de payer.</p>
      <p>Fais l'exercice à l'écrit, en une phrase : pour qui, quel problème, à quelle fréquence il se pose, et ce que la personne fait aujourd'hui à la place. Si la réponse à la dernière question est « rien, ça ne la dérange pas vraiment », le problème n'est pas assez cher pour justifier un abonnement. Cherche un problème qui revient chaque semaine, pas un agacement ponctuel.</p>

      <h2>Étape 2 : vérifier avant de développer</h2>
      <p>La validation ne demande pas de code. Elle demande des conversations. Parle à quinze ou vingt personnes de ta cible, sans présenter ton idée en premier. Demande-leur comment elles gèrent le problème aujourd'hui, combien de temps ça leur prend, ce qu'elles ont déjà essayé et payé. Les réponses sur les outils qu'elles paient déjà valent dix fois plus que les « oui c'est une bonne idée » de politesse.</p>
      <p>Trois signaux indiquent qu'un problème est monétisable : la personne a déjà dépensé de l'argent pour le résoudre, elle a bricolé une solution manuelle, elle en parle spontanément avec de la frustration. Si aucun des trois n'apparaît, ajuste l'idée maintenant. Un pivot à ce stade coûte une conversation, après le développement il coûte plusieurs mois.</p>

      <h2>Étape 3 : choisir le modèle de revenu avant la première ligne de code</h2>
      <p>Le modèle de revenu n'est pas une décision de fin de projet, c'est une contrainte de conception. Une application par abonnement doit apporter une valeur qui se renouvelle, donc du contenu, une progression ou une synchronisation. Une application à achat unique doit délivrer sa valeur immédiatement. Une application avec achats intégrés doit rendre l'objet acheté désirable dans le parcours.</p>
      <p>Décide donc tôt : qu'est-ce qui est gratuit, qu'est-ce qui est payant, et à quel moment précis l'utilisateur comprend que le payant vaut le coup. Cette frontière détermine l'architecture, les écrans et le rythme de l'application. Pour comparer les options en détail, lis <a href="/blog/modele-economique-application-mobile">quel modèle économique choisir pour ton application</a>.</p>

      <h2>Étape 4 : construire un scénario chiffré, prudent</h2>
      <p>Avant d'investir, pose trois nombres : combien d'utilisateurs tu peux réalistement amener chaque mois, quel pourcentage passe au payant, et quel revenu net tu gardes après frais de store et taxes. Multiplie, puis divise ton budget de développement par ce revenu mensuel. Tu obtiens ton délai de retour sur investissement.</p>
      <p>Un exemple concret pour situer les ordres de grandeur. Sur l'application à 13 000 € par mois, le passage au payant tourne autour de 3 %. Prends cette hypothèse, un revenu net moyen de 5 € par mois et par abonné, et 1 000 nouveaux utilisateurs par mois : cela donne 30 abonnés supplémentaires, soit environ 150 € de revenu récurrent ajouté chaque mois, avant les départs. Ce n'est pas spectaculaire au premier mois, mais c'est cumulatif. C'est cette mécanique lente qui construit un business, pas le pic du lancement.</p>
      <p>Si ton scénario prudent ne fonctionne pas, le problème n'est pas le développement : c'est le prix, la cible ou la valeur. Corrige avant, pas après. Pour approfondir, lis <a href="/blog/combien-rapporte-application-mobile">combien rapporte réellement une application mobile</a>.</p>

      <h2>Étape 5 : lancer une première version qui vend déjà</h2>
      <p>La première version ne doit pas contenir toutes les fonctionnalités, mais elle doit contenir tout le chemin de valeur : l'utilisateur arrive, comprend en moins d'une minute ce que l'application lui apporte, obtient un premier résultat concret, et rencontre l'offre payante à ce moment précis. Une application sans mécanique de paiement dès la première version ne collecte aucune information utile sur sa rentabilité.</p>
      <p>Coupe les fonctionnalités secondaires, jamais le parcours de conversion. C'est la seule partie qui te dira si ton business tient debout.</p>

      <h2>Étape 6 : mesurer les bons chiffres</h2>
      <p>Le nombre de téléchargements ne dit presque rien. Suis quatre indicateurs : combien d'utilisateurs terminent l'onboarding, combien atteignent le premier moment de valeur, combien passent au payant, et combien sont encore actifs à trente jours. Chaque chute entre deux étapes t'indique exactement quoi corriger. Une conversion faible avec une bonne rétention signale un problème de prix ou de présentation de l'offre. Une bonne conversion avec une rétention faible signale que la valeur ne se renouvelle pas.</p>

      <h2>Ce que je prends en charge, et ce que je ne fais pas</h2>
      <p>Je conçois et développe l'application qui transforme tes utilisateurs en clients : le parcours, le moment de valeur, l'écran d'abonnement, la logique de paiement et la rétention. Je ne fais pas la publicité qui amène les utilisateurs sur ton application. Toi, tu amènes les personnes intéressées. Moi, je conçois le produit qui leur donne une raison de payer et de rester.</p>

      <h2>Par où commencer cette semaine</h2>
      <p>Écris ton problème en une phrase avec une personne dedans, parle à dix personnes de ta cible, décide de ce qui sera payant, puis construis un scénario prudent sur douze mois. Pour la vue d'ensemble du sujet, lis <a href="/blog/rentabiliser-application-mobile">comment rentabiliser une application mobile</a>. Si tu veux une première lecture du potentiel, du budget et du délai de ton idée, fais ton <a href="/audit-app">audit gratuit</a> en deux minutes.</p>
    `,
  },
  {
    slug: 'application-par-abonnement',
    title: 'Application par abonnement : comment ça marche et combien ça rapporte',
    metaTitle: 'Application par abonnement : combien ça rapporte | Noé Calmes',
    description: 'Comment marche une application par abonnement, combien elle peut rapporter, et comment convertir tes utilisateurs en abonnés qui restent.',
    date: '2026-07-17',
    readTime: '7 min',
    finalCta: 'audit',
    content: `
      <p>L'abonnement est souvent le modèle le plus intéressant quand une application apporte une valeur qui revient chaque semaine ou chaque mois. Il ne rend pourtant pas une application rentable par magie. Le revenu dépend du prix, de la conversion et surtout du nombre d'abonnés qui restent. Voici comment une application par abonnement fonctionne, comment estimer ce qu'elle peut rapporter et ce qu'il faut concevoir pour qu'elle tienne sur la durée.</p>
      <p>Je m'appelle Noé Calmes, je conçois des applications mobiles pensées pour générer des revenus. Une application que j'ai conçue fonctionne par abonnement et génère environ <strong>13 000 € par mois</strong>. J'ai publié plus de 20 applications. Ce qui suit vient donc du terrain, pas d'une formule théorique.</p>

      <h2>Comment fonctionne une application par abonnement</h2>
      <p>L'utilisateur télécharge l'application, découvre sa valeur, puis choisit une formule mensuelle ou annuelle pour continuer à profiter du service. Sur mobile, l'App Store et Google Play peuvent gérer le paiement, le renouvellement automatique, la restauration des achats et la résiliation. L'application doit ensuite vérifier que l'abonnement est actif et ouvrir les bons contenus ou fonctionnalités.</p>
      <p>Les frais ne se résument pas à un pourcentage universel. Ils varient selon le store, le pays, le programme auquel l'éditeur est inscrit et parfois l'ancienneté de l'abonnement. Vérifie les <a href="https://developer.apple.com/app-store/small-business-program/">conditions officielles d'Apple</a> et les <a href="https://support.google.com/googleplay/android-developer/answer/112622?hl=fr">frais officiels de Google Play</a> au moment du lancement. Dans ton prévisionnel, raisonne toujours en revenu net après frais de store et taxes, pas seulement en prix affiché.</p>

      <h2>Combien peut rapporter une application par abonnement</h2>
      <p>Pour suivre ton revenu mensuel récurrent, pars d'une formule simple : <strong>nombre d'abonnés actifs multiplié par le revenu mensuel net moyen par abonné</strong>. Le nombre d'abonnés actifs dépend ensuite de trois mouvements : les utilisateurs que tu attires, ceux que tu convertis en payants et ceux que tu arrives à conserver.</p>
      <p>Prends l'exemple réel de l'application qui génère environ 13 000 € par mois. Elle totalise autour de 30 000 téléchargements et environ 3 % de passage au payant. Ces deux chiffres ne suffisent pas à refaire le revenu exact, car les téléchargements sont cumulés tandis que le revenu dépend des abonnements encore actifs, du prix, des formules mensuelles et annuelles et des frais. Ils montrent en revanche une chose importante : il n'est pas nécessaire d'avoir des millions de téléchargements. Une audience plus petite, bien convertie et bien retenue, peut valoir davantage qu'un gros volume qui abandonne.</p>

      <h2>Quand l'abonnement est le bon modèle</h2>
      <p>L'abonnement fonctionne si la valeur se renouvelle : un suivi qui progresse, du contenu régulièrement ajouté, un outil utilisé chaque semaine, des données synchronisées ou un service qui accompagne une habitude. L'utilisateur doit pouvoir répondre clairement à la question : « pourquoi est-ce que je continue à payer le mois prochain ? »</p>
      <p>Si la valeur est consommée une seule fois, l'abonnement devient difficile à défendre. Un achat unique ou un achat intégré peut alors être plus cohérent. Le bon modèle part de l'usage réel, jamais de la volonté d'obtenir du revenu récurrent à tout prix. Pour comparer les options, lis <a href="/blog/modele-economique-application-mobile">quel modèle économique choisir pour ton application</a>.</p>

      <h2>Mensuel ou annuel : proposer les deux avec une logique</h2>
      <p>Le mensuel réduit l'engagement initial et rassure l'utilisateur qui veut essayer. L'annuel encaisse une période plus longue dès le départ et réduit le nombre de moments où le client doit décider de renouveler. Il ne garantit pas pour autant qu'il utilisera encore l'application dans douze mois.</p>
      <p>Présente l'économie annuelle de façon claire, sans inventer une remise artificielle. Le bon écart dépend de ton prix, de ta marge et de la durée de vie réelle de tes abonnés. L'objectif n'est pas de pousser tout le monde vers l'annuel, mais de proposer un choix compréhensible et de mesurer celui qui produit le meilleur revenu net sur la durée.</p>

      <h2>La conversion se conçoit avant le développement</h2>
      <p>Créer les produits d'abonnement dans les stores est seulement la partie visible. Une intégration fiable doit aussi gérer la restauration des achats, les renouvellements, les changements de formule, les expirations, les remboursements et la mesure des conversions. La partie technique peut être rapide sur un projet bien préparé, mais elle ne se résume pas sérieusement à poser un bouton de paiement.</p>
      <p>La vraie différence se joue dans le parcours : un onboarding qui montre la valeur rapidement, un essai proposé au bon moment, un écran d'abonnement qui explique ce qui est débloqué et une raison concrète de revenir. Le paywall ne répare pas une application sans valeur. Il transforme une valeur déjà comprise en décision d'achat.</p>

      <h2>La rétention décide du revenu dans le temps</h2>
      <p>Imagine une cohorte de 100 abonnés sans nouvel arrivant. Avec 5 % de départs par mois, il en reste environ 54 après douze cycles. Avec 10 % de départs mensuels, il n'en reste qu'environ 28. Cet exemple simplifié montre pourquoi quelques points de rétention peuvent créer un écart majeur. Dans la réalité, de nouveaux abonnés arrivent chaque mois, mais la logique reste la même : si les départs absorbent les nouvelles conversions, le revenu plafonne.</p>
      <p>La rétention se travaille dans le produit : une valeur qui se renouvelle, une progression visible, des rappels utiles et une expérience suffisamment simple pour devenir une habitude. C'est ce qui transforme une première vente en revenu récurrent.</p>

      <h2>Ce que je prends en charge</h2>
      <p>Je conçois et développe l'application qui transforme tes utilisateurs en abonnés : le parcours, l'essai, l'écran d'abonnement, la logique de paiement et la rétention. Je ne fais pas la publicité qui amène les utilisateurs. Toi, tu amènes les personnes intéressées. Moi, je conçois le produit qui leur donne une raison de payer et de rester.</p>

      <h2>Par où commencer</h2>
      <p>Avant de développer, vérifie que ta valeur est réellement récurrente, définis ce que l'utilisateur obtient gratuitement, pose un prix mensuel et annuel, puis construis un scénario prudent avec des abonnés actifs et un revenu net. Pour la vue d'ensemble, lis <a href="/blog/rentabiliser-application-mobile">comment rentabiliser une application mobile</a> et <a href="/blog/combien-rapporte-application-mobile">combien rapporte une application mobile</a>. Si tu veux une première lecture du potentiel, du budget et du délai de ton idée, fais ton <a href="/audit-app">audit gratuit</a> en deux minutes.</p>
    `,
  },
  {
    slug: 'modele-economique-application-mobile',
    title: 'Modèle économique d\'une application mobile : lequel choisir',
    metaTitle: 'Modèle économique d\'une application mobile | Noé Calmes',
    description: 'Abonnement, freemium, achats intégrés ou publicité : quel modèle économique choisir pour ton application mobile ? Le guide pour décider selon ton cas.',
    date: '2026-07-13',
    readTime: '7 min',
    finalCta: 'audit',
    content: `
      <p>Abonnement, freemium, achats intégrés, publicité : le modèle économique décide de combien ton application va rapporter. Ce n'est pas un réglage technique qu'on branche à la fin, c'est un choix de conception qui oriente tout le parcours. Voici comment décider, selon ton cas, sans copier le modèle du voisin.</p>
      <p>Je m'appelle Noé Calmes, je conçois des applications mobiles pensées pour générer des revenus. Une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>, et j'ai publié plus de 20 applications. Le choix du modèle, je le tranche à chaque projet, avant la première ligne de code.</p>

      <h2>Le mauvais réflexe : choisir le modèle avant de comprendre la valeur</h2>
      <p>Beaucoup de porteurs de projet arrivent avec le modèle déjà en tête, souvent l'abonnement parce que c'est à la mode. Mauvais point de départ. Le bon modèle découle de la nature de la valeur que ton application apporte. Une valeur continue, qu'on consomme mois après mois, appelle un modèle différent d'une valeur ponctuelle, qu'on utilise une fois et qu'on oublie. Commence par comprendre ta valeur, le modèle suit.</p>

      <h2>Les quatre modèles, et à qui ils conviennent</h2>
      <p><strong>L'abonnement</strong> convient quand ton application apporte une valeur récurrente : un suivi, un contenu qui se renouvelle, un outil qu'on utilise régulièrement. C'est le modèle le plus rentable sur la durée parce qu'il empile du revenu mois après mois. En contrepartie, il t'oblige à mériter le paiement en continu.</p>
      <p><strong>Le freemium</strong> convient quand tu as besoin de lever la barrière à l'entrée pour laisser les gens goûter avant de payer. La version gratuite sert d'aimant, la version payante débloque ce qui compte vraiment. Le piège : si le gratuit suffit, personne ne passe payant. Le curseur entre gratuit et payant est une décision de conception, pas un détail.</p>
      <p><strong>Les achats intégrés</strong> conviennent quand la valeur est ponctuelle et répétable : débloquer un niveau, un contenu, une option, un consommable. Fréquent dans les jeux et les outils créatifs. Le revenu est moins prévisible que l'abonnement, mais il colle mieux à certains usages.</p>
      <p><strong>La publicité</strong> ne devient un vrai moteur qu'avec un énorme volume d'utilisateurs très actifs. Pour la plupart des projets d'entrepreneur, c'est au mieux un complément. Compter dessus comme revenu principal sans audience massive, c'est se condamner à ne presque rien gagner.</p>

      <h2>Les trois questions qui tranchent</h2>
      <p>Pour choisir, réponds honnêtement à trois questions. <strong>À quelle fréquence les gens vont-ils utiliser ton application ?</strong> Usage régulier, l'abonnement tient. Usage occasionnel, il s'effondre. <strong>La valeur se renouvelle-t-elle, ou est-elle livrée une fois pour toutes ?</strong> Valeur qui se renouvelle, abonnement ou freemium. Valeur ponctuelle, achats intégrés. <strong>Ton public a-t-il l'habitude et les moyens de payer pour ce type de service ?</strong> Si oui, tu peux viser un paiement direct. Si non, il faut d'abord installer la valeur avant de demander de l'argent.</p>

      <h2>Tu peux, et souvent tu dois, combiner</h2>
      <p>Les modèles ne s'excluent pas. Beaucoup d'applications qui rapportent mélangent une base freemium pour faire entrer les gens et un abonnement pour capter le revenu récurrent, avec parfois quelques achats ponctuels en plus. Le tout est de garder un parcours clair : l'utilisateur doit toujours comprendre ce qu'il obtient gratuitement, ce qu'il paie, et pourquoi.</p>

      <h2>Ce qui compte plus que le modèle</h2>
      <p>Un point que je répète à chaque projet : le modèle ne rentabilise rien tout seul. L'application à 13 000 € par mois tourne à l'abonnement, mais ce n'est pas l'abonnement qui fait le revenu. C'est le parcours qui amène environ 3 % des utilisateurs à payer, et surtout à rester. Le même modèle, mal conçu, ne rapporterait presque rien. Choisir le bon modèle, c'est nécessaire ; concevoir la conversion et la rétention derrière, c'est ce qui fait la différence.</p>

      <h2>Sois clair sur mon périmètre</h2>
      <p>Je conçois et développe l'application qui transforme tes utilisateurs en clients : le choix du modèle, l'onboarding, l'essai, l'abonnement, la rétention. Je ne fais pas la publicité qui amène les utilisateurs. Toi tu amènes les gens, je les transforme en clients qui paient.</p>

      <h2>Par où commencer</h2>
      <p>Pose le modèle après avoir défini la valeur et le public, jamais avant. Pour la vue d'ensemble, lis <a href="/blog/rentabiliser-application-mobile">comment rentabiliser une application mobile</a>, et pour les ordres de grandeur, <a href="/blog/combien-rapporte-application-mobile">combien rapporte une application mobile</a>. Et si tu veux qu'on regarde le bon modèle pour ton idée précise, avec le potentiel, le budget et le délai, fais ton <a href="/audit-app">audit gratuit</a> en deux minutes.</p>
    `,
  },
  {
    slug: 'combien-rapporte-application-mobile',
    title: 'Combien rapporte une application mobile en 2026 ?',
    metaTitle: 'Combien rapporte une application mobile en 2026 ? | Noé Calmes',
    description: 'Combien rapporte vraiment une application mobile en 2026 ? Chiffres réels, leviers de revenus et l\'exemple d\'une app à 13 000 € par mois.',
    date: '2026-07-06',
    readTime: '6 min',
    finalCta: 'audit',
    content: `
      <p>Avant de te lancer, tu veux un chiffre. Combien rapporte une application mobile ? La réponse honnête, c'est « ça dépend », mais ce n'est pas une esquive : ça dépend de facteurs précis que tu peux estimer à l'avance. Voici les vrais chiffres, la façon de calculer ce que ton application pourrait générer, et un exemple concret.</p>
      <p>Je m'appelle Noé Calmes, je conçois des applications mobiles pensées pour rapporter. Une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>. J'ai publié plus de 20 applications, donc les chiffres qui suivent ne sortent pas d'une étude, ils viennent du terrain.</p>

      <h2>La réalité : la plupart des applications ne rapportent presque rien</h2>
      <p>Il faut commencer par là, parce que les moyennes mentent. La grande majorité des applications sur les stores ne génèrent quasiment aucun revenu. Ce n'est pas une question de malchance : ce sont des applications lancées sans modèle de revenus pensé, sans parcours de conversion, sans raison de revenir. À l'autre bout, une minorité d'applications bien conçues captent l'essentiel des revenus. La question n'est donc pas « combien rapporte une application en moyenne », mais « dans quel groupe la tienne va tomber ».</p>

      <h2>Le calcul qui donne ton revenu</h2>
      <p>Le revenu d'une application par abonnement tient en une multiplication simple : <strong>utilisateurs actifs, multipliés par le taux de conversion en payant, multipliés par le prix de l'abonnement, multipliés par la durée pendant laquelle les gens restent.</strong></p>
      <p>Chacun de ces leviers se travaille. Le taux de conversion et la durée de rétention se jouent dans la conception de l'application, pas dans l'idée. C'est exactement là que se creuse l'écart entre une application qui rapporte et une qui stagne.</p>

      <h2>Un exemple concret : 13 000 € par mois</h2>
      <p>Prends l'application à 13 000 € par mois. Elle n'a pas des millions d'utilisateurs ni une idée révolutionnaire. Elle tourne autour de 30 000 téléchargements et environ 3 % d'abonnés payants. Fais le calcul : ce n'est pas le volume qui fait le revenu, c'est le taux de conversion et la rétention. Une idée banale, une application modeste, peu de téléchargements, et pourtant un revenu récurrent à cinq chiffres par mois. La différence, c'est l'expertise de conception, pas la taille de l'audience.</p>

      <h2>Pourquoi le revenu récurrent change tout</h2>
      <p>Une application qui vend une fois, avec un achat unique, gagne, puis doit retrouver un nouveau client le mois suivant. Une application par abonnement, elle, empile. Le client de janvier paie encore en juin si tu l'as fidélisé. C'est ce qu'on appelle le revenu mensuel récurrent, et c'est ce qui transforme une application en actif qui prend de la valeur, mois après mois. C'est pour ça que l'abonnement domine chez les applications qui rapportent vraiment.</p>

      <h2>Ce qui fait vraiment monter le revenu</h2>
      <p>Trois leviers, dans l'ordre d'impact. La rétention d'abord : garder un utilisateur qui paie coûte bien moins cher que d'en convertir un nouveau, et c'est elle qui fait grossir le récurrent. La conversion ensuite : l'onboarding, le moment où tu proposes l'essai, la clarté de ce que l'abonnement débloque. Le prix enfin, souvent sous-évalué, alors qu'un bon positionnement de prix peut fortement augmenter le revenu sans changer une ligne de code. Le nombre de téléchargements arrive loin derrière, parce qu'un gros volume mal converti ne rapporte rien.</p>

      <h2>Sois clair sur mon périmètre</h2>
      <p>Je conçois et développe l'application qui transforme tes utilisateurs en clients : onboarding, essai, abonnement, rétention, tout le marketing qui se passe <strong>dans</strong> l'application. Je ne fais pas la publicité qui amène les utilisateurs. Autrement dit, je n'augmente pas la première variable du calcul, le trafic, je maximise toutes les autres. Toi tu amènes les gens, je les transforme en clients qui paient et qui restent.</p>

      <h2>Comment estimer ce que ton idée pourrait rapporter</h2>
      <p>Pars de ton public réel, pas d'un rêve de millions d'utilisateurs. Combien de personnes peux-tu réellement toucher avec ton audience ou ta clientèle actuelle ? Applique un taux de conversion prudent, quelques pour cent, un prix d'abonnement crédible pour ta valeur, et une rétention réaliste. Tu obtiens une fourchette bien plus utile qu'une moyenne de marché. Pour aller plus loin sur les modèles, lis <a href="/blog/rentabiliser-application-mobile">comment rentabiliser une application mobile</a>, et pour mettre l'investissement en face, <a href="/blog/combien-coute-application-mobile">combien coûte une application mobile</a>.</p>
      <p>Si tu veux une première lecture chiffrée sur ton idée précise, le potentiel, le budget et le délai, tu peux faire ton <a href="/audit-app">audit gratuit</a> en deux minutes.</p>
    `,
  },
  {
    slug: 'rentabiliser-application-mobile',
    title: 'Comment rentabiliser une application mobile',
    metaTitle: 'Comment rentabiliser une application mobile | Noé Calmes',
    description: 'Comment rentabiliser ton application mobile : abonnement, freemium, conversion, rétention. La méthode concrète qui transforme tes utilisateurs en clients.',
    date: '2026-06-29',
    readTime: '7 min',
    finalCta: 'audit',
    content: `
      <p>Tu as une application mobile, ou tu veux en lancer une, et la vraie question n'est pas « combien ça coûte » mais « combien ça rapporte ». Rentabiliser une application mobile, ce n'est pas un détail qu'on règle après le lancement. C'est ce qui se décide <strong>avant</strong> la première ligne de code, dans la conception. Cette page te donne la vue d'ensemble : les modèles de revenus, ce qui fait vraiment la différence, et les pièges classiques.</p>
      <p>Je m'appelle Noé Calmes, je conçois et développe des applications mobiles pensées pour générer des revenus. Pour situer : une application que j'ai conçue génère environ <strong>13 000 € par mois</strong>, j'ai publié plus de 20 applications, et j'ai développé la première version d'une application qui a dépassé 300 000 utilisateurs. Ce que tu lis ici vient de cette expérience, pas d'un cours théorique.</p>

      <h2>Rentabiliser, ça veut dire quoi exactement</h2>
      <p>Une application rentable, c'est une application dont les revenus dépassent durablement ce qu'elle coûte à maintenir. Le mot important, c'est <strong>durablement</strong>. Un pic de téléchargements au lancement ne rentabilise rien. Ce qui rentabilise, c'est un revenu qui revient chaque mois, généré par des utilisateurs qui restent et qui paient. Toute la conception doit servir cet objectif : amener l'utilisateur à la valeur le plus vite possible, puis lui donner une raison de payer et de rester.</p>

      <h2>Les modèles de revenus, en clair</h2>
      <p>Il existe quatre grandes façons de faire payer une application, et tu peux en combiner plusieurs.</p>
      <p><strong>L'abonnement.</strong> L'utilisateur paie chaque mois ou chaque année pour un accès continu. C'est le modèle le plus rentable sur la durée, parce qu'il génère un revenu récurrent et prévisible. C'est aussi le plus exigeant : il faut une valeur qui justifie un paiement répété. La plupart des applications qui rapportent vraiment aujourd'hui tournent à l'abonnement.</p>
      <p><strong>Le freemium.</strong> L'application est gratuite, et tu fais payer des fonctionnalités avancées. L'avantage : tu enlèves la barrière à l'entrée, beaucoup de gens essaient. Le risque : si la version gratuite suffit, personne ne passe à la version payante. Le freemium se conçoit, il ne s'improvise pas.</p>
      <p><strong>Les achats intégrés.</strong> L'utilisateur paie ponctuellement pour débloquer un contenu, une option, un consommable. Pertinent pour les jeux, les outils créatifs, certaines niches. Moins prévisible que l'abonnement, mais utile en complément.</p>
      <p><strong>La publicité.</strong> Tu es payé à l'affichage ou au clic. Ça ne devient intéressant qu'avec un très gros volume d'utilisateurs actifs. Pour la plupart des projets d'entrepreneur, c'est un complément, pas un moteur.</p>
      <p>Si tu hésites entre ces modèles, l'article <a href="/blog/combien-coute-application-mobile">combien coûte une application mobile</a> t'aide à mettre le budget en face. Le bon modèle, lui, dépend surtout de ton usage réel et de ton public.</p>

      <h2>Le modèle ne suffit pas : tout se joue dans la conversion</h2>
      <p>Voici le point que presque tout le monde rate. Choisir un modèle de revenus ne rentabilise pas une application. Ce qui rentabilise, c'est la façon dont l'application <strong>transforme un utilisateur curieux en client qui paie</strong>. C'est un travail de conception : l'onboarding qui montre la valeur en quelques secondes, le bon moment pour proposer l'essai gratuit, la mécanique d'abonnement qui ne frustre pas, les habitudes qui font revenir.</p>
      <p>Un exemple concret. L'application qui génère 13 000 € par mois n'a pas une idée révolutionnaire ni des millions de téléchargements. Elle a environ 30 000 téléchargements et 3 % d'abonnés payants. La différence ne vient pas de l'idée, elle vient de la conception du parcours qui amène ces 3 % à payer, et à rester. C'est exactement ça, rentabiliser : ce n'est pas l'idée, c'est l'expertise.</p>

      <h2>Ce que je fais, et ce que je ne fais pas</h2>
      <p>Sois clair sur le périmètre, ça t'évite une déception. Je conçois et développe l'application qui transforme tes utilisateurs en clients : l'onboarding, l'essai, l'abonnement, la rétention, tout le marketing qui se passe <strong>dans</strong> l'application. Je ne fais pas la publicité qui amène les utilisateurs. La formule est simple : tu amènes les gens, je les transforme en clients. Si tu as déjà une audience, une clientèle ou un trafic, c'est exactement le terrain où une application bien conçue change tout.</p>

      <h2>Les erreurs qui tuent la rentabilité</h2>
      <p>Trois reviennent tout le temps. Construire d'abord et penser à la monétisation après : à ce stade le parcours n'a pas été pensé pour convertir, et le rattraper coûte cher. Empiler les fonctionnalités au lieu de soigner le moment où l'utilisateur découvre la valeur. Et viser le volume de téléchargements plutôt que la rétention, alors que c'est la rétention qui paie. Une application qu'on n'ouvre plus ne rapporte rien, peu importe le modèle.</p>

      <h2>Par où commencer</h2>
      <p>Avant de développer quoi que ce soit, il faut cadrer trois choses : le besoin réel, le public qui a déjà un comportement à transformer, et le modèle de revenus le plus adapté à cet usage. C'est ce cadrage qui sépare une application qui existe d'une application qui rapporte. Pour voir pourquoi tant d'applications passent à côté, lis aussi <a href="/blog/application-mobile-meilleur-investissement">pourquoi une application bien pensée est un vrai actif</a>. Et si tu veux une première lecture sur le potentiel de ton idée, le budget à prévoir et le délai, tu peux faire ton <a href="/audit-app">audit gratuit</a> en deux minutes.</p>
    `,
  },
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
