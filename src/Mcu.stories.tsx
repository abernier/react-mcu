import type { Meta, StoryObj } from "@storybook/react-vite";

import { Mcu } from "./Mcu";
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
      options: [
        "tonalSpot",
        "monochrome",
        "neutral",
        "vibrant",
        "expressive",
        "fidelity",
        "content",
      ],
      description: "The Material Design color scheme",
    },
    contrast: {
      control: { type: "range", min: -1, max: 1, step: 0.1 },
      description: "Contrast level from -1 to 1",
    },
    customColors: {
      control: "object",
      description: "Array of custom colors with name and hex value",
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
  render: (args) => (
    <div className="dark">
      <Mcu {...args}>
        <Bar />
      </Mcu>
    </div>
  ),
};
