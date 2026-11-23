// TABLEAU DE BORD D'EXEMPLE (23 novembre 2026, version épurée).
//
// Ce que le client suivra une fois son application en ligne. Noé : « trop de
// couleurs, trop d'infos, de textes et d'icônes pour rien ». La page tient donc
// en trois choses : UN chiffre, UNE courbe, QUATRE tuiles. Une seule couleur ;
// le rouge n'apparaît que sur un chiffre qui baisse.
//
// TOUTES LES DONNÉES SONT FICTIVES. La mention « Données d'exemple » a été
// retirée de la page à la demande de Noé (23 novembre 2026) : c'est donc à
// l'endroit où la capture est montrée de dire que c'est un exemple. La courbe est dessinée à la main en SVG,
// à la largeur réelle de sa boîte.
import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { Monitor, Smartphone, Tablet } from 'lucide-react'
import './tableau-de-bord-exemple.css'

// Douze mois, du plus ancien au mois en cours. Revenus : ce qui revient au
// client, commission de la boutique déjà retirée.
const BOUTIQUES = [
  {
    id: 'ios',
    nom: 'App Store',
    revenus: [2100, 2600, 3200, 3900, 4700, 5600, 6600, 7700, 8900, 10100, 11000, 12200],
    abonnes: [1420, 1560],
    telechargements: [5200, 5900],
  },
  {
    id: 'android',
    nom: 'Google Play',
    revenus: [1100, 1350, 1650, 2000, 2400, 2850, 3350, 3900, 4500, 5100, 5650, 6250],
    abonnes: [760, 830],
    telechargements: [3900, 4400],
  },
]
// L'application, son propriétaire et le jour affiché : tout est fictif, et
// figé pour que la capture ne change pas d'un jour à l'autre.
const APPLICATION = 'Orbiqa'
const PERSONNE = { prenom: 'Guillaume' }
const JOUR = new Date(2025, 11, 18)
const ICONE = '/assets/images/app-icons/orbiqa.webp'

// Les trois écrans : toucher une icône montre la page à cette largeur.
const APPAREILS = [
  { id: 'ordinateur', nom: 'Ordinateur', icone: Monitor },
  { id: 'tablette', nom: 'Tablette', icone: Tablet },
  { id: 'telephone', nom: 'Téléphone', icone: Smartphone },
]
const FILTRES = [{ id: 'tout', nom: 'Tout' }, ...BOUTIQUES.map(({ id, nom }) => ({ id, nom }))]

const somme = liste => liste.reduce((total, v) => total + v, 0)

/** Les chiffres affichés pour le filtre choisi : une boutique, ou les deux réunies. */
function chiffresDe(filtre) {
  const choisies = BOUTIQUES.filter(b => filtre === 'tout' || b.id === filtre)
  const cumul = cle => choisies[0][cle].map((_, i) => somme(choisies.map(b => b[cle][i])))
  const revenus = cumul('revenus')
  return {
    revenus,
    tuiles: [
      // `court` : le mot qui tient dans une tuile étroite, sur téléphone.
      { titre: 'Abonnés actifs', court: 'Abonnés', valeurs: cumul('abonnes') },
      { titre: 'Téléchargements', court: 'Installations', valeurs: cumul('telechargements') },
      { titre: 'Sur 12 mois', court: 'Sur 12 mois', valeurs: [null, somme(revenus)], euros: true },
    ],
  }
}

const nombre = new Intl.NumberFormat('fr-FR')
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const virgule = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** Les douze derniers mois, le mois en cours en dernier. */
function moisDepuis(aujourdhui) {
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth() - (11 - i), 1)
    return {
      court: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
      long: d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    }
  })
}

/** La largeur réelle d'une boîte, suivie au redimensionnement. */
function useLargeur() {
  const ref = useRef(null)
  const [largeur, setLargeur] = useState(0)
  useEffect(() => {
    if (!ref.current) return undefined
    const observateur = new ResizeObserver(([e]) => setLargeur(Math.round(e.contentRect.width)))
    observateur.observe(ref.current)
    return () => observateur.disconnect()
  }, [])
  return [ref, largeur]
}

