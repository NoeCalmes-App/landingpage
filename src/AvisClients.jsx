// LES AVIS CLIENTS, source unique : l'accueil (sous « Parlons de ton projet ») et /projets les affichent tous les
// deux, à l'identique (Noé, 11/10/2026 : « je veux la même partie que dans projets, c'est plus propre »). Chaque page
// pose son propre titre au-dessus (« Ce que disent mes clients », les mots de Noé ; « Ce qu'en disent… », essayé le
// même jour, « c'est pas français ») ; ce composant donne les trois cartes et la note.
//
// Les cartes sont les visuels de /projets d'avant le 11/10/2026, faits par Noé pour le surligné « Témoignages » de son
// Instagram : un titre en capitales avec des mots en violet, la conversation WhatsApp réelle, sur papier quadrillé.
// Sur téléphone, l'une sous l'autre ; sur ordinateur (1024 px et plus), côte à côte, celles des bords légèrement
// penchées, droites au survol. Un essai du 11/10/2026 (cartes recadrées sur la conversation, titre écrit en texte,
// rangée qu'on fait glisser) a été refusé : « c'est plus propre » comme ici.
//
// Sur temoignage-idee.webp, la phrase du bas de la story, « Merci pour vos retours ! », est effacée (Noé, 11/10/2026 :
// sur le site, elle s'adressait aux clients, pas au visiteur). Puis la première et la troisième image ont été
// raccourcies (Noé : « l'image n'est pas si longue ») : le bas vide est coupé, il reste sous la conversation la même
// marge qu'au-dessus du titre (85 px sur 640). D'où trois hauteurs (831, 901 et 719 px) : sur ordinateur, les cartes
// sont centrées en hauteur, la plus haute au milieu.
//
// NOMS MASQUÉS : le 11/10/2026, le nom du client a été recouvert d'une barre noire sur temoignage-refonte.webp et
// temoignage-delais.webp (il était lisible sur /projets) ; sur temoignage-idee.webp, Noé l'avait déjà effacé. Images
// dans public/assets/images/avis/ (les anciennes adresses, sous projets/, n'existent plus). N'ajouter que des
// messages réels, avec l'accord de la personne, son nom masqué. Ordre : l'idée devenue application (le visiteur s'y
// reconnaît), l'application d'agence qui ne rapportait pas (« pourquoi moi et pas une agence », dit par un client),
// puis les délais tenus. Ton neutre (ni « tu » ni « vous ») : /projets l'exige.
//
// Le titre de chaque carte est dans l'image : le texte `alt` le reprend, pour les lecteurs d'écran et pour Google, et
// scripts/generate-routes.js le lit pour le texte servi aux robots de l'accueil (un `alt` par image, entre guillemets
// doubles). Sous les cartes, une note courte (« Noms masqués par discrétion. », raccourcie le 11/10/2026 à la demande
// de Noé) : elle explique les barres noires, et rassure celui qui a peur qu'on dévoile son idée. Pas de classe
// `reveal` ici : seul l'accueil anime ses sections, il enveloppe le composant.
import avisTrustpilot from './avisTrustpilot.json'

// AVIS TRUSTPILOT (11/11/2026) : AU-DESSUS des cartes WhatsApp (Noé, 11/11 : « avant les WhatsApp »), sans titre
// « Avis vérifiés sur Trustpilot » (Noé : le lien « Lire les avis sur Trustpilot » suffit, il ouvre la fiche) ; les avis publiés par les clients sur Trustpilot, en texte,
// pas via le widget officiel (un script tiers de plus ralentirait la page, et les robots ne lisent pas son contenu).
// Source unique : src/avisTrustpilot.json (prénom, rôle affiché sous l'avis à la place de la date, Noé 11/11 ; date gardée pour l'ordre ; titre, extrait, URL de la fiche) ; scripts/generate-routes.js
// le lit pour le texte servi aux robots. Règles : seulement des avis réellement publiés sur Trustpilot, recopiés
// mot pour mot (un extrait, pas forcément tout), prénom seul, jamais le nom d'une application confidentielle. Quand un
// nouvel avis arrive, l'ajouter en tête du tableau. Le lien « Lire les avis sur Trustpilot » prouve que c'est vérifiable.
function EtoilesTrustpilot() {
  return (
    <span className="inline-flex gap-[2px]" aria-label="5 étoiles sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="inline-flex items-center justify-center w-[18px] h-[18px] bg-[#00B67A]" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="#fff"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 6 21l1.3-6.8-5-4.7 6.8-.8z"/></svg>
        </span>
      ))}
    </span>
  )
}

