# -*- coding: utf-8 -*-
"""
GÉNÈRE UN GUIDE PDF de l'espace documents, dans la mise en page maison.

POURQUOI CE SCRIPT EXISTE. Les trois premiers guides (Firebase, Play Console,
Apple Developer) ont été composés à la main : leur PDF est dans le dépôt, mais
pas de quoi le refaire. Une faute de frappe ou un prix qui change obligeait à
tout reprendre de zéro, et le suivant risquait de ne plus ressembler aux
autres. Ici le texte est du Python lisible, et la mise en page est mesurée sur
les guides existants (`pdfplumber` sur le PDF de référence) : marges, corps,
interlignes et couleurs sont ceux-là, pas des approximations.

    python3 scripts/guides/generer-guide.py

⚠️ LES POLICES SONT CELLES DES PDF EXISTANTS. Sans elles, ReportLab retombe
sur Helvetica et le nouveau guide se voit au premier coup d'œil, à côté des
autres. Plus Jakarta Sans est déjà dans le site (`public/assets/fonts/`) et
n'est pas recopiée ici — une police à deux endroits finit par diverger. Lato,
elle, ne sert qu'aux PDF : elle vit donc à côté de ce script.
"""

from pathlib import Path

from reportlab.lib.colors import Color
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, Image, ListFlowable, ListItem, PageTemplate, Paragraph, Spacer

RACINE = Path(__file__).resolve().parents[2]
LATO = Path(__file__).resolve().parent / 'fonts'
CAPTURES = Path(__file__).resolve().parent / 'captures'
JAKARTA = RACINE / 'public' / 'assets' / 'fonts' / 'plus-jakarta'
SORTIE = RACINE / 'public' / 'assets' / 'documents' / 'guides'

# ─── Les mesures, relevées sur « Création Compte Google Play Console.pdf ─────
MARGE_G = 62.69          # bord gauche du texte
MARGE_D = 56.70          # 595.276 - 538.58, le bord droit atteint par le texte
HAUT_CONTENU = 51.30     # le haut du titre tombe alors à 54.90, comme la référence
BAS = 49.00
Y_ENTETE = 805.19        # ligne « Entreprise · Temps estimé », relevée au pixel

TEXTE = Color(0.07451, 0.07451, 0.07451)   # #131313
GRIS = Color(0.4, 0.4, 0.4)
MARQUE = Color(0.4, 0.364706, 1.0)         # #6659FF
ROUGE = Color(0.851, 0.176, 0.125)

for nom, chemin in [
    ('Lato', LATO / 'Lato-Regular.ttf'),
    ('Lato-Semibold', LATO / 'Lato-Semibold.ttf'),
    ('Jakarta-Bold', JAKARTA / 'PlusJakartaSans-Bold.ttf'),
    ('Jakarta-ExtraBold', JAKARTA / 'PlusJakartaSans-ExtraBold.ttf'),
]:
    pdfmetrics.registerFont(TTFont(nom, str(chemin)))

# ⚠️ LE TITRE EST CENTRÉ SUR LA PAGE, PAS SUR LE CADRE. Les marges ne sont pas
# égales (62.69 à gauche, 56.70 à droite) : centré dans le cadre, le titre
# tombait 3 pt à droite du titre des autres guides. Le retrait de droite rend
# le cadre symétrique POUR LUI SEUL, et le centre retombe sur 297.64.
TITRE = ParagraphStyle('titre', fontName='Jakarta-ExtraBold', fontSize=16, leading=20,
                       textColor=MARQUE, alignment=1, spaceAfter=13, rightIndent=MARGE_G - MARGE_D)
# `keepWithNext` : un titre de section ne reste jamais seul en bas de page.
# Vu sur ce guide — « 5) Me prévenir » en dernière ligne de la page 1 et sa
# phrase toute seule page 2. Une section coupée en deux se lit deux fois.
SECTION = ParagraphStyle('section', fontName='Jakarta-Bold', fontSize=11.5, leading=15,
                         textColor=TEXTE, spaceBefore=13.1, spaceAfter=6.9, keepWithNext=1)
CORPS = ParagraphStyle('corps', fontName='Lato', fontSize=10, leading=14.2,
                       textColor=TEXTE, spaceAfter=9)
