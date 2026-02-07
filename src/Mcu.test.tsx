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

  it("should apply contrast to custom colors when contrastAllColors is true", () => {
    const customColors = [
      { name: "myCustomColor", hex: "#FF5733", blend: true },
    ];

    // Generate CSS with contrast and contrastAllColors disabled
    const cssWithoutContrastAll = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1.0,
      customColors,
      contrastAllColors: false,
    });

    // Generate CSS with contrast and contrastAllColors enabled
    const cssWithContrastAll = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1.0,
      customColors,
      contrastAllColors: true,
    });

    // The colors should be different when contrastAllColors is enabled with high contrast
    const withoutContrastCustomColor = (
      cssWithoutContrastAll.mergedColorsLight as any
    ).myCustomColor;
    const withContrastCustomColor = (
      cssWithContrastAll.mergedColorsLight as any
    ).myCustomColor;

    expect(withoutContrastCustomColor).toBeDefined();
    expect(withContrastCustomColor).toBeDefined();

    // With contrastAllColors enabled and high contrast, the colors should be adjusted
    // We check that the values are different, indicating the contrast is being applied
    expect(withoutContrastCustomColor).not.toBe(withContrastCustomColor);
  });

  it("should not apply contrast to custom colors when contrastAllColors is false (default)", () => {
    const customColors = [
      { name: "myCustomColor", hex: "#FF5733", blend: true },
    ];

    // Generate CSS with contrast=0 and contrastAllColors disabled
    const cssWithContrast0 = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors,
      contrastAllColors: false,
    });

    // Generate CSS with contrast=1 and contrastAllColors disabled
    const cssWithContrast1 = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1.0,
      customColors,
      contrastAllColors: false,
    });

    // When contrastAllColors is false, custom colors should not be affected by contrast level
    const customColor0 = (cssWithContrast0.mergedColorsLight as any)
      .myCustomColor;
    const customColor1 = (cssWithContrast1.mergedColorsLight as any)
      .myCustomColor;
    expect(customColor0).toBe(customColor1);
  });

  it("should apply contrast to tonal shades when contrastAllColors is true", () => {
    // Generate CSS with contrastAllColors disabled
    const cssWithoutContrastAll = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1.0,
      contrastAllColors: false,
    });

    // Generate CSS with contrastAllColors enabled
    const cssWithContrastAll = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1.0,
      contrastAllColors: true,
    });

    // Check that tonal shades are affected when contrastAllColors is enabled
    // The CSS should contain different values for the same tonal shade
    expect(cssWithoutContrastAll.css).toContain("--mcu-primary-40");
    expect(cssWithContrastAll.css).toContain("--mcu-primary-40");

    // The actual color values should be different
    expect(cssWithoutContrastAll.css).not.toBe(cssWithContrastAll.css);
  });
});
