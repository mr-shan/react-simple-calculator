import { useEffect, useState, memo } from "react";

import "./ThemeSelector.css";

type Themes = "auto" | "dark" | "light" | "classic";

const ThemeSelector = ({closeNav} : {closeNav: any}) => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>("auto");
  const buttons: Themes[] = ["auto", "dark", "light", "classic"];

  const themeChangeHandler = (theme: Themes) => {
    localStorage.setItem("preferredTheme", theme);
    if (theme === "auto") {
      window.setAutoTheme();
    } else {
      window.setTheme(theme);
    }
    setSelectedTheme(theme);
    closeNav()
  };

  useEffect(() => {
    const preferredTheme = localStorage.getItem("preferredTheme") || "auto";
    setSelectedTheme(preferredTheme);
  }, []);

  return (
    <div className="calc-theme-selector__container">
      <h4>Theme</h4>
      <div className="calc-theme-selector__btns-wrapper">
        {buttons.map((button) => {
          return (
            <button
              className={
                selectedTheme === button
                  ? "calc-theme-selector__selected-btn"
                  : ""
              }
              onClick={() => themeChangeHandler(button)}
              key={button}
            >
              {button}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ThemeSelector, () => true)