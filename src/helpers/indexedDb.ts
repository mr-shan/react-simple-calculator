import { openDB, IDBPDatabase } from 'idb';

import { IOperation } from './calculator';

class CalculatorDatabase {
  openDbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.openDbPromise = openDB('calc-db', 1, {
      upgrade(db: IDBPDatabase) {
        if (!db.objectStoreNames.contains('calculatorOperations'))
          db.createObjectStore('calculatorOperation', {
            keyPath: 'id',
            autoIncrement: true,
          });
      },
    });
  }

  openDatabase() {
    return openDB('calc-db', 1, {
      upgrade(db: IDBPDatabase) {
        if (!db.objectStoreNames.contains('calculatorOperations'))
          db.createObjectStore('calculatorOperation', {
            keyPath: 'id',
            autoIncrement: true,
          });
      },
    });
  }

  async addItem(item: IOperation) {
    const db = await this.openDbPromise;
    const tx = db.transaction('calculatorOperation', 'readwrite');
    await tx.store.put(item);
    await tx.done;
  }

  async getAllItems() {
    const db = await this.openDbPromise;
    const tx = db.transaction('calculatorOperation', 'readonly');
    const allItems = await tx.store.getAll();
    await tx.done;
    return allItems;
  }

  async cleanDb() {
    const db = await this.openDbPromise;
    const tx = db.transaction('calculatorOperation', 'readwrite');
    await tx.store.clear();
    await tx.done;
  }

  async addCalculation(calculation: IOperation) {
    await this.addItem(calculation);
  }

  async fetchAllCalculations() {
    const data = await this.getAllItems();
    return data;
  }

  cleanAllCalculationData() {
    return this.cleanDb();
  }
}

export default CalculatorDatabase;
