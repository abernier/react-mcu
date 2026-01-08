[![npm version](https://img.shields.io/npm/v/react-mcu.svg)](https://www.npmjs.com/package/react-mcu)
[![](https://img.shields.io/badge/chromatic-171c23.svg?logo=chromatic)](https://www.chromatic.com/library?appId=695eb517cb602e59b4cc045c&branch=main)

Usage:

```tsx
import { Mcu } from "react-mcu";

<Mcu
  source="#0e1216"
  scheme="vibrant"
  contrast={0.5}
  customColors=[]
>
  <div style={{
    backgroundColor: "var(--mcu-surface)",
    color: "var(--mcu-on-surface)",
  }}>
    Hello, MCU colors!
  </div>
</Mcu>
```

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
pnpm dlx changeset
```

This helps us maintain the changelog and version the package appropriately.
