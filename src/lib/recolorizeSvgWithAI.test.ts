import { TonalPalette } from "@material/material-color-utilities";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  recolorizeSvgWithAI,
  type AIRecolorizationConfig,
} from "./recolorizeSvgWithAI";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

// Sample SVG for testing
const sampleSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#F5F5F5"/>
  <circle cx="50" cy="50" r="30" fill="#ffaf1e"/>
  <circle cx="150" cy="50" r="20" fill="#faa11c"/>
</svg>
`;

// Mock palettes
const mockPalettes = {
  primary: TonalPalette.fromInt(0xff6750a4),
  secondary: TonalPalette.fromInt(0xff625b71),
  tertiary: TonalPalette.fromInt(0xff7d5260),
  neutral: TonalPalette.fromInt(0xff605d62),
  "neutral-variant": TonalPalette.fromInt(0xff625f66),
  surface: TonalPalette.fromInt(0xff605d62),
};

describe("recolorizeSvgWithAI", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("OpenAI provider", () => {
    it("should successfully recolorize SVG using OpenAI", async () => {
      const mockAIResponse = [
        {
          selector: "rect[width='200'][height='200']",
          role: "background",
          description: "Background rectangle",
        },
        {
          selector: "circle[cx='50'][cy='50']",
          role: "primary-object",
          description: "Main focal circle",
        },
        {
          selector: "circle[cx='150'][cy='50']",
          role: "secondary-element",
          description: "Secondary circle",
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

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "test-key",
        model: "gpt-4o",
      };

      const result = await recolorizeSvgWithAI(sampleSvg, mockPalettes, config);

      // Check that fetch was called
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Check that the result is a string containing SVG
      expect(result).toContain("<svg");
      expect(result).toContain("</svg>");

      // Check that CSS variables were applied
      expect(result).toContain("--mcu-");
    });

    it("should handle OpenAI API errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      });

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "invalid-key",
      };

      await expect(
        recolorizeSvgWithAI(sampleSvg, mockPalettes, config),
      ).rejects.toThrow("OpenAI API error");
    });
  });

  describe("Anthropic provider", () => {
    it("should successfully recolorize SVG using Anthropic", async () => {
      const mockAIResponse = [
        {
          selector: "rect[width='200'][height='200']",
          role: "background",
          description: "Background element",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          content: [
            {
              text: JSON.stringify(mockAIResponse),
            },
          ],
        }),
      });

      const config: AIRecolorizationConfig = {
        provider: "anthropic",
        apiKey: "test-key",
        model: "claude-3-5-sonnet-20241022",
      };

      const result = await recolorizeSvgWithAI(sampleSvg, mockPalettes, config);

      // Check that fetch was called
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Verify the request was made to Anthropic's endpoint
      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall?.[0]).toContain("anthropic.com");

      // Check that the result is valid SVG
      expect(result).toContain("<svg");
      expect(result).toContain("</svg>");
    });

    it("should handle Anthropic API errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        text: async () => "Rate limit exceeded",
      });

      const config: AIRecolorizationConfig = {
        provider: "anthropic",
        apiKey: "test-key",
      };

      await expect(
        recolorizeSvgWithAI(sampleSvg, mockPalettes, config),
      ).rejects.toThrow("Anthropic API error");
    });
  });

  describe("Custom provider", () => {
    it("should successfully recolorize SVG using custom API", async () => {
      const mockAIResponse = [
        {
          selector: "circle[cx='50']",
          role: "primary-object",
          description: "Primary circle",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysis: JSON.stringify(mockAIResponse),
        }),
      });

      const config: AIRecolorizationConfig = {
        provider: "custom",
        apiKey: "test-key",
        apiEndpoint: "https://custom-ai.example.com/analyze",
      };

      const result = await recolorizeSvgWithAI(sampleSvg, mockPalettes, config);

      // Check that fetch was called with custom endpoint
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall?.[0]).toBe("https://custom-ai.example.com/analyze");

      expect(result).toContain("<svg");
    });

    it("should require apiEndpoint for custom provider", async () => {
      const config: AIRecolorizationConfig = {
        provider: "custom",
        apiKey: "test-key",
        // Missing apiEndpoint
      };

      await expect(
        recolorizeSvgWithAI(sampleSvg, mockPalettes, config),
      ).rejects.toThrow("Custom provider requires apiEndpoint");
    });
  });

  describe("Error handling", () => {
    it("should throw error for invalid SVG", async () => {
      const invalidSvg = "<svg><invalid></svg>";

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "test-key",
      };

      await expect(
        recolorizeSvgWithAI(invalidSvg, mockPalettes, config),
      ).rejects.toThrow("Invalid SVG input");
    });

    it("should handle malformed AI response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: "This is not valid JSON",
              },
            },
          ],
        }),
      });

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "test-key",
      };

      await expect(
        recolorizeSvgWithAI(sampleSvg, mockPalettes, config),
      ).rejects.toThrow("Could not find JSON array");
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "test-key",
      };

      await expect(
        recolorizeSvgWithAI(sampleSvg, mockPalettes, config),
      ).rejects.toThrow("Failed to get AI analysis");
    });
  });

  describe("Custom prompts", () => {
    it("should use custom prompt when provided", async () => {
      const mockAIResponse = [
        {
          selector: "circle",
          role: "primary-object",
          description: "Circle",
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

      const customPrompt = "Analyze this SVG with special attention to shapes.";

      const config: AIRecolorizationConfig = {
        provider: "openai",
        apiKey: "test-key",
        customPrompt,
      };

      await recolorizeSvgWithAI(sampleSvg, mockPalettes, config);

      // Verify that the custom prompt was sent
      const fetchCall = mockFetch.mock.calls[0];
      const requestBody = JSON.parse(fetchCall?.[1]?.body);
      expect(requestBody.messages[0].content[0].text).toBe(customPrompt);
    });
  });
});
