# Lab Design System — Enterprise (blue/white)

A **color retheme** of the Lab design system (the `lab-design-system` repo). It is the
*same* system — identical typography, type scale, weights, line heights, spacing, radii,
shadow geometry, motion, breakpoints, component anatomy, and **token names** — wearing a
**modern blue/white enterprise palette** instead of the original warm clay-on-cream look.

> **Only the color tokens diverge from `lab-design-system`.** Every non-color token is
> carried over byte-for-byte. Token *names* are unchanged, so any component built against
> the original consumes this theme with **zero code changes — only the values differ**.

The two are drop-in interchangeable and meant to evolve independently in separate
directories/repos. Swap `tokens.css` (or the Tailwind preset) and the same markup renders
blue/white instead of clay/cream.

---

## What changed vs. lab-design-system

| Layer | Status |
| --- | --- |
| Color tokens (brand, neutrals, semantic aliases, embedded shadow/glow/focus/atmosphere tints) | **Re-valued** → blue/white enterprise |
| Token **names** (`clay-*`, `ink`, `cream`, `moss`, `sky`, `neutral-*`, `red-*`, `amber-*`, all semantic aliases) | **Unchanged** |
| Typography (Bricolage / Hanken / JetBrains Mono), weights, sizes, leading, tracking | **Unchanged** |
| Spacing, radii, shadow **geometry**, motion (durations/easing/keyframes), breakpoints, container, z-index | **Unchanged** |
| Component recipes & patterns (`components.md`, `patterns.md`) | **Unchanged** (they reference token *names* only) |

Note: `red-*` and `amber-*` (error/warning) keep their accessible Tailwind values — they
already read universally as error/warning and sit fine next to the blue primary.

---

## The palette

Background is white and cool near-whites; the accent is a saturated professional blue with
state shades derived from it; neutrals are a cool slate-gray ramp; semantics are tuned to
sit with the blue.

### Brand

| Token | Old (lab) | New (enterprise) | Role |
| --- | --- | --- | --- |
| `cream` | `#faf9f5` | `#f8fafc` | App canvas / page background — cool near-white |
| `ink` | `#141413` | `#0b1220` | Primary text **and** the solid action (primary button) surface — deep navy near-black |
| `ink-soft` | `#3a3733` | `#1e293b` | Hover on dark surfaces / secondary dark text |
| `moss` (success) | `#788c5d` | `#047857` | Success / pass — clean emerald, AA as text |
| `sky` (secondary/info) | `#6a9bcc` | `#0369a1` | Reserved secondary accent; doubles as the **info** hue (AA as text) |

### Clay — the primary accent (now a blue ramp)

The accent keeps the name **`clay`** so consuming code is unchanged; the value is now a
professional enterprise blue. `clay-500` is the primary; `600`/`700` are the darker
text/active states derived from it; `50`–`200` are the light wash/badge/border tints;
`400` is the gradient/shimmer mid-stop.

| Step | Old | New | Where it's used |
| --- | --- | --- | --- |
| `clay-50` | `#fbf1ec` | `#eff6ff` | Faint accent wash |
| `clay-100` | `#f6ddd1` | `#dbeafe` | Badge background |
| `clay-200` | `#eebfa9` | `#bfdbfe` | Accent borders (AI panels) |
| `clay-400` | `#df8c69` | `#60a5fa` | Gradient mid-stop, shimmer |
| **`clay-500`** | `#d97757` | **`#2563eb`** | **Primary** — active indicators, focus ring, glow, slider, tab underline |
| `clay-600` | `#c25e3f` | `#1d4ed8` | Accent **text** on light (eyebrows, active tab number, badge text) |
| `clay-700` | `#9f4a30` | `#1e40af` | Darkest accent text |

> **Note on the primary button** (unchanged from the original): the strongest call-to-action
> is filled with **`ink`, not `clay`**. Clay (blue) *points at* things (focus, active,
> glow); ink (navy) is the surface you *press*.

### Neutrals — cool gray (Tailwind `slate` values)

| Token | Old | New | Role |
| --- | --- | --- | --- |
| `neutral-50` | `#fafaf9` | `#f8fafc` | — |
| `neutral-100` | `#f5f5f4` | `#f1f5f9` | Subtle fills |
| `neutral-200` | `#e7e5e4` | `#e2e8f0` | Default border / hairline |
| `neutral-300` | `#d6d3d1` | `#cbd5e1` | Input border |
| `neutral-400` | `#a8a29e` | `#94a3b8` | Muted text / icons / placeholder |
| `neutral-500` | `#78716c` | `#64748b` | Secondary text |
| `neutral-600` | `#57534e` | `#475569` | Body text on light |
| `neutral-700` | `#44403c` | `#334155` | Reserved deep gray |
| `neutral-800` | `#292524` | `#1e293b` | Reserved deep gray |
| `neutral-900` | `#1c1917` | `#0f172a` | Reserved deep gray |

### Semantic aliases (names unchanged)

`canvas → cream` · `surface → #ffffff` · `text → ink` · `text-muted → neutral-400` ·
`text-secondary → neutral-500` · `border → neutral-200` · `border-strong → neutral-300` ·
`primary → clay-500` · `primary-strong → clay-600` · `action → ink` · `success → moss` ·
`error → red-600` · `warning → amber-600` · `focus-ring → clay-500 / 30%`
(`rgba(37, 99, 235, 0.3)`).

Embedded color values were re-tinted to match: `shadow-glow` uses the blue primary, the
card/pop shadows are tinted with the new `ink` (`rgb(11 18 32 / …)`), and the canvas
atmosphere (`.ds-canvas-backdrop`) uses a blue top-glow over a cool-gray dot-grid. Their
**geometry** (offsets, blur, spread, sizes) is untouched.

