# Meta Ads — bilan chiffré au 13 octobre 2026

> Les chiffres de la campagne « Acquisition — Audit + Formulaire », relevés dans le Gestionnaire de publicités le 13 octobre 2026, juste après sa suppression accidentelle. Ils vivent ici parce que Meta ne les affichera plus par défaut (voir « Où retrouver les chiffres chez Meta »). Positionnement : `documentation/context/positionnement.md`. Tunnel : `tunnel.md`. Formulaire et séquence WhatsApp : `prospection-meta-leads.md`.

## Ce qui s'est passé le 13 octobre 2026

Noé a supprimé deux des trois ensembles de la campagne « Acquisition — Audit + Formulaire » (compte Compte-pub-FR, `act=2194021857665806`, campagne `120245601547610350`) ; la campagne entière est passée en « Supprimé ». Meta ne restaure jamais une campagne supprimée : elle reste lisible (chiffres compris) mais ne peut plus diffuser.

Récupération faite le même jour : les trois publicités qui tournaient (« 4 », « 3 », « 5 ») ont été **dupliquées en brouillon** dans une nouvelle campagne du même nom, avec un nouvel ensemble « Projet — Formulaire Meta » copié à l'identique (voir « Ce que la copie contient »). Noé publie lui-même. Ce que la copie ne reprend pas : la phase d'apprentissage (repart de zéro, compter trois à cinq jours de coût par prospect plus haut), et les chiffres ci-dessous (ils restent sur la campagne supprimée). Les réactions et commentaires des publications d'origine sont conservés (case cochée à la duplication).

### Où retrouver les chiffres chez Meta

Les objets supprimés n'apparaissent qu'avec le filtre « Diffusion : Supprimé ». L'URL la plus fiable (les clics dans le menu Filtres sont capricieux) :

- Campagnes : `.../adsmanager/manage/campaigns?act=2194021857665806&business_id=1377742136443819&date=2025-01-01_2026-10-13%2Cmaximum&filter_set=CAMPAIGN_GROUP_DELIVERY_STATUS-STRING_SET%1EIN%1E[%22deleted%22]`
- Ensembles : même URL sur `/adsets` avec `filter_set=CAMPAIGN_DELIVERY_STATUS-...` et `&selected_campaign_ids=120245601547610350`
- Publicités : même URL sur `/ads` avec `filter_set=ADGROUP_DELIVERY_STATUS-...` ; ajouter `&selected_adset_ids=120252436446040350` pour l'ensemble Formulaire seul.

