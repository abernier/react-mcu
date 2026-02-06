"use client";

import {
  argbFromHex,
  Blend,
  CorePalette,
  type CustomColor,
  customColor,
  DynamicColor,
  DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  TonalPalette,
} from "@material/material-color-utilities";
import { kebabCase, upperFirst } from "lodash-es";
import { useMemo } from "react";
import { McuProvider } from "./Mcu.context";

type HexCustomColor = Omit<CustomColor, "value"> & {
  hex: string;
};

export type McuConfig = {
  /** Source color in hex format (e.g., "#6750A4") used to generate the color scheme */
  source: string;
  /** Color scheme variant. Default: "tonalSpot" */
  scheme?: SchemeName;
  /** Contrast level from -1.0 (reduced) to 1.0 (increased). Default: 0 (standard) */
  contrast?: number;
  /** Primary color - the main brand color. Overrides the default palette generation. */
  primary?: string;
  /** Secondary color - accent color. Overrides the default palette generation. */
  secondary?: string;
  /** Tertiary color - additional accent color. Overrides the default palette generation. */
  tertiary?: string;
  /** Neutral color - used for surfaces. Overrides the default palette generation. */
  neutral?: string;
  /** Neutral variant color - used for surfaces with slight tint. Overrides the default palette generation. */
  neutralVariant?: string;
  /** Error color - used for error states. Overrides the default palette generation. */
  error?: string;
  /**
   * Color match mode for core colors.
   * When true, stays true to input colors without harmonization.
   * When false (default), colors may be adjusted for better harmonization.
   * Corresponds to "Color match - Stay true to my color inputs" in Material Theme Builder.
   *
   * @default false
   * @deprecated Not yet implemented. This prop is currently ignored.
   */
  colorMatch?: boolean;
  /**
   * Array of custom colors to include in the generated palette.
   *
   * @example
   * ```ts
   * customColors={[
   *   { name: "brand", hex: "#FF5733", blend: true },
   *   { name: "success", hex: "#28A745", blend: false }
   * ]}
   * ```
   */
  customColors?: HexCustomColor[];
};

const schemesMap = {
  tonalSpot: SchemeTonalSpot,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
} as const;
export const schemeNames = Object.keys(
  schemesMap,
) as (keyof typeof schemesMap)[];
type SchemeName = (typeof schemeNames)[number];

export const DEFAULT_SCHEME: SchemeName = "tonalSpot";
export const DEFAULT_CONTRAST = 0;
export const DEFAULT_COLOR_MATCH = false;
export const DEFAULT_CUSTOM_COLORS: HexCustomColor[] = [];

// Standard Material Design 3 tones (as shown in Material Theme Builder)
export const STANDARD_TONES = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
] as const;

// Variant enum values (matching @material/material-color-utilities internal Variant)
const Variant = {
  MONOCHROME: 0,
  NEUTRAL: 1,
  TONAL_SPOT: 2,
  VIBRANT: 3,
  EXPRESSIVE: 4,
  FIDELITY: 5,
  CONTENT: 6,
  RAINBOW: 7,
  FRUIT_SALAD: 8,
} as const;

// Map scheme names to Variant values
const schemeToVariant: Record<SchemeName, number> = {
  tonalSpot: Variant.TONAL_SPOT,
  monochrome: Variant.MONOCHROME,
  neutral: Variant.NEUTRAL,
  vibrant: Variant.VIBRANT,
  expressive: Variant.EXPRESSIVE,
  fidelity: Variant.FIDELITY,
  content: Variant.CONTENT,
};

const mcuStyleId = "mcu-styles";

