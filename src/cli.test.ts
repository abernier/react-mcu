import { describe, expect, it } from "vitest";
import { builder } from "./Mcu";
import fixture from "./fixtures/material-theme-builder-try1.json";

describe("cli", () => {
  it("builder().toJson() matches fixture1", () => {
    const result = builder(fixture.seed);
    expect(result.toJson()).toEqual(fixture);
  });
});
