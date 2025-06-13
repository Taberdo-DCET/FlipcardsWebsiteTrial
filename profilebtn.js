function toggleProfileButton() {
  const btn = document.querySelector(".profbtn");
  const modal = document.getElementById("profilemodal");

  btn.classList.toggle("moved");

  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
    modal.classList.add("hide");

    modal.addEventListener("animationend", function hideAfterFade(e) {
      if (e.animationName === "fadeOutProfile") {
        modal.style.display = "none";
        modal.classList.remove("hide");
        modal.removeEventListener("animationend", hideAfterFade);
      }
    });
  } else {
    modal.style.display = "block";
    requestAnimationFrame(() => {
      modal.classList.add("show");
    });
  }
}
