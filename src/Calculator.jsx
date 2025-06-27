import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');

  const handleClick = (value) => {
    if (value === 'AC') return setDisplay('0');
    if (value === '=') {
      try {
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        return setDisplay(String(result));
      } catch {
        return setDisplay('Error');
      }
    }
    if (value === '±') return setDisplay(String(parseFloat(display) * -1));
    if (value === '%') return setDisplay(String(parseFloat(display) / 100));
    if (value === '√') {
      const num = parseFloat(display);
      return setDisplay(num >= 0 ? Math.sqrt(num).toString() : 'Error');
    }

    setDisplay(display === '0' ? value : display + value);
  };

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['√', '0', '.', '='],
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.flat().map((btn, i) => (
          <button key={i} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
