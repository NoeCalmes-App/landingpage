# Diagnostic — Tunnel audit_app & landing

**Objectif business rappelé** : attirer gratuitement des prospects via la landing → les faire passer l'audit → **les faire prendre un appel avec toi**, jamais leur donner un prix.

**Date** : 25 mai 2026
**Périmètre analysé** : `index.html`, `src/App.jsx` (home), `src/audit-app/*` (tunnel complet), `POSITIONNEMENT.md`, `STRATEGIE-COMMERCIALE.md`.

---

## 1. Ce qui est bien en place — ne pas casser

**Le positionnement est clair et bien tenu.** "Expert en application mobile", trois cas d'usage (créer / reprendre / faire évoluer), promesse "MVP en 45 jours". C'est aligné entre la home, les meta tags SEO, le JSON-LD et le ton du tunnel. Un visiteur comprend en 5 secondes ce que tu fais.

**Le hero d'audit_app est bon.** Le format "vous vous posez ces 3 questions ?" est un miroir psychologique efficace : viabilité, budget, délai. Les cartes "papier désordonné" donnent un côté humain qui contraste bien avec une agence. Le CTA "Lancer mon audit gratuit" est clair.

**Le formulaire est intelligent.** 5 étapes courtes, choix qui s'auto-avancent, étape concurrents conditionnelle (skip si "aucune solution"), saisie vocale + attachement de fichier. La friction est faible. Le `MIN_ANALYSIS_MS = 12000` qui force 12 secondes d'écran d'analyse est un bon move psychologique : ça donne de la valeur perçue à l'audit.

**La top bar pendant l'audit est premium.** Photo + "Expert · disponible" avec faux check 1.6s + raccourci "Discuter avec Noé" → ça crée une présence rassurante sans agresser. Très bien.

**Le verdict est structuré comme une vraie analyse.** Pitch reformulé, ce qui est solide / ce qui manque, concurrents avec angle d'attaque, défi principal, différenciation. Le prospect repart avec quelque chose de concret — pas un PDF générique.

**Le `plan_action` a déjà été retiré de l'UI.** Bonne décision déjà actée : tu ne donnes pas la recette pour exécuter sans toi. Note dans le code conservée pour mémoire.

**Branchement hot/cold lead.** `ClosingHotLead` (CTA Calendly) vs `ClosingColdLead` (renvoi vers noecalmes.fr) — c'est une vraie qualification commerciale automatique. Excellent.

---

## 2. Le problème principal — à corriger en priorité

### Le verdict affiche un prix indicatif. C'est en contradiction directe avec ta stratégie.

Fichier : `src/audit-app/AuditAppVerdict.jsx`, lignes 153–188 et 234–269.

Tu as une section **"Pour un devis précis"** qui contient :

```
Le prix : {verdict.prix_indicatif}
Le délai : {verdict.delai_indicatif}
```

Et l'API renvoie effectivement ce champ (`api.js` ligne 28 : `prix_indicatif: string | null`).

**Pourquoi c'est un problème** :

1. Tu m'as dit littéralement *"audit_app à la fin pas de prix et fait en sorte que le client prenne un appel avec moi"*. Donc c'est en contradiction avec ton intention.
2. Ton `STRATEGIE-COMMERCIALE.md` section 8 dit : *"Donner un prix exact à l'oral — toujours une fourchette + devis écrit"*. Même logique : un prix à l'écrit dans un audit anonyme, c'est pire qu'à l'oral, parce que tu n'as ni la voix, ni le rapport, ni la qualification du projet.
3. Le visiteur qui lit "à partir de 3 500 €" dans l'audit n'a plus aucune raison de prendre un appel. Il a déjà sa réponse. Tu fais le travail de qualification gratuitement et tu perds le RDV.
4. Pire : ton intro de section s'appelle *"Pour un devis précis"* — donc tu promets un devis précis tout en donnant déjà un prix. Cognitivement, le prospect lit le prix et oublie le CTA.

