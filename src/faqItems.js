// Questions / reponses partagees entre l'accueil (4 premieres) et /faq (toutes).
// Fichier a part depuis le 09/11/2026 : l'accueil en a besoin tout de suite, alors
// que PagesSeo.jsx est charge a la demande. Lu aussi par scripts/generate-routes.js.

// Les 3 premieres alimentent aussi l'accordeon de la home (App.jsx en prend
// un slice), pour qu'il n'existe qu'une seule liste de questions.
export const FAQ_ITEMS = [
  // Ordre du 10/10/2026 : les 4 premieres sont les vraies objections, affichees sur l'accueil (NB_FAQ_ACCUEIL
  // dans App.jsx, et le balisage FAQPage de la home dans scripts/generate-routes.js). Leurs reponses tiennent
  // en deux ou trois phrases qui expliquent : 90 % des visiteurs arrivent sur telephone, depuis les pubs
  // Instagram et Facebook ; trop long, on ne lit pas, trop court, « on explique pas » (Noe, 11/10/2026).
  // Retirees le 11/10/2026 : « Application mobile ou web », « A qui appartient l'application ? » (« c'est
  // logique, il paye ») et « Est-ce que mon application va vraiment generer des revenus ? ».
  // Delai : « 1 a 2 mois », comme l'accueil (27/11/2026, offre du Drive ; avant : « 45 jours en moyenne »).
  // Prix : « Autour de 10 000 € », un seul chiffre, comme l'accueil (27/11/2026 ; avant : « A partir de 5 000 € »,
  // qui attirait des personnes hors cible). La regle est ecrite dans src/Accueil.jsx, au-dessus de « Comment ca marche ».
  {
    q: "Combien coûte une application ?",
    a: "Autour de 10 000 €, selon la taille et la complexité de ton projet. En agence, c'est plutôt autour de 30 000 €. Tu as ta fourchette dès le premier appel, et ton prix fixe dans ton devis : stratégie, design, développement et mise en ligne compris, sans compteur qui tourne. Et tu vois ton application avant de payer.",
  },
  {
    q: "Combien de temps faut-il pour avoir une application ?",
    a: "1 à 2 mois, selon la complexité et l'envergure de ton projet. Ton délai est écrit dans ton devis, à côté du prix. Le développement ne prend pas de retard : ce qui peut allonger, c'est ta société et la validation de tes comptes par Apple et Google.",
  },
  {
    q: "Je n'y connais rien en technique, c'est un problème ?",
    a: "Non, c'est le cas de la plupart de mes clients. Je suis là pour t'aiguiller et te conseiller à chaque étape, de l'idée à la mise en ligne. Une idée suffit pour commencer ensemble : pas besoin de cahier des charges ni de vocabulaire technique.",
  },
  {
    q: "Et pour trouver des utilisateurs ?",
    a: "Je ne fais pas ta publicité. Mon travail, c'est que les utilisateurs qui arrivent deviennent des clients qui paient chaque mois. En revanche, je peux te conseiller sur la façon la plus pertinente de faire connaître ton application.",
  },
  {
    q: "Après la livraison de l'application ?",
    a: "Je ne disparais pas après la mise en ligne : 30 jours de corrections compris, puis mises à jour, évolutions, accompagnement, je reste dispo. On définit ensemble ce qui est nécessaire selon comment ton app évolue.",
  },
  {
    q: "Quelle différence avec une agence ?",
    a: "Une agence te livre une application sur les stores et passe au projet suivant. Tu parles à un chef de projet, rarement à la personne qui conçoit. Chez moi il n'y a qu'un interlocuteur, joignable directement 6j/7, un prix fixe écrit à l'avance, et une application pensée pour que ses utilisateurs restent, reviennent et paient chaque mois, plutôt que simplement livrée.",
  },
  {
    q: "Je peux créer mon application avec une IA, non ?",
    a: "Tu peux générer du code avec une IA, je m'en sers moi-même. Mais ce qui fait qu'une application marche, ce n'est pas le code : c'est que ses utilisateurs restent, reviennent et paient chaque mois. L'IA écrit ce que tu lui demandes, elle ne te dira jamais que tu lui demandes la mauvaise chose. Elle ne décide pas ce qui est payant, où placer l'offre, à quel prix, ni pourquoi quelqu'un reviendrait demain. Résultat courant : une application qui existe, qui compile, et qui ne rapporte rien.",
  },
  {
    q: "Tu reprends une application déjà développée ?",
    a: "Oui, c'est un cas fréquent : une application instable, abandonnée par un prestataire, ou dont le code est devenu impossible à faire évoluer. On commence par un audit technique, on stabilise, puis on repart sur de bonnes bases sans tout jeter quand ce n'est pas nécessaire.",
  },
  {
    q: "Sur quelles plateformes tu développes ?",
    a: "En application mobile : iOS et Android, avec une seule base de code, publiée sur l'App Store et sur Google Play ; je m'occupe de la mise en ligne, des fiches et des allers-retours de validation avec les stores. En application web : elle s'ouvre dans le navigateur, sur ordinateur comme sur téléphone, sans passer par un store.",
  },
  {
    q: "Tu travailles à distance ou sur place ?",
    a: "À distance partout en France, et en direct sur Toulouse et l'Occitanie. Le suivi se fait sur WhatsApp, c'est moi qui réponds, pas un intermédiaire.",
  },
]
