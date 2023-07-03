import Navbar from "./Navbar";
import { useState, createRef } from "react";
import UserForm from "./UserForm";
import Footer from "./Footer";
import CurrencyTable from "./CurrencyTable";
const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("EUR");
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);
  const chartRef = createRef();

  const getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`
    )
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map((rate) => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => console.error(error.message));
  };

  const buildChart = (labels, data, label) => {
    const chartRef = chartRef.current.getContext("2d");
    if (typeof chart !== "undefined") {
      chart.destroy();
    }
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

  return (
    <main>
      <Navbar />
      <UserForm
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        quoteCurrency={quoteCurrency}
        setQuoteCurrency={setQuoteCurrency}
        quantity={quantity}
        setQuantity={setQuantity}
        data={data}
        setData={setData}
      />
      <CurrencyTable
        baseCurrency={baseCurrency}
        quoteCurrency={quoteCurrency}
        getHistoricalRates={getHistoricalRates}
        buildChart={buildChart}
        charRef={chartRef}
      />
      <Footer />
    </main>
  );
};
export default App;
