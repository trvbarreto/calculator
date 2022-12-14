// DOM Variables
const numberBtns = document.querySelector('.numbers').childNodes;
const operatorBtns = document.querySelector('.operators').childNodes;
const topDisplay = document.querySelector('.topDisplay');
const bottomDisplay = document.querySelector('.bottomDisplay');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

// Program Variables
let displayNumber = 0;
let firstNumber;
let operator;

// Operations Functions
function add(num1, num2) {
    return parseFloat((num1 + num2).toFixed(2));
};

function subtract(num1, num2) {
    return parseFloat((num1 - num2).toFixed(2));
};

function multiply(num1, num2) {
    return parseFloat((num1 * num2).toFixed(2));
}

function divide(num1, num2) {
    if (num2 == 0) {
        return 'Division by zero.'
    } else {
        return parseFloat((num1 / num2).toFixed(2));
    }    
}

function operate(operator, num1, num2) {

    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    
        default:
            break;
    }
}

// Buttons actions
for (const button of numberBtns) {
    button.addEventListener('click', () => {
        if (button.innerText == '.') {
            let bottomStr = bottomDisplay.innerText;
            if (!bottomStr.includes('.')) {
                bottomDisplay.innerText += button.innerText;
                displayNumber = parseFloat(bottomDisplay.innerText);
            }
        } else {
            bottomDisplay.innerText += button.innerText;
            displayNumber = parseFloat(bottomDisplay.innerText);
        }
        
    })
};

for (const button of operatorBtns) {
    button.addEventListener('click', () => {
        if (firstNumber === undefined) {
            firstNumber = displayNumber;
            operator = button.innerText;
            displayNumber = 0;

            topDisplay.innerText = `${firstNumber} ${operator}`;
            bottomDisplay.innerText = '';
        } else {
            let result = operate(operator, firstNumber, displayNumber);

            firstNumber = result;
            
            displayNumber = 0;
            operator = button.innerText;

            if (typeof(firstNumber) == 'string') {
                topDisplay.innerText = `${firstNumber}`;
                firstNumber = undefined;
                displayNumber = 0;
            } else {
                topDisplay.innerText = `${firstNumber} ${operator}`;            
            }

            bottomDisplay.innerText = '';
        }
    })
};

equalsButton.addEventListener('click', () => {
    if (firstNumber !== undefined) {
        let result = operate(operator, firstNumber, displayNumber);
        bottomDisplay.innerText = result;
        displayNumber = result;
        firstNumber = undefined;
        topDisplay.innerText = '';
    };
});

clearButton.addEventListener('click', () => {
    displayNumber = 0;
    firstNumber = undefined;
    operator = undefined;

    bottomDisplay.innerText = '';
    topDisplay.innerText = '';
});

backspaceButton.addEventListener('click', () => {
    if (displayNumber !== undefined) {
        let numStr = displayNumber.toString();

        if (numStr.length === 1) {
            displayNumber = 0;
            bottomDisplay.innerText = '';
        } else {        
            numStr = numStr.split('');
            numStr.pop();
            numStr = numStr.join('');
            displayNumber = parseFloat(numStr);
            bottomDisplay.innerText = displayNumber;
        } 
    }             
});

/* EXTRA
    [X] ADICIONAR BOTAO PONTO FLUTUANTE
        [X] CASO J?? HOUVE UM PONTO FLUTUANTE NO NUMERO DO DISPLAY, DESABILITAR O BOT??O

    [X] MELHORAR ESTILOS

    [X] ADICIONAR BOTAO DE LIMPAR O ??LTIMO CARACTER DO N??MERO ATUAL DO DISPLAY

    ADICIONAR SUPORTE PARA TECLADO
*/