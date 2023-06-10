import "./style.css";

interface IProps {
  expression: string;
}

export default (props: IProps) => {
  return (
    <div className="calc__expression-wrapper">
      <p className="calc_expression-text">{props.expression}</p>
    </div>
  );
};
