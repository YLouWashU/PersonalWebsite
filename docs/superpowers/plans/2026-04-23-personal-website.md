# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Yang Lou's personal portfolio site at yang-lou.com — a single-page scrolling landing with individual project detail pages, using Astro and an Ivory & Sage design system.

**Architecture:** Astro static site with content collections for projects. The landing page (`/`) is a single scroll: Nav → Hero → About → Projects (filterable grid) → Contact. Each project card links to `/projects/[slug]`, a detail page generated from Markdown files in `src/content/projects/`. No backend, no CMS.

**Tech Stack:** Astro 4.x, TypeScript (strict), EB Garamond (Google Fonts), vanilla JS (filter only), Vercel for deployment.

---

### Task 1: Scaffold Astro project and initialize git

**Files:**
- Create: `~/Code/PersonalWebsite/` (entire scaffold)
- Create: `~/Code/PersonalWebsite/astro.config.mjs`

- [ ] **Step 1: Scaffold Astro project**

```bash
cd ~/Code
npm create astro@latest PersonalWebsite -- --template minimal --install --git --typescript strict --yes
cd PersonalWebsite
```

Expected: `src/pages/index.astro`, `astro.config.mjs`, `tsconfig.json`, `package.json` created. `node_modules/` populated.

- [ ] **Step 2: Replace `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yang-lou.com',
});
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at http://localhost:4321, page loads without errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Set up global CSS design system

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
:root {
  --bg: #f7f3ee;
  --text: #1a2218;
  --accent: #7a9c7e;
  --muted: #5a6e5c;
  --card-bg: #ffffff;
  --border: #ddd6c8;
  --warm: #c8945a;
  --font-serif: 'EB Garamond', Georgia, serif;
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 400;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

p { margin: 0 0 1rem; }
a { color: var(--accent); }
img { max-width: 100%; display: block; }
code, pre { font-family: var(--font-mono); }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add design system CSS variables and base reset"
```

---

### Task 3: Build BaseLayout component

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#7a9c7e" rx="4"/>
  <text x="16" y="23" font-size="18" text-anchor="middle" fill="white" font-family="Georgia,serif">Y</text>
</svg>
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Yang Lou',
  description = 'Software engineer and classical musician.',
} = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Update `src/pages/index.astro` to verify layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout>
  <p style="padding: 2rem; font-family: 'EB Garamond', serif; font-size: 1.5rem;">Hello — layout works</p>
</BaseLayout>
```

- [ ] **Step 4: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:4321. Expected: ivory background (`#f7f3ee`), EB Garamond font loads, page title is "Yang Lou".

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro public/favicon.svg
git commit -m "feat: add BaseLayout with EB Garamond font and meta tags"
```

---

### Task 4: Build Nav component

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
---
<nav>
  <a href="/" class="nav-name">Yang Lou</a>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
.nav-name {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}
.nav-links a:hover { color: var(--accent); }

@media (max-width: 480px) {
  nav { padding: 0.875rem 1.25rem; }
  .nav-links { gap: 1rem; }
}
</style>
```

- [ ] **Step 2: Add Nav to `src/pages/index.astro` and verify**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
---
<BaseLayout>
  <Nav />
  <main style="padding: 2rem;">Content here</main>
</BaseLayout>
```

```bash
npm run dev
```

Expected: sticky nav with "Yang Lou" left, "About · Projects · Contact" right, sage hover color.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add Nav component"
```

---

### Task 5: Build Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
---
<section class="hero">
  <p class="label">Software Engineer · Musician</p>
  <h1>I build things that <em>think</em><br />and things that <em>sing.</em></h1>
  <p class="bio">
    Engineer by training, musician by passion — I write software that solves real problems
    and music that asks interesting questions.
  </p>
</section>

<style>
.hero {
  padding: 4.5rem 2rem 3.5rem;
  border-bottom: 1px solid var(--border);
  max-width: 720px;
  margin: 0 auto;
}
.label {
  color: var(--accent);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
}
h1 {
  font-size: clamp(1.875rem, 5vw, 2.75rem);
  color: var(--text);
  margin: 0 0 1.25rem;
}
h1 em { font-style: italic; }
.bio {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.75;
  max-width: 500px;
  margin: 0;
}

@media (max-width: 480px) {
  .hero { padding: 3rem 1.25rem 2.5rem; }
}
</style>
```

- [ ] **Step 2: Add Hero to index.astro and verify**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---
<BaseLayout>
  <Nav />
  <main>
    <Hero />
  </main>
</BaseLayout>
```

