import { sanitize } from './sanitizer';
import { IOperator } from './sanitizer';
import CalculatorDatabase from './indexedDb';

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
  openBrackets: number;
  calculatorDb: any;
  expressionItems: string[];

  constructor() {
    this.expression = '';
    this.expressionLength = 0;
    this.operationsInProgress = [];
    this.calculationHistory = [];
    this.result = 0;
    this.hasCalculationPerformed = false;
    this.isError = false;
    this.lastResult = null;
    this.expressionItems = [];

    this.currentNumber = '';
    this.openBrackets = 0;
    this.calculatorDb = new CalculatorDatabase();
  }

  addInput(input: string) {
    if (input === 'BRACKET') {
      input = this.handleBracket();
      if (input) {
        this.expressionItems.push(input)
      }
    }
    const char = sanitize(input);
    if (char === null) return false;

    let result = false;

    switch (char.type) {
      case 'operator':
        result = this.handleOperatorInput(char);
        if (!result) return false;
        this.expressionItems.push(char.label);
        break;
      case 'number':
        if (this.currentNumber === '0' && char.value === '0') return false;
        if (
          this.currentNumber === '0' &&
          this.operationsInProgress.length === 1
        ) {
          this.removeLastInput();
        }
        const operationLength = this.operationsInProgress.length - 1;
        const mostRecentOp = this.operationsInProgress[operationLength];
        if (mostRecentOp?.type === 'bracketClose') this.addInput('*');
        this.currentNumber += char.value;
        if (['number', 'dot'].includes(mostRecentOp?.type)) {
          this.expressionItems[this.expressionItems.length - 1] += char.value;
        } else {
          this.expressionItems.push(char.value);
        }
        break;
      case 'dot':
        result = this.handleDotInput(char);
        if (result) {
          this.expressionItems[this.expressionItems.length - 1] += '.';
        } else {
          return false;
        }
        break;
    }

    this.operationsInProgress.push(char);
    this.evaluateExpression();
    console.log(this.expressionItems);
    return true;
  }

  addHistoricalResult(result: number) {
    const operationLength = this.operationsInProgress.length - 1;
    const mostRecentOp = this.operationsInProgress[operationLength];
    // todo: if bracket close, add input
    if (
      mostRecentOp?.type === 'number' ||
      mostRecentOp?.type === 'bracketClose'
    )
      return false;
    this.currentNumber = '';
    result
      .toString()
      .split('')
      .forEach((char: string) => {
        const sanitizedChar = sanitize(char);
        if (!sanitizedChar) return;
        this.currentNumber += sanitizedChar?.value;
        this.operationsInProgress.push(sanitizedChar);
      });
    this.expressionItems.push(result.toString())
    this.evaluateExpression();
    return true;
  }

  handleBracket() {
    const operationLength = this.operationsInProgress.length - 1;
    const mostRecentOp = this.operationsInProgress[operationLength];
    if (this.openBrackets === 0) {
      ++this.openBrackets;
      if (
        mostRecentOp?.type === 'number' ||
        this.operationsInProgress[operationLength]?.type === 'bracketClose'
      ) {
        this.addInput('*');
      }
      return '(';
    } else if (mostRecentOp?.type === 'bracketOpen') {
      return '';
    } else {
      --this.openBrackets;
      return ')';
    }
  }

  handleOperatorInput(char: IOperator) {
    if (this.currentNumber[this.currentNumber.length - 1] === '.') return false;
    const operationLength = this.operationsInProgress.length - 1;
    if (this.operationsInProgress[operationLength]?.type === 'operator')
      this.removeLastInput();
    else if (this.operationsInProgress.length === 0) {
      console.log(char.value, this.lastResult);
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

  async calculateResult() {
    if (!this.operationsInProgress.find((e) => e.type === 'operator')) {
      this.result = 0;
      this.hasCalculationPerformed = false;
      return false;
    }

    try {
      let expressionForCalculation = '';
      this.operationsInProgress.map((e) => {
        expressionForCalculation += e.value;
      });

      let rawResult = eval(expressionForCalculation);
      if (rawResult.toString().includes('.'))
        rawResult = parseFloat(rawResult.toFixed(16));
      this.result = rawResult;
      this.isError = false;
      this.hasCalculationPerformed = true;
    } catch (error) {
      this.isError = true;
      this.hasCalculationPerformed = false;
      this.currentNumber = '';
    }
    return true;
  }

  async showResult() {
    if (this.isError || !this.hasCalculationPerformed) return null;

    const resultData = {
      expression: this.expression,
      result: this.result,
      id: new Date().toISOString(),
    };

    this.clearResult();
    this.saveCalculation(resultData);
    return resultData;
  }

  saveCalculation(resultData: IOperation) {
    this.calculationHistory.push(resultData);
    this.saveLastResult(resultData.result.toString());
    // setting up timeout to improve the performance of css animation and delay db operations
    setTimeout(() => {
      this.calculatorDb.addCalculation(resultData);
    }, 250);
  }

  removeLastInput() {
    if (this.operationsInProgress.length === 0) return;

    const removedChar = this.operationsInProgress.pop();
    if (this.expressionItems.length) {
      const lastExpression =
      this.expressionItems[this.expressionItems.length - 1];
      if (lastExpression?.length === 1) {
        this.expressionItems.pop();
      } else {
        this.expressionItems[this.expressionItems.length - 1] =
        lastExpression.substring(0, lastExpression.length - 1);
      }
    }
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
    this.expressionItems = [];
  }

  async loadCalculations() {
    try {
      const data = await this.calculatorDb.fetchAllCalculations();
      if (Array.isArray(data)) this.calculationHistory = data;
    } catch (error) {
      console.error(
        'The calculation history data in local storage is corrupted '
      );
    }
  }

  async cleanHistory() {
    try {
      await this.calculatorDb.cleanAllCalculationData();
      this.calculationHistory = [];
      return Promise.resolve(true);
    } catch (error) {
      console.dir(error);
      console.error('failed to clearn history');
      return Promise.reject(false);
    }
  }
}

export default Calculator;
