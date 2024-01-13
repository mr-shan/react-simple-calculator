import React, { Suspense, lazy } from 'react';

import InputButtons from './InputButtons';

// import Expression from './Expression';
// import Result from './Result';
// import KeyPressHelper from './KeyPressHelper';
// import Navigation from './../Navigation/Index';

const Expression = lazy(() => import('./Expression'));
const Result = lazy(() => import('./Result'));
const KeyPressHelper = lazy(() => import('./KeyPressHelper'));
const Navigation = lazy(() => import('./../Navigation/Index'));

import './Calculator.css';

import { CalculatorContext } from '../../App';

export default () => {
  const [result, setResult] = React.useState(NaN);
  const [expression, setExpression] = React.useState('');
  const calcObj = React.useContext(CalculatorContext);

  const clearResult = () => {
    calcObj.clearResult();
    setResult(NaN);
    setExpression('');
  };

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
      <Suspense fallback={<div>loading...</div>}>
        <Expression
          expression={expression}
          expressionLength={calcObj.expressionLength}
        />
        <Result tempValue={calcObj.result} result={result} />
      </Suspense>

      <InputButtons
        clearResult={clearResult}
        onClick={onClick}
        handleBackspace={handleBackspace}
        showResult={showResult}
      />
      <Suspense fallback={<div>loading...</div>}>
        <KeyPressHelper
          onKeyDown={onClick}
          handleBackspace={handleBackspace}
          showResult={showResult}
        />
        <Navigation
          historyItemClickHandler={historyItemClickHandler}
        />
      </Suspense>
    </div>
  );
};
