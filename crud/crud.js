let i = 0;
let data=[
];

function readAll(){
    var tabledata = document.querySelector(".table_data");
    let elements = '';

    data.forEach(obj => {
        elements+= `<tr>
        <td>${obj.name}</td>
        <td>${obj.email}</td>
        <td>
        <button onclick="edit(${obj.id})">Update</button>
        <button onclick="deleteData(${obj.id})">Delete</button>
        </td>
        </tr>`
    });

    tabledata.innerHTML = elements;
}

function deleteData(id) {
    data = data.filter(obj => obj.id !== id);
    readAll();
}

function edit(id){
    document.querySelector('.create_form').style.display = "none";
    document.querySelector('.update_form').style.display = "block";
    var object = data.find(obj => obj.id === id);
    document.querySelector(".uname").value=object.name;
    document.querySelector(".uemail").value=object.email;
    document.querySelector(".id").value = object.id;
}

function update() {
    var id = parseInt(document.querySelector(".id").value);
    var name = document.querySelector(".uname").value;
    var email = document.querySelector(".uemail").value;
    var index = data.findIndex(obj => obj.id === id);
    
    data[index] = { id, name, email };
    document.querySelector('.create_form').style.display = "block";
    document.querySelector('.update_form').style.display = "none";
    readAll();
}

function create(){
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;
    var obj = {id:i++,name:name,email:email};

    data.push(obj);
    readAll();
    name = document.querySelector(".name").value="";
    var email = document.querySelector(".email").value="";
}

readAll();