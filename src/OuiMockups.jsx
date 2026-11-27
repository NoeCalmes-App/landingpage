import { CalendarDays, Camera, Check, Gift, Heart, Images, LayoutGrid, Plus, Settings, Users, Wallet, X } from 'lucide-react'
import './oui-mockups.css'
import StatusBarIcons from './StatusBarIcons'

// ============================================================
// OUI, MAQUETTE VITRINE (27 novembre 2026)
// L'app du mariage. Les mariés paient une fois ; leurs invités ont
// l'app : le programme, répondre, choisir le menu, la cagnotte, les
// photos. Les mariés remplissent le plan de table et voient les
// réponses tomber. Marque inventée, aucun devis derrière : deux écrans
// pour le carrousel « Mes réalisations » du site (ExemplesMetier.jsx).
// Même famille que Portier (PortierMockups.jsx) : fond clair, bloc
// sombre pour la décision, une couleur vive, encoche, traits fins.
// ============================================================

const PHOTO = {
  couple: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?w=900&q=80',
  chateau: 'https://images.unsplash.com/photo-1588571088301-67a44e3d7ab7?w=300&q=80',
}
const FACE = { camille: 'https://i.pravatar.cc/160?img=47' }

// Camille & Hugo, samedi 20 juin 2026, château de Reignac. J-23.
// 105 invités : 84 oui, 12 non, 9 sans réponse ; 96 placés.
const TABLES = [
  { name: 'Honneur', x: 350, y: 120, honneur: true, seats: ['C&H', 'JM', 'AM', 'PD', 'SD', 'LR', 'TR', 'MG'] },
  { name: 'Provence', x: 150, y: 300, seats: ['LM', 'MM', 'JB', 'EB', 'SV', 'KV', 'AL', '', 'NP', 'OP'] },
  { name: 'Lavande', x: 350, y: 300, seats: ['CR', 'PR', 'MD', 'JD', 'AF', 'LF', 'TG', 'EG', 'HB', 'IB'] },
  { name: 'Olivier', x: 550, y: 300, seats: ['RS', 'MS', 'AT', 'BT', '', '', 'CL', 'DL'] },
  { name: 'Garrigue', x: 150, y: 490, seats: ['GP', 'FP', 'VR', 'WR', 'XM', 'YM', '', ''] },
  { name: 'Tilleul', x: 350, y: 490, seats: ['ZK', 'AK', 'BN', 'CN', 'DO', 'EO', 'FQ', 'GQ', 'HS', 'IS'] },
  { name: 'Cyprès', x: 550, y: 490, seats: ['JT', 'KT', 'LU', 'MU', 'NV', 'OV', '', '', '', ''] },
]
// Les invités que les mariés placent en ce moment : Léa Martin et son
// +1 sont sur le point d'aller à la table Provence.
const NEXT = { table: 'Provence', seats: [7] }

function Table({ t }) {
  const n = t.seats.length
  if (t.honneur) {
    const w = 330
    return (
      <g>
        {t.seats.map((s, i) => {
          const x = t.x - w / 2 + (w / n) * (i + 0.5)
          return <g key={i}><circle className="ou-seat" cx={x} cy={t.y + 44} r={13} /><text className="ou-seat-text" x={x} y={t.y + 47}>{s}</text></g>
        })}
        <rect className="ou-table ou-table-honneur" x={t.x - w / 2 - 10} y={t.y - 26} width={w + 20} height={52} rx={26} />
        <text className="ou-table-name ou-on-dark" x={t.x} y={t.y - 1}>Table d’honneur</text>
        <text className="ou-table-count ou-on-dark-soft" x={t.x} y={t.y + 14}>Camille & Hugo · 8 places</text>
      </g>
    )
  }
  const r = 46
  const filled = t.seats.filter(Boolean).length
  return (
    <g>
      {t.seats.map((s, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const x = t.x + Math.cos(a) * (r + 22)
        const y = t.y + Math.sin(a) * (r + 22)
        const next = NEXT.table === t.name && NEXT.seats.includes(i)
        return (
          <g key={i}>
            <circle className={`ou-seat${!s ? ' ou-seat-empty' : ''}${next ? ' ou-seat-next' : ''}`} cx={x} cy={y} r={13} />
            {s && <text className="ou-seat-text" x={x} y={y + 3}>{s}</text>}
            {next && <text className="ou-seat-text ou-seat-text-next" x={x} y={y + 3}>LM</text>}
          </g>
        )
      })}
      <circle className="ou-table" cx={t.x} cy={t.y} r={r} />
      <text className="ou-table-name" x={t.x} y={t.y - 1}>{t.name}</text>
      <text className="ou-table-count" x={t.x} y={t.y + 14}>{filled}/{n} places</text>
    </g>
  )
}

