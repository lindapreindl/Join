let prioButton = 'medium';

function openAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.remove('d-none');
}


function closeAddTaskInBoard() {
    document.getElementById('addTaskInBoard').classList.add('d-none');
}


function clearAddTaskInBoard() {
    document.getElementById('titleAddTaskInBoard').value = '';
    document.getElementById('descriptionAddTaskInBoard').value = '';
    document.getElementById('assignedToAddTaskInBoard').value = 'Select Contacts to assign';
    document.getElementById('dueDateAddTaskInBoard').value = '';
    document.getElementById('categoryAddTaskInBoard').innerHTML = 'Select Category';
    document.getElementById('subtasksAddTaskInBoard').value = '';
}


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

    setItem('tasks', tasks);
    initBoard();
}


function changePrio(value) {
    prioButton = value;
}


function deleteTask(i){
    tasks.splice(i,1);
    setItem('tasks', tasks);
    initBoard();
}

