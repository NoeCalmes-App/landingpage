// LE CONTENU DES GUIDES CLIENTS « NOM DE DOMAINE », EN CLAIR.
//
// ⚠️ POURQUOI CE FICHIER EXISTE. Les deux guides étaient des PDF sans source :
// trois pages, six polices embarquées, aucun moyen de les relire ni de les
// corriger. Une faute dans un guide client se voyait chez le client, et se
// réparait en rouvrant un outil de mise en page qu'on ne retrouvait pas. Le
// texte vit ici, le PDF se refabrique (`npm run generer-guides`).
//
// ⚠️ LES DEUX FAMILLES PARTAGENT TOUT SAUF TROIS CHOSES : le titre, la boîte
// mail (qui n'existe que sur un projet d'application, pour le dossier Apple) et
// le mot de la fin. Le reste est écrit UNE fois.

export const NICHANDLE = 'cn440614-ovh'

/**
 * ⚠️ « 10 MIN » ET NON « 20 MIN », comme sur les anciens guides.
 *
 * La moitié du temps servait à poser huit enregistrements DNS à la main. Ce
 * passage est parti : le client accorde un accès, et c'est Noé qui pose les
 * entrées. Laisser « 20 min » aurait fait reporter la lecture d'un quart
 * d'heure qu'on ne demande plus.
 */
const MINUTES = 10

/**
 * ⚠️ « CONSEIL » ET NON « PRIVILÉGIEZ LE .FR ». L'ancienne ligne fermait la
 * porte au .app, qui est l'extension naturelle d'un projet d'application et
 * que des clients demandent d'eux-mêmes. Une recommandation qui interdit se
 * fait contourner en silence, et on l'apprend après l'achat.
 */
const CONSEIL_EXTENSION = '<b>Conseil</b> : .fr, .com ou .app.'

const acheter = (mot, exemple) => [
  {
    titre: '1) Choisir le nom',
    liste: [
      'Ouvrir <b>ovhcloud.com/fr/domains</b>.',
      `Saisir le nom de votre ${mot}, puis lancer la recherche.`,
      'Prendre celui qui est libre : <b>.fr</b>, <b>.com</b> ou <b>.app</b>.',
    ],
  },
  {
    titre: '2) Commander',
    liste: [
      '<b>Acheter</b>, puis <b>Poursuivre la commande</b>.',
      'Forfait <b>1, 2 ou 3 ans</b>, à vous de choisir. <b>Poursuivre la commande</b>.',
      'Aucune option à ajouter. <b>Poursuivre la commande</b>.',
      'Se connecter à son compte OVHcloud, ou en créer un.',
      'En bas à droite, <b>Continuer</b>.',
      'Cocher les quatre cases, descendre jusqu’au paiement, payer.',
    ],
  },
  {
    titre: '3) Attendre la livraison',
    liste: [
      'Un e-mail arrive en moins de 5 minutes. Cliquer sur <b>Suivre la commande</b>.',
      'Attendre que « Votre produit est disponible » soit coché, 5 minutes au plus.',
    ],
  },
]

const emailPro = {
  titre: '4) Créer l’adresse e-mail pro',
  liste: [
    'En haut à gauche, <b>Tableau de bord</b>, puis cliquer sur votre nom de domaine (exemple : monapp.fr).',
    'À côté d’<b>Informations générales</b>, ouvrir <b>E-mails</b>.',
    'À droite, <b>Gestion des redirections</b>, puis <b>Ajouter une redirection</b>.',
    '<b>De l’adresse</b> : le nom de votre société, sans espace ni accent (exemple : monentreprise). En micro-entreprise, vos nom et prénom collés : jeandupont.',
    '<b>Vers l’adresse</b> : celle où vous recevrez les e-mails de votre application.',
    '<b>Mode de copie</b> : Conserver une copie, puis <b>Valider</b>.',
  ],
}

/**
 * LA SECTION QUI REMPLACE « BRANCHER LE DOMAINE SUR LE SITE ».
 *
 * ⚠️ L'ANCIENNE FAISAIT POSER HUIT ENREGISTREMENTS DNS AU CLIENT. C'était le
 * passage le plus cher du dossier : des jours d'aller-retour, des entrées à
 * moitié posées, un domaine qui répond une fois sur cinq, et GitHub qui refuse
 * le domaine sans dire pourquoi. Un client n'a ni le vocabulaire d'une zone
 * DNS, ni le moyen de vérifier son travail.
 *
 * ⚠️ L'ÉTAPE DE L'E-MAIL VIENT EN PREMIER, ET CE N'EST PAS DÉCORATIF. OVH
 * envoie le code de confirmation à l'adresse du PROFIL, pas à celle qu'on
 * utilise tous les jours. Sur un compte ouvert il y a huit ans, elle est morte :
 * le message part dans le vide et les deux côtés attendent sans savoir pourquoi.
 * C'est le blocage numéro un.
 */
