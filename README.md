# react-mcu

A React component library.

## Installation

```bash
npm install react-mcu
```

## Usage

```tsx
import { Mcu } from 'react-mcu';

function App() {
  return <Mcu />;
}
```

## Components

### Mcu

A simple component that renders "Hello World".

```tsx
<Mcu />
```

## Contributing

When submitting a pull request, please include a changeset to document your changes:

```bash
npx changeset
```

This helps us maintain the changelog and version the package appropriately.

### Important Notes

- **Do not use `[skip ci]`, `[ci skip]`, or similar directives** in commit messages for PRs that include changesets. These directives prevent ALL GitHub Actions workflows from running, including the release workflow that publishes packages to npm.
- The release workflow automatically runs when changes are merged to the `main` branch.
- If you need to skip CI checks during development, do so only on feature branches, not on commits that will be merged to `main`.
