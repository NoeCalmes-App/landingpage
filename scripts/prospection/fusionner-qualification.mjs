#!/usr/bin/env node
// Rassemble les fiches de qualification (recherche web faite par Claude) dans un CSV.
//
// Entrée : un dossier de fichiers JSON, chacun un tableau de fiches, écrits par la
// commande « qualifier-signaux » (.claude/skills/qualifier-signaux/SKILL.md).
// Sortie : prospects-signaux/qualifies-AAAA-MM-JJ.csv, trié « À contacter »,
// puis « À creuser », puis « À écarter ». Le dossier est ignoré par git.
//
// Usage :
//   node scripts/prospection/fusionner-qualification.mjs prospects-signaux/qualification-2026-11-02

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const dossier = process.argv[2];
if (!dossier) {
  console.error('Usage : node scripts/prospection/fusionner-qualification.mjs <dossier des fiches JSON>');
  process.exit(1);
}

const fiches = readdirSync(dossier)
  .filter((f) => /^fiches-.*\.json$/.test(f))
  .flatMap((f) => JSON.parse(readFileSync(join(dossier, f), 'utf8')));

const ORDRE = ['À contacter', 'À creuser', 'À écarter'];
const rang = (v) => {
  const i = ORDRE.findIndex((o) => String(v ?? '').startsWith(o));
  return i < 0 ? ORDRE.length : i;
};
fiches.sort((a, b) => rang(a.verdict) - rang(b.verdict));

const COLONNES = [
  ['verdict', 'Verdict'], ['raison', 'Pourquoi'], ['entreprise', 'Entreprise'], ['siren', 'SIREN'],
  ['ce_quil_fait', 'Ce qu\'il fait'], ['app_existe', 'App déjà en ligne ?'], ['dirigeant_technique', 'Fondateur technique ?'],
  ['preuves_argent', 'Preuves d\'argent'], ['signes_argent', 'Signes d\'argent'], ['signes_timing', 'Démarre bientôt ?'],
  ['reseaux', 'Vu sur les réseaux'], ['pubs', 'Pubs Meta et Google'],
  ['telephone', 'Téléphone'], ['type_telephone', 'Mobile ou fixe'], ['email', 'Email'], ['site', 'Site'],
  ['instagram', 'Instagram'], ['linkedin', 'LinkedIn'], ['facebook', 'Facebook'],
  ['accroche', 'Accroche'], ['message', 'Message prêt'], ['sources', 'Sources'],
  ['', 'Canal'], ['', 'Message envoyé le'], ['', 'Relance le'], ['', 'Réponse'], ['', 'Statut'],
];
const cellule = (v) => {
  const s = String(v ?? '');
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const lignes = [
  COLONNES.map(([, t]) => cellule(t)).join(','),
  ...fiches.map((f) => COLONNES.map(([c]) => cellule(c ? f[c] : '')).join(',')),
];
const date = basename(dossier).replace(/^qualification-/, '');
const sortie = join(dossier, '..', `qualifies-${date}.csv`);
writeFileSync(sortie, '﻿' + lignes.join('\n'), 'utf8');

const compte = Object.fromEntries(ORDRE.map((o) => [o, fiches.filter((f) => rang(f.verdict) === ORDRE.indexOf(o)).length]));
console.log(`${fiches.length} fiches écrites dans ${sortie}`);
console.log(ORDRE.map((o) => `${o} : ${compte[o]}`).join(' · '));
