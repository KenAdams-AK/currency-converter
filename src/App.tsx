import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Rates from "./pages/Rates/Rates";

function App() {
  return (
    <div className="App__container">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
