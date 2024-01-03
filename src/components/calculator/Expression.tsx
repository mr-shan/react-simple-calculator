import './style.css';

import { IOperation } from '../../helpers/calculator';

interface IProps {
  expression: string;
  calculationHistory: Array<IOperation>;
  expressionLength: number;
}

export default (props: IProps) => {
  const expressionStyleObj = { fontSize: '2.5rem' };
  if (props.expressionLength > 20) expressionStyleObj.fontSize = '1.5rem';
  else if (props.expressionLength > 15) expressionStyleObj.fontSize = '2rem';

  return (
    <div className='calc__expression-wrapper'>
      <p
        className='calc_expression-text'
        style={expressionStyleObj}
        dangerouslySetInnerHTML={{ __html: props.expression }}
      ></p>
    </div>
  );
};
