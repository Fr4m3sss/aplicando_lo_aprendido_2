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

//----Funciones de edición de tareas----//

async function editTask(selectedTask: Task): Promise<void> {
    console.clear();
    console.log(`Estas editando la tarea: ${selectedTask.title}`);

    await editTitle(selectedTask);
    await editDescription(selectedTask);
    await editStatus(selectedTask);
    await editDifficulty(selectedTask);
    await editDueDate(selectedTask);

    selectedTask.lastEdited = new Date();
    console.log("¡Tarea guardada!");
}
async function editTitle(selectedTask: Task): Promise<void> {
    console.clear();
    const input: string = await getStringInput(
        "1. Ingresa un nuevo título (deja en blanco para mantenerlo, espacio para borrar): "
    );

    if (input === "") {
        // Mantener título actual
    } else if (input === " ") {
        selectedTask.title = "";
    } else {
        selectedTask.title = input;
    }
}
async function editDescription(selectedTask: Task): Promise<void> {
    console.clear();
    const input: string = await getStringInput(
        "2. Ingresa una nueva descripción (deja en blanco para mantenerla, espacio para borrar): "
    );

    if (input === "") {
        // Mantener descripción actual
    } else if (input === " ") {
        selectedTask.description = "";
    } else {
        selectedTask.description = input;
    }
}
async function editStatus(selectedTask: Task): Promise<void> {
    console.clear();
    const editStatus: string = (
        await getStringInput(
            `3. Ingresa un nuevo estado:
- pendiente
- en progreso
- completado`
        )
    ).toLowerCase();

    switch (editStatus) {
        case "":
            break; // Mantener estado
        case " ":
            selectedTask.status = "";
            break;
        case "pendiente":
        case "en progreso":
        case "completado":
            selectedTask.status = editStatus as Status;
            break;
        default:
            console.log("Has ingresado un estado inválido.");
    }
}
async function editDifficulty(selectedTask: Task): Promise<void> {
    console.clear();
    const editDifficulty: string = (
        await getStringInput(
            `4. Ingresa una nueva dificultad:
- facil
- medio
- dificil`
        )
    ).toLowerCase();

    switch (editDifficulty) {
        case "":
            break; // Mantener dificultad
        case " ":
            selectedTask.difficulty = "";
            break;
        case "facil":
        case "medio":
        case "dificil":
            selectedTask.difficulty = editDifficulty as Difficulty;
            break;
        default:
            console.log("Has ingresado una dificultad inválida.");
    }
}
async function editDueDate(selectedTask: Task): Promise<void> {
    const input: string = await getStringInput(
        `5. Ingresa nueva fecha de vencimiento (dd/mm/yyyy)
deja en blanco para mantenerla, o escribe un espacio para borrar: `
    );

    if (input === "") {
        return; // Mantener fecha actual
    } else if (input === " ") {
        selectedTask.dueDate = null;
        return;
    } else {
        const parts: string[] = input.split("/");
        if (parts.length === 3) {
            const day: number = parseInt(parts[0]!, 10);
            const month: number = parseInt(parts[1]!, 10) - 1;
            const year: number = parseInt(parts[2]!, 10);


            const newDate: Date = new Date(year, month, day);

            if (!isNaN(newDate.getTime())) {
                selectedTask.dueDate = newDate;
            } else {
                console.log("Fecha inválida. Debe ser un día válido.");
            }
        } else {
            console.log("Formato incorrecto. Usa dd/mm/yyyy.");
        }
    }
}
//---------------------------------------//


//-------Funcion para Buscar tareas--------//

async function searchTasksByTitle(searchTerm: string): Promise<Task[]> {
    return tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

async function showSearchTaskMenu(): Promise<void> {
    console.clear();
    const searchTerm: string = await getStringInput(
        "Ingresa el título o parte del título a buscar (o deja en blanco para volver): "
    );

    if (searchTerm === "") {
        // Si deja en blanco, volvemos al menú anterior
        return;
    }

    const results: Task[] = await searchTasksByTitle(searchTerm);

    if (results.length === 0) {
        console.log("\nNo se encontraron tareas que coincidan con tu búsqueda.\n");
        return;
    }

    console.log("\nTareas encontradas:\n");

    results.forEach((task: Task, index: number) => {
        console.log(`${index + 1}. ${task.title}`);
    });

    const userInput: number = await getMenuNumber(
        "\nIngresa el número de la tarea para ver detalles, o 0 para volver: "
    );

    if (userInput === 0) return;

    if (userInput >= 1 && userInput <= results.length) {
        const selectedTask: Task = results[userInput - 1]!;
        await showTaskDetails(selectedTask);
    } else {
        console.log("Opción inválida. Intenta de nuevo.");
        await showSearchTaskMenu();
    }
}
//---------------------------------------//
