let subtasks = [];
let chosenPrio = 'medium';
let assignedUsers = [];

async function initAddTask() {
    loadUsers()
    await loadLoginUser();
    renderLoginUserName('AddTask');
}

function openAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.remove('d-none');
    // loadUsersForAssignTo('InBoard');
}


// async function loadUsersForAssignTo(location) {
//     await loadUsers();
//     let options = document.getElementById('assignedToAddTask' + location);

//     for (let i = 0; i < users.length; i++) {
//         let username = users[i]['name'];
//         options.innerHTML += /*html*/`
//             <option>${username}</option>
//         `
//     }
// }


// function loadUsersForAssignTo() {
//     loadUsers();
//     let options = document.getElementById('assignedToAddTask');

//     for (let i = 0; i < users.length; i++) {
//         let username = users[i]['name'];
//         options.innerHTML += /*html*/`
//             <option>${username}</option>
//         `
//     }
// }


function closeAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.add('d-none');
}


// function clearAddTaskInBoard() {
//     document.getElementById('titleAddTaskInBoard').value = '';
//     document.getElementById('descriptionAddTaskInBoard').value = '';
//     document.getElementById('assignedToAddTaskInBoard').value = 'selectContact';
//     document.getElementById('dueDateAddTaskInBoard').value = '';

//     changePrioToMedium();

//     document.getElementById('categoryAddTaskInBoard').value = 'selectCategory';
//     document.getElementById('subtasksAddTaskInBoard').innerHTML = '';

//     cancelSubtaskInBoard();
// }

function clearAddTask(location) {
    document.getElementById('titleAddTask' + location).value = '';
    document.getElementById('descriptionAddTask' + location).value = '';
    document.getElementById('dueDateAddTask' + location).value = '';
    chosenPrio = 'medium';
    document.getElementById('categoryAddTask' + location).value = 'selectCategory';
    document.getElementById('subtasksAddTask' + location).innerHTML = '';
    cancelSubtask(location);
}

function changePrio(prio, location) {
    chosenPrio = prio;
    removePrioSymbols(location);
    document.getElementById(`button-${prio}${location}`).classList.add(prio);
    document.getElementById(`img-${prio}-white${location}`).classList.remove('d-none');
    document.getElementById(`img-${prio}${location}`).classList.add('d-none');

}

function removePrioSymbols(location) {
    document.getElementById('img-urgent' + location).classList.remove('d-none');
    document.getElementById('img-urgent-white' + location).classList.add('d-none');
    document.getElementById('img-medium' + location).classList.remove('d-none');
    document.getElementById('img-medium-white' + location).classList.add('d-none');
    document.getElementById('img-low' + location).classList.remove('d-none');
    document.getElementById('img-low-white' + location).classList.add('d-none');
    document.getElementById('button-low' + location).classList.remove('low');
    document.getElementById('button-medium' + location).classList.remove('medium');
    document.getElementById('button-urgent' + location).classList.remove('urgent');
}

function changeToSubtaskInput(location) {
    document.getElementById('buttonAddSubtask' + location).style = 'display: none';
    document.getElementById('inputDivAddSubtask' + location).style = 'display: flex';
}

function cancelSubtask(location) {
    document.getElementById('inputAddSubtask' + location).value = '';
    document.getElementById('buttonAddSubtask' + location).style = 'display: flex';
    document.getElementById('inputDivAddSubtask' + location).style = 'display: none';
}

async function searchAssignedPeople(location) {
    let dropDown = document.getElementById('dropDownUserListToAssigne' + location);
    let thatIsMe = '';
    dropDown.innerHTML = '';
    if (dropDown.classList.contains('d-none')) { dropDown.classList.remove('d-none') }
    else { dropDown.classList.add('d-none') };

    for (let i = 0; i < users.length; i++) {
        let initials = getInitials(users[i].name);
        let initialColor = users[i].color;
        let checkValue = './img/unchecked.png';
        if (users[i].name == loginUser[0]) { thatIsMe = " (You)" }
        else { thatIsMe = '' };
        if (assignedUsers.includes(users[i].name)) { checkValue = './img/checked.png' }
        dropDown.innerHTML += templateUserListInDropDown(i, initialColor, initials, thatIsMe, checkValue, location);
        ;
    }
}

