# Color Matching Algorithm Research

## Current Implementation

The current implementation in `src/lib/recolorizeSvg.ts` uses a custom weighted scoring algorithm:

```typescript
// Score calculation
let score = toneDist; // Weight: 1.0
score += chromaDist * 0.3; // Weight: 0.3
if (!targetIsNeutral && !paletteIsNeutral) {
  score += normalizedHueDiff * 0.2; // Weight: 0.2
}
score *= targetIsNeutral === paletteIsNeutral ? 0.8 : 1.5;
```

**Pros:**

- Fast and simple
- Works directly with HCT (Material Design color space)
- No external dependencies
- Good results for most cases

**Cons:**

- Weights are empirical, not based on color science research
- May not match human perception in all cases
- No standard for reproducibility

## Available npm Packages

### 1. **delta-e** (⭐ Recommended)

- **Size:** ~2kb
- **Algorithms:** CIE76, CIE94, CIEDE2000
- **Maintenance:** Active

**Why it's good:**

- CIEDE2000 is the industry standard for perceptual color difference
- Scientifically validated to match human perception
- Lightweight with no dependencies
- Can work with LAB color space (which HCT can convert to)

**Integration approach:**

```typescript
import { deltaE00 } from "delta-e";

// Convert HCT to LAB (need utility)
const targetLab = hctToLab(targetHct);
const paletteLab = hctToLab(paletteHct);

// Use CIEDE2000 for distance
const distance = deltaE00(targetLab, paletteLab);
```

**Trade-offs:**

- Need to implement HCT→LAB conversion
- Slightly slower than direct HCT distance (but negligible)

### 2. **chroma-js**

- **Size:** ~15kb
- **Features:** Comprehensive color manipulation
- **Algorithms:** Delta E, color scales, mixing

**Why it's good:**

- Batteries included - supports many color spaces
- Has built-in Delta E calculation
- Popular (10k+ GitHub stars)
- Good documentation

**Why we might not need it:**

- Much larger bundle size
- Overlaps with @material/material-color-utilities
- We only need distance calculation, not full color manipulation

### 3. **colorjs.io**

- **Size:** ~30kb
- **Features:** Most comprehensive color science library
- **Algorithms:** Everything including CIEDE2000, Jzazbz, etc.

**Why it's overkill:**

- Too large for this use case
- More complexity than needed
- We already have good HCT support

### 4. **color-diff**

- **Size:** ~1kb
- **Algorithms:** Basic Delta E

**Why it's not recommended:**

- Less maintained
- Only implements CIE76 (older algorithm)
- delta-e is better

## Recommended Approach

### Option A: Use delta-e (Recommended for new PR)

**Steps:**

1. Add `delta-e` package (~2kb)
2. Implement HCT→LAB conversion utility
3. Replace custom scoring with CIEDE2000 distance
4. Keep neutral/colored detection logic
5. A/B test with visual examples

**Expected improvements:**

- More accurate color matching based on human perception
- Industry-standard algorithm
- Reproducible results
- Better handling of edge cases (very dark/light colors, near-neutral colors)

**Code structure:**

```typescript
// New utility: hctToLab()
function hctToLab(hct: Hct): { L: number; a: number; b: number } {
  // Convert HCT → RGB → XYZ → LAB
  // or HCT → XYZ → LAB (if direct conversion available)
}

// Replace findBestToken scoring
const targetLab = hctToLab(targetHct);
for (const tone of STANDARD_TONES) {
  const toneHct = Hct.fromInt(c.palette.tone(tone));
  const toneLab = hctToLab(toneHct);
  const distance = deltaE00(targetLab, toneLab);

  // Apply neutral/colored bonus
  let score = distance;
  if (targetIsNeutral === paletteIsNeutral) {
    score *= 0.8;
  } else {
    score *= 1.5;
  }

  // Find minimum
  if (score < bestScore) {
    bestScore = score;
    bestToken = ...;
  }
}
```

### Option B: Improve Current Algorithm

If we want to avoid new dependencies, we can improve the current algorithm with research-backed weights:

**Suggested weight adjustments:**

```typescript
// Based on CIEDE2000 component weights
let score = toneDist * 1.0; // Lightness (L*)
score += chromaDist * 0.45; // Chroma (similar to C*)
score += normalizedHueDiff * 0.5; // Hue (similar to H*)
```

**Neutral detection adjustment:**

```typescript
// More accurate neutral threshold
const targetIsNeutral = targetHct.chroma < 5; // was 8
```

## Testing Plan

Whichever approach we choose, we should test with:

1. **Orange colors** (#ffaf1e, #d46c1a, #faa11c) → should match orange/yellow palette
2. **Blue colors** (#5080d0, #4285f4) → should match blue palette
3. **Near-neutral colors** (#e0e0e0, #808080) → should match neutral palette
4. **Very saturated colors** (#ff0000, #00ff00) → should find closest hue
5. **Dark colors** (#1a1a1a, #2d2d2d) → should match dark tones correctly

## Benchmarking

If we implement delta-e, we should benchmark:

- **Performance:** Time to recolor a typical SVG (100-500 elements)
- **Accuracy:** Visual comparison of before/after
- **Bundle size:** Impact on build output

## Conclusion

**For the exploration PR:**

- Implement Option A (delta-e integration)
- Create side-by-side comparison in Storybook
- Measure performance impact
- Gather visual feedback

**If delta-e doesn't show significant improvement:**

- Fall back to Option B (tuned current algorithm)
- Document the reasoning
- Keep the simpler implementation

## References

- [CIEDE2000 Color-Difference Formula](http://www2.ece.rochester.edu/~gsharma/ciede2000/)
- [Delta E Wikipedia](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000)
- [Material Design 3 Color System](https://m3.material.io/styles/color/the-color-system)
- [HCT Color Space](https://material.io/blog/science-of-color-design)
