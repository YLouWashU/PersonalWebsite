# Personal Website — Design Spec

**Date:** 2026-04-23  
**Project root:** `~/Code/PersonalWebsite/`  
**Live domain:** `yang-lou.com`

---

## Goal

A personal portfolio site at the root of yang-lou.com that showcases software engineering work, classical music projects, and side projects to a broad audience (recruiters, collaborators, the general public). The site acts as a polished showcase layer — each project links out to its actual tool or resource.

---

## Audience

Everyone: recruiters, clients/collaborators, and the general public. The site should feel both professional and personable.

---

## Content & Structure

### Pages

| Route | Description |
|---|---|
| `/` | Single scrolling landing page |
| `/projects/[slug]` | Individual project detail page |

### Landing page sections (top to bottom)

1. **Nav** — Name on left, anchor links (About, Projects, Contact) on right
2. **Hero** — Short tagline that bridges software and music (e.g. *"I build things that think and things that sing."*), one-sentence bio
3. **About** — Photo + 3–4 sentence bio connecting the technical and musical sides
4. **Projects** — Filterable grid of project cards (filter tabs: All / Software / Music / Fun). Each card has: category tag, catchy title, one-line hook. Clicking → detail page.
5. **Contact** — Short warm invitation, Email button + LinkedIn button

### Project detail page

- Back link → landing page
- Category + year tag
- Italic catchy title
- One-sentence hook
- Action links: "Open [Project] →" (links to live tool), optional GitHub link
- Optional screenshot / demo image
- Markdown body: full write-up (what it is, how it works, motivation, tech notes)
- Prev / Next project navigation

### No resume section
Resume/experience is intentionally excluded. Projects speak for themselves.

---

## Architecture

**Framework:** Astro (static site, zero JS by default)

**File structure:**
```
~/Code/PersonalWebsite/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Landing page
│   │   └── projects/
│   │       └── [slug].astro     # Detail page template
│   ├── content/
│   │   └── projects/
│   │       ├── lipu.md          # One .md file per project
│   │       └── [other].md
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectGrid.astro
│   │   └── Contact.astro
│   └── layouts/
│       ├── BaseLayout.astro
│       └── ProjectLayout.astro
├── public/
│   └── (static assets: fonts, images, favicon)
└── astro.config.mjs
```

**Project content format** (Markdown frontmatter):
```yaml
---
title: "Sheet Music That Listens Back"   # catchy display title
slug: lipu
category: Music                           # Software | Music | Fun
year: 2024
tagline: "One punchy hook sentence."
liveUrl: https://yang-lou.com/projects/lipu/
githubUrl: https://github.com/...         # optional
image: /images/projects/lipu.png          # optional
---

Full write-up in Markdown here...
```

**Existing tool paths:** The actual tool pages (e.g. `yang-lou.com/projects/lipu/`) are separate from this Astro project and remain unchanged. The personal site detail pages link out to them via `liveUrl`.

---

## Design System

### Color palette — Ivory & Sage

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg` | `#f7f3ee` |
| Primary text | `--text` | `#1a2218` |
| Sage accent | `--accent` | `#7a9c7e` |
| Muted / secondary text | `--muted` | `#5a6e5c` |
| Card background | `--card-bg` | `#ffffff` |
| Borders | `--border` | `#ddd6c8` |
| Warm highlight (Fun projects) | `--warm` | `#c8945a` |

### Typography

- **Display / headings:** EB Garamond (Google Fonts) — elegant serif, editorial feel
- **Body text:** System sans-serif stack (`ui-sans-serif, system-ui, sans-serif`) — readable, zero extra load
- **Code / technical:** `ui-monospace` for inline code in project write-ups

### Tone

Project titles for "fun" projects should be catchy and human — e.g. *"Sheet Music That Listens Back"* rather than *"Lipu — harmonic analysis tool"*. Software and Music project titles can be more descriptive but still have personality.

---

## Contact

- **Email:** single styled link/button → `mailto:` 
- **LinkedIn:** styled outline button → LinkedIn profile URL
- No contact form

---

## Deployment

- Astro builds to static HTML/CSS/JS
- Deploy target: Vercel or Netlify (free tier, auto-deploy from GitHub, custom domain support)
- Point yang-lou.com domain DNS to the hosting platform
- Existing tool subpaths (e.g. `/projects/lipu/`) are hosted separately and unaffected

---

## Out of Scope

- Resume / work experience page
- Contact form
- Blog or writing section
- Dark mode toggle (single theme for now)
- CMS (Markdown files are the content source)
