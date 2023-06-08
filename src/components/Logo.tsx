import { Link } from "react-router-dom";
import logo from "../assets/currency-exchange.png";

export default function Logo() {
  return (
    <div className="Logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
}
