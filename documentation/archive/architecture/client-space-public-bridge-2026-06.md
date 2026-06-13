# Espace client public — bridge Nowork juin 2026

> Statut : **archive / implementation livree**. L'etat actif est dans `documentation/architecture/client-space-public.md`.

## Objectif initial

Afficher les espaces clients avec une URL propre :

```txt
https://noecalmes.fr/espace-client/{clientSlug}/{token}
```

sans exposer `/nowork` au client, tout en gardant les donnees cote Nowork.

## Options envisagees

### Extraction complete dans la landing page

Reprendre l'interface publique de `ClientSpacePage` dans la landing page et lire/ecrire directement dans le projet `devis-app-8e216`.

Avantage : pas d'iframe.

Inconvenient : duplication de l'UI, du chat, des documents, du depot de devis signe, des notifications et des regles de securite.

### Bridge iframe same-origin

Garder l'URL visible `/espace-client/...` dans la landing page et charger l'interface publique existante de Nowork dans une iframe `/nowork/espace-client/...`.

Avantage : aucune duplication metier, meme source Firestore, notifications admin conservees.

Inconvenient : dependance a l'admin build injecte dans la landing page.

## Decision

Le bridge iframe same-origin a ete retenu pour livrer vite sans casser l'espace client.

Etat final :

```txt
/espace-client/slug/token
  -> landing-page ClientSpaceBridge
  -> iframe /nowork/espace-client/slug/token
  -> Firestore devis-app-8e216 / users/default-user/clientSpaces
```

## Points de vigilance conserves

- Ne jamais rediriger visiblement `/espace-client/...` vers `/nowork/espace-client/...`.
- Garder la compatibilite des anciens liens `/app-devis/espace-client/...`.
- Ne pas stocker les espaces clients dans le Firebase AuditApp `manychatia-82692`.
- Si l'UI publique est un jour extraite de Nowork, prevoir des Cloud Functions dediees pour valider le token et limiter l'exposition Firestore.

