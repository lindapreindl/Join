let prioButton = 'medium';

function openAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.remove('d-none');
}


function closeAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.add('d-none');
}


/*function clearTaskInBoard() {
    document.getElementById('titleAddTaskInBoard').innerHTML = '';
    document.getElementById('descriptionAddTaskInBoard').innerHTML = '';
    document.getElementById('assignedToAddTaskInBoard').innerHTML = '';
    document.getElementById('dueDateAddTaskInBoard').innerHTML = '';
    document.getElementById('categoryAddTaskInBoard').innerHTML = '';
    document.getElementById('subtasksAddTaskInBoard').innerHTML = '';
}*/


function createTaskInBoard() {
    let newTitle = document.getElementById('titleAddTaskInBoard').value;
    let newDescription = document.getElementById('descriptionAddTaskInBoard').value;
    let newAssignedTo = document.getElementById('assignedToAddTaskInBoard').value;
    let newDueDate = document.getElementById('dueDateAddTaskInBoard').value;
    let newCategory = document.getElementById('categoryAddTaskInBoard').value;
    let newSubtask = document.getElementById('subtasksAddTaskInBoard').value;
    let newPrio = prioButton;

    console.log(newTitle, newDescription, newAssignedTo, newDueDate, newCategory, newSubtask);
    
    tasks.push({
        'titel': newTitle,
        'description': newDescription,
        'assigned': [newAssignedTo],
        'dueDate': newDueDate,
        'position': 'ToDo',
        'prio': prioButton,
        'category': newCategory,
        'subtasks': [newSubtask]
    });
    if (tasks[(tasks.length - 1)].subtasks[0] == '') {tasks[(tasks.length - 1)].subtasks = '';}

    console.log(tasks);
    setItem('tasks', tasks);
    let taskstoshow = getItem('tasks');
    console.log(taskstoshow);
    initBoard();
}

function changePrio(value) {
    prioButton = value;
}

