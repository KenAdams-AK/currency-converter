import { useMemo } from "react";
import { Rates } from "../models/latestRates";

type Props = {
  rates: Rates;
};

export default function RatesTable(props: Props) {
  const { rates } = props;

  const ratesList = useMemo(() => Object.entries(rates), [rates]);

  return (
    <div className="RatesTable">
      <table className="RatesTable__table">
        <tbody>
          {ratesList.length > 0 &&
            ratesList.map((rate) => (
              <tr key={rate[0]}>
                <td>{rate[0]}</td>
                <td>{rate[1]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
