import {
  argbFromHex,
  Blend,
  blueFromArgb,
  type CustomColor,
  DynamicColor,
  DynamicScheme,
  greenFromArgb,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  redFromArgb,
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
   * Each custom color can be blended with the source color for harmonization.
   */
  customColors?: HexCustomColor[];
  /**
   * Apply contrast adjustment to tonal palette shades when true.
   * When true, all tonal palette shades are adjusted based on the contrast level.
   * When false (default), contrast adjustments only apply to core Material Design tokens.
   */
  contrastAllColors?: boolean;
  /**
   * Adapt tonal palette shades for dark mode.
   * When true, tonal palette shades automatically invert for dark mode
   * (high values become dark, low values become light).
   * When false (default), tonal palette values remain constant across light/dark mode.
   */
  adaptiveShades?: boolean;
  /**
   * Prefix for generated CSS custom properties and Figma token css.variable extensions.
   * Scheme tokens use `--{prefix}-sys-color-*`, palette tones use `--{prefix}-ref-palette-*`.
   * Default: "md" (Material Design convention).
   */
  prefix?: string;
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
export const DEFAULT_CUSTOM_COLORS: HexCustomColor[] = [];
export const DEFAULT_CONTRAST_ALL_COLORS = false;
export const DEFAULT_ADAPTIVE_SHADES = false;
export const DEFAULT_BLEND = true;
export const DEFAULT_CONTRAST_ADJUSTMENT_FACTOR = 0.2;
export const DEFAULT_PREFIX = "md";

// The set of standard tone values used in Material You tonal palettes
export const STANDARD_TONES = [
  0, 4, 5, 6, 10, 12, 15, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70, 80,
  87, 90, 92, 94, 95, 96, 98, 99, 100,
] as const;

// The 18 baseline tones matching Material Theme Builder JSON output
const MTB_TONES = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
] as const;

// Material You schemes map to variant numbers according to the spec
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

const schemeToVariant: Record<SchemeName, number> = {
  monochrome: Variant.MONOCHROME,
  neutral: Variant.NEUTRAL,
  tonalSpot: Variant.TONAL_SPOT,
  vibrant: Variant.VIBRANT,
  expressive: Variant.EXPRESSIVE,
  fidelity: Variant.FIDELITY,
  content: Variant.CONTENT,
};