export function AvisTrustpilot() {
  return (
    <div className="mb-10 lg:mb-14">
      <ul className="grid gap-4 md:grid-cols-3 text-left" aria-label="Avis publiés sur Trustpilot">
        {avisTrustpilot.avis.map((a) => (
          <li key={a.prenom + a.date} className="flex flex-col gap-3 rounded-[18px] border border-card-border bg-surface p-5 shadow-[0_10px_36px_rgba(102,93,255,0.08)]">
            <EtoilesTrustpilot />
            <p className="font-jakarta text-text font-bold text-[0.95rem] leading-snug m-0">{a.titre}</p>
            <p className="text-grey text-[0.88rem] leading-relaxed m-0">« {a.extrait} »</p>
            <p className="text-grey text-[0.78rem] m-0 mt-auto pt-1"><strong className="text-text font-semibold">{a.prenom}</strong> · {a.role}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-center">
        <a href={avisTrustpilot.url} target="_blank" rel="noopener noreferrer" className="inline-block font-semibold text-text underline underline-offset-4 decoration-text/30 hover:decoration-text text-[0.9rem]">
          Lire les avis sur Trustpilot
        </a>
      </p>
    </div>
  )
}

export function AvisClients() {
  return (
    <>
      <AvisTrustpilot />
      {/* Sous le lien Trustpilot, les conversations WhatsApp, annoncées par « D'autres témoignages clients » (Noé, 11/11/2026). */}
      <p className="font-jakarta text-text font-bold text-[1.05rem] text-center mb-6">D'autres témoignages clients</p>
      <ul className="flex flex-col lg:flex-row items-center justify-center gap-6" aria-label="Messages de clients">
        <li className="w-full max-w-[330px] lg:max-w-[300px]">
          <img src="/assets/images/avis/temoignage-idee.webp" width="640" height="831" loading="lazy" decoding="async"
            className="block w-full h-auto rounded-[18px] border border-card-border shadow-[0_10px_36px_rgba(102,93,255,0.14)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 lg:-rotate-2"
            alt="D'une simple idée à une app qui tourne. Message WhatsApp d'un client : au départ, il n'avait qu'une idée en tête, rien de concret ; il remercie Noé d'avoir cadré le projet du début à la fin en expliquant honnêtement les coûts et les délais." />
        </li>
        <li className="w-full max-w-[330px] lg:max-w-[300px]">
          <img src="/assets/images/avis/temoignage-refonte.webp" width="640" height="901" loading="lazy" decoding="async"
            className="block w-full h-auto rounded-[18px] border border-card-border shadow-[0_10px_36px_rgba(102,93,255,0.14)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
            alt="Une app qui existait, mais qui ne rapportait pas. Message WhatsApp d'un client : son application, développée par une agence, attirait des utilisateurs mais peu prenaient un abonnement ; Noé a identifié le problème, refait le paywall et l'onboarding, et quelques semaines plus tard l'application génère des revenus." />
        </li>
        <li className="w-full max-w-[330px] lg:max-w-[300px]">
          <img src="/assets/images/avis/temoignage-delais.webp" width="640" height="719" loading="lazy" decoding="async"
            className="block w-full h-auto rounded-[18px] border border-card-border shadow-[0_10px_36px_rgba(102,93,255,0.14)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 lg:rotate-2"
            alt="Livré dans les délais, 100 % satisfait. Message WhatsApp d'un client : l'application a été créée dans les délais annoncés, il est 100 % satisfait du résultat et recommandera Noé autour de lui." />
        </li>
      </ul>
      <p className="mt-6 lg:mt-9 text-center text-grey text-[0.8rem]">Noms masqués par discrétion.</p>
    </>
  )
}

export default AvisClients
