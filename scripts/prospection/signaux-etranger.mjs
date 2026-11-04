#!/usr/bin/env node
// Prospection par signaux, hors de France : la Suisse et Monaco.
//
// Pourquoi ces deux pays : Noé veut des endroits où il y a de l'argent, et
// leurs registres se lisent gratuitement, sans compte (vérifié le 04/11/2026).
// Le Luxembourg protège sa recherche par un captcha : on n'y touche pas. La
// Belgique publie un PDF par société, sans recherche par mot : plus tard.
//
// Suisse : la Feuille officielle suisse du commerce (SHAB/FOSC) a une API
// publique. On cherche par mot dans le texte des annonces (HR01 nouvelle
// inscription, HR02 mutation, UP01 augmentation de capital), puis on lit le
// détail XML : but de la société, capital, siège, et les dirigeants dans le
// texte, après « Administration: », « Gérants: » ou « Geschäftsführung: ».
// Environ 5 à 10 annonces par semaine parlent d'application ou de plateforme.
//
// Monaco : le Journal de Monaco paraît le vendredi. Chaque numéro liste ses
// insertions légales ; on lit les constitutions et les modifications d'objet
// social, et on garde celles dont l'objet parle d'application. L'extrait ne
// nomme pas les dirigeants : la recherche web les trouve. Environ 8 créations
// par semaine, dont 0 ou 1 parle d'application.
//
// Usage :
//   node scripts/prospection/signaux-etranger.mjs            # 7 derniers jours
//   node scripts/prospection/signaux-etranger.mjs --jours 30
//
// Sortie : prospects-signaux/etranger-AAAA-MM-JJ.csv (dossier ignoré par git).
// Les identifiants : « ch-CHE-123.456.789 » en Suisse, « mc-8823-studio-lumen » à Monaco.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHAB = 'https://amtsblattportal.ch/api/v1/publications';
const MONACO = 'https://journaldemonaco.gouv.mc';
const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER = join(RACINE, 'prospects-signaux');
const args = process.argv.slice(2);
const i = args.indexOf('--jours');
const JOURS = i >= 0 ? Number(args[i + 1]) : 7;
const aujourdhui = new Date();
const depuis = new Date(aujourdhui.getTime() - JOURS * 86400000).toISOString().slice(0, 10);

