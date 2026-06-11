# Documentation — Landing Page

Cette documentation est organisee pour limiter les tokens : lire d'abord le fichier court qui correspond au sujet, puis ouvrir les docs longues seulement si necessaire.

## Sources de verite

- `architecture/landing-page.md` — routes publiques, maquettes, SEO, Calendly, chatbot.
- `architecture/audit-app.md` — funnel audit, questions, recap IA, backend Firebase, lecture admin par `devis-app`.
- `architecture/assets.md` — rangement des images, icones, fonts et PDF.
- `architecture/client-space-public.md` — architecture cible pour `/espace-client/...` sans `/app-devis` visible.
- `context/positionnement.md` — positionnement central de Noe, vocabulaire, promesse, preuve sociale.

## Strategie active

- `strategy/strategie-commerciale.md` — vente, prix, objections, qualification, logique d'appel. Revise le 12 juin 2026, aligne positionnement v2.
- `strategy/tunnel.md` — etat reel du tunnel d'acquisition : Instagram, LinkedIn, bio, posts epingles, trigger ManyChat unique, audit-app, Calendly/WhatsApp. Source de verite du funnel actuel.

Les anciennes strategies Instagram detaillees (flows ManyChat elabores) sont dans `archive/strategy/`.

## Archives / memoire

Les fichiers dans `archive/` sont des analyses et strategies historiques. Ils peuvent expliquer pourquoi certains choix ont ete faits, mais ne doivent pas remplacer les docs actives ni le code actuel. Notamment : `archive/funnels/` (anciennes hypotheses prix/CTA/capture email), `archive/strategy/` (strategies Instagram basees sur ManyChat, abandonne), `archive/sales/relance-no-show.md` (sequence de relance des no-show pubs Facebook, terminee), `archive/sales/script-appel-client.md` (script d'appel jamais utilise en pratique), `archive/content/stories-mes-apps-brief.md` (range tarifaire et tonalite obsoletes).

## Supports creatifs hors documentation

Les briefs de posts/stories sont dans `../content/`. Ce sont des supports de creation, pas des sources de verite produit.

## Funnel global

Instagram / LinkedIn / SEO -> landing page -> `/audit-app` -> verdict IA -> WhatsApp ou Calendly -> suivi dans `devis-app` CRM -> devis / cahier des charges / relances.
