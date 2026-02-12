import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { Mcu, STANDARD_TONES, exportTheme, tokenNames } from "./Mcu.js";

describe("Mcu", () => {
  afterEach(() => {
    cleanup();
    // Also manually remove any leftover style tags
    document.querySelectorAll("#mcu-styles").forEach((el) => el.remove());
  });

  it("should inject style tag with --mcu-* CSS variables", () => {
    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    // Check that the style tag exists
    const styleTag = document.querySelector("#mcu-styles");
    expect(styleTag).toBeTruthy();
    expect(styleTag?.tagName).toBe("STYLE");

    // Check that the style content includes CSS variables
    const styleContent = styleTag?.textContent || "";
    expect(styleContent).toContain("--mcu-primary");
    expect(styleContent).toContain("--mcu-on-primary");
    expect(styleContent).toContain("--mcu-surface");
    expect(styleContent).toContain("--mcu-background");
  });

  it("should remove custom color CSS variables when customColors are removed", () => {
    // First render with custom colors
    const { rerender } = render(
      <Mcu
        source="#6750A4"
        customColors={[
          { name: "brand", hex: "#FF5733", blend: true },
          { name: "success", hex: "#28A745", blend: false },
        ]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    // Check that custom color variables are present
    let styleTag = document.querySelector("#mcu-styles");
    let styleContent = styleTag?.textContent || "";

    expect(styleContent).toContain("--mcu-brand");
    expect(styleContent).toContain("--mcu-success");

    // Rerender with only one custom color (removing "success")
    rerender(
      <Mcu
        source="#6750A4"
        customColors={[{ name: "brand", hex: "#FF5733", blend: true }]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    // Check that "success" variables are removed
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    // "brand" should still be there
    expect(styleContent).toContain("--mcu-brand");

    // "success" should be gone
    expect(styleContent).not.toContain("--mcu-success");

    // Rerender with no custom colors (empty array)
    rerender(
      <Mcu source="#6750A4" customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    // Check that all custom color variables are removed
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    expect(styleContent).not.toContain("--mcu-brand");

    // Rerender without customColors prop at all (should use default empty array)
    rerender(
      <Mcu source="#6750A4">
        <div>Test content</div>
      </Mcu>,
    );

    // Check that custom colors are still not present
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    expect(styleContent).not.toContain("--mcu-brand");
  });
});

//
// Zod schema for Material Theme Builder export format validation
// Built dynamically from the shared constants in Mcu.tsx
//

const hexColor = z.string().regex(/^#[0-9A-F]{6}$/);

const schemeSchema = z.object(
  Object.fromEntries(tokenNames.map((name) => [name, hexColor])) as {
    [K in (typeof tokenNames)[number]]: typeof hexColor;
  },
);

const tonalPaletteSchema = z.object(
  Object.fromEntries(
    STANDARD_TONES.map((tone) => [String(tone), hexColor]),
  ) as {
    [K in `${(typeof STANDARD_TONES)[number]}`]: typeof hexColor;
  },
);

const materialThemeBuilderExportSchema = z.object({
  description: z.string(),
  seed: hexColor,
  coreColors: z.object({
    primary: hexColor,
  }),
  extendedColors: z.array(
    z.object({
      name: z.string(),
      color: hexColor,
      harmonized: z.boolean(),
    }),
  ),
  schemes: z.object({
    light: schemeSchema,
    "light-medium-contrast": schemeSchema,
    "light-high-contrast": schemeSchema,
    dark: schemeSchema,
    "dark-medium-contrast": schemeSchema,
    "dark-high-contrast": schemeSchema,
  }),
  palettes: z.object({
    primary: tonalPaletteSchema,
    secondary: tonalPaletteSchema,
    tertiary: tonalPaletteSchema,
    neutral: tonalPaletteSchema,
    "neutral-variant": tonalPaletteSchema,
  }),
});

describe("exportTheme", () => {
  it("should return a valid Material Theme Builder-compatible JSON structure", () => {
    const result = exportTheme({ source: "#769CDF" });

    const parsed = materialThemeBuilderExportSchema.safeParse(result);
    if (!parsed.success) {
      throw new Error(
        `Schema validation failed:\n${parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`,
      );
    }

    expect(parsed.data.seed).toBe("#769CDF");
    expect(parsed.data.extendedColors).toEqual([]);
  });

  it("should produce different colors for different contrast levels", () => {
    const result = exportTheme({ source: "#769CDF" });

    expect(result.schemes.light.primary).not.toBe(
      result.schemes["light-high-contrast"].primary,
    );
    expect(result.schemes.dark.primary).not.toBe(
      result.schemes["dark-high-contrast"].primary,
    );
  });

  it("should include extended colors from customColors", () => {
    const result = exportTheme({
      source: "#769CDF",
      customColors: [
        { name: "brand", hex: "#FF5733", blend: true },
        { name: "success", hex: "#28A745", blend: false },
      ],
    });

    const parsed = materialThemeBuilderExportSchema.safeParse(result);
    expect(parsed.success).toBe(true);

    expect(result.extendedColors).toHaveLength(2);
    expect(result.extendedColors[0]).toEqual({
      name: "brand",
      color: "#FF5733",
      harmonized: true,
    });
    expect(result.extendedColors[1]).toEqual({
      name: "success",
      color: "#28A745",
      harmonized: false,
    });
  });

  it("should respect scheme variant parameter", () => {
    const tonalSpot = exportTheme({ source: "#769CDF", scheme: "tonalSpot" });
    const vibrant = exportTheme({ source: "#769CDF", scheme: "vibrant" });

    expect(tonalSpot.schemes.light.primary).not.toBe(
      vibrant.schemes.light.primary,
    );
  });
});