export function Mcu({
  source,
  scheme = DEFAULT_SCHEME,
  contrast = DEFAULT_CONTRAST,
  primary,
  secondary,
  tertiary,
  neutral,
  neutralVariant,
  error,
  colorMatch = DEFAULT_COLOR_MATCH,
  customColors = DEFAULT_CUSTOM_COLORS,
  children,
}: McuConfig & { children?: React.ReactNode }) {
  const config = useMemo(
    () => ({
      source,
      scheme,
      contrast,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      colorMatch,
      customColors,
    }),
    [
      contrast,
      customColors,
      scheme,
      source,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      colorMatch,
    ],
  );

  const { css } = useMemo(() => generateCss(config), [config]);

  return (
    <>
      <style id={mcuStyleId}>{css}</style>
      <McuProvider {...config} styleId={mcuStyleId}>
        {children}
      </McuProvider>
    </>
  );
}

// all colors https://github.com/material-foundation/material-color-utilities/blob/a800772dbf1adae9b5072daf975c1af7c9fddfe1/typescript/dynamiccolor/material_dynamic_colors.ts#L320
export const tokenNames = [
  "background",
  "onBackground",
  "surface",
  "surfaceDim",
  "surfaceBright",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "onSurface",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "inverseSurface",
  "inverseOnSurface",
  "primary",
  // "primaryDim",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "primaryFixed",
  "primaryFixedDim",
  "onPrimaryFixed",
  "onPrimaryFixedVariant",
  "inversePrimary",
  "primaryFixed",
  "primaryFixedDim",
  "onPrimaryFixed",
  "onPrimaryFixedVariant",
  "secondary",
  // "secondaryDim",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "secondaryFixed",
  "secondaryFixedDim",
  "onSecondaryFixed",
  "onSecondaryFixedVariant",
  "tertiary",
  // "tertiaryDim",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "tertiaryFixed",
  "tertiaryFixedDim",
  "onTertiaryFixed",
  "onTertiaryFixedVariant",
  "error",
  // "errorDim",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "scrim", // added manually, was missing
  "shadow", // added manually, was missing
] as const;
export type TokenName = (typeof tokenNames)[number];

//
// Utility function to convert an array of keys to an object/dictionary of key-value pairs
//
// @example:
// ```ts
// const arr1 = ['foo', 'bar'];
// const record = toRecord(arr1, item => [item, item.toUpperCase()]);
// // record is now { 'foo': 'FOO', 'bar': 'BAR' }
// ```
// @example:
// ```ts
// const arr2 = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
// const record = toRecord(arr2, item => [item.id, item.name]);
// // record is now { '1': 'Alice', '2': 'Bob' }
// ```
//
function toRecord<T, K extends string, V>(
  arr: readonly T[],
  getEntry: (item: T) => [K, V],
) {
  return arr.reduce(
    (acc, item) => {
      const [key, value] = getEntry(item);
      acc[key] = value;
      return acc;
    },
    {} as Record<K, V>,
  );
}

//
// Unified color handling: Core colors and custom colors use the same logic
//
// Core colors (primary, secondary, tertiary, neutral, neutralVariant, error) are
// essentially predefined custom colors with specific names and chroma requirements.
//

// Extended color definition that includes both core and custom colors
type ColorDefinition = {
  name: string;
  hex: string;
  blend?: boolean;
  isCoreColor?: boolean;
  chromaSource?: "primary" | "neutral" | "neutralVariant";
};

//
// Create DynamicColor objects for custom colors that respect the scheme
//
// These functions create DynamicColor objects similar to MaterialDynamicColors
// but for custom colors, following the same tone mapping patterns
//

type CustomColorPalettes = Map<string, TonalPalette>;

// Helper to safely get a palette from the map
function getPalette(
  palettes: CustomColorPalettes,
  colorName: string,
): TonalPalette {
  const palette = palettes.get(colorName);
  if (!palette) {
    throw new Error(
      `Custom color palette not found for '${colorName}'. This is likely a bug in the implementation.`,
    );
  }
  return palette;
}

function createCustomColorDynamicColor(
  colorName: string,
  palettes: CustomColorPalettes,
): DynamicColor {
  return new DynamicColor(
    colorName,
    (s) => getPalette(palettes, colorName),
    (s) => (s.isDark ? 80 : 40), // Same as primary
    false,
    undefined,
    undefined,
    undefined,
    undefined,
  );
}

