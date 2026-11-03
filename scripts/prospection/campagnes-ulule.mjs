#!/usr/bin/env node
// Prospection par signaux : les campagnes Ulule réussies qui financent une application.
//
// Pourquoi : quelqu'un qui a collecté 5 000 ou 30 000 € sur Ulule pour son
// application a prouvé deux choses que le BODACC ne prouve pas : l'argent est
// là, et des gens attendent l'application. Souvent la collecte finance justement
// le développement (« À quoi sert l'argent » le dit).
//
// Source : l'API publique d'Ulule (api.ulule.com/v1), sans clé. Elle ne trie pas
// par date : le script parcourt toutes les campagnes qui parlent d'application,
// de plateforme ou de logiciel, puis garde celles de France, lancées depuis
// 12 mois, dont le nom ou le sous-titre parle bien d'une application, et qui ont
// collecté au moins 3 000 € (objectif atteint, ou à moitié pour une campagne en cours).
//
// Une mémoire locale (.cache-ulule.json) retient les campagnes déjà sorties :
// la colonne « Nouvelle ? » dit lesquelles apparaissent cette semaine.
//
// Usage :
//   node scripts/prospection/campagnes-ulule.mjs            # 12 derniers mois
//   node scripts/prospection/campagnes-ulule.mjs --mois 6
//
// Sortie : prospects-signaux/ulule-AAAA-MM-JJ.csv (dossier ignoré par git).
// Process complet : documentation/strategy/prospection-signaux.md

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://api.ulule.com/v1';
const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER_SORTIE = join(RACINE, 'prospects-signaux');
const args = process.argv.slice(2);
const i = args.indexOf('--mois');
const MOIS = i >= 0 ? Number(args[i + 1]) : 12;
const aujourdhui = new Date();
const depuis = new Date(aujourdhui.getTime() - MOIS * 30.5 * 86400000).toISOString().slice(0, 10);
const MOTS = ['application', 'appli', 'app mobile', 'plateforme', 'logiciel'];
const COLLECTE_MIN = 3000;

// Le nom ou le sous-titre doit parler d'une application, pas d'un livre qui en parle.
const APP = /\b(app|appli|applis|application|applications|plate-?formes?|logiciel|saas)\b/i;
const PAS_APP = /sans (app|appli|application|[ée]cran)|application (de|du) (vernis|peinture|soin)/i;

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const texte = (html, max) => {
  const t = String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&#39;/g, '\'')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, t.lastIndexOf(' ', max))}…` : t;
};

async function appel(chemin) {
  for (let essai = 0; essai < 3; essai++) {
    const rep = await fetch(`${API}${chemin}`).catch(() => null);
    await attendre(300);
    if (rep?.ok) return rep.json();
    await attendre(3000 * (essai + 1));
  }
  return null;
}

async function main() {
  console.log(`Campagnes Ulule lancées depuis le ${depuis}…`);
  const tous = new Map();
  for (const mot of MOTS) {
    // L'API accepte 60 résultats par page au plus.
    for (let offset = 0; offset < 6000; offset += 50) {
      const d = await appel(`/search/projects?${new URLSearchParams({ q: mot, lang: 'fr', limit: '50', offset: String(offset) })}`);
      if (!d?.projects?.length) break;
      for (const p of d.projects) tous.set(p.id, p);
      if (!d.meta?.next) break;
    }
  }
  const gardees = [...tous.values()].filter((p) => p.country === 'FR'
    && (p.date_online ?? '') >= depuis
    && APP.test(`${p.name_fr ?? ''} ${p.subtitle_fr ?? ''}`) && !PAS_APP.test(`${p.name_fr ?? ''} ${p.subtitle_fr ?? ''}`)
    && p.amount_raised >= COLLECTE_MIN
    && (p.percent >= 100 || (!p.finished && p.percent >= 50)));
  console.log(`${tous.size} campagnes lues, ${gardees.length} gardées.`);

  const fichierCache = join(DOSSIER_SORTIE, '.cache-ulule.json');
  mkdirSync(DOSSIER_SORTIE, { recursive: true });
  const dejaVues = existsSync(fichierCache) ? JSON.parse(readFileSync(fichierCache, 'utf8')) : {};

  const lignes = [];
  for (const p of gardees) {
    const d = (await appel(`/projects/${p.id}`)) ?? {};
    const id = `ulule-${p.id}`;
    lignes.push({
      nouvelle: id in dejaVues ? '' : 'oui',
      collecte: p.amount_raised,
      objectif: p.goal,
      pourcent: p.percent,
      etat: p.finished ? 'terminée' : 'en cours',
      fin: String(d.date_end ?? '').slice(0, 10),
      lancee: String(p.date_online ?? '').slice(0, 10),
      projet: p.name_fr ?? p.slug,
      sousTitre: p.subtitle_fr ?? '',
      porteur: p.owner?.screenname || p.owner?.name || '',
      profil: p.owner?.absolute_url ?? '',
      ville: d.location?.full_name ?? '',
      argent: texte(d.description_funding_fr, 500),
      quiIlsSont: texte(d.description_yourself_fr, 400),
      lien: p.absolute_url,
      id,
    });
    dejaVues[id] ??= aujourdhui.toISOString().slice(0, 10);
  }
  writeFileSync(fichierCache, JSON.stringify(dejaVues));
  lignes.sort((a, b) => (b.nouvelle ? 1 : 0) - (a.nouvelle ? 1 : 0) || b.collecte - a.collecte);

  const COLONNES = [
    ['nouvelle', 'Nouvelle ?'], ['collecte', 'Collecté (€)'], ['objectif', 'Objectif (€)'], ['pourcent', '%'],
    ['etat', 'Campagne'], ['lancee', 'Publié le'], ['fin', 'Fin'], ['projet', 'Projet'], ['sousTitre', 'Activité déclarée'],
    ['porteur', 'Porteur'], ['profil', 'Profil Ulule'], ['ville', 'Ville'], ['argent', 'À quoi sert l\'argent'],
    ['quiIlsSont', 'Qui ils sont'], ['lien', 'Lien'], ['id', 'Identifiant'],
    ['', 'Contact trouvé'], ['', 'Message envoyé le'], ['', 'Réponse'], ['', 'Statut'],
  ];
  const cellule = (v) => {
    const s = String(v ?? '');
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const fichier = join(DOSSIER_SORTIE, `ulule-${aujourdhui.toISOString().slice(0, 10)}.csv`);
  writeFileSync(fichier, '﻿' + [
    COLONNES.map(([, t]) => cellule(t)).join(','),
    ...lignes.map((l) => COLONNES.map(([c]) => cellule(c ? l[c] : '')).join(',')),
  ].join('\n'), 'utf8');

  const nouvelles = lignes.filter((l) => l.nouvelle).length;
  console.log(`\n${lignes.length} campagnes écrites dans ${fichier}, dont ${nouvelles} nouvelles.`);
  for (const l of lignes.slice(0, 15)) {
    console.log(`  ${l.nouvelle ? 'NOUVELLE ' : '         '}${String(l.collecte).padStart(6)} € (${l.pourcent} %, ${l.etat}) · ${l.projet} · ${l.ville}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
