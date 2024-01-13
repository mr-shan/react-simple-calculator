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
        <ThemeSelector />
        <CalculationHistory onHistoryItemClick={props.onHistoryItemClick} />
        <div
          style={{
            fontSize: '0.6rem',
            color: 'var(--accent)',
            marginRight: '1rem',
            position: 'absolute',
            bottom: '5px',
          }}
        >
          Version: 1.2.4
        </div>
      </div>
    </>
  );
};
