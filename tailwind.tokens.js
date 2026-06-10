/**
 * PromptLab design tokens — Tailwind `theme.extend` block.
 *
 * Copy this into a new Tailwind app's `tailwind.config.js`:
 *
 *   import { promptlabTheme } from './path/to/tailwind.tokens.js'
 *   export default {
 *     content: ['./index.html', './src/**\/*.{ts,tsx}'],
 *     theme: { extend: promptlabTheme },
 *   }
 *
 * Neutrals intentionally reuse Tailwind's built-in `stone` scale (it matches the
 * brand grays), so it is not redefined here — just use `stone-*` in markup.
 * Source of truth shared with tokens.json and tokens.css.
 *
 * Pair with these global styles (see tokens.css for the full version):
 *   body { @apply bg-cream font-sans text-ink antialiased; }
 *   plus the body::before atmosphere and `.eyebrow` / `.mono-block` utilities.
 */
export const promptlabTheme = {
  colors: {
    cream: '#faf9f5',
    ink: { DEFAULT: '#141413', soft: '#3a3733' },
    clay: {
      50: '#fbf1ec',
      100: '#f6ddd1',
      200: '#eebfa9',
      400: '#df8c69',
      500: '#d97757', // primary accent
      600: '#c25e3f',
      700: '#9f4a30',
    },
    moss: '#788c5d', // pass / success
    sky: '#6a9bcc', // secondary accent
  },
  fontFamily: {
    sans: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
    display: ['Bricolage Grotesque', 'Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
  },
  boxShadow: {
    card: '0 1px 2px rgb(20 20 19 / 0.04), 0 4px 12px -2px rgb(20 20 19 / 0.06)',
    'card-hover': '0 2px 4px rgb(20 20 19 / 0.05), 0 12px 28px -6px rgb(20 20 19 / 0.12)',
    pop: '0 8px 24px -6px rgb(20 20 19 / 0.18)',
    glow: '0 6px 20px -4px rgb(217 119 87 / 0.45)',
  },
  keyframes: {
    'fade-up': {
      '0%': { opacity: '0', transform: 'translateY(8px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    'pulse-soft': {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.55' },
    },
  },
  animation: {
    'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
    shimmer: 'shimmer 1.6s linear infinite',
    'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
  },
}

export default promptlabTheme
