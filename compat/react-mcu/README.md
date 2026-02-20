# react-mcu

> ⚠️ **This package has been renamed to [`material-theme-builder`](https://www.npmjs.com/package/material-theme-builder).**
>
> This is a v2 compatibility bridge. It re-exports everything from `material-theme-builder` and will not receive further updates.

## Migration

Replace `react-mcu` with `material-theme-builder` in your dependencies and imports:

```diff
- npm install react-mcu
+ npm install material-theme-builder
```

```diff
- import { Mcu, builder, useMcu } from "react-mcu";
+ import { Mcu, builder, useMcu } from "material-theme-builder";
```

```diff
- @import "react-mcu/tailwind.css";
+ @import "material-theme-builder/tailwind.css";
```

```diff
- npx react-mcu builder "#6750A4"
+ npx material-theme-builder builder "#6750A4"
```
