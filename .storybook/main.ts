import type { StorybookConfig } from "@storybook/react-vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
  ],
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), viteSingleFile()];
    return config;
  },
};
export default config;