// Les mêmes filtres que le BODACC, en trois langues pour la Suisse.
const APP = /\b(applications?|appli|app)\b[^.;]{0,60}(mobiles?|web|num[ée]riques?|smartphone|ios|android|en ligne)|\b(applications?|appli)\s+(de|d'|pour|permettant|destin[ée]e)|plate-?formes?\s+(num[ée]riques?|en ligne|web|digitale|de mise en relation|de r[ée]servation|d'interm[ée]diation)|\bsaas\b|r[ée]seau social|\b(mobile|web)[- ]?app\b|Plattform|Applikation|\bApp\b|piattaforma|applicazione/i;
const AGENCE = /pour (le compte de )?(tiers|des tiers|des entreprises|ses clients|des clients)|f[üu]r Dritte|conseil en informatique|prestations? (de services? )?informatiques?|services informatiques|services dans les? domaines? (des|du) (sites|web|d[ée]veloppement)|Informatikdienstleistungen|IT-Dienstleistungen|Softwareentwicklung f[üu]r|Entwicklung von Software f[üu]r|Webagentur|Beratung im (Bereich )?(IT|Informatik)|consulenza informatica|agence (web|digitale)|d[ée]veloppement de (sites|logiciels) (web )?pour|prestations de conseil, d'accompagnement/i;
const BRUIT = /livraison|Lieferdienst|Kurier|restauration rapide|vtc|taxi|r[ée]sine|peinture/i;

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const texte = (html) => String(html ?? '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&#39;|&rsquo;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&eacute;/g, 'é').replace(/&egrave;/g, 'è').replace(/&agrave;/g, 'à').replace(/\s+/g, ' ').trim();
const balise = (xml, nom) => (xml.match(new RegExp(`<${nom}[^>]*>([\\s\\S]*?)</${nom}>`)) ?? [])[1]?.trim() ?? '';
const cellule = (v) => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

async function lireJson(url) {
  const rep = await fetch(url).catch(() => null);
  await attendre(400);
  return rep?.ok ? rep.json() : null;
}
async function lireTexte(url) {
  const rep = await fetch(url).catch(() => null);
  await attendre(400);
  return rep?.ok ? rep.text() : '';
}

// ---------- Suisse ----------
const FORMES_CH = { '0101': 'entreprise individuelle', '0103': 'société en nom collectif', '0106': 'société anonyme', '0107': 'société à responsabilité limitée', '0108': 'coopérative', '0109': 'association', '0110': 'fondation' };
const MOTS_CH = ['application', 'applications', 'appli', 'plateforme', 'Plattform', 'App', 'Applikation', 'piattaforma', 'applicazione'];
const RUBRIQUES_CH = { HR01: 'Création', HR02: 'Mutation', UP01: 'Hausse de capital' };

async function suisse() {
  const ids = new Map();
  for (const rubrique of Object.keys(RUBRIQUES_CH)) {
    for (const mot of MOTS_CH) {
      for (let page = 0; page < 5; page++) {
        const d = await lireJson(`${SHAB}?${new URLSearchParams({
          publicationStates: 'PUBLISHED', tenant: 'shab', subRubrics: rubrique, keyword: mot,
          'publicationDate.start': depuis, 'publicationDate.end': aujourdhui.toISOString().slice(0, 10),
          'pageRequest.page': String(page), 'pageRequest.size': '100',
        })}`);
        const liste = d?.content ?? [];
        for (const p of liste) ids.set(p.meta.id, { rubrique, date: String(p.meta.publicationDate).slice(0, 10), canton: p.meta.cantons ?? '' });
        if (liste.length < 100) break;
      }
    }
  }
  console.log(`Suisse : ${ids.size} annonces qui parlent d'application, à lire une par une…`);
  const pistes = [];
  for (const [id, m] of ids) {
    const xml = await lireTexte(`${SHAB}/${id}/xml`);
    if (!xml) continue;
    const but = texte(balise(xml, 'purpose'));
    const corps = texte(balise(xml, 'publicationText'));
    const activite = but || corps;
    if (!APP.test(activite) || BRUIT.test(activite)) continue;
    // Une société en liquidation ou radiée n'a plus de projet.
    if (/in Liquidation|en liquidation|in liquidazione|Auflösung|dissolution|radiation|Löschung/i.test(`${texte(balise(xml, 'name'))} ${corps.slice(0, 400)}`)) continue;
    // Une mutation n'intéresse que si le but change : une adresse qui bouge chez
    // une plateforme qui existe déjà, ce n'est pas un projet qui démarre.
    if (m.rubrique === 'HR02' && !/(nouveau|neuer?|nuovo) (but|Zweck|scopo)|but modifié|Zweck(?:änderung| neu| geändert)|scopo modificato|Statuts modifiés|Statutenänderung|modifica dello statuto/i.test(corps)) continue;
    const agence = AGENCE.test(activite) && !/exploitation|abonnement|commission|eigene|propre/i.test(activite);
    const dirigeants = (corps.match(/(?:Administration|Gérant(?:e|s|es)?|Associé(?:e|s)? gérant(?:e|s)?|Geschäftsführ(?:er|erin|ung)|Verwaltungsrat|Verwaltung|Amministrazione|Gerente|Inhaber(?:in)?|Titulaire|Personnes inscrites)\s*:\s*([^.;]{5,300})/g) ?? [])
      .map((x) => x.replace(/\s+/g, ' ').trim()).join(' · ');
    const capital = Number(balise(balise(xml, 'capital'), 'nominal')) || 0;
    const siege = texte(balise(xml, 'seat')) || texte(balise(xml, 'town'));
    const signal = RUBRIQUES_CH[m.rubrique];
    const raisons = [`${signal} au registre suisse`];
    let score = signal === 'Mutation' ? 4 : signal === 'Hausse de capital' ? 3 : 2;
    if (capital >= 20000) { score += 2; raisons.push(`capital de ${capital.toLocaleString('fr-FR')} CHF`); }
    if (capital >= 100000) { score += 1; }
    if (agence) { score -= 4; raisons.push('vend du code à d\'autres : concurrent probable'); }
    if (/mise en relation|r[ée]servation|abonnement|Vermittlung|Buchung|Abonnement/i.test(activite)) { score += 2; raisons.push('modèle de revenus déclaré'); }
    pistes.push({
      pays: 'Suisse', signal, date: m.date, entreprise: texte(balise(xml, 'name')), identifiant: `ch-${balise(xml, 'uid') || id}`,
      forme: FORMES_CH[balise(xml, 'legalForm')] ?? balise(xml, 'legalForm'), capital: capital ? `${capital} CHF` : '', ville: `${siege}${m.canton ? ` (${m.canton})` : ''}`,
      dirigeants, activite: activite.slice(0, 900), lien: `https://amtsblattportal.ch/#!/search?id=${id}`, score, pourquoi: raisons.join(' · '),
    });
  }
  return pistes;
}

// ---------- Monaco ----------
async function monaco() {
  const annee = aujourdhui.getFullYear();
  const index = await lireTexte(`${MONACO}/Journaux/${annee}`);
  const numeros = [...new Set(index.match(/\/Journaux\/\d{4}\/Journal-\d+/g) ?? [])].sort().slice(-Math.max(2, Math.ceil(JOURS / 7) + 1));
  const fichierCache = join(DOSSIER, '.cache-monaco.json');
  const vus = existsSync(fichierCache) ? JSON.parse(readFileSync(fichierCache, 'utf8')) : {};
  const pistes = [];
  for (const numero of numeros) {
    const sommaire = await lireTexte(`${MONACO}${numero}`);
    const dateJournal = (sommaire.match(/(\d{2})\/(\d{2})\/(\d{4})/) ?? []).slice(1, 4).reverse().join('-');
    if (dateJournal && dateJournal < depuis) continue;
    const liens = [...new Set(sommaire.match(new RegExp(`${numero.replace(/[/]/g, '\\/')}\\/[^"]+`, 'g')) ?? [])]
      .filter((l) => /CONSTITUTION|MODIFICATION-DE-L-OBJET|AUGMENTATION-DE-CAPITAL/i.test(l));
    for (const lien of liens) {
      const id = `mc-${numero.split('-').pop()}-${lien.split('/').pop().slice(0, 40).toLowerCase()}`;
      if (vus[id]) { if (vus[id].garde) pistes.push(vus[id].garde); continue; }
      const page = texte(await lireTexte(`${MONACO}${lien}`));
      const objet = (page.match(/Objet\s*:\s*«?\s*([^»]{20,1500})/i) ?? [])[1] ?? '';
      const denomination = (page.match(/Dénomination\s*:\s*«?\s*([^».]{2,80})/i) ?? [])[1]?.trim() ?? decodeURIComponent(lien.split('/').pop()).split(/-(CONSTITUTION|Societe|MODIFICATION|AUGMENTATION)/i)[0].replace(/-/g, ' ');
      const capital = (page.match(/capital (?:social )?(?:de |fixé à )?([\d.\s]+)\s*euros/i) ?? [])[1]?.replace(/[.\s]/g, '') ?? '';
      const siege = (page.match(/Siège\s*(?:social)?\s*:\s*([^.]{5,120})/i) ?? [])[1]?.trim() ?? 'Monaco';
      const signal = /CONSTITUTION/i.test(lien) ? 'Création' : /OBJET/i.test(lien) ? 'Ajout d\'activité' : 'Hausse de capital';
      let garde = null;
      if (objet && APP.test(objet) && !BRUIT.test(objet)) {
        const agence = AGENCE.test(objet);
        const raisons = [`${signal} à Monaco`];
        let score = signal === 'Ajout d\'activité' ? 5 : 3;
        if (Number(capital) >= 15000) { score += 2; raisons.push(`capital de ${Number(capital).toLocaleString('fr-FR')} €`); }
        if (agence) { score -= 4; raisons.push('vend du code à d\'autres : concurrent probable'); }
        if (/mise en relation|r[ée]servation|abonnement/i.test(objet)) { score += 2; raisons.push('modèle de revenus déclaré'); }
        garde = { pays: 'Monaco', signal, date: dateJournal, entreprise: denomination, identifiant: id, forme: (page.match(/société (anonyme monégasque|à responsabilité limitée|unipersonnelle à responsabilité limitée|en commandite simple)/i) ?? [])[0] ?? '',
          capital: capital ? `${capital} €` : '', ville: siege, dirigeants: '', activite: objet.slice(0, 900), lien: `${MONACO}${lien}`, score, pourquoi: raisons.join(' · ') };
        pistes.push(garde);
      }
      vus[id] = { vu: aujourdhui.toISOString().slice(0, 10), garde };
    }
  }
  mkdirSync(DOSSIER, { recursive: true });
  writeFileSync(fichierCache, JSON.stringify(vus));
  console.log(`Monaco : ${numeros.length} numéros lus, ${pistes.length} annonces qui parlent d'application.`);
  return pistes;
}

// ---------- Programme ----------
async function main() {
  console.log(`Annonces publiées depuis le ${depuis}…`);
  const pistes = [...await suisse(), ...await monaco()].sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));
  const COLONNES = [
    ['score', 'Score'], ['pourquoi', 'Pourquoi'], ['pays', 'Pays'], ['signal', 'Signal'], ['date', 'Publié le'], ['entreprise', 'Entreprise'],
    ['identifiant', 'Identifiant'], ['forme', 'Forme'], ['capital', 'Capital'], ['ville', 'Ville'], ['dirigeants', 'Dirigeants'],
    ['activite', 'Activité déclarée'], ['lien', 'Annonce'], ['', 'Contact trouvé'], ['', 'Canal'], ['', 'Message envoyé le'], ['', 'Réponse'], ['', 'Statut'],
  ];
  mkdirSync(DOSSIER, { recursive: true });
  const fichier = join(DOSSIER, `etranger-${aujourdhui.toISOString().slice(0, 10)}.csv`);
  writeFileSync(fichier, '﻿' + [COLONNES.map(([, t]) => cellule(t)).join(','), ...pistes.map((p) => COLONNES.map(([c]) => cellule(c ? p[c] : '')).join(','))].join('\n'), 'utf8');
  console.log(`\n${pistes.length} pistes écrites dans ${fichier}`);
  for (const p of pistes.slice(0, 12)) console.log(`  ${String(p.score).padStart(2)} · ${p.pays} · ${p.signal} · ${p.entreprise} (${p.ville}) · ${p.activite.slice(0, 90)}`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
