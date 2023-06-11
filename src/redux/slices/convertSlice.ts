import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { parseLocalStorageItem } from "../../helpers/parseLocalStorage";
import { apiRouts } from "../../routes/apiRouts";
import { ConvertCurrency } from "../../models/convertCurrency";

type InitialState = {
  isLoading: boolean;
  error: string;
  result: number;
  currencyFrom: string;
  currencyTo: string;
  convertAmount: string;
  isSwitching: boolean;
};

const initialState: InitialState = {
  isLoading: false,
  error: "",
  result: 0,
  currencyFrom: parseLocalStorageItem("currencyFrom", "EUR"),
  currencyTo: parseLocalStorageItem("currencyTo", "UAH"),
  convertAmount: parseLocalStorageItem("convertAmount", "100"),
  isSwitching: false,
};

export const fetchConvertCurrency = createAsyncThunk(
  "convertSlice/fetchConvertCurrency",
  async (args: { from: string; to: string; amount: string }, { signal }) => {
    const { from, to, amount } = args;
    const url = `${apiRouts.GET_CONVERT_CURRENCY}?from=${from}&to=${to}&amount=${amount}`;

    const { data } = await axios<ConvertCurrency>(url, { signal });

    return data;
  },
);

const convertSlice = createSlice({
  name: "convertSlice",
  initialState,
  reducers: {
    updateConvertAmount: (state, action: PayloadAction<string>) => {
      state.convertAmount = action.payload;
    },
    updateCurrencyFrom: (state, action: PayloadAction<string>) => {
      state.currencyFrom = action.payload;
    },
    updateCurrencyTo: (state, action: PayloadAction<string>) => {
      state.currencyTo = action.payload;
    },
    toggleSwitchCurrency: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchConvertCurrency.pending, (state) => {
      state.error = "";
      state.isLoading = true;
    });

    builder.addCase(fetchConvertCurrency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.result = action.payload.result;
    });

    builder.addCase(fetchConvertCurrency.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        console.warn("Abort fetch currency convert request: ", action.error);
        return;
      }
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong. Try again later";
    });
  },
});

export const { updateConvertAmount, updateCurrencyTo, updateCurrencyFrom, toggleSwitchCurrency } =
  convertSlice.actions;
export default convertSlice.reducer;
