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

  constructor() {
    this.expression = '';
    this.expressionLength = 0;
    this.operationsInProgress = [];
    this.calculationHistory = [];
    this.result = 0;
    this.hasCalculationPerformed = false;
    this.isError = false;
    this.lastResult = null;
  }

  addInput(input: string) {
    const char = sanitize(input);
    if (char === null) return false;

    if (char.type === 'operator') {
      if (
        this.operationsInProgress[this.operationsInProgress.length - 1]
          ?.type === 'operator'
      )
        this.removeLastInput();
      else if (this.operationsInProgress.length === 0) {
        if (char.value !== '-' && !this.lastResult) return false;
        if (this.lastResult) {
          this.operationsInProgress.push(this.lastResult);
          this.lastResult = null;
        }
      }
    }

    if (char.type === 'number') {
      if (this.operationsInProgress.length === 0 && char.value === '0')
        return false;
    }

    if (char.type === 'dot') {
      if (this.operationsInProgress.length === 0) {
        this.operationsInProgress.push({
          type: 'number',
          value: '0',
          label: '0',
        });
      } else {
        const recentOp = this.operationsInProgress[this.operationsInProgress.length - 1];
        if (recentOp.type === 'dot') return false;
      }
    }

    this.operationsInProgress.push(char);
    this.evaluateExpression();
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
      this.expressionForCalculation = '';
      this.operationsInProgress.map((e) => {
        this.expressionForCalculation += e.value;
      });

      let rawResult = eval(this.expressionForCalculation);
      if (rawResult.toString().includes('.')) rawResult = rawResult.toFixed(2);
      this.result = rawResult;
      this.isError = false;
      this.hasCalculationPerformed = true;
    } catch (error) {
      this.isError = true;
      this.hasCalculationPerformed = false;
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
  }
}

export default Calculator;
