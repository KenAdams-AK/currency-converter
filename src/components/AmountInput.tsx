import { InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { TTL } from "../constants/TimeToLive";
import { useAppDispatch } from "../redux/store";
import { updateRatesAmount } from "../redux/slices/ratesSlice";
import { updateConvertAmount } from "../redux/slices/convertSlice";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amountType: "convertAmount" | "ratesAmount";
}

export default function AmountInput(props: Props) {
  const { amountType } = props;

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useLocalStorage(`${amountType}`, "100", TTL.amount);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  function updateAmount() {
    switch (amountType) {
      case "convertAmount":
        dispatch(updateConvertAmount(amount));
        break;
      case "ratesAmount":
        dispatch(updateRatesAmount(amount));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return undefined;
    }

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      updateAmount();
    }, 800);

    return () => clearTimeout(timeoutId);
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
      />
    </label>
  );
}
