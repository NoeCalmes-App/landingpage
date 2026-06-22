# Ancien funnel Calendly — retiré le 2026-06-22

> Statut : **archive / désactivé**. Le funnel décrit ici a été retiré de la landing le 22/06/2026. Source de vérité actuelle du tunnel : `documentation/strategy/tunnel.md` (funnel WhatsApp). Le positionnement n'a pas changé, seul le tunnel a changé.

> Objectif business inchangé : attirer des prospects via la landing / l'audit → les amener à **parler à Noé**. Avant, cette conversation passait (aussi) par un RDV Calendly. Maintenant elle passe **uniquement par WhatsApp**.

---

## Comment ça marchait avant

Deux portes de sortie coexistaient selon le CTA :

1. **CTA "projet mûr / envie de parler"** → bouton vers **Calendly** (appel 30 min).
2. **CTA "prix / doute / comparaison agence"** → `/audit-app` → verdict IA → **WhatsApp en principal**, avec un lien **Calendly secondaire** sous le verdict ("ou réserver un appel de 30 min").

Détail technique de l'intégration Calendly (tout retiré du code de la landing) :

- Page `/rendez-vous` → section `#calendly-section` de la home, contenant un **embed Calendly inline** (`calendly.com/noecalmes-app/appel-app-mobile`).
- Script `assets.calendly.com/external/widget.js` chargé à la volée (`loadCalendlyScript`), + `preconnect`/`dns-prefetch` Calendly dans `index.html`.
- Indicateur "1 place disponible ce mois-ci" au-dessus du widget.
- Écoute de l'événement `calendly.event_scheduled` → redirection vers `/merci` (signal de conversion envoyé à Meta).
- Suivi des leads dans l'outil CRM perso **Nowork**.

## Pourquoi on l'a retiré

- **No-shows massifs** : beaucoup de RDV Calendly non honorés → planning cassé, relances à répétition.
- **Formulaire pré-RDV trop long** : friction à l'entrée → abandons.
- **Tracking cassé** : l'event `Lead` (dataset Meta `952622783774477`) ne remontait plus (6 events en tout, rien depuis 12 jours au moment du retrait).
- **Trop de surfaces de conversion** (Calendly + WhatsApp + audit) → fragmentation du signal et du parcours.

## Ce qui remplace

**WhatsApp partout** (voir `documentation/strategy/tunnel.md`). Un seul canal : message pré-rempli → qualification en 3 messages dans le chat → appel/visio calé à la main uniquement pour les leads déjà qualifiés. WhatsApp est asynchrone → pas de no-show, et relance directe possible (on a le numéro).

## Si on veut réactiver Calendly un jour

Le code n'est pas perdu :

- Il reste dans l'**historique git** (commit antérieur au 22/06/2026).
- `CALENDLY_URL` est toujours défini dans `src/audit-app/config.js` (non utilisé).
- Le code dans l'outil CRM **Nowork** est **conservé** : seuls les abonnements liés sont à résilier, pas le code.

Éléments concrètement retirés de la landing (à restaurer pour réactiver) : l'embed `calendly-inline-widget` + le chargement du script dans `src/App.jsx`, les `preconnect` Calendly dans `index.html`, la règle CSS du badge dans `src/index.css`, et le CTA secondaire "réserver un appel" dans `src/audit-app/AuditAppVerdict.jsx`.

Éléments **désactivés mais conservés en commentaire** dans `src/App.jsx` (réactiver = décommenter) :

- la **route `/merci`** (résolution `if (path === '/merci') return 'merci'`). Le composant `src/Merci.jsx` reste intact ; seule la route est coupée, donc `/merci` n'est plus accessible.
- le **listener `calendly.event_scheduled`** qui basculait vers `/merci` après une réservation Calendly.

Libellés de CTA repassés en WhatsApp dans `src/App.jsx` et `src/Blog.jsx` : ce sont les **mêmes boutons** (ils appelaient déjà `onBookCall`/`scrollToCalendly`, désormais redirigés vers la section WhatsApp), seuls les textes ont changé. Schéma final : navbar/footer = "Écrire à Noé" (court) ; gros CTA (hero, sections, fin d'article, section contact) = "Écrire à Noé sur WhatsApp". Verbe "Écrire" choisi pour la faible friction (le geste réel sur WhatsApp), "WhatsApp" affiché seulement sur les gros CTA pour rassurer. Page `Politique de confidentialité` : "prise de rendez-vous" → "prise de contact" / "messagerie WhatsApp".
