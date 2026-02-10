import type { Meta, StoryObj } from "@storybook/react-vite";

import { Mcu, schemeNames } from "./Mcu";
import { Layout, Scheme, Shades, TailwindScheme } from "./stories-helpers";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Mcu,
  parameters: {
    // layout: "centered",
    chromatic: {
      // modes: {
      //   light: allModes["light"],
      //   dark: allModes["dark"],
      // },
    },
  },
  globals: {
    // backgrounds: { grid: true },
  },
  // args: {
  //   source: "#769CDF",
  //   scheme: DEFAULT_SCHEME,
  //   contrast: DEFAULT_CONTRAST,
  //   colorMatch: DEFAULT_COLOR_MATCH,
  //   primary: "#63A002",
  //   secondary: "#85976E",
  //   tertiary: "#4D9D98",
  //   error: "#FF5449",
  //   neutral: "#91918B",
  //   neutralVariant: "#8F9285",
  //   customColors: [
  //     { name: "myCustomColor1", hex: "#6C8A0C", blend: true },
  //     { name: "myCustomColor2", hex: "#E126C6", blend: true },
  //     { name: "myCustomColor3", hex: "#E126C6", blend: false },
  //   ],
  // },
  argTypes: {
    source: {
      control: "color",
    },
    scheme: {
      control: "select",
      options: schemeNames,
    },
    contrast: {
      control: { type: "range", min: -1, max: 1, step: 0.1 },
    },
    contrastAllColors: {
      control: "boolean",
    },
    adaptiveShades: {
      control: "boolean",
    },
    primary: {
      control: "color",
    },
    secondary: {
      control: "color",
    },
    tertiary: {
      control: "color",
    },
    error: {
      control: "color",
    },
    neutral: {
      control: "color",
    },
    neutralVariant: {
      control: "color",
    },
    children: {
      table: { disable: true }, // hide
    },
  },
} satisfies Meta<typeof Mcu>;

export default meta;
type Story = StoryObj<typeof meta>;

const customColor1 = "#00D68A";
const customColor2 = "#FFE16B";

export const customColors = [
  { name: "myCustomColor1", hex: customColor1, blend: true },
  { name: "myCustomColor2", hex: customColor2, blend: true },
];

