document.addEventListener("DOMContentLoaded", () => {
  const recentWrapper = document.querySelector(".FCcont2 #FCrow");

  function renderRecentCards() {
    // Keep only the first template, hide it
    const cards = recentWrapper.querySelectorAll(".wcFC");
    cards.forEach((el, i) => {
      if (i === 0) el.style.display = "none";
      else el.remove();
    });

    const recent = JSON.parse(localStorage.getItem("recentCards")) || [];

    recent.forEach(item => {
      const card = document.createElement("div");
      card.className = "wcFC";
      card.setAttribute("data-key", item.key);
      card.setAttribute("data-subject", item.subject || "");

      card.innerHTML = `
        <div class="charac2"></div>
        <p class="FCset">
          FlashCards Set
          <button class="button review opencardsmodal">Review</button>
        </p>
        <p class="date">${item.date || "No Date"}</p>
        <p class="titleflashcard11">${item.subject || "Untitled"}</p>
      `;

      card.querySelector(".review").addEventListener("click", () => {
        addToRecent(item.key, item.subject, item.date);
        openPlascard(item);
      });

      recentWrapper.appendChild(card);
    });
  }

  function addToRecent(key, subject, date) {
    const recent = JSON.parse(localStorage.getItem("recentCards")) || [];
    const updated = recent.filter(item => item.key !== key);
    updated.unshift({ key, subject, date });
    localStorage.setItem("recentCards", JSON.stringify(updated.slice(0, 5)));
    renderRecentCards();
  }

  function openPlascard(data) {
    const plascardModal = document.getElementById("plascard");
    const background = document.getElementById("backk");

    showLoader(4500, () => {
      if (plascardModal) plascardModal.style.display = "flex";
      if (background) background.classList.add("blur");
      document.body.style.overflow = "hidden";
      window.currentFlashcardSet = data;
    });
  }

  function bindOriginalReviewButtons() {
    document.querySelectorAll(".opencardsmodal").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-key]");
        const key = card?.getAttribute("data-key");
        const subject =
          card?.querySelector('[class^="titleflashcard"]')?.textContent?.trim();
        const date =
          card?.querySelector(".date")?.textContent?.replace(/"/g, "").trim();

        if (key && subject && date) {
          addToRecent(key, subject, date);
        }
      });
    });
  }

  bindOriginalReviewButtons();
  renderRecentCards();
});
