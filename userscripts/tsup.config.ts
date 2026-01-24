import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["userscripts/shadcn-mcu.ts"],
  format: ["iife"],
  outDir: "userscripts",
  outExtension: () => ({ js: ".user.js" }),
  clean: false,
  minify: false,
  banner: {
    js: `// ==UserScript==
// @name         Shadcn MCU Colors
// @namespace    https://github.com/abernier/react-mcu
// @version      1.0.0
// @description  Extract shadcn primary color and generate MCU color scheme
// @author       abernier
// @match        *://*/*
// @grant        none
// ==/UserScript==
`,
  },
  esbuildOptions(options) {
    options.globalName = "ShadcnMCU";
  },
});
