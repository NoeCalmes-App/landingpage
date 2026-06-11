# Compte rendu — Audit de l'outil /audit-app + funnel WhatsApp

> Statut : **archive utile / decisions passees**. A lire pour comprendre la logique WhatsApp et les anciens arbitrages, mais ne remplace pas `documentation/architecture/audit-app.md`.

Analyse complète du parcours, de la landing au message WhatsApp, avec les modifications déjà appliquées et mes recommandations. Objectif unique rappelé : **que le prospect finisse par t'écrire sur WhatsApp (ou réserver 30 min), déjà convaincu.**

---

## 1. Vue d'ensemble du parcours

Le funnel est clair et bien pensé, conforme à `documentation/archive/funnels/funnel-parfait.md` :

`Instagram (promesse honnête) → outil d'audit (valeur livrée direct) → verdict gratuit → bouton WhatsApp pré-rempli → conversation où tu closes.`

Points déjà solides (à ne pas toucher) :

- **Valeur d'abord, zéro mur email.** Le verdict s'affiche directement. C'est ce qui crée la réciprocité et donne envie de te parler.
- **Le prix reste une fourchette, jamais un chiffre ferme.** Le vrai prix se cale en appel. Bon : ça protège la marge et ça crée une raison légitime de discuter.
- **Le lien WhatsApp est pré-rempli** (prénom + type d'app injectés). Friction quasi nulle, et tu captes le contact sans demander de numéro.
- **Le formulaire est bien ordonné** (type d'app → idée → marché → concurrents conditionnels → cible → modèle → budget). La question concurrents qui s'affiche seulement si « une solution existe » est un bon détail.
- **La logique de prix « gonflé selon la réponse »** est en place dans le prompt : base estimée selon la taille du projet, ajustée au budget (budget élevé → fourchette plus haute, budget serré → première version + marge plus large), avec un garde-fou anti sous-cotation et le branchement `< 3 500 € → branche C` (pas de push WhatsApp, message franc). C'est cohérent et honnête.

---

## 2. Le point que tu soulèves : le message de clôture (`cta_message`)

Tu as raison. Le texte que tu citais :

> « Avec 5 questions, je peux vous donner des repères mais pas un chiffrage exact ni un délai réaliste. Pour ces deux points précisément, le mieux c'est qu'on en parle 30 minutes. Je rentre dans le détail de votre cas, puis je vous envoie un devis ferme avec un prix et un planning clairs. »

**Mon avis : c'est honnête et clair, mais c'est froid et interchangeable.** Trois problèmes concrets :

1. **Aucune personnalisation.** Rien ne rattache le message à SON idée. On pourrait le coller sur n'importe quel prospect. Or c'est le dernier écran avant le clic : c'est là qu'il faut qu'il se sente vu.
2. **Ça parle process avant de parler de lui.** « chiffrage exact », « délai réaliste », « devis ferme », « planning » : c'est ta logique à toi, pas son envie à lui. Lui veut savoir si son idée tient et ce qu'il devrait faire.
3. **C'est un peu sec.** Pas d'accroche humaine, pas de « ce que je ferais à votre place ». Ça ne donne pas envie de discuter, ça informe.

**Ce que j'ai changé pour corriger ça** (voir section 4) : message raccourci à 2-3 phrases, ton franc, **personnalisation obligatoire côté IA** (prénom + élément concret de son idée), et surtout **réaligné sur l'action réelle**. Le bouton invite à *écrire* un message (engagement faible) : le texte ne pousse donc plus un rendez-vous de « 20 à 30 minutes » (ça sonnait plus engageant que le bouton, donc un peu agressif), il invite à écrire. Le rendez-vous reste proposé en dessous, en option discrète. Maintenant un prospect verra plutôt :

> « Marie, votre idée de carnet de suivi pour coachs sportifs tient de vraies pistes. En 5 réponses je vous donne des repères utiles, mais pas un vrai prix ni un délai fiable sur votre cas, autant être franc là-dessus. Écrivez-moi votre projet sur WhatsApp, je vous dis directement ce que j'en pense et ce que je ferais à votre place. »

### Cas critique : peu d'infos données

C'est le vrai risque que tu as repéré. Avant, une idée vague produisait un audit qui se résumait à « il manque ceci, cela » : le prospect repart les mains vides et vexé. J'ai ajouté une **règle d'or** dans le prompt : même avec peu, l'IA doit sortir au moins un vrai repère utile à partir de ce qu'elle a (le marché via Q1, la validation via Q2, le modèle via Q3, le type d'app), rester honnête sur la limite, mais ne JAMAIS renvoyer un audit vide. Et « ce qui manque » est reformulé comme une invitation à creuser ensemble, jamais comme un reproche.

---

## 3. Le bouton final : objectif WhatsApp

Tu voulais : **un seul vrai CTA (WhatsApp), et le rendez-vous 30 min juste en dessous en option.** C'est maintenant le cas. Avant, le bloc mélangeait le bouton et une ligne grise « Réponse rapide · on cadre votre idée ensemble » sur la même ligne, ce qui diluait le message. Désormais :

- **Bouton principal :** « M'écrire sur WhatsApp » (message pré-rempli, prénom + type d'app).
- **Juste en dessous, discret :** « ou réserver un appel de 30 min ».
- La ligne « Réponse rapide · on cadre votre idée ensemble » est **supprimée**.

