# Architecture cible — Espace Client Public

## Objectif

Afficher les espaces clients avec une URL propre :

```txt
https://noecalmes.fr/espace-client/{clientSlug}/{token}
```

sans exposer `/nowork` au client.

## Principe

Nowork reste l'admin. La landing page porte seulement l'interface publique client.

```txt
Client
  -> noecalmes.fr/espace-client/slug/token
  -> UI publique dans landing-page
  -> Firebase / API du projet devis-app
  -> Nowork admin reçoit messages, devis signes, documents, notifications
```

## Source de verite

Les donnees d'espace client doivent rester cote Nowork, car c'est la que vivent :

- clients
- devis
- documents partages
- messages espace client
- devis signes
- notifications admin

Le Firebase AuditApp (`manychatia-82692`) ne doit pas stocker les espaces clients.

## Implementation actuelle

Depuis juin 2026, `/espace-client/...` est route par la landing page via `src/ClientSpaceBridge.jsx`.

Le bridge garde l'URL visible `https://noecalmes.fr/espace-client/{clientSlug}/{token}` et charge en iframe same-origin l'interface publique existante de Nowork :

```txt
/espace-client/slug/token
  -> landing-page ClientSpaceBridge
  -> iframe /nowork/espace-client/slug/token
  -> Firestore devis-app-8e216 / users/default-user/clientSpaces
```

Ce choix evite de dupliquer le chat, les documents, le depot de devis signe et les compteurs de notifications admin. Une extraction complete de l'UI publique dans la landing reste possible plus tard.

## Implementation recommandee

Phase propre :

1. Creer une route landing page `/espace-client/:clientSlug/:token`.
2. Reprendre l'interface publique de `devis-app/src/views/pages/ClientSpacePage.tsx`.
3. Lire/ecrire les donnees dans le projet `devis-app-8e216`.
4. Modifier Nowork pour generer des URLs `https://noecalmes.fr/espace-client/...`.
5. Ne jamais rediriger `/espace-client/...` vers `/nowork/...` dans `public/404.html`.

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

- GitHub Pages ne sait pas faire de rewrite transparent vers `/nowork` tout en gardant l'URL visible `/espace-client/...`.
- Une redirection vers `/nowork/espace-client/...` fonctionne techniquement, mais l'URL client n'est pas propre.
- Si aucun espace client n'a ete envoye, on peut supprimer/recreer les espaces existants sans migration.
