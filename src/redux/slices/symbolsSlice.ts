import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SymbolsResponse } from "../../models/currencySymbols";
import { apiRouts } from "../../routes/apiRouts";

type InitialState = {
  isLoading: boolean;
  error: string;
  currencySymbols: Array<string>;
};

const initialState: InitialState = {
  isLoading: false,
  error: "",
  currencySymbols: [],
};

export const fetchCurrencySymbols = createAsyncThunk(
  "convertSlice/fetchCurrencySymbols",
  async (_args, { signal }) => {
    const url = apiRouts.FETCH_CURRENCY_SYMBOLS;

    const { data } = await axios<SymbolsResponse>(url, { signal });

    return data;
  },
);

const symbolsSlice = createSlice({
  name: "convertSlice",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchCurrencySymbols.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });

    builder.addCase(fetchCurrencySymbols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currencySymbols = Object.keys(action.payload.symbols);
    });

    builder.addCase(fetchCurrencySymbols.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        console.warn("Abort fetch currency symbols request: ", action.error);
        return;
      }
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong. Try again later";
    });
  },
});

export default symbolsSlice.reducer;