PUCE = ParagraphStyle('puce', parent=CORPS, spaceAfter=3)
NOTE = ParagraphStyle('note', fontName='Lato', fontSize=9, leading=12.6,
                      textColor=GRIS, spaceBefore=5, spaceAfter=9)
# La même note, en couleur de marque : réservée à ce qui ARRÊTE le client. Une
# consigne d'attente en gris se lit comme un commentaire et se saute ; ici elle
# doit se voir sans crier, le rouge étant déjà pris par les avertissements.
NOTE_MARQUE = ParagraphStyle('note-marque', parent=NOTE, fontName='Lato-Semibold',
                             textColor=MARQUE, fontSize=9.5, leading=13.3)


def liste(items, numerotee=False, depart=1):
    """
    Une liste à puces ou numérotée, aux retraits EXACTS des guides existants :
    puce à +2 du bord de texte et texte à +14 ; numéro à +2 et texte à +16.
    Ce sont des mesures, pas des goûts — un guide qui décale ses listes de deux
    points se voit tout de suite à côté des autres.
    """
    style = ParagraphStyle('item', parent=PUCE)
    retrait = 16 if numerotee else 14
    return ListFlowable(
        [ListItem(Paragraph(t, style), leftIndent=retrait) for t in items],
        bulletType='1' if numerotee else 'bullet',
        bulletFontName='Helvetica',
        bulletFontSize=12 if numerotee else 8,
        bulletFormat='%s.' if numerotee else None,
        start=str(depart) if numerotee else '\u2022',
        leftIndent=retrait,
        bulletDedent=retrait - 2,
        # ⚠️ LES NUMÉROS SONT ALIGNÉS SUR LA LIGNE DE BASE DU TEXTE, pas sur
        # le haut de la ligne. Les trois guides composés à la main posaient le
        # « 1. » 2,5 pt plus bas que sa phrase : mesuré, et visible — le chiffre
        # a l'air tombé. Un chiffre de 12 pt à côté d'un texte de 10 pt ne
        # s'aligne pas par le haut, il s'aligne par le pied.
        # La puce, elle, garde le calage des guides existants : c'est un point,
        # il se centre à l'œil sur les minuscules, pas sur une ligne de base.
        bulletOffsetY=2.35 if numerotee else -1.18,
    )


def entete(canevas, doc):
    """
    La ligne de contexte, en haut de la PREMIÈRE page seulement.

    Répétée en tête de chaque page, elle annonçait « Temps estimé : 20 min » à
    quelqu'un qui en a déjà passé quinze : elle se lit comme un compteur qui
    repart. C'est une étiquette de couverture, pas un en-tête courant.
    """
    if canevas.getPageNumber() != 1:
        return
    canevas.saveState()
    canevas.setFont('Lato', 9)
    canevas.setFillColor(GRIS)
    canevas.drawRightString(A4[0] - MARGE_D, Y_ENTETE, doc.enteteTexte)
    canevas.restoreState()


def construire(nom_fichier, titre, entete_texte, blocs):
    chemin = SORTIE / nom_fichier
    doc = BaseDocTemplate(
        str(chemin), pagesize=A4,
        leftMargin=MARGE_G, rightMargin=MARGE_D,
        topMargin=HAUT_CONTENU, bottomMargin=BAS,
        title=titre, author='Noé Calmes',
    )
    doc.enteteTexte = entete_texte
    cadre = Frame(MARGE_G, BAS, A4[0] - MARGE_G - MARGE_D, A4[1] - HAUT_CONTENU - BAS, id='corps',
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id='guide', frames=[cadre], onPage=entete)])
    doc.build(blocs)
    print(f'écrit : {chemin.relative_to(RACINE)}')


def g(texte):
    """Un fragment gras dans le corps — Lato-Semibold, comme les autres guides."""
    return f'<font name="Lato-Semibold">{texte}</font>'


def rouge(texte):
    return f'<font color="#D92D20">{texte}</font>'


def lien(url, libelle=None):
    return f'<link href="{url}"><font color="#6659FF">{libelle or url}</font></link>'


def capture(fichier, largeur=None):
    """
    Une capture d'écran, calée à gauche sur la marge comme celle du guide Apple.

    ⚠️ LA LARGEUR EST CELLE DU TEXTE, jamais plus : une image qui dépasse la
    colonne se remarque plus que ce qu'elle montre. La hauteur suit le rapport
    de l'image, on ne la déforme pas.
    """
    from PIL import Image as _Img
    chemin = CAPTURES / fichier
    w, h = _Img.open(chemin).size
    largeur = largeur or (A4[0] - MARGE_G - MARGE_D)
    return Image(str(chemin), width=largeur, height=largeur * h / w, hAlign='LEFT')


