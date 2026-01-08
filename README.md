[![npm version](https://img.shields.io/npm/v/react-mcu.svg)](https://www.npmjs.com/package/react-mcu)
[![](https://img.shields.io/badge/chromatic-171c23.svg?logo=chromatic)](https://www.chromatic.com/library?appId=695eb517cb602e59b4cc045c&branch=main)

Usage:

```tsx
import { Mcu } from "react-mcu";

<Mcu
  source="#0e1216"
  scheme="vibrant"
  contrast={0.5}
  customColors=[
    { name: "myCustomColor1", hex: "#FF5733", blend: true },
    { name: "myCustomColor2", hex: "#3498DB", blend: false },
  ]
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

[![](https://snapshots.chromatic.com/snapshots/695eb517cb602e59b4cc045c-695fddf78332cc46c76d4590/thumb/capture-ad484cab.png)](https://main--695eb517cb602e59b4cc045c.chromatic.com)

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