**Recommandation — 3 options par ordre de préférence** :

| Option | Effort | Effet |
|---|---|---|
| **A. Supprimer la section "Pour un devis précis" entièrement** | 5 min de code | Le prix disparaît. Le délai aussi. Le seul moyen de savoir, c'est l'appel. ⭐ Recommandé. |
| **B. Garder uniquement le délai, retirer le prix** | 5 min | "Combien de temps avant lancement ?" est rassurant et différenciant (45j). Le budget reste mystère. Bon compromis. |
| **C. Remplacer le prix par un teaser** | 10 min | "Le budget de votre projet dépend de plusieurs paramètres qu'on regardera ensemble en 30 min." → renforce le CTA. |

Côté backend / prompt LLM : tu peux soit forcer `prix_indicatif: null` côté Cloud Function, soit juste ne plus le rendre côté front. Le plus propre = stopper la génération côté backend pour ne pas gaspiller les tokens.

### Effet collatéral à corriger en même temps

Le **formulaire demande le budget** (`q4_answer`, config.js l. 158-185). Si tu ne montres plus de prix dans le verdict, demander le budget devient un signal de qualification interne — c'est très bien pour toi (tu sais à qui tu as affaire avant l'appel), mais le prospect peut se demander "pourquoi on me demande mon budget si on ne me donne pas de prix ?".

**Deux options** :
- **Garder la question budget** (utile pour ta qualification, et l'IA s'en sert dans son analyse). Mais ajouter un petit helper texte sous la question : *"Cette information m'aide à adapter la suite de votre audit. Aucun prix ne vous sera donné automatiquement — on en parlera ensemble."*
- **Retirer la question budget** du tunnel public. Tu la poses pendant l'appel comme prévu dans ton script.

⭐ Recommandation : **garder mais ajouter le helper**. La question budget filtre déjà les chasseurs de prix bas et te permet d'éviter de passer 30 min au tel avec un budget "moins de 3 500 €".

---

## 3. Les frictions secondaires qui te font perdre des RDV

### 3.1 Le hook hero est centré "je doute de mon idée" — c'est plutôt cold lead

Les 3 questions du hero (`config.js` HERO_QUESTIONS) sont les questions d'un porteur de projet **qui doute encore**. Pour ta cible "petits entrepreneurs, fondateurs solo qui ont déjà décidé", c'est bien — ça les rassure, ça crée l'empathie.

**Mais** : ça attire aussi des gens qui sont à 6 mois de prendre une décision. Ils font l'audit, repartent avec un beau verdict, et tu n'auras de nouvelles que dans un an (ou jamais).

**Recommandation** : pas de changement immédiat sur le hero, mais ajouter une **mention de filtre** discrète au-dessus du CTA "Lancer mon audit" : *"Audit destiné aux projets qui visent un lancement dans les 6 prochains mois."* — ça ne refuse personne mais ça crée un cadre. Tu pourras la retirer si ça baisse trop le volume.

### 3.2 Le CTA hot lead pourrait être plus engageant

Aujourd'hui (`ClosingHotLead`) :
> **Pour aller plus loin** → "Réserver 30 minutes avec Noé"
> Sous-texte gris : *"Cadre de votre idée · Rédaction Cahier des charges · Devis"*

C'est correct mais "Pour aller plus loin" est tiède.

