const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-clear-all]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')


class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.itemArray = [];
    this.equationArray = [];
    this.newNumberFlag = false;
  }

  // clear function to clear everything on the screen initializing a value of '0'
  clear() {    
    this.currentOperandElement.innerText = '0';
    this.previousOperandElement = '';
    this.operator = null;
  }

  // appendNumber function to accept values inputted by the user
  appendNumber(number) {
    
    if(this.currentOperandElement.innerText == '0' &&
       this.currentOperandElement.innerText.length == 1)
    {
      this.currentOperandElement.innerText = number;
    } 
    else 
    {
      this.currentOperandElement.innerText += number;
    }
      
   
    console.log(this.currentOperandElement);
  }

  updateDisplay() {
    
  }

}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText);
    calculator.appendNumber(button.innerText);
  });
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
});



// TODO :Numbers divided by zero should produce a 'null' result
//       Negative numbers should be able to be calculated 
//       Round off numbers to 4 decimal places  
//       Calculation of percentages  