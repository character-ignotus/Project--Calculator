// Operation functions
function add() {
    let initial = 0;
    for(i=0; i<arguments.length; i++) {
        initial += arguments[i];
    }
    if(initial.toString().length > 8) {
        return initial.toExponential(4);
    } else {
        return Math.round(initial*10000000) / 10000000;
    }
} 

function subtract() {
    let initial = arguments[0];
    for(i=1; i<arguments.length; i++) {
        initial -= arguments[i];
    }
    if(initial.toString().length > 8) {
        return initial.toExponential(4);
    } else {
        return Math.round(initial*10000000) / 10000000;
    }
} 

function multiply() {
    let initial = 1;
    for(i=0; i<arguments.length; i++) {
        initial *= arguments[i];
    }
    if(initial.toString().length > 8) {
        return initial.toExponential(4);
    } else {
        return Math.round(initial*10000000) / 10000000;
    }
}

function divide() {
    let initial = arguments[0];
    for(i=1; i<arguments.length; i++) {
        initial /= arguments[i];
    }
    if(initial.toString().length > 8) {
        return initial.toExponential(4);
    } else {
        return Math.round(initial*10000000) / 10000000;
    }
}

function operate() {
    if(arguments[1] == '+') {
        return add(arguments[0], arguments[2]);
    } else if (arguments[1] == '-') {
        return subtract(arguments[0], arguments[2]);
    } else if(arguments[1] == '*') {
        return multiply(arguments[0], arguments[2]);
    } else if(arguments[1] == '/') {
        return divide(arguments[0], arguments[2]);
    }
}

const digits = Array.from(document.getElementsByClassName('digit'));
const operators = Array.from(document.getElementsByClassName('operator'));
const equals = document.querySelector('#equals');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clearBtn');
const backspaceBtn = document.querySelector('.backSpace');
const decimalBtn = document.querySelector('.decimalBtn');
const percentageBtn = document.querySelector('.percentage');
const symbolBtn = document.querySelector('.symbol');

display.textContent = '0';

// Array for storing the current & next number & the operator
const myArray = ['0', '', ''];
   
digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        if((`${e.target.getAttribute('id')}` == '0') && (myArray[0] == '0') && (!myArray[2])) {
            return;
        } else if(typeof(myArray[0]) != 'number' || !myArray[1]) {
            if(myArray[0] == '0' || (typeof(myArray[0]) == 'number') || (myArray[0].includes('e'))) { 
                myArray[0] = '';
            }
            if(myArray[0].toString().length > 8) {                         
                return;
            }
            myArray[0] += `${e.target.getAttribute('id')}`;
            console.log(myArray[0]);
            display.textContent = `${myArray[0]}`;
        } else {
            if(myArray[2] == '0') {
                myArray[2] = '';
            }
            if(myArray[2].toString().length > 8) {                        
                return;
            }
            myArray[2] += `${e.target.getAttribute('id')}`;
            console.log(myArray[2]);
            display.textContent = `${myArray[2]}`;
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(myArray[1] == '/' && (myArray[2] == '0')) {
            for(i=0; i<myArray.length; i++) {
                myArray[i] = '';
            }
            display.textContent = `Error`;
        } else if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
            console.log('Both numbers exist');
            myArray[2] = +myArray[2];
            myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
            myArray[2] = '';
            myArray[1] = `${e.target.getAttribute('id')}`;
            console.log(e.target.getAttribute('id'));
            display.textContent = `${myArray[0]}`;
        } else if((myArray[0] || myArray[0] == '0') && (!myArray[2])) {
            myArray[1] = `${e.target.getAttribute('id')}`;
            myArray[0] = +myArray[0];
            console.log(e.target.getAttribute('id'));
        }
    });
});

equals.addEventListener('click', () => {
    if(myArray[1] == '/' && (myArray[2] == '0')) {
        for(i=0; i<myArray.length; i++) {
            myArray[i] = '';
        }
        display.textContent = `Error`;
    } if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        console.log('Both numbers exist, this is equals');
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '';
        console.log(myArray);
        display.textContent = `${myArray[0]}`;
    } else if((myArray[0]) && (!myArray[2])) {
        display.textContent = `${myArray[0]}`;
        console.log(myArray[0]);
        console.log(myArray);
    }
});

clearBtn.addEventListener('click', () => {
    myArray[0] = '0';
    myArray[1] = '';
    myArray[2] = '';
    display.textContent = myArray[0];
    console.log(myArray);
});

backspaceBtn.addEventListener('click', () => {

    if((typeof(myArray[0]) == 'number' && myArray[1] && !myArray[2]) || myArray[0].toString().includes('e')) {
        return;
    }

    if(typeof(myArray[0]) != 'number') {
        myArray[0] = myArray[0].slice(0,-1);
        display.textContent = `${myArray[0]}`;
            if(!myArray[0]) {
                myArray[0] = '0';
                display.textContent = myArray[0];
            }
    } else if((typeof(myArray[0]) == 'number') && (!myArray[2])) {
        myArray[0] = myArray[0].toString().slice(0,-1);
        display.textContent = `${myArray[0]}`;
            if(!myArray[0]) {
                display.textContent = `0`;
                myArray[0] = '0';
            }
    } else {
        myArray[2] = myArray[2].slice(0,-1);
        display.textContent = `${myArray[2]}`;
    }
});

decimalBtn.addEventListener('click', () => {
    if(typeof(myArray[0]) != 'number' || !myArray[1]) {
        let string1 = myArray[0].toString();
        if(!string1.includes('.')) {
            myArray[0] += '.';
            display.textContent = myArray[0];
        } 
    } else if((myArray[0] || myArray[0] == '0') && myArray[1]) {
        if(!myArray[2].includes('.')) {
            console.log('does not');
            myArray[2] += '.';
            display.textContent = myArray[2];
        }
    }
});

percentageBtn.addEventListener('click', () => {
    if(myArray[0] && !myArray[2]) {
        myArray[0] = myArray[0] / 100;
        if(myArray[0].toString().length > 8) {
            myArray[0] = myArray[0].toExponential(4);
        } else {
            Math.round(myArray[0]*10000000) / 10000000;
        }
        display.textContent = myArray[0];
    } else {
        myArray[2] = myArray[2] / 100;
        if(myArray[2].toString().length > 8) {
            myArray[2] = myArray[0].toExponential(4);
        } else {
            Math.round(myArray[2]*10000000) / 10000000;
        }
        display.textContent = myArray[2];
    }
});

