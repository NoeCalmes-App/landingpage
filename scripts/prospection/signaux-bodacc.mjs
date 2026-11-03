#!/usr/bin/env node
// Prospection par signaux : les entreprises qui viennent de déclarer une application.
//
// Source : le BODACC (Bulletin officiel des annonces civiles et commerciales),
// public et gratuit. Chaque création d'entreprise et chaque changement
// d'activité y est publié avec l'activité déclarée en toutes lettres. Quand
// quelqu'un écrit « exploitation d'une application mobile de réservation »,
// il vient de dire lui-même qu'il a un projet d'application et qu'il démarre.
//
// Trois signaux :
//   1. « Ajout d'activité » : une entreprise qui existe déjà (restaurant,
//      coach, commerce...) ajoute une application à son activité. C'est la
//      cible numéro un : un entrepreneur qui diversifie ses revenus.
//   2. « Création » : une entreprise créée pour exploiter une application.
//   3. « Hausse de capital » : une entreprise dont l'activité est une
//      application vient d'augmenter son capital. Rare (un ou deux par mois),
//      mais c'est de l'argent qui vient d'entrer dans la société.
//
// Hausse de capital : pour chaque piste, le script relit tout l'historique
// BODACC de l'entreprise. L'annonce de hausse donne le nouveau capital ;
// l'ancien est dans une annonce précédente. Une hausse dans les deux dernières
// années rapporte des points : « avoir une autre entreprise » ne prouve pas
// qu'on a de l'argent, remettre de l'argent dans la sienne, si.
//
// Le script enrichit chaque piste avec l'annuaire officiel des entreprises
// (dirigeants, date de création, code d'activité), écarte le bruit (livreurs,
// agences, développeurs) et les personnes qui ont refusé la diffusion de leurs
// données, puis note chaque piste et écrit un CSV à ouvrir dans Google Sheets.
//
// Profil du fondateur : pour chaque dirigeant, le script cherche dans l'annuaire
// toutes les autres entreprises qu'il dirige (même nom, même prénom, même mois
// de naissance). Un fondateur qui a déjà un commerce, une holding ou une société
// immobilière a probablement de l'argent. Un fondateur qui dirige une société
// informatique fera sûrement l'application lui-même.
//
// Usage :
//   node scripts/prospection/signaux-bodacc.mjs            # 7 derniers jours
//   node scripts/prospection/signaux-bodacc.mjs --jours 30
//   node scripts/prospection/signaux-bodacc.mjs --depuis 2026-10-01
//   --sans-app-store : ne pas vérifier si l'application existe déjà sur l'App Store
//
// Sortie : prospects-signaux/signaux-du-AAAA-MM-JJ-au-AAAA-MM-JJ.csv (dossier ignoré par git :
// le dépôt est public, aucun nom de prospect ne doit y entrer).
//
// Process complet : documentation/strategy/prospection-signaux.md

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BODACC = 'https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/exports/json';
const ANNUAIRE = 'https://recherche-entreprises.api.gouv.fr/search';
const APP_STORE = 'https://itunes.apple.com/search';
const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOSSIER_SORTIE = join(RACINE, 'prospects-signaux');

// ---------- Arguments ----------
const args = process.argv.slice(2);
const lireArg = (nom) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : undefined;
};
const aujourdhui = new Date();
const jours = Number(lireArg('--jours') ?? 7);
const depuis = lireArg('--depuis') ?? new Date(aujourdhui.getTime() - jours * 86400000).toISOString().slice(0, 10);
const sansAnnuaire = args.includes('--sans-annuaire');
const sansAppStore = args.includes('--sans-app-store');
const MAX_APP_STORE = 60; // les meilleures pistes seulement : Apple limite le nombre d'appels

// ---------- Filtres ----------
// Une vraie application, pas « application de résine » ni « application sur la peau ».
const APP = /\b(applications?|appli)\s+(mobiles?|web|num[ée]riques?|smartphone|ios|android|en ligne|logicielle)|\b(applications?|appli)\s+(de|d'|dédiée|destinée|permettant|proposant)\s+[^.;]{0,40}(mise en relation|r[ée]servation|rencontres?|fid[ée]lit|suivi|gestion|coaching|sport|abonnement|commande|partage|apprentissage)|plate-?formes?\s+(num[ée]riques?|en ligne|web|internet|digitale|saas|logicielle|de mise en relation|de r[ée]servation|d'interm[ée]diation|sociale)|\bsaas\b|logiciels? (en ligne|par abonnement)|r[ée]seau social/i;

