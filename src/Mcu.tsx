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
import { McuProvider } from "./Mcu.context";

//
// Simple ContrastCurve implementation
// Since ContrastCurve is not exported from the main package, we implement it inline
//
class ContrastCurve {
  constructor(
    public low: number,
    public normal: number,
    public medium: number,
    public high: number,
  ) {}

  get(contrastLevel: number): number {
    if (contrastLevel <= -1.0) {
      return this.low;
    } else if (contrastLevel < 0.0) {
      return this.low + (this.normal - this.low) * (contrastLevel + 1);
    } else if (contrastLevel < 0.5) {
      return this.normal + (this.medium - this.normal) * (contrastLevel / 0.5);
    } else if (contrastLevel < 1.0) {
      return (
        this.medium + (this.high - this.medium) * ((contrastLevel - 0.5) / 0.5)
      );
    } else {
      return this.high;
    }
  }
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

const DEFAULT_SCHEME: SchemeName = "tonalSpot";
const DEFAULT_CONTRAST = 0;
const DEFAULT_CUSTOM_COLORS: HexCustomColor[] = [];

const mcuStyleId = "mcu-styles";

export function Mcu({
  source,
  scheme = DEFAULT_SCHEME,
  contrast = DEFAULT_CONTRAST,
  customColors = DEFAULT_CUSTOM_COLORS,
  children,
}: McuConfig & { children?: React.ReactNode }) {
  const config = useMemo(
    () => ({
      source,
      scheme,
      contrast,
      customColors,
    }),
    [contrast, customColors, scheme, source],
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
// Create DynamicColor instances for a custom color
// These follow the same pattern as Material Design 3 system colors,
// using ContrastCurve to adjust tones based on contrast level
//
function createCustomColorDynamicColors(colorValue: number, colorName: string) {
  const palette = TonalPalette.fromInt(colorValue);

  // Create the main color - similar to MaterialDynamicColors.primary
  // Base tones: light=40, dark=80
  const color = DynamicColor.fromPalette({
    name: colorName,
    palette: () => palette,
    tone: (s: DynamicScheme) => {
      // For non-background colors, we can use ContrastCurve to adjust tone
      // Using slightly reduced contrast requirements (40, 40, 35, 30 for light)
      const baseTone = s.isDark ? 80 : 40;
      return baseTone;
    },
    isBackground: false,
  });

  // Create onColor - the text/icon color used on top of the main color
  // Uses contrast curve to ensure readability
  // Base tones: light=100, dark=20
  const onColor = DynamicColor.fromPalette({
    name: `on${upperFirst(colorName)}`,
    palette: () => palette,
    tone: (s: DynamicScheme) => (s.isDark ? 20 : 100),
    background: () => color,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });

  // Create container - a less prominent version, like primaryContainer
  // Base tones: light=90, dark=30
  const colorContainer = DynamicColor.fromPalette({
    name: `${colorName}Container`,
    palette: () => palette,
    tone: (s: DynamicScheme) => {
      // Container can vary slightly with contrast
      return s.isDark
        ? new ContrastCurve(30, 30, 25, 20).get(s.contrastLevel)
        : new ContrastCurve(90, 90, 92, 95).get(s.contrastLevel);
    },
    isBackground: true,
  });

  // Create onContainer - text/icon color for container
  // Base tones: light=10, dark=90
  const onColorContainer = DynamicColor.fromPalette({
    name: `on${upperFirst(colorName)}Container`,
    palette: () => palette,
    tone: (s: DynamicScheme) => (s.isDark ? 90 : 10),
    background: () => colorContainer,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });

  return {
    [colorName]: color,
    [`on${upperFirst(colorName)}`]: onColor,
    [`${colorName}Container`]: colorContainer,
    [`on${upperFirst(colorName)}Container`]: onColorContainer,
  };
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
  // Custom colors - now using DynamicColor API for proper contrast support
  //
  // For each custom color, generate:
  // 1. <colorname>
  // 2. on-<colorname>
  // 3. <colorname>-container
  // 4. on-<colorname>-container
  //
  // Based on Material Design 3 spec: https://m3.material.io/styles/color/advanced/define-new-colors
  //
  const customVars: Record<string, number> = {};

  customColors.forEach((color) => {
    // Apply harmonization if blend is true
    const colorValue = color.blend
      ? Blend.harmonize(color.value, sourceArgb)
      : color.value;
    const colorname = color.name;

    // Create DynamicColor instances for this custom color
    const dynamicColors = createCustomColorDynamicColors(colorValue, colorname);

    // Get ARGB values from DynamicColor instances using the scheme
    // This ensures they respect contrast and scheme settings
    Object.entries(dynamicColors).forEach(([key, dynamicColor]) => {
      customVars[key] = dynamicColor.getArgb(scheme);
    });
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
// Generate full CSS styles string (for insertion into a <style> tag)
//

const toCssVars = (mergedColors: Record<string, number>) => {
  return Object.entries(mergedColors)
    .map(([name, value]) => cssVar(name, value))
    .join(" ");
};

export function generateCss({
  source: hexSource,
  customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
  scheme = DEFAULT_SCHEME,
  contrast = DEFAULT_CONTRAST,
}: McuConfig) {
  console.log("MCU generateCss");

  const sourceArgb = argbFromHex(hexSource);
  const hct = Hct.fromInt(sourceArgb);

  const SchemeClass = schemesMap[scheme];
  const lightScheme = new SchemeClass(hct, false, contrast);
  const darkScheme = new SchemeClass(hct, true, contrast);

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

  return {
    css: `
    :root { ${lightVars} }
    .dark { ${darkVars} }
    `,
    mergedColorsLight,
    mergedColorsDark,
  };
}
