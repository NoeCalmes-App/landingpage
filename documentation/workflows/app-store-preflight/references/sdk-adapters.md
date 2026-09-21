# Adaptateurs SDK pour l'audit iOS

Vérifié le 21 septembre 2026. Réouvrir les sources avant chaque audit : versions, contrats et exigences évoluent. Cette référence s'applique à chaque app cliente, y compris sa première soumission depuis un nouveau compte organisation. Elle ne remplace pas le contrôle du compte, du site et du dossier de review.

## Méthode commune — recommandation d'audit

1. Inventorier les dépendances directes et transitives dans `Package.resolved`, `Podfile.lock`, `Cartfile.resolved`, `pubspec.lock` et les lockfiles JavaScript selon la stack. Inclure les wrappers Flutter/React Native/Capacitor et leurs dépendances natives ; le nom du plugin seul ne suffit pas.
2. Réconcilier cet inventaire avec l'archive destinée à Apple : frameworks, extensions, bundles, manifests, `Info.plist`, entitlements et rapport de confidentialité Xcode. Certains SDK sont liés statiquement : l'absence de framework embarqué ne prouve pas leur absence. Conserver les écarts et limites de détection.
3. Pour chaque composant, relever fournisseur, version exacte, origine, fonction activée, paramètres de collecte, permissions, destinations réseau et documentation correspondant à cette version. Distinguer SDK présent, SDK initialisé et fonction réellement utilisée.
4. Comparer code, configuration et comportement de la build Release/TestFlight : premier lancement, acceptation, refus, révocation, déconnexion, suppression de compte et réseau dégradé. Un manifeste fourni par l'éditeur ne prouve pas à lui seul le comportement de l'app.
5. Produire une fiche par SDK : contrôle, nature de l'exigence, source datée, résultat, preuve expurgée et correction. Un SDK inconnu reste **à investiguer**, jamais validé automatiquement. Une exécution non observée reste **non testée**. Ces états empêchent un verdict global « prêt » dans ce workflow ; ce sont des critères internes d'audit.

## Confidentialité — règles Apple et vérification

**Apple :** les SDK figurant dans sa liste doivent fournir un manifeste de confidentialité pour une nouvelle app ; les dépendances binaires concernées doivent aussi porter une signature. Les SDK qui les réemballent sont inclus. Vérifier la liste actualisée, sans supposer que tous les SDK ont exactement les mêmes obligations. [Exigences SDK Apple](https://developer.apple.com/support/third-party-SDK-requirements/).

**Audit :** rapprocher les manifests de l'app et des SDK, les API nécessitant une justification, le rapport Xcode, la politique publique, les réglages de consentement et les réponses App Privacy. Identifier les données, finalités, destinataires, conservation, rattachement à l'utilisateur et éventuel tracking selon la configuration réelle. **Apple :** les déclarations App Privacy couvrent aussi les pratiques des partenaires et doivent rester exactes ; ne pas copier celles d'une autre app. [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/).

## Exemple : Mapbox Maps SDK iOS

- **Fournisseur :** le mot-symbole Mapbox doit rester visible sur les cartes utilisant ce SDK. L'attribution est requise sauf lorsque toutes les données viennent de sources non Mapbox. Contrôler aussi les autres fournisseurs de données. Vérifier lisibilité, superpositions et états plein écran. [Conditions Mapbox](https://docs.mapbox.com/ios/maps/guides/).
- **Fournisseur :** proposer le retrait individuel de la télémétrie Mapbox. Le contrôle d'attribution l'intègre normalement ; s'il est masqué, prévoir une alternative fonctionnelle. Tester l'action et sa persistance avec les API de la version installée. Cet opt-out ne remplace pas les autres consentements applicables. [Conditions Mapbox](https://docs.mapbox.com/ios/maps/guides/).
- **Configuration et audit :** une carte n'implique pas automatiquement l'utilisation de la position. Si celle-ci est utilisée, contrôler la justification `NSLocationWhenInUseUsageDescription`, le déclenchement pertinent et les modes exact/approximatif/refus/révocation. N'ajouter précision temporaire, accès permanent ou arrière-plan que pour une fonction identifiée. Vérifier les clés correspondant à la version et le comportement de ses fournisseurs de localisation. [Localisation Mapbox](https://docs.mapbox.com/ios/maps/guides/user-location/).
- **Audit fonctionnel :** tester gestes, marqueurs, recherche, recentrage, chargement des styles et erreurs réseau sur appareil. Tester le token public de production ; ne pas traiter sa présence prévue dans l'app comme une fuite de secret. Aucun token secret d'installation, secret serveur ou identifiant sensible dans l'archive, les captures ou le rapport. Vérifier l'initialisation avant affichage si le token est injecté à l'exécution. [Installation et tokens](https://docs.mapbox.com/ios/maps/guides/install/).
- **Audit confidentialité :** examiner séparément MapboxMaps, MapboxCommon, dépendances et wrapper éventuel ; rapprocher flux observés, documentation de collecte et déclarations de l'app. Ne pas déduire « aucune collecte » de l'absence de permission GPS.

## Routage des autres fonctions

Ces pistes déclenchent des audits spécialisés ; elles ne constituent pas une validation automatique du fournisseur.

| Détection | Contrôles à ouvrir |
|---|---|
| Firebase Auth, connexion sociale | Parcours d'accès reviewer, erreurs, suppression ; vérifier l'applicabilité de 4.8 et ses exceptions. |
| RevenueCat / StoreKit | Produits, droits après achat/restauration, échecs, abonnement ; vérifier les règles de paiement selon fonction et storefront. |
| Analytics, publicité, notifications | Collecte dès le lancement, consentements, refus ; vérifier ATT selon tracking réel, configuration push et comportement sans autorisation. |
| Contenu utilisateur | Signalement, blocage, modération et contact ; examiner 1.2. |
| Santé / HealthKit | Finalités, permissions, preuves des allégations et exigences spécialisées ; examiner 1.4 et 5.1.3. |
| IA tierce, même appelée par le backend | Données transmises, fournisseur, rétention, consentement et scénario de refus. |

**Apple, IA tierce :** lorsque des données personnelles sont partagées avec une IA tierce, expliquer ce partage et obtenir l'autorisation explicite avant l'envoi (5.1.2(i)). Une mention isolée dans les CGU ne démontre pas ce parcours. Référence commune aux règles citées : [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).
