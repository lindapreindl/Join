// Array zum Speichern der Benutzerdaten
let users = [];
// Objekt zur Speicherung der Farben für jeden Benutzer
let userColors = {};

// Variable zur Speicherung des Overlay-Elements
let overlay;
const sampleUsers = [
  { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
  { name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567" },
  { name: "Bob Brown", email: "bob@example.com", phone: "444-555-6666" },
  { name: "Emily Davis", email: "emily@example.com", phone: "777-888-9999" },
  {
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "111-222-3333",
  },
  {
    name: "Samantha Martinez",
    email: "samantha@example.com",
    phone: "999-888-7777",
  },
  { name: "David Anderson", email: "david@example.com", phone: "444-333-2222" },
  { name: "Olivia Taylor", email: "olivia@example.com", phone: "666-777-8888" },
  { name: "James White", email: "james@example.com", phone: "222-333-4444" },
  { name: "Dodo Obe", email: "Obe@example.com", phone: "666-333-5544" },
];

// Hinzufügen der Beispieldaten zu den Benutzern
sampleUsers.forEach((user) => {
  users.push(user);
});

function init() {
  renderUsersInfo();
}

// Funktion zum Öffnen des Overlays
function openOverlay() {
  // Overlay erstellen
  createOverlay();

  // Overlay anzeigen
  overlay.style.display = "block";
}

// Funktion zum Erstellen des Overlays
function createOverlay() {
  // Overlay-Div erstellen
  overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "none"; // Overlay standardmäßig ausblenden

  // HTML-Inhalt für das Overlay
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

  // Overlay dem Dokument hinzufügen
  document.body.appendChild(overlay);
}

// Funktion zum Schließen des Overlays
function closeOverlay() {
  overlay.style.display = "none"; // Overlay ausblenden
}

// Funktion zum Hinzufügen eines neuen Benutzers
function addNewUser() {
  const name = document.getElementById("newUserName").value;
  const email = document.getElementById("newUserEmail").value;
  const phone = document.getElementById("newUserPhone").value;

  // Überprüfen, ob alle Felder ausgefüllt wurden
  if (name && email && phone) {
    // Neuen Benutzer erstellen
    const newUser = { name, email, phone };

    // Benutzer zum Array hinzufügen
    users.push(newUser);

    // Benutzerliste neu rendern
    renderUsersInfo();

    // Eingabefelder leeren
    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPhone").value = "";

    alert("User added successfully."); // Benutzer über erfolgreiche Hinzufügung informieren
  } else {
    alert("Please fill in all fields."); // Benutzer auffordern, alle Felder auszufüllen
  }
}

// Funktion zum Löschen eines Benutzers
function deleteUser(name) {
  // Benutzer anhand des Namens im Array finden und löschen
  const index = users.findIndex((user) => user.name === name);
  if (index !== -1) {
    users.splice(index, 1);
  }

  // Benutzerliste neu rendern
  renderUsersInfo();
}

// Funktion zum Löschen der Benutzerinfo im userInfo-Element
function clearUserInfo() {
  const userInfoElement = document.getElementById("userInfo");
  userInfoElement.innerHTML = ""; // Alle Inhalte löschen
}

/* ---------------------------------------------------- */

// Funktion zum Rendern der Benutzerliste
function renderUsersInfo() {
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
  for (const letter in groupedUsers) {
    const letterHeader = document.createElement("h2");
    letterHeader.textContent = letter;
    userListElement.appendChild(letterHeader);

    groupedUsers[letter].forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = user.name;
      listItem.style.listStyleType = "none"; // Benutzerliste ohne Bullets
      listItem.style.marginLeft = "20px"; // Einrückung für die Benutzernamen
      const initials = getInitials(user.name);
      const circle = createInitialsCircle(initials, userColors[user.name]);
      listItem.insertBefore(circle, listItem.firstChild); // Vorname und Nachname in kleinen Kreisen anzeigen

      listItem.addEventListener("click", () => renderUserInfo(user, index));
      userListElement.appendChild(listItem);

      // Linie nach jedem Benutzer hinzufügen
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

/* -------------------------------------------------- */

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

/* ----------------- */
// Funktion zum Erhalten der Initialen eines Benutzers
function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
}
