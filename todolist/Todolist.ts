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
