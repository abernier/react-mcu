import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import materialThemeBuilderReference from "./fixtures/material-theme-builder-769CDF.json";
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
    const { description: _, ...reference } = materialThemeBuilderReference;

    expect(exported).toEqual(reference);
  });
});
