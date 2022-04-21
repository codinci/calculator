const display = document.querySelector('.display');
const controlButtons = document.querySelector('.controls').children;
const allSymbols = ['+', '-', 'X', '/', '%', 'C', '='];

let firstValue = '';
let secondValue = '';
let symbol = '';
let result = '';

const calculate = () => {
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);

  switch (symbol) {
    case '+':
        result = firstValue + secondValue          
        break;
    case '-':
        result = firstValue - secondValue
        break;
    case '-':
        result = firstValue - secondValue
        break;
    case 'X':
        result = firstValue * secondValue
        break;
    case '/':
        result = firstValue / secondValue
        break;
    case '%':
        result = firstValue % secondValue
        break;  
    default:
        break;
  }
  display.innerText = result;
  firstValue = result;
  secondValue = '';
}


controlButtons.forEach (button => {
    button.addEventListener('click', () => {
        const {innerText: btnValue} = button;
        const btnValueIsSymbol = allSymbols.includes(btnValue);

        if (firstValue && btnValueIsSymbol){
            secondValue && calculate();
            symbol = btnValue;
        }else if (!symbol) {
            firstValue += btnValue;
        } else if (symbol) {
            secondValue += btnValue;
        }

        if(btnValue !== '=') display.innerText += btnValue;
    });
});