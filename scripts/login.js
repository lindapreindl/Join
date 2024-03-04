let users = [];
let rememberUser;

async function initUsers() {
    loadUsers();
    rememberUser = localStorage.getItem('rememberUser');
    if (rememberUser) { document.getElementById('loginEmail').value = rememberUser; }
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.info('No users found.');
    }
}

async function signUpUser() {
    let name = document.getElementById('signupName');
    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    if (password.value == document.getElementById('signupConfirmPassword').value) {
        users.push({ name: name.value, email: email.value, password: password.value });
        await setItem('users', JSON.stringify(users));
        resetForm(name, email, password)
        window.location.href = 'login.html?msg=Sign up successful';
    } else { noMatchedPasswords() }
}

function noMatchedPasswords() {
    document.getElementById('signupConfirmPassword').style.borderColor = "#FD1E39";
    document.getElementById('passwordNoMatch').classList.remove('d-none');
}

function resetForm(name, email, password) {
    name.value = '';
    email.value = '';
    password.value = '';
    document.getElementById('signupConfirmPassword').value = '';
}

function logInUser() {
    let email = document.getElementById('loginEmail');
    let password = document.getElementById('loginPassword');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        if (document.getElementById('rememberMeCheck').value = true) {
            localStorage.setItem('rememberUser', email.value);
        }
        window.location.href = 'index.html?msg=Login successful';
    } else { wrongPassword() }
}

function wrongPassword() {
    document.getElementById('loginPassword').style.borderColor = "#FD1E39";
    document.getElementById('wrongPassword').classList.remove('d-none');
}


function message() {
    const urlMessage = new URLSearchParams(window.location.search);
    const msg = urlMessage.get('msg');
    if (msg) {
        document.getElementById('sucessBoxSignUp').classList.remove('d-none');
        document.getElementById('sucessBoxSignUp').innerHTML = msg;
    }
}
