# AI-Powered SVG Recolorization

This feature adds intelligent, AI-powered SVG recolorization that understands the semantic meaning of image elements and assigns colors based on their conceptual roles, rather than just color distance.

## Overview

The `recolorizeSvg` function now supports two modes:

1. **Distance-based (default)**: Uses CIEDE2000 color distance for perceptually accurate matching
2. **AI-powered (optional)**: Uses AI to understand semantic roles and intelligently assign colors

## Quick Start

### Distance-Based Mode (Default)

```tsx
import { recolorizeSvg } from "react-mcu";

const { allPalettes } = useMcu();
const recolorizedSvg = recolorizeSvg(svgString, allPalettes);
```

### AI-Powered Mode

```tsx
import { recolorizeSvg } from "react-mcu";

const { allPalettes } = useMcu();

// Using OpenAI
const recolorizedSvg = await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o", // optional, defaults to gpt-4o
  },
});

// Using Anthropic Claude
const recolorizedSvg = await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "anthropic",
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-5-sonnet-20241022", // optional
  },
});
```

## How It Works

### Distance-Based Approach

The traditional approach:

1. Converts colors to LAB color space
2. Calculates CIEDE2000 distance (scientifically validated for human perception)
3. Applies bonus/penalty for matching neutral/colored nature
4. Selects the closest palette color

### AI-Powered Approach

The intelligent approach:

1. Converts SVG to base64 for AI analysis
2. Sends to AI service with a prompt to identify semantic roles
3. AI responds with element identifications and their roles
4. Maps semantic roles to appropriate Material Color Utilities palettes
5. Applies color transformation based on meaning, not just distance

**Example AI Analysis:**

```json
[
  {
    "selector": "circle[cx='50'][cy='50']",
    "role": "primary-object",
    "description": "Main focal circle, appears to be the hero element"
  },
  {
    "selector": "rect[width='200'][height='200']",
    "role": "background",
    "description": "Background rectangle providing context"
  },
  {
    "selector": "path[d='...']",
    "role": "decorative-element",
    "description": "Decorative accent pattern"
  }
]
```

## Semantic Roles

The AI can assign these semantic roles:

| Role                 | Description        | Maps to Palette   |
| -------------------- | ------------------ | ----------------- |
| `primary-object`     | Main focal point   | `primary`         |
| `main-element`       | Primary element    | `primary`         |
| `focal-point`        | Hero element       | `primary`         |
| `background`         | Background layer   | `surface`         |
| `secondary-element`  | Supporting element | `secondary`       |
| `supporting-element` | Secondary content  | `secondary`       |
| `accent`             | Accent/highlight   | `tertiary`        |
| `highlight`          | Emphasis element   | `tertiary`        |
| `decorative-element` | Decoration         | `tertiary`        |
| `error`              | Error indicator    | `error`           |
| `warning`            | Warning indicator  | `error`           |
| `neutral`            | Neutral element    | `neutral`         |
| `neutral-element`    | Neutral content    | `neutral-variant` |
| `shadow`             | Shadow effect      | `neutral-variant` |
| `outline`            | Border/outline     | `outline`         |

## Configuration

### AIRecolorizationConfig

```typescript
interface AIRecolorizationConfig {
  /**
   * AI provider to use for semantic analysis
   */
  provider: "openai" | "anthropic" | "custom";

  /**
   * API key for the AI service
   */
  apiKey: string;

  /**
   * Optional: API endpoint (for custom providers)
   */
  apiEndpoint?: string;

  /**
   * Optional: Model to use
   */
  model?: string;

  /**
   * Optional: Custom prompt to guide the AI
   */
  customPrompt?: string;
}
```

## Supported AI Providers

### OpenAI (GPT-4 Vision)

```tsx
{
  provider: "openai",
  apiKey: "sk-...",
  model: "gpt-4o" // default
}
```

**Models supported:**

- `gpt-4o` (default, recommended)
- `gpt-4-turbo`
- `gpt-4-vision-preview`

### Anthropic (Claude)

```tsx
{
  provider: "anthropic",
  apiKey: "sk-ant-...",
  model: "claude-3-5-sonnet-20241022" // default
}
```

**Models supported:**

- `claude-3-5-sonnet-20241022` (default, recommended)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

### Custom Provider

```tsx
{
  provider: "custom",
  apiKey: "your-key",
  apiEndpoint: "https://your-ai-service.com/analyze"
}
```

Your custom endpoint should:

- Accept POST requests with JSON body: `{ svg: string, prompt: string }`
- Return JSON with `analysis` or `content` field containing the AI response
- Follow the same response format as OpenAI/Anthropic

## Custom Prompts

You can provide a custom prompt to guide the AI's analysis:

```tsx
await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    customPrompt: `
      Analyze this logo and identify the brand elements.
      Focus on distinguishing primary brand colors from background.
      Assign roles accordingly.
    `,
  },
});
```

