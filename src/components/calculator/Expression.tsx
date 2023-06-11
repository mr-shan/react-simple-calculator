import { useEffect, useRef, useState } from "react";

import "./style.css";

import { IOperation } from "../../helpers/calculator";
import history from "./../../assets/history.png";

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

  const expressionStyleObj = { fontSize: "2.5rem" };
  if (props.expressionLength > 16) expressionStyleObj.fontSize = "1.5rem";
  else if (props.expressionLength > 11) expressionStyleObj.fontSize = "2rem";

  return (
    <div className="calc__expression-wrapper">
      <p
        className="calc_expression-text"
        ref={expressionRef}
        style={expressionStyleObj}
        dangerouslySetInnerHTML={{ __html: props.expression }}
      ></p>

      {showHistory && (
        <div className="calc__expression-history" ref={historyRef}>
          {props.calculationHistory.map((item) => (
            <p
              key={item.id}
              dangerouslySetInnerHTML={{
                __html: `${item.expression} = ${item.result}`,
              }}
            ></p>
          ))}
        </div>
      )}

      <button
        className="calc__history-button"
        onClick={() => setShowHistory(!showHistory)}
      >
        <img src={history} />
      </button>
    </div>
  );
};
