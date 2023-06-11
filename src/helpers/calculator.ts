import { sanitize, sanitizeString } from "./sanitizer";

export interface IOperation {
  expression: string;
  result: number;
  id: string;
}

class Calculator {
  expression: string;
  calculationHistory: Array<IOperation>;
  result: number;
  isError: boolean;
  hasCalculationPerformed: boolean;

  constructor() {
    this.expression = "";
    this.calculationHistory = [];
    this.result = 0;
    this.hasCalculationPerformed = false;
    this.isError = false;
  }

  handleExpressionChange(inputStr: string) {
    this.expression = sanitizeString(inputStr);
  }

  addInput(input: string) {
    const char = sanitize(input);
    if (char === "") return false;

    this.expression += char;
    return true;
  }

  calculateResult() {
    if (!/[+\-*/.]/.test(this.expression)) {
      this.result = 0;
      this.hasCalculationPerformed = false;
      return;
    }

    try {
      let rawResult = eval(this.expression);
      if (rawResult.toString().includes(".")) rawResult = rawResult.toFixed(2);
      this.result = rawResult;
      this.isError = false;
      this.hasCalculationPerformed = true;
    } catch (error) {
      this.isError = true;
      this.hasCalculationPerformed = false
    }
  }

  showResult() {
    if (this.isError || !this.hasCalculationPerformed)
      return null;

    const resultData = {
      expression: this.expression,
      result: this.result,
      id: new Date().toISOString(),
    };

    this.calculationHistory.push(resultData);
    this.clearResult();

    return resultData;
  }

  removeLastInput() {
    this.expression = this.expression.substring(0, this.expression.length - 1);
  }

  clearResult() {
    this.result = 0;
    this.expression = "";
    this.isError = false;
  }
}

export default Calculator;
