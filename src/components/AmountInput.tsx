import debounce from "lodash.debounce";
import { InputHTMLAttributes, useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch } from "../redux/store";

import { updateAmount } from "../helpers/updateAmount";
import { TTL } from "../constants/TimeToLive";

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

  const debouncedUpdateAmount = useMemo(() => debounce(updateAmount, 800), []);

  useEffect(() => {
    if (amountType === "ratesAmount") {
      debouncedUpdateAmount(amountType, amount, dispatch);
    } else {
      updateAmount(amountType, amount, dispatch);
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
