#!/usr/bin/env node
// Le récapitulatif du lundi pour Noé : le premier message de chaque personne,
// et sous chacun, qui c'est. Le reste (relance, réponses) une seule fois en bas.
// Demandé le 05/11/2026 (« ce récap, à faire chaque lundi ? »).
//
// Entrée : un ou plusieurs dossiers de qualification. Seules les fiches « À
// contacter » y entrent, les plus solides en premier (`rang`, puis le nombre de
// preuves d'argent fortes).
// Sortie : prospects-signaux/a-envoyer-AAAA-MM-JJ.md, à envoyer à Noé avec le
// tableau. Le dossier est ignoré par git.
//
// Usage :
//   node scripts/prospection/recap-a-envoyer.mjs prospects-signaux/qualification-2026-11-03

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { suite } from './ecrire-messages.mjs';

const dossiers = process.argv.slice(2);
if (!dossiers.length) {
  console.error('Usage : node scripts/prospection/recap-a-envoyer.mjs <dossier de qualification> [autres dossiers]');
  process.exit(1);
}
const jour = basename(dossiers.at(-1)).replace(/^qualification-/, '');
const dateFr = jour.split('-').reverse().join('/');

const fiches = dossiers.flatMap((dossier) => readdirSync(dossier)
  .filter((f) => /^fiches-.*\.json$/.test(f))
  .flatMap((f) => JSON.parse(readFileSync(join(dossier, f), 'utf8'))))
  .filter((f) => /contacter/i.test(f.verdict ?? ''));

const preuves = (f) => (String(f.preuves_argent ?? '').match(/·/g) ?? []).length + (f.preuves_argent && !/^aucune/i.test(f.preuves_argent) ? 1 : 0);
fiches.sort((a, b) => (a.rang ?? 50) - (b.rang ?? 50) || preuves(b) - preuves(a));

const court = (t, max) => {
  const s = String(t ?? '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const coupe = s.slice(0, max);
  const fin = Math.max(coupe.lastIndexOf('. '), coupe.lastIndexOf(' ; '));
  return (fin > max * 0.5 ? coupe.slice(0, fin + 1) : `${coupe.slice(0, coupe.lastIndexOf(' '))}…`).replace(/[\s;,]+$/, '');
};

// La première ligne du message dit le canal ; on ne garde que ce qui part en premier.
const premierEnvoi = (f) => {
  const lignes = String(f.message ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  const [canal, objet] = (lignes.shift() ?? '').split(/\s*Objet :\s*/);
  const corps = lignes.filter((l) => !/^(Relance|Si ouvert|Si oui|Si déjà|Si non|Si «|Si pas de WhatsApp)/.test(l)).map((l) => l.replace(/^Message 1 : /, ''));
  if (objet) corps.unshift(`**Objet :** ${objet.replace(/\.$/, '')}`);
  return { canal: canal.replace(/, en un seul message/, '').replace(/\.$/, ''), corps: corps.join('\n') };
};

const parties = [
  `# À envoyer, ${dateFr}`,
  '',
  `${fiches.length} personne${fiches.length > 1 ? 's' : ''} à contacter. Copie le texte tel quel. La suite est en bas, et sur l'icône message de chaque fiche Nowork.`,
];
fiches.forEach((f, i) => {
  const { canal, corps } = premierEnvoi(f);
  const lien = f.linkedin && /^https?:/.test(f.linkedin) && /linkedin/i.test(canal) ? `\n${f.linkedin}` : '';
  parties.push('', `## ${i + 1}. ${f.contact || f.nom || f.entreprise}, ${canal}${lien}`, corps, '', `*${f.qui_cest || court(f.raison, 220)}*`);
});
parties.push('', '## La suite, pour tout le monde', '**Si le numéro n\'a pas WhatsApp :** le même message par SMS, sans le lien. Il est prêt sur l\'icône message de la fiche.', '');
for (const [titre, texte] of suite({ prenom: '[Prénom]', projet: '[Nom du projet]', ou: '[où]', provenance: 'dans les annonces légales', maquette: '[la maquette]' })) {
  parties.push(`**${titre} :** ${texte}`, '');
}
parties.push('Rien à J+10 : on arrête. Un non : on ne réécrit jamais.');

const sortie = join(dossiers.at(-1), '..', `a-envoyer-${jour}.md`);
writeFileSync(sortie, parties.join('\n') + '\n', 'utf8');
console.log(`${fiches.length} message(s) dans ${sortie}`);
