let users = [
    {'name': 'admin', 'email': 'admin', 'password': 'admin'}
];

function signUpUser() {
    let name = document.getElementById('signupName');
    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    if (password.value == document.getElementById('signupConfirmPassword').value) {
        users.push({name: name.value, email: email.value, password: password.value});
        document.getElementById('sucessBoxSignUp').classList.remove('d-none');
        name.value = '';
        email.value = '';
        password.value = ''
        document.getElementById('signupConfirmPassword').value = '';
        window.location.href = 'login.html?msg=Sign up successful';
    } else { alert('Die Passwörter stimmen nicht überein!'); }    
}

function logInUser() {
    let email = document.getElementById('loginEmail');
    let password = document.getElementById('loginPassword');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    if (user) {
        window.location.href = 'index.html?msg=Login successful';
    }
}

const urlMessage = new URLSearchParams(window.location.search);
const msg = urlMessage.get('msg');
if (msg) {
    document.getElementById('sucessBoxSignUp').innerHTML = msg;
}
