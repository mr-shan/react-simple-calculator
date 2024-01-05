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
    document.querySelector('.calc__expression-history')?.classList.add('calc__expression-history-out')
    document.querySelector('.calc__expression-history-backdrop')?.classList.add('calc__expression-history-backdrop-out')
    setTimeout(() => {
      props.closeHistory()
    }, 250)
  }

  React.useEffect(() => {
    const wrapper = document.querySelector('.calc__expression-history')
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  }, [])

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
        {props.calculationHistory.map((item) => (
          <p
            className='calc__expression-history-item'
            key={item.id}
            onClick={() => historyItemClickHandler(item.result)}
            dangerouslySetInnerHTML={{
              __html: `${item.expression} = ${item.result}`,
            }}
          ></p>
        ))}
        <button
          className='calc_history-button-close'
          onClick={closeHistory}
        >
          &#10005;
        </button>
      </div>
    </>
  );
};