/** « +10,5 % » en vert, « −0,1 » en rouge : le signe dit le sens, la couleur le confirme. */
function Ecart({ avant, apres, enPoints = false }) {
  const ecart = enPoints ? apres - avant : ((apres - avant) / avant) * 100
  const monte = ecart >= 0
  const texte = `${monte ? '+' : '−'}${virgule.format(Math.abs(ecart))}${enPoints ? '' : ' %'}`
  return <span className={`tdb-ecart ${monte ? 'tdb-monte' : 'tdb-descend'}`}>{texte}</span>
}

/** Une courbe lisse qui passe par chaque point (Catmull-Rom, adoucie). */
function traceLisse(points) {
  const tension = 0.18
  return points.reduce((trace, [x, y], i) => {
    if (!i) return `M${x} ${y}`
    const avant = points[i - 2] || points[i - 1]
    const [px, py] = points[i - 1]
    const apres = points[i + 1] || points[i]
    const c1 = [px + (x - avant[0]) * tension, py + (y - avant[1]) * tension]
    const c2 = [x - (apres[0] - px) * tension, y - (apres[1] - py) * tension]
    return `${trace}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x} ${y}`
  }, '')
}

function Courbe({ mois, valeurs }) {
  const [ref, largeur] = useLargeur()
  const [survol, setSurvol] = useState(null)
  // Sur un écran étroit, la courbe est plus basse : tout doit tenir sans défiler.
  const hauteur = largeur && largeur < 420 ? 150 : 250
  const marge = { haut: 20, bas: 30, cotes: 10 }
  const n = valeurs.length
  const max = Math.max(...valeurs) * 1.08
  const zone = Math.max(0, largeur - 2 * marge.cotes)
  const x = i => marge.cotes + (i * zone) / (n - 1)
  const y = v => marge.haut + (1 - v / max) * (hauteur - marge.haut - marge.bas)
  const base = hauteur - marge.bas
  const points = valeurs.map((v, i) => [Number(x(i).toFixed(1)), Number(y(v).toFixed(1))])
  const trace = traceLisse(points)
  const pointe = survol ?? n - 1
  const auSurvol = event => {
    const boite = event.currentTarget.getBoundingClientRect()
    const position = event.clientX - boite.left - marge.cotes
    setSurvol(Math.min(n - 1, Math.max(0, Math.round((position / (zone || 1)) * (n - 1)))))
  }
  const aDroite = x(pointe) > largeur / 2
  return (
    <div className="tdb-courbe" ref={ref} onMouseMove={auSurvol} onMouseLeave={() => setSurvol(null)}>
      {largeur > 0 && (
        <svg width={largeur} height={hauteur} role="img" aria-label="Revenus par mois sur les douze derniers mois">
          <defs>
            <linearGradient id="tdb-fondu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--tdb-accent)" stopOpacity="0.28" />
              <stop offset="1" stopColor="var(--tdb-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map(part => (
            <line key={part} x1={marge.cotes} x2={largeur - marge.cotes} y1={marge.haut + part * (base - marge.haut)} y2={marge.haut + part * (base - marge.haut)} className="tdb-grille" />
          ))}
          <path d={`${trace}L${x(n - 1)} ${base}L${x(0)} ${base}Z`} fill="url(#tdb-fondu)" />
          <path d={trace} fill="none" stroke="var(--tdb-accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {survol !== null && <line x1={x(pointe)} x2={x(pointe)} y1={marge.haut} y2={base} className="tdb-repere" />}
          <circle cx={x(pointe)} cy={y(valeurs[pointe])} r="15" fill="var(--tdb-accent)" opacity="0.16" />
          <circle cx={x(pointe)} cy={y(valeurs[pointe])} r="8" fill="var(--tdb-accent)" stroke="var(--tdb-carte)" strokeWidth="3.5" />
          {[0, Math.floor((n - 1) / 2), n - 1].map(i => (
            <text key={i} x={x(i)} y={hauteur - 6} className="tdb-axe" textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}>{mois[i].court}</text>
          ))}
        </svg>
      )}
      {survol !== null && (
        <p className="tdb-bulle" style={aDroite ? { right: largeur - x(pointe) + 12 } : { left: x(pointe) + 12 }}>
          <span>{mois[pointe].long}</span>
          <strong>{euros.format(valeurs[pointe])}</strong>
        </p>
      )}
    </div>
  )
}

