import { createContext } from 'react';
import CalculatorComponent from './components/calculator/Calculator';
import Calculator from './helpers/calculator';

const calcObj = new Calculator();
export const CalculatorContext = createContext(calcObj);

function App() {
  return (
    <CalculatorContext.Provider value={calcObj}>
      <div className='app'>
        <CalculatorComponent />
      </div>
    </CalculatorContext.Provider>
  );
}

export default App;
