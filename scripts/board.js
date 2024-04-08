let tasks = [];
let foundTasks = [];
let categoryColors = ['#0038FF', '#1FD7C1']
let draggedTask;
let currentSubtaskDone;
let currentSubtaskProgress;
let process;
let categoryColor;
let currentSubtasks;
let prio;

async function initBoard() {
    await loadUsers();
    await loadTasksFromServer();
    fillBoardWithTasks();
    await loadLoginUser();
    renderLoginUserName('Board');
}

// Load and update the current user-list from server
async function loadTasksFromServer() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.info('No tasks found.');
    }
}

// Clears and fills the board with the tasks from server, after saving the current tasks on server
async function fillBoardWithTasks() {
    clearBoard();
    setItem('tasks', tasks);
    for (let i = 0; i < tasks.length; i++) {
        getTasksInformation(i);
        let topicChange = topicChanger(process, i);
        document.getElementById(`content${process}`).innerHTML += templateTasksInBoard(i, categoryColor, currentSubtasks, prio, topicChange);
        fillAssignedStaff(i);
        if (tasks[i].subtasks.length == 0) { document.getElementById(`taskProgress${i}`).classList.add('d-none'); }
    }
    checkForEmptyColums()
}

function topicChanger(process, i) {
    if (process == 'ToDo') { return `<div onclick="startDragging(${i}), moveTaskTo('InProgress')" class="arrowGreen">&#x2BB7;</div>`; }
    if (process == 'InProgress') { return `<div onclick="startDragging(${i}), moveTaskTo('ToDo')" class="arrowRed">&#x2BB4;     </div><div onclick="startDragging(${i}), moveTaskTo('AwaitFeedback')" class="arrowGreen">&#x2BB7;</div>`; }
    if (process == 'AwaitFeedback') { return `<div onclick="startDragging(${i}), moveTaskTo('InProgress')" class="arrowRed">&#x2BB4;     </div><div onclick="startDragging(${i}), moveTaskTo('Done')" class="arrowGreen">&#x2BB7;</div>`; }
    if (process == 'Done') { return `<div onclick="startDragging(${i}), moveTaskTo('AwaitFeedback')" class="arrowRed">&#x2BB4;</div>`; }
}

// Picks the task-details
function getTasksInformation(i) {
    process = tasks[i].position;
    categoryColor = getCategoryColor(tasks[i].category);
    currentSubtasks = checkSubtasks(tasks[i].subtasks, i);
    prio = `${tasks[i].prio}.png`
}

// Picks the correct background color of the category-box
function getCategoryColor(category) {
    let result;
    if (category == "User Story") { result = categoryColors[0] };
    if (category == "Technical Task") { result = categoryColors[1] };
    return result;
}

function checkSubtasks(subtasks, i) {
    let amount = subtasks.length;
    let tasksDone = culcualteSubtasks(amount, i);
    if (amount > 0) {
        currentSubtaskProgress = (100 / amount) * tasksDone;
    }
    return amount;
}

function culcualteSubtasks(amount, i) {
    let amountDone = 0;
    for (let j = 0; j < amount; j++) {
        if (tasks[i].subtasks[j].finished === true) { amountDone++; }
    }
    currentSubtaskDone = amountDone;
    return amountDone;
}

function showDetailsSubtasks(i) {
    let showSubtask = document.getElementById('subtasksDetails');
    let status;
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
        if (tasks[i].subtasks[j].finished == true) { status = './img/checked.png' }
        else { status = './img/unchecked.png' }
        showSubtask.innerHTML += templateShowDetailsSubtasks(i, j, status);
    }
}

function fillAssignedStaff(i) {
    let initialColor;
    for (let j = 0; j < tasks[i].assigned.length; j++) {
        let initials = getInitials(tasks[i].assigned[j]);
        let lookForName = tasks[i].assigned[j];
        let userIndex = users.findIndex(user => user.name === lookForName);
        if (userIndex >= 0) {
            initialColor = users[userIndex].color;
            document.getElementById(`assign${i}`).innerHTML += templateTasksAssignedStaff(i, initials, initialColor);
        }
    }
}

