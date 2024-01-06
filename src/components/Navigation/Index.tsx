import React from "react";

import { IOperation } from "../../helpers/calculator";
import NavigationButton from "./NavigationButton";
import NavigationContent from "./NavigationContent";

interface IProps {
  historyItemClickHandler: any;
  calculationHistory: IOperation[];
}

export default (props: IProps) => {
  const [showNav, setshowNav] = React.useState(false);

  const toggleNav = () => {
    if (showNav) {
      closeNav();
      return;
    }
    setshowNav((state: boolean) => (state = !state));
  };

  const closeNav = () => {
    document
      .querySelector(".calc__navigation-bar-content")
      ?.classList.add("calc__navigation-bar-content-out");
    document
      .querySelector(".calc__navigation-bar-backdrop")
      ?.classList.add("calc__navigation-bar-backdrop-out");
    setTimeout(() => {
      setshowNav(false);
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
          calculationHistory={props.calculationHistory}
        />
      )}
    </>
  );
};