```bash
npm run dev
```

Expected: large serif italic headline, sage uppercase label above it, muted body text.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component"
```

---

### Task 6: Build About component

**Files:**
- Create: `src/components/About.astro`
- Create: `public/images/` (directory for assets)

- [ ] **Step 1: Create `public/images/` directory with a placeholder**

```bash
mkdir -p public/images
```

Create `public/images/photo.jpg` — place any square image here as a placeholder. The final photo will be added in Task 14. If no image is available, create a placeholder SVG named `photo.svg` and update the `<img>` src in About.astro to `/images/photo.svg`.

- [ ] **Step 2: Create `src/components/About.astro`**

```astro
---
---
<section id="about" class="about">
  <img src="/images/photo.jpg" alt="Yang Lou" class="photo" />
  <div class="content">
    <p class="label">About</p>
    <p>
      I'm a software engineer and classical musician.
      By day I build software that solves real problems;
      by night I work with music that asks interesting questions.
      I'm drawn to projects where precision and creativity overlap —
      whether that's a well-architected system or a well-voiced chord.
    </p>
  </div>
</section>

<style>
.about {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 3.5rem 2rem;
  border-bottom: 1px solid var(--border);
  max-width: 720px;
  margin: 0 auto;
}
.photo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--border);
}
.content { flex: 1; }
.label {
  color: var(--accent);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 0.875rem;
}
.content p:last-child {
  margin: 0;
  color: var(--text);
  line-height: 1.75;
  font-size: 0.9375rem;
}

@media (max-width: 560px) {
  .about { flex-direction: column; padding: 2.5rem 1.25rem; }
}
</style>
```

- [ ] **Step 3: Add About to index.astro and verify**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
---
<BaseLayout>
  <Nav />
  <main>
    <Hero />
    <About />
  </main>
</BaseLayout>
```

```bash
npm run dev
```

