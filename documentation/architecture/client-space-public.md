# Architecture — Espace client public

## Role

La landing page expose les espaces clients avec une URL propre :

```txt
https://noecalmes.fr/espace-client/{clientSlug}/{token}
```

Le client ne voit pas `/nowork`, mais les donnees restent dans Nowork.

## Flux actuel

```txt
Client
  -> noecalmes.fr/espace-client/slug/token
  -> landing-page ClientSpaceBridge
  -> iframe same-origin /nowork/espace-client/slug/token
  -> Firestore devis-app-8e216 / users/default-user/clientSpaces
  -> notifications visibles dans Nowork admin
```

Le bridge est implemente dans `src/ClientSpaceBridge.jsx`, via le composant generique `src/AppRouteBridge.jsx`.

## Source de verite

Les donnees d'espace client restent dans le projet Firebase historique `devis-app-8e216`, sous `users/default-user/clientSpaces`.

Elles ne doivent pas etre stockees dans le Firebase AuditApp `manychatia-82692`.

Nowork reste responsable de :

- la creation des espaces clients ;
- les messages ;
- les documents partages ;
- les devis signes ;
- les notifications admin.

## Routes sensibles

- `/espace-client/:clientSlug/:token` : URL publique propre.
- `/espace-client/:token` : fallback legacy.
- `/nowork/espace-client/...` : route interne chargee dans l'iframe.
- `/app-devis/espace-client/...` : ancien lien redirige vers l'URL publique propre.

`public/404.html` doit conserver ces compatibilites.

## A ne pas faire

- Ne pas rediriger visiblement le client vers `/nowork/espace-client/...`.
- Ne pas dupliquer l'UI publique dans la landing sans prevoir les rules/functions de securite.
- Ne pas renommer le projet Firebase `devis-app-8e216` dans cette logique de route.

## Historique

Le plan de migration et les options envisagees sont archives dans `documentation/archive/architecture/client-space-public-bridge-2026-06.md`.
