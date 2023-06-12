import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Store } from "@reduxjs/toolkit";
import { createReduxStore, RootState } from "../src/redux/store";

import ErrorBoundary from "../src/components/ErrorBoundary";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialState?: Partial<RootState>;
  store?: Store<Partial<RootState>>;
}

function AllTheProviders(store: Store) {
  return function withProviders({ children }: PropsWithChildren<object>) {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
        </Provider>
      </ErrorBoundary>
    );
  };
}

function customRender(
  component: ReactElement,
  {
    initialState,
    store = createReduxStore(initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  return render(component, { wrapper: AllTheProviders(store), ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };
