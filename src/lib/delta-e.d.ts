declare module "delta-e" {
  export interface LabColor {
    L: number;
    A: number;
    B: number;
  }

  export class DeltaE {
    /**
     * Calculate Delta E using CIE76 formula
     */
    getDeltaE76(lab1: LabColor, lab2: LabColor): number;

    /**
     * Calculate Delta E using CIE94 formula
     */
    getDeltaE94(lab1: LabColor, lab2: LabColor): number;

    /**
     * Calculate Delta E using CIEDE2000 formula
     * This is the most accurate perceptual color difference metric
     */
    getDeltaE00(lab1: LabColor, lab2: LabColor): number;
  }

  export = DeltaE;
}
