# TanStack Start Example with react-mcu

This example demonstrates how to use `react-mcu` with TanStack Router and TanStack Query.

## Features

- 🎨 Dynamic Material Design 3 color theming with `react-mcu`
- 🚀 TanStack Router for routing
- ⚡ TanStack Query for data fetching
- 📦 Vite for fast development and building
- 🎯 TypeScript support

## Getting Started

### Prerequisites

From the repository root, make sure you have installed dependencies:

```bash
pnpm install
```

### Build react-mcu

Before running the example, build the react-mcu library:

```bash
# From the repository root
pnpm run build
```

### Run the Example

```bash
# Navigate to the example directory
cd examples/tanstack-start-app

# Start the development server
pnpm run dev
```

The app will be available at http://localhost:5173/

### Build for Production

```bash
pnpm run build
```

## What's Demonstrated

This example shows:

1. **Wrapping the app with `<Mcu>`**: The entire app is wrapped with the `Mcu` component in `App.tsx`, providing Material Design 3 color variables to all components.

2. **Using CSS variables**: Components use `var(--mcu-*)` CSS variables for colors:
   - `--mcu-surface`, `--mcu-on-surface`
   - `--mcu-primary`, `--mcu-on-primary`
   - `--mcu-primary-container`, `--mcu-on-primary-container`
   - `--mcu-secondary-container`, `--mcu-on-secondary-container`
   - `--mcu-tertiary-container`, `--mcu-on-tertiary-container`
   - And many more!

3. **Using the `useMcu` hook**: The Home component demonstrates:
   - `initials` - access to initial configuration
   - `setMcuConfig()` - dynamically change the theme
   - `getMcuColor()` - get computed color values

4. **Custom colors**: The example includes custom colors that can be used alongside Material Design 3 colors.

## Screenshots

### Initial State

![Initial State](https://github.com/user-attachments/assets/a86f35ca-7ec2-4b31-a08a-ea7412082237)

### After Color Change

![After Color Change](https://github.com/user-attachments/assets/482ae4f7-e268-48c7-9444-59f5197f4325)

## Learn More

- [react-mcu documentation](../../README.md)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Material Design 3 Color System](https://m3.material.io/styles/color/roles)
