import "./Button.css";

import { ICalculatorKey } from "../../helpers/calculatorKeys";

interface IProps {
  details: ICalculatorKey,
  onClick: any
}

export default ({ details, onClick }:IProps) => {
  const onClickHandler = () => {
    onClick(details.onClick, details.operator)
  }

  const classes = ["calc-num-button", ...details.classNames];
  return (
    <button
      className={classes.toString().replaceAll(',', ' ')}
      onClick={onClickHandler}
      tabIndex={-1}
    >
      <span dangerouslySetInnerHTML={{__html: details.label}}></span>
    </button>
  );
};
