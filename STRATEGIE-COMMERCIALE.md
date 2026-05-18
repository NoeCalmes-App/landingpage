# Stratégie commerciale — Noé Calmes

Document de référence interne. Sert de guide pour structurer la landing, le chatbot, le devis et les premiers appels.

**Principe directeur** : un plombier ou un kiné qui veut une app doit comprendre tout ce qu'on dit en moins de 30 secondes. **Pas de jargon**, pas de mots techniques. Si on doit l'expliquer, c'est que le mot est mal choisi.

---

## 1. Tes deux offres — vulgarisées

### Offre A — « Première version » (ex-MVP)

**Nom commercial** : *« Application Lancement »* ou *« Première Version »*
**Slogan court** : *« Votre app sur les stores en 45 jours. »*

#### Pour qui

- Un fondateur seul ou une petite équipe
- Une idée qu'il faut **valider auprès de vrais utilisateurs**
- Un budget serré au départ
- Quelqu'un qui veut **avancer vite** plutôt que tout avoir parfait

#### Promesse

> En 45 jours, vous avez **votre application mobile publiée sur l'App Store et Google Play**, avec les fonctionnalités les plus importantes — pas toutes, juste celles qui comptent pour vos premiers utilisateurs.

#### Ce qui est inclus

- L'application fonctionne sur **iPhone et Android** (une seule app, deux systèmes — c'est la magie de Flutter, mais ne le dis pas comme ça)
- Un **design propre et professionnel**, mais pas de maquette Figma préalable — je dessine pendant le développement pour gagner du temps
- **3 à 6 fonctionnalités principales** (à valider ensemble au début)
- **Publication sur les stores** Apple et Google
- **Suivi 30 jours après la mise en ligne** pour corriger les bugs

#### Délai

**45 jours** à partir du démarrage (acompte reçu + brief validé).

#### Prix

**À partir de 3 500 € HT.**

#### Métaphore à utiliser à l'oral

> *« C'est comme ouvrir un food-truck pour tester votre cuisine avant d'investir dans un restaurant complet. Vous validez que les gens aiment avant de mettre tous vos moyens. »*

---

### Offre B — « Application Complète » (ex-Application prête à scaler)

**Nom commercial** : *« Application Complète »* ou *« Application sur-mesure »*
**Slogan court** : *« Votre application aboutie, pensée pour durer. »*

#### Pour qui

- Une entreprise déjà installée ou un projet **validé** (utilisateurs déjà là, idée éprouvée)
- Un projet où **l'expérience utilisateur** est centrale (paiement, abonnement, communauté, contenu)
- Un budget plus large
- Quelqu'un qui veut **du sur-mesure**, pas du minimum

#### Promesse

> Une application complète, conçue dans le moindre détail pour vos utilisateurs. Avec **maquettes visuelles** validées avant de coder, **toutes les fonctionnalités** prévues, et une architecture pensée pour **accueillir beaucoup d'utilisateurs** sans planter.

#### Ce qui est inclus

- Une **maquette visuelle** (Figma) de toutes les pages, validée avec vous avant le développement
- **Design sur-mesure** complet, charte graphique cohérente
- **Toutes les fonctionnalités** prévues (sans limite de scope au départ)
- Architecture solide pour gérer la croissance
- Application mobile (iPhone + Android) **et/ou** application web selon le projet
- **Publication sur les stores** (et mise en ligne web si applicable)
- **Suivi 30 jours après la mise en ligne**
- **Maintenance possible** ensuite (devis séparé)

#### Délai

**3 à 6 mois** selon la complexité.

#### Prix

**À partir de 8 000 € HT** (à valider selon le scope).

#### Métaphore à utiliser à l'oral

> *« C'est comme construire un restaurant complet : on dessine les plans avant (la maquette), on choisit le décor (le design), on aménage la cuisine pour servir 100 couverts par soir (l'architecture). Plus long, mais conçu pour durer. »*

---

## 2. Comment choisir entre les deux offres

Pose **deux questions** au prospect :

