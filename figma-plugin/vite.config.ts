import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  root: "figma-plugin/src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Allow importing from the main project's src/
      "@": new URL("../src", import.meta.url).pathname,
    },
  },
});
