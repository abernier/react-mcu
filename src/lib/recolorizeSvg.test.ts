import { describe, it, expect } from "vitest";
import { recolorizeSvgDirect } from "./recolorizeSvg";
import { TonalPalette, Hct } from "@material/material-color-utilities";

describe("recolorizeSvgDirect", () => {
  it("should prefer colored palettes for colored inputs instead of falling back to neutral-variant", () => {
    // Create test palettes
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48), // Blue
      secondary: TonalPalette.fromHueAndChroma(30, 48), // Orange (30°)
      tertiary: TonalPalette.fromHueAndChroma(120, 48), // Green
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Test SVG with true orange color at 30° (should match secondary, not neutral-variant)
    // Using #d46c1a which has hue ~30° to match secondary palette
    const svgWithOrange = `
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#d46c1a"/>
      </svg>
    `;

    const result = recolorizeSvgDirect(svgWithOrange, palettes);

    // Should NOT contain neutral-variant for the orange color
    // Should contain a colored palette (secondary for this orange)
    expect(result).not.toContain("neutral-variant");

    // Let's be more specific - extract the fill value
    const fillMatch = result.match(/fill="([^"]+)"/);
    expect(fillMatch).toBeTruthy();
    const fillValue = fillMatch![1];

    // Should be a colored token (primary, secondary, or tertiary), not neutral-variant
    expect(fillValue).toMatch(/var\(--mcu-(primary|secondary|tertiary)-\d+\)/);
    expect(fillValue).not.toContain("neutral-variant");
  });

  it("should match colors to the closest palette by hue", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48), // Blue (220°)
      secondary: TonalPalette.fromHueAndChroma(30, 48), // Orange (30°)
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Blue-ish color (should match primary)
    const svgWithBlue = `<svg><rect fill="#5080d0"/></svg>`;
    const blueResult = recolorizeSvgDirect(svgWithBlue, palettes);
    expect(blueResult).toContain("--mcu-primary-");

    // Orange-ish color (should match secondary)
    const svgWithOrange = `<svg><rect fill="#d46c1a"/></svg>`;
    const orangeResult = recolorizeSvgDirect(svgWithOrange, palettes);
    expect(orangeResult).toContain("--mcu-secondary-");
  });

  it("should prefer neutral palettes for low-chroma colors", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      neutral: TonalPalette.fromHueAndChroma(0, 4),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    // Gray color (low chroma) - should match neutral or neutral-variant
    const svgWithGray = `<svg><rect fill="#8a8a8a"/></svg>`;
    const result = recolorizeSvgDirect(svgWithGray, palettes);

    // Should use neutral palette, not primary
    expect(result).toMatch(/--mcu-neutral(-variant)?-/);
    expect(result).not.toContain("--mcu-primary-");
  });

  it("should handle tolerance parameter", () => {
    const palettes = {
      primary: TonalPalette.fromHueAndChroma(220, 48),
      "neutral-variant": TonalPalette.fromHueAndChroma(0, 8),
    };

    const svg = `<svg><rect fill="#5080d0"/></svg>`;

    // With default tolerance (15), should find a match
    const resultDefault = recolorizeSvgDirect(svg, palettes);
    expect(resultDefault).toContain("--mcu-primary-");

    // With very low tolerance, might not find a match within tolerance
    // but should still find the best match using the new scoring system
    const resultLowTolerance = recolorizeSvgDirect(svg, palettes, {
      tolerance: 5,
    });
    // Should still prefer primary over neutral-variant for colored input
    expect(resultLowTolerance).toContain("--mcu-");
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

    const result = recolorizeSvgDirect(svg, palettes);

    // All three should use the same token (cached)
    const tokens = result.match(/var\(--mcu-[^)]+\)/g) || [];
    expect(tokens.length).toBeGreaterThan(0);

    // All instances of #5080d0 should map to the same token
    const uniqueTokens = new Set(tokens);
    // Since all three elements have the same color, they should use the same token
    expect(uniqueTokens.size).toBe(1);
  });
});
