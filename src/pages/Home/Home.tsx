import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchConvertCurrency, toggleSwitchCurrency } from "../../redux/slices/convertSlice";

import Main from "../../layout/Main";
import LoaderFallback from "../../components/LoaderFallback";
import ErrorContainer from "../../components/ErrorContainer";
import AmountInput from "../../components/AmountInput";
import SelectCurrency from "../../components/SelectCurrency";
import Button from "../../layout/Button";
import ResultContainer from "../../components/ResultContainer";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error, currencyFrom, currencyTo, convertAmount, result } = useAppSelector(
    (state) => state.convertCurrency,
  );

  const handleConvert = useCallback(() => {
    dispatch(fetchConvertCurrency({ from: currencyFrom, to: currencyTo, amount: convertAmount }));
  }, [currencyFrom, currencyTo, convertAmount]);

  const handleSwitch = useCallback(() => {
    dispatch(toggleSwitchCurrency(true));
  }, []);

  useEffect(() => {
    if (!convertAmount) {
      return undefined;
    }

    const promise = dispatch(
      fetchConvertCurrency({ from: currencyFrom, to: currencyTo, amount: convertAmount }),
    );

    return () => promise.abort();
  }, [currencyFrom, currencyTo]);

  return (
    <Main pageName="Home">
      <LoaderFallback isLoading={isLoading} />
      <ErrorContainer error={error} />

      <AmountInput amountType="convertAmount" initialAmount="100" />

      <div className="Home__select">
        <SelectCurrency currencyType="currencyFrom" initialCurrency="EUR" />
        <Button content="&#8693;" onClick={handleSwitch} modifier="switch" />
        <SelectCurrency currencyType="currencyTo" initialCurrency="UAH" />
      </div>

      <ResultContainer result={result} />

      <Button content="Convert" onClick={handleConvert} disabled={!convertAmount.length} />
    </Main>
  );
}
