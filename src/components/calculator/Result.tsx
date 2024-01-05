import './style.css';

interface IProps {
  result: number;
  tempValue: number;
}

export default (props: IProps) => {
  const isFinalResult = !isNaN(props.result);

  let styleObj = null;
  let className = '';
  let result = 0;

  if (isFinalResult) {
    styleObj = { fontSize: '3.5rem' };
    const resultLength = props.result.toString().length;
    if (resultLength > 15) styleObj.fontSize = '2.5rem';
    else if (resultLength > 10) styleObj.fontSize = '3rem';
    className = 'calc__result-text-final';
    result = props.result
  } else {
    styleObj = { fontSize: '2.5rem' };
    const resultLength = props.tempValue.toString().length;
    if (resultLength > 15) styleObj.fontSize = '1.5rem';
    else if (resultLength > 10) styleObj.fontSize = '2rem';
    className = 'calc__result-text-temp'
    result = props.tempValue
  }

  return (
    <div className="calc__result-wrapper">
      <div className={className} style={styleObj}>{ result }</div>
    </div>
  );
};
