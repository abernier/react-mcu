import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Mcu,
  schemeNames,
  DEFAULT_SCHEME,
  DEFAULT_CONTRAST,
  DEFAULT_COLOR_MATCH,
  STANDARD_TONES,
} from "./Mcu";
import type { ComponentProps } from "react";
import { kebabCase, upperFirst } from "lodash-es";
import { allModes } from "../.storybook/modes";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Mcu,
  tags: ["autodocs"],
  parameters: {
    // layout: "centered",
    chromatic: {
      modes: {
        light: allModes["light"],
        dark: allModes["dark"],
      },
    },
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

function Foo({ children, ...props }: ComponentProps<"div">) {
  return (
    <div {...props}>
      <style>{`
        @scope {
          & {
            display:grid;
            grid-template-columns: 1fr;
            gap: 0px;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
function FooTop({ children, ...props }: ComponentProps<"div">) {
  return <div {...props}>{children || "FooTop"}</div>;
}
function FooBottom({ children, ...props }: ComponentProps<"div">) {
  return <div {...props}>{children || "FooBottom"}</div>;
}

function Bar({
  customColors,
}: {
  customColors?: ComponentProps<typeof Mcu>["customColors"];
}) {
  return (
    <div>
      <style>{`
      @scope {
        & {
          [style*="background-color"] {padding:.5rem; outline:1px solid;}
          p {all:unset; font-family: sans-serif; font-size: 0.875rem; color:white;mix-blend-mode:difference;}
        }
      }
      `}</style>
      <div>
        <style>{`
        @scope {
          & {
            display:grid;
            grid-template-columns: 3fr 1fr;
            gap: 24px;
          }
        }
      `}</style>

        {
          //
          //  █████
          // ██   ██
          // ███████
          // ██   ██
          // ██   ██
          //
        }

        <div>
          <style>{`
            @scope {
              & {
                display:grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 1fr 1fr;
                gap: 8px;
              }
            }
          `}</style>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-primary)",
              }}
            >
              <p>Primary</p>
            </FooTop>
            <FooBottom
              style={{ backgroundColor: "var(--mcu-on-primary)", color: "" }}
            >
              <p>On Primary</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-secondary)",
                color: "",
              }}
            >
              <p>Secondary</p>
            </FooTop>
            <FooBottom
              style={{ backgroundColor: "var(--mcu-on-secondary)", color: "" }}
            >
              <p>On Secondary</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-tertiary)",
                color: "",
              }}
            >
              <p>Tertiary</p>
            </FooTop>
            <FooBottom
              style={{ backgroundColor: "var(--mcu-on-tertiary)", color: "" }}
            >
              <p>On Tertiary</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-primary-container)",
                color: "",
              }}
            >
              <p>Primary Container</p>
            </FooTop>
            <FooBottom
              style={{
                backgroundColor: "var(--mcu-on-primary-container)",
                color: "",
              }}
            >
              <p>On Primary Container</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-secondary-container)",
                color: "",
              }}
            >
              <p>Secondary Container</p>
            </FooTop>
            <FooBottom
              style={{
                backgroundColor: "var(--mcu-on-secondary-container)",
                color: "",
              }}
            >
              <p>On Secondary Container</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-tertiary-container)",
                color: "",
              }}
            >
              <p>Tertiary Container</p>
            </FooTop>
            <FooBottom
              style={{
                backgroundColor: "var(--mcu-on-tertiary-container)",
                color: "",
              }}
            >
              <p>On Tertiary Container</p>
            </FooBottom>
          </Foo>
        </div>

        {
          //
          // ██████
          // ██   ██
          // ██████
          // ██   ██
          // ██████
          //
        }

        <div>
          <style>{`
            @scope {
              & {
                display:grid;
                grid-template-columns: repeat(1, 1fr);
                grid-template-rows: 1fr 1fr;
                gap: 8px;
              }
            }
          `}</style>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-error)",
                color: "",
              }}
            >
              <p>Error</p>
            </FooTop>
            <FooBottom
              style={{ backgroundColor: "var(--mcu-on-error)", color: "" }}
            >
              <p>On Error</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-error-container)",
                color: "",
              }}
            >
              <p>Error Container</p>
            </FooTop>
            <FooBottom
              style={{
                backgroundColor: "var(--mcu-on-error-container)",
                color: "",
              }}
            >
              <p>On Error Container</p>
            </FooBottom>
          </Foo>
        </div>

        {
          //
          //  ██████
          // ██
          // ██
          // ██
          //  ██████
          //
        }

        <div>
          <style>{`
            @scope {
              & {
                display:grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 1fr;
                gap: 8px;
              }
            }
          `}</style>
          <Foo>
            <FooTop style={{ height: "5rem" }}>
              <style>{`
                @scope {
                  & {
                    display:grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: 1fr;
                  }
                }
              `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-primary-fixed)",
                  color: "",
                }}
              >
                <p>Primary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-primary-fixed-dim)",
                  color: "",
                }}
              >
                <p>Primary Fixed Dim</p>
              </div>
            </FooTop>
            <FooBottom>
              <style>{`
                  @scope {
                    & {
                      display:grid;
                      grid-template-columns: repeat(1, 1fr);
                      grid-template-rows: 1fr 1fr;
                    }
                  }
                `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-primary-fixed)",
                  color: "",
                }}
              >
                <p>On Primary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-primary-fixed-variant)",
                  color: "",
                }}
              >
                <p>On Primary Fixed Variant</p>
              </div>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop style={{ height: "5rem" }}>
              <style>{`
                @scope {
                  & {
                    display:grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: 1fr;
                  }
                }
              `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-secondary-fixed)",
                  color: "",
                }}
              >
                <p>Secondary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-secondary-fixed-dim)",
                  color: "",
                }}
              >
                <p>Secondary Fixed Dim</p>
              </div>
            </FooTop>
            <FooBottom>
              <style>{`
                  @scope {
                    & {
                      display:grid;
                      grid-template-columns: repeat(1, 1fr);
                      grid-template-rows: 1fr 1fr;
                    }
                  }
                `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-secondary-fixed)",
                  color: "",
                }}
              >
                <p>On Secondary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-secondary-fixed-variant)",
                  color: "",
                }}
              >
                <p>On Secondary Fixed Variant</p>
              </div>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop style={{ height: "5rem" }}>
              <style>{`
                @scope {
                  & {
                    display:grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: 1fr;
                  }
                }
              `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-tertiary-fixed)",
                  color: "",
                }}
              >
                <p>Tertiary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-tertiary-fixed-dim)",
                  color: "",
                }}
              >
                <p>Tertiary Fixed Dim</p>
              </div>
            </FooTop>
            <FooBottom>
              <style>{`
                  @scope {
                    & {
                      display:grid;
                      grid-template-columns: repeat(1, 1fr);
                      grid-template-rows: 1fr 1fr;
                    }
                  }
                `}</style>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-tertiary-fixed)",
                  color: "",
                }}
              >
                <p>On Tertiary Fixed</p>
              </div>
              <div
                style={{
                  backgroundColor: "var(--mcu-on-tertiary-fixed-variant)",
                  color: "",
                }}
              >
                <p>On Tertiary Fixed Variant</p>
              </div>
            </FooBottom>
          </Foo>
        </div>

        {
          //
          // ██████
          // ██   ██
          // ██   ██
          // ██   ██
          // ██████
          //
        }

        <div></div>

        {
          //
          // ███████
          // ██
          // █████
          // ██
          // ███████
          //
        }

        <div>
          <style>{`
            @scope {
              & {
                display:grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 8px;
              }
            }
          `}</style>
          <div style={{ height: "5rem" }}>
            <style>{`
              @scope {
                & {
                  display:grid;
                  grid-template-columns: repeat(3, 1fr);
                  grid-template-rows: 1fr;
                }
              }
            `}</style>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-dim)",
                color: "",
              }}
            >
              <p>Surface Dim</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface)",
                color: "",
              }}
            >
              <p>Surface</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-bright)",
                color: "",
              }}
            >
              <p>Surface Bright</p>
            </div>
          </div>
          <div style={{ height: "5rem" }}>
            <style>{`
              @scope {
                & {
                  display:grid;
                  grid-template-columns: repeat(5, 1fr);
                  grid-template-rows: 1fr;
                }
              }
            `}</style>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-container-lowest)",
                color: "",
              }}
            >
              <p>Surface Container Lowest</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-container-low)",
                color: "",
              }}
            >
              <p>Surface Container Low</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-container)",
                color: "",
              }}
            >
              <p>Surface Container</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-container-high)",
                color: "",
              }}
            >
              <p>Surface Container High</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-surface-container-highest)",
                color: "",
              }}
            >
              <p>Surface Container Highest</p>
            </div>
          </div>
          <div>
            <style>{`
              @scope {
                & {
                  display:grid;
                  grid-template-columns: repeat(4, 1fr);
                  grid-template-rows: 1fr;
                }
              }
            `}</style>
            <div
              style={{
                backgroundColor: "var(--mcu-on-surface)",
                color: "",
              }}
            >
              <p>On Surface</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-on-surface-variant)",
                color: "",
              }}
            >
              <p>On Surface Variant</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-outline)",
                color: "",
              }}
            >
              <p>Outline</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-outline-variant)",
                color: "",
              }}
            >
              <p>Outline Variant</p>
            </div>
          </div>
        </div>

        {
          //
          // ███████
          // ██
          // █████
          // ██
          // ██
          //
        }

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Foo>
            <FooTop
              style={{
                height: "5rem",
                backgroundColor: "var(--mcu-inverse-surface)",
              }}
            >
              <p>Inverse Surface</p>
            </FooTop>
            <FooBottom
              style={{
                backgroundColor: "var(--mcu-inverse-on-surface)",
              }}
            >
              <p>Inverse On Surface</p>
            </FooBottom>
          </Foo>
          <Foo>
            <FooTop
              style={{
                // height: "5rem",
                backgroundColor: "var(--mcu-inverse-primary)",
              }}
            >
              <p>Inverse Primary</p>
            </FooTop>
          </Foo>
          <div>
            <style>{`
              @scope {
                & {
                  display:grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 8px;
                }
              }
            `}</style>
            <div
              style={{
                backgroundColor: "var(--mcu-scrim)",
              }}
            >
              <p>Scrim</p>
            </div>
            <div
              style={{
                backgroundColor: "var(--mcu-shadow)",
              }}
            >
              <p>Shadow</p>
            </div>
          </div>
        </div>
      </div>

      {
        //
        //  ██████ ██    ██ ███████ ████████  ██████  ███    ███      ██████  ██████  ██       ██████  ██████  ███████
        // ██      ██    ██ ██         ██    ██    ██ ████  ████     ██      ██    ██ ██      ██    ██ ██   ██ ██
        // ██      ██    ██ ███████    ██    ██    ██ ██ ████ ██     ██      ██    ██ ██      ██    ██ ██████  ███████
        // ██      ██    ██      ██    ██    ██    ██ ██  ██  ██     ██      ██    ██ ██      ██    ██ ██   ██      ██
        //  ██████  ██████  ███████    ██     ██████  ██      ██      ██████  ██████  ███████  ██████  ██   ██ ███████
        //
      }

      <div>
        <style>{`
          @scope {
            & {
              display:flex; flex-direction:column; gap:16px; margin-top:24px;
            }
          }
        `}</style>

        {customColors?.map((customColor) => (
          <div key={customColor.name}>
            <style>{`
            @scope {
              & {
                display:grid;
                grid-template-columns: repeat(4, 1fr);

              }
            }
          `}</style>
            <Foo>
              <FooTop
                style={{
                  height: "4rem",
                  backgroundColor: `var(--mcu-${kebabCase(customColor.name)})`,
                }}
              >
                <p>{upperFirst(customColor.name)}</p>
              </FooTop>
            </Foo>
            <Foo>
              <FooTop
                style={{
                  height: "4rem",
                  backgroundColor: `var(--mcu-on-${kebabCase(customColor.name)})`,
                }}
              >
                <p>On {upperFirst(customColor.name)}</p>
              </FooTop>
            </Foo>
            <Foo>
              <FooTop
                style={{
                  height: "4rem",
                  backgroundColor: `var(--mcu-${kebabCase(customColor.name)}-container)`,
                }}
              >
                <p>{upperFirst(customColor.name)} Container</p>
              </FooTop>
            </Foo>
            <Foo>
              <FooTop
                style={{
                  height: "4rem",
                  backgroundColor: `var(--mcu-on-${kebabCase(customColor.name)}-container)`,
                }}
              >
                <p>On {upperFirst(customColor.name)} Container</p>
              </FooTop>
            </Foo>
          </div>
        ))}
      </div>

      {
        // ███████ ██   ██  █████  ███████  ███████ ███████
        // ██      ██   ██ ██   ██ ██   ██  ██      ██
        // ███████ ███████ ███████ ██   ██  █████   ███████
        //      ██ ██   ██ ██   ██ ██   ██  ██           ██
        // ███████ ██   ██ ██   ██ ███████  ███████ ███████
      }
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {[
          ...[
            "primary",
            "secondary",
            "tertiary",
            "error",
            "neutral",
            "neutral-variant",
          ].map((name) => ({ name, isCustom: false })),
          ...(customColors?.map((cc) => ({ name: cc.name, isCustom: true })) ||
            []),
        ].map(({ name, isCustom }) => (
          <div key={name}>
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
                textTransform: "capitalize",
              }}
            >
              {isCustom ? upperFirst(name) : name.replace("-", " ")}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${STANDARD_TONES.length}, 1fr)`,
              }}
            >
              {STANDARD_TONES.slice()
                .reverse()
                .map((tone) => (
                  <div
                    key={tone}
                    style={{
                      backgroundColor: `var(--mcu-${isCustom ? kebabCase(name) : name}-${tone})`,
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      outline: "1px solid",
                    }}
                  >
                    <p style={{ fontSize: "0.75rem" }}>{tone}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const St1: Story = {
  name: "Default",
  args: {
    source: "#769CDF",
  },
  render: (args) => (
    <Mcu {...args}>
      <Bar customColors={args.customColors} />
    </Mcu>
  ),
};

//

export const CustomColorsSt: Story = {
  name: "Custom colors",
  args: {
    source: "#769CDF",
    customColors: [
      { name: "myCustomColor1", hex: "#6C8A0C", blend: true },
      { name: "myCustomColor2", hex: "#E126C6", blend: true },
      { name: "myCustomColor3", hex: "#E126C6", blend: false },
    ],
  },
  render: St1.render,
};

//

export const ExtendedColorsSt: Story = {
  name: "Extended colors",
  args: {
    source: "#769CDF",
    colorMatch: DEFAULT_COLOR_MATCH,
    primary: "#63A002",
    secondary: "#85976E",
    tertiary: "#4D9D98",
    error: "#FF5449",
    neutral: "#91918B",
    neutralVariant: "#8F9285",
  },
  render: St1.render,
};

//

export const TailwindSt: Story = {
  name: "Tailwind",
  args: CustomColorsSt.args,
  render: (args) => (
    <Mcu {...args}>
      <div className="p-6 space-y-6">
        {/* Primary Colors */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary text-on-primary p-4 rounded">
              primary
            </div>
            <div className="bg-primary-container text-on-primary-container p-4 rounded">
              primary-container
            </div>
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary text-on-secondary p-4 rounded">
              secondary
            </div>
            <div className="bg-secondary-container text-on-secondary-container p-4 rounded">
              secondary-container
            </div>
          </div>
        </div>

        {/* Tertiary Colors */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-tertiary text-on-tertiary p-4 rounded">
              tertiary
            </div>
            <div className="bg-tertiary-container text-on-tertiary-container p-4 rounded">
              tertiary-container
            </div>
          </div>
        </div>

        {/* Surface Colors */}
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface-dim text-on-surface p-4 rounded">
              surface-dim
            </div>
            <div className="bg-surface text-on-surface p-4 rounded">
              surface
            </div>
            <div className="bg-surface-bright text-on-surface p-4 rounded">
              surface-bright
            </div>
          </div>
        </div>

        {/* Error Colors */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-error text-on-error p-4 rounded">error</div>
            <div className="bg-error-container text-on-error-container p-4 rounded">
              error-container
            </div>
          </div>
        </div>

        {/* Outline */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface text-on-surface p-4 rounded border-2 border-outline">
              outline
            </div>
            <div className="bg-surface text-on-surface p-4 rounded border-2 border-outline-variant">
              outline-variant
            </div>
          </div>
        </div>

        {/* myCustomColor1 */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-myCustomColor1 text-on-myCustomColor1 p-4 rounded">
              myCustomColor1
            </div>
            <div className="bg-myCustomColor1-container text-on-myCustomColor1-container p-4 rounded">
              myCustomColor1-container
            </div>
          </div>
        </div>

        {/* myCustomColor2 */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-myCustomColor2 text-on-myCustomColor2 p-4 rounded">
              myCustomColor2
            </div>
            <div className="bg-myCustomColor2-container text-on-myCustomColor2-container p-4 rounded">
              myCustomColor2-container
            </div>
          </div>
        </div>

        {/* myCustomColor3 custom color */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-myCustomColor3 text-on-myCustomColor3 p-4 rounded">
              myCustomColor3
            </div>
            <div className="bg-myCustomColor3-container text-on-myCustomColor3-container p-4 rounded">
              myCustomColor3-container
            </div>
          </div>
        </div>

        {/* Shades */}
        <div className="space-y-4">
          {/* Primary Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Primary</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-primary-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-primary-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-primary-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-primary-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-primary-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-primary-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-primary-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-primary-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-primary-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-primary-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-primary-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* Secondary Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Secondary</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-secondary-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-secondary-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-secondary-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-secondary-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-secondary-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-secondary-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-secondary-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-secondary-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-secondary-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-secondary-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-secondary-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* Tertiary Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Tertiary</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-tertiary-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-tertiary-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-tertiary-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-tertiary-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-tertiary-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-tertiary-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-tertiary-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-tertiary-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-tertiary-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-tertiary-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-tertiary-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* Error Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Error</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-error-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-error-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-error-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-error-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-error-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-error-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-error-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-error-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-error-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-error-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-error-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* Neutral Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Neutral</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-neutral-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-neutral-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-neutral-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-neutral-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-neutral-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-neutral-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-neutral-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-neutral-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-neutral-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-neutral-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-neutral-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* Neutral Variant Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Neutral Variant</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-neutral-variant-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-neutral-variant-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-neutral-variant-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-neutral-variant-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-neutral-variant-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-neutral-variant-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-neutral-variant-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-neutral-variant-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-neutral-variant-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-neutral-variant-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-neutral-variant-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* myCustomColor1 Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">myCustomColor1</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-myCustomColor1-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-myCustomColor1-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-myCustomColor1-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-myCustomColor1-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-myCustomColor1-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-myCustomColor1-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-myCustomColor1-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-myCustomColor1-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-myCustomColor1-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-myCustomColor1-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-myCustomColor1-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* myCustomColor2 Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">myCustomColor2</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-myCustomColor2-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-myCustomColor2-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-myCustomColor2-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-myCustomColor2-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-myCustomColor2-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-myCustomColor2-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-myCustomColor2-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-myCustomColor2-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-myCustomColor2-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-myCustomColor2-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-myCustomColor2-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>

          {/* myCustomColor3 Shades */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">myCustomColor3</h4>
            <div className="grid grid-cols-11 rounded-md overflow-hidden">
              <div className="bg-myCustomColor3-50 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                50
              </div>
              <div className="bg-myCustomColor3-100 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                100
              </div>
              <div className="bg-myCustomColor3-200 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                200
              </div>
              <div className="bg-myCustomColor3-300 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                300
              </div>
              <div className="bg-myCustomColor3-400 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                400
              </div>
              <div className="bg-myCustomColor3-500 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                500
              </div>
              <div className="bg-myCustomColor3-600 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                600
              </div>
              <div className="bg-myCustomColor3-700 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                700
              </div>
              <div className="bg-myCustomColor3-800 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                800
              </div>
              <div className="bg-myCustomColor3-900 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                900
              </div>
              <div className="bg-myCustomColor3-950 aspect-square flex items-center justify-center text-center text-xs text-white mix-blend-difference">
                950
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm italic text-center">
          Non-exhaustive list, for a complete list see the light story
        </p>
      </div>
    </Mcu>
  ),
};
