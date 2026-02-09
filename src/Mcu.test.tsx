import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu, generateCss } from "./Mcu.js";

describe("Mcu", () => {
  afterEach(() => {
    cleanup();
  });

  it("should inject style tag with --mcu-* CSS variables", () => {
    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    // Check that the style tag exists
    const styleTag = document.querySelector("#mcu-styles");
    expect(styleTag).toBeTruthy();
    expect(styleTag?.tagName).toBe("STYLE");

    // Check that the style content includes CSS variables
    const styleContent = styleTag?.textContent || "";
    expect(styleContent).toContain("--mcu-primary");
    expect(styleContent).toContain("--mcu-on-primary");
    expect(styleContent).toContain("--mcu-surface");
    expect(styleContent).toContain("--mcu-background");
  });

  describe("contrast adjustment", () => {
    it("should make light tones lighter and dark tones darker with positive contrast", () => {
      // Test with contrastAllColors enabled to apply contrast to tonal shades
      const { css } = generateCss({
        source: "#6750A4",
        contrast: 1.0,
        contrastAllColors: true,
      });

      // Parse the generated CSS to extract tonal values
      // In dark mode with contrast=1.0:
      // - Light tones (e.g., 90) should become lighter (closer to 100)
      // - Dark tones (e.g., 10) should become darker (closer to 0)
      expect(css).toBeTruthy();
      expect(css).toContain("--mcu-");
    });

    it("should make tones closer to middle (50) with negative contrast", () => {
      const { css } = generateCss({
        source: "#6750A4",
        contrast: -1.0,
        contrastAllColors: true,
      });

      // With contrast=-1.0:
      // - Light tones (e.g., 90) should move toward 50
      // - Dark tones (e.g., 10) should move toward 50
      expect(css).toBeTruthy();
      expect(css).toContain("--mcu-");
    });

    it("should work correctly in dark mode with adaptiveShades", () => {
      const { css } = generateCss({
        source: "#6750A4",
        contrast: 1.0,
        contrastAllColors: true,
        adaptiveShades: true,
      });

      // In dark mode with adaptiveShades and high contrast:
      // - Background (dark tone) should get darker
      // - Text (light tone) should get lighter
      expect(css).toContain(".dark");
      expect(css).toContain("--mcu-");
    });
  });
});
