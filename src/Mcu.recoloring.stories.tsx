import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  argbFromHex,
  Hct,
  hexFromArgb,
  Score,
} from "@material/material-color-utilities";
import { Mcu, schemeNames } from "./Mcu";
import { Layout, Scheme, Shades } from "./stories-helpers";

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
// ██████  ███████  ██████  ██████  ██       ██████  ██████
// ██   ██ ██      ██      ██    ██ ██      ██    ██ ██   ██
// ██████  █████   ██      ██    ██ ██      ██    ██ ██████
// ██   ██ ██      ██      ██    ██ ██      ██    ██ ██   ██
// ██   ██ ███████  ██████  ██████  ███████  ██████  ██   ██
//

export type WeightedColor = {
  hex: string;
  weight: number; // Ex: nombre de pixels, pourcentage, score de fréquence...
};

type ColorFamily = {
  mother: string;
  shades: string[];
};

/**
 * Fonction principale avec POIDS
 * @param inputs Liste des objets { hex, weight }
 * @param maxMothers Le nombre max de familles souhaitées (si undefined, pas de limite imposée, c'est la fonction qui détermine en fonction de la proximité des couleurs)
 */
function organizePalette(
  inputs: WeightedColor[],
  maxMothers?: number,
): ColorFamily[] {
  // 1. PRÉPARATION : Compter les fréquences pondérées
  // La clé est la couleur (int), la valeur est le POIDS CUMULÉ.
  const colorToWeight = new Map<number, number>();

  // On sert aussi de cette liste pour ne traiter chaque couleur unique qu'une seule fois plus tard
  const uniqueHexSet = new Set<string>();

  inputs.forEach((item) => {
    const argb = argbFromHex(item.hex);
    uniqueHexSet.add(item.hex);

    // C'est ici que ça change : on ajoute le poids fourni au lieu de juste incrémenter
    const currentWeight = colorToWeight.get(argb) || 0;
    colorToWeight.set(argb, currentWeight + item.weight);
  });

  // 2. IDENTIFIER LES MÈRES (Score prend en compte le poids !)
  // L'algo de Google va maintenant favoriser les couleurs avec un gros 'weight' cumulé
  const scoredMothers = Score.score(colorToWeight);

  const topMothersInt =
    maxMothers !== undefined
      ? scoredMothers.slice(0, maxMothers)
      : scoredMothers;

  // Préparer la structure de résultat
  const families: ColorFamily[] = topMothersInt.map((motherInt) => ({
    mother: hexFromArgb(motherInt),
    shades: [],
  }));

  // 3. RATTACHER LES SHADES
  // On itère sur les couleurs UNIQUES trouvées en entrée
  for (const hex of Array.from(uniqueHexSet)) {
    const colorInt = argbFromHex(hex);

    // Si c'est une mère, on passe
    if (families.some((f) => f.mother === hex)) {
      continue;
    }

    // Sinon, recherche de la mère la plus proche (Distance visuelle HCT)
    let minDistance = Infinity;
    let closestFamilyIndex = -1;
    const colorHct = Hct.fromInt(colorInt);

    families.forEach((family, index) => {
      const motherHct = Hct.fromInt(argbFromHex(family.mother));

      const hueDiff = Math.abs(colorHct.hue - motherHct.hue);
      const normalizedHueDiff = Math.min(hueDiff, 360 - hueDiff);

      // On compare principalement la teinte
      if (normalizedHueDiff < minDistance) {
        minDistance = normalizedHueDiff;
        closestFamilyIndex = index;
      }
    });

    if (closestFamilyIndex !== -1) {
      families[closestFamilyIndex]?.shades.push(hex);
    }
  }

  return families;
}
const families = organizePalette(
  [
    { hex: "#ffaf1e", weight: 50 },
    { hex: "#fbc775", weight: 2 },
    { hex: "#faa11c", weight: 7 },
    { hex: "#ec801a", weight: 7 },
    { hex: "#d46c1a", weight: 7 },
    { hex: "#97381c", weight: 7 },
    { hex: "#7b2719", weight: 7 },
    { hex: "#591716", weight: 7 },
  ],
  // 2,
);
console.log("Familles de couleurs organisées :", families);

export const QuantSt: Story = {
  name: "Recolor",
  args: {
    source: "#769CDF",
    contrastAllColors: true,
    customColors: families.flatMap((family, index) => [
      {
        name: `mother${index}`,
        hex: family.mother,
        blend: false,
      },
    ]),
  },
  render: (args) => (
    <Mcu {...args}>
      <Layout>
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg viewBox="0 0 100 100" className="outline text-red-500">
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    fill="#769CDF"
    style="fill: var(--mcu-surface);"
  />
  <circle
    cx="50"
    cy="50"
    r="10"
    fill="#ffaf1e"
    style="fill: var(--mcu-primary);"
  />
</svg>`,
          }}
        />
        <Scheme theme="light" customColors={args.customColors} />
        <Scheme theme="dark" customColors={args.customColors} />
        <Shades customColors={args.customColors} />
      </Layout>
    </Mcu>
  ),
};
