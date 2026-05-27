/**
 * Entry point Firebase Functions — backend autonome de /audit-app.
 *
 * Endpoints publiés (region europe-west1) :
 *   - POST /verdictWeb    — appel final (génération verdict IA + CORS)
 *   - POST /auditPartial  — capture des audits abandonnés (un POST par étape)
 */

export { verdictWeb } from "./verdict-web";
export { auditPartial } from "./audit-partial";
