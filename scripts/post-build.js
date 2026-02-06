import { copyFileSync } from "fs";

// Copy tailwind-plugin files after build
copyFileSync("src/tailwind-plugin.d.ts", "dist/tailwind-plugin.d.ts");
console.log("✓ Copied tailwind-plugin.d.ts to dist/");
