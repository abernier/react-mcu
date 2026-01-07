import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Mcu } from "./Mcu";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Mcu,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
} satisfies Meta<typeof Mcu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const St1: Story = {
  args: {},
};
