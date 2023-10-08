var signUpgmail = document.getElementById("signUpgmail")
var signUppasword = document.getElementById("signUppasword")
// Authantication========================


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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

  window.signUp = function(){
    var email = signUpgmail.value;
    var pasword = signUppasword.value;
    createUserWithEmailAndPassword(AUTH,email,pasword).then(function(success){
      window.location.replace("./userWindow.html")
console.log(success.user.uid)
    }).catch(function(error){
        console.log(error.code)
    })
  }
  window.switchPage = function(){
    window.location.replace("../index.html")
  }