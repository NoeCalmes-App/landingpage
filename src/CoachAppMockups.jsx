import {
  Activity,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  Lock,
  MessageCircle,
  Play,
  Plus,
  Send,
  Settings,
  Sparkles,
  Target,
  Timer,
  Utensils,
  Video,
} from 'lucide-react'
import './coach-app-mockups.css'

function StatusBar() {
  return (
    <div className="coach-statusbar">
      <span>9:41</span>
      <div className="coach-status-icons">
        <span className="coach-signal" />
        <span className="coach-wifi" />
        <span className="coach-battery" />
      </div>
    </div>
  )
}

function PhoneFrame({ children }) {
  return (
    <div className="coach-phone-frame">
      <div className="coach-phone-screen">
        <StatusBar />
        {children}
      </div>
    </div>
  )
}

function AppLogo({ small = false }) {
  return (
    <div className={small ? 'coach-logo coach-logo-small' : 'coach-logo'}>
      <Dumbbell size={small ? 18 : 24} strokeWidth={2.8} />
    </div>
  )
}

function PrimaryButton({ children, muted = false }) {
  return <button className={muted ? 'coach-primary coach-primary-muted' : 'coach-primary'}>{children}</button>
}

function TopBar({ title, icon = <Settings size={20} /> }) {
  return (
    <div className="coach-topbar">
      <AppLogo small />
      <span>{title}</span>
      <button className="coach-round-btn">{icon}</button>
    </div>
  )
}

function BottomNav({ active = 'training' }) {
  const items = [
    { key: 'training', label: 'Entraînement', icon: <Dumbbell size={20} /> },
    { key: 'nutrition', label: 'Nutrition', icon: <Utensils size={20} /> },
    { key: 'coach', label: 'Coach', icon: <MessageCircle size={20} /> },
    { key: 'profile', label: 'Profil', icon: <BarChart3 size={20} /> },
  ]

  return (
    <nav className="coach-tabbar">
      {items.map((item) => (
        <span key={item.key} className={active === item.key ? 'is-active' : ''}>
          {item.icon}
          <small>{item.label}</small>
        </span>
      ))}
    </nav>
  )
}

function MuscleMap({ variant = 'full' }) {
  return (
    <div className={`coach-muscle-map coach-muscle-${variant}`}>
      <div className="coach-body-shape">
        <span className="muscle chest" />
        <span className="muscle abs" />
        <span className="muscle shoulder-left" />
        <span className="muscle shoulder-right" />
        <span className="muscle arm-left" />
        <span className="muscle arm-right" />
        <span className="muscle leg-left" />
        <span className="muscle leg-right" />
      </div>
    </div>
  )
}

function VideoStill({ label = 'Vidéo coach', compact = false }) {
  return (
    <div className={compact ? 'coach-video-still is-compact' : 'coach-video-still'}>
      <div className="coach-video-person">
        <span className="head" />
        <span className="torso" />
        <span className="arm-left" />
        <span className="arm-right" />
        <span className="leg-left" />
        <span className="leg-right" />
      </div>
      <span className="coach-play-pill">
        <Play size={compact ? 12 : 15} fill="currentColor" />
        {label}
      </span>
    </div>
  )
}

function ChoiceCard({ icon, title, subtitle, selected = false }) {
  return (
    <div className={selected ? 'coach-choice is-selected' : 'coach-choice'}>
      <span className="coach-choice-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        {subtitle && <small>{subtitle}</small>}
      </div>
      {selected ? <Check size={18} /> : <span className="coach-empty-check" />}
    </div>
  )
}

function OnboardingScreen() {
  return (
    <section className="coach-screen coach-onboarding">
      <AppLogo />
      <div className="coach-hero-visual">
        <VideoStill label="Coach King" />
      </div>
      <div className="coach-screen-copy">
        <p className="coach-kicker">Programme personnalisé</p>
        <h3>Ton coach dans ta poche, même en dehors de la salle.</h3>
        <p>Un plan clair, des vidéos réelles, des recettes simples et un suivi direct avec le coach.</p>
      </div>
      <PrimaryButton>Créer mon plan</PrimaryButton>
      <button className="coach-text-link">J’ai déjà un compte</button>
    </section>
  )
}

