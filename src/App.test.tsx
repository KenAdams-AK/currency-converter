import { describe, test } from "vitest";
import { render, screen } from "../tests/test-utils";

import App from "./App";

describe("App component", () => {
  test("renders correctly", () => {
    render(<App />);

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