**Recommandation** :
- Titre : *"On en parle ensemble ?"* ou *"La suite logique"*
- Bouton : *"Réserver mon appel avec Noé"* (le "mon" augmente l'engagement vs "30 minutes")
- Sous-texte enrichi : *"30 min · gratuit · sans engagement · WhatsApp ouvert avant et après"*

L'objectif : retirer tout ce qui peut paraître transactionnel et remplacer par du relationnel.

### 3.3 Le cold lead est sous-exploité

`ClosingColdLead` renvoie juste vers noecalmes.fr. Mais ce prospect a quand même rempli 5 étapes, son projet est juste pas mûr — c'est de l'or pour ta liste mail.

**Recommandation** :
- Capturer son email **avant** d'afficher le verdict (déjà fait visiblement ? à vérifier dans `AuditAppForm`)
- Sur le cold lead, proposer en plus du lien vers la home : *"Je vous écris dans 2 semaines pour voir où vous en êtes."* ou *"Je vous envoie ma checklist 'Suis-je prêt à lancer mon app ?' par mail."*
- Ne pas brûler ce lead. C'est ta liste de nurturing.

### 3.4 La FAQ de la home mentionne encore "à partir de 3 500 €"

`STRATEGIE-COMMERCIALE.md` section 6 dit que la landing reste sur "MVP 45 jours, à partir de 3 500 €". Décision assumée — donc cohérence avec l'audit qui devra rester silencieux sur le prix. C'est intentionnel : tu donnes l'ordre de grandeur sur la home pour rassurer, et tu fais le travail de qualification précis pendant l'appel.

**Mais** : si tu envoies du trafic SaaS directement vers `/audit-app` (pubs, posts Insta), le prospect n'a peut-être jamais vu le "3 500 €" de la home. C'est OK — ça devient un argument de plus pour le faire appeler.

### 3.5 Le titre de section "Pour un devis précis" survivra à la suppression du prix

Si tu appliques la recommandation A (supprimer la section), le titre disparaît. Si tu appliques B (garder le délai), renomme la section : *"Le délai de votre projet"* ou *"À quoi vous attendre côté planning"*.

### 3.6 Aucune preuve sociale dans le verdict

Le verdict est l'écran le plus vendeur du tunnel. Le prospect est chaud. Et là — rien. Pas un témoignage, pas une logo bar, pas une preuve. Pourtant tu en as plein sur la home (Snap Master, Calorie, Purge, Hush + témoignages Sophie / Thomas / Mehdi).

**Recommandation** : ajouter **avant le `ClosingHotLead`** un bloc compact :
- 1 témoignage court (1 phrase + nom + photo)
- ou une mini barre logos "Ils m'ont fait confiance" avec 3-4 icônes d'apps

C'est l'une des modifs les plus rentables possibles.

---

## 4. SEO / acquisition gratuite — état des lieux

**Bien fait** : meta description précise, JSON-LD `Person` + `Service` + `FAQPage` + `BreadcrumbList`, Open Graph complet, canonical, fonts préchargées avec `media="print"` + onload (technique perf solide). Le pixel Meta est en place pour le retargeting.

**À améliorer pour attirer plus de SaaS gratuit** :

1. **Pas de section blog sur le mot-clé "audit application mobile gratuit"**. Tu as un Blog.jsx existant — un article *"Comment savoir si votre idée d'app peut marcher ? (audit gratuit en 2 minutes)"* serait un aimant SEO + CTA naturel vers `/audit-app`.

2. **L'URL `/audit-app` n'a pas de Schema.org dédié**. Tu pourrais ajouter dans `AuditApp.jsx` un JSON-LD `Quiz` ou `HowTo` qui décrit l'audit — ça remonte mieux pour les requêtes "tester son idée d'app".

3. **Pas de partage social du verdict**. Un prospect qui reçoit un verdict positif veut souvent le partager. Tu pourrais ajouter un bouton "Partager mon audit" qui génère une URL unique → c'est un canal de viralité quasi gratuit. (Effort plus gros, à mettre en backlog.)

4. **Pas de retargeting Meta sur les abandons du tunnel**. Le pixel est là, mais y a-t-il un event `audit_started`, `audit_step_3`, `audit_completed` ? Si oui, parfait. Sinon, à câbler — c'est ce qui te permet de relancer en pub les gens qui ont commencé mais pas fini.

---

## 5. Cohérence avec ta stratégie — ce qui colle ou pas

| Règle ta stratégie | État audit_app | Verdict |
|---|---|---|
| Pas de prix à l'oral | Prix indicatif AFFICHÉ dans le verdict | ❌ À CORRIGER |
| Tarif fixe, pas de TJM | Aucune mention TJM | ✅ |
| MVP en 45 jours mis en avant | Question "Combien de temps avant lancement ?" dans hero | ✅ |
| Vouvoiement dans les écrits formels | Tunnel = vouvoiement | ✅ |
| Joignable 6j/7 directement | Top bar "Discuter avec Noé" + CTA Calendly | ✅ |
| Pas d'agence, un seul expert | "Réserver 30 minutes avec Noé" | ✅ |
| Filtrer les chasseurs de prix bas | Question budget filtre en amont | ✅ partiel (cf. 3.6) |
| Cadrage gratuit, devis écrit après appel | Sous-texte CTA mentionne cadrage + cahier des charges + devis | ✅ |

**Score global** : la stratégie est bien implémentée à 90 %. Le **point d'incohérence majeur, c'est le prix dans le verdict**. C'est le seul vrai chantier prioritaire.

---

## 6. Plan d'action recommandé — par ordre de priorité

### Priorité 1 — Aligner le verdict sur ta stratégie (1h de code max)

1. Dans `AuditAppVerdict.jsx`, supprimer la section "Pour un devis précis" OU retirer uniquement le bloc `hasPrix`.
2. Dans `AuditAppForm.jsx` (à vérifier), ajouter un helper texte sous la question budget.
3. Dans la Cloud Function (`functions/.../verdictWeb`), retirer la génération de `prix_indicatif` du prompt — économie de tokens et garantie qu'aucun prix ne fuite.

### Priorité 2 — Renforcer le CTA verdict (30 min)

1. Modifier le titre `ClosingHotLead` et son sous-texte selon section 3.2.
2. Ajouter un bloc preuve sociale juste avant le closing (1 témoignage + photo).

### Priorité 3 — Mieux capter les cold leads (1-2h)

1. Vérifier que l'email est bien capturé en début de tunnel.
2. Enrichir `ClosingColdLead` avec une offre de nurturing (newsletter, checklist, relance auto à 2 semaines).
3. Câbler les events Meta Pixel sur chaque étape.

### Priorité 4 — Acquisition SEO long terme (1 journée)

1. Article de blog dédié à l'audit.
2. JSON-LD `HowTo` sur `/audit-app`.
3. Plus tard : partage social du verdict.

---

## 7. Ce que je n'ai pas vu et que je recommande de vérifier toi-même

- **Le prompt système de la Cloud Function** (`functions/audit-verdict/...` probable) — c'est lui qui génère `prix_indicatif`. Sans le toucher, le champ continuera à exister même si tu le caches en front.
- **L'event tracking** — je n'ai pas exploré la stack analytics au-delà du pixel Meta dans index.html. Si tu n'as pas de funnel mesuré, tu pilotes à l'aveugle.
- **Les performances mobiles** — `MIN_ANALYSIS_MS = 12s` c'est intentionnel et bien, mais si la page n'est pas fluide pendant ces 12s, le prospect peut décrocher. Animation d'analyse à vérifier sur mobile 4G.
- **Le devis-app** — tu m'as dit de ne pas l'analyser, donc je n'ai rien à dire dessus. Mais si un jour tu veux que le devis affiche **automatiquement** le projet issu de l'audit (cahier des charges pré-rempli), c'est là qu'est le levier de productivité majeur côté ton côté à toi.

---

## Conclusion en 3 phrases

Ta stratégie commerciale est solide et bien matérialisée. Le seul vrai trou dans la raquette, c'est l'affichage du prix indicatif en fin d'audit qui contredit ta logique "pas de prix, prends un appel". Corrige ça en priorité, ajoute une preuve sociale dans le verdict, et tu auras un tunnel d'acquisition gratuit aligné à 100 % sur ta vente par l'appel.
