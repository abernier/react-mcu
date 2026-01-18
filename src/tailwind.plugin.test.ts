import { describe, it, expect } from "vitest";
import { generateMcuTheme, mcuPlugin } from "./tailwind.plugin.js";

describe("tailwind.plugin", () => {
  describe("generateMcuTheme", () => {
    it("should generate base colors without custom colors", () => {
      const theme = generateMcuTheme();

      // Check for base colors
      expect(theme).toContain("@theme inline");
      expect(theme).toContain("--color-background: var(--mcu-background);");
      expect(theme).toContain("--color-primary: var(--mcu-primary);");
      expect(theme).toContain("--color-onPrimary: var(--mcu-on-primary);");
      expect(theme).toContain("--color-surface: var(--mcu-surface);");
      expect(theme).toContain("--color-error: var(--mcu-error);");
    });

    it("should generate palette shades", () => {
      const theme = generateMcuTheme();

      // Check for primary shades
      expect(theme).toContain("--color-primary-50: var(--mcu-primary-95);");
      expect(theme).toContain("--color-primary-100: var(--mcu-primary-90);");
      expect(theme).toContain("--color-primary-500: var(--mcu-primary-50);");
      expect(theme).toContain("--color-primary-950: var(--mcu-primary-5);");

      // Check for secondary shades
      expect(theme).toContain("--color-secondary-50: var(--mcu-secondary-95);");
      expect(theme).toContain(
        "--color-secondary-500: var(--mcu-secondary-50);",
      );

      // Check for tertiary shades
      expect(theme).toContain("--color-tertiary-50: var(--mcu-tertiary-95);");

      // Check for error shades
      expect(theme).toContain("--color-error-50: var(--mcu-error-95);");

      // Check for neutral shades
      expect(theme).toContain("--color-neutral-50: var(--mcu-neutral-95);");
      expect(theme).toContain(
        "--color-neutral-variant-50: var(--mcu-neutral-variant-95);",
      );
    });

    it("should generate custom colors with camelCase names", () => {
      const theme = generateMcuTheme({
        customColors: ["myCustomColor1", "myCustomColor2"],
      });

      // Check for custom color 1
      expect(theme).toContain(
        "--color-myCustomColor1: var(--mcu-my-custom-color-1);",
      );
      expect(theme).toContain(
        "--color-on-myCustomColor1: var(--mcu-on-my-custom-color-1);",
      );
      expect(theme).toContain(
        "--color-myCustomColor1-container: var(--mcu-my-custom-color-1-container);",
      );
      expect(theme).toContain(
        "--color-on-myCustomColor1-container: var(--mcu-on-my-custom-color-1-container);",
      );

      // Check for custom color 1 shades
      expect(theme).toContain(
        "--color-myCustomColor1-50: var(--mcu-my-custom-color-1-95);",
      );
      expect(theme).toContain(
        "--color-myCustomColor1-500: var(--mcu-my-custom-color-1-50);",
      );
      expect(theme).toContain(
        "--color-myCustomColor1-950: var(--mcu-my-custom-color-1-5);",
      );

      // Check for custom color 2
      expect(theme).toContain(
        "--color-myCustomColor2: var(--mcu-my-custom-color-2);",
      );
    });

    it("should handle kebab-case custom color names", () => {
      const theme = generateMcuTheme({
        customColors: ["my-custom-color"],
      });

      // kebabCase of "my-custom-color" is "my-custom-color"
      expect(theme).toContain(
        "--color-my-custom-color: var(--mcu-my-custom-color);",
      );
      expect(theme).toContain(
        "--color-on-my-custom-color: var(--mcu-on-my-custom-color);",
      );
    });

    it("should handle single word custom colors", () => {
      const theme = generateMcuTheme({
        customColors: ["accent"],
      });

      expect(theme).toContain("--color-accent: var(--mcu-accent);");
      expect(theme).toContain("--color-on-accent: var(--mcu-on-accent);");
      expect(theme).toContain(
        "--color-accent-container: var(--mcu-accent-container);",
      );
    });
  });

  describe("mcuPlugin (default export)", () => {
    it("should work the same as generateMcuTheme", () => {
      const theme1 = generateMcuTheme({ customColors: ["testColor"] });
      const theme2 = mcuPlugin({ customColors: ["testColor"] });

      expect(theme1).toBe(theme2);
    });
  });
});
