var logingmail = document.getElementById("logingmail");
var loginpasword = document.getElementById("loginpasword");


// console.log(logingmail)
// console.log(loginpasword)

// console.log(email)
// console.log(pasword)

// Authantication========================



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword ,} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
// var uid;
  window.logIn = function(){
 
    var email = logingmail.value;
    var pasword = loginpasword.value;


    signInWithEmailAndPassword(AUTH,email,pasword).then(function(success){
      console.log("=========>", success.user.uid)
window.location.replace("./pages/userWindow.html")
    }).catch(function(error){
        console.log(error.code)
    })
  }

  window.switchPage = function(){
    window.location.replace("./pages/signup.html")
  }






