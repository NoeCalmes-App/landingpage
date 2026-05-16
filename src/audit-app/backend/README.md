# Backend `/verdictWeb` — autonome dans landing-page

Ce dossier est la **source de deploiement Firebase Functions** pour l'endpoint
`/verdictWeb` consomme par la page React `/audit-app`. Il est totalement
autonome : `firebase deploy` se lance depuis ce dossier, plus besoin du repo
`manychat-funnel`.

## Architecture

| Fichier | Role |
|---|---|
| `index.ts` | Entry point — re-exporte `verdictWeb` |
| `verdict-web.ts` | Endpoint HTTP `/verdictWeb` (CORS, rate limit, validation Zod) |
| `ai-orchestrator-v2-web.ts` | Chaine multi-provider Gemini -> OpenAI -> Claude |
| `prompts-v2-web.ts` | Prompt systeme value-first + builder de prompt utilisateur |
| `branch.ts` | Logique branchement budget A/C + fallbacks |
| `types.ts` | Types et schemas Zod |
| `providers/parse.ts` | Parser JSON tolerant aux fences markdown |
| `package.json` | Dependencies Firebase Functions + SDKs IA |
| `tsconfig.json` | TS commonjs, target es2022, sortie dans `lib/` |
| `firebase.json` | Codebase Firebase nommee `audit-web` |
| `.firebaserc` | Projet Firebase `manychatia-82692` |

## Premier setup (a faire une seule fois)

```bash
cd ~/Dev/WEB/landing-page/src/audit-app/backend
npm install
```

## Deploiement

```bash
cd ~/Dev/WEB/landing-page/src/audit-app/backend
npm run deploy
# equivalent : firebase deploy --only functions:verdictWeb
```

Le `predeploy` du `firebase.json` lance `npm run build` automatiquement (compile
les `.ts` vers `lib/`).

## Logs en prod

```bash
cd ~/Dev/WEB/landing-page/src/audit-app/backend
npm run logs
# equivalent : firebase functions:log --only verdictWeb
```

## Secrets Firebase necessaires

Le code utilise 3 secrets (au moins UN doit etre defini) :
- `GEMINI_API_KEY` (priorite 1, le moins cher)
- `OPENAI_API_KEY` (fallback si Gemini fail)
- `ANTHROPIC_API_KEY` (fallback final)

Pour les definir (premiere fois) :
```bash
firebase functions:secrets:set GEMINI_API_KEY
firebase functions:secrets:set OPENAI_API_KEY
firebase functions:secrets:set ANTHROPIC_API_KEY
```

Les secrets sont partages au niveau du projet Firebase `manychatia-82692` — ils
sont deja configures (ils etaient utilises par l'ancienne version dans
`manychat-funnel`).

## Pourquoi un codebase Firebase dedie ?

`firebase.json` utilise `"codebase": "audit-web"` pour que ce backend cohabite
proprement avec les autres functions du projet (qui restent deployees depuis
`~/Dev/WEB/manychat-funnel` : `verdict`, `verdictV2`, `pdfEmail`,
`calendlyWebhook`). Chaque codebase deploie ses propres fonctions
independamment.

## Test local

```bash
cd ~/Dev/WEB/landing-page/src/audit-app/backend
npm run serve
# Lance les emulateurs Firebase Functions en local
```

## Le frontend qui consomme cet endpoint

Front : `src/audit-app/AuditApp.jsx` -> `src/audit-app/api.js` -> fetch sur
`VITE_AUDIT_API_URL` (.env.local + .env.production), qui pointe sur l'URL
publique :
`https://europe-west1-manychatia-82692.cloudfunctions.net/verdictWeb`
