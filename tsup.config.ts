import { copyFileSync } from "fs";
import { defineConfig } from "tsup";

export default defineConfig({
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
    // Copy tailwind-plugin.js to dist
    copyFileSync("src/tailwind-plugin.js", "dist/tailwind-plugin.js");
  },
});
