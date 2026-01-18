"use client";

import {
  argbFromHex,
  CorePalette,
  type CustomColor,
  customColor,
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
   */
  colorMatch?: boolean;
  /** Array of custom colors to include in the generated palette */
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
// Merge the base Material Dynamic Colors with custom colors
//
// returns: { primary: 0xFF6200EE, onPrimary: 0xFFFFFFFF, ..., customColor1: 0xFF6200EF, customColor2: 0x00FF00, ... }
//

function mergeBaseAndCustomColors(
  scheme: DynamicScheme,
  customColors: CustomColor[],
  sourceArgb: number,
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
  // Custom colors - using the library's built-in customColor function
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
  const isDark = scheme.isDark;

  customColors.forEach((color) => {
    // Use the library's built-in customColor function
    // This follows the Material Design 3 spec for custom colors
    const customColorGroup = customColor(sourceArgb, color);
    const colorGroup = isDark ? customColorGroup.dark : customColorGroup.light;
    const colorname = color.name;

    // Map the color group to our variable names
    customVars[colorname] = colorGroup.color;
    customVars[`on${upperFirst(colorname)}`] = colorGroup.onColor;
    customVars[`${colorname}Container`] = colorGroup.colorContainer;
    customVars[`on${upperFirst(colorname)}Container`] =
      colorGroup.onColorContainer;
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
  const hasCoreColors =
    primary ?? secondary ?? tertiary ?? neutral ?? neutralVariant ?? error;
  // console.log("MCU generateCss", { hasCoreColors });

  const sourceArgb = argbFromHex(hexSource);

  // Helper to create both light and dark schemes
  const createSchemes = (
    baseConfig: Omit<ConstructorParameters<typeof DynamicScheme>[0], "isDark">,
  ): [DynamicScheme, DynamicScheme] => [
    new DynamicScheme({ ...baseConfig, isDark: false }),
    new DynamicScheme({ ...baseConfig, isDark: true }),
  ];

  let lightScheme: DynamicScheme;
  let darkScheme: DynamicScheme;
  let corePalette: CorePalette;

  if (hasCoreColors) {
    // Convert hex core colors to ARGB
    const coreColorsArgb = {
      primary: primary ? argbFromHex(primary) : sourceArgb,
      secondary: secondary ? argbFromHex(secondary) : undefined,
      tertiary: tertiary ? argbFromHex(tertiary) : undefined,
      neutral: neutral ? argbFromHex(neutral) : undefined,
      neutralVariant: neutralVariant ? argbFromHex(neutralVariant) : undefined,
      error: error ? argbFromHex(error) : undefined,
    };

    // Create a custom CorePalette with the specified colors
    // colorMatch: true = stay true to input colors (non-harmonized)
    // colorMatch: false = harmonize colors (enforce minimum chroma)
    corePalette = colorMatch
      ? CorePalette.fromColors(coreColorsArgb)
      : CorePalette.contentFromColors(coreColorsArgb);

    const variant = schemeToVariant[scheme];

    [lightScheme, darkScheme] = createSchemes({
      sourceColorArgb: sourceArgb,
      variant,
      contrastLevel: contrast,
      primaryPalette: corePalette.a1,
      secondaryPalette: corePalette.a2,
      tertiaryPalette: corePalette.a3,
      neutralPalette: corePalette.n1,
      neutralVariantPalette: corePalette.n2,
    });
  } else {
    // Use default scheme generation
    const SchemeClass = schemesMap[scheme];
    const hct = Hct.fromInt(sourceArgb);

    lightScheme = new SchemeClass(hct, false, contrast);
    darkScheme = new SchemeClass(hct, true, contrast);

    // Create CorePalette for tonal palette access
    corePalette = CorePalette.of(sourceArgb);
  }

  // Prepare custom colors (keep ARGB so generateCssVars can use them)
  const customColors = hexCustomColors.map(({ hex, ...rest }) => ({
    ...rest,
    value: argbFromHex(hex),
  }));

  const mergedColorsLight = mergeBaseAndCustomColors(
    lightScheme,
    customColors,
    sourceArgb,
  );
  const mergedColorsDark = mergeBaseAndCustomColors(
    darkScheme,
    customColors,
    sourceArgb,
  );

  const lightVars = toCssVars(mergedColorsLight);
  const darkVars = toCssVars(mergedColorsDark);

  // Generate core colors tonal palette CSS variables
  const coreColorsTonalVars = [
    generateTonalPaletteVars("primary", corePalette.a1),
    generateTonalPaletteVars("secondary", corePalette.a2),
    generateTonalPaletteVars("tertiary", corePalette.a3),
    generateTonalPaletteVars("neutral", corePalette.n1),
    generateTonalPaletteVars("neutral-variant", corePalette.n2),
    generateTonalPaletteVars("error", corePalette.error),
  ].join(" ");

  // Generate custom color tonal palette CSS variables
  const customColorTonalVars = customColors
    .map((customColorObj) => {
      // Custom colors have their own TonalPalette
      // The palette can be accessed from the customColor result
      const palette = TonalPalette.fromInt(customColorObj.value);
      return generateTonalPaletteVars(kebabCase(customColorObj.name), palette);
    })
    .join(" ");

  return {
    css: `
:root { ${lightVars} ${coreColorsTonalVars} ${customColorTonalVars} }
.dark { ${darkVars} }
`,
    mergedColorsLight,
    mergedColorsDark,
  };
}