function QuizGoalScreen() {
  return (
    <section className="coach-screen coach-quiz">
      <div className="coach-progress"><span style={{ width: '24%' }} /></div>
      <h3>Quel est ton objectif principal ?</h3>
      <p className="coach-subtitle">Le programme sera préparé autour de ton objectif.</p>
      <ChoiceCard selected icon={<Target size={22} />} title="Prendre du muscle" subtitle="Programme force et volume" />
      <ChoiceCard icon={<Flame size={22} />} title="Perdre du gras" subtitle="Séances plus dynamiques" />
      <ChoiceCard icon={<Activity size={22} />} title="Me remettre en forme" subtitle="Progression douce" />
      <ChoiceCard icon={<Sparkles size={22} />} title="Être accompagné" subtitle="Suivi avec le coach" />
      <PrimaryButton>Continuer</PrimaryButton>
    </section>
  )
}

function QuizSetupScreen() {
  return (
    <section className="coach-screen coach-quiz">
      <div className="coach-progress"><span style={{ width: '56%' }} /></div>
      <h3>Où et comment veux-tu t’entraîner ?</h3>
      <p className="coach-subtitle">On garde seulement les questions utiles pour créer un plan réaliste.</p>
      <ChoiceCard selected icon={<Dumbbell size={22} />} title="Salle de sport" subtitle="Machines, haltères et poulies" />
      <ChoiceCard icon={<Clock3 size={22} />} title="3 fois par semaine" subtitle="Rythme recommandé" />
      <ChoiceCard icon={<Timer size={22} />} title="45 à 60 minutes" subtitle="Durée par séance" />
      <ChoiceCard icon={<Activity size={22} />} title="Dos sensible" subtitle="Exercices adaptés" />
      <PrimaryButton>Voir mon plan</PrimaryButton>
    </section>
  )
}

function PlanPreviewScreen() {
  return (
    <section className="coach-screen coach-plan-preview">
      <TopBar title="Plan prêt" icon={<Lock size={19} />} />
      <div className="coach-plan-card">
        <p className="coach-kicker">Aperçu gratuit</p>
        <h3>Plan prise de muscle sur 4 semaines</h3>
        <div className="coach-chart">
          <span className="line base" />
          <span className="line active" />
          <strong>+ progression</strong>
        </div>
        <div className="coach-plan-grid">
          <span><Target size={17} /> Muscle</span>
          <span><CalendarDays size={17} /> 3x/semaine</span>
          <span><Clock3 size={17} /> 50 min</span>
          <span><Dumbbell size={17} /> Salle</span>
        </div>
      </div>
      <div className="coach-lock-list">
        <span><Check size={16} /> Structure du programme visible</span>
        <span><Lock size={16} /> Vidéos et détail des séances après abonnement</span>
        <span><MessageCircle size={16} /> Messagerie réservée aux abonnés</span>
      </div>
      <PrimaryButton>Débloquer mon plan</PrimaryButton>
    </section>
  )
}

function PaywallScreen() {
  return (
    <section className="coach-screen coach-paywall">
      <button className="coach-back">‹</button>
      <div className="coach-paywall-head">
        <Sparkles size={24} />
        <span>Essai gratuit possible</span>
      </div>
      <h3>Obtiens ton plan personnalisé</h3>
      <div className="coach-before-after">
        <div>
          <small>Maintenant</small>
          <MuscleMap variant="light" />
        </div>
        <ChevronRight size={30} />
        <div>
          <small>Objectif</small>
          <MuscleMap />
        </div>
      </div>
      <div className="coach-price-row">
        <span>1 mois<small>9,99 €</small></span>
        <span className="is-best">12 mois<small>59,99 €</small></span>
        <span>3 mois<small>22,99 €</small></span>
      </div>
      <ul className="coach-benefits">
        <li><Video size={15} /> Vidéos du coach</li>
        <li><MessageCircle size={15} /> Discussion premium</li>
        <li><Utensils size={15} /> Recettes et conseils</li>
      </ul>
      <PrimaryButton>Commencer</PrimaryButton>
    </section>
  )
}

function HomeScreen() {
  return (
    <section className="coach-screen coach-home">
      <TopBar title="Aujourd’hui" icon={<MessageCircle size={19} />} />
      <div className="coach-welcome">
        <p>Bonjour Alex</p>
        <h3>Ta séance A est prête.</h3>
      </div>
      <div className="coach-next-card">
        <span className="coach-green-pill">Prochain entraînement</span>
        <h4>Haut du corps</h4>
        <div className="coach-next-content">
          <div>
            <span><Clock3 size={17} /> 52 min</span>
            <span><Dumbbell size={17} /> 18 séries</span>
          </div>
          <MuscleMap />
        </div>
        <PrimaryButton>Commencer</PrimaryButton>
      </div>
      <div className="coach-home-cards">
        <div><MessageCircle size={18} /><strong>Coach</strong><small>1 réponse</small></div>
        <div><Utensils size={18} /><strong>Nutrition</strong><small>4 recettes</small></div>
      </div>
      <BottomNav />
    </section>
  )
}

