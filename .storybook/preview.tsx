import type { Preview } from "@storybook/react-vite";
import "../src/tailwind.css";
import "./preview.css";

import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    specVersion: {
      description: "Material Design spec version",
      toolbar: {
        title: "Spec",
        icon: "switchalt",
        items: [
          { value: "2021", title: "2021" },
          { value: "2025", title: "2025" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    specVersion: "2021",
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
