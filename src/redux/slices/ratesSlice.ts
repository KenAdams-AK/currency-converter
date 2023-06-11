import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LatestRates, Rates } from "../../models/latestRates";
import { apiRouts } from "../../routes/apiRouts";
import { parseLocalStorageItem } from "../../helpers/parseLocalStorage";

type InitialState = {
  isLoading: boolean;
  error: string;
  rates: Rates | null;
  baseCurrency: string;
  ratesAmount: string;
};

const initialState: InitialState = {
  isLoading: false,
  error: "",
  rates: null,
  baseCurrency: parseLocalStorageItem("baseCurrency", "EUR"),
  ratesAmount: parseLocalStorageItem("ratesAmount", "100"),
};

export const fetchLatestRates = createAsyncThunk(
  "ratesSlice/fetchLatestRates",
  async (args: { baseCurrency: string; amount: string }, { signal }) => {
    const { amount, baseCurrency } = args;
    const url = `${apiRouts.GET_LATEST_RATES}?base=${baseCurrency}&amount=${amount}`;

    const { data } = await axios<LatestRates>(url, { signal });

    return data;
  },
);

const ratesSlice = createSlice({
  name: "ratesSlice",
  initialState,
  reducers: {
    updateBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    updateRatesAmount: (state, action: PayloadAction<string>) => {
      state.ratesAmount = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchLatestRates.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });

    builder.addCase(fetchLatestRates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.baseCurrency = action.payload.base;
      state.rates = action.payload.rates;
    });

    builder.addCase(fetchLatestRates.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        console.warn("Abort fetch latest rates request: ", action.error);
        return;
      }
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong. Try again later";
    });
  },
});

export const { updateBaseCurrency, updateRatesAmount } = ratesSlice.actions;
export default ratesSlice.reducer;
