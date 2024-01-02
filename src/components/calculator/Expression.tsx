import { useEffect, useRef, useState } from 'react';

import './style.css';

import { IOperation } from '../../helpers/calculator';
import history from './../../assets/history.png';

interface IProps {
  expression: string;
  calculationHistory: Array<IOperation>;
  expressionLength: number;
}

export default (props: IProps) => {
  const expressionRef = useRef();
  const historyRef = useRef();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    expressionRef.current.scrollTop = expressionRef.current.scrollHeight;
  }, [props.expression]);

  useEffect(() => {
    if (!historyRef.current) return;
    historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [props.calculationHistory]);

  const historyItemClickHandler = (result: number) => {
    console.log(result);
  };

  const expressionStyleObj = { fontSize: '2.5rem' };
  const historyObj = { height: '50%' };
  if (props.expressionLength > 20) expressionStyleObj.fontSize = '1.5rem';
  else if (props.expressionLength > 15) expressionStyleObj.fontSize = '2rem';

  if (!props.expression) {
    expressionStyleObj['visible'] = 'none';
    historyObj.height = '100%';
  }

  return (
    <div className='calc__expression-wrapper'>
      <p
        className='calc_expression-text'
        ref={expressionRef}
        style={expressionStyleObj}
        dangerouslySetInnerHTML={{ __html: props.expression }}
      ></p>

      {showHistory && (
        <div
          className='calc__expression-history'
          ref={historyRef}
          style={historyObj}
        >
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
        </div>
      )}

      <button
        className='calc__history-button'
        style={showHistory ? { filter: 'brightness(2)' } : {}}
        onClick={() => setShowHistory(!showHistory)}
      >
        <img src={history} />
      </button>
    </div>
  );
};
