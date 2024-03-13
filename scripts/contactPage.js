// Array zum Speichern der Benutzerdaten
users = [];
// Objekt zur Speicherung der Farben für jeden Benutzer
let userColors = {};
// Variable zur Speicherung des Overlay-Elements
let overlay;

// Beispielnutzerdaten
const sampleUsers = [
  { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
];
// Überprüfung, ob das Benutzerarray leer ist; wenn ja, füge Beispielnutzer hinzu
if (users.length === 0) {
  sampleUsers.forEach((user) => {
    users.push(user);
  });
}

// Funktion zum Initialisieren der Anwendung; lädt Benutzerdaten und rendert die Benutzerinformationen
async function initContacts() {
  await loadUsers(); // Lade Benutzerdaten
  renderUsersInfo(); // Rendere Benutzerinformationen
}

// Funktion zum Öffnen des Overlays
function openOverlay() {
  createOverlay(); // Erstelle das Overlay
  overlay.style.display = "block"; // Zeige das Overlay an
}

// Funktion zum Erstellen des Overlays
function createOverlay() {
  overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "none";
  overlay.innerHTML = `
    <div class="overlay-content">
      <h2>Add New User</h2>
      <input type="text" id="newUserName" placeholder="Name" required><br><br>
      <input type="email" id="newUserEmail" placeholder="Email" required><br><br>
      <input type="text" id="newUserPhone" placeholder="Phone" required><br><br>
      <button onclick="addNewUser()">Add User</button>
      <button onclick="closeOverlay()">Cancel</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Funktion zum Schließen des Overlays
function closeOverlay() {
  overlay.style.display = "none";
}

// Funktion zum Hinzufügen eines neuen Benutzers
async function addNewUser() {
  // Die Werte aus den Eingabefeldern für Name, E-Mail und Telefonnummer abrufen
  const name = document.getElementById("newUserName").value;
  const email = document.getElementById("newUserEmail").value;
  const phone = document.getElementById("newUserPhone").value;
  const password = ""; // Ein leeres Passwort wird vorerst definiert

  // Überprüfen, ob alle Felder ausgefüllt sind
  if (name && email && phone) {
    // Wenn alle Felder ausgefüllt sind, ein neues Benutzerobjekt erstellen
    const newUser = { name, email, phone };

    // Das neue Benutzerobjekt dem 'users'-Array hinzufügen
    users.push(newUser);

    // Benutzerdaten speichern und auf Abschluss warten
    await saveUsers();

    // Die Benutzerinformationen erneut rendern
    renderUsersInfo();

    // Die Werte der Eingabefelder zurücksetzen
    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPhone").value = "";

    // Benachrichtigung anzeigen, dass der Benutzer erfolgreich hinzugefügt wurde
    alert("User added successfully.");
  } else {
    // Falls nicht alle Felder ausgefüllt sind, eine Benachrichtigung anzeigen
    alert("Please fill in all fields.");
  }
}

// Funktion zum Löschen eines Benutzers
function deleteUser(name) {
  const index = users.findIndex((user) => user.name === name);
  if (index !== -1) {
    users.splice(index, 1);
  }
  saveUsers(); // Benutzerdaten speichern
  renderUsersInfo(); //Funktion zum Rendern der Benutzerliste
}

// Funktion zum Löschen der Benutzerinfo im userInfo-Element
function clearUserInfo() {
  const userInfoElement = document.getElementById("userInfo");
  userInfoElement.innerHTML = "";
}

// Funktion zum Rendern der Benutzerliste
async function renderUsersInfo() {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = ""; // Vorherigen Inhalt löschen
  // Benutzerliste alphabetisch sortieren
  users.sort((a, b) => a.name.localeCompare(b.name));
  // Objekt erstellen, um Benutzer nach Anfangsbuchstaben zu gruppieren
  const groupedUsers = {};
  users.forEach((user) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    if (!(firstLetter in groupedUsers)) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });
  // Farben für jeden Benutzer generieren und speichern
  Object.keys(groupedUsers).forEach((letter) => {
    groupedUsers[letter].forEach((user) => {
      if (!userColors[user.name]) {
        userColors[user.name] = getRandomColor();
      }
    });
  });
  // Für jeden Anfangsbuchstaben eine Überschrift und die Benutzerliste anzeigen
  // Iteriere durch jeden Anfangsbuchstaben (letter) im groupedUsers-Objekt
  for (const letter in groupedUsers) {
    // Erstelle ein <h2>-Element für den Buchstaben
    const letterHeader = document.createElement("h2");
    letterHeader.textContent = letter;
    userListElement.appendChild(letterHeader);

    // Iteriere durch jeden Benutzer im aktuellen Buchstaben
    groupedUsers[letter].forEach((user, index) => {
      // Erstelle ein <li>-Element für den Benutzernamen
      const listItem = document.createElement("li");
      listItem.textContent = user.name;
      listItem.style.listStyleType = "none"; // Entferne Aufzählungspunkte
      listItem.style.marginLeft = "20px"; //Einrückung für die Benutzernamen

      // Erstelle ein Kreis-Element für die Initialen des Benutzers
      const initials = getInitials(user.name);
      const circle = createInitialsCircle(initials, userColors[user.name]);
      listItem.insertBefore(circle, listItem.firstChild); // Vorname und Nachname in kleinen Kreisen anzeigen

      // Füge einen Event-Listener hinzu, der auf Klick reagiert und die Benutzerinformationen rendert
      listItem.addEventListener("click", () => renderUserInfo(user, index));

      // Füge das <li>-Element zur Benutzerliste hinzu
      userListElement.appendChild(listItem);

      // Füge eine horizontale Linie nach jedem Benutzer hinzu
      const line = document.createElement("hr");
      userListElement.appendChild(line);
    });
  }
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

// Funktion zum Generieren einer zufälligen Farbe
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/* // Funktion zum Rendern der Benutzerinfo beim Klick auf einen Benutzer
function renderUserInfo(user, index) {
  openOverlay();

  document.getElementById("editUserName").value = user.name;
  document.getElementById("editUserEmail").value = user.email;
  document.getElementById("editUserPhone").value = user.phone;
  const userInfoElement = document.getElementById("userInfo");

  userInfoElement.innerHTML = /* HTML * `
    <div class="frame40"><img src="/img/Contacts.png" alt="" /></div>
    <div class="circle2-user">
      <div
        class="initials-circle-info"
        style="background-color: ${userColors[user.name]}; color: white;"
      >
        ${getInitials(user.name)}
      </div>
      <div class="user-name-info">
        <p>${user.name}</p>
        <div>
          <img class="img-edit" src="./img/edit.png" alt="" />
          <img
            class="img-delete"
            onclick="deleteUser('${user.name}'), clearUserInfo()"
            src="./img/Delete contact.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div>
      <h2>Contact Information</h2>
      <div class="user-mail-info">
        <h5>Email</h5>
        <a href="#">${user.email}</a>
      </div>
      <div>
        <h5>Phone</h5>
        <span>${user.phone}</span>
      </div>
    </div>

    <hr />
  `;
} */
// Funktion zum Rendern der Benutzerinformationen
function renderUserInfo(user, index) {
  const userInfoElement = document.getElementById("userInfo");
  // Benutzerinformationen rendern
  userInfoElement.innerHTML = /* HTML */ `
    <div class="frame40"><img src="/img/Contacts.png" alt="" /></div>
    <div class="circle2-user">
      <div
        class="initials-circle-info"
        style="background-color: ${userColors[user.name]}; color: white;"
      >
        ${getInitials(user.name)}
      </div>
      <div class="user-name-info">
        <p>${user.name}</p>
        <div>
          <img class="img-edit" src="./img/edit.png" alt="" />
          <img
            class="img-delete"
            onclick="deleteUser('${user.name}'), clearUserInfo()"
            src="./img/Delete contact.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div>
      <h2>Contact Information</h2>
      <div class="user-mail-info">
        <h5>Email</h5>
        <a href="#">${user.email}</a>
      </div>
      <div>
        <h5>Phone</h5>
        <span>${user.phone}</span>
      </div>
    </div>
    <!--  -->

    <!-- Löschen-Button hinzufügen -->
    <hr />
  `;
}

// Funktion zum Bearbeiten eines Benutzers
async function editUser() {
  const name = document.getElementById("editUserName").value;
  const email = document.getElementById("editUserEmail").value;
  const phone = document.getElementById("editUserPhone").value;

  if (name && email && phone) {
    const editedUser = { name, email, phone };
    users[index] = editedUser;

    saveUsers();

    renderUsersInfo();

    closeOverlay();

    alert("User updated successfully.");
  } else {
    alert("Please fill in all fields.");
  }
}

// Funktion zum Speichern der Benutzerdaten im lokalen Speicher
async function saveUsers() {
  await setItem("users", JSON.stringify(users));
}
// Funktion zum Laden der Benutzerdaten aus dem lokalen Speicher
async function loadUsers() {
  const usersData = await getItem("users");
  if (usersData) {
    users = JSON.parse(usersData);
  } else {
    users = [];
  }
}

// Funktion zum Erhalten der Initialen eines Benutzers
function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
}

/* --------------------------- */
