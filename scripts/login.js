let users = [];

async function initUsers() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.info('No users found.');
    }
}

async function signUpUser() {
    let name = document.getElementById('signupName');
    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    if (password.value == document.getElementById('signupConfirmPassword').value) {
        users.push({name: name.value, email: email.value, password: password.value});
        await setItem('users', JSON.stringify(users));
        // document.getElementById('sucessBoxSignUp').classList.remove('d-none');
        resetForm(name, email, password)
        window.location.href = 'login.html?msg=Sign up successful';
    } else { alert('Die Passwörter stimmen nicht überein!'); }    
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
    let user = users.find( u => u.email == email.value && u.password == password.value);
    if (user) {
        window.location.href = 'index.html?msg=Login successful';
    }
}


// const urlMessage = new URLSearchParams(window.location.search);
// const msg = urlMessage.get('msg');
// if (msg) {
//     document.getElementById('sucessBoxSignUp').innerHTML = msg;
// }
