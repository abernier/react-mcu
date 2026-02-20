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
      } catch (e: unknown) {
        // Skip if file doesn't exist, re-throw other errors
        if (
          !(e instanceof Error && "code" in e && e.code === "ENOENT")
        ) {
          throw e;
        }
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
