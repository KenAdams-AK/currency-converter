import debounce from "lodash.debounce";
import { InputHTMLAttributes, useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { TTL } from "../constants/TimeToLive";
import { useAppDispatch } from "../redux/store";
import { updateRatesAmount } from "../redux/slices/ratesSlice";
import { updateConvertAmount } from "../redux/slices/convertSlice";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amountType: "convertAmount" | "ratesAmount";
  initialAmount: string;
}

export default function AmountInput(props: Props) {
  const { amountType, initialAmount, ...rest } = props;

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useLocalStorage(`${amountType}`, `${initialAmount}`, TTL.amount);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  function updateAmount(value: string) {
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

  const debouncedUpdateAmount = useMemo(() => debounce(updateAmount, 800), []);

  useEffect(() => {
    if (amountType === "ratesAmount") {
      debouncedUpdateAmount(amount);
    } else {
      updateAmount(amount);
    }
  }, [amount]);

  return (
    <label className="AmountInput__label" htmlFor="amount">
      Amount:
      <input
        className="AmountInput__input"
        type="text"
        id="amount"
        value={amount}
        minLength={1}
        maxLength={9}
        onChange={handleChange}
        required
        {...rest}
      />
    </label>
  );
}
