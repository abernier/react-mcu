[![npm version](https://img.shields.io/npm/v/react-mcu.svg)](https://www.npmjs.com/package/react-mcu)
[![](https://img.shields.io/badge/chromatic-171c23.svg?logo=chromatic)](https://www.chromatic.com/library?appId=695eb517cb602e59b4cc045c&branch=main)
[![](https://img.shields.io/badge/storybook-171c23.svg?logo=storybook)](https://main--695eb517cb602e59b4cc045c.chromatic.com)

It injects `--mcu-*` CSS variables into the page, based on
[m3 color system](https://m3.material.io/styles/color/roles).

https://material-foundation.github.io/material-theme-builder/

# Usage

```tsx
import { Mcu } from "react-mcu";

<Mcu
  source="#0e1216"
  scheme="vibrant"
  contrast={0.5}
  customColors={[
    { name: "myCustomColor1", hex: "#FF5733", blend: true },
    { name: "myCustomColor2", hex: "#3498DB", blend: false },
  ]}
>
  <p style={{
    backgroundColor: "var(--mcu-surface)",
    color: "var(--mcu-on-surface)",
  }}>
    Hello, MCU <span style={{
      backgroundColor: "var(--mcu-my-custom-color1)",
      color: "var(--mcu-my-custom-color2)",
    }}>colors<span>!
  </p>
</Mcu>
```

https://github.com/user-attachments/assets/5b67c961-d7a4-4b64-9356-4ada26bc9be4

A `useMcu` hook is also provided:

```tsx
import { useMcu } from "react-mcu";

const { initials, setMcuConfig, getMcuColor } = useMcu();

return (
  <button onClick={() => setMcuConfig({ ...initials, source: "#FF5722" })}>
    Change to {getMcuColor("primary", "light")}
  </button>
);
```

## Tailwind

Compatible with Tailwind through
[theme variables](https://tailwindcss.com/docs/theme):

```css
@theme {
  --color-background: var(--mcu-background);
  --color-on-background: var(--mcu-on-background);
  --color-surface: var(--mcu-surface);
  --color-surface-dim: var(--mcu-surface-dim);
  --color-surface-bright: var(--mcu-surface-bright);
  --color-surface-container-lowest: var(--mcu-surface-container-lowest);
  --color-surface-container-low: var(--mcu-surface-container-low);
  --color-surface-container: var(--mcu-surface-container);
  --color-surface-container-high: var(--mcu-surface-container-high);
  --color-surface-container-highest: var(--mcu-surface-container-highest);
  --color-on-surface: var(--mcu-on-surface);
  --color-on-surface-variant: var(--mcu-on-surface-variant);
  --color-outline: var(--mcu-outline);
  --color-outline-variant: var(--mcu-outline-variant);
  --color-inverse-surface: var(--mcu-inverse-surface);
  --color-inverse-on-surface: var(--mcu-inverse-on-surface);
  --color-primary: var(--mcu-primary);
  --color-on-primary: var(--mcu-on-primary);
  --color-primary-container: var(--mcu-primary-container);
  --color-on-primary-container: var(--mcu-on-primary-container);
  --color-primary-fixed: var(--mcu-primary-fixed);
  --color-primary-fixed-dim: var(--mcu-primary-fixed-dim);
  --color-on-primary-fixed: var(--mcu-on-primary-fixed);
  --color-on-primary-fixed-variant: var(--mcu-on-primary-fixed-variant);
  --color-inverse-primary: var(--mcu-inverse-primary);
  --color-secondary: var(--mcu-secondary);
  --color-on-secondary: var(--mcu-on-secondary);
  --color-secondary-container: var(--mcu-secondary-container);
  --color-on-secondary-container: var(--mcu-on-secondary-container);
  --color-secondary-fixed: var(--mcu-secondary-fixed);
  --color-secondary-fixed-dim: var(--mcu-secondary-fixed-dim);
  --color-on-secondary-fixed: var(--mcu-on-secondary-fixed);
  --color-on-secondary-fixed-variant: var(--mcu-on-secondary-fixed-variant);
  --color-tertiary: var(--mcu-tertiary);
  --color-on-tertiary: var(--mcu-on-tertiary);
  --color-tertiary-container: var(--mcu-tertiary-container);
  --color-on-tertiary-container: var(--mcu-on-tertiary-container);
  --color-tertiary-fixed: var(--mcu-tertiary-fixed);
  --color-tertiary-fixed-dim: var(--mcu-tertiary-fixed-dim);
  --color-on-tertiary-fixed: var(--mcu-on-tertiary-fixed);
  --color-on-tertiary-fixed-variant: var(--mcu-on-tertiary-fixed-variant);
  --color-error: var(--mcu-error);
  --color-on-error: var(--mcu-on-error);
  --color-error-container: var(--mcu-error-container);
  --color-on-error-container: var(--mcu-on-error-container);
}
```

Or simply `@import "react-mcu/tailwind.css"`:
https://github.com/abernier/react-mcu/blob/7cfd25113859a650153127e865a70df3da2483ac/examples/tanstack-start-app/src/index.css#L1-L2

# Dev

## INSTALL

Pre-requisites:

- Install [nvm](https://github.com/nvm-sh/nvm), then:
  ```sh
  $ nvm install
  $ nvm use
  $ node -v # make sure your version satisfies package.json#engines.node
  ```
  nb: if you want this node version to be your default nvm's one:
  `nvm alias default node`
- Install pnpm, with:
  ```sh
  $ corepack enable
  $ corepack prepare --activate # it reads "packageManager"
  $ pnpm -v # make sure your version satisfies package.json#engines.pnpm
  ```

```sh
$ pnpm i
```

## CONTRIBUTING

When submitting a pull request, please include a changeset to document your
changes:

```bash
pnpm exec changeset
```

This helps us maintain the changelog and version the package appropriately.
