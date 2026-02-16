import { Command } from "commander";
import { builder, schemeNames } from "./Mcu";

const program = new Command();

program
  .name("react-mcu")
  .description(
    "Material Color Utilities – generate color themes from a source color",
  )
  .argument("<source>", "Source color in hex format (e.g. #6750A4)")
  .option(
    "--scheme <name>",
    `Color scheme variant (${schemeNames.join(", ")})`,
    "tonalSpot",
  )
  .option(
    "--contrast <number>",
    "Contrast level from -1.0 to 1.0",
    parseFloat,
    0,
  )
  .option("--primary <hex>", "Primary color override")
  .option("--secondary <hex>", "Secondary color override")
  .option("--tertiary <hex>", "Tertiary color override")
  .option("--neutral <hex>", "Neutral color override")
  .option("--neutral-variant <hex>", "Neutral variant color override")
  .option("--error <hex>", "Error color override")
  .option(
    "--custom-colors <json>",
    'Custom colors as JSON array (e.g. \'[{"name":"brand","hex":"#FF5733","blend":true}]\')',
  )
  .option("--format <type>", "Output format: json or css", "json")
  .action((source: string, opts) => {
    let customColors: { name: string; hex: string; blend: boolean }[] = [];
    if (opts.customColors) {
      try {
        const parsed = JSON.parse(opts.customColors) as {
          name: string;
          hex: string;
          blend?: boolean;
        }[];
        customColors = parsed.map((c) => ({
          name: c.name,
          hex: c.hex,
          blend: c.blend ?? true,
        }));
      } catch {
        console.error("Error: --custom-colors must be valid JSON");
        process.exit(1);
      }
    }

    const result = builder(source, {
      scheme: opts.scheme,
      contrast: opts.contrast,
      primary: opts.primary,
      secondary: opts.secondary,
      tertiary: opts.tertiary,
      neutral: opts.neutral,
      neutralVariant: opts.neutralVariant,
      error: opts.error,
      customColors,
    });

    if (opts.format === "css") {
      process.stdout.write(result.toCss());
    } else {
      process.stdout.write(JSON.stringify(result.toJson(), null, 2) + "\n");
    }
  });

program.parse();
