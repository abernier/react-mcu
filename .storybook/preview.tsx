import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "./preview.css";
import "../src/tailwind.css";

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
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      useEffect(() => {
        document.body.classList.toggle("sb-dark-theme", theme === "dark");

        return () => {
          document.body.classList.remove("sb-dark-theme");
        };
      }, [theme]);

      return (
        <div className={theme === "dark" ? "dark" : ""}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
