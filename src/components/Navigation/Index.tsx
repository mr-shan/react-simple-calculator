import { IOperation } from "../../helpers/calculator";
import NavigationButton from "./NavigationButton";
import NavigationContent from "./NavigationContent";

interface IProps {
  toggleNav: any;
  historyItemClickHandler: any;
  showNav: boolean;
  calculationHistory: IOperation[];
}

export default (props: IProps) => {
  return (
    <>
      <NavigationButton
        toggleHistory={props.toggleNav}
        showNav={props.showNav}
        closeHistory={props.toggleNav}
      />
      {props.showNav && (
        <NavigationContent
          onHistoryItemClick={props.historyItemClickHandler}
          closeHistory={props.toggleNav}
          calculationHistory={props.calculationHistory}
        />
      )}
    </>
  );
};
