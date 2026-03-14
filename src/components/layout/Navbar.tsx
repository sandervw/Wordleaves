import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import SVG from "../parts/SVG";

const Navbar = (): ReactElement => {
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
      <div className="display-flex" />
      <div className="display-flex-column gap-small">
        <Link to="/" className="navbar-title flex-child-center">
          Wordleaves
        </Link>
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
