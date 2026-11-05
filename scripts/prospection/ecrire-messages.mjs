#!/usr/bin/env node
// Écrit les messages de prospection d'une fiche, toujours avec les mêmes mots.
//
// Le modèle a été fixé avec Noé le 05/11/2026, après de nombreuses versions
// refusées (« trop long », « pourquoi tu mets tout ça », « trop direct », « ça me
// fait passer pour un prestataire »). Le premier message dit qui écrit et ce
// qu'il crée, avec sa preuve, ce qu'il a vu, et propose d'en parler. Il reste
// personnel grâce à `je_cree`, `vu` et `maquette`.
//
// Ce que la fiche doit donner : `canal_ligne` (« WhatsApp au 06… », « Email à …»,
// « LinkedIn à … », « Instagram à … »), `je_cree` selon son projet (« des SaaS qui
// génèrent des revenus », « des applications qui génèrent des revenus », ou « des
// applications sur mesure » si son projet ne se vend pas), `vu` (« J'ai vu que
// vous lanciez X. »), `source_contact` (« votre site », « votre LinkedIn »).
// En option : `question`, par défaut « Ça vous dirait d'en parler ? », `projet` s'il
// diffère de `nom`, et `maquette` (« l'application X »), par défaut « votre projet ».
//
// Usage :
//   node scripts/prospection/ecrire-messages.mjs prospects-signaux/qualification-2026-11-03

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Les messages qui suivent le premier. Les réponses doivent sonner comme Noé qui
// tape sur son téléphone, et finir sur une question : « Si vous préférez que je
// ne vous écrive plus » perdait la vente (Noé, 05/11/2026 : « ça fait IA »).
export const suite = ({ prenom, projet, ou, provenance, maquette, email, reseau }) => [
  [email ? 'Relance à J+4' : 'Relance à J+3', `Bonjour ${prenom}, je reviens vers vous pour ${projet}. 15 minutes au téléphone, et je vous prépare la maquette de ${maquette}, gratuitement. Un oui ou un non me suffit.`],
  ['Si oui', 'Super ! 15 minutes au téléphone, je vous donne mon avis sur le projet, gratuitement. Quand êtes-vous disponible ?'],
  ['Si déjà quelqu\'un', 'Parfait, bonne continuation avec le projet ! Si un jour vous avez besoin d\'un autre avis, n\'hésitez pas.'],
  ['Si « qui êtes-vous ? »', 'Noé ! Je crée des applications pour des entrepreneurs qui n\'ont pas de développeur, plus d\'un million de téléchargements à ce jour. Pas une agence, c\'est moi que vous avez en direct. Vous pouvez voir sur noecalmes.fr. Et vous, vous en êtes où ?'],
  ['Si « comment m\'avez-vous trouvé ? »', `${reseau ? `Via ${ou} !` : email ? `Elle est sur ${ou} !` : `Il est sur ${ou} !`} J'ai vu passer ${projet} ${provenance}, et je me suis dit que ça valait un message. Vous en êtes où ?`],
  ['Si non merci', `Pas de souci, merci d'avoir répondu. Bonne continuation avec ${projet}.`],
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
  const reseau = /^(linkedin|instagram)/i.test(canal);
  const question = f.question || 'Ça vous dirait d\'en parler ?';
  const preuve = `je crée ${f.je_cree}, plus d'un million de téléchargements à ce jour.`;
  const lignes = suite({ prenom, projet, ou: f.source_contact, provenance: provenanceDe(f.siren), maquette: f.maquette || 'votre projet', email, reseau })
    .map(([titre, texte]) => `${titre} : ${texte.replace('Bonjour ,', 'Bonjour,')}`);
  if (email) {
    return [`${canal}, en un seul message. Objet : ${projet}, une question.`,
      `${salut}, moi c'est Noé, ${preuve} ${f.vu} ${question}`,
      'Si ce n\'est pas le moment, dites-le-moi.', 'Noé Calmes, noecalmes.fr', ...lignes].join('\n');
  }
  const premier = `${salut}, moi c'est Noé (noecalmes.fr), ${preuve} ${f.vu} ${question}`;
  // Par SMS, pas de lien : venant d'un inconnu, un lien dans un SMS fait arnaque.
  const sms = /^whatsapp/i.test(canal) ? [`Si pas de WhatsApp, par SMS : ${premier.replace(' (noecalmes.fr)', '')}`] : [];
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
      const manque = ['canal_ligne', 'je_cree', 'vu', 'source_contact'].filter((c) => !String(fiche[c] ?? '').trim());
      if (manque.length) { console.log(`! ${fiche.nom || fiche.entreprise} : il manque ${manque.join(', ')}`); continue; }
      fiche.message = messageDe(fiche);
      change = true;
      ecrits++;
    }
    if (change) writeFileSync(chemin, JSON.stringify(fiches, null, 1));
  }
  console.log(`${ecrits} fiche(s) avec leurs messages.`);
}
