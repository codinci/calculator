const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const negateButton = document.querySelector('[data-negate-number]');
const percentageButton = document.querySelector('[data-percentage-operation]');
const equalsButton = document.querySelector('[data-equals]');
const decimalPointButton = document.querySelector('[data-number-point]');
const allClearButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');


class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  // clear function to clear everything on the screen initializing a value of '0'
  clear() {
    this.currentOperandElement.innerText = 0;
    this.previousOperandElement.innerText = '';
    this.currentOperand = 0;
    this.previousOperand = '';
    this.operator = '';
    this.itemArray = [];
    this.result = '';
    this.equationArray = [];
    this.newNumberFlag = false;
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
  appendNumber(number){
    this.previousOperandElement.innerText = '';
    this.currentOperand += number;
  }

  //appendPoint function is used to define events after the point number is pressed
  appendPoint(point) {
    this.previousOperandElement.innerText = '';
    if(point === '.' && this.currentOperand.toString().includes('.')) {
      return;
    } else if(this.currentOperand == '') {
      this.currentOperand = '0' + point;
    } else{
      this.currentOperand += point;
    }
  }

  //equalButtonPressed function is used to define events when the equal sign button is pressed
  equalButtonPressed(){
    this.newNumberFlag = true;
    this.compute();
  }

  //chooseOperation to take in the operator chosen by the user
  chooseOperation(symbol) {
    if (this.currentOperand.length === ''){
      this.currentOperand = 0;
    }
    if(symbol == '÷' && this.currentOperandElement.innerText == 0) {
      alert("Cannot Divide by Zero!");
      return;
    }
    if (this.previousOperand !== null ) {
      this.compute();
    }

    this.operator = symbol;
    this.previousOperand = this.currentOperand;
    this.currentOperand = 0;
  }

  //roundResult function is used to round up the number to 4 decimal places
  roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

  // divisionByZero() {
  //   alert("You can not divide by zero");
  // }

//compute function for carrying out calculations based on user input
  compute() {
    let computation;
    const a = parseFloat(this.previousOperand)
    const b = parseFloat(this.currentOperand)
    console.log(a, b);
    if (isNaN(a) || isNaN(b)) return;
    switch (this.operator) {
      case '+':
        computation = a + b;
        break;
      case '-':
        computation = a - b;
        break;
      case '÷':
        if(b === 0) return null;
        computation = a/b;
        break;
      case '×':
        computation = a*b;
        break;
      default:
        return;
    }
    if(!this.newNumberFlag){
      this.currentOperand = computation;
      this.operator = '';
      this.previousOperand = '';
    }else{
      this.equalDisplay(this.previousOperand, this.operator, this.currentOperand, computation);
    }
    this.newNumberFlag = false;
  }

  //formatNumber is used to format the numbers to have commas
  formatNumber(number) {
    //convert number to string
    const stringNumber = number.toString();
    //defines integerDigits, numbers before the 'dot'
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    //defines decimalDigits, numbers after the 'dot'
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //equalDisplay function displays what the user sees on clicking the equal sign
  equalDisplay(num1, operation, num2, result) {
  if(this.newNumberFlag){
      this.previousOperandElement.innerText = `${this.formatNumber(num1)}${operation}${this.formatNumber(num2)}=`;
      this.currentOperandElement.innerText = `${this.formatNumber(this.roundResult(result))}`;
    } else {
      this.currentOperand = 0;
      this.operator = '';
      this.previousOperand = '';
    }
  }

  // updateDisplay function displays what the user sees
  updateDisplay() {
    if(this.previousOperand === ''){
      this.currentOperandElement.innerText = `${this.formatNumber(this.currentOperand)}${this.operator}`;
    } else {
      this.previousOperandElement.innerText = `${this.formatNumber(this.previousOperand)}${this.operator}`;
      this.currentOperandElement.innerText = this.formatNumber(this.currentOperand);
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
  calculator.equalButtonPressed();
  calculator.equalDisplay();
});

decimalPointButton.addEventListener('click', event => {
  calculator.appendPoint(event.target.innerText);
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


// TODO :Alert when dividing by zero
// TODO :Allow keyboard input
// TODO :An array of previous calculations
