import React from 'react';

import Expression from './Expression';
import Result from './Result';
import InputButtons from './InputButtons';
import KeyPressHelper from './KeyPressHelper';
import Navigation from './../Navigation/Index';

import './Calculator.css';

import { CalculatorContext } from '../../App';

export default () => {
  const [result, setResult] = React.useState(NaN);
  const [expression, setExpression] = React.useState('');
  const [navKey, setNavKey] = React.useState(Math.random.toString())
  const calcObj = React.useContext(CalculatorContext);

  const clearResult = () => {
    calcObj.clearResult();
    setResult(NaN);
    setExpression('');
  };

  React.useEffect(() => {
    const loadCalculatorHistory = async () => {
      await calcObj.loadCalculations();
      setNavKey(Math.random.toString())
    };
    loadCalculatorHistory();
  }, []);

  const onClick = (event: any) => {
    const isInputAdded = calcObj.addInput(event);
    if (isInputAdded) setResult(NaN);
    calcObj.calculateResult().then(() => {
      setExpression(calcObj.expression);
    });
  };

  const handleBackspace = () => {
    calcObj.removeLastInput();
    setExpression(calcObj.expression);
    calcObj.calculateResult();
  };

  const showResult = async () => {
    const resultData = await calcObj.showResult();
    if (!resultData) return;
    setResult(resultData.result);
    setExpression('');
  };

  const historyItemClickHandler = (result: number) => {
    const isResultAdded = calcObj.addHistoricalResult(result);
    if (!isResultAdded) return;
    setResult(NaN);
    calcObj.calculateResult().then(() => {
      setExpression(calcObj.expression);
    });
  };

  return (
    <div className='calc__container'>
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
        key={navKey}
        historyItemClickHandler={historyItemClickHandler}
      />
    </div>
  );
};