// Material Design 3 token names and their descriptions.
// Centralizes both the canonical list of scheme tokens and their M3 color role semantics.
// see: https://m3.material.io/styles/color/the-color-system/color-roles
export const tokenDescriptions = {
  background:
    "Default background color for screens and large surfaces.",
  error:
    "Color for error states, used on elements like error text and icons.",
  errorContainer:
    "Fill color for error container elements like error banners.",
  inverseOnSurface:
    "Color for text and icons on inverse surface backgrounds.",
  inversePrimary:
    "Primary color used on inverse surface, e.g. buttons on snackbars.",
  inverseSurface:
    "Background for elements that require reverse contrast, such as snackbars.",
  onBackground:
    "Color for text and icons displayed on the background.",
  onError:
    "Color for text and icons on error-colored elements.",
  onErrorContainer:
    "Color for text and icons on error container elements.",
  onPrimary:
    "Color for text and icons on primary-colored elements like filled buttons.",
  onPrimaryContainer:
    "Color for text and icons on primary container elements like tonal buttons.",
  onPrimaryFixed:
    "Color for text and icons on primary fixed elements, constant across themes.",
  onPrimaryFixedVariant:
    "Lower-emphasis color for text and icons on primary fixed elements.",
  onSecondary:
    "Color for text and icons on secondary-colored elements.",
  onSecondaryContainer:
    "Color for text and icons on secondary container elements.",
  onSecondaryFixed:
    "Color for text and icons on secondary fixed elements, constant across themes.",
  onSecondaryFixedVariant:
    "Lower-emphasis color for text and icons on secondary fixed elements.",
  onSurface:
    "High-emphasis color for text and icons on surface backgrounds.",
  onSurfaceVariant:
    "Medium-emphasis color for text and icons on surface variant backgrounds.",
  onTertiary:
    "Color for text and icons on tertiary-colored elements.",
  onTertiaryContainer:
    "Color for text and icons on tertiary container elements.",
  onTertiaryFixed:
    "Color for text and icons on tertiary fixed elements, constant across themes.",
  onTertiaryFixedVariant:
    "Lower-emphasis color for text and icons on tertiary fixed elements.",
  outline:
    "Subtle color for borders and dividers to create visual separation.",
  outlineVariant:
    "Lower-emphasis border color used for decorative dividers.",
  primary:
    "Main brand color, used for key components like filled buttons and active states.",
  primaryContainer:
    "Fill color for large primary elements like cards and tonal buttons.",
  primaryFixed:
    "Fixed primary color that stays the same in light and dark themes.",
  primaryFixedDim:
    "Dimmed variant of the fixed primary color for lower emphasis.",
  scrim:
    "Color overlay for modals and dialogs to obscure background content.",
  secondary:
    "Accent color for less prominent elements like filter chips and selections.",
  secondaryContainer:
    "Fill color for secondary container elements like tonal buttons and input fields.",
  secondaryFixed:
    "Fixed secondary color that stays the same in light and dark themes.",
  secondaryFixedDim:
    "Dimmed variant of the fixed secondary color for lower emphasis.",
  shadow:
    "Color for elevation shadows applied to surfaces and components.",
  surface:
    "Default surface color for cards, sheets, and dialogs.",
  surfaceBright:
    "Brightest surface variant, used for elevated surfaces in dark themes.",
  surfaceContainer:
    "Middle-emphasis container color for grouping related content.",
  surfaceContainerHigh:
    "Higher-emphasis container color for elements like cards.",
  surfaceContainerHighest:
    "Highest-emphasis container color for text fields and other input areas.",
  surfaceContainerLow:
    "Lower-emphasis container color for subtle surface groupings.",
  surfaceContainerLowest:
    "Lowest-emphasis container, typically the lightest surface in light theme.",
  surfaceDim:
    "Dimmest surface variant, used for recessed areas or dark theme backgrounds.",
  surfaceTint:
    "Tint color applied to surfaces for subtle primary color elevation overlay.",
  surfaceVariant:
    "Alternative surface color for differentiated areas like sidebar backgrounds.",
  tertiary:
    "Third accent color for complementary elements that balance primary and secondary.",
  tertiaryContainer:
    "Fill color for tertiary container elements like complementary cards.",
  tertiaryFixed:
    "Fixed tertiary color that stays the same in light and dark themes.",
  tertiaryFixedDim:
    "Dimmed variant of the fixed tertiary color for lower emphasis.",
} as const;

export const tokenNames = Object.keys(tokenDescriptions) as (keyof typeof tokenDescriptions)[];

export type TokenName = keyof typeof tokenDescriptions;

// Helper to transform array to record
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

type ColorPalettes = Record<string, TonalPalette>;

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

