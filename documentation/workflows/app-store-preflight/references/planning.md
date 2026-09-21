# Temps de mise en place et d'utilisation

Estimations de planification, pas des mesures effectuées sur une app cliente ni des engagements de délai. Recalibrer après un premier pilote. Une journée représente environ 7 heures de travail effectif.

Le kit actuel contient les instructions et modèles. Il ne contient pas encore les accès clients, scénarios propres aux apps, installations de scanners ou jobs CI. Les durées ci-dessous concernent ce raccordement et les audits réalisés ensuite.

## Mise en place commune

| Niveau | Estimation de travail | Conditions |
| --- | --- | --- |
| Premier pilote Apple + Google exploitable | 1 à 2 jours | Dépôt accessible, builds déjà fonctionnelles, un environnement de test, comptes stores accessibles, un iPhone et un Android disponibles. Brancher les outils utiles, adapter les parcours critiques et produire le premier rapport. |
| Base automatisée réutilisable sur plusieurs projets | 3 à 5 jours au total | Même famille de stacks ; inclut le pilote, une CI, gestion des secrets, preuves et essai sur un second projet. À re-chiffrer si stacks et infrastructures très différentes. |

Ces durées ne comprennent pas la correction d'apps inachevées, la refonte de documents juridiques ou l'attente d'informations clients. Une intégration d'un SDK inconnu, une authentification complexe ou un build cassé peut devenir un chantier indépendant.

## Audit d'une app avec le système prêt

| Cas | Temps de travail indicatif, deux stores |
| --- | --- |
| App simple et stable, documents et accès disponibles | 2 à 4 heures |
| Comptes, carte/localisation, abonnements, plusieurs rôles ou SDK à qualifier | 1 à 2 jours |
| Santé, finance, enfants, matériel ou autres contraintes spécialisées | Chiffrage après inventaire ; ne pas plafonner au cas précédent |
| Nouvelle vérification après une petite correction, scénarios déjà automatisés | 30 à 60 minutes de contrôle ciblé ; nouveau cadrage si données, SDK, auth ou paiements changent |

Le temps machine est distinct : builds et tests peuvent tourner en parallèle, attendre une machine ou échouer. Un scan de code de quelques minutes n'est pas l'audit complet. Mesurer ces durées sur le projet pilote au lieu de promettre un temps identique pour toutes les apps.

## Délais externes à prévoir à part

- Création et vérification des comptes organisation, éventuel D-U-N-S, informations et validations du client : attendre les statuts réels, sans les inclure dans le temps d'audit.
- Google annonce jusqu'à 15 minutes pour ses **pre-review checks**, qui ne couvrent pas toute la review. [Documentation Google](https://support.google.com/googleplay/android-developer/answer/14807773?hl=en)
- Le **pre-launch report** Google arrive généralement sous une heure, parfois plusieurs ; sa génération dépend de la capacité du laboratoire. Ce n'est pas un délai de décision de publication. [Documentation Google](https://support.google.com/googleplay/android-developer/answer/9842757?hl=en)
- Google indique des reviews pouvant aller jusqu'à sept jours, davantage dans certains cas. [Publication Google Play](https://support.google.com/googleplay/android-developer/answer/9859751?hl=en)
- Apple examine séparément l'app et peut demander des informations. Pour les nouveaux comptes clients, ne pas transformer une moyenne générale en date promise. [App Review](https://developer.apple.com/app-store/review/)

Pour un calendrier commercial, prévoir une marge explicite pour les stores et au moins un aller-retour éventuel. Cette marge est un choix de planning, pas une garantie d'acceptation à son terme. La règle Google des 12 testeurs/14 jours concerne les nouveaux comptes personnels visés par sa politique ; vérifier le type de compte et la console avant de l'ajouter au calendrier d'une organisation. [Politique de test](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
