const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    //console.log(number);
    //If display value is 0, replace it.
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent; calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
//{if (calculatorDisplay.textContent === '0'){calculatorDisplay.textContent = number;}else{calculatorDisplay.textContent = calculatorDisplay.textContent + number}}
//console.log(inputBtns);

// Run on 'decimal' click
function addDecimal() {
    //Wnen NOT to add decimal
    if (awaitingNextValue) return;
    //If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
        //calculatorDisplay.textContent = calculatorDisplay.textContent + '.';
    }
}

// Run on 'operator' click
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Updates operator without calculating
    if (operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    } 
    //Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        //console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        //console.log('calculation', calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next
    awaitingNextValue = true;
    operatorValue = operator;
}

// Run on 'clear' click - Reset all values, display
function Reset() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listners
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
});

clearBtn.addEventListener('click', Reset);