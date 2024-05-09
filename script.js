//Access the dom
const inputBox = document.getElementById("input")
const expressionDiv = document.getElementById("expression")
const resultDiv = document.getElementById("result")

//Define the expression and result variable

let expression = ""
let result = ""

//Define the event handler
function buttonClick(e){
    const target = e.target;
    const action = target.dataset.action
    const value = target.dataset.value
    //console.log(value);

    //Switch case to control the calculator
    switch (action){
        case 'number':
            addValue(value);
            break
        case 'clear':
            clear();
            break
        case 'backspace':
            backspace();
            break
        //Add the results to expression as a starting point if expresion is empty
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(
                expression === '' && result !== ''){
                startFromResult(value)
            }else if(expression !== '' && !isLastCharOperator()){
                addValue(value)
            }
            break
        case 'submit':
            submit()
            break
        case 'negate':
            negate()
            break
        case 'mod':
            percentage()
            break
        case 'decimal':
            decimal(value)
            break
    }

    //update display
    updateDisplay(expression, result)
}
inputBox.addEventListener("click", buttonClick)

function addValue (value) {
    if(value === '.'){
        //Finding the index of the last operator in the expression
    const lastOperatorIndex = expression.search(/[+\-*/]/)
    //Finding the index of the last decimal in the expression
    const lastDecimalIndex = expression.lastIndexOf('.')
    //Finding the index of the last number in the expression
    const lastNumberIndex = Math.max(
        expression.lastIndexOf('*'),
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('/')
    );
    //Check if this is the first decimal or the expression is empty
    if(lastDecimalIndex < lastOperatorIndex || lastDecimalIndex < lastNumberIndex || lastDecimalIndex === -1 && (expression === '' || expression.slice(lastNumberIndex + 1)).indexOf('-') === -1){
        expression += value
    }
    }else{
        expression += value
    }
}

function updateDisplay (expression, result) {
    expressionDiv.textContent = expression
    resultDiv.textContent = result
}

function clear (){
    expression = ""
    result = ""
}

function backspace () {
    expression = expression.slice(0, -1)
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)))
}

function startFromResult () {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression () {
    const evalResult = eval(expression)
    return isNaN(evalResult) || !isFinite(evalResult) ? ' ' : evalResult < 1 ? parseFloat(evalResult.toFixed(10)) : parseFloat(evalResult.toFixed(2))
}

function negate(){
    //Negate the result if the expression is empty and the result is present
    if(expression === '' && result !== ''){
        result = -result;
        //Toggle the sign of the expression if it is not already negative and it is not empty
    }else if(!expression.startsWith('-') && expression !== ''){
        expression = '-' + expression

        //Remove the negative sign from the expression if it already negative
    }else if(expression.startsWith('-')){
        expression = expression.slice(1)
    }
}

function percentage(){
    //evaluate the expression, else it will take the expression of the first number
    if(expression !== ''){
        result = evaluateExpression()
        expression = ''
        if(!isNaN(result) && isFinite(result)){
            result /= 100;
        }else{
            result = '';
        }
    }else if( result !== ''){
        result = parseFloat(result) / 100
    }
}

function decimal(value) {
    if(!expression.endsWith('.') && !isNaN(expression.slice(-1))){
        addValue(value)
    }
}