1. **« Êtes-vous sûr que votre idée plaira aux utilisateurs ? »**
   - *Oui, j'ai déjà des clients/utilisateurs qui me l'ont demandé* → **Offre B (Complète)**
   - *Je pense, mais je ne suis pas sûr à 100 %* → **Offre A (Lancement)**

2. **« Vous voulez aller vite ou vous voulez du parfait ? »**
   - *Aller vite, je veux tester* → **Offre A**
   - *Du parfait, le rendu compte beaucoup* → **Offre B**

Si tu hésites, **propose toujours l'Offre A en premier**. C'est moins engageant pour le client, et tu pourras lui proposer une V2 (« Application Complète ») plus tard quand le marché aura validé son idée. C'est aussi plus aligné avec ton positionnement (« 45 jours, à partir de 3 500 € »).

---

## 3. Glossaire — comment expliquer chaque concept à un non-technique

### MVP
**Ne pas dire** : « Je vous propose un MVP »
**Dire** : *« On commence par une première version simple, juste avec les fonctionnalités les plus importantes, pour tester si ça plaît avant d'aller plus loin. »*

### Maquette Figma
**Ne pas dire** : « Je vous fais une maquette Figma »
**Dire** : *« Avant de construire l'application, on dessine toutes les pages comme un plan d'architecte. Vous voyez exactement ce que ça va donner avant qu'on commence à coder. »*

### Scaler / scalabilité
**Ne pas dire** : « L'app est conçue pour scaler »
**Dire** : *« L'application est conçue pour fonctionner aussi bien avec 100 utilisateurs qu'avec 100 000. Pas de plantage quand ça décolle. »*

### Stores (App Store + Google Play)
**Ne pas dire** : « Soumission sur les stores »
**Dire** : *« On publie l'application sur les magasins Apple et Google, là où les gens téléchargent les applications. »*

### TestFlight (mode bêta iOS)
**Ne pas dire** : « Vous testerez la bêta via TestFlight »
**Dire** : *« Avant de publier, je vous envoie un lien pour installer l'application sur votre téléphone et la tester. »*

### Charte graphique
**Ne pas dire** : « Avez-vous une charte graphique ? »
**Dire** : *« Avez-vous déjà des couleurs, un logo, une identité visuelle pour votre projet ? »*

### Backend
**Ne pas dire** : « Le backend est en Firebase »
**Dire** : *« Je m'occupe aussi de la partie invisible : où sont stockés les données, les comptes utilisateurs, les notifications. »*

### Flutter / React
**Ne pas dire** : « Je code en Flutter »
**Dire** : *« J'utilise une technologie qui me permet de créer une seule application pour iPhone et Android, donc deux fois plus rapide qu'avec les méthodes classiques. »*

### Acompte
**Ne pas dire** : « Acompte de 30 % au démarrage »
**Dire** : *« On commence par un premier versement de 30 % pour que je puisse réserver mon temps et lancer le projet. »*

### Refonte
**Ne pas dire** : « Je peux faire une refonte de votre application existante »
**Dire** : *« Vous avez déjà une application qui existe mais qui ne vous convient pas ? Je peux la refaire pour qu'elle marche mieux. »*

---

## 4. Script de premier appel — Version 2.0 (15 min)

### Phase 1 — Accueil (1 min)

> *Bonjour, merci d'avoir pris ce rendez-vous. L'objectif de notre échange est simple : comprendre votre projet, voir si je peux vous aider, et si oui vous proposer une solution claire. On va se laisser 15 minutes — c'est largement suffisant pour la première fois.*
>
> *Je vous propose qu'on procède en trois temps : d'abord vous me racontez votre projet, ensuite je vous explique comment je travaille, puis on voit ensemble la suite. Ça vous va ?*

### Phase 2 — Comprendre le projet (5-7 min)

Pose 4-5 questions et **écoute beaucoup plus que tu ne parles**. Tes objectifs : qualifier (a) la maturité du projet, (b) le budget réel, (c) si la personne est sérieuse.

**Questions clés :**

1. **L'idée** : *Racontez-moi votre projet en quelques phrases. À quoi sert votre application ? Qui va l'utiliser ?*

2. **Le problème résolu** : *Quel problème concret votre application va résoudre dans la vie des gens ?*

