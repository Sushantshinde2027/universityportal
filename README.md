# ADCET Portal

The **ADCET portal** website (React + Vite) — a college website for Anantrao
Deshpande College of Engineering & Technology, Ashta.

This is the portal **without the AI chatbot**: the floating assistant widget,
the `POST /api/ask` RAG endpoint, the vector index and the ingest tooling have
been removed. Every other page, component and style is unchanged from the
original project.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About ADCET |
| `/courses` | Courses |
| `/faculty` | Faculty |
| `/admissions` | Admissions |
| `/notices` | Notices |
| `/faq` | FAQ |
| `/contact` | Contact |

## Setup

```bash
npm install
```

No environment variables or API keys are required — the site is fully static.

## Run

```bash
npm run dev      # local dev server (Vite)
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Deploy (Vercel)

Import the repo into Vercel — the Vite build is detected automatically and
`vercel.json` handles the SPA rewrites (every route falls back to
`index.html`, so deep links like `/faculty` work on refresh).

## Project structure

```
index.html         # Vite entry point
src/               # React frontend (ADCET portal)
  components/      # Navbar, Footer
  pages/           # Home, About, Courses, Faculty, Admissions, Notices, FAQ, Contact
public/            # favicon, icons, placeholder SVGs
vercel.json        # SPA rewrites
vite.config.js     # Vite + React plugin
```
