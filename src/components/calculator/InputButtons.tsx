import { memo } from 'react';

import Button from "../Button/Button";
import './style.css'
import CALCULATOR_KEYS from "../../helpers/calculatorKeys";

interface IProps {
  clearResult: any,
  onClick: any,
  handleBackspace: any,
  showResult: any,
}

const InputButtons = (props: IProps) => {
  const onClick = (onClickHandler: string, operator: string) => {
    props[onClickHandler](operator);
  };

  console.log("inside input buttons")

  return (
    <div className="calc__input-buttons-wrapper">
      {
        CALCULATOR_KEYS.map(item => (
          <Button 
            key={item.label}
            details={item}
            onClick={onClick} 
          />
        ))
      }
    </div>
  );
};

export default memo(InputButtons, () => true)