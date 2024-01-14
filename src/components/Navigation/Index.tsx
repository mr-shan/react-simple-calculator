import React from "react";

import NavigationButton from "./NavigationButton";
import NavigationContent from "./NavigationContent";

interface IProps {
  historyItemClickHandler: any;
}

const Navigation = (props: IProps) => {
  const [showNav, setShowNav] = React.useState(false);

  const toggleNav = () => {
    if (showNav) {
      closeNav();
      return;
    }
    setShowNav((state: boolean) => (state = !state));
  };

  const closeNav = () => {
    document
      .querySelector(".calc__navigation-bar-content")
      ?.classList.add("calc__navigation-bar-content-out");
    document
      .querySelector(".calc__navigation-bar-backdrop")
      ?.classList.add("calc__navigation-bar-backdrop-out");
    setTimeout(() => {
      setShowNav(false);
    }, 220);
  };

  const historyItemClickHandler = (result: number) => {
    props.historyItemClickHandler(result);
    closeNav()
  }

  return (
    <>
      <NavigationButton
        toggleHistory={toggleNav}
        showNav={showNav}
        closeHistory={toggleNav}
      />
      {showNav && (
        <NavigationContent
          onHistoryItemClick={historyItemClickHandler}
          closeHistory={toggleNav}
        />
      )}
    </>
  );
};

export default React.memo(Navigation, () => true)
