import './CalculationHistory.css';
import { CalculatorContext } from '../../App';
import React from 'react';

interface IProps {
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const calcObj = React.useContext(CalculatorContext)
  const historyItemClickHandler = (result: number) => {
    props.onHistoryItemClick(result);
  };

  React.useEffect(() => {
    const wrapper = document.querySelector(
      '.calc__expression-history-items'
    );
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  }, []);
  
  const clearHistory = async () => {
    await calcObj.cleanHistory()
    forceUpdate()
  }

  return (
    <div className='calc__expression-history-container'>
      <div className="calc__expression-history-header">
        <h4>Calculation History</h4>
        <button onClick={clearHistory}>Clear</button>
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
              {item.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
