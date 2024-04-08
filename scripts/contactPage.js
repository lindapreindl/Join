// Array zum Speichern der Benutzerdaten
users = [];
// Objekt zur Speicherung der Farben für jeden Benutzer
let userColors = {};

// Variable zur Speicherung des Overlay-Elements
let overlay;

// Funktion zum Initialisieren der Anwendung; lädt Benutzerdaten und rendert die Benutzerinformationen
async function initContacts() {
  await loadUsers(); // Lade Benutzerdaten
  renderUsersList(); // Rendere Benutzerinformationen
  await loadLoginUser();
  renderLoginUserName("Contacts");
}

// Funktion zum Öffnen des Overlays
function openOverlay() {
  createOverlay(); // Erstelle das Overlay
  overlay.style.display = "block"; // Zeige das Overlay an

  // Benutzerinformationen extrahieren
  const firstUser = users[0]; // Hier wird das erste Element der Benutzerliste verwendet
  if (firstUser) {
    renderUserInfo(firstUser); // Benutzerinformationen rendern
  }
}
/* ---------------------- createOverlay() -------------------- */
// Funktion zum Erstellen des Overlays
function createOverlay() {
  overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "none";
  overlay.innerHTML = createOverlayContent();
  document.body.appendChild(overlay);
}

/* ---------------------- createOverlay() END -------------------- */

// Funktion zum Schließen des Overlays und Entfernen aus dem DOM
function closeOverlay() {
  overlay.style.display = "none";
  overlay.remove(); // Overlay aus dem DOM entfernen
}
// Funktion zum Generieren einer eindeutigen Farbe für einen neuen Benutzer
function generateUniqueColor() {
  // Array mit allen verfügbaren Farben
  const allColors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#9AECDB",
    "#A3E4D7",
    "#85C1E9",
    "#A569BD",
    "#F1948A",
    "#B2BABB",
    "#F0B27A",
  ];

  // Array mit den Farben, die bereits von Benutzern verwendet werden
  const usedColors = Object.values(userColors);

  // Filtere die verfügbaren Farben und entferne die, die bereits verwendet werden
  const availableColors = allColors.filter(
    (color) => !usedColors.includes(color)
  );

  // Wähle eine zufällige verfügbare Farbe aus
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return randomColor;
}

// Funktion zum Hinzufügen eines neuen Benutzers
async function addNewUser() {
  // Die Werte aus den Eingabefeldern für Name, E-Mail und Telefonnummer abrufen
  const name = document.getElementById("newUserName").value;
  const email = document.getElementById("newUserEmail").value;
  const phone = document.getElementById("newUserPhone").value;

  /* NEU 1 */
  const password = ""; // Ein leeres Passwort wird vorerst definiert
  const color = generateUniqueColor();

  // Überprüfen, ob alle Felder ausgefüllt sind
  if (name && email && phone) {
    // Wenn alle Felder ausgefüllt sind, ein neues Benutzerobjekt erstellen
    const newUser = { name, email, phone, password, color };

    // Das neue Benutzerobjekt dem 'users'-Array hinzufügen
    users.push(newUser);
    /* NEU 1 END */

    // Benutzerdaten speichern und auf Abschluss warten
    await saveUsers();

    // Die Benutzerinformationen erneut rendern

    renderUsersList();

    // Die Werte der Eingabefelder zurücksetzen
    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPhone").value = "";

    window.location.href = "contactPage.html?msg=User added successfully.";
  } else {
    window.location.href = "contactPage.html?msg=Please fill in all fields.";
  }
}

// Funktion zum Löschen eines Benutzers
async function deleteUser(name) {
  const index = users.findIndex((user) => user.name === name);
  if (index !== -1) {
    users.splice(index, 1);
  }
  await saveUsers(); // Benutzerdaten speichern

  renderUsersList(); //Funktion zum Rendern der Benutzerliste
}

// Funktion zum Löschen der Benutzerinfo im userInfo-Element
function clearUserInfo() {
  const userInfoElement = document.getElementById("userInfo");
  userInfoElement.innerHTML = "";
}

