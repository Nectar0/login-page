const firebaseConfig = {
  apiKey: "AIzaSyBAptTl3DnXRqS83vmqOADz6DSUWhbS0mw",
  authDomain: "websitev1-981a5.firebaseapp.com",
  databaseURL: "https://websitev1-981a5-default-rtdb.firebaseio.com",
  projectId: "websitev1-981a5",
  storageBucket: "websitev1-981a5.appspot.com",
  messagingSenderId: "118038674478",
  appId: "1:118038674478:web:02cb9b3e02d6aa8e90b3bf",
  measurementId: "G-K3FNTGKGSD",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

const signUp = document.getElementById("signup-button");

signUp.addEventListener("click", () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("User created.");
      set(ref(database, "users/" + user.uid), {
        email: email,
      }).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
      // ..
    }
  );
});

const login = document.getElementById("login-button");

login.addEventListener("click", () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const date = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: date,
      });
      alert("User logged in!");
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
