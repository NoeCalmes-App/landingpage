#!/usr/bin/env node
// Le vivier : les pistes « À creuser » des semaines passées, revues chaque lundi.
//
// Pourquoi : une piste est souvent écartée pour UN seul signe manquant, un
// démarrage pas encore daté, un contact absent, une application pas encore
// visible. Ce signe peut apparaître une semaine plus tard. Plutôt que de juger
// une fois, on refait chaque lundi les vérifications gratuites et on remonte
// les pistes qui ont bougé. Un tri unique devient un stock qui mûrit.
//
// Ce qu'il vérifie, sans navigateur et sans compte :
//   - une nouvelle annonce BODACC depuis la qualification (changement
//     d'activité, hausse de capital, nouveau dirigeant…) ;
//   - un nom de domaine .fr réservé depuis (listes de l'AFNIC, déjà en mémoire) ;
//   - un changement dans l'annuaire officiel : salariés, chiffre d'affaires
//     publié, nouveau dirigeant ;
//   - une application sortie sur l'App Store.
// Les réseaux, les pubs et Google Maps restent à la main, dans la commande du
// lundi, pour les pistes qui ont bougé.
//
// Usage :
//   node scripts/prospection/revoir-vivier.mjs            # toutes les « À creuser »
//   node scripts/prospection/revoir-vivier.mjs --mois 3   # seulement celles de moins de 3 mois
//
// Sortie : prospects-signaux/vivier-AAAA-MM-JJ.csv, et vivier.json avec les
// pistes qui ont bougé, que la commande du lundi fait requalifier (dossier
// ignoré par git).

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BODACC = 'https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/exports/json';
const ANNUAIRE = 'https://recherche-entreprises.api.gouv.fr/search';
const APP_STORE = 'https://itunes.apple.com/search';
const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER = join(RACINE, 'prospects-signaux');
const args = process.argv.slice(2);
const i = args.indexOf('--mois');
const MOIS = i >= 0 ? Number(args[i + 1]) : 12;
const aujourdhui = new Date();
const limite = new Date(aujourdhui.getTime() - MOIS * 30.5 * 86400000).toISOString().slice(0, 10);

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const json = (s) => { try { return JSON.parse(s || '{}'); } catch { return {}; } };
const premier = (x) => (Array.isArray(x) ? x[0] ?? {} : x ?? {});
const normaliser = (x) => String(x ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\b(sasu|sas|sarl|eurl|sa|sci|ltd|inc)\b/g, '').replace(/[^a-z0-9]/g, '');
const dateFr = (iso) => String(iso ?? '').slice(0, 10).split('-').reverse().join('/');

// ---------- Les « À creuser », une fiche par SIREN, la plus récente ----------
const fiches = new Map();
for (const d of readdirSync(DOSSIER).filter((d) => /^qualification-\d{4}-\d{2}-\d{2}$/.test(d) && statSync(join(DOSSIER, d)).isDirectory()).sort()) {
  const jour = d.replace('qualification-', '');
  for (const f of readdirSync(join(DOSSIER, d)).filter((f) => /^fiches-.*\.json$/.test(f))) {
    for (const fiche of JSON.parse(readFileSync(join(DOSSIER, d, f), 'utf8'))) {
      fiches.set(String(fiche.siren), { ...fiche, jour });
    }
  }
}
const vivier = [...fiches.values()].filter((f) => /creuser/i.test(f.verdict ?? '') && f.jour >= limite && /^\d{9}$/.test(String(f.siren)));
console.log(`${vivier.length} pistes « À creuser » à revoir (qualifiées depuis le ${limite}).`);
if (!vivier.length) process.exit(0);

// ---------- Les domaines .fr déjà en mémoire ----------
const parDomaine = new Map();
const dossierAfnic = join(DOSSIER, '.cache-afnic');
if (existsSync(dossierAfnic)) {
  for (const f of readdirSync(dossierAfnic).sort()) {
    for (const ligne of readFileSync(join(dossierAfnic, f), 'utf8').split('\n')) {
      const dom = ligne.trim().toLowerCase();
      if (dom && !dom.startsWith('#') && !parDomaine.has(dom)) parDomaine.set(dom, f.replace('.txt', ''));
    }
  }
}
function domaineDe(fiche) {
  for (const nom of [fiche.nom, fiche.entreprise]) {
    const colle = normaliser(nom);
    if (colle.length >= 4 && parDomaine.has(`${colle}.fr`)) return { domaine: `${colle}.fr`, date: parDomaine.get(`${colle}.fr`) };
  }
  return null;
}

// ---------- Les vérifications ----------
async function annuaire(siren) {
  const rep = await fetch(`${ANNUAIRE}?${new URLSearchParams({ q: siren, per_page: '1' })}`).catch(() => null);
  await attendre(160);
  if (!rep?.ok) return null;
  return ((await rep.json())?.results ?? []).find((r) => r.siren === siren) ?? null;
}
const dernierCA = (finances) => Object.entries(finances ?? {}).filter(([, v]) => Number(v?.ca) > 0).sort(([a], [b]) => b.localeCompare(a))[0] ?? null;

