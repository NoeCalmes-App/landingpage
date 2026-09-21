# Extension Google Play — nouveaux comptes organisation

Sources consultées le 21 septembre 2026 ; les rafraîchir à chaque soumission. Appliquer les mêmes statuts et exigences de preuves que le workflow principal, avec une décision **Google Play distincte de la décision Apple**.

## Compte du client et accès production

Vérifier le type **organisation**, le propriétaire client, les autorisations accordées à Noé, l'identité juridique, l'adresse, le profil Google Payments et leur concordance avec Dun & Bradstreet. Vérifier D-U-N-S, documents demandés, coordonnées et statut réel des validations. Les exceptions D-U-N-S sont encadrées ; ne pas en supposer une. [Compte organisation](https://support.google.com/googleplay/android-developer/answer/13628312)

Contrôler la vérification du site de l'organisation et la propriété correspondante dans Search Console ; un site fonctionnel ne suffit pas à prouver cette validation. [Vérification du site](https://support.google.com/googleplay/android-developer/answer/13205715)

La règle **12 testeurs inscrits continuellement pendant 14 jours** concerne les comptes **personnels créés après le 13 novembre 2023**. Ne pas ajouter automatiquement ce délai au planning des comptes organisation. Lire néanmoins le tableau de bord et les exigences effectivement affichées pour le compte et l'app. Des tests de qualité restent nécessaires. [Périmètre officiel](https://support.google.com/googleplay/android-developer/answer/14151465)

## Candidat Android et SDK

Identifier package, versionCode, commit, empreinte AAB, variante release, signature et environnement backend. Auditer le manifeste fusionné et le contenu réellement embarqué : permissions ajoutées par les bibliothèques, composants exportés, configurations debug, dépendances natives et SDK transitifs. Tester une installation représentative de la distribution Play, pas seulement un lancement debug.

Relire les [seuils target API](https://support.google.com/googleplay/android-developer/answer/11926878) selon date, type d'app et appareils ciblés ; consigner le seuil applicable et toute dérogation observée dans la console. Ne pas réutiliser une valeur ancienne inscrite dans un projet.

Pour les bibliothèques natives, y compris celles apportées par Flutter, React Native ou un plugin, vérifier alignement et fonctionnement **16 KB** selon les [exigences actuelles](https://developer.android.com/guide/practices/page-sizes). Une dépendance déclarée compatible ne prouve pas que l'AAB distribué l'est. Adapter les contrôles aux SDK Android et à leurs versions ; ne pas recopier les conclusions obtenues sur iOS.

## Confidentialité, site et fiche Play

Confronter code, configuration SDK, parcours observés et politique de confidentialité au formulaire **Data safety** : collecte, partage, finalités, caractère obligatoire, chiffrement et suppression. Inclure les SDK tiers et documenter les différences entre plateformes. [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469)

Si l'app permet de créer un compte, y compris en dirigeant vers le web, vérifier un parcours de demande de suppression depuis l'app **et une ressource web utilisable sans réinstaller l'app**. Tester la demande, son traitement et les données concernées ; informer des conservations légitimes. La désactivation seule ne vaut pas suppression. [Exigences de suppression](https://support.google.com/googleplay/android-developer/answer/13327111)

Vérifier descriptions, captures Android, contact, audience, classification, publicités, monétisation et déclarations sectorielles applicables. Dans **App access / Sign-in details** selon le libellé de la console, préparer tous les rôles, instructions et moyens d'accès nécessaires, puis tester depuis une installation neuve ; traiter OTP, abonnement, géographie ou matériel requis. Conserver les secrets hors Git. [Préparer la review](https://support.google.com/googleplay/android-developer/answer/9859455)

## Tests et remise du dossier

Exécuter les parcours critiques sur Android : connexion, fonction principale, permissions refusées, suppression et achats lorsqu'applicables. Contrôler petits écrans, clavier, réseau dégradé et reprise de l'app.

Exploiter le **pre-launch report** pour les problèmes détectés pendant l'exploration automatisée ; documenter les écrans réellement atteints et les obstacles de connexion. Compléter ses lacunes par des tests ciblés. [Pre-launch report](https://support.google.com/googleplay/android-developer/answer/9842757)

Examiner séparément les **pre-review checks** de Play Console : corriger les blocages et vérifier les alertes. Même tous réussis, ces contrôles ne garantissent pas l'acceptation. [Pre-review checks](https://support.google.com/googleplay/android-developer/answer/14807773)

Livrer profil Android, matrice SDK/données, preuves, instructions App access et décision motivée. Distinguer temps de travail et attente externe : Google indique que certaines reviews peuvent prendre **jusqu'à sept jours, davantage exceptionnellement**, sans engagement de délai. La préparation du compte précède cette attente. [Publication et délais](https://support.google.com/googleplay/android-developer/answer/9859751)
