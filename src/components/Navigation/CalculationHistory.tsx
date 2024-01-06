import "./CalculationHistory.css";
import { IOperation } from "../../helpers/calculator";
import React from "react";

interface IProps {
  calculationHistory: Array<IOperation>;
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  const historyItemClickHandler = (result: number) => {
    props.onHistoryItemClick(result);
  };

  React.useEffect(() => {
    const wrapper = document.querySelector(".calc__expression-history-container");
    if (wrapper) {
      wrapper.scrollTop = wrapper.scrollHeight;
    }
  }, []);

  return (
    <div className="calc__expression-history-container">
      {props.calculationHistory.map((item) => (
        <div
          className="calc__expression-history-item"
          key={item.id}
          onClick={() => historyItemClickHandler(item.result)}
        >
          <p
            className="calc__expression-history-item-expression"
            dangerouslySetInnerHTML={{
              __html: `${item.expression} =`,
            }}
          ></p>
          <p className="calc__expression-history-item-result">{item.result}</p>
        </div>
      ))}
    </div>
  );
};
