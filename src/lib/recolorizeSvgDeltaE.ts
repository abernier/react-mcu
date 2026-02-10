import {
  argbFromHex,
  Hct,
  type TonalPalette,
} from "@material/material-color-utilities";
import { kebabCase } from "lodash-es";
import { STANDARD_TONES } from "../Mcu";
import { hctToLab } from "./colorConversions";

// Import delta-e using require for CommonJS compatibility
// @ts-ignore
const DeltaE = require("delta-e");

/**
 * Options for recolorizeSvgWithDeltaE
 */
export type RecolorizeSvgDeltaEOptions = {
  /**
   * Maximum Delta E distance to consider a match (default: 20.0)
   * Delta E < 1: Not perceptible by human eyes
   * Delta E 1-2: Perceptible through close observation
   * Delta E 2-10: Perceptible at a glance
   * Delta E 11-49: Colors are more similar than opposite
   * Delta E 100: Colors are exact opposite
   */
  maxDeltaE?: number;
};

/**
 * SVG recoloring using CIEDE2000 (Delta E) color distance algorithm.
 * This is the industry-standard perceptual color difference metric.
 *
 * **Advantages over custom scoring:**
 * - Scientifically validated to match human perception
 * - Industry standard (used in print, paint, textile industries)
 * - Better handling of edge cases (dark colors, near-neutrals, etc.)
 * - Reproducible results
 *
 * **Algorithm:**
 * Uses CIEDE2000 to calculate perceptual distance between colors in LAB color space.
 * Lower Delta E = more similar colors.
 *
 * @param svgString - The SVG content as a string
 * @param palettes - The palettes to use for recoloring
 * @param options - Optional configuration
 * @returns Recolorized SVG string with MCU CSS variables
 *
 * @example
 * ```typescript
 * const { allPalettes } = useMcu();
 * const recoloredSvg = recolorizeSvgWithDeltaE(svgContent, allPalettes);
 * ```
 *
 * @example
 * ```typescript
 * // With custom max Delta E
 * const recoloredSvg = recolorizeSvgWithDeltaE(svgContent, allPalettes, { maxDeltaE: 15 });
 * ```
 */
export function recolorizeSvgWithDeltaE(
  svgString: string,
  palettes: Record<string, TonalPalette>,
  options: RecolorizeSvgDeltaEOptions = {},
): string {
  const { maxDeltaE = 20.0 } = options;

  // 1. PREPARE CANDIDATES
  const candidates = Object.entries(palettes).map(([name, palette]) => {
    const midHct = Hct.fromInt(palette.tone(50));
    const isNeutral = name.includes("neutral") || midHct.chroma < 5;

    return {
      prefix: kebabCase(name),
      palette: palette,
      sourceHue: midHct.hue,
      isNeutral,
    };
  });

  // 2. CACHE
  const tokenCache = new Map<string, string>();

  // 3. FIND BEST TOKEN USING DELTA E
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

    // Convert target to LAB for Delta E calculation
    const targetLab = hctToLab(targetHct);
    const targetIsNeutral = targetHct.chroma < 8;

    let bestToken = null;
    let bestScore = Infinity;

    for (const c of candidates) {
      // Evaluate all tones in this palette
      for (const tone of STANDARD_TONES) {
        const toneHct = Hct.fromInt(c.palette.tone(tone));
        const toneLab = hctToLab(toneHct);

        // Calculate perceptual color distance using CIEDE2000
        const distance = DeltaE.getDeltaE00(targetLab, toneLab);

        // Skip if too far
        if (distance > maxDeltaE) continue;

        // Calculate final score with neutral/colored bonus
        let score = distance;

        // Apply bonus/penalty for matching neutral/colored nature
        if (targetIsNeutral === c.isNeutral) {
          score *= 0.8; // 20% bonus for matching nature
        } else {
          score *= 1.5; // 50% penalty for mismatched nature
        }

        if (score < bestScore) {
          bestScore = score;
          bestToken = `var(--mcu-${c.prefix}-${tone})`;
        }
      }
    }

    // FALLBACK
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
    return bestToken;
  };

  // 4. DOM PARSING
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
            let hexValue = colorValue;
            if (colorValue.startsWith("rgb")) {
              const rgbMatch = colorValue.match(/\d+/g);
              if (rgbMatch && rgbMatch.length >= 3) {
                const r = parseInt(rgbMatch[0]);
                const g = parseInt(rgbMatch[1]);
                const b = parseInt(rgbMatch[2]);
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
