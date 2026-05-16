/**
 * Entry point Firebase Functions — backend autonome de /audit-app.
 *
 * Endpoint publie (region europe-west1) :
 *   - POST /verdictWeb   — appel depuis noecalmes.fr/audit-app (CORS + allowlist)
 */

export { verdictWeb } from "./verdict-web";
