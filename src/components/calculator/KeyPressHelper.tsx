import { useEffect, memo } from "react";

const KeyPressHelper = (props) => {
  const keyPressHandler = (event) => {
    if (event.keyCode === 8 || event.keyCode === 46)
      return props.handleBackspace();

    if (event.key === "Enter") {
      event.preventDefault();
      return props.showResult();
    }

    props.onKeyDown(event.key);
  };

  console.log("key press helper updated")

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler, false);

    return () => {
      document.removeEventListener("keydown", keyPressHandler, false);
    };
  }, []);

  return <></>;
};

export default memo(KeyPressHelper, () => true)