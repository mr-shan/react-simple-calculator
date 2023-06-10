import "./style.css";

interface IProps {
  result: number;
  tempValue: number;
}

export default (props: IProps) => {
  return (
    <div className="calc__result-wrapper">
      {!isNaN(props.result) ? (
        <p className="calc__result-text-final">{props.result}</p>
      ) : (
        <p className="calc__result-text-temp">{props.tempValue}</p>
      )}
    </div>
  );
};