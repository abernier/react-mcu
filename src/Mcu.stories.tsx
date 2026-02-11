import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { useMcu } from "./Mcu.context";
import { recolorizeSvg } from "./lib/recolorizeSvg";
import { Mcu, schemeNames, type McuConfig } from "./Mcu";
import { Layout, Scheme, Shades, TailwindScheme } from "./Mcu.stories.helpers";
import { allModes } from "../.storybook/modes";

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

function Scene({
  customColors,
  includedPalettesNames = [], // if empty, use all palettes
  excludedPalettesNames = [], // palettes to exclude
}: {
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
          <div dangerouslySetInnerHTML={{ __html: exampleSvg }} />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Recolorized SVG</h3>
          <RecolorizedIllustration
            svgContent={exampleSvg}
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

export const RecolorizeSvgSt1: Story = {
  name: "Recolorized SVG",
  parameters: {
    chromatic: {
      modes: {
        light: allModes["light"],
        dark: allModes["dark"],
      },
    },
  },
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
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

export const RecolorizeSvgSt2: Story = {
  name: "Recolorized SVG with custom-colors",
  parameters: {
    chromatic: {
      modes: {
        light: allModes["light"],
        dark: allModes["dark"],
      },
    },
  },
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