// Bruit : livreurs, revendeurs sur plateformes tierces, streamers, BTP.
const BRUIT = /uber|deliveroo|livreur|coursier|livraison (de repas|à vélo|a velo|de colis)|pour le compte de plateformes|(via|sur|par l'interm[ée]diaire de|au travers de) (la |une |les |des |de |diff[ée]rentes |plusieurs |diverses? )?plate-?formes?|plate-?formes? (num[ée]riques? )?d[ée]di[ée]es? à la livraison|vinted|shopify|printful|printify|amazon|etsy|dropshipping|drop shipping|streaming|live|tiktok|twitch|youtube|r[ée]sine|peinture|vtc|taxi|airbnb|abritel|booking\.com|(mandataire|agence|interm[ée]diaire)[^.;]{0,40}plate-?formes? de r[ée]servation/i;

// Métiers techniques : un développeur, une agence ou une société informatique
// sait déjà faire son application, ce n'est pas un client.
const METIER_TECH = /freelance (en )?informatique|d[ée]veloppement web|d[ée]veloppeur|cr[ée]ation (et maintenance )?de sites|sites internet (cl[ée]s en main|pour (des|les|ses) clients)|prestations? (de services )?informatiques?|conseils? en (infrastructure|informatique|syst[eè]mes|transformation)|cabinet [^.;]{0,30}(data|intelligence artificielle)|cybers[ée]curit[ée]|infog[ée]rance|\besn\b|int[ée]grat(eur|ion) (de solutions|informatique)|jeux vid[ée]o|ing[ée]nierie (informatique|logicielle)|syst[eè]mes et logiciels informatiques|(sites?( internet| web)?|applications?|plate-?formes?)[^.;]{0,40}pour (le compte de tiers|des entreprises|ses clients|des clients|les entreprises)/i;

// Objet social générique : « des plateformes, applications, logiciels » sans
// dire pour quoi faire. Un vrai projet dit à quoi sert son application.
const APP_PRECISE = /(plate-?forme|application|appli|logiciel|r[ée]seau social)[^.;]{0,90}(mise en relation|permettant|destin[ée]e?s?|d[ée]di[ée]e?s?|de r[ée]servation|de rencontres?|\bentre\b|aux? (particuliers|professionnels|clients|propri[ée]taires|[ée]tudiants|parents|familles|sportifs|commer[çc]ants))/i;
const BOILERPLATE = /prise de participations?|et plus g[ée]n[ée]ralement|toutes op[ée]rations|directement ou indirectement|objet social|sous toutes (leurs )?formes/i;

// Code d'activité de l'annuaire (deux premiers chiffres) : le métier actuel
// d'une entreprise qui ajoute une application.
const METIERS = {
  '10': 'agroalimentaire', '45': 'automobile', '46': 'commerce de gros', '47': 'commerce',
  '49': 'transport', '55': 'hôtellerie', '56': 'restauration', '68': 'immobilier',
  '69': 'juridique ou comptable', '70': 'conseil', '71': 'architecture ou ingénierie', '73': 'publicité',
  '74': 'design ou photo', '77': 'location', '79': 'voyage', '81': 'nettoyage', '82': 'services aux entreprises',
  '85': 'enseignement', '86': 'santé', '88': 'action sociale', '90': 'spectacle', '93': 'sport ou loisirs',
  '96': 'beauté ou bien-être', '41': 'construction', '43': 'artisanat du bâtiment', '01': 'agriculture',
};
const NAF_TECH = /^(62|63\.1|58\.2)/;
const NAF_HOLDING = /^(64\.20|66\.30|70\.10)/;
const NAF_IMMO = /^68\.(20|32)/;
const SCI = '6540'; // nature juridique : société civile immobilière

// Agences et développeurs qui vendent du code à d'autres : des concurrents, pas des clients.
const AGENCE = /pour le compte de (tiers|ses clients|clients)|prestations? (de services )?informatiques?|programmation informatique|conseil en (syst[eè]mes|informatique)|agence (web|digitale|de communication)|(cr[ée]ation|d[ée]veloppement|conception|r[ée]alisation)[^.;]{0,25}(sites?( internet| web)?|applications?)( web| mobiles?| et| ,| \/)*( (pour|à destination de|destin[ée]e?s? aux?) (les |des )?(entreprises|professionnels|clients|particuliers|tpe|pme|commer[çc]ants))|^\s*(cr[ée]ation|d[ée]veloppement|conception|[ée]dition et int[ée]gration)[^.;]{0,15}(d'|de |des )?(applications?|sites?)[^.;]{0,30}$/i;

// Quelqu'un qui exploite ou édite son propre produit n'est pas une agence, même
// s'il écrit « conception d'une application destinée aux commerçants ».
const estAgence = (a) => AGENCE.test(a) && !/exploitation|[ée]dition et|abonnements?|commissions?/i.test(a);

const MODELE_REVENUS = /abonnements?|commissions?|r[ée]servations?|premium|payant|frais de service|mon[ée]tis|affiliation|freemium|achats? int[ée]gr[ée]s/i;
const SECTEUR_PROCHE = /restaura|traiteur|food|repas|coach|sport|fitness|salle|bien-[êe]tre|beaut[ée]|esth[ée]ti|coiff|immobili|location|[ée]v[ée]nement|auto-[ée]cole|conduite|formation|sant[ée]|m[ée]dical|tourisme|voyage|h[ôo]tel|animaux|cheva|garage|artisan|commer[çc]ant|boutique|march[ée]s?/i;

// ---------- Outils ----------
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const json = (s) => {
  if (!s) return {};
  try { return JSON.parse(s); } catch { return {}; }
};
const premier = (x) => (Array.isArray(x) ? x[0] ?? {} : x ?? {});

async function bodacc(where, select) {
  const url = `${BODACC}?${new URLSearchParams(select ? { where, select } : { where })}`;
  const rep = await fetch(url);
  if (!rep.ok) throw new Error(`BODACC ${rep.status} : ${(await rep.text()).slice(0, 300)}`);
  return rep.json();
}

const montant = (v) => Number(String(v ?? '').replace(/\s/g, '').replace(',', '.')) || 0;
const euros = (n) => `${Math.round(n).toLocaleString('fr-FR')} €`;
const dateFr = (iso) => String(iso ?? '').split('-').reverse().join('/');
const sirenDe = (r) => String((r.registre ?? [])[0] ?? '').replace(/\s/g, '');

// Tout l'historique BODACC de plusieurs entreprises, 100 SIREN par appel.
async function historiques(sirens) {
  const parSiren = new Map();
  const liste = [...new Set(sirens)];
  for (let i = 0; i < liste.length; i += 100) {
    const lot = liste.slice(i, i + 100).map((x) => `'${x}'`).join(',');
    const annonces = await bodacc(`registre in (${lot})`, 'dateparution,registre,listepersonnes,listeetablissements,url_complete');
    for (const r of annonces) {
      const siren = sirenDe(r);
      if (!parSiren.has(siren)) parSiren.set(siren, []);
      parSiren.get(siren).push(r);
    }
  }
  return parSiren;
}

// La dernière hausse de capital des deux dernières années : le capital publié
// par une annonce, plus haut que celui de l'annonce d'avant.
function derniereHausse(annonces = []) {
  const limite = new Date(aujourdhui.getTime() - 730 * 86400000).toISOString().slice(0, 10);
  const points = annonces
    .map((r) => ({ date: r.dateparution, capital: montant(premier(json(r.listepersonnes).personne).capital?.montantCapital), lien: r.url_complete }))
    .filter((x) => x.capital > 0)
    .sort((a, b) => a.date.localeCompare(b.date));
  for (let i = points.length - 1; i > 0 && points[i].date >= limite; i--) {
    if (points[i].capital > points[i - 1].capital) return { avant: points[i - 1].capital, apres: points[i].capital, date: points[i].date, lien: points[i].lien };
  }
  return null;
}

// L'activité la plus récente publiée par une entreprise, toutes annonces confondues.
const derniereActivite = (annonces = []) => [...annonces]
  .sort((a, b) => b.dateparution.localeCompare(a.dateparution))
  .map((r) => premier(json(r.listeetablissements).etablissement).activite || premier(json(r.listepersonnes).personne).activite || '')
  .find((a) => a.trim()) ?? '';

// Les hausses qui ne disent rien du projet : sociétés civiles, grands groupes, holdings.
const FORME_HORS_CIBLE = /civile|anonyme|europ[ée]enne|commandite|coop[ée]rative|mutuelle|association/i;
const NOM_HORS_CIBLE = /holding|invest|patrimo|participations?|capital|financ|immo/i;

// L'annuaire accepte 7 requêtes par seconde : on attend 160 ms après chaque appel.
async function appelAnnuaire(params) {
  for (let essai = 0; essai < 4; essai++) {
    const rep = await fetch(`${ANNUAIRE}?${new URLSearchParams(params)}`);
    await attendre(160);
    if (rep.status === 429) { await attendre(1500 * (essai + 1)); continue; }
    if (!rep.ok) return null;
    return rep.json();
  }
  return null;
}

async function annuaire(siren) {
  const d = await appelAnnuaire({ q: siren, per_page: '1' });
  return (d?.results ?? []).find((r) => r.siren === siren) ?? null;
}

const sansRepetition = (n) => {
  const base = n.split(' (')[0];
  return n.replace(/\s*\(([^)]*)\)/g, (m, x) => (base.toUpperCase().includes(x.toUpperCase()) ? '' : m)).trim();
};
const nettoyerNom = (n) => String(n ?? '').replace(/\s*\([^)]*\)/g, '').trim();
const finDuMois = (ym) => {
  const [a, m] = ym.split('-').map(Number);
  return `${ym}-${String(new Date(a, m, 0).getDate()).padStart(2, '0')}`;
};
const naissanceValide = (d) => /^\d{4}-\d{2}$/.test(d?.naissance ?? '');

