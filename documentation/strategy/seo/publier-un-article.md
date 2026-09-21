# Publier un article — la procédure complète

> **Ce fichier est un runbook, pas un cours.** Il se suit de haut en bas, une
> phase après l'autre, sans en sauter. Chaque commande est copiable telle
> quelle.
>
> Répartition des trois fichiers, à ne pas confondre :
> - `idees-articles.md` décide **de quoi** on parle (la file de briefs)
> - `modele-article.md` décide **comment** l'article est construit (le format)
> - **ce fichier** décide **dans quel ordre** on fait les choses (le processus)
>
> Créé le 21/09/2026, à partir de ce qui a réellement fonctionné, et surtout de
> ce qui a failli mal tourner.

---

## La règle qui prime sur toutes les autres

**Ne jamais écrire un article dont le sujet est déjà traité sur le site.**

Ce n'est pas une préférence de style, c'est de l'arithmétique. Deux pages qui
visent la même requête ne s'additionnent pas, elles se divisent : Google en
choisit une, l'autre reste invisible, et les liens qui pointaient vers le sujet
se répartissent entre les deux au lieu de renforcer une seule page. Tu passes
une heure à écrire un article qui affaiblit celui que tu avais déjà.

La phase 0 existe uniquement pour ça. **Elle prend cinq minutes et elle est
non négociable.**

---

## Phase 0 — Vérifier que le territoire est libre

### 0.1 Prendre le brief

Le premier de la file dans `idees-articles.md` dont le statut est `à écrire`.

### 0.2 Regarder ce qui existe déjà, au bon niveau de détail

L'erreur à ne pas commettre est de comparer les **titres**. Un titre ne dit pas
ce qu'un article contient. La cannibalisation se joue au niveau des **sections**
et des **questions de FAQ**, parce que c'est ça que Google lit.

```bash
node -e "
const b=require('fs').readFileSync('src/Blog.jsx','utf8');
for(const p of b.split(/\n  \{\n    slug: '/).slice(1)){
  const s=p.split(\"'\")[0];
  console.log('=== '+s);
  (p.match(/<h2>[^<]*<\/h2>/g)||[]).forEach(h=>console.log('   '+h.replace(/<\/?h2>/g,'')));
  (p.match(/\{ q: \"[^\"]*\"/g)||[]).forEach(q=>console.log('   FAQ: '+q.slice(6,-1)));
}"
```

Lis la sortie en cherchant l'angle de ton brief, pas son titre.

> **Ce qui est arrivé le 21/09/2026.** Le brief n°3 s'intitulait « Application
> sur mesure ou no-code : ce que ça change dans deux ans », et son angle
> différenciant était explicitement « personne ne compare à deux ans ». La
> commande ci-dessus a montré que `creer-application-sans-savoir-coder`
> contenait déjà un H2 nommé **« Le vrai comparatif se fait à deux ans »**, plus
> les FAQ sur la propriété du code et la migration. Le brief avait été absorbé
> par un article qui avait grossi après sa rédaction.
>
> Écrire cet article aurait créé un concurrent interne. Le brief a été abandonné
> et la raison consignée dans `idees-articles.md`.

### 0.3 Vérifier le vocabulaire métier, pas seulement les titres

Un sujet peut être libre alors que son champ lexical est déjà occupé, et
l'inverse est vrai aussi. Cherche les mots que ton article emploierait :

```bash
grep -c "coût par requête\|coût variable\|marge\|token" src/Blog.jsx
```

Zéro occurrence veut dire territoire réellement vierge. Beaucoup d'occurrences
n'est pas rédhibitoire : regarde **dans quels articles** elles tombent et à
quel titre.

> **Ce qui est arrivé le 14/09/2026.** Le site comptait déjà quatre articles sur
> l'IA, ce qui laissait penser que le sujet était saturé. Le grep a montré que
> les quatre parlaient de l'IA **comme outil de fabrication**, et qu'aucun ne
> parlait de l'IA **comme fonctionnalité du produit**. Deux intentions d'achat
> différentes, donc deux territoires. L'article a été écrit.

### 0.4 Appliquer le filtre d'intention

Une seule question : **la personne qui tape cette requête peut-elle m'acheter
une application ?** Si c'est un pair qui gère déjà son app, le trafic montera
et les demandes non. Le détail est dans `content-plan.md`.

### 0.5 Trancher

