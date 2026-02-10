import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { Mcu, schemeNames, type McuConfig } from "./Mcu";
import { useMcu } from "./Mcu.context";
import { recolorizeSvgDirect } from "./lib/recolorizeSvg";
import { Layout, Scheme, Shades } from "./stories-helpers";
import type { TonalPalette } from "@material/material-color-utilities";

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

//

const RecolorizedIllustration = ({
  svgContent,
  palettes,
}: {
  svgContent: string;
  palettes: Record<string, TonalPalette>;
}) => {
  const recoloredSvg = useMemo(() => {
    return recolorizeSvgDirect(svgContent, palettes);
  }, [svgContent, palettes]);

  return (
    <div
      className="size-64"
      dangerouslySetInnerHTML={{ __html: recoloredSvg }}
    />
  );
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
}: {
  customColors?: McuConfig["customColors"];
  includedPalettesNames?: string[];
}) {
  const { allPalettes } = useMcu();

  let palettes: Record<string, TonalPalette> = allPalettes;
  if (includedPalettesNames.length > 0) {
    palettes = Object.fromEntries(
      Object.entries(allPalettes).filter(([name]) =>
        includedPalettesNames.includes(name),
      ),
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Original SVG</h3>
          <div
            className="size-64 border border-gray-300"
            dangerouslySetInnerHTML={{ __html: exampleSvg }}
          />
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

export const RecolorizeSvg: Story = {
  name: "Recolorized SVG",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    adaptiveShades: true,
  },
  render: (args) => (
    <Mcu {...args}>
      <Scene customColors={args.customColors} />
    </Mcu>
  ),
};