---

## Accessibility (WCAG 2.1 AA)

All text-on-surface pairings were verified against white (`#ffffff`) and the cool canvas
(`#f8fafc`). AA targets: **4.5:1** body, **3:1** large text.

| Pairing | Ratio | Result |
| --- | --- | --- |
| `ink` text on white / cream | 18.7 / 17.9 | ✅ AA |
| `neutral-600` body on white / cream | 7.6 / 7.2 | ✅ AA |
| `neutral-500` (text-secondary) on white / cream | 4.76 / 4.55 | ✅ AA |
| `clay-600` accent text/eyebrow on white / cream | 6.7 / 6.4 | ✅ AA |
| `clay-700` on `clay-100` (clay badge) | 7.15 | ✅ AA |
| `moss` success text on its `moss/12` tint | 4.63 | ✅ AA |
| `red-700` on `red-50` / `amber-700` on `amber-50` / `amber-800` banner | 5.9 / 4.8 / 6.8 | ✅ AA |
| `sky` (info) `#0369a1` on white | 5.93 | ✅ AA |
| white / cream label on `ink` action button | 18.7 | ✅ AA |

### ⚠️ Flagged pairing (below AA — inherited from source)

- **`text-muted` (`neutral-400` `#94a3b8`) on white = 2.56:1 — fails AA (and 3:1).**
  This mirrors the original system, where `text-muted` (`#a8a29e`) also fails (~2.6:1) and
  is intentionally scoped to **placeholders, decorative icons, and non-essential
  micro-text** — not body copy. I preserved that exact role rather than darkening the token
  (which would change its character and break parity with `lab-design-system`). **For any
  essential small text, use `text-secondary` (`neutral-500`), which passes AA on both
  surfaces.**

---

## Assumptions & decisions (flagged)

- **Primary blue = `#2563eb`** (Tailwind blue-600) placed in the `clay-500` slot. Chosen as
  a saturated, professional enterprise blue; `clay-600 #1d4ed8` / `clay-700 #1e40af` are its
  darker text/active states (both AA on light). Swap these three if you have a brand blue.
- **`ink` = `#0b1220`** — a deep navy near-black (kept distinct from `neutral-900 #0f172a`,
  mirroring how the source `ink` sits apart from its neutral ramp).
- **`success`/`moss` = `#047857`** (emerald-700) — darkened from a mid-olive so it meets AA
  as badge text on its light tint while still reading as a dot.
- **`sky` = `#0369a1`** — repurposed from a light decorative blue to a deeper cyan-blue so it
  is distinct from the (now blue) primary and usable as an **info** color at AA. Like the
  source, it stays a reserved/secondary accent.
- **`error`/`warning` (red/amber) kept at source values** — already accessible and
  universally legible; changing them added risk without benefit.
- **Product renamed to "Lab"** (from the original "PromptLab") across the docs/styleguide and
  the `labTheme` Tailwind export. Rename the brand layer further per product if you prefer
  (see `brand.md`).
- **Token-file comments updated for the rename only.** `tokens.css` / `tokens.json` /
  `tailwind.tokens.js`
  diverge from the source only in color *values* and the `PromptLab`→`Lab` name; no
  typography, spacing, radius, shadow-geometry, or motion values changed. The accurate
  blue/white narrative lives here and in the docs.

---

## Neutrals on Tailwind (one caveat)

Mirroring the source, `tailwind.tokens.js` does **not** redefine Tailwind's built-in
`stone` scale (the source offloaded neutrals to `stone-*`). Because this theme's neutrals
are **cool**, a Tailwind app that writes `stone-*` in markup would otherwise still get the
*warm* built-in stone. Two ways to get cool neutrals:

1. **Reference the CSS variables** — `@import "tokens.css"` and use `var(--color-neutral-*)`
   (already cool). Recommended for non-Tailwind or token-driven setups.
2. **Drop in this cool-`stone` override** in your `tailwind.config.js` so `stone-*`
   utilities render cool (values match `tokens.css`):

   ```js
   theme: { extend: { ...labTheme, colors: { ...labTheme.colors, stone: {
     50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',
     500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',
   } } } }
   ```

This snippet is intentionally **not** baked into `tailwind.tokens.js` so the token files
stay a clean color-values-only diff against the source.

---

## Reusing this system

Identical to `lab-design-system` — pick the token file for your stack (`tokens.css`,
`tailwind.tokens.js`, or `tokens.json`), load the **Bricolage Grotesque / Hanken Grotesk /
JetBrains Mono** trio, and set the canvas with `class="ds-canvas ds-canvas-backdrop"`. See
[`foundations.md`](./foundations.md), [`components.md`](./components.md),
[`patterns.md`](./patterns.md), and [`brand.md`](./brand.md) for the full spec, and open
[`styleguide.html`](./styleguide.html) to see the blue/white theme rendered.

Fonts `<link>` (unchanged):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Files

| File | What's in it |
| --- | --- |
| [`tokens.css`](./tokens.css) | CSS custom properties — **color values retoned**, everything else verbatim |
| [`tokens.json`](./tokens.json) | W3C/DTCG tokens — **color values retoned**, everything else verbatim |
| [`tailwind.tokens.js`](./tailwind.tokens.js) | Tailwind `theme.extend` — **color values retoned**, everything else verbatim |
| [`styleguide.html`](./styleguide.html) | Visual reference, now rendering the blue/white theme |
| [`foundations.md`](./foundations.md) · [`components.md`](./components.md) · [`patterns.md`](./patterns.md) · [`brand.md`](./brand.md) | Spec — structure carried over; only color values/wording updated |
| [`templates/CLAUDE.md`](./templates/CLAUDE.md) | Drop-in Claude Code guidance for a consuming repo |
