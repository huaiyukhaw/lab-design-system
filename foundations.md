# Foundations

The primitive design decisions — color, type, space, shape, depth, motion — that
everything else is built from. Each token is given as **raw value + semantic role
first**, with the Tailwind binding shown second, so the system can be rebuilt in any
stack (plain CSS, another framework, or a design tool). Machine-readable copies live
in [`tokens.json`](./tokens.json), [`tokens.css`](./tokens.css), and
[`tailwind.tokens.js`](./tailwind.tokens.js).

Source of truth in the app: `tailwind.config.js` and `src/index.css`.

---

## Color

A warm, low-contrast palette: an off-white canvas, near-black ink, a single clay
accent, and two reserved brand hues. Neutrals are warm grays.

### Brand

| Token | Hex | Role |
| --- | --- | --- |
| `cream` | `#faf9f5` | App canvas / page background |
| `ink` | `#141413` | Primary text; dark/solid surfaces (primary button) |
| `ink-soft` | `#3a3733` | Hover on dark surfaces; secondary dark text |
| `moss` | `#788c5d` | Success / pass / positive |
| `sky` | `#6a9bcc` | Secondary accent — reserved, used sparingly |

**Clay** — the primary accent, a warm terracotta, defined as a scale:

| Step | Hex | Where it's used |
| --- | --- | --- |
| `clay-50` | `#fbf1ec` | Faint accent wash |
| `clay-100` | `#f6ddd1` | Badge background (clay badge) |
| `clay-200` | `#eebfa9` | Accent borders (generate/enhance panels) |
| `clay-400` | `#df8c69` | Gradient mid-stop, shimmer |
| `clay-500` | `#d97757` | **Primary accent** — active indicators, focus ring, glow, slider |
| `clay-600` | `#c25e3f` | Accent **text** on light (eyebrows, active tab number, badge text) |
| `clay-700` | `#9f4a30` | Darkest accent text |

> **Note on the primary button:** the strongest call-to-action is filled with **`ink`,
> not clay.** Clay is the accent that *points at* things (focus, active, glow); ink is
> the surface you *press*. Keep this split when extending the system.

### Neutrals (warm gray)

The system deliberately uses Tailwind's built-in **`stone`** scale — it matches the
brand grays. Reproduced here in hex so a non-Tailwind target isn't guessing:

| Token | Hex | Role |
| --- | --- | --- |
| `stone-50` | `#fafaf9` | — |
| `stone-100` | `#f5f5f4` | Subtle fills (ghost-button hover, table header band) |
| `stone-200` | `#e7e5e4` | Default border / hairline |
| `stone-300` | `#d6d3d1` | Input border |
| `stone-400` | `#a8a29e` | Muted text, icons, placeholders |
| `stone-500` | `#78716c` | Secondary text |
| `stone-600` | `#57534e` | Body text on light (ghost button label) |
| `stone-700`–`900` | `#44403c` / `#292524` / `#1c1917` | Reserved deep grays |

Borders are frequently used at partial opacity — e.g. `stone-200/70`, `stone-200/80` —
for an even softer hairline.

### Status (semantic)

Built on Tailwind default scales. The mapping is consistent system-wide:

| Intent | Color | Text | Background | Ring/border |
| --- | --- | --- | --- | --- |
| **Success / pass** | moss | `moss` | `moss/12` | `moss/25` |
| **Error / fail** | red | `red-700` | `red-50` | `red-200` |
| **Warning** | amber | `amber-700` | `amber-50` | `amber-200` |
| **Running / primary** | clay | `clay-700` | `clay-100` | `clay-200` |
| **Neutral / pending** | stone | `stone-600` | `stone-100` | `stone-200` |

Status is **always paired with an icon or dot**, never color alone (see accessibility
in [patterns.md](./patterns.md)).

### Semantic aliases

Prefer intent names over hues in product code. Defined in `tokens.css` / `tokens.json`:
`canvas`, `surface` (`#fff`), `text`, `text-muted`, `text-secondary`, `border`,
`border-strong`, `primary`, `action`, `success`, `error`, `warning`, `focus-ring`.

---

## Typography

A three-family "modern grotesque" system. Fonts are loaded from Google Fonts (see
[`brand.md`](./brand.md) / README for the exact `<link>`).

| Family | Stack head | Used for |
| --- | --- | --- |
| **Display** | `Bricolage Grotesque` | Headings, titles, **button labels**, section labels |
| **Sans** | `Hanken Grotesk` | Body and UI text (the default) |
| **Mono** | `JetBrains Mono` | Code, prompts, outputs, numbers, eyebrows, technical labels |

Full fallback stacks are in the token files. Weights deployed: **400 / 500 / 600 / 700**
(display & sans); **400 / 500 / 600** (mono).

### Text roles

The system uses a small set of **named roles**, not a deep size ladder:

| Role | Spec | Token / class |
| --- | --- | --- |
| App title | display, 20px, bold, tight tracking | `font-display text-xl font-bold` |
| Panel title | display, 16px, semibold, tight tracking | `font-display text-base font-semibold` |
| Section label | display, 12px, semibold, **uppercase**, `tracking-wide` | `SectionLabel` |
| Eyebrow / kicker | mono, 11px, medium, **uppercase**, `tracking-[0.18em]`, `clay-600` | `.eyebrow` |
| Body / UI | sans, 14px (`text-sm`) | default |
| Small print | sans/mono, 12px (`text-xs`), `stone-400` | hints, footer |
| Mono block | mono, 13px, `leading-relaxed` (1.625) | `.mono-block` (prompts, outputs) |

