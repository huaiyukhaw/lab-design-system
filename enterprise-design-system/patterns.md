# Patterns

Reusable compositions and conventions — how the primitives in
[`components.md`](./components.md) are assembled into screens, and the rules that keep
the system coherent. These are the parts most worth copying into a new app.

---

## App shell

A single, full-bleed column with a shared content width (`max-w-7xl`, `mx-auto px-4`):

```
┌──────────────────────────────────────────────┐
│ Header — sticky, z-20, cream/85 + backdrop-blur │  logo + title · status pills + Reset
├──────────────────────────────────────────────┤
│ Banner (conditional) — amber warning            │
├──────────────────────────────────────────────┤
│ Tabs — full-width band, clay active underline    │
├──────────────────────────────────────────────┤
│ Main — max-w-7xl px-4 py-8                       │  active view
├──────────────────────────────────────────────┤
│ Footer — centered mono text-xs stone-400         │
└──────────────────────────────────────────────┘
```

Every horizontal band uses the **same container width and side padding** so the left
and right edges line up from header to footer. The sticky header and tab band are
translucent over the cream canvas (`bg-cream/85` / `bg-cream/60`) with `backdrop-blur`
so the atmosphere shows through.

---

## Form section

The repeating unit of every authoring panel:

```
SectionLabel              ← display, xs, uppercase, stone-500, mb-1
[ Field / Select / Textarea ]
hint or badge (optional)  ← text-xs stone-400, mt-1 / mt-2
```

Stack sections with `space-y-3`/`space-y-4`; group related controls in a responsive
grid (`grid-cols-1 gap-4 sm:grid-cols-3`, as in ModelControls). Labels are quiet; the
field is the focus; hints and validation sit below in small muted text or a badge.

---

## Panel = Card + PanelHeading

Each functional block is a `Card` whose first child is a `PanelHeading`. In multi-step
flows (Evaluation), headings carry an **index eyebrow** (`01 ·`, `02 ·`, `03 ·`) to
guide the user through order. The optional right-aligned `action` slot holds the
panel's primary button. Reuse this for any titled section — it's the app's signature.

---

## Status semantics

One mapping, used everywhere status appears (badges, rows, pills, dots). Always
**color + icon/dot together**, never color alone:

| State | Color | Glyph |
| --- | --- | --- |
| pending / neutral | stone | dot |
| running | clay | `Spinner` |
| ok / pass | moss | `Check` |
| fail | red | `X` |
| run-error / grade-error | red | `TriangleAlert` |
| parse-error | amber | — |
| warning / unfilled | amber | dot / `TriangleAlert` |

Eval rows reuse these as their row-status badge **and** their pass/fail badge, so a
single glance reads both.

---

## The four call states

Any async result surface should render all four (see `ResponsePanel`):

1. **Idle / empty** — centered muted glyph (`h-7 w-7 stroke-1.5 stone-300`) + a
   one-line `stone-400` invitation ("Run the prompt to see the response here.").
2. **Running** — centered `Spinner` + `clay-600` present-tense label.
3. **Error** — red bordered box (`border-red-200 bg-red-50 p-3`): `TriangleAlert` +
   bold title, full message in `whitespace-pre-wrap` so formatting/stack survives.
4. **Success** — the content, often a `.mono-block` `<pre>` with `max-h` + `overflow-auto`.

Empty and error states are designed, not afterthoughts — match this when adding new
result surfaces.

---

## Long-running / batch work

The Evaluation runner is the reference (`src/modes/eval/`):

- A **progress bar** using `.shimmer-bar` (clay gradient, `animate-shimmer`) while in
  flight, plus a numeric `n/total`.
- **Per-row isolation:** a failing row shows its own error state and **does not abort
  the batch**; the rest complete.
- **Resume**, not restart: only un-graded rows (`pending`/`*-error`/`skipped`) re-run.
- **Bounded concurrency** so the UI and API stay healthy.
- Results stream in **row-by-row** (selector subscriptions) rather than re-rendering
  the whole table — keep this if you port the table.

---

## Editing in place

Names (variants, test cases) use the **transparent inline-edit** field: invisible
until hover (`hover:border-stone-200`) then focus (`focus:border-clay-500`), so editing
happens without a mode switch or a visible input chrome.

---

## Expand-to-reveal

Two flavors:

- **ExpandableTextarea** — compact by default, click to grow to full content; lets many
  prompts/values sit on one screen.
- **Click-to-expand rows** — eval result rows toggle a detail drawer below the row
  (output, judge reasoning, raw text on parse-error); a `ChevronDown` rotates 180° to
  signal state.

---

## AI-generated content marking

Anything Claude produced (Generate suite, Enhance suggestions) is shown in a card with
an **accent border** (`border-clay-200`) and apply actions are **explicit and
non-destructive by default** ("Apply as new variant") with destructive applies
("Replace", "Apply all") gated behind a `window.confirm`. Pattern: make AI output
visibly provisional and never overwrite user work silently.

---

## Responsive behavior

Mobile-first; the system reveals chrome and splits columns as space allows.

| Surface | mobile | `sm` (640) | `md` (768) | `lg` (1024) |
| --- | --- | --- | --- | --- |
| Playground / Comparison split | 1 col | 1 col | 1 col | 2 col |
| ModelControls | 1 col | 3 col | 3 col | 3 col |
| Summary metrics | 2 col | 4 col | — | 6 col |
| Header model badge | hidden | hidden | shown | shown |
| Header key badge / tagline | hidden | shown | shown | shown |
| Button text labels | icon only | + label | + label | + label |

Rule of thumb: never hide *function* on small screens, only *secondary labels and
side-by-side layout*.

---

## Accessibility conventions

- **Status is color + icon/dot**, never color alone (above).
- **Focus is always visible**: the `clay-500` border + `clay-500/30` 2px ring on every
  field; buttons rely on the same ring via the browser default + visible state change.
- Icon-only buttons carry `aria-label`; hover-only affordances carry `title`.
- The `Spinner` carries `role="status"` + `aria-label="Loading"`.
- **`prefers-reduced-motion: reduce`** collapses all animation/transition to ~0 — keep
  this global rule (it ships in `tokens.css`).
- Inputs/selects/buttons are native elements, keyboard-accessible by default.