/** La part de chaque boutique dans les revenus du mois : un nom, une barre, un montant. */
function Repartition({ filtre, onChoisir }) {
  const dernier = BOUTIQUES.map(b => b.revenus[11])
  const max = Math.max(...dernier)
  return (
    <ul className="tdb-boutiques">
      {BOUTIQUES.map((b, i) => (
        <li key={b.id}>
          <button type="button" aria-pressed={filtre === b.id} onClick={() => onChoisir(filtre === b.id ? 'tout' : b.id)}>
            <span className="tdb-boutique-nom">{b.nom}</span>
            <span className="tdb-boutique-barre"><span style={{ width: `${(dernier[i] / max) * 100}%` }} /></span>
            <span className="tdb-boutique-montant">{euros.format(dernier[i])}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function TableauDeBordExemple() {
  const aujourdhui = JOUR
  const mois = useMemo(() => moisDepuis(JOUR), [])
  const [filtre, setFiltre] = useState('tout')
  const [appareil, setAppareil] = useState('ordinateur')
  const { revenus, tuiles } = chiffresDe(filtre)
  const date = aujourdhui.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    document.title = 'Tableau de bord · exemple'
    // Une page d'exemple n'a rien à faire dans Google.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    // Le fond du site est blanc : sans cela, il dépasse sous la page au défilement.
    const fondDuSite = document.body.style.background
    document.body.style.background = '#f3f4f7'
    return () => {
      meta.remove()
      document.body.style.background = fondDuSite
    }
  }, [])

  return (
    <main className="tdb">
      <div className="tdb-appareils" role="group" aria-label="Taille de l'écran">
        {APPAREILS.map(a => (
          <button key={a.id} type="button" title={a.nom} aria-label={a.nom} aria-pressed={appareil === a.id} onClick={() => setAppareil(a.id)}>
            {createElement(a.icone, { size: 20, 'aria-hidden': true })}
          </button>
        ))}
      </div>
      <div className="tdb-cadre" data-appareil={appareil}>
      <div className="tdb-page">
        <header className="tdb-tete">
          <div>
            <p className="tdb-date">{date.charAt(0).toUpperCase() + date.slice(1)}</p>
            <h1>Bonjour {PERSONNE.prenom}</h1>
          </div>
          <p className="tdb-date-courte">{aujourdhui.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </header>

        <section className="tdb-carte">
          <div className="tdb-carte-tete">
            <div className="tdb-app">
              <img className="tdb-app-icone" src={ICONE} alt="" width="52" height="52" />
              <div>
                <h2>{APPLICATION}</h2>
                <p>Revenus</p>
              </div>
            </div>
            <div className="tdb-filtre" role="group" aria-label="Boutique">
              {FILTRES.map(f => (
                <button key={f.id} type="button" aria-pressed={filtre === f.id} onClick={() => setFiltre(f.id)}>{f.nom}</button>
              ))}
            </div>
          </div>
          <p className="tdb-etiquette">Revenus du mois</p>
          <p className="tdb-chiffre">{euros.format(revenus[11])}</p>
          <p className="tdb-comparaison">
            <Ecart avant={revenus[10]} apres={revenus[11]} /> par rapport au mois dernier
          </p>
          <Courbe mois={mois} valeurs={revenus} />

          <Repartition filtre={filtre} onChoisir={setFiltre} />

          <ul className="tdb-tuiles">
            {tuiles.map(t => (
              <li key={t.titre}>
                <p className="tdb-tuile-titre">
                  <span className="tdb-long">{t.titre}</span>
                  <span className="tdb-court">{t.court}</span>
                </p>
                <p className="tdb-tuile-valeur">
                  {t.euros ? euros.format(t.valeurs[1]) : nombre.format(t.valeurs[1])}
                </p>
                {t.valeurs[0] !== null && <Ecart avant={t.valeurs[0]} apres={t.valeurs[1]} />}
              </li>
            ))}
          </ul>
        </section>

      </div>
      </div>
    </main>
  )
}