function ProgramScreen() {
  const exercises = [
    ['Développé épaules', '4 séries · 10 rép.', 'Épaules'],
    ['Pompes inclinées', '4 séries · 12 rép.', 'Poitrine'],
    ['Rowing haltères', '4 séries · 10 rép.', 'Dos'],
  ]

  return (
    <section className="coach-screen coach-program">
      <TopBar title="Programme" icon={<Plus size={19} />} />
      <h3>Entraînement A</h3>
      <div className="coach-session-summary">
        <div><Clock3 size={16} /> 52 min</div>
        <div><Dumbbell size={16} /> 18 séries</div>
        <MuscleMap />
      </div>
      <div className="coach-exercise-list">
        {exercises.map(([name, meta, muscle]) => (
          <div className="coach-exercise-item" key={name}>
            <VideoStill compact label="" />
            <div>
              <strong>{name}</strong>
              <small>{meta}</small>
            </div>
            <span>{muscle}</span>
          </div>
        ))}
      </div>
      <PrimaryButton>Commencer l'entraînement</PrimaryButton>
      <BottomNav />
    </section>
  )
}

function ActiveWorkoutScreen() {
  return (
    <section className="coach-screen coach-active-workout">
      <div className="coach-workout-header">
        <button className="coach-back">‹</button>
        <strong>00:12:44</strong>
        <span><Timer size={16} /> 1:30</span>
      </div>
      <VideoStill label="Comment faire" />
      <div className="coach-exercise-title">
        <h3>Développé épaules</h3>
        <p>Haltères · épaules</p>
      </div>
      <div className="coach-sets-table">
        <div className="coach-table-head"><span>#</span><span>Rép.</span><span>Kg</span><span>RIR</span><span /></div>
        {[1, 2, 3, 4].map((set) => (
          <div className={set === 1 ? 'is-current' : ''} key={set}>
            <span>{set}</span><strong>10</strong><strong>12</strong><em>{set === 4 ? 1 : 2}</em><span className="coach-empty-check" />
          </div>
        ))}
      </div>
      <PrimaryButton>Valider la série</PrimaryButton>
    </section>
  )
}

function NutritionScreen() {
  const recipes = [
    ['Bowl protéiné', '420 kcal · 8 min', 'is-blue'],
    ['Poulet riz légumes', '610 kcal · 20 min', 'is-orange'],
    ['Pancakes avoine', '380 kcal · 12 min', 'is-pink'],
  ]

  return (
    <section className="coach-screen coach-nutrition">
      <TopBar title="Nutrition" icon={<Utensils size={19} />} />
      <h3>Recettes du coach</h3>
      <p className="coach-subtitle">Des idées simples à ajouter au programme de la semaine.</p>
      <div className="coach-recipe-grid">
        {recipes.map(([name, meta, tone]) => (
          <article className={`coach-recipe ${tone}`} key={name}>
            <div className="coach-food-visual" />
            <strong>{name}</strong>
            <small>{meta}</small>
          </article>
        ))}
      </div>
      <div className="coach-tip-card">
        <Flame size={18} />
        <div><strong>Conseil du jour</strong><span>Prépare deux repas d'avance pour garder le rythme.</span></div>
      </div>
      <BottomNav active="nutrition" />
    </section>
  )
}

function ChatScreen() {
  return (
    <section className="coach-screen coach-chat">
      <TopBar title="Coach King" icon={<Video size={19} />} />
      <div className="coach-chat-date">Aujourd’hui</div>
      <div className="coach-bubble is-coach">J’ai ajusté ta séance jambes, on évite les mouvements qui chargent trop le dos.</div>
      <div className="coach-bubble is-user">Parfait, je peux faire 45 minutes ce soir.</div>
      <div className="coach-bubble is-coach">Oui. Commence par l’échauffement, puis garde 90 secondes de repos entre les séries.</div>
      <div className="coach-message-box">
        <span>Écrire au coach...</span>
        <button><Send size={18} /></button>
      </div>
      <BottomNav active="coach" />
    </section>
  )
}

