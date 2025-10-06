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
    let input: string = await rl.question(message);
    let number = Number(input);

    if (isNaN(number) || !Number.isInteger(number)) {
        console.log("ERROR: La opcion ingresada no es valida, debes ingresar un numero entero.");
        return getMenuNumber(message);
    } else {
        return number;
    }
}
//----------------------------------------//

//------------Listas de tareas------------//
async function listAllTasks(): Promise<void> {
    console.clear();
    if (tasks.length === 0) {
        console.log("\nNo tienes tareas registradas.\n");
        return;
    }

    console.log("\nEstas son todas tus tareas.\n");

    tasks.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. ${task.title}`);
    });

    let userInput: number = await getMenuNumber("\nIngresa el número de la tarea para ver detalles, o 0 para volver: ");
    if (userInput === 0) return;

    if (userInput >= 1 && userInput <= tasks.length) {
        const selectedTask: Task = tasks[userInput - 1]!;
        await showTaskDetails(selectedTask);
    } else {
        console.log("Opción inválida. Intenta de nuevo.");
        await listAllTasks();
    }
}
async function listPendingTasks(): Promise<void> {
    console.clear();
    const pendingTasks: Task[] = tasks.filter(task => task.status === "pendiente");

    if (pendingTasks.length === 0) {
        console.log("\nNo tienes tareas pendientes registradas.\n");
        return;
    }

    console.log("\nEstas son tus tareas pendientes.\n");

    pendingTasks.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. ${task.title}`);
    });

    let userInput: number = await getMenuNumber("\nIngresa el número de la tarea para ver detalles, o 0 para volver: ");
    if (userInput === 0) return;

    if (userInput >= 1 && userInput <= pendingTasks.length) {
        const selectedTask: Task = pendingTasks[userInput - 1]!;
        await showTaskDetails(selectedTask);
    } else {
        console.log("Opción inválida. Intenta de nuevo.");
        await listPendingTasks();
    }
}
async function listInProgressTasks(): Promise<void> {
    console.clear();
    const inProgressTasks = tasks.filter(task => task.status === "en progreso");

    if (inProgressTasks.length === 0) {
        console.log("\nNo tienes tareas en progreso registradas.\n");
        return;
    }

    console.log("\nEstas son tus tareas en progreso.\n");

    inProgressTasks.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. ${task.title}`);
    });

    let userInput: number = await getMenuNumber("\nIngresa el número de la tarea para ver detalles, o 0 para volver: ");
    if (userInput === 0) return;

    if (userInput >= 1 && userInput <= inProgressTasks.length) {
        const selectedTask: Task = inProgressTasks[userInput - 1]!;
        await showTaskDetails(selectedTask);
    } else {
        console.log("Opción inválida. Intenta de nuevo.");
        await listInProgressTasks();
    }
}
async function listCompletedTasks(): Promise<void> {
    console.clear();
    const completedTasks = tasks.filter(task => task.status === "completado");

    if (completedTasks.length === 0) {
        console.log("\nNo tienes tareas completadas registradas.\n");
        return;
    }

    console.log("\nEstas son tus tareas completadas.\n");

    completedTasks.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. ${task.title}`);
    });

    let userInput: number = await getMenuNumber("\nIngresa el número de la tarea para ver detalles, o 0 para volver: ");
    if (userInput === 0) return;

    if (userInput >= 1 && userInput <= completedTasks.length) {
        const selectedTask: Task = completedTasks[userInput - 1]!;
        await showTaskDetails(selectedTask);
    } else {
        console.log("Opción inválida. Intenta de nuevo.");
        await listCompletedTasks();
    }
}
//---------------------------------------//

async function showViewTasksMenu(): Promise<void> {
    let exit: boolean = false;
    do {
        console.clear();
        let tasksMenu: number = await getMenuNumber(`¿Qué tareas deseas ver?

[1] Todas
[2] Pendientes
[3] En curso
[4] Terminada
[0] Volver

Ingresa una opción: `);

        switch (tasksMenu) {
            case 1:
                await listAllTasks();
                break;
            case 2:
                await listPendingTasks();
                break;
            case 3:
                await listInProgressTasks();
                break;
            case 4:
                await listCompletedTasks();
                break;

            case 0:
                console.log("Volviendo al menú principal");
                exit = true;
                break;
            default:
                break;
        }
    } while (!exit);
}
async function showTaskDetails(selectedTask: Task): Promise<void> {
    let exit: boolean = false;

    do {
        console.clear();
        console.log(`
Título: ${selectedTask.title || "Sin título"}
Descripción: ${selectedTask.description || "Sin descripción"}
Estado: ${selectedTask.status || "Sin estado"}
Dificultad: ${selectedTask.difficulty || "Sin dificultad"}
Creada el: ${selectedTask.createdAt?.toLocaleString() || "Desconocida"}
Vencimiento: ${selectedTask.dueDate ? selectedTask.dueDate.toLocaleString() : "Sin fecha"}
Última edición: ${selectedTask.lastEdited ? selectedTask.lastEdited.toLocaleString() : "Nunca"}
        `);

        let option = await getStringInput("Presiona E para editar o 0 para volver: ");

        switch(option.toUpperCase()) {
            case "E":
                await editTask(selectedTask);
                console.log("¡Tarea editada!");
                break;
            case "0":
                exit = true;
                break;
            default:
                console.log("Opción inválida.");
                break;
        }
    } while (!exit);
}