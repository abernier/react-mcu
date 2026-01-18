/**
 * Tailwind CSS v4 plugin for react-mcu color variables
 *
 * This plugin generates --color-* variables from --mcu-* variables,
 * making Material Design 3 colors available as Tailwind utilities.
 *
 * Usage in PostCSS config:
 * ```js
 * // postcss.config.js
 * import mcuPlugin from 'react-mcu';
 *
 * export default {
 *   plugins: {
 *     '@tailwindcss/postcss': {},
 *     mcuPlugin({ customColors: ['myCustomColor1', 'myCustomColor2'] }),
 *   }
 * }
 * ```
 *
 * Or use the helper function to generate CSS:
 * ```js
 * import { generateMcuTheme } from 'react-mcu';
 *
 * const theme = generateMcuTheme({ customColors: ['myCustomColor1'] });
 * // Write to a file or use in your build
 * ```
 */

import { kebabCase } from "lodash-es";
import { tokenNames, STANDARD_TONES } from "./Mcu.js";

// Color palettes that have shades
const PALETTE_COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "neutral",
  "neutral-variant",
] as const;

// Standard Material Design 3 tone mapping to Tailwind shades
const TONE_TO_SHADE: Record<number, string> = {
  95: "50",
  90: "100",
  80: "200",
  70: "300",
  60: "400",
  50: "500",
  40: "600",
  30: "700",
  20: "800",
  10: "900",
  5: "950",
};

/**
 * Generate color variables CSS string
 */
function generateColorVars(customColors: string[] = []): string {
  const vars: string[] = [];

  // Base colors - convert tokenNames (camelCase) to Tailwind format
  tokenNames.forEach((tokenName) => {
    const mcuVarName = kebabCase(tokenName);
    vars.push(`--color-${tokenName}: var(--mcu-${mcuVarName});`);
  });

  // Palette colors with shades
  PALETTE_COLORS.forEach((paletteName) => {
    STANDARD_TONES.forEach((tone) => {
      const shade = TONE_TO_SHADE[tone];
      if (shade) {
        vars.push(
          `--color-${paletteName}-${shade}: var(--mcu-${paletteName}-${tone});`,
        );
      }
    });
  });

  // Custom colors
  customColors.forEach((customColorName) => {
    const kebabName = kebabCase(customColorName);
    const camelName = customColorName;

    // Base custom color variables
    vars.push(`--color-${camelName}: var(--mcu-${kebabName});`);
    vars.push(`--color-on-${camelName}: var(--mcu-on-${kebabName});`);
    vars.push(
      `--color-${camelName}-container: var(--mcu-${kebabName}-container);`,
    );
    vars.push(
      `--color-on-${camelName}-container: var(--mcu-on-${kebabName}-container);`,
    );

    // Custom color shades
    STANDARD_TONES.forEach((tone) => {
      const shade = TONE_TO_SHADE[tone];
      if (shade) {
        vars.push(
          `--color-${camelName}-${shade}: var(--mcu-${kebabName}-${tone});`,
        );
      }
    });
  });

  return vars.join("\n  ");
}

/**
 * Plugin options
 */
export interface McuPluginOptions {
  /** Array of custom color names (in camelCase or kebab-case) */
  customColors?: string[];
}

/**
 * Generate Tailwind CSS theme with MCU color variables
 */
export function generateMcuTheme(options: McuPluginOptions = {}): string {
  const { customColors = [] } = options;

  return `@theme {
  ${generateColorVars(customColors)}
}`;
}

/**
 * Create a PostCSS plugin for Tailwind CSS v4
 * This allows the plugin to be used in PostCSS config
 */
export default function mcuPlugin(options: McuPluginOptions = {}): any {
  const themeContent = generateMcuTheme(options);

  return {
    postcssPlugin: "react-mcu",
    Once(root: any) {
      // Insert the theme at the end of the root
      root.append(themeContent);
    },
  };
}

mcuPlugin.postcss = true;

// Named export for backward compatibility
export { mcuPlugin };
