# Première app sur le compte organisation du client

Recherche initiale : 21 septembre 2026. Reconsulter les sources avant utilisation. Ce profil est le cas habituel de Noé ; les faits de chaque client restent à vérifier.

## Deux contrôles distincts

**Inscription de l'organisation au programme Apple.** Apple vérifie l'entité juridique, l'autorité de l'Account Holder, le D-U-N-S selon le cas, les coordonnées professionnelles et un site public fonctionnel associé à l'organisation. Un profil social ou une page de domaine presque vide ne satisfait pas son exigence de site. [Inscription Apple](https://developer.apple.com/programs/enroll/)

**Review de l'app.** Le reviewer doit pouvoir comprendre l'activité et examiner le produit. Le personnel Apple conseille d'anticiper les accès, explications du modèle économique et justificatifs pertinents. Ces contrôles ne démontrent pas qu'une demande 2.1 provient du site ou du statut du compte. [Conseils de l'équipe App Review](https://developer.apple.com/forums/thread/837575)

Pour chaque client, contrôler le lien entre société, marque de l'app, domaine, contacts et droits sur les contenus. Une différence de noms peut être légitime : la documenter, sans imposer artificiellement des noms identiques. Le nom de développeur d'une organisation peut être une marque enregistrée ; Apple encadre son choix lors de la première app. [Nom du développeur](https://developer.apple.com/help/app-store-connect/create-an-app-record/set-your-developer-name)

Conserver le client comme propriétaire de son compte et tracer le rôle de l'agence. Ne pas créer d'identités de remplacement pour éviter une demande d'Apple. Une implémentation partagée entre clients ne dispense pas d'examiner la valeur et les contenus propres à chaque app ; si pertinent, examiner les règles actuelles 4.2.6 et 4.3 sur les apps issues de modèles et le spam. [Guidelines](https://developer.apple.com/app-store/review/guidelines/)

## Dossier préparé avant l'envoi

Convention de ce workflow : préparer les éléments suivants pour chaque première soumission, puis joindre ce qui est utile. Ce n'est pas une liste universelle de pièces obligatoires publiée par Apple.

1. Présentation factuelle de l'éditeur, de son activité, de l'app et du public visé ; modèle économique explicite, même pour une app entièrement gratuite.
2. Accès reviewer reproductible pour chaque rôle utile ; configuration et prérequis expliqués. Vérifier depuis une session neuve, avec le backend de la version soumise.
3. Démonstration vidéo sur appareil physique : lancement, accès, fonction principale et fonctionnalités difficiles à reproduire. Relever version/build, appareil et OS. Si Apple impose une vidéo ou des conditions précises, suivre sa demande exacte.
4. Liste réelle des appareils et versions testés. Ne pas confondre capture Simulator et capture sur iPhone ; ne pas inventer des tests iPad.
5. Inventaire compréhensible des services externes ; conditions géographiques, matériel nécessaire et restrictions d'accès.
6. Documents ou autorisations uniquement si pertinents : contenus tiers, marque, secteur réglementé. Masquer dans les rapports internes publics les données sensibles.
7. Cohérence finale entre app, site, visuels, confidentialité, paiements et notes Apple.

Les recommandations Apple couvrent aussi les tests physiques, l'identité vérifiable et les coordonnées à jour. [Équipe App Review](https://developer.apple.com/forums/thread/837575)

## Ce que disent les retours de première main

- [Fil Reddit avec le message « New App Submission »](https://www.reddit.com/r/iosdev/comments/1u70od4/need_advise_guideline_21_information_needed_new/) : demande de vidéo et d'informations de contexte ; certains participants rapportent une acceptation après réponse. Ce sont des expériences individuelles.
- [Fil Apple sur une demande liée à un historique limité](https://developer.apple.com/forums/thread/845179) : l'auteur cite cette justification et rapporte une attente après réponse. Il s'agit d'une app macOS ; cela ne prouve pas une règle générale iOS.
- [Fil Apple avec vidéo physique et réponses fournies](https://developer.apple.com/forums/thread/843105) : montre que le statut peut rester « Rejected » après réponse, sans permettre de déduire le délai du prochain dossier.

Ces témoignages ne démontrent ni que tous les nouveaux comptes sont refusés, ni que les comptes organisation sont exemptés, ni qu'une certaine ancienneté garantit l'acceptation. Ne pas promettre un taux de succès ou une durée d'examen à partir de ces fils.

## Traitement d'un message 2.1

Archiver le message exact avec version/build et date. Choisir l'action d'après son contenu :

- **Informations manquantes** : rédiger les réponses dans l'ordre demandé et joindre les preuves. Si Apple demande de répondre sans nouvelle soumission, suivre cette consigne.
- **Défaut reproductible** : corriger, retester et fournir un nouveau build si le binaire change.
- **Métadonnées erronées** : corriger les informations ; Apple permet, dans ce cas, de resoumettre le même build.
- **Désaccord étayé** : demander une clarification ou un échange ; préparer un appel argumenté si nécessaire.

Apple décrit les échanges et pièces jointes dans [Reply to App Review messages](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/reply-to-app-review-messages/). Les options de clarification, appel téléphonique et recours figurent dans les [conseils du personnel App Review](https://developer.apple.com/forums/thread/837575). Ne pas multiplier les resoumissions sans traiter le point signalé.
