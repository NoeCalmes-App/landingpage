# Outils et sources de la recherche

État consulté le 21 septembre 2026. Les documentations et certains fichiers source ont été examinés ; ces produits n'ont pas été installés ni évalués sur une app cliente pendant la création de ce kit. Revalider les capacités de la version choisie.

## Choix des outils

| Outil | Usage dans le workflow | Limite |
| --- | --- | --- |
| [Greenlight](https://github.com/RevylAI/greenlight) | Signaux statiques iOS/Android sur code, configuration et archives IPA/APK/AAB selon les scanners disponibles ; rapports intégrables à une CI. | Détection en partie par motifs. Le résultat ne démontre pas un parcours fonctionnel. |
| [fastlane precheck](https://docs.fastlane.tools/actions/precheck/) | Contrôle de certains problèmes dans les métadonnées App Store Connect, notamment URLs et textes. | Ne teste ni l'app ni la validité juridique des documents. |
| [Maestro iOS](https://docs.maestro.dev/get-started/supported-platform/ios) | Scénarios UI rejouables sur simulateur iOS. | Compléter par les tests physiques ; ne pas présenter ces exécutions comme une preuve iPhone réel. |
| [Maestro Android](https://docs.maestro.dev/get-started/supported-platform/android) | Scénarios UI sur émulateur ou appareil Android physique. | Adapter les dialogues, identifiants et préconditions à Android ; une réussite iOS ne valide pas Android. |
| [Contrôles Google Play](https://support.google.com/googleplay/android-developer/answer/14807773) | Pre-review checks dans la console, complétés par le [pre-launch report](https://support.google.com/googleplay/android-developer/answer/9842757). | Couverture partielle, accès console nécessaires, génération du rapport dépendante de la capacité disponible. |
| [App Store Review Skill](https://github.com/ElxMaj/app-store-review-skill) | Autre skill public pour audit et traitement des refus. | Cadre d'analyse par agent, pas validation officielle Apple. |
| [Forvibe](https://www.forvibe.app/features/review-simulation) | Le fournisseur annonce une comparaison code, captures, métadonnées et documents. | Couverture et score commerciaux non validés indépendamment ici ; vérifier les données envoyées aux fournisseurs IA. |

L'option Greenlight `verify` passe par Revyl avec un compte et un service distant. Son runtime iOS utilise un build `.app` pour simulateur, pas l'IPA de distribution. Ce module reste distinct d'un test physique. Le [code des règles](https://github.com/RevylAI/greenlight/blob/main/internal/codescan/rules.go) illustre pourquoi les résultats statiques doivent être qualifiés : un symbole évoquant une suppression peut suffire à désactiver une alerte, même si la fonctionnalité est inopérante.

## Intégration progressive proposée

1. Commencer avec l'agent, les builds/tests existants et l'audit navigateur du site. Les scans restent des aides facultatives.
2. Ajouter Greenlight avec une version fixée après examen de ses alertes sur un projet témoin. Ajouter precheck si les métadonnées et accès nécessaires sont disponibles.
3. Transformer les parcours critiques identifiés en tests XCTest/XCUITest ou Maestro ; conserver le passage sur appareil réel avant soumission.
4. Ajouter une CI dans le dépôt mobile après adaptation à sa stack, avec jobs iOS/Android distincts. Déclencher les contrôles pertinents après changement de SDK, permissions, authentification, paiements ou documents. Voir [les estimations de mise en place](planning.md).

Exemple de commande documentée, **à exécuter dans le dépôt de l'app après installation et vérification de la version**, avec l'IPA correspondant à la release :

```bash
greenlight preflight . --ipa /chemin/vers/candidat.ipa --format json --output greenlight-report.json --exit-code
```

Un code de sortie favorable porte uniquement sur ce scanner. L'échec d'un contrôle ou un élément absent doit rester visible dans le rapport global. Ne pas utiliser une sortie « GREENLIT » comme décision de soumission.

Pour Android, employer le scanner approprié à l'AAB/APK et à la version installée, puis conserver les contrôles de la [branche Google](google-play.md). `fastlane precheck` reste propre aux métadonnées Apple.

## Sources officielles à rafraîchir

- [App Review et erreurs fréquentes](https://developer.apple.com/app-store/review/)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Exigences de soumission à venir](https://developer.apple.com/news/upcoming-requirements/)
- [SDK tiers : privacy manifests et signatures](https://developer.apple.com/support/third-party-SDK-requirements/)
- [Déclarations App Privacy](https://developer.apple.com/app-store/app-privacy-details/)
- [Tracking et données personnelles](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- [Suppression de compte](https://developer.apple.com/support/offering-account-deletion-in-your-app/)
- [Abonnements](https://developer.apple.com/app-store/subscriptions/)

Les CGV commerciales, la licence d'utilisation et la politique de confidentialité ont des fonctions différentes. L'audit vérifie les incohérences et les exigences Apple applicables ; une recommandation d'outil ne constitue pas une validation juridique des textes du client.
