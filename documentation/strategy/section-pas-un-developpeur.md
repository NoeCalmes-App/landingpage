# Brief — vidéo hero + section « Une idée + un développeur, ça ne suffit pas » (accueil)

> Décision du 2026-10-08 (v2, après retour de Noé : moins de texte, vidéo motion design dans le hero, pas de face cam). Maquette : canvas Design « Section « Pas un développeur » — plan et maquette » (plan avant/après, téléphone, ordinateur).
> Positionnement : `documentation/context/positionnement.md`. Mots : `documentation/context/vocabulaire-mobile-web.md`. Règles SEO/perf : `documentation/architecture/landing-page.md`.

## Pourquoi

- L'ICP arrive en cherchant **un développeur**. Il ne sait pas qu'une idée + un développeur ne donne pas une application qui rapporte. La page ne le dit nulle part.
- L'axe marche déjà ailleurs (carrousel « 90 % des apps ne rapportent rien », article de blog). On le ramène sur l'accueil, en court.
- Référence de format (pas de contenu) : ikovaline.com — titre, un bouton, vidéo 28 s en lecture auto muette avec les mots en gros à l'écran.

## 1. Le hero : titre et bouton inchangés, + une vidéo de 30 s

Ordre : pastille « +20 applications » → H1 (inchangé) → sous-titre → bouton WhatsApp (inchangé) → **vidéo** → bandeau de preuves (inchangé).

La vidéo :
- **Motion design, 30 s, lecture automatique, muette, en boucle**, bouton son. Les mots sont en gros à l'écran : elle se comprend sans le son. La voix de Noé est sur la piste pour ceux qui l'activent. Pas de visage filmé ; la photo de Noé apparaît à la fin.
- Ce n'est pas une VSL : 30 secondes, un argument, un bouton.
- Fichier : mp4 (H.264, 720p, 24 i/s, ≤ 3 Mo) + webm, `autoplay muted loop playsinline preload="metadata"`, image de couverture = la frame « Tu cherches un DÉVELOPPEUR. », hébergé dans `public/assets`, jamais YouTube. Lazy en dessous du pli sur mobile si LCP dégradé.
- Mesure : `VideoUnmute` et clics WhatsApp du hero, deux semaines.

### Script (30 s, mots à l'écran + voix)

| Temps | À l'écran (gros) | Voix |
|---|---|---|
| 0–3 s | T'as une idée d'appli ? | T'as une idée d'application ? |
| 3–6 s | Tu cherches un **DÉVELOPPEUR.** | Alors tu cherches un développeur. |
| 6–10 s | Grille de 100 points, 3 s'allument · **3 sur 100** | Et c'est là que 97 applications sur 100 meurent. |
| 10–15 s | idée + développeur = une appli qui **EXISTE** | Une idée plus un développeur, ça donne une application qui existe. Pas une qui rapporte. |
| 15–20 s | Camembert **20 % code / 80 %** | Le code, c'est 20 % du travail. Les 80 %, c'est ce qui fait que les gens paient, et reviennent. |
| 20–26 s | Photo de Noé · **13 000 €/mois · 300 000 utilisateurs** | Moi c'est Noé. Je suis développeur, mais je conçois d'abord les 80 %. Une application que j'ai conçue fait 13 000 € par mois. Une autre, 300 000 utilisateurs. |
| 26–30 s | **Raconte-moi ton idée.** · bouton WhatsApp | Raconte-moi ton idée. Je te dis si elle tient. C'est gratuit. |

Voix posée, même registre que le vocal validé le 06/10. Si ça dépasse 30 s : couper, jamais accélérer. Le même fichier sert de reel épinglé et de créa Meta.

## 2. La section : à la place de « Mon métier », après la galerie

`#difference` (Agences vs Noé) disparaît, absorbée. `#metier` est remplacé. Ordre après : hero + vidéo → bandeau de preuves → galerie → **cette section** → « Avant de payer un euro, je t'offre » → « Comment ça se passe ? » → contact → FAQ → Insta → audit.

Règle d'écriture : **aucun bloc au-delà de 20 mots.** Les visuels portent l'argument, le texte le nomme.

- Kicker : `La différence`
- H2 : **Une idée + un développeur, ça ne suffit pas.**

| Bloc | Visuel | Texte |
|---|---|---|
| 1 | Grille 10 × 10, 3 points s'allument au scroll | **3 sur 100** applications dépassent 10 000 € par mois. Les 97 autres avaient une idée. Et un développeur. *(RevenueCat 2024)* |
| 2 | Camembert, la part 80 % se remplit | **Le code, c'est 20 % du travail.** 20 % — le code · 80 % — ce qui fait payer, et revenir |
| 3 | Trois cartes, une icône chacune (code · IA · bâtiment) | **Un développeur** exécute ton idée · **Une IA** l'exécute plus vite · **Une agence** l'exécute à 15 000 € |
| 4 | Photo de Noé (ronde), fond violet pâle | **Moi, c'est Noé.** Je suis développeur. Mais je conçois d'abord les 80 %. · **13 000 €** par mois, une application que j'ai conçue · **300 000** utilisateurs sur une première version · **Et surtout** : ils reviennent. C'est ça, mon métier. · Bouton « Raconte-moi ton idée » · Réponse dans la journée, 6j/7 · lien « Combien coûterait mon app ? » (`/rendez-vous`, inchangé) |

Animations : IntersectionObserver, `prefers-reduced-motion` respecté. SVG inline, pas d'images. Jamais « UX », « onboarding », « paywall », « site ».

## 3. Les retouches qui vont avec

- FAQ, une question : *Pourquoi pas juste un développeur, ou une IA ?* — *Parce qu'un développeur, comme une IA, exécute ce qu'on lui demande. Une application qui rapporte, c'est 20 % de code et 80 % de décisions prises avant : le support, le premier écran, le moment du paiement, la raison de revenir. C'est ce que je conçois avant de coder.* Lien vers `/blog/pourquoi-applications-ne-rapportent-rien/`.
- Carrousel Instagram « 3 sur 100 » avec les mêmes visuels, une fois la section en ligne.

## Ce qu'on ne touche pas

Titre et bouton du hero, bandeau de preuves, galerie, prix, étapes, tunnel WhatsApp unique, URL.

## Ordre de réalisation

1. Section + FAQ dans `src/App.jsx` (une demi-journée). Build, contrôle SEO (`lienInterne()`, barre finale, h2 dans le HTML servi).
2. Vidéo : enregistrer la voix (30 s), produire le motion design (mots, grille, camembert, photo), exporter mp4 + webm, intégrer sous le bouton du hero.
3. Carrousel Instagram.
