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
    this.internationalNumberFormat = new Intl.NumberFormat('en-US')
    this.itemArray = [];
    this.equationArray = [];
    this.newNumberFlag = false;
    this.clear();
  }

  // clear function to clear everything on the screen initializing a value of '0'
  clear() {    
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operator = null;
  }

  delete() { 
    this.currentOperand = this.currentOperand.slice(0, -1);
    if(!this.currentOperand.length) {
      this.currentOperand = '0';
    }
    
  }

  // appendNumber function to accept values inputted by the user
  appendNumber(number) {
    
    if(number === '.' && this.currentOperand.includes('.'))
    {
      return;
    } 
    else if(this.currentOperand === '0' &&  number !== '.' ) {
      this.currentOperand = number;
    }
    else 
    {
      this.currentOperand += number;    
    }    
    // console.log(this.currentOperand);        
  }

  updateDisplay() {
    console.log(this.currentOperand);
    this.currentOperandElement.innerText = this.currentOperand;
    
  }

}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})



// TODO :Numbers divided by zero should produce a 'null' result
//       Negative numbers should be able to be calculated 
//       Round off numbers to 4 decimal places  
//       Calculation of percentages  