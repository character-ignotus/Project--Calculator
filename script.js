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


 

   

   



   