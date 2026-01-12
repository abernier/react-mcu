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
    { name: "myCustomColor1", hex: "#6C8A0C", blend: true },
    { name: "myCustomColor2", hex: "#E126C6", blend: true },
    { name: "myCustomColor3", hex: "#E126C6", blend: false },
  ]}
>
  <p style={{
    backgroundColor: "var(--mcu-surface)",
    color: "var(--mcu-on-surface)",
  }}>
    Hello, MCU <span style={{
      backgroundColor: "var(--mcu-my-custom-color-1)",
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

https://github.com/abernier/react-mcu/blob/f981087651d77f6b11fc76cb783a5220a1b56e87/src/tailwind.css#L3-L76

Or simply:

```css
@import "react-mcu/tailwind.css";
```

> [!IMPORTANT]
>
> Do not forget to manually add your custom colors, as in:
> https://github.com/abernier/react-mcu/blob/f981087651d77f6b11fc76cb783a5220a1b56e87/src/tailwind.css#L52-L75

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
