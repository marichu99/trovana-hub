# Trovana Hub

A bold, highly interactive single-page portfolio site for Trovana Hub — a small digital studio
offering website development, digital advertising and AI property videos. The site itself is a
showcase of what the studio can build.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (reveals, magnetic buttons, cursor, counters, form states)
- GSAP + ScrollTrigger (pinned horizontal gallery, process timeline fill, marquee scroll-speed)
- Lenis (smooth scroll, synced to GSAP's ticker)

## Structure

- `index.html` — Vite entry point with SEO/Open Graph meta tags and font links
- `src/App.tsx` — top-level layout: loader, cursor, nav, sections, footer
- `src/components/` — shared UI (navbar, cursor, loader, scroll progress, footer)
- `src/components/sections/` — one component per page section (hero, services, work, etc.)
- `src/data/` — editable content arrays (services, projects, process steps, stats)
- `src/lib/` — hooks (Lenis setup, reduced-motion, magnetic buttons, count-up)
- `assets/favicon.svg`, `public/og-image.png` — brand assets

## Editing content

- Swap project case studies in `src/data/projects.ts`.
- Edit service copy in `src/data/services.ts`.
- Placeholder media (before/after slider, phone mockup video, work gallery thumbnails) is clearly
  labeled in the relevant section components under `src/components/sections/` — replace with real
  photos/videos when available.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Deployed via Vercel (project already linked — see `.vercel/`). Deploy with the Vercel CLI or by
pushing to the connected Git branch.
