export interface ICalculatorKey {
  operator: string;
  onClick: string;
  label: string;
  classNames: Array<string>;
}

const CALCULATOR_KEYS: Array<ICalculatorKey> = [
  {
    operator: "CLEAR",
    label: "C",
    onClick: "clearResult",
    classNames: ["secondary", "clear-all"],
  },
  {
    operator: "%",
    label: "&#x25;",
    onClick: "onClick",
    classNames: ["secondary", "percentage"],
  },
  {
    operator: "BACKSPACE",
    label: "&#x2190;",
    onClick: "handleBackspace",
    classNames: ["secondary", "backspace-button"],
  },
  {
    operator: "/",
    label: "&#xf7;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { operator: "7", label: "7", onClick: "onClick", classNames: ["regular"] },
  { operator: "8", label: "8", onClick: "onClick", classNames: ["regular"] },
  { operator: "9", label: "9", onClick: "onClick", classNames: ["regular"] },
  {
    operator: "*",
    label: "&#xd7;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { operator: "4", label: "4", onClick: "onClick", classNames: ["regular"] },
  { operator: "5", label: "5", onClick: "onClick", classNames: ["regular"] },
  { operator: "6", label: "6", onClick: "onClick", classNames: ["regular"] },
  {
    operator: "-",
    label: "&#x2212;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { operator: "1", label: "1", onClick: "onClick", classNames: ["regular"] },
  { operator: "2", label: "2", onClick: "onClick", classNames: ["regular"] },
  { operator: "3", label: "3", onClick: "onClick", classNames: ["regular"] },
  { operator: "+", label: "+", onClick: "onClick", classNames: ["accent"] },
  {
    operator: "BRACKET",
    label: "(  )",
    onClick: "onClick",
    classNames: ["regular", "parenthesis"],
  },
  { operator: "0", label: "0", onClick: "onClick", classNames: ["regular"] },
  { operator: ".", label: ".", onClick: "onClick", classNames: ["regular"] },
  { operator: "=", label: "=", onClick: "showResult", classNames: ["accent"] },
];

export default CALCULATOR_KEYS;
