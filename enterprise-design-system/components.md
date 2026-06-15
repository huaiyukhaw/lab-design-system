# Components

The component vocabulary, documented as **recipes** — anatomy, variants, states, and
the exact class string — so each can be rebuilt in any stack rather than shipped as a
package. Tokens referenced here are defined in [`foundations.md`](./foundations.md).

Primitives live in `src/components/ui.tsx`; composed components in
`src/components/` and `src/modes/eval/`.

---

## Button

`src/components/ui.tsx`

**Anatomy:** inline-flex, centered, `gap-1.5` (icon → label), `rounded-lg`,
`px-3.5 py-2`, **display font**, `text-sm`, `font-medium`, `transition-all duration-200`.
Disabled: `pointer-events-none opacity-50`. Icons are `h-3.5 w-3.5` or `h-4 w-4`.

**Base class**
```
inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2
font-display text-sm font-medium transition-all duration-200
disabled:pointer-events-none disabled:opacity-50
```

| Variant | Resting | Hover | Active | Use |
| --- | --- | --- | --- | --- |
| **primary** | `bg-ink text-cream shadow-sm` | `bg-ink-soft shadow-glow -translate-y-px` | `translate-y-0` | The one main action per view |
| **secondary** | `border border-stone-300 bg-white text-ink` | `bg-stone-50 border-stone-400` | — | Secondary actions |
| **ghost** | `text-stone-600` | `bg-stone-100 text-ink` | — | Low-emphasis / toolbar (Reset, View) |
| **danger** | `border border-red-200 bg-white text-red-600` | `bg-red-50 border-red-300` | — | Destructive (Delete) |

**Loading:** swap the leading icon for `<Spinner />` and change the label
("Run prompt" → "Running…"); keep the button disabled while busy.

---

## Spinner

`src/components/ui.tsx`

`h-4 w-4`, `animate-spin`, `rounded-full`, `border-2 border-current border-t-transparent`
— inherits text color via `border-current`. Carries `role="status"` +
`aria-label="Loading"`. Used inside buttons and in running/empty panels (where it sits
next to `clay-600` text: "Calling the API…").

---

## Badge

`src/components/ui.tsx`

**Anatomy:** inline-flex, `gap-1.5`, `rounded-full`, `px-2 py-0.5`, `text-xs`,
`font-medium`, `ring-1 ring-inset`. Optional leading **dot** (`h-1.5 w-1.5 rounded-full`).

**Base class**
```
inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset
```

| Color | Classes | Dot | Meaning |
| --- | --- | --- | --- |
| `stone` (default) | `bg-stone-100 text-stone-600 ring-stone-200` | `bg-stone-400` | Neutral / pending / counts |
| `moss` | `bg-moss/12 text-moss ring-moss/25` | `bg-moss` | Pass / success |
| `red` | `bg-red-50 text-red-700 ring-red-200` | `bg-red-500` | Fail / error |
| `amber` | `bg-amber-50 text-amber-700 ring-amber-200` | `bg-amber-500` | Warning / unfilled |
| `clay` | `bg-clay-100 text-clay-700 ring-clay-200` | `bg-clay-500` | Running / accent (e.g. variables) |

Used for: pass/fail verdicts, run status, score, `{{variable}}` chips, "unfilled"
flags, context-window counts.

---

## Card

`src/components/ui.tsx`

The primary container. `rounded-xl`, `border border-stone-200/70`, `bg-white`,
`shadow-card`, `transition-all duration-200`. When `interactive`, adds
`hover:-translate-y-px hover:shadow-card-hover` (the lift convention).

```
rounded-xl border border-stone-200/70 bg-white shadow-card transition-all duration-200
```

Cards hold each major panel; padding is applied by the content (`p-5` typical).
Accent-bordered variants use `border-clay-200` to mark AI-generated content (see
Generate/Enhance panels).

---

## SectionLabel

`src/components/ui.tsx`

A form-section header: `mb-1 block`, **display font**, `text-xs`, `font-semibold`,
`uppercase`, `tracking-wide`, `text-stone-500`. Sits directly above its field.

---

## PanelHeading

`src/components/ui.tsx`

The editorial header for each panel. Anatomy, top to bottom:

- **Eyebrow** (`.eyebrow`, `mb-1.5`) with an optional **index** prefix rendered in
  `stone-400` — e.g. `01 · GENERATE`.
- **Title** — display, `text-base`, `font-semibold`, tracking-tight, `text-ink`.
- **Description** (optional) — `text-xs leading-relaxed text-stone-400`.
- **Action** (optional) — right-aligned, `shrink-0` (e.g. a button).

Layout: `flex items-start justify-between gap-3`, `mb-4`. This numbered-eyebrow
pattern is what gives the app its guided, editorial feel — reuse it for any titled
section.

---

## Field & Select

`src/components/ui.tsx` (the shared `FIELD` recipe, exposed via `fieldClass()`)

Every text input, number input, and `<select>` shares one recipe:

```
w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-ink shadow-sm
transition-colors placeholder:text-stone-400
focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/30
```

**Focus** is the signature interaction: border → `clay-500` plus a 2px ring at
`clay-500/30`. `fieldClass('extra')` appends modifiers (e.g. `tabular-nums` for number
fields). Selects use the same class.

**Inline-edit variant** (used for variant/test-case names): transparent until focus —
`bg-transparent hover:border-stone-200 focus:border-clay-500` — so edits happen in place.

---

## Reveal

`src/components/ui.tsx`

A wrapper that plays `animate-fade-up` once per mount, with a per-instance
`animationDelay` for **staggered** entrances when a view loads or a tab switches.
Purely presentational.

---

## ExpandableTextarea

`src/components/ExpandableTextarea.tsx`

