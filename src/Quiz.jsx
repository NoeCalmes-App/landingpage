// Pages quizz SEO autonomes : /quiz et /quiz/{slug}.
//
// INTENTION (20/08/2026)
//
// Ce ne sont pas des gadgets d'engagement. Ce sont des pages d'entree SEO sur
// des requetes d'ACHETEUR, au sens du filtre d'intention de
// `documentation/strategy/seo/content-plan.md` : quelqu'un qui tape « faut-il
// une application pour mon entreprise » ou « application ou site web » est en
// train de decider un investissement. Un quizz repond mieux qu'un article a
// une question d'arbitrage, parce qu'il rend le verdict personnel.
//
// Regle de conception SEO : le contenu indexable ne doit JAMAIS dependre d'une
// interaction. Chaque page porte donc un vrai texte (intro + sections) autour
// du quizz. Le quizz apporte l'engagement, le texte apporte le classement.
//
// Chaque quizz se termine sur /audit-app, qui reste le point de conversion.

import { useState, useEffect } from 'react'
import { lienInterne, appliquerMeta, retirerPrerender } from './seo.js'
import { ResumerAvecIA, RetourEnHaut } from './BlogUI.jsx'

const mePhoto = '/assets/images/profile/me.webp'

export const QUIZZES = [
  {
    slug: 'ai-je-besoin-application-mobile',
    h1: "As-tu vraiment besoin d'une application mobile ?",
    metaTitle: "As-tu besoin d'une application mobile ? Le test | Noé Calmes",
    description: "7 questions pour savoir si une application mobile a du sens pour ton activité, ou si tu ferais mieux d'attendre. Réponse immédiate et sans inscription.",
    resume: "7 questions pour savoir si une application a du sens pour ton activité, ou si tu ferais mieux d'attendre.",
    intro: [
      "Une application mobile coûte entre 5 000 et 30 000 €. C'est un investissement, pas un achat d'impulsion, et la mauvaise réponse coûte cher dans les deux sens : développer trop tôt, c'est payer pour un produit que personne n'ouvrira ; attendre trop longtemps, c'est laisser un revenu récurrent sur la table.",
      "Ce test pose les sept questions que je pose moi-même en premier appel. Il ne remplace pas une discussion, mais il te dit honnêtement dans quelle situation tu te trouves.",
    ],
    questions: [
      {
        q: "Tu vends déjà quelque chose aujourd'hui ?",
        options: [
          { label: "Oui, j'ai des clients qui paient", points: 3 },
          { label: "Oui, mais de façon irrégulière", points: 2 },
          { label: "Pas encore, c'est un projet", points: 0 },
        ],
      },
      {
        q: "Tes clients ou ton audience reviennent-ils régulièrement ?",
        options: [
          { label: "Oui, chaque semaine ou presque", points: 3 },
          { label: "De temps en temps, quelques fois par an", points: 1 },
          { label: "Une seule fois, c'est un achat ponctuel", points: 0 },
        ],
      },
      {
        q: "Combien de personnes te suivent ou te font confiance ?",
        options: [
          { label: "Plus de 1 000", points: 3 },
          { label: "Entre 100 et 1 000", points: 2 },
          { label: "Moins de 100, ou je démarre", points: 0 },
        ],
      },
      {
        q: "Est-ce que tu passes du temps sur des tâches répétitives pour tes clients ?",
        options: [
          { label: "Oui, beaucoup, et ça me limite", points: 3 },
          { label: "Un peu, c'est gérable", points: 1 },
          { label: "Non, pas vraiment", points: 0 },
        ],
      },
      {
        q: "Ce que tu vends s'utilise plutôt sur téléphone ou sur ordinateur ?",
        options: [
          { label: "Sur téléphone, en mobilité ou au quotidien", points: 3 },
          { label: "Les deux, ça dépend", points: 1 },
          { label: "Sur ordinateur, en session longue", points: 0 },
        ],
      },
      {
        q: "As-tu un budget identifié pour ce projet ?",
        options: [
          { label: "Oui, entre 5 000 et 30 000 €", points: 3 },
          { label: "Un financement est en cours", points: 2 },
          { label: "Pas encore du tout", points: 0 },
        ],
      },
      {
        q: "Tes clients te demandent-ils déjà quelque chose que tu ne peux pas leur donner ?",
        options: [
          { label: "Oui, un suivi, un accès, un outil", points: 3 },
          { label: "Parfois, sans insister", points: 1 },
          { label: "Non", points: 0 },
        ],
      },
    ],
    resultats: [
      {
        min: 15,
        titre: "Oui, et tu as probablement déjà trop attendu",
        texte: "Tu vends, tes clients reviennent, ton usage est mobile et tu as un budget. C'est le profil pour lequel une application transforme une activité en revenu récurrent plutôt qu'en heures facturées. Le sujet n'est plus « faut-il », c'est « quel périmètre pour la première version ».",
      },
      {
        min: 9,
        titre: "Oui, mais pas n'importe laquelle",
        texte: "Les bases sont là, il manque une pièce : la fréquence d'usage, la taille de ton audience ou le budget. Une application a du sens pour toi, à condition de commencer par une première version resserrée qui valide le modèle avant d'investir davantage.",
      },
      {
        min: 0,
        titre: "Pas encore, et c'est une bonne nouvelle",
        texte: "Développer maintenant reviendrait à construire une vitrine pour une activité qui n'a pas encore ses clients. Concentre-toi d'abord sur la vente et la récurrence. Une application amplifie une activité qui fonctionne, elle ne la crée pas.",
      },
    ],
    contenu: [
      {
        h2: "Les trois signaux qui justifient vraiment une application",
        p: "Au-delà du score, trois signaux reviennent chez tous les projets qui finissent par rapporter. D'abord une activité qui existe déjà : des clients, une audience, un service vendu. Ensuite un usage qui se répète, parce qu'un revenu récurrent suppose une valeur qui se renouvelle. Enfin un usage réellement mobile, au quotidien ou en mobilité, sinon un site fait le travail pour bien moins cher.",
      },
      {
        h2: "Les mauvaises raisons de vouloir une application",
        p: "Vouloir « être sur les stores » pour la crédibilité, copier un concurrent qui vient de lancer la sienne, ou remplacer un site qui fonctionne : ces trois motivations produisent des applications que personne n'ouvre après la première semaine. Une application n'est pas un support de communication, c'est un produit avec ses propres utilisateurs et sa propre logique de revenus.",
      },
      {
        h2: "Et si la réponse est non pour l'instant",
        p: "Ce n'est pas un échec, c'est une économie. La bonne séquence est presque toujours la même : valider que des gens paient, installer une régularité dans la relation, puis seulement outiller cette relation avec une application. Beaucoup de projets que j'accompagne sont passés par cette étape avant de me contacter.",
      },
    ],
  },
  {
    slug: 'application-ou-site-web',
    h1: "Application mobile ou site web : lequel pour ton activité ?",
    metaTitle: "Application mobile ou site web : lequel choisir | Noé Calmes",
    description: "6 questions pour savoir si ton projet est une application mobile, une application web, les deux, ou juste un site vitrine. Pas une question de budget.",
    resume: "6 questions pour trancher entre application mobile, application web et simple site vitrine.",
    intro: [
      "C'est l'arbitrage le plus fréquent, et le plus mal tranché. Beaucoup paient une application mobile là où une application web aurait mieux fait le travail, pour moins de contraintes et plus vite. Et quelques-uns paient une application alors qu'un simple site vitrine aurait suffi.",
      "Attention, trois choses différentes se cachent derrière le mot « web ». Un site vitrine présente ton activité, il sert à être trouvé sur Google. Une application web est un outil : on s'y connecte, on y travaille, elle gère des utilisateurs et de l'argent. Ce ne sont pas les mêmes produits, ni les mêmes budgets.",
      "La bonne réponse ne dépend ni de la mode ni du budget. Elle dépend de qui va s'en servir, dans quel contexte, et à quelle fréquence.",
    ],
    questions: [
      {
        q: "Qui va s'en servir au quotidien ?",
        options: [
          { label: "Des professionnels, dans leur travail", points: 3, web: 3 },
          { label: "Le grand public, des particuliers", points: 3, web: -3 },
          { label: "Des particuliers qui échangent entre eux", points: 3, web: -2 },
          { label: "Personne vraiment, je veux surtout être trouvé", points: 0, web: 0 },
        ],
      },
      {
        q: "À quelle fréquence s'en serviraient-ils ?",
        options: [
          { label: "Tous les jours ou presque", points: 3, web: 0 },
          { label: "Une fois par semaine", points: 2, web: 0 },
          { label: "Quelques fois par an", points: 0, web: 0 },
        ],
      },
      {
        q: "Dans quel contexte l'utiliseraient-ils ?",
        options: [
          { label: "Assis devant un ordinateur, en session longue", points: 2, web: 3 },
          { label: "En déplacement, sur le terrain, au quotidien", points: 2, web: -3 },
          { label: "Chez eux, indifféremment", points: 1, web: 0 },
        ],
      },
      {
        q: "As-tu besoin de notifications pour les faire revenir ?",
        options: [
          { label: "Oui, c'est central pour mon service", points: 2, web: -3 },
          { label: "Ce serait un plus", points: 1, web: -1 },
          { label: "Non, un email suffit", points: 0, web: 1 },
        ],
      },
      {
        q: "Ton service a-t-il besoin du téléphone lui-même (appareil photo, position, hors connexion) ?",
        options: [
          { label: "Oui, c'est indispensable", points: 2, web: -3 },
          { label: "Ce serait utile parfois", points: 1, web: -1 },
          { label: "Non, pas du tout", points: 0, web: 1 },
        ],
      },
      {
        q: "Combien de profils différents vont s'y connecter (toi, ton équipe, tes clients) ?",
        options: [
          { label: "Plusieurs, avec des droits différents et un espace d'administration", points: 3, web: 3 },
          { label: "Deux, moi et mes utilisateurs", points: 2, web: 1 },
          { label: "Un seul type d'utilisateur", points: 1, web: -1 },
        ],
      },
    ],
    resultats: [
      {
        maxPoints: 4,
        titre: "Un site vitrine, et ce n'est pas mon métier",
        texte: "Usage rare, pas de vrai outil derrière, et surtout un enjeu de visibilité plutôt que d'usage : ce qu'il te faut, c'est un site qui présente ton activité et qui se trouve sur Google. Ça coûte bien moins cher qu'une application, et je préfère te le dire franchement plutôt que de te vendre autre chose. Je ne fais pas de site vitrine. Reviens me voir le jour où tu as un outil à construire ou quelque chose à encaisser.",
      },
      {
        minWeb: 4,
        titre: "Une application web (SaaS)",
        texte: "Des professionnels, devant un écran, avec plusieurs profils : ton projet est une application web, pas une application de téléphone. Personne ne cherche son outil de travail dans l'App Store. Attention à la confusion la plus fréquente : une application web n'est pas un site vitrine. leboncoin.fr, airbnb.com ou ton logiciel de facturation en ligne sont des applications web : on s'y connecte, on y gère un compte, on y encaisse. Deux avantages concrets : la mise en ligne se fait le jour où tu veux, sans compte développeur ni validation d'Apple, et aucun store ne prélève de commission sur ce que tu encaisses.",
      },
      {
        maxWeb: -7,
        titre: "Une application mobile",
        texte: "Usage fréquent, contexte mobile, besoin de faire revenir tes utilisateurs et un service qui a besoin du téléphone lui-même : c'est exactement le terrain d'une application mobile. Une plateforme web ne te donnera ni la place sur l'écran d'accueil, ni la notification, ni le paiement en deux taps. Le store prend 15 à 30 % au passage, mais c'est lui qui t'amène le passage et qui encaisse sans que personne ait à saisir une carte. Pour du grand public, ce loyer se paie.",
      },
      {
        titre: "Les deux, mais dans cet ordre",
        texte: "Tes signaux se partagent, et c'est le cas le plus courant des projets sérieux : des utilisateurs sur leur téléphone d'un côté, et toi qui as besoin d'un espace d'administration de l'autre pour piloter, facturer et suivre. Commence par le support où se trouve la valeur immédiate, ajoute l'autre ensuite, une fois que le premier tourne. C'est moins cher que de tout lancer d'un coup, et ça évite de construire la moitié d'un produit sur deux fronts à la fois.",
      },
    ],
    contenu: [
      {
        h2: "Site vitrine, application web, application mobile : trois produits différents",
        p: "Le mot « web » recouvre deux choses qui n'ont rien à voir. Un site vitrine présente ton activité : quelques pages, un formulaire de contact, un objectif de visibilité sur Google. Une application web, ce qu'on appelle aussi un SaaS, est un produit : on s'y connecte avec un identifiant, il y a des comptes, des profils, des données, souvent des paiements. leboncoin.fr et airbnb.com sont des applications web. Confondre les deux est l'erreur la plus chère de ce sujet, dans les deux sens.",
      },
      {
        h2: "Ce qu'une application mobile fait qu'une application web ne fait pas",
        p: "Trois choses, concrètement. Elle occupe une place sur l'écran d'accueil, donc elle est ouverte sans intention préalable. Elle peut envoyer une notification, donc elle décide du moment où l'utilisateur revient. Et elle encaisse un abonnement via l'App Store ou Google Play, avec un paiement en deux taps que l'utilisateur oublie de résilier bien plus souvent qu'un prélèvement classique. Si ton service vise le grand public et vit de la répétition, ces trois choses valent leur prix.",
      },
      {
        h2: "Ce qu'une application web fait qu'une application mobile ne fait pas",
        p: "Elle se met en ligne le jour où tu veux : pas de compte développeur, pas de validation d'Apple, pas de calendrier de mise à jour imposé. À périmètre égal, ça représente deux à trois semaines de moins. Elle n'a pas de commission de store, donc il te reste environ 78 % de ce que tu encaisses contre environ 70 % sur mobile. Et elle n'a rien à installer : un professionnel qui doit équiper son équipe envoie une adresse, pas une demande de téléchargement. En contrepartie, personne ne t'amène d'utilisateurs : c'est toi qui vas les chercher.",
      },
      {
        h2: "L'erreur de croire que c'est une question de budget",
        p: "On ne choisit pas son support pour des raisons de prix, et surtout pas en se disant que le web serait l'option économique. Ce qui fait le montant d'un projet, c'est son périmètre : le nombre d'écrans, les profils qui se connectent, les paiements, l'espace d'administration. On choisit selon qui s'en sert et dans quel contexte. Un outil utilisé trois fois par an ne mérite aucune application, même avec un budget confortable. Un outil utilisé tous les jours en mérite une, quitte à réduire le périmètre de la première version.",
      },
    ],
  },
  {
    slug: 'budget-application-mobile',
    h1: "Quel budget prévoir pour ton application mobile ?",
    metaTitle: "Quel budget pour ton application mobile ? Le test | Noé Calmes",
    description: "6 questions pour situer le budget réaliste de ton application mobile, selon son périmètre, ses fonctionnalités et le niveau de finition attendu.",
    resume: "6 questions pour situer le budget réaliste de ton projet, selon son périmètre et ses fonctionnalités.",
    intro: [
      "« Combien coûte une application ? » n'a pas de réponse unique, et les fourchettes qu'on trouve en ligne vont de 3 000 à 200 000 €, ce qui n'aide personne. Le prix dépend du périmètre, pas de la technologie.",
      "Ce test situe ton projet dans la bonne fourchette en six questions. Il ne remplace pas un devis, mais il t'évite d'arriver en discussion avec une idée du budget décalée d'un facteur cinq.",
    ],
    questions: [
      {
        q: "Combien d'écrans principaux imagines-tu ?",
        options: [
          { label: "Moins de 5", points: 0 },
          { label: "Entre 5 et 15", points: 2 },
          { label: "Plus de 15", points: 4 },
        ],
      },
      {
        q: "Les utilisateurs doivent-ils créer un compte ?",
        options: [
          { label: "Non, l'application fonctionne seule", points: 0 },
          { label: "Oui, un compte simple", points: 2 },
          { label: "Oui, avec des rôles différents (client, professionnel, administrateur)", points: 4 },
        ],
      },
      {
        q: "Y a-t-il des paiements dans l'application ?",
        options: [
          { label: "Non", points: 0 },
          { label: "Un abonnement ou un achat via les stores", points: 2 },
          { label: "Des paiements entre utilisateurs, ou une facturation complexe", points: 4 },
        ],
      },
      {
        q: "As-tu besoin que des données soient partagées entre utilisateurs ou synchronisées ?",
        options: [
          { label: "Non, tout reste sur le téléphone", points: 0 },
          { label: "Oui, un serveur simple suffit", points: 2 },
          { label: "Oui, avec du temps réel (messagerie, suivi en direct)", points: 4 },
        ],
      },
      {
        q: "L'application doit-elle se connecter à des outils que tu utilises déjà ?",
        options: [
          { label: "Non", points: 0 },
          { label: "Un ou deux (agenda, paiement, emailing)", points: 2 },
          { label: "Plusieurs, dont un logiciel métier", points: 4 },
        ],
      },
      {
        q: "Quel niveau de finition visuelle attends-tu ?",
        options: [
          { label: "Propre et efficace, sans plus", points: 0 },
          { label: "Soigné, cohérent avec ma marque", points: 2 },
          { label: "Travaillé, avec des animations et une identité forte", points: 3 },
        ],
      },
    ],
    resultats: [
      {
        min: 15,
        titre: "Plutôt 15 000 à 30 000 €",
        texte: "Plusieurs types d'utilisateurs, des paiements, du temps réel ou des connexions à des outils métier : ton projet est une vraie plateforme, pas une première version. Le bon réflexe est de découper : identifier le cœur qui prouve le modèle, le livrer d'abord, et construire le reste ensuite avec des revenus en face.",
      },
      {
        min: 7,
        titre: "Plutôt 8 000 à 15 000 €",
        texte: "Comptes utilisateurs, données synchronisées, un abonnement : c'est le périmètre le plus courant chez mes clients, et celui où le rapport entre l'investissement et le revenu potentiel est le plus intéressant. Une première version en 4 à 6 semaines est réaliste.",
      },
      {
        min: 0,
        titre: "Plutôt 5 000 à 8 000 €",
        texte: "Périmètre resserré, peu d'écrans, pas de complexité serveur : c'est le format d'une première version qui valide une idée sans engager tout ton budget. C'est souvent la meilleure décision, même quand tu as les moyens de faire plus gros.",
      },
    ],
    contenu: [
      {
        h2: "Ce qui fait vraiment monter le prix",
        p: "Ce n'est presque jamais le nombre d'écrans. Ce sont trois choses : le nombre de types d'utilisateurs différents, parce que chacun multiplie les parcours à concevoir et à tester ; le temps réel, qui change l'architecture entière ; et les connexions à des outils existants, dont la documentation et les limites ne se découvrent qu'en les branchant.",
      },
      {
        h2: "Pourquoi le tarif fixe change la conversation",
        p: "À la journée, chaque hésitation de ta part coûte de l'argent, et tu finis par éviter les questions. Avec un tarif fixe posé après le cadrage, le périmètre est le sujet, pas le compteur. C'est aussi ce qui force à trancher tôt ce qui est vraiment utile, et c'est là que l'essentiel des économies se fait.",
      },
      {
        h2: "Le budget n'est que la moitié du calcul",
        p: "Une application à 9 000 € qui rembourse son coût avec 68 abonnés à 11 € par mois est un meilleur investissement qu'une application à 5 000 € que personne ne paie. Avant de comparer des devis, pose le calcul dans l'autre sens : combien de clients payants faut-il pour rentabiliser, et est-ce que ce nombre est atteignable avec ton audience actuelle.",
      },
    ],
  },
]

