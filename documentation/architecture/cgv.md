# CGV — le dossier `public/cgv/` et ses règles

Source de vérité du fonctionnement des fichiers CGV servis par `noecalmes.fr`.
Écrit le 9 août 2026, après le grand ménage (suppression 17-05, régénération
22-05 en texte). **Refondu le 10 août 2026** : la publication tient désormais en
une commande.

> Cette doc vit dans `landing-page` mais engage aussi `nowork`. Les deux dépôts
> la citent — ne pas la dupliquer, la mettre à jour ici.

## Ce que contient le dossier

Chaque fichier `public/cgv/CGV-JJ-MM-AAAA.pdf` est une **version datée** des
Conditions Générales de Vente. La date est celle de la **mise en service, saisie
à la main** au moment de la publication.

| Fichier | Rôle |
|---|---|
| `CGV-22-05-2026.pdf` | Version 2 (mai). Référencée par 13 devis/CDC envoyés — lien contractuel. Régénérée le 9 août en PDF texte (51 Ko) depuis sa source git exacte (`nowork` commit `306de57`), fidélité vérifiée par OCR mot à mot contre l'original de 12 Mo. Cible de la redirection `/cgv.pdf`. |
| `CGV-01-07-2026.pdf` | Version 3 (juillet). La plus référencée (21 documents). |
| `CGV-07-08-2026.pdf` | Version 4. Les devis signés entre le 7 et le 10 août. |
| `CGV-10-08-2026.pdf` | **En vigueur.** Article 10.6 « Référence commerciale » (M20). |

`public/cgv/index.json` est le **registre** : pour chaque édition, sa date, son
markdown source, son poids et sa date de publication. Écrit par la commande.

`CGV-17-05-2026.pdf` a été **supprimée** le 9 août : le script
`nowork/scripts/verifier-cgv-references.mjs` a prouvé qu'aucun devis ni CDC ne la
référençait (21 devis + 18 CDC balayés).

## RÈGLE ABSOLUE : ne jamais supprimer ni modifier une version référencée

Chaque devis fige à sa création le nom du fichier CGV dans son
`contractSnapshot.pdfFilename` (côté Nowork), et le PDF envoyé au client embarque
le lien `noecalmes.fr/cgv/{fichier}`. **C'est un lien contractuel** : supprimer ou
altérer le fichier casse la référence d'un contrat.

Avant TOUTE suppression : lancer `node scripts/verifier-cgv-references.mjs` dans
`nowork`. Zéro référence = supprimable ; sinon, on ne touche pas.

Modifier la FORME sans toucher au FOND (compression, régénération en texte) est
possible — à condition de prouver l'identité du contenu au mot près (source git de
la version + vérification OCR, comme fait pour la 22-05).

**La commande de publication refuse d'elle-même un nom déjà pris**, en local comme
en ligne. Un nom = un contenu, à jamais.

## `noecalmes.fr/cgv.pdf` n'est PAS un fichier

C'est une **redirection** dans `public/404.html` vers `CGV-22-05-2026.pdf` : les
tout premiers devis (avant le système de versions — ex. `MOB-2026-049`)
embarquaient ce lien générique en dur. Trois lignes de code, zéro octet, et des
contrats qui en dépendent : **on la garde**.

Le `404.html` porte aussi un repli : un `/cgv/X.pdf` introuvable est retenté sur
`/assets/documents/cgv/X.pdf`, puis retombe sur l'accueil. **La commande dépose
donc chaque édition aux DEUX endroits** — avant le 10 août, seule la 01-07 avait
sa copie de secours, et le repli ne servait à rien pour les autres.

## Publier une NOUVELLE version — une seule commande

```bash
cd nowork
# 1. écrire le texte dans documentation/legal/ (markdown)
# 2. simuler — n'écrit rien, produit un PDF de contrôle dans /tmp
npm run publier-cgv -- --source documentation/legal/<source>.md --date "15 septembre 2026"
# 3. publier
npm run publier-cgv -- --source documentation/legal/<source>.md --date "15 septembre 2026" --appliquer
```

Elle enchaîne, en s'arrêtant net à la première anomalie :

