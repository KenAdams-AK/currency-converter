import { AppDispatch } from "../redux/store";
import { updateCurrencyFrom, updateCurrencyTo } from "../redux/slices/convertSlice";
import { updateBaseCurrency } from "../redux/slices/ratesSlice";

export function updateCurrency(currencyType: string, value: string, dispatch: AppDispatch) {
  switch (currencyType) {
    case "currencyFrom":
      dispatch(updateCurrencyFrom(value));
      break;
    case "currencyTo":
      dispatch(updateCurrencyTo(value));
      break;
    case "baseCurrency":
      dispatch(updateBaseCurrency(value));
      break;
    default:
      break;
  }
}
