<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Dev Commands

- `npm run dev` — dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — ESLint only

No test or typecheck scripts. Lint → build is the only chain.

## Tech Stack

- **Next.js 16** (App Router, no `src/` directory)
- **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in globals.css (not `@tailwind base/components/utilities`)
- **TypeScript 5** (strict mode, `moduleResolution: bundler`)
- **framer-motion** + **GSAP** (ScrollTrigger) for animations
- **no test framework** — no Jest, Vitest, or Cypress

## Styling Architecture

Custom design tokens are in `app/globals.css` under `@theme {}` — color names like `--color-neon-purple`, `--color-galaxy-800`, `--color-sand`, `--color-rock-grey`.

Font families via CSS variables:
- `--font-heading` → Poppins
- `--font-body` → Inter
- `--font-display` → Space Grotesk

Avoid hardcoding gradient strings. Reuse existing classes:
- `.gradient-text`, `.gradient-text-warm` — gradient text fills
- `.neon-glow`, `.neon-glow-strong`, `.neon-glow-blue` — glow shadows
- `.glass`, `.glass-card`, `.glass-card-strong` — frosted glass panels
- `.stars-bg` — fixed decorative starfield (CSS box-shadow, no JS)
- `.animate-float`, `.animate-pulse-glow`, `.animate-shimmer`, `.animate-badge-pulse`, `.animate-marquee`

All animations respect `@media (prefers-reduced-motion: reduce)`.

Background body gradient: `linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`.

## Client Components

Several files are `"use client"` even though they're rendered from server layouts:
- `app/page.tsx` — home page needs GSAP registration
- `components/Navbar.tsx` — needs `useCart()` hook
- `context/CartContext.tsx` — React context for cart state, persists to localStorage

When adding features that use hooks, browser APIs, or event handlers, add `"use client"` to the file.

## Path Alias

`@/*` maps to the repository root (`D:\vapechoice\`). Use it instead of relative paths.

## Cart State

`CartContext` persists cart to `localStorage` under key `"cart"`. It reads on mount, waits for client hydration via `mounted` flag. Avoid SSR/localStorage mismatches by checking `mounted` before rendering cart-dependent UI.

## Image Configuration

Remote images from any HTTPS host are allowed. Generates AVIF and WebP. Device sizes: 640–3840px. Use `next/image` for all product images.

## Component Inventory

- `app/` — App Router pages (cart, contact, disposables, e-liquid, pods, product/[id], vapes)
- `components/` — shared UI components (Navbar, HeroSection, Footer, BestSellers, BrandCarousel, etc.)
- `context/` — React context (CartContext)
- `hooks/` — custom hooks (useRefreshOnMount)