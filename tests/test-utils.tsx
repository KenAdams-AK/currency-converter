import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";

import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary";

function AllTheProviders() {
  return function withProviders({ children }: PropsWithChildren<object>) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  };
}

function customRender(component: ReactElement, { ...renderOptions }: RenderOptions = {}) {
  return render(component, { wrapper: AllTheProviders(), ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };
