function templateTasksInBoard(i, categoryColor, subtasks, prio) {
    return `
    <div draggable="true" ondragstart="startDragging(${i}), rotateBox(${i})" class="popUpBox widthTaskBox" id="task${i}" onclick="openTaskDetails(${i})">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
        </div>
        <h3 class="mb12">${tasks[i].titel}</h3>
        <p class="mb24 fontLightgrey">${tasks[i].description}</p>
        <div id="taskProgress${i}" class="w100 d-flex align-center justify-between mb24">
            <progress value="${currentSubtaskProgress}" max="100"></progress>
            <p style="font-size:12px;">${currentSubtaskDone}/${subtasks} Subtasks</p>
        </div>
        <div class="d-flex justify-between align-center w100">
            <div id="assign${i}" class="d-flex"></div>
            <div><img class="prioItem" src="../img/${prio}"></div>
        </div>
    </div>
    `
}

function templateFoundTasksInBoard(i) {
    return `
    <div draggable="true" ondragstart="startDragging(${i}), rotateBox(${i})" class="popUpBox widthTaskBox" id="task${i}" onclick="openTaskDetails(${i})">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
        </div>
        <h3 class="mb12">${tasks[i].titel}</h3>
        <p class="mb24 fontLightgrey">${tasks[i].description}</p>
        <div id="taskProgress${i}" class="w100 d-flex align-center justify-between mb24">
            <progress value="${currentSubtaskProgress}" max="100"></progress>
            <p style="font-size:12px;">${currentSubtaskDone}/${currentSubtasks} Subtasks</p>
        </div>
        <div class="d-flex justify-between align-center w100">
            <div id="assign${i}" class="d-flex"></div>
            <div><img class="prioItem" src="../img/${prio}"></div>
        </div>
    </div>
    `
}

function noTasksPlaced(process) {
    return `
    <div class="emptyTask fontLightgrey">No tasks ${process}</div>
    `;
}

function templateTasksAssignedStaff(i, initials, bgColor) {
    return `<div class="assigneInitials" style="background-color:${bgColor};">${initials}</div>`;
}

function templateTaskDetails(i, categoryColor, subtasks, prio, prioWritten) {
    return `
    <div class="widthTaskDetails" id="taskDetails">
        <div class="categoryLine">
            <div class="categoryBox" style="background-color:${categoryColor}">${tasks[i].category}</div>
            <div><img src="../img/close.png" onclick="closeTaskDetails()"></div>
        </div>
        <div class="mb12 fontTitle">${tasks[i].titel}</div>
        <p class="mb24">${tasks[i].description}</p>
        <div class="w100 d-flex mb24">
            <div class="w150px"><p class="fontDarkGrey">Due Date:</p></div>
            <p>${tasks[i].dueDate}</p>
        </div>
        <div class="w100 d-flex mb24 align-center">
            <div class="w150px"><p class="fontDarkGrey">Priority:</p></div>
            <p class="mr8">${prioWritten}</p>
            <div class="d-flex align-center"><img class="prioItem" src="../img/${prio}"></div>
        </div>
        <div class="w100">
            <p class="fontDarkGrey mb12">Assigned To:</p>
            <div id="assignDetails"></div>
        </div>
        <div class="w100">
            <p class="fontDarkGrey mb12">Subtasks</p>
            <div id="subtasksDetails" class="subtasksDetails mb24"></div>
        </div>
        <div class="w100 d-flex mb24 justify-end">
            <div onclick="deleteTask(${i})" class="d-flex ml align-center detailsButton widthFixed"><img class="mr8" src="../img/delete.png" onmouseover="this.src='./img/deleteHover.png';" onmouseout="this.src='./img/delete.png';"></div>
            <div id="btnEditBig" onclick="editTask(${i}, 'IB')" class="btnEditBig ml align-center detailsButton widthFixed"><img class="mr8" src="../img/edit.png" onmouseover="this.src='./img/editHover.png';" onmouseout="this.src='./img/edit.png';"></div>
        </div>
    </div>
    `;
}


function templateAssignedPeople(i, j, template) {
    return `
        <div class="d-flex align-center ml mb12">
            <div class="mr8">${template}</div>
            <p>${tasks[i].assigned[j]}</p>
        </div>`;
}

function templateShowDetailsSubtasks(i, j, status) {
    return `
        <div class="d-flex align-center ml hover">
            <div class="mr24 clickfinger"><img src="${status}" onclick="changeBoolean(${i}, ${j})"></div>
            <div>${tasks[i].subtasks[j].subtask}</div>
        </div>`
}

