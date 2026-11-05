#!/usr/bin/env node
// Écrit les messages de prospection d'une fiche, toujours avec les mêmes mots.
//
// Le modèle a été fixé avec Noé le 05/11/2026, après plusieurs versions refusées
// (« trop long », « pourquoi tu mets tout ça », « il ne me connaît pas »). Le
// premier message reste court et répond d'avance aux deux questions d'un
// inconnu : qui êtes-vous, et comment avez-vous eu mon numéro. L'offre de
// maquette n'arrive qu'à la relance ou après une réponse.
//
// Ce que la fiche doit donner : `canal_ligne` (« WhatsApp au 06… », « Email à …»,
// « LinkedIn à … », « Instagram à … »), `compliment`, `question`, `source_contact`
// (« votre site », « votre LinkedIn ») et `projet` s'il diffère de `nom`.
//
// Usage :
//   node scripts/prospection/ecrire-messages.mjs prospects-signaux/qualification-2026-11-03

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Les messages qui suivent le premier, identiques pour tout le monde. Les
// réponses doivent sonner comme Noé qui tape sur son téléphone, et finir sur une
// question : « Si vous préférez que je ne vous écrive plus » perdait la vente au
// moment où la personne s'intéresse enfin (Noé, 05/11/2026 : « ça fait IA »).
export const suite = ({ prenom, projet, ou, provenance, email, reseau }) => [
  [email ? 'Relance à J+4' : 'Relance à J+3', `Bonjour ${prenom}, je peux vous faire gratuitement la maquette de votre application, pour la voir avant de vous lancer. Un oui ou un non me suffit.`],
  ...(email ? [] : [['Si réponse', 'Merci ! Si ça peut vous aider, je vous offre la maquette de l\'écran principal, pour voir votre application avant de vous lancer. Ça vous intéresse ?']]),
  ['Si oui', 'Super. 15 minutes au téléphone pour que je comprenne le projet, et je vous l\'envoie dans la semaine. Quand êtes-vous disponible ?'],
  ['Si « qui êtes-vous ? »', 'Noé ! Je crée des applications pour des entrepreneurs qui n\'ont pas de développeur, plus d\'un million de téléchargements à ce jour. Pas une agence, c\'est moi que vous avez en direct. Vous pouvez voir sur noecalmes.fr. Et vous, vous en êtes où ?'],
  ['Si « comment m\'avez-vous trouvé ? »', `${reseau ? `Via ${ou} !` : email ? `Elle est sur ${ou} !` : `Il est sur ${ou} !`} J'ai vu passer ${projet} ${provenance}, et je me suis dit que ça valait un message. Vous en êtes où ?`],
  ['Si non', `Pas de souci, merci d'avoir répondu. Bonne continuation avec ${projet}.`],
];

const provenanceDe = (siren) => {
  const id = String(siren);
  if (/^ulule-/.test(id)) return 'sur Ulule';
  if (/^ch-/.test(id)) return 'au registre du commerce suisse';
  if (/^mc-/.test(id)) return 'au Journal de Monaco';
  return 'dans les annonces légales';
};

export function messageDe(f) {
  const prenom = String(f.contact ?? '').trim().split(/\s+/)[0];
  const salut = prenom ? `Bonjour ${prenom}` : 'Bonjour';
  const projet = f.projet || f.nom;
  const canal = String(f.canal_ligne ?? '').replace(/\.$/, '');
  const email = /^email/i.test(canal);
  const lignes = suite({ prenom: prenom || '', projet, ou: f.source_contact, provenance: provenanceDe(f.siren), email, reseau: /^(linkedin|instagram)/i.test(canal) })
    .map(([titre, texte]) => `${titre} : ${texte.replace(/Bonjour ,/, 'Bonjour,')}`);
  if (email) {
    return [`${canal}, en un seul message. Objet : ${projet}, une question.`,
      `${salut}, moi c'est Noé Calmes, je crée des applications. ${f.compliment} ${f.question} Si ça peut vous aider, je vous offre la maquette de l'écran principal.`,
      'Si ce n\'est pas le moment, dites-le-moi.', 'Noé Calmes, noecalmes.fr', ...lignes].join('\n');
  }
  const whatsapp = /^whatsapp/i.test(canal);
  const numero = whatsapp ? ` Votre numéro est sur ${f.source_contact}.` : '';
  const premier = `${salut}, moi c'est Noé Calmes, je crée des applications (noecalmes.fr).${numero} ${f.compliment} ${f.question}`;
  // Par SMS, pas de lien : venant d'un inconnu, un lien dans un SMS fait arnaque.
  const sms = whatsapp ? [`Si pas de WhatsApp, par SMS : ${premier.replace(' (noecalmes.fr)', '')}`] : [];
  return [`${canal}.`, `Message 1 : ${premier}`, ...sms, ...lignes].join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dossier = process.argv[2];
  if (!dossier) {
    console.error('Usage : node scripts/prospection/ecrire-messages.mjs <dossier de qualification>');
    process.exit(1);
  }
  let ecrits = 0;
  for (const f of readdirSync(dossier).filter((x) => /^fiches-.*\.json$/.test(x))) {
    const chemin = join(dossier, f);
    const fiches = JSON.parse(readFileSync(chemin, 'utf8'));
    let change = false;
    for (const fiche of fiches) {
      if (!/contacter/i.test(fiche.verdict ?? '')) continue;
      const manque = ['canal_ligne', 'compliment', 'question', 'source_contact'].filter((c) => !String(fiche[c] ?? '').trim());
      if (manque.length) { console.log(`! ${fiche.nom || fiche.entreprise} : il manque ${manque.join(', ')}`); continue; }
      fiche.message = messageDe(fiche);
      change = true;
      ecrits++;
    }
    if (change) writeFileSync(chemin, JSON.stringify(fiches, null, 1));
  }
  console.log(`${ecrits} fiche(s) avec leurs messages.`);
}
