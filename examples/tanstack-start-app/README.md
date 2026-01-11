# Minimal react-mcu + Tailwind v4 Example

The bare minimum code to use react-mcu with Tailwind CSS v4.

## Run

```bash
pnpm install
pnpm run build  # from repo root
cd examples/tanstack-start-app
pnpm run dev
```

## What's Here

**App.tsx** - Wrap your app with `<Mcu>`:

```tsx
import { Mcu } from "react-mcu";
import Home from "./Home";

function App() {
  return (
    <Mcu source="#0e1216" scheme="vibrant" contrast={0.5} customColors={[]}>
      <Home />
    </Mcu>
  );
}
```

**Home.tsx** - Use Tailwind classes with react-mcu colors:

```tsx
import { useMcu } from "react-mcu";

function Home() {
  const { initials, setMcuConfig } = useMcu();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
      <button
        onClick={() => setMcuConfig({ ...initials, source: "#FF5722" })}
        className="rounded bg-primary px-4 py-2 text-on-primary"
      >
        Change Theme
      </button>
    </div>
  );
}
```

**index.css** - Map react-mcu colors to Tailwind:

```css
@import "tailwindcss";

@theme {
  --color-surface: var(--mcu-surface);
  --color-on-surface: var(--mcu-on-surface);
  --color-primary: var(--mcu-primary);
  --color-on-primary: var(--mcu-on-primary);
}
```

That's it.
