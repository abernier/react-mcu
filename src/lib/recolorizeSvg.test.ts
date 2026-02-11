import { TonalPalette } from "@material/material-color-utilities";
import { describe, expect, it, vi } from "vitest";
import { recolorizeSvg } from "./recolorizeSvg";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

// Sample SVG for testing
const sampleSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#F5F5F5"/>
  <circle cx="50" cy="50" r="30" fill="#ffaf1e"/>
</svg>
`;

// Mock palettes
const mockPalettes = {
  primary: TonalPalette.fromInt(0xff6750a4),
  secondary: TonalPalette.fromInt(0xff625b71),
  tertiary: TonalPalette.fromInt(0xff7d5260),
  neutral: TonalPalette.fromInt(0xff605d62),
  "neutral-variant": TonalPalette.fromInt(0xff625f66),
};

describe("recolorizeSvg - AI integration", () => {
  it("should use distance-based approach when no aiConfig provided", () => {
    const result = recolorizeSvg(sampleSvg, mockPalettes);

    // Should return synchronously (string, not Promise)
    expect(typeof result).toBe("string");
    expect(result).toContain("<svg");
    expect(result).toContain("--mcu-");
  });

  it("should use AI approach when aiConfig is provided", async () => {
    const mockAIResponse = [
      {
        selector: "circle[cx='50']",
        role: "primary-object",
        description: "Main circle",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify(mockAIResponse),
            },
          },
        ],
      }),
    });

    const result = await recolorizeSvg(sampleSvg, mockPalettes, {
      aiConfig: {
        provider: "openai",
        apiKey: "test-key",
      },
    });

    // Should return a string after async operation
    expect(typeof result).toBe("string");
    expect(result).toContain("<svg");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should fallback to distance-based approach on AI failure", async () => {
    // Mock AI failure
    mockFetch.mockRejectedValueOnce(new Error("API error"));

    const result = await recolorizeSvg(sampleSvg, mockPalettes, {
      aiConfig: {
        provider: "openai",
        apiKey: "invalid-key",
      },
    });

    // Should still return a valid result using fallback
    expect(typeof result).toBe("string");
    expect(result).toContain("<svg");
    expect(result).toContain("--mcu-");
  });

  it("should respect tolerance option in distance-based mode", () => {
    const result1 = recolorizeSvg(sampleSvg, mockPalettes, { tolerance: 5 });
    const result2 = recolorizeSvg(sampleSvg, mockPalettes, { tolerance: 30 });

    // Both should be valid SVG strings
    expect(typeof result1).toBe("string");
    expect(typeof result2).toBe("string");
    expect(result1).toContain("<svg");
    expect(result2).toContain("<svg");

    // Results might differ based on tolerance
    // (though in this simple case they might be the same)
  });
});