Expected: circular photo + "About" label + bio text side by side. Stacks vertically on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro public/images/
git commit -m "feat: add About component"
```

---

### Task 7: Set up content collections

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/lipu.md`
- Create: `public/images/projects/` (directory for project screenshots)

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortName: z.string().optional(),
    category: z.enum(['Software', 'Music', 'Fun']),
    year: z.number(),
    tagline: z.string(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Create `src/content/projects/lipu.md`**

```markdown
---
title: "Sheet Music That Listens Back"
shortName: Lipu
category: Music
year: 2024
tagline: "Upload a PDF score, get harmonic analysis. Classical music meets modern tooling."
liveUrl: https://yang-lou.com/projects/lipu/
image: /images/projects/lipu.png
---

## What it is

Lipu is a web-based harmonic analysis tool for classical music scores. Upload a PDF or MusicXML file and it extracts harmonic progressions, identifies key areas, and annotates the score with Roman numeral analysis.

## Why I built it

Harmonic analysis is a core skill in classical music education, but doing it by hand is slow. I wanted a tool that could handle the mechanical parts — note identification, interval calculation, chord labeling — so musicians could focus on interpretation.

## How it works

The backend parses the score using music21 (Python), extracts note events per measure, and runs a rule-based harmonic analysis algorithm. Results are returned as JSON and rendered as an annotated overlay on the score viewer.

## Tech stack

Python · music21 · Flask · JavaScript · PDF.js
```

- [ ] **Step 3: Create `public/images/projects/` directory**

```bash
mkdir -p public/images/projects
```

Project screenshots go here as `public/images/projects/<slug>.png`. Add them when available; the detail page handles a missing image gracefully (the `<img>` is only rendered if `image` is set in frontmatter).

- [ ] **Step 4: Verify TypeScript picks up the schema**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/ public/images/projects/
git commit -m "feat: add content collection schema and lipu project entry"
```

---

### Task 8: Build ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Create `src/components/ProjectCard.astro`**

```astro
---
interface Props {
  slug: string;
  title: string;
  category: 'Software' | 'Music' | 'Fun';
  tagline: string;
}

const { slug, title, category, tagline } = Astro.props;

const categoryColor = {
  Software: 'var(--muted)',
  Music: 'var(--accent)',
  Fun: 'var(--warm)',
}[category];
---
<a href={`/projects/${slug}`} class="card" data-category={category}>
  <span class="tag" style={`color: ${categoryColor}`}>{category}</span>
  <h3>{title}</h3>
  <p>{tagline}</p>
</a>

<style>
.card {
  display: block;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}
.tag {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
h3 {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0.4rem;
  color: var(--text);
}
p {
  margin: 0;
  color: var(--muted);
  font-size: 0.8125rem;
  line-height: 1.5;
}
</style>
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: add ProjectCard component"
```

---

### Task 9: Build ProjectGrid component with category filter

**Files:**
- Create: `src/components/ProjectGrid.astro`

- [ ] **Step 1: Create `src/components/ProjectGrid.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import ProjectCard from './ProjectCard.astro';

interface Props {
  projects: CollectionEntry<'projects'>[];
}

const { projects } = Astro.props;
---
<section id="projects" class="projects-section">
  <p class="label">Projects</p>
  <div class="filters" role="group" aria-label="Filter projects by category">
    <button class="filter active" data-filter="All">All</button>
    <button class="filter" data-filter="Software">Software</button>
    <button class="filter" data-filter="Music">Music</button>
    <button class="filter" data-filter="Fun">Fun</button>
  </div>
  <div class="grid">
    {projects.map(p => (
      <ProjectCard
        slug={p.slug}
        title={p.data.title}
        category={p.data.category}
        tagline={p.data.tagline}
      />
    ))}
  </div>
</section>

<style>
.projects-section {
  padding: 3.5rem 2rem;
  border-bottom: 1px solid var(--border);
  max-width: 720px;
  margin: 0 auto;
}
.label {
  color: var(--accent);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}
.filter {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 0.3rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.filter.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.filter:hover:not(.active) {
  border-color: var(--accent);
  color: var(--accent);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

@media (max-width: 480px) {
  .projects-section { padding: 2.5rem 1.25rem; }
  .grid { grid-template-columns: 1fr; }
}
</style>

<script>
const filters = document.querySelectorAll<HTMLButtonElement>('.filter');
const cards = document.querySelectorAll<HTMLElement>('.card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.filter;
    cards.forEach(card => {
      const show = selected === 'All' || card.dataset.category === selected;
      card.style.display = show ? '' : 'none';
    });
  });
});
</script>
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectGrid.astro
git commit -m "feat: add ProjectGrid with category filter"
```

---

### Task 10: Build Contact component

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Create `src/components/Contact.astro`**

Replace the two placeholder values with real email and LinkedIn URL before committing.

```astro
---
const EMAIL = 'your@email.com';                          // ← replace with your email
const LINKEDIN = 'https://linkedin.com/in/yourprofile'; // ← replace with your LinkedIn URL
---
<section id="contact" class="contact">
  <p class="label">Contact</p>
  <p class="invite">Want to talk code, music, or anything in between? Reach out.</p>
  <div class="actions">
    <a href={`mailto:${EMAIL}`} class="btn-primary">Email me</a>
    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" class="btn-outline">LinkedIn</a>
  </div>
</section>

<style>
.contact {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}
.label {
  color: var(--accent);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 0.875rem;
}
.invite {
  color: var(--text);
  margin: 0 0 2rem;
  font-size: 1rem;
  line-height: 1.6;
}
.actions {
  display: flex;
  gap: 0.875rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--accent);
  color: white;
  padding: 0.625rem 1.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.88; }
.btn-outline {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--muted);
  padding: 0.625rem 1.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}
