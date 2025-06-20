document.addEventListener("DOMContentLoaded", function () {
  let cards = [];
  let currentIndex = 0;
  let lastUsedKey = null;

  const modal = document.getElementById("plascard");
  const flipcard = modal.querySelector(".flipcard");
  const flipInner = flipcard.querySelector(".flip-inner");
  const front = flipInner.querySelector(".flip-front");
  const back = flipInner.querySelector(".flip-back");

  const subjectDisplay = modal.querySelector(".plascard4txt");
  const revealBtn = modal.querySelector(".revealplascard");
  const closeBtn = modal.querySelector(".closeplascard");
  const prevBtn = modal.querySelector(".btnplascard");
  const nextBtn = modal.querySelector(".btnplascard2");

  const matchBtn = document.querySelector(".openmatchmodal");
  const chooseModal = document.querySelector(".matchmodal");
  const matchCardModal = document.querySelector(".matchmodal2");

  function highlightModalButton(type) {
    const flashcardBtn = document.querySelector(".flashcardbtn");
    const matchBtn = document.querySelector(".matchbtn");

    if (type === "flashcard") {
      if (flashcardBtn) flashcardBtn.style.backgroundColor = "#b81b46";
      if (matchBtn) matchBtn.style.backgroundColor = "";
    } else if (type === "match") {
      if (matchBtn) matchBtn.style.backgroundColor = "#b81b46";
      if (flashcardBtn) flashcardBtn.style.backgroundColor = "";
    } else {
      if (flashcardBtn) flashcardBtn.style.backgroundColor = "";
      if (matchBtn) matchBtn.style.backgroundColor = "";
    }
  }

  function updateCounter() {
    const counterDisplay = document.getElementById("cardcounter");
    if (counterDisplay && cards.length > 0) {
      counterDisplay.textContent = `${currentIndex + 1}/${cards.length}`;
    }
  }

  function showCard(index) {
    if (!cards[index]) return;
    flipcard.classList.remove("flipped");

    setTimeout(() => {
      front.textContent = cards[index].term;
      back.textContent = cards[index].definition;
      updateCounter();
    }, 300);
  }

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("opencardsmodal") || e.target.closest(".opencardsmodal")) {
      const cardElement = e.target.closest("[data-key], [data-storage-key]");
      const key = cardElement?.getAttribute("data-key") || cardElement?.getAttribute("data-storage-key");
      if (!key) return;

      const rawData = localStorage.getItem(key);
      if (!rawData) return;

      let data;
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        return;
      }

      if (!Array.isArray(data.cards) || data.cards.length === 0) return;

      cards = data.cards;
      currentIndex = 0;
      lastUsedKey = key;

      subjectDisplay.textContent = data.subject || "Untitled";
      showCard(currentIndex);

      modal.style.display = "flex";
      highlightModalButton("flashcard");
      document.body.style.overflow = "hidden";

      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
    }

    if (e.target.classList.contains("plascardd") || e.target.closest(".plascardd")) {
      if (!lastUsedKey) {
        alert("Please click 'Review' on a flashcard set first.");
        return;
      }

      const rawData = localStorage.getItem(lastUsedKey);
      if (!rawData) return;

      let data;
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        return;
      }

      if (!Array.isArray(data.cards) || data.cards.length === 0) return;

      cards = data.cards;
      currentIndex = 0;

      subjectDisplay.textContent = data.subject || "Untitled";
      showCard(currentIndex);

      modal.style.display = "flex";
      highlightModalButton("flashcard");
      document.body.style.overflow = "hidden";

      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
    }

    if (e.target.classList.contains("closeplascard") || e.target.closest(".closeplascard")) {
      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
      modal.style.display = "none";
      document.body.style.overflow = "";
      cards = [];
      currentIndex = 0;
      flipcard.classList.remove("flipped");
      highlightModalButton("reset");
    }
  });

  revealBtn.addEventListener("click", () => {
    if (!cards[currentIndex]) return;
    flipcard.classList.toggle("flipped");
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
    }
  });

  if (matchBtn) {
    matchBtn.addEventListener("click", () => {
      modal.style.display = "none";
      flipcard.classList.remove("flipped");
      cards = [];
      currentIndex = 0;

      if (!lastUsedKey) {
        alert("Please review a flashcard set first.");
        return;
      }

      const rawData = localStorage.getItem(lastUsedKey);
      if (!rawData) return;

      let data;
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        return;
      }

      if (!Array.isArray(data.cards)) return;
      cards = data.cards;

      const matchPairs = cards.slice(0, 6);
      const matchItems = [];

      matchPairs.forEach((item, i) => {
        matchItems.push({ type: "term", value: item.term, id: `match-${i}` });
        matchItems.push({ type: "definition", value: item.definition, id: `match-${i}` });
      });

      while (matchItems.length < 12) {
        matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
        matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
      }
      matchItems.length = 12;

      for (let i = matchItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matchItems[i], matchItems[j]] = [matchItems[j], matchItems[i]];
      }

      matchItems.forEach((item, idx) => {
        const el = document.querySelector(`.mcard${idx + 1}`);
        if (el) {
          el.textContent = item.value;
          el.dataset.matchId = item.id;
          el.dataset.type = item.type;
          el.style.visibility = "visible";
          el.classList.remove("matched", "selected", "mismatch");
        }
      });

      if (chooseModal) chooseModal.style.display = "flex";
      if (matchCardModal) matchCardModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      highlightModalButton("match");
    });
  }


});
function closeMatchSuccess() {
  const alert = document.getElementById("matchSuccessAlert");
  alert.style.display = "none";
}
