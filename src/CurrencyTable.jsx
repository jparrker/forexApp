import { useEffect, useState } from "react";
function CurrencyTable({ baseCurrency }) {
  const [allPairs, setAllPairs] = useState("");
  const [rates, setRates] = useState(null);

  async function fetchTable() {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}`
      );
      const data = await res.json();
      setAllPairs(data);
      const rateObject = Array(Object.entries(data.rates));
      setRates(rateObject);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTable();
  }, [baseCurrency]);

  return (
    <div className="section-center rate-table">
      <p className="table-header">
        Rates for {baseCurrency} for {allPairs.date}
      </p>
      {rates && (
        <ul className="current-list">
          {rates[0].map((item, index) => {
            return (
              <li key={item} className="single-item">
                <span>{item[0]} </span> <span>{item[1]} </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default CurrencyTable;