.btn-outline:hover { color: var(--accent); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add Contact component"
```

---

### Task 11: Assemble the landing page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` with the final landing page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import ProjectGrid from '../components/ProjectGrid.astro';
import Contact from '../components/Contact.astro';

const allProjects = await getCollection('projects');
const projects = allProjects.sort((a, b) => b.data.year - a.data.year);
---
<BaseLayout>
  <Nav />
  <main>
    <Hero />
    <About />
    <ProjectGrid projects={projects} />
    <Contact />
  </main>
</BaseLayout>

<style>
main { width: 100%; }
</style>
```

- [ ] **Step 2: Run dev server and verify the full landing page**

```bash
npm run dev
```

Open http://localhost:4321. Check each section:
- Nav is sticky, anchor links scroll to `#about`, `#projects`, `#contact`
- Hero shows the serif italic headline
- About shows photo + bio
- Projects shows the Lipu card with "Music" tag in sage green
- Filter buttons: clicking "Software" hides Lipu, "Music" shows it, "All" shows everything
- Contact shows two action buttons

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: `dist/index.html` generated, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble landing page"
```

---

### Task 12: Build ProjectLayout component

**Files:**
- Create: `src/layouts/ProjectLayout.astro`

- [ ] **Step 1: Create `src/layouts/ProjectLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<BaseLayout title={`${title} — Yang Lou`} description={description}>
  <header class="project-nav">
    <a href="/" class="back">← Yang Lou</a>
    <span class="site-name">Yang Lou</span>
  </header>
  <main class="project-main">
    <slot />
  </main>
</BaseLayout>

<style>
.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 2rem;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
.back {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}
.back:hover { color: var(--accent); }
.site-name {
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
}
.project-main {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

@media (max-width: 480px) {
  .project-nav { padding: 0.875rem 1.25rem; }
  .project-main { padding: 0 1.25rem 4rem; }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/ProjectLayout.astro
git commit -m "feat: add ProjectLayout"
```

---

### Task 13: Build project detail page

**Files:**
- Create: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Create `src/pages/projects/[slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import ProjectLayout from '../../layouts/ProjectLayout.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(p => ({
    params: { slug: p.slug },
    props: { project: p },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();

const allProjects = await getCollection('projects');
const sorted = allProjects.sort((a, b) => b.data.year - a.data.year);
const idx = sorted.findIndex(p => p.slug === project.slug);
const prev = sorted[idx + 1] ?? null;
const next = sorted[idx - 1] ?? null;

const categoryColor = {
  Software: 'var(--muted)',
  Music: 'var(--accent)',
  Fun: 'var(--warm)',
}[project.data.category];

const buttonLabel = project.data.shortName ?? 'Open project';
---
<ProjectLayout title={project.data.title} description={project.data.tagline}>
  <div class="project-header">
    <span class="meta" style={`color: ${categoryColor}`}>
      {project.data.category} · {project.data.year}
    </span>
    <h1>{project.data.title}</h1>
    <p class="tagline">{project.data.tagline}</p>
    <div class="actions">
      {project.data.liveUrl && (
        <a href={project.data.liveUrl} target="_blank" rel="noopener noreferrer" class="btn-primary">
          {buttonLabel} →
        </a>
      )}
      {project.data.githubUrl && (
        <a href={project.data.githubUrl} target="_blank" rel="noopener noreferrer" class="btn-outline">
          GitHub
        </a>
      )}
    </div>
  </div>

  {project.data.image && (
    <img src={project.data.image} alt={project.data.title} class="hero-image" />
  )}

  <div class="prose">
    <Content />
  </div>

  <nav class="pagination">
    {prev
      ? <a href={`/projects/${prev.slug}`} class="page-link">← {prev.data.title}</a>
      : <span />
    }
    {next
      ? <a href={`/projects/${next.slug}`} class="page-link">{next.data.title} →</a>
      : <span />
    }
  </nav>
</ProjectLayout>

<style>
.project-header {
  padding: 3rem 0 2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.5rem;
}
.meta {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.875rem;
}
h1 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-style: italic;
  margin: 0 0 0.75rem;
  color: var(--text);
}
.tagline {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.75rem;
}
.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--accent);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.88; }
.btn-outline {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--muted);
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}
.btn-outline:hover { color: var(--accent); }
.hero-image {
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--border);
  margin-bottom: 2.5rem;
}
.prose {
  color: var(--text);
  line-height: 1.8;
  font-size: 0.9375rem;
}
.prose h2 {
  font-size: 1.25rem;
  margin: 2rem 0 0.75rem;
}
.prose p { margin: 0 0 1.25rem; }
.prose code {
  background: var(--border);
  padding: 0.15em 0.35em;
  border-radius: 3px;
  font-size: 0.875em;
}
.prose a { color: var(--accent); }
.prose ul, .prose ol {
  padding-left: 1.5rem;
  margin: 0 0 1.25rem;
}
.pagination {
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
  margin-top: 3rem;
}
.page-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s;
}
.page-link:hover { color: var(--text); }
</style>
```

- [ ] **Step 2: Run dev server and verify detail page**

```bash
npm run dev
```

Open http://localhost:4321/projects/lipu. Verify:
- Sticky nav shows "← Yang Lou" (links back to `/`) and "Yang Lou" on right
- "Music · 2024" in sage green
- Italic title "Sheet Music That Listens Back"
- "Lipu →" button linking to `https://yang-lou.com/projects/lipu/`
- Full write-up renders as formatted prose
- Pagination row renders (empty on both sides since only one project exists)

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: `dist/projects/lipu/index.html` generated, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects/
git commit -m "feat: add project detail page with prev/next navigation"
```

---

### Task 14: Add personal content and remaining projects

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/About.astro`
- Modify: `src/components/Contact.astro`
- Add: `public/images/photo.jpg`
- Add: `src/content/projects/*.md` (one per additional project)
- Add: `public/images/projects/*.png` (one per project screenshot, optional)

