# 💕 Date App

A romantic interactive web app that lets you ask someone special out on a date — with style.

## ✨ Features

- **Name Entry** — Personalised greeting based on who's opening the app
- **Landing Overlay** — A warm, classy welcome screen
- **The Question** — Ask the big question with a playful "No" button that runs away
- **Date Type Selector** — Choose the vibe: dinner, picnic, movies & more
- **Date & Time Picker** — Pick the perfect moment (no past dates allowed)
- **Confirmation Card** — A personalised confirmation message with full date details
- Classy burgundy + gold UI with Playfair Display & Lato fonts
- Fully responsive — works beautifully on mobile and desktop

## 🗂 Project Structure

```
Date_App_V2/
├── Backend/          # Express API (Node.js)
│   ├── src/
│   │   ├── app.js
│   │   ├── app.test.js
│   │   ├── controllers/dateController.js
│   │   └── routes/dateRoutes.js
│   └── index.js
└── frontend/
    └── react/        # Vite + React frontend
        └── src/
            ├── components/
            ├── pages/
            └── services/
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Backend

```bash
cd Backend
npm install
npm start
```

Runs on `http://localhost:3000`

### Frontend

```bash
cd frontend/react
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Environment Variables

Create a `.env` file in `frontend/react/`:

```env
VITE_API_URL=http://localhost:3000/api/v1/dates
```

For production, set `VITE_API_URL` to your deployed backend URL.

## 🧪 Tests

```bash
cd Backend
npm test
```

4 tests covering `GET /` and `POST /addDate` using vitest + supertest.

## 🛠 Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend  | Express 5, Node.js          |
| Testing  | Vitest, Supertest           |
| Fonts    | Playfair Display, Lato      |
| Icons    | Lucide React                |
| Deploy   | Vercel                      |

## 📸 Preview

> *"Othandwa ndim!!"* 💕

---

Made with love 🌹
