import Button from "../Button/Button";
import './style.css'
import CALCULATOR_KEYS from "../../helpers/calculatorKeys";

export default (props) => {
  const onClick = (onClickHandler: string, operator: string) => {
    props[onClickHandler](operator);
  };

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
