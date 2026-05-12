# React + Vite + TypeScript + Tailwind CSS v4 — Project Setup

**Series:** Building bonefishsoftware.com from scratch  
**Author:** Josh Blair

---

## Overview

This article covers scaffolding a production-ready React single-page application using Vite, TypeScript, and Tailwind CSS v4. This is the frontend that gets built into static assets and served from S3 + CloudFront.

---

## Tech Choices

### Vite over Create React App
CRA is deprecated. Vite is the modern standard — it uses native ES modules for near-instant dev server startup and produces an optimized production build via Rollup.

### TypeScript
Type safety catches bugs at compile time instead of runtime. The CloudFormation templates and the site itself are both infra-as-code; TypeScript gives the same discipline on the frontend.

### Tailwind CSS v4
Tailwind v4 (released 2024) is a ground-up rewrite. Key changes from v3:
- **No `tailwind.config.js`** — theme customization moves into CSS via `@theme` in your stylesheet
- **No PostCSS config file** — use the `@tailwindcss/vite` Vite plugin instead
- **CSS-first configuration** — design tokens are CSS custom properties

---

## Scaffolding

```bash
# Create project with react-ts template
npm create vite@latest . -- --template react-ts

# Install routing and Tailwind
npm install react-router-dom
npm install -D tailwindcss @tailwindcss/vite
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

The `@tailwindcss/vite` plugin replaces the old PostCSS setup. No `postcss.config.js` needed.

### src/index.css

```css
/* Google Fonts import MUST come before @import "tailwindcss" */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

/* Custom design tokens via @theme (Tailwind v4 CSS-first config) */
@theme {
  --color-bg: #111318;
  --color-surface: #1C2028;
  --color-accent: #00D4FF;
  --color-text: #F0F4F8;
  --color-text-muted: #8B95A3;
  --color-border: #2A3040;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
}

body {
  background-color: #111318;
  color: #F0F4F8;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  margin: 0;
}

#root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
```

> **Gotcha:** In Tailwind v4, `@import "tailwindcss"` expands to real CSS. Any `@import url(...)` (like Google Fonts) **must appear before it** or the browser ignores the font import. This caused a CSS warning in the build until we fixed the order.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        # Sticky nav, mobile hamburger, active link highlighting
│   ├── Footer.tsx        # Logo, nav links, LinkedIn + GitHub icons
│   └── SectionHeader.tsx # Reusable section heading (title + subtitle)
├── pages/
│   ├── Home.tsx          # Hero, featured services, cert strip, CTA banner
│   ├── Services.tsx      # Full 6-card service grid
│   ├── Technologies.tsx  # Grouped tech badges + certifications
│   ├── Portfolio.tsx     # Placeholder project cards
│   ├── Team.tsx          # Bio card with photo, certs, social links
│   └── Contact.tsx       # Form → API Gateway fetch
├── data/
│   ├── services.ts       # Service card data (title, description, icon)
│   ├── technologies.ts   # Tech groups + certifications
│   └── team.ts           # Team member data
├── App.tsx               # BrowserRouter + route config
├── main.tsx              # React DOM root
└── index.css             # Global styles + Tailwind v4 config
```

### Data-driven content

Rather than hardcoding content in page components, all repeated content lives in typed data files:

```typescript
// src/data/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'eda-serverless',
    title: 'Event-Driven Architecture & Serverless',
    description: 'Architect decoupled, resilient systems using SQS, SNS, EventBridge, and Lambda...',
    icon: '⚡',
  },
  // ...
];
```

This makes it trivial to add, update, or reorder content without touching component markup.

---

## Routing

React Router v7 handles client-side routing:

```tsx
// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}
```

### SPA Routing on CloudFront

Because React Router handles navigation client-side, all URLs (`/services`, `/team`, etc.) point to the same `index.html`. When a user navigates directly to `https://bonefishsoftware.com/team`, S3 returns a **403** (key doesn't exist). CloudFront must be configured to map 403 and 404 errors back to `index.html`:

```yaml
# In website.yml CloudFormation
CustomErrorResponses:
  - ErrorCode: 403
    ResponseCode: 200
    ResponsePagePath: /index.html
    ErrorCachingMinTTL: 0
  - ErrorCode: 404
    ResponseCode: 200
    ResponsePagePath: /index.html
    ErrorCachingMinTTL: 0
```

Without this, refreshing any non-root page returns a CloudFront error page.

---

## Design System

**Color palette** (dark charcoal + electric cyan):

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#111318` | Page background |
| `surface` | `#1C2028` | Cards, panels |
| `surface-2` | `#232936` | Nested surfaces |
| `accent` | `#00D4FF` | Cyan highlights, links, active states |
| `text` | `#F0F4F8` | Primary text |
| `text-muted` | `#8B95A3` | Secondary text, descriptions |
| `border` | `#2A3040` | Card borders, dividers |

**Font:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — a modern geometric sans-serif that feels technical but approachable.

---

## Logo Integration

The company logo is an SVG with a **transparent background**. The white stripe visible in the logo is part of the Colorado flag design — it's not a background fill.

Using the SVG directly in the Navbar (instead of PNG) means:
- Zero white-box artifact on the dark background
- Infinitely scalable — looks sharp at any size
- Small file size

```tsx
// Navbar.tsx
<NavLink to="/">
  <img src="/logo.svg" alt="Bonefish Software" className="h-10 w-auto" />
</NavLink>
```

The no-text variant (`/logo-icon.svg`) is used in the footer where horizontal space is tighter.

---

## Production Build

```bash
npm run build
# → tsc -b && vite build
# → dist/ (index.html + hashed JS/CSS bundles)
```

Build output for this site:

```
dist/index.html                   0.64 kB │ gzip:  0.39 kB
dist/assets/index-[hash].css     22.21 kB │ gzip:  4.91 kB
dist/assets/index-[hash].js     257.69 kB │ gzip: 81.09 kB
```

The entire site gzips to under **86 kB** — fast on any connection.
