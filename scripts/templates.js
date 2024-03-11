function templateTasksInBoard(i, categoryColor, subtasks, prio) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" class="popUpBox widthTaskBox" id="task${i}">
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

function noTasksPlaced(process) {
    return `
    <div class="emptyTask fontLightgrey">No tasks ${process}</div>
    `;
}

function templateTasksAssignedStaff(i, j) {
    return `<div class="assigneInitials">${tasks[i].assigned[j]}</div>`;
}