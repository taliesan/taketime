# TakeTime — Coming Soon Site Handoff

## Project

**TakeTime** is a workshop + tool library + community that helps knowledge workers automate their own jobs and reclaim their time. Tagline: *Your time is theirs. Take it back.* Domain: **taketime.ai**.

This is the coming-soon brochure site. Single page, five sections, email capture.

## Handoff contents

- `taketime.jsx` — the complete React component for the site (one file, no dependencies beyond React + lucide-react)

## Tech stack

- React 18+
- Vite
- `lucide-react` for icons (ArrowRight, ArrowDown)
- Google Fonts loaded via runtime link injection (Anton, Jost, Newsreader, JetBrains Mono)
- **Inline styles only** — no Tailwind, no CSS framework, no CSS modules. A single `<style>` block handles keyframes, media queries, and hover states; everything else is inline `style={}`.

## Setup

```bash
npm create vite@latest taketime -- --template react
cd taketime
npm install
npm install lucide-react
```

Replace `src/App.jsx` with the contents of `taketime.jsx`.

Simplify `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Strip `src/index.css` down to:

```css
* { box-sizing: border-box; }
body { margin: 0; }
html, body { background: #EDE4ED; }
```

Update `index.html`:
- `<title>TakeTime — Your time is theirs. Take it back.</title>`
- Meta description: `"Work part-time. Get paid full-time. Keep the difference. A workshop, tool library, and community for workers automating their own jobs."`
- Favicon: placeholder for now, TBD

## Verify locally

```bash
npm run dev
```

Check:
- Hero wordmark renders in Anton (condensed display). "Take" on line 1, rotating word beside it in Jost 900 italic lowercase, "Time." on line 2 with pink "Time" and blue period.
- Rotating word cycles every 1500ms through 8 words, each in its own color.
- Navy diagonal slash banner below hero with italic serif tagline sitting in the lower portion.
- Pink marquee strip scrolls horizontally.
- Manifesto section renders on dark plum-navy background with tilted blue "Manifesto / Do Not Disregard" stamp.
- Three offering cards: The Training / The Tools / The Hall.
- Pink CTA section with email capture (local state — not yet wired to a service).
- Resize to 900px and 640px — grids stack, stamp repositions, hero wraps if needed, top bar middle item hides.

## Build & deploy

### Build

```bash
npm run build
```

### GitHub

Create public repo `taketime` under the `taliesan` GitHub account.

```bash
git init
git add .
git commit -m "Initial TakeTime coming-soon site"
git branch -M main
git remote add origin https://github.com/taliesan/taketime.git
git push -u origin main
```

### Deploy — Vercel (recommended)

Static Vite builds deploy to Vercel with zero config. Import the repo at vercel.com and it auto-detects. Alternative: Netlify (also zero-config) or Railway (matches existing project setup).

### Domain

Point `taketime.ai` DNS to the deployment per the host's instructions (Vercel provides CNAME/A records on domain add).

## Technical notes for future edits

- **Font loading** lives in a `useEffect` that injects a `<link>` to Google Fonts and cleans up on unmount. Fonts: `Anton`, `Jost:ital,wght@1,900`, `Newsreader`, `JetBrains Mono`. If the site moves to a custom domain with a font CDN, move this to `<link>` tags in `index.html` for better FOUT control.
- **Rotating word** is a `useState` + `setInterval(1500ms)` that advances `wordIdx` through the `rotatingWords` array. Each word re-mounts via `key={wordIdx}` triggering the `wordSwap` CSS animation (fade-up in / hold / fade-up out).
- **Email capture** is local state only. When ready to launch, `handleSubmit` needs to POST to ConvertKit / Mailchimp / Beehiiv / Buttondown. Error and success states are already in the component — just swap the condition.
- **Responsive breakpoints:**
  - `max-width: 900px` — Deal and Manifesto grids stack; Manifesto stamp repositions inline; section padding reduces; Three ways header row stacks.
  - `max-width: 640px` — hero "Take [word]" line allows wrap; top bar middle element hides; horizontal padding tightens further; top bar typography scales down.
- **Palette:**
  - `bone` `#EDE4ED` — background (washed lilac)
  - `ink` `#1E1A32` — primary text (deep plum-navy)
  - `pink` `#FF2D87` — primary accent (fluoro pink)
  - `blue` `#2E6FFF` — secondary accent (electric blue)
  - `paperDark` `#16122E` — dark section background (manifesto)
  - Rotating word colors (8, each unique, none used elsewhere):
    - back `#84CC16` · your `#22E5F0` · the `#9333EA` · their `#D946EF`
    - some `#FBBF24` · our `#10B981` · more `#FF6B2D` · less `#6366F1`
- **Naming conventions** used throughout copy:
  - Product components: **The Training**, **The Tools**, **The Hall**
  - Community number: `Hall №001`
  - Editorial stamps: `Filed Under: Class War`, `Now Organizing`, `Printed MMXXVI`
  - Button label: `Enlist` (on the CTA)
  - Status flag: `◇ In Preparation` on each offering card

## When complete

Send back:
- Deployed URL (staging at minimum)
- GitHub repo URL
- Confirmation that `taketime.ai` is pointed at the deployment (or what's needed to complete the DNS)
