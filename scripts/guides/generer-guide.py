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


def liste(items, numerotee=False):
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
        start='1' if numerotee else '\u2022',
        leftIndent=retrait,
        bulletDedent=retrait - 2,
        # La marque est posée 0.7 pt (puce) / 0.5 pt (numéro) SOUS le haut de
        # la ligne dans les guides existants. `bulletOffsetY` remonte, d'où le
        # signe. Sans ça la puce flottait au-dessus de son texte.
        bulletOffsetY=-0.19 if numerotee else -1.18,
    )


def entete(canevas, doc):
    """La ligne de contexte, en haut de CHAQUE page — page 2 comprise."""
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
        'L’adresse de votre site, du type <font name="Lato-Semibold">monapplication.fr</font>. '
        'C’est moi qui construis le site ; le domaine, lui, s’achète à votre nom et vous appartient. '
        'Votre adresse e-mail professionnelle en découle : ' + g('contact@monapplication.fr') + '.',
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
    # ⚠️ « ME PRÉVENIR » EST UNE LIGNE, PAS UNE SECTION. En section numérotée,
    # elle prenait un titre et un paragraphe pour une seule phrase, et poussait
    # le guide sur une deuxième page qui ne portait qu'elle. Les autres guides
    # ferment déjà leurs sections par une ligne grise du même genre
    # (« Prévenez-moi une fois envoyée… ») : c'est le bon poids.
    Paragraph(
        'Prévenez-moi une fois le domaine acheté : je m’occupe du site, et de le relier à votre '
        'compte Apple Developer.',
        NOTE),
]

if __name__ == '__main__':
    construire('Achat nom de domaine.pdf', 'Nom de domaine + e-mail pro',
               'Entreprise · Temps estimé : 15 min', BLOCS)
