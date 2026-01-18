[![npm version](https://img.shields.io/npm/v/react-mcu.svg)](https://www.npmjs.com/package/react-mcu)
[![](https://img.shields.io/badge/chromatic-171c23.svg?logo=chromatic)](https://www.chromatic.com/library?appId=695eb517cb602e59b4cc045c&branch=main)
[![](https://img.shields.io/badge/storybook-171c23.svg?logo=storybook)](https://main--695eb517cb602e59b4cc045c.chromatic.com)

[Material Design colors](https://m3.material.io/styles/color/system/overview)
for React.

It injects `--mcu-*` CSS variables into the page.

https://github.com/user-attachments/assets/5b67c961-d7a4-4b64-9356-4ada26bc9be4

m3 references:

| builder                                                                                                                                                                                                                             | roles                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [<img width="2836" height="2266" alt="CleanShot 2026-01-14 at 08 58 40@2x" src="https://github.com/user-attachments/assets/e4b47c00-716f-4b08-b393-de306d5ce302" />](https://material-foundation.github.io/material-theme-builder/) | [<img width="2836" height="2266" alt="CleanShot 2026-01-14 at 09 01 23@2x" src="https://github.com/user-attachments/assets/826e502d-e173-43c4-807a-53d0ba075a88" />](https://m3.material.io/styles/color/roles) |

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
      color: "var(--mcu-on-my-custom-color-1)",
    }}>colors<span>!
  </p>
</Mcu>
```

> [!TIP]
>
> Typically wrapping `{children}` in a
> [layout](https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-layout).

> [!NOTE]
>
> CSS varnames are always kebab-cased, `myCustomColor1` →
> `--mcu-my-custom-color-1`

## `useMcu`

A hook is also provided:

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

Compatible through [theme variables](https://tailwindcss.com/docs/theme):

https://github.com/abernier/react-mcu/blob/688c789e322ed3858b51389b33eb7ea342bba81e/src/tailwind.css#L3-L186

Or simply:

```css
@import "react-mcu/tailwind.css";
```

> [!IMPORTANT]
>
> Do not forget to manually add your custom colors, as in:
> https://github.com/abernier/react-mcu/blob/688c789e322ed3858b51389b33eb7ea342bba81e/src/tailwind.css#L126-L185

## shadcn

Pre-requisites:

- You should use
  [`tailwind.cssVariables`](https://ui.shadcn.com/docs/theming#css-variables)

Simply override/remap
[shadcn's CSS variables](https://ui.shadcn.com/docs/theming#list-of-variables):

```css
:root {
  /* ... */
}
.dark {
  /* ... */
}

:root,
.dark {
  --background: var(--mcu-surface);
  --foreground: var(--mcu-on-surface);
  --card: var(--mcu-surface-container-low);
  --card-foreground: var(--mcu-on-surface);
  --popover: var(--mcu-surface-container-high);
  --popover-foreground: var(--mcu-on-surface);
  --primary: var(--mcu-primary);
  --primary-foreground: var(--mcu-on-primary);
  --secondary: var(--mcu-secondary-container);
  --secondary-foreground: var(--mcu-on-secondary-container);
  --muted: var(--mcu-surface-container-highest);
  --muted-foreground: var(--mcu-on-surface-variant);
  --accent: var(--mcu-secondary-container);
  --accent-foreground: var(--mcu-on-secondary-container);
  --destructive: var(--mcu-error);
  --border: var(--mcu-outline-variant);
  --input: var(--mcu-outline);
  --ring: var(--mcu-primary);
  --chart-1: var(--mcu-primary-fixed);
  --chart-2: var(--mcu-secondary-fixed);
  --chart-3: var(--mcu-tertiary-fixed);
  --chart-4: var(--mcu-primary-fixed-dim);
  --chart-5: var(--mcu-secondary-fixed-dim);
  --sidebar: var(--mcu-surface-container-low);
  --sidebar-foreground: var(--mcu-on-surface);
  --sidebar-primary: var(--mcu-primary);
  --sidebar-primary-foreground: var(--mcu-on-primary);
  --sidebar-accent: var(--mcu-secondary-container);
  --sidebar-accent-foreground: var(--mcu-on-secondary-container);
  --sidebar-border: var(--mcu-outline-variant);
  --sidebar-ring: var(--mcu-primary);
}
```

<details>
  <summary>mapping details</summary>
  see:
  
    - https://chatgpt.com/share/6899f20a-422c-8011-a072-62fb649589a0
    - https://gemini.google.com/share/51e072b6f1d2
</details>

> [!IMPORTANT]
>
> Make sure `:root, .dark { ... }` comes AFTER `.root { ... } .dark { ... }` to
> take precedence.

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
