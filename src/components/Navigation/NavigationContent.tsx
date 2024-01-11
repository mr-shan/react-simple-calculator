import './NavigationContent.css';
import CalculationHistory from './CalculationHistory';
import ThemeSelector from './ThemeSelector';

interface IProps {
  closeHistory: any;
  onHistoryItemClick: any;
}

export default (props: IProps) => {
  return (
    <>
      <div
        className='calc__navigation-bar-backdrop'
        onClick={props.closeHistory}
      ></div>
      <div className='calc__navigation-bar-content'>
        <CalculationHistory onHistoryItemClick={props.onHistoryItemClick} />
        <ThemeSelector />
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--accent)',
            marginRight: '1rem'
          }}
        >
          Version: 1.2.2
        </div>
      </div>
    </>
  );
};
