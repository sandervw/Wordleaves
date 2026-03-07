import { useState, useEffect } from "react";
import SVG from "./SVG";

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
      {onBack && <SVG name="return" props={{ onClick: onBack }} />}
      <div className="navbar-title">Sparse</div>
      <input type="text" className="input font-large" placeholder="Search..." />
      <div className="display-flex gap-medium">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
        <button className="btn-danger">Delete Account</button>
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
