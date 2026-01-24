import { generateCss } from "../src/Mcu";

// Wait for the page to load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  // Check if this is a shadcn site by looking for --primary CSS variable
  const primaryColor = getShadcnPrimaryColor();

  if (!primaryColor) {
    console.log("[Shadcn MCU] No shadcn primary color found on this page");
    return;
  }

  console.log("[Shadcn MCU] Found shadcn primary color:", primaryColor);

  // Generate and inject MCU colors using existing generateCss function
  const { css } = generateCss({ source: primaryColor });

  // Inject the CSS into the page
  const styleId = "shadcn-mcu-colors";
  let styleEl = document.getElementById(styleId);

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = css;

  console.log("[Shadcn MCU] MCU colors injected successfully");
}

/**
 * Get the shadcn --primary color from the page
 * @returns {string|null} The primary color in hex format, or null if not found
 */
function getShadcnPrimaryColor() {
  // Get the computed style of the root element
  const rootStyles = getComputedStyle(document.documentElement);

  // Get the --primary variable value
  const primaryValue = rootStyles.getPropertyValue("--primary").trim();

  if (!primaryValue) {
    return null;
  }

  // shadcn uses HSL values like "222.2 47.4% 11.2%"
  // We need to convert this to hex
  if (primaryValue.includes("%")) {
    return hslToHex(primaryValue);
  }

  // If it's already a hex color
  if (primaryValue.startsWith("#")) {
    return primaryValue;
  }

  return null;
}

/**
 * Convert HSL string to hex color
 * @param {string} hslString - HSL string like "222.2 47.4% 11.2%"
 * @returns {string} Hex color like "#0e1216"
 */
function hslToHex(hslString) {
  const parts = hslString.split(/\s+/);
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
