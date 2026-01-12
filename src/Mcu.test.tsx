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

  it("should allow custom colors to override system colors like primary", () => {
    // Render without custom colors first to get the default primary color
    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );
    const styleTag1 = document.querySelector("#mcu-styles");
    const defaultPrimaryMatch = styleTag1?.textContent?.match(
      /--mcu-primary:(#[a-fA-F0-9]{6})/,
    );
    const defaultPrimary = defaultPrimaryMatch?.[1];

    // Now render with a custom primary color (this will replace the style tag)
    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[{ name: "primary", hex: "#FF0000", blend: false }]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    const styleTag2 = document.querySelector("#mcu-styles");
    expect(styleTag2).toBeTruthy();

    const styleContent = styleTag2?.textContent || "";
    expect(styleContent).toContain("--mcu-primary");

    // Extract the custom primary color
    const customPrimaryMatch = styleContent.match(
      /--mcu-primary:(#[a-fA-F0-9]{6})/,
    );
    const customPrimary = customPrimaryMatch?.[1];

    // The custom primary should be different from the default
    expect(customPrimary).toBeTruthy();
    expect(customPrimary).not.toBe(defaultPrimary);

    // The color should be based on #FF0000 (the custom color)
    // In light mode, tone 40 is used for the main color
    // We can't predict the exact hex, but it should be different from the source color's primary
    console.log("Default primary:", defaultPrimary);
    console.log("Custom primary:", customPrimary);
  });
});
