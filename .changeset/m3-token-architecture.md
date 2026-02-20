---
"react-mcu": major
---

### BREAKING: CSS custom properties renamed to follow Material Design 3 token architecture

All generated CSS custom properties have been renamed to align with the official M3 design token naming convention (`sys.color` for semantic tokens, `ref.palette` for tonal palettes).

#### Scheme tokens (semantic colors)

| Before             | After                       |
| ------------------ | --------------------------- |
| `--mcu-primary`    | `--md-sys-color-primary`    |
| `--mcu-on-primary` | `--md-sys-color-on-primary` |
| `--mcu-surface`    | `--md-sys-color-surface`    |
| `--mcu-{token}`    | `--md-sys-color-{token}`    |

#### Tonal palette tokens (shades)

| Before                   | After                               |
| ------------------------ | ----------------------------------- |
| `--mcu-primary-40`       | `--md-ref-palette-primary-40`       |
| `--mcu-secondary-90`     | `--md-ref-palette-secondary-90`     |
| `--mcu-{palette}-{tone}` | `--md-ref-palette-{palette}-{tone}` |

#### New `prefix` prop

The default prefix is `"md"` (Material Design convention). Use the new `prefix` prop to customize it:

```tsx
<Mcu source="#6750A4" prefix="my-app">
```

This produces `--my-app-sys-color-primary`, `--my-app-ref-palette-primary-40`, etc.

#### Migration

Find and replace in your CSS/Tailwind:

1. `--mcu-<palette>-<tone>` → `--md-ref-palette-<palette>-<tone>` (palette shades)
2. `--mcu-<token>` → `--md-sys-color-<token>` (semantic tokens)

Or set `prefix="mcu"` and adapt the new `sys-color` / `ref-palette` segments.

#### Scheme tokens now reference palette tokens via `var()`

Scheme tokens are no longer raw hex values — they resolve to `var(--md-ref-palette-...)`, enabling a single point of truth for color values.

#### Tonal palette expanded from 18 to 28 tones

New tones added: 4, 6, 12, 17, 22, 24, 35, 87, 92, 94, 96. This increases the number of CSS variables generated but does not break existing usage.

#### Figma tokens (`toFigmaTokens()`) restructured

- Top-level structure changed from `Schemes` / `Palettes` to `ref.palette.*` / `sys.color.*`
- System tokens now use DTCG alias syntax `{ref.palette.Primary.40}` instead of direct color values
- System tokens include `$description` and `css.variable` (kebab-case) extensions
