import React from 'react';

import Calculator from '../../helpers/calculator';

import Expression from './Expression';
import Result from './Result';
import InputButtons from './InputButtons';
import KeyPressHelper from './KeyPressHelper';
import BurgerIcon from '../Button/BurgerIcon';
import History from './History';

import './Calculator.css';

const calcObj = new Calculator();

export default () => {
  const [result, setResult] = React.useState(NaN);
  const [expression, setExpression] = React.useState('');
  const [showHistory, setShowHistory] = React.useState(false);

  const clearResult = () => {
    calcObj.clearResult();
    setResult(NaN);
    setExpression('');
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
    setExpression('');
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const historyItemClickHandler = (result: number) => {
    const isResultAdded = calcObj.addHistoricalResult(result);
    if (!isResultAdded) return;
    setResult(NaN)
    calcObj.calculateResult();
    setExpression(calcObj.expression);
    toggleHistory()
  };

  return (
    <div className='calc__container'>
      <Expression
        expression={expression}
        expressionLength={calcObj.expressionLength}
        calculationHistory={calcObj.calculationHistory}
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
      <BurgerIcon toggleHistory={toggleHistory} />
      {showHistory && (
        <History
          onHistoryItemClick={historyItemClickHandler}
          closeHistory={toggleHistory}
          calculationHistory={calcObj.calculationHistory}
        />
      )}
    </div>
  );
};
