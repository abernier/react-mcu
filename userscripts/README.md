# Shadcn MCU Colors Userscript

This userscript automatically extracts the primary color from any shadcn/ui website and generates a complete Material Design 3 (MCU) color scheme based on it.

## What it does

1. Detects if a page uses shadcn/ui by looking for the `--primary` CSS variable
2. Extracts the primary color value (supports HSL format used by shadcn)
3. Generates a full MCU color palette using the existing `generateCss` function from react-mcu
4. Injects `--mcu-*` CSS variables into the page

## Installation

### Prerequisites

You need a userscript manager extension installed in your browser:

- **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- **Firefox**: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- **Safari**: [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887)

### Install the userscript

1. Click on the userscript file: [shadcn-mcu.user.js](./shadcn-mcu.user.js)
2. Your userscript manager should detect it and prompt you to install
3. Click "Install" or "Confirm"

Alternatively, you can manually copy the contents of `shadcn-mcu.user.js` and create a new userscript in your manager.

## Usage

Once installed, the userscript will automatically run on every page you visit. It will:

1. Check for the presence of the `--primary` CSS variable (indicating a shadcn site)
2. If found, generate and inject MCU color variables
3. Log to the console whether colors were injected or not

You can check the browser console to see if the script detected and processed the page:

- "No shadcn primary color found on this page" - The page doesn't use shadcn
- "Found shadcn primary color: #..." - Primary color detected
- "MCU colors injected successfully" - MCU variables are now available

## Available CSS Variables

After the script runs, you'll have access to all MCU color variables:

### Color Roles

- `--mcu-primary`, `--mcu-on-primary`
- `--mcu-secondary`, `--mcu-on-secondary`
- `--mcu-tertiary`, `--mcu-on-tertiary`
- `--mcu-error`, `--mcu-on-error`
- `--mcu-background`, `--mcu-on-background`
- `--mcu-surface`, `--mcu-on-surface`
- And many more...

### Tonal Palettes

For each core color (primary, secondary, tertiary, neutral, neutral-variant, error), you get all tones:

- `--mcu-primary-0` through `--mcu-primary-100`
- `--mcu-secondary-0` through `--mcu-secondary-100`
- etc.

## Example

Visit any shadcn site (e.g., https://ui.shadcn.com) and you can now use MCU colors in your browser's developer tools:

```javascript
// In the browser console
document.body.style.backgroundColor = "var(--mcu-surface)";
document.body.style.color = "var(--mcu-on-surface)";
```

Or inject custom CSS:

```javascript
const style = document.createElement("style");
style.textContent = `
  .my-custom-element {
    background-color: var(--mcu-primary-container);
    color: var(--mcu-on-primary-container);
  }
`;
document.head.appendChild(style);
```

## Debugging

Open your browser's console to see debug messages:

- Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)
- Go to the "Console" tab
- Look for messages starting with `[Shadcn MCU]`

## Technical Details

- Reuses the `generateCss` function from react-mcu core library (DRY principle)
- Bundles all dependencies into a single userscript file (~238KB)
- Default scheme: Tonal Spot (following Material Design 3 guidelines)
- Supports both light and dark color schemes
- Automatically converts shadcn's HSL format to hex for processing

## Development

To rebuild the userscript after making changes:

```bash
pnpm run build:userscript
```

This bundles `userscripts/shadcn-mcu.ts` into `userscripts/shadcn-mcu.user.js` using the existing codebase.

## License

MIT
