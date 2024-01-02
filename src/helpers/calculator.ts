import { sanitize, sanitizeString } from './sanitizer';
import { IOperator } from './sanitizer';

export interface IOperation {
  expression: string;
  result: number;
  id: string;
}

class Calculator {
  expression: string;
  expressionLength: number;
  operationsInProgress: Array<IOperator>;
  calculationHistory: Array<IOperation>;
  result: number;
  isError: boolean;
  hasCalculationPerformed: boolean;
  lastResult: IOperator | null;
  currentNumber: string;

  constructor() {
    this.expression = '';
    this.expressionLength = 0;
    this.operationsInProgress = [];
    this.calculationHistory = [];
    this.result = 0;
    this.hasCalculationPerformed = false;
    this.isError = false;
    this.lastResult = null;

    this.currentNumber = '';
  }

  addInput(input: string) {
    const char = sanitize(input);
    if (char === null) return false;

    let result = false;

    switch (char.type) {
      case 'operator':
        result = this.handleOperatorInput(char);
        if (!result) return false;
        break;
      case 'number':
        this.currentNumber += char.value;
        break;
      case 'dot':
        result = this.handleDotInput(char);
        if (!result) return false;
        break;
    }

    this.operationsInProgress.push(char);
    this.evaluateExpression();
    return true;
  }

  handleOperatorInput(char: IOperator) {
    if (this.currentNumber[this.currentNumber.length - 1] === '.') return false
    const operationLength = this.operationsInProgress.length - 1;
    if (this.operationsInProgress[operationLength]?.type === 'operator')
      this.removeLastInput();
    else if (this.operationsInProgress.length === 0) {
      if (char.value !== '-' && !this.lastResult) return false;
      if (this.lastResult) {
        this.expression += this.lastResult.label;
        this.operationsInProgress.push(this.lastResult);
        this.lastResult = null;
      }
    }
    this.currentNumber = '';
    return true;
  }

  handleDotInput(char: IOperator) {
    if (this.currentNumber.includes('.')) return false;
    if (this.currentNumber === '') {
      this.expression += '0';
      this.operationsInProgress.push({
        type: 'number',
        label: '0',
        value: '0',
      });
    }
    this.currentNumber += '0' + char.value;
    return true;
  }

  evaluateExpression() {
    this.expression = '';
    this.operationsInProgress.map((e) => {
      this.expression += e.label;
    });
    this.expressionLength = this.expression.toString().length;
  }

  calculateResult() {
    if (!this.operationsInProgress.find((e) => e.type === 'operator')) {
      this.result = 0;
      this.hasCalculationPerformed = false;
      return;
    }

    try {
      let expressionForCalculation = '';
      this.operationsInProgress.map((e) => {
        expressionForCalculation += e.value;
      });

      let rawResult = eval(expressionForCalculation);
      if (rawResult.toString().includes('.')) rawResult = rawResult.toFixed(2);
      this.result = rawResult;
      this.isError = false;
      this.hasCalculationPerformed = true;
    } catch (error) {
      this.isError = true;
      this.hasCalculationPerformed = false;
      this.currentNumber = '';
    }
  }

  showResult() {
    if (this.isError || !this.hasCalculationPerformed) return null;

    const resultData = {
      expression: this.expression,
      result: this.result,
      id: new Date().toISOString(),
    };

    this.calculationHistory.push(resultData);
    this.clearResult();
    this.saveLastResult(resultData.result.toString());
    return resultData;
  }

  removeLastInput() {
    if (this.operationsInProgress.length === 0) return;

    const removedChar = this.operationsInProgress.pop();
    this.evaluateExpression();
    return removedChar;
  }

  saveLastResult(result: string) {
    this.lastResult = {
      label: result,
      type: 'number',
      value: result,
    };
  }

  clearResult() {
    this.result = 0;
    this.expression = '';
    this.isError = false;
    this.hasCalculationPerformed = false;
    this.operationsInProgress = [];
    this.lastResult = null;
    this.expressionLength = 0;
    this.currentNumber = '';
  }
}

export default Calculator;
