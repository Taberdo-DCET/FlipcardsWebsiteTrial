window.displayCreatedCards = function () {
  const fcContainers = document.querySelectorAll(".FCcont, .FCcont22");

  const flashcardKeys = Object.keys(localStorage).filter(key =>
    key.startsWith("flashcardSet_")
  );

  flashcardKeys.forEach((key, index) => {
    const rawData = localStorage.getItem(key);
    if (!rawData) return;

    let data;
    try {
      data = JSON.parse(rawData);
    } catch (e) {
      console.error("Invalid JSON for key:", key);
      return;
    }

    const container = fcContainers[index % fcContainers.length];
    if (!container) return;

    const wc = document.createElement("div");
    wc.classList.add("wc");
    wc.setAttribute("data-storage-key", key);
    wc.setAttribute("data-key", key);

    wc.innerHTML = `
      <div class="iconflashcard">
        <img src="assets/icons8-book-64.png" class="cardicon" />
      </div>
      <div class="titleflashcard">${data.subject || "Untitled"}</div>
      <div class="date">${data.date || ""}</div>
      <button class="review opencardsmodal">Review</button>
    `;

    container.appendChild(wc);
  });
};
