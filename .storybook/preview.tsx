import type { Preview } from "@storybook/react-vite";
import { useChannel } from "storybook/preview-api";
import { builder } from "../src/lib/builder";
import "../src/tailwind.css";
import "./preview.css";

import { withThemeByClassName } from "@storybook/addon-themes";

const EXPORT_EVENT = "export-figma-tokens/export";

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story, context) => {
      useChannel({
        [EXPORT_EVENT]: () => {
          const { source, ...rest } = context.args;
          if (!source) return;
          const tokens = builder(source, rest).toFigmaTokens();
          for (const [filename, content] of Object.entries(tokens)) {
            downloadJSON(filename, content);
          }
        },
      });
      return <Story />;
    },
  ],
};

export default preview;
