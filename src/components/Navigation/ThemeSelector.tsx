import { useState } from "react";

import "./ThemeSelector.css";

type Themes = "auto" | "dark" | "light";

export default () => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>("auto");
  const buttons: Themes[] = ["auto", "dark", "light"];

  const themeChangeHandler = (theme: Themes) => {
    localStorage.setItem('preferredTheme', theme);
    if (theme === 'auto') {
      window.setAutoTheme();
    } else {
      window.setTheme(theme);
    }
    setSelectedTheme(theme)
  }

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
