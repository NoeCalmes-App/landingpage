// Configuration de la page /audit-app.
//
// L'URL de l'API Firebase est fournie via la variable d'environnement Vite
// VITE_AUDIT_API_URL (a definir dans .env.local).
//
// Exemple :
//   VITE_AUDIT_API_URL=https://europe-west1-manychatia-82692.cloudfunctions.net/verdictWeb

export const API_URL = import.meta.env.VITE_AUDIT_API_URL || ''

// URL de l'endpoint qui capture les audits abandonnés (1 POST par étape
// franchie). Si non défini, on dérive en remplaçant /verdictWeb par
// /auditPartial (même région, même projet Firebase).
export const PARTIAL_API_URL =
  import.meta.env.VITE_AUDIT_PARTIAL_API_URL ||
  (API_URL ? API_URL.replace(/\/verdictWeb\b/, '/auditPartial') : '')

// URL du Calendly affiche apres un verdict en branche A.
export const CALENDLY_URL =
  'https://calendly.com/noecalmes-app/appel-app-mobile?primary_color=645cff'

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
// Step 0 = idea_text (textarea libre + saisie vocale)
// Step 1..4 = q1..q4 (multi-choice, auto-advance au clic)
//
// IMPORTANT : pour les choix, `value` est ce qui est ENVOYE a l'API (donc lu
// par le LLM). On garde des phrases descriptives plutot que des labels courts
// pour donner au LLM le contexte necessaire a sa generation.
export const FORM_STEPS = [
  {
    field: 'idea_text',
    label: 'Votre idée',
    question:
      "Décrivez votre idée d'application : que ferait-elle et pour qui ?",
    helper: 'Plus vous donnez de détails, plus l\'audit sera précis.',
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
    label: 'Vos références',
    question:
      'Quelles applications similaires connaissez-vous déjà ?',
    helper:
      'Optionnel — listez celles que vous avez en tête (séparées par des virgules). Ça aide à mieux situer votre projet et à comparer les angles. Vous pouvez passer si rien ne vous vient.',
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
    label: 'Votre cible',
    question:
      'Combien de personnes de votre cible avez-vous interrogées ?',
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
      "Comment votre application va-t-elle gagner de l'argent ?",
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
      'Quel budget pouvez-vous investir pour la première version ?',
    type: 'choice',
    options: [
      {
        label: 'Plus de 20 000 €',
        value: 'Mon budget est supérieur à 20 000 €.',
      },
      {
        label: '10 000 € à 20 000 €',
        value: 'Mon budget se situe entre 10 000 € et 20 000 €.',
      },
      {
        label: '3 500 € à 10 000 €',
        value: 'Mon budget se situe entre 3 500 € et 10 000 €.',
      },
      {
        label: 'Moins de 3 500 €',
        value: 'Mon budget est inférieur à 3 500 €.',
      },
      {
        label: 'Je ne sais pas encore',
        value: 'Je n\'ai pas encore défini de budget précis.',
      },
    ],
  },
]
