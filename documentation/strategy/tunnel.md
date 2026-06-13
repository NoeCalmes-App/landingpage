# Tunnel d'acquisition — état réel

> Source de vérité du tunnel actuel. Décrit ce qui existe et tourne aujourd'hui, pas un plan.
> Pour le fond (cible, vocabulaire, angle revenus) : `documentation/context/positionnement.md`.

## Schéma global

```
Instagram / LinkedIn
      |
      |-- lien bio 1 : noecalmes.fr  -> appel Calendly 30 min
      |-- lien bio 2 : /audit-app "Teste ton idée, 2 minutes, offert"
      |-- commentaire sur post "Combien coûte une app"
      |        -> ManyChat envoie automatiquement le lien /audit-app en DM
      |-- prospection LinkedIn ciblée
      |        -> entrepreneurs avec clients/audience -> conversation -> /audit-app si intérêt
      |
      v
  /audit-app  -> verdict IA -> 2 boutons : WhatsApp ou rendez-vous Calendly
      |
      v
  Appel 30 min -> suivi CRM Nowork -> devis + cahier des charges -> relances
```

## Instagram (@noecalmes.app)

### Bio

Catégorie : Création digitale

```
💡| Je crée des applications qui génèrent des revenus
📈| +20 apps publiées · MVP en 45 jours
👇| Audit de ton idée d'app
```

Deux liens :

1. `noecalmes.fr` : prise de rendez-vous Calendly 30 min.
2. `noecalmes.fr/audit-app` : "Teste ton idée, 2 minutes, offert."

### Stories à la une

- Mon histoire : parcours raconté, qui se termine sur ce que je délivre et ma méthode (application pensée pour générer des revenus).
- Clients / avis : preuve sociale.

### 3 posts épinglés

1. Carrousel "Pourquoi 90 % des apps ne rapportent rien" : redirige vers l'audit.
2. Carrousel "Combien coûte une app" : redirige vers l'audit. C'est sur CE post que le trigger ManyChat est actif (commentaire = DM automatique avec le lien audit).
3. Analyse de Calori (app que j'ai créée) : pourquoi elle marche.

## LinkedIn

### Positionnement profil

Headline recommandé :

```txt
Expert application mobile | Je transforme votre idée en app qui génère des revenus
```

Bannière recommandée :

```txt
Votre idée d'application peut devenir une vraie source de revenus.
Audit · Cadrage · Design · Développement · Lancement
```

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

`/audit-app` est le cœur du tunnel : questions, verdict IA (potentiel, budget, délai), puis deux sorties au choix du prospect : WhatsApp ou rendez-vous Calendly. Détail technique : `architecture/audit-app.md`.

## Après le tunnel

Tout lead aboutit dans le CRM Nowork (webhook Calendly = création client automatique) : appel, devis, cahier des charges, relances.
