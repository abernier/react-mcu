import { describe, expect, it } from "vitest";
import fixture from "./fixtures/material-theme-builder-try1.json";
import { builder } from "./lib/builder";

describe("cli", () => {
  it("builder().toJson() matches fixture1", () => {
    const result = builder(fixture.seed);
    expect(result.toJson()).toEqual(fixture);
  });
});
