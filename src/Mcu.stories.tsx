import type { Meta, StoryObj } from "@storybook/react-vite";

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
} satisfies Meta<typeof Mcu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const St1: Story = {
  args: {
    source: "#0e1216",
    scheme: "vibrant",
    contrast: 0.5,
    customColors: [],
    children: null,
  },
  render: (args) => <Mcu {...args}>Hello MCU</Mcu>,
};
