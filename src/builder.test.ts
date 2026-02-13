import { describe, expect, it } from "vitest";
import { builder } from "./Mcu.js";
import fixture from "./fixtures/material-theme-builder-769CDF.json";

describe("builder", () => {
  it("should match material theme builder fixture", () => {
    const result = builder("#769CDF");
    expect(result).toEqual(fixture);
  });
});
