function templateTasksInBoard(i, categoryColor, subtasks, prio) {
    return `
    <div draggable="true" ondragstart="startDragging(${i}), rotateBox(${i})" class="popUpBox widthTaskBox" id="task${i}" onclick="openTaskDetails(${i})">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
        </div>
        <h3 class="mb12">${tasks[i].titel}</h3>
        <p class="mb24 fontLightgrey">${tasks[i].description}</p>
        <div id="taskProgress${i}" class="w100 d-flex align-center justify-between mb24">
            <progress value="${currentSubtaskProgress}" max="100"></progress>
            <p style="font-size:12px;">${currentSubtaskDone}/${subtasks} Subtasks</p>
        </div>
        <div class="d-flex justify-between align-center w100">
            <div id="assign${i}" class="d-flex"></div>
            <div><img class="prioItem" src="../img/${prio}"></div>
        </div>
    </div>
    `
}

function templateFoundTasksInBoard(i) {
    return `
    <div draggable="true" ondragstart="startDragging(${i}), rotateBox(${i})" class="popUpBox widthTaskBox" id="task${i}" onclick="openTaskDetails(${i})">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
        </div>
        <h3 class="mb12">${tasks[i].titel}</h3>
        <p class="mb24 fontLightgrey">${tasks[i].description}</p>
        <div id="taskProgress${i}" class="w100 d-flex align-center justify-between mb24">
            <progress value="${currentSubtaskProgress}" max="100"></progress>
            <p style="font-size:12px;">${currentSubtaskDone}/${currentSubtasks} Subtasks</p>
        </div>
        <div class="d-flex justify-between align-center w100">
            <div id="assign${i}" class="d-flex"></div>
            <div><img class="prioItem" src="../img/${prio}"></div>
        </div>
    </div>
    `
}

function noTasksPlaced(process) {
    return `
    <div class="emptyTask fontLightgrey">No tasks ${process}</div>
    `;
}

function templateTasksAssignedStaff(i, initials, bgColor) {
    return `<div class="assigneInitials" style="background-color:${bgColor};">${initials}</div>`;
}

function templateTaskDetails(i, categoryColor, subtasks, prio, prioWritten) {
    return `
    <div class="widthTaskDetails" id="taskDetails">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
            <div><img src="../img/close.png" onclick="closeTaskDetails()"></div>
        </div>
        <h3 class="mb12">${tasks[i].titel}</h3>
        <p class="mb24">${tasks[i].description}</p>
        <div class="w100 d-flex mb24">
            <div class="w150px"><p class="fontDarkGrey">Due Date:</p></div>
            <p>${tasks[i].dueDate}</p>
        </div>
        <div class="w100 d-flex mb24 align-center">
            <div class="w150px"><p class="fontDarkGrey">Priority:</p></div>
            <p class="mr8">${prioWritten}</p>
            <div class="d-flex align-center"><img class="prioItem" src="../img/${prio}"></div>
        </div>
        <div class="w100">
            <p class="fontDarkGrey mb12">Assigned To:</p>
            <div id="assignDetails"></div>
        </div>
        <div class="w100">
            <p class="fontDarkGrey mb12">Subtasks</p>
            <div id="subtasksDetails" class="subtasksDetails mb24"></div>
        </div>
        <div class="w100 d-flex mb24 justify-end">
            <div onclick="deleteTask(${i})" class="d-flex ml align-center detailsButton widthFixed"><img class="mr8" src="../img/delete.png" onmouseover="this.src='./img/deleteHover.png';" onmouseout="this.src='./img/delete.png';"></div>
            <div class="d-flex ml align-center detailsButton widthFixed"><img class="mr8" src="../img/edit.png" onmouseover="this.src='./img/editHover.png';" onmouseout="this.src='./img/edit.png';"></div>
        </div>
    </div>
    `;
}


function templateAssignedPeople(i, j, template) {
    return `
        <div class="d-flex align-center ml mb24">
            <div class="mr8">${template}</div>
            <p>${tasks[i].assigned[j]}</p>
        </div>`;
}

function templateShowDetailsSubtasks(i, j, status) {
    return `
        <div class="d-flex align-center ml hover">
            <div class="mr24 clickfinger"><img src="${status}" onclick="changeBoolean(${i}, ${j})"></div>
            <div>${tasks[i].subtasks[j].subtask}</div>
        </div>`
}