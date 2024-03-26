let amountTasks;
let amountToDo;
let amountDone;
let amountUrgent;
let amountProgress;
let amountFeedback;

async function initSummary() {
    await loadTasksFromServer();
    await loadLoginUser();
    renderLoginUserName('Summary');
    amountTasks = tasks.length;
    amountToDo = checkAmountFromJSON(1, 'ToDo');
    amountDone = checkAmountFromJSON(1, 'Done');
    amountProgress = checkAmountFromJSON(1, 'InProgress');
    amountFeedback = checkAmountFromJSON(1, 'AwaitFeedback');
    amountUrgent = checkAmountFromJSON(2, 'urgent');
    fillSummary();
}

function renderLoginUserName(location) {
    document.getElementById('activeUser' + location).innerHTML = loginUser[1];
    let daytime = findOutDayTime();
    document.getElementById('greeting').innerHTML = daytime + ',';
    if (location == 'Summary') { document.getElementById('userNameSummary').innerHTML = loginUser[0]; }
    if (loginUser[0] == '') { document.getElementById('greeting').innerHTML = daytime + '!'; }
}

function findOutDayTime() {
    let now = new Date().getHours();
    if (now >= 5 && now < 12) { now = 'Good morning' };
    if (now >= 12 && now < 18) { now = 'Good afternoon' };
    if (now >= 18 && now < 24) { now = 'Good evening' };
    if (now >= 0 && now < 5) { now = 'Good evening' };
    return now;
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
    }
    return result;
}

async function loadLoginUser() {
    try {
        loginUser = JSON.parse(await getItem('loginUser'));
    } catch (e) {
        console.info('No User found.');
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