import { defineConfig } from "tsup";

export default defineConfig([
  {
    entryPoints: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist",
    clean: true,
  },
  {
    entryPoints: ["src/cli.ts"],
    format: ["esm"],
    dts: false,
    outDir: "dist",
    clean: false,
  },
]);
