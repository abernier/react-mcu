import {
  argbFromHex,
  DynamicColor,
  DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  TonalPalette,
} from "@material/material-color-utilities";
import {
  type ColorDefinition,
  createColorPalette,
  DEFAULT_BLEND,
  DEFAULT_CUSTOM_COLORS,
  DEFAULT_SCHEME,
  type McuConfig,
  schemesMap,
  schemeToVariant,
  STANDARD_TONES,
  tokenNames,
} from "./Mcu";

//
// Material Theme Builder-compatible JSON export
//

/**
 * Generate a Material Theme Builder-compatible JSON export.
 *
 * This produces the same JSON format that Material Theme Builder
 * (https://material-foundation.github.io/material-theme-builder/) exports,
 * including all 6 scheme variants and 5 tonal palettes.
 */
export function exportTheme(config: McuConfig) {
  const {
    source: hexSource,
    scheme = DEFAULT_SCHEME,
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
    customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
  } = config;

  const sourceArgb = argbFromHex(hexSource);
  const effectiveSource = primary || hexSource;
  const effectiveSourceArgb = argbFromHex(effectiveSource);

  const SchemeClass = schemesMap[scheme];
  const primaryHct = Hct.fromInt(effectiveSourceArgb);
  const variant = schemeToVariant[scheme];

  // Build color palettes for core color overrides (same logic as generateCss)
  const effectiveSourceForHarmonization = primary
    ? argbFromHex(primary)
    : sourceArgb;
  const baseScheme = new SchemeClass(primaryHct, false, 0);

  const coreColorDefs: ColorDefinition[] = [
    { name: "primary", hex: primary, core: true, chromaSource: "primary" },
    { name: "secondary", hex: secondary, core: true, chromaSource: "primary" },
    { name: "tertiary", hex: tertiary, core: true, chromaSource: "primary" },
    { name: "error", hex: error, core: true, chromaSource: "primary" },
    { name: "neutral", hex: neutral, core: true, chromaSource: "neutral" },
    {
      name: "neutralVariant",
      hex: neutralVariant,
      core: true,
      chromaSource: "neutralVariant",
    },
  ];

  const definedCoreColors = coreColorDefs.filter(
    (c): c is ColorDefinition & { hex: string } => c.hex !== undefined,
  );

  const colorPalettes = Object.fromEntries(
    definedCoreColors.map((colorDef) => [
      colorDef.name,
      createColorPalette(colorDef, baseScheme, effectiveSourceForHarmonization),
    ]),
  );

  // Helper to create a DynamicScheme for a given contrast level and isDark
  const createScheme = (contrastLevel: number, isDark: boolean) => {
    const s = new DynamicScheme({
      sourceColorArgb: effectiveSourceArgb,
      variant,
      contrastLevel,
      isDark,
      primaryPalette: colorPalettes["primary"] || baseScheme.primaryPalette,
      secondaryPalette:
        colorPalettes["secondary"] || baseScheme.secondaryPalette,
      tertiaryPalette: colorPalettes["tertiary"] || baseScheme.tertiaryPalette,
      neutralPalette: colorPalettes["neutral"] || baseScheme.neutralPalette,
      neutralVariantPalette:
        colorPalettes["neutralVariant"] || baseScheme.neutralVariantPalette,
    });
    const errorPalette = colorPalettes["error"];
    if (errorPalette) {
      s.errorPalette = errorPalette;
    }
    return s;
  };

  // Generate scheme tokens for a given DynamicScheme
  const schemeToTokens = (s: DynamicScheme) => {
    const tokens: Record<string, string> = {};
    for (const name of tokenNames) {
      const dynamicColor = MaterialDynamicColors[
        name as keyof typeof MaterialDynamicColors
      ] as DynamicColor | undefined;
      if (dynamicColor && "getArgb" in dynamicColor) {
        tokens[name] = hexFromArgb(dynamicColor.getArgb(s)).toUpperCase();
      }
    }
    return tokens;
  };

  // Generate all 6 scheme variants
  const schemes = {
    light: schemeToTokens(createScheme(0, false)),
    "light-medium-contrast": schemeToTokens(createScheme(0.5, false)),
    "light-high-contrast": schemeToTokens(createScheme(1.0, false)),
    dark: schemeToTokens(createScheme(0, true)),
    "dark-medium-contrast": schemeToTokens(createScheme(0.5, true)),
    "dark-high-contrast": schemeToTokens(createScheme(1.0, true)),
  };

  // Generate tonal palettes from source HCT
  // Uses the same algorithm as Material Theme Builder:
  // primary=source chroma, secondary=chroma/3, tertiary=hue+60 chroma/2,
  // neutral=chroma/12, neutral-variant=chroma/6
  const sourceHct = Hct.fromInt(sourceArgb);
  const paletteTones = (palette: TonalPalette) => {
    const tones: Record<string, string> = {};
    for (const tone of STANDARD_TONES) {
      tones[String(tone)] = hexFromArgb(palette.tone(tone)).toUpperCase();
    }
    return tones;
  };

  const palettes = {
    primary: paletteTones(
      TonalPalette.fromHueAndChroma(sourceHct.hue, sourceHct.chroma),
    ),
    secondary: paletteTones(
      TonalPalette.fromHueAndChroma(sourceHct.hue, sourceHct.chroma / 3),
    ),
    tertiary: paletteTones(
      TonalPalette.fromHueAndChroma(sourceHct.hue + 60, sourceHct.chroma / 2),
    ),
    neutral: paletteTones(
      TonalPalette.fromHueAndChroma(sourceHct.hue, sourceHct.chroma / 12),
    ),
    "neutral-variant": paletteTones(
      TonalPalette.fromHueAndChroma(sourceHct.hue, sourceHct.chroma / 6),
    ),
  };

  // Build extendedColors from customColors
  const extendedColors = hexCustomColors.map((c) => ({
    name: c.name,
    color: c.hex.toUpperCase(),
    harmonized: c.blend ?? DEFAULT_BLEND,
  }));

  // Determine primary color for coreColors
  const primaryColor = primary || hexFromArgb(sourceArgb).toUpperCase();

  return {
    description: `Material Theme Builder export from react-mcu`,
    seed: hexSource.toUpperCase(),
    coreColors: {
      primary: primaryColor.toUpperCase(),
    },
    extendedColors,
    schemes,
    palettes,
  };
}
