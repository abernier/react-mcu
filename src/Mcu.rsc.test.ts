import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Tests for React Server Components (RSC) compatibility
 *
 * These tests ensure that react-mcu works correctly in RSC environments
 * like Next.js App Router, where components are server-rendered by default
 * and client components must be explicitly marked with "use client".
 *
 * Related: https://github.com/abernier/react-mcu/pull/50
 */
describe("RSC Compatibility", () => {
  describe("Source files", () => {
    it("Mcu.tsx should have 'use client' directive", () => {
      const mcuSource = readFileSync(resolve(__dirname, "Mcu.tsx"), "utf-8");

      // Check that the file starts with "use client" (allowing for whitespace/comments)
      const lines = mcuSource.split("\n");
      const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);

      expect(firstNonEmptyLine).toBe('"use client";');
    });

    it("Mcu.context.tsx should have 'use client' directive", () => {
      const contextSource = readFileSync(
        resolve(__dirname, "Mcu.context.tsx"),
        "utf-8",
      );

      const lines = contextSource.split("\n");
      const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);

      expect(firstNonEmptyLine).toBe('"use client";');
    });
  });

  describe("Built bundle", () => {
    it("dist/index.js should have 'use client' directive as first line", () => {
      // This test validates that tsup correctly preserves the "use client" directive
      // in the bundled output via the banner configuration
      let distContent: string;

      try {
        distContent = readFileSync(
          resolve(__dirname, "../dist/index.js"),
          "utf-8",
        );
      } catch (error) {
        throw new Error(
          'dist/index.js not found. Run "pnpm build" first to generate the bundle.',
        );
      }

      // The banner config in tsup.config.ts should add "use client"; as the first line
      const lines = distContent.split("\n");
      const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);

      expect(firstNonEmptyLine).toBe('"use client";');
    });
  });

  describe("Component behavior", () => {
    it("Mcu component uses client-only features (hooks and DOM)", () => {
      const mcuSource = readFileSync(resolve(__dirname, "Mcu.tsx"), "utf-8");

      // Verify the component uses React hooks (requires client-side execution)
      expect(mcuSource).toContain("useMemo");

      // Verify it renders client-only elements (style tag with dynamic content)
      expect(mcuSource).toContain("<style");
    });

    it("Mcu.context.tsx uses client-only features", () => {
      const contextSource = readFileSync(
        resolve(__dirname, "Mcu.context.tsx"),
        "utf-8",
      );

      // Verify the context provider uses React hooks
      expect(contextSource).toContain("useState");
      expect(contextSource).toContain("useMemo");
      expect(contextSource).toContain("useCallback");
      expect(contextSource).toContain("useInsertionEffect");

      // Verify it uses DOM APIs (document)
      expect(contextSource).toContain("document.");
    });
  });

  describe("Export validation", () => {
    it("should be able to import Mcu from the package", async () => {
      // This simulates what a Next.js server component would do when importing
      // a client component - it should not error during import
      const indexModule = await import("./index.js");

      expect(indexModule.Mcu).toBeDefined();
      expect(typeof indexModule.Mcu).toBe("function");
    });

    it("should be able to import useMcu from the package", async () => {
      const indexModule = await import("./index.js");

      expect(indexModule.useMcu).toBeDefined();
      expect(typeof indexModule.useMcu).toBe("function");
    });
  });
});
