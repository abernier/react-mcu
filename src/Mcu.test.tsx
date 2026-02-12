import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Mcu, exportTheme } from "./Mcu.js";

describe("Mcu", () => {
  afterEach(() => {
    cleanup();
    // Also manually remove any leftover style tags
    document.querySelectorAll("#mcu-styles").forEach((el) => el.remove());
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

  it("should remove custom color CSS variables when customColors are removed", () => {
    // First render with custom colors
    const { rerender } = render(
      <Mcu
        source="#6750A4"
        customColors={[
          { name: "brand", hex: "#FF5733", blend: true },
          { name: "success", hex: "#28A745", blend: false },
        ]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    // Check that custom color variables are present
    let styleTag = document.querySelector("#mcu-styles");
    let styleContent = styleTag?.textContent || "";

    expect(styleContent).toContain("--mcu-brand");
    expect(styleContent).toContain("--mcu-success");

    // Rerender with only one custom color (removing "success")
    rerender(
      <Mcu
        source="#6750A4"
        customColors={[{ name: "brand", hex: "#FF5733", blend: true }]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    // Check that "success" variables are removed
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    // "brand" should still be there
    expect(styleContent).toContain("--mcu-brand");

    // "success" should be gone
    expect(styleContent).not.toContain("--mcu-success");

    // Rerender with no custom colors (empty array)
    rerender(
      <Mcu source="#6750A4" customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    // Check that all custom color variables are removed
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    expect(styleContent).not.toContain("--mcu-brand");

    // Rerender without customColors prop at all (should use default empty array)
    rerender(
      <Mcu source="#6750A4">
        <div>Test content</div>
      </Mcu>,
    );

    // Check that custom colors are still not present
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    expect(styleContent).not.toContain("--mcu-brand");
  });
});

describe("exportTheme", () => {
  it("should return a valid Material Theme Builder-compatible JSON structure", () => {
    const result = exportTheme({ source: "#769CDF" });

    // Check top-level structure
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("seed", "#769CDF");
    expect(result).toHaveProperty("coreColors");
    expect(result.coreColors).toHaveProperty("primary");
    expect(result).toHaveProperty("extendedColors");
    expect(result.extendedColors).toEqual([]);
    expect(result).toHaveProperty("schemes");
    expect(result).toHaveProperty("palettes");
  });

  it("should contain all 6 scheme variants", () => {
    const result = exportTheme({ source: "#769CDF" });

    expect(result.schemes).toHaveProperty("light");
    expect(result.schemes).toHaveProperty("light-medium-contrast");
    expect(result.schemes).toHaveProperty("light-high-contrast");
    expect(result.schemes).toHaveProperty("dark");
    expect(result.schemes).toHaveProperty("dark-medium-contrast");
    expect(result.schemes).toHaveProperty("dark-high-contrast");
  });

  it("should contain all expected color tokens in each scheme", () => {
    const result = exportTheme({ source: "#769CDF" });

    const expectedTokens = [
      "primary",
      "surfaceTint",
      "onPrimary",
      "primaryContainer",
      "onPrimaryContainer",
      "secondary",
      "onSecondary",
      "secondaryContainer",
      "onSecondaryContainer",
      "tertiary",
      "onTertiary",
      "tertiaryContainer",
      "onTertiaryContainer",
      "error",
      "onError",
      "errorContainer",
      "onErrorContainer",
      "background",
      "onBackground",
      "surface",
      "onSurface",
      "surfaceVariant",
      "onSurfaceVariant",
      "outline",
      "outlineVariant",
      "shadow",
      "scrim",
      "inverseSurface",
      "inverseOnSurface",
      "inversePrimary",
      "primaryFixed",
      "onPrimaryFixed",
      "primaryFixedDim",
      "onPrimaryFixedVariant",
      "secondaryFixed",
      "onSecondaryFixed",
      "secondaryFixedDim",
      "onSecondaryFixedVariant",
      "tertiaryFixed",
      "onTertiaryFixed",
      "tertiaryFixedDim",
      "onTertiaryFixedVariant",
      "surfaceDim",
      "surfaceBright",
      "surfaceContainerLowest",
      "surfaceContainerLow",
      "surfaceContainer",
      "surfaceContainerHigh",
      "surfaceContainerHighest",
    ];

    for (const schemeName of Object.keys(result.schemes) as Array<
      keyof typeof result.schemes
    >) {
      for (const token of expectedTokens) {
        expect(result.schemes[schemeName]).toHaveProperty(token);
      }
    }
  });

  it("should contain all 5 tonal palettes with standard tones", () => {
    const result = exportTheme({ source: "#769CDF" });

    const expectedPalettes = [
      "primary",
      "secondary",
      "tertiary",
      "neutral",
      "neutral-variant",
    ];
    const expectedTones = [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "95",
      "98",
      "99",
      "100",
    ];

    for (const palette of expectedPalettes) {
      expect(result.palettes).toHaveProperty(palette);
      for (const tone of expectedTones) {
        expect(
          result.palettes[palette as keyof typeof result.palettes],
        ).toHaveProperty(tone);
      }
    }
  });

  it("should produce uppercase hex color values", () => {
    const result = exportTheme({ source: "#769CDF" });

    // Check seed
    expect(result.seed).toMatch(/^#[0-9A-F]{6}$/);

    // Check scheme tokens are uppercase hex
    const lightPrimary = result.schemes.light.primary;
    expect(lightPrimary).toMatch(/^#[0-9A-F]{6}$/);

    // Check palette tones are uppercase hex
    const primaryTone0 = result.palettes.primary["0"];
    expect(primaryTone0).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("should produce different colors for different contrast levels", () => {
    const result = exportTheme({ source: "#769CDF" });

    // Light and light-high-contrast should have different primary values
    expect(result.schemes.light.primary).not.toBe(
      result.schemes["light-high-contrast"].primary,
    );

    // Dark and dark-high-contrast should have different primary values
    expect(result.schemes.dark.primary).not.toBe(
      result.schemes["dark-high-contrast"].primary,
    );
  });

  it("should include extended colors from customColors", () => {
    const result = exportTheme({
      source: "#769CDF",
      customColors: [
        { name: "brand", hex: "#FF5733", blend: true },
        { name: "success", hex: "#28A745", blend: false },
      ],
    });

    expect(result.extendedColors).toHaveLength(2);
    expect(result.extendedColors[0]).toEqual({
      name: "brand",
      color: "#FF5733",
      harmonized: true,
    });
    expect(result.extendedColors[1]).toEqual({
      name: "success",
      color: "#28A745",
      harmonized: false,
    });
  });

  it("should respect scheme variant parameter", () => {
    const tonalSpot = exportTheme({ source: "#769CDF", scheme: "tonalSpot" });
    const vibrant = exportTheme({ source: "#769CDF", scheme: "vibrant" });

    // Different scheme variants should produce different color tokens
    expect(tonalSpot.schemes.light.primary).not.toBe(
      vibrant.schemes.light.primary,
    );
  });
});
