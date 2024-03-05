let tasks = [
    {
        'titel': 'test',
        'description': 'test',
        'assigned': ['test'],
        'dueDate': '24.12.2024',
        'prio': 'test',
        'category': 'test',
        'position': 'ToDo',
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
        'category': 'test',
        'position': 'InProgress',
        'subtasks': [{
            'subtask': 'test',
            'finished': false
        }]
    }
];

async function initBoard() {
    // let loadedTasks = getItem(tasks);
    // if (loadedTasks) { tasks = loadedTasks }
    fillBoardWithTasks();
}

function fillBoardWithTasks() {
    clearBoard();
    for (let i = 0; i < tasks.length; i++) {
        let process = tasks[i].position;
        document.getElementById(`content${process}`).innerHTML += templateTasksInBoard(i);
    }
}

function clearBoard() {
    document.getElementById('contentToDo').innerHTML = '';
    document.getElementById('contentInProgress').innerHTML = '';
    document.getElementById('contentAwaitFeedback').innerHTML = '';
    document.getElementById('contentDone').innerHTML = '';
}

