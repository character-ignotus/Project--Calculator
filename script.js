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

const one = document.querySelector('#one');
const two = document.querySelector('#two');
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const multi = document.querySelector('#multiply');
const div = document.querySelector('#divide');

// Array for storing the current & next number & the operator
const myArray = ['', '', ''];


one.addEventListener('click', () => {
    if(typeof(myArray[0]) != 'number') {
        myArray[0] += '1';
    } else {
        myArray[2] += '1';
    }
});

two.addEventListener('click', () => {
    if(typeof(myArray[0]) != 'number') {
        myArray[0] += '2';
    } else {
        myArray[2] += '2';
    }
});


plus.addEventListener('click', () => {
    if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '+';
    } else if((myArray[0]) && (!myArray[2])) {
        myArray[1] = '+';
        myArray[0] = +myArray[0];
    }
});
 
minus.addEventListener('click', () => {
    if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        console.log('Both numbers exist');
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '-';
    } else if((myArray[0]) && (!myArray[2])) {
        myArray[1] = '-';
        myArray[0] = +myArray[0];
    }
});
   
multi.addEventListener('click', () => {
    if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        console.log('Both numbers exist');
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '*';
    } else if((myArray[0]) && (!myArray[2])) {
        myArray[1] = '*';
        myArray[0] = +myArray[0];
    }
 });

 div.addEventListener('click', () => {
    if((myArray[0] || myArray[0] == '0') && (myArray[2])) {
        console.log('Both numbers exist');
        myArray[2] = +myArray[2];
        myArray[0] = operate(myArray[0], myArray[1], myArray[2]);
        myArray[2] = '';
        myArray[1] = '/';
    } else if((myArray[0]) && (!myArray[2])) {
        myArray[1] = '/';
        myArray[0] = +myArray[0];
    }
});
   



   