3. **Le public** : *Vos premiers utilisateurs, vous les imaginez comment ? Des particuliers, des entreprises, votre clientèle actuelle ?*

4. **Les fonctionnalités principales** : *Si on devait garder seulement 3 fonctionnalités sur lesquelles l'application repose, ce serait lesquelles ?*

5. **L'avancement** : *Avez-vous déjà des dessins, un logo, des couleurs ? Ou on part de zéro ensemble ?*

6. **Le timing** : *À quel moment vous aimeriez que l'application soit prête ?*

7. **Le budget** (toujours en dernier) : *Et côté budget, avez-vous une idée de ce que vous êtes prêt à investir pour ce projet ?*

> **Note importante** : à la question budget, écoute la réponse sans réagir.
>
> - **« Je ne sais pas du tout »** → potentiel, à éduquer
> - **« 300 € »** → pas sérieux, gentiment redirige vers une formation ou un no-code
> - **« 2 000 – 5 000 € »** → potentiel pour l'Offre A, à creuser
> - **« 5 000 – 10 000 € »** → bon client pour l'Offre A, peut-être Offre B
> - **« 10 000 € et plus »** → excellent client pour l'Offre B

### Phase 3 — Ton pitch (2 min max)

Une fois que tu as compris le projet, présente-toi **simplement** :

> *De mon côté, j'accompagne des gens comme vous qui veulent créer une application mobile, sans passer par une agence à 20 000 €. Je m'occupe de tout : du dessin de l'application au développement sur iPhone et Android, jusqu'à la publication sur l'App Store et Google Play.*
>
> *Ma différence : je suis seul, joignable directement par WhatsApp 6 jours sur 7, et je travaille à prix fixe — vous savez exactement ce que vous payez avant de commencer.*
>
> *Selon les projets, je propose deux formules. La première c'est la « Première Version », à partir de 3 500 €, livrée en 45 jours, idéale pour tester votre idée avec une application mobile simple mais professionnelle. La deuxième c'est l'« Application Complète », plus longue (3 à 6 mois), avec maquettes validées avant et toutes les fonctionnalités, pour les projets plus aboutis.*

### Phase 4 — Reformuler et orienter (2 min)

À ce stade, tu sais à peu près quelle offre proposer. Reformule ce que tu as compris :

> *Si je vous comprends bien, [reformule en 2 phrases]. Ce que je vous proposerais, c'est de partir sur [Offre A / Offre B] parce que [raison].*

Donne tout de suite **une fourchette de prix réaliste** :

> *À première vue, votre projet ressemble à un budget de l'ordre de [X € à Y €]. Je vous prépare un devis détaillé après ce call avec le découpage exact.*

> **Astuce** : ne donne JAMAIS de prix exact à l'oral. Toujours une fourchette + un devis écrit. Tu évites les malentendus et tu gardes la main.

### Phase 5 — Expliquer la suite (2 min)

