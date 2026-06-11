# Architecture cible — Espace Client Public

## Objectif

Afficher les espaces clients avec une URL propre :

```txt
https://noecalmes.fr/espace-client/{clientSlug}/{token}
```

sans exposer `/app-devis` au client.

## Principe

`app-devis` reste l'admin. La landing page porte seulement l'interface publique client.

```txt
Client
  -> noecalmes.fr/espace-client/slug/token
  -> UI publique dans landing-page
  -> Firebase / API du projet devis-app
  -> app-devis admin reçoit messages, devis signes, documents, notifications
```

## Source de verite

Les donnees d'espace client doivent rester cote `devis-app`, car c'est la que vivent :

- clients
- devis
- documents partages
- messages espace client
- devis signes
- notifications admin

Le Firebase AuditApp (`manychatia-82692`) ne doit pas stocker les espaces clients.

## Implementation recommandee

Phase propre :

1. Creer une route landing page `/espace-client/:clientSlug/:token`.
2. Reprendre l'interface publique de `devis-app/src/views/pages/ClientSpacePage.tsx`.
3. Lire/ecrire les donnees dans le projet `devis-app-8e216`.
4. Modifier `app-devis` pour generer des URLs `https://noecalmes.fr/espace-client/...`.
5. Ne plus rediriger `/espace-client/...` vers `/app-devis/...` dans `public/404.html`.

Version robuste :

- Ajouter des Cloud Functions dans `devis-app` pour valider le token et exposer uniquement les actions publiques :
  - charger l'espace client
  - envoyer un message
  - televerser un fichier/devis signe
  - lister les documents partages

Version rapide :

- Initialiser le Firebase client `devis-app-8e216` dans la landing page et reutiliser les collections existantes.
- A durcir ensuite avec des rules/functions plus strictes.

## Points sensibles

- GitHub Pages ne sait pas faire de rewrite transparent vers `/app-devis` tout en gardant l'URL visible `/espace-client/...`.
- Une redirection vers `/app-devis/espace-client/...` fonctionne techniquement, mais l'URL client n'est pas propre.
- Si aucun espace client n'a ete envoye, on peut supprimer/recreer les espaces existants sans migration.

