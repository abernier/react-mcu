# Tailwind CSS v4 Plugin Example

This example shows how to use the react-mcu PostCSS plugin with Tailwind CSS v4.

## Basic Usage

Configure the plugin in your PostCSS config:

```js
// postcss.config.js
import mcuPlugin from 'react-mcu';

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    mcuPlugin(),
  }
}
```

This provides all base Material Design 3 colors.

## With Custom Colors

To include custom colors:

```js
// postcss.config.js
import mcuPlugin from 'react-mcu';

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    mcuPlugin({
      customColors: ['myCustomColor1', 'myCustomColor2', 'accent']
    }),
  }
}
```

## What's Included

The plugin generates:

1. **Base colors** - All Material Design 3 color roles:
   - `bg-background`, `bg-primary`, `text-on-primary`, etc.

2. **Color shades** - For primary, secondary, tertiary, error, neutral, and neutral-variant:
   - `bg-primary-50` through `bg-primary-950`
   - `bg-secondary-50` through `bg-secondary-950`
   - etc.

3. **Custom colors** (when specified):
   - `bg-myCustomColor1`, `text-on-myCustomColor1`
   - `bg-myCustomColor1-50` through `bg-myCustomColor1-950`

## Using in Your Components

```tsx
<div className="bg-primary text-on-primary p-4 rounded">
  Primary button
</div>

<div className="bg-myCustomColor1 text-on-myCustomColor1">
  Custom color element
</div>

<div className="bg-primary-500 hover:bg-primary-600">
  Primary with hover shade
</div>
```

## Alternative: Helper Function

You can also use the helper function to generate CSS programmatically:

```js
import { generateMcuTheme } from "react-mcu";

const theme = generateMcuTheme({
  customColors: ["myCustomColor1", "myCustomColor2"],
});

// Write to a file during build
fs.writeFileSync("mcu-theme.css", theme);
```

Then import the generated CSS in your main stylesheet.
