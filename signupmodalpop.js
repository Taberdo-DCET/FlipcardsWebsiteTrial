document.addEventListener("DOMContentLoaded", function () {
    const btnOne = document.querySelector(".signup"); 
    const btnTwo = document.getElementById("signup");
    const signinModal = document.getElementById("modaloverlaysignup");
    const loginModal = document.getElementById("modaloverlay");
    const mainPageContent = document.getElementById("maincontent");
  

    const buttons = [btnOne, btnTwo];
  
    buttons.forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", function () {

          loginModal.style.display = "none";
  

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
  