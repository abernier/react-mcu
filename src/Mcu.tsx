"use client";

import {
  argbFromHex,
  Blend,
  type CustomColor,
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
import { McuProvider, useMcu } from "./Mcu.context";

// Helper function to adjust tone based on contrast level
// This provides a simple linear adjustment similar to Material Design's approach
// The adjustment factor controls how much the tone shifts per contrast level
// - At contrast=1.0: tones shift by 20% of their distance from center (50) toward extremes
// - At contrast=-1.0: tones shift by 20% toward the middle (50)
// The logic is universal: it moves away from the gray middle (50)
// - If tone > 50, it pushes toward 100 (lighter)
// - If tone < 50, it pushes toward 0 (darker)
// Returns a clamped value between 0 and 100
function adjustToneForContrast(
  baseTone: number,
  contrastLevel: number,
  adjustmentFactor: number = DEFAULT_CONTRAST_ADJUSTMENT_FACTOR,
) {
  if (contrastLevel === 0) return baseTone;

  // Calculate the distance from the center (50)
  // Ex: Tone 90 -> distance +40
  // Ex: Tone 10 -> distance -40
  const distanceToCenter = baseTone - 50;

  // If contrastLevel is positive (ex: 1.0), amplify this distance
  // If contrastLevel is negative (ex: -1.0), reduce this distance
  // The change is proportional to the current distance from center
  const delta = distanceToCenter * contrastLevel * adjustmentFactor;

  // Example: Tone 90 (Light), Contrast 1.0
  // delta = 40 * 1 * 0.2 = 8
  // Result = 90 + 8 = 98 (Lighter -> Correct)

  // Example: Tone 10 (Dark), Contrast 1.0
  // delta = -40 * 1 * 0.2 = -8
  // Result = 10 + (-8) = 2 (Darker -> Correct)

  const adjustedTone = baseTone + delta;

  return Math.max(0, Math.min(100, adjustedTone));
}

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
  /**
   * When true, applies the contrast level to all colors including custom colors and tonal palette shades.
   * When false (default), only core colors are affected by the contrast level.
   */
  contrastAllColors?: boolean;
  /**
   * When true (default), tonal palette shades adapt to the theme (light/dark) with inverted tone values.
   * In dark mode, high tones (light colors) map to low tones (dark colors) and vice versa.
   * When false, shades remain the same across themes.
   */
  adaptiveShades?: boolean;
};

type SchemeConstructor = new (
  sourceColorHct: Hct,
  isDark: boolean,
  contrastLevel: number,
) => DynamicScheme;

export const schemeNames = [
  "tonalSpot",
  "monochrome",
  "neutral",
  "vibrant",
  "expressive",
  "fidelity",
  "content",
] as const;
type SchemeName = (typeof schemeNames)[number];

const schemesMap: Record<SchemeName, SchemeConstructor> = {
  tonalSpot: SchemeTonalSpot,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
};

export const DEFAULT_SCHEME: SchemeName = "tonalSpot";
export const DEFAULT_CONTRAST = 0;
export const DEFAULT_COLOR_MATCH = false;
export const DEFAULT_CUSTOM_COLORS: HexCustomColor[] = [];
export const DEFAULT_CONTRAST_ALL_COLORS = false;
export const DEFAULT_ADAPTIVE_SHADES = false;
export const DEFAULT_BLEND = true;
export const DEFAULT_CONTRAST_ADJUSTMENT_FACTOR = 0.2;

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
  contrastAllColors = DEFAULT_CONTRAST_ALL_COLORS,
  adaptiveShades = DEFAULT_ADAPTIVE_SHADES,
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
      // extras features
      contrastAllColors,
      adaptiveShades,
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
      contrastAllColors,
      adaptiveShades,
    ],
  );

  return (
    <McuProvider {...config} styleId={mcuStyleId}>
      {children}
    </McuProvider>
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
  "surfaceVariant",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "inverseSurface",
  "inverseOnSurface",
  "primary",
  "surfaceTint",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "primaryFixed",
  "primaryFixedDim",
  "onPrimaryFixed",
  "onPrimaryFixedVariant",
  "inversePrimary",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "secondaryFixed",
  "secondaryFixedDim",
  "onSecondaryFixed",
  "onSecondaryFixedVariant",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "tertiaryFixed",
  "tertiaryFixedDim",
  "onTertiaryFixed",
  "onTertiaryFixedVariant",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "scrim",
  "shadow",
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
  getEntry: (item: T) => readonly [K, V],
) {
  return Object.fromEntries(arr.map(getEntry));
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
  hex?: string;
  blend?: boolean;
  core?: boolean;
  chromaSource?: "primary" | "neutral" | "neutralVariant";
};

