# MERN Stack

Monorepo with `server/` (Express + MongoDB) and `client/` (React + Vite).

## Quick start

```bash
# Terminal 1 — backend
cd server
cp .env.example .env    # add your MONGO_URI
npm install
npm run dev             # http://localhost:3000

# Terminal 2 — frontend
cd client
npm install
npm run dev             # http://localhost:5173
```

## Structure

```
mern/
├── server/
│   └── src/
│       ├── index.js        ← Express entry
│       ├── routes/         ← API routes
│       └── models/         ← Mongoose models
└── client/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/     ← Shared components
        └── pages/          ← Page-level components
```