> *Pour la suite, voici comment ça se passe :*
>
> 1. *Je vous prépare un devis écrit dans les 24 à 48h*
> 2. *Vous le validez (ou on l'ajuste ensemble)*
> 3. *Vous versez un premier acompte de 30 %*
> 4. *Je commence le projet immédiatement*
>
> *Pour les paiements, c'est toujours en 3 fois : 30 % au démarrage, 40 % quand la version est prête à tester sur votre téléphone, 30 % juste avant la publication sur les stores. Vous savez exactement quand vous payez quoi.*

### Phase 6 — Clôture (1 min)

> *Avez-vous des questions à ce stade ?*

Réponds aux questions, puis :

> *Parfait. Je vous envoie le devis dans 24-48h. Si vous avez des questions entre-temps, vous m'écrivez directement sur WhatsApp ou par mail. À très vite !*

---

## 5. Comment répondre aux objections / situations courantes

### « Combien ça coûte ? » (avant que tu aies compris le projet)

> *Ça dépend complètement des fonctionnalités et de la complexité. Pour vous donner un ordre d'idée : une première version commence à 3 500 €, et une application complète tourne plutôt autour de 8 000 à 15 000 €. Mais le mieux, c'est qu'on regarde ensemble votre projet pour que je vous donne un prix précis.*

### « C'est trop cher » (à 3 500 €)

> *Je comprends que ça représente un budget. Pour comparaison, une agence classique facture entre 15 000 et 30 000 € pour le même travail. Mon tarif fixe couvre la conception, le développement complet iPhone et Android, et la publication. Et le tout en 45 jours, pas 6 mois. Si le budget est vraiment serré, on peut peut-être réduire le périmètre de fonctionnalités pour adapter — mais en dessous d'un certain seuil, je ne peux plus garantir la qualité.*

### « Combien de temps ? »

> *Pour une première version, comptez 45 jours fermes à partir du moment où on démarre. Pour une application complète avec maquettes, plutôt 3 à 6 mois selon le périmètre.*

### « Je veux comparer avec d'autres devis »

> *Tout à fait normal, c'est même recommandé. Faites le tour. Quand vous comparez, regardez bien trois choses : (1) qui sera votre interlocuteur (un freelance que vous joignez directement ou un commercial qui disparaît après signature ?), (2) est-ce un tarif fixe ou un compteur qui tourne, (3) que se passe-t-il si l'agence fait faillite ou ne livre pas. Sur ces trois points, je suis transparent, et c'est ce qui me différencie.*

### « Vous travaillez seul ? Ce n'est pas risqué ? »

> *C'est une vraie question. Oui, je travaille seul, et c'est volontaire — vous avez un interlocuteur unique, qui connaît votre projet du début à la fin. Pour le risque, mes conditions générales prévoient un mécanisme de continuité : si je ne peux pas finir le projet (maladie, accident), je suis tenu de vous transmettre tout le travail réalisé pour que vous puissiez le confier à quelqu'un d'autre, et de rembourser au prorata ce qui n'a pas été livré. Vous n'êtes jamais coincé.*

### « Et après la mise en ligne ? »

> *Je reste disponible 30 jours après la publication pour corriger les bugs gratuitement. Ensuite, on peut prévoir un contrat de maintenance si vous voulez que je continue à m'occuper de l'application, ou vous pouvez aussi reprendre le code et le confier à quelqu'un d'autre — vous êtes propriétaire à 100 %.*

### « Vous faites du web aussi ? »

> *Oui, ma spécialité c'est l'application mobile (iPhone et Android), mais je fais aussi du site internet et de l'application web. Si votre projet a besoin des deux (l'application sur le téléphone et un site web associé), je gère les deux en parallèle avec le même budget global.*

### « Je n'ai pas de logo ni de design »

> *Pas de souci, c'est très courant. Pour une « Première Version », je peux travailler avec un design simple et professionnel que je crée pendant le développement. Pour une « Application Complète », on prévoit ensemble la création des maquettes et de la charte graphique en début de projet — c'est inclus.*

### « C'est quoi un MVP ? »

> *MVP, c'est juste un mot anglais pour dire « première version simple ». L'idée c'est de ne pas tout construire d'un coup. On garde juste l'essentiel pour que les premiers utilisateurs puissent l'utiliser, vous voyez si ça marche, et si oui on ajoute le reste après.*

### « Pourquoi pas une agence ? »

> *Trois raisons concrètes : (1) Une agence facture 15 000 à 30 000 €, je facture à partir de 3 500 €. (2) Avec une agence, vous parlez à un commercial qui transmet ensuite à un développeur ; avec moi, vous parlez directement au développeur, donc zéro perte d'information. (3) Une agence vous livre le code et disparaît ; moi je reste disponible 30 jours pour les bugs et je m'engage à vous accompagner si vous voulez continuer ensemble.*

---

## 6. Comment matérialiser cette stratégie

### Sur la landing page (`/`)

