import { Hct, hexFromArgb } from "@material/material-color-utilities";

/**
 * Converts HCT color to LAB color space
 * LAB is required for Delta E calculations
 */
export function hctToLab(hct: Hct): { L: number; A: number; B: number } {
  // HCT internally uses sRGB
  // Convert HCT → ARGB → RGB → XYZ → LAB
  
  const argb = hct.toInt();
  
  // Extract RGB components
  const r = ((argb >> 16) & 0xff) / 255;
  const g = ((argb >> 8) & 0xff) / 255;
  const b = (argb & 0xff) / 255;
  
  // Convert sRGB to linear RGB
  const linearR = srgbToLinear(r);
  const linearG = srgbToLinear(g);
  const linearB = srgbToLinear(b);
  
  // Convert linear RGB to XYZ (using D65 illuminant)
  // Matrix from http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  let x = linearR * 0.4124564 + linearG * 0.3575761 + linearB * 0.1804375;
  let y = linearR * 0.2126729 + linearG * 0.7151522 + linearB * 0.0721750;
  let z = linearR * 0.0193339 + linearG * 0.1191920 + linearB * 0.9503041;
  
  // Normalize by D65 white point
  x = x / 0.95047;
  y = y / 1.00000;
  z = z / 1.08883;
  
  // Convert XYZ to LAB
  const fx = xyzToLabComponent(x);
  const fy = xyzToLabComponent(y);
  const fz = xyzToLabComponent(z);
  
  const L = 116 * fy - 16;
  const A = 500 * (fx - fy);
  const B = 200 * (fy - fz);
  
  return { L, A, B };
}

/**
 * Convert sRGB component (0-1) to linear RGB
 */
function srgbToLinear(c: number): number {
  if (c <= 0.04045) {
    return c / 12.92;
  }
  return Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * XYZ to LAB component conversion
 */
function xyzToLabComponent(t: number): number {
  const delta = 6 / 29;
  if (t > delta ** 3) {
    return Math.pow(t, 1 / 3);
  }
  return t / (3 * delta ** 2) + 4 / 29;
}

/**
 * Simple test to verify conversion works
 */
export function testHctToLab() {
  // Test with known values
  const white = Hct.from(0, 0, 100);
  const whiteLab = hctToLab(white);
  console.log("White LAB:", whiteLab); // Should be close to L=100, A=0, B=0
  
  const black = Hct.from(0, 0, 0);
  const blackLab = hctToLab(black);
  console.log("Black LAB:", blackLab); // Should be close to L=0, A=0, B=0
  
  const red = Hct.from(0, 80, 50);
  const redLab = hctToLab(red);
  console.log("Red LAB:", redLab); // Should have positive A, near-zero B
}
