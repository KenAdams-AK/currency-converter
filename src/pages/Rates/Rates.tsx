import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchLatestRates } from "../../redux/slices/ratesSlice";

import Main from "../../layout/Main";
import RatesTable from "../../components/RatesTable";
import ErrorContainer from "../../components/ErrorContainer";
import LoaderFallback from "../../components/LoaderFallback";
import SelectCurrency from "../../components/SelectCurrency";
import AmountInput from "../../components/AmountInput";

export default function Rates() {
  const dispatch = useAppDispatch();
  const { isLoading, error, baseCurrency, ratesAmount, rates } = useAppSelector(
    (state) => state.latestRates,
  );

  useEffect(() => {
    if (!ratesAmount) {
      return undefined;
    }
    const promise = dispatch(fetchLatestRates({ amount: ratesAmount, baseCurrency }));

    return () => promise.abort();
  }, [baseCurrency, ratesAmount]);

  return (
    <Main pageName="Rates">
      <LoaderFallback isLoading={isLoading} />
      <ErrorContainer error={error} />

      <SelectCurrency currencyType="baseCurrency" initialCurrency="EUR" />
      <AmountInput amountType="ratesAmount" initialAmount="200" />

      {rates ? <RatesTable rates={rates} /> : null}
    </Main>
  );
}
