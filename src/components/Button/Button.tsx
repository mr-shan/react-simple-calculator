import React from 'react';
import "./Button.css";

import { ICalculatorKey } from "../../helpers/calculatorKeys";

interface IProps {
  details: ICalculatorKey,
  onClick: any
}

const Button = ({ details, onClick }:IProps) => {
  const onClickHandler = () => {
    onClick(details.onClick, details.operator)
  }
  const cachedDetails = React.useMemo(() => details, [details])
  const classes = ["calc-num-button", ...cachedDetails.classNames];
  return (
    <button
      className={classes.toString().replaceAll(',', ' ')}
      onClick={onClickHandler}
      aria-label={details.label}
    >
      <span dangerouslySetInnerHTML={{__html: cachedDetails.label}}></span>
    </button>
  );
}

export default React.memo(Button, (prevProps, nextProp) => { return prevProps.details.operator === nextProp.details.operator})
