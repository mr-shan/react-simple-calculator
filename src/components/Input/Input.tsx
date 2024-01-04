import React from "react";

import "./Input.css";

export default (props) => {
  const inputRef = React.useRef();

  React.useEffect(()=> {
    setInputHeight();
  }, [props.value])

  const setInputHeight = () => {
    inputRef.current.style.height = '1px';
    inputRef.current.style.height = (inputRef.current.scrollHeight)+"px";
  }

  const inputChangehandler = event => {
    setInputHeight();
    props.onChange(event)
  }

  const onKeyUpHandler = event => {
    setInputHeight();
    props.onKeyUp(event)
  }
  
  return (
    <div className="input-container">
      <textarea
        ref={inputRef}
        className="calculator-input"
        onKeyUp={onKeyUpHandler}
        onInput={inputChangehandler}
        value={props.value}
      ></textarea>
    </div>
  );
};
