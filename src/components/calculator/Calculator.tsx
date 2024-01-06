import React from "react";

import Calculator from "../../helpers/calculator";

import Expression from "./Expression";
import Result from "./Result";
import InputButtons from "./InputButtons";
import KeyPressHelper from "./KeyPressHelper";
import Navigation from "./../Navigation/Index"

import "./Calculator.css";

const calcObj = new Calculator();

export default () => {
  const [result, setResult] = React.useState(NaN);
  const [expression, setExpression] = React.useState("");
  const [showNav, setshowNav] = React.useState(false);

  const clearResult = () => {
    calcObj.clearResult();
    setResult(NaN);
    setExpression("");
  };

  const onClick = (event: any) => {
    const isInputAdded = calcObj.addInput(event);
    if (isInputAdded) setResult(NaN);
    calcObj.calculateResult();
    setExpression(calcObj.expression);
  };

  const handleBackspace = () => {
    calcObj.removeLastInput();
    setExpression(calcObj.expression);
    calcObj.calculateResult();
  };

  const showResult = () => {
    const resultData = calcObj.showResult();
    if (!resultData) return;
    setResult(resultData.result);
    setExpression("");
  };

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
    const isResultAdded = calcObj.addHistoricalResult(result);
    if (!isResultAdded) return;
    setResult(NaN);
    calcObj.calculateResult();
    setExpression(calcObj.expression);
    toggleNav();
  };

  return (
    <div className="calc__container">
      <Expression
        expression={expression}
        expressionLength={calcObj.expressionLength}
      />
      <Result tempValue={calcObj.result} result={result} />
      <InputButtons
        clearResult={clearResult}
        onClick={onClick}
        handleBackspace={handleBackspace}
        showResult={showResult}
      />
      <KeyPressHelper
        onKeyDown={onClick}
        handleBackspace={handleBackspace}
        showResult={showResult}
      />
      <Navigation 
        calculationHistory={calcObj.calculationHistory}
        historyItemClickHandler={historyItemClickHandler}
        showNav={showNav}
        toggleNav={toggleNav}
      />
    </div>
  );
};
