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
  scheme: DynamicScheme,
  applyContrast: boolean,
  adaptiveShades: boolean,
) => {
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
};

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

//
// Generate full CSS styles string (for insertion into a <style> tag)
//

const toCssVars = (mergedColors: Record<string, number>) => {
  return Object.entries(mergedColors)
    .map(([name, value]) => cssVar(name, value))
    .join(" ");
};

/**
 * Builder class - generates Material Design color schemes
 *
 * @example
 * ```ts
 * import { builder } from "react-mcu"
 *
 * const colors = builder("#6750A4", {
 *   scheme: "vibrant",
 *   contrast: 0.5,
 *   customColors: [
 *     { name: "brand", hex: "#FF5733", blend: true }
 *   ]
 * });
 *
 * // Get as JSON
 * const json = colors.toJson();
 *
 * // Get as CSS
 * const css = colors.toCss();
 * ```
 */
export class Builder {
  private config: McuConfig;
  private _mergedColorsLight?: Record<string, number>;
  private _mergedColorsDark?: Record<string, number>;
  private _allPalettes?: Record<string, TonalPalette>;
  private _lightScheme?: DynamicScheme;
  private _darkScheme?: DynamicScheme;
  private _customColors?: CustomColor[];
  private _colorPalettes?: Record<string, TonalPalette>;
  private _contrastAllColors: boolean;
  private _adaptiveShades: boolean;

  constructor(source: string, options?: Omit<McuConfig, "source">) {
    this.config = {
      source,
      scheme: DEFAULT_SCHEME,
      contrast: DEFAULT_CONTRAST,
      colorMatch: DEFAULT_COLOR_MATCH,
      customColors: DEFAULT_CUSTOM_COLORS,
      contrastAllColors: DEFAULT_CONTRAST_ALL_COLORS,
      adaptiveShades: DEFAULT_ADAPTIVE_SHADES,
      ...options,
    };
    this._contrastAllColors =
      this.config.contrastAllColors ?? DEFAULT_CONTRAST_ALL_COLORS;
    this._adaptiveShades =
      this.config.adaptiveShades ?? DEFAULT_ADAPTIVE_SHADES;
  }

