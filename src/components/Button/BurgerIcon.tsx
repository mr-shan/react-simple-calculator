import "./Button.css";

interface IProps {
  toggleHistory: any
}

export default (props: IProps) => {
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