// Funktion zum Rendern der Benutzerliste
async function renderUsersList() {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = "";

  // Benutzerliste alphabetisch sortieren
  users.sort((a, b) => a.name.localeCompare(b.name));

  // Benutzer nach Anfangsbuchstaben gruppieren
  const groupedUsers = groupUsersByFirstLetter(users);

  // Farben für jeden Benutzer generieren und speichern
  assignUserColors(groupedUsers);

  // Benutzerliste rendern
  renderGroupedUsers(userListElement, groupedUsers);
}

// Funktion zum Gruppieren von Benutzern nach dem ersten Buchstaben ihres Namens
function groupUsersByFirstLetter(users) {
  const groupedUsers = {};
  users.forEach((user) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    if (!(firstLetter in groupedUsers)) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });
  return groupedUsers;
}

// Funktion zum Zuweisen von Farben für jeden Benutzer
function assignUserColors(groupedUsers) {
  Object.keys(groupedUsers).forEach((letter) => {
    groupedUsers[letter].forEach((user) => {
      userColors[user.name] = getColorForUser(user.name);
    });
  });
}

// Funktion zum Rendern der gruppierten Benutzerliste
function renderGroupedUsers(userListElement, groupedUsers) {
  for (const letter in groupedUsers) {
    const usersStartingWithLetter = groupedUsers[letter];

    // Überschrift für den Buchstaben erstellen
    const letterHeader = document.createElement("h2");
    letterHeader.textContent = letter;
    userListElement.appendChild(letterHeader);

    // Benutzerliste für den aktuellen Buchstaben rendern
    usersStartingWithLetter.forEach((user) => {
      renderUser(userListElement, user);
    });
  }
}

let clickedUserItem = null; // Variable, um die zuletzt geklickte Zeile zu verfolgen
// Funktion zum Rendern eines einzelnen Benutzers
function renderUser(userListElement, user) {
  // Erstellen des <li>-Elements für den Benutzer
  const userListItem = createUserListItem(user);
  userListElement.appendChild(userListItem);
}

function createUserListItem(user) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("user-list-item"); // Füge die Klasse "user-list-item" hinzu

  // Benutzernamen rendern
  const userNameListItem = createUserNameListItem(user.name, user); // Erstelle das Listenelement für den Benutzernamen
  userListItem.appendChild(userNameListItem); // Füge das Benutzernamen-Listenelement dem Benutzer-Listenelement hinzu

  // E-Mail rendern
  userListItem.appendChild(createUserEmailListItem(user.email)); // Füge das Listenelement für die E-Mail hinzu

  // Horizontale Linie rendern
  userListItem.appendChild(createHorizontalLine()); // Füge eine horizontale Linie hinzu, um Benutzer zu trennen

  // Event-Listener für den Hover-Effekt hinzufügen
  addHoverEffect(userListItem);

  // Event-Listener für den Klick-Effekt hinzufügen
  addClickEffect(userListItem);

  return userListItem;
}

function addHoverEffect(element) {
  element.addEventListener("mouseover", () => {
    element.classList.add("hover-effect"); // Füge "hover-effect" beim Überfahren hinzu
  });
  element.addEventListener("mouseout", () => {
    if (element !== clickedUserItem) {
      element.classList.remove("hover-effect"); // Entferne "hover-effect", wenn der Mauszeiger das Element verlässt
    }
  });
}

function addClickEffect(element) {
  element.addEventListener("click", () => {
    if (clickedUserItem && clickedUserItem !== element) {
      clickedUserItem.classList.remove("hover-farbe", "hover-effect"); // Entferne den Effekt von der zuvor geklickten Zeile
    }
    element.classList.add("hover-farbe", "hover-effect"); // Füge den Effekt zur neu geklickten Zeile hinzu
    clickedUserItem = element; // Aktualisiere die zuletzt geklickte Zeile
  });
}

/* --------------------------------------------------------------- */

