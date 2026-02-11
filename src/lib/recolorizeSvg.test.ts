import { TonalPalette } from "@material/material-color-utilities";
import { describe, expect, it } from "vitest";
import { recolorizeSvg } from "./recolorizeSvg";

// Mock palettes for testing
const mockPalettes = {
  primary: TonalPalette.fromInt(0xff6750a4), // Purple
  secondary: TonalPalette.fromInt(0xff625b71), // Purple-gray
  tertiary: TonalPalette.fromInt(0xff7d5260), // Pink-brown
  neutral: TonalPalette.fromInt(0xff605d64), // Gray
  "neutral-variant": TonalPalette.fromInt(0xff605d66), // Gray variant
};

describe("recolorizeSvg - Basic functionality", () => {
  it("should recolorize simple SVG shapes with fill colors", () => {
    const svg = `<svg><circle fill="#FF6B6B" cx="50" cy="50" r="20"/></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#FF6B6B");
  });

  it("should recolorize stroke colors", () => {
    const svg = `<svg><rect stroke="#4ECDC4" fill="none" width="50" height="50"/></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#4ECDC4");
  });

  it("should handle inline styles", () => {
    const svg = `<svg><circle style="fill: #FF6B6B; stroke: #4ECDC4" cx="50" cy="50" r="20"/></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#FF6B6B");
    expect(result).not.toContain("#4ECDC4");
  });

  it("should skip url() references", () => {
    const svg = `<svg><rect fill="url(#gradient)" width="50" height="50"/></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);

    // url() should be preserved as-is
    expect(result).toContain("url(#gradient)");
  });
});

describe("recolorizeSvg - Gradient support", () => {
  it("should recolorize gradient stop colors in linearGradient", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1">
            <stop offset="0%" stop-color="#FF6B6B" />
            <stop offset="100%" stop-color="#4ECDC4" />
          </linearGradient>
        </defs>
        <rect fill="url(#grad1)" width="100" height="100"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    // Gradient stops should be recolorized
    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#FF6B6B");
    expect(result).not.toContain("#4ECDC4");

    // Gradient reference should be preserved
    expect(result).toContain("url(#grad1)");
  });

  it("should recolorize gradient stop colors in radialGradient", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad2">
            <stop offset="0%" stop-color="#FFE66D" />
            <stop offset="100%" stop-color="#FF6B6B" />
          </radialGradient>
        </defs>
        <circle fill="url(#grad2)" cx="50" cy="50" r="40"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#FFE66D");
    expect(result).not.toContain("#FF6B6B");
    expect(result).toContain("url(#grad2)");
  });

  it("should handle stop-color in style attribute", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad3">
            <stop offset="0%" style="stop-color:#6750A4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D0BCFF;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect fill="url(#grad3)" width="100" height="50"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#6750A4");
    expect(result).not.toContain("#D0BCFF");
  });
});

describe("recolorizeSvg - Pattern support", () => {
  it("should recolorize colors inside pattern elements", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pattern1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#FF6B6B" />
            <rect x="10" y="0" width="10" height="10" fill="#4ECDC4" />
          </pattern>
        </defs>
        <rect fill="url(#pattern1)" width="100" height="100"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#FF6B6B");
    expect(result).not.toContain("#4ECDC4");
    expect(result).toContain("url(#pattern1)");
  });

  it("should recolorize stroke colors inside patterns", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pattern2" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="10" fill="#6750A4" stroke="#D0BCFF" stroke-width="2" />
          </pattern>
        </defs>
        <circle fill="url(#pattern2)" cx="50" cy="50" r="40"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).toContain("var(--mcu-");
    expect(result).not.toContain("#6750A4");
    expect(result).not.toContain("#D0BCFF");
  });
});

describe("recolorizeSvg - Complex features", () => {
  it("should handle nested patterns with gradients", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nestedGrad">
            <stop offset="0%" stop-color="#FF6B6B" />
            <stop offset="100%" stop-color="#4ECDC4" />
          </linearGradient>
          <pattern id="nestedPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="url(#nestedGrad)" />
            <circle cx="10" cy="10" r="5" fill="#FFE66D" />
          </pattern>
        </defs>
        <rect fill="url(#nestedPattern)" width="100" height="100"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    // Gradient stops should be recolorized
    expect(result).not.toContain("#FF6B6B");
    expect(result).not.toContain("#4ECDC4");
    expect(result).not.toContain("#FFE66D");

    // References should be preserved
    expect(result).toContain("url(#nestedGrad)");
    expect(result).toContain("url(#nestedPattern)");
  });

  it("should handle shapes in <defs> referenced via <use>", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="complexShape">
            <circle cx="0" cy="0" r="15" fill="#FF6B6B" />
            <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#4ECDC4" stroke-width="2" />
          </g>
        </defs>
        <use href="#complexShape" x="50" y="50" />
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    expect(result).not.toContain("#FF6B6B");
    expect(result).not.toContain("#4ECDC4");
  });

  it("should preserve gradient opacity values", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradWithOpacity">
            <stop offset="0%" stop-color="#6750A4" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#D0BCFF" stop-opacity="0.3" />
          </radialGradient>
        </defs>
        <circle fill="url(#gradWithOpacity)" cx="50" cy="50" r="35"/>
      </svg>
    `;
    const result = recolorizeSvg(svg, mockPalettes);

    // Color should be recolorized but opacity preserved
    expect(result).toContain('stop-opacity="0.8"');
    expect(result).toContain('stop-opacity="0.3"');
    expect(result).not.toContain("#6750A4");
    expect(result).not.toContain("#D0BCFF");
  });
});

describe("recolorizeSvg - Edge cases", () => {
  it("should handle empty SVG", () => {
    const svg = `<svg></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);
    expect(result).toContain("<svg");
  });

  it("should handle SVG with no colors", () => {
    const svg = `<svg><rect width="100" height="100" fill="none"/></svg>`;
    const result = recolorizeSvg(svg, mockPalettes);
    expect(result).toContain('fill="none"');
  });

  it("should handle malformed SVG gracefully", () => {
    const svg = `<svg><notvalid`;
    const result = recolorizeSvg(svg, mockPalettes);
    // Should return original on parser error
    expect(result).toBe(svg);
  });
});
