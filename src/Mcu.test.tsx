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

  it("should include custom color CSS variables", () => {
    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[{ name: "myCustom", hex: "#FF0000", blend: false }]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    const styleTag = document.querySelector("#mcu-styles");
    const styleContent = styleTag?.textContent || "";

    expect(styleContent).toContain("--mcu-my-custom");
    expect(styleContent).toContain("--mcu-on-my-custom");
    expect(styleContent).toContain("--mcu-my-custom-container");
    expect(styleContent).toContain("--mcu-on-my-custom-container");
  });

  it("custom colors should NOT respond to contrast changes (by design)", () => {
    const customColors = [{ name: "testColor", hex: "#FF0000", blend: false }];

    // Generate with standard contrast
    const result0 = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors,
    });

    // Generate with high contrast
    const result1 = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 1,
      customColors,
    });

    // Custom colors should have different values with different contrast
    // The colors should exist in both results
    const merged0 = result0.mergedColorsLight as Record<string, number>;
    const merged1 = result1.mergedColorsLight as Record<string, number>;

    expect(merged0.testColor).toBeDefined();
    expect(merged1.testColor).toBeDefined();

    // Per Material Design 3 spec, custom colors use fixed tones
    // They do NOT change with contrast, unlike system colors
    expect(merged0.testColor).toBe(merged1.testColor);
    expect(merged0.testColorContainer).toBe(merged1.testColorContainer);

    // But system colors DO change with contrast
    expect(result0.mergedColorsLight.surfaceContainerLow).not.toBe(
      result1.mergedColorsLight.surfaceContainerLow,
    );
  });

  it("custom colors should respond to scheme changes appropriately", () => {
    const customColors = [{ name: "testColor", hex: "#FF0000", blend: false }];

    // Generate with tonalSpot scheme
    const resultTonal = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors,
    });

    // Generate with vibrant scheme
    const resultVibrant = generateCss({
      source: "#6750A4",
      scheme: "vibrant",
      contrast: 0,
      customColors,
    });

    // Custom colors should exist in both results
    const mergedTonal = resultTonal.mergedColorsLight as Record<string, number>;
    const mergedVibrant = resultVibrant.mergedColorsLight as Record<
      string,
      number
    >;

    expect(mergedTonal.testColor).toBeDefined();
    expect(mergedVibrant.testColor).toBeDefined();

    // Custom colors should NOT change between schemes because they have
    // their own independent palette, unlike system colors (primary, secondary, etc.)
    // which are derived from scheme palettes
    expect(mergedTonal.testColor).toBe(mergedVibrant.testColor);

    // But base system colors SHOULD differ between schemes
    expect(resultTonal.mergedColorsLight.primary).not.toBe(
      resultVibrant.mergedColorsLight.primary,
    );
  });
});
