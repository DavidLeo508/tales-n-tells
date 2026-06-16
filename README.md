# Tales 'N' Tells

A flash-fiction comic anthology website, rebuilt with a clean, content-driven architecture and fully editable through **Netlify Visual Editor (Stackbit)**.

Every headline, paragraph, link, and image source lives in plain content files under [`/content`](./content) — none of it is hardcoded in the page components. This separation is what lets a visual editor (or any headless CMS workflow) treat the marketing copy as data.

## Tech stack

- **Next.js 14** (App Router) — static-friendly React framework
- **Tailwind CSS** — styling, with a small set of comic-book utilities
- **Stackbit / Netlify Visual Editor** — visual editing via `stackbit.config.ts` + a Git content source
- **Netlify Forms** — the talent application and newsletter sign-up
- **lucide-react** — icons
- **TypeScript**

## How it works

```
content/            ← all editable text & image references (the single source of truth)
  data/             ← global header & footer
  pages/            ← one JSON file per page (home, about, tales, talent)
lib/content.ts      ← reads the JSON and attaches Stackbit metadata
components/          ← presentational components; they only render content, never define it
  Sections.tsx      ← maps each section `type` to a component, with data-sb-field-path tags
app/[[...slug]]/    ← one catch-all route renders any page by its slug
stackbit.config.ts  ← models the content files for the visual editor
public/             ← static assets (placeholder cover art, form skeleton)
```

Pages are assembled from an ordered list of **sections**. To change what appears on a page, edit its JSON file in `content/pages` (or use the visual editor) — no component changes required.

## Run locally

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:3000**.

### With the visual editor

Install the Stackbit CLI and run it alongside the dev server to open the editable canvas:

```bash
npx @stackbit/cli@latest dev
```

## Build

```bash
npm run build
```

Deploys to Netlify out of the box (`netlify.toml` enables the Next.js runtime). Forms are detected at build time via `public/__forms.html`.