- [ ] **Step 1: Replace placeholder bio in `src/components/Hero.astro`**

Edit the `.bio` paragraph — replace the placeholder with your real 1–2 sentence intro.

- [ ] **Step 2: Replace placeholder bio in `src/components/About.astro`**

Edit the `<p>` body — replace with your real 3–4 sentence bio connecting the technical and musical sides of your work.

- [ ] **Step 3: Fill in real email and LinkedIn in `src/components/Contact.astro`**

```ts
const EMAIL = 'your.actual@email.com';
const LINKEDIN = 'https://linkedin.com/in/your-actual-handle';
```

- [ ] **Step 4: Add your portrait photo**

Place a square portrait image at `public/images/photo.jpg`. Minimum 176×176px, ideally 400×400px.

- [ ] **Step 5: Add each additional project**

For each project, create `src/content/projects/<slug>.md`:

```markdown
---
title: "Catchy Project Title"
shortName: ShortName        # optional — shown in the "Open X →" button
category: Software          # Software | Music | Fun
year: 2025
tagline: "One punchy hook sentence that makes people want to click."
liveUrl: https://live-url.com          # optional
githubUrl: https://github.com/repo     # optional
image: /images/projects/slug.png       # optional
---

## What it is

...

## Why I built it

...

## How it works

...

## Tech stack

...
```

- [ ] **Step 6: Add project screenshots (optional)**

Place `<slug>.png` screenshots in `public/images/projects/`. If no screenshot is available, omit the `image` field from frontmatter — the detail page handles this gracefully.

- [ ] **Step 7: Verify full site**

```bash
npm run dev
```

Check: all project cards appear on the landing page, each detail page loads correctly, filters work across all categories.

```bash
npm run build
```

Expected: a `dist/projects/<slug>/` directory for every `.md` file in `src/content/projects/`.

- [ ] **Step 8: Commit**

```bash
git add src/components/ src/content/projects/ public/images/
git commit -m "content: add personal content and all projects"
```

---

### Task 15: Push to GitHub and deploy to Vercel

- [ ] **Step 1: Create a GitHub repository**

Go to github.com → **New repository** → name: `personal-website` → visibility: private or public → **do not** check "Initialize with README" (the repo already has commits).

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/yang-lou/personal-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy on Vercel**

1. Go to vercel.com → **Add New Project**
2. Import the `personal-website` GitHub repo
3. Framework preset: **Astro** (auto-detected)
4. Build command: `npm run build` (auto-filled)
5. Output directory: `dist` (auto-filled)
6. Click **Deploy**

Expected: Vercel gives a `*.vercel.app` preview URL. Open it — site should look identical to local dev.

- [ ] **Step 4: Add yang-lou.com domain in Vercel**

1. Vercel project → **Settings → Domains** → add `yang-lou.com`
2. Vercel shows DNS records to configure (A record + CNAME)
3. In your domain registrar, add those DNS records
4. Wait for DNS propagation (usually 5–30 minutes, up to 48h)

Expected: https://yang-lou.com serves the personal portfolio.

- [ ] **Step 5: Preserve existing tool paths**

The existing tool at `yang-lou.com/projects/lipu/` must keep working. Two options:

**Option A — Copy files into this Astro project (simplest):**
Copy the existing lipu tool files into `public/projects/lipu/`. Astro passes everything in `public/` through to `dist/` untouched.

```bash
# Copy existing lipu files (adjust source path as needed)
cp -r /path/to/existing/lipu/ public/projects/lipu/
git add public/projects/lipu/
git commit -m "chore: preserve existing lipu tool under public/"
git push
```

**Option B — Host the tool separately and proxy:**
If the lipu tool is hosted on a separate server/service, configure Vercel rewrites in `vercel.json` to proxy `/projects/lipu/*` to that origin:

```json
{
  "rewrites": [
    {
      "source": "/projects/lipu/:path*",
      "destination": "https://your-lipu-host.com/projects/lipu/:path*"
    }
  ]
}
```

```bash
git add vercel.json
git commit -m "chore: add Vercel rewrite for lipu tool"
git push
```

After pushing, Vercel auto-deploys. Verify that `yang-lou.com/projects/lipu/` still loads the tool.