// Dernier chiffre d'affaires publié, quand l'entreprise publie ses comptes.
function dernierCA(finances) {
  const annees = Object.entries(finances ?? {}).filter(([, v]) => Number(v?.ca) > 0).sort(([a], [b]) => b.localeCompare(a));
  return annees.length ? { annee: annees[0][0], ca: Number(annees[0][1].ca) } : null;
}

// Ce qu'on garde d'une fiche de l'annuaire.
function resumer(e) {
  const effectif = e.tranche_effectif_salarie ?? '';
  return {
    siren: e.siren,
    nom: sansRepetition(e.nom_complet ?? ''),
    naf: e.activite_principale ?? '',
    depuis: (e.date_creation ?? '').slice(0, 4),
    active: e.etat_administratif === 'A',
    employeur: e.caractere_employeur === 'O' || (/^\d\d$/.test(effectif) && effectif !== '00'),
    ca: dernierCA(e.finances),
    sci: e.nature_juridique === SCI,
    etablissements: Number(e.nombre_etablissements_ouverts) || 0,
    cachee: JSON.stringify(e).includes('[NON-DIFFUSIBLE]'),
    dirigeants: (e.dirigeants ?? []).map((d) => (d.type_dirigeant === 'personne morale'
      ? { pm: true, siren: d.siren ?? '', nom: d.denomination ?? '' }
      : { nom: nettoyerNom(d.nom), prenom: String(d.prenoms ?? '').split(/[\s,]+/)[0], naissance: d.date_de_naissance ?? '', qualite: d.qualite ?? '' })),
  };
}
const sansDirigeants = ({ dirigeants, ...reste }) => reste;

