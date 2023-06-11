import { ReactNode, createContext, useLayoutEffect, useMemo } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { TTL } from "../constants/TimeToLive";

type Props = {
  children: ReactNode;
};

type ThemeContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider(props: Props) {
  const { children } = props;
  const body = document.querySelector("body");
  const [darkTheme, setDarkTheme] = useLocalStorage("dark-theme", false, TTL.darkTheme);

  useLayoutEffect(() => {
    if (body && darkTheme) {
      body.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    if (body) {
      body.classList.toggle("dark");
      setDarkTheme(!darkTheme);
    }
  }

  const context = useMemo(
    () => ({
      darkTheme,
      toggleTheme,
    }),
    [darkTheme],
  );

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}
