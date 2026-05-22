# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AudioLog is a UI kit / design prototype for a German audio-drama tracking app (Hörspiele). The web UI kit is a static, no-build prototype — no npm, no bundler, no framework CLI.

## Running the prototype

Open `ui_kits/web/index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/ui_kits/web/
```

React 18 and Babel standalone are loaded from unpkg CDN. JSX is transpiled in-browser at runtime.

## Architecture

```
colors_and_type.css          Design token source of truth (CSS custom properties)
assets/
  app-icon.svg
  covers/                    SVG cover art for each series
ui_kits/web/
  index.html                 App shell: layout CSS, CDN scripts, App component + routing state
  components.jsx             Primitive and shared components — exported to window.*
  screens.jsx                Full-page screens + sample data — exported to window.*
```

**File loading order matters**: `components.jsx` must load before `screens.jsx`, which must load before the inline `<script>` in `index.html`. All components are shared via `Object.assign(window, {...})` at the bottom of each file rather than ES module imports (Babel standalone doesn't support modules).

**Navigation** is simple React state in `App` (`nav` + `series`), not a router. Screens receive callbacks as props (`onSeriesClick`, `onBack`).

**All data is hardcoded** in `screens.jsx` (`SAMPLE_SERIES`, `DIE_DREI_EPISODES`). There is no backend or data layer.

## Design system (`colors_and_type.css`)

All visual tokens are CSS custom properties on `:root`. Dark theme overrides use `:root[data-theme='dark']`.

| Token group | Examples |
|---|---|
| Backgrounds | `--bg-0` (page) … `--bg-3` (input) |
| Foregrounds | `--fg-1` (primary) … `--fg-4` (disabled) |
| Accent | `--accent`, `--accent-hover`, `--accent-soft` |
| Status | `--status-listened`, `--status-recent`, `--status-stale`, `--status-unheard` |
| Typography | `--font-serif` (Fraunces), `--font-sans` (Geist), `--font-mono` (JetBrains Mono) |
| Spacing | `--s-1` (4px) … `--s-10` (80px) |

Semantic type classes: `.t-display`, `.t-h1`–`.t-h4`, `.t-body`, `.t-meta`, `.t-mono`, `.t-eyebrow`, `.t-quote`.

## Adding new components or screens

1. Add primitives to `components.jsx` and export them via `Object.assign(window, {...})`.
2. Add screens to `screens.jsx` and wire navigation in the `App` function in `index.html`.
3. Use only CSS custom properties from `colors_and_type.css` — no hardcoded color or font values.
4. Icons are inline SVG via the `Icon` component; add new paths to the `paths` map in `components.jsx`.