async function appSortie(fiche) {
  const terme = fiche.nom || fiche.entreprise;
  if (!terme) return '';
  const rep = await fetch(`${APP_STORE}?${new URLSearchParams({ term: terme, country: 'fr', entity: 'software', limit: '10' })}`).catch(() => null);
  await attendre(3200);
  if (!rep?.ok) return '';
  const noms = [fiche.nom, fiche.entreprise].map(normaliser).filter((x) => x.length >= 4);
  const app = ((await rep.json()).results ?? []).find((a) => {
    const vendeur = normaliser(a.sellerName);
    return vendeur.length >= 4 && noms.some((n) => vendeur === n || (n.length >= 8 && vendeur.includes(n)) || (vendeur.length >= 8 && n.includes(vendeur)));
  });
  return app ? `application sortie sur l'App Store : ${app.trackName} (${(app.releaseDate ?? '').slice(0, 10)})` : '';
}

const lignes = [];
let n = 0;
for (const fiche of vivier) {
  const siren = String(fiche.siren);
  const bouge = [];

  // Une nouvelle annonce légale depuis la qualification.
  const annonces = await fetch(`${BODACC}?${new URLSearchParams({ where: `registre='${siren}' AND dateparution>'${fiche.jour}'`, select: 'dateparution,familleavis_lib,modificationsgenerales,url_complete' })}`)
    .then((r) => (r.ok ? r.json() : [])).catch(() => []);
  for (const a of annonces) {
    const quoi = json(a.modificationsgenerales).descriptif || a.familleavis_lib || 'annonce';
    bouge.push(`nouvelle annonce BODACC du ${dateFr(a.dateparution)} : ${String(quoi).slice(0, 120)} (${a.url_complete})`);
  }

  // Un domaine .fr réservé.
  const dom = domaineDe(fiche);
  if (dom && dom.date > fiche.jour) bouge.push(`domaine ${dom.domaine} réservé le ${dateFr(dom.date)}`);

  // L'annuaire : salariés, chiffre d'affaires, dirigeants.
  const e = await annuaire(siren);
  if (e) {
    const effectif = e.tranche_effectif_salarie ?? '';
    if (/^\d\d$/.test(effectif) && effectif !== '00' && !/salari/i.test(fiche.preuves_argent ?? '')) bouge.push(`l'annuaire indique maintenant des salariés (tranche ${effectif})`);
    const ca = dernierCA(e.finances);
    if (ca && Number(ca[1].ca) >= 100000 && !/chiffre d'affaires/i.test(fiche.preuves_argent ?? '')) bouge.push(`chiffre d'affaires publié : ${Number(ca[1].ca).toLocaleString('fr-FR')} € en ${ca[0]}`);
    const dirigeants = (e.dirigeants ?? []).filter((d) => d.type_dirigeant !== 'personne morale').length;
    if (dirigeants >= 2 && !/associ|cofondateur|directeur général/i.test(`${fiche.ce_quil_fait} ${fiche.dirigeant_technique}`)) bouge.push(`${dirigeants} dirigeants personnes physiques au registre : un associé est peut-être arrivé`);
  }

  // L'App Store, seulement si l'application n'était pas déjà vue.
  if (!/^oui|app store|google play/i.test(fiche.app_existe ?? '')) {
    const app = await appSortie(fiche);
    if (app) bouge.push(app);
  }

  lignes.push({ nom: fiche.nom || fiche.entreprise, siren, jour: fiche.jour, raison: fiche.raison, bouge: bouge.join(' · '), contact: [fiche.telephone, fiche.email, fiche.linkedin].filter((x) => x && !/^non /i.test(x)).join(' · ') });
  if (++n % 10 === 0) console.log(`  ${n} pistes revues`);
}

const bougees = lignes.filter((l) => l.bouge);
const cellule = (v) => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const COLONNES = [['nom', 'Entreprise'], ['siren', 'SIREN'], ['jour', 'Qualifiée le'], ['bouge', 'Ce qui a bougé'], ['raison', 'Ce qui manquait'], ['contact', 'Contacts connus']];
const jour = aujourdhui.toISOString().slice(0, 10);
const fichier = join(DOSSIER, `vivier-${jour}.csv`);
writeFileSync(fichier, '﻿' + [COLONNES.map(([, t]) => cellule(t)).join(','), ...[...bougees, ...lignes.filter((l) => !l.bouge)].map((l) => COLONNES.map(([c]) => cellule(l[c])).join(','))].join('\n'), 'utf8');
writeFileSync(join(DOSSIER, 'vivier.json'), JSON.stringify(bougees.map((l) => ({ ...fiches.get(l.siren), bouge: l.bouge })), null, 1));

console.log(`\n${lignes.length} pistes revues, ${bougees.length} ont bougé. Tableau : ${fichier}`);
for (const l of bougees) console.log(`  ${l.nom} (${l.jour}) : ${l.bouge}`);