function createOnCustomColorDynamicColor(
  colorName: string,
  palettes: CustomColorPalettes,
): DynamicColor {
  return new DynamicColor(
    `on${upperFirst(colorName)}`,
    (s) => getPalette(palettes, colorName),
    (s) => (s.isDark ? 20 : 100), // Same as onPrimary
    false,
    undefined,
    undefined,
    undefined,
    undefined,
  );
}

function createCustomColorContainerDynamicColor(
  colorName: string,
  palettes: CustomColorPalettes,
): DynamicColor {
  return new DynamicColor(
    `${colorName}Container`,
    (s) => getPalette(palettes, colorName),
    (s) => (s.isDark ? 30 : 90), // Same as primaryContainer
    false,
    undefined,
    undefined,
    undefined,
    undefined,
  );
}

function createOnCustomColorContainerDynamicColor(
  colorName: string,
  palettes: CustomColorPalettes,
): DynamicColor {
  return new DynamicColor(
    `on${upperFirst(colorName)}Container`,
    (s) => getPalette(palettes, colorName),
    (s) => (s.isDark ? 90 : 30), // Same as onPrimaryContainer
    false,
    undefined,
    undefined,
    undefined,
    undefined,
  );
}

//
// Merge the base Material Dynamic Colors with custom colors
//
// returns: { primary: 0xFF6200EE, onPrimary: 0xFFFFFFFF, ..., customColor1: 0xFF6200EF, customColor2: 0x00FF00, ... }
//

function mergeBaseAndCustomColors(
  scheme: DynamicScheme,
  customColors: CustomColor[],
  sourceArgb: number,
  customColorPalettes: CustomColorPalettes,
) {
  //
  // Base colors (all listed in tokenNames)
  //
  // returns: { primary: 0xFF6200EE, onPrimary: 0xFFFFFFFF, ... }
  //
  const baseVars = toRecord(tokenNames, (tokenName) => {
    const dynamicColor = MaterialDynamicColors[tokenName];
    const argb = dynamicColor.getArgb(scheme);
    return [tokenName, argb];
  });

  //
  // Custom colors - now using DynamicColor objects that respect the scheme
  //
  // For each custom color, generate:
  // 1. <colorname>
  // 2. on-<colorname>
  // 3. <colorname>-container
  // 4. on-<colorname>-container
  //
  // Based on Material Design 3 spec: https://m3.material.io/styles/color/the-color-system/color-roles
  //
  const customVars: Record<string, number> = {};

  customColors.forEach((color) => {
    const colorname = color.name;

    // Create DynamicColor objects that respect the scheme
    const colorDynamicColor = createCustomColorDynamicColor(
      colorname,
      customColorPalettes,
    );
    const onColorDynamicColor = createOnCustomColorDynamicColor(
      colorname,
      customColorPalettes,
    );
    const containerDynamicColor = createCustomColorContainerDynamicColor(
      colorname,
      customColorPalettes,
    );
    const onContainerDynamicColor = createOnCustomColorContainerDynamicColor(
      colorname,
      customColorPalettes,
    );

    // Get the ARGB values using the scheme
    customVars[colorname] = colorDynamicColor.getArgb(scheme);
    customVars[`on${upperFirst(colorname)}`] =
      onColorDynamicColor.getArgb(scheme);
    customVars[`${colorname}Container`] = containerDynamicColor.getArgb(scheme);
    customVars[`on${upperFirst(colorname)}Container`] =
      onContainerDynamicColor.getArgb(scheme);
  });

  // Merge both
  return { ...baseVars, ...customVars };
}

//
// Merge and format as a big string of CSS rules
//
// returns: "--mcu-primary: #ff6200ef; --mcu-on-primary: #ffffff; --mcu-custom-color1: #ff0000; --mcu-custom-color2: #00ff00;"
//

const cssVar = (colorName: string, colorValue: number) => {
  const name = `--mcu-${kebabCase(colorName)}`;
  const value = hexFromArgb(colorValue);

  return `${name}:${value};`; // eg: `--mcu-on-primary:#ffffff;`
};

