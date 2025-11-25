# Frin Patel — Portfolio (React + Vite + Express)

A lightweight portfolio web app with a Vite + React frontend and an Express backend for contact form handling. Polished UI, animated interactions (Framer Motion), a custom cursor, theme toggle, and Vercel deployment ready.

---

## 🔗 Live Demo
https://your-portfolio.vercel.app

## 🛠️ Tech Stack
![React](https://img.shields.io/badge/React-20232A?logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer)
![Nodemailer](https://img.shields.io/badge/Nodemailer-35A8FF)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)

---

## ✨ Features
- ⚡ Ultra-fast Vite development environment
- 🎨 Light/Dark theme with persistence
- 🖱️ Custom animated cursor
- 🎞️ Smooth animations powered by Framer Motion
- 📬 Contact form with backend email handling
- 📱 Fully responsive layout
- 🚀 Production-ready Vercel deployment

---

## ✨ Key highlights
- Fast dev experience with Vite ([client/vite.config.js](client/vite.config.js)).
- Server handles contact emails via Nodemailer ([server/index.js](server/index.js) and [server/routes/contact.js](server/routes/contact.js)).
- Theme persistence with Context API ([client/src/context/ThemeContext.jsx](client/src/context/ThemeContext.jsx)).
- Clean component structure in [client/src/components](client/src/components).
- Vercel-ready with [vercel.json](vercel.json).

---

## 🗂️ Project structure (important files)
- Root scripts and orchestrator: [package.json](package.json) — see [`scripts.start`](package.json) and [`scripts.install-all`](package.json).
- Frontend:
  - [client/package.json](client/package.json) — scripts: [`scripts.dev`](client/package.json), [`scripts.build`](client/package.json), [`scripts.preview`](client/package.json)
  - Entry: [client/src/main.jsx](client/src/main.jsx) and [client/src/App.jsx](client/src/App.jsx)
  - Pages: [client/src/pages/Home.jsx](client/src/pages/Home.jsx), [client/src/pages/About.jsx](client/src/pages/About.jsx), [client/src/pages/Projects.jsx](client/src/pages/Projects.jsx), [client/src/pages/Contact.jsx](client/src/pages/Contact.jsx), [client/src/pages/Resume.jsx](client/src/pages/Resume.jsx), [client/src/pages/Links.jsx](client/src/pages/Links.jsx)
  - Components: [client/src/components/Layout.jsx](client/src/components/Layout.jsx), [client/src/components/ThemeToggle.jsx](client/src/components/ThemeToggle.jsx), [client/src/components/CustomCursor.jsx](client/src/components/CustomCursor.jsx)
  - Styling entry: [client/src/index.css](client/src/index.css)
- Backend:
  - [server/package.json](server/package.json) — scripts: [`scripts.dev`](server/package.json), [`scripts.start`](server/package.json)
  - Server entry: [server/index.js](server/index.js)
  - Contact route: [server/routes/contact.js](server/routes/contact.js)
  - Local env: [server/.env](server/.env) (contains PORT, EMAIL_USER, EMAIL_PASS)

---

## 🧰 Quick start (local)
1. From project root, install dependencies in both client and server:
   - npm run install-all — runs the root installer ([`scripts.install-all`](package.json))

2. Start dev servers (choose one)
   - Single command (runs both): npm run start — uses [`scripts.start`](package.json)
   - Or run separately:
     - cd server && npm run dev — launches Express with nodemon ([server/package.json](server/package.json), [`scripts.dev`](server/package.json))
     - cd client && npm run dev — launches Vite dev server ([client/package.json](client/package.json), [`scripts.dev`](client/package.json))

3. Open the app
   - Frontend (Vite): usually http://localhost:5173 — front entry: [client/src/main.jsx](client/src/main.jsx)
   - Backend API: http://localhost:3001 — server entry: [server/index.js](server/index.js)

---

## 🔐 Environment Variables
Inside /server/.env:
```bash
PORT=3001
EMAIL_USER=your_email
EMAIL_PASS=your_password
```
---


## 📦 Build & deploy
- Build client for production:
  - cd client && npm run build — see [`scripts.build`](client/package.json)
- Vercel config is ready in [vercel.json](vercel.json). It serves the static client build and routes /api/* to server functions.

---

## 📸 Screenshots

### 🏠 Home Page
<p align="center">
  <img src="https://github.com/FrinX019/Portfolio/blob/main/client/public/ScreenShots/Screenshot%201.png" width="800" />
</p>

### 💼 About Me Page
<p align="center">
  <img src="https://github.com/FrinX019/Portfolio/blob/main/client/public/ScreenShots/Screenshot%202.png" width="800" />
</p>

### 💼 Resume Page
<p align="center">
  <img src="https://github.com/FrinX019/Portfolio/blob/main/client/public/ScreenShots/Screenshot%203.png" width="800" />
</p>

### 📞 Contact Page
<p align="center">
  <img src="https://github.com/FrinX019/Portfolio/blob/main/client/public/ScreenShots/Screenshot%204.png" width="800" />
</p>

---

## 📝 Important notes
- Contact form posts to the backend endpoint at http://localhost:3001/api/contact in [client/src/pages/Contact.jsx](client/src/pages/Contact.jsx) which maps to [server/routes/contact.js](server/routes/contact.js).
- Environment variables (email credentials and port) live in [server/.env](server/.env). Do not commit secrets.
- ESLint config for the client is at [client/eslint.config.js](client/eslint.config.js).
- Vite + React plugin config is in [client/vite.config.js](client/vite.config.js).

---

## 💡 Tips & next steps
- Replace the placeholder email credentials in [server/.env](server/.env) with secure secrets (use Vercel environment settings for deployment).
- Add a LICENSE file and a project badge banner if you need public attribution.
- Add unit or integration tests for the server route and key frontend interactions.

---

## 🤝 Contributing
- Fork, update code, open a PR. Keep changes scoped by feature and include changelog entries.

---

## 🎉 Enjoy — quick commands recap
- Install both: npm run install-all — see [`scripts.install-all`](package.json)  
- Dev (both): npm run start — see [`scripts.start`](package.json)  
- Dev server only: cd server && npm run dev — see [server/package.json](server/package.json)  
- Dev client only: cd client && npm run dev — see [client/package.json](client/package.json)  
- Build client: cd client && npm run build — see [`scripts.build`](client/package.json)
