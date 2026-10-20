# ADCET Portal

The **ADCET portal** website (React + Vite) for Annasaheb Dange College of
Engineering & Technology, Ashta — with the **ADCET AI Assistant**, a simple
retrieval bot that answers questions from the college knowledge base.

**No LLM, no API keys.** The bot retrieves the best matching knowledge chunk
with hybrid search and returns it verbatim, the same way a reference RAG
project works minus the generation step.

Live: https://universityportal-alpha.vercel.app

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

## AI Assistant

The floating **"Ask ADCET AI"** button (bottom-right, every page) opens a chat
panel with quick-question buttons, avatars, typing dots and New Chat — the
widget is styled after the reference chat template.

### How it answers (same pipeline as the reference project)

```
scrape_website.mjs   rendered portal pages -> data/website_content.txt
clean_data.mjs       curated knowledge base (UPPERCASE sections) -> data/cleaned_content.txt
chunk_data.mjs       split on section headers -> data/chunks.json
create_embeddings.mjs  all-MiniLM-L6-v2 (384-dim) -> data/embeddings.json
api/ask.js           hybrid retrieval, top 3, answer = best chunk
```

Hybrid score inside `api/ask.js`:

```
semantic x 0.45 + keyword x 0.25 + category x 0.30
```

* **semantic** — cosine similarity of the query embedding (all-MiniLM-L6-v2,
  bundled in `models/`, runs inside the Vercel function)
* **keyword** — fraction of query words found in the chunk
* **category** — query category (admission, courses, faculty, placement,
  hostel, contact, ...) matched against the section title

Questions with no category match and no meaningful vocabulary overlap with the
knowledge base get the honest fallback:
*"I don't have that information in the college knowledge base."*

## Setup

```bash
npm install
npm run model       # one-time: downloads the MiniLM ONNX model into models/
npm run ingest      # clean -> chunk -> embed (builds data/embeddings.json)
```

No environment variables or API keys are required.

## Run

```bash
npm run dev         # local dev server (Vite)
npm run build       # production build -> dist/
npm run preview     # preview the production build
npm run lint        # oxlint

npm run test:bot    # ask the bot sample questions (CLI)
npm run debug:bot   # inspect retrieval rankings + score breakdown
node scripts/test_ask.mjs "your own question"
```

To try the widget against a local API:

```bash
node scripts/dev_api.mjs              # bot endpoint on :3001
VITE_API_BASE=http://localhost:3001 npm run dev
```

## Updating the knowledge base

1. `npm run scrape` — re-scrape the portal pages
   (needs `npm i -D playwright && npx playwright install chromium`)
2. Edit the structured knowledge in `scripts/clean_data.mjs`
   (one ALL-CAPS line per section heading — that is what the chunker splits on)
3. `npm run ingest` — rebuild chunks + embeddings
4. Commit and push / redeploy

## Deploy (Vercel)

`vercel.json` configures the `/api/:path*` rewrite, the SPA fallback and the
function bundle (`models/` is included via `includeFiles`, `maxDuration` 30s).

```bash
npx vercel deploy --prod
```

## Project structure

```
index.html            # Vite entry point
src/                  # React frontend
  components/         # Navbar, Footer, AIAssistant (chat widget)
  pages/              # Home, About, Courses, Faculty, Admissions, Notices, FAQ, Contact
api/ask.js            # serverless retriever (no LLM)
data/                 # website_content.txt, cleaned_content.txt, chunks.json, embeddings.json
models/               # bundled all-MiniLM-L6-v2 (ONNX)
scripts/              # scrape, clean, chunk, embed, test, debug, dev server
public/               # favicon, icons, placeholder SVGs
vercel.json           # API rewrite + SPA rewrites + function config
vite.config.js        # Vite + React plugin
```