function changeCheckerAssignedTo(i, location) {
    let clickedUser = users[i].name;
    if (assignedUsers.includes(clickedUser)) {
        let userIndex = assignedUsers.findIndex(user => user === clickedUser);
        assignedUsers.splice(userIndex, 2);
        document.getElementById(`userListChecker${location}${i}`).src = './img/unchecked.png';

    } else {
        assignedUsers.push(clickedUser);
        assignedUsers.push(users[i].color);
        document.getElementById(`userListChecker${location}${i}`).src = './img/checked.png';
    }
    showAssignedUsersStickers(location);
}

function showAssignedUsersStickers(location) {
    let overview = document.getElementById('showAssignedUsersStickers' + location);
    overview.innerHTML = '';
    for (let j = 0; j < (assignedUsers.length / 2); j++) {
        let initials = getInitials(assignedUsers[j * 2]);
        let initialColor = assignedUsers[(j * 2) + 1];
        overview.innerHTML += `<div class="assigneListing" style="background-color:${initialColor}; margin-right:0;">${initials}</div>`
    }
}

async function searchSpecificUser(location) {
    let search = document.getElementById('searchFieldAddTask' + location);
    if (search.value.length > 0) {
        let searchValue = search.value.toLowerCase();
        foundUsers = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].name.toLowerCase().includes(searchValue)) {
                foundUsers.push(i);
            }
        }
        console.log(foundUsers);
        if (foundUsers.length > 0) {
            // document.getElementById('dropDownUserListToAssigne').innerHTML = '';
            fillFoundUsersInDropDown(foundUsers, location);
        }
    }
}

function fillFoundUsersInDropDown(foundUsers, location) {
    let dropDown = document.getElementById('dropDownUserListToAssigne' + location);
    let thatIsMe = '';
    dropDown.innerHTML = '';
    if (dropDown.classList.contains('d-none')) { dropDown.classList.remove('d-none') }
    else { dropDown.classList.add('d-none') };
    for (let j = 0; j < foundUsers.length; j++) {
        let initials = getInitials(users[foundUsers[j]].name);
        let initialColor = users[foundUsers[j]].color;
        let checkValue = './img/unchecked.png';
        if (users[foundUsers[j]].name == loginUser[0]) { thatIsMe = " (You)" }
        else { thatIsMe = '' };
        if (assignedUsers.includes(users[foundUsers[j]].name)) { checkValue = './img/checked.png' }
        dropDown.innerHTML += templateUserListInDropDown(foundUsers[j], initialColor, initials, thatIsMe, checkValue, location);
        ;
    }
}

function addSubtask(location) {
    let newsubtask = document.getElementById('inputAddSubtask' + location).value.trim();
    if (newsubtask !== '') {
        subtasks.push({ 'subtask': newsubtask, 'finished': false });
        renderSubtasks(location);
    }
}

function renderSubtasks(location) {
    let list = document.getElementById('subtasksAddTask' + location);
    list.innerHTML = '';
    for (let id = 0; id < subtasks.length; id++) {
        nextSubtaskInList = subtasks[id].subtask;
        list.innerHTML += /*html*/`
             <li id="subtask${id}">
                <div class="subtaskLIST" id="listBox${id}" onmouseover="showSubtaskEditor(${id})" onmouseout="hideSubtaskEditor(${id})">
                    <p id="subTitle${id}" onclick="openSubtaskEditor(${id})">${nextSubtaskInList}</p>
                    <div class="subtaskEditor">
                        <input class="d-none" id="subtaskEditInput${id}" value="${nextSubtaskInList}">
                        <img src="./img/editIcon.png" class="d-none miniIcons" id="btnEdit${id}" onclick="openSubtaskEditor(${id})">
                        <img src="./img/check_dark.png" class="d-none miniIcons" id="btnSave${id}" onclick="saveNewSubtaskEditor(${id}, '${location}')">
                        <img src="./img/deleteIcon.png" class="d-none miniIcons" id="btnDelete${id}" onclick="deleteSubtaskEditor(${id}, '${location}')">
                    </div>
                </div>
            </li>
        `;
    }
    document.getElementById('inputAddSubtask' + location).value = '';
}

function showSubtaskEditor(id) {
    document.getElementById('btnEdit' + id).classList.remove('d-none');
    document.getElementById('btnDelete' + id).classList.remove('d-none');
}

