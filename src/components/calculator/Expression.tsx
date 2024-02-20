import React from 'react';
import './style.css';

interface IProps {
  expression: string;
  expressionLength: number;
  expressionItems: string[]
}

const Expression = (props: IProps) => {
  const expressionStyleObj = { fontSize: '3.5rem' };
  if (props.expressionLength > 15) expressionStyleObj.fontSize = '2.5rem';
  else if (props.expressionLength > 10) expressionStyleObj.fontSize = '3rem';

  let formattedExpression = ''
  props.expressionItems.forEach((item: string) => {
    const parsedItem = parseFloat(item)
    formattedExpression += isNaN(parsedItem) ? item : parsedItem.toLocaleString('en-in')
  })
  
  return (
    <div className='calc__expression-wrapper'>
      <p
        className='calc_expression-text'
        style={expressionStyleObj}
        dangerouslySetInnerHTML={{ __html: formattedExpression }}
      ></p>
    </div>
  );
};

export default React.memo(
  Expression,
  (prevProps: IProps, nextProps: IProps) => {
    return prevProps.expression === nextProps.expression;
  }
);
