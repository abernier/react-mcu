# Migration Guide: AI-Powered SVG Recolorization

This document explains the new AI-powered SVG recolorization feature and how to migrate or adopt it in your project.

## What's New

The `recolorizeSvg` function now supports an optional AI-powered mode that uses artificial intelligence to understand the semantic meaning of SVG elements and assign colors intelligently based on their conceptual roles.

## Breaking Changes

**None!** This feature is 100% backward compatible. All existing code will continue to work exactly as before.

## New Capabilities

### 1. Semantic Understanding

Instead of just matching colors by distance, the AI understands what elements represent:

```typescript
// Before: Colors matched by distance only
const result = recolorizeSvg(svg, palettes);

// Now available: AI understands semantic roles
const result = await recolorizeSvg(svg, palettes, {
  aiConfig: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
  },
});
```

### 2. Intelligent Role Mapping

The AI identifies semantic roles and maps them to appropriate palettes:

- **primary-object** → `primary` palette
- **background** → `surface` palette
- **accent** → `tertiary` palette
- **secondary-element** → `secondary` palette
- And more...

### 3. Multiple AI Provider Support

Choose from multiple AI providers or bring your own:

```typescript
// OpenAI
{ provider: "openai", apiKey: "..." }

// Anthropic
{ provider: "anthropic", apiKey: "..." }

// Custom
{ provider: "custom", apiKey: "...", apiEndpoint: "https://..." }
```

## When to Use Which Mode

### Use Distance-Based Mode (Default) When:

- ✅ You need fast, synchronous operations
- ✅ No AI API access or budget constraints
- ✅ SVG has simple, uniform colors
- ✅ Predictable, consistent results are required
- ✅ Real-time UI updates are needed

### Use AI-Powered Mode When:

- 🤖 Complex illustrations with semantic meaning
- 🤖 Logo recolorization where brand hierarchy matters
- 🤖 Illustrations where elements have conceptual relationships
- 🤖 One-time asset processing or batch jobs
- 🤖 User-uploaded content that varies widely

## Migration Examples

### No Changes Required

Your existing code works unchanged:

```typescript
// This continues to work exactly as before
const recolorized = recolorizeSvg(svgString, allPalettes);
```

### Opt-In to AI Mode

Simply add the `aiConfig` option:

```typescript
// Add AI-powered recolorization
const recolorized = await recolorizeSvg(svgString, allPalettes, {
  aiConfig: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
  },
});
```

### Gradual Migration

Start with AI for specific use cases:

```typescript
function recolorizeSvg(svg, palettes, options) {
  // Use AI for user uploads, distance-based for UI assets
  if (options.isUserUpload) {
    return recolorizeSvg(svg, palettes, {
      aiConfig: {
        provider: "openai",
        apiKey: process.env.OPENAI_API_KEY,
      },
    });
  }

  // Default distance-based for UI assets
  return recolorizeSvg(svg, palettes);
}
```

## Environment Setup

### 1. Get API Key

**OpenAI:**

1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to environment: `OPENAI_API_KEY=sk-...`

**Anthropic:**

1. Visit https://console.anthropic.com/settings/keys
2. Create new API key
3. Add to environment: `ANTHROPIC_API_KEY=sk-ant-...`

### 2. Environment Variables

Add to your `.env` file:

```bash
# Choose one or more providers
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...
```

**Important:** Never commit API keys to version control!

### 3. Usage in Code

```typescript
const result = await recolorizeSvg(svg, palettes, {
  aiConfig: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // From environment
    model: "gpt-4o", // Optional
  },
});
```

## Cost Considerations

### Distance-Based Mode

- **Cost:** Free
- **Speed:** <1ms
- **API calls:** None

### AI-Powered Mode

**OpenAI (GPT-4o):**

- **Cost:** ~$0.0025-0.01 per image
- **Speed:** 1-3 seconds
- **API calls:** 1 per image

**Anthropic (Claude):**

- **Cost:** ~$0.003-0.015 per image
- **Speed:** 1-3 seconds
- **API calls:** 1 per image

**Recommendations:**

- Cache AI results to avoid repeated costs
- Use distance-based for real-time operations
- Use AI for batch processing or one-time operations
- Consider setting rate limits for user-facing features

## Best Practices

### 1. Error Handling

Always handle AI errors gracefully:

```typescript
try {
  const result = await recolorizeSvg(svg, palettes, {
    aiConfig: { provider: "openai", apiKey: key },
  });
} catch (error) {
  console.error("AI failed:", error);
  // Fallback is automatic, or use distance-based explicitly
  const fallback = recolorizeSvg(svg, palettes);
}
```

### 2. Caching

Implement caching to reduce costs:

```typescript
const cache = new Map();

async function cachedRecolorize(svg, palettes) {
  const hash = hashSvg(svg);
  if (cache.has(hash)) {
    return cache.get(hash);
  }

  const result = await recolorizeSvg(svg, palettes, {
    aiConfig: { provider: "openai", apiKey: key },
  });

  cache.set(hash, result);
  return result;
}
```

### 3. Rate Limiting

Implement rate limiting for user-facing features:

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

app.post("/api/recolorize", limiter, async (req, res) => {
  // ... recolorize logic
});
```

### 4. Security

Never expose API keys in client-side code:

```typescript
// ❌ BAD: Client-side
const result = await recolorizeSvg(svg, palettes, {
  aiConfig: {
    provider: "openai",
    apiKey: "sk-...", // NEVER do this!
  },
});

// ✅ GOOD: Server-side
app.post("/api/recolorize", async (req, res) => {
  const result = await recolorizeSvg(req.body.svg, palettes, {
    aiConfig: {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY, // Safe on server
    },
  });
  res.json({ result });
});
```

## Troubleshooting

### "AI-powered recolorization failed, falling back..."

This is normal! The automatic fallback ensures your app keeps working even when AI fails. Check:

1. API key is correct
2. API key has credits/quota
3. Network connectivity
4. Provider service is up

### Slow Performance

If AI mode is too slow:

1. Use distance-based mode for real-time operations
2. Pre-process assets during build time
3. Cache results aggressively
4. Consider batch processing

### High Costs

To reduce costs:

1. Implement caching
2. Use distance-based mode where AI isn't needed
3. Rate limit user requests
4. Choose appropriate AI models (gpt-4o-mini, claude-haiku)

## Type Safety

All new types are fully typed:

```typescript
import type {
  AIRecolorizationConfig,
  AIProvider,
  RecolorizeSvgOptions,
} from "react-mcu";

const config: AIRecolorizationConfig = {
  provider: "openai", // Type-safe!
  apiKey: "...",
  model: "gpt-4o", // Optional, type-safe
};
```

## Further Reading

- [docs/AI_RECOLORIZATION.md](AI_RECOLORIZATION.md) - Complete API reference
- [src/examples/AIRecolorizationExample.tsx](../src/examples/AIRecolorizationExample.tsx) - Working examples
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)

## Support

For issues or questions:

1. Check [docs/AI_RECOLORIZATION.md](AI_RECOLORIZATION.md)
2. Review [examples](../src/examples/AIRecolorizationExample.tsx)
3. Open an issue on GitHub

## What's Next

Future enhancements may include:

- [ ] More AI providers (Google Gemini, etc.)
- [ ] Enhanced semantic role detection
- [ ] Performance optimizations
- [ ] More sophisticated tone matching
- [ ] Built-in caching strategies

---

**Happy recolorizing! 🎨**
