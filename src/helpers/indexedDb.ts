import Dexie from 'dexie';

import { IOperation } from './calculator';

class CalculatorDatabase extends Dexie {
  calculations!: Dexie.Table<IOperation, string>;

  constructor () {
      super("CalculatorDatabase");
      this.version(1).stores({
        calculations: '++id, result, expression',
      });
  }

  async addCalculation(calculation: IOperation) {
    this.calculations.add(calculation)
  }

  async fetchAllCalculations() {
    const data: IOperation[] = await this.calculations.toArray()
    return data;
  }

  async cleanAllCalculationData() {
    this.calculations.clear()
  }
}

export default CalculatorDatabase;