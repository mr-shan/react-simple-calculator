import "./NavigationButton.css";

interface IProps {
  toggleHistory: any;
  closeHistory: any;
  showNav: boolean;
}

const BurgerIcon = (props: IProps) => {
  const clickHandler = () => {
    props.showNav ? props.closeHistory() : props.toggleHistory();
  };
  return (
    <button className="calc__history-button" onClick={clickHandler}>
      <span
        className={
          props.showNav
            ? "calc__history-button-bar1 calc__history-button-bar1-open"
            : "calc__history-button-bar1"
        }
      ></span>
      <span
        className={
          props.showNav
            ? "calc__history-button-bar2 calc__history-button-bar2-open"
            : "calc__history-button-bar2"
        }
      ></span>
      <span
        className={
          props.showNav
            ? "calc__history-button-bar3 calc__history-button-bar3-open"
            : "calc__history-button-bar3"
        }
      ></span>
    </button>
  );
};

export default BurgerIcon