| Constat | Décision |
|---|---|
| Aucun H2 ni FAQ ne couvre l'angle | **Écrire** |
| Un H2 couvre l'angle, mal | **Enrichir l'article existant**, ne pas en créer un second |
| Un H2 couvre l'angle correctement | **Abandonner le brief**, et écrire pourquoi dans `idees-articles.md` |

Un brief abandonné avec sa raison vaut mieux qu'un article de plus. C'est un
travail utile, pas un échec.

---

## Phase 1 — Aligner les chiffres avant d'écrire

Tout chiffre que l'article va avancer doit être confronté à ce que le site dit
déjà. Un site qui se contredit perd la confiance du lecteur et la cohérence que
Google évalue.

```bash
node -e "
const b=require('fs').readFileSync('src/Blog.jsx','utf8');
for(const p of b.split(/\n  \{\n    slug: '/).slice(1)){
  const s=p.split(\"'\")[0];
  const h=p.match(/[^.>]{0,80}(\d+\s*(jours|semaines|mois|€|%))[^.<]{0,80}/gi)||[];
  if(h.length){console.log('--- '+s);h.slice(0,5).forEach(x=>console.log('   '+x.replace(/\s+/g,' ').trim()));}
}"
```

### Les deux règles issues de l'expérience

**Un chiffre de rentabilité part toujours du net, jamais du prix affiché.**
Sur les stores le prix est TTC. Après TVA à 20 % puis commission du store,
il reste environ **70 %**. Deux articles avaient chiffré un remboursement en
brut, annonçant 68 et 45 abonnés là où les vrais chiffres étaient 96 et 63. Les
six mentions ont dû être corrigées après coup.

**Quand deux chiffres du site semblent se contredire, n'en supprime aucun :
explique dans une FAQ ce que chacun mesure.** Le site annonçait « 4 à 6
semaines » dans trois articles et « 45 jours » dans trois autres. Ce n'était pas
une contradiction, c'était le temps de travail d'un côté et le temps calendaire
de l'autre. La FAQ de l'article sur les délais le dit désormais explicitement.
Un site qui explique ses propres écarts inspire plus confiance qu'un site lissé.

---

## Phase 2 — Écrire

### L'ordre de travail

**Écris d'abord, vérifie ensuite.** N'ouvre pas dix onglets de recherche avant
d'avoir un premier jet. Rédige en ne t'appuyant que sur des faits stables et
durables, sans date ni tarif périssable : un tel article est publiable
immédiatement et ne se périme pas. La vérification vient après et sert à
enrichir, pas à autoriser.

Le format complet des champs et des blocs est dans **`modele-article.md`**. Ne
le réinvente pas ici.

### Les arbitrages éditoriaux, non négociables

Ils ont chacun coûté une leçon, ils ne se rediscutent pas.

**Ne jamais dénigrer un outil, un concurrent ou l'IA.** Un fait vérifiable est
plus dur à contredire qu'une opinion, et il positionne Noé en expert plutôt
qu'en concurrent aigri. L'article sur Lovable et Base44 ne dit jamais que ces
outils sont mauvais : il constate qu'ils produisent une application web, et il
en tire la conséquence commerciale. La version « c'est nul » aurait moins bien
classé et moins bien converti.

**Reconnaître honnêtement ce que l'autre fait bien**, dans une section dédiée.
C'est ce qui rend crédible tout le reste et ça évite le procès d'intention.

**Ne jamais titrer sur le nom de Noé.** Personne ne le cherche. On se positionne
sur le nom que des milliers de gens tapent déjà.

**Pas de titre qui promet l'inverse de ce que dit l'article.** Un titre peut
surprendre, il ne peut pas tromper.

**Tutoiement partout.** Sept articles ont dû être repris pour ça.

**Pas de tirets cadratins.** Préférer le point, la virgule, ou le point médian.

### Assumer une contradiction plutôt que la masquer

Si l'article nuance quelque chose qu'un autre article affirme, **ne corrige pas
discrètement l'ancien**. Publie l'exception, cite l'article contredit dès
l'introduction, et fais pointer l'ancien vers le nouveau. Deux conditions pour
que ça marche : le lien doit exister **dans les deux sens**, sinon les deux
pages se concurrencent au lieu de se compléter.

C'est ce qui a été fait le 14/09 entre `application-mobile-meilleur-investissement`
(« frais de fonctionnement faibles ») et `application-avec-ia-rentable`, qui
montre que c'est faux dès qu'un modèle d'IA est appelé.

---

## Phase 3 — Câbler l'article

