// LA PRISE DE RENDEZ-VOUS DU SITE : le calendrier Cal.com, directement (page test /accueiltest, 26/11/2026).
//
// CAL.COM ET NON CALENDLY (Noé, 26/11/2026, le soir). L'événement : « Appel découverte »,
// cal.com/noecalmes-app/appel, appel téléphonique où Noé appelle le numéro du participant (son numéro à lui n'est
// jamais affiché). Les questions sont posées PAR CAL.COM, après le choix du créneau, avec des identifiants fixes
// (activite, idee, lancement, budget, source, confidentialite) : ce sont eux que Nowork lira dans le webhook.
// Aucun tri par le budget : tout le monde peut réserver.
//
// LA COULEUR : chez Cal.com, la couleur de la page de réservation est payante (offre Équipes) ; l'intégration, elle,
// peut imposer ses couleurs (`cssVarsPerTheme`). Le violet du site est donc posé ici, pas dans Cal.com.
//
// Première version du même jour (Calendly, puis un formulaire sur mesure avant le calendrier) : dans l'historique git.

export const CAL_ORIGINE = 'https://app.cal.com'
export const CAL_SCRIPT = `${CAL_ORIGINE}/embed/embed.js`
export const CAL_LIEN = 'noecalmes-app/appel'
export const CAL_ESPACE = 'appel'
export const VIOLET = '#665dff'

// Ce que Cal.com enregistre sans rien demander au visiteur : d'où il vient. Les UTM de la pub passent tels quels ;
// sans UTM, `utm_source=site` et la page où il a réservé (utm_content).
export function utmDepuis(adresse) {
  const url = new URL(adresse)
  const lire = (nom) => url.searchParams.get(nom) || ''
  return {
    utm_source: lire('utm_source') || 'site',
    utm_medium: lire('utm_medium'),
    utm_campaign: lire('utm_campaign'),
    utm_term: lire('utm_term'),
    utm_content: lire('utm_content') || url.pathname,
  }
}

// La configuration donnée au widget en ligne de Cal.com : vue mois, thème clair (celui du site), les UTM.
export function configCal(adressePage) {
  const config = { layout: 'month_view', theme: 'light' }
  if (adressePage) {
    Object.entries(utmDepuis(adressePage)).forEach(([cle, valeur]) => { if (valeur) config[cle] = valeur })
  }
  return config
}

// L'apparence : le violet du site à la place du noir de Cal.com (boutons, jour choisi, créneaux).
export const UI_CAL = {
  theme: 'light',
  hideEventTypeDetails: false,
  layout: 'month_view',
  cssVarsPerTheme: { light: { 'cal-brand': VIOLET }, dark: { 'cal-brand': VIOLET } },
}
