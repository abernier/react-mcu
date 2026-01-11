# TanStack Start Example with react-mcu + Tailwind v4

This is a minimal example demonstrating how to use `react-mcu` with Tailwind CSS v4, TanStack Router, and TanStack Query.

## Features

- 🎨 Dynamic Material Design 3 color theming with `react-mcu`
- 🎯 Tailwind CSS v4 with react-mcu CSS variables
- 🚀 TanStack Router for routing
- ⚡ TanStack Query for data fetching
- 📦 Vite for fast development
- 🎯 TypeScript support

## Getting Started

### Prerequisites

From the repository root:

```bash
pnpm install
pnpm run build
```

### Run the Example

```bash
cd examples/tanstack-start-app
pnpm run dev
```

The app will be available at http://localhost:5173/

### Build for Production

```bash
pnpm run build
```

## What's Demonstrated

This minimal example shows:

1. **Tailwind CSS v4 Integration**: Using `@theme` to map react-mcu CSS variables to Tailwind color utilities.

2. **react-mcu Setup**: Wrapping the app with `<Mcu>` component in `App.tsx`.

3. **Dynamic Theming**: Using the `useMcu` hook to change themes at runtime.

4. **Tailwind Utilities**: Using Tailwind classes like `bg-primary`, `text-on-primary`, `bg-surface-container`, etc.

## Tailwind v4 Configuration

In `src/index.css`, react-mcu variables are mapped to Tailwind colors:

```css
@import "tailwindcss";

@theme {
  --color-surface: var(--mcu-surface);
  --color-on-surface: var(--mcu-on-surface);
  --color-primary: var(--mcu-primary);
  --color-on-primary: var(--mcu-on-primary);
  /* ... more colors */
}
```

Then use them with Tailwind utilities:

```jsx
<div className="bg-surface text-on-surface">
  <button className="bg-primary text-on-primary">Button</button>
</div>
```

## Screenshots

**Initial state:**

![Initial State](https://github.com/user-attachments/assets/16f4dae6-de09-4778-939b-a3f33a9a8275)

**After theme change:**

![After Theme Change](https://github.com/user-attachments/assets/bfb4f7a8-a330-4028-b081-54afa5cb1470)

## Learn More

- [react-mcu documentation](../../README.md)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Material Design 3 Color System](https://m3.material.io/styles/color/roles)
