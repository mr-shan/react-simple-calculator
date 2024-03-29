import React from 'react';

import './CalculationHistory.css';
import { CalculatorContext } from '../../App';

interface IProps {
  onHistoryItemClick: any;
}

const CalculatorHistory = (props: IProps) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const calcObj = React.useContext(CalculatorContext)
  const historyItemClickHandler = (result: number) => {
    props.onHistoryItemClick(result);
  };

  React.useEffect(() => {
    const loadCalculatorHistory = async () => {
      await calcObj.loadCalculations();
      forceUpdate()
      const wrapper = document.querySelector(
        '.calc__expression-history-items'
      );
      if (wrapper) {
        wrapper.scrollTop = wrapper.scrollHeight;
      }
    };
    loadCalculatorHistory();
  }, []);
  
  const clearHistory = async () => {
    await calcObj.cleanHistory()
    forceUpdate()
  }

  return (
    <div className='calc__expression-history-container'>
      <div className="calc__expression-history-header">
        <h4>Calculation History</h4>
        <button onClick={clearHistory}>&#xd7;</button>
      </div>
      <div className='calc__expression-history-items'>
        {calcObj.calculationHistory.map((item) => (
          <div
            className='calc__expression-history-item'
            key={item.id}
            onClick={() => historyItemClickHandler(item.result)}
          >
            <p
              className='calc__expression-history-item-expression'
              dangerouslySetInnerHTML={{
                __html: `${item.expression} =`,
              }}
            ></p>
            <p className='calc__expression-history-item-result'>
              {item.result.toLocaleString('en-in')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CalculatorHistory)