const acces = (numero) => ({
  titre: `${numero}) M’autoriser à configurer votre domaine`,
  intro: 'Vous n’avez aucun réglage technique à faire : je m’en occupe. Il faut seulement m’y autoriser, une fois.',
  sousSections: [
    {
      titre: 'Étape 1 — vérifier votre adresse e-mail OVH',
      texte: 'OVH va vous envoyer un message de confirmation à l’étape suivante. Il part à l’adresse enregistrée dans votre <b>profil OVH</b>, qui n’est pas toujours celle que vous utilisez tous les jours.',
      liste: [
        'Cliquer sur votre nom en haut à droite, puis sur votre profil.',
        'Vérifier que l’adresse affichée est bien une adresse que vous relevez. La corriger si besoin.',
      ],
      note: 'Ne sautez pas cette étape. C’est de loin la cause numéro un de blocage : le message part dans le vide, et nous attendons tous les deux sans savoir pourquoi.',
    },
    {
      titre: 'Étape 2 — m’ajouter en contact technique',
      liste: [
        'Cliquer sur votre nom en haut à droite, puis sur <b>Mes contacts</b>.',
        'Votre domaine apparaît sur <b>plusieurs lignes</b> : une « Domaine », une « Emails », et une <b>« Zone DNS »</b>. <b>C’est la ligne « Zone DNS » qu’il faut.</b>',
        'Tout à droite de cette ligne, cliquer sur les <b>trois petits points</b>, puis sur <b>Modifier les contacts</b>.',
        `Trois champs s’affichent. <b>Ne changer que celui du milieu</b>, « Contact technique », et y mettre&nbsp;: <span class="mono">${NICHANDLE}</span>`,
        'Cocher <b>« Répliquer cette modification de contact sur le service Domaine associé »</b>, puis valider.',
        'Un e-mail d’OVH arrive avec un lien de confirmation : cliquer dessus. Je reçois de mon côté un message séparé et je confirme aussi.',
      ],
    },
  ],
})

export const GUIDES = [
  {
    fichier: 'Achat nom de domaine.pdf',
    titre: 'Nom de domaine + e-mail pro',
    minutes: MINUTES,
    objectif: 'Acheter un nom de domaine (exemple : monapp.fr)',
    quoi: 'L’adresse de votre site, du type <b>monapp.fr</b>. C’est moi qui construis le site ; le domaine, lui, s’achète à votre nom et vous appartient. Votre adresse e-mail professionnelle en découle : monentreprise@monapp.fr.',
    prerequis: 'Une carte bancaire, et le nom que portera votre application.',
    retenir: [
      '<b>Obligatoire pour publier sur l’App Store.</b> La licence Apple exige un site et une adresse e-mail à votre domaine. D’où la première place.',
      'Environ <b>5 € par an</b>, à renouveler chaque année.',
      CONSEIL_EXTENSION,
    ],
    sections: [...acheter('application', 'monapp.fr'), emailPro, acces(5)],
    fin: {
      titre: 'Et ensuite ?',
      liste: [
        'Envoyez-moi <b>le nom de votre domaine</b> et <b>l’adresse e-mail pro</b> que vous venez de créer (exemple : monapp.fr et monentreprise@monapp.fr).',
        'Je configure le domaine et je mets le site en ligne.',
      ],
      // ⚠️ LA PHRASE QUI ÉVITE UN DOSSIER REFUSÉ. Apple et Google vérifient que
      // le site de l'entreprise répond vraiment. Ouvrir le dossier avant, c'est
      // le faire refuser, et un dossier refusé se rouvre bien plus
      // difficilement qu'il ne s'ouvre.
      attente: '<b>Attendez ma confirmation que le site est en ligne</b> avant d’acheter les licences Apple Developer et Google Play.',
    },
  },
  {
    fichier: 'Achat nom de domaine - site web.pdf',
    titre: 'Nom de domaine',
    minutes: MINUTES,
    objectif: 'Acheter un nom de domaine (exemple : monsite.fr)',
    quoi: 'L’adresse de votre site, du type <b>monsite.fr</b>. C’est moi qui construis le site ; le domaine, lui, s’achète à votre nom et vous appartient.',
    prerequis: 'Une carte bancaire, et le nom que portera votre site.',
    retenir: [
      'Environ <b>5 € par an</b>, à renouveler chaque année.',
      CONSEIL_EXTENSION,
    ],
    sections: [...acheter('site', 'monsite.fr'), acces(4)],
    fin: {
      titre: 'Et ensuite ?',
      liste: [
        'Envoyez-moi <b>le nom de votre domaine</b> (exemple : monsite.fr).',
        'Je configure le domaine et je mets le site en ligne sur votre adresse.',
      ],
      attente: 'Comptez quelques heures avant que le site réponde partout, le temps que la modification se propage sur Internet.',
    },
  },
]