function fillDetailsAssignedStaff(i) {
    let initialColor;
    for (let j = 0; j < tasks[i].assigned.length; j++) {
        let initials = getInitials(tasks[i].assigned[j]);
        let lookForName = tasks[i].assigned[j];
        let userIndex = users.findIndex(user => user.name === lookForName);
        if (userIndex >= 0) {
            initialColor = users[userIndex].color;
            let template = templateTasksAssignedStaff(i, initials, initialColor);
            document.getElementById(`assignDetails`).innerHTML += templateAssignedPeople(i, j, template)
        }
    }
}

// clears the board with all columns
function clearBoard() {
    document.getElementById('contentToDo').innerHTML = '';
    document.getElementById('contentInProgress').innerHTML = '';
    document.getElementById('contentAwaitFeedback').innerHTML = '';
    document.getElementById('contentDone').innerHTML = '';
}

// checks for any empty columns at the board
function checkForEmptyColums() {
    if (document.getElementById('contentToDo').innerHTML == '') { document.getElementById('contentToDo').innerHTML = noTasksPlaced('To Do') };
    if (document.getElementById('contentInProgress').innerHTML == '') { document.getElementById('contentInProgress').innerHTML = noTasksPlaced('In progress') };
    if (document.getElementById('contentAwaitFeedback').innerHTML == '') { document.getElementById('contentAwaitFeedback').innerHTML = noTasksPlaced('Await Feedback') };
    if (document.getElementById('contentDone').innerHTML == '') { document.getElementById('contentDone').innerHTML = noTasksPlaced('Done') };
}

function startDragging(id) {
    draggedTask = id;
}

async function moveTaskTo(process) {
    await loadTasksFromServer();
    tasks[draggedTask].position = process;
    fillBoardWithTasks();
    setItem('tasks', tasks);
    closeTaskDetails();
}

function allowDrop(event) {
    event.preventDefault();
}

function openTaskDetails(i) {
    let popUpDetails = document.getElementById('taskDetailsBox');
    popUpDetails.classList.remove('d-none');
    popUpDetails.innerHTML = '';
    getTasksInformation(i);
    let prioWritten = prio.charAt(0).toUpperCase() + prio.slice(1, -4);
    popUpDetails.innerHTML = templateTaskDetails(i, categoryColor, currentSubtasks, prio, prioWritten);
    fillDetailsAssignedStaff(i);
    showDetailsSubtasks(i);
    masterI = i;
}

function closeTaskDetails() {
    document.getElementById('taskDetailsBox').classList.add('d-none');
}

function dragHover(topic) {
    document.getElementById(topic).classList.add('topicHover');
}

function dragHoverOver(topic) {
    document.getElementById(topic).classList.remove('topicHover');
}

async function changeBoolean(i, j) {
    let changer = tasks[i].subtasks[j].finished;
    changer = !changer;
    tasks[i].subtasks[j].finished = changer;
    openTaskDetails(i);
    setItem('tasks', tasks);
    initBoard();
}

function rotateBox(i) {
    document.getElementById(`task${i}`).classList.add('rotateBox');
}

async function searchTasks() {
    let search = document.getElementById('searchField');
    if (search.value.length > 0) {
        let searchValue = search.value.toLowerCase();
        foundTasks = [];
        console.log(searchValue);
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].titel.toLowerCase().includes(searchValue) || tasks[j].description.toLowerCase().includes(searchValue)) {
                foundTasks.push(j);
                console.log(j);
            }
        }
        if (foundTasks.length > 0) {
            clearBoard();
            fillSearchedTaskInBoard();
        }
        search.value = ''
    }
}

async function fillSearchedTaskInBoard() {
    for (let l = 0; l < foundTasks.length; l++) {
        getTasksInformation(foundTasks[l]);
        document.getElementById(`content${process}`).innerHTML += templateFoundTasksInBoard(foundTasks[l]);
        await fillAssignedStaff(foundTasks[l]);
        if (tasks[foundTasks[l]].subtasks.length == 0) { document.getElementById(`taskProgress${l}`).classList.add('d-none'); }
    }
}

function messageBoard() {
    const urlMessage = new URLSearchParams(window.location.search);
    const msg = urlMessage.get("msg");
    if (msg) {
      document.getElementById("sucessBoxBoard").classList.remove("d-none");
      document.getElementById("sucessBoxBoard").innerHTML = msg;
    }
  }