function templateUserListInDropDown(i, initialColor, initials, me, checkValue, bgColor, location) {
    return `
    <div id="userDropDown${i}" class="userInDropDown" onclick="changeCheckerAssignedTo('${i}', '${location}')" style="background-color: ${bgColor};">
        <div class="userInDropDown">
            <div class="assigneListing" style="background-color:${initialColor};">${initials}</div>
            <p>${users[i].name}${me}</p>
        </div>
        <img id="userListChecker${location}${i}" src="${checkValue}">
    </div>`;
}

function templateAddContact() {
    return `<div class="overlay-content1">
    <div class="contact-popup-left">
      <img src="./img/logo_white.png" alt="" />
      <h1>Add contact</h1>
      <h3>Tasks are better with a Team!</h3>
      <div class="blue-line-add-Contact"></div>
    </div>
    <div class="addPersonPic"><img src="./img/addPerson.png" alt="" /></div>

    <div class="addUserDaten">
      <div class="imgClose" onclick="closeOverlay()">
        <img src="./img/close.png" alt="" />
      </div>
      <div class="center">
        <input
          class="iconPerson"
          type="text"
          id="newUserName"
          placeholder="Name"
          required
        />

        <input
          class="iconMail"
          type="email"
          id="newUserEmail"
          placeholder="Email"
          required
        />

        <input
          class="iconCall"
          type="text"
          id="newUserPhone"
          placeholder="Phone"
          required
        />

        <div class="cancel-createContact-btn ">
          <button class="cancel-btn" onclick="closeOverlay()">
            Cancel <img class="imgCancel" src="./img/cancel.png" alt="" />
          </button>
          <button onclick="addNewUser()" class="check-btn ">
            Create contact
            <img class="imgCheck" src="./img/check.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
`;
}

function templateRenderUserInfo(user, contactIndex) {
    return `
    <div class="headlineUserInfo">
      <h1>Contacts</h1>
      <div class="blueLineUserInfo"></div>
      <h2>Better with a team</h2>
    </div>
    <img class="back-to-contacts" onclick="goBackToUserList()" src="../img/arrowLeft.png" alt="">
    <div class="userInfo-div">
      <div class="circle2-user">
        <div
          class="initials-circle-info"
          style="background-color: ${userColors[user.name]}; color: white;"
        >
          ${getInitials(user.name)}
        </div>
        <div>
          <p class="user-name-info">${user.name}</p>
          <div class="img-info-edit-delete">
            <img
              class="img-edit"
              onclick="openEditOverlay(${contactIndex})"
              src="./img/edit.png"
              alt=""
            />
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
      <div class="user-info-contactInformation">
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
    </div>
  `;
}

