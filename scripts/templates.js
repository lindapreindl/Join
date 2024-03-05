function templateTasksInBoard(i) {
    return `
    <div class="popUpBox widthTaskBox" id="task${i}">
        <div class="categoryLine">
            ${tasks[i].category}
        </div>
        <h3>${tasks[i].titel}</h3>
        <p>${tasks[i].description}</p>

    </div>
    `
}