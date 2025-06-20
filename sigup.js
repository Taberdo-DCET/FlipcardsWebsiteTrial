document.addEventListener("DOMContentLoaded", function () {
  const signupBtn = document.getElementById("signupsubmit");
  const passwordInput = document.getElementById("signuppassword");
  const confirmInput = document.getElementById("signupconfirm");
  const matchMsg = document.getElementById("passwordmatchmsg");

  const alertBox = document.getElementById("customalert");
  const alertOKBtn = document.getElementById("alertokbtn");
  const signInModal = document.getElementById("modaloverlay");
  const signUpModal = document.getElementById("modaloverlaysignup");


  const strengthMsg = document.createElement("span");
  strengthMsg.id = "passwordstrengthmsg";
  strengthMsg.style.fontSize = "10px";
  strengthMsg.style.color = "white";
  strengthMsg.style.display = "block";
  strengthMsg.style.marginTop = "2px";
  strengthMsg.style.marginLeft = "30px";
  passwordInput.parentElement.appendChild(strengthMsg);

 
  passwordInput.addEventListener("input", function () {
    const val = passwordInput.value;
    let strength = "Weak";
    let color = "salmon";

    if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val) && /[@$!%*?&#^]/.test(val)) {
      strength = "Strong";
      color = "lightgreen";
    } else if (val.length >= 6) {
      strength = "Moderate";
      color = "orange";
    }

    strengthMsg.textContent = `Strength: ${strength}`;
    strengthMsg.style.color = color;
  });


  confirmInput.addEventListener("input", function () {
    if (!confirmInput.value) {
      matchMsg.textContent = "";
      return;
    }
    if (passwordInput.value === confirmInput.value) {
      matchMsg.textContent = "Passwords match";
      matchMsg.style.color = "lightgreen";
    } else {
      matchMsg.textContent = "Passwords do not match";
      matchMsg.style.color = "salmon";
    }
  });

  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("signupusername");
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!username || !password || !confirmPassword) {
      showAlert("Please fill in all fields.", "signup");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match.", "signup");
      return;
    }

  
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    if (!passwordRules.test(password)) {
      showAlert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.", "signup");
      return;
    }

    const users = JSON.parse(localStorage.getItem("flipcardsUsers") || "[]");
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      showAlert("Username already exists.", "signup");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("flipcardsUsers", JSON.stringify(users));

    showAlert("Account created successfully!", "signup");

   
    usernameInput.value = "";
    passwordInput.value = "";
    confirmInput.value = "";
    matchMsg.textContent = "";
    strengthMsg.textContent = "";
  });

  function showAlert(message, mode) {
    document.getElementById("customalertmessage").textContent = message;
    alertBox.classList.remove("hidden");
    alertMode = mode;
  }

  let alertMode = "default";

  alertOKBtn.addEventListener("click", function () {
    alertBox.classList.add("hidden");

    if (alertMode === "signup") {
      signUpModal.style.display = "none";
      signInModal.style.display = "flex";
    }

    alertMode = "default";
  });

 
  alertBox.addEventListener("click", function (e) {
    if (!document.getElementById("customalertbox").contains(e.target)) {
      e.stopPropagation();
    }
  });
});
