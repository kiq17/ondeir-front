import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Input } from "./";
import { HomeIcon } from "@heroicons/react/20/solid";

const setup = () => {
  const mockChange = vi.fn();
  const utils = render(
    <Input.Root
      className="test"
      data-testid="input"
      handleOnChange={mockChange}
    >
      <Input.Label data-testid="label" htmlFor={"email"}>
        Email
      </Input.Label>
    </Input.Root>
  );

  const input = screen.getByTestId("input");
  const label = screen.getByTestId("label");
  return {
    label,
    input,
    ...utils,
  };
};

describe("teste", () => {
  it("input and label should be on screen", async () => {
    const { label, input } = setup();

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("should change the value of input", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "some data" } });

    expect((input as HTMLInputElement).value).toBe("some data");
  });

  it("should change the border of parent of input after user click", async () => {
    const { input } = setup();

    await userEvent.click(input);
    expect(input.parentElement).toHaveStyle({ borderColor: "#0A7777" });
  });

  it("should shows default message error if values be null", () => {
    const mockChange = vi.fn();
    render(
      <Input.Root
        className="test w-80"
        data-testid="input"
        handleOnChange={mockChange}
      >
        <Input.Label data-testid="label" htmlFor={"email"}>
          Email
        </Input.Label>
        <Input.Error
          stantard="Atenção ao digitar"
          state={{
            value: "",
            error: "",
          }}
        />
      </Input.Root>
    );
    expect(screen.getByText("Atenção ao digitar")).toBeInTheDocument();
  });

  it("should shows error message if value exist", () => {
    const mockChange = vi.fn();
    render(
      <Input.Root
        className="test"
        data-testid="input"
        handleOnChange={mockChange}
      >
        <Input.Label data-testid="label" htmlFor={"email"}>
          Email
        </Input.Label>
        <Input.Error
          stantard="Atenção ao digitar"
          state={{
            value: "nome",
            error: "Nome inválido",
          }}
        />
      </Input.Root>
    );
    expect(screen.getByText("Nome inválido")).toBeInTheDocument();
  });

  it("should render icon", () => {
    const mockChange = vi.fn();
    render(
      <Input.Root
        className="test"
        data-testid="input"
        handleOnChange={mockChange}
      >
        <Input.Label data-testid="label" htmlFor={"email"}>
          Email
        </Input.Label>
        <Input.Icon>
          <HomeIcon data-testid="icon"/>
        </Input.Icon>
      </Input.Root>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