export const St1: Story = {
  name: "Default",
  args: {
    source: "#769CDF",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//
// ███████  ██████ ██   ██ ███████ ███    ███ ███████
// ██      ██      ██   ██ ██      ████  ████ ██
// ███████ ██      ███████ █████   ██ ████ ██ █████
//      ██ ██      ██   ██ ██      ██  ██  ██ ██
// ███████  ██████ ██   ██ ███████ ██      ██ ███████
//

export const MonochromeSt: Story = {
  name: "[scheme=monochrome]",
  args: {
    source: "#769CDF",
    scheme: "monochrome",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const NeutralSt: Story = {
  name: "[scheme=neutral]",
  args: {
    source: "#769CDF",
    scheme: "neutral",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const VibrantSt: Story = {
  name: "[scheme=vibrant]",
  args: {
    source: "#769CDF",
    scheme: "vibrant",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ExpressiveSt: Story = {
  name: "[scheme=expressive]",
  args: {
    source: "#769CDF",
    scheme: "expressive",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const FidelitySt: Story = {
  name: "[scheme=fidelity]",
  args: {
    source: "#769CDF",
    scheme: "fidelity",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContentSt: Story = {
  name: "[scheme=content]",
  args: {
    source: "#769CDF",
    scheme: "content",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//
//  ██████  ██████  ███    ██ ████████ ██████   █████  ███████ ████████
// ██      ██    ██ ████   ██    ██    ██   ██ ██   ██ ██         ██
// ██      ██    ██ ██ ██  ██    ██    ██████  ███████ ███████    ██
// ██      ██    ██ ██  ██ ██    ██    ██   ██ ██   ██      ██    ██
//  ██████  ██████  ██   ████    ██    ██   ██ ██   ██ ███████    ██
//

export const ContrastSt: Story = {
  name: "[contrast]",
  args: {
    source: "#769CDF",
    contrast: 0.5,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastAllColorsSt: Story = {
  name: "[contrast][contrastAllColors]",
  args: {
    source: "#769CDF",
    contrast: -1,
    contrastAllColors: true,
    // contrastAllColors should impact custom-colors too (as well as shades)
    customColors,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const AdaptiveShadesSt: Story = {
  name: "[adaptiveShades]",
  args: {
    source: "#769CDF",
    adaptiveShades: true,
    customColors,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//
//  ██████  ██████  ██████  ███████
// ██      ██    ██ ██   ██ ██
// ██      ██    ██ ██████  █████
// ██      ██    ██ ██   ██ ██
//  ██████  ██████  ██   ██ ███████
//

export const PrimarySt: Story = {
  name: "[primary]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

export const PrimarySecondarySt: Story = {
  name: "[primary][secondary]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
    secondary: "#b03a3a",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

export const PrimarySecondaryTertiarySt: Story = {
  name: "[primary][secondary][tertiary]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
    secondary: "#b03a3a",
    tertiary: "#2138d2",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

export const PrimarySecondaryTertiaryErrorSt: Story = {
  name: "[primary][secondary][tertiary][error]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
    secondary: "#b03a3a",
    tertiary: "#2138d2",
    error: "#479200",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

export const PrimarySecondaryTertiaryErrorNeutralSt: Story = {
  name: "[primary][secondary][tertiary][error][neutral]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
    secondary: "#b03a3a",
    tertiary: "#2138d2",
    error: "#479200",
    neutral: "#957FF1",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

export const PrimarySecondaryTertiaryErrorNeutralNeutralVariantSt: Story = {
  name: "[primary][secondary][tertiary][error][neutral][neutralVariant]",
  args: {
    source: "#769CDF", // keep source because required (but primary will be considered effective one)
    primary: "#cab337",
    secondary: "#b03a3a",
    tertiary: "#2138d2",
    error: "#479200",
    neutral: "#957FF1",
    neutralVariant: "#007EDF",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "var(--sb-background)",
          }}
        >
          <Scheme title="Light scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>

        <div
          className="dark"
          style={{ backgroundColor: "#1c1b1f", color: "var(--sb-foreground)" }}
        >
          <Scheme title="Dark scheme" customColors={args.customColors}>
            {args.adaptiveShades && <Shades customColors={args.customColors} />}
          </Scheme>
        </div>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

//

// export const PrimarySecondaryTertiaryErrorNeutralNeutralVariantColorMatchSt: Story =
//   {
//     name: "[primary][secondary][tertiary][error][neutral][neutralVariant][colorMatch]",
//     args: {
//       source: "#769CDF", // keep source because required (but primary will be considered effective one)
//       primary: "#cab337",
//       secondary: "#b03a3a",
//       tertiary: "#2138d2",
//       error: "#479200",
//       neutral: "#957FF1",
//       neutralVariant: "#007EDF",
//       colorMatch: true,
//     },
//     render: (args) => (
//       <Mcu {...args}>
//         <Bar customColors={args.customColors} />
//       </Mcu>
//     ),
//   };

//
//  ██████ ██    ██ ███████ ████████  ██████  ███    ███
// ██      ██    ██ ██         ██    ██    ██ ████  ████
// ██      ██    ██ ███████    ██    ██    ██ ██ ████ ██
// ██      ██    ██      ██    ██    ██    ██ ██  ██  ██
//  ██████  ██████  ███████    ██     ██████  ██      ██
//

export const CustomColorsSt: Story = {
  name: "Custom colors",
  args: {
    source: "#769CDF",
    customColors,
  },
  render: St1.render,
};

export const CustomColorsHarmonizedSt: Story = {
  name: "Custom colors (no harmonization)",
  args: {
    source: "#769CDF",
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: false },
      { name: "myCustomColor2", hex: customColor2, blend: false },
    ],
  },
  render: St1.render,
};

//
// ████████  █████  ██ ██      ██     ██ ██ ███    ██ ██████
//    ██    ██   ██ ██ ██      ██     ██ ██ ████   ██ ██   ██
//    ██    ███████ ██ ██      ██  █  ██ ██ ██ ██  ██ ██   ██
//    ██    ██   ██ ██ ██      ██ ███ ██ ██ ██  ██ ██ ██   ██
//    ██    ██   ██ ██ ███████  ███ ███  ██ ██   ████ ██████
//

export const TailwindSt: Story = {
  name: "Tailwind",
  args: CustomColorsSt.args,
  render: (args) => (
    <Mcu {...args}>
      <TailwindScheme />
    </Mcu>
  ),
};
