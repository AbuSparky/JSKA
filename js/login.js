 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

 import { getAuth, signInWithEmailAndPassword } from  "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"    ;
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCEicPeLOUeGhaqVZ3SVTPklnCJAAhfdcA",
  authDomain: "firstprojabu.firebaseapp.com",
  projectId: "firstprojabu",
  storageBucket: "firstprojabu.appspot.com",
  messagingSenderId: "6914697081",
  appId: "1:6914697081:web:36234b752e6a330e1eb1a8",
  measurementId: "G-CFR68SPFNL"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const submit = document.getElementById('submit')

 submit.addEventListener('click',function(event){
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("login Succussfully");   
    window.location.href = "./adminindex.html";

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
 });