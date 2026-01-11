import type { Meta, StoryObj } from "@storybook/react-vite";

import { Mcu, schemeNames } from "./Mcu";
import type { ComponentProps } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Mcu,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    source: "#63A002",
    scheme: "tonalSpot",
    contrast: 0,
    customColors: [],
    children: null,
  },
  argTypes: {
    source: {
      control: "color",
      description: "The source color in hex format",
    },
    scheme: {
      control: "select",
      options: schemeNames,
      description: "The Material Design color scheme",
    },
    contrast: {
      control: { type: "range", min: -1, max: 1, step: 0.1 },
      description: "Contrast level from -1 to 1",
    },
    customColors: {
      control: "object",
      description:
        "Array of custom color objects, each with 'name' and 'hex' properties",
    },
    children: {
      control: false,
      description: "React children to render",
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

function Bar() {
  return (
    <div>
      <style>{`
        @scope {
          & {
            display:grid;
            grid-template-columns: 3fr 1fr;
            gap: 24px;
          }

      [style*="background-color"] {padding:.5rem; outline:1px solid;}

          p {all:unset; font-family: sans-serif; font-size: 0.875rem; color:white;mix-blend-mode:difference;}
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
  );
}

export const St1: Story = {
  name: "light",
  render: (args) => (
    <Mcu {...args}>
      <Bar />
    </Mcu>
  ),
};

export const St2: Story = {
  name: "dark",
  globals: {
    theme: "dark",
  },
  render: (args) => (
    <Mcu {...args}>
      <Bar />
    </Mcu>
  ),
};

function BarTailwind() {
  return (
    <div className="grid grid-cols-[3fr_1fr] gap-6">
      {
        //
        //  █████
        // ██   ██
        // ███████
        // ██   ██
        // ██   ██
        //
      }

      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-primary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Primary</p>
          </div>
          <div className="bg-on-primary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Primary</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-secondary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Secondary</p>
          </div>
          <div className="bg-on-secondary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Secondary</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-tertiary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Tertiary</p>
          </div>
          <div className="bg-on-tertiary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Tertiary</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-primary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Primary Container</p>
          </div>
          <div className="bg-on-primary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Primary Container</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-secondary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Secondary Container</p>
          </div>
          <div className="bg-on-secondary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Secondary Container</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-tertiary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Tertiary Container</p>
          </div>
          <div className="bg-on-tertiary-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Tertiary Container</p>
          </div>
        </div>
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

      <div className="grid grid-cols-1 grid-rows-2 gap-2">
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-error p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Error</p>
          </div>
          <div className="bg-on-error p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Error</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-error-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Error Container</p>
          </div>
          <div className="bg-on-error-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Error Container</p>
          </div>
        </div>
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

      <div className="grid grid-cols-3 grid-rows-1 gap-2">
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 grid grid-cols-2 grid-rows-1">
            <div className="bg-primary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Primary Fixed</p>
            </div>
            <div className="bg-primary-fixed-dim p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Primary Fixed Dim</p>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="bg-on-primary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Primary Fixed</p>
            </div>
            <div className="bg-on-primary-fixed-variant p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Primary Fixed Variant</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 grid grid-cols-2 grid-rows-1">
            <div className="bg-secondary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Secondary Fixed</p>
            </div>
            <div className="bg-secondary-fixed-dim p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Secondary Fixed Dim</p>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="bg-on-secondary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Secondary Fixed</p>
            </div>
            <div className="bg-on-secondary-fixed-variant p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Secondary Fixed Variant</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 grid grid-cols-2 grid-rows-1">
            <div className="bg-tertiary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Tertiary Fixed</p>
            </div>
            <div className="bg-tertiary-fixed-dim p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">Tertiary Fixed Dim</p>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2">
            <div className="bg-on-tertiary-fixed p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Tertiary Fixed</p>
            </div>
            <div className="bg-on-tertiary-fixed-variant p-2 outline outline-1">
              <p className="font-sans text-sm text-white mix-blend-difference">On Tertiary Fixed Variant</p>
            </div>
          </div>
        </div>
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

      <div className="grid grid-cols-1 gap-2">
        <div className="h-20 grid grid-cols-3 grid-rows-1">
          <div className="bg-surface-dim p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Dim</p>
          </div>
          <div className="bg-surface p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface</p>
          </div>
          <div className="bg-surface-bright p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Bright</p>
          </div>
        </div>
        <div className="h-20 grid grid-cols-5 grid-rows-1">
          <div className="bg-surface-container-lowest p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Container Lowest</p>
          </div>
          <div className="bg-surface-container-low p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Container Low</p>
          </div>
          <div className="bg-surface-container p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Container</p>
          </div>
          <div className="bg-surface-container-high p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Container High</p>
          </div>
          <div className="bg-surface-container-highest p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Surface Container Highest</p>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-1">
          <div className="bg-on-surface p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Surface</p>
          </div>
          <div className="bg-on-surface-variant p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">On Surface Variant</p>
          </div>
          <div className="bg-outline p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Outline</p>
          </div>
          <div className="bg-outline-variant p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Outline Variant</p>
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

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-0">
          <div className="h-20 bg-inverse-surface p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Inverse Surface</p>
          </div>
          <div className="bg-inverse-on-surface p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Inverse On Surface</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-0">
          <div className="bg-inverse-primary p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Inverse Primary</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[var(--mcu-scrim)] p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Scrim</p>
          </div>
          <div className="bg-[var(--mcu-shadow)] p-2 outline outline-1">
            <p className="font-sans text-sm text-white mix-blend-difference">Shadow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const St3: Story = {
  name: "tailwind",
  render: (args) => (
    <Mcu {...args}>
      <BarTailwind />
    </Mcu>
  ),
};
