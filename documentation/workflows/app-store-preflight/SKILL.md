---
name: app-store-preflight
description: Auditer une app iOS et Android avant soumission à Apple et Google Play, avec son site, ses SDK, ses parcours réels et les dossiers des stores. Adapté aux premières soumissions sur les nouveaux comptes organisation des clients de Noé. Préparer un rapport avec preuves ou analyser une demande de review. Ne pas activer pour une simple modification de landing page.
---

# Audit avant soumission Apple et Google Play

Réduire les défauts évitables et préparer les informations des reviewers. Une demande d'informations ou un rejet reste possible ; aucun résultat de cet audit ne garantit une acceptation.

Ce dossier est portable : le copier intégralement dans le dépôt de l'app à examiner. Il ne contient pas de scanner autonome et n'installe aucun outil. Un agent exécute le workflow avec les outils disponibles et signale les contrôles impossibles.

Invocation utilisable sans installation globale :

> Lis `app-store-preflight/SKILL.md`, puis audite cette app et son site avant sa première soumission sur les nouveaux comptes organisation du client, pour Apple et Google Play. Identifie les SDK et les fonctionnalités avant de choisir les contrôles. Produis les preuves, les corrections prioritaires et les dossiers propres à chaque store. Distingue ce qui est testé de ce qui reste à vérifier.

## Choisir les branches nécessaires

Le nom historique du dossier est conservé. Le workflow couvre un tronc commun (produit, site, données, SDK, preuves) et deux branches distinctes. N'exécuter que les branches correspondant aux plateformes demandées. Les règles Apple citées ci-dessous ne sont pas des règles Google ; pour Android, lire [references/google-play.md](references/google-play.md). Pour chiffrer l'intégration ou un audit, lire [references/planning.md](references/planning.md).

## 1. Définir le périmètre et les preuves

Lire les instructions du dépôt. Identifier les cibles iOS/Android, le site associé et les éventuels dépôts backend/site. Un dépôt web seul ne permet pas de conclure sur une app mobile. Continuer l'audit des éléments disponibles et expliciter les accès manquants.

Créer le profil de cette app à partir de [assets/app-profile.yaml](assets/app-profile.yaml), en conservant les valeurs inconnues comme inconnues. Le cas habituel de Noé est un **nouveau compte organisation appartenant au client et une première soumission**. Le vérifier pour cette app ; ne pas le transformer en fait observé par défaut.

Noter commit, version/build, date, empreinte de l'archive si disponible, environnements backend, plateformes, langues et territoires. Les vérifications portent sur le candidat réellement destiné à Apple. Enregistrer toute différence entre une build de test, le simulateur et l'archive de distribution.

