import { Hct } from "@material/material-color-utilities";

/**
 * Convert HCT color to LAB color space
 * HCT → RGB → XYZ → LAB
 *
 * @param hct - The HCT color to convert
 * @returns LAB color object with L, A, B properties (uppercase as per delta-e interface)
 */
export function hctToLab(hct: Hct): { L: number; A: number; B: number } {
  // Convert HCT to ARGB
  const argb = hct.toInt();

  // Extract RGB components (0-255)
  const r = (argb >> 16) & 0xff;
  const g = (argb >> 8) & 0xff;
  const b = argb & 0xff;

  // Convert RGB to XYZ
  const xyz = rgbToXyz(r, g, b);

  // Convert XYZ to LAB
  return xyzToLab(xyz.x, xyz.y, xyz.z);
}

/**
 * Convert RGB (0-255) to XYZ color space
 * Uses sRGB color space with D65 illuminant
 */
function rgbToXyz(
  r: number,
  g: number,
  b: number,
): { x: number; y: number; z: number } {
  // Normalize to 0-1
  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;

  // Apply sRGB gamma correction (inverse companding)
  rNorm =
    rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
  gNorm =
    gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
  bNorm =
    bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

  // Convert to XYZ using sRGB matrix (D65 illuminant)
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
  const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.072175;
  const z = rNorm * 0.0193339 + gNorm * 0.119192 + bNorm * 0.9503041;

  // Scale to D65 reference white (X=95.047, Y=100.000, Z=108.883)
  return {
    x: x * 100,
    y: y * 100,
    z: z * 100,
  };
}

/**
 * Convert XYZ to LAB color space
 * Uses D65 illuminant reference white
 */
function xyzToLab(
  x: number,
  y: number,
  z: number,
): { L: number; A: number; B: number } {
  // D65 reference white
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  // Normalize
  let xNorm = x / refX;
  let yNorm = y / refY;
  let zNorm = z / refZ;

  // Apply LAB transformation function
  const f = (t: number) => {
    const delta = 6 / 29;
    return t > delta ** 3 ? Math.pow(t, 1 / 3) : t / (3 * delta ** 2) + 4 / 29;
  };

  xNorm = f(xNorm);
  yNorm = f(yNorm);
  zNorm = f(zNorm);

  // Calculate LAB components (use uppercase A, B for delta-e compatibility)
  const L = 116 * yNorm - 16;
  const A = 500 * (xNorm - yNorm);
  const B = 200 * (yNorm - zNorm);

  return { L, A, B };
}