- **Hero principal** : reste sur la promesse « 45 jours, à partir de 3 500 € » (correspond à l'Offre A) — c'est ton crochet
- **Section nouvelle « Mes deux formules »** à ajouter entre la section « Étapes » et la section « Calendly » :
  - Deux cartes côte à côte
  - **Carte 1 : Première Version** (Offre A) — pour démarrer, 45 jours, à partir de 3 500 €
  - **Carte 2 : Application Complète** (Offre B) — pour aller loin, 3 à 6 mois, à partir de 8 000 €
  - Chaque carte avec : « Pour qui », « Ce qui est inclus », « Délai », « Prix », « CTA Demander un devis »

### Sur la devis-app

- Au moment de créer un nouveau devis, ajouter dans le sélecteur « Type de projet » une nuance « Première Version » vs « Application Complète » (en plus de mobile/web/combo/forfait), ou simplement le mentionner dans le champ `subject` (« Application Lancement — Plouff Habitudes »)
- Dans la slide « Mission » du devis, adapter le ton selon le type :
  - Offre A : « Lancer rapidement une première version pour tester votre idée »
  - Offre B : « Construire une application complète et durable »

### Dans le chatbot (system prompt)

À mettre à jour dans `functions/chatbot/lib/systemPrompt.js` :

- Quand un prospect mentionne un budget < 5 000 € ou un délai court → orienter Offre A
- Quand un prospect mentionne « plusieurs fonctionnalités » + « beaucoup d'utilisateurs prévus » → orienter Offre B
- Toujours expliquer en français simple, jamais de mot technique sans définition

### Dans le devis PDF (slide Mission)

Adapter les 3 objectifs selon l'offre :
- Offre A : « Tester votre idée avec de vrais utilisateurs », « Lancer en 45 jours », « Budget maîtrisé »
- Offre B : « Application aboutie dès le premier jour », « Conçue pour durer », « Expérience utilisateur sur-mesure »

---

## 7. Les 5 questions qui te disent si le client va payer

À garder en tête à chaque appel. Si **moins de 3 réponses positives → projet à risque**.

| # | Question | Bonne réponse |
|---|---|---|
| 1 | A-t-il déjà parlé de son idée à des utilisateurs potentiels ? | Oui, plusieurs personnes lui ont dit que ce serait utile |
| 2 | A-t-il un budget chiffré (même approximatif) ? | Oui, autour de X € |
| 3 | A-t-il un délai concret en tête (lancement, événement, etc.) ? | Oui, avant tel mois |
| 4 | Peut-il prendre la décision seul, ou doit-il consulter un associé/conjoint ? | Décision seule |
| 5 | A-t-il déjà investi quelque chose dans son projet (logo, étude, no-code) ? | Oui, il a déjà engagé X € |

Si la personne a 4-5 réponses positives → **fonce, c'est un client sérieux**.
Si elle en a 0-2 → **prends ton temps**, envoie un devis mais ne mise pas dessus immédiatement.

---

## 8. Ce qu'il NE faut JAMAIS faire à un premier appel

1. **Donner un prix exact à l'oral** — toujours une fourchette + devis écrit
2. **Parler de Flutter, Firebase, TestFlight, architecture** — laisse ça pour la phase technique
3. **Promettre une date sans avoir vu le scope** — toujours « 45 jours à partir du démarrage »
4. **Critiquer un autre prestataire** — reste pro
5. **Dire oui à tout** — si le projet n'est pas pour toi, le dire (« Sur ce type de projet, je ne suis pas le bon expert, mais je peux vous mettre en relation avec quelqu'un »)
6. **Faire trop long** — 15 minutes max, sinon le client se sent agressé
7. **Vendre tout de suite** — l'objectif du call c'est qualifier + envoyer un devis, pas signer

---

## 9. Ton objectif réel à chaque appel

> **Qualifier le projet et envoyer un devis écrit dans les 24-48h.**

C'est tout. Pas vendre, pas convaincre. Le devis écrit fera le travail. Tu vends par l'écrit (devis + slide « Solution proposée » + slide « Maquettes » + CGV), pas par l'oral.

---

## 10. Petit conseil final

**Ton premier client signera après une conversation simple, pas après un script parfait.** Sois naturel, écoute beaucoup plus que tu ne parles, garde toujours cette phrase en tête :

> *« Je vais analyser votre besoin et vous envoyer un devis détaillé dans 24-48h. »*

C'est ta phrase magique. Elle ferme le call proprement, te donne le temps de réfléchir, et donne au client un livrable concret à attendre.

---

*Document créé le 18 mai 2026. À mettre à jour après chaque retour client significatif.*
