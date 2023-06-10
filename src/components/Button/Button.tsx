import "./Button.css";

interface IProps {
  className: string,
  operator: string,
  onClick: any
}

export default (props: IProps) => {
  const onClickHandler = () => {
    props.onClick(props.operator)
  }
  return (
    <button
      className={"calc-num-button " + props.className}
      onClick={onClickHandler}
    >
      {props.operator}
    </button>
  );
};
