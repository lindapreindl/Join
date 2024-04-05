let subtasks = [];
let chosenPrio = 'medium';
let assignedUsers = [];
let editPosition = '';

async function initAddTask() {
    loadUsers()
    await loadLoginUser();
    renderLoginUserName('AddTask');
}

function openAddTaskInBoard(use) {
    document.getElementById('addTaskInBoard').classList.remove('d-none');
    document.getElementById('body').style = 'overflow: hidden';
    if (use == "edit") {
        document.getElementById('btnCreateTaskIB').classList.add('d-none');
        document.getElementById('btnSaveChangesIB').classList.remove('d-none');
        document.getElementById('titleAddTask').classList.add('d-none');
        document.getElementById('titleEditTask').classList.remove('d-none');
    }
    if (use == "add") {
        document.getElementById('btnCreateTaskIB').classList.remove('d-none');
        document.getElementById('btnSaveChangesIB').classList.add('d-none');
        document.getElementById('titleAddTask').classList.remove('d-none');
        document.getElementById('titleEditTask').classList.add('d-none');
        clearAddTask('IB');
        clearAddTask('AT');
    }
}

function closeAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.add('d-none');
    document.getElementById('body').style = 'overflow-y: scroll';
}

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
    document.getElementById('addImg1' + location).classList.add('d-none');
    document.getElementById('subtasksController' + location).classList.remove('d-none');
    document.getElementById('subtasksController' + location).classList.add('d-flex');
    document.getElementById('inputAddSubtask' + location).focus();

}

function cancelSubtask(location) {
    document.getElementById('inputAddSubtask' + location).value = '';
    document.getElementById('addImg1' + location).classList.remove('d-none');
    document.getElementById('subtasksController' + location).classList.add('d-none');
    document.getElementById('subtasksController' + location).classList.remove('d-flex');
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
        let bgcolor = '#FFFFFF';
        if (users[i].name == loginUser[0]) { thatIsMe = ' (You)' }
        else { thatIsMe = '' };
        if (assignedUsers.includes(users[i].name)) { 
            checkValue = './img/checked.png' 
            bgcolor = '#29ABE2'
        }
        dropDown.innerHTML += templateUserListInDropDown(i, initialColor, initials, thatIsMe, checkValue, bgcolor, location);
        ;
    }
}

function changeCheckerAssignedTo(i, location) {
    let clickedUser = users[i].name;
    if (assignedUsers.includes(clickedUser)) {
        let userIndex = assignedUsers.findIndex(user => user === clickedUser);
        assignedUsers.splice(userIndex, 2);
        document.getElementById(`userListChecker${location}${i}`).src = './img/unchecked.png';
        document.getElementById(`userDropDown${i}`).classList.remove('userDropdownChosen');
    } else {
        assignedUsers.push(clickedUser);
        assignedUsers.push(users[i].color);
        document.getElementById(`userListChecker${location}${i}`).src = './img/checked.png';
        document.getElementById(`userDropDown${i}`).classList.add('userDropdownChosen');
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
        if (foundUsers.length > 0) { fillFoundUsersInDropDown(foundUsers, location); }
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
        list.innerHTML += templateRenderSubtasks(location, id, nextSubtaskInList);
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
    subtasks[id].subtask = newsubtask;
    document.getElementById('listBox' + id).onmouseout = `hideSubtaskEditor(${id})`;
    document.getElementById('listBox' + id).onmouseover = `showSubtaskEditor(${id})`;
    document.getElementById('subTitle' + id).classList.remove('d-none');
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
    if (location == 'IB') { closeAddTaskInBoard(); }
    initBoard();
    window.location.href = "board.html?msg=Task added to board";
}

async function saveChanges(location, i) {
    for (let j = 0; j < assignedUsers.length; j++) { assignedUsers.splice(j + 1, 1) };
    let newTitle = document.getElementById('titleAddTask' + location).value;
    let newDescription = document.getElementById('descriptionAddTask' + location).value;
    let newAssignedTo = assignedUsers;
    let newDueDate = document.getElementById('dueDateAddTask' + location).value;
    let newCategory = document.getElementById('categoryAddTask' + location).value;
    tasks[i] = ({
        'titel': newTitle,
        'description': newDescription,
        'assigned': newAssignedTo,
        'dueDate': newDueDate,
        'position': editPosition,
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
    if (location == 'IB') { closeAddTaskInBoard(); }
    initBoard();
    window.location.href = "board.html?msg=Task added to board";
}

function deleteTask(i) {
    tasks.splice(i, 1);
    setItem('tasks', tasks);
    closeTaskDetails();
    initBoard();
}

async function editTask(i, location) {
    document.getElementById('body').style = 'overflow: hidden';
    
    if (location == 'IB') { closeTaskDetails(); }
    await loadTasksFromServer();
    let title = tasks[i]['titel'];
    let description = tasks[i]['description'];
    let dueDate = tasks[i]['dueDate'];
    let prio = tasks[i]['prio'];
    let assignedTo = tasks[i]['assigned'];
    let category = tasks[i]['category'];
    let subtasks = tasks[i]['subtasks'];
    editPosition = tasks[i]['position'];    
    if (location == 'IB') { openAddTaskInBoard('edit'); }
    fillPopUpWithStuff(i, title, description, dueDate, prio, assignedTo, subtasks, category, location);
}

function fillPopUpWithStuff(i, title, description, dueDate, prio, assignedTo, subtasks, category, location) {
    document.getElementById('titleAddTask' + location).value = title;
    document.getElementById('descriptionAddTask' + location).value = description;
    document.getElementById('dueDateAddTask' + location).value = dueDate;
    document.getElementById('categoryAddTask' + location).value = category;
    document.getElementById('btnSaveChanges' + location).setAttribute("onclick", `saveChanges('${location}', ${i})`);
    fillAssignedUsersToEdit(i, assignedTo);
    showAssignedUsersStickers(location);
    fillPrioToEdit(i, location);
    fillSubtasksToEdit(i, location);
}

function fillAssignedUsersToEdit(i, assignedTo) {
    let pickUserName = assignedTo;
    assignedUsers = [];
    for (let j = 0; j < pickUserName.length; j++) {
        for (let k = 0; k < users.length; k++) {
            if (pickUserName[j] == users[k].name) {
                assignedUsers.push(pickUserName[j]);
                assignedUsers.push(users[k].color);
            }
        }
    }
}

function fillPrioToEdit(i, location) {
    let prioEdit = tasks[i].prio;
    changePrio(prioEdit, location);
}

function fillSubtasksToEdit(i, location) {
    let subtasksEdit = tasks[i].subtasks;
    subtasks = subtasksEdit;
    renderSubtasks(location);
}

