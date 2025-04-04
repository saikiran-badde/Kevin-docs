// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZtRoanYqhEHapzyylSdsciYJc_iG1FyI",
  authDomain: "kevin-docs.firebaseapp.com",
  projectId: "kevin-docs",
  storageBucket: "kevin-docs.appspot.com",
  messagingSenderId: "636511201809",
  appId: "1:636511201809:web:5f6cd7fa35247149d6dfb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Handler
window.handleLogin = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  document.getElementById("status").innerText = "Logging in...";

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const username = localStorage.getItem("username");

      document.getElementById("form-title").innerText = "Welcome";
      document.getElementById("login-form").classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
      document.getElementById("status").innerText = "";
      document.getElementById("welcome-message").innerText = `Welcome, ${username}`;
      document.getElementById("welcome-message").classList.remove("hidden");

      document.getElementById("user-menu").classList.remove("hidden");
      document.getElementById("username-btn").innerText = username;
      document.getElementById("dropdown-username").innerText = username;
    })
    .catch((error) => {
      document.getElementById("status").innerText = "User not found or invalid credentials.";
      console.error("Login Error", error);
    });
};

// Logout Handler
window.logout = function () {
  signOut(auth).then(() => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    window.location.reload();
  });
};

// Toggle Dropdown
window.toggleDropdown = function () {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
};
