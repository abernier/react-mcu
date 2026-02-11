import { kebabCase } from "lodash-es";
import { STANDARD_TONES } from "../Mcu";
import type { useMcu } from "../Mcu.context";

/**
 * AI service providers supported for SVG analysis
 */
export type AIProvider = "openai" | "anthropic" | "custom";

/**
 * Configuration for AI-powered SVG recolorization
 */
export interface AIRecolorizationConfig {
  /**
   * AI provider to use for semantic analysis
   */
  provider: AIProvider;

  /**
   * API key for the AI service
   */
  apiKey: string;

  /**
   * Optional: API endpoint (for custom providers)
   */
  apiEndpoint?: string;

  /**
   * Optional: Model to use (e.g., "gpt-4o", "claude-3-5-sonnet-20241022")
   */
  model?: string;

  /**
   * Optional: Custom prompt to guide the AI
   */
  customPrompt?: string;
}

/**
 * Semantic role mapping from AI understanding to palette selection
 */
interface ElementRole {
  selector: string; // CSS selector to identify the element (e.g., "circle[cx='50']")
  role: string; // Semantic role (e.g., "primary-object", "background", "accent")
  description: string; // AI's description of the element
}

/**
 * Role to palette mapping strategy
 */
const ROLE_TO_PALETTE_MAP: Record<string, string> = {
  "primary-object": "primary",
  "main-element": "primary",
  "focal-point": "primary",
  hero: "primary",
  background: "surface",
  "secondary-element": "secondary",
  "supporting-element": "secondary",
  accent: "tertiary",
  highlight: "tertiary",
  "decorative-element": "tertiary",
  error: "error",
  warning: "error",
  neutral: "neutral",
  "neutral-element": "neutral-variant",
  shadow: "neutral-variant",
  outline: "outline",
};

/**
 * AI-powered SVG recolorization using semantic understanding
 *
 * This function uses AI to understand the semantic meaning of SVG elements
 * and assigns colors based on their conceptual roles rather than just color distance.
 *
 * **How it works:**
 * 1. Converts SVG to a format suitable for AI analysis
 * 2. Sends the SVG to an AI service with a prompt to identify semantic roles
 * 3. AI responds with element identifications and their semantic roles
 * 4. Maps these roles to appropriate Material Color Utilities palettes
 * 5. Applies the color transformation
 *
 * **Example AI response:**
 * ```json
 * [
 *   {
 *     "selector": "circle[cx='50'][cy='50']",
 *     "role": "primary-object",
 *     "description": "Main focal circle, appears to be the hero element"
 *   },
 *   {
 *     "selector": "rect[width='200'][height='200']",
 *     "role": "background",
 *     "description": "Background rectangle"
 *   }
 * ]
 * ```
 *
 * @param svgString - The SVG content as a string
 * @param palettes - The palettes from MCU Context
 * @param aiConfig - Configuration for the AI service
 * @returns Promise resolving to recolorized SVG string
 *
 * @example
 * ```tsx
 * const recolorized = await recolorizeSvgWithAI(
 *   svgString,
 *   allPalettes,
 *   {
 *     provider: "openai",
 *     apiKey: process.env.OPENAI_API_KEY,
 *     model: "gpt-4o"
 *   }
 * );
 * ```
 */
