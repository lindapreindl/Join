let amountTasks;
let amountToDo;
let amountDone;
let amountUrgent;
let amountProgress;
let amountFeedback;

async function initSummary() {
    await loadTasksFromServer();
    await loadLoginUser();
    renderLoginUserName();
    amountTasks = tasks.length;
    amountToDo = checkAmountFromJSON(1, 'ToDo');
    amountDone = checkAmountFromJSON(1, 'Done');
    amountProgress = checkAmountFromJSON(1, 'InProgress');
    amountFeedback = checkAmountFromJSON(1, 'AwaitFeedback');
    amountUrgent = checkAmountFromJSON(2, 'urgent');

    fillSummary();
}

function renderLoginUserName() {
    document.getElementById('userNameSummary').innerHTML = loginUser[0];
    document.getElementById('activeUserSummary').innerHTML = loginUser[1];
    if (loginUser[0] == '') { document.getElementById('goodMorning').innerHTML = 'Good morning'; }
}

function checkAmountFromJSON(category, value) {
    let result = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (category == 1) {
            if (tasks[i].position == value) { result++; }
        }
        if (category == 2) {
            if (tasks[i].prio == value) { result++; }
        }
        return result;
    }
}

    async function loadLoginUser() {
        try {
            loginUser = JSON.parse(await getItem('loginUser'));
        } catch (e) {
            console.info('No tasks found.');
        }
    }

    function fillSummary() {
        document.getElementById('amountToDo').innerHTML = amountToDo;
        document.getElementById('amountDone').innerHTML = amountDone;
        document.getElementById('amountUrgent').innerHTML = amountUrgent;
        document.getElementById('amountTasks').innerHTML = amountTasks;
        document.getElementById('amountProgress').innerHTML = amountProgress;
        document.getElementById('amountFeedback').innerHTML = amountFeedback;
    }