import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Mcu } from "./Mcu.js";

describe("Mcu", () => {
  it("should render hello react-mcu div", () => {
    const { getByText } = render(<Mcu />);
    const divElement = getByText("hello react-mcu");
    expect(divElement).toBeTruthy();
  });
});
