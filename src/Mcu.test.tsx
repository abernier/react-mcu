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

  it("should allow custom colors without interference with system colors", () => {
    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[
          { name: "myBrand", hex: "#FF0000", blend: false },
          { name: "myAccent", hex: "#00FF00", blend: false },
        ]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    const styleTag = document.querySelector("#mcu-styles");
    expect(styleTag).toBeTruthy();

    const styleContent = styleTag?.textContent || "";

    // System colors should be present
    expect(styleContent).toContain("--mcu-primary");
    expect(styleContent).toContain("--mcu-secondary");

    // Custom colors should also be present
    expect(styleContent).toContain("--mcu-my-brand");
    expect(styleContent).toContain("--mcu-on-my-brand");
    expect(styleContent).toContain("--mcu-my-accent");
    expect(styleContent).toContain("--mcu-on-my-accent");
  });
});
