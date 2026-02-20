[![npm version](https://img.shields.io/npm/v/material-theme-builder.svg)](https://www.npmjs.com/package/material-theme-builder)

# material-theme-builder

[Material Design 3](https://m3.material.io/styles/color/system/overview) theme
builder — generic API and CLI.

## Programmatic API

```ts
import { builder } from "material-theme-builder";

const theme = builder("#6750A4", {
  scheme: "vibrant",
  contrast: 0.5,
  primary: "#FF0000",
  secondary: "#00FF00",
  customColors: [
    { name: "brand", hex: "#FF5733", blend: true },
    { name: "success", hex: "#28A745", blend: false },
  ],
});

theme.toJson();
theme.toCss();
theme.toFigmaTokens();
```

## CLI

```sh
$ npx material-theme-builder "#6750A4"
```

will generate a `mcu-theme` folder with: `Light.tokens.json` and
`Dark.tokens.json`
[design-tokens](https://www.designtokens.org/tr/2025.10/) files, you can (both)
import into Figma.

See `npx material-theme-builder --help` for all available options.
