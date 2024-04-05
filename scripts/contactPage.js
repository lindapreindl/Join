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
  renderLoginUserName('Contacts');
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

// Funktion zum Erstellen des Overlays
function createOverlay() {
  overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "none";
  overlay.innerHTML = templateAddContact();
  document.body.appendChild(overlay);
}

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

    // Benachrichtigung anzeigen, dass der Benutzer erfolgreich hinzugefügt wurde
    alert("User added successfully.");
  } else {
    // Falls nicht alle Felder ausgefüllt sind, eine Benachrichtigung anzeigen
    alert("Please fill in all fields.");
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
      userColors[user.name] = getColorForUser(user.name);
    });
  });
  // Für jeden Anfangsbuchstaben eine Überschrift und die Benutzerliste anzeigen
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
      listItem.addEventListener("click", () => renderUserInfo(user));

      // Füge das <li>-Element für den Benutzernamen zur Benutzerliste hinzu
      userListElement.appendChild(listItem);

      // Erstelle ein <li>-Element für die E-Mail
      const emailListItem = document.createElement("li");
      emailListItem.textContent = user.email;
      emailListItem.style.listStyleType = "none"; // Entferne Aufzählungspunkte
      emailListItem.style.marginLeft = "70px"; // Einrückung für die E-Mail
      emailListItem.style.color = "rgb(128, 189, 246)"; // Setze die Schriftfarbe auf die angegebene RGB-Farbe

      // Füge das <li>-Element für die E-Mail zur Benutzerliste hinzu
      userListElement.appendChild(emailListItem);

      // Füge eine horizontale Linie nach jedem Benutzer hinzu
      const line = document.createElement("hr");
      userListElement.appendChild(line);
    });
  }
}

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
/* ---------------test */

/* ------------- */

// Funktion zum Rendern der Benutzerinformationen mit Bearbeitungsfunktion
function renderUserInfo(user) {
  document.getElementById('userInfo').style = 'z-index: 2';
  let contactName = user.name;
  let contactIndex = users.findIndex((contact) => contact.name === contactName);
  const userInfoElement = document.getElementById("userInfo");
  // Benutzerinformationen rendern
  userInfoElement.innerHTML = templateRenderUserInfo(user, contactIndex);
}

function goBackToUserList(){
  document.getElementById('userInfo').style = 'z-index: 0';
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
  overlay.innerHTML = templateCreateEditOverlay(user, index);

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
  const password = document.getElementById("editUserPassword").value; // Passwort abrufen

  if (name && email && phone) {
    // Farbe des aktuellen Benutzers erhalten
    const currentUser = users[index];
    const color = currentUser.color;

    // Passwort des aktuellen Benutzers erhalten (falls vorhanden)
    const currentPassword = currentUser.password || "";

    // Neues Passwort hinzufügen, wenn keines vorhanden ist
    const newPassword = password || currentPassword;

    const editedUser = { name, email, phone, password: newPassword, color };
    users[index] = editedUser;

    await saveUsers();

    renderUsersList();

    closeOverlay();

    alert("User updated successfully.");
  } else {
    alert("Please fill in all fields.");
  }
}

// Funktion zum Erhalten der Initialen eines Benutzers
function getInitials(name) {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
}
