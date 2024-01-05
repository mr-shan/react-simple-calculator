import './style.css';
import { IOperation } from '../../helpers/calculator';
import './../Button/Button.css';
import React from 'react';

interface IProps {
  calculationHistory: Array<IOperation>;
  closeHistory: any;
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  const historyItemClickHandler = (result: number) => {
    props.onHistoryItemClick(result);
  };

  const closeHistory = () => {
    document
      .querySelector('.calc__expression-history')
      ?.classList.add('calc__expression-history-out');
    document
      .querySelector('.calc__expression-history-backdrop')
      ?.classList.add('calc__expression-history-backdrop-out');
    setTimeout(() => {
      props.closeHistory();
    }, 250);
  };

  React.useEffect(() => {
    const wrapper = document.querySelector('.calc__expression-history');
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  }, []);

  return (
    <>
      <div
        className='calc__expression-history-backdrop'
        onClick={closeHistory}
      ></div>
      <div className='calc__expression-history'>
        {props.calculationHistory.length === 0 && (
          <p>No calculation history found</p>
        )}
        <div className='calc__expression-history-items'>
          {props.calculationHistory.map((item) => (
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
      <button className='calc_history-button-close' onClick={closeHistory}>
        &#10005;
      </button>
    </>
  );
};
