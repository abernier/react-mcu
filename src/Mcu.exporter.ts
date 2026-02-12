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
    customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
  } = config;

  // Generate all 6 scheme variants using pre-computed scheme factory from Mcu.tsx
  const schemes = {
    light: schemeToTokensFn(createSchemeForExport(0, false)),
    "light-medium-contrast": schemeToTokensFn(
      createSchemeForExport(0.5, false),
    ),
    "light-high-contrast": schemeToTokensFn(createSchemeForExport(1.0, false)),
    dark: schemeToTokensFn(createSchemeForExport(0, true)),
    "dark-medium-contrast": schemeToTokensFn(createSchemeForExport(0.5, true)),
    "dark-high-contrast": schemeToTokensFn(createSchemeForExport(1.0, true)),
  };

  // Build extendedColors from customColors
  const extendedColors = hexCustomColors.map((c) => ({
    name: c.name,
    color: c.hex.toUpperCase(),
    harmonized: c.blend ?? DEFAULT_BLEND,
  }));

  // Determine primary color for coreColors
  const primaryColor = primary || hexSource;

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
