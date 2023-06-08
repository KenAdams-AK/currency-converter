import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Rates from "./pages/Rates/Rates";

import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/rates",
    element: <Rates />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