function ProfileScreen() {
  return (
    <section className="coach-screen coach-profile">
      <TopBar title="Profil" icon={<Settings size={19} />} />
      <h3>Progression</h3>
      <div className="coach-weight-card">
        <div><small>Poids actuel</small><strong>75 kg</strong></div>
        <div><small>Objectif</small><strong>82 kg</strong></div>
        <div className="coach-progress-line"><span /></div>
      </div>
      <div className="coach-stats-grid">
        <div><small>Séances</small><strong>12</strong></div>
        <div><small>IMC</small><strong>21,4</strong></div>
        <div><small>Calories</small><strong>2040</strong></div>
        <div><small>Plan</small><strong>Premium</strong></div>
      </div>
      <div className="coach-settings-list">
        <span>Compte <ChevronRight size={17} /></span>
        <span>Abonnement <ChevronRight size={17} /></span>
        <span>Notifications <ChevronRight size={17} /></span>
      </div>
      <BottomNav active="profile" />
    </section>
  )
}

function AdminScreen() {
  return (
    <div className="coach-admin-preview">
      <div className="coach-admin-sidebar">
        <AppLogo small />
        <span className="is-active">Clients</span>
        <span>Programmes</span>
        <span>Exercices</span>
        <span>Recettes</span>
        <span>Messages</span>
      </div>
      <div className="coach-admin-main">
        <div className="coach-admin-top">
          <div>
            <p className="coach-kicker">Espace coach</p>
            <h3>Gestion de l’application</h3>
          </div>
          <button>Ajouter un exercice</button>
        </div>
        <div className="coach-admin-metrics">
          <span><strong>128</strong><small>Clients</small></span>
          <span><strong>42</strong><small>Exercices</small></span>
          <span><strong>18</strong><small>Recettes</small></span>
          <span><strong>9</strong><small>Messages</small></span>
        </div>
        <div className="coach-admin-table">
          {['Alex Martin', 'Samira B.', 'Kevin L.'].map((client, index) => (
            <div key={client}>
              <strong>{client}</strong>
              <span>{index === 0 ? 'Premium actif' : 'Essai gratuit'}</span>
              <small>{index + 2} séances cette semaine</small>
              <button>Voir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mockups = [
  { id: 'onboarding', title: 'Onboarding', subtitle: 'Promesse + lancement du quiz', screen: <OnboardingScreen /> },
  { id: 'quiz-objective', title: 'Questionnaire objectif', subtitle: 'Personnalisation rapide', screen: <QuizGoalScreen /> },
  { id: 'quiz-setup', title: 'Questionnaire pratique', subtitle: 'Salle, durée, contraintes', screen: <QuizSetupScreen /> },
  { id: 'plan-preview', title: 'Aperçu du plan', subtitle: 'Valeur avant paiement', screen: <PlanPreviewScreen /> },
  { id: 'paywall', title: 'Abonnement', subtitle: 'Déblocage premium', screen: <PaywallScreen /> },
  { id: 'home', title: 'Accueil client', subtitle: 'Prochaine séance', screen: <HomeScreen /> },
  { id: 'program', title: 'Programme', subtitle: 'Séances et muscles ciblés', screen: <ProgramScreen /> },
  { id: 'workout', title: 'Mode séance', subtitle: 'Suivi pendant l’entraînement', screen: <ActiveWorkoutScreen /> },
  { id: 'nutrition', title: 'Nutrition', subtitle: 'Recettes du coach', screen: <NutritionScreen /> },
  { id: 'chat', title: 'Messagerie', subtitle: 'Lien coach-client', screen: <ChatScreen /> },
  { id: 'profile', title: 'Profil', subtitle: 'Progression et abonnement', screen: <ProfileScreen /> },
]

export default function CoachAppMockupsPage() {
  return (
    <main className="coach-mockups-page">
      <section className="coach-landing-hero">
        <div>
          <p className="coach-eyebrow">Proposition d'accompagnement</p>
          <h1>Maquettes visuelles</h1>
          <p className="coach-reference">KingFit Coach · MOB-2026-kingfit</p>
          <p className="coach-disclaimer">
            Aperçu rapide pour visualiser l'idée — toutes les pages ne sont pas illustrées
            et le design n'est pas définitif (couleurs, logo, typo). Non contractuel.
          </p>
        </div>
      </section>

      <section className="coach-gallery">
        {mockups.map((mockup) => (
          <article key={mockup.id} className="coach-mockup-card">
            <div className="coach-card-head">
              <div>
                <h2>{mockup.title}</h2>
                <p>{mockup.subtitle}</p>
              </div>
            </div>
            <div className="coach-export-wrap">
              <PhoneFrame>{mockup.screen}</PhoneFrame>
            </div>
          </article>
        ))}

        <article className="coach-mockup-card coach-mockup-card-wide">
          <div className="coach-card-head">
            <div>
              <h2>Administration web</h2>
              <p>Gestion clients, contenus et messages</p>
            </div>
          </div>
          <AdminScreen />
        </article>
      </section>
    </main>
  )
}
