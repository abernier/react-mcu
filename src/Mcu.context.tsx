"use client";

import {
  argbFromHex,
  DynamicColor,
  DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  TonalPalette,
} from "@material/material-color-utilities";
import React, {
  useCallback,
  useInsertionEffect,
  useMemo,
  useState,
} from "react";
import { createRequiredContext } from "./lib/createRequiredContext";
import {
  type ColorDefinition,
  createColorPalette,
  DEFAULT_BLEND,
  DEFAULT_CUSTOM_COLORS,
  DEFAULT_SCHEME,
  generateCss,
  type McuConfig,
  schemesMap,
  schemeToVariant,
  STANDARD_TONES,
  type TokenName,
  tokenNames,
} from "./Mcu";

//
// Material Theme Builder-compatible JSON export
//

type MaterialThemeBuilderScheme = Record<string, string>;

export type MaterialThemeBuilderExport = {
  description: string;
  seed: string;
  coreColors: {
    primary: string;
  };
  extendedColors: Array<{
    name: string;
    color: string;
    harmonized: boolean;
  }>;
  schemes: {
    light: MaterialThemeBuilderScheme;
    "light-medium-contrast": MaterialThemeBuilderScheme;
    "light-high-contrast": MaterialThemeBuilderScheme;
    dark: MaterialThemeBuilderScheme;
    "dark-medium-contrast": MaterialThemeBuilderScheme;
    "dark-high-contrast": MaterialThemeBuilderScheme;
  };
  palettes: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    tertiary: Record<string, string>;
    neutral: Record<string, string>;
    "neutral-variant": Record<string, string>;
  };
};

/**
 * Generate a Material Theme Builder-compatible JSON export.
 *
 * This produces the same JSON format that Material Theme Builder
 * (https://material-foundation.github.io/material-theme-builder/) exports,
 * including all 6 scheme variants and 5 tonal palettes.
 */
function exportTheme(config: McuConfig): MaterialThemeBuilderExport {
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

  const coreColorDefs: (ColorDefinition & { hex?: string })[] = [
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
  const schemeToTokens = (s: DynamicScheme): MaterialThemeBuilderScheme => {
    const tokens: MaterialThemeBuilderScheme = {};
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
  const paletteTones = (palette: TonalPalette): Record<string, string> => {
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

type Api = {
  initials: McuConfig;
  setMcuConfig: (config: McuConfig) => void;
  getMcuColor: (colorName: TokenName, theme?: string) => string;
  allPalettes: Record<string, TonalPalette>;
  exportTheme: () => MaterialThemeBuilderExport;
};

const [useMcu, Provider, McuContext] = createRequiredContext<Api>();

export const McuProvider = ({
  styleId,
  children,
  ...configProps
}: McuConfig & {
  styleId: string;
  children?: React.ReactNode;
}) => {
  const [initials] = useState<McuConfig>(() => configProps);
  // console.log("McuProvider initials", initials);

  const [mcuConfig, setMcuConfig] = useState(initials);

  // Update mcuConfig when configProps change
  // Use a stable key to detect when config values have changed
  const configKey = JSON.stringify(configProps);
  React.useEffect(() => {
    setMcuConfig(configProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey]);

  const { css, mergedColorsLight, mergedColorsDark, allPalettes } = useMemo(
    () => generateCss(mcuConfig),
    [mcuConfig],
  );

  //
  // <style>
  //

  useInsertionEffect(() => {
    let tag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = styleId;
      document.head.appendChild(tag);
    }
    tag.textContent = css;
  }, [css, styleId]);

  //
  // getMcuColor
  //

  const getMcuColor = useCallback(
    (colorName: TokenName, theme: string | undefined) => {
      // console.log("getMcuColor", colorName, theme);
      return hexFromArgb(
        (theme === "light" ? mergedColorsLight : mergedColorsDark)[colorName],
      );
    },
    [mergedColorsDark, mergedColorsLight],
  );

  //
  // exportTheme
  //

  const exportThemeFn = useCallback(() => exportTheme(mcuConfig), [mcuConfig]);

  //
  // api
  //

  const value = useMemo(
    () =>
      ({
        initials,
        setMcuConfig,
        getMcuColor,
        allPalettes,
        exportTheme: exportThemeFn,
      }) satisfies Api,
    [getMcuColor, initials, allPalettes, exportThemeFn],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { McuContext, useMcu };
