import { defineConfig } from "tsup";
import { copyFileSync } from "fs";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  onSuccess: async () => {
    // Copy tailwind.css to dist
    copyFileSync("tailwind.css", "dist/tailwind.css");
  },
});
