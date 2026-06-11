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
      |
      v
  /audit-app  -> verdict IA -> 2 boutons : WhatsApp ou rendez-vous Calendly
      |
      v
  Appel 30 min -> suivi CRM devis-app -> devis + cahier des charges -> relances
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

Posts miroirs : audit-app, mon histoire, ma méthode. Pas plus.

## ManyChat

Un seul automatisme actif : commentaire sur le post "Combien coûte une app" déclenche l'envoi automatique du lien `/audit-app` en DM. Les anciens flows élaborés (quiz 8 questions, relances J+2/J+7) sont abandonnés, voir `archive/strategy/`.

## Audit app

`/audit-app` est le cœur du tunnel : questions, verdict IA (potentiel, budget, délai), puis deux sorties au choix du prospect : WhatsApp ou rendez-vous Calendly. Détail technique : `architecture/audit-app.md`.

## Après le tunnel

Tout lead aboutit dans le CRM devis-app (webhook Calendly = création client automatique) : appel, devis, cahier des charges, relances.
