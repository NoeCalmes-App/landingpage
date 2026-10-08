# Prospection leads Meta (formulaires Insta/Facebook) — séquence WhatsApp

> ### Mobile ou web : l'outbound qualifie, il ne tranche jamais
>
> Noé conçoit des applications mobiles **et** des applications web, et il arbitre
> le support selon le projet. Mais **ce n'est jamais le premier message qui
> tranche** : on écrit « une application », sans qualificatif. L'audit et l'appel
> décident ensuite.
>
> Deux interdits absolus : ne jamais écrire « site », « site web » ou « site
> vitrine » pour parler d'une application web, et ne jamais présenter le web
> comme l'option moins chère. Règle complète :
> `documentation/context/vocabulaire-mobile-web.md`.


> Source de vérité pour la relance des leads issus des formulaires Meta.
> Contexte : le lead a rempli un formulaire pré-rempli (nom, prénom, email, téléphone) et coché son stade (prêt / bientôt / réflexion / juste une idée). **Il n'a PAS écrit son idée.**
> Positionnement : `documentation/context/positionnement.md`. Tunnel : `documentation/strategy/tunnel.md`.
>
> **Version à copier-coller : Nowork, page `/scripts/setting`** (pastille « Script WhatsApp » sur la fiche d'un lead). Les textes y vivent et s'y modifient ; ce document garde le pourquoi des règles. Changer une règle ici, c'est changer les textes là-bas dans le même geste.
>
> **Depuis le 7 octobre 2026, ce document tient aussi le setting des leads qui écrivent en premier** (publicité « clic vers WhatsApp », bouton du site, fin d'audit) : section « Leads qui écrivent en premier ». Le process tient en une ligne : un message automatique qui pose la question de l'idée, une relance de Noé s'il se tait, une question sur le stade, l'appel. **Le prix et l'accord de confidentialité se traitent à l'appel, jamais dans le fil.**

## 🔴 2026-09-08 : la touche 1 automatique NE PART PLUS

Tout ce qui suit décrit la séquence telle qu'elle est conçue. **Elle est à
l'arrêt en émission**, et deux murs différents la bloquent :

1. `appsecret_proof` depuis le 2026-09-02 : aucun appel à l'API Meta ne passe,
   donc aucun template n'est même tenté.
2. La configuration de paiement du compte WhatsApp, jamais reprouvée depuis le
   2026-08-07 : ce jour-là, quatre messages ont été acceptés par Meta puis
   refusés à la livraison. Lever le premier mur ne lève pas celui-ci.

Les deux dépendent de Dualhook, pas du code. **Ne pas relancer de campagne à
formulaire Meta tant que ce n'est pas levé** : chaque lead payé créerait une
fiche que personne ne contacterait.

Le chemin « landing page → bouton WhatsApp », lui, fonctionne : le prospect
écrit en premier, la réception n'utilise pas l'API bloquée.

Verdict à jour, interrogé chez Meta en vrai : `npm run verifier-pubs` dans
`nowork`. État complet : `nowork/documentation/context/en-cours.md`.

## Le formulaire Meta (référence exacte)

- Intro : « Ton projet d'application — Je transforme ton idée en application qui génère des revenus. À partir de 5 000 € · Ton idée reste confidentielle (NDA). »
- Q1 « Où en es-tu avec ton projet d'application ? » : J'ai juste une idée / J'y réfléchis sérieusement / Je veux démarrer bientôt / Je suis prêt (budget / financement en place)
- Q2 « Quel budget as-tu prévu pour ton application ? » : Moins de 5 000 € / 5 000-10 000 € / 10 000-20 000 € / Plus de 20 000 €
- Coordonnées pré-remplies par Meta en un clic : nom complet, e-mail, téléphone.
- Écran de fin : « Je te recontacte dans la journée. Tu veux aller plus vite ? Écris-moi sur WhatsApp… » + bouton vers `noecalmes.fr/whatsapp`.

Les leads tombent en temps réel dans la Google Sheet Meta (connexion native).

## Mise à jour 2026-07-19 — touche 1 automatisée

La touche 1 ne dépend plus de l'import manuel (délai 24-48h) : elle part **automatiquement à T+10 min** après le formulaire, via Nowork (Sheet → Apps Script → Cloud Function → template WhatsApp Cloud API). Dédoublonnage automatique : lead déjà client ou qui a déjà écrit sur WhatsApp = pas d'envoi. Fenêtre d'envoi : lundi-samedi 9h-21h, sinon report au prochain créneau (dimanche → lundi 9h). Les touches 2-4 restent manuelles, pilotées par le CRM. Spec complète : `nowork/documentation/systems/lead-auto-import.md`.

## Principes

1. **Vitesse** : le message 1 part automatiquement à T+10 min après le lead (cf. mise à jour 2026-07-19). Le taux de réponse chute massivement après 24h (étude Lead Response Management : contacté < 5 min = ~21x plus de chances de qualifier qu'à 30 min). Les dix minutes sont un choix assumé : elles laissent au lead motivé le temps d'écrire en premier — l'écran de fin du formulaire l'y invite — auquel cas l'envoi automatique est annulé, la conversation est initiée par lui, et le template n'est pas facturé.
2. **4 touches max sur 12 jours.** Au-delà, on brûle le lead.
3. **Un seul levier par message** (question OU preuve OU voix OU clôture). Jamais d'empilement.
4. **Une seule question par message**, la plus facile possible.
5. **Jamais « c'est toujours d'actualité ? »** ni aucune formulation qui invite le « non ».
6. **Pas de prix dans le fil.** Fourchette uniquement si le prospect la demande, le chiffre à l'appel. Expliqué de vive voix, le prix passe (« ok, je comprends ») ; écrit à froid dans WhatsApp, il fait fuir des gens qui auraient dit oui. On n'ancre donc pas le budget par écrit, même pour un lead dont on ne sait rien : la question « tu en es où ? » écarte les curieux, et un appel de 15 minutes pour rien coûte moins cher qu'un projet perdu.
7. **Le visuel offert n'est jamais promis dans les relances.** Il se débloque en conversation, quand on a assez d'infos, comme récompense (« ton projet tient la route »).
8. **Le visuel complet ne s'envoie jamais sur WhatsApp.** Teaser (1 capture) dans le chat, le reste se montre à l'appel. C'est l'aimant à rendez-vous.
9. Chaque message tient sur un écran de téléphone sans scroller. Pas d'emoji en message 1.
10. Heures d'envoi des touches 2-4 : 12h-13h30 ou 18h-20h en semaine. Pas le dimanche matin. (La touche 1 auto suit sa propre fenêtre : 9h-21h lun-sam, la vitesse prime.)
11. **Pas de NDA proposé par écrit.** Cette cible n'aime pas les mots « contrat » et « confidentialité » avant d'avoir parlé à quelqu'un. L'accord se propose à la fin de l'appel, avec le devis et la maquette, comme le prévoit le script d'appel ; plus tôt **seulement si le prospect hésite lui-même** à dévoiler son idée. La question « c'est quoi, et pour qui ? » ne demande rien de secret : personne ne se fait voler une idée en disant « une app de coaching sportif pour particuliers ».
12. **Pas de présentation quand c'est lui qui écrit** : son téléphone affiche déjà « Noé Calmes ». Quand c'est nous qui écrivons en premier (formulaire), une présentation en trois mots, « ici Noé Calmes », jamais « c'est Noé ».

## La séquence

| Touche | Quand | Canal | Levier |
|---|---|---|---|
| 1 | J0, dans l'heure | WhatsApp | Question (l'idée) |
| 2 | J+2 | WhatsApp | Preuve (lien projets) + même question, autre forme |
| 3 | J+5 | Appel, puis WhatsApp si pas de réponse | La voix |
| 4 | J+12 | WhatsApp | Clôture digne |

### Touche 1 — J0 (à la main depuis Nowork tant que l'API est coupée)

Le texte qui part est le modèle Nowork **« Premier contact »** (page Templates), que la fenêtre « Premier message » de la carte CRM reprend mot pour mot (texte du 7 octobre 2026) :

```
Bonjour {prénom}, ici Noé Calmes (noecalmes.fr).
Tu as rempli mon formulaire pour ton projet d'application.
C'est quoi ton idée, en deux phrases : c'est quoi, et pour qui ?
```

⚠️ Le template Meta `premier_contact_lead` (celui de l'envoi automatique à T+10 min) porte encore l'ancien texte, « c'est Noé, je conçois des applications mobiles… dans les grandes lignes ? ». Le jour où l'envoi automatique repart, soumettre un template au texte du modèle Nowork, sinon un lead contacté à la main et un lead contacté par l'API ne reçoivent pas la même chose (rappel dans `nowork/documentation/context/en-cours.md`). Si le lead écrit en premier, le message ne part pas : c'est une conversation classique, voir « Leads qui écrivent en premier ».

Variante stade « prêt / financement en place » :

```
Bonjour {prénom}, ici Noé Calmes (noecalmes.fr).
Tu as indiqué être prêt à démarrer ton projet d'application.
C'est quoi ton idée, en deux phrases : c'est quoi, et pour qui ?
```

Variante lead sans formulaire (vieux lead, contact hors campagne) :

```
Bonjour {prénom}, ici Noé Calmes (noecalmes.fr).
Tu t'étais renseigné il y a quelque temps pour créer une application.
C'est quoi ton idée, en deux phrases : c'est quoi, et pour qui ?
```

Règle d'ancrage : toujours ouvrir sur le fait le plus précis et vrai qu'on a (formulaire rempli, stade coché, simple renseignement). Jamais « j'ai vu que tu étais intéressé » : effet surveillance.

Notes : le domaine entre parenthèses = vérification d'identité passive (il peut voir qui je suis sans répondre), pas un CTA. « En deux phrases : c'est quoi, et pour qui » borne la question : il sait exactement quoi répondre, et il ne livre rien de secret. Pas de « quand es-tu disponible ? » ici : c'est une question ouverte sur un engagement, posée à quelqu'un qui n'a pas encore de raison de donner son temps ; l'appel se propose après l'idée et le stade, avec deux créneaux.

### Touche 2 — J+2

```
{prénom}, je n'ai pas eu de retour de ta part.
Dis-moi en une phrase ce que tu veux créer, je te dis comment je le lancerais.
Mes projets : noecalmes.fr/projets
```

Pas de proposition d'appel tant que la personne n'a jamais répondu : la séquence monte seule en pression (message → message → voix à J+5). L'appel se propose par écrit uniquement à un lead qui a déjà répondu.

Une relance assume d'être une relance : on référence le silence (factuel, sans reproche), on ne se représente pas (il sait qui écrit, c'est le même fil), pas de « Bonjour » répété, et jamais « c'est toujours d'actualité ? ». « Je te dis ce que j'en pense » = raison de répondre (avis d'expert contre une phrase).

### Touche 3 — J+5 : appel

Créneaux : 11h30-12h30 ou 17h-19h. S'il ne décroche pas, **message vocal sur sa
messagerie**, puis message WhatsApp dans la foulée.

**Le message vocal** (version du 07/10/2026, vit aussi dans Nowork, page Script
d'appel, bouton rouge « Messagerie ») :

```
Bonjour, Noé Calmes à l'appareil.

Vous avez laissé vos coordonnées sous une de mes publicités, pour un projet
d'application.

Je conçois des applications pensées pour générer des revenus. Rappelez-moi,
ou répondez-moi sur WhatsApp : je vous dis si votre idée peut fonctionner,
et vous rapporter.

Bonne journée.
```

Une quarantaine de mots, moins de 20 secondes, un seul souffle. Au
**vouvoiement** : la personne ne nous attend pas et ne nous connaît pas, c'est
l'appel à l'improviste. **Sans prénom** : la fiche d'un lead n'a pas toujours le
sien, et quand le champ porte un nom de famille, le vocal le disait à voix
haute. La version précédente (70 mots, 27 secondes, au tutoiement) a été
retirée le 07/10 ; Nowork remplace de lui-même toute copie enregistrée qui
porte encore « Tu as laissé tes coordonnées ».

Ce que la mesure dit de ce message (Gong, 300 millions d'appels) : les
prospects rappellent rarement après un vocal, mais le vocal **double la réponse
sur le WhatsApp qui suit** (2,7 % → 5,9 %). Donc on juge ce message aux
réponses WhatsApp dans les 48 h, pas aux rappels. Pas plus de trois vocaux par
lead au total, au-delà l'effet s'effondre.

Pourquoi « sous une de mes publicités » et pas « sur Instagram » : il a validé
un formulaire pré-rempli par Meta en trois secondes, il ne se souvient pas du
réseau. « Mes publicités » lui rend le souvenir et dit au passage que Noé est
une vraie activité, pas un démarcheur.

Le WhatsApp qui suit :

```
{prénom}, je viens d'essayer de t'appeler pour ton projet d'application.
Rappelle-moi quand tu as un moment, ou réponds ici, comme tu préfères.
```

### Touche 4 — J+12 : clôture

```
{prénom}, je clôture mon suivi sur ton projet d'application pour cette fois.
Si l'envie revient dans 1 mois ou dans 6, écris-moi ici.
Bonne continuation !
```

Règle transverse : « Bonjour » + « ici Noé Calmes » uniquement au message 1, et uniquement quand c'est nous qui écrivons en premier. Ensuite on est dans un fil de conversation, on parle normalement ({prénom} ou rien).

Puis stop. Classer le lead dans Nowork (cycle long), plus aucune relance.

## Leads qui écrivent en premier (publicité « clic vers WhatsApp », bouton du site, fin d'audit)

C'est l'entrée principale tant que l'API est coupée : le lead écrit, la réception ne dépend d'aucune API, et personne n'a de message à lui envoyer en premier. Il arrive avec un texte pré-rempli, le même partout (ne pas y mettre la source, la vidéo ou le support : le suivi Meta le sait, et le support se tranche à l'appel) :

```
Bonjour Noé, j'ai une idée d'application, on peut en parler ?
```

**Le message de bienvenue automatique** de l'application WhatsApp Business (Outils professionnels > Message de bienvenue > destinataires : tout le monde). Il part dans la seconde au premier message d'un nouveau contact, sans l'API : c'est lui qui pose la première question à notre place, et c'est ce qui tient la règle des 5 minutes même quand Noé développe.

```
Bonjour, bien reçu. Je te réponds dans la journée.
En attendant, dis-moi ton idée en deux phrases : c'est quoi, et pour qui ? Pas besoin d'entrer dans les détails.
```

**Le premier message de Noé**, seulement s'il n'a pas répondu au message automatique (sinon on passe directement à l'étape suivante). Pas de présentation, son téléphone affiche déjà le nom ; pas de lien, pas de prix :

```
Bonjour {prénom}. C'est quoi ton idée, en deux phrases : c'est quoi, et pour qui ?
```

Ensuite, le chemin est le même que pour un lead formulaire : la section suivante.

## Dès qu'il répond : le chemin vers l'appel

Objectif unique : l'appel de 15 minutes. Le funnel :

il donne son idée → une question sur le stade → l'appel, deux créneaux → appel (cadrage + fourchette + accord de confidentialité en fin d'appel) → devis sous 48h.

Deux questions avant l'appel, pas plus : c'est ce que la page `/rendez-vous` promet (« on voit en 2 messages si ton projet tient la route »), et c'est ce qui filtre les curieux sans parler d'argent. Pour un lead formulaire ou audit, dont on connaît déjà le stade, une seule question suffit : l'idée, puis l'appel.

Le visuel offert n'est PAS une étape obligatoire : c'est le joker pour ceux qui hésitent à prendre l'appel.

**1. Il donne son idée** → valider, puis le stade (trois choix, il répond en deux mots) :

```
Ok, ça se tient, je vois comment lancer un projet comme ça.
Tu en es où : juste l'idée, tu y réfléchis sérieusement, ou tu veux démarrer bientôt ?
```

**1 bis. Il a répondu** → l'appel. « Budget et délai de vive voix » annonce que le prix se parle à l'appel, ce qui coupe le « c'est combien ? » :

```
Parfait. On s'appelle 15 minutes : tu m'expliques ton idée, je te dis concrètement comment je la lancerais, et on parle budget et délai de vive voix.
Plutôt demain 12h30 ou jeudi 18h ?
```

« Juste l'idée » sans audience ni activité derrière → l'audit plutôt que l'appel (voir « Stade juste une idée qui patine »). « Juste l'idée » mais un coach, un commerçant, un formateur avec des clients → l'appel quand même : l'audience vaut plus que le stade.

**2. Caler le rendez-vous** (Calendly retiré du funnel, voir `tunnel.md` : tout se cale à la main dans le chat) :

- Toujours deux créneaux fermés, jamais « quand es-tu dispo ? »
- Créneaux sous 48h : un lead chaud se refroidit vite
- Confirmation immédiate : « Parfait, je t'appelle jeudi à 18h sur ce numéro. »
- Rappel le matin même pour tuer le no-show : « On se parle à 18h comme prévu, à tout à l'heure. »

**3. S'il hésite à prendre l'appel** → sortir le joker visuel :

```
Je te propose mieux : je te prépare un premier visuel de ton application, offert, et je te le montre pendant l'appel. Comme ça tu ne viens pas pour discuter, tu viens voir ton application. Demain 12h30 ou jeudi 18h ?
```

Réciprocité + curiosité (il vient voir SON application), et le visuel se montre à l'appel, il ne s'envoie jamais avant.

## Réponses aux situations courantes

**Il hésite à prendre l'appel :**

```
Aucun engagement derrière, c'est 15 minutes : tu vois ton application en visuel, tu sais combien elle coûterait et en combien de temps elle sort. Au pire tu repars avec des idées plus claires.
```

**Il demande le prix avant l'appel** (le seul cas où un chiffre s'écrit, et jamais seul : le prix et la question qui relance) :

```
Ordre d'idée : une première version démarre à 5 000 €, un projet complet plutôt 8 000 à 12 000.
Le chiffre précis, je te le donne à l'appel, une fois ton idée cadrée. C'est quoi, et pour qui ?
```

**Il veut une visio ou se voir :**

```
On commence par 15 minutes au téléphone, c'est le plus efficace pour cadrer. Ensuite je te prépare un visuel de ton application et on le regarde ensemble en visio.
Plutôt demain 12h30 ou jeudi 18h ?
```

**Il ne décroche pas à l'heure de l'appel** (le jour même, un seul message, un seul report ; au deuxième, la séquence silence reprend à J+5) :

```
J'ai essayé de t'appeler à 18h comme prévu. On décale à demain 12h30 ou jeudi 18h ?
```

**« C'est trop cher » :**

```
Je comprends. Une agence facture 15 000 à 30 000 € pour le même travail, et moi c'est un tarif fixe, zéro surprise.
Et on peut ajuster la première version à ton budget. Tu avais prévu quelle enveloppe ?
```

**« Je ne veux pas trop dévoiler mon idée »** (le seul moment où l'accord de confidentialité s'écrit : en réponse à une peur exprimée, jamais avant) :

```
Normal, et c'est bon signe. Pas besoin des détails : juste le domaine et pour qui.
Et si on avance ensemble, je te signe un accord de confidentialité avant que tu me montres quoi que ce soit.
```

**Financement pas encore prêt** (cycle long, ne pas jeter, voir Offre C dans `strategie-commerciale.md`) :

```
Ça tombe bien, ça se prépare. Je peux te monter un dossier clair (visuel, périmètre, budget, étapes) pour convaincre ta banque ou ton associé. On cale 15 minutes pour en parler ?
```

**« Je vais réfléchir »** → donner une date, relancer à J+14 :

```
Bien sûr, prends ton temps. Je te refais signe dans 2 semaines, et si une question te vient d'ici là, écris-moi ici, je réponds 6j/7.
```

**Silence après le teaser (J+3 après envoi) :**

```
Tu as vu l'aperçu ? Réponds-moi juste en un mot : c'est ce que tu avais en tête, ou pas du tout ?
```

**Stade « juste une idée » qui patine** → l'audit automatisé plutôt que du temps offert :

```
J'ai un outil qui va t'aider : un audit gratuit de 2 minutes qui te donne le potentiel de ton idée, le budget à prévoir et le délai. Je t'envoie le lien ?
```

**Budget fantaisiste (300 €, « un dev pas cher »)** → sortie polie :

```
Je préfère être direct : à ce budget, personne ne peut te faire du travail sérieux. Teste ton idée en no-code, et le jour où tu passes à l'étape supérieure, écris-moi.
```

## Répartition de la preuve (jamais tout d'un coup)

- Message 1 : noecalmes.fr (identité)
- Touche 2 : noecalmes.fr/projets (réalisations)
- Conversation : « +20 applications publiées » si besoin de crédibilité
- « Joignable 6j/7 » : une fois, dans « je vais réfléchir »
- Angle revenus complet : à l'appel, pas avant

## Suivi

Chaque lead entre dans Nowork avec son stade et sa dernière touche. Après la clôture J+12 : cycle long, relance éventuelle par campagne (voir `positionnement.md`, anciens prospects).
