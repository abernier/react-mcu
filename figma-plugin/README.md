# Figma Plugin — Material Theme Builder

This directory contains the [Figma plugin](https://www.figma.com/plugin-docs/) wrapper that lets you use the Material Theme Builder directly inside Figma.

## How it works

| File | Purpose |
| --- | --- |
| `manifest.json` | Figma plugin manifest |
| `code.js` | Runs in Figma's main thread — shows the UI and creates/updates **Figma Variables** when the user clicks *Apply to Figma* |
| `src/` | React UI source — built into a single `dist/index.html` via Vite |

## Build

From the **repository root**:

```bash
pnpm run build-figma-plugin
```

This produces `figma-plugin/dist/index.html` (a self-contained HTML file with all JS/CSS inlined).

## Load in Figma

1. Open Figma Desktop.
2. Go to **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`.
4. The plugin will appear under *Development* in the Plugins menu.

## Usage

1. Open the plugin from the Figma menu.
2. Pick a **source color**, **scheme**, and **contrast** level.
3. Preview the generated light/dark theme.
4. Click **Apply to Figma** to create a *Material Theme* variable collection with Light and Dark modes.
5. Or click **Download tokens** to export the DTCG `.tokens.json` files.
