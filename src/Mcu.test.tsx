import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Mcu } from "./Mcu.js";
import { useMcu } from "./Mcu.context.js";
import { recolorizeSvgDirect } from "./lib/recolorizeSvg.js";

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

  it("should expose allPalettes through useMcu hook", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <TestComponent />
      </Mcu>,
    );

    // Verify that allPalettes is exposed and contains core palettes
    expect(palettes).toBeTruthy();
    expect(palettes).toHaveProperty("primary");
    expect(palettes).toHaveProperty("secondary");
    expect(palettes).toHaveProperty("tertiary");
    expect(palettes).toHaveProperty("error");
    expect(palettes).toHaveProperty("neutral");
    expect(palettes).toHaveProperty("neutral-variant");

    // Verify that palette has the expected methods
    expect(palettes?.primary).toBeTruthy();
    expect(typeof palettes?.primary.tone).toBe("function");
  });

  it("should include custom color palettes in allPalettes", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu
        source="#6750A4"
        scheme="tonalSpot"
        contrast={0}
        customColors={[
          { name: "brand", hex: "#FF5733", blend: true },
          { name: "success", hex: "#28A745", blend: false },
        ]}
      >
        <TestComponent />
      </Mcu>,
    );

    // Verify that custom palettes are included
    expect(palettes).toBeTruthy();
    expect(palettes).toHaveProperty("brand");
    expect(palettes).toHaveProperty("success");

    // Verify that custom palettes have the expected methods
    expect(typeof palettes?.brand.tone).toBe("function");
    expect(typeof palettes?.success.tone).toBe("function");
  });
});

describe("recolorizeSvgDirect", () => {
  const simpleSvg = `<svg><rect fill="#FF0000"/></svg>`;

  it("should use all palettes by default", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <TestComponent />
      </Mcu>,
    );

    const result = recolorizeSvgDirect(simpleSvg, palettes);
    expect(result).toContain("var(--mcu-");
  });

  it("should filter palettes with include option", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <TestComponent />
      </Mcu>,
    );

    const result = recolorizeSvgDirect(simpleSvg, palettes, {
      include: ["primary"],
    });
    expect(result).toContain("var(--mcu-");
  });

  it("should filter palettes with exclude option", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <TestComponent />
      </Mcu>,
    );

    const result = recolorizeSvgDirect(simpleSvg, palettes, {
      exclude: ["primary", "secondary"],
    });
    expect(result).toContain("var(--mcu-");
  });

  it("should throw error when both include and exclude are specified", () => {
    let palettes: Record<string, any> = {};

    const TestComponent = () => {
      const { allPalettes } = useMcu();
      palettes = allPalettes;
      return <div>Test</div>;
    };

    render(
      <Mcu source="#6750A4" scheme="tonalSpot" contrast={0} customColors={[]}>
        <TestComponent />
      </Mcu>,
    );

    expect(() => {
      recolorizeSvgDirect(simpleSvg, palettes, {
        include: ["primary"],
        exclude: ["secondary"],
      });
    }).toThrow("Cannot specify both 'include' and 'exclude' options");
  });
});
