import { describe, expect, it } from "vitest";
import { builder } from "./Mcu.js";

describe("builder", () => {
  it("should generate colors with only source argument", () => {
    const result = builder("#6750A4");

    // Check structure
    expect(result).toHaveProperty("schemes");
    expect(result).toHaveProperty("palettes");
    expect(result.schemes).toHaveProperty("light");
    expect(result.schemes).toHaveProperty("dark");

    // Check that light scheme has expected color tokens
    expect(result.schemes.light).toHaveProperty("primary");
    expect(result.schemes.light).toHaveProperty("onPrimary");
    expect(result.schemes.light).toHaveProperty("secondary");
    expect(result.schemes.light).toHaveProperty("surface");
    expect(result.schemes.light).toHaveProperty("background");

    // Check that dark scheme has expected color tokens
    expect(result.schemes.dark).toHaveProperty("primary");
    expect(result.schemes.dark).toHaveProperty("onPrimary");
    expect(result.schemes.dark).toHaveProperty("secondary");
    expect(result.schemes.dark).toHaveProperty("surface");
    expect(result.schemes.dark).toHaveProperty("background");

    // Check that colors are in hex format
    expect(result.schemes.light.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(result.schemes.dark.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("should generate colors with all options", () => {
    const result = builder("#6750A4", {
      scheme: "vibrant",
      contrast: 0.5,
      primary: "#FF0000",
      secondary: "#00FF00",
      tertiary: "#0000FF",
      neutral: "#808080",
      neutralVariant: "#909090",
      error: "#FF5722",
      customColors: [
        { name: "brand", hex: "#FF5733", blend: true },
        { name: "success", hex: "#28A745", blend: false },
      ],
      contrastAllColors: true,
      adaptiveShades: true,
    });

    // Check structure
    expect(result).toHaveProperty("schemes");
    expect(result).toHaveProperty("palettes");
    expect(result).toHaveProperty("customColors");

    // Check custom colors
    expect(result.customColors).toHaveLength(2);
    expect(result.customColors![0]).toHaveProperty("name", "brand");
    expect(result.customColors![0]).toHaveProperty("blend", true);
    expect(result.customColors![0]).toHaveProperty("color");
    expect(result.customColors![0]!.color).toHaveProperty("light");
    expect(result.customColors![0]!.color).toHaveProperty("dark");
    expect(result.customColors![0]).toHaveProperty("onColor");
    expect(result.customColors![0]).toHaveProperty("colorContainer");
    expect(result.customColors![0]).toHaveProperty("onColorContainer");

    expect(result.customColors![1]).toHaveProperty("name", "success");
    expect(result.customColors![1]).toHaveProperty("blend", false);

    // Check that custom color variables are in the schemes
    expect(result.schemes.light).toHaveProperty("brand");
    expect(result.schemes.light).toHaveProperty("onBrand");
    expect(result.schemes.light).toHaveProperty("brandContainer");
    expect(result.schemes.light).toHaveProperty("onBrandContainer");

    expect(result.schemes.dark).toHaveProperty("brand");
    expect(result.schemes.dark).toHaveProperty("success");

    // Check that colors are in hex format
    expect(result.customColors![0]!.color.light).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(result.customColors![0]!.color.dark).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("should generate palettes with standard tones", () => {
    const result = builder("#6750A4");

    // Check that palettes exist for core colors
    expect(result.palettes).toHaveProperty("primary");
    expect(result.palettes).toHaveProperty("secondary");
    expect(result.palettes).toHaveProperty("tertiary");
    expect(result.palettes).toHaveProperty("error");
    expect(result.palettes).toHaveProperty("neutral");
    expect(result.palettes).toHaveProperty("neutral-variant");

    // Check that palettes have standard tones
    const standardTones = [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
    ];
    standardTones.forEach((tone) => {
      expect(result.palettes.primary).toHaveProperty(String(tone));
      expect(result.palettes.primary![tone]).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("should generate custom color palettes", () => {
    const result = builder("#6750A4", {
      customColors: [
        { name: "brand", hex: "#FF5733", blend: true },
        { name: "success", hex: "#28A745", blend: false },
      ],
    });

    // Check that custom color palettes exist
    expect(result.palettes).toHaveProperty("brand");
    expect(result.palettes).toHaveProperty("success");

    // Check that custom palettes have standard tones
    const standardTones = [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
    ];
    standardTones.forEach((tone) => {
      expect(result.palettes.brand).toHaveProperty(String(tone));
      expect(result.palettes.brand![tone]).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("should not include customColors property when no custom colors are provided", () => {
    const result = builder("#6750A4");
    expect(result.customColors).toBeUndefined();
  });

  it("should handle empty customColors array", () => {
    const result = builder("#6750A4", { customColors: [] });
    expect(result.customColors).toBeUndefined();
  });

  it("should work with different schemes", () => {
    const schemes = [
      "tonalSpot",
      "monochrome",
      "neutral",
      "vibrant",
      "expressive",
      "fidelity",
      "content",
    ] as const;

    schemes.forEach((scheme) => {
      const result = builder("#6750A4", { scheme });
      expect(result.schemes.light).toHaveProperty("primary");
      expect(result.schemes.dark).toHaveProperty("primary");
    });
  });

  it("should respect contrast levels", () => {
    const resultStandard = builder("#6750A4", { contrast: 0 });
    const resultHigh = builder("#6750A4", { contrast: 1.0 });

    // High contrast should produce different colors
    expect(resultStandard.schemes.light.primary).not.toBe(
      resultHigh.schemes.light.primary,
    );
  });
});
