/**
 * react-mcu Tailwind CSS Plugin Type Definitions
 */

export interface McuPluginOptions {
  /**
   * Array of custom color names to include in the plugin
   * @example ["myCustomColor1", "myCustomColor2"]
   */
  customColors?: string[];
}

/**
 * react-mcu Tailwind CSS Plugin
 *
 * This plugin automates the integration of Material Color Utilities (MCU)
 * with Tailwind CSS by mapping --mcu-* CSS variables to Tailwind theme colors.
 *
 * @param options - Plugin options
 * @returns Tailwind plugin configuration
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
export default function mcuPlugin(options?: McuPluginOptions): {
  theme: {
    extend: {
      colors: Record<string, string>;
    };
  };
};
