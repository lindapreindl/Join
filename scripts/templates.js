function templateTasksInBoard(i, categoryColor) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" class="popUpBox widthTaskBox" id="task${i}">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
        </div>
        <h3>${tasks[i].titel}</h3>
        <p>${tasks[i].description}</p>

    </div>
    `
}

function noTasksPlaced(process) {
    return `
    <div class="emptyTask fontLightgrey">No tasks ${process}</div>
    `;
}