//
// Generate CSS variables for all tones in a tonal palette
//
const generateTonalPaletteVars = (
  paletteName: string,
  palette: TonalPalette,
) => {
  return STANDARD_TONES.map((tone) => {
    const color = palette.tone(tone);
    return cssVar(`${paletteName}-${tone}`, color);
  }).join(" ");
};

//
// Helper function to create a palette for any color (core or custom)
// This unifies the logic between core colors and custom colors
//
function createColorPalette(
  colorDef: ColorDefinition,
  baseScheme: DynamicScheme,
  effectiveSourceForHarmonization: number,
): TonalPalette {
  // Get the color value, applying harmonization if needed
  const colorArgb = argbFromHex(colorDef.hex);
  const harmonizedArgb = colorDef.blend
    ? Blend.harmonize(colorArgb, effectiveSourceForHarmonization)
    : colorArgb;

  const hct = Hct.fromInt(harmonizedArgb);

  // Determine which chroma to use based on color type
  let targetChroma: number;
  if (colorDef.isCoreColor && colorDef.chromaSource) {
    // Core colors use specific chroma values from the base scheme
    if (colorDef.chromaSource === "neutral") {
      targetChroma = baseScheme.neutralPalette.chroma;
    } else if (colorDef.chromaSource === "neutralVariant") {
      targetChroma = baseScheme.neutralVariantPalette.chroma;
    } else {
      // primary chroma for primary, secondary, tertiary, error
      targetChroma = baseScheme.primaryPalette.chroma;
    }
  } else {
    // Custom colors use primary chroma (same as before)
    targetChroma = baseScheme.primaryPalette.chroma;
  }

  return TonalPalette.fromHueAndChroma(hct.hue, targetChroma);
}

//
// Generate full CSS styles string (for insertion into a <style> tag)
//

const toCssVars = (mergedColors: Record<string, number>) => {
  return Object.entries(mergedColors)
    .map(([name, value]) => cssVar(name, value))
    .join(" ");
};

