import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Best from "./Best";

describe("tests of Best component", () => {
  it("should be render in screen", async () => {
    render(<Best />);

    const element = screen.getByTestId("best-section");

    expect(element).toBeInTheDocument();
  });

  it("should slider render skeleton card if data is not loaded", async () => {
    render(<Best />);

    const elements = screen.getAllByTestId("skeleton-slider");

    expect(elements.length).toBe(4);
  });
});
