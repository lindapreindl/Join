let tasks = [
    {
        'titel': 'Zwiebeln schneiden',
        'description': 'Rote Zwiebeln in kleine Würfel schneiden',
        'assigned': ['test'],
        'dueDate': '24.12.2024',
        'prio': 'test',
        'category': 'User Story',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'test',
            'finished': false
        }]
    },
    {
        'titel': 'Holz hacken',
        'description': 'Für ein nettes, kleines Lagerfeuer',
        'assigned': ['test'],
        'dueDate': '24.12.2024',
        'prio': 'test',
        'category': 'User Story',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'test',
            'finished': false
        }]
    },
    {
        'titel': 'Join programmieren',
        'description': 'Ein cooles Programm schreiben zur Arbeitsplanung und Aufgabenverteilung in einem Team',
        'assigned': ['test'],
        'dueDate': '24.12.2024',
        'prio': 'test',
        'category': 'Technical Task',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'test',
            'finished': false
        }]
    },
    {
        'titel': 'Nase putzen',
        'description': 'Mit einem Taschentuch die Atemwege reinigen',
        'assigned': ['test'],
        'dueDate': '24.12.2024',
        'prio': 'test',
        'category': 'Technical Task',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'test',
            'finished': false
        }]
    }
];
let categoryColors = ['#0038FF', '#1FD7C1']
let draggedTask;

async function initBoard() {
    // let loadedTasks = getItem(tasks);
    // if (loadedTasks) { tasks = loadedTasks }
    fillBoardWithTasks();
}

function fillBoardWithTasks() {
    clearBoard();
    for (let i = 0; i < tasks.length; i++) {
        let process = tasks[i].position;
        let categoryColor = getCategoryColor(tasks[i].category);
        document.getElementById(`content${process}`).innerHTML += templateTasksInBoard(i, categoryColor);
    }
    checkForEmptyColums()
}

function getCategoryColor(category) {
    let result;
    if (category == "User Story") { result = categoryColors[0] };
    if (category == "Technical Task") { result = categoryColors[1] };
    return result;
}

function clearBoard() {
    document.getElementById('contentToDo').innerHTML = '';
    document.getElementById('contentInProgress').innerHTML = '';
    document.getElementById('contentAwaitFeedback').innerHTML = '';
    document.getElementById('contentDone').innerHTML = '';
}

function checkForEmptyColums() {
    if (document.getElementById('contentToDo').innerHTML == '') { document.getElementById('contentToDo').innerHTML = noTasksPlaced('To Do') };
    if (document.getElementById('contentInProgress').innerHTML == '') { document.getElementById('contentInProgress').innerHTML = noTasksPlaced('In progress') };
    if (document.getElementById('contentAwaitFeedback').innerHTML == '') { document.getElementById('contentAwaitFeedback').innerHTML = noTasksPlaced('Await Feedback') };
    if (document.getElementById('contentDone').innerHTML == '') { document.getElementById('contentDone').innerHTML = noTasksPlaced('Done') };
}

function startDragging(id) {
    draggedTask = id;
}

function moveTaskTo(process) {
    tasks[draggedTask].position = process;
    fillBoardWithTasks();
}

function allowDrop(event) {
    event.preventDefault();
}