export function generateCss({
  source: hexSource,
  scheme = DEFAULT_SCHEME,
  contrast = DEFAULT_CONTRAST,
  primary,
  secondary,
  tertiary,
  neutral,
  neutralVariant,
  error,
  colorMatch = DEFAULT_COLOR_MATCH,
  customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
}: McuConfig) {
  const sourceArgb = argbFromHex(hexSource);

  // Determine the effective source for harmonization
  // When primary is defined, it becomes the effective source
  const effectiveSource = primary || hexSource;
  const effectiveSourceArgb = argbFromHex(effectiveSource);
  const effectiveSourceForHarmonization = primary
    ? argbFromHex(primary)
    : sourceArgb;

  // Create a base scheme to get the standard chroma values
  const SchemeClass = schemesMap[scheme];
  const primaryHct = Hct.fromInt(effectiveSourceArgb);
  const baseScheme = new SchemeClass(primaryHct, false, contrast);

  // Unified color processing: Combine core colors and custom colors
  const allColors: ColorDefinition[] = [];

  // Add core colors if defined
  if (primary) {
    allColors.push({
      name: "primary",
      hex: primary,
      isCoreColor: true,
      chromaSource: "primary",
    });
  }
  if (secondary) {
    allColors.push({
      name: "secondary",
      hex: secondary,
      isCoreColor: true,
      chromaSource: "primary",
    });
  }
  if (tertiary) {
    allColors.push({
      name: "tertiary",
      hex: tertiary,
      isCoreColor: true,
      chromaSource: "primary",
    });
  }
  if (neutral) {
    allColors.push({
      name: "neutral",
      hex: neutral,
      isCoreColor: true,
      chromaSource: "neutral",
    });
  }
  if (neutralVariant) {
    allColors.push({
      name: "neutralVariant",
      hex: neutralVariant,
      isCoreColor: true,
      chromaSource: "neutralVariant",
    });
  }
  if (error) {
    allColors.push({
      name: "error",
      hex: error,
      isCoreColor: true,
      chromaSource: "primary",
    });
  }

  // Add custom colors
  hexCustomColors.forEach((customColor) => {
    allColors.push({
      name: customColor.name,
      hex: customColor.hex,
      blend: customColor.blend,
      isCoreColor: false,
    });
  });

  // Create palettes for all colors using unified logic
  const colorPalettes = new Map<string, TonalPalette>();
  allColors.forEach((colorDef) => {
    const palette = createColorPalette(
      colorDef,
      baseScheme,
      effectiveSourceForHarmonization,
    );
    colorPalettes.set(colorDef.name, palette);
  });

  // Helper to create both light and dark schemes
  const createSchemes = (
    baseConfig: Omit<ConstructorParameters<typeof DynamicScheme>[0], "isDark">,
  ): [DynamicScheme, DynamicScheme] => [
    new DynamicScheme({ ...baseConfig, isDark: false }),
    new DynamicScheme({ ...baseConfig, isDark: true }),
  ];

  // Create schemes with core color palettes (or defaults from baseScheme)
  // Since source is always required, we always have a base to work from
  const variant = schemeToVariant[scheme];
  const [lightScheme, darkScheme] = createSchemes({
    sourceColorArgb: effectiveSourceArgb,
    variant,
    contrastLevel: contrast,
    primaryPalette: colorPalettes.get("primary") || baseScheme.primaryPalette,
    secondaryPalette:
      colorPalettes.get("secondary") || baseScheme.secondaryPalette,
    tertiaryPalette:
      colorPalettes.get("tertiary") || baseScheme.tertiaryPalette,
    neutralPalette: colorPalettes.get("neutral") || baseScheme.neutralPalette,
    neutralVariantPalette:
      colorPalettes.get("neutralVariant") || baseScheme.neutralVariantPalette,
  });

  // Note: DynamicScheme constructor doesn't accept errorPalette as parameter
  // We need to set it after creation
  const errorPalette = colorPalettes.get("error");
  if (errorPalette) {
    lightScheme.errorPalette = errorPalette;
    darkScheme.errorPalette = errorPalette;
  }

  // Prepare custom colors for merging (non-core colors only)
  const customColors = hexCustomColors.map(({ hex, ...rest }) => ({
    ...rest,
    value: argbFromHex(hex),
  }));

  const mergedColorsLight = mergeBaseAndCustomColors(
    lightScheme,
    customColors,
    sourceArgb,
    colorPalettes,
  );
  const mergedColorsDark = mergeBaseAndCustomColors(
    darkScheme,
    customColors,
    sourceArgb,
    colorPalettes,
  );

  const lightVars = toCssVars(mergedColorsLight);
  const darkVars = toCssVars(mergedColorsDark);

  // Generate tonal palette CSS variables for all colors (core + custom)
  // Use the palettes from the light scheme and our unified colorPalettes map
  const allTonalVars = [
    // Core colors from the scheme
    generateTonalPaletteVars("primary", lightScheme.primaryPalette),
    generateTonalPaletteVars("secondary", lightScheme.secondaryPalette),
    generateTonalPaletteVars("tertiary", lightScheme.tertiaryPalette),
    generateTonalPaletteVars("error", lightScheme.errorPalette),
    generateTonalPaletteVars("neutral", lightScheme.neutralPalette),
    generateTonalPaletteVars(
      "neutral-variant",
      lightScheme.neutralVariantPalette,
    ),
    // Custom colors from our unified palette map
    ...customColors.map((customColorObj) => {
      const palette = getPalette(colorPalettes, customColorObj.name);
      return generateTonalPaletteVars(kebabCase(customColorObj.name), palette);
    }),
  ].join(" ");

  return {
    css: `
:root { ${lightVars} ${allTonalVars} }
.dark { ${darkVars} }
`,
    mergedColorsLight,
    mergedColorsDark,
  };
}
