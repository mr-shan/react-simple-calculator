import './style.css';

interface IProps {
  result: number;
  tempValue: number;
}

export default (props: IProps) => {
  const isFinalResult = !isNaN(props.result);
  const resultStyleObj = { fontSize: '3.5rem' };
  const tempResultStyleObj = { fontSize: '2.5rem' };

  console.log('result updated')

  if (isFinalResult) {
    const resultLength = props.result.toString().length;
    if (resultLength > 15) resultStyleObj.fontSize = '2rem';
    else if (resultLength > 10) resultStyleObj.fontSize = '2.5rem';
  }

  if (props.tempValue) {
    tempResultStyleObj.fontSize =
      props.tempValue.toString().length > 14 ? '1.75rem' : '2.5rem';
  }

  return (
    <div className="calc__result-wrapper">
      {isFinalResult ? (
        <p className="calc__result-text-final" style={resultStyleObj}>
          {props.result}
        </p>
      ) : (
        <p className="calc__result-text-temp" style={tempResultStyleObj}>
          {props.tempValue}
        </p>
      )}
    </div>
  );
};