Rafraîchir les sources [Apple](https://developer.apple.com/app-store/review/guidelines/), les [exigences de soumission Apple](https://developer.apple.com/news/upcoming-requirements/) et les sources officielles de la [branche Google Play](references/google-play.md) à chaque release applicable. Ne pas figer les versions minimales de Xcode/iOS, les niveaux d'API Android, les règles de paiement ou les obligations territoriales dans une checklist perpétuelle. Consigner URL et date de consultation.

## 2. Découvrir les fonctionnalités et dépendances

Lire les manifests et lockfiles pertinents : Swift Package Manager, CocoaPods, Gradle, npm/Expo/React Native, Flutter ou autre stack détectée. Comparer avec les frameworks, bibliothèques, permissions, entitlements, manifests fusionnés Android et privacy manifests Apple effectivement embarqués. Inclure les dépendances transitives et les réglages de production. Dans une app multiplateforme, inventorier séparément les versions natives iOS et Android derrière chaque wrapper.

Construire une matrice `plateforme → fonctionnalité → SDK/version → données/permissions → écrans → service distant → contrôles applicables`. Distinguer SDK déclaré, intégré au build et réellement utilisé. Lire [references/sdk-adapters.md](references/sdk-adapters.md) pour Mapbox iOS et les autres familles ; chercher les équivalents officiels Android pour la version détectée. Pour un SDK inconnu, chercher la documentation officielle de sa version et créer les contrôles adaptés ; absence de contrôle prédéfini ne signifie pas conformité.

## 3. Auditer en parallèle les éléments indépendants

### Code et archive

Utiliser la chaîne de build et les contrôles déjà présents. Examiner la configuration de release, les permissions et leurs motifs, les entitlements, les SDK embarqués et les endpoints. Vérifier aussi les messages de validation de l'archive dans Xcode/App Store Connect pour iOS, et l'AAB signé ainsi que les contrôles Play Console pour Android, si accessibles.

Greenlight peut fournir des signaux supplémentaires ; voir [references/tools-and-sources.md](references/tools-and-sources.md). Confronter chaque alerte à la règle actuelle du store concerné et au comportement observé. Un nom de fonction, une capture ou un scan sans alerte ne prouve pas qu'un parcours fonctionne. Consigner outil/version, commande, résultat et limite ; ne pas déclarer un outil exécuté s'il n'est que recommandé.

### Site associé et documents

Contrôler dans un navigateur mobile les URLs de présentation, assistance, confidentialité et conditions réellement utilisées par l'app, App Store Connect et Play Console : contenu final, redirections, contact, identité et cohérence des fonctionnalités annoncées. Un HTTP 200 qui affiche une page vide, une erreur SPA ou un écran de connexion n'est pas une validation.

Si inscription, authentification ou suppression passent par le web, examiner tout le parcours et le retour vers l'app. Distinguer explicitement cette inscription utilisateur de l'inscription du client au programme Apple. Vérifier [les règles de suppression](https://developer.apple.com/support/offering-account-deletion-in-your-app/), y compris le cas d'une création de compte sur le web. Tester avec des comptes jetables dédiés.

Comparer les données observées avec la politique de confidentialité et les [déclarations App Privacy](https://developer.apple.com/app-store/app-privacy-details/). Distinguer confidentialité, CGU/EULA et CGV selon le modèle commercial. La présence d'une page nommée « CGV » ne valide ni sa pertinence ni son contenu. Vérifier quelle [licence Apple ou personnalisée](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement/) s'applique. Signaler séparément les questions juridiques qui demandent une validation du client, sans inventer de conformité juridique.

Pour Google Play, effectuer une vérification distincte de Data safety et des exigences de suppression, dont le lien web externe lorsqu'il est requis. Ne pas recopier automatiquement les réponses App Privacy : définitions, SDK, permissions et comportements peuvent différer entre les builds. Voir [la branche Google](references/google-play.md).

### Parcours et visuel

Établir les scénarios selon les fonctionnalités découvertes : première ouverture, rôle visiteur, inscription/connexion, fonctionnalité principale, refus d'une permission, réseau dégradé, retour arrière et erreurs. Ajouter selon le cas achats/restauration, suppression, signalement/blocage, notifications, deep links et matériel externe.

Automatiser les parcours appropriés avec les outils déjà disponibles : XCTest/XCUITest pour iOS, Espresso/UI Automator pour Android, ou Maestro selon sa compatibilité. Réutiliser les intentions des scénarios entre plateformes, puis adapter les sélecteurs et dialogues natifs. Vérifier sur appareil physique les parcours critiques et les fonctionnalités que le simulateur/émulateur ne représente pas fidèlement. Contrôler les plateformes réellement supportées, les petits écrans, le clavier et la lisibilité ; comparer les captures marketing au candidat testé. Chaque scénario garde son appareil/OS, ses préconditions et une preuve du résultat.

Ne pas confondre « bouton présent » et « effet obtenu » : vérifier l'état backend ou la persistance quand c'est nécessaire. Une suppression asynchrone peut être valable ; vérifier son déclenchement, son information utilisateur et son aboutissement attendu.

## 4. Préparer la première soumission du client

Pour Apple, lire [references/first-submission.md](references/first-submission.md) et compléter les notes à partir de [assets/review-notes.md](assets/review-notes.md), avec des faits vérifiés. Préparer une vidéo de la version courante sur appareil réel et une liste exacte des appareils testés. C'est une mesure de préparation de ce workflow, pas une obligation vidéo universelle énoncée par Apple pour toute première app. Pour Google, préparer les champs App access, App content et Data safety selon [references/google-play.md](references/google-play.md), et les justificatifs/vidéos exigés par les fonctions applicables.

Tester les accès de démo depuis une session neuve, avec les rôles nécessaires, des données représentatives, les éventuels codes ou étapes de préparation et les achats testables. Garder le backend accessible pendant la review. Les notes, les informations business, les captures et l'app doivent raconter la même chose.

Les identifiants de review se transmettent dans les champs prévus d'App Store Connect ou Play Console. Les clés privées, clés de signature, tokens et mots de passe ne vont ni dans Git ni dans les rapports. Le skill produit les dossiers ; une demande d'audit seule n'autorise pas leur envoi, la soumission ou une modification des comptes développeur. Si le contexte autorise déjà ces actions, respecter cette autorisation sans redemander.

## 5. Livrer une décision fondée sur les preuves

Produire dans un dossier de travail convenu : profil complété, matrice SDK, rapport d'audit, notes Apple, index des preuves et scénarios rejouables. Conserver les captures/vidéos et exports sensibles dans un emplacement privé, pas dans les assets publics du site.

Pour chaque constat, noter : sévérité, plateforme/store, périmètre, source actuelle, preuve ou manque de preuve, reproduction, correction et contrôle à rejouer. Distinguer **règle Apple**, **règle Google**, **obligation fournisseur**, **recommandation qualité** et **hypothèse à confirmer**.

Statuts des contrôles : `PASS` observé avec preuve ; `FAIL` défaut constaté ; `UNKNOWN` non vérifié/inaccessible ; `N/A` non applicable avec justification. Ne jamais transformer `UNKNOWN` en `PASS` ni calculer une prétendue probabilité d'acceptation.

Décision interne :

- **BLOQUÉ** : défaut confirmé empêchant une review complète ou non-conformité applicable non résolue.
- **INCOMPLET** : aucune conclusion globale possible, notamment sans build représentative, parcours critiques testés, accès reviewer ou éléments App Store Connect nécessaires.
- **PRÊT POUR SOUMISSION** : contrôles applicables réalisés, éléments requis réunis et aucun blocage connu. Cela ne prédit pas la décision du store.

Un blocage confirmé prime : choisir **BLOQUÉ** même si l'audit contient aussi des contrôles `UNKNOWN`, et les lister. Employer **INCOMPLET** lorsqu'aucun blocage n'est confirmé mais que les preuves nécessaires manquent.

Émettre une décision par store. Si les deux sont demandés, le bilan commun n'est prêt que lorsque les deux branches le sont ; un blocage propre à Google ne devient pas artificiellement un défaut Apple.

Si les corrections sont demandées, traiter les défauts prouvés puis rejouer les vérifications concernées. Ne pas modifier le produit uniquement pour faire taire un scanner.

## Si Apple répond « 2.1 — Information Needed »

Lire le message intégral et le contexte de soumission. Séparer demande d'informations, défaut réel et désaccord d'interprétation. Préparer une réponse point par point, appuyée sur la version concernée et les preuves. Suivre la consigne Apple sur réponse, métadonnées ou nouveau binaire ; ne pas resoumettre aveuglément. Voir le protocole dans [references/first-submission.md](references/first-submission.md).

Pour Google, conserver le message exact, la règle citée, le package et le versionCode concernés. Distinguer rejet, retrait et suspension, puis suivre la procédure officielle correspondante. Ne pas transposer le code Apple 2.1 à Google.
