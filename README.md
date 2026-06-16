# Lab Design System

A portable definition of the **Lab** visual language — its tokens, components, and
patterns — packaged as a **standalone, submodule-ready kit** so it can seed new apps. Vendor
it into a repo, point Claude Code at it, and build screens that match by construction.

Everything here was extracted **verbatim** from the Lab source (`tailwind.config.js`,
`src/index.css`, `src/components/ui.tsx`); nothing is invented. Where the source has a gap,
it's flagged as a gap rather than filled silently.

> Light theme only. The brand specifics (name, logo, tagline) are Lab's — the
> foundations and components are meant to travel; adapt the brand layer per product.

---

## Use in a new repo with Claude Code

```bash
# 1. Vendor the kit as a submodule (mount at design-system/)
git submodule add <this-repo-url> design-system

# 2. Drop in the Claude Code guidance (or merge into your existing CLAUDE.md)
cp design-system/templates/CLAUDE.md ./CLAUDE.md

# 3. Wire it up (details in templates/CLAUDE.md):
#    - Tailwind: import labTheme from design-system/tailwind.tokens.js into theme.extend
#      (or @import design-system/tokens.css for non-Tailwind)
#    - Add the Google Fonts <link> to <head>
#    - Put class="ds-canvas ds-canvas-backdrop" on <body> for the cream/dot-grid/glow canvas

# 4. Confirm the look
open design-system/styleguide.html   # match this
```

The dropped-in `CLAUDE.md` is what makes Claude Code actually apply the system — it tells
Claude to read the spec, use the tokens, and keep the signatures instead of inventing a look.
Update later with `git submodule update --remote design-system`.

---

## What this system feels like

A warm, quiet, editorial instrument. Six principles distilled from the code:

1. **Warm minimalism.** An off-white cream canvas, near-black ink, generous calm —
   color is spent sparingly.
2. **One accent, used with intent.** Clay points *at* things (focus, active, glow);
   the solid action surface is ink. Don't spread the accent thin.
3. **Editorial structure.** Numbered mono eyebrows and one-line panel descriptions
   guide the eye and teach the workflow.
4. **Soft depth.** Wide, low-opacity ink shadows and a faint dot-grid + clay glow give
   a paper-like, lab-notebook feel.
5. **Semantic, accessible status.** A fixed color↔meaning mapping (moss/red/amber/clay/
   stone), always paired with an icon or dot.
6. **Restrained motion.** A 200ms default, a soft fade-up entrance, and looped
   shimmer/pulse for "busy" — all yielding to `prefers-reduced-motion`.

---

## Files

| File | What's in it |
| --- | --- |
| [`foundations.md`](./foundations.md) | Color, typography, spacing, radius, elevation, motion, layout, atmosphere — with gaps called out |
| [`components.md`](./components.md) | Component recipes: Button, Badge, Card, Field, Tabs, panels — variants, states, class strings |
| [`patterns.md`](./patterns.md) | Compositions & conventions: app shell, form sections, status semantics, call states, responsive, a11y |
| [`brand.md`](./brand.md) | Name, tagline, logo SVG, voice & tone, the signature atmosphere |
| [`tokens.json`](./tokens.json) | Tokens in W3C/DTCG format — import into Tokens Studio for Figma, Style Dictionary, etc. |
| [`tokens.css`](./tokens.css) | The same tokens as CSS custom properties — no-build drop-in for any app |
| [`tailwind.tokens.js`](./tailwind.tokens.js) | `theme.extend` block — copy-paste for a Tailwind app |
| [`styleguide.html`](./styleguide.html) | Open-in-browser visual reference — swatches, type specimens, and live components. Consumes `tokens.css` directly |
| [`templates/CLAUDE.md`](./templates/CLAUDE.md) | Drop-in Claude Code guidance for a **consuming** repo — copy to your repo root |

All three token files are generated from the **same source of truth**, so they agree by
construction.

---

## Reusing this system

The tokens and components are **specs to re-implement**, not an installable npm package —
that keeps the system framework-agnostic. The submodule above vendors the spec; then:

### 1. Pick the token file that matches your stack

- **Tailwind app** → `import { labTheme } from './design-system/tailwind.tokens.js'`
  and spread it into `theme.extend`. Use `stone-*` for neutrals (intentionally not
  redefined — Tailwind's built-in scale *is* the system's neutral).
- **Any CSS / other framework** → `@import "design-system/tokens.css"` and reference the
  `--color-*`, `--font-*`, `--shadow-*`, `--space-*` variables.
- **Design tool (Figma, etc.)** → import [`tokens.json`](./tokens.json) via Tokens Studio,
  or run it through Style Dictionary to emit your platform's format.

### 2. Load the fonts

The type system is part of the identity. Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### 3. Set the canvas

Apply the warm-canvas atmosphere — the one non-token signature worth keeping. With
`tokens.css`, put `class="ds-canvas ds-canvas-backdrop"` on `<body>` (helpers included).
In Tailwind, mirror it: `body { @apply bg-cream font-sans text-ink antialiased }` plus the
`body::before` dot-grid/glow recipe from [`foundations.md`](./foundations.md).

### 4. Build components from the recipes

[`components.md`](./components.md) gives each component's anatomy, variants, states, and
exact class string. Re-implement in your framework; lean on [`patterns.md`](./patterns.md)
for how they compose (form sections, panels, status, call states, responsive rules).

### The must-keep signatures

If you keep nothing else, keep these — they're what make it read as this system:

- **Cream canvas + dot-grid + clay top-glow** (the atmosphere).
- **Clay as the accent, ink as the action.** Focus ring = `clay-500/30`.
- **The Bricolage / Hanken / JetBrains Mono** type trio.
- **Numbered mono eyebrows** over display titles.
- **Semantic status = color + icon**, never color alone.

### What you'll need to add (source gaps)

The source system is light. Before building larger UI, expect to define: a full type-size
ladder, a real z-index scale, a modal/overlay layer, and (if needed) a dark theme. See the
**Gaps & notes** section of [`foundations.md`](./foundations.md).

---

## Provenance & sync

This kit was extracted from the **lab** repo (`docs/design-system/`). It is the
distributable copy; when the Lab source theme (`tailwind.config.js`, `src/index.css`,
`src/components/ui.tsx`) changes materially, re-emit the token files from the same values and
update the matching spec section here. The token files are the cheapest thing to keep honest —
diff them against `tailwind.config.js` whenever the theme changes. Consumers pull updates with
`git submodule update --remote`.
