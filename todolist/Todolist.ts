const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


type Status = "pendiente" | "en progreso" | "completado" | "";
type Difficulty = "facil" | "medio" | "dificil" | "";

interface Task {
    title: string;
    description: string;
    status: Status;
    difficulty: Difficulty;
    createdAt: Date;
    dueDate: Date | null;
    lastEdited?: Date | null;
}

//----------Array global de tareas---------//

const tasks: Task[] = [
    {
        title: "Aprender Node.js",
        description: "Revisar documentación y practicar ejemplos",
        status: "pendiente",
        difficulty: "facil",
        createdAt: new Date(),
        dueDate: null
    },
    {
        title: "Aprender Java",
        description: "Revisar documentación y practicar ejemplos",
        status: "en progreso",
        difficulty: "medio",
        createdAt: new Date(),
        dueDate: null
    },
    {
        title: "Aprender Typescript",
        description: "Revisar documentación y practicar ejemplos",
        status: "completado",
        difficulty: "dificil",
        createdAt: new Date(),
        dueDate: null
    }
];


//-----Funciones de entrada de datos------//
async function getStringInput(message: string): Promise<string> {
    let input: string;
    const MAX_LENGTH = 500;

    while (true) {
        input = await rl.question(message);
        input = input.trim();

        if (input === "") {
            console.log("ERROR: No puedes dejarlo vacío.");
        } else if (input.length > MAX_LENGTH) {
            console.log("ERROR: La entrada es demasiado larga.");
        }
        else {
            return input;
        }
    }
}
async function getMenuNumber(message: string): Promise<number> {
    let input = await rl.question(message);
    let number = Number(input);

    if (isNaN(number) || !Number.isInteger(number)) {
        console.log("ERROR: La opcion ingresada no es valida, debes ingresar un numero entero.");
        return getMenuNumber(message);
    } else {
        return number;
    }
}
//----------------------------------------//