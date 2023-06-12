import { Rates } from "../models/latestRates";

type Props = {
  rates: Rates;
};

export default function RatesTable(props: Props) {
  const { rates } = props;

  return (
    <div className="RatesTable">
      <table className="RatesTable__table">
        <tbody>
          {Object.entries(rates).map((rate) => (
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
