document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".searchcontainer2");
  const input = container.querySelector(".searchinput");
  const searchButton = document.querySelector(".searchh");
  const modal = document.getElementById("opensearchmodal");
  const modalContentWrapper = modal.querySelector("#searchrow");
  const closeSearchBtn = document.querySelector(".closesearch");

  function lockBodyScroll(lock) {
    document.body.style.overflow = lock ? "hidden" : "";
  }

  function createWCSearchCard(data, key) {
    const card = document.createElement("div");
    card.className = "wcsearch";
    card.setAttribute("data-key", key);
    card.innerHTML = `
      <div class="charac2"></div>
      <p class="FCset">
        FlashCards Set
        <button class="button review opencardsmodal">Review</button>
      </p>
      <p class="date">${data.date || "No Date"}</p>
      <p class="titleflashcard">${data.subject || "Untitled"}</p>
    `;

card.querySelector(".review").addEventListener("click", () => {
  const plascardModal = document.getElementById("plascard");
  const background = document.getElementById("backk");

  modal.style.display = "none";
  lockBodyScroll(false);

  showLoader(4500, () => {
    if (plascardModal) plascardModal.style.display = "flex";
    if (background) background.classList.add("blur");
    document.body.style.overflow = "hidden";
    window.currentFlashcardSet = data;
  });
});


    return card;
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => {
      modal.style.display = "none";
      lockBodyScroll(false);
    });
  }

  container.addEventListener("mouseenter", () => {
    container.classList.add("hovered");
  });

  container.addEventListener("mouseleave", () => {
    if (input.value.trim() !== "") {
      container.classList.add("active");
    } else {
      container.classList.remove("hovered", "active");
    }
  });

  input.addEventListener("input", () => {
    const hasValue = input.value.trim() !== "";
    container.classList.toggle("active", hasValue);
    if (searchButton) {
      searchButton.style.display = hasValue ? "inline-block" : "none";
    }
  });

  if (searchButton) {
    searchButton.style.display = "none";

    searchButton.addEventListener("click", () => {
      const searchValue = input.value.trim().toLowerCase();
      if (!searchValue) return;

      showLoader(800, () => {
        
        const existingCards = modalContentWrapper.querySelectorAll(".wcsearch");
        existingCards.forEach(card => card.remove());

       
        const matchingKeys = Object.keys(localStorage).filter(key => {
          if (!key.startsWith("flashcardSet_")) return false;
          try {
            const data = JSON.parse(localStorage.getItem(key));
            const subject = data.subject?.toLowerCase() || "";
            const date = data.date?.toLowerCase() || "";
            return subject.includes(searchValue) || date.includes(searchValue);
          } catch {
            return false;
          }
        });

        if (matchingKeys.length > 0) {
          matchingKeys.forEach(key => {
            const data = JSON.parse(localStorage.getItem(key));
            const card = createWCSearchCard(data, key);
            modalContentWrapper.appendChild(card);
          });

          modal.style.display = "flex";
          lockBodyScroll(true);
        } else {
          showAlertSearch("alertsearch1", "Nosearch.jpg");
        }
      });
    });
  }
});


function showAlertSearch(className, imagePath) {
  const alertEl = document.querySelector(`.${className}`);
  if (!alertEl) return;

  const img = alertEl.querySelector(".alertsearchimg");
  if (img) img.src = imagePath;

  alertEl.style.display = "flex";
}

function closeAlertSearch(className) {
  const alertEl = document.querySelector(`.${className}`);
  if (alertEl) alertEl.style.display = "none";
}