Un seul chemin fort, une porte de sortie secondaire pour ceux qui préfèrent caler un créneau tout de suite. C'est aligné avec le principe « un seul chemin par écran ».

---

## 4. Modifications appliquées au code

| Fichier | Changement |
|---|---|
| `src/audit-app/AuditAppVerdict.jsx` | Lien sous « Prix et délai » : renommé **« Connaître le vrai prix de mon application »**, passé en **bleu** (au lieu du violet de marque), **flèche retirée**. |
| `src/audit-app/AuditAppVerdict.jsx` | Section « Pour aller plus loin » : bouton principal **« M'écrire sur WhatsApp »** + lien secondaire **« ou réserver un appel de 30 min »** dessous. Ligne grise « Réponse rapide · on cadre votre idée ensemble » **supprimée**. |
| `src/audit-app/backend/orchestrator.ts` | `cta_message` de secours (branche A / MID) réécrit : plus chaud, orienté « vous », sans tiret long. |
| `src/audit-app/backend/prompts.ts` | Guidance `cta_message` branche A : **personnalisation obligatoire** (prénom + référence concrète à l'idée), ton chaleureux, exemple mis à jour, ajout de « next step » aux mots interdits. |
| `src/audit-app/backend/branch.ts` | Tirets longs (`—`) retirés des textes de secours visibles par le prospect. |

> Note technique : la couleur bleue utilise `text-blue-600` (utilitaire Tailwind standard). Si tu veux une nuance précise de ta charte, on remplace par une variable CSS dédiée.

---

## 5. Recommandations (par priorité)

**🔴 Vérifier que le bouton WhatsApp est bien le SEUL CTA fort sur tout l'écran de verdict.** Il reste un lien bleu « Connaître le vrai prix » dans la carte Prix qui pointe aussi vers WhatsApp : c'est bien, mais assure-toi qu'aucun autre bouton « Réserver » concurrent ne reste ailleurs sur la page. Deux CTA d'égale force = moins de clics.

**🟠 Personnaliser le message WhatsApp pré-rempli avec l'idée, pas juste le type d'app.** Aujourd'hui : « J'ai une idée d'application mobile, je viens de faire l'audit ». On pourrait y glisser un mot de son sujet pour que la conversation démarre déjà cadrée et que toi tu arrives encore mieux briefé.

**🟠 Tester le rendu de la personnalisation IA en conditions réelles.** Maintenant que le prompt impose prénom + référence à l'idée, fais 3-4 audits de test (idée précise / partielle / vague) pour vérifier que l'IA ne tombe pas dans le générique ni dans le « salesy » interdit.

**🟢 Soigner l'orthographe des CTA et du nom de fichier de stratégie.** (`landing page et positionnement`, pas « landign apge »). Détail, mais ça compte pour la crédibilité interne de tes docs.

**🟢 Mesurer.** Le vrai juge, c'est le taux de clic verdict → WhatsApp. Si tu n'as pas encore d'event tracké sur ce clic, c'est le chiffre n°1 à instrumenter pour savoir si ces changements convertissent mieux.

---

## 6. Alignement avec ton positionnement

Tout ça reste cohérent avec `documentation/context/positionnement.md` : « expert en application mobile », « app pensée pour générer des revenus », tarif fixe, joignable directement. Le funnel WhatsApp incarne justement le « un seul expert, joignable 6j/7 » : pas d'agence, pas d'email qui dort, tu réponds toi-même. Le message de clôture personnalisé renforce ce positionnement (« je regarde VOTRE cas ») bien mieux que l'ancien texte process.
