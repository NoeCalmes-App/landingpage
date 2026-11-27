// APERÇU LOCAL SEULEMENT : « Ce que rapporte l'application d'un client » (bloc remis le 27/11/2026, Noé : « remets le
// bloc avec 18k du client, pour voir ce que ça donnerait, juste après j'enlève »).
//
// ⛔ CHIFFRES D'ESSAI, PAS CEUX D'UN CLIENT : 18 450 € sont les chiffres de l'ancien écran d'exemple (commit d5cfbaa,
// données fictives). Le site n'a ni la capture d'origine ni l'accord écrit d'un client. Montrés comme le résultat
// d'un client, ils tromperaient le visiteur. D'où le chargement par Accueil.jsx SEULEMENT EN LOCAL
// (`import.meta.env.DEV`) : le build de production ne contient ni ce fichier ni ses chiffres, et le texte servi aux
// robots (scripts/generate-routes.js, qui lit Accueil.jsx) ne le voit pas, puisqu'il vit dans ce fichier à part.
//
// POUR LE METTRE EN LIGNE : remplacer chaque nombre par celui de la capture RÉELLE du client, avec son accord écrit,
// puis l'importer normalement dans Accueil.jsx. Pour l'enlever : supprimer ce fichier et ses deux lignes dans
// Accueil.jsx (l'import et la balise). Les styles sont dans accueil.css (.at-resultat…).
//
// Pas de classe « reveal » ici : la page cherche ces classes à son ouverture, avant que ce bloc n'arrive, et il
// resterait invisible. COMME UNE IMAGE, SANS ANIMATION (Noé, 25/11/2026) : rien ne bouge, rien ne se sélectionne.
export default function ApercuResultat() {
  return (
    <section className="pt-0 pb-14 md:pb-28 px-5" id="resultat" aria-labelledby="at-resultat-titre">
      <h2 id="at-resultat-titre" className="font-jakarta text-text text-2xl md:text-[2.1rem] font-extrabold tracking-tight text-center mb-8 md:mb-14">
        Ce que rapporte<br className="sm:hidden" /> <span className="text-brand">l'application d'un client</span>
      </h2>
      <figure className="at-resultat" aria-labelledby="at-resultat-titre">
        <div className="at-resultat-carte" role="img" aria-label="Aperçu du tableau de bord d'une application, nom masqué. Revenus de décembre 2025 : 18 450 euros, en hausse de 10,8 % par rapport au mois dernier. App Store : 12 200 euros. Google Play : 6 250 euros. 2 390 abonnés, 10 300 installations, 118 700 euros sur 12 mois.">
          <div className="at-res-gauche">
            <p className="at-res-app"><i /><b>Nom masqué</b></p>
            <p className="at-res-label">Revenus du mois</p>
            <p className="at-res-montant">18&nbsp;450&nbsp;€</p>
            <p className="at-res-evol"><span>+10,8&nbsp;%</span> par rapport au mois dernier</p>
            <div className="at-res-courbe" aria-hidden="true">
              <svg viewBox="0 0 320 110" preserveAspectRatio="none" focusable="false">
                <defs>
                  <linearGradient id="at-res-fond" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#18a572" stopOpacity=".2" />
                    <stop offset="1" stopColor="#18a572" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 30H320M0 59H320M0 88H320" stroke="#eceaf3" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
                <path d="M8 96C96 82 190 50 302 13V110H8Z" fill="url(#at-res-fond)" />
                <path d="M8 96C96 82 190 50 302 13" stroke="#18a572" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
              </svg>
              <i className="at-res-point" />
              <span className="at-res-bulle"><small>Déc. 2025</small>18&nbsp;450&nbsp;€</span>
            </div>
            <p className="at-res-mois" aria-hidden="true"><span>Janv.</span><span>Juin</span><span>Déc.</span></p>
          </div>
          <div className="at-res-droite">
            <ul className="at-res-boutiques">
              <li><span>App Store</span><i><i style={{ '--part': 1 }} /></i><b>12&nbsp;200&nbsp;€</b></li>
              <li><span>Google Play</span><i><i style={{ '--part': 0.51 }} /></i><b>6&nbsp;250&nbsp;€</b></li>
            </ul>
            <ul className="at-res-cases">
              <li><span>Abonnés</span><b>2&nbsp;390</b><em>+9,6&nbsp;%</em></li>
              <li><span>Installations</span><b>10&nbsp;300</b><em>+13,2&nbsp;%</em></li>
              <li><span>Sur 12&nbsp;mois</span><b>118&nbsp;700&nbsp;€</b></li>
            </ul>
          </div>
        </div>
        <p className="at-resultat-note">Nom de l'application masqué à sa demande, pour éviter la concurrence.</p>
      </figure>
    </section>
  )
}
