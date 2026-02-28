import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  root: "ui",
  build: {
    outDir: "../dist",
    emptyOutDir: false,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
