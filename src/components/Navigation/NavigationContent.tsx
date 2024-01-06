import "./NavigationContent.css";
import { IOperation } from "../../helpers/calculator";
import CalculationHistory from "./CalculationHistory";
import ThemeSelector from "./ThemeSelector";

interface IProps {
  calculationHistory: Array<IOperation>;
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
          calculationHistory={props.calculationHistory}
          onHistoryItemClick={props.onHistoryItemClick}
        />
        <ThemeSelector />
      </div>
    </>
  );
};
