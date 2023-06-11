import React from "react";

import Calculator from "../../helpers/calculator";

import Expression from "./Expression";
import Result from "./Result";
import InputButtons from "./InputButtons";
import KeyPressHelper from "./KeyPressHelper";

import "./Calculator.css";

const calcObj = new Calculator();

export default (props) => {
  const [result, setResult] = React.useState(NaN);
  const [expression, setExpression] = React.useState("");

  const clearResult = () => {
    calcObj.clearResult();
    setResult(NaN);
    setExpression("");
  };

  const onClick = (event) => {
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

  return (
    <div className="calc__container">
      <Expression
        expression={expression}
        expressionLength={calcObj.expressionLength}
        calculationHistory={calcObj.calculationHistory}
      />
      <Result
        tempValue={calcObj.result}
        result={result}
      />
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
    </div>
  );
};
