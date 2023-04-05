// SELECT THE INTERACTIVE ELEMENTS
const addTaskform = document.querySelector("#addTaskForm");
const addTaskButton = document.querySelector("#addTaskButton");

// SELECT THE MODAL ELEMENTS
const addTaskModal = document.querySelector("#addTaskModal");

// ADD EVENT LISTENERS
addTaskButton.addEventListener("click", () => {
    addTaskModal.style.display = "flex";
});

addTaskform.addEventListener("submit", addTask);

function addTask(event) {
    event.preventDefault();
    const title = document.querySelector("#taskTitle").value;
    const description = document.querySelector("#taskDescription").value;
    const id = Math.floor(Math.random() * 100000000);
    tasks.push(new Task(title, description, id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskModal.style.display = "none";
    displayTasks();
}

function displayTasks() {
    const tasksContainer = document.querySelector("#tasksContainer");
    const taskCards = document.querySelectorAll(".taskCard");
    taskCards.forEach((taskCard) => {
        taskCard.remove();
    });
    tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("taskCard");
        taskCard.innerHTML = `
        <div class="taskCardTitle">
        <h3>${task.title}</h3>
    </div>
    <div class="taskCardDescription">
        <p>${task.description}</p>
    </div>
    <div class="taskCardDueDate">
        <p><b>Due Date:</b> ${task.date}</p>
    </div>
    <div class="taskCardPriority">
        <p><b>Priority:</b> ${task.priority}</p>
    </div>
    <div class="taskCardProject">
        <p><b>Project:</b> ${task.project}</p>
    </div>
    <div class="taskCardActions">
        <button class="taskCardEditButton" id="${task.id}">Edit</button>
            <button class="taskCardDeleteButton" id="${task.id}" >Delete</button>
    </div>      
        `;
        if (tasksContainer) {
            tasksContainer.appendChild(taskCard);
        }
        // DELETE THE TASKS
        let deleteButtons = document.querySelectorAll(".taskCardDeleteButton");
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener("click", (event) => {
                const id = event.target.id;
                tasks.forEach((task, index) => {
                    if (task.id == id) {
                        tasks.splice(index, 1);
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                        displayTasks();
                    }
                });
            });
        });
        // EDIT THE TASKS
        let editButtons = document.querySelectorAll(".taskCardEditButton");
        editButtons.forEach((editButton) => {
            editButton.addEventListener("click", (event) => {
                const id = event.target.id;
                const taskIndex = tasks.findIndex((task) => task.id == id);
                const task = tasks[taskIndex];
                const editTaskForm = document.querySelector("#editTaskForm");
                const editTaskTitle = document.querySelector("#editTaskTitle");
                const editTaskDescription = document.querySelector(
                    "#editTaskDescription"
                );

                editTaskTitle.value = task.title;
                editTaskDescription.value = task.description;

                const editTaskModal = document.querySelector("#editTaskModal");
                editTaskModal.style.display = "flex";

                editTaskForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const newTitle = editTaskTitle.value;
                    const newDescription = editTaskDescription.value;
                    tasks[taskIndex] = new Task(newTitle, newDescription, id);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    displayTasks();
                    editTaskModal.style.display = "none";
                });

                const editTaskModalCloseButton =
                    document.querySelector(".close");
                editTaskModalCloseButton.addEventListener("click", () => {
                    editTaskModal.style.display = "none";
                });
            });
        });
    });
}

// RETRIEVE THE STORED TASKS
let tasks = [];

// LOAD THE TASKS FROM LOCAL STORAGE ON PAGE LOAD
window.addEventListener("load", () => {
    const tasksFromLocalStorage = localStorage.getItem("tasks");
    if (tasksFromLocalStorage) {
        tasks = JSON.parse(tasksFromLocalStorage);
        displayTasks();
    }
});

// CREATE A TASK CLASS
class Task {
    constructor(title, description, id) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}
