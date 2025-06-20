document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveCardBtn");
  const FCcont = document.getElementById("FCcont");

  saveBtn.addEventListener("click", function () {
    const subject = document.querySelector(".inpt")?.value || "Untitled";
    const date = document.querySelector(".date-input")?.value || new Date().toLocaleDateString();
    const termEls = document.querySelectorAll(".inpt1");
    const defEls = document.querySelectorAll(".inptdef1");

    const cards = [];
    termEls.forEach((termEl, idx) => {
      const defEl = defEls[idx];
      if (termEl?.value.trim() && defEl?.value.trim()) {
        cards.push({
          term: termEl.value.trim(),
          definition: defEl.value.trim()
        });
      }
    });

    if (cards.length === 0) return;

    const flashcardSet = {
      subject,
      date,
      cards
    };

    const storageKey = `flashcardSet_${Date.now()}`;
    localStorage.setItem(storageKey, JSON.stringify(flashcardSet));

    const wc = document.createElement("div");
    wc.classList.add("wc");
    wc.setAttribute("data-storage-key", storageKey); 
    wc.setAttribute("data-key", storageKey);

    wc.innerHTML = `
      <div class="titleflashcard">${subject}</div>
      <div class="date">${date}</div>
      <button class="review opencardsmodal">Review</button>
    `;

    FCcont.appendChild(wc);
  });
});
