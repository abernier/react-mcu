/**
 * Example of how to use AI-powered SVG recolorization
 *
 * NOTE: This is an example/reference file, not included in the build.
 * To use AI recolorization in your application:
 *
 * 1. Set up environment variable with your AI API key
 * 2. Import recolorizeSvg from react-mcu
 * 3. Call with aiConfig option
 */

import { useState } from "react";
import exampleSvg from "../assets/example.svg?raw";
import { recolorizeSvg, useMcu } from "../index";

export function AIRecolorizationExample() {
  const { allPalettes } = useMcu();
  const [recolorizedSvg, setRecolorizedSvg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecolorize = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Option 1: Using OpenAI
      const result = await recolorizeSvg(exampleSvg, allPalettes, {
        aiConfig: {
          provider: "openai",
          apiKey: process.env.OPENAI_API_KEY || "",
          model: "gpt-4o",
        },
      });

      setRecolorizedSvg(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI-Powered SVG Recolorization Example</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleRecolorize}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--mcu-primary)",
            color: "var(--mcu-on-primary)",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Processing with AI..." : "Recolorize with AI"}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "var(--mcu-error-container)",
            color: "var(--mcu-on-error-container)",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          Error: {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div>
          <h3>Original SVG</h3>
          <div dangerouslySetInnerHTML={{ __html: exampleSvg }} />
        </div>

        <div>
          <h3>AI-Recolorized SVG</h3>
          {recolorizedSvg ? (
            <div dangerouslySetInnerHTML={{ __html: recolorizedSvg }} />
          ) : (
            <p style={{ color: "var(--mcu-on-surface-variant)" }}>
              Click the button to recolorize using AI
            </p>
          )}
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>How it works</h3>
        <ol style={{ color: "var(--mcu-on-surface-variant)" }}>
          <li>AI analyzes the SVG and identifies semantic roles of elements</li>
          <li>
            Elements are assigned roles like "primary-object", "background",
            "accent"
          </li>
          <li>
            Roles are mapped to appropriate Material Color Utilities palettes
          </li>
          <li>
            Colors are applied based on semantic meaning, not just distance
          </li>
        </ol>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Alternative Providers</h3>
        <pre
          style={{
            backgroundColor: "var(--mcu-surface-container-highest)",
            padding: "16px",
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          {`// Using Anthropic Claude
await recolorizeSvg(svg, allPalettes, {
  aiConfig: {
    provider: "anthropic",
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-5-sonnet-20241022"
  }
});

// Using custom AI service
await recolorizeSvg(svg, allPalettes, {
  aiConfig: {
    provider: "custom",
    apiKey: "your-key",
    apiEndpoint: "https://your-ai.com/analyze"
  }
});`}
        </pre>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "var(--mcu-tertiary-container)",
          color: "var(--mcu-on-tertiary-container)",
          borderRadius: "8px",
        }}
      >
        <strong>Note:</strong> This example requires an AI API key. See{" "}
        <a href="../../docs/AI_RECOLORIZATION.md">docs/AI_RECOLORIZATION.md</a>{" "}
        for setup instructions.
      </div>
    </div>
  );
}

/**
 * Additional examples showing different use cases
 */

// Example 2: With custom prompt
export async function recolorizeWithCustomPrompt(svg: string, palettes: any) {
  return await recolorizeSvg(svg, palettes, {
    aiConfig: {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY || "",
      customPrompt: `
        Analyze this logo and identify brand elements.
        Focus on distinguishing primary brand colors from background.
        The main logo element should be assigned "primary-object" role.
        Background elements should be "background" role.
        Accent elements should be "decorative-element" role.
      `,
    },
  });
}

// Example 3: With error handling and retry
export async function recolorizeWithRetry(
  svg: string,
  palettes: any,
  maxRetries = 3,
) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await recolorizeSvg(svg, palettes, {
        aiConfig: {
          provider: "openai",
          apiKey: process.env.OPENAI_API_KEY || "",
        },
      });
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${i + 1} failed, retrying...`);
      // Wait before retry (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000),
      );
    }
  }

  // All retries failed, use distance-based fallback
  console.error("All AI attempts failed, using distance-based fallback");
  return recolorizeSvg(svg, palettes); // No aiConfig = distance-based
}

// Example 4: Batch processing with caching
export async function recolorizeBatch(svgs: string[], palettes: any) {
  const cache = new Map();

  const results = await Promise.all(
    svgs.map(async (svg) => {
      // Simple cache based on SVG content hash
      const hash = hashCode(svg);

      if (cache.has(hash)) {
        return cache.get(hash);
      }

      try {
        const result = await recolorizeSvg(svg, palettes, {
          aiConfig: {
            provider: "openai",
            apiKey: process.env.OPENAI_API_KEY || "",
          },
        });

        cache.set(hash, result);
        return result;
      } catch (error) {
        console.error("Failed to recolorize:", error);
        return svg; // Return original on error
      }
    }),
  );

  return results;
}

function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}
