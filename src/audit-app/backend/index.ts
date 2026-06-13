/**
 * Entry point Firebase Functions — backend autonome de /audit-app.
 *
 * Endpoints publiés (region europe-west1) :
 *   - POST /verdictWeb    — appel final (génération verdict IA + CORS)
 *   - POST /auditPartial  — capture des audits abandonnés (un POST par étape)
 *   - GET  /auditStatsAdmin — stats admin lues par Nowork (auth requise)
 */

export { verdictWeb } from "./verdict-web";
export { auditPartial } from "./audit-partial";
export { auditStatsAdmin } from "./audit-stats-admin";
