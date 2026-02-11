import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu } from "./Mcu.js";

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

    // Debug: Count how many style tags exist
    const styleTags = document.querySelectorAll("#mcu-styles");
    console.log("Number of style tags after first render:", styleTags.length);

    expect(styleContent).toContain("--mcu-brand:");
    expect(styleContent).toContain("--mcu-on-brand:");
    expect(styleContent).toContain("--mcu-brand-container:");
    expect(styleContent).toContain("--mcu-on-brand-container:");
    expect(styleContent).toContain("--mcu-success:");
    expect(styleContent).toContain("--mcu-on-success:");
    expect(styleContent).toContain("--mcu-success-container:");
    expect(styleContent).toContain("--mcu-on-success-container:");

    // Also check for tonal palette variables
    expect(styleContent).toContain("--mcu-brand-0:");
    expect(styleContent).toContain("--mcu-brand-100:");
    expect(styleContent).toContain("--mcu-success-0:");
    expect(styleContent).toContain("--mcu-success-100:");

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

    // Debug
    const styleTags2 = document.querySelectorAll("#mcu-styles");
    console.log("Number of style tags after second render:", styleTags2.length);
    console.log("Style content length:", styleContent.length);
    console.log("Contains success?:", styleContent.includes("--mcu-success:"));

    // "brand" should still be there
    expect(styleContent).toContain("--mcu-brand:");
    expect(styleContent).toContain("--mcu-on-brand:");
    expect(styleContent).toContain("--mcu-brand-container:");
    expect(styleContent).toContain("--mcu-on-brand-container:");

    // "success" should be gone (THIS IS THE BUG - these will still be present)
    expect(styleContent).not.toContain("--mcu-success:");
    expect(styleContent).not.toContain("--mcu-on-success:");
    expect(styleContent).not.toContain("--mcu-success-container:");
    expect(styleContent).not.toContain("--mcu-on-success-container:");
    expect(styleContent).not.toContain("--mcu-success-0:");
    expect(styleContent).not.toContain("--mcu-success-100:");

    // Rerender with no custom colors
    rerender(
      <Mcu source="#6750A4" customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    // Check that all custom color variables are removed
    styleTag = document.querySelector("#mcu-styles");
    styleContent = styleTag?.textContent || "";

    expect(styleContent).not.toContain("--mcu-brand:");
    expect(styleContent).not.toContain("--mcu-on-brand:");
    expect(styleContent).not.toContain("--mcu-brand-container:");
    expect(styleContent).not.toContain("--mcu-on-brand-container:");
  });
});
