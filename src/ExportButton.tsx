import type { McuConfig } from "./Mcu";
import { builder } from "./Mcu";

interface ExportButtonProps {
  config: McuConfig;
  label?: string;
}

export function ExportButton({
  config,
  label = "Export to Figma Tokens",
}: ExportButtonProps) {
  const handleExport = () => {
    try {
      // Use the builder to generate tokens
      const result = builder(config.source, {
        scheme: config.scheme,
        contrast: config.contrast,
        primary: config.primary,
        secondary: config.secondary,
        tertiary: config.tertiary,
        error: config.error,
        neutral: config.neutral,
        neutralVariant: config.neutralVariant,
        customColors: config.customColors,
        adaptiveShades: config.adaptiveShades,
        contrastAllColors: config.contrastAllColors,
      });

      const files = result.toFigmaTokens();

      // Download each file
      for (const [filename, content] of Object.entries(files)) {
        const blob = new Blob([JSON.stringify(content, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      console.log("Figma tokens exported successfully");
    } catch (error) {
      console.error("Failed to export Figma tokens:", error);
      alert("Failed to export: " + (error as Error).message);
    }
  };

  return (
    <button
      onClick={handleExport}
      style={{
        padding: "8px 16px",
        backgroundColor: "var(--mcu-primary, #6750A4)",
        color: "var(--mcu-on-primary, white)",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      {label}
    </button>
  );
}
