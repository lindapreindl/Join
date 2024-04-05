let users = [];
let rememberUser;
let loginUser = [];
let visible = false;
let showBox = false;

function initStart() {
  let animatedLogo = document.getElementById("startLogo");
  animatedLogo.style.animation = "animateLogo 2s ease-in-out 1s forwards";
  animatedLogo.onanimationend = () => {
    window.location.href = "login.html";
  };
}

async function initUsers() {
  loadUsers();
  rememberUser = localStorage.getItem("rememberUser");
  if (rememberUser) {
    document.getElementById("loginEmail").value = rememberUser;
  }
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.info("No users found.");
  }
}

async function signUpUser() {
  let name = document.getElementById('signupName');
  let email = document.getElementById('signupEmail');
  let password = document.getElementById('signupPassword');
  if (password.value == document.getElementById('signupConfirmPassword').value) {
    users.push({ name: name.value, email: email.value, phone: '', password: password.value, color: getColorForUser('') });
    await setItem('users', JSON.stringify(users));
    resetForm(name, email, password)
    window.location.href = 'login.html?msg=Sign up successful';
  } else { noMatchedPasswords() }
}

function noMatchedPasswords() {
  document.getElementById("signupConfirmPassword").style.borderColor = "#FD1E39";
  document.getElementById("passwordNoMatch").classList.remove("d-none");
}

function resetForm(name, email, password) {
  name.value = "";
  email.value = "";
  password.value = "";
  document.getElementById("signupConfirmPassword").value = "";
}

async function logInUser() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = users.find((u) => u.email == email.value && u.password == password.value);
  if (user) {
    if (document.getElementById("rememberMeCheck").checked == true) { 
      localStorage.setItem("rememberUser", email.value); 
      rememberUser = email.value;
    }
    await userLoggedIn(email.value);
    window.location.href = "summary.html?msg=Login successful";
  } else {
    wrongPassword();
  }
}

async function userLoggedIn(loginEmail) {
  let loginIndex = users.findIndex((user) => user.email === loginEmail);
  if (loginIndex >= 0) {
    loginUser[0] = users[loginIndex].name;
    loginUser[1] = getInitials(loginUser[0]);
    await setItem("loginUser", JSON.stringify(loginUser));
  }
}

async function guestLogin() {
  loginUser[0] = "";
  loginUser[1] = "G";
  await setItem("loginUser", JSON.stringify(loginUser));
}

function wrongPassword() {
  document.getElementById("loginPassword").style.borderColor = "#FD1E39";
  document.getElementById("wrongPassword").classList.remove("d-none");
}

function message() {
  const urlMessage = new URLSearchParams(window.location.search);
  const msg = urlMessage.get("msg");
  if (msg) {
    document.getElementById("sucessBoxSignUp").classList.remove("d-none");
    document.getElementById("sucessBoxSignUp").innerHTML = msg;
  }
}

function changePasswortIcon(value, location, inputID) {
  let symbol = document.getElementById(location);

  if (value == "unvisible") {
    symbol.src = "./img/visibility_off.png";
  }
  if (value == "visibility") {
    visible = !visible;
    if (visible) {
      symbol.src = "./img/visibility.png";
      document.getElementById(inputID).type = "text";
    }
    if (!visible) {
      symbol.src = "./img/visibility_off.png";
      document.getElementById(inputID).type = "password";
    }
  }
  if (value == "lock") {
    symbol.src = "./img/lock.png";
    document.getElementById(inputID).type = "password";
  }
}

function userMenu(location) {
  showBox = !showBox;
  let box = document.getElementById("userMenuBox" + location);
  if (showBox) {
    box.classList.remove("d-none");
  } else {
    box.classList.add("d-none");
  }
}

async function logout() {
  loginUser = [];
  await setItem("loginUser", JSON.stringify(loginUser));
}

async function initConsent(location) {
  await loadLoginUser();
  renderLoginUserName(location);
}

function changeChecker(location) {
  let check = document.getElementById(`${location}Check`);
  let checker = document.getElementById(`${location}Checker`);
  if (check.checked == false) {
    checker.src = './img/checked.png';
    check.checked = true;
  } else {
    checker.src = './img/unchecked.png';
    check.checked = false;
  }
}