function templateCreateEditOverlay(user, index) {
    return `
    <div class="overlay-content2">
      <div class="contact-popup-left">
        <img src="./img/logo_white.png" alt="" />
        <h1>Edit contact</h1>
        <h3>Tasks are better with a Team!</h3>
        <div class="blue-line-add-Contact"></div>
      </div>
      <div class="initialsEdit">
        <div
          class="initials-circle-info"
          style="background-color: ${userColors[user.name]}; color: white;"
        >
          ${getInitials(user.name)}
        </div>
      </div>
      <div class="editUserDaten">
        <div class="imgClose" onclick="closeOverlay()">
          <img src="./img/close.png" alt="" />
        </div>
        <div class="center">
          <input
            class="iconPerson"
            type="text"
            id="editUserName"
            placeholder="Name"
            value="${user.name}"
            required
          />

          <input
            class="iconMail"
            type="email"
            id="editUserEmail"
            placeholder="E-Mail"
            value="${user.email}"
            required
          />

          <input
            class="iconCall"
            type="text"
            id="editUserPhone"
            placeholder="Telefon"
            value="${user.phone}"
            required
          />

          <input
            class="iconLock"
            type="password"
            id="editUserPassword"
            placeholder="new Password"
            required
          />

          <!-- Passwort-Eingabe hinzugefügt -->
          <div class="delete-save-btn">
            <button
              class="delete-btn"
              onclick="deleteUser('${user.name}'), clearUserInfo()"
            >
              Delete
            </button>
            <button class="save-btn" onclick="editUser(${index})">
              Save <img class="imgCheck" src="./img/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createOverlayContent() {
    return /* HTML */ `
      <div class="overlay-content1">
        ${createContactPopupLeft()}
        <div class="addPersonPic"><img src="./img/addPerson.png" alt="" /></div>
        ${createAddUserDaten()}
      </div>
    `;
  }
  
  function createContactPopupLeft() {
    return /* HTML */ `
      <div class="contact-popup-left">
        <img src="./img/logo_white.png" alt="" />
        <h1>Add contact</h1>
        <h3>Tasks are better with a Team!</h3>
        <div class="blue-line-add-Contact"></div>
      </div>
    `;
  }
  
  function createAddUserDaten() {
    return /* HTML */ `
      <div class="addUserDaten">
        <div class="imgClose" onclick="closeOverlay()">
          <img src="./img/close.png" class="closeIcon" alt="" />
        </div>
        <div class="center">
          <input
            class="iconPerson"
            type="text"
            id="newUserName"
            placeholder="Name"
            required
          />
          <input
            class="iconMail"
            type="email"
            id="newUserEmail"
            placeholder="Email"
            required
          />
          <input
            class="iconCall"
            type="text"
            id="newUserPhone"
            placeholder="Phone"
            required
          />
          <div class="cancel-createContact-btn ">
            <button class="cancel-btn" onclick="closeOverlay()">
              Cancel <img class="imgCancel" src="./img/cancel.png" alt="" />
            </button>
            <button onclick="addNewUser()" class="check-btn ">
              Create contact
              <img class="imgCheck" src="./img/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function createUserInfoHTML(user, contactIndex) {
    return /* HTML */ `
      <div class="headlineUserInfo">
        <h1>Contacts</h1>
        <div class="blueLineUserInfo"></div>
        <h2>Better with a team</h2>
      </div>
      <div class="userInfo-div">
        ${createCircleUserInfo(user, contactIndex)}
        ${createContactInformation(user)}
      </div>
    `;
  }
  
  function createCircleUserInfo(user, contactIndex) {
    return /* HTML */ `
      <div class="circle2-user">
        <div
          class="initials-circle-info"
          style="background-color: ${userColors[user.name]}; color: white;"
        >
          ${getInitials(user.name)}
        </div>
        <div>
          <p class="user-name-info">${user.name}</p>
          <div class="img-info-edit-delete">
            <img
              class="img-edit"
              onclick="openEditOverlay(${contactIndex})"
              src="./img/edit.png"
              alt=""
            />
            <img
              class="img-delete"
              onclick="deleteUser('${user.name}'), clearUserInfo()"
              src="./img/Delete contact.png"
              alt=""
            />
          </div>
        </div>
      </div>
    `;
  }
  
  function createContactInformation(user) {
    return /* HTML */ `
      <div class="user-info-contactInformation">
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
    `;
  }
  
  function templateEditOverlay(user, index) {
    return `
    <div class="overlay-content2">
      <div class="contact-popup-left">
        <img src="./img/logo_white.png" alt="" />
        <h1>Edit contact</h1>
        <h3>Tasks are better with a Team!</h3>
        <div class="blue-line-add-Contact"></div>
      </div>
      <div class="initialsEdit">
        <div
          class="initials-circle-info"
          style="background-color: ${userColors[user.name]}; color: white;"
        >
          ${getInitials(user.name)}
        </div>
      </div>
      <div class="editUserDaten">
        <div class="imgClose" onclick="closeOverlay()">
          <img src="./img/close.png" class="closeIcon" alt="" />
        </div>
        <div class="center">
          <input
            class="iconPerson"
            type="text"
            id="editUserName"
            placeholder="Name"
            value="${user.name}"
            required
          />

          <input
            class="iconMail"
            type="email"
            id="editUserEmail"
            placeholder="E-Mail"
            value="${user.email}"
            required
          />

          <input
            class="iconCall"
            type="text"
            id="editUserPhone"
            placeholder="Telefon"
            value="${user.phone}"
            required
          />

          <input
            class="iconLock"
            type="password"
            id="editUserPassword"
            placeholder="new Password"
            required
          />

          <!-- Passwort-Eingabe hinzugefügt -->
          <div class="delete-save-btn">
            <button
              class="delete-btn"
              onclick="deleteUser('${user.name}'), clearUserInfo()"
            >
              Delete
            </button>
            <button class="save-btn" onclick="editUser(${index})">
              Save <img class="imgCheck" src="./img/check.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  function templateRenderSubtasks(location, id, nextSubtaskInList) {
    return `
    <li id="subtask${id}">
       <div class="subtaskLIST" id="listBox${id}" onmouseover="showSubtaskEditor(${id})" onmouseout="hideSubtaskEditor(${id})">
           <p id="subTitle${id}" onclick="openSubtaskEditor(${id})">${nextSubtaskInList}</p>
           <div class="subtaskEditor">
               <input class="d-none" id="subtaskEditInput${id}" value="${nextSubtaskInList}">
               <img src="./img/editIcon.png" class="d-none miniIcons" id="btnEdit${id}" onclick="openSubtaskEditor(${id})">
               <img src="./img/check_dark.png" class="d-none miniIcons" id="btnSave${id}" onclick="saveNewSubtaskEditor(${id}, '${location}')">
               <img src="./img/deleteIcon.png" class="d-none miniIcons" id="btnDelete${id}" onclick="deleteSubtaskEditor(${id}, '${location}')">
           </div>
       </div>
   </li>
`;
  }