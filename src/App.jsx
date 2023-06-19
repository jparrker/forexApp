import Navbar from "./Navbar";
import { useState } from "react";
import UserForm from "./UserForm";
import Footer from "./Footer";
import CurrencyTable from "./CurrencyTable";
const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("EUR");
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);
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
      <CurrencyTable baseCurrency={baseCurrency} />
      <Footer />
    </main>
  );
};
export default App;
