import { useEffect, useRef } from "react";

import "./style.css";

import { IOperation } from "../../helpers/calculator";

interface IProps {
  expression: string;
  calculationHistory: Array<IOperation>;
}

export default (props: IProps) => {
  const expressionRef = useRef();

  useEffect(() => {
    expressionRef.current.scrollTop = expressionRef.current.scrollHeight;
  }, [props.expression]);

  return (
    <div className="calc__expression-wrapper">
      <p className="calc_expression-text" ref={expressionRef}>
        {props.expression}
      </p>
      {/* <div className="calc__expression-history">
        {props.calculationHistory.map((item) => (
          <p key={item.id}>{`${item.expression} = ${item.result}`}</p>
        ))}
      </div> */}
    </div>
  );
};
