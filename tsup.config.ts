import { copyFileSync } from "fs";
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entryPoints: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    external: ["react", "react-dom"],
    banner: {
      js: '"use client";',
    },
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
    onSuccess: async () => {
      try {
        // Copy tailwind.css to dist (for packages that have it)
        copyFileSync("src/tailwind.css", "dist/tailwind.css");
      } catch {
        // Skip if file doesn't exist
      }
    },
  },
  {
    entryPoints: ["src/cli.ts"],
    format: ["esm"],
    dts: false,
    outDir: "dist",
    clean: false,
  },
]);
