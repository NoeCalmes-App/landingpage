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
//
// ⚠️ ON TUTOIE. Décision de Noé, le 15 septembre 2026. Ses clients sont des
// artisans et des dirigeants de TPE qu'il a au téléphone avant de leur envoyer
// le document : un « vous » sonnait plus distant à l'écrit que la voix qu'ils
// venaient d'entendre. En corollaire, toute phrase ajoutée ici doit tutoyer —
// un seul « vous » oublié fait lire le document comme un copier-coller.

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
 * ⚠️ « CONSEIL » ET NON « PRIVILÉGIE LE .FR ». L'ancienne ligne fermait la
 * porte au .app, qui est l'extension naturelle d'un projet d'application et
 * que des clients demandent d'eux-mêmes. Une recommandation qui interdit se
 * fait contourner en silence, et on l'apprend après l'achat.
 */
const CONSEIL_EXTENSION = '<b>Conseil</b> : .fr, .com ou .app.'

const acheter = (mot) => [
  {
    titre: '1) Choisir le nom',
    liste: [
      'Ouvrir <b>ovhcloud.com/fr/domains</b>.',
      `Saisir le nom de ton ${mot}, puis lancer la recherche.`,
      'Prendre celui qui est libre : <b>.fr</b>, <b>.com</b> ou <b>.app</b>.',
    ],
  },
  {
    titre: '2) Commander',
    liste: [
      '<b>Acheter</b>, puis <b>Poursuivre la commande</b>.',
      'Forfait <b>1, 2 ou 3 ans</b>, à toi de choisir. <b>Poursuivre la commande</b>.',
      'Aucune option à ajouter. <b>Poursuivre la commande</b>.',
      'Se connecter à ton compte OVHcloud, ou en créer un.',
      'En bas à droite, <b>Continuer</b>.',
      'Cocher toutes les cases d’acceptation, descendre jusqu’au paiement, payer.',
    ],
  },
  {
    titre: '3) Attendre la livraison',
    liste: [
      'Un e-mail arrive en moins de 5 minutes. Cliquer sur <b>Suivre la commande</b>.',
      // ⚠️ « VOTRE PRODUIT » ET NON « TON PRODUIT ». C'est le message AFFICHÉ
      // PAR OVH, pas notre phrase : le client doit le retrouver mot pour mot à
      // l'écran. Tutoyé par la bascule du 15/09, il envoyait chercher un texte
      // qui n'existe pas. ⚠️ Même règle pour tout libellé cité d'une interface.
      'Attendre que « Votre produit est disponible » soit coché, 5 minutes au plus.',
    ],
  },
]

