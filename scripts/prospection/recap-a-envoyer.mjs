#!/usr/bin/env node
// Le récapitulatif du lundi pour Noé : les messages à envoyer, et sous chacun,
// qui est la personne. Demandé le 05/11/2026 (« ce récap, à faire chaque lundi ? »).
//
// Entrée : le dossier de qualification du jour (les fiches JSON). Seules les
// fiches « À contacter » y entrent, les plus solides en premier.
// Sortie : prospects-signaux/a-envoyer-AAAA-MM-JJ.md, à envoyer à Noé avec le
// tableau. Le dossier est ignoré par git.
//
// Usage :
//   node scripts/prospection/recap-a-envoyer.mjs prospects-signaux/qualification-2026-11-03

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const dossier = process.argv[2];
if (!dossier) {
  console.error('Usage : node scripts/prospection/recap-a-envoyer.mjs <dossier de qualification>');
  process.exit(1);
}
const jour = basename(dossier).replace(/^qualification-/, '');
const dateFr = jour.split('-').reverse().join('/');

const fiches = readdirSync(dossier)
  .filter((f) => /^fiches-.*\.json$/.test(f))
  .flatMap((f) => JSON.parse(readFileSync(join(dossier, f), 'utf8')))
  .filter((f) => /contacter/i.test(f.verdict ?? ''));

// Les plus solides d'abord : celles qui ont le plus de preuves d'argent fortes.
const preuves = (f) => (String(f.preuves_argent ?? '').match(/·/g) ?? []).length + (f.preuves_argent && !/^aucune/i.test(f.preuves_argent) ? 1 : 0);
fiches.sort((a, b) => preuves(b) - preuves(a));

const court = (t, max) => {
  const s = String(t ?? '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const coupe = s.slice(0, max);
  const fin = Math.max(coupe.lastIndexOf('. '), coupe.lastIndexOf(' ; '));
  return (fin > max * 0.5 ? coupe.slice(0, fin + 1) : `${coupe.slice(0, coupe.lastIndexOf(' '))}…`).replace(/[\s;,]+$/, '');
};

// Le message, tel que la fiche l'écrit : la première ligne dit le canal et la
// coordonnée, les suivantes sont les messages 1, 2 et 3, ou l'email en un bloc.
const blocMessage = (f) => {
  const lignes = String(f.message ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  const [canal, objet] = (lignes.shift() ?? '').split(/\s*Objet :\s*/);
  const corps = lignes.map((l) => l.replace(/^Message \d[^:]*:/, (m) => `**${m.replace(/\s*:$/, '')} :**`));
  if (objet) corps.unshift(`**Objet :** ${objet.replace(/\.$/, '')}`);
  return { canal: canal.replace(/, en un seul message/, '').replace(/\.$/, ''), corps: corps.join('\n') };
};

const parties = [
  `# À envoyer, ${dateFr}`,
  '',
  `${fiches.length} personne${fiches.length > 1 ? 's' : ''} à contacter cette semaine. Sur WhatsApp, LinkedIn et Instagram : le message 1 seulement, le reste quand la personne répond. Par email : tout en un. Sous chaque message : qui c'est.`,
];
fiches.forEach((f, i) => {
  const { canal, corps } = blocMessage(f);
  const lien = f.linkedin && /^https?:/.test(f.linkedin) && /linkedin/i.test(canal) ? `\n${f.linkedin}` : '';
  parties.push('', `## ${i + 1}. ${f.contact || f.nom || f.entreprise}, ${canal}${lien}`, corps, '', `*${court(f.raison, 220)}*`);
});
parties.push('', '## Ensuite',
  '- Messagerie : message 2 à J+2 sans réponse, puis à J+6 « Bonjour [Prénom], toujours partant pour la maquette de [Nom] ? Un oui me suffit. » Rien à J+10 : on arrête.',
  '- Email : la même phrase à J+4, arrêt à J+10.',
  '- Un oui : l\'appel de 15 minutes, le script est dans Nowork. Le dossier complet est dans la bulle de chaque fiche.');

const sortie = join(dossier, '..', `a-envoyer-${jour}.md`);
writeFileSync(sortie, parties.join('\n') + '\n', 'utf8');
console.log(`${fiches.length} message(s) dans ${sortie}`);
