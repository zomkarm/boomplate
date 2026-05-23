# ⚡ boomplate — instant dev scaffolding

Stop wasting time on boilerplate. One command and you're writing real code.

---

## Install (one time)

```bash
cd boomplate
npm install
npm link        # makes `boomplate` available globally in your terminal
```

---

## Usage

### Interactive mode (pick from a menu)
```bash
boomplate
```

### Direct mode (fastest — no prompts)
```bash
boomplate <template> <folder-name>
```

### List all templates
```bash
boomplate list
```

---

## Templates

| Command | What you get |
|---|---|
| `boomplate html5 my-project` | `index.html` + `style.css` + `script.js` — open and code |
| `boomplate css-sass my-project` | Vite + SASS, hot reload, variables & mixins ready |
| `boomplate vanilla-js my-project` | Vite + plain JS, ES modules, HMR |
| `boomplate react my-project` | React 18 + Vite, JSX, dark theme starter |
| `boomplate react-ts my-project` | React 18 + TypeScript + Vite, strict mode |
| `boomplate express my-project` | Express + nodemon + dotenv + cors + sample routes |
| `boomplate express-mongo my-project` | Express + Mongoose, full CRUD routes, .env wired |
| `boomplate nextjs my-project` | Next.js 14 App Router + Tailwind CSS |
| `boomplate mern my-project` | Full MERN monorepo (client/ + server/) with Vite proxy |
| `boomplate node-cli my-project` | Commander + chalk CLI skeleton, ready to `npm link` |

---

## Examples

```bash
# Revising HTML5 canvas? 10 seconds to coding:
boomplate html5 canvas-practice
cd canvas-practice
# open index.html in VSCode with Live Server

# Building an Express API:
boomplate express user-api
cd user-api
npm run dev     # nodemon watching, http://localhost:3000

# Starting a MERN project:
boomplate mern my-app
cd my-app/server && cp .env .env && npm run dev
cd my-app/client && npm run dev
```

---

## Add your own templates

1. Create a folder in `templates/your-template-name/`
2. Add your files (use `_gitignore` and `_env` — they get renamed on scaffold)
3. Register it in `bin/boomplate.js` under the `TEMPLATES` object:
   ```js
   "your-template-name": {
     label: "My Template",
     desc: "What it does",
     group: "Frontend",   // Frontend | Backend | Fullstack | Node
     install: true,       // run npm install after scaffold?
   }
   ```
4. Done. `boomplate list` will show it immediately.

---

## Unlink

```bash
npm unlink -g boomplate
```
