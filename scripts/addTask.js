
function openAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.remove('d-none');
}


function closeAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.add('d-none');
}


function clearAddTaskInBoard() {
    document.getElementById('titleAddTaskInBoard').value = '';
    document.getElementById('descriptionAddTaskInBoard').value = '';
    document.getElementById('assignedToAddTaskInBoard').value = 'selectContact';
    document.getElementById('dueDateAddTaskInBoard').value = '';

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    changePrioToMedium();

    document.getElementById('categoryAddTaskInBoard').value = 'selectCategory';
    document.getElementById('subtasksAddTaskInBoard').value = '';
}


function changePrioToUrgent(event) {

    event.stopPropagation();

    document.getElementById('img-urgent').classList.add('d-none');
    document.getElementById('img-urgent-white').classList.remove('d-none');
    document.getElementById('img-medium').classList.remove('d-none');
    document.getElementById('img-medium-white').classList.add('d-none');
    document.getElementById('img-low').classList.remove('d-none');
    document.getElementById('img-low-white').classList.add('d-none');

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.add('urgent');

    let urgent = document.getElementById('button-value').innerHTML = 'urgent';
    console.log(urgent);
}


function changePrioToMedium(event) {

    event.stopPropagation();

    document.getElementById('img-urgent').classList.remove('d-none');
    document.getElementById('img-urgent-white').classList.add('d-none');
    document.getElementById('img-medium').classList.add('d-none');
    document.getElementById('img-medium-white').classList.remove('d-none');
    document.getElementById('img-low').classList.remove('d-none');
    document.getElementById('img-low-white').classList.add('d-none');

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.add('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    let medium = document.getElementById('button-value').innerHTML = 'medium';
    console.log(medium);
}


function changePrioToLow(event) {

    event.stopPropagation();

    document.getElementById('img-urgent').classList.remove('d-none');
    document.getElementById('img-urgent-white').classList.add('d-none');
    document.getElementById('img-medium').classList.remove('d-none');
    document.getElementById('img-medium-white').classList.add('d-none');
    document.getElementById('img-low').classList.add('d-none');
    document.getElementById('img-low-white').classList.remove('d-none');

    document.getElementById('button-low').classList.add('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    let low = document.getElementById('button-value').innerHTML = 'low';
    console.log(low);
}


function changeToSubtaskInputInBoard(){
    document.getElementById('buttonAddSubtaskInBoard').classList.add('d-none');
    document.getElementById('inputAddSubtaskInBoard').classList.remove('d-none');
}


function addSubtaskInBoard(){
var input = document.getElementById('inputAddSubtaskInBoard');
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

let subtasklist = document.getElementById('subtasksAddTaskInBoard');
let newsubtask = document.getElementById('inputAddSubtaskInBoard').value;

subtasklist.innerHTML += /*html*/`
    <ul>${newsubtask}</ul>
`
}


function createTaskInBoard() {
    let newTitle = document.getElementById('titleAddTaskInBoard').value;
    let newDescription = document.getElementById('descriptionAddTaskInBoard').value;
    let newAssignedTo = document.getElementById('assignedToAddTaskInBoard').value;
    let newDueDate = document.getElementById('dueDateAddTaskInBoard').value;
    let newCategory = document.getElementById('categoryAddTaskInBoard').value;
    let newSubtask = document.getElementById('subtasksAddTaskInBoard').value;
    let newPrio = document.getElementById('button-value').value;

    console.log(newTitle, newDescription, newAssignedTo, newDueDate, newCategory, newSubtask);

    tasks.push({
        'titel': newTitle,
        'description': newDescription,
        'assigned': [newAssignedTo],
        'dueDate': newDueDate,
        'position': 'ToDo',
        'prio': newPrio,
        'category': newCategory,
        'position': 'ToDo',
        'subtasks': [newSubtask]
    });
    if (tasks[(tasks.length - 1)].subtasks[0] == '') { tasks[(tasks.length - 1)].subtasks = ''; }

    setItem('tasks', tasks);
    closeAddTaskInBoard();
    initBoard();
}


function deleteTask(i) {
    tasks.splice(i, 1);
    setItem('tasks', tasks);
    closeTaskDetails();
    initBoard();
}


function editTask(i) {
    tasks = getItem('tasks');
    let title = tasks[i]['titel'];
    let description = tasks[i]['description'];
    let dueDate = tasks[i]['dueDate'];
    let prio = tasks[i]['prio'];
    let assignedTo = [];
    assignedTo.push(tasks[i]['assigned']);
    let subtasks = [];
    subtasks.push(tasks[i]['subtasks']);

    let details = document.getElementById('taskDetailsBox');
    details.classList.remove('d-none');
    details.innerHTML = '';
    details.innerHTML = templateEditTask();

    setOldValuesToEditTask(tasks, i, title, description, dueDate, prio, assignedTo, subtasks);
}


function templateEditTask() {
    return /*html*/`
    <div class="widthTaskDetails"> 
        <div class="title">
            <p>Title</p>
            <input id="editTitle" type="text">
        </div>
        <div class="description">
            <p>description</p>
            <textarea name="editDescription" id="editDescription" cols="30" rows="10"></textarea>
        </div>
        <div class="dueDate">
            <label for="editDueDate">Due date<mark>*</mark></label>
            <input type="date" id="editDueDate" name="editDueDate" required>
            <!-- Placeholder noch formatieren!!-->
        </div>
        <div class="prio">
           <p>Prio</p>
           <div class="prio-button">
                <button id="edit-button-urgent" onclick="changePrioToUrgent(event)">Urgent <img
                        id="edit-img-urgent" src="./img/urgent.png" alt=""> <img id="edit-img-urgent-white"
                        class="d-none" src="./img/urgent_white.png" alt=""> </button>
                <button id="edit-button-medium" class="medium" onclick="changePrioToMedium(event)">Medium <img
                        id="edit-img-medium" class="d-none" src="./img/medium.png" alt=""> <img
                        id="edit-img-medium-white" src="./img/medium_white.png" alt=""> </button>
                <button id="edit-button-low" onclick="changePrioToLow(event)">Low <img id="edit-img-low"
                        src="./img/low.png" alt=""> <img id="edit-img-low-white" class="d-none"
                        src="./img/low_white.png" alt=""> </button>
                <p id="edit-button-value" class="d-none">medium</p>
            </div>
        </div>
        <div class="assignedTo">
            <label for="ediAassignedTo">Assigned to</label>
            <select id="editAssignedTo" name="assignedTo">
                <option selected disabled hidden value="selectContact">Select contacts to assign</option>
                <option value="person2">Person2</option>
                <option value="person3">Person3</option>
            </select>
        </div>
        <div class="subtasks">
            <p>Subtasks</p>
            <input type="text" name="subtasks" id="editsubtasks"
                placeholder="Add new subtask">
            <div id="showSubtasksInEdit"></div>
            </div>
    </div>
    `
}


function setOldValuesToEditTask(tasks, i, title, description, dueDate, prio, assignedTo, subtasks){
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;
    document.getElementById('editDueDate').value = dueDate;

    // if else für prio button in edit
    
    // assignedTo Möglichkeiten von Jean einspielen, außer die, die bereits gewählt sind
    // asignedTo anzeigen

    for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
        let subtask = tasks[i]['subtasks'][j];
        document.getElementById('showSubtasksInEdit').innerHTML += /*html*/`
            <ul>${subtask}</ul>
        `
    }
}