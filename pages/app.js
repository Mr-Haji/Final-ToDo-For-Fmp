
var toDoData = [];

// ===================Authantication==================


// ===================signOut==================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyCJrwO74FBGSxXugSogdiatmKt4cHbOSAU",
    authDomain: "todo-mr-haji.firebaseapp.com",
    projectId: "todo-mr-haji",
    storageBucket: "todo-mr-haji.appspot.com",
    messagingSenderId: "661982406999",
    appId: "1:661982406999:web:ded425a797b1b5073ab612",
    measurementId: "G-0WWN64RSLZ"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var AUTH = getAuth(app);
var DATABASE = getDatabase(app)

window.signOut = function () {
console.log("runing.")
    signOut(AUTH).then(function (success) {

        window.location.replace("../index.html")
    }).catch(function (error) {
        console.log(error.code)
    })
}





// ===================Send To DATABASE==================OK✔


window.sendDataToDB = function () {
    if (inp.value !== "") {
        // ===========obj for Database
        var obj = {
            id: Math.floor(Math.random() * 1000000000000),
            todo: inp.value,
        }
        var refer = ref(DATABASE, `todos/${obj.id}`);
        set(refer, obj)
        inp.value = "";
    }
    else {
        alert("Insert Your Task")
    }
}


// ===================Rec From DATABASE==================OK✔

window.recDataFromDB = function () {
    toDoData = [];

    var refer = ref(DATABASE, `todos/`);
    onChildAdded(refer, function (recieveDataFromDB) {
        toDoData.push(recieveDataFromDB.val());
    })
    render()
    
}




// ====================Content
var inp = document.getElementById("input");
var toDoList = document.getElementById("toDoLi");

var edit = document.getElementById("editHide")


// ========add
window.addToDo = function () {

    sendDataToDB();
    recDataFromDB();
}
// ========render
 function render(delAll) {

    toDoList.innerHTML = "";
    if (delAll) {
        toDoData = [];
        return;
    }
    for (var i = 0; i < toDoData.length; i++) {
        toDoList.innerHTML += `<div class="list" >
<li class="pad" > ${toDoData[i].todo}</li> 
 <span class="btnvisible" ><button class="nBtn1" onclick="editToDO(${i})"><i class="fa-solid fa-pen"></i></button> <button class="nBtn2" onclick="deleteToDO(${i})"><i class="fa-solid fa-trash"></i></button></span>
 </div>`
    }
}
var lastData;
// ==========edit
var edit = document.getElementById("mainEdit");
var main = document.getElementById("main");
window.editToDO = function (e) {
    edit.classList.remove("mainEdit");
    main.classList.add("mainEdit");
    
    edit.innerHTML = `<section class="container">
    <div class="main">
        <div class="addInp">
            <input type="text" placeholder="Add Your Task Here.... " class="inp1st" name="" id="updated">
            <button id="editTDo" onclick="submit(${e})" class="inpBtn"><i class="fa-solid ">✔</i></button>
        </div>
        <div>
            <ul id="toDoLi"></ul>
        </div>
        <div>
            <button onclick="cancel(e)" onclick="render(true)">
                <i class="fa-solid ">❌</i>
            </button>

        </div>
        <div>
            <Button class="signOut" onclick="signOut()">Sign Out</Button>
        </div>
    </div>
</section>`;
    lastData = toDoData[e]
    // console.log(toDoData[e].id)
}

// ===========delete
window.deleteToDO = function (e) {
    var refer = ref(DATABASE, `todos/${toDoData[e].id}`);
    remove(refer)
    toDoData.splice(e, 1);
    render();
}

window.submit = function (e) {

    var updated = document.getElementById("updated");
        console.log(updated.value)


    if (updated.value === "") { alert("Insert Your Task") }
    else {
        edit.classList.add("mainEdit");
    main.classList.remove("mainEdit");
        var refer = ref(DATABASE, `todos/${toDoData[e].id}`);
        set(refer, {
            id: toDoData[e].id,
            todo: updated.value
        })
        recDataFromDB();
        // render();
    }
    
}

window.cancel = function (e) {
    toDoData[e] = lastData;
    render();


}

window.dellAll = function (){
    var refer = ref(DATABASE, `todos/`);
    remove(refer)
    toDoData = []
    render()
}
