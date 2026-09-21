# Performance mobile — audit Lighthouse du 21/09/2026

> Mesuré avec **Lighthouse 13.5**, profil mobile, réseau et processeur bridés
> comme le fait PageSpeed Insights. L'API publique de PSI était à court de quota
> ce jour-là, l'audit a donc été lancé en local avec le même moteur.
>
> URL testée : `https://noecalmes.fr/`

## Les scores

| Catégorie | Score |
|---|---|
| **Performance** | **57** |
| Accessibilité | 88 |
| Bonnes pratiques | 100 |
| SEO | 100 |

## Ce que vit un visiteur mobile

| Mesure | Valeur | Lecture |
|---|---|---|
| Premier affichage (FCP) | **6,2 s** | l'écran reste blanc six secondes |
| Plus grand élément affiché (LCP) | **14,7 s** | le contenu principal met quinze secondes |
| Stabilité visuelle (CLS) | **0** | parfait, rien ne saute |
| Blocage du fil principal (TBT) | 180 ms | bon |

**Le diagnostic tient en une phrase : ta page n'est pas lente à réagir, elle est
lente à arriver.** L'interactivité et la stabilité sont bonnes. C'est le
téléchargement qui plombe tout.

Pour situer : Google considère qu'un LCP dépasse le seuil acceptable à partir de
2,5 secondes. Tu es à 14,7.

---

## La cause, en un chiffre

La page pèse **2 544 Ko**, dont **1 432 Ko d'images**. Et ces images sont
servies dans des dimensions sans rapport avec leur affichage.

| Fichier | Poids | Dimensions réelles | Affiché en | Rapport |
|---|---|---|---|---|
| `snapmaster.png` | **642 Ko** | 1254 × 1254 | **30 × 30** | 1 750 fois trop de pixels |
| `me.webp` | **504 Ko** | 1026 × 1026 | **60 × 60** max | 290 fois trop |
| `calorievisuelle.png` | 200 Ko | 536 × 1053 | 195 px de large | 7 fois trop |
| `favicon.png` | 87 Ko | 512 × 512 | 32 × 32 | un favicon de 87 Ko |

Ce qui rend le constat net : **les trois autres icônes d'applications sont déjà
optimisées** et pèsent 10 à 16 Ko en WebP. Seul `snapmaster` est resté un PNG
d'origine. Ce n'est pas un problème de méthode, c'est un oubli sur deux fichiers.

---

## Les corrections, par impact

### 1. Redimensionner les quatre images lourdes

| | |
|---|---|
| **Gain attendu** | **environ 1 390 Ko, soit 55 % du poids de la page** |
| **Où** | `public/assets/images/` |
| **Effort** | quelques minutes |

Chaque image doit être générée à deux fois sa taille d'affichage, pour rester
nette sur écran retina, puis convertie en WebP.

| Fichier | Cible | Poids visé |
|---|---|---|
| `apps/snapmaster.png` | 90 × 90, en WebP | ~6 Ko |
| `profile/me.webp` | 180 × 180 | ~12 Ko |
| `apps/calorievisuelle.png` | 540 × 1060, en WebP | ~25 Ko |
| `icons/app/favicon.png` | 96 × 96 | ~3 Ko |

Attention pour `me.webp` : il est utilisé à quatre endroits, jamais au-delà de
60 pixels. Une seule version en 180 px suffit partout.

Le remplacement du PNG par un WebP demande de changer l'extension dans
`src/App.jsx` lignes 49 et 50.

### 2. Différer les scripts de suivi

| | |
|---|---|
| **Gain attendu** | **413 Ko et une bonne partie des 6 secondes de premier affichage** |
| **Où** | `index.html` |
| **Effort** | une demi-heure |

Trois scripts tiers se chargent avant que ta page ne s'affiche :

| Script | Poids | Inutilisé au chargement |
|---|---|---|
| Google Tag Manager | 171 Ko | 70 Ko |
| Facebook `fbevents.js` | 107 Ko | 37 Ko |
| Facebook `signals/config` | 135 Ko | 39 Ko |

Aucun n'est nécessaire pour afficher la page. Les charger après le premier
rendu, ou au premier défilement, ne change rien à la mesure d'audience et rend
la page visible bien plus tôt.

### 3. Découper le bundle JavaScript

| | |
|---|---|
| **Gain attendu** | **jusqu'à 202 Ko et 1,5 seconde** |
| **Où** | `src/App.jsx` et `vite.config.js` |
| **Effort** | une à deux heures |

Le fichier `index-B3BJqXNs.js` pèse 351 Ko, dont **202 Ko ne servent pas** au
chargement de l'accueil. C'est normal : le bundle contient aussi le blog, les
quiz, l'audit et les maquettes, qui ne sont pas utilisés sur la page d'accueil.

La correction s'appelle le chargement différé : `React.lazy()` sur les routes
qui ne sont pas l'accueil. Vite génère alors un fichier par route et n'envoie
que celui dont la page a besoin.

### 4. Ne plus bloquer l'affichage avec la feuille de style

| | |
|---|---|
| **Gain attendu** | quelques centaines de millisecondes sur le premier affichage |
| **Où** | `src/index.css` et la configuration Vite |
| **Effort** | une à deux heures |

`index-CUqxt6oM.css` pèse 74 Ko et bloque le rendu : le navigateur ne peut rien
afficher tant qu'il ne l'a pas téléchargé et lu.

À faire seulement après les trois premières corrections : le gain est réel mais
modeste comparé aux images, et la manipulation est plus délicate.

### 5. Le cache, et pourquoi il ne se corrige pas ici

| | |
|---|---|
| **Gain théorique** | 2 008 Ko sur les visites répétées |
| **Où** | impossible sur GitHub Pages |

Lighthouse signale que tous tes fichiers sont mis en cache **10 minutes
seulement**. Vérifié en direct : `cache-control: max-age=600`.

C'est la valeur imposée par GitHub Pages, et elle n'est pas configurable. Un
visiteur qui revient le lendemain retélécharge donc tout.

La seule correction réelle serait de placer un CDN devant le site, par exemple
Cloudflare en gratuit, qui permet de fixer ces en-têtes. **Ce n'est pas
prioritaire** : ça n'améliore pas la première visite, qui est celle qui compte
pour un visiteur venu de Google.

---

## Accessibilité : 88, trois défauts simples

Non demandé, mais relevé par le même audit et rapide à corriger.

- **Des boutons sans nom accessible.** Un lecteur d'écran annonce « bouton »
  sans dire lequel. Corriger avec un `aria-label`.
- **Un contraste insuffisant** entre un texte et son fond.
- **Pas de repère `main`.** La page n'a pas de balise `<main>`, ce qui prive les
  lecteurs d'écran du raccourci « aller au contenu ».

---

## Ce qu'il faut retenir

Les corrections 1 et 2 représentent **1 800 Ko sur 2 544**, soit plus de 70 % du
poids de la page, pour moins d'une heure de travail. Les corrections 3 et 4
demandent plusieurs heures pour un gain nettement plus faible.

**Commence par les images. Tout le reste peut attendre.**

---

## À refaire

Relancer cet audit après les corrections 1 et 2, avec la même commande :

```bash
npx lighthouse "https://noecalmes.fr/" --form-factor=mobile --screenEmulation.mobile \
  --throttling-method=simulate --only-categories=performance \
  --output=json --output-path=./lh-mobile.json \
  --chrome-flags="--headless=new" --quiet
```
