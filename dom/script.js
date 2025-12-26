let users = JSON.parse(localStorage.getItem('users')) || [];

displayUsers();

function displayUsers() {
    const tableBody = document.getElementById('userTable');
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editUser(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// --- CREATE & UPDATE ---
function handleFormSubmit() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const idInput = document.getElementById('userId');
    const submitBtn = document.getElementById('submitBtn');

    if (!nameInput.value || !emailInput.value) return alert("Please fill all fields");

    if (idInput.value === "") {
        // Create Mode
        users.push({ name: nameInput.value, email: emailInput.value });
    } else {
        // Update Mode
        users[idInput.value] = { name: nameInput.value, email: emailInput.value };
        idInput.value = "";
        submitBtn.innerText = "Add";
        submitBtn.classList.replace("btn-success", "btn-primary");
    }

    saveAndRefresh(nameInput, emailInput);
}

// --- EDIT (Prepare for update) ---
function editUser(index) {
    document.getElementById('userName').value = users[index].name;
    document.getElementById('userEmail').value = users[index].email;
    document.getElementById('userId').value = index; // Store index in hidden field
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "Update";
    submitBtn.classList.replace("btn-primary", "btn-success");
}

// --- DELETE ---
function deleteUser(index) {
    if (confirm("Are you sure?")) {
        users.splice(index, 1);
        saveAndRefresh();
    }
}

// --- HELPER FUNCTIONS ---
function saveAndRefresh(nameInput, emailInput) {
    localStorage.setItem('users', JSON.stringify(users));
    if(nameInput) nameInput.value = "";
    if(emailInput) emailInput.value = "";
    displayUsers();
}