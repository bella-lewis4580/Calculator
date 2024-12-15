class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }

    clear(){
        this.currentOperandValue = "";
        this.previousOperandValue = "";
        this.operation = undefined;
    };

    delete(){
        this.currentOperandValue = this.currentOperandValue.toString().slice(0, -1)
    };

    appendNumber(number){
        if(number === "." && this.currentOperandValue.includes('.')) return;
        this.currentOperandValue += number;
    };

    chooseOperation(operation){
        if(this.currentOperandValue === "") return;
        if(this.previousOperandValue !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperandValue = this.currentOperandValue;
        this.currentOperandValue = "";
    };

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperandValue);
        const current = parseFloat(this.currentOperandValue);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperandValue = computation.toString();
        this.operation = undefined;
        this.previousOperandValue = ""
    };

getDisplaynumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay
    if (isNaN(integerDigits)){
        integerDisplay = ""
    } 
    else{
        integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0})
    }
    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } 
    else {
        return integerDisplay;
    }
};

    updateDisplay(){
        this.currentOperand.innerText =
        this.getDisplaynumber(this.currentOperandValue);
        if (this.operation != null){
        this.previousOperand.innerText = 
        `${this.getDisplaynumber(this.previousOperandValue)} ${this.operation}`;
        }
        else{
            this.previousOperand.innerText = ""
        };
    };
};

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector("#equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector("#clear");
const previousOperand = document.querySelector(".previousOperand");
const currentOperand = document.querySelector(".currentOperand");

const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", ()  =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () =>{
    calculator.delete();
    calculator.updateDisplay();
})