// Toutes les autres entreprises actives des dirigeants d'une piste.
// Une holding qui préside la piste est ouverte : on lit la personne derrière et ses filiales.
async function autresEntreprises(fiche, cacheF) {
  const personnes = fiche.dirigeants.filter((d) => !d.pm && d.nom && d.prenom && naissanceValide(d));
  const autres = new Map();
  for (const h of fiche.dirigeants.filter((d) => d.pm && d.siren).slice(0, 2)) {
    const clef = `h:${h.siren}`;
    if (!(clef in cacheF)) {
      const fh = await annuaire(h.siren);
      const recherche = h.nom ? await appelAnnuaire({ q: h.nom, per_page: '25' }) : null;
      cacheF[clef] = {
        holding: fh ? resumer(fh) : null,
        filiales: (recherche?.results ?? []).filter((e) => (e.dirigeants ?? []).some((d) => d.siren === h.siren)).map((e) => sansDirigeants(resumer(e))),
      };
    }
    const { holding, filiales } = cacheF[clef];
    if (holding) {
      autres.set(holding.siren, sansDirigeants(holding));
      personnes.push(...holding.dirigeants.filter((d) => !d.pm && d.nom && d.prenom && naissanceValide(d)));
    }
    for (const e of filiales) autres.set(e.siren, e);
  }
  for (const p of personnes.slice(0, 4)) {
    const clef = `p:${p.nom}|${p.prenom}|${p.naissance}`;
    if (!(clef in cacheF)) {
      const r = await appelAnnuaire({
        nom_personne: p.nom, prenoms_personne: p.prenom,
        date_naissance_personne_min: `${p.naissance}-01`, date_naissance_personne_max: finDuMois(p.naissance),
        type_personne: 'dirigeant', per_page: '25',
      });
      cacheF[clef] = (r?.results ?? []).map((e) => sansDirigeants(resumer(e)));
    }
    for (const e of cacheF[clef]) autres.set(e.siren, e);
  }
  autres.delete(fiche.siren);
  return [...autres.values()].filter((e) => e.active && !e.cachee);
}

// L'application est-elle déjà sur l'App Store ? On cherche le nom de marque et on ne
// retient une application que si son éditeur porte le nom de l'entreprise ou du dirigeant.
// Apple limite cette recherche à une vingtaine d'appels par minute.
const normaliser = (x) => String(x ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/\b(sasu|sas|sarl|eurl|sa|sci|ltd|inc)\b/g, '').replace(/[^a-z0-9]/g, '');
async function appDejaEnLigne(piste) {
  const terme = piste.nomCommercial || piste.entreprise;
  if (!terme) return null;
  let rep;
  for (let essai = 0; essai < 3; essai++) {
    rep = await fetch(`${APP_STORE}?${new URLSearchParams({ term: terme, country: 'fr', entity: 'software', limit: '10' })}`).catch(() => null);
    await attendre(3200);
    if (rep?.ok) break;
    await attendre(10000);
  }
  if (!rep?.ok) return null;
  const { results = [] } = await rep.json();
  const noms = [piste.entreprise, piste.nomCommercial, ...(piste.personnes ?? []),
    ...(piste.personnes ?? []).map((p) => p.split(' ').reverse().join(' '))].map(normaliser).filter((x) => x.length >= 4);
  const app = results.find((a) => {
    const vendeur = normaliser(a.sellerName);
    return vendeur.length >= 4 && noms.some((n) => vendeur === n || (n.length >= 8 && vendeur.includes(n)) || (vendeur.length >= 8 && n.includes(vendeur)));
  });
  return app ? `Oui, sur l'App Store : ${app.trackName} (depuis ${(app.releaseDate ?? '').slice(0, 7)})` : '';
}

