import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Mcu } from "./Mcu.js";

describe("Mcu", () => {
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

  it("should inject custom color CSS variables", () => {
    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[
          { name: "brandColor", hex: "#FF5733", blend: true },
          { name: "accentColor", hex: "#3498DB", blend: false },
        ]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    // Check that the style tag exists
    const styleTag = document.querySelector("#mcu-styles");
    expect(styleTag).toBeTruthy();

    // Check that custom color CSS variables are present
    // Each custom color generates exactly 1 CSS variable
    const styleContent = styleTag?.textContent || "";
    expect(styleContent).toContain("--mcu-brand-color");
    expect(styleContent).toContain("--mcu-accent-color");

    // Verify no additional derived variables are created for custom colors
    // (unlike base colors which have "on-" variants, containers, etc.)
    expect(styleContent).not.toContain("--mcu-on-brand-color");
    expect(styleContent).not.toContain("--mcu-brand-color-container");
  });
});
