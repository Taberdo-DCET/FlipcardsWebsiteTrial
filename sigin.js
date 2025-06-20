document.addEventListener("DOMContentLoaded", function () {
  const signinBtn = document.querySelector(".loginbtn");
  const usernameField = document.getElementById("signinusername");
  const passwordField = document.getElementById("signinpassword");

  const alertBox = document.getElementById("customalert");
  const alertOKBtn = document.getElementById("alertokbtn");
  const alertMessage = document.getElementById("customalertmessage");

  let alertMode = "default";

  signinBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const username = usernameField.value.trim();
    const password = passwordField.value;

    if (!username || !password) {
      showAlert("Please fill in all fields.", "signin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("flipcardsUsers") || "[]");
    const user = users.find(user => user.username === username);

    if (!user) {
      showAlert("Account does not exist.", "signin");
    } else if (user.password !== password) {
      showAlert("Username or password incorrect.", "signin");
    } else {

  localStorage.setItem("flipcardsLoggedInUser", username);


  window.location.href = "loading.html?next=FlipCardsLobby.html";
}

  });

  alertOKBtn.addEventListener("click", function () {
    alertBox.classList.add("hidden");

    if (alertMode === "signin") {
      usernameField.value = "";
      passwordField.value = "";
    }

    alertMode = "default";
  });

  function showAlert(message, mode) {
    alertMessage.textContent = message;
    alertBox.classList.remove("hidden");
    alertMode = mode;
  }


  alertBox.addEventListener("click", function (e) {
    if (!document.getElementById("customalertbox").contains(e.target)) {
      e.stopPropagation();
    }
  });
});
