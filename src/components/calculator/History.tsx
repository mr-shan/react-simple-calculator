import './style.css';
import { IOperation } from '../../helpers/calculator';
import './../Button/Button.css';

interface IProps {
  calculationHistory: Array<IOperation>;
  closeHistory: any;
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  const historyItemClickHandler = (result: number) => {
    console.log(result);
    props.onHistoryItemClick(result);
  };

  return (
    <>
      <div
        className='calc__expression-history-backdrop'
        onClick={props.closeHistory}
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
          className='calc-num-button secondary calc_history-button-close'
          onClick={props.closeHistory}
        >
          &#10005;
        </button>
      </div>
    </>
  );
};