// Range les autres entreprises du fondateur et les décrit en clair.
function lireFondateur(autres) {
  const genre = (e) => (NAF_TECH.test(e.naf) ? 'tech'
    : NAF_HOLDING.test(e.naf) || /holding/i.test(e.nom) ? 'holding'
      : e.sci || NAF_IMMO.test(e.naf) ? 'immo' : 'business');
  const libelle = { tech: 'informatique', holding: 'holding', immo: 'immobilier' };
  const decrire = (e) => {
    const metier = libelle[genre(e)] ?? METIERS[e.naf.slice(0, 2)] ?? `code ${e.naf}`;
    const details = [metier, e.depuis && `depuis ${e.depuis}`, e.employeur && 'avec salariés',
      e.ca && `CA ${e.ca.ca.toLocaleString('fr-FR')} € en ${e.ca.annee}`].filter(Boolean).join(', ');
    return `${e.nom.slice(0, 45)} (${details})`;
  };
  const par = (g) => autres.filter((e) => genre(e) === g);
  const tech = par('tech');
  const meilleurCA = Math.max(0, ...autres.map((e) => e.ca?.ca ?? 0));
  return {
    fondateur: { business: par('business'), holding: par('holding'), immo: par('immo'), tech,
      employeur: autres.some((e) => e.employeur), ca: meilleurCA },
    fondateurTexte: autres.map(decrire).join(' · '),
    fondateurTechnique: tech.length ? `Probable : ${tech.map(decrire).join(' · ')}` : '',
  };
}

function lirePiste(r, signal) {
  const p = premier(json(r.listepersonnes).personne);
  const e = premier(json(r.listeetablissements).etablissement);
  const activite = (signal === 'Ajout d\'activité' ? p.activite : e.activite || p.activite) || '';
  const siren = String((r.registre ?? [])[0] ?? '').replace(/\s/g, '');
  const prenoms = Array.isArray(p.prenom) ? p.prenom.join(' ') : p.prenom ?? '';
  const capital = Number(String(p.capital?.montantCapital ?? '').replace(',', '.')) || 0;
  let dirigeant = '';
  if (p.typePersonne === 'pp') dirigeant = `${prenoms} ${p.nomUsage || p.nom || ''}`.trim();
  else if (p.administration) dirigeant = p.administration.replace(/\s+/g, ' ').slice(0, 140);
  return {
    siren,
    signal,
    date: r.dateparution,
    entreprise: p.denomination || `${p.nom ?? ''} ${prenoms}`.trim(),
    nomCommercial: p.nomCommercial || e.enseigne || '',
    dirigeant,
    forme: p.formeJuridique || (p.typePersonne === 'pp' ? 'Entrepreneur individuel' : ''),
    capital,
    ville: r.ville || e.adresse?.ville || '',
    departement: r.departement_nom_officiel || '',
    activite: activite.replace(/\s+/g, ' ').trim(),
    lienBodacc: r.url_complete || '',
  };
}

function noter(piste) {
  const a = piste.activite;
  const raisons = [];
  let score = 0;

  // Un autre métier, hors application et hors formules juridiques.
  const morceaux = a.split(/\s+-\s+|;\s*|\.\s+(?=[A-ZÉÈ])/).map((m) => m.trim()).filter((m) => m.length > 12);
  const autreMetier = morceaux.some((m) => !/plate-?forme|application|appli|logiciel|num[ée]rique|site|internet|web|digital|saas|informatique|commerciali|abonnement|conception|d[ée]veloppement|[ée]dition|maintenance|exploitation|h[ée]bergement|contenus?|publicit|mon[ée]tis|services? associ/i.test(m) && !BOILERPLATE.test(m));
  const metierActuel = METIERS[String(piste.naf ?? '').slice(0, 2)];

  if (piste.signal === 'Ajout d\'activité') {
    score += 2;
    if (autreMetier || metierActuel) {
      score += 3;
      raisons.push(`entreprise en activité${metierActuel ? ` (${metierActuel})` : ''} qui ajoute une application`);
    } else {
      raisons.push('changement d\'activité vers une application');
    }
    if (Number(piste.existeDepuis) && Number(piste.existeDepuis) < Number(depuis.slice(0, 4))) {
      score += 1; raisons.push(`existe depuis ${piste.existeDepuis}`);
    }
  } else if (piste.signal === 'Hausse de capital') {
    // Une entreprise qui exploite déjà sa plateforme l'a souvent déjà faite ;
    // une jeune entreprise qui lève de l'argent a son produit à construire.
    score += 1;
    raisons.push('entreprise d\'application qui vient d\'augmenter son capital');
    if (Number(piste.existeDepuis) >= aujourdhui.getFullYear() - 2) {
      score += 2; raisons.push(`jeune entreprise (${piste.existeDepuis}) : le produit est sans doute à construire`);
    } else if (Number(piste.existeDepuis)) {
      raisons.push(`existe depuis ${piste.existeDepuis}, plateforme peut-être déjà faite`);
    }
  } else {
    raisons.push('entreprise créée pour une application');
    if (autreMetier) { score += 2; raisons.push('avec un autre métier à côté'); }
    // Une micro-entreprise toute neuve part souvent de zéro : le budget est rarement là.
    const neuve = !Number(piste.existeDepuis) || Number(piste.existeDepuis) >= Number(depuis.slice(0, 4));
    if (/individuel/i.test(piste.forme ?? '') && neuve) { score -= 2; raisons.push('micro-entreprise toute neuve, budget à vérifier'); }
  }
  if (APP_PRECISE.test(a)) { score += 2; raisons.push('projet précis'); } else { score -= 1; raisons.push('objet vague'); }
  if (MODELE_REVENUS.test(a)) { score += 2; raisons.push('modèle de revenus déclaré'); }
  if (SECTEUR_PROCHE.test(a)) { score += 1; raisons.push('secteur proche de tes clients'); }
  if (/soci[ée]t[ée]/i.test(piste.forme)) score += 1;
  if (piste.capital >= 5000) { score += 2; raisons.push(`capital de ${piste.capital.toLocaleString('fr-FR')} €`); }
  if (piste.capital >= 20000) score += 1;
  if (a.length > 800) { score -= 2; raisons.push('objet social fourre-tout'); }
  else if (/^\s*(la soci[ée]t[ée] a pour objet\s*:?\s*)?prise de participations?/i.test(a)) { score -= 3; raisons.push('holding'); }

  // De l'argent remis dans la société : la preuve la plus solide des registres.
  const h = piste.hausse;
  if (h && h.apres - h.avant >= 5000) {
    score += h.apres >= 2 * h.avant && h.apres >= 10000 ? 3 : 2;
    raisons.push(`capital augmenté de ${euros(h.avant)} à ${euros(h.apres)} le ${dateFr(h.date)}`);
  }

  // L'entreprise elle-même : des salariés ou un chiffre d'affaires publié.
  if (piste.employeur) { score += 1; raisons.push('emploie des salariés'); }
  if (piste.etablissements >= 2) { score += 1; raisons.push(`${piste.etablissements} établissements ouverts`); }
  if (piste.ca?.ca >= 100000) { score += 2; raisons.push(`chiffre d'affaires de ${piste.ca.ca.toLocaleString('fr-FR')} € en ${piste.ca.annee}`); }

  // Le fondateur, d'après ses autres entreprises.
  const f = piste.fondateur;
  if (f) {
    if (f.business.length) {
      score += 2;
      raisons.push(`le fondateur dirige déjà ${f.business.length === 1 ? 'une autre entreprise' : `${f.business.length} autres entreprises`}`);
      const plusAncienne = Math.min(...f.business.map((e) => Number(e.depuis) || 9999));
      if (plusAncienne <= aujourdhui.getFullYear() - 3) { score += 1; raisons.push(`dont une depuis ${plusAncienne}`); }
    }
    if (f.holding.length) { score += 1; raisons.push('passe par une holding'); }
    if (f.immo.length) { score += 1; raisons.push('a du patrimoine immobilier'); }
    if (f.employeur) { score += 1; raisons.push('une de ses entreprises emploie des salariés'); }
    if (f.ca >= 100000) { score += 2; raisons.push(`une de ses entreprises publie ${f.ca.toLocaleString('fr-FR')} € de chiffre d'affaires`); }
    if (f.tech.length) { score -= 3; raisons.push('un des fondateurs dirige une entreprise informatique'); }
  }
  return { score, pourquoi: raisons.join(' · ') };
}

