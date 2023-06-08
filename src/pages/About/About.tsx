export default function About() {
  return (
    <section className="About">
      <h1 className="About__title">Currency Converter</h1>

      <div className="About__desc desc" data-testid="description">
        <p>
          A currency converter app is a powerful tool that allows users to effortlessly convert
          between different currencies. With a user-friendly interface and intuitive functionality,
          it simplifies the process of converting currencies and provides accurate results. The app
          offers several key features to ensure a seamless currency conversion experience.
        </p>

        <div className="desc__features">
          <p>
            <span>1. </span>Conversion Interface:
            <br />
            The app provides a simple and straightforward interface where users can input the amount
            of currency they want to convert. They can specify the currency they have by selecting
            it from a comprehensive list or typing the currency code. Additionally, users can select
            the desired currency they want to convert to from a similar list.
          </p>
          <p>
            <span>2. </span>Instant Results:
            <br />
            Once the user has entered the input amount and selected the &quot;from&quot; and
            &quot;to&quot; currencies, the app quickly calculates and displays the converted result.
            The result is shown in real-time, allowing users to see the updated conversion
            instantly.
          </p>
          <p>
            <span>3. </span>Swap Functionality:
            <br />
            To further enhance convenience, the currency converter app offers a &quot;swap&quot;
            feature. This feature enables users to easily switch between the &quot;from&quot; and
            &quot;to&quot; currencies. By clicking a button or using a swipe gesture, the app
            automatically swaps the selected currencies and recalculates the conversion. This
            functionality saves users from manually reselecting the currencies when they want to
            perform the opposite conversion.
          </p>
          <p>
            <span>4. </span>Rates Page:
            <br />
            The app also includes a dedicated &quot;rates&quot; page where users can view a table
            with different currency exchange rates. This table typically displays a wide range of
            currencies, along with their respective conversion rates to a base currency (usually a
            widely accepted currency like USD or EUR). Users can refer to this table to get an
            overview of current exchange rates between different currencies.
          </p>
          <p>
            <span>5. </span>Recalculation of Table:
            <br />
            On the &quot;rates&quot; page, users have the ability to input an amount and select a
            specific currency. Upon doing so, the app recalculates the entire table, displaying the
            converted amounts for all the listed currencies. This feature allows users to quickly
            compare conversion rates for various currencies and make informed decisions based on the
            most up-to-date information.
          </p>
        </div>

        <p>
          In summary, the currency converter app simplifies currency conversions by providing an
          intuitive interface, instant results, and convenient features such as currency swapping
          and a rates page. It empowers users to effortlessly convert currencies, stay informed
          about exchange rates, and make informed decisions regarding their financial transactions
          in different currencies.
        </p>
      </div>
    </section>
  );
}
