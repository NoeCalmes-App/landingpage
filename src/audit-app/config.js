// Configuration de la page /audit-app.
//
// L'URL de l'API Firebase est fournie via la variable d'environnement Vite
// VITE_AUDIT_API_URL (a definir dans .env.local).
//
// Exemple :
//   VITE_AUDIT_API_URL=https://europe-west1-manychatia-82692.cloudfunctions.net/verdictWeb

export const API_URL = import.meta.env.VITE_AUDIT_API_URL || ''

// Les 3 questions du hero (premiere personne, doutes pre-investissement).
// Triangle classique qualite-cout-temps applique au pre-investissement app :
// viabilite produit + cout d'entree + delai avant lancement.
// Q3 (temps) repond a la promesse differenciante "MVP en 45 jours".
export const HERO_QUESTIONS = [
  "Mon idée d'app peut-elle vraiment marcher ?",
  'Quel budget prévoir pour une première version ?',
  'Combien de temps avant de pouvoir la lancer ?',
]

// Validation minimale du prenom
export const FIRST_NAME_MIN_LENGTH = 2

// Etapes du formulaire.
// Step 0 = app_type
// Step 1 = idea_text (textarea libre + saisie vocale)
// Step 2 = project_stage_answer (maturite commerciale du lead)
// Step 3..6 = q1..q4 (multi-choice, auto-advance au clic)
//
// IMPORTANT : pour les choix, `value` est ce qui est ENVOYE a l'API (donc lu
// par le LLM). On garde des phrases descriptives plutot que des labels courts
// pour donner au LLM le contexte necessaire a sa generation.
export const FORM_STEPS = [
  {
    field: 'app_type',
    label: 'Type d\'app',
    question: 'Ton projet, c\'est plutôt…',
    infoItems: [
      { t: 'Mobile', d: 'une app téléchargeable sur tous les téléphones, via l\'App Store et le Google Play Store.' },
      { t: 'Web', d: 'une app accessible via une adresse internet (un site, ex : amazon.fr), sans rien à installer.' },
      { t: 'Mobile & web', d: 'les deux à la fois, interconnectés.' },
    ],
    type: 'choice',
    options: [
      { label: 'Application mobile', value: 'Une application mobile.' },
      { label: 'Application web', value: 'Une application web.' },
      { label: 'Application mobile & web', value: 'Une application mobile et web.' },
    ],
  },
  {
    field: 'idea_text',
    label: 'Ton idée',
    question:
      "Décris ton idée d'application : que ferait-elle et pour qui ?",
    helper: 'Plus tu donnes de détails, plus l\'audit sera précis.',
    placeholder: 'Une application qui permet à... pour...',
    // 30 chars min — seuil bas pour ne pas bloquer, mais force a sortir
    // une vraie phrase. Pour aller plus loin, le prospect peut joindre
    // un document (pdf/md/txt) — la dictee vocale est aussi dispo.
    minLength: 30,
    // Maxi 10000 chars (~1700 mots) : permet de cumuler dictee vocale +
    // copier-coller de paragraphes + texte tape sans frein. Le LLM gere
    // tres largement (Gemini Pro accepte 2M tokens).
    maxLength: 10000,
    type: 'textarea',
    voiceInput: true,
    // Active le bouton d'attachement (pdf/md/txt) sous le textarea.
    // Le texte extrait est envoye dans le payload comme `attached_content`.
    allowAttachment: true,
  },
  {
    field: 'project_stage_answer',
    label: 'Ton stade',
    question: "À quel stade en est ton projet d’application ?",
    type: 'choice',
    options: [
      {
        label: 'Prêt à démarrer, budget prévu',
        value:
          'Je suis prêt à démarrer, le budget est prévu.',
      },
      {
        label: 'Projet clair, financement en cours',
        value:
          'Le projet est clair, je finalise le financement.',
      },
      {
        label: 'Idée claire, budget à estimer',
        value:
          'J’ai l’idée, je veux estimer le budget et le délai.',
      },
      {
        label: 'Je veux d’abord valider l’idée',
        value:
          'Je veux d’abord savoir si l’idée peut fonctionner.',
      },
    ],
  },
  {
    field: 'q1_answer',
    label: 'Le marché',
    question:
      'Aujourd\'hui, des gens paient-ils déjà pour résoudre ce problème ?',
    type: 'choice',
    options: [
      {
        label: 'Oui, des concurrents payants existent',
        value:
          'Oui, il existe déjà des concurrents payants sur ce marché.',
      },
      {
        label: 'Quelques solutions gratuites seulement',
        value:
          'Il y a quelques alternatives gratuites, rien de payant.',
      },
      {
        label: 'Aucune solution existante',
        value:
          'Aucune solution n\'existe sur ce problème pour le moment.',
      },
    ],
  },
  {
    field: 'known_competitors',
    label: 'Tes références',
    question:
      'Quelles applications similaires connais-tu déjà ?',
    helper:
      'Optionnel — liste celles que tu as en tête (séparées par des virgules). Ça aide à mieux situer ton projet et à comparer les angles. Tu peux passer si rien ne te vient.',
    placeholder: 'Ex : App A, App B, App C',
    minLength: 0,
    maxLength: 600,
    type: 'textarea',
    voiceInput: false,
    optional: true,
    // Affiche cette etape UNIQUEMENT si Q1 indique qu'au moins une solution
    // existe (payante ou gratuite). Si "Aucune solution existante", on skip.
    skipIf: (answers) => {
      const q1 = answers?.q1_answer || ''
      return q1.toLowerCase().includes('aucune solution')
    },
  },
  {
    field: 'q2_answer',
    label: 'Ta cible',
    question:
      'Combien de personnes de ta cible as-tu interrogées ?',
    type: 'choice',
    options: [
      {
        label: 'Plus de 10 personnes — retours solides',
        value:
          'J\'ai parlé à plus de 10 personnes de ma cible, les retours sont solides.',
      },
      {
        label: 'Entre 1 et 9 personnes',
        value:
          'J\'ai parlé à quelques personnes (entre 1 et 9) de ma cible.',
      },
      {
        label: 'Aucune pour l\'instant',
        value:
          'Je n\'ai encore parlé à personne de ma cible.',
      },
    ],
  },
  {
    field: 'q3_answer',
    label: 'Le modèle économique',
    question:
      "Comment ton application va-t-elle gagner de l'argent ?",
    type: 'choice',
    options: [
      {
        label: 'Abonnement (mensuel ou annuel)',
        value: 'Le modèle économique est un abonnement (mensuel ou annuel).',
      },
      {
        label: 'Achat unique',
        value: 'Le modèle économique est un achat unique.',
      },
      {
        label: 'Commission sur transactions',
        value:
          'Le modèle économique est une commission prélevée sur les transactions.',
      },
      {
        label: 'Freemium (gratuit + premium)',
        value:
          'Le modèle économique est freemium : une version gratuite et une version premium payante.',
      },
      {
        label: 'Je ne sais pas encore',
        value:
          'Le modèle économique n\'est pas encore clairement défini.',
      },
    ],
  },
  {
    field: 'q4_answer',
    label: 'Le budget',
    question:
      'Quel budget peux-tu investir pour la première version ?',
    type: 'choice',
    options: [
      {
        label: '10 000 € et plus',
        value: 'Mon budget est de 10 000 € ou plus.',
      },
      {
        label: '7 500 € à 10 000 €',
        value: 'Mon budget se situe entre 7 500 € et 10 000 €.',
      },
      {
        label: '5 000 € à 7 500 €',
        value: 'Mon budget se situe entre 5 000 € et 7 500 €.',
      },
      {
        label: 'Moins de 5 000 €',
        value: 'Mon budget est inférieur à 5 000 €.',
      },
    ],
  },
]
