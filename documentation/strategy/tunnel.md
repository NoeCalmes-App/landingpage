# Tunnel d'acquisition — état réel

> Source de vérité du tunnel actuel. Décrit ce qui existe et tourne aujourd'hui, pas un plan.
> Pour le fond (cible, vocabulaire, angle revenus) : `documentation/context/positionnement.md`.

## Schéma global

```
Instagram / LinkedIn / Meta Ads / SEO
      |
      |-- lien bio 1 : noecalmes.fr  -> landing de confiance
      |        |-- CTA projet clair -> appel Calendly 30 min
      |        |-- question prix/budget -> /audit-app
      |-- lien bio 2 : /audit-app "Teste ton idée, 2 minutes, offert"
      |-- commentaire sur post "Combien coûte une app"
      |        -> ManyChat envoie automatiquement le lien /audit-app en DM
      |-- prospection LinkedIn ciblée
      |        -> entrepreneurs avec clients/audience -> conversation -> /audit-app si intérêt
      |
      v
  /audit-app  -> verdict IA -> WhatsApp en CTA principal
       |                         Calendly seulement en option secondaire
      |
      v
  Conversation WhatsApp ou appel 30 min -> suivi CRM Nowork -> devis + cahier des charges -> relances
```

Principe actuel : **la question prix/budget ne doit pas envoyer directement vers Calendly**. Elle doit renvoyer vers `/audit-app`, qui répond aux 3 angoisses avant la conversation : est-ce que l'idée tient, combien prévoir, et combien de temps avant lancement. Calendly reste utile pour les prospects déjà prêts à parler, mais l'audit pré-qualifie mieux les leads froids et les visiteurs qui comparent les prix.

## Instagram (@noecalmes.app)

### Bio

Catégorie : Création digitale

```
💡| Je crée des applications qui génèrent des revenus
📈| +20 apps publiées · MVP en 45 jours
👇| Audit de ton idée d'app
```

Deux liens possibles :

1. `noecalmes.fr` : landing de confiance. Les CTA projet peuvent mener au rendez-vous, mais les accroches prix/budget doivent renvoyer vers `/audit-app`.
2. `noecalmes.fr/audit-app` : "Teste ton idée, 2 minutes, offert."

### Stories à la une

- Mon histoire : parcours raconté, qui se termine sur ce que je délivre et ma méthode (application pensée pour générer des revenus).
- Clients / avis : preuve sociale.

### 3 posts épinglés

