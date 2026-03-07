import { useState, useEffect } from "react";
import SVG from "../parts/SVG";

interface NavbarProps {
  onBack?: () => void;
}

const Navbar = ({ onBack }: NavbarProps) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar container">
      <div className="display-flex gap-medium">
        {onBack && <SVG name="return" props={{ onClick: onBack }} />}
      </div>
      <div className="navbar-title">Wordleaves</div>
      <div className="display-flex gap-medium">
        <SVG
          name={theme === "dark" ? "sun" : "moon"}
          className="flex-child-center"
          props={{ onClick: toggleTheme }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
