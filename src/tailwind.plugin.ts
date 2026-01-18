/**
 * Tailwind CSS v4 plugin for react-mcu color variables
 *
 * This plugin automatically generates --color-* variables from --mcu-* variables,
 * making Material Design 3 colors available as Tailwind utilities.
 *
 * Usage:
 * ```ts
 * // In your CSS file
 * import mcuPlugin from 'react-mcu/tailwind.plugin';
 *
 * // Then use the generated CSS string
 * const cssString = mcuPlugin({ customColors: ['myCustomColor1'] });
 * ```
 *
 * Or use the helper function to generate a CSS file:
 * ```ts
 * import { generateMcuTheme } from 'react-mcu/tailwind.plugin';
 *
 * const theme = generateMcuTheme({ customColors: ['myCustomColor1', 'myCustomColor2'] });
 * // Write theme to a CSS file or use it in your build process
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

  return `@theme inline {
  ${generateColorVars(customColors)}
}`;
}

/**
 * Default export - generates theme CSS
 */
export default function mcuPlugin(options: McuPluginOptions = {}): string {
  return generateMcuTheme(options);
}

// Named export for backward compatibility
export { mcuPlugin };
