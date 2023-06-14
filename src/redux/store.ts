import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux/es/exports";

import currencySymbolsReducer from "./slices/symbolsSlice";
import convertCurrencyReducer from "./slices/convertSlice";
import latestRatesReducer from "./slices/ratesSlice";

const rootReducer = combineReducers({
  currencySymbols: currencySymbolsReducer,
  convertCurrency: convertCurrencyReducer,
  latestRates: latestRatesReducer,
});

export function createReduxStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
