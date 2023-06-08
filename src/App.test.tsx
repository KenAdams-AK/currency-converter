import { describe, test } from "vitest";
import { render, screen } from "../tests/test-utils";
import App from "./App";

describe("App component", () => {
  test("renders correctly", () => {
    render(<App />);
    const mainContainer = screen.getByRole("heading");
    expect(mainContainer).toHaveTextContent("Hello World");
  });
});
