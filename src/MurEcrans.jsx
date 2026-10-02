// Le mur d'écrans : mobile en haut, web en bas, deux rangées qui défilent en
// sens inverse. C'est la section qui porte le pivot « mobile ou web » sans
// phrase : le décalage de format entre les deux rangées suffit.
//
// ⚠️ CE QUI PEUT Y FIGURER, ET RIEN D'AUTRE. Les CGV (article 10.6) n'autorisent
// à montrer que les éléments déjà publics APRÈS mise en ligne : visuels de la
// fiche store ou du site public du client. Une maquette de projet non publié
// est confidentielle par contrat, même anonymisée à moitié. Avant d'ajouter
// un écran ici : soit c'est une application de Noé, soit il est déjà visible
// sur le store ou le site public du client, soit le client a dit oui par écrit.
//
// Les images sont servies en WebP à 400 px de large (téléphone) et 1120 px
// (web), chargées en différé : la section est sous la ligne de flottaison et
// ne doit rien coûter au premier affichage.

const DOSSIER = '/assets/images/ecrans/'

const ECRANS_MOBILE = [
  { src: 'smoothride-carte.webp', alt: 'SmoothRide, écran carte', w: 400, h: 897 },
  { src: 'bailora-accueil.webp', alt: 'Bailora, accueil', w: 400, h: 864 },
  { src: 'wakeup-1.webp', alt: 'Wake Up Alarme, réveil à missions', w: 400, h: 711 },
  { src: 'calorie.webp', alt: 'Calorie, suivi nutrition par IA', w: 400, h: 786 },
  { src: 'plouff-1.webp', alt: 'Plouff Habitudes, suivi d’habitudes', w: 400, h: 711 },
  { src: 'smoothride-comparatif.webp', alt: 'SmoothRide, comparatif', w: 400, h: 897 },
  { src: 'bailora-tableau-de-bord.webp', alt: 'Bailora, tableau de bord', w: 400, h: 864 },
  { src: 'wakeup-2.webp', alt: 'Wake Up Alarme, missions du matin', w: 400, h: 711 },
  { src: 'plouff-2.webp', alt: 'Plouff Habitudes, progression', w: 400, h: 711 },
  { src: 'smoothride-rapport.webp', alt: 'SmoothRide, rapport', w: 400, h: 897 },
  { src: 'bailora-loyers.webp', alt: 'Bailora, suivi des loyers', w: 400, h: 864 },
]

// Application web : l'audit de noecalmes.fr, conçu et développé par Noé.
const ECRANS_WEB = [
  { src: 'audit-accueil.webp', alt: 'Audit d’idée d’application, page d’accueil', w: 1120, h: 700 },
  { src: 'audit-type.webp', alt: 'Audit d’idée d’application, choix du type', w: 1120, h: 700 },
  { src: 'audit-idee.webp', alt: 'Audit d’idée d’application, description de l’idée', w: 1120, h: 700 },
  { src: 'audit-stade.webp', alt: 'Audit d’idée d’application, stade du projet', w: 1120, h: 700 },
]

function Rangee({ ecrans, format, inverse = false }) {
  // La piste est doublée pour que la boucle se referme sans à-coup : quand la
  // première moitié est sortie à gauche, la seconde est exactement à sa place.
  const piste = [...ecrans, ...ecrans]
  return (
    <div className={`mur-rangee ${format === 'web' ? 'mur-rangee-web' : 'mur-rangee-mobile'}`} aria-hidden={inverse ? undefined : undefined}>
      <div className={`mur-piste ${inverse ? 'mur-inverse' : ''}`}>
        {piste.map((e, i) => (
          <figure key={`${e.src}-${i}`} className={`mur-tuile ${format === 'web' ? 'mur-tuile-web' : 'mur-tuile-mobile'}`}>
            <img
              src={DOSSIER + e.src}
              alt={i < ecrans.length ? e.alt : ''}
              width={e.w}
              height={e.h}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function MurEcrans() {
  return (
    <section className="py-16 md:py-22 overflow-hidden" id="mobile-ou-web">
      <div className="px-5 max-w-230 mx-auto text-center mb-9 md:mb-12">
        <p className="reveal text-brand font-semibold text-[0.78rem] tracking-widest uppercase mb-3">
          Mobile, web, ou les deux
        </p>
        <h2 className="reveal font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight mb-4 leading-[1.15]">
          Mobile ou web ? <span className="text-brand">Je tranche avec toi, avant de coder.</span>
        </h2>
        <p className="reveal text-grey text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-150 mx-auto">
          Une app sur les stores quand tes utilisateurs vivent sur leur téléphone. Une application web quand ils travaillent sur un écran. Souvent les deux&nbsp;: l'app dans la poche de l'utilisateur, le pilotage sur ton écran.
        </p>
      </div>

      <Rangee ecrans={ECRANS_MOBILE} format="mobile" />
      <Rangee ecrans={ECRANS_WEB} format="web" inverse />

      <p className="px-5 text-center text-grey/60 text-[0.78rem] mt-7">
        Écrans d'applications que j'ai conçues, publiées sur les stores ou en ligne.
      </p>
    </section>
  )
}
