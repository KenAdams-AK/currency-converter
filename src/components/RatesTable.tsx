import { Rates } from "../models/latestRates";

type Props = {
  rates: Rates;
};

export default function RatesTable(props: Props) {
  const { rates } = props;

  return (
    <table className="RatesTable">
      <tbody>
        <tr>
          <th>Rates</th>
        </tr>
        {Object.entries(rates).map((rate) => (
          <tr key={rate[0]}>
            <td>{rate[0]}</td>
            <td>{rate[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