// Funktion zum Erstellen eines Listenelements für den Benutzernamen
let previousUserNameItem = null; // Variable, um den vorherigen geklickten Benutzernamen zu verfolgen
// Funktion zum Erstellen eines Listenelements für den Benutzernamen
function createUserNameListItem(name, user) {
  const userNameListItem = document.createElement("li");
  userNameListItem.textContent = name;
  userNameListItem.style =
    "list-style-type: none; margin-left: 20px; cursor: pointer;";
  userNameListItem.addEventListener("click", () => {
    if (previousUserNameItem) previousUserNameItem.style.color = "";
    userNameListItem.style.color = "white";
    previousUserNameItem = userNameListItem;
    renderUserInfo(user);
  });
  const initials = getInitials(name);
  userNameListItem.insertBefore(
    createInitialsCircle(initials, userColors[name]),
    userNameListItem.firstChild
  );
  return userNameListItem;
}
/* ------------------------------------------------------------------ */
// Funktion zum Erstellen eines Listenelements für die E-Mail
function createUserEmailListItem(email) {
  // Listenelement für die E-Mail erstellen
  const emailListItem = document.createElement("li");
  emailListItem.textContent = email;
  emailListItem.style.listStyleType = "none";
  emailListItem.style.marginLeft = "70px";
  emailListItem.style.color = "rgb(128, 189, 246)";
  return emailListItem;
}

// Funktion zum Hinzufügen von mehreren Elementen zu einem übergeordneten Element
function appendElements(parentElement, elements) {
  elements.forEach((element) => {
    parentElement.appendChild(element);
  });
}

// Funktion zum Erstellen einer horizontalen Linie
function createHorizontalLine() {
  return document.createElement("hr");
}

/* ------------------------- Benutzerliste End ------------------------------- */

