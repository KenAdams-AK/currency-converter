import { describe, test } from "vitest";
import { render, screen } from "../../../tests/test-utils";

import About from "./About";

describe("About page", () => {
  test("renders correctly", () => {
    render(<About />);

    const title = screen.getByRole("heading");
    const description = screen.getByTestId("description");

    expect(title).toHaveTextContent("Currency Converter");
    expect(description).toBeInTheDocument();
  });
});
