# CLAUDE.md

Guidance for Claude Code in this repo. (Merge into an existing `CLAUDE.md` if you have one.)

## Design system

This app uses the **Lab design system**, vendored as a git submodule at
`design-system/` (adjust the path below if you mounted it elsewhere). It is a warm, quiet,
editorial, **light-theme-only** system.

**Before building or changing ANY UI, read:**
- `design-system/foundations.md` — color, type, spacing, radius, shadow, motion tokens
- `design-system/components.md` — component recipes (anatomy, variants, states, classes)
- `design-system/brand.md` — voice, atmosphere, logo (skim)

**Never hardcode color / spacing / radius / shadow / font — use the tokens:**

- **Tailwind** — in `tailwind.config.js`:
  ```js
  import { labTheme } from './design-system/tailwind.tokens.js'
  export default { content: ['./index.html', './src/**/*.{ts,tsx}'], theme: { extend: labTheme } }
  ```
  Then use `bg-cream`, `text-ink`, `text-clay-600`, `bg-clay-500`, `shadow-card`,
  `font-display`, `animate-fade-up`, etc. Neutrals and status colors use Tailwind's
  built-in `stone-*` / `red-*` / `amber-*` (the preset intentionally doesn't redefine them).

- **Plain CSS** — `@import "design-system/tokens.css";` then reference `var(--color-*)`,
  `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--font-*)`.

**One-time wiring (do this at scaffold):**

1. Add the Tailwind preset (above) or `@import` `tokens.css`.
2. Load the fonts — add to `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
   ```
3. Set the canvas atmosphere — add `class="ds-canvas ds-canvas-backdrop"` to `<body>`
   (helpers ship in `tokens.css`), or replicate the `body::before` recipe from
   `foundations.md`.

**Must-keep signatures** (what makes UI read as this system):

- Cream canvas (`#faf9f5`) + a faint dot-grid + a soft clay glow at the top.
- **Clay (`#d97757`) is the accent; ink (`#141413`) is the action surface** — the primary
  button is filled with ink, *not* clay. Focus ring = `clay-500/30`.
- The **Bricolage Grotesque / Hanken Grotesk / JetBrains Mono** trio.
- **Numbered mono eyebrows** (`01 · LABEL`, uppercase, `clay-600`) above display titles.
- **Status = color + icon/dot**, never color alone (moss = pass, red = fail, amber = warn,
  clay = running, stone = neutral).
- **Light theme only** — there is no dark mode; don't invent one.

**Component cheat-sheet** (full recipes in `components.md`):

- **Button** — `rounded-lg px-3.5 py-2 font-display text-sm font-medium transition-all duration-200`;
  primary `bg-ink text-cream` → hover `bg-ink-soft shadow-glow -translate-y-px`;
  secondary `border border-stone-300 bg-white`; ghost `text-stone-600 hover:bg-stone-100`;
  danger `border-red-200 text-red-600`; disabled `opacity-50`.
- **Badge** — `rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset` (+ optional dot).
- **Card** — `rounded-xl border border-stone-200/70 bg-white shadow-card`; interactive adds
  `hover:-translate-y-px hover:shadow-card-hover`. No colored left-border accents.
- **Field** — `rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm`; focus →
  `border-clay-500 ring-2 ring-clay-500/30`. Always pair with a visible label.
- **Tabs** — a clay underline indicator that slides between tabs.
- **Eyebrow** — `font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-clay-600`.

**Voice** (`brand.md`): calm, precise, technical-but-warm. Imperative, specific button verbs
("Run prompt", not "Submit"). Middle-dot (`·`) separators. Lowercase mono micro-labels.

**Acceptance check:** open `design-system/styleguide.html` in a browser and match it.

**Update the system:** `git submodule update --remote design-system`.