//
// Create DynamicColor objects for custom colors that respect the scheme
//
// These functions create DynamicColor objects similar to MaterialDynamicColors
// but for custom colors, following the same tone mapping patterns
//

type ColorPalettes = ReturnType<typeof useMcu>["allPalettes"];

// Helper to safely get a palette from the record
function getPalette(palettes: ColorPalettes, colorName: string) {
  const palette = palettes[colorName];
  if (!palette) {
    throw new Error(
      `Custom color palette not found for '${colorName}'. This is likely a bug in the implementation.`,
    );
  }
  return palette;
}

//
// Merge the base Material Dynamic Colors with custom colors
//
// returns: { primary: 0xFF6200EE, onPrimary: 0xFFFFFFFF, ..., customColor1: 0xFF6200EF, customColor2: 0x00FF00, ... }
//

function mergeBaseAndCustomColors(
  scheme: DynamicScheme,
  customColors: CustomColor[],
  colorPalettes: ColorPalettes,
  contrastAllColors: boolean,
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
  // Custom colors - using MaterialDynamicColors-like approach
  //
  // For each custom color, generate DynamicColor objects exactly like core colors:
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

    // Helper to get palette for this color
    const getPaletteForColor = (s: DynamicScheme) =>
      getPalette(colorPalettes, colorname);

    // Helper to get tone with optional contrast adjustment
    const getTone = (baseTone: number) => (s: DynamicScheme) => {
      if (!contrastAllColors) return baseTone;
      return adjustToneForContrast(baseTone, s.contrastLevel);
    };

    // Create DynamicColor objects for all 4 color roles
    const colorDynamicColor = new DynamicColor(
      colorname,
      getPaletteForColor,
      (s) => getTone(s.isDark ? 80 : 40)(s), // Main color: lighter in dark mode, darker in light mode
      true, // background
    );
    const onColorDynamicColor = new DynamicColor(
      `on${upperFirst(colorname)}`,
      getPaletteForColor,
      (s) => getTone(s.isDark ? 20 : 100)(s), // Text on main color: high contrast (dark on light, light on dark)
      false,
    );
    const containerDynamicColor = new DynamicColor(
      `${colorname}Container`,
      getPaletteForColor,
      (s) => getTone(s.isDark ? 30 : 90)(s), // Container: subtle variant (darker in dark mode, lighter in light mode)
      true, // background
    );
    const onContainerDynamicColor = new DynamicColor(
      `on${upperFirst(colorname)}Container`,
      getPaletteForColor,
      (s) => getTone(s.isDark ? 90 : 30)(s), // Text on container: high contrast against container background
      false,
    );

    // Get the ARGB values using the scheme - exactly like core colors do
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
// Helper function to create a palette for any color (core or custom)
// This unifies the logic between core colors and custom colors
//
function createColorPalette(
  colorDef: ColorDefinition & { hex: string },
  baseScheme: DynamicScheme,
  effectiveSourceForHarmonization: number,
) {
  // Get the color value, applying harmonization if needed
  const colorArgb = argbFromHex(colorDef.hex);
  const harmonizedArgb = colorDef.blend
    ? Blend.harmonize(colorArgb, effectiveSourceForHarmonization)
    : colorArgb;

  const hct = Hct.fromInt(harmonizedArgb);

  // Determine which chroma to use based on color type
  let targetChroma: number;
  if (colorDef.core && colorDef.chromaSource) {
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

/**
 * Builder API
 */
export function builder(
  hexSource: McuConfig["source"],
  {
    scheme = DEFAULT_SCHEME,
    contrast = DEFAULT_CONTRAST,
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
    customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
    contrastAllColors = DEFAULT_CONTRAST_ALL_COLORS,
    adaptiveShades = DEFAULT_ADAPTIVE_SHADES,
  }: Omit<McuConfig, "source"> = {},
) {
  const sourceArgb = argbFromHex(hexSource);
  const sourceHct = Hct.fromInt(sourceArgb);

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

  // Unified color processing: Combine core colors and custom colors, filter to only those with hex defined
  const allColors: ColorDefinition[] = [
    // Core colors (hex may be undefined)
    {
      name: "primary",
      hex: primary,
      core: true,
      chromaSource: "primary",
    },
    {
      name: "secondary",
      hex: secondary,
      core: true,
      chromaSource: "primary",
    },
    {
      name: "tertiary",
      hex: tertiary,
      core: true,
      chromaSource: "primary",
    },
    { name: "error", hex: error, core: true, chromaSource: "primary" },
    {
      name: "neutral",
      hex: neutral,
      core: true,
      chromaSource: "neutral",
    },
    {
      name: "neutralVariant",
      hex: neutralVariant,
      core: true,
      chromaSource: "neutralVariant",
    },
    //
    // Custom colors
    //
    ...hexCustomColors.map((c) => ({
      name: c.name,
      hex: c.hex,
      blend: c.blend,
      core: false,
    })),
  ];

  const definedColors = allColors.filter(
    (c): c is ColorDefinition & { hex: string } => c.hex !== undefined,
  );

  // Create palettes for all defined colors
  const colorPalettes = Object.fromEntries(
    definedColors.map((colorDef) => [
      colorDef.name,
      createColorPalette(colorDef, baseScheme, effectiveSourceForHarmonization),
    ]),
  );

  // Create schemes with core color palettes (or defaults from baseScheme)
  // Since source is always required, we always have a base to work from
  const variant = schemeToVariant[scheme];
  const schemeConfig = {
    sourceColorArgb: effectiveSourceArgb,
    variant,
    contrastLevel: contrast,
    primaryPalette: colorPalettes["primary"] || baseScheme.primaryPalette,
    secondaryPalette: colorPalettes["secondary"] || baseScheme.secondaryPalette,
    tertiaryPalette: colorPalettes["tertiary"] || baseScheme.tertiaryPalette,
    neutralPalette: colorPalettes["neutral"] || baseScheme.neutralPalette,
    neutralVariantPalette:
      colorPalettes["neutralVariant"] || baseScheme.neutralVariantPalette,
  };
  const lightScheme = new DynamicScheme({ ...schemeConfig, isDark: false });
  const darkScheme = new DynamicScheme({ ...schemeConfig, isDark: true });

  // Note: DynamicScheme constructor doesn't accept errorPalette as parameter
  // We need to set it after creation
  const errorPalette = colorPalettes["error"];
  if (errorPalette) {
    lightScheme.errorPalette = errorPalette;
    darkScheme.errorPalette = errorPalette;
  }

  // Scheme-transformed palettes used by toCss() for CSS variables.
  // These match what MTB displays visually (eg SchemeTonalSpot clamps chroma),
  // NOT what it exports in JSON (see rawPalettes inside toJson()).
  const allPalettes = {
    primary: lightScheme.primaryPalette,
    secondary: lightScheme.secondaryPalette,
    tertiary: lightScheme.tertiaryPalette,
    error: lightScheme.errorPalette,
    neutral: lightScheme.neutralPalette,
    "neutral-variant": lightScheme.neutralVariantPalette,
    // Add custom color palettes
    ...Object.fromEntries(
      definedColors
        .filter((c) => !c.core)
        .map((colorDef) => [colorDef.name, colorPalettes[colorDef.name]]),
    ),
  };

  // Extract custom colors (non-core) for merging
  const customColors = definedColors
    .filter((c) => !c.core)
    .map((c) => ({
      name: c.name,
      blend: c.blend ?? DEFAULT_BLEND,
      value: argbFromHex(c.hex),
    }));

  const mergedColorsLight = mergeBaseAndCustomColors(
    lightScheme,
    customColors,
    colorPalettes,
    contrastAllColors,
  );
  const mergedColorsDark = mergeBaseAndCustomColors(
    darkScheme,
    customColors,
    colorPalettes,
    contrastAllColors,
  );

  return {
    // ──────────────────────────────────────────────────────────────────────────
    // Formatters
    // ──────────────────────────────────────────────────────────────────────────

    toCss() {
      function cssVar(colorName: string, colorValue: number) {
        const name = `--mcu-${kebabCase(colorName)}`;
        const value = hexFromArgb(colorValue);
        return `${name}:${value};`; // eg: `--mcu-on-primary:#ffffff;`
      }

      function toCssVars(mergedColors: Record<string, number>) {
        return Object.entries(mergedColors)
          .map(([name, value]) => cssVar(name, value))
          .join(" ");
      }

      function generateTonalPaletteVars(
        paletteName: string,
        palette: TonalPalette,
        scheme: DynamicScheme,
        applyContrast: boolean,
        adaptiveShades: boolean,
      ) {
        return STANDARD_TONES.map((tone) => {
          let toneToUse: number = tone;

          // In dark mode, invert the tone values so that high tone numbers
          // (which represent light colors) map to low tone values (dark colors)
          // This makes shades adapt naturally to the theme like core colors do
          // Only applies when adaptiveShades is enabled
          if (adaptiveShades && scheme.isDark) {
            toneToUse = 100 - tone;
          }

          // Apply contrast adjustment to tonal shades when requested
          if (applyContrast) {
            toneToUse = adjustToneForContrast(toneToUse, scheme.contrastLevel);
          }

          const color = palette.tone(toneToUse);
          return cssVar(`${paletteName}-${tone}`, color);
        }).join(" ");
      }

      // Generate tonal palette CSS variables for all colors (core + custom)
      function generateTonalVars(s: DynamicScheme) {
        return Object.entries(allPalettes)
          .map(([name, palette]) =>
            generateTonalPaletteVars(
              kebabCase(name),
              palette,
              s,
              contrastAllColors,
              adaptiveShades,
            ),
          )
          .join(" ");
      }

      const lightVars = toCssVars(mergedColorsLight);
      const darkVars = toCssVars(mergedColorsDark);

      const lightTonalVars = generateTonalVars(lightScheme);
      const darkTonalVars = generateTonalVars(darkScheme);

      return `
:root { ${lightVars} ${lightTonalVars} }
.dark { ${darkVars} ${adaptiveShades ? darkTonalVars : lightTonalVars} }
`;
    },

    toJson() {
      // Token order matching Material Theme Builder export format
      const fixtureTokenOrder = [
        "primary",
        "surfaceTint",
        "onPrimary",
        "primaryContainer",
        "onPrimaryContainer",
        "secondary",
        "onSecondary",
        "secondaryContainer",
        "onSecondaryContainer",
        "tertiary",
        "onTertiary",
        "tertiaryContainer",
        "onTertiaryContainer",
        "error",
        "onError",
        "errorContainer",
        "onErrorContainer",
        "background",
        "onBackground",
        "surface",
        "onSurface",
        "surfaceVariant",
        "onSurfaceVariant",
        "outline",
        "outlineVariant",
        "shadow",
        "scrim",
        "inverseSurface",
        "inverseOnSurface",
        "inversePrimary",
        "primaryFixed",
        "onPrimaryFixed",
        "primaryFixedDim",
        "onPrimaryFixedVariant",
        "secondaryFixed",
        "onSecondaryFixed",
        "secondaryFixedDim",
        "onSecondaryFixedVariant",
        "tertiaryFixed",
        "onTertiaryFixed",
        "tertiaryFixedDim",
        "onTertiaryFixedVariant",
        "surfaceDim",
        "surfaceBright",
        "surfaceContainerLowest",
        "surfaceContainerLow",
        "surfaceContainer",
        "surfaceContainerHigh",
        "surfaceContainerHighest",
      ] as const satisfies readonly TokenName[];

      // Build "raw" palettes for JSON export — these use the color's own hue/chroma
      // (TonalPalette.fromInt), NOT the scheme-transformed palettes (allPalettes).
      //
      // ⚠️  Known MTB inconsistency:
      // MTB's JSON export uses raw palettes from input colors, while its UI uses
      // scheme-transformed palettes (e.g. SchemeTonalSpot clamps secondary chroma).
      // This means `palettes.secondary.40` in JSON can differ from `schemes.light.secondary`.
      // We intentionally reproduce this behavior.
      const neuHct = neutral ? Hct.fromInt(argbFromHex(neutral)) : sourceHct;
      const nvHct = neutralVariant
        ? Hct.fromInt(argbFromHex(neutralVariant))
        : sourceHct;

      const rawPalettes = {
        primary: TonalPalette.fromInt(effectiveSourceArgb),
        secondary: secondary
          ? TonalPalette.fromInt(argbFromHex(secondary))
          : TonalPalette.fromHueAndChroma(sourceHct.hue, sourceHct.chroma / 3),
        tertiary: tertiary
          ? TonalPalette.fromInt(argbFromHex(tertiary))
          : TonalPalette.fromHueAndChroma(
              (sourceHct.hue + 60) % 360,
              sourceHct.chroma / 2,
            ),
        neutral: TonalPalette.fromHueAndChroma(
          neuHct.hue,
          Math.min(neuHct.chroma / 12, 4),
        ),
        "neutral-variant": TonalPalette.fromHueAndChroma(
          nvHct.hue,
          Math.min(nvHct.chroma / 6, 8),
        ),
      };

      function buildJsonSchemes() {
        // Extract scheme colors in fixture token order
        function extractSchemeColors(
          scheme: DynamicScheme,
          backgroundScheme?: DynamicScheme,
        ) {
          const colors: Record<string, string> = {};

          for (const tokenName of fixtureTokenOrder) {
            const dynamicColor = MaterialDynamicColors[tokenName];
            const useScheme =
              backgroundScheme &&
              (tokenName === "background" || tokenName === "onBackground")
                ? backgroundScheme
                : scheme;

            colors[tokenName] = hexFromArgb(
              dynamicColor.getArgb(useScheme),
            ).toUpperCase();
          }

          return colors;
        }

        // Resolve an override palette from a hex color string.
        // Returns null when hex is undefined (no override for that role).
        function resolveOverridePalette(
          hex: string | undefined,
          role: "primaryPalette" | "neutralPalette" | "neutralVariantPalette",
        ): TonalPalette | null {
          if (!hex) return null;
          return new SchemeClass(Hct.fromInt(argbFromHex(hex)), false, 0)[role];
        }

        // Override palettes (isDark/contrast-invariant)
        const secPalette = resolveOverridePalette(secondary, "primaryPalette");
        const terPalette = resolveOverridePalette(tertiary, "primaryPalette");
        const errPalette = resolveOverridePalette(error, "primaryPalette");
        const neuPalette = resolveOverridePalette(neutral, "neutralPalette");
        const nvPalette = resolveOverridePalette(
          neutralVariant,
          "neutralVariantPalette",
        );

        const jsonSchemes: Record<string, Record<string, string>> = {};

        const jsonContrastLevels = [
          { name: "light", isDark: false, contrast: 0 },
          { name: "light-medium-contrast", isDark: false, contrast: 0.5 },
          { name: "light-high-contrast", isDark: false, contrast: 1.0 },
          { name: "dark", isDark: true, contrast: 0 },
          { name: "dark-medium-contrast", isDark: true, contrast: 0.5 },
          { name: "dark-high-contrast", isDark: true, contrast: 1.0 },
        ] as const;

        for (const { name, isDark, contrast } of jsonContrastLevels) {
          // Base scheme from primary — provides default palettes for all roles
          const baseScheme = new SchemeClass(primaryHct, isDark, contrast);

          // Compose scheme: override palette where specified, base default otherwise
          const composedScheme = new DynamicScheme({
            sourceColorArgb: effectiveSourceArgb,
            variant: schemeToVariant[scheme],
            contrastLevel: contrast,
            isDark,
            primaryPalette: baseScheme.primaryPalette,
            secondaryPalette: secPalette || baseScheme.secondaryPalette,
            tertiaryPalette: terPalette || baseScheme.tertiaryPalette,
            neutralPalette: neuPalette || baseScheme.neutralPalette,
            neutralVariantPalette:
              nvPalette || baseScheme.neutralVariantPalette,
          });

          if (errPalette) composedScheme.errorPalette = errPalette;

          // background/onBackground always from base scheme (primary-based)
          jsonSchemes[name] = extractSchemeColors(composedScheme, baseScheme);
        }

        return jsonSchemes;
      }

      function rawPalettesToJson() {
        const jsonPalettes: Record<string, Record<string, string>> = {};

        // The 5 palette names used in JSON export (matches Material Theme Builder format)
        const RAW_PALETTE_NAMES = [
          "primary",
          "secondary",
          "tertiary",
          "neutral",
          "neutral-variant",
        ] as const;

        for (const name of RAW_PALETTE_NAMES) {
          const palette = rawPalettes[name];
          const tones: Record<string, string> = {};
          for (const tone of STANDARD_TONES) {
            tones[tone.toString()] = hexFromArgb(
              palette.tone(tone),
            ).toUpperCase();
          }
          jsonPalettes[name] = tones;
        }

        return jsonPalettes;
      }

      function buildCoreColors(opts: {
        primary: string;
        secondary?: string;
        tertiary?: string;
        error?: string;
        neutral?: string;
        neutralVariant?: string;
      }) {
        const colors: Record<string, string> = { primary: opts.primary };
        if (opts.secondary) colors.secondary = opts.secondary.toUpperCase();
        if (opts.tertiary) colors.tertiary = opts.tertiary.toUpperCase();
        if (opts.error) colors.error = opts.error.toUpperCase();
        if (opts.neutral) colors.neutral = opts.neutral.toUpperCase();
        if (opts.neutralVariant)
          colors.neutralVariant = opts.neutralVariant.toUpperCase();
        return colors;
      }

      const seed = hexSource.toUpperCase();
      const coreColors = buildCoreColors({
        primary: (primary || hexSource).toUpperCase(),
        secondary,
        tertiary,
        error,
        neutral,
        neutralVariant,
      });

      const extendedColors = hexCustomColors.map((c) => ({
        name: c.name,
        color: c.hex.toUpperCase(),
        description: "",
        harmonized: c.blend ?? DEFAULT_BLEND,
      }));

      return {
        seed,
        coreColors,
        extendedColors,
        schemes: buildJsonSchemes(),
        palettes: rawPalettesToJson(),
      };
    },

    //
    // API
    //

    mergedColorsLight,
    mergedColorsDark,
    allPalettes,
  };
}
