// firebase/firebase.config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

export const firebaseConfig = {
    apiKey: "AIzaSyCEicPeLOUeGhaqVZ3SVTPklnCJAAhfdcA",
    authDomain: "firstprojabu.firebaseapp.com",
    projectId: "firstprojabu",
    storageBucket: "firstprojabu.appspot.com",
    messagingSenderId: "6914697081",
    appId: "1:6914697081:web:36234b752e6a330e1eb1a8",
    measurementId: "G-CFR68SPFNL"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export database and storage references
export const database = getDatabase(app);
export const storage = getStorage(app);


