const config = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*": "prettier --write --ignore-unknown",
};

/**
 * @type {import('lint-staged').Configuration}
 */
export default config;
