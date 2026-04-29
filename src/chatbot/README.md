# Chatbot — frontend

Module isolé du chatbot IA. Tout ce qui touche au widget vit ici.

## Fichiers

- `Widget.jsx` — composant React : bouton flottant photo Noé + modal chat
- `client.js` — fetch vers Cloud Function + sessionId localStorage + persistance historique
- `styles.css` — animations CSS du widget (pulse, slide-up)
- `README.md` — ce fichier

## Intégration

Importé une seule fois dans `src/App.jsx` :

```jsx
import ChatbotWidget from './chatbot/Widget'
// ...
<ChatbotWidget />
```

## Configuration

Variable d'environnement obligatoire dans `.env.local` (à la racine de
`landing-page/`) :

```
VITE_CHATBOT_API_URL=https://chatbot-XXXXX-ew.a.run.app
```

URL fournie par `firebase deploy` côté backend.
Voir `devis-app/functions/chatbot/README.md` pour le déploiement backend.

## Backend

Le code serveur (handler Gemini, sécurité, Firestore) est dans :
`devis-app/functions/chatbot/`

L'architecture complète est documentée dans :
`devis-app/functions/chatbot/ARCHITECTURE.md`