1. Carrousel "Pourquoi 90 % des apps ne rapportent rien" : redirige vers l'audit.
2. Carrousel "Combien coûte une app" : redirige vers l'audit. C'est sur CE post que le trigger ManyChat est actif (commentaire = DM automatique avec le lien audit).
3. Analyse de Calori (app que j'ai créée) : pourquoi elle marche.

## Landing page `noecalmes.fr`

La landing principale rassure et vend le positionnement : expert indépendant en application mobile, pas une agence, de la stratégie au lancement.

Deux types de CTA coexistent :

- **Projet mûr / envie de parler** : bouton rendez-vous vers Calendly.
- **Question prix / doute / comparaison agence** : lien vers `/audit-app`.

Règle pour la section comparaison "Agences vs Noé Calmes" :

- Côté agences : garder l'ancrage prix élevé (`À partir de 15 000 €`) pour poser le contraste.
- Côté Noé : ne pas mettre le prix d'appel en frontal dans cette carte. Utiliser `Tarif fixe, sans surprise`.
- Juste dessous, ajouter un lien bleu/souligné du type `Combien coûterait mon app ?` vers `/audit-app`.

Objectif : capter le réflexe naturel "ok, mais moi ça coûterait combien ?", puis faire entrer le visiteur dans l'audit. L'audit donne potentiel, budget, délai, puis pousse vers WhatsApp. Ce chemin est plus doux et plus qualifiant qu'un Calendly direct.

## LinkedIn

### Positionnement profil

Headline recommandé :

```txt
Expert en applications mobiles | Je transforme votre idée en app pensée pour générer des revenus
```

Bannière recommandée :

```txt
Votre idée d'application peut devenir une vraie source de revenus.
Audit · Cadrage · Design · Développement · Lancement
```

Ne pas mettre en avant "Flutter" dans le titre ou la bannière : la cible LinkedIn n'achète pas une technologie, elle achète un cadrage et une application capable de créer de la valeur.

Éviter aussi les promesses trop dures du type "application rentable en 45 jours". La formulation validée est "pensée pour générer des revenus", plus crédible et moins risquée.

### Section Infos

Version recommandée :

```txt
Vous avez une idée d’application mobile ?

J’aide les entrepreneurs, coachs, formateurs et porteurs de projet à transformer une idée en application claire, lancée sur iPhone et Android, et pensée pour générer des revenus.

Mon rôle ne se limite pas au développement.

Avant de coder, je vous aide à cadrer :
- la première version à lancer ;
- les fonctionnalités vraiment utiles ;
- le modèle économique ;
- l’expérience utilisateur ;
- le budget et le délai réalistes.

J’interviens ensuite sur le design, le développement, la publication sur l’App Store et Google Play, puis le suivi après lancement.

+20 applications publiées.

J’ai aussi créé un audit gratuit pour tester une idée d’application en 2 minutes : potentiel, budget à prévoir, délai de lancement.

→ https://noecalmes.fr/audit-app
```

Cette section doit rester lisible et orientée client. Elle ne doit pas devenir une liste de technologies ni une promesse de rentabilité garantie.

### Cible prospection prioritaire

LinkedIn ne sert pas à chercher des "gens qui veulent une app" (intention trop cachée). Il sert à trouver des **entrepreneurs qui ont déjà une activité monétisable** et à faire émerger le besoin.

Priorité :

- coachs, formateurs, consultants, salles/studios, créateurs, organismes de formation
- profils avec clients, audience, communauté, offre payante, abonnement, contenu premium ou réservation
- porteurs de projet visibles qui parlent app, MVP, no-code, lancement, financement, agence, produit digital

À éviter en prospection principale :

- CTO, recruteurs, développeurs, profils purement techniques
- CEO aléatoires sans signe d'audience, d'offre ou de projet digital
- agences mobiles concurrentes

### Message LinkedIn client direct

Connexion :

```txt
Bonjour [Prénom], j’ai vu que vous accompagnez déjà [type de clients]. Curieux de vous ajouter à mon réseau.
```

Après acceptation :

```txt
Merci pour l’ajout. Petite question : vous avez déjà pensé à créer une application mobile pour vos clients, avec suivi, contenu premium ou abonnement ?
```

Si intérêt :

```txt
Carré. Vous êtes plutôt au stade idée, budget à estimer, ou projet déjà clair ?
```

Puis seulement si la personne répond :

```txt
J’ai justement créé un audit gratuit en 2 minutes pour estimer si une idée d’app tient la route, avec budget et délai. Je vous l’envoie ?
```

### Partenaires agences web/marketing

Canal secondaire, utile pour créer un réseau, pas priorité court terme.

Message :

```txt
Quand vos clients vous demandent une application mobile, vous gérez ça en interne ou vous sous-traitez ?
```

## ManyChat

Un seul automatisme actif : commentaire sur le post "Combien coûte une app" déclenche l'envoi automatique du lien `/audit-app` en DM. Les anciens flows élaborés (quiz 8 questions, relances J+2/J+7) sont abandonnés, voir `archive/strategy/`.

## Audit app

`/audit-app` est le cœur du tunnel : questions, verdict IA (potentiel, budget, délai), puis sortie principale vers WhatsApp. Le rendez-vous Calendly peut rester en option discrète pour les prospects qui veulent réserver tout de suite, mais il ne doit pas concurrencer le CTA WhatsApp.

Le rôle de l'audit n'est pas de faire un devis automatique complet. Il donne assez de valeur pour qualifier le lead, puis pousse vers une conversation avec Noé.

Sur le hero de `/audit-app`, la hiérarchie doit rester nette :

- bouton principal visible : lancer l'audit ;
- lien secondaire discret sous le bouton : `Je préfère discuter avec Noé` vers WhatsApp ;
- pas de bouton WhatsApp dans la navbar, pour ne pas transformer la page en double choix dès l'arrivée.

## Après le tunnel

Tout lead chaud doit être suivi dans Nowork : conversation WhatsApp, appel si nécessaire, devis, cahier des charges, relances. Les leads Calendly peuvent encore arriver via le webhook Calendly, mais le chemin prix/budget prioritaire est maintenant `/audit-app` -> WhatsApp.
