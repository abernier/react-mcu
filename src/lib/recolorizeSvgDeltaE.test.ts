import { describe, it, expect } from "vitest";
import { recolorizeSvgWithDeltaE } from "./recolorizeSvgDeltaE";
import { TonalPalette } from "@material/material-color-utilities";

describe("recolorizeSvgWithDeltaE", () => {
  it("should use CIEDE2000 for perceptually accurate color matching", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48), // Blue
      secondary: TonalPalette.fromHueAndChroma(30, 48), // Orange
      tertiary: TonalPalette.fromHueAndChroma(120, 48), // Green
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Orange color should match secondary
    const svgWithOrange = `<svg><rect fill="#d46c1a"/></svg>`;
    const result = recolorizeSvgWithDeltaE(svgWithOrange, palettes);

    // Should match a colored palette, not neutral-variant
    expect(result).toMatch(/--mcu-(primary|secondary|tertiary)-/);
    expect(result).not.toContain("neutral-variant");
  });

  it("should match colors by perceptual distance, not just hue", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48), // Blue
      secondary: TonalPalette.fromHueAndChroma(30, 48), // Orange
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Blue color
    const svgWithBlue = `<svg><rect fill="#5080d0"/></svg>`;
    const blueResult = recolorizeSvgWithDeltaE(svgWithBlue, palettes);
    expect(blueResult).toContain("--mcu-primary-");

    // Orange color
    const svgWithOrange = `<svg><rect fill="#d46c1a"/></svg>`;
    const orangeResult = recolorizeSvgWithDeltaE(svgWithOrange, palettes);
    expect(orangeResult).toContain("--mcu-secondary-");
  });

  it("should prefer neutral palettes for low-chroma colors", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    const svgWithGray = `<svg><rect fill="#8a8a8a"/></svg>`;
    const result = recolorizeSvgWithDeltaE(svgWithGray, palettes);

    expect(result).toMatch(/--mcu-neutral(-variant)?-/);
    expect(result).not.toContain("--mcu-primary-");
  });

  it("should handle maxDeltaE parameter", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    const svg = `<svg><rect fill="#5080d0"/></svg>`;

    // With default maxDeltaE (20), should find a match
    const resultDefault = recolorizeSvgWithDeltaE(svg, palettes);
    expect(resultDefault).toContain("--mcu-");

    // With very low maxDeltaE, might fallback more often but should still work
    const resultLowMax = recolorizeSvgWithDeltaE(svg, palettes, {
      maxDeltaE: 10,
    });
    expect(resultLowMax).toContain("--mcu-");
  });

  it("should cache results for repeated colors", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    const svg = `
      <svg>
        <rect fill="#5080d0"/>
        <circle fill="#5080d0"/>
        <ellipse fill="#5080d0"/>
      </svg>
    `;

    const result = recolorizeSvgWithDeltaE(svg, palettes);

    // All instances should use the same token (cached)
    const tokens = result.match(/var\(--mcu-[^)]+\)/g) || [];
    expect(tokens.length).toBeGreaterThan(0);

    const uniqueTokens = new Set(tokens);
    expect(uniqueTokens.size).toBe(1);
  });

  it("should handle edge cases like very dark and very light colors", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Very dark color
    const darkSvg = `<svg><rect fill="#1a1a1a"/></svg>`;
    const darkResult = recolorizeSvgWithDeltaE(darkSvg, palettes);
    expect(darkResult).toContain("--mcu-");
    // Should use a low tone value (0-20)
    expect(darkResult).toMatch(/--mcu-\w+-(0|5|10|15|20)\)/);

    // Very light color
    const lightSvg = `<svg><rect fill="#f5f5f5"/></svg>`;
    const lightResult = recolorizeSvgWithDeltaE(lightSvg, palettes);
    expect(lightResult).toContain("--mcu-");
    // Should use a high tone value (90-100)
    expect(lightResult).toMatch(/--mcu-\w+-(90|95|98|99|100)\)/);
  });
});
