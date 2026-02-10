import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu, generateCss, adjustToneForContrast } from "./Mcu.js";

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

  describe("adjustToneForContrast", () => {
    it("should not change tone when contrast is 0", () => {
      expect(adjustToneForContrast(50, 0, false)).toBe(50);
      expect(adjustToneForContrast(90, 0, true)).toBe(90);
      expect(adjustToneForContrast(10, 0, false)).toBe(10);
    });

    it("should make light tones lighter with positive contrast", () => {
      // Tone 90 (light), contrast 1.0
      // Distance from center: 90 - 50 = 40
      // Delta: 40 * 1.0 * 0.2 = 8
      // Result: 90 + 8 = 98
      const result = adjustToneForContrast(90, 1.0, true);
      expect(result).toBe(98);
      expect(result).toBeGreaterThan(90); // Lighter
    });

    it("should make dark tones darker with positive contrast", () => {
      // Tone 10 (dark), contrast 1.0
      // Distance from center: 10 - 50 = -40
      // Delta: -40 * 1.0 * 0.2 = -8
      // Result: 10 + (-8) = 2
      const result = adjustToneForContrast(10, 1.0, true);
      expect(result).toBe(2);
      expect(result).toBeLessThan(10); // Darker
    });

    it("should move tones toward 50 with negative contrast", () => {
      // Light tone (90) should move toward 50
      const lightResult = adjustToneForContrast(90, -1.0, false);
      expect(lightResult).toBeLessThan(90); // Moving toward center
      expect(lightResult).toBeGreaterThan(50); // But still on light side

      // Dark tone (10) should move toward 50
      const darkResult = adjustToneForContrast(10, -1.0, false);
      expect(darkResult).toBeGreaterThan(10); // Moving toward center
      expect(darkResult).toBeLessThan(50); // But still on dark side
    });

    it("should work the same regardless of isDark parameter", () => {
      // The isDark parameter should no longer affect the result
      // since the logic is now based on distance from center (50)
      const lightToneInLight = adjustToneForContrast(90, 1.0, false);
      const lightToneInDark = adjustToneForContrast(90, 1.0, true);
      expect(lightToneInLight).toBe(lightToneInDark);

      const darkToneInLight = adjustToneForContrast(10, 1.0, false);
      const darkToneInDark = adjustToneForContrast(10, 1.0, true);
      expect(darkToneInLight).toBe(darkToneInDark);
    });

    it("should clamp values to 0-100 range", () => {
      // Test upper bound
      const veryLightTone = adjustToneForContrast(95, 1.0, false);
      expect(veryLightTone).toBeLessThanOrEqual(100);

      // Test lower bound
      const veryDarkTone = adjustToneForContrast(5, 1.0, false);
      expect(veryDarkTone).toBeGreaterThanOrEqual(0);
    });

    it("should handle tone at center (50) correctly", () => {
      // Tone at center should not change
      // Distance from center: 50 - 50 = 0
      // Delta: 0 * 1.0 * 0.2 = 0
      const result = adjustToneForContrast(50, 1.0, false);
      expect(result).toBe(50);
    });
  });

  describe("contrast adjustment integration", () => {
    it("should generate CSS with adjusted tones when contrastAllColors is enabled", () => {
      const { css } = generateCss({
        source: "#6750A4",
        contrast: 1.0,
        contrastAllColors: true,
      });

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

      expect(css).toContain(".dark");
      expect(css).toContain("--mcu-");
    });
  });
});