// Funktion zum Generieren einer Farbe basierend auf dem Benutzernamen
function getColorForUser(username) {
  // Berechne einen numerischen Hash-Wert aus dem Benutzernamen
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Konvertiere den Hash-Wert in eine hexadezimale Farbe
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

// Funktion zum Erstellen eines Kreises für die Initialen mit angegebener Farbe
function createInitialsCircle(initials, color) {
  const circle = document.createElement("div");
  circle.className = "initials-circle";
  circle.textContent = initials;
  circle.style.backgroundColor = color; // Angegebene Farbe verwenden
  circle.style.color = "white"; // Schriftfarbe auf Weiß setzen
  return circle;
}

// Funktion zum Generieren einer Farbe basierend auf dem Benutzernamen
function getColorForUser(username) {
  // Sicherstellen, dass der Benutzername vorhanden ist
  if (!username) {
    return "#000000"; // Rückgabe einer Standardfarbe, wenn kein Benutzername angegeben ist
  }

  // Berechne einen numerischen Hash-Wert aus dem Benutzernamen
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Konvertiere den Hash-Wert in eine hexadezimale Farbe
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
/* --------------------test heute---------------------- */
// Funktion zum Rendern der Benutzerinformationen mit Bearbeitungsfunktion
function renderUserInfo(user) {
  document.getElementById("userInfo").style = "z-index: 2";
  const contactIndex = users.findIndex((contact) => contact.name === user.name);
  const userInfoElement = document.getElementById("userInfo");
  userInfoElement.innerHTML = createUserInfoHTML(user, contactIndex);
}
/* function createUserInfoHTML(user, contactIndex) {
  return `
    <div class="overlay-content2">
      <div class="contact-popup-left">
        <img src="./img/logo_white.png" alt="" />
        <h1>Edit contact</h1>
        <h3>Tasks are better with a Team!</h3>
        <div class="blue-line-add-Contact"></div>
      </div>
      <div class="initialsEdit">
        <div class="initials-circle-info" style="background-color: ${
          userColors[user.name]
        }; color: white;">
          ${getInitials(user.name)}
        </div>
      </div>
      <div class="editUserDaten">
        <div class="imgClose" onclick="closeOverlay()">
          <img src="./img/close.png" alt="" />
        </div>
        <div class="center">
          <input class="iconPerson" type="text" id="editUserName" placeholder="Name" value="${
            user.name
          }" required />
          <input class="iconMail" type="email" id="editUserEmail" placeholder="E-Mail" value="${
            user.email
          }" required />
          <input class="iconCall" type="text" id="editUserPhone" placeholder="Telefon" value="${
            user.phone
          }" required />
          <input class="iconLock" type="password" id="editUserPassword" placeholder="new Password" required />
          <div class="delete-save-btn">
            <button class="delete-btn" onclick="deleteUser('${
              user.name
            }'), clearUserInfo()">Delete</button>
            <button class="save-btn" onclick="editUser(${contactIndex})">Save <img class="imgCheck" src="./img/check.png" alt="" /></button>
          </div>
        </div>
      </div>
    </div>
  `;
}
 */
/* -------------------------------------------- */

function goBackToUserList() {
  document.getElementById("userInfo").style = "z-index: 0";
}

// Funktion zum Öffnen des Overlays für die Bearbeitung eines Benutzers
function openEditOverlay(index) {
  const user = users[index]; // Benutzer aus dem Index erhalten
  createEditOverlay(user, index); // Übergebe den Benutzer und den Index an die createEditOverlay-Funktion
  overlay.style.display = "block"; // Overlay anzeigen
}

/* ------------------------ createEditOverlay  --------------------------------- */
// Funktion zum Erstellen des Overlays für die Bearbeitung eines Benutzers
function createEditOverlay(user, index) {
  // Sicherstellen, dass vorherige Overlay-Instanz entfernt wird, falls vorhanden
  if (overlay) {
    overlay.remove();
  }

  // Eindeutige ID für das Overlay erstellen
  const overlayId = "editOverlay";

  overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.id = overlayId; // Eindeutige ID für das Overlay setzen
  overlay.style.display = "none";
  overlay.innerHTML = templateEditOverlay(user, index);

  document.body.appendChild(overlay);
}

// Funktion zum Speichern der Benutzerdaten im lokalen Speicher
async function saveUsers() {
  await setItem("users", JSON.stringify(users));
}

async function loadUsers() {
  const usersData = await getItem("users");
  if (usersData) {
    users = JSON.parse(usersData);

    // Sichern Sie die Werte von password und color, falls vorhanden
    if (users.length > 0) {
      passwordBackup = users[0].password || "";
      colorBackup = users[0].color || "";
    }
  } else {
    users = [];
    await saveUsers(); // Speichere die Beispieldaten
  }
}

// Funktion zum Bearbeiten eines Benutzers
async function editUser(index) {
  const name = document.getElementById("editUserName").value;
  const email = document.getElementById("editUserEmail").value;
  const phone = document.getElementById("editUserPhone").value;
  const password = document.getElementById("editUserPassword").value;

  if (name && email && phone) {
    const editedUser = await getUserData(name, email, phone, password, index);
    if (editedUser) {
      updateUserList(editedUser, index);
      closeOverlay();
      window.location.href = "contactPage.html?msg=User updated successfully.";
    } else {
      window.location.href = "contactPage.html?msg=Failed to update user.";
    }
  } else {
    alert("Please fill in all fields.");
  }
}

function messageContacts() {
  const urlMessage = new URLSearchParams(window.location.search);
  const msg = urlMessage.get("msg");
  if (msg) {
    document.getElementById("sucessBoxContacts").classList.remove("d-none");
    document.getElementById("sucessBoxContacts").innerHTML = msg;
  }
}

async function getUserData(name, email, phone, password, index) {
  const currentUser = users[index];
  const color = currentUser.color;
  const currentPassword = currentUser.password || "";
  const newPassword = password || currentPassword;

  return { name, email, phone, password: newPassword, color };
}

function updateUserList(editedUser, index) {
  users[index] = editedUser;
  saveUsers();
  renderUsersList();
}

// Funktion zum Erhalten der Initialen eines Benutzers
function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
}