// Les preuves d'argent que les registres donnent noir sur blanc. « Le fondateur
// dirige une autre entreprise » n'en fait pas partie : seul, ça ne prouve rien.
function preuvesArgent(piste) {
  const preuves = [];
  const h = piste.hausse;
  if (h && h.apres - h.avant >= 5000) preuves.push(`capital augmenté de ${euros(h.avant)} à ${euros(h.apres)} le ${dateFr(h.date)}`);
  if (piste.capital >= 10000) preuves.push(`capital de ${euros(piste.capital)}`);
  if (piste.ca?.ca >= 100000) preuves.push(`chiffre d'affaires de ${euros(piste.ca.ca)} en ${piste.ca.annee}`);
  if (piste.employeur) preuves.push('emploie des salariés');
  if (piste.etablissements >= 2) preuves.push(`${piste.etablissements} établissements ouverts`);
  const f = piste.fondateur;
  if (f?.ca >= 100000) preuves.push(`une autre entreprise du fondateur publie ${euros(f.ca)} de chiffre d'affaires`);
  if (f?.employeur) preuves.push('une autre entreprise du fondateur emploie des salariés');
  return preuves.join(' · ');
}

const CSV_COLONNES = [
  ['score', 'Score'], ['pourquoi', 'Pourquoi'], ['signal', 'Signal'], ['date', 'Publié le'],
  ['entreprise', 'Entreprise'], ['nomCommercial', 'Nom commercial'], ['dirigeant', 'Dirigeant'],
  ['forme', 'Forme'], ['capital', 'Capital (€)'], ['hausseCapital', 'Hausse de capital'], ['preuvesArgent', 'Preuves d\'argent (registres)'],
  ['existeDepuis', 'Existe depuis'],
  ['fondateurTexte', 'Autres entreprises du fondateur'], ['naf', 'Code activité'],
  ['ville', 'Ville'], ['departement', 'Département'], ['activite', 'Activité déclarée'],
  ['lienBodacc', 'Annonce BODACC'], ['lienAnnuaire', 'Fiche entreprise'], ['recherche', 'Recherche Google'],
  ['appEnLigne', 'App déjà en ligne ?'], ['fondateurTechnique', 'Fondateur technique ?'], ['', 'Contact trouvé'], ['', 'Canal'],
  ['', 'Message envoyé le'], ['', 'Relance le'], ['', 'Réponse'], ['', 'Statut'],
];
const cellule = (v) => {
  const s = String(v ?? '');
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// ---------- Programme ----------
async function main() {
  console.log(`Annonces publiées depuis le ${depuis}…`);
  const mots = ['application', 'plateforme', 'saas', 'logiciel'];
  const ou = (champ) => mots.map((m) => `search(${champ},'${m}')`).join(' OR ');

  const creations = await bodacc(
    `familleavis in ('creation','immatriculation') AND dateparution>='${depuis}' AND (${ou('listeetablissements')} OR ${ou('listepersonnes')})`,
  );
  const modifications = await bodacc(
    `familleavis='modification' AND dateparution>='${depuis}' AND search(modificationsgenerales,'activité') AND (${ou('listepersonnes')})`,
  );
  const hausses = (await bodacc(
    `familleavis='modification' AND dateparution>='${depuis}' AND search(modificationsgenerales,'augmentation')`,
  )).filter((r) => {
    const p = premier(json(r.listepersonnes).personne);
    return /capital/i.test(r.modificationsgenerales ?? '') && !FORME_HORS_CIBLE.test(p.formeJuridique ?? '') && !NOM_HORS_CIBLE.test(p.denomination ?? '');
  });
  console.log(`${creations.length} créations, ${modifications.length} changements d'activité et ${hausses.length} hausses de capital à trier.`);

  const parSiren = new Map();
  const ajouter = (r, signal, activiteConnue) => {
    const piste = lirePiste(r, signal);
    if (!piste.activite && activiteConnue) piste.activite = activiteConnue.replace(/\s+/g, ' ').trim();
    const a = piste.activite;
    if (!piste.siren || !APP.test(a) || BRUIT.test(a) || estAgence(a) || METIER_TECH.test(a)) return;
    const deja = parSiren.get(piste.siren);
    if (deja && signal === 'Hausse de capital') return; // déjà sortie par son activité : sa hausse est lue plus bas
    if (!deja || (signal === 'Ajout d\'activité' && deja.signal !== signal) || piste.date > deja.date) parSiren.set(piste.siren, piste);
  };
  creations.forEach((r) => ajouter(r, 'Création'));
  modifications.forEach((r) => ajouter(r, 'Ajout d\'activité'));

  // L'historique de chaque entreprise : l'activité des hausses de capital (leur
  // annonce ne la redit pas) et l'ancien capital de toutes les pistes.
  const histo = await historiques([...parSiren.keys(), ...hausses.map(sirenDe)]);
  for (const r of hausses) {
    const h = derniereHausse(histo.get(sirenDe(r)));
    // Quelques euros, c'est un associé qui entre ; des millions, c'est un grand groupe.
    if (!h || h.apres - h.avant < 5000 || h.apres >= 1000000) continue;
    ajouter(r, 'Hausse de capital', derniereActivite(histo.get(sirenDe(r))));
  }
  let pistes = [...parSiren.values()];
  for (const piste of pistes) {
    piste.hausse = derniereHausse(histo.get(piste.siren));
    if (piste.hausse) piste.hausseCapital = `de ${euros(piste.hausse.avant)} à ${euros(piste.hausse.apres)} le ${dateFr(piste.hausse.date)}`;
  }
  const avecHausse = pistes.filter((p) => p.hausse).length;
  console.log(`${pistes.length} pistes après tri du bruit, dont ${pistes.filter((p) => p.signal === 'Hausse de capital').length} sorties par une hausse de capital, et ${avecHausse} avec une hausse de capital depuis deux ans.`);

  if (!sansAnnuaire) {
    // Mémoire locale de l'annuaire : un lancement par semaine n'interroge que les nouvelles entreprises.
    const fichierCache = join(DOSSIER_SORTIE, '.cache-annuaire.json');
    mkdirSync(DOSSIER_SORTIE, { recursive: true });
    const cache = existsSync(fichierCache) ? JSON.parse(readFileSync(fichierCache, 'utf8')) : {};
    let ecartees = 0;
    let techniques = 0;
    let nouvelles = 0;
    const gardees = [];
    for (const piste of pistes) {
      // Version 2 du cache : elle garde aussi les dirigeants, les salariés et le chiffre d'affaires.
      if (!(piste.siren in cache) || (cache[piste.siren] && cache[piste.siren].v !== 2)) {
        const fiche = await annuaire(piste.siren);
        nouvelles++;
        if (nouvelles % 100 === 0) console.log(`  annuaire : ${nouvelles} fiches lues`);
        cache[piste.siren] = fiche
          ? {
              v: 2,
              ...resumer(fiche),
              nonDiffusible: JSON.stringify(fiche).includes('[NON-DIFFUSIBLE]'),
              existeDepuis: (fiche.date_creation ?? '').slice(0, 4),
              naf: fiche.activite_principale ?? '',
              dirigeant: fiche.dirigeants?.[0]
                ? fiche.dirigeants[0].denomination || `${fiche.dirigeants[0].prenoms ?? ''} ${fiche.dirigeants[0].nom ?? ''}`.trim()
                : '',
            }
          : null;
      }
      const f = cache[piste.siren];
      if (f?.nonDiffusible) { ecartees++; continue; }
      if (f) {
        piste.existeDepuis = f.existeDepuis;
        piste.naf = f.naf;
        if (!piste.dirigeant) piste.dirigeant = f.dirigeant;
        // Une entreprise déjà informatique qui ajoute une application la fera elle-même.
        if (piste.signal === 'Ajout d\'activité' && NAF_TECH.test(f.naf)) { techniques++; continue; }
        // Une société de programmation qui lève de l'argent a ses développeurs.
        if (piste.signal === 'Hausse de capital' && /^62/.test(f.naf)) { techniques++; continue; }
      }
      gardees.push(piste);
    }
    writeFileSync(fichierCache, JSON.stringify(cache));
    pistes = gardees;
    if (ecartees) console.log(`${ecartees} pistes écartées : la personne a refusé la diffusion de ses données.`);
    if (techniques) console.log(`${techniques} pistes écartées : entreprise déjà informatique.`);

    // Profil du fondateur : ses autres entreprises, mises en mémoire elles aussi.
    const fichierFondateurs = join(DOSSIER_SORTIE, '.cache-fondateurs.json');
    const cacheF = existsSync(fichierFondateurs) ? JSON.parse(readFileSync(fichierFondateurs, 'utf8')) : {};
    console.log('Recherche des autres entreprises de chaque fondateur…');
    let vus = 0;
    for (const piste of pistes) {
      const fiche = cache[piste.siren];
      if (!fiche) continue;
      piste.employeur = fiche.employeur;
      piste.ca = fiche.ca;
      piste.etablissements = fiche.etablissements;
      piste.personnes = fiche.dirigeants.filter((d) => !d.pm).map((d) => `${d.prenom} ${d.nom}`);
      Object.assign(piste, lireFondateur(await autresEntreprises(fiche, cacheF)));
      if (++vus % 50 === 0) {
        console.log(`  fondateurs : ${vus} pistes vues`);
        writeFileSync(fichierFondateurs, JSON.stringify(cacheF));
      }
    }
    writeFileSync(fichierFondateurs, JSON.stringify(cacheF));
    const avecAutres = pistes.filter((p) => p.fondateurTexte).length;
    const techs = pistes.filter((p) => p.fondateurTechnique).length;
    console.log(`${avecAutres} pistes dont le fondateur dirige d'autres entreprises, dont ${techs} avec une société informatique.`);
  }

  for (const piste of pistes) {
    Object.assign(piste, noter(piste));
    piste.preuvesArgent = preuvesArgent(piste);
    piste.lienAnnuaire = `https://annuaire-entreprises.data.gouv.fr/entreprise/${piste.siren}`;
    const q = [piste.nomCommercial || piste.entreprise, piste.ville].filter(Boolean).map((x) => `"${x}"`).join(' ');
    piste.recherche = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  }
  pistes.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));

  if (!sansAppStore) {
    const fichierApps = join(DOSSIER_SORTIE, '.cache-appstore.json');
    mkdirSync(DOSSIER_SORTIE, { recursive: true });
    const cacheApps = existsSync(fichierApps) ? JSON.parse(readFileSync(fichierApps, 'utf8')) : {};
    const aVerifier = pistes.filter((p) => p.score >= 7).slice(0, MAX_APP_STORE);
    const nouvelles = aVerifier.filter((p) => !(p.siren in cacheApps)).length;
    if (nouvelles) console.log(`Vérification sur l'App Store de ${nouvelles} pistes, environ ${Math.ceil(nouvelles * 3.3 / 60)} min…`);
    let deja = 0;
    for (const piste of aVerifier) {
      if (!(piste.siren in cacheApps)) {
        const r = await appDejaEnLigne(piste);
        if (r === null) continue; // App Store injoignable : on réessaiera la prochaine fois
        cacheApps[piste.siren] = r;
        writeFileSync(fichierApps, JSON.stringify(cacheApps));
      }
      piste.appEnLigne = cacheApps[piste.siren] || 'Pas sur l\'App Store';
      if (cacheApps[piste.siren]) {
        deja++;
        piste.score -= 2;
        piste.pourquoi += ' · application déjà sur l\'App Store, à faire évoluer plutôt qu\'à créer';
      }
    }
    if (deja) console.log(`${deja} pistes ont déjà leur application sur l'App Store.`);
    pistes.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));
  }

  mkdirSync(DOSSIER_SORTIE, { recursive: true });
  const fichier = join(DOSSIER_SORTIE, `signaux-du-${depuis}-au-${aujourdhui.toISOString().slice(0, 10)}.csv`);
  const lignes = [
    CSV_COLONNES.map(([, titre]) => cellule(titre)).join(','),
    ...pistes.map((p) => CSV_COLONNES.map(([cle]) => cellule(cle ? p[cle] : '')).join(',')),
  ];
  writeFileSync(fichier, '﻿' + lignes.join('\n'), 'utf8');

  console.log(`\n${pistes.length} pistes écrites dans ${fichier}`);
  console.log('Les 10 premières :');
  for (const p of pistes.slice(0, 10)) {
    console.log(`  ${String(p.score).padStart(2)} · ${p.nomCommercial || p.entreprise} (${p.ville}) · ${p.activite.slice(0, 110)}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
