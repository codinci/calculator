const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const negateButton = document.querySelector('[data-negate-number]');
const percentageButton = document.querySelector('[data-percentage-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');


class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.internationalNumberFormat = new Intl.NumberFormat('en-US');
    this.itemArray = [];
    this.equationArray = [];
    this.newNumberFlag = false;
    this.currentOperand = '' ;
    this.previousOperand = '';
    this.operator = '';
  }

  // clear function to clear everything on the screen initializing a value of '0'
  clear() {    
    this.currentOperandElement.innerText = 0;
    this.currentOperand = 0;
    this.previousOperandElement.innerText = '';
    this.previousOperand = '';
    this.operator = '';
    this.itemArray = [];
    // console.log(this.previousOperand);
  }

//  delete function to remove last item 
  delete() { 
    this.currentOperand = this.currentOperand.toString().slice(0, -1);

    if(!this.currentOperand.toString().length) {
      this.currentOperand = 0;
    }    
  }

  //negateNumber function negates the value of a number 
  negateNumber() {
    this.currentOperand = parseFloat(this.currentOperand) * -1;
  }

  //percentageOfNumber function converts the value into a percentage
  percentageOfNumber() {
    this.currentOperand = parseFloat(this.currentOperand) / 100;
  }


  // appendNumber function to accept values inputted by the user
  appendNumber(number) {
      
    if(number === '.' && this.currentOperand.toString().includes('.'))
    {
      return;
    } 

    else if(this.currentOperand == 0 &&
            number !== '.'  && 
            this.currentOperand.toString().length == 1)

    {     
      this.currentOperand = number;
    }

    else 
    {
      this.currentOperand += number;    
    }             
  }

  //chooseOperation to take in the operator chosen by the user
  chooseOperation(symbol) {    
    if (this.currentOperand.length === ''){
      this.currentOperand = 0;
    }
    if (this.previousOperand !== null) {
      this.compute();
    }
    this.operator = symbol;
    this.previousOperand = this.currentOperand;
    this.currentOperand = 0;
    this.itemArray.push(this.previousOperand, symbol);
  }

  add (a, b) {
    return a + b;
  }

  compute() {
    let computation;
    const a = parseFloat(this.previousOperand)
    const b = parseFloat(this.currentOperand)
    if (isNaN(a) || isNaN(b)) return;
    this.itemArray.push(this.currentOperand);
    switch (this.operator) {
      case '+':
        computation = a + b;
        break;
      case '-':
        computation = a - b;
        break;
      case '÷':
        if(b === 0) return alert("Cannot divide by zero");
        computation = a/b;
        break;
      case '×':
        computation = a*b;
        break;        
      default:
        return;
    }
    
    this.currentOperand = computation;
    this.operator = '';
    this.previousOperand = '';
  }

  updateDisplay() {
    console.log(this.itemArray);
    if(this.previousOperand === ''){
      this.currentOperandElement.innerText = `${this.currentOperand}${this.operator}`;      
    } else {
      this.previousOperandElement.innerText = `${this.previousOperand}${this.operator}`;
      this.currentOperandElement.innerText = this.currentOperand;     
    }     
  }

}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

negateButton.addEventListener('click', () => {
  calculator.negateNumber();
  calculator.updateDisplay();
});

percentageButton.addEventListener('click', () => {
  calculator.percentageOfNumber();
  calculator.updateDisplay();
});



// TODO :Round off numbers to 4 decimal places
// TODO :Format number to have comma
// TODO :On pressing the equal sign a new number should be inputted
