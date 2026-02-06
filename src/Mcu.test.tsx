import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu, generateCss } from "./Mcu.js";
import { hexFromArgb } from "@material/material-color-utilities";

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

  it("should align custom colors with scheme (monochrome produces grayscale)", () => {
    // Test with monochrome scheme - custom colors should be grayscale
    const { mergedColorsLight } = generateCss({
      source: "#6750A4",
      scheme: "monochrome",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: false }],
    });

    // Get the custom color value
    const brandColor = (mergedColorsLight as Record<string, number>)["brand"]!;
    const brandHex = hexFromArgb(brandColor);

    // In monochrome scheme, all colors should be grayscale (R=G=B)
    const r = (brandColor >> 16) & 0xff;
    const g = (brandColor >> 8) & 0xff;
    const b = brandColor & 0xff;

    // Allow small variance for rounding
    expect(Math.abs(r - g)).toBeLessThanOrEqual(1);
    expect(Math.abs(g - b)).toBeLessThanOrEqual(1);
    expect(Math.abs(r - b)).toBeLessThanOrEqual(1);
  });

  it("should make custom colors respect different schemes", () => {
    // Compare custom colors between different schemes
    const tonalSpotResult = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: false }],
    });

    const monochromeResult = generateCss({
      source: "#6750A4",
      scheme: "monochrome",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: false }],
    });

    // The colors should be different between schemes
    expect(
      (tonalSpotResult.mergedColorsLight as Record<string, number>)["brand"],
    ).not.toBe(
      (monochromeResult.mergedColorsLight as Record<string, number>)["brand"],
    );

    // TonalSpot should have color (not grayscale)
    const tonalColor = (
      tonalSpotResult.mergedColorsLight as Record<string, number>
    )["brand"]!;
    const tr = (tonalColor >> 16) & 0xff;
    const tg = (tonalColor >> 8) & 0xff;
    const tb = tonalColor & 0xff;

    // TonalSpot should not be perfectly grayscale
    const isGrayscale =
      Math.abs(tr - tg) <= 1 &&
      Math.abs(tg - tb) <= 1 &&
      Math.abs(tr - tb) <= 1;
    expect(isGrayscale).toBe(false);
  });

  it("should make custom colors respect light/dark mode", () => {
    const result = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: false }],
    });

    // Light and dark mode should produce different colors
    expect(
      (result.mergedColorsLight as Record<string, number>)["brand"],
    ).not.toBe((result.mergedColorsDark as Record<string, number>)["brand"]);

    // Dark mode brand should be lighter (higher tone) than light mode
    const lightBrand = (result.mergedColorsLight as Record<string, number>)[
      "brand"
    ]!;
    const darkBrand = (result.mergedColorsDark as Record<string, number>)[
      "brand"
    ]!;

    // Extract luminance (approximate using RGB average)
    const lightLum =
      ((lightBrand >> 16) & 0xff) +
      ((lightBrand >> 8) & 0xff) +
      (lightBrand & 0xff);
    const darkLum =
      ((darkBrand >> 16) & 0xff) +
      ((darkBrand >> 8) & 0xff) +
      (darkBrand & 0xff);

    // Dark mode should be lighter than light mode (higher tone)
    expect(darkLum).toBeGreaterThan(lightLum);
  });

  it("should support blend property for custom colors", () => {
    // Test with blend = true (harmonized)
    const withBlend = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: true }],
    });

    // Test with blend = false (not harmonized)
    const withoutBlend = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: false }],
    });

    // The colors should be different because blend harmonizes the hue
    const blendedColor = (
      withBlend.mergedColorsLight as Record<string, number>
    )["brand"]!;
    const nonBlendedColor = (
      withoutBlend.mergedColorsLight as Record<string, number>
    )["brand"]!;

    expect(blendedColor).not.toBe(nonBlendedColor);

    // Extract hues to verify harmonization changed the hue
    // The blended color should have a different hue due to harmonization
    const blendedHex = hexFromArgb(blendedColor);
    const nonBlendedHex = hexFromArgb(nonBlendedColor);

    // Both should be valid colors but different
    expect(blendedHex).not.toBe(nonBlendedHex);
  });

  it("should harmonize custom colors with effective source (primary if defined, else source)", () => {
    // Test harmonization with just source
    const withSourceOnly = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: true }],
    });

    // Test harmonization with primary defined (should use primary as effective source)
    const withPrimary = generateCss({
      source: "#6750A4",
      primary: "#00FF00", // Different color as primary
      scheme: "tonalSpot",
      contrast: 0,
      customColors: [{ name: "brand", hex: "#FF0000", blend: true }],
    });

    // The harmonized colors should be different because they harmonize with different sources
    const sourceOnlyColor = (
      withSourceOnly.mergedColorsLight as Record<string, number>
    )["brand"]!;
    const primaryColor = (
      withPrimary.mergedColorsLight as Record<string, number>
    )["brand"]!;

    expect(sourceOnlyColor).not.toBe(primaryColor);
  });
});