export async function recolorizeSvgWithAI(
  svgString: string,
  palettes: ReturnType<typeof useMcu>["allPalettes"],
  aiConfig: AIRecolorizationConfig,
): Promise<string> {
  // 1. Parse SVG to DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("Invalid SVG input");
  }

  // 2. Convert SVG to base64 for AI analysis
  const svgBase64 = btoa(
    unescape(encodeURIComponent(new XMLSerializer().serializeToString(doc))),
  );
  const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;

  // 3. Prepare AI prompt
  const prompt =
    aiConfig.customPrompt ||
    `Analyze this SVG image and identify the semantic role of each visual element.
For each element, provide:
1. A CSS selector to identify it (using attributes like cx, cy, width, height, x, y)
2. Its semantic role (choose from: primary-object, main-element, focal-point, hero, background, secondary-element, supporting-element, accent, highlight, decorative-element, error, warning, neutral, neutral-element, shadow, outline)
3. A brief description of why you assigned this role

Respond ONLY with a JSON array in this exact format:
[
  {
    "selector": "circle[cx='50'][cy='50']",
    "role": "primary-object",
    "description": "Main focal circle"
  }
]

Focus on the most important elements. Group similar elements together when possible.`;

  // 4. Call AI service
  let elementRoles: ElementRole[];
  try {
    elementRoles = await callAIService(svgDataUrl, prompt, aiConfig);
  } catch (error) {
    console.error("AI service call failed:", error);
    throw new Error(
      `Failed to get AI analysis: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  // 5. Build palette mapping
  const paletteEntries = Object.entries(palettes).map(([name, palette]) => ({
    name,
    prefix: kebabCase(name),
    palette,
  }));

  // 6. Apply recolorization based on AI semantic understanding
  elementRoles.forEach((roleInfo) => {
    try {
      // Find elements matching the selector
      const elements = doc.querySelectorAll(roleInfo.selector);

      if (elements.length === 0) {
        console.warn(`No elements found for selector: ${roleInfo.selector}`);
        return;
      }

      // Map role to palette
      const paletteName = ROLE_TO_PALETTE_MAP[roleInfo.role] || "primary";
      const paletteEntry = paletteEntries.find((p) => p.name === paletteName);

      if (!paletteEntry) {
        console.warn(`Palette not found for role: ${roleInfo.role}`);
        return;
      }

      // Apply colors to matched elements
      elements.forEach((el) => {
        // For each element, analyze its current fill/stroke and map to appropriate tone
        ["fill", "stroke", "stop-color"].forEach((attr) => {
          const currentValue = el.getAttribute(attr);
          if (currentValue && currentValue !== "none") {
            // Use middle tone (50) as default, could be enhanced with brightness analysis
            const tone = determineToneFromBrightness(currentValue);
            const cssVar = `var(--mcu-${paletteEntry.prefix}-${tone})`;
            el.setAttribute(attr, cssVar);
          }
        });

        // Handle inline styles
        if (el.hasAttribute("style")) {
          const style = el.getAttribute("style");
          if (style) {
            const recolorizedStyle = style.replace(
              /(fill|stroke|stop-color)\s*:\s*([^;]+)/g,
              (match, prop, colorValue) => {
                const tone = determineToneFromBrightness(colorValue.trim());
                return `${prop}: var(--mcu-${paletteEntry.prefix}-${tone})`;
              },
            );
            el.setAttribute("style", recolorizedStyle);
          }
        }
      });

      console.log(
        `Applied ${paletteName} palette to ${elements.length} element(s) with role: ${roleInfo.role}`,
      );
    } catch (error) {
      console.error(
        `Error processing role ${roleInfo.role} with selector ${roleInfo.selector}:`,
        error,
      );
    }
  });

  return new XMLSerializer().serializeToString(doc);
}

/**
 * Call the AI service to analyze the SVG
 */
async function callAIService(
  svgDataUrl: string,
  prompt: string,
  config: AIRecolorizationConfig,
): Promise<ElementRole[]> {
  switch (config.provider) {
    case "openai":
      return callOpenAI(svgDataUrl, prompt, config);
    case "anthropic":
      return callAnthropic(svgDataUrl, prompt, config);
    case "custom":
      if (!config.apiEndpoint) {
        throw new Error("Custom provider requires apiEndpoint");
      }
      return callCustomAPI(svgDataUrl, prompt, config);
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}

/**
 * Call OpenAI API (GPT-4 Vision)
 */
async function callOpenAI(
  svgDataUrl: string,
  prompt: string,
  config: AIRecolorizationConfig,
): Promise<ElementRole[]> {
  const model = config.model || "gpt-4o";
  const endpoint =
    config.apiEndpoint || "https://api.openai.com/v1/chat/completions";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: svgDataUrl } },
          ],
        },
      ],
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in OpenAI response");
  }

  return parseAIResponse(content);
}

/**
 * Call Anthropic API (Claude)
 */
async function callAnthropic(
  svgDataUrl: string,
  prompt: string,
  config: AIRecolorizationConfig,
): Promise<ElementRole[]> {
  const model = config.model || "claude-3-5-sonnet-20241022";
  const endpoint =
    config.apiEndpoint || "https://api.anthropic.com/v1/messages";

  // Extract base64 data from data URL
  const base64Data = svgDataUrl.split(",")[1];

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/svg+xml",
                data: base64Data,
              },
            },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;

  if (!content) {
    throw new Error("No content in Anthropic response");
  }

  return parseAIResponse(content);
}

/**
 * Call custom API endpoint
 */
async function callCustomAPI(
  svgDataUrl: string,
  prompt: string,
  config: AIRecolorizationConfig,
): Promise<ElementRole[]> {
  const response = await fetch(config.apiEndpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      svg: svgDataUrl,
      prompt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Custom API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return parseAIResponse(data.analysis || data.content || JSON.stringify(data));
}

/**
 * Parse AI response and extract element roles
 */
function parseAIResponse(content: string): ElementRole[] {
  // Try to extract JSON from the response
  // AI might wrap it in markdown code blocks or add extra text
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Could not find JSON array in AI response");
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) {
      throw new Error("AI response is not an array");
    }

    // Validate structure
    return parsed.filter((item) => {
      return (
        typeof item.selector === "string" &&
        typeof item.role === "string" &&
        typeof item.description === "string"
      );
    });
  } catch (error) {
    throw new Error(
      `Failed to parse AI response: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Determine appropriate tone based on color brightness
 * Darker colors -> higher tone numbers
 * Lighter colors -> lower tone numbers
 */
function determineToneFromBrightness(colorValue: string): number {
  // Simple heuristic: parse hex colors and calculate brightness
  let r = 0,
    g = 0,
    b = 0;

  if (colorValue.startsWith("#")) {
    const hex = colorValue.replace("#", "");
    if (hex.length === 3) {
      r = parseInt(hex[0]! + hex[0]!, 16);
      g = parseInt(hex[1]! + hex[1]!, 16);
      b = parseInt(hex[2]! + hex[2]!, 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (colorValue.startsWith("rgb")) {
    const matches = colorValue.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0]!);
      g = parseInt(matches[1]!);
      b = parseInt(matches[2]!);
    }
  }

  // Calculate relative luminance (simplified)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Map brightness (0-255) to tone (0-100)
  // Invert: brighter colors should have lower tone numbers
  const normalizedBrightness = brightness / 255;
  const tone = Math.round((1 - normalizedBrightness) * 100);

  // Snap to standard tones
  const closestTone = STANDARD_TONES.reduce((prev, curr) =>
    Math.abs(curr - tone) < Math.abs(prev - tone) ? curr : prev,
  );

  return closestTone;
}