//
// ██████  ██    ██ ██ ██      ██████  ███████ ██████
// ██   ██ ██    ██ ██ ██      ██   ██ ██      ██   ██
// ██████  ██    ██ ██ ██      ██   ██ █████   ██████
// ██   ██ ██    ██ ██ ██      ██   ██ ██      ██   ██
// ██████   ██████  ██ ███████ ██████  ███████ ██   ██
//

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
    prefix = DEFAULT_PREFIX,
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
    //
    //  ██████ ███████ ███████
    // ██      ██      ██
    // ██      ███████ ███████
    // ██           ██      ██
    //  ██████ ███████ ███████
    //
    toCss() {
      // Scheme tokens: --{prefix}-sys-color-<name>
      function sysColorVar(colorName: string, colorValue: number) {
        const name = `--${prefix}-sys-color-${kebabCase(colorName)}`;
        const value = hexFromArgb(colorValue);
        return `${name}:${value};`;
      }

      function toCssVars(mergedColors: Record<string, number>) {
        return Object.entries(mergedColors)
          .map(([name, value]) => sysColorVar(name, value))
          .join(" ");
      }

      // Tonal palette tokens: --{prefix}-ref-palette-<name>-<tone>
      function refPaletteVar(paletteName: string, tone: number, colorValue: number) {
        const name = `--${prefix}-ref-palette-${paletteName}-${tone}`;
        const value = hexFromArgb(colorValue);
        return `${name}:${value};`;
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
          return refPaletteVar(paletteName, tone, color);
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

    //
    //      ██ ███████  ██████  ███    ██
    //      ██ ██      ██    ██ ████   ██
    //      ██ ███████ ██    ██ ██ ██  ██
    // ██   ██      ██ ██    ██ ██  ██ ██
    //  █████  ███████  ██████  ██   ████
    //
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
          for (const tone of MTB_TONES) {
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
    // ███████ ██  ██████  ███    ███  █████
    // ██      ██ ██       ████  ████ ██   ██
    // █████   ██ ██   ███ ██ ████ ██ ███████
    // ██      ██ ██    ██ ██  ██  ██ ██   ██
    // ██      ██  ██████  ██      ██ ██   ██
    //

    toFigmaTokens() {
      // Figma Variables compatible format using M3 token architecture:
      //   ref.palette.* — Reference Tokens (Tier 1): raw tonal palette values
      //   sys.color.*   — System Tokens (Tier 2): semantic roles referencing palette tones
      //
      // System tokens use DTCG alias syntax {ref.palette.<name>.<tone>} to link
      // to the reference palette, enabling Figma to create linked variables and
      // making the relationship between roles and tones explicit for AI/dev tools.
      //
      // see: https://m3.material.io/foundations/design-tokens/overview
      // see: https://www.figma.com/plugin-docs/api/properties/variables-importVariablesByKeyAsync/

      // Maps each core scheme token to its source palette for alias resolution.
      // Derived from M3 DynamicScheme / MaterialDynamicColors source:
      // https://github.com/nicklash/material-color-utilities/blob/main/typescript/dynamiccolor/material_dynamic_colors.ts
      // When a scheme hex matches multiple palettes (e.g. #000000 at tone 0),
      // this ensures the semantically correct palette is preferred.
      const tokenToPalette: Record<string, string> = {
        // Primary family
        primary: "primary",
        onPrimary: "primary",
        primaryContainer: "primary",
        onPrimaryContainer: "primary",
        primaryFixed: "primary",
        primaryFixedDim: "primary",
        onPrimaryFixed: "primary",
        onPrimaryFixedVariant: "primary",
        inversePrimary: "primary",
        surfaceTint: "primary",
        // Secondary family
        secondary: "secondary",
        onSecondary: "secondary",
        secondaryContainer: "secondary",
        onSecondaryContainer: "secondary",
        secondaryFixed: "secondary",
        secondaryFixedDim: "secondary",
        onSecondaryFixed: "secondary",
        onSecondaryFixedVariant: "secondary",
        // Tertiary family
        tertiary: "tertiary",
        onTertiary: "tertiary",
        tertiaryContainer: "tertiary",
        onTertiaryContainer: "tertiary",
        tertiaryFixed: "tertiary",
        tertiaryFixedDim: "tertiary",
        onTertiaryFixed: "tertiary",
        onTertiaryFixedVariant: "tertiary",
        // Error family
        error: "error",
        onError: "error",
        errorContainer: "error",
        onErrorContainer: "error",
        // Neutral family
        background: "neutral",
        onBackground: "neutral",
        surface: "neutral",
        onSurface: "neutral",
        surfaceDim: "neutral",
        surfaceBright: "neutral",
        surfaceContainer: "neutral",
        surfaceContainerLow: "neutral",
        surfaceContainerLowest: "neutral",
        surfaceContainerHigh: "neutral",
        surfaceContainerHighest: "neutral",
        inverseSurface: "neutral",
        inverseOnSurface: "neutral",
        scrim: "neutral",
        shadow: "neutral",
        // Neutral variant family
        surfaceVariant: "neutral-variant",
        onSurfaceVariant: "neutral-variant",
        outline: "neutral-variant",
        outlineVariant: "neutral-variant",
      };

      function argbToFigmaColorValue(argb: number) {
        return {
          colorSpace: "srgb" as const,
          components: [
            redFromArgb(argb) / 255,
            greenFromArgb(argb) / 255,
            blueFromArgb(argb) / 255,
          ],
          alpha: 1,
          hex: hexFromArgb(argb).toUpperCase(),
        };
      }

      function figmaToken(argb: number) {
        return {
          $type: "color" as const,
          $value: argbToFigmaColorValue(argb),
          $extensions: {
            "com.figma.scopes": ["ALL_SCOPES"],
            "com.figma.isOverride": true,
          },
        };
      }

      // Build ref.palette.* — Reference Tokens (Tier 1)
      // Raw tonal palette values with direct color data (mode-independent)
      function buildRefPaletteTokens() {
        const palettes: Record<
          string,
          Record<string, ReturnType<typeof figmaToken>>
        > = {};

        for (const [name, palette] of Object.entries(allPalettes)) {
          const tones: Record<string, ReturnType<typeof figmaToken>> = {};

          for (const tone of STANDARD_TONES) {
            let toneToUse: number = tone;
            if (contrastAllColors) {
              toneToUse = adjustToneForContrast(toneToUse, contrast);
            }
            const argb = palette.tone(toneToUse);
            tones[tone.toString()] = figmaToken(argb);
          }

          palettes[kebabCase(name)] = tones;
        }

        return palettes;
      }

      type RefPalettes = Record<
        string,
        Record<string, ReturnType<typeof figmaToken>>
      >;

      // Find a hex match in a single palette group, returning the alias path
      function findToneInPalette(
        hex: string,
        paletteName: string,
        tones: Record<string, ReturnType<typeof figmaToken>>,
      ): string | null {
        for (const [tone, token] of Object.entries(tones)) {
          if (token.$value.hex === hex) {
            return `{ref.palette.${paletteName}.${tone}}`;
          }
        }
        return null;
      }

      // Derive the preferred palette name for a custom color token
      function deriveCustomPalette(
        tokenName: string,
        refPalettes: RefPalettes,
      ): string | undefined {
        let baseName = tokenName;
        if (/^on[A-Z]/.test(baseName) && baseName.length > 2) {
          baseName = baseName.charAt(2).toLowerCase() + baseName.slice(3);
        }
        if (baseName.endsWith("Container")) {
          baseName = baseName.slice(0, -"Container".length);
        }
        const kebab = kebabCase(baseName);
        return kebab in refPalettes ? kebab : undefined;
      }

      // Resolve a scheme token's hex to a DTCG alias reference {ref.palette.<name>.<tone>}
      // Prefers the semantically correct palette via tokenToPalette, falls back to any match
      function findAlias(
        hex: string,
        tokenName: string,
        refPalettes: RefPalettes,
      ): string | null {
        const preferredPalette =
          tokenToPalette[tokenName] ??
          deriveCustomPalette(tokenName, refPalettes);

        // Search preferred palette first
        if (preferredPalette && refPalettes[preferredPalette]) {
          const match = findToneInPalette(
            hex,
            preferredPalette,
            refPalettes[preferredPalette],
          );
          if (match) return match;
        }

        // Fall back to any palette
        for (const [palName, tones] of Object.entries(refPalettes)) {
          const match = findToneInPalette(hex, palName, tones);
          if (match) return match;
        }

        return null;
      }

      // Resolve a mode value: DTCG alias string if a palette match is found,
      // otherwise falls back to a direct color value object
      function resolveModeValue(
        argb: number,
        tokenName: string,
        refPalettes: RefPalettes,
      ): string | ReturnType<typeof argbToFigmaColorValue> {
        const hex = hexFromArgb(argb).toUpperCase();
        return findAlias(hex, tokenName, refPalettes) ??
          argbToFigmaColorValue(argb);
      }

      // Build sys.color.* — System Tokens (Tier 2)
      // Semantic role tokens with com.figma.modes for Light/Dark alias references
      function buildSysColorTokens(
        refPalettes: RefPalettes,
      ) {
        const tokens: Record<string, unknown> = {};

        // Collect all token names from both modes
        const allTokenNames = new Set([
          ...Object.keys(mergedColorsLight),
          ...Object.keys(mergedColorsDark),
        ]);

        for (const name of allTokenNames) {
          const lightArgb = mergedColorsLight[name] as number;
          const darkArgb = mergedColorsDark[name] as number;
          const description = tokenDescriptions[name as TokenName];
          const cssVar = `--${prefix}-sys-color-${kebabCase(name)}`;

          const lightValue = resolveModeValue(lightArgb, name, refPalettes);
          const darkValue = resolveModeValue(darkArgb, name, refPalettes);

          tokens[kebabCase(name)] = {
            $type: "color" as const,
            // $value defaults to Light mode alias for DTCG compliance
            $value: lightValue,
            ...(description ? { $description: description } : {}),
            $extensions: {
              "com.figma.scopes": ["ALL_SCOPES"],
              "css.variable": cssVar,
              "com.figma.modes": {
                Light: lightValue,
                Dark: darkValue,
              },
            },
          };
        }
        return tokens;
      }

      const refPalettes = buildRefPaletteTokens();

      return {
        "theme.tokens.json": {
          ref: {
            palette: refPalettes,
          },
          sys: {
            color: buildSysColorTokens(refPalettes),
          },
        },
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