function hideSubtaskEditor(id) {
    document.getElementById('btnEdit' + id).classList.add('d-none');
    document.getElementById('btnDelete' + id).classList.add('d-none');
}

function openSubtaskEditor(id) {
    document.getElementById('listBox' + id).onmouseout = '';
    document.getElementById('listBox' + id).onmouseover = '';
    document.getElementById('subtaskEditInput' + id).classList.remove('d-none');
    document.getElementById('subTitle' + id).classList.add('d-none');
    document.getElementById('btnSave' + id).classList.remove('d-none');
    document.getElementById('btnDelete' + id).classList.remove('d-none');
    document.getElementById('btnEdit' + id).classList.add('d-none');
    document.getElementById('subtaskEditInput' + id).focus();
}

function saveNewSubtaskEditor(id, location) {
    let newsubtask = document.getElementById('subtaskEditInput' + id).value.trim();
    console.log(newsubtask);
    subtasks[id].subtask = newsubtask;
    console.log('Neuer Eintrag: ' + subtasks[id].subtask);
    document.getElementById('listBox' + id).onmouseout = `hideSubtaskEditor(${id})`;
    document.getElementById('listBox' + id).onmouseover = `showSubtaskEditor(${id})`;
    document.getElementById('subTitle' + id).classList.remove('d-none');
    // document.getElementById('subTitle' + id).innerHTML = newsubtask;
    document.getElementById('btnSave' + id).classList.add('d-none');
    document.getElementById('btnDelete' + id).classList.add('d-none');
    document.getElementById('subtaskEditInput' + id).classList.add('d-none');
    document.getElementById('subtaskEditInput' + id).blur();
    renderSubtasks(location);
}

function deleteSubtaskEditor(id, location) {
    subtasks.splice(id, 1);
    renderSubtasks(location);
}

async function createTask(location) {
    for (let i = 0; i < assignedUsers.length; i++) { assignedUsers.splice(i + 1, 1) };
    let newTitle = document.getElementById('titleAddTask' + location).value;
    let newDescription = document.getElementById('descriptionAddTask' + location).value;
    let newAssignedTo = assignedUsers;
    let newDueDate = document.getElementById('dueDateAddTask' + location).value;
    let newCategory = document.getElementById('categoryAddTask' + location).value;
    await loadTasksFromServer();
    tasks.push({
        'titel': newTitle,
        'description': newDescription,
        'assigned': newAssignedTo,
        'dueDate': newDueDate,
        'position': 'ToDo',
        'prio': chosenPrio,
        'category': newCategory,
        'subtasks': subtasks
    });
    if (tasks[(tasks.length - 1)].subtasks == ['']) { tasks[(tasks.length - 1)].subtasks = ''; }

    await setItem('tasks', tasks);
    while (subtasks.length > 0) {
        subtasks.pop();
    }
    clearAddTask(location);
    closeAddTaskInBoard();
    initBoard();

    // console.log('task created successfully', tasks)
}


function deleteTask(i) {
    tasks.splice(i, 1);
    setItem('tasks', tasks);
    closeTaskDetails();
    initBoard();
}


function editTask(i) {
    closeTaskDetails();
    console.log('closedTaskDetails');

    //??? geht nicht, warum?

    tasks = getItem('tasks');
    let title = tasks[i]['titel'];
    let description = tasks[i]['description'];
    let dueDate = tasks[i]['dueDate'];
    let prio = tasks[i]['prio'];
    let assignedTo = [];
    assignedTo.push(tasks[i]['assigned']);
    let subtasks = [];
    subtasks.push(tasks[i]['subtasks']);

    let editTaskBox = document.getElementById('editTask');
    editTaskBox.classList.remove('d-none');
    editTaskBox.innerHTML = '';
    editTaskBox.innerHTML = templateEditTask();

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


function setOldValuesToEditTask(tasks, i, title, description, dueDate, prio, assignedTo, subtasks) {
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;
    document.getElementById('editDueDate').value = dueDate;

    if (prio == 'urgent') {

    }

    // assignedTo Möglichkeiten von Jean einspielen, außer die, die bereits gewählt sind
    // asignedTo anzeigen

    for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
        let subtask = tasks[i]['subtasks'][j];
        document.getElementById('showSubtasksInEdit').innerHTML += /*html*/`
            <ul>${subtask}</ul>
        `
    }
}