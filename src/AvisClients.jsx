import './avis-clients.css'

// LES AVIS CLIENTS, source unique : l'accueil (sous « Parlons de ton projet ») et /projets les affichent tous les
// deux (Noé, 11/10/2026 : « mettre les avis de /projets avec le même visuel »). Chaque page pose son propre titre
// au-dessus ; ce composant donne les cartes et la note dessous.
//
// Trois messages WhatsApp réels (confirmé par Noé), ceux du surligné « Témoignages » de son Instagram, recadrés sur
// la conversation dans public/assets/images/avis/, le nom des clients masqué. N'ajouter que des messages réels,
// avec l'accord de la personne, son nom masqué. Ordre : l'idée devenue application (le visiteur s'y reconnaît),
// l'application d'agence qui ne rapportait pas (« pourquoi moi et pas une agence », dit par un client), puis les
// délais tenus. Ton neutre (ni « tu » ni « vous ») : /projets l'exige.
//
// Le titre de chaque carte est écrit ici, en JSX : scripts/generate-routes.js le lit pour le texte servi aux robots
// sur l'accueil. Les cartes n'ont pas la classe `reveal` : seul l'accueil anime ses sections, la page qui l'affiche
// l'enveloppe si elle veut l'animer. Styles et largeur des marges sur téléphone : src/avis-clients.css.
export function AvisClients() {
  return (
    <>
      <ul className="avis-liste text-left" aria-label="Messages de clients">
        <li className="avis-carte">
          <p className="avis-titre">D'une simple idée à une application qui tourne</p>
          <img className="avis-capture" src="/assets/images/avis/avis-idee.webp" width="511" height="434" loading="lazy" decoding="async"
            alt="Message WhatsApp d'un client : au départ, il n'avait qu'une idée en tête, rien de concret. Il remercie Noé d'avoir cadré le projet du début à la fin, en expliquant honnêtement les coûts et les délais." />
        </li>
        <li className="avis-carte">
          <p className="avis-titre">Une application qui existait, mais qui ne rapportait pas</p>
          <img className="avis-capture" src="/assets/images/avis/avis-agence.webp" width="502" height="610" loading="lazy" decoding="async"
            alt="Message WhatsApp d'un client : son application, développée par une agence, attirait des utilisateurs, mais peu prenaient un abonnement. Noé a identifié le problème et refait le paywall et l'onboarding : quelques semaines plus tard, l'application génère des revenus." />
        </li>
        <li className="avis-carte">
          <p className="avis-titre">Livré dans les délais, 100&nbsp;% satisfait</p>
          <img className="avis-capture" src="/assets/images/avis/avis-delais.webp" width="375" height="112" loading="lazy" decoding="async"
            alt="Message WhatsApp d'un client : l'application a été créée dans les délais annoncés, il est 100 % satisfait du résultat et recommandera Noé autour de lui." />
        </li>
      </ul>
      <p className="avis-note">Messages reçus sur WhatsApp, noms masqués.</p>
    </>
  )
}

export default AvisClients
