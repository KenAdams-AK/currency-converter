import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="NavBar__list">
        <li className="NavBar__item">
          <NavLink to="/" className="NavBar__link">
            Home
          </NavLink>
        </li>
        <li className="NavBar__item">
          <NavLink to="/rates" className="NavBar__link">
            Rates
          </NavLink>
        </li>
        <li className="NavBar__item">
          <NavLink to="/about" className="NavBar__link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
