import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import materialThemeBuilderReference769CDF from "./fixtures/material-theme-builder-769CDF.json";
import materialThemeBuilderReferenceCAB337 from "./fixtures/material-theme-builder-CAB337.json";
import { useMcu } from "./Mcu.context.js";
import { Mcu } from "./Mcu.js";

describe("exportTheme", () => {
  afterEach(() => {
    cleanup();
    document.querySelectorAll("#mcu-styles").forEach((el) => el.remove());
  });

  it("should match the official Material Theme Builder export for source #769CDF", () => {
    const { result } = renderHook(() => useMcu(), {
      wrapper: ({ children }) => <Mcu source="#769CDF">{children}</Mcu>,
    });

    const { description, ...exported } = result.current.exportTheme();
    const { description: _, ...reference } =
      materialThemeBuilderReference769CDF;

    expect(exported).toEqual(reference);
  });

  it(
    "should match the official Material Theme Builder export for source #CAB337 with all core colors and custom colors",
    () => {
      const { result } = renderHook(() => useMcu(), {
        wrapper: ({ children }) => (
          <Mcu
            source="#CAB337"
            secondary="#B03A3A"
            tertiary="#2138D2"
            error="#479200"
            neutral="#957FF1"
            neutralVariant="#007EDF"
            customColors={[
              { name: "Custom Color 1", hex: "#00D68A", blend: true },
              { name: "Custom Color 2", hex: "#FFE16B", blend: true },
            ]}
          >
            {children}
          </Mcu>
        ),
      });

      const { description, ...exported } = result.current.exportTheme();
      const { description: _, ...reference } =
        materialThemeBuilderReferenceCAB337;

      expect(exported).toEqual(reference);
    },
  );
});
