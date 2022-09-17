firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //user is signed in
    document.getElementById("user-div").style.display = "block";
    document.getElementById("login-div").style.display = "none";
  } else {
    //user is not signed in

    document.getElementById("login-div").style.display = "block";
    document.getElementById("user-div").style.display = "none";
  }
});