### 3.1 L'objet dans `BLOG_ARTICLES`

À insérer **en tête** du tableau, dans `src/Blog.jsx`.

> **Piège.** `scripts/generate-routes.js` lit les meta par expression
> régulière. Les champs `slug`, `title`, `metaTitle`, `description` et `date`
> doivent rester **consécutifs et dans cet ordre**. Les déplacer casse la
> génération sans message clair.

### 3.2 Les liens entrants, calculés et non devinés

Chaque article doit recevoir **au moins 2 liens entrants**, et le build échoue
sinon. Il faut donc prendre des créneaux sur des articles qui en ont en réserve,
jamais sur un article qui est déjà au minimum.

Ne fais pas ce calcul de tête. Ce script trouve les créneaux disponibles et
applique les échanges :

```bash
python3 - <<'EOF'
import io, re
NEW='REMPLACER-PAR-LE-SLUG'
# sources classées par proximité de sujet avec le nouvel article
PRIO=['slug-proche-1','slug-proche-2','slug-proche-3','slug-proche-4']

p='src/Blog.jsx'; s=io.open(p,encoding='utf-8').read()
bloc=re.search(r'export const ARTICLES_LIES = \{([\s\S]*?)\n\}', s).group(1)
table={m[0]: re.findall(r"'([a-z0-9-]+)'", m[1])
       for m in re.findall(r"'([a-z0-9-]+)':\s*\[([^\]]+)\]", bloc)}
inb={k:0 for k in table}
for v in table.values():
    for t in v: inb[t]=inb.get(t,0)+1

faits=[]
for src in PRIO:
    if len(faits)==3: break
    if src==NEW or NEW in table.get(src,[]): continue
    for cible in table[src]:
        if cible!=NEW and inb[cible]>=3:        # uniquement les cibles en surplus
            av="'%s': [" % src + ', '.join("'%s'" % x for x in table[src]) + "]"
            table[src]=[NEW if x==cible else x for x in table[src]]
            ap="'%s': [" % src + ', '.join("'%s'" % x for x in table[src]) + "]"
            assert s.count(av)==1
            s=s.replace(av,ap,1); inb[cible]-=1; inb[NEW]=inb.get(NEW,0)+1
            faits.append('  %s : %s cede sa place (reste %d entrants)' % (src,cible,inb[cible]))
            break
io.open(p,'w',encoding='utf-8').write(s)
print('\n'.join(faits))
print('nouvel article : %d liens entrants' % inb[NEW])
print('minimum du site : %d' % min(inb.values()))
EOF
```

Ajoute aussi l'entrée du nouvel article avec ses 3 liens **sortants**, choisis
par proximité de sujet.

### 3.3 La route de pré-rendu

Dans `scripts/generate-routes.js`, tableau `blogRoutes` : `path`, `heading`,
`content`.

> **Piège de nommage.** Ce `content`-là n'est **pas** l'article. C'est un résumé
> de trois à cinq phrases, dense en faits et en chiffres, destiné aux robots.
> L'article complet est repris automatiquement depuis `BLOG_ARTICLES`.

---

## Phase 4 — Le build et ses six garde-fous

```bash
npm run build
```

Le build s'arrête net et dit quoi corriger. Les six contrôles :

| Contrôle | Ce qu'il empêche |
|---|---|
| Article sans route | Un lien depuis `/blog/` vers une 404 |
| Moins de 2 liens entrants | Un article que Google ne recrawle jamais |
| `finalCta` absent | Un appel à l'action choisi par défaut, au hasard |
| Meta hors limites, **sur le HTML généré** | Un titre ou une description tronqués dans les résultats |
| Lien interne sans barre finale | Une redirection 301 à chaque passage de robot |
| Contenu servi aux IA | Un article invisible pour ChatGPT et Claude |

Le quatrième mesure le **HTML généré** et non les sources, donc il couvre
Blog.jsx, PagesSeo.jsx, Quiz.jsx, Projets.jsx et AuditApp.jsx d'un seul coup.
Il a été posé le 21/09/2026 après qu'un audit a trouvé `/projets/` avec une
description de 156 caractères passée sans alerte pendant des semaines.

Puis :

```bash
npm test
```

---

## Phase 5 — Vérifier le rendu avant de publier

Lance le serveur, ouvre l'article, et exécute ce contrôle dans la console. Il
vérifie en une fois tout ce qui s'est déjà cassé par le passé :