## Error Handling and Fallback

The AI-powered mode includes automatic fallback:

```tsx
// If AI fails, automatically falls back to distance-based approach
const result = await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "openai",
    apiKey: "possibly-invalid-key",
  },
});
// Will still return a valid result using distance-based fallback
```

You can also catch errors explicitly:

```tsx
try {
  const result = await recolorizeSvg(svgString, allPalettes, {
    aiConfig: { provider: "openai", apiKey: key },
  });
} catch (error) {
  console.error("AI recolorization failed:", error);
  // Handle error or use distance-based mode
  const fallback = recolorizeSvg(svgString, allPalettes);
}
```

## Use Cases

### When to Use Distance-Based Mode

- Fast, synchronous operation needed
- No AI API access or budget
- SVG has simple color relationships
- Consistent, predictable results required

### When to Use AI-Powered Mode

- Complex illustrations with semantic meaning
- Logo recolorization where brand hierarchy matters
- Illustrations where elements have conceptual relationships
- Need intelligent color assignment based on visual understanding

## Examples

### Basic AI Recolorization

```tsx
import { Mcu, useMcu, recolorizeSvg } from "react-mcu";

function MyComponent() {
  const { allPalettes } = useMcu();
  const [recolorizedSvg, setRecolorizedSvg] = useState("");

  useEffect(() => {
    const recolorize = async () => {
      const result = await recolorizeSvg(originalSvg, allPalettes, {
        aiConfig: {
          provider: "openai",
          apiKey: process.env.OPENAI_API_KEY,
        },
      });
      setRecolorizedSvg(result);
    };
    recolorize();
  }, [allPalettes, originalSvg]);

  return <div dangerouslySetInnerHTML={{ __html: recolorizedSvg }} />;
}
```

### With Filtered Palettes

```tsx
// Only use primary and secondary palettes
const filteredPalettes = {
  primary: allPalettes.primary,
  secondary: allPalettes.secondary,
};

const result = await recolorizeSvg(svgString, filteredPalettes, {
  aiConfig: { provider: "openai", apiKey: key },
});
```

### With Custom Model

```tsx
const result = await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "anthropic",
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-opus-20240229", // Higher quality, slower
  },
});
```

## Performance Considerations

### Distance-Based Mode

- **Speed**: Extremely fast, synchronous
- **Cost**: Free
- **Accuracy**: Perceptually accurate color matching

### AI-Powered Mode

- **Speed**: 1-3 seconds per image (async)
- **Cost**: API charges apply (varies by provider)
- **Accuracy**: Semantically intelligent, understands context

**Recommendations:**

- Use distance-based for real-time UI updates
- Use AI-powered for one-time asset processing or user-uploaded content
- Cache AI results to avoid repeated API calls
- Consider hybrid approach: AI for initial analysis, distance-based for variations

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for API keys
3. **Implement rate limiting** if exposing to users
4. **Validate SVG input** to prevent XSS attacks
5. **Consider server-side processing** for sensitive applications

```tsx
// ✅ Good: Environment variable
apiKey: process.env.OPENAI_API_KEY;

// ❌ Bad: Hardcoded key
apiKey: "sk-proj-...";
```

## Troubleshooting

### "Invalid SVG input"

- Ensure SVG is valid XML
- Check for parser errors in the SVG

### "OpenAI API error: 401"

- Verify API key is correct
- Check API key has proper permissions

### "Custom provider requires apiEndpoint"

- Provide `apiEndpoint` when using custom provider

### "Could not find JSON array in AI response"

- AI response format is unexpected
- Try with different model or custom prompt
- Check network/API issues

### Fallback not working

- Ensure you're awaiting the Promise
- Check console for warnings about fallback

## API Reference

### recolorizeSvg

```typescript
function recolorizeSvg(
  svgString: string,
  palettes: ReturnType<typeof useMcu>["allPalettes"],
  options?: RecolorizeSvgOptions,
): string | Promise<string>;
```

**Parameters:**

- `svgString`: SVG content as string
- `palettes`: MCU palettes object
- `options`: Optional configuration
  - `tolerance`: Tone matching tolerance (default: 15.0) - only for distance-based mode
  - `aiConfig`: AI configuration - enables AI mode when provided

**Returns:**

- `string`: Recolorized SVG (distance-based mode)
- `Promise<string>`: Recolorized SVG (AI mode)

### recolorizeSvgWithAI

Direct access to AI-powered recolorization:

```typescript
async function recolorizeSvgWithAI(
  svgString: string,
  palettes: ReturnType<typeof useMcu>["allPalettes"],
  aiConfig: AIRecolorizationConfig,
): Promise<string>;
```

## License

This feature is part of react-mcu and follows the same MIT license.

## Contributing

Contributions welcome! Areas for improvement:

- Additional AI providers
- Enhanced semantic role detection
- Performance optimizations
- More sophisticated tone matching
