window.addEventListener('keydown', (e) => {
        const digit = document.querySelector(`div[data-key="${e.key}"]`);
        if(!digit) return;
        if((digit.textContent == '0') && (myArray[0] == '0') && (!myArray[2])) {
            return;
        } else if(typeof(myArray[0]) != 'number' || !myArray[1]) {
            if(myArray[0] == '0' || (typeof(myArray[0]) == 'number') || (myArray[0].includes('e'))) { 
                myArray[0] = '';
            }
            if(myArray[0].toString().length > 8) {                         
                return;
            }
            myArray[0] += digit.textContent;
            console.log(myArray[0]);
            display.textContent = `${myArray[0]}`;
        } else {
            if(myArray[2] == '0' || myArray[2] == '-0') {
                myArray[2] = '';
            }
            if(myArray[2].toString().length > 8) {                        
                return;
            }
            myArray[2] += digit.textContent;
            console.log(myArray[2]);
            display.textContent = `${myArray[2]}`;
        }
});

window.addEventListener('keydown', (e) => {
    const operator = document.querySelector(`div[data-operator="${e.key}"]`);
    if(!operator) return;
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
        myArray[1] = operator.textContent;
        console.log(operator.textContent);
        display.textContent = `${myArray[0]}`;
    } else if((myArray[0] || myArray[0] == '0') && (!myArray[2])) {
        myArray[1] = operator.textContent;
        myArray[0] = +myArray[0];
        console.log(operator.textContent);
    }
});

window.addEventListener('keydown', (e) => {
    const equals = document.querySelector(`div[data-equals="${e.key}"]`);
    if(!equals) return;
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

window.addEventListener('keydown', (e) => {
    const equals = document.querySelector(`div[data-enter="${e.key}"]`);
    if(!equals) return;
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

window.addEventListener('keydown', (e) => {
    const allClear = document.querySelector(`div[data-allClear="${e.key}"]`);
    if(!allClear) return;
    myArray[0] = '0';
    myArray[1] = '';
    myArray[2] = '';
    display.textContent = myArray[0];
    console.log(myArray);
});

window.addEventListener('keydown', (e) => {
    const backspace = document.querySelector(`div[data-clear="${e.key}"]`);
    if(!backspace) return;

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

window.addEventListener('keydown', (e) => {
    const decimal = document.querySelector(`div[data-decimal="${e.key}"]`);
    if(!decimal) return;
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

window.addEventListener('keydown', (e) => {
    const percentage = document.querySelector(`div[data-percentage="${e.key}"]`);
    if(!percentage) return;
    if(myArray[0] && !myArray[2]) {
        myArray[0] = myArray[0] / 100;
        if(myArray[0].toString().length > 8) {
            myArray[0] = myArray[0].toExponential(3);
        } else {
            Math.round(myArray[0]*10000000) / 10000000;
        }
        display.textContent = myArray[0];
    } else {
        myArray[2] = myArray[2] / 100;
        if(myArray[2].toString().length > 8) {
            myArray[2] = myArray[0].toExponential(3);
        } else {
            Math.round(myArray[2]*10000000) / 10000000;
        }
        display.textContent = myArray[2];
    }
});

window.addEventListener('keydown', (e) => {
    const symbol = document.querySelector(`div[data-symbol="${e.key}"]`);
    if(!symbol) return;
    if(myArray[0] && !myArray[1] && !myArray[2] ) {
        if(!(myArray[0].toString().includes('-'))) {
            myArray[0] =  '-' + myArray[0].toString();
        } else {
            myArray[0] = myArray[0].toString().replace("-", "");
        }
        display.textContent = myArray[0];
    } else if(myArray[0] && myArray[1] && myArray[2]) {
        if(!(myArray[2].includes('-'))) {
            myArray[2] =  '-' + myArray[2];
        } else {
            myArray[2] = myArray[2].replace("-", "");
        }
        display.textContent = myArray[2];
    }
});