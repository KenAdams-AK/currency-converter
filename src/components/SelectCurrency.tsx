import { SelectHTMLAttributes, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../redux/store";

import { updateBaseCurrency } from "../redux/slices/ratesSlice";
import {
  updateCurrencyTo,
  updateCurrencyFrom,
  toggleSwitchCurrency,
} from "../redux/slices/convertSlice";
import { TTL } from "../constants/TimeToLive";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  currencyType: "currencyFrom" | "currencyTo" | "baseCurrency";
  initialCurrency: string;
}

export default function SelectCurrency(props: Props) {
  const { currencyType, initialCurrency, ...rest } = props;

  const dispatch = useAppDispatch();
  const { currencySymbols } = useAppSelector((state) => state.currencySymbols);
  const { currencyFrom, currencyTo, isSwitching } = useAppSelector(
    (state) => state.convertCurrency,
  );

  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<string>(
    `${currencyType}`,
    `${initialCurrency}`,
    TTL.currency,
  );

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  }, []);

  function updateCurrency(value: string) {
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

  function switchCurrency(to: string, from: string) {
    if (isSwitching) {
      if (currencyType === "currencyFrom") {
        setSelectedCurrency(to);
      }
      if (currencyType === "currencyTo") {
        setSelectedCurrency(from);
      }
      dispatch(toggleSwitchCurrency(false));
    }
  }

  useEffect(() => {
    updateCurrency(selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    switchCurrency(currencyTo, currencyFrom);
  }, [isSwitching]);

  return (
    <label htmlFor={currencyType}>
      Select currency:
      <select
        className="SelectCurrency__select"
        id={currencyType}
        value={selectedCurrency}
        onChange={handleSelect}
        {...rest}
      >
        {currencySymbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </label>
  );
}
