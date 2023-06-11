import { SelectHTMLAttributes, useCallback, useEffect, useState } from "react";
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
  baseCurrency?: string;
}

export default function SelectCurrency(props: Props) {
  const { currencyType, baseCurrency } = props;

  const dispatch = useAppDispatch();
  const { currencySymbols } = useAppSelector((state) => state.currencySymbols);
  const { currencyFrom, currencyTo, isSwitching } = useAppSelector(
    (state) => state.convertCurrency,
  );

  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<string>(
    `${currencyType}`,
    "",
    TTL.currency,
  );

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  }, []);

  function updateCurrency() {
    switch (currencyType) {
      case "currencyFrom":
        dispatch(updateCurrencyFrom(selectedCurrency));
        break;
      case "currencyTo":
        dispatch(updateCurrencyTo(selectedCurrency));
        setSelectedCurrency(currencyFrom);
        break;
      case "baseCurrency":
        dispatch(updateBaseCurrency(selectedCurrency));
        break;
      default:
        break;
    }
  }

  function switchCurrency() {
    if (isSwitching) {
      if (currencyType === "currencyFrom") {
        setSelectedCurrency(currencyTo);
      }
      if (currencyType === "currencyTo") {
        setSelectedCurrency(currencyFrom);
      }
      dispatch(toggleSwitchCurrency(false));
    }
  }

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    updateCurrency();
  }, [selectedCurrency]);

  useEffect(() => {
    switchCurrency();
  }, [isSwitching]);

  return (
    <label htmlFor={currencyType}>
      Select currency:
      <select
        className="SelectCurrency__select"
        id={currencyType}
        value={selectedCurrency || baseCurrency}
        onChange={handleSelect}
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
