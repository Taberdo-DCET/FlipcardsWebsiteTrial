document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("flipcardsLoggedInUser");
  const usernameDisplay = document.getElementById("profileUsername");

  if (username && usernameDisplay) {
    usernameDisplay.textContent = username;
  }
});