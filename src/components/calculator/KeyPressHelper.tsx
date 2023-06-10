import { useEffect } from "react";

export default (props) => {
  const keyPressHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();    
    if (event.keyCode === 8 || event.keyCode === 46)
      return props.handleBackspace();
    
    if (event.key === 'Enter')
        return props.showResult();
    
    props.onKeyDown(event.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler, false);

    return () => {
      document.removeEventListener("keydown", keyPressHandler, false);
    };
  }, []);

  return <></>;
};
