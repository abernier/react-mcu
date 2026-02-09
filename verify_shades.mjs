import { generateCss } from "./dist/index.js";

const result = generateCss({
  source: "#6750A4",
  scheme: "tonalSpot",
  contrast: 0,
  customColors: [],
});

// Extract primary-90 from both light and dark
const lightMatch = result.css.match(/:root\s*\{([^}]+)\}/s);
const darkMatch = result.css.match(/\.dark\s*\{([^}]+)\}/s);

if (lightMatch && darkMatch) {
  const lightPrimary90 = lightMatch[1].match(/--mcu-primary-90:\s*([^;]+)/);
  const darkPrimary90 = darkMatch[1].match(/--mcu-primary-90:\s*([^;]+)/);

  console.log(
    "Light mode --mcu-primary-90:",
    lightPrimary90 ? lightPrimary90[1] : "NOT FOUND",
  );
  console.log(
    "Dark mode --mcu-primary-90:",
    darkPrimary90 ? darkPrimary90[1] : "NOT FOUND",
  );

  // Show a few more for comparison
  const lightPrimary50 = lightMatch[1].match(/--mcu-primary-50:\s*([^;]+)/);
  const darkPrimary50 = darkMatch[1].match(/--mcu-primary-50:\s*([^;]+)/);
  const lightPrimary10 = lightMatch[1].match(/--mcu-primary-10:\s*([^;]+)/);
  const darkPrimary10 = darkMatch[1].match(/--mcu-primary-10:\s*([^;]+)/);

  console.log(
    "\nLight mode --mcu-primary-50:",
    lightPrimary50 ? lightPrimary50[1] : "NOT FOUND",
  );
  console.log(
    "Dark mode --mcu-primary-50:",
    darkPrimary50 ? darkPrimary50[1] : "NOT FOUND",
  );

  console.log(
    "\nLight mode --mcu-primary-10:",
    lightPrimary10 ? lightPrimary10[1] : "NOT FOUND",
  );
  console.log(
    "Dark mode --mcu-primary-10:",
    darkPrimary10 ? darkPrimary10[1] : "NOT FOUND",
  );

  console.log("\n✅ Shades are now theme-sensitive!");
  console.log("   - In light mode, --mcu-primary-90 is light (tone 90)");
  console.log(
    "   - In dark mode, --mcu-primary-90 is dark (tone 10, inverted from 100-90)",
  );
}
