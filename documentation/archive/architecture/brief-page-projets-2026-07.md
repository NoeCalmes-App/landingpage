# Archive — Brief de la page « /projets » (portfolio) de Noé Calmes

> **Statut : archive de travail du 8 juillet 2026.** Ce brief a servi à créer puis à
> refondre la page `/projets`. La version publique actuelle vit dans `src/Projets.jsx`.
> Les prix, textes et descriptions de la page ci-dessous reflètent l'état du projet à
> cette date et ne constituent plus une source de vérité actuelle.

> **À l'attention de l'IA qui reçoit ce document.**
> Tu es un expert en copywriting de conversion + UX/UI pour landing pages SaaS.
> Objectif : analyser tout ce qui suit (positionnement, ICP, funnel, design system, page actuelle),
> vérifier la cohérence, corriger ce qui peut l'être, et me proposer **la meilleure version possible**
> de la page `/projets` : structure + copy mot à mot + justification de chaque choix.
> Ne révèle jamais d'informations client (voir règle de confidentialité). N'invente pas de chiffres.
> Contexte : site en français, cible française, vouvoiement dans les écrits formels.

---

## 1. Qui est Noé Calmes

**Expert en application mobile.** Pas un développeur à la mission, pas une agence. Un seul expert qui
prend un sujet mobile en main, de la stratégie au lancement. Stack technique : Flutter (iOS + Android),
mais « Flutter » n'est jamais mis en avant dans le discours (trop technique pour la cible).

**Phrase de référence (hero de la landing) :**
> « Je transforme votre idée en application qui génère des revenus. »

**Les 3 piliers :** Stratégie · Design · Développement.
**Les 3 cas d'usage :** Créer · Reprendre · Faire évoluer une application mobile.

**Promesse client :**
- Un seul expert, joignable directement 6j/7 (WhatsApp), pas de middleman.
- Tarif fixe, zéro surprise (pas de TJM).
- MVP livré en ~45 jours.
- Pensé business : une app conçue pour générer des revenus, pas juste du code livré.

**Angle business central :** le client ne veut pas une app, il veut une app **qui lui rapporte**
(clients, revenus, valeur). Noé vend un produit mobile orienté business, pas une compétence technique.

---

## 2. ICP (client idéal)

**Cœur de cible :** petits entrepreneurs et porteurs de projet — fondateurs solo, indépendants,
créateurs early-stage qui ont une idée d'app mobile à lancer. Profils **peu techniques** : ils achètent
surtout le cadrage et la capacité à les guider, pas du code à la mission. Décision rapide, peu
d'intermédiaires.

**Range tarifaire :** 3 500 € – ~30 000 € (tarif fixe).

**À attirer :** fondateurs qui veulent une première version (MVP), créateurs/indépendants qui veulent
une app pour leur business, petits entrepreneurs qui veulent transformer une idée en produit concret.

**À éviter :** chasseurs de prix bas, projets flous (« on verra bien »), clients qui attendent une
grosse agence, budgets irréalistes.

---

## 3. Rôle de cette page dans le funnel — IMPORTANT

Le funnel du site : tout mène à **WhatsApp** (canal de contact unique). La question prix/budget passe
par `/audit-app`. La qualification se fait dans le chat, puis un appel est calé avec les leads chauds.

**La page `/projets` n'est PAS une page d'acquisition.** Elle est envoyée **après un premier appel**,
à des gens qui **ont déjà le WhatsApp de Noé**. Scénario type :
> Fin d'appel → « Merci pour l'échange, voici mon travail » → lien `/projets`.

Elle sert à **installer la confiance** quand elle n'est pas encore établie : le prospect arrive dessus,
voit les preuves, et se dit « ce mec est fort, il coche toutes les cases, il ne rigole pas ».

