import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu } from "./Mcu.js";

// Helper function to extract a CSS variable value from a CSS string
const extractVarValue = (content: string, varName: string): string | null => {
  const regex = new RegExp(`${varName}:\\s*([^;]+)`);
  const match = content.match(regex);
  return match?.[1]?.trim() ?? null;
};

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

  it("should generate different shade values for light and dark themes", () => {
    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <div>Test content</div>
      </Mcu>,
    );

    const styleTag = document.querySelector("#mcu-styles");
    const styleContent = styleTag?.textContent || "";

    // Extract shade variables from :root and .dark scopes
    const rootMatch = styleContent.match(/:root\s*\{([^}]+)\}/);
    const darkMatch = styleContent.match(/\.dark\s*\{([^}]+)\}/);

    expect(rootMatch).toBeTruthy();
    expect(darkMatch).toBeTruthy();

    const rootVars = rootMatch![1] as string;
    const darkVars = darkMatch![1] as string;

    // Check that shade variables exist in both scopes
    expect(rootVars).toContain("--mcu-primary-90");
    expect(rootVars).toContain("--mcu-primary-50");
    expect(rootVars).toContain("--mcu-primary-10");
    expect(darkVars).toContain("--mcu-primary-90");
    expect(darkVars).toContain("--mcu-primary-50");
    expect(darkVars).toContain("--mcu-primary-10");

    // Extract specific shade values for comparison
    const lightPrimary90 = extractVarValue(rootVars, "--mcu-primary-90");
    const darkPrimary90 = extractVarValue(darkVars, "--mcu-primary-90");

    // Verify that the same shade variable has different values in light vs dark
    expect(lightPrimary90).toBeTruthy();
    expect(darkPrimary90).toBeTruthy();
    expect(lightPrimary90).not.toBe(darkPrimary90);
  });

  it("should generate different shade values for custom colors in light and dark themes", () => {
    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[{ name: "myCustom1", hex: "#FF5722", blend: true }]}
      >
        <div>Test content</div>
      </Mcu>,
    );

    const styleTag = document.querySelector("#mcu-styles");
    const styleContent = styleTag?.textContent || "";

    // Extract shade variables from :root and .dark scopes
    const rootMatch = styleContent.match(/:root\s*\{([^}]+)\}/);
    const darkMatch = styleContent.match(/\.dark\s*\{([^}]+)\}/);

    expect(rootMatch).toBeTruthy();
    expect(darkMatch).toBeTruthy();

    const rootVars = rootMatch![1] as string;
    const darkVars = darkMatch![1] as string;

    // Check that custom color shade variables exist in both scopes
    expect(rootVars).toContain("--mcu-my-custom-1-90");
    expect(rootVars).toContain("--mcu-my-custom-1-50");
    expect(darkVars).toContain("--mcu-my-custom-1-90");
    expect(darkVars).toContain("--mcu-my-custom-1-50");

    // Extract specific shade values for comparison
    const lightCustom90 = extractVarValue(rootVars, "--mcu-my-custom-1-90");
    const darkCustom90 = extractVarValue(darkVars, "--mcu-my-custom-1-90");

    // Verify that the same custom color shade variable has different values in light vs dark
    expect(lightCustom90).toBeTruthy();
    expect(darkCustom90).toBeTruthy();
    expect(lightCustom90).not.toBe(darkCustom90);
  });
});
