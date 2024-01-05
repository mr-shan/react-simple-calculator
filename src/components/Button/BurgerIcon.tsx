import React from 'react';
import "./Button.css";

interface IProps {
  toggleHistory: any
}

const BurgerIcon = (props: IProps) => {
  console.log("Burger icon updated")
  return (
    <button
      className='calc__history-button'
      onClick={props.toggleHistory}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default React.memo(BurgerIcon, () => true)