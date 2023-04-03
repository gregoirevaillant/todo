const addTaskform = document.querySelector("#addTaskForm");
const addTaskButton = document.querySelector("#addTaskButton");
const addTaskModal = document.querySelector("#addTaskModal");
const editTaskModal = document.querySelector("#editTaskModal");
const tasksContainer = document.querySelector("#tasksContainer");
const taskCards = document.querySelectorAll(".taskCard");
let deleteButtons = document.querySelectorAll(".taskCardDeleteButton");
let editButtons = document.querySelectorAll(".taskCardEditButton");
const projectsContainer = document.querySelector("#projectsContainer");
const projectButtons = document.querySelectorAll(".projectButton");

addTaskButton.addEventListener("click", () => {
    addTaskModal.style.display = "flex";
});

addTaskform.addEventListener("submit", addTask);

function addTask(event) {
    const taskTitle = document.querySelector("#taskTitle").value;
    const taskDescription = document.querySelector("#taskDescription").value;
    const taskDueDate = document.querySelector("#taskDueDate").value;
    const taskPriority = document.querySelector("#taskPriority").value;
    const taskProject = document.querySelector("#taskProject").value;
    const taskId = Math.floor(Math.random() * 100000000);
    event.preventDefault();
    tasks.push(
        new Task(
            taskTitle,
            taskDescription,
            taskDueDate,
            taskPriority,
            taskProject,
            taskId
        )
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskModal.style.display = "none";
    displayTasks();
}

function displayTasks() {
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
                const editTaskDueDate =
                    document.querySelector("#editTaskDueDate");
                const editTaskPriority =
                    document.querySelector("#editTaskPriority");
                const editTaskProject =
                    document.querySelector("#editTaskProject");

                editTaskTitle.value = task.title;
                editTaskDescription.value = task.description;
                editTaskDueDate.value = task.date;
                editTaskPriority.value = task.priority;
                editTaskProject.value = task.project;

                editTaskModal.style.display = "flex";

                editTaskForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const newTitle = editTaskTitle.value;
                    const newDescription = editTaskDescription.value;
                    const newDueDate = editTaskDueDate.value;
                    const newPriority = editTaskPriority.value;
                    const newProject = editTaskProject.value;

                    tasks[taskIndex] = new Task(
                        newTitle,
                        newDescription,
                        newDueDate,
                        newPriority,
                        newProject,
                        id
                    );
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    displayTasks();
                    editTaskModal.style.display = "none";
                });
            });
        });
    });
}

function addProject(event) {
    event.preventDefault();
    const project = document.querySelector("#addProjectTitle").value;
    projects.push(new Project(project));
    localStorage.setItem("projects", JSON.stringify(projects));
    displayProjects();
    console.log(projects);
}

function displayProjects() {
    projectButtons.forEach((projectButton) => {
        projectButton.remove();
    });
    projects.forEach((project) => {
        const projectButton = document.createElement("button");
        projectButton.classList.add("projectButton");
        projectButton.innerHTML = `
            <span>${project.project}</span>

        `;
        if (projectsContainer) {
            projectsContainer.appendChild(projectButton);
        }
    });
}

const addProjectForm = document.querySelector("#addProjectForm");
addProjectForm.addEventListener("submit", addProject);

window.addEventListener("load", () => {
    const tasksFromLocalStorage = localStorage.getItem("tasks");
    const projectsFromLocalStorage = localStorage.getItem("projects");
    if (tasksFromLocalStorage) {
        tasks = JSON.parse(tasksFromLocalStorage);
        displayTasks();
    } else if (projectsFromLocalStorage) {
        projects = JSON.parse(projectsFromLocalStorage);
        displayProjects();
    }
});

window.addEventListener("click", (event) => {
    if (event.target == addTaskModal) {
        addTaskModal.style.display = "none";
    } else if (event.target == editTaskModal) {
        editTaskModal.style.display = "none";
    }
});

// STORE THE TASKS
let tasks = [];

// STORE THE PROJECTS
let projects = [];

// TASK CLASS
class Task {
    constructor(title, description, date, priority, project, id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project;
        this.id = id;
    }
}

// PROJECT CLASS
class Project {
    constructor(project) {
        this.project = project;
    }
}
