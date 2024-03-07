let tasks = [
    {
        'titel': 'Zwiebeln schneiden',
        'description': 'Rote Zwiebeln in kleine Würfel schneiden',
        'assigned': ['CB', 'GV', 'PP'],
        'dueDate': '24.12.2024',
        'prio': 'urgent',
        'category': 'User Story',
        'position': 'ToDo',
        'subtasks': [
            {
                'subtask': 'Schäler spülen',
                'finished': true
            },
            {
                'subtask': 'Zwiebeln schälen',
                'finished': true
            },
            {
                'subtask': 'Zwiebeln würfeln',
                'finished': false
            }
        ]
    },
    {
        'titel': 'Holz hacken',
        'description': 'Für ein nettes, kleines Lagerfeuer',
        'assigned': ['JC'],
        'dueDate': '24.12.2024',
        'prio': 'medium',
        'category': 'User Story',
        'position': 'InProgress',
        'subtasks': [
            {
                'subtask': 'Axt schärfen',
                'finished': true
            },
            {
                'subtask': 'Holz spalten',
                'finished': false
            }
        ]
    },
    {
        'titel': 'Join programmieren',
        'description': 'Ein cooles Programm schreiben zur Arbeitsplanung und Aufgabenverteilung in einem Team',
        'assigned': ['AB', 'CD', 'EF', 'GH', 'JI', 'KL'],
        'dueDate': '24.12.2024',
        'prio': 'low',
        'category': 'Technical Task',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'Brainstorming',
            'finished': false
        }]
    },
    {
        'titel': 'Nase putzen',
        'description': 'Mit einem Taschentuch die Atemwege reinigen',
        'assigned': ['MN'],
        'dueDate': '24.12.2024',
        'prio': 'low',
        'category': 'Technical Task',
        'position': 'AwaitFeedback',
        'subtasks': ''
    }
];
let categoryColors = ['#0038FF', '#1FD7C1']
let draggedTask;
let currentSubtaskDone;
let currentSubtaskProgress;

async function initBoard() {
    await loadTasksFromServer();
    fillBoardWithTasks();
}

async function loadTasksFromServer() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.info('No tasks found.');
    }
}

function fillBoardWithTasks() {
    clearBoard();
    setItem('tasks', tasks);
    for (let i = 0; i < tasks.length; i++) {
        let process = tasks[i].position;
        let categoryColor = getCategoryColor(tasks[i].category);
        let currentSubtasks = checkSubtasks(tasks[i].subtasks, i);
        let prio = `${tasks[i].prio}.png`
        document.getElementById(`content${process}`).innerHTML += templateTasksInBoard(i, categoryColor, currentSubtasks, prio);
        fillAssignedStaff(i);
        if (tasks[i].subtasks.length == 0) { document.getElementById(`taskProgress${i}`).classList.add('d-none'); }
    }
    checkForEmptyColums()
}

function getCategoryColor(category) {
    let result;
    if (category == "User Story") { result = categoryColors[0] };
    if (category == "Technical Task") { result = categoryColors[1] };
    return result;
}

function checkSubtasks(subtasks, i) {
    let amount = subtasks.length;
    let tasksDone = culcualteSubtasks(amount, i);
    if (amount > 0) { 
        currentSubtaskProgress = (100 / amount) * tasksDone;
    }
    return amount;
}

function culcualteSubtasks(amount, i) {
    let amountDone = 0;
    for (let j = 0; j < amount; j++) {
        if (tasks[i].subtasks[j].finished === true) { amountDone++; }
    }
    currentSubtaskDone = amountDone;
    return amountDone;
}

function fillAssignedStaff(i) {
    for (let j = 0; j < tasks[i].assigned.length; j++) {
        document.getElementById(`assign${i}`).innerHTML += templateTasksAssignedStaff(i, j);
    }
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
    setItem('tasks', tasks);
}

function allowDrop(event) {
    event.preventDefault();
}


