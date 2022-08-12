// Operation functions
function add() {
    let initial = 0;
    for(i=0; i<arguments.length; i++) {
        initial += arguments[i];
    }
    if(initial.toString().length > 10) {
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
    if(initial.toString().length > 10) {
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
    if(initial.toString().length > 10) {
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
    if(initial.toString().length > 10) {
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
const display = document.querySelector('#display');
const clearBtn = document.querySelector('#clearBtn');
const backspaceBtn = document.querySelector('#backSpace');
const decimalBtn = document.querySelector('#decimalBtn');
const percentageBtn = document.querySelector('#percentage');
const symbolBtn = document.querySelector('#symbol');
const buttons = Array.from(document.getElementsByClassName('btn'));

const upperDisplay = document.querySelector('#upper-display');
const lowerDisplay = document.querySelector('#lower-display');

lowerDisplay.textContent = '0';

// Array for storing the current & next number & the operator
const myArray = ['0', '', ''];
   
digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        if((`${e.target.getAttribute('id')}` == '0') && (myArray[0] == '0') && (!myArray[2])) {
            return;
        } else if(typeof(myArray[0]) != 'number' || !myArray[1]) {
            if(myArray[0] == '0' || (typeof(myArray[0]) == 'number') || (myArray[0].includes('e')) || myArray[0] == '-0') { 
                myArray[0] = '';
            }
            if(myArray[0].toString().length > 11) {                         
                return;
            }
            myArray[0] += `${e.target.getAttribute('id')}`;
            lowerDisplay.textContent = `${myArray[0]}`;
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        } else {
            if(myArray[2] == '0' || myArray[2] == '-0') {
                myArray[2] = '';
            }
            if(myArray[2].toString().length > 11) {                        
                return;
            }
            myArray[2] += `${e.target.getAttribute('id')}`;
            lowerDisplay.textContent = `${myArray[2]}`;
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(myArray[1] == '/' && (myArray[2] == '0')) {
            for(i=0; i<myArray.length; i++) {
                myArray[i] = '';
            }
            lowerDisplay.textContent = `Error`;
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        } else if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
            myArray[2] = +myArray[2];
            myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
            myArray[2] = '';
            myArray[1] = `${e.target.getAttribute('id')}`;
            lowerDisplay.textContent = `${myArray[0]}`;
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        } else if((myArray[0] || myArray[0] == '0') && (!myArray[2])) {
            myArray[1] = `${e.target.getAttribute('id')}`;
            myArray[0] = +myArray[0];
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        }
    });
});

equals.addEventListener('click', () => {
    if(myArray[1] == '/' && (myArray[2] == '0')) {
        for(i=0; i<myArray.length; i++) {
            myArray[i] = '';
        }
        lowerDisplay.textContent = `Error`;
    } if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '';
        lowerDisplay.textContent = `${myArray[0]}`;
    } else if((myArray[0]) && (!myArray[2])) {
        lowerDisplay.textContent = `${myArray[0]}`;
    }
});

clearBtn.addEventListener('click', () => {
    myArray[0] = '0';
    myArray[1] = '';
    myArray[2] = '';
    lowerDisplay.textContent = myArray[0];
    upperDisplay.textContent = '';
});

backspaceBtn.addEventListener('click', () => {

    if((typeof(myArray[0]) == 'number' && myArray[1] && !myArray[2]) || myArray[0].toString().includes('e')) {
        return;
    }

    if(typeof(myArray[0]) != 'number') {
        myArray[0] = myArray[0].slice(0,-1);
        lowerDisplay.textContent = `${myArray[0]}`;
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
            if(!myArray[0]) {
                myArray[0] = '0';
                lowerDisplay.textContent = myArray[0];
                upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
            }
    } else if((typeof(myArray[0]) == 'number') && (!myArray[2])) {
        myArray[0] = myArray[0].toString().slice(0,-1);
        lowerDisplay.textContent = `${myArray[0]}`;
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
            if(!myArray[0]) {
                lowerDisplay.textContent = `0`;
                upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
                myArray[0] = '0';
            }
    } else {
        myArray[2] = myArray[2].slice(0,-1);
        lowerDisplay.textContent = `${myArray[2]}`;
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
    }
});

decimalBtn.addEventListener('click', () => {
    if(typeof(myArray[0]) != 'number' || !myArray[1]) {
        let string1 = myArray[0].toString();
        if(!string1.includes('.')) {
            myArray[0] += '.';
            lowerDisplay.textContent = myArray[0];
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        } 
    } else if((myArray[0] || myArray[0] == '0') && myArray[1]) {
        if(!myArray[2].includes('.')) {
            myArray[2] += '.';
            lowerDisplay.textContent = myArray[2];
            upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
        }
    }
});

percentageBtn.addEventListener('click', () => {
    if(myArray[0] && !myArray[2]) {
        myArray[0] = myArray[0] / 100;
        if(myArray[0].toString().length > 8) {
            myArray[0] = myArray[0].toExponential(6);
        } else {
            Math.round(myArray[0]*10000000) / 10000000;
        }
        lowerDisplay.textContent = myArray[0];
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
    } else {
        myArray[2] = myArray[2] / 100;
        if(myArray[2].toString().length > 8) {
            myArray[2] = myArray[0].toExponential(6);
        } else {
            Math.round(myArray[2]*10000000) / 10000000;
        }
        lowerDisplay.textContent = myArray[2];
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
    }
});

symbolBtn.addEventListener('click', () => {
    if(myArray[0] && !myArray[1] && !myArray[2] ) {
        if(!(myArray[0].toString().includes('-'))) {
            myArray[0] =  '-' + myArray[0].toString();
        } else {
            myArray[0] = myArray[0].toString().replace("-", "");
        }
        lowerDisplay.textContent = myArray[0];
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
    } else if(myArray[0] && myArray[1] && myArray[2]) {
        if(!(myArray[2].includes('-'))) {
            myArray[2] =  '-' + myArray[2];
        } else {
            myArray[2] = myArray[2].replace("-", "");
        }
        lowerDisplay.textContent = myArray[2];
        upperDisplay.textContent = `${myArray[0]+myArray[1]+myArray[2]}`;
    }
});

buttons.forEach(digit => {
    digit.addEventListener('mousedown', () => {
        digit.classList.remove('btn');
        digit.classList.add('btnAfter');
    });
});

buttons.forEach(digit => {
    digit.addEventListener('mouseup', () => {
        digit.classList.remove('btnAfter');
        digit.classList.add('btn');
    });
});