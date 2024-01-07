import "./NavigationContent.css";
import CalculationHistory from "./CalculationHistory";
import ThemeSelector from "./ThemeSelector";

interface IProps {
  closeHistory: any;
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  return (
    <>
      <div
        className="calc__navigation-bar-backdrop"
        onClick={props.closeHistory}
      ></div>
      <div className="calc__navigation-bar-content">
        <CalculationHistory
          onHistoryItemClick={props.onHistoryItemClick}
        />
        <ThemeSelector />
      </div>
    </>
  );
};
