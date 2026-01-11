import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    // Configure Vite to resolve the TypeScript path alias
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    if (Array.isArray(config.resolve.alias)) {
      config.resolve.alias.push({
        find: /^react-mcu\//,
        replacement: "/src/",
      });
    } else {
      config.resolve.alias["react-mcu/"] = "/src/";
    }

    return config;
  },
};
export default config;
