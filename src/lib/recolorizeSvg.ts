import {
  argbFromHex,
  Hct,
  type TonalPalette,
} from "@material/material-color-utilities";
import { kebabCase } from "lodash-es";
import { STANDARD_TONES } from "../Mcu";

type Candidate = {
  prefix: string;
  palette: TonalPalette;
  sourceHue: number;
  isNeutral: boolean;
};

/**
 * Options for filtering palettes in recolorizeSvgDirect
 */
export type RecolorizeSvgOptions = {
  /**
   * Tone matching tolerance (default: 15.0)
   */
  tolerance?: number;
  /**
   * List of palette names to include. If specified, only these palettes will be used.
   * Cannot be used together with `exclude`.
   */
  include?: string[];
  /**
   * List of palette names to exclude. If specified, all palettes except these will be used.
   * Cannot be used together with `include`.
   */
  exclude?: string[];
};

/**
 * Ultra-optimized SVG recoloring that consumes directly the palettes from the MCU Context.
 * This version reuses pre-computed palettes for maximum performance and perfect synchronization.
 *
 * @param svgString - The SVG content as a string
 * @param palettes - The allPalettes object from useMcu() hook
 * @param options - Optional configuration for tolerance and palette filtering
 * @returns Recolorized SVG string with MCU CSS variables
 *
 * @example
 * // Use all palettes (default)
 * recolorizeSvgDirect(svg, allPalettes)
 *
 * @example
 * // Use only specific palettes
 * recolorizeSvgDirect(svg, allPalettes, { include: ['primary', 'secondary'] })
 *
 * @example
 * // Use all palettes except specific ones
 * recolorizeSvgDirect(svg, allPalettes, { exclude: ['error', 'neutral'] })
 *
 * @example
 * // Use all palettes with custom tolerance
 * recolorizeSvgDirect(svg, allPalettes, { tolerance: 20 })
 */
export function recolorizeSvgDirect(
  svgString: string,
  palettes: Record<string, TonalPalette>,
  options: RecolorizeSvgOptions = {},
): string {
  const { tolerance = 15.0, include, exclude } = options;

  // Validate that include and exclude are not both specified
  if (include && exclude) {
    throw new Error(
      "Cannot specify both 'include' and 'exclude' options. Use one or the other.",
    );
  }

  // Filter palettes based on include/exclude options
  let filteredPalettes: Record<string, TonalPalette>;
  if (include) {
    filteredPalettes = Object.fromEntries(
      Object.entries(palettes).filter(([name]) => include.includes(name)),
    );
  } else if (exclude) {
    filteredPalettes = Object.fromEntries(
      Object.entries(palettes).filter(([name]) => !exclude.includes(name)),
    );
  } else {
    // Use all palettes by default
    filteredPalettes = palettes;
  }
  // 1. PREPARE CANDIDATES (Super fast as palettes are already ready)
  const candidates: Candidate[] = Object.entries(filteredPalettes).map(
    ([name, palette]) => {
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
    },
  );

  // 2. THE CACHE (To avoid recalculating the same pixel 50 times)
  const tokenCache = new Map<string, string>();

  // 3. SEARCH FUNCTION (Uses prepared candidates)
  const findBestToken = (hexInput: string): string | null => {
    if (!hexInput || hexInput === "none" || hexInput.startsWith("url"))
      return null;
    if (tokenCache.has(hexInput)) return tokenCache.get(hexInput)!;

    let targetHct;
    try {
      targetHct = Hct.fromInt(argbFromHex(hexInput));
    } catch {
      return null;
    }

    let bestToken = null;
    let minDistance = Infinity;

    for (const c of candidates) {
      // FILTERING (Neutrals vs Colors)
      if (targetHct.chroma < 10) {
        if (!c.isNeutral) continue;
      } else if (c.isNeutral) {
        continue;
      } else {
        // HUE FILTERING (Hue)
        const hueDiff = Math.abs(targetHct.hue - c.sourceHue);
        const normalizedHueDiff = Math.min(hueDiff, 360 - hueDiff);
        if (normalizedHueDiff > 45) continue;
      }

      // TONE MATCHING
      for (const tone of STANDARD_TONES) {
        // Here, palette.tone(t) is instant (pure math), no object creation
        const toneHct = Hct.fromInt(c.palette.tone(tone));
        const dist = Math.abs(targetHct.tone - toneHct.tone);

        if (dist < minDistance && dist <= tolerance) {
          minDistance = dist;
          bestToken = `var(--mcu-${c.prefix}-${tone})`;
        }
      }
    }

    // FALLBACK (If failed, default to neutral-variant)
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