# ─── LE GUIDE « NOM DE DOMAINE » ─────────────────────────────────────────────
#
# IL PASSE EN PREMIER dans la liste des accès à créer, et ce n'est pas un choix
# d'ordre : le compte Apple Developer demande un site au nom de la société et
# une adresse e-mail à ce domaine. Sans domaine, l'inscription Apple bloque —
# le client se retrouve arrêté à l'étape la plus longue des trois.
#
# ON NE PARLE PAS DU SITE ICI. Le site, c'est le travail de Noé ; ce guide ne
# demande que l'achat, qui doit être fait par le client puisque le domaine
# reste à son nom.

BLOCS = [
    Paragraph('Nom de domaine + e-mail pro', TITRE),

    Paragraph('Le nom de domaine, c’est quoi ?', SECTION),
    Paragraph(
        'L’adresse de votre site, du type <font name="Lato-Semibold">monapp.fr</font>. '
        'C’est moi qui construis le site ; le domaine, lui, s’achète à votre nom et vous appartient. '
        'Votre adresse e-mail professionnelle en découle : ' + g('contact@monapp.fr') + '.',
        CORPS),

    Paragraph('Prérequis', SECTION),
    Paragraph('Une carte bancaire, et le nom que portera votre application.', CORPS),

    Paragraph('À retenir', SECTION),
    liste([
        rouge(g('Obligatoire pour publier sur l’App Store.') + ' La licence Apple exige un site '
              'et une adresse e-mail à votre domaine. D’où la première place.'),
        'Environ 5 € par an, à renouveler chaque année.',
        'Privilégiez le ' + g('.fr') + ', sinon le ' + g('.com') + '.',
    ]),

    Paragraph('1) Choisir le nom', SECTION),
    liste([
        'Ouvrir ' + lien('https://www.ovhcloud.com/fr/domains/', 'ovhcloud.com/fr/domains') + '.',
        'Saisir le nom de votre application, puis lancer la recherche.',
        'Prendre le ' + g('.fr') + ' s’il est libre, sinon le ' + g('.com') + '.',
    ], numerotee=True),

    Paragraph('2) Commander', SECTION),
    liste([
        g('Acheter') + ', puis ' + g('Poursuivre la commande') + '.',
        'Forfait ' + g('1 an') + ', le moins cher. ' + g('Poursuivre la commande') + '.',
        'Aucune option à ajouter. ' + g('Poursuivre la commande') + '.',
        'Se connecter à son compte OVHcloud, ou en créer un.',
        'En bas à droite, ' + g('Continuer') + '.',
        'Cocher les ' + g('quatre') + ' cases, descendre jusqu’au paiement, ' + g('payer') + '.',
    ], numerotee=True),

    Paragraph('3) Attendre la livraison', SECTION),
    liste([
        'Un e-mail arrive en moins de 5 minutes. Cliquer sur ' + g('Suivre la commande') + '.',
        'Attendre que ' + g('« Votre produit est disponible »') + ' soit coché — 5 minutes au plus.',
    ], numerotee=True),
    Spacer(1, 3),
    capture('suivi-commande-ovh.png'),

    # L'ADRESSE PRO SE FAIT EN REDIRECTION, pas en boîte à part. Une boîte de
    # plus, c'est un mot de passe de plus et une application de plus à ouvrir :
    # elle n'est jamais relevée. Redirigée, l'adresse arrive dans la boîte que
    # le client consulte déjà, et « Conserver une copie » garde tout chez OVH
    # le jour où il voudra la lire ailleurs.
    # PAS DE SAUT DE PAGE FORCÉ. Une version en posait un ici pour équilibrer
    # les deux pages ; il ouvrait surtout un blanc au milieu du guide, juste
    # après une capture d'écran, là où l'on suit une suite de gestes. Les
    # étapes se lisent à la file : le texte tombe où il tombe, `keepWithNext`
    # garde chaque titre avec son contenu.
    Paragraph('4) Créer l’adresse e-mail pro', SECTION),
    liste([
        'En haut à gauche, ' + g('Tableau de bord') + ', puis cliquer sur votre nom de domaine '
        '(exemple : monapp.fr).',
        'À côté d’' + g('Informations générales') + ', ouvrir ' + g('E-mails') + '.',
        'À droite, ' + g('Gestion des redirections') + ', puis ' + g('Ajouter une redirection') + '.',
        'De l’adresse : ' + g('contact') + '. Vers l’adresse : celle où vous recevrez les e-mails '
        'de votre application.',
        'Mode de copie : ' + g('Conserver une copie') + ', puis ' + g('Valider') + '.',
    ], numerotee=True),
    # ⚠️ LE DNS SE FAIT LE JOUR DE L'ACHAT, pas le jour de la mise en ligne.
    #
    # Les quatre adresses sont celles de GitHub Pages : elles ne dépendent ni du
    # domaine, ni du dépôt, ni du client, et ne changent pas. Rien n'oblige donc
    # à attendre que le site existe. Le faire ici évite le pire des allers-
    # retours : rappeler le client des semaines plus tard, quand le site est
    # prêt, pour lui demander de retourner dans une interface qu'il a oubliée —
    # et attendre qu'il trouve le temps.
    #
    # LES DEUX PIÈGES SONT DITS, parce que les deux se produisent. L'entrée A
    # d'origine renvoie vers la page d'attente d'OVH : laissée là, le domaine
    # répond une fois sur cinq « ce domaine est enregistré chez OVH ». Et les
    # lignes MX viennent d'être créées à l'étape 4 : les toucher casse l'adresse
    # e-mail que le client vient de mettre en place.
    Paragraph('5) Brancher le domaine sur le site', SECTION),
    Paragraph(
        'Dans la barre de gauche, ' + g('Noms de domaine') + ', puis votre domaine (exemple : '
        + g('monapp.fr') + '). Au milieu, onglet ' + g('Zone DNS') + '.',
        CORPS),
    # ⚠️ LE FILTRE D'ABORD, LA SUPPRESSION ENSUITE. La zone contient des lignes
    # de plusieurs types, dont les MX qui font marcher l'e-mail créé à l'étape
    # 4. Demander « supprimez les entrées A » devant une liste mélangée, c'est
    # demander à quelqu'un qui ne connaît pas ces sigles de trier lui-même.
    # Filtré sur A, l'écran ne montre plus que ce qu'il faut supprimer, et le
    # reste est hors de portée.
    liste([
        '<font color="#6659FF">Voir la capture ci-dessous.</font> En haut à droite, cliquer sur '
        + g('Filtrer') + '. Colonne : ' + g('Type') + '. Condition : ' + g('est égal à') + '. Valeur : '
        + g('A') + '. Puis ' + g('Ajouter') + '.',
        # ⚠️ PLUS DE « NE SUPPRIMEZ PAS LES AUTRES ». Une interdiction devant un
        # écran filtré parle de lignes qu'on ne voit plus : elle inquiète sans
        # rien protéger. Ce qui protège, c'est de regarder le type avant de
        # cliquer, et c'est ce que la consigne demande maintenant.
        'Vérifier que la ligne est bien de type ' + g('A') + ', puis la supprimer : les '
        + g('trois petits points') + ' à droite, puis ' + g('Supprimer') + '.',
    ], numerotee=True),
    Spacer(1, 3),
    capture('filtre-dns-ovh.png', largeur=150),
    # De l'air entre l'image et la suite : collée, la reprise de la liste a
    # l'air d'une légende de la capture, pas de l'étape d'après.
    Spacer(1, 14),
    liste([
        '<font color="#6659FF">Voir la capture ci-dessous.</font> '
        + g('Ajouter une entrée') + ', type ' + g('A') + '. Sous-domaine : ' + g('@') + '. Cible : '
        + g('185.199.108.153') + '. TTL : ' + g('Par défaut') + '. Valider.',
        'Recommencer 3 fois, toujours avec ' + g('@') + ' : ' + g('185.199.109.153') + ', '
        + g('185.199.110.153') + ', ' + g('185.199.111.153') + '.',
        # ⚠️ LE COMPTE SE FAIT AVEC LE FILTRE ENCORE POSÉ. Une version demandait
        # « il doit y avoir 8 entrées, pas plus » : une zone DNS en contient
        # trente (MX, SRV, TXT, CNAME de messagerie…), et compter les siennes
        # sur cette phrase-là fait peur ou fait supprimer. Filtré sur A, il n'y
        # a que 4 lignes à voir, et la vérification tient en un coup d'œil.
        # ⚠️ LE WWW EN ENTRÉES A, PAS EN CNAME, ET C'EST UN CHOIX MESURÉ.
        #
        # Le CNAME de GitHub vise `<propriétaire>.github.io` : il porte le nom
        # du compte qui héberge. Le jour où le dépôt passe chez le client, ce
        # nom change et la ligne ne pointe plus nulle part — il faut retourner
        # dans OVH, chez lui, lui réexpliquer. Les quatre adresses IP, elles,
        # ne dépendent d'aucun compte : le transfert ne les touche pas.
        #
        # ET ÇA MARCHE : vérifié en forçant www.noecalmes.fr sur chacune des
        # quatre adresses, hors DNS. GitHub répond 301 vers l'apex, en HTTPS
        # valide. Il route sur le NOM demandé, pas sur le chemin emprunté pour
        # arriver — un nom inconnu sur la même adresse répond 404.
        #
        # Le seul avantage du CNAME serait de suivre un changement d'adresses
        # chez GitHub. Mais les quatre entrées de l'apex ne le suivraient pas
        # non plus : le risque est déjà là, le CNAME n'en enlève aucun.
        'Refaire ces 4 mêmes entrées avec ' + g('www') + ' à la place du ' + g('@') + '.',
        # ON NOMME, ON NE COMPTE PAS. « Recommencer 3 fois » puis « 4 lignes »
        # faisait douter. Les adresses écrites côte à côte se vérifient à l'œil
        # et montrent laquelle manque — chez le premier client, la 108.
        'Le filtre est toujours posé : vous devez voir 8 lignes, les 4 adresses ('
        + g('108') + ', ' + g('109') + ', ' + g('110') + ', ' + g('111') + ') sur ' + g('@')
        + ', et les 4 mêmes sur ' + g('www') + '.',
    ], numerotee=True, depart=3),
    Spacer(1, 3),
    # LA PREMIÈRE DES HUIT, EN IMAGE, avec le chemin complet annoté 1 à 7 : les
    # sept autres entrées sont le même écran avec une valeur qui change.
    capture('zone-dns-ovh.png'),
    Paragraph(
        'Tant que le site n’est pas mis en ligne, votre adresse affiche une page d’erreur : c’est normal, '
        'elle disparaît le jour de la publication.',
        NOTE),

    # ⚠️ « ME PRÉVENIR » EST UNE LIGNE, PAS UNE SECTION. En section numérotée,
    # elle prenait un titre et un paragraphe pour une seule phrase, et poussait
    # le guide sur une deuxième page qui ne portait qu'elle. Les autres guides
    # ferment déjà leurs sections par une ligne grise du même genre
    # (« Prévenez-moi une fois envoyée… ») : c'est le bon poids.
    #
    # ET ELLE NE PROMET PLUS RIEN. Elle annonçait « je m'occupe du site, et de
    # le relier à votre compte Apple Developer » : deux travaux qui viennent
    # plus tard, sur lesquels le client n'a rien à faire, et dont il n'a pas
    # besoin ici. Le guide dit dès son ouverture qu'on ne parle pas du site ;
    # sa dernière ligne le rouvrait. Reste ce qui est demandé : un signal.
    Paragraph('Prévenez-moi une fois que c’est fait.', NOTE),

    # ⚠️ LA DERNIÈRE LIGNE EST UN FEU ROUGE, pas une politesse. Le document
    # suivant est le compte Apple Developer, et Apple exige un site EN LIGNE au
    # nom de la société : un client qui enchaîne tout de suite se fait refuser,
    # et il faut tout recommencer. Le domaine vient d'être branché, la
    # propagation prend quelques heures, et le site n'est pas encore publié —
    # d'où l'attente.
    Paragraph(
        'Attendez ma confirmation avant de passer au document suivant : le site doit d’abord être en '
        'ligne et fonctionner sur votre domaine.',
        NOTE_MARQUE),
]

if __name__ == '__main__':
    construire('Achat nom de domaine.pdf', 'Nom de domaine + e-mail pro',
               'Entreprise · Temps estimé : 20 min', BLOCS)
