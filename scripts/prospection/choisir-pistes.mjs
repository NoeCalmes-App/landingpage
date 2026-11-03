#!/usr/bin/env node
// Choisit les pistes à qualifier par recherche web, dans la dernière liste de signaux.
//
// Garde les meilleures notes et écarte :
//   - les pistes déjà qualifiées une semaine précédente (même SIREN) ;
//   - celles dont un fondateur dirige une société informatique ;
//   - celles dont l'application est déjà sur l'App Store.
// Ajoute ensuite les campagnes Ulule pas encore qualifiées
// (scripts/prospection/campagnes-ulule.mjs), les nouvelles puis les plus grosses collectes.
// Leur identifiant remplace le SIREN : « ulule-123456 ».
//
// Usage :
//   node scripts/prospection/choisir-pistes.mjs            # 16 pistes BODACC note 8 ou plus, 4 Ulule
//   node scripts/prospection/choisir-pistes.mjs --nombre 12 --note-min 9 --ulule 0
//
// Sortie : prospects-signaux/qualification-AAAA-MM-JJ/pistes.json (dossier ignoré par git).

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER = join(RACINE, 'prospects-signaux');
const args = process.argv.slice(2);
const lireArg = (nom, defaut) => {
  const i = args.indexOf(nom);
  return i >= 0 ? Number(args[i + 1]) : defaut;
};
const NOMBRE = lireArg('--nombre', 16);
const NOTE_MIN = lireArg('--note-min', 8);
const ULULE = lireArg('--ulule', 4);

function lireCSV(texte) {
  const s = texte.replace(/^﻿/, '');
  const lignes = [];
  let ligne = [];
  let champ = '';
  let guillemets = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (guillemets) {
      if (c === '"') { if (s[i + 1] === '"') { champ += '"'; i++; } else guillemets = false; } else champ += c;
    } else if (c === '"') guillemets = true;
    else if (c === ',') { ligne.push(champ); champ = ''; }
    else if (c === '\n') { ligne.push(champ); lignes.push(ligne); ligne = []; champ = ''; }
    else if (c !== '\r') champ += c;
  }
  if (champ || ligne.length) { ligne.push(champ); lignes.push(ligne); }
  const [entetes, ...reste] = lignes.filter((l) => l.length > 5);
  return reste.map((l) => Object.fromEntries(entetes.map((e, i) => [e, l[i] ?? ''])));
}

// La liste de signaux la plus récente.
const listes = readdirSync(DOSSIER).filter((f) => /^signaux-du-.*\.csv$/.test(f))
  .map((f) => ({ f, t: statSync(join(DOSSIER, f)).mtimeMs })).sort((a, b) => b.t - a.t);
if (!listes.length) {
  console.error('Aucune liste de signaux : lance d\'abord node scripts/prospection/signaux-bodacc.mjs');
  process.exit(1);
}
const source = listes[0].f;

// Les SIREN déjà qualifiés, toutes semaines confondues.
const dejaVus = new Set();
for (const d of readdirSync(DOSSIER).filter((d) => /^qualification-/.test(d) && statSync(join(DOSSIER, d)).isDirectory())) {
  for (const f of readdirSync(join(DOSSIER, d)).filter((f) => /^fiches-.*\.json$/.test(f))) {
    for (const fiche of JSON.parse(readFileSync(join(DOSSIER, d, f), 'utf8'))) {
      const id = String(fiche.siren);
      dejaVus.add(/^ulule-/.test(id) ? id : id.replace(/\D/g, ''));
    }
  }
}

const siren = (p) => p['Fiche entreprise'].split('/').pop();
const pistes = lireCSV(readFileSync(join(DOSSIER, source), 'utf8'))
  .filter((p) => Number(p.Score) >= NOTE_MIN)
  .filter((p) => !dejaVus.has(siren(p)))
  .filter((p) => !p['Fondateur technique ?'] && !/^Oui/.test(p['App déjà en ligne ?']))
  .slice(0, NOMBRE)
  .map((p) => ({
    siren: siren(p), score: p.Score, pourquoi: p.Pourquoi, signal: p.Signal, date: p['Publié le'], entreprise: p.Entreprise,
    nom_commercial: p['Nom commercial'], dirigeant: p.Dirigeant, forme: p.Forme, capital: p['Capital (€)'],
    hausse_capital: p['Hausse de capital'] ?? '', preuves_argent_registres: p['Preuves d\'argent (registres)'] ?? '',
    existe_depuis: p['Existe depuis'], autres_entreprises: p['Autres entreprises du fondateur'],
    ville: p.Ville, departement: p['Département'], activite: p['Activité déclarée'].slice(0, 900), lien_bodacc: p['Annonce BODACC'],
  }));

// Les campagnes Ulule de la dernière liste jamais qualifiées. Pas seulement les
// « nouvelles » : celles qui n'ont pas eu de place une semaine passent la suivante.
const listesUlule = readdirSync(DOSSIER).filter((f) => /^ulule-.*\.csv$/.test(f)).sort();
if (ULULE > 0 && listesUlule.length) {
  const campagnes = lireCSV(readFileSync(join(DOSSIER, listesUlule.at(-1)), 'utf8'))
    .filter((c) => !dejaVus.has(c.Identifiant))
    .slice(0, ULULE);
  for (const c of campagnes) {
    pistes.push({
      siren: c.Identifiant, score: '', signal: 'Campagne Ulule', date: c['Publié le'],
      pourquoi: `a collecté ${Number(c['Collecté (€)']).toLocaleString('fr-FR')} € sur Ulule (${c['%']} % de l'objectif, campagne ${c.Campagne}) pour son application`,
      entreprise: c.Projet, nom_commercial: c.Projet, dirigeant: c.Porteur, profil_ulule: c['Profil Ulule'],
      ville: c.Ville, activite: c['Activité déclarée'], a_quoi_sert_l_argent: c['À quoi sert l\'argent'],
      qui_ils_sont: c['Qui ils sont'], lien_ulule: c.Lien,
    });
  }
  console.log(`${campagnes.length} campagnes Ulule ajoutées (${listesUlule.at(-1)}).`);
}

const jour = new Date().toISOString().slice(0, 10);
const sortie = join(DOSSIER, `qualification-${jour}`);
mkdirSync(sortie, { recursive: true });
const fichier = join(sortie, 'pistes.json');
if (existsSync(fichier)) console.log(`(${fichier} existait déjà : remplacé)`);
writeFileSync(fichier, JSON.stringify(pistes, null, 1));
console.log(`Source : ${source}`);
console.log(`${pistes.length} pistes à qualifier (note ${NOTE_MIN} ou plus, ${dejaVus.size} déjà qualifiées écartées) dans ${fichier}`);
pistes.forEach((p, i) => console.log(`  ${i} · ${p.score} · ${p.nom_commercial || p.entreprise} (${p.ville})`));
