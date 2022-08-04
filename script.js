// Operation functions
function add() {
    let initial = 0;
    for(i=0; i<arguments.length; i++) {
        initial += arguments[i];
    }
    return initial;
} 

function subtract() {
    let initial = arguments[0];
    for(i=1; i<arguments.length; i++) {
        initial -= arguments[i];
    }
    return initial;
} 

function multiply() {
    let initial = 1;
    for(i=0; i<arguments.length; i++) {
        initial *= arguments[i];
    }
    return initial;
}

function divide() {
    let initial = arguments[0];
    for(i=1; i<arguments.length; i++) {
        initial /= arguments[i];
    }
    return initial;
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

const digits = Array.from(document.querySelectorAll('#digits div'));
const operators = Array.from(document.querySelectorAll('#operators div'));
const equals = document.querySelector('#equals');

// Array for storing the current & next number & the operator
const myArray = ['', '', ''];
   

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        if(typeof(myArray[0]) != 'number') {
            myArray[0] += `${e.target.getAttribute('id')}`;
            console.log(myArray[0]);
        } else {
            myArray[2] += `${e.target.getAttribute('id')}`;
            console.log(myArray[2]);
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
            console.log('Both numbers exist');
            myArray[2] = +myArray[2];
            myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
            myArray[2] = '';
            myArray[1] = `${e.target.getAttribute('id')}`;
            console.log(e.target.getAttribute('id'));
        } else if((myArray[0]) && (!myArray[2])) {
            myArray[1] = `${e.target.getAttribute('id')}`;
            myArray[0] = +myArray[0];
            console.log(e.target.getAttribute('id'));
        }
    });
});

equals.addEventListener('click', () => {
    if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        console.log('Both numbers exist, this is equals');
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '';
    } else if((myArray[0]) && (!myArray[2])) {
        console.log(myArray[0]);
    }
});