function Plan() {
  return (
    <svg viewBox="0 0 700 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className="ou-dancefloor" x="430" y="585" width="250" height="34" rx="12" />
      <text className="ou-zone-label" x="530" y="607">Piste</text>
      {TABLES.map((t) => <Table key={t.name} t={t} />)}
    </svg>
  )
}

// ============================================================
// COMPOSANTS PARTAGÉS
// ============================================================
function Mark() {
  return <span className="ou-mark" aria-label="Oui"><Heart size={19} strokeWidth={2.3} fill="currentColor" /></span>
}
function Avatar({ name, src, size = 'md' }) {
  return <span className={`ou-avatar ou-avatar-${size}`}>{name.charAt(0)}{src && <img src={src} alt="" loading="lazy" />}</span>
}
function Pill({ tone = 'neutral', children }) {
  return <span className={`ou-pill ou-pill-${tone}`}>{children}</span>
}
function PhoneFrame({ children }) {
  return (
    <div className="ou-phone-export">
      <div className="ou-phone">
        <div className="ou-screen">
          <span className="ou-island" aria-hidden="true" />
          <div className="ou-statusbar"><span>9:41</span><div className="ou-status-icons"><StatusBarIcons /></div></div>
          {children}
          <div className="ou-home-indicator" />
        </div>
      </div>
    </div>
  )
}
function DeskFrame({ url, children }) {
  return (
    <div className="ou-desk">
      <div className="ou-desk-bar"><i /><i /><i /><span className="ou-desk-url">{url}</span></div>
      <div className="ou-desk-app">{children}</div>
    </div>
  )
}

// ============================================================
// L'INVITÉ, sur son téléphone
// ============================================================
function GuestScreen() {
  return (
    <div className="ou-content">
      <div className="ou-hero">
        <div className="ou-photo"><img src={PHOTO.couple} alt="" loading="lazy" /></div>
        <div className="ou-hero-veil" />
        <span className="ou-hero-badge ou-pill ou-pill-glass"><CalendarDays size={11} /> J-23</span>
        <div className="ou-hero-text">
          <div className="ou-names">Camille <em>&</em> Hugo</div>
          <p>Samedi 20 juin 2026 · Château de Reignac</p>
        </div>
      </div>
      <div className="ou-section">
        <div className="ou-section-head"><strong>Vous venez ?</strong><span>Léa + 1</span></div>
        <div className="ou-card ou-rsvp">
          <div className="ou-choice">
            <button className="ou-on"><Check size={13} strokeWidth={3} /> Oui, avec plaisir</button>
            <button><X size={13} /> Non</button>
          </div>
          <div className="ou-menu"><span className="ou-on">Poisson</span><span>Viande</span><span>Végé</span></div>
          <small>Une allergie, un enfant ? Dites-le nous ici.</small>
        </div>
      </div>
      <div className="ou-section">
        <div className="ou-section-head"><strong>Le programme</strong><span>Itinéraires</span></div>
        <div className="ou-card ou-programme">
          <div className="ou-step"><time>15:00</time><div><strong>Cérémonie</strong><small>Mairie de Saint-Émilion</small></div></div>
          <div className="ou-step"><time>17:30</time><div><strong>Cocktail dans le parc</strong><small>Château de Reignac</small></div></div>
          <div className="ou-step"><time>20:30</time><div><strong>Dîner à l’Orangerie</strong><small>Puis la piste, jusqu’au bout</small></div></div>
        </div>
      </div>
      <div className="ou-cagnotte">
        <Gift size={18} />
        <div><strong>Voyage de noces</strong><small>Cagnotte · 3 240 € · 41 participants</small></div>
        <button className="ou-act">Participer</button>
      </div>
      <nav className="ou-tabbar" aria-label="Navigation">
        <span className="ou-tab ou-tab-on"><CalendarDays size={19} />Programme</span>
        <span className="ou-tab"><Camera size={19} />Photos</span>
        <span className="ou-tab"><Gift size={19} />Cagnotte</span>
        <span className="ou-tab"><Users size={19} />Invités</span>
      </nav>
    </div>
  )
}

// ============================================================
// LES MARIÉS, sur l'ordinateur : le plan de table
// ============================================================
const TO_PLACE = [
  { name: 'Léa Martin + 1', meta: 'Poisson, viande · amis de Camille', next: true },
  { name: 'Mamie Jeanne', meta: 'Végé · près de la table d’honneur' },
  { name: 'Famille Dubois', meta: '4 personnes · 2 enfants' },
  { name: 'Karim & Sofia', meta: 'Viande · collègues d’Hugo' },
  { name: 'Antoine L.', meta: 'Sans réponse · relancé hier' },
]