1. contrôles préalables (source lisible et d'au moins 10 000 caractères, date
   analysable, `landing-page` trouvable, reportlab présent, **les deux dépôts git
   propres**) ;
2. dérive `CGV-JJ-MM-AAAA.pdf` de la **date saisie** — jamais de la date du jour ;
3. **refuse si ce nom existe**, sur disque ou en ligne ;
4. génère le PDF texte via `scripts/generer-cgv-pdf.py`, puis le contrôle
   (< 1 Mo — au-delà c'est l'ancien pipeline html2canvas —, pas de marqueur
   « brouillon interne ») ;
5. dépose dans `public/cgv/`, `public/assets/documents/cgv/` et
   `nowork/documentation/legal/`, et met à jour `index.json` ;
6. commit + push `landing-page`, **puis attend un vrai 200 sur l'URL** (jusqu'à
   5 minutes, le temps du build GitHub Pages) ;
7. seulement alors, réécrit `CGV_EDITION_COURANTE` dans
   `nowork/src/lib/cgvUrl.ts`, bascule l'édition sortante en historique, commit +
   push `nowork` ;
8. en dernier, crée le contrat dans Firestore avec le contenu du markdown et le
   passe par défaut.

L'ordre n'est plus une consigne : c'est le code. L'étape 7 ne peut pas s'exécuter
avant que l'étape 6 ait prouvé que le fichier répond. Si le build traîne, la
commande s'arrête **sans avoir rien repointé** — il suffit de la relancer.

`--sans-push` fait tout sauf les opérations git, pour répéter à blanc.

## L'URL vit à un seul endroit

`nowork/src/lib/cgvUrl.ts` porte `CGV_BASE_URL`, `CGV_EDITION_COURANTE` et la
liste documentaire `CGV_EDITIONS_PRECEDENTES`. `SlideViewer.tsx` et
`CahierDesChargesRenderer.tsx` importent `getPublicCgvUrl` de là.

Avant le 10 août, l'URL était copiée en dur dans ces deux fichiers, avec deux
copies de la fonction. N'en changer qu'un produisait un devis et un cahier citant
des contrats différents — c'est arrivé.

**Ne pas modifier `CGV_EDITION_COURANTE` à la main** : la commande la réécrit, et
seulement après avoir vérifié que le fichier répond.

## Ce qui n'est PAS automatisé, et ne doit pas l'être

- **La suppression d'une ancienne édition.** Toujours manuelle, toujours après
  `verifier-cgv-references`.
- **Les devis.** La commande n'en touche aucun. Un devis non signé rafraîchit son
  `contractSnapshot` à sa prochaine ouverture (`useQuotes.ts`), et **son cahier
  des charges suit** (corrigé le 10 août — avant, le cahier gardait l'ancienne
  édition pour toujours). Un devis **signé** reste gelé : c'est la clause
  d'inopposabilité, le contrat suit la version référencée au devis au moment de
  la signature.

## Le bouton « Télécharger » de la page Contrats ne publie plus

Il nommait le fichier avec la date du **clic** et écrivait ce nom dans
`lastPdfFilename` : ouvrir ce bouton un jour quelconque, même juste pour relire,
faisait pointer tous les nouveaux devis vers un fichier inexistant. La persistance
a été retirée le 10 août. Ce bouton est une relecture, rien d'autre.

Il utilise par ailleurs l'ancien pipeline (`ContractPdfRenderer`, html2canvas,
plusieurs Mo, texte non sélectionnable). **Le PDF publié vient toujours de
`generer-cgv-pdf.py`**, appelé par la commande.

## Pourquoi les vieilles versions pesaient 10-12 Mo

L'ancien pipeline de l'app rasterisait chaque page en image JPEG (html2canvas).
`nowork/scripts/generer-cgv-pdf.py` produit du vrai texte vectoriel : ~75 Ko,
netteté parfaite, texte cherchable. Toute nouvelle version passe par lui.

Le titre des métadonnées du PDF — ce que le client voit dans l'onglet de son
navigateur — est fixe : « Conditions Générales de Vente de Noé Calmes ». Ni numéro
de version (cuisine interne), ni date (déjà sur la couverture, dans le nom du
fichier et dans l'article de date d'application).
