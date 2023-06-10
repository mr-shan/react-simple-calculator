import Button from "../Button/Button";
import './style.css'

export default (props) => {
  const onClick = (event) => {
    props.onClick(event)
  };

  return (
    <div className="calc__input-buttons-wrapper">
      <Button operator="C" onClick={props.clearResult} className="secondary" />
      <Button operator="%" onClick={onClick} className="secondary" />
      <Button
        operator="&#x2190;"
        onClick={props.handleBackspace}
        className="secondary backspace-button"
      />
      <Button operator="/" onClick={onClick} className="accent" />

      <Button operator="7" onClick={onClick} className="regular" />
      <Button operator="8" onClick={onClick} className="regular" />
      <Button operator="9" onClick={onClick} className="regular" />
      
      <Button operator="x" onClick={onClick} className="accent" />

      <Button operator="4" onClick={onClick} className="regular" />
      <Button operator="5" onClick={onClick} className="regular" />
      <Button operator="6" onClick={onClick} className="regular" />
      
      <Button operator="-" onClick={onClick} className="accent" />
      
      <Button operator="1" onClick={onClick} className="regular" />
      <Button operator="2" onClick={onClick} className="regular" />
      <Button operator="3" onClick={onClick} className="regular" />
      
      <Button operator="+" onClick={onClick} className="accent" />
      
      <Button operator="()" onClick={onClick} className="regular" />
      <Button operator="0" onClick={onClick} className="regular" />
      <Button operator="." onClick={onClick} className="regular" />

      <Button operator="=" onClick={props.showResult} className="accent" />
    </div>
  );
};
