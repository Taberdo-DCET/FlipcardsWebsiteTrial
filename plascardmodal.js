document.addEventListener("DOMContentLoaded", function () {
  const flashcardButtons = document.querySelectorAll(".FCcont .opencardsmodal, .FCcont22 .opencardsmodal");
  const flashcardModal = document.getElementById("plascard");
  const closeButton = document.querySelector(".closeplascard");
  const backgroundContent = document.getElementById("backk");


  flashcardButtons.forEach(button => {
    button.addEventListener("click", function () {
      showLoader(3300);
      flashcardModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      if (backgroundContent) backgroundContent.classList.add("blur");
    });
  });


  if (closeButton) {
    closeButton.addEventListener("click", function () {
      showLoader(5300);
      flashcardModal.style.display = "none";
      document.body.style.overflow = "";
      if (backgroundContent) backgroundContent.classList.remove("blur");
    });
  }
});
