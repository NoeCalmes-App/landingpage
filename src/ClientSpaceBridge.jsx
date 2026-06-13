import AppRouteBridge from './AppRouteBridge.jsx'

export default function ClientSpaceBridge() {
  return (
    <AppRouteBridge
      publicBasePath="/espace-client"
      minSegments={1}
      title="Espace client — Noé Calmes"
      description="Espace client prive pour echanger avec Noe Calmes, consulter les documents partages et transmettre un devis signe."
      incompleteTitle="Lien espace client incomplet"
      incompleteText="Utilise le lien complet transmis par Noé pour ouvrir ton espace client."
      loadingText="Chargement de votre espace client..."
    />
  )
}
