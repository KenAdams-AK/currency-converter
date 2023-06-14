import { AppDispatch } from "../redux/store";
import { updateConvertAmount } from "../redux/slices/convertSlice";
import { updateRatesAmount } from "../redux/slices/ratesSlice";

export function updateAmount(amountType: string, value: string, dispatch: AppDispatch) {
  switch (amountType) {
    case "convertAmount":
      dispatch(updateConvertAmount(value));
      break;
    case "ratesAmount":
      dispatch(updateRatesAmount(value));
      break;
    default:
      break;
  }
}
