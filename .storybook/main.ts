import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    // Configure Vite to resolve the TypeScript path alias for CSS @import statements
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-mcu/": "/src/",
    };
    return config;
  },
};
export default config;
