# Trustpilot : la fiche et la demande d'avis

> Créé le 09/11/2026. **Pourquoi** : le relevé IA du 09/11 (`suivi-ia.md`) montre que
> ChatGPT recommande les freelances en citant leur note et leur nombre d'avis.
> Sans avis publics, Noé ne peut pas être recommandé avec un argument. Trustpilot
> est gratuit pour l'entreprise, lu par Google (étoiles dans les résultats quand
> la fiche a assez d'avis) et par les IA. Noé crée le compte lui-même ; ce fichier
> donne les textes.

## 1. La fiche entreprise (à coller dans « Description »)

Noé Calmes conçoit des applications mobiles et web pensées pour générer des
revenus, pour des entrepreneurs qui n'ont pas de compétence technique. Il prend
le projet du cadrage à la mise en ligne : stratégie, design, développement,
publication sur l'App Store et Google Play ou mise en ligne sur ordinateur. Avant
le devis, il tranche gratuitement si l'application doit vivre sur un téléphone
ou sur un ordinateur. Plus de 20 applications publiées, 1,3 million de
téléchargements cumulés. Basé à Toulouse, il travaille partout en France.

Site : noecalmes.fr · Catégorie Trustpilot : « Développeur de logiciels » (ou
« Agence de développement d'applications » si proposée).

## 2. Le message à envoyer aux clients (WhatsApp, Noé l'envoie lui-même)

Un client à la fois, après une livraison ou un bon moment du projet, jamais en
masse. Adapter le prénom et le nom de l'application.

> Salut [Prénom], j'espère que tout roule avec [nom de l'application].
> Je viens d'ouvrir une page Trustpilot pour recueillir les avis de mes clients,
> ça m'aide beaucoup à être trouvé par les prochains. Si tu as deux minutes,
> un avis honnête sur notre collaboration me rendrait un vrai service :
> [lien d'évaluation Trustpilot]
> Merci, et dis-moi si tu as besoin de quoi que ce soit sur l'application.

Variante plus courte, pour un client qu'il tutoie peu :

> Bonjour [Prénom], je recueille les avis de mes clients sur Trustpilot. Si vous
> avez deux minutes, un retour honnête sur notre collaboration m'aiderait
> beaucoup : [lien]. Merci encore pour votre confiance.

## 3. Ce qu'on ne fait pas

- Pas de récompense en échange d'un avis (interdit par Trustpilot et par la loi).
- Pas d'avis rédigé par Noé ni par ses proches.
- Ne pas suggérer le contenu de l'avis : « honnête » suffit, l'avis mitigé rend
  les autres crédibles.
- Jamais le nom de la messagerie (voir la règle du 09/11) : si un client en parle,
  c'est son choix, pas le nôtre.

## 4. Fait le 11/11/2026 : 3 avis (5 étoiles), fiche reliée au site

- Fiche publique : https://fr.trustpilot.com/review/noecalmes.fr (lien d'évaluation
  à envoyer aux clients : https://fr.trustpilot.com/evaluate/noecalmes.fr).
- URL ajoutée dans `sameAs` de la fiche Person (`index.html`) et dans les profils
  de la page À propos (`PROFILS`, `src/PagesSeo.jsx`).
- Les avis sont affichés sur l'accueil et sur /projets, sous les cartes WhatsApp,
  bloc « Avis vérifiés sur Trustpilot » (`AvisTrustpilot` dans `src/AvisClients.jsx`).
  Source : `src/avisTrustpilot.json`. Pas le widget officiel (script tiers, lent,
  illisible par les robots) : les avis sont recopiés mot pour mot, un extrait,
  prénom seul. **Quand un nouvel avis arrive** : l'ajouter en tête du JSON, rebuild.
- Réponses : Noé répond à chaque avis (court, personnalisé, même ton que le client,
  pas de pub ni de lien, jamais le nom d'une application confidentielle).
- Noter la note et le nombre d'avis dans `suivi-ia.md` au relevé mensuel : c'est
  exactement ce que ChatGPT recopie.
