import AppRouteBridge from './AppRouteBridge.jsx'

export default function ClientSpaceBridge() {
  return (
    // minSegments={0} : /espace-client SANS token doit afficher l'écran de
    // connexion (email + mot de passe) et non « lien incomplet ». C'est l'URL
    // de retour donnée aux clients qui ont créé leur accès. Nowork route
    // /nowork/espace-client vers ClientSpaceLoginPage.
    // Les liens complets /espace-client/{slug}/{token} passent par le même
    // pont et restent inchangés.
    <AppRouteBridge
      publicBasePath="/espace-client"
      minSegments={0}
      title="Espace client — Noé Calmes"
      description="Espace client prive pour echanger avec Noe Calmes, consulter les documents partages et transmettre un devis signe."
      incompleteTitle="Lien espace client incomplet"
      incompleteText="Utilise le lien complet transmis par Noé pour ouvrir ton espace client."
      loadingText="Chargement de votre espace client..."
    />
  )
}
