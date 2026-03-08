import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import SVG from "../parts/SVG";

interface NavbarProps {
  readonly onBack?: () => void;
}

const Navbar = ({ onBack }: NavbarProps): ReactElement => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar container">
      <div className="display-flex">
        {onBack && <SVG name="return" props={{ onClick: onBack }} />}
      </div>
      <div className="display-flex-column gap-small">
        <div className="navbar-title flex-child-center">Wordleaves</div>
        <p className="meta flex-child-center">By Sander VanWilligen</p>
      </div>
      <div className="display-flex">
        <SVG
          name={theme === "dark" ? "sun" : "moon"}
          className="flex-child-center"
          props={{ onClick: toggleTheme }}
        />
      </div>
    </nav>
  );
};

export { Navbar };
