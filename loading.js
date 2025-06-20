function showLoader(duration = 1000, onDone) {
  const loader = document.getElementById("loaderOverlay");
  if (!loader) return;

  loader.classList.remove("hidden");
  document.body.classList.add("loading");

 
  if (typeof window.renderFlashcards === "function") {
    window.renderFlashcards();
  }
  if (typeof window.displayCreatedCards === "function") {
    window.displayCreatedCards();
  }


  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
    if (typeof onDone === "function") onDone();
  }, duration);
}


window.addEventListener("DOMContentLoaded", () => {
  showLoader(5800);
});
