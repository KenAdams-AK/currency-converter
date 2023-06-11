import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { fetchCurrencySymbols } from "./redux/slices/symbolsSlice";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Rates from "./pages/Rates/Rates";

function App() {
  const dispath = useAppDispatch();

  useEffect(() => {
    const promise = dispath(fetchCurrencySymbols());

    return () => promise.abort();
  }, []);

  return (
    <div className="App__container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
