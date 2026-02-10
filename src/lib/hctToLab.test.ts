import { describe, it, expect } from "vitest";
import { Hct } from "@material/material-color-utilities";
import { hctToLab } from "./hctToLab";

describe("hctToLab", () => {
  it("should convert HCT to LAB color space", () => {
    // Test with a known color (blue)
    const blue = Hct.fromInt(0xff0000ff); // Pure blue in ARGB
    const lab = hctToLab(blue);

    // LAB values should be within reasonable ranges
    expect(lab.L).toBeGreaterThanOrEqual(0);
    expect(lab.L).toBeLessThanOrEqual(100);
    expect(lab.A).toBeGreaterThan(-128);
    expect(lab.A).toBeLessThan(128);
    expect(lab.B).toBeGreaterThan(-128);
    expect(lab.B).toBeLessThan(128);

    // Blue should have negative B value (towards blue on the yellow-blue axis)
    expect(lab.B).toBeLessThan(0);
  });

  it("should convert white to LAB with high L value", () => {
    const white = Hct.fromInt(0xffffffff); // Pure white in ARGB
    const lab = hctToLab(white);

    // White should have L close to 100 (allowing for floating-point precision)
    expect(lab.L).toBeGreaterThan(90);
    expect(lab.L).toBeLessThan(101);

    // White should have A and B close to 0 (neutral)
    expect(Math.abs(lab.A)).toBeLessThan(5);
    expect(Math.abs(lab.B)).toBeLessThan(5);
  });

  it("should convert black to LAB with low L value", () => {
    const black = Hct.fromInt(0xff000000); // Pure black in ARGB
    const lab = hctToLab(black);

    // Black should have L close to 0
    expect(lab.L).toBeLessThan(10);
    expect(lab.L).toBeGreaterThanOrEqual(0);

    // Black should have A and B close to 0 (neutral)
    expect(Math.abs(lab.A)).toBeLessThan(5);
    expect(Math.abs(lab.B)).toBeLessThan(5);
  });

  it("should convert red to LAB with positive A value", () => {
    const red = Hct.fromInt(0xffff0000); // Pure red in ARGB
    const lab = hctToLab(red);

    // Red should have positive A value (towards red on the green-red axis)
    expect(lab.A).toBeGreaterThan(0);
  });

  it("should return LAB object with uppercase A and B properties", () => {
    const color = Hct.fromInt(0xff6750a4); // Material You primary
    const lab = hctToLab(color);

    // Verify the object has the correct property names (uppercase)
    expect(lab).toHaveProperty("L");
    expect(lab).toHaveProperty("A");
    expect(lab).toHaveProperty("B");
  });
});
