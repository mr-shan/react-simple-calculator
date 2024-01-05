import { sanitize, sanitizeString } from './sanitizer';
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
    this.openBrackets = 0;
    this.calculatorDb = new CalculatorDatabase();
    this.loadCalculations();
  }

  addInput(input: string) {
    if (input === 'BRACKET') {
      input = this.handleBracket();
      console.log(input)
    }
    const char = sanitize(input);
    if (char === null) return false;

    let result = false;

    switch (char.type) {
      case 'operator':
        result = this.handleOperatorInput(char);
        if (!result) return false;
        break;
      case 'number':
        if (this.currentNumber === '0' && char.value === '0') return false;        
        const operationLength = this.operationsInProgress.length - 1;
        const mostRecentOp = this.operationsInProgress[operationLength]
        if (mostRecentOp?.type === 'bracketClose') this.addInput('*')
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

  addHistoricalResult(result: number) {
    const operationLength = this.operationsInProgress.length - 1;
    const mostRecentOp = this.operationsInProgress[operationLength]
    if (mostRecentOp?.type === 'number') return false;
    this.currentNumber = ''
    result.toString().split('').forEach((char: string) => {
      const sanitizedChar = sanitize(char);
      if (!sanitizedChar) return;
      this.currentNumber += sanitizedChar?.value;
      this.operationsInProgress.push(sanitizedChar);
    })
    this.evaluateExpression();
    return true;
  }

  handleBracket() {
    const operationLength = this.operationsInProgress.length - 1;
    const mostRecentOp = this.operationsInProgress[operationLength]
    if (this.openBrackets === 0) {
      ++this.openBrackets;
      if (mostRecentOp?.type === 'number' || this.operationsInProgress[operationLength]?.type === 'bracketClose') {
        this.addInput('*')
      }
      return '('
    } else if (mostRecentOp?.type === 'bracketOpen') {
      return '';
    }
      else {
      --this.openBrackets;
      return ')'
    }
  }

  handleOperatorInput(char: IOperator) {
    if (this.currentNumber[this.currentNumber.length - 1] === '.') return false
    const operationLength = this.operationsInProgress.length - 1;
    if (this.operationsInProgress[operationLength]?.type === 'operator')
      this.removeLastInput();
    else if (this.operationsInProgress.length === 0) {
      console.log(char.value, this.lastResult)
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
      if (rawResult.toString().includes('.')) rawResult = parseFloat(rawResult.toFixed(16))
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

    this.clearResult();
    this.saveCalculation(resultData)
    return resultData;
  }

  saveCalculation(resultData: IOperation) {
    this.calculationHistory.push(resultData)
    this.saveLastResult(resultData.result.toString())
    this.calculatorDb.addCalculation(resultData)
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

  async loadCalculations() {
    try {
      const data = await this.calculatorDb.fetchAllCalculations();
      if (Array.isArray(data)) this.calculationHistory = data;
    } catch (error) {
      console.error('The calculation history data in local storage is corrupted ')
    }
  }
}

export default Calculator;