// script.js

let displayValue = '';

function clearDisplay() {
    displayValue = '';
    updateDisplay();
    updateEqualsButton();
  }
  
  function appendCharacter(character) {
    displayValue += character;
    updateDisplay();
    updateEqualsButton();
  }
  
  function calculateResult() {
    try {
      const result = evaluateExpression(displayValue);
      displayValue = result.toString();
      updateDisplay();
      updateEqualsButton();
    } catch (error) {
      displayValue = 'Error';
      updateDisplay();
      updateEqualsButton();
    }
  }

function evaluateExpression(expression) {
  // Use a regular expression to split the expression into numbers and operators
  const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);

  if (!tokens) {
    throw new Error('Invalid expression');
  }

  // Perform multiplication and division first
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const operator = tokens[i];
      const leftOperand = parseFloat(tokens[i - 1]);
      const rightOperand = parseFloat(tokens[i + 1]);

      if (isNaN(leftOperand) || isNaN(rightOperand)) {
        throw new Error('Invalid operands');
      }

      const result = operate(leftOperand, rightOperand, operator);
      tokens.splice(i - 1, 3, result);
      i--;
    }
  }

  // Perform addition and subtraction
  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = parseFloat(tokens[i + 1]);

    if (isNaN(operand)) {
      throw new Error('Invalid operand');
    }

    result = operate(result, operand, operator);
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
      return roundToTwoDecimals(a / b);
    default:
      throw new Error('Invalid operator');
  }
}

function roundToTwoDecimals(value) {
    // Round the value to two decimals
    return Math.round(value * 100) / 100;
  }

function updateDisplay() {
  document.getElementById('display').value = displayValue;
}

function updateEqualsButton() {
    // Enable or disable the equals button based on whether there is a valid operation to perform
    const equalsButton = document.getElementById('equalsBtn');
    equalsButton.disabled = !hasValidOperation();
  }
  
  function hasValidOperation() {
    // Check if the display value has a valid operation
    const operatorsRegex = /[\+\-\*\/]/;
    return operatorsRegex.test(displayValue);
  }