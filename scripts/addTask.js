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
    document.getElementById('assignedToAddTaskInBoard').value = 'selectContact';
    document.getElementById('dueDateAddTaskInBoard').value = '';

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    changePrioToMedium();

    document.getElementById('categoryAddTaskInBoard').value = 'selectCategory';
    document.getElementById('subtasksAddTaskInBoard').value = '';
}


function changePrioToUrgent() {

    document.getElementById('img-urgent').classList.add('d-none');
    document.getElementById('img-urgent-white').classList.remove('d-none');
    document.getElementById('img-medium').classList.remove('d-none');
    document.getElementById('img-medium-white').classList.add('d-none');
    document.getElementById('img-low').classList.remove('d-none');
    document.getElementById('img-low-white').classList.add('d-none');

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.add('urgent');

    prioButton = 'urgent';
}


function changePrioToMedium() {

    document.getElementById('img-urgent').classList.remove('d-none');
    document.getElementById('img-urgent-white').classList.add('d-none');
    document.getElementById('img-medium').classList.add('d-none');
    document.getElementById('img-medium-white').classList.remove('d-none');
    document.getElementById('img-low').classList.remove('d-none');
    document.getElementById('img-low-white').classList.add('d-none');

    document.getElementById('button-low').classList.remove('low');
    document.getElementById('button-medium').classList.add('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    prioButton = 'medium';
}


function changePrioToLow() {

    document.getElementById('img-urgent').classList.remove('d-none');
    document.getElementById('img-urgent-white').classList.add('d-none');
    document.getElementById('img-medium').classList.remove('d-none');
    document.getElementById('img-medium-white').classList.add('d-none');
    document.getElementById('img-low').classList.add('d-none');
    document.getElementById('img-low-white').classList.remove('d-none');

    document.getElementById('button-low').classList.add('low');
    document.getElementById('button-medium').classList.remove('medium');
    document.getElementById('button-urgent').classList.remove('urgent');

    prioButton = 'low';
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
        'prio': newPrio,
        'category': newCategory,
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