Un export CSV depuis cette vue (icône de téléchargement à droite de la barre d'outils) donne toutes les colonnes, clics compris.

## Les chiffres (du 1er janvier 2025 au 13 octobre 2026, « Maximum »)

### Campagne « Acquisition — Audit + Formulaire »

| | |
|---|---|
| Dépensé | 1 207,78 € |
| Prospects (toutes sources) | 107 |
| Coût par prospect | 11,29 € |
| Impressions | 91 593 |
| Couverture | 41 380 personnes |
| CPM (calculé) | 13,19 € |
| Répétition (calculée) | 2,2 |

### Ses quatre ensembles

| Ensemble | Depuis | Budget/jour | Dépensé | Prospects | Coût/prospect | Impressions | Couverture | CPM |
|---|---|---|---|---|---|---|---|---|
| **Projet — Formulaire Meta** (formulaire instantané) | 22 juin 2026 | 25 € | 455,79 € | 77 | **5,92 €** | 31 764 | 14 445 | 14,35 € |
| Projet - Audit (prospect site, `/audit-app`) | 22 juin 2026 | 20 € | 124,02 € | 7 | 17,72 € | 10 038 | 6 080 | 12,36 € |
| 2 mai broad (prospect site) | 2 mai 2026 | 25 € | 110,92 € | 1 | 110,92 € | 7 034 | 4 671 | 15,77 € |
| Broad (prospect site) | 19 mars 2026 | 20 € | 517,05 € | 22 | 23,50 € | 42 757 | 26 053 | 12,09 € |

Lecture : **le formulaire instantané fait un prospect quatre fois moins cher que le site** (5,92 € contre 17,72 € sur la même période, même cible). C'est lui qu'on garde ; les trois autres ensembles ne sont pas recréés.

455,79 € en 113 jours à 25 €/jour, c'est l'équivalent de 18 jours de diffusion : l'ensemble a surtout été en pause (envoi WhatsApp automatique coupé du 8 septembre au 7 octobre, entre autres). Les coûts par prospect ci-dessous sont donc des moyennes sur des périodes courtes, à relire après quinze jours de diffusion continue.

### Les publicités de l'ensemble Formulaire (25 €/jour)

| Pub | Dépensé | Prospects | Coût/prospect | Impressions | Couverture | CPM | Classement qualité |
|---|---|---|---|---|---|---|---|
| **4** (recréée) | 156,72 € | 28 | 5,60 € | 9 394 | 5 427 | 16,68 € | dans la moyenne |
| 1 | 100,46 € | 18 | 5,58 € | 9 152 | 5 547 | 10,98 € | — |
| **3** (recréée) | 60,03 € | 9 | 6,67 € | 4 007 | 2 713 | 14,98 € | dans la moyenne |
| 2 | 48,10 € | 7 | 6,87 € | 4 103 | 2 600 | 11,72 € | — |
| **5** (recréée) | 48,29 € | 6 | 8,05 € | 2 977 | 2 109 | 16,22 € | — |
| 3 pub | 42,19 € | 9 | 4,69 € | 2 131 | 1 426 | 19,80 € | — |
| 1 (seconde) | 0 € | 0 | — | — | — | — | jamais diffusée |

Les sept pubs ont **le même texte** ; seule la vidéo change. Texte principal : « Une idée d'application ? Je conçois et développe ton application de A à Z, pensée pour générer des revenus. Une de mes réalisations génère aujourd'hui 13 000 €/mois. Projets à partir de 5 000 €. » Titre : « De ton idée à une application rentable ». Description : « Projet confidentiel, protégé par contrat ». Bouton : « Obtenir un devis ».

À noter avant de choisir ce qu'on relance : « 1 » (18 prospects à 5,58 €, CPM le plus bas) et « 3 pub » (4,69 €) font aussi bien que « 4 » sur le coût. Elles sont restées dans la campagne supprimée, duplicables de la même façon si Noé veut les remettre.

### Les publicités « prospect site » (20 €/jour, ensembles Audit et Broad)

| Pub | Dépensé | Prospects | Coût/prospect | Impressions |
|---|---|---|---|---|
| 1 | 199,01 € | 5 | 39,80 € | 19 573 |
| #2 | 127,56 € | 6 | 21,26 € | 10 587 |
| 4 pub | 74,95 € | 6 | 12,49 € | 6 756 |
| 7 pub | 24,78 € | 0 | — | 1 817 |
| 6 pub | 21,80 € | 1 | 21,80 € | 1 318 |
| 5 | 18,77 € | 0 | — | 1 362 |
| 4 | 10,24 € | 0 | — | 736 |
| autres (3, 6, 2, 5 pub) | < 4 € chacune | 0 | — | — |

### Les autres campagnes supprimées du compte (pour mémoire)

Officiel Juin 2026 (181,72 €, 5 prospects à 36,34 €, arrêtée le 22 juin 2026), Campagne de app (58,94 €, arrêtée le 2 mai 2026), CBO COLORIPAJ #1 (64,25 €), et sans dépense notable : Lead Calendly – Copie, New campagne, Gulmly Campagne #1, Campagne CBO Coloripaj, Nouvelle campagne de Ventes. Total supprimé sur le compte : 1 512,69 € pour 118 079 impressions. Reste active (désactivée) : « Gumly 1 » (194,41 €, 2 achats), sans rapport avec l'acquisition de projets.

## Ce que la copie contient (brouillon du 13 octobre)

Relevé dans « Prévisualiser pour publier » : objectif Prospects, enchères, budget au niveau de l'ensemble ; lieu de conversion « Formulaires instantanés », page Noé Calmes - App ; **25 €/jour**, diffusion continue ; France, 25 ans et plus (suggestion Advantage+ 28-55), tous genres ; placements Facebook (fils, reels, stories, marketplace, recherche, notifications) et Instagram (fil, stories, explorer, reels, recherche) ; stratégie « Volume le plus élevé », objectif « Maximiser le nombre de prospects », attribution standard. Publicités : vidéo unique, formulaire **« Formulaire officiel 11 octobre »**, récupération automatique Google Sheets, canal de suivi WhatsApp (+33 6 58 30 82 10), améliorations Advantage+ (retouches vidéo, commentaires pertinents, effets) héritées de l'original, pubs multi-annonceurs activées. Les « recommandations » proposées à la duplication (vérification par SMS, discussion sur Messenger) ont été **refusées** pour rester à l'identique.

Un objet dupliqué depuis une campagne supprimée **hérite du statut « supprimé »** : l'erreur « Invalid campaign status ARCHIVED (#1487246) » disparaît en basculant l'interrupteur de l'objet sur activé dans le brouillon (fait sur la campagne ; l'ensemble et les pubs restent à faire par Noé avant de publier).

## Ce qu'il manque pour parler de ROAS

Meta ne voit que le prospect. Le retour sur dépense se calcule depuis Nowork : devis signés dont la fiche a pour provenance le formulaire Meta, montants HT, rapportés aux 1 207,78 € dépensés (ou aux 455,79 € de l'ensemble Formulaire seul). À faire la prochaine fois qu'on ouvre l'analyse : exporter les fiches par provenance, compter les appels tenus, les visios tenues, les devis envoyés, les signés. Sans ces quatre chiffres, le coût par prospect (5,92 €) ne dit rien : un prospect à 6 € qui ne décroche jamais coûte plus cher qu'un prospect à 18 € qui signe.

## Pistes retenues le 13 octobre (à tester, pas décidées)

1. **Formulaire en « Intention plus élevée »** plutôt que « Volume élevé » : un écran de relecture avant l'envoi, moins de prospects mais moins de rêveurs. À tester sur une copie du formulaire, en A/B, pas en remplaçant.
2. **Renvoyer la qualité des leads à Meta** (Conversion Leads depuis Nowork : appel tenu, devis envoyé, signé) pour que l'algorithme optimise sur les signatures et non sur les formulaires remplis. Chantier Nowork, à ouvrir dans `nowork/documentation/context/en-cours.md` quand on s'y met.
3. **L'ancre « à partir de 5 000 € »** attire des budgets « moins de 5 000 € » ; les deux paliers courants sont 5 000 à 8 000 € pour une première version et 8 000 à 12 000 € pour une application complète (`positionnement.md`, « Range tarifaire »). Tester une variante qui annonce la fourchette plutôt que le plancher.
4. **La preuve comme accroche** : « 13 000 €/mois » est déjà dans le texte mais en troisième phrase ; une variante qui ouvre dessus.
5. **Le second segment** (professionnels qui gèrent déjà leurs clients avec Excel ou WhatsApp) n'a aucune publicité ; une campagne à part, avec son propre texte, pas un ensemble de plus dans celle-ci.
6. Ne rien conclure sur les vidéos avant quinze jours de diffusion continue des trois pubs recréées : les écarts actuels (4,69 € à 8,05 €) tiennent sur 6 à 28 prospects chacune.
