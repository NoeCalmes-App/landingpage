import AppRouteBridge from './AppRouteBridge.jsx'

export default function MaquetteVisualBridge() {
  return (
    <AppRouteBridge
      publicBasePath="/maquette-visuel"
      minSegments={2}
      title="Maquettes visuelles — Noé Calmes"
      description="Galerie privee de maquettes visuelles partagee par Noe Calmes."
      incompleteTitle="Lien maquettes incomplet"
      incompleteText="Utilise le lien complet transmis par Noé pour ouvrir les maquettes."
      loadingText="Chargement des maquettes..."
    />
  )
}
