# AGENTS.md

Guidance for AI agents working on this repository.

## What this is

A content-driven marketing/anthology site for "Tales 'N' Tells" built with **Next.js 14 (App Router)** and made fully editable through **Netlify Visual Editor (Stackbit)**. It was rebuilt from an earlier Vite/React/tRPC app; the rebuild deliberately drops the backend and stores all editorial content as flat files so a visual CMS can drive it.

## Golden rule: content is data, not code

**Never hardcode copy, headings, link text, or image URLs in components.** All of that belongs in `/content`. Components are presentational only — they receive content objects and render them. If you need to change wording or imagery, edit the JSON in `content/`.

## Architecture

- `content/data/*.json` — global singletons (`header`, `footer`).
- `content/pages/*.json` — one file per page. Each has `type: "page"`, a `slug`, a `title`, and an ordered `sections` array. Each section has a `type` that maps to a model in `stackbit.config.ts` and a renderer in `components/Sections.tsx`.
- `lib/content.ts` — reads files from disk and attaches `__metadata.id` (the file path), which becomes the `data-sb-object-id` anchor for visual editing. Server-only (uses `node:fs`).
- `app/[[...slug]]/page.tsx` — a single optional-catch-all route. `generateStaticParams` pre-renders every page document; the home page (`slug: "home"`) is served at `/`.
- `components/Sections.tsx` — the section registry. Add a new section by: (1) adding a model in `stackbit.config.ts`, (2) adding its name to `sectionModelNames`, (3) adding a `case` + renderer here.
- `components/Header.tsx` / `Footer.tsx` — read the global data singletons.

## Visual editor annotations (important)

Editing works through `data-sb-*` attributes that the browser resolves by DOM ancestry:

- The page root in `app/[[...slug]]/page.tsx` carries `data-sb-object-id={page.__metadata.id}`.
- `Sections` wraps the list in `data-sb-field-path="sections"` and each item in `data-sb-field-path=".{index}"`.
- Inside a section, fields use **relative** paths like `data-sb-field-path=".title"`. Images annotate the attribute: `data-sb-field-path=".image#@src"`.

The full path (e.g. `sections.0.title`) is assembled by concatenating ancestors — so keep the wrapping structure intact when editing a section component. The relative paths must exactly match field names in the corresponding `stackbit.config.ts` model.

## Conventions

- TypeScript throughout. Section data is loosely typed as `Section` (a record); cast fields at the point of use.
- Tailwind for styling. Theme colors: `ink` (near-black bg), `bone` (off-white text), `accent` (crimson). Comic utilities (`halftone`, `comic-panel`, `mesh-bg`) live in `app/globals.css`.
- Server Components by default. Only `components/RecruitmentForm.tsx` is a Client Component (`"use client"`), because it manages form state.

## Netlify Forms

Two forms exist: `talent-application` and `newsletter`. Because the app is SSR-rendered, Netlify cannot detect forms from the React output — `public/__forms.html` is a static skeleton listing every form/field for build-time detection. The talent form submits via AJAX to `/__forms.html` (not `/`, which the Next handler would intercept). If you add or change a form, **update `public/__forms.html` to match** and re-run `node /opt/buildhome/.claude/skills/netlify-forms/scripts/enable.cjs`.

## Gotchas

- The dev server runs on port **3000** (`next dev -p 3000`) — required for the Stackbit editor's local preview.
- Placeholder cover/hero art under `public/images` is generated SVG. Real imagery can be dropped in and referenced from the content JSON.
- Do not run `npm run build`/`tsc` to "check" work in this environment — the Netlify pipeline validates builds automatically.
