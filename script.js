// script.js

let displayValue = '';

function clearDisplay() {
  displayValue = '';
  updateDisplay();
}

function appendCharacter(character) {
  displayValue += character;
  updateDisplay();
}

function calculateResult() {
  try {
    const result = evaluateExpression(displayValue);
    displayValue = result.toString();
    updateDisplay();
  } catch (error) {
    displayValue = 'Error';
    updateDisplay();
  }
}

function evaluateExpression(expression) {
  // Implement a custom evaluation logic
  const operators = ['+', '-', '*', '/'];
  const values = expression.split(/[\+\-\*\/]/);
  const operatorsAndValues = expression.split(/(\+|\-|\*|\/)/).filter(token => token.trim() !== '');

  // Perform multiplication and division first
  for (const operator of ['*', '/']) {
    for (let i = 0; i < operatorsAndValues.length; i++) {
      if (operatorsAndValues[i] === operator) {
        const result = operate(parseFloat(values[i]), parseFloat(values[i + 1]), operator);
        values.splice(i, 2, result);
        operatorsAndValues.splice(i, 1);
        i--;
      }
    }
  }

  // Perform addition and subtraction
  let result = parseFloat(values[0]);
  for (let i = 0; i < operatorsAndValues.length; i++) {
    const operator = operatorsAndValues[i];
    const nextValue = parseFloat(values[i + 1]);
    result = operate(result, nextValue, operator);
  }

  return result;
}

function operate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error('Invalid operator');
  }
}

function updateDisplay() {
  document.getElementById('display').value = displayValue;
}