const emailPro = {
  titre: '4) Créer l’adresse e-mail pro',
  liste: [
    'En haut à gauche, <b>Tableau de bord</b>, puis cliquer sur ton nom de domaine (exemple : monapp.fr).',
    'À côté d’<b>Informations générales</b>, ouvrir <b>E-mails</b>.',
    'À droite, <b>Gestion des redirections</b>, puis <b>Ajouter une redirection</b>.',
    '<b>De l’adresse</b> : seulement ce qui va AVANT le @, le reste est déjà rempli à côté. Le nom de ta société, sans espace ni accent (exemple : monentreprise). En micro-entreprise, tes nom et prénom collés : jeandupont.',
    '<b>Vers l’adresse</b> : ton adresse e-mail habituelle, celle que tu consultes déjà.',
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
 * ⚠️ IL RESTE UNE LIGNE SUR L'ADRESSE E-MAIL DU PROFIL, ET ELLE EST PORTEUSE.
 * Le 15/09, la section entière qui demandait de la vérifier AVANT a été
 * retirée : trop de texte pour une précaution. Mais le fait reste vrai — OVH
 * envoie le lien de confirmation à l'adresse du PROFIL, pas à celle qu'on
 * relève tous les jours, et la demande reste en attente sans que personne soit
 * prévenu. La consigne a donc déménagé À L'ENDROIT OÙ ELLE SERT : dans l'étape
 * où l'e-mail est censé arriver, en une ligne. Ne pas la supprimer : sans elle,
 * un compte OVH ouvert il y a huit ans bloque le dossier en silence.
 */
const acces = (numero) => ({
  titre: `${numero}) M’autoriser à configurer ton domaine`,
  intro: 'Tu n’as aucun réglage technique à faire : je m’en occupe. Il faut seulement m’y autoriser, une fois.',
  sousSections: [
    {
      titre: 'Dans ton espace client OVH',
      liste: [
        'Cliquer sur ton nom en haut à droite, puis sur <b>Mes contacts</b>.',
        'Ton domaine apparaît sur <b>plusieurs lignes</b> : une « Domaine », une « Emails », et une <b>« Zone DNS »</b>. <b>C’est la ligne « Zone DNS » qu’il faut.</b>',
        'Tout à droite de cette ligne, cliquer sur les <b>trois petits points</b>, puis sur <b>Modifier les contacts</b>.',
        `Trois champs s’affichent. <b>Ne changer que le champ « Contact technique »</b>, et y coller mon identifiant client OVH, c’est moi&nbsp;: <span class="mono">${NICHANDLE}</span>. Si une proposition apparaît sous le champ, clique dessus.`,
        'Cocher <b>« Répliquer cette modification de contact sur le service Domaine associé »</b>, puis valider.',
        'Un e-mail d’OVH arrive dans les minutes qui suivent, avec un lien de confirmation : cliquer dessus. <b>Regarde aussi tes spams</b>, il y atterrit souvent. Je reçois un message séparé de mon côté et je confirme aussi. <b>Rien au bout de 15 minutes ?</b> L’adresse de ton profil OVH n’est plus la bonne : ton nom en haut à droite, ouvrir ton profil, corriger l’adresse, puis refaire cette étape.',
      ],
    },
  ],
})

/**
 * LE GUIDE GOOGLE PLAY CONSOLE, refait ici le 19/10/2026 : c'était un PDF
 * composé à la main, au vouvoiement. Deux ajouts de Noé :
 *
 * ⚠️ LE QUESTIONNAIRE « EXPÉRIENCE ». Google demande au titulaire ses années
 * de développement et ses applications publiées. On répond pour LE CLIENT,
 * avec la vérité : jamais l'expérience de Noé, jamais le lien de l'app d'un
 * autre client. Débuter ne bloque pas le compte.
 *
 * ⚠️ L'E-MAIL DE CONTACT est public sur la fiche : l'adresse pro créée sur
 * OVH (guide du nom de domaine) ou celle du compte Google, et dans les deux
 * cas une boîte que le client lit, grâce à la redirection OVH.
 */
const googlePlay = {
  fichier: 'Création Compte Google Play Console.pdf',
  titre: 'Compte Google Play Console',
  minutes: 15,
  objectif: 'Créer ton compte éditeur Google Play',
  lienObjectif: 'https://play.google.com/console/signup',
  quoiTitre: 'Google Play Console, c’est quoi ?',
  quoi: 'Le compte éditeur qui permet de publier ton application sur le Google Play Store, donc sur les téléphones Android. Tu le crées à ton nom, puis tu m’ajoutes comme administrateur pour que je publie l’application.',
  prerequis: 'Ton compte Google (celui que tu m’as envoyé avec le nom de domaine), une carte bancaire, et les informations de ton entreprise.',
  retenir: [
    'Frais d’inscription de <b>25 $</b>, une seule fois. Pas d’abonnement.',
    '<b>Important : le compte doit être de type Organisation</b> (entreprise), pas Personnel. Un compte personnel obligerait à faire tester l’application par 12 personnes pendant 14 jours avant de pouvoir la publier.',
    'Une fois invité, je n’ai aucun accès à tes paramètres de paiement : ils restent réservés au propriétaire du compte, c’est-à-dire toi.',
  ],
  sections: [
    {
      titre: '1) Ton numéro D-U-N-S',
      intro: 'Un identifiant gratuit à 9 chiffres attribué par Dun & Bradstreet. Google s’en sert pour vérifier que ton entreprise existe. La plupart des entreprises françaises en ont déjà un sans le savoir.',
      liste: [
        'Le chercher, gratuit et immédiat : <a href="https://www.dnb.com/de-de/upik-en.html">plateforme UPIK</a>. Choisir <b>France</b> dans la liste des pays, puis saisir le nom exact de ton entreprise.',
        'S’il n’apparaît pas : <a href="https://developer.apple.com/enroll/duns-lookup/">outil D-U-N-S d’Apple</a> (compte Apple demandé, tu en auras besoin pour l’App Store de toute façon). La demande est gratuite et prend quelques jours.',
      ],
    },
    {
      titre: '2) Créer le compte',
      liste: [
        'Ouvrir <b>play.google.com/console/signup</b> et se connecter avec ton compte Google.',
        'Type de compte : <b>Organisation</b>.',
        '<b>Nom du développeur</b> : le nom qui sera visible par le public sur le Google Play Store.',
        'Saisir le numéro D-U-N-S et les informations de l’entreprise (voir l’étape 4).',
        'Répondre aux questions sur ton expérience (étape 3).',
        'Créer le profil de paiement, puis régler les 25 $. Google demande ensuite des documents pour confirmer l’identité de l’entreprise.',
      ],
    },
    {
      titre: '3) Les questions sur ton expérience',
      intro: 'Google demande ton expérience de développeur. <b>Réponds pour toi, avec la vérité</b> : une première application ne bloque pas le compte, et c’est moi qui développe.',
      liste: [
        '<b>Années d’expérience</b> : si c’est ta première application, la plus petite tranche proposée.',
        '<b>Applications déjà publiées</b>, sur Google Play ou ailleurs : <b>Non</b> si c’est la première. Laisse les liens vides.',
        '<b>Décrire ton expérience</b>, si la case existe : « Première application de la société. Le développement est confié à un développeur indépendant ; la société gère le contenu, le support et la relation avec les utilisateurs. »',
        '<b>Applications prévues cette année</b> : 1. <b>But de l’application</b> : deux phrases, pour qui elle est faite et ce qu’elle permet.',
        '<b>Revenus</b> : abonnement ou achats dans l’application si elle en a, sinon gratuite. <b>Publicité</b> : non, sauf si on l’a prévue ensemble. Un doute sur une question ? Envoie-moi une capture, je te dis quoi répondre.',
      ],
    },
    {
      titre: '4) Les coordonnées',
      liste: [
        '<b>Nom</b> et <b>adresse</b> : ceux de ton entreprise sur le Kbis, à l’identique.',
        '<b>Site web</b> : ton nom de domaine (exemple : https://monapp.fr).',
        '<b>E-mail de contact</b>, visible par le public sur la fiche : l’adresse pro créée sur OVH (exemple : monentreprise@monapp.fr), ou à défaut l’adresse de ton compte Google. Dans les deux cas, elle doit arriver dans la boîte que tu consultes : c’est le rôle de la <b>redirection</b> créée sur OVH.',
        '<b>Téléphone</b> : le tien. Google le vérifie par SMS.',
      ],
    },
    {
      titre: '5) M’ajouter comme administrateur',
      liste: [
        'Dans la Google Play Console, ouvrir <b>Utilisateurs et autorisations</b> (menu de gauche).',
        'À côté de <b>Gérer les utilisateurs</b>, cliquer sur les trois points, puis <b>Inviter de nouveaux utilisateurs</b>.',
        'Saisir mon adresse : <b>noecalmes.pro@gmail.com</b>',
        'Aller sur l’onglet <b>Autorisations du compte</b>, et non « Autorisations de l’application », sinon je ne pourrai pas créer de nouvelle application.',
        'Cocher <b>Administrateur (toutes les autorisations)</b>, puis <b>Inviter l’utilisateur</b>.',
      ],
      encadre: {
        titre: 'Préviens-moi une fois l’invitation envoyée',
        texte: 'Elle expire après 30 jours. Mon accès est gratuit.',
      },
    },
    {
      titre: '6) Retirer mon accès (quand le projet est terminé)',
      intro: 'Au même endroit : dans <b>Utilisateurs et autorisations</b>, cliquer sur la ligne à mon nom, puis <b>Supprimer l’utilisateur</b>.',
    },
  ],
  fin: {
    titre: 'Et ensuite ?',
    liste: [
      'Envoie-moi un message quand l’invitation est partie. Si Google demande des documents (Kbis, pièce d’identité), envoie-les-lui directement.',
    ],
    attente: 'La vérification de Google prend de quelques heures à quelques jours. Je prépare la fiche de l’application dès que j’ai accès.',
  },
}

export const GUIDES = [
  googlePlay,
  {
    fichier: 'Achat nom de domaine.pdf',
    titre: 'Nom de domaine + e-mail pro',
    minutes: MINUTES,
    objectif: 'Acheter un nom de domaine (exemple : monapp.fr)',
    quoi: 'L’adresse de ton site, du type <b>monapp.fr</b>. C’est moi qui construis le site ; le domaine, lui, s’achète à ton nom et t’appartient. Ton adresse e-mail professionnelle en découle : monentreprise@monapp.fr.',
    prerequis: 'Une carte bancaire, et le nom que portera ton application.',
    retenir: [
      '<b>Obligatoire pour publier sur l’App Store et le Google Play Store.</b>',
      'Environ <b>5 € par an</b>, à renouveler chaque année.',
      CONSEIL_EXTENSION,
    ],
    sections: [...acheter('application'), emailPro, acces(5)],
    fin: {
      titre: 'Et ensuite ?',
      liste: [
        'Envoie-moi <b>le nom de ton domaine</b> et <b>l’adresse e-mail pro</b> que tu viens de créer (exemple : monapp.fr et monentreprise@monapp.fr).',
        'Et <b>l’adresse de ton compte Google</b>, un Gmail suffit. C’est elle qui recevra la propriété de ton domaine chez Google, et c’est avec elle que tu ouvriras ta Google Play Console.',
        'Je configure le domaine et je mets le site en ligne.',
      ],
      // ⚠️ LA PHRASE QUI ÉVITE UN DOSSIER REFUSÉ. Apple et Google vérifient que
      // le site de l'entreprise répond vraiment. L'explication a été retirée le
      // 15/09 ; la consigne, elle, reste.
      attente: 'Compte quelques heures avant que le site réponde partout, le temps que la modification se propage sur Internet. <b>Attends ma confirmation qu’il est en ligne</b> avant d’acheter les licences Apple Developer et Google Play.',
    },
  },
  {
    fichier: 'Achat nom de domaine - site web.pdf',
    titre: 'Nom de domaine',
    minutes: MINUTES,
    objectif: 'Acheter un nom de domaine (exemple : monsite.fr)',
    quoi: 'L’adresse de ton site, du type <b>monsite.fr</b>. C’est moi qui construis le site ; le domaine, lui, s’achète à ton nom et t’appartient.',
    prerequis: 'Une carte bancaire, et le nom que portera ton site.',
    retenir: [
      'Environ <b>5 € par an</b>, à renouveler chaque année.',
      CONSEIL_EXTENSION,
    ],
    sections: [...acheter('site'), acces(4)],
    fin: {
      titre: 'Et ensuite ?',
      liste: [
        'Envoie-moi <b>le nom de ton domaine</b> (exemple : monsite.fr).',
        'Et <b>l’adresse de ton compte Google</b>, un Gmail suffit : c’est elle qui recevra la propriété de ton domaine chez Google, pour que tu n’aies pas à passer par moi dessus.',
        'Je configure le domaine et je mets le site en ligne sur ton adresse.',
      ],
      attente: 'Compte quelques heures avant que le site réponde partout, le temps que la modification se propage sur Internet.',
    },
  },
]
