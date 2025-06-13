document.addEventListener("DOMContentLoaded", function () {
  const btnOne = document.querySelector(".signin");
  const btnTwo = document.getElementById("signin"); 

  const signinModal = document.getElementById("modaloverlay");
  const signupModal = document.getElementById("modaloverlaysignup");
  const mainPageContent = document.getElementById("maincontent");

  const buttons = [btnOne, btnTwo];

  buttons.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", function () {

        signupModal.style.display = "none";

        signinModal.style.display = "flex";
        mainPageContent.classList.add("blur");
        document.body.classList.add("modal-active");
      });
    }
  });


  signinModal.addEventListener("click", function (e) {
    const loginBox = signinModal.querySelector(".login2");
    const isClickInsideLogin = loginBox.contains(e.target);

    if (!isClickInsideLogin) {
      signinModal.style.display = "none";
      mainPageContent.classList.remove("blur");
      document.body.classList.remove("modal-active");
    }
  });
});
