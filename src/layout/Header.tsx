import Logo from "../components/Logo";
import NavBar from "./NavBar";
import ThemeButton from "../components/ThemeButton";

export default function Header() {
  return (
    <header className="Header">
      <Logo />
      <NavBar />
      <ThemeButton />
    </header>
  );
}
