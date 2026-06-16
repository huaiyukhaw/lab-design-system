# Brand

The identity layer — name, voice, mark, and the atmosphere that makes the system feel
like itself. When reusing the system for a different product, the **foundations and
components travel; the brand specifics here are Lab's** — adapt the name, logo,
and tagline, but keep the voice and atmosphere if you want the same feel.

---

## Name & tagline

- **Name:** Lab
- **Tagline:** *Author · compare · grade Anthropic prompts*
- **Document title:** `Lab — Prompt Engineering & Evaluation`
- **Footer / positioning line:** *Local internal tool · API key is exposed to the
  browser · not for production*

The tagline uses **middle dots (·)** as separators — a recurring device (also in
eyebrows and the footer). It reads as a calm list of verbs, not a slogan.

---

## Logo

`src/components/Logo.tsx` — an inline SVG, no external asset. Two layered rounded
squares (a clay one behind an ink one) with a small cream spark, evoking the
prompt-variants the tool compares. Default `h-7 w-7`.

```svg
<svg viewBox="0 0 32 32" role="img" aria-label="Lab">
  <rect x="12" y="3"  width="17" height="17" rx="4.5" fill="#2563eb" />  <!-- clay  -->
  <rect x="3"  y="12" width="17" height="17" rx="4.5" fill="#0b1220" />  <!-- ink   -->
  <circle cx="11.5" cy="20.5" r="2.4" fill="#f8fafc" />                  <!-- cream -->
</svg>
```

It uses the three core brand hexes directly (`clay-500` / `ink` / `cream`) and the
favicon (`public/favicon.svg`) is the same mark. The 4.5 corner radius on a 17-unit
square echoes the `rounded-xl` card language at small scale.

**Lockup:** logo + wordmark, `gap-3`. Wordmark = `font-display text-xl font-bold
tracking-tight text-ink`; tagline beneath in `text-xs text-stone-400` (hidden below
`sm`).

---

## Voice & tone

Calm, precise, technical-but-warm — an instrument, not a hype tool.

- **Plain and direct.** "Run the prompt to see the response here." Present tense,
  active, no exclamation.
- **Honest about limits.** The app states its own caveats ("API key is exposed to the
  browser · not for production"; per-row error notes). Surface constraints; don't hide
  them.
- **Lowercase, technical labels.** Mono micro-labels are lowercase (`in`, `out`,
  `latency`, `~cost`); section labels are UPPERCASE display. Eyebrows are uppercase
  mono.
- **Guided, not chatty.** Numbered eyebrows (`01 ·`) and one-line panel descriptions
  teach the workflow without paragraphs.
- **Verbs for actions.** Buttons are imperative and specific: *Run prompt*, *Generate
  suite*, *Apply as new variant*, *Analyze results* — never "Submit" / "OK".

---

## Atmosphere (brand signature)

The single most recognizable trait, beyond palette and type, is the **cool canvas**:
the near-white background carries a faint dot-grid and a soft blue glow at the top, fixed
behind all content. Combined with the blue text-selection tint and the soft, wide
shadows, it gives a quiet, crisp, lab-notebook feel.

Reproduce it via the `.ds-canvas` / `.ds-canvas-backdrop` helpers in
[`tokens.css`](./tokens.css) (full recipe in [`foundations.md`](./foundations.md) →
*Signature atmosphere*). If you keep one non-token thing from this system, keep this.

---

## Type as brand

The **Bricolage Grotesque / Hanken Grotesk / JetBrains Mono** trio is itself part of
the identity — an expressive grotesque display over a neutral grotesque body, with a
crisp mono for everything technical. Load all three (weights in
[`foundations.md`](./foundations.md)); the `<link>` is in the README's reuse section.