A textarea that defaults to a compact height (`compactRows`, default 2) so many fit on
screen, and expands to fit its full content on click. Auto-grows while expanded.

- Base: the field recipe, `resize-none`, `pr-9` (room for the toggle), `mono-block` by
  default (or `text-sm` when `mono={false}`).
- **Toggle button:** top-right, `rounded-md bg-white/80 p-1 text-stone-400
  backdrop-blur-sm hover:bg-stone-100 hover:text-ink`; icon `Maximize2` ⇄ `Minimize2`
  (`h-3.5`); `aria-label` flips with state.

The default authoring control for prompts and values.

---

## ModelControls

`src/components/ModelControls.tsx`

A 3-up control row (`grid-cols-1 gap-4 sm:grid-cols-3`): **Model** (select), **Temperature**
(range slider, `accent-clay-500`, value shown as `tabular-nums`), **Max tokens** (number
field, `tabular-nums`). Each cell is a `SectionLabel` + control.

Capability-aware: when the chosen model rejects temperature, the slider is
`disabled:opacity-50` with an amber hint. The max-tokens cell shows the context window
in a `stone` badge. A good reference for **disabled/explained** control states.

---

## Tabs

`src/components/Tabs.tsx`

Top-level navigation, full-width band (`border-b border-stone-200/80 bg-cream/60`),
inner nav constrained to the container, `gap-1`. Each tab button:

- A mono **index** (`01`–`04`, `text-[11px] tabular-nums`) — `clay-600` active /
  `stone-300` idle.
- A Lucide **icon** (`h-4 w-4`) — `clay-600` active / `stone-400` idle.
- A **display-font label** — `text-ink` active / `text-stone-500` idle.
- An animated **underline**: `absolute inset-x-2 -bottom-px h-0.5 rounded-full
  bg-clay-500`, fading in over `300ms` when active.

The four tabs (Generate · Playground · A/B Comparison · Evaluation) carry `title`
hints. This is the canonical "active accent = clay" pattern.

---

## ResponsePanel

`src/components/ResponsePanel.tsx`

Renders one API call's state. A clean reference for the system's **four-state** display:

| State | Render |
| --- | --- |
| **idle** | Centered (`min-h-[10rem]`): `MessageSquareText` icon (`h-7 w-7`, `stroke-1.5`, `stone-300`) + `stone-400` prompt text |
| **running** | Centered: `<Spinner />` + `clay-600` "Calling the API…" |
| **error** | `rounded-lg border border-red-200 bg-red-50 p-3`; `TriangleAlert` + bold `red-700` title; `red-600` `whitespace-pre-wrap` message |
| **ok** | `UsageBar` + a `.mono-block` `<pre>`: `max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border border-stone-200 bg-stone-50/70 p-3.5` |

**UsageBar** — a wrap of `Stat` pills (`rounded-md border border-stone-200 bg-white
px-2 py-1 text-xs`): icon (`stone-400`) + label (`stone-400`) + mono `tabular-nums`
value (`ink`), for in/out tokens, latency, and `~cost`.

---

## App shell pieces

- **Logo** (`src/components/Logo.tsx`) — see [`brand.md`](./brand.md).
- **Header** (`src/App.tsx`) — sticky, `z-20`, `border-b border-stone-200/80`,
  `bg-cream/85 backdrop-blur-md`; logo + title/tagline left, status pills + Reset right.
  Status pills: `rounded-full border border-stone-200 bg-white px-2.5 py-1 font-mono
  text-xs`, progressively revealed (`md:`/`sm:`).
- **MissingKeyBanner** (`src/components/MissingKeyBanner.tsx`) — full-width warning:
  `border-b border-amber-200 bg-amber-50 text-amber-800`, `KeyRound` icon, inline-code
  spans. The canonical inline **warning banner**.

---

## Higher-level / mode components (reference index)

These compose the primitives above; read the files when porting a specific screen.

| Component | File | Notes |
| --- | --- | --- |
| PromptEditor | `src/components/PromptEditor.tsx` | system + user fields + `{{variable}}` chips |
| VariableInputs | `src/components/VariableInputs.tsx` | per-variable field + `amber` "unfilled" badge |
| GeneratePanel | `src/components/GeneratePanel.tsx` | `border-clay-200`; suite preview + apply buttons |
| EnhancePanel | `src/components/EnhancePanel.tsx` | `border-clay-200`; suggestions + improved prompt; copy→`Check` feedback |
| HistoryPanel | `src/components/HistoryPanel.tsx` | run rows with pass/score badges + actions |
| DatasetEditor | `src/modes/eval/DatasetEditor.tsx` | add/edit/delete test cases |
| GraderConfig | `src/modes/eval/GraderConfig.tsx` | judge model + rubric |
| ResultsTable / ResultRow | `src/modes/eval/` | 12-col grid; click-to-expand row detail; status + pass/fail badges |
| SummaryStats | `src/modes/eval/SummaryStats.tsx` | metric cards + score histogram (clay gradient bars) |

---

## Iconography

**Lucide React**, single weight, sized `h-3.5 w-3.5` (inline/small), `h-4 w-4`
(buttons), or `h-7 w-7` `stroke-1.5` (empty-state glyphs). Color follows context:
`stone-400` resting, `clay-600` active/accent, status hues for status. Representative
set: `Wand2`, `FlaskConical`, `Columns2`, `ClipboardCheck` (tabs); `Play`, `Sparkles`,
`Plus`, `Trash2`, `Copy`, `Check`, `X`, `Download`, `Eye`, `RotateCcw`, `ChevronDown`,
`Maximize2`/`Minimize2`; `TriangleAlert`, `KeyRound`, `Cpu`, `Braces`, `MessageSquareText`.
