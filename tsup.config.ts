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
      // Copy tailwind.css to dist
      copyFileSync("src/tailwind.css", "dist/tailwind.css");
    },
  },
  {
    entryPoints: ["src/cli.ts"],
    format: ["esm"],
    outDir: "dist",
    // No clean here – the first config already cleans
    // No dts – CLI doesn't need type declarations
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
