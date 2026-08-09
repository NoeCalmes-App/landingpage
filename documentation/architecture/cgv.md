# CGV — le dossier `public/cgv/` et ses règles

Source de vérité du fonctionnement des fichiers CGV servis par `noecalmes.fr`.
Écrit le 9 août 2026, après le grand ménage (suppression 17-05, régénération
22-05 en texte).

## Ce que contient le dossier

Chaque fichier `public/cgv/CGV-JJ-MM-AAAA.pdf` est une **version datée** des
Conditions Générales de Vente. La date est celle de la mise en service, posée
par Nowork au moment où le contrat par défaut a téléchargé son PDF.

| Fichier | Rôle |
|---|---|
| `CGV-22-05-2026.pdf` | Version 2 (mai). Référencée par 13 devis/CDC envoyés — lien contractuel. Régénérée le 9 août en PDF texte (51 Ko) depuis sa source git exacte (`nowork` commit `306de57`), fidélité vérifiée par OCR mot à mot contre l'original de 12 Mo. |
| `CGV-01-07-2026.pdf` | Version 3 (juillet). La plus référencée (21 documents). Copie de secours dans `public/assets/documents/cgv/` (cible du repli 404 — garder les deux). |
| `CGV-07-08-2026.pdf` | Version 4, en vigueur. Les nouveaux devis pointent dessus. |

`CGV-17-05-2026.pdf` a été **supprimée** le 9 août : le script
`nowork/scripts/verifier-cgv-references.mjs` a prouvé qu'aucun devis ni CDC ne
la référençait (21 devis + 18 CDC balayés).

## RÈGLE ABSOLUE : ne jamais supprimer ni modifier une version référencée

Chaque devis fige à sa création le nom du fichier CGV dans son
`contractSnapshot.pdfFilename` (côté Nowork), et le PDF envoyé au client
embarque le lien `noecalmes.fr/cgv/{fichier}`. **C'est un lien contractuel** :
supprimer ou altérer le fichier casse la référence d'un contrat.

Avant TOUTE suppression : lancer `node scripts/verifier-cgv-references.mjs`
dans `nowork`. Il liste quels devis/CDC (avec client et statut) pointent sur
chaque version. Zéro référence = supprimable ; sinon, on ne touche pas.

Modifier la FORME sans toucher au FOND (compression, régénération en texte)
est possible — à condition de prouver l'identité du contenu au mot près
(source git de la version + vérification OCR, comme fait pour la 22-05).

## `noecalmes.fr/cgv.pdf` n'est PAS un fichier

C'est une **redirection** dans `public/404.html` vers `CGV-22-05-2026.pdf` :
les tout premiers devis (avant le système de versions — ex. `MOB-2026-049`)
embarquaient ce lien générique en dur. Trois lignes de code, zéro octet,
et des contrats qui en dépendent : **on la garde**.

Le `404.html` porte aussi un repli : un `/cgv/X.pdf` introuvable est retenté
sur `/assets/documents/cgv/X.pdf`, puis retombe sur l'accueil.

## Publier une NOUVELLE version de CGV

1. Écrire/mettre à jour le texte dans `nowork/documentation/legal/` (markdown,
   même format que `cgv-v4-2026-08-07.md`).
2. Générer le PDF texte (~50-110 Ko, net, sélectionnable) :
   ```bash
   cd nowork
   python3 scripts/generer-cgv-pdf.py documentation/legal/<source>.md \
     /tmp/CGV-JJ-MM-AAAA.pdf --final --date "JJ mois AAAA" --version "Version N"
   ```
   (`--date`/`--version` pilotent la couverture ; sans eux, valeurs V4.)
3. Déposer le fichier dans `landing-page/public/cgv/`, commit + push —
   **le fichier doit être en ligne AVANT l'étape suivante**, sinon les
   nouveaux devis pointeront un lien mort.
4. Dans Nowork, basculer le contrat par défaut sur ce nouveau
   `pdfFilename` (page Contrats). Les nouveaux devis référencent la nouvelle
   version ; les devis déjà envoyés **gardent la leur, à jamais** — c'est le
   principe du système.
5. Ne JAMAIS réutiliser un nom de fichier existant pour un contenu différent.

## Pourquoi les vieilles versions pesaient 10-12 Mo

L'ancien pipeline de l'app rasterisait chaque page en image JPEG
(html2canvas). Depuis, `nowork/scripts/generer-cgv-pdf.py` produit du vrai
texte vectoriel : ~70 Ko, netteté parfaite, texte cherchable. Toute nouvelle
version passe par lui.
