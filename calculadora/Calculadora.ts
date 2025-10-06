const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function runCalculator(){
    
    let number1: number = await getNumber("\nEnter a number: ");
    let number2: number = await getNumber("Enter another number: ");
    let operation: string = await getOperator("Enter an operator (+, -, *, /): ");

let result: number = await calculate(number1, number2, operation);
console.log("Result: " + result);
}

async function getNumber(message: string): Promise<number> {
    let input = await rl.question(message);
    let number = Number(input);

    if (isNaN(number)) {
        console.log("ERROR: that's not a valid number.");
        return getNumber(message);
    } else {
        return number;
    }
}
async function getOperator(message: string): Promise<string> {
    let input = await rl.question(message);
    const operationList = ["+", "-", "*", "/"];
    if (!operationList.includes(input)) {
        console.log("ERROR: that's not a valid operation.");
        return getOperator(message);
    }
    else{
        return input;
    }
}

async function calculate(number1: number, number2: number, operation: string): Promise<number> {
    switch (operation) {
        case "+":
            return number1 + number2;

        case "-":
            return number1 - number2;

        case "*":
            return number1 * number2;

        case "/":
            if (number2 === 0) {
                throw new Error("ERROR: division by zero.");
            }
            return number1 / number2;

        default:
            throw new Error("Operator not recognized.");
    }
}

/*------------------*/
/*FUNCION PRINCIPAL*/
/*-----------------*/
async function main() {
    let keepRunning: boolean = true;

    do {
        await runCalculator();

        let again: string = await rl.question("Do you want to calculate again? (y/n): ");
        if (again.toLowerCase() !== "y") keepRunning = false;

    } while (keepRunning)

    rl.close(); // finalizar el programa
}

main();

/*----------------------------------------------------------------*/