import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { useMcu } from "./Mcu.context";
import { recolorizeSvg } from "./lib/recolorizeSvg";
import type { TonalPalette } from "@material/material-color-utilities";
import { Mcu, schemeNames, type McuConfig } from "./Mcu";
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

export const St1: Story = {
  name: "Default",
  args: {
    source: "#769CDF",
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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

export const ContrastLowSt: Story = {
  name: "[contrast] low",
  args: {
    source: "#769CDF",
    contrast: -1,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastMediumSt: Story = {
  name: "[contrast] medium",
  args: {
    source: "#769CDF",
    contrast: 0,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastHighSt: Story = {
  name: "[contrast] high",
  args: {
    source: "#769CDF",
    contrast: 1,
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastAllColorsLowSt: Story = {
  name: "[contrast][contrastAllColors] low",
  args: {
    source: "#769CDF",
    contrast: -1,
    contrastAllColors: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastAllColorsMediumSt: Story = {
  name: "[contrast][contrastAllColors] medium",
  args: {
    source: "#769CDF",
    contrast: 0,
    contrastAllColors: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
        {!args.adaptiveShades && <Shades customColors={args.customColors} />}
      </Layout>
    </Mcu>
  ),
};

export const ContrastAllColorsHighSt: Story = {
  name: "[contrast][contrastAllColors] high",
  args: {
    source: "#769CDF",
    contrast: 1,
    contrastAllColors: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
        <Scheme
          theme="light"
          title="Light scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>

        <Scheme
          theme="dark"
          title="Dark scheme"
          customColors={args.customColors}
        >
          {args.adaptiveShades && <Shades customColors={args.customColors} />}
        </Scheme>
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
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
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

//
// ██████  ███████  ██████  ██████  ██       ██████  ██████
// ██   ██ ██      ██      ██    ██ ██      ██    ██ ██   ██
// ██████  █████   ██      ██    ██ ██      ██    ██ ██████
// ██   ██ ██      ██      ██    ██ ██      ██    ██ ██   ██
// ██   ██ ███████  ██████  ██████  ███████  ██████  ██   ██
//

const RecolorizedIllustration = ({
  svgContent,
  palettes,
}: {
  svgContent: string;
  palettes: ReturnType<typeof useMcu>["allPalettes"];
}) => {
  const recoloredSvg = useMemo(() => {
    return recolorizeSvg(svgContent, palettes);
  }, [svgContent, palettes]);

  return <div dangerouslySetInnerHTML={{ __html: recoloredSvg }} />;
};

// Example SVG with various colors that will be recolorized
const exampleSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="200" fill="#F5F5F5"/>
  
  <!-- Orange shapes (will map to primary palette) -->
  <circle cx="50" cy="50" r="30" fill="#ffaf1e"/>
  <circle cx="150" cy="50" r="20" fill="#faa11c"/>
  <rect x="20" y="100" width="40" height="40" fill="#ec801a"/>
  
  <!-- Darker orange/red shapes -->
  <circle cx="100" cy="100" r="25" fill="#d46c1a"/>
  <rect x="120" y="100" width="30" height="30" fill="#97381c"/>
  <circle cx="50" cy="150" r="15" fill="#7b2719"/>
  <rect x="80" y="140" width="25" height="25" fill="#591716"/>
  
  <!-- Light accent -->
  <circle cx="150" cy="150" r="20" fill="#fbc775"/>
</svg>
`;

// Landscape SVG with nature elements
const landscapeSvg = `
<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky -->
  <rect width="200" height="150" fill="#87CEEB"/>
  
  <!-- Sun -->
  <circle cx="180" cy="30" r="15" fill="#FFD700"/>
  
  <!-- Mountains -->
  <polygon points="0,150 40,80 80,150" fill="#8B7355"/>
  <polygon points="50,150 100,60 150,150" fill="#A0826D"/>
  <polygon points="120,150 160,70 200,150" fill="#8B7355"/>
  
  <!-- Trees -->
  <rect x="20" y="110" width="8" height="40" fill="#8B4513"/>
  <circle cx="24" cy="110" r="12" fill="#228B22"/>
  <rect x="60" y="120" width="8" height="30" fill="#8B4513"/>
  <circle cx="64" cy="120" r="10" fill="#2E8B57"/>
  <rect x="140" y="115" width="8" height="35" fill="#8B4513"/>
  <circle cx="144" cy="115" r="11" fill="#228B22"/>
</svg>
`;

// Abstract geometric SVG
const geometricSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="200" fill="#FFFFFF"/>
  
  <!-- Large blue circle -->
  <circle cx="100" cy="100" r="70" fill="#4169E1"/>
  
  <!-- Red triangle -->
  <polygon points="100,40 60,120 140,120" fill="#DC143C"/>
  
  <!-- Yellow square -->
  <rect x="70" y="70" width="60" height="60" fill="#FFD700"/>
  
  <!-- Green circle -->
  <circle cx="100" cy="100" r="30" fill="#32CD32"/>
  
  <!-- Purple small circle -->
  <circle cx="100" cy="50" r="15" fill="#9370DB"/>
</svg>
`;

// Icon set SVG
const iconSetSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="200" fill="#F0F0F0"/>
  
  <!-- Heart icon -->
  <path d="M50,60 C50,50 40,40 30,40 C20,40 10,50 10,60 C10,80 30,100 50,120 C70,100 90,80 90,60 C90,50 80,40 70,40 C60,40 50,50 50,60 Z" fill="#E74C3C"/>
  
  <!-- Star icon -->
  <polygon points="150,30 160,60 190,60 165,80 175,110 150,90 125,110 135,80 110,60 140,60" fill="#F39C12"/>
  
  <!-- Home icon -->
  <path d="M50,140 L50,190 L90,190 L90,160 L60,160 L60,190 L50,190 L50,140 M50,140 L70,120 L90,140" fill="#3498DB"/>
  <rect x="60" y="160" width="20" height="30" fill="#2980B9"/>
  
  <!-- Settings icon (gear) -->
  <circle cx="150" cy="170" r="20" fill="#95A5A6"/>
  <circle cx="150" cy="170" r="12" fill="#7F8C8D"/>
  <rect x="148" y="145" width="4" height="10" fill="#95A5A6"/>
  <rect x="148" y="185" width="4" height="10" fill="#95A5A6"/>
  <rect x="125" y="168" width="10" height="4" fill="#95A5A6"/>
  <rect x="165" y="168" width="10" height="4" fill="#95A5A6"/>
</svg>
`;

// UI Components SVG
const uiComponentsSvg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="200" fill="#FFFFFF"/>
  
  <!-- Button (primary) -->
  <rect x="10" y="20" width="80" height="30" rx="5" fill="#007BFF"/>
  <text x="50" y="40" text-anchor="middle" fill="#FFFFFF" font-size="12">Button</text>
  
  <!-- Button (success) -->
  <rect x="110" y="20" width="80" height="30" rx="5" fill="#28A745"/>
  <text x="150" y="40" text-anchor="middle" fill="#FFFFFF" font-size="12">Success</text>
  
  <!-- Input field -->
  <rect x="10" y="70" width="180" height="30" rx="3" fill="#E9ECEF" stroke="#CED4DA" stroke-width="1"/>
  
  <!-- Card -->
  <rect x="10" y="120" width="85" height="70" rx="5" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="1"/>
  <circle cx="30" cy="140" r="8" fill="#6C757D"/>
  <rect x="45" y="135" width="40" height="4" fill="#6C757D"/>
  <rect x="45" y="145" width="30" height="3" fill="#ADB5BD"/>
  
  <!-- Badge -->
  <circle cx="150" cy="135" r="15" fill="#DC3545"/>
  <text x="150" y="140" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="bold">5</text>
  
  <!-- Progress bar -->
  <rect x="10" y="180" width="180" height="10" rx="5" fill="#E9ECEF"/>
  <rect x="10" y="180" width="120" height="10" rx="5" fill="#17A2B8"/>
</svg>
`;

function Scene({
  svgContent = exampleSvg,
  customColors,
  includedPalettesNames = [], // if empty, use all palettes
  excludedPalettesNames = [], // palettes to exclude
}: {
  svgContent?: string;
  customColors?: McuConfig["customColors"];
  includedPalettesNames?: string[];
  excludedPalettesNames?: string[];
}) {
  const { allPalettes } = useMcu();

  let palettes = allPalettes;

  // Only include specified palettes / otherwise use all
  if (includedPalettesNames.length > 0) {
    palettes = Object.fromEntries(
      Object.entries(allPalettes).filter(([name]) =>
        includedPalettesNames.includes(name),
      ),
    );
  }
  // Exclude specified palettes
  if (excludedPalettesNames.length > 0) {
    palettes = Object.fromEntries(
      Object.entries(palettes).filter(
        ([name]) => !excludedPalettesNames.includes(name),
      ),
    );
  }

  return (
    <Layout>
      <div className="space-y-4 grid grid-cols-2 gap-2">
        <div>
          <h3 className="text-lg font-bold mb-2">Original SVG</h3>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Recolorized SVG</h3>
          <RecolorizedIllustration
            svgContent={svgContent}
            palettes={palettes}
          />
        </div>
      </div>

      <Scheme title="Color Scheme" customColors={customColors}>
        <Shades customColors={customColors} />
      </Scheme>
    </Layout>
  );
}

export const RecolorizeSvg: Story = {
  name: "Recolorized SVG",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene
        customColors={args.customColors}
        // includedPalettesNames={[
        //   "primary",
        //   "secondary",
        //   "tertiary"
        // ]}
        excludedPalettesNames={["error"]}
      />
    </Mcu>
  ),
};

export const RecolorizeLandscape: Story = {
  name: "Recolorized SVG - Landscape",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene
        svgContent={landscapeSvg}
        customColors={args.customColors}
        excludedPalettesNames={["error"]}
      />
    </Mcu>
  ),
};

export const RecolorizeGeometric: Story = {
  name: "Recolorized SVG - Geometric",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene
        svgContent={geometricSvg}
        customColors={args.customColors}
        excludedPalettesNames={["error"]}
      />
    </Mcu>
  ),
};

export const RecolorizeIconSet: Story = {
  name: "Recolorized SVG - Icon Set",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene
        svgContent={iconSetSvg}
        customColors={args.customColors}
        excludedPalettesNames={["error"]}
      />
    </Mcu>
  ),
};

export const RecolorizeUIComponents: Story = {
  name: "Recolorized SVG - UI Components",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
    customColors: [
      { name: "myCustomColor1", hex: customColor1, blend: true },
      { name: "myCustomColor2", hex: customColor2, blend: true },
    ],
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene
        svgContent={uiComponentsSvg}
        customColors={args.customColors}
        excludedPalettesNames={["error"]}
      />
    </Mcu>
  ),
};