**Conséquences de design (règles fermes) :**
- **Mobile-first** : la page est ouverte sur téléphone (envoyée par WhatsApp).
- **Pas de CTA** de contact (l'audience a déjà le WhatsApp — un bouton « discuter » serait redondant).
- **Pas de dates** de création affichées (choix esthétique de Noé).
- **iOS + Android** doit être visible (Noé fait du multiplateforme, pas seulement iOS).
- **Confidentialité client absolue** : pour les autres apps, ne jamais afficher le nom du client,
  les chiffres, ni les écrans.
- **Chaque mot doit être optimisé**, expert, cohérent. La page doit respirer le talent et la maîtrise.

---

## 4. Design system (à respecter)

- **Couleurs :** surface `#fffefc` · texte navy `#033475` · violet marque `#665dff` ·
  violet très clair (wash) `#f0eeff` · gris `gray` · carte `#f9f9f9` · bordure carte `#ececec`.
- **Typo :** Geist (titres) · Inter (corps).
- **Style :** minimaliste, moderne, cartes arrondies (`border-radius ~18px`), ombres discrètes,
  beaucoup d'air. Pas de surcharge.
- **Signature visuelle de Noé :** un **surligneur violet** derrière le bas d'un mot clé
  (pseudo-élément `::after`, `background: rgba(102,93,255,0.22)`, `height: ~26%`, coins arrondis) —
  utilisé sur ses stories Instagram et sur le hero de la landing.
- **Stack :** React + Vite + Tailwind CSS v4. Routing SPA maison dans `src/App.jsx`.
  La page vit dans `src/Projets.jsx`, routes `/projets` et `/projet`.

---

## 5. Ce qui est EN PLACE aujourd'hui sur `/projets` (version actuelle)

### Structure
1. **Barre haut (sticky)** : bouton « Retour » + « Noé Calmes ».
2. **Hero (centré) :**
   - Pastille : `+20 applications publiées · iOS & Android`
   - Titre (H1) : **« Les applications que j'ai *conçues* »** (« conçues » en violet)
   - Sous-titre : « Je pars de votre idée, je la cadre, je la conçois 100% sur-mesure. Voici ce que ça donne. »
3. **4 cartes de preuve** (grille 1 colonne mobile / 2 colonnes desktop). Chaque carte = icône de l'app,
   nom, courte description, **un seul chiffre/atout fort** avec une icône contextuelle, et une petite note.
   L'idée : chaque app prouve **une case différente** pour que le prospect se dise « il coche tout ».

   | App | Description | Atout mis en avant | Icône | Note | « Case » prouvée |
   |---|---|---|---|---|---|
   | **Calorie** | Suivi nutrition & calories | **13 000 € / mois** | flèche ↑ | 2 mois après le lancement | Revenus |
   | **Hush** | Messagerie anonyme | **300 000 utilisateurs** | flèche ↑ | Sur la première version | Utilisateurs |
   | **Plouff Habitudes** | Suivi d'habitudes | **45 jours** | minuteur | Du design au lancement | Vitesse d'exécution |
   | **Wake Up Alarme** | Réveil à missions | **Sonne hors-ligne** | puce électronique | Audio en arrière-plan, une vraie prouesse technique | Technicité |

4. **Section « étendue » (sans rien révéler) :**
   - Titre : « Des applications pour… »
   - Sous-titre : « Des secteurs très différents, une même exigence de conception. »
   - Liste d'usages (puces) : Le coaching en salle de sport · La gestion d'entreprise & la logistique ·
     La finance personnelle · Une communauté de passionnés · La réservation de services ·
     Le rangement de photos *(= Purge, en dernier)*.
   - Ligne de confidentialité (avec cadenas) : « Confidentialité client : je n'affiche ni leur nom,
     ni leurs chiffres, ni leurs écrans. »
5. **Signature de bas de page :** « Noé Calmes · Expert en application mobile · iOS & Android ».

### Décisions de design déjà prises (et pourquoi) — à conserver sauf meilleure idée
- **Pas de label de catégorie** (« Revenus », « Utilisateurs »…) sur les cartes : le chiffre parle seul
  (300 000 utilisateurs = évidemment « utilisateurs »). Ça évite le redondant.
- **4 cartes homogènes** : même gabarit, un seul atout par carte. Une version antérieure affichait une
  chaîne « Design › Stratégie › Développement › Lancement » sur Plouff et une liste de features sur
  Wake Up → jugé **trop bruyant/incohérent**. Simplifié.
- **Icônes contextuelles** : la flèche ↑ n'apparaît QUE sur les vrais chiffres de croissance
  (revenus, utilisateurs) ; minuteur = vitesse ; puce = technicité.
- **Angle « 100% sur-mesure »** dans le hero : Noé prend l'idée du client, la cadre, la personnalise
  à 100 %. C'est un axe de vente fort (talent + écoute + personnalisation).

---

## 6. Données réelles des apps (faits vs à confirmer)

**Confirmé (déjà écrit sur la landing / le script d'appel de Noé) :**
- **Calorie** : une app cliente qui génère **13 000 €/mois**, ~2 mois après le lancement.
- **Hush** : messagerie anonyme, **300 000 utilisateurs sur la 1ʳᵉ version** (Noé a fait cette 1ʳᵉ version).
- **+20 applications** publiées sur les stores (toute carrière confondue).

**Apps propres de Noé (sites publics) :**
- **Wake Up Alarme** — wakeupalarm.app — « Réveillez-vous avec des missions interactives, affirmations
  quotidiennes, alarme intelligente qui s'adapte à votre routine. » Particularité technique : sonne
  hors connexion, audio en arrière-plan. *(Détail « son basé sur Spotify » évoqué mais À CONFIRMER.)*
- **Plouff Habitudes** — plouff-habitudes.com — « Crée des habitudes qui durent : suis tes progrès,
  maintiens tes séries, célèbre tes réussites. Interface chaleureuse pour une routine positive. »
  Conçue en 45 jours (du design à la mise en ligne). — CONFIRMÉ

**Apps clientes mises en avant sur le hero de la landing :** Snap Master, Calorie, Purge, Hush.
- **Purge** — rangement/tri de photos — App Store `id6762089158` (« Purge - Declutter Photos »).

**À CONFIRMER par Noé avant diffusion :**
- Hush : **300 000** — CONFIRMÉ par Noé.
- Plouff : **45 jours** — CONFIRMÉ par Noé.
- Wake Up : le **détail technique le plus fort** à mettre en avant (Spotify hors-ligne ? autre ?).
- La liste « Des applications pour… » : remplacer par les **vrais usages** (sans détail client).
- Snap Master : que fait cette app ? (pour l'instant retirée, description inconnue.)
- Faut-il transformer coach salle / outil entreprise-logistique / Purge en **vraies cartes**
  (nécessite leurs icônes / captures) ou les laisser dans la liste d'usages ?

---

## 7. Règles de vocabulaire (écrits formels)

| ✅ Utiliser | ❌ Éviter |
|---|---|
| Application mobile | « App » (dans les contextes formels) |
| Expert en application mobile | Freelance / prestataire / Expert Flutter |
| Générer des revenus | Livrer du code |
| Tarif fixe | TJM / prix à la journée |
| Créer / reprendre / faire évoluer | Refonte / développer |
| Cadrage | Specs / spécifications |

Ton : direct, structuré, pro mais pas corporate. Affirmations > questions. **Vouvoiement** dans les
écrits formels. Cadre clair > promesses floues.

---

## 8. Ce que je te demande (consigne à l'IA)

1. **Analyse** le positionnement, l'ICP, le rôle de la page et le design system ci-dessus.
   Tiens compte du fait que la landing de base existe déjà (noecalmes.fr) et que cette page en est
   le prolongement « preuve », envoyé après un premier appel.
2. **Vérifie la cohérence** de la page actuelle : le hero, l'ordre des cartes, le choix des atouts,
   la section « étendue », la ligne de confidentialité, la signature.
3. **Propose LA meilleure version** :
   - structure section par section,
   - **copy mot à mot** (titres, sous-titres, descriptions, notes, micro-copy),
   - justification courte de chaque choix (pourquoi ça convertit mieux),
   - variantes de titre/sous-titre du hero si pertinent.
4. **Contraintes non négociables :** mobile-first, pas de CTA, pas de dates, iOS + Android visible,
   confidentialité client absolue, aucun chiffre inventé (marque clairement les placeholders),
   vocabulaire ci-dessus, ton vouvoyé.
5. **Optimise chaque mot.** Objectif : en 5 secondes, le prospect se dit « il est fort avec les chiffres
   (des revenus réels), il fait grimper les utilisateurs vite, c'est 100% sur-mesure, il est à l'écoute ».
6. Signale les **risques** (ex. chiffres à confirmer) et les **questions ouvertes** que tu me poserais.

---

*Document généré comme brief de consolidation. La page technique existante est dans `src/Projets.jsx`
(React + Tailwind v4). Copie ce brief tel quel dans le modèle de ton choix.*
