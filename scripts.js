const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    //console.log(number);
    //If display value is 0, replace it.
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
//{if (calculatorDisplay.textContent === '0'){calculatorDisplay.textContent = number;}else{calculatorDisplay.textContent = calculatorDisplay.textContent + number}}

console.log(inputBtns);

// Run on 'decimal' click
function addDecimal() {
    //If no decimal, add one
    //const displayValue = calculatorDisplay.textContent;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
        //calculatorDisplay.textContent = calculatorDisplay.textContent + '.';
    }
}

// Run on 'operator' click
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    }
    // Ready for next
    operatorValue = operator;
    console.log('firstValue', firstValue);
    console.log('operatorValue', operatorValue);
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

// Run on 'clear' click - Reset all values, display
function Reset() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//Event Listner
clearBtn.addEventListener('click', Reset);