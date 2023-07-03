import { useEffect, useState, createRef, useRef } from "react";
import { json, checkStatus } from "./fetchUtils";
import Chart from "chart.js";

function CurrencyTable({ baseCurrency, quoteCurrency }) {
  const [allPairs, setAllPairs] = useState("");
  const [rates, setRates] = useState(null);
  const chartRef = useRef();

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
  const buildChart = (labels, data, label) => {
    // const chartRef = chartRef.current.getContext("2d");

    const chart = new Chart(chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  const getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`
    )
      .then(checkStatus)
      .then(json)
      .then((dataResult) => {
        if (dataResult.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(dataResult.rates);
        const chartData = Object.values(dataResult.rates).map(
          (rate) => rate[quote]
        );
        const chartLabel = `${base}/${quote}`;

        buildChart(chartLabels, chartData, chartLabel);
        console.log(chartData);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchTable();

    getHistoricalRates(baseCurrency, quoteCurrency);
    const canvas = chartRef.current;
    const context = canvas.getContext("2d");
  }, [baseCurrency, quoteCurrency]);

  return (
    <div className="wrapper">
      <div className="section-center currency-chart">
        <canvas ref={chartRef} />
      </div>
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
    </div>
  );
}
export default CurrencyTable;
