import React, { useEffect } from "react";
import { useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";
const currencies = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];
function UserForm({
  baseCurrency,
  setBaseCurrency,
  quoteCurrency,
  setQuoteCurrency,
  quantity,
  setQuantity,
  data,
  setData,
}) {
  function handleBaseCurrency(e) {
    setBaseCurrency(e.target.value);
  }

  function handleQuoteCurrency(e) {
    setQuoteCurrency(e.target.value);
  }

  async function fetchData() {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${quoteCurrency}`
      );
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [baseCurrency, quoteCurrency]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");

    fetchData();
  }

  function handleChangeBase() {
    const temp = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(temp);
  }
  function handleQuantity(e) {
    setQuantity(e.target.value);
  }

  return (
    <>
      <div className="main">
        <form className="form " onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="currency-labels">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <label htmlFor="baseCurrency" className="form-label">
                Base
              </label>
              <label htmlFor="quoteCurrency" className="form-label">
                Quote
              </label>
            </div>
            <div className="userForm">
              <input
                type="text"
                className="form-input"
                value={quantity}
                onChange={handleQuantity}
              />
              <select
                className="form-input"
                name="baseCurrency"
                id="baseCurrency"
                value={baseCurrency}
                onChange={handleBaseCurrency}
              >
                {currencies.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <button className="switchBase" onClick={handleChangeBase}>
                {" "}
                <FaArrowsAltH />
              </button>
              <select
                name="quoteCurrency"
                id="quoteCurrency"
                className="form-input"
                value={quoteCurrency}
                onChange={handleQuoteCurrency}
              >
                {currencies.map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </div>
      <div className="section-center">
        {data && (
          <div className="dataWrapper">
            <ul className="tradeDetails">
              <li>Base Currency: {data.base}</li>
              <li>Quote Currency: {quoteCurrency}</li>
              <li>Date: {data.date}</li>
              <li>Quantity: {quantity}</li>
              <li>Exchange Rate: {data.rates[quoteCurrency]}</li>
              <li>
                Total Exchange:{" "}
                {quantity * data.rates[quoteCurrency]?.toFixed(4)}
                {quoteCurrency}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default UserForm;
