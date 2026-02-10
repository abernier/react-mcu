import {
  argbFromHex,
  Hct,
  type TonalPalette,
} from "@material/material-color-utilities";
import { kebabCase } from "lodash-es";
import { STANDARD_TONES } from "../Mcu";
import type { useMcu } from "../Mcu.context";

/**
 * Options for recolorizeSvg
 */
export type RecolorizeSvgOptions = {
  /**
   * Tone matching tolerance (default: 15.0)
   */
  tolerance?: number;
};

/**
 * Ultra-optimized SVG recoloring that consumes directly the palettes from the MCU Context.
 * This version reuses pre-computed palettes for maximum performance and perfect synchronization.
 *
 * **Matching Algorithm:**
 * Uses a score-based approach instead of aggressive filtering to find the best palette match.
 * The algorithm calculates a distance score based on:
 * - Tone distance (most important)
 * - Chroma distance (medium importance)
 * - Hue distance for colored palettes (least important)
 * - Bonus for matching neutral/colored nature
 *
 * This ensures colored SVG elements match to colored palettes (primary, secondary, tertiary, custom)
 * rather than falling back to neutral-variant unnecessarily.
 *
 * To filter palettes, pass a filtered subset of palettes as the second parameter.
 *
 * @param svgString - The SVG content as a string
 * @param palettes - The palettes to use for recoloring. Filter externally if needed.
 * @param options - Optional configuration for tolerance
 * @returns Recolorized SVG string with MCU CSS variables
 *
 * @example
 * // Use all palettes
 * recolorizeSvg(svg, allPalettes)
 *
 * @example
 * // Filter palettes externally
 * const filteredPalettes = { primary: allPalettes.primary, secondary: allPalettes.secondary };
 * recolorizeSvg(svg, filteredPalettes)
 *
 * @example
 * // Use custom tolerance
 * recolorizeSvg(svg, allPalettes, { tolerance: 20 })
 */
export function recolorizeSvg(
  svgString: string,
  palettes: ReturnType<typeof useMcu>["allPalettes"],
  options: RecolorizeSvgOptions = {},
): string {
  const { tolerance = 15.0 } = options;

  // 1. PREPARE CANDIDATES (Super fast as palettes are already ready)
  const candidates = Object.entries(palettes).map(([name, palette]) => {
    // Sample a representative color (tone 50) to get the palette's hue
    const midHct = Hct.fromInt(palette.tone(50));

    // Auto-detect neutrals based on name or chroma
    const isNeutral = name.includes("neutral") || midHct.chroma < 5;

    return {
      prefix: kebabCase(name), // "neutral-variant", "custom-sand"
      palette: palette,
      sourceHue: midHct.hue,
      isNeutral,
    };
  });
  console.log(`Prepared candidate palettes`, candidates);

  // 2. THE CACHE (To avoid recalculating the same pixel 50 times)
  const tokenCache = new Map<string, string>();

  // 3. SEARCH FUNCTION (Uses prepared candidates)
  const findBestToken = (hexInput: string) => {
    if (!hexInput || hexInput === "none" || hexInput.startsWith("url"))
      return null;
    if (tokenCache.has(hexInput)) return tokenCache.get(hexInput)!;

    let targetHct;
    try {
      targetHct = Hct.fromInt(argbFromHex(hexInput));
    } catch {
      return null;
    }

    // NEW APPROACH: Score-based matching instead of aggressive filtering
    // We calculate a distance score for each candidate and pick the best one
    let bestToken = null;
    let bestScore = Infinity;

    for (const c of candidates) {
      // Determine if we should prefer this palette based on chroma similarity
      const targetIsNeutral = targetHct.chroma < 8;
      const paletteIsNeutral = c.isNeutral;

      // Calculate hue distance (0-180 degrees, accounting for circular nature)
      const hueDiff = Math.abs(targetHct.hue - c.sourceHue);
      const normalizedHueDiff = Math.min(hueDiff, 360 - hueDiff);

      // TONE MATCHING with scoring
      for (const tone of STANDARD_TONES) {
        const toneHct = Hct.fromInt(c.palette.tone(tone));

        // Calculate component distances
        const toneDist = Math.abs(targetHct.tone - toneHct.tone);
        const chromaDist = Math.abs(targetHct.chroma - toneHct.chroma);

        // Skip if tone is too far (still apply tolerance)
        if (toneDist > tolerance) continue;

        // Calculate overall score (lower is better)
        let score = toneDist; // Tone distance is most important

        // Add chroma penalty (less important than tone)
        score += chromaDist * 0.3;

        // Add hue penalty for colored palettes (even less important)
        if (!targetIsNeutral && !paletteIsNeutral) {
          score += normalizedHueDiff * 0.2;
        }

        // Bonus for matching neutral/colored nature
        if (targetIsNeutral === paletteIsNeutral) {
          score *= 0.8; // 20% bonus
        } else {
          score *= 1.5; // 50% penalty for mismatched nature
        }

        if (score < bestScore) {
          bestScore = score;
          bestToken = `var(--mcu-${c.prefix}-${tone})`;
        }
      }
    }

    // FALLBACK (If no match found at all, default to neutral-variant)
    if (!bestToken) {
      let bestTone = 50;
      let minToneDist = Infinity;
      STANDARD_TONES.forEach((t) => {
        const dist = Math.abs(targetHct.tone - t);
        if (dist < minToneDist) {
          minToneDist = dist;
          bestTone = t;
        }
      });
      bestToken = `var(--mcu-neutral-variant-${bestTone})`;
    }

    tokenCache.set(hexInput, bestToken);
    console.log("bestToken", { hexInput, bestToken, bestScore });
    return bestToken;
  };

  // 4. DOM PARSING (Standard)
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  if (doc.querySelector("parsererror")) return svgString;

  doc.querySelectorAll("*").forEach((el) => {
    ["fill", "stroke", "stop-color"].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (val) {
        const token = findBestToken(val);
        if (token) el.setAttribute(attr, token);
      }
    });

    // Handle inline style
    if (el.hasAttribute("style")) {
      const style = el.getAttribute("style");
      if (style) {
        const recolorizedStyle = style.replace(
          /(fill|stroke|stop-color)\s*:\s*(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/g,
          (match, prop, colorValue) => {
            // Convert rgb/rgba to hex if needed
            let hexValue = colorValue;
            if (colorValue.startsWith("rgb")) {
              const rgbMatch = colorValue.match(/\d+/g);
              if (rgbMatch && rgbMatch.length >= 3) {
                const r = parseInt(rgbMatch[0]);
                const g = parseInt(rgbMatch[1]);
                const b = parseInt(rgbMatch[2]);
                // Ensure each channel is padded to 2 hex digits
                hexValue = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
              }
            }
            const token = findBestToken(hexValue);
            return token ? `${prop}: ${token}` : match;
          },
        );
        el.setAttribute("style", recolorizedStyle);
      }
    }
  });

  return new XMLSerializer().serializeToString(doc);
}
