/**
 * react-mcu Tailwind CSS Plugin
 *
 * This plugin automates the integration of Material Color Utilities (MCU)
 * with Tailwind CSS by mapping --mcu-* CSS variables to Tailwind theme colors.
 *
 * @param {Object} options - Plugin options
 * @param {string[]} options.customColors - Array of custom color names to include
 * @returns {Object} Tailwind plugin configuration
 *
 * @example
 * // In your CSS file:
 * @import "tailwindcss";
 * @plugin "react-mcu/tailwind-plugin";
 *
 * @example
 * // With custom colors:
 * @plugin "react-mcu/tailwind-plugin" {
 *   customColors: ["myCustomColor1", "myCustomColor2"];
 * }
 */
export default function mcuPlugin(options = {}) {
  const { customColors = [] } = options;

  // Base MCU color mappings
  const baseColors = {
    // Background and Surface colors
    background: "var(--mcu-background)",
    "on-background": "var(--mcu-on-background)",
    surface: "var(--mcu-surface)",
    "surface-dim": "var(--mcu-surface-dim)",
    "surface-bright": "var(--mcu-surface-bright)",
    "surface-container-lowest": "var(--mcu-surface-container-lowest)",
    "surface-container-low": "var(--mcu-surface-container-low)",
    "surface-container": "var(--mcu-surface-container)",
    "surface-container-high": "var(--mcu-surface-container-high)",
    "surface-container-highest": "var(--mcu-surface-container-highest)",
    "on-surface": "var(--mcu-on-surface)",
    "on-surface-variant": "var(--mcu-on-surface-variant)",

    // Outline colors
    outline: "var(--mcu-outline)",
    "outline-variant": "var(--mcu-outline-variant)",

    // Inverse colors
    "inverse-surface": "var(--mcu-inverse-surface)",
    "inverse-on-surface": "var(--mcu-inverse-on-surface)",

    // Primary colors
    primary: "var(--mcu-primary)",
    "on-primary": "var(--mcu-on-primary)",
    "primary-container": "var(--mcu-primary-container)",
    "on-primary-container": "var(--mcu-on-primary-container)",
    "primary-fixed": "var(--mcu-primary-fixed)",
    "primary-fixed-dim": "var(--mcu-primary-fixed-dim)",
    "on-primary-fixed": "var(--mcu-on-primary-fixed)",
    "on-primary-fixed-variant": "var(--mcu-on-primary-fixed-variant)",
    "inverse-primary": "var(--mcu-inverse-primary)",

    // Secondary colors
    secondary: "var(--mcu-secondary)",
    "on-secondary": "var(--mcu-on-secondary)",
    "secondary-container": "var(--mcu-secondary-container)",
    "on-secondary-container": "var(--mcu-on-secondary-container)",
    "secondary-fixed": "var(--mcu-secondary-fixed)",
    "secondary-fixed-dim": "var(--mcu-secondary-fixed-dim)",
    "on-secondary-fixed": "var(--mcu-on-secondary-fixed)",
    "on-secondary-fixed-variant": "var(--mcu-on-secondary-fixed-variant)",

    // Tertiary colors
    tertiary: "var(--mcu-tertiary)",
    "on-tertiary": "var(--mcu-on-tertiary)",
    "tertiary-container": "var(--mcu-tertiary-container)",
    "on-tertiary-container": "var(--mcu-on-tertiary-container)",
    "tertiary-fixed": "var(--mcu-tertiary-fixed)",
    "tertiary-fixed-dim": "var(--mcu-tertiary-fixed-dim)",
    "on-tertiary-fixed": "var(--mcu-on-tertiary-fixed)",
    "on-tertiary-fixed-variant": "var(--mcu-on-tertiary-fixed-variant)",

    // Error colors
    error: "var(--mcu-error)",
    "on-error": "var(--mcu-on-error)",
    "error-container": "var(--mcu-error-container)",
    "on-error-container": "var(--mcu-on-error-container)",

    // Other colors
    scrim: "var(--mcu-scrim)",
    shadow: "var(--mcu-shadow)",
  };

  // Shade mappings for primary, secondary, tertiary, error, neutral, and neutral-variant
  const shadeColors = {};

  const paletteColors = [
    "primary",
    "secondary",
    "tertiary",
    "error",
    "neutral",
    "neutral-variant",
  ];
  const shades = {
    50: 95,
    100: 90,
    200: 80,
    300: 70,
    400: 60,
    500: 50,
    600: 40,
    700: 30,
    800: 20,
    900: 10,
    950: 5,
  };

  paletteColors.forEach((palette) => {
    Object.entries(shades).forEach(([shade, mcuValue]) => {
      shadeColors[`${palette}-${shade}`] = `var(--mcu-${palette}-${mcuValue})`;
    });
  });

  // Custom color mappings
  const customColorMappings = {};

  customColors.forEach((colorName) => {
    // Convert camelCase to kebab-case for CSS variables
    const kebabName = colorName
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();

    // Base custom color mappings
    customColorMappings[colorName] = `var(--mcu-${kebabName})`;
    customColorMappings[`on-${colorName}`] = `var(--mcu-on-${kebabName})`;
    customColorMappings[`${colorName}-container`] =
      `var(--mcu-${kebabName}-container)`;
    customColorMappings[`on-${colorName}-container`] =
      `var(--mcu-on-${kebabName}-container)`;

    // Shade mappings for custom colors
    Object.entries(shades).forEach(([shade, mcuValue]) => {
      customColorMappings[`${colorName}-${shade}`] =
        `var(--mcu-${kebabName}-${mcuValue})`;
    });
  });

  return {
    theme: {
      extend: {
        colors: {
          ...baseColors,
          ...shadeColors,
          ...customColorMappings,
        },
      },
    },
  };
}
