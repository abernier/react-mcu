import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  docs: {
    autodocs: true,
  },
};
export default config;
