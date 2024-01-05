import React from 'react';
import './style.css';

interface IProps {
  expression: string;
  expressionLength: number;
}

const Expression = (props: IProps) => {
  console.log("Expression updated")
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

export default React.memo(Expression)