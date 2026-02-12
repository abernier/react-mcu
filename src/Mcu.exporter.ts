import {
  type buildExportPalettes,
  DEFAULT_BLEND,
  DEFAULT_CUSTOM_COLORS,
  type McuConfig,
  type schemeToTokens,
} from "./Mcu";

//
// Material Theme Builder-compatible JSON export
//
// This file does NOT compute any colors itself.
// All color computation comes from Mcu.tsx (single source of truth).
//

/**
 * Generate a Material Theme Builder-compatible JSON export.
 *
 * All color computation is delegated to `generateCss` in Mcu.tsx.
 * This function only formats pre-computed data into the export JSON structure.
 */
export function exportTheme(
  config: McuConfig,
  createSchemeForExport: (
    contrastLevel: number,
    isDark: boolean,
  ) => Parameters<typeof schemeToTokens>[0],
  schemeToTokensFn: typeof schemeToTokens,
  palettes: ReturnType<typeof buildExportPalettes>,
) {
  const {
    source: hexSource,
    primary,
    secondary,
    tertiary,
    error,
    neutral,
    neutralVariant,
    customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
  } = config;

  // Generate all 6 scheme variants using pre-computed scheme factory from Mcu.tsx
  const lightTokens = schemeToTokensFn(createSchemeForExport(0, false));
  const lightMediumTokens = schemeToTokensFn(createSchemeForExport(0.5, false));
  const lightHighTokens = schemeToTokensFn(createSchemeForExport(1.0, false));
  const darkTokens = schemeToTokensFn(createSchemeForExport(0, true));
  const darkMediumTokens = schemeToTokensFn(createSchemeForExport(0.5, true));
  const darkHighTokens = schemeToTokensFn(createSchemeForExport(1.0, true));

  const schemes = {
    light: lightTokens,
    "light-medium-contrast": lightMediumTokens,
    "light-high-contrast": lightHighTokens,
    dark: darkTokens,
    "dark-medium-contrast": darkMediumTokens,
    "dark-high-contrast": darkHighTokens,
  };

  // Build extendedColors from customColors
  const extendedColors = hexCustomColors.map((c) => ({
    name: c.name,
    color: c.hex.toUpperCase(),
    description: "",
    harmonized: c.blend ?? DEFAULT_BLEND,
  }));

  // Build coreColors — include all provided core colors
  const coreColors: Record<string, string> = {
    primary: (primary || hexSource).toUpperCase(),
  };
  if (secondary) coreColors.secondary = secondary.toUpperCase();
  if (tertiary) coreColors.tertiary = tertiary.toUpperCase();
  if (error) coreColors.error = error.toUpperCase();
  if (neutral) coreColors.neutral = neutral.toUpperCase();
  if (neutralVariant) coreColors.neutralVariant = neutralVariant.toUpperCase();

  return {
    description: `Material Theme Builder export from react-mcu`,
    seed: hexSource.toUpperCase(),
    coreColors,
    extendedColors,
    schemes,
    palettes,
  };
}
