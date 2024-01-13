export interface ICalculatorKey {
  operator: string;
  onClick: string;
  label: string;
  classNames: Array<string>;
  name: string;
}

const CALCULATOR_KEYS: Array<ICalculatorKey> = [
  {
    name: 'Clear',
    operator: "CLEAR",
    label: "C",
    onClick: "clearResult",
    classNames: ["secondary", "clear-all"],
  },
  {
    name: 'Percentage',
    operator: "%",
    label: "&#x25;",
    onClick: "onClick",
    classNames: ["secondary", "percentage"],
  },
  {
    name: 'Backspace',
    operator: "BACKSPACE",
    label: "&#x2190;",
    onClick: "handleBackspace",
    classNames: ["secondary", "backspace-button"],
  },
  {
    name: 'Divide',
    operator: "/",
    label: "&#xf7;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { name: 'Seven', operator: "7", label: "7", onClick: "onClick", classNames: ["regular"] },
  { name: 'Eight', operator: "8", label: "8", onClick: "onClick", classNames: ["regular"] },
  { name: 'Nine', operator: "9", label: "9", onClick: "onClick", classNames: ["regular"] },
  {
    name: 'Multiply',
    operator: "*",
    label: "&#xd7;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { name: 'Four', operator: "4", label: "4", onClick: "onClick", classNames: ["regular"] },
  { name: 'Five', operator: "5", label: "5", onClick: "onClick", classNames: ["regular"] },
  { name: 'Siz', operator: "6", label: "6", onClick: "onClick", classNames: ["regular"] },
  {
    name: 'Subtract',
    operator: "-",
    label: "&#x2212;",
    onClick: "onClick",
    classNames: ["accent"],
  },
  { name: 'One', operator: "1", label: "1", onClick: "onClick", classNames: ["regular"] },
  { name: 'Two', operator: "2", label: "2", onClick: "onClick", classNames: ["regular"] },
  { name: 'Three', operator: "3", label: "3", onClick: "onClick", classNames: ["regular"] },
  { name: 'Add', operator: "+", label: "+", onClick: "onClick", classNames: ["accent"] },
  {
    name: 'Parenthesis',
    operator: "BRACKET",
    label: "(  )",
    onClick: "onClick",
    classNames: ["regular", "parenthesis"],
  },
  { name: 'Zero',operator: "0", label: "0", onClick: "onClick", classNames: ["regular"] },
  { name: 'Dot',operator: ".", label: ".", onClick: "onClick", classNames: ["regular"] },
  { name: 'Equal',operator: "=", label: "=", onClick: "showResult", classNames: ["accent"] },
];

export default CALCULATOR_KEYS;
