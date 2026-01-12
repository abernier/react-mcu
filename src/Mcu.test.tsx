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

  it("should support coreColors to override primary, secondary, and tertiary", () => {
    // Test the generateCss function directly to avoid React re-render issues
    const result = generateCss({
      source: "#6750A4",
      scheme: "tonalSpot",
      contrast: 0,
      coreColors: {
        primary: "#FF0000",
        secondary: "#00FF00",
        tertiary: "#0000FF",
      },
    });

    const content = result.css;
    const primary = content.match(/--mcu-primary:(#[a-fA-F0-9]{6})/)?.[1];

    // With coreColors.primary = "#FF0000", the primary should be a reddish color
    // The default from source "#6750A4" would be "#65558f" (purple)
    expect(primary).toBeTruthy();
    expect(primary).not.toBe("#65558f"); // Not the default purple

    // The primary should be reddish (high red component)
    // For #FF0000 at tone 40 in light mode, we expect something like #c00100
    const redValue = parseInt(primary!.substring(1, 3), 16);
    expect(redValue).toBeGreaterThan(150); // Should have high red component

    // Verify all system colors are still present
    expect(content).toContain("--mcu-primary");
    expect(content).toContain("--mcu-secondary");
    expect(content).toContain("--mcu-tertiary");
    expect(content).toContain("--mcu-surface");
  });
});