function PlanDesk() {
  const items = [
    { id: 'invites', label: 'Invités', icon: Users },
    { id: 'plan', label: 'Plan', icon: LayoutGrid, on: true },
    { id: 'programme', label: 'Programme', icon: CalendarDays },
    { id: 'cagnotte', label: 'Cagnotte', icon: Wallet },
    { id: 'photos', label: 'Photos', icon: Images, badge: 12 },
    { id: 'reglages', label: 'Réglages', icon: Settings },
  ]
  return (
    <DeskFrame url="app.oui.fr/camille-et-hugo/plan-de-table">
      <aside className="ou-rail" aria-label="Navigation">
        <Mark />
        {items.map((it) => { const Icon = it.icon; return <div key={it.id} className={`ou-rail-nav${it.on ? ' ou-rail-on' : ''}`}><Icon size={19} />{it.label}{it.badge && <b>{it.badge}</b>}</div> })}
        <div className="ou-rail-account"><Avatar name="Camille" src={FACE.camille} size="md" /></div>
      </aside>
      <main className="ou-main">
        <div className="ou-floor"><Plan /></div>
        <div className="ou-overlay-top">
          <div className="ou-overlay-title ou-glass"><h3>Plan de table</h3><small>Camille & Hugo · 20 juin · J-23</small></div>
          <div className="ou-overlay-tools">
            <span className="ou-replies ou-glass">Réponses <Pill tone="sage"><Check size={11} /> 84 oui</Pill><Pill tone="neutral">12 non</Pill><Pill tone="action">9 en attente</Pill></span>
            <button className="ou-d-btn"><Plus size={16} /> Une table</button>
          </div>
        </div>
        <div className="ou-panel">
          <div className="ou-panel-head"><strong>À placer</strong><span>9 invités · 96 placés sur 105</span></div>
          {TO_PLACE.map((g) => (
            <div key={g.name} className={`ou-card ou-guest${g.next ? ' ou-guest-next' : ''}`}>
              <Avatar name={g.name} size="md" />
              <div><strong>{g.name}</strong><small>{g.meta}</small></div>
              <button className="ou-act">{g.next ? 'Table Provence' : 'Placer'}</button>
            </div>
          ))}
        </div>
        <div className="ou-legend ou-glass">
          <span><i style={{ background: '#e8efe6', boxShadow: 'inset 0 0 0 1px #cfdccc' }} />Placé</span>
          <span><i style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #d9d1c2' }} />Chaise libre</span>
          <span><i style={{ background: '#fbe9e2', boxShadow: 'inset 0 0 0 1.5px #e07a5f' }} />En train de placer</span>
        </div>
      </main>
    </DeskFrame>
  )
}

// ============================================================
// LA PAGE
// ============================================================
export default function OuiMockupsPage() {
  return (
    <main className="oui-mockups-page">
      <section className="ou-landing-hero">
        <p className="ou-eyebrow">Proposition d’accompagnement</p>
        <h1>Maquettes visuelles</h1>
        <p className="ou-reference">Oui · L’app du mariage</p>
        <p className="ou-disclaimer">Aperçu rapide pour visualiser l’idée : toutes les pages ne sont pas illustrées et le design n’est pas définitif (couleurs, logo, typo). Non contractuel.</p>
      </section>
      <section className="ou-flow">
        <div className="ou-flow-head"><span>01</span><h2>L’invité</h2><p>Il répond en un geste, choisit son menu, lit le programme, participe à la cagnotte, et dépose ses photos de la soirée.</p></div>
        <div className="ou-gallery">
          <article id="ou-guest" className="ou-mockup-card">
            <div className="ou-card-head"><h3>Le mariage, dans la poche</h3><p>Réponse, menu, programme, cagnotte</p></div>
            <div className="ou-export-wrap"><PhoneFrame><GuestScreen /></PhoneFrame></div>
          </article>
        </div>
      </section>
      <section className="ou-flow">
        <div className="ou-flow-head"><span>02</span><h2>Les mariés</h2><p>Sur l’ordinateur : les réponses qui tombent, le plan de table qu’on remplit, la cagnotte et les photos au même endroit.</p></div>
        <div className="ou-gallery">
          <article id="ou-plan" className="ou-mockup-card ou-mockup-card-wide">
            <div className="ou-card-head"><h3>Le plan de table</h3><p>Chaque table, ses invités, les chaises libres ; à droite, ceux qu’il reste à placer</p></div>
            <PlanDesk />
          </article>
        </div>
      </section>
    </main>
  )
}
