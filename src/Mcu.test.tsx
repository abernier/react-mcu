import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu, generateCss } from "./Mcu.js";

describe("Mcu", () => {
  afterEach(() => {
    cleanup();
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

  describe("colorMatch=true", () => {
    it("should generate correct primary color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-primary:#6d5e00");
    });

    it("should generate correct secondary color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        secondary: "#a93535",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-secondary:#a93535");
    });

    it("should generate correct tertiary color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        tertiary: "#364be1",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-tertiary:#364be1");
    });

    it("should generate correct error color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        error: "#336b00",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-error:#336b00");
    });

    it("should generate correct primary-container color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-primary-container:#f8e37f");
    });

    it("should generate correct secondary-container color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        secondary: "#a93535",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-secondary-container:#ffdad7");
    });

    it("should generate correct error-container color when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        error: "#336b00",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-error-container:#b3f581");
    });

    it("should generate correct surface colors when colorMatch=true", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        colorMatch: true,
      });

      expect(css).toContain("--mcu-surface-dim:#e0d9cc");
      expect(css).toContain("--mcu-surface-container:#f4eddf");
      expect(css).toContain("--mcu-inverse-surface:#333027");
      expect(css).toContain("--mcu-on-surface:#1e1c13");
      expect(css).toContain("--mcu-outline:#7c7768");
    });
  });

  describe("colorMatch=false", () => {
    it("should harmonize colors when colorMatch=false (default)", () => {
      const { css } = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        secondary: "#a93535",
        colorMatch: false,
      });

      // When colorMatch=false, colors are harmonized and will differ from input
      // Secondary should use harmonized chroma, not original
      expect(css).not.toContain("--mcu-secondary:#a93535");
    });

    it("should maintain existing behavior for colorMatch=false", () => {
      const cssWithColorMatchFalse = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        secondary: "#a93535",
        tertiary: "#364be1",
        error: "#336b00",
        colorMatch: false,
      });

      const cssDefault = generateCss({
        source: "#6d5e00",
        primary: "#6d5e00",
        secondary: "#a93535",
        tertiary: "#364be1",
        error: "#336b00",
        // colorMatch defaults to false
      });

      // Both should produce the same CSS
      expect(cssWithColorMatchFalse.css).toBe(cssDefault.css);
    });
  });
});