export function quizParSlug(slug) {
  return QUIZZES.find((q) => q.slug === slug) || null
}

// Deux axes. `points` mesure l'intensite du besoin (un vrai outil, ou juste etre trouve).
// `web` est signe : positif pousse vers l'ordinateur, negatif vers le telephone.
// Les resultats sont evalues dans l'ordre, le premier compatible gagne.
function scoresDe(quiz, reponses) {
  let points = 0
  let web = 0
  quiz.questions.forEach((question, i) => {
    const option = question.options[reponses[i]]
    if (!option) return
    points += option.points || 0
    web += option.web || 0
  })
  return { points, web }
}

function resultatPour(quiz, scores) {
  const { points, web } = scores
  const compatible = (r) => {
    if (r.min !== undefined && points < r.min) return false
    if (r.maxPoints !== undefined && points > r.maxPoints) return false
    if (r.minWeb !== undefined && web < r.minWeb) return false
    if (r.maxWeb !== undefined && web > r.maxWeb) return false
    return true
  }
  return quiz.resultats.find(compatible) || quiz.resultats[quiz.resultats.length - 1]
}

// ─── Briques ─────────────────────────────────────────────────────────────────

function Entete({ onAccueil, onBookCall }) {
  return (
    <nav className="fixed inset-x-0 top-2.5 md:top-4.5 z-50 flex justify-center px-4 md:px-6">
      <div className="w-full max-w-230">
        <div className="backdrop-blur-md border border-[#70707029] shadow-[0_1px_3px_#00000017] rounded-[40px] bg-[#fffefc3d]">
          <div className="flex items-center justify-center min-[480px]:justify-between h-20 px-5 md:px-7">
            <a href="/" onClick={(e) => { e.preventDefault(); onAccueil() }} className="flex items-center gap-3 text-left cursor-pointer min-w-0">
              <img src={mePhoto} alt="Noé Calmes" width="44" height="44" className="h-11 w-11 rounded-full object-cover shrink-0" />
              <span className="flex flex-col min-w-0">
                <span className="text-text font-bold text-lg md:text-1xl leading-tight tracking-tight truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>Noé Calmes</span>
                <span className="text-grey text-xs md:text-md leading-tight font-normal truncate">Expert en applications mobiles et web</span>
              </span>
            </a>
            <button onClick={onBookCall} className="hidden sm:inline-block bg-[#131313] text-white text-md font-medium px-8 py-3 rounded-full hover:bg-black transition-colors cursor-pointer whitespace-nowrap">
              J'ai une idée
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Ariane({ courant, onAccueil, onNaviguer, avecHub = true }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[0.82rem] text-grey mb-5">
      <a href="/" onClick={(e) => { e.preventDefault(); onAccueil() }} className="text-brand hover:underline">Accueil</a>
      <span className="mx-2">/</span>
      {avecHub ? (
        <>
          <a href={lienInterne('/quiz')} onClick={(e) => { e.preventDefault(); onNaviguer('/quiz') }} className="text-brand hover:underline">Tests</a>
          <span className="mx-2">/</span>
        </>
      ) : null}
      <span>{courant}</span>
    </nav>
  )
}

// ─── Moteur de quizz ─────────────────────────────────────────────────────────
//
// Volontairement sans etat serveur : le quizz doit fonctionner instantanement,
// sans inscription ni collecte. La conversion se fait en sortie, vers
// /audit-app, qui est l'outil de qualification.

function MoteurQuiz({ quiz, onAuditApp, onBookCall }) {
  const [reponses, setReponses] = useState({})
  const [termine, setTermine] = useState(false)

  const total = quiz.questions.length
  const repondues = Object.keys(reponses).length
  const resultat = termine ? resultatPour(quiz, scoresDe(quiz, reponses)) : null

  return (
    <div className="mt-10">
      {!termine ? (
        <>
          <div className="flex items-center justify-between text-[0.82rem] text-grey mb-3">
            <span>{repondues} / {total} répondues</span>
            <span>{Math.round((repondues / total) * 100)} %</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-card-border/60 overflow-hidden mb-8">
            <div className="h-full bg-brand transition-all duration-300" style={{ width: `${(repondues / total) * 100}%` }} />
          </div>

          <ol className="flex flex-col gap-4 list-none p-0">
            {quiz.questions.map((question, i) => (
              <li key={question.q} className="bg-card border border-card-border rounded-[15px] p-6">
                <p className="font-heading text-text text-[0.98rem] font-bold leading-snug mb-4">
                  <span className="text-brand mr-2">{i + 1}.</span>{question.q}
                </p>
                <div className="flex flex-col gap-2.5">
                  {question.options.map((option, j) => {
                    const choisi = reponses[i] === j
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setReponses((r) => ({ ...r, [i]: j }))}
                        className={`text-left text-[0.9rem] leading-relaxed px-4 py-3 rounded-[10px] border transition-colors cursor-pointer ${
                          choisi
                            ? 'border-brand bg-brand/8 text-text font-medium'
                            : 'border-card-border bg-surface text-grey hover:border-brand/40'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </li>
            ))}
          </ol>

          <button
            type="button"
            disabled={repondues < total}
            onClick={() => { setTermine(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={`mt-7 w-full sm:w-auto inline-flex justify-center items-center bg-brand text-surface font-semibold text-[0.95rem] px-8 py-3.5 rounded-full transition-opacity ${
              repondues < total ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
            }`}
          >
            {repondues < total ? `Réponds aux ${total - repondues} dernières` : 'Voir mon résultat'}
          </button>
        </>
      ) : (
        <div className="bg-card border border-card-border rounded-[15px] p-7 md:p-9">
          <p className="text-brand font-bold text-[0.8rem] tracking-widest mb-3">TON RÉSULTAT</p>
          <p className="font-heading text-text text-xl md:text-2xl font-bold leading-snug mb-4">{resultat.titre}</p>
          <p className="text-grey text-[0.93rem] md:text-[0.97rem] leading-relaxed mb-7">{resultat.texte}</p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button onClick={onAuditApp} className="inline-flex justify-center items-center bg-brand text-surface font-semibold text-[0.95rem] px-7 py-3.5 rounded-full cursor-pointer">
              Approfondir avec l'audit gratuit
            </button>
            <button onClick={onBookCall} className="inline-flex justify-center items-center bg-[#ececf0] text-text font-semibold text-[0.95rem] px-7 py-3.5 rounded-full cursor-pointer">
              En parler sur WhatsApp
            </button>
          </div>

          <button
            type="button"
            onClick={() => { setReponses({}); setTermine(false) }}
            className="mt-5 text-brand text-[0.85rem] font-medium hover:underline cursor-pointer"
          >
            Refaire le test
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Page d'un quizz ─────────────────────────────────────────────────────────

export function PageQuiz({ quiz, onAccueil, onBookCall, onAuditApp, onNaviguer }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    retirerPrerender()
    appliquerMeta({
      path: `/quiz/${quiz.slug}`,
      title: quiz.metaTitle,
      description: quiz.description,
    })
  }, [quiz])

  const autres = QUIZZES.filter((q) => q.slug !== quiz.slug)

  return (
    <div className="min-h-screen bg-surface">
      <Entete onAccueil={onAccueil} onBookCall={onBookCall} />
      <main className="max-w-160 mx-auto px-5 pt-32 md:pt-36 pb-20">
        <Ariane courant={quiz.h1} onAccueil={onAccueil} onNaviguer={onNaviguer} />

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-7">
          {quiz.h1}
        </h1>

        <div className="prose-blog text-text text-[0.95rem] md:text-base leading-relaxed">
          {quiz.intro.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>

        <MoteurQuiz quiz={quiz} onAuditApp={onAuditApp} onBookCall={onBookCall} />

        {/* Le contenu de fond est HORS du quizz : il doit etre lisible et
            indexable sans aucune interaction. C'est lui qui porte le
            referencement, le quizz porte l'engagement. */}
        <div className="mt-14 prose-blog text-text text-[0.95rem] md:text-base leading-relaxed">
          {quiz.contenu.map(({ h2, p }) => (
            <div key={h2}>
              <h2>{h2}</h2>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <ResumerAvecIA chemin={`/quiz/${quiz.slug}`} titre={quiz.h1} />

        <nav aria-label="Autres tests" className="mt-14 pt-10 border-t border-card-border">
          <h2 className="font-heading text-text text-lg md:text-xl font-bold mb-5">Les autres tests</h2>
          <ul className="flex flex-col gap-3">
            {autres.map((q) => (
              <li key={q.slug}>
                <a
                  href={lienInterne(`/quiz/${q.slug}`)}
                  onClick={(e) => { e.preventDefault(); onNaviguer(`/quiz/${q.slug}`) }}
                  className="group block bg-card border border-card-border rounded-[15px] p-5 transition-colors hover:border-brand/40"
                >
                  <span className="block font-heading text-text text-[0.98rem] font-bold leading-snug mb-1.5 group-hover:text-brand transition-colors">{q.h1}</span>
                  <span className="block text-grey text-[0.85rem] leading-relaxed">{q.resume}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={lienInterne('/blog/combien-coute-application-mobile')}
                onClick={(e) => { e.preventDefault(); onNaviguer('/blog/combien-coute-application-mobile') }}
                className="group block bg-card border border-card-border rounded-[15px] p-5 transition-colors hover:border-brand/40"
              >
                <span className="block font-heading text-text text-[0.98rem] font-bold leading-snug mb-1.5 group-hover:text-brand transition-colors">Combien coûte une application mobile</span>
                <span className="block text-grey text-[0.85rem] leading-relaxed">Les fourchettes réelles du marché et ce qui fait varier le budget.</span>
              </a>
            </li>
          </ul>
        </nav>
      </main>
      <RetourEnHaut />
    </div>
  )
}

// ─── Hub /quiz ───────────────────────────────────────────────────────────────

export function PageQuizHub({ onAccueil, onBookCall, onNaviguer }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    retirerPrerender()
    appliquerMeta({
      path: '/quiz',
      title: "Tests : ton projet d'application mobile en 2 minutes | Noé Calmes",
      description: "Trois tests gratuits pour décider : as-tu besoin d'une application, application ou site web, et quel budget prévoir. Sans inscription.",
    })
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <Entete onAccueil={onAccueil} onBookCall={onBookCall} />
      <main className="max-w-160 mx-auto px-5 pt-32 md:pt-36 pb-20">
        <Ariane courant="Tests" onAccueil={onAccueil} onNaviguer={onNaviguer} avecHub={false} />

        <h1 className="font-heading text-text text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.2] mb-7">
          Teste ton projet d'application avant d'investir
        </h1>

        <div className="prose-blog text-text text-[0.95rem] md:text-base leading-relaxed">
          <p>Trois questions reviennent systématiquement avant un projet d'application : est-ce que j'en ai vraiment besoin, est-ce qu'un site ne suffirait pas, et combien ça va coûter. Voici trois tests courts pour y répondre, sans inscription et sans que tu aies à me parler.</p>
          <p>Chacun reprend les questions que je pose en premier appel. Le but n'est pas de te vendre une application, il est de t'éviter d'en payer une dont tu n'as pas besoin.</p>
        </div>

        <ul className="mt-10 flex flex-col gap-4">
          {QUIZZES.map((q) => (
            <li key={q.slug}>
              <a
                href={lienInterne(`/quiz/${q.slug}`)}
                onClick={(e) => { e.preventDefault(); onNaviguer(`/quiz/${q.slug}`) }}
                className="group block bg-card border border-card-border rounded-[15px] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)]"
              >
                <span className="block text-brand text-[0.78rem] font-bold tracking-widest mb-2">
                  {q.questions.length} QUESTIONS
                </span>
                <span className="block font-heading text-text text-[1.05rem] md:text-[1.15rem] font-bold leading-snug mb-2 group-hover:text-brand transition-colors">
                  {q.h1}
                </span>
                <span className="block text-grey text-[0.88rem] leading-relaxed">{q.resume}</span>
                <span className="inline-block text-brand text-[0.88rem] font-semibold mt-4">Faire le test &rarr;</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 prose-blog text-text text-[0.95rem] md:text-base leading-relaxed">
          <h2>Et après le test</h2>
          <p>Un test donne une direction, pas un devis. Si le résultat te confirme que ton projet tient, l'étape suivante est l'<a href={lienInterne('/audit-app')} onClick={(e) => { e.preventDefault(); onNaviguer('/audit-app') }}>audit gratuit</a> : il prend deux minutes de plus, mais il porte sur ton idée précise et te donne le potentiel, le budget et le délai.</p>
          <p>Si tu préfères lire avant de tester, commence par <a href={lienInterne('/blog/rentabiliser-application-mobile')} onClick={(e) => { e.preventDefault(); onNaviguer('/blog/rentabiliser-application-mobile') }}>comment rentabiliser une application mobile</a>, ou par <a href={lienInterne('/creation-application-mobile')} onClick={(e) => { e.preventDefault(); onNaviguer('/creation-application-mobile') }}>ma méthode</a> si tu veux savoir comment je travaille.</p>
        </div>
      </main>
    </div>
  )
}
