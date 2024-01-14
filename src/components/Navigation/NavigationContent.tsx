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
        {/* <div className='calc__navigation-bar-back-blur'></div> */}
        <ThemeSelector closeNav={props.closeHistory}/>
        <CalculationHistory onHistoryItemClick={props.onHistoryItemClick} />
        <div
          style={{
            fontSize: '0.6rem',
            color: 'var(--box-shadow2)',
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