  private compute() {
    if (this._mergedColorsLight) return; // Already computed

    const {
      source: hexSource,
      scheme = DEFAULT_SCHEME,
      contrast = DEFAULT_CONTRAST,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
    } = this.config;

    const sourceArgb = argbFromHex(hexSource);

    // Determine the effective source for harmonization
    const effectiveSource = primary || hexSource;
    const effectiveSourceArgb = argbFromHex(effectiveSource);
    const effectiveSourceForHarmonization = primary
      ? argbFromHex(primary)
      : sourceArgb;

    // Create a base scheme to get the standard chroma values
    const SchemeClass = schemesMap[scheme];
    const primaryHct = Hct.fromInt(effectiveSourceArgb);
    const baseScheme = new SchemeClass(primaryHct, false, contrast);

    // Unified color processing
    const allColors: ColorDefinition[] = [
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
    this._colorPalettes = Object.fromEntries(
      definedColors.map((colorDef) => [
        colorDef.name,
        createColorPalette(
          colorDef,
          baseScheme,
          effectiveSourceForHarmonization,
        ),
      ]),
    );

    // Create schemes with core color palettes
    const variant = schemeToVariant[scheme];
    const createSchemes = (
      baseConfig: Omit<
        ConstructorParameters<typeof DynamicScheme>[0],
        "isDark"
      >,
    ) =>
      [
        new DynamicScheme({ ...baseConfig, isDark: false }),
        new DynamicScheme({ ...baseConfig, isDark: true }),
      ] as const;

    const [lightScheme, darkScheme] = createSchemes({
      sourceColorArgb: effectiveSourceArgb,
      variant,
      contrastLevel: contrast,
      primaryPalette:
        this._colorPalettes["primary"] || baseScheme.primaryPalette,
      secondaryPalette:
        this._colorPalettes["secondary"] || baseScheme.secondaryPalette,
      tertiaryPalette:
        this._colorPalettes["tertiary"] || baseScheme.tertiaryPalette,
      neutralPalette:
        this._colorPalettes["neutral"] || baseScheme.neutralPalette,
      neutralVariantPalette:
        this._colorPalettes["neutralVariant"] ||
        baseScheme.neutralVariantPalette,
    });

    const errorPalette = this._colorPalettes["error"];
    if (errorPalette) {
      lightScheme.errorPalette = errorPalette;
      darkScheme.errorPalette = errorPalette;
    }

    this._lightScheme = lightScheme;
    this._darkScheme = darkScheme;

    // Extract custom colors (non-core) for merging
    this._customColors = definedColors
      .filter((c) => !c.core)
      .map((c) => ({
        name: c.name,
        blend: c.blend ?? DEFAULT_BLEND,
        value: argbFromHex(c.hex),
      }));

    this._mergedColorsLight = mergeBaseAndCustomColors(
      lightScheme,
      this._customColors,
      this._colorPalettes,
      this._contrastAllColors,
    );

    this._mergedColorsDark = mergeBaseAndCustomColors(
      darkScheme,
      this._customColors,
      this._colorPalettes,
      this._contrastAllColors,
    );

    // Create allPalettes
    this._allPalettes = {
      primary: lightScheme.primaryPalette,
      secondary: lightScheme.secondaryPalette,
      tertiary: lightScheme.tertiaryPalette,
      error: lightScheme.errorPalette,
      neutral: lightScheme.neutralPalette,
      "neutral-variant": lightScheme.neutralVariantPalette,
      ...this._colorPalettes,
    };
  }

  // Helper getters that return non-optional types after compute()
  private get mergedColorsLight(): Record<string, number> {
    if (!this._mergedColorsLight) {
      throw new Error("Builder not computed yet");
    }
    return this._mergedColorsLight;
  }

  private get mergedColorsDark(): Record<string, number> {
    if (!this._mergedColorsDark) {
      throw new Error("Builder not computed yet");
    }
    return this._mergedColorsDark;
  }

  private get allPalettes(): Record<string, TonalPalette> {
    if (!this._allPalettes) {
      throw new Error("Builder not computed yet");
    }
    return this._allPalettes;
  }

  private get lightScheme(): DynamicScheme {
    if (!this._lightScheme) {
      throw new Error("Builder not computed yet");
    }
    return this._lightScheme;
  }

  private get darkScheme(): DynamicScheme {
    if (!this._darkScheme) {
      throw new Error("Builder not computed yet");
    }
    return this._darkScheme;
  }

  private get customColors(): CustomColor[] {
    if (!this._customColors) {
      throw new Error("Builder not computed yet");
    }
    return this._customColors;
  }

  private get colorPalettes(): Record<string, TonalPalette> {
    if (!this._colorPalettes) {
      throw new Error("Builder not computed yet");
    }
    return this._colorPalettes;
  }

  /**
   * Generate CSS string with CSS custom properties
   */
  toCss(): string {
    this.compute();

    const lightVars = toCssVars(this.mergedColorsLight);
    const darkVars = toCssVars(this.mergedColorsDark);

    const generateTonalVars = (scheme: DynamicScheme) =>
      [
        generateTonalPaletteVars(
          "primary",
          scheme.primaryPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        generateTonalPaletteVars(
          "secondary",
          scheme.secondaryPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        generateTonalPaletteVars(
          "tertiary",
          scheme.tertiaryPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        generateTonalPaletteVars(
          "error",
          scheme.errorPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        generateTonalPaletteVars(
          "neutral",
          scheme.neutralPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        generateTonalPaletteVars(
          "neutral-variant",
          scheme.neutralVariantPalette,
          scheme,
          this._contrastAllColors,
          this._adaptiveShades,
        ),
        ...this.customColors.map((customColorObj) => {
          const palette = getPalette(this.colorPalettes, customColorObj.name);
          return generateTonalPaletteVars(
            kebabCase(customColorObj.name),
            palette,
            scheme,
            this._contrastAllColors,
            this._adaptiveShades,
          );
        }),
      ].join(" ");

    const lightTonalVars = generateTonalVars(this.lightScheme);
    const darkTonalVars = generateTonalVars(this.darkScheme);

    return `
:root { ${lightVars} ${lightTonalVars} }
.dark { ${darkVars} ${this._adaptiveShades ? darkTonalVars : lightTonalVars} }
`;
  }

  /**
   * Generate JSON object with color schemes and palettes
   */
  toJson() {
    this.compute();

    // Convert ARGB colors to hex
    const lightColors: Record<string, string> = {};
    const darkColors: Record<string, string> = {};

    Object.entries(this.mergedColorsLight).forEach(([name, argb]) => {
      lightColors[name] = hexFromArgb(argb);
    });

    Object.entries(this.mergedColorsDark).forEach(([name, argb]) => {
      darkColors[name] = hexFromArgb(argb);
    });

    // Convert palettes to the expected format
    const palettes: Record<string, { [key: number]: string }> = {};
    Object.entries(this.allPalettes).forEach(([name, palette]) => {
      if (!palette) return;
      const tones: { [key: number]: string } = {};
      STANDARD_TONES.forEach((tone) => {
        tones[tone] = hexFromArgb(palette.tone(tone));
      });
      palettes[name] = tones;
    });

    // Extract custom colors information
    const customColorsArray = this.config.customColors;
    const customColors =
      customColorsArray && customColorsArray.length > 0
        ? customColorsArray.map((customColor) => {
            const name = customColor.name;
            const capitalizedName = upperFirst(name);

            const colorLight = lightColors[name];
            const colorDark = darkColors[name];
            const onColorLight = lightColors[`on${capitalizedName}`];
            const onColorDark = darkColors[`on${capitalizedName}`];
            const containerLight = lightColors[`${name}Container`];
            const containerDark = darkColors[`${name}Container`];
            const onContainerLight =
              lightColors[`on${capitalizedName}Container`];
            const onContainerDark = darkColors[`on${capitalizedName}Container`];

            if (
              !colorLight ||
              !colorDark ||
              !onColorLight ||
              !onColorDark ||
              !containerLight ||
              !containerDark ||
              !onContainerLight ||
              !onContainerDark
            ) {
              throw new Error(
                `Custom color "${name}" is missing required color values`,
              );
            }

            return {
              name,
              blend: customColor.blend ?? DEFAULT_BLEND,
              color: {
                light: colorLight,
                dark: colorDark,
              },
              onColor: {
                light: onColorLight,
                dark: onColorDark,
              },
              colorContainer: {
                light: containerLight,
                dark: containerDark,
              },
              onColorContainer: {
                light: onContainerLight,
                dark: onContainerDark,
              },
            };
          })
        : undefined;

    return {
      schemes: {
        light: lightColors,
        dark: darkColors,
      },
      palettes,
      ...(customColors && { customColors }),
    };
  }

  /**
   * Internal method to get computed data for backward compatibility
   * @internal
   */
  _getComputedData() {
    this.compute();
    return {
      mergedColorsLight: this.mergedColorsLight,
      mergedColorsDark: this.mergedColorsDark,
      allPalettes: this.allPalettes,
    };
  }
}

/**
 * Generate CSS for Material Design color scheme
 * @internal This function is kept for backward compatibility with Mcu.context.tsx
 */
export function generateCss(config: McuConfig) {
  const builderInstance = new Builder(config.source, config);
  const css = builderInstance.toCss();
  const data = builderInstance._getComputedData();
  return {
    css,
    ...data,
  };
}
