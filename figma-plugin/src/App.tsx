import { useCallback, useMemo, useState } from "react";
import {
  builder,
  DEFAULT_CONTRAST,
  DEFAULT_SCHEME,
  type McuConfig,
  schemeNames,
} from "../../src/lib/builder";
import { Mcu } from "../../src/Mcu";
import { useMcu } from "../../src/Mcu.context";
import "./App.css";

const DEFAULT_SOURCE = "#6750A4";

function ThemePreview({ config }: { config: McuConfig }) {
  const { getMcuColor } = useMcu();

  const roles = [
    "primary",
    "onPrimary",
    "primaryContainer",
    "onPrimaryContainer",
    "secondary",
    "onSecondary",
    "secondaryContainer",
    "onSecondaryContainer",
    "tertiary",
    "onTertiary",
    "tertiaryContainer",
    "onTertiaryContainer",
    "error",
    "onError",
    "errorContainer",
    "onErrorContainer",
    "surface",
    "onSurface",
    "surfaceVariant",
    "onSurfaceVariant",
    "outline",
    "outlineVariant",
  ] as const;

  return (
    <div className="preview">
      {(["light", "dark"] as const).map((theme) => (
        <div key={theme} className="preview-section">
          <h3 className="section-title">{theme}</h3>
          <div className="swatch-grid">
            {roles.map((role) => {
              let hex: string;
              try {
                hex = getMcuColor(role, theme);
              } catch {
                return null;
              }
              return (
                <div
                  key={role}
                  className="swatch"
                  style={{ background: hex }}
                >
                  <span
                    className="swatch-label"
                    style={{
                      color: hex,
                      filter: "invert(1) grayscale(1) contrast(9)",
                    }}
                  >
                    {role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ApplyButton({ config }: { config: McuConfig }) {
  const [busy, setBusy] = useState(false);

  const handleApply = useCallback(() => {
    setBusy(true);
    try {
      const { source, ...rest } = config;
      const result = builder(source, rest);
      const files = result.toFigmaTokens();

      // files is Record<string, object> with filenames like "Light.tokens.json", "Dark.tokens.json"
      const light = files["Light.tokens.json"] ?? null;
      const dark = files["Dark.tokens.json"] ?? null;

      parent.postMessage(
        { pluginMessage: { type: "apply-variables", tokens: { light, dark } } },
        "*",
      );
    } catch (err) {
      console.error("Failed to apply variables:", err);
    } finally {
      setBusy(false);
    }
  }, [config]);

  return (
    <button className="apply-btn" onClick={handleApply} disabled={busy}>
      {busy ? "Applying…" : "Apply to Figma"}
    </button>
  );
}

function DownloadButton({ config }: { config: McuConfig }) {
  const handleDownload = useCallback(() => {
    try {
      const { source, ...rest } = config;
      const result = builder(source, rest);
      const files = result.toFigmaTokens();

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
    } catch (err) {
      console.error("Failed to download tokens:", err);
    }
  }, [config]);

  return (
    <button className="download-btn" onClick={handleDownload}>
      Download tokens
    </button>
  );
}

export default function App() {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [scheme, setScheme] = useState<McuConfig["scheme"]>(DEFAULT_SCHEME);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);

  const config = useMemo<McuConfig>(
    () => ({ source, scheme, contrast }),
    [source, scheme, contrast],
  );

  const inFigma = typeof parent !== "undefined" && parent !== window;

  return (
    <Mcu {...config}>
      <div className="plugin">
        <header className="header">
          <h1>Material Theme Builder</h1>
        </header>

        <div className="controls">
          <label className="control">
            <span>Source color</span>
            <input
              type="color"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </label>

          <label className="control">
            <span>Scheme</span>
            <select
              value={scheme}
              onChange={(e) =>
                setScheme(e.target.value as McuConfig["scheme"])
              }
            >
              {schemeNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span>Contrast ({contrast})</span>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
            />
          </label>
        </div>

        <ThemePreview config={config} />

        <footer className="footer">
          {inFigma && <ApplyButton config={config} />}
          <DownloadButton config={config} />
        </footer>
      </div>
    </Mcu>
  );
}