```js
const H=document.body.scrollHeight, a=document.querySelector('aside.bg-brand-wash');
({
  h1: document.querySelectorAll('h1').length,                        // doit valoir 1
  canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
  prerenderRestant: document.querySelectorAll('[data-seo-prerender]').length,  // doit valoir 0
  nbH2: document.querySelectorAll('.prose-blog h2').length,
  sommaire: document.querySelectorAll('nav a[href^="#"]').length,
  faq: document.querySelectorAll('details').length,
  ctaMilieu: a ? Math.round((a.getBoundingClientRect().top+scrollY)/H*100)+'%' : 'ABSENT',
  sansSlash: [...document.querySelectorAll('a[href^="/"]')]
    .map(x=>x.getAttribute('href')).filter(h=>h!=='/' && !h.endsWith('/')),
})
```

Ce qu'on attend : **un seul h1**, canonical **avec** la barre finale,
`prerenderRestant` à zéro, `sansSlash` vide, et le CTA de milieu entre 30 et
45 %.

> **Pourquoi ces contrôles précis.** Le HTML servi peut être parfait et le DOM
> rendu cassé : c'est exactement le bug d'août 2026, où React réécrivait le
> canonical sans la barre finale après le chargement. Google lit le DOM rendu.
> Vérifier le fichier servi ne suffit pas.

---

## Phase 6 — Publier

```bash
git add -A && git commit && git push origin main
```

Le message de commit dit **l'angle et l'arbitrage**, pas la liste des fichiers.
Si la rédaction a révélé quelque chose, ou si un brief a été abandonné, ça se
met là.

Puis attends la fin du déploiement et vérifie en ligne :

```bash
for i in $(seq 1 40); do
  c=$(curl -sS -o /dev/null -w '%{http_code}' https://noecalmes.fr/blog/SLUG/)
  [ "$c" = "200" ] && { echo "en ligne"; break; }; sleep 10
done
curl -sS -o /dev/null -w 'sans barre: %{http_code} -> %{redirect_url}\n' https://noecalmes.fr/blog/SLUG
```

Attendu : **200** avec la barre, **301** vers la version avec barre sans elle.

---

## Phase 7 — Mettre à jour la file

Dans `idees-articles.md` : passer le brief à `✅ publié le JJ/MM/AAAA`.

Si la rédaction a appris quelque chose de réutilisable, l'écrire sous le brief
en citation. C'est ce qui empêche de refaire deux fois la même erreur, et c'est
la partie que tout le monde saute.

Une entrée dans `journal.md` seulement si le chantier a produit un arbitrage
réutilisable. Pas pour une publication de routine.

---

## Phase 8 — Terminer par la ligne d'indexation

**Un article n'est pas livré tant que cette ligne n'a pas été donnée.**

Le sitemap se met à jour tout seul et Google finira par passer, mais la demande
manuelle fait tomber le délai de plusieurs semaines à quelques jours. C'est la
dernière action, et c'est la seule que Noé doit faire lui-même.

La réponse se termine donc **toujours** par ce bloc, rempli :

```
Il te reste à indexer la page : https://noecalmes.fr/blog/SLUG/

Search Console → barre « Inspecter une URL » en haut → coller l'URL →
« Demander une indexation ».
```

Trois précisions à rappeler avec :

- **La barre finale fait partie de l'URL.** Sans elle, Search Console remonte
  « Erreur liée à des redirections ».
- **Ne pas renvoyer le sitemap.** Il s'est mis à jour seul.
- **Ne pas resoumettre une URL déjà indexée.** Le quota est journalier et
  limité. Search Console dit « L'URL est sur Google » avant même de cliquer.

---

## Le récapitulatif, en une page

| Phase | Action | Ce qui échoue si tu sautes |
|---|---|---|
| 0 | Lister les H2 et FAQ existants | Tu écris un concurrent interne |
| 1 | Confronter les chiffres au site | Le site se contredit |
| 2 | Écrire d'abord, vérifier ensuite | Deux heures perdues avant la première ligne |
| 3 | Calculer les liens entrants par script | Le build refuse, ou un article devient orphelin |
| 4 | `npm run build` et `npm test` | Une 404 ou une meta tronquée en production |
| 5 | Contrôler le DOM rendu | Le canonical cassé, invisible dans le HTML servi |
| 6 | Push et vérification en ligne | Tu annonces publié ce qui ne l'est pas |
| 7 | Mettre la file à jour | Le même brief est réécrit dans un mois |
| 8 | **Donner la ligne d'indexation** | L'article attend des semaines |