Numbers that update or align (token counts, temperature, scores) use
`tabular-nums` + mono for steady width.

---

## Spacing

4px base scale (Tailwind). Steps in active use:

`0 · 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 32` px
(Tailwind `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8`).

Common rhythms: form label→field `mb-1`; hint below field `mt-1`/`mt-2`; stacked
controls `space-y-3`/`space-y-4`; major sections `space-y-6`; inline icon→label gaps
`gap-1.5`; card padding `p-3`–`p-5`; main content `px-4 py-8`.

---

## Radius

| Token | Value | Role |
| --- | --- | --- |
| `sm` | 4px | small chips / indicators (`rounded`) |
| `md` | 6px | icon buttons, inline code (`rounded-md`) |
| `lg` | 8px | **buttons, fields, output blocks** (`rounded-lg`) |
| `xl` | 12px | **cards** (`rounded-xl`) |
| `full` | 9999px | badges, pills, dots, slider track (`rounded-full`) |

---

## Elevation (shadows)

Four named shadows, all tinted with ink (`rgb(20 20 19 / …)`) except the clay glow.
Soft, wide, low-opacity — never harsh.

| Token | Value | Role |
| --- | --- | --- |
| `card` | `0 1px 2px rgb(20 20 19 / .04), 0 4px 12px -2px rgb(20 20 19 / .06)` | Resting card |
| `card-hover` | `0 2px 4px rgb(20 20 19 / .05), 0 12px 28px -6px rgb(20 20 19 / .12)` | Interactive card (with −1px lift) |
| `pop` | `0 8px 24px -6px rgb(20 20 19 / .18)` | Popovers / floating |
| `glow` | `0 6px 20px -4px rgb(217 119 87 / .45)` | Clay glow on primary-button hover |

Small inputs/pills use Tailwind's plain `shadow-sm` for a 1px lift.

---

## Motion

Restrained and purposeful. Three named animations plus a default transition.

| Name | Spec | Use |
| --- | --- | --- |
| default transition | `200ms` (`transition-all`/`transition-colors`) | hovers, focus, state changes |
| `fade-up` | `0.5s cubic-bezier(.22, 1, .36, 1)`; opacity 0→1, `translateY(8px→0)` | staggered entrance on mount / tab switch (`Reveal`) |
| `shimmer` | `1.6s linear infinite`; bg-position `-200%→200%` | eval progress bar while running |
| `pulse-soft` | `1.4s ease-in-out infinite`; opacity 1→0.55→1 | gentle "busy" pulse |

Interactive lift convention: `hover:-translate-y-px` paired with a stronger shadow,
returning to rest on `active:translate-y-0`.

**Accessibility:** a global `prefers-reduced-motion: reduce` rule collapses all
animation/transition durations to ~0. Preserve this in any port (it's in `tokens.css`).

---

## Layout primitives

| Token | Value | Role |
| --- | --- | --- |
| Container | `max-w-7xl` = **1280px** | Shared max width for header, tabs, main, footer (`mx-auto px-4`) |
| Breakpoints | `sm 640` · `md 768` · `lg 1024` | Tailwind defaults; app uses these three only |

Responsive intent: single column on mobile; the major split views go two-up at `lg`;
secondary chrome (model badge, tagline, button labels) reveals progressively at
`sm`/`md`. Full rules in [patterns.md](./patterns.md).

---

## Signature atmosphere

Not a token per se, but a defining trait: the canvas carries a **fixed dot-grid + a
soft clay glow at the top**, behind everything (`body::before`, `z-index: -10`,
`pointer-events: none`). It must travel with the system to feel like PromptLab.

```css
background-image:
  radial-gradient(120% 60% at 50% -10%, rgb(217 119 87 / 0.07), transparent 60%),
  radial-gradient(rgb(120 113 108 / 0.06) 1px, transparent 1px);
background-size: 100% 100%, 22px 22px;
background-position: center top, center center;
```

Text selection is tinted clay: `::selection { background: rgb(217 119 87 / 0.2); }`.
Both are packaged as `.ds-canvas` / `.ds-canvas-backdrop` helpers in `tokens.css`.

---

## Gaps & notes (for whoever extends this)

These are honest holes in the source system — decisions left to you, not silently
filled:

- **No formal type-size ladder.** Sizes are role-driven (above) plus a few arbitrary
  values (`text-[10px]`, `text-[11px]`). If you need a full scale, define one rather
  than assuming `xs/sm/base/lg/xl`.
- **No formal z-index scale.** Only `header (20)` and `backdrop (-10)` exist. Add a
  scale (dropdown / sticky / overlay / modal / toast) before building layered UI.
- **No dark mode.** Light only. `tailwind.config.js` has no `darkMode` setting and
  there are no `dark:` variants. A dark theme would be net-new.
- **No modal/overlay layer.** Destructive confirms use native `window.confirm()`. If
  you add real dialogs, they need a new surface + `pop` shadow + z-index entry.
- **`sky` is underused.** Defined as the secondary accent but rarely applied — treat it
  as available headroom, not an established pattern.
