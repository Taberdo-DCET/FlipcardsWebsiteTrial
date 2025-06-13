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

  // Universal click handling for review/flashcard buttons
  document.addEventListener("click", function (e) {
    // REVIEW
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
      document.body.style.overflow = "hidden";

      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
    }

    // FLASHCARD FROM MATCH MODAL
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
      document.body.style.overflow = "hidden";

      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
    }

    // CLOSE ALL
    if (e.target.classList.contains("closeplascard") || e.target.closest(".closeplascard")) {
      if (chooseModal) chooseModal.style.display = "none";
      if (matchCardModal) matchCardModal.style.display = "none";
      modal.style.display = "none";
      document.body.style.overflow = "";
      cards = [];
      currentIndex = 0;
      flipcard.classList.remove("flipped");
    }
  });

  // Reveal
  revealBtn.addEventListener("click", () => {
    if (!cards[currentIndex]) return;
    flipcard.classList.toggle("flipped");
  });

  // Prev/Next
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

  // MATCH LOGIC
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

      // Prepare term-definition pairs
      const matchPairs = cards.slice(0, 6); // Max 6 pairs
      const matchItems = [];

      matchPairs.forEach((item, i) => {
        matchItems.push({ type: "term", value: item.term, id: `match-${i}` });
        matchItems.push({ type: "definition", value: item.definition, id: `match-${i}` });
      });

      // Add bonus to fill up 12
     while (matchItems.length < 12) {
  // Always push bonus in pairs with same ID
  matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
  matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
}
matchItems.length = 12; // Trim in case it exceeds due to pair logic


      // Shuffle
      for (let i = matchItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [matchItems[i], matchItems[j]] = [matchItems[j], matchItems[i]];
      }

      // Fill mcard1–12
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
    });
  }

  // MATCHING INTERACTION
  let selectedCards = [];

  document.addEventListener("click", function (e) {
    const clicked = e.target.closest('[class^="mcard"]');
    if (!clicked || clicked.style.visibility === "hidden" || clicked.classList.contains("matched")) return;

    selectedCards.push(clicked);
    clicked.classList.add("selected");

    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      const sameId = first.dataset.matchId === second.dataset.matchId;
const differentTypes = first.dataset.type !== second.dataset.type;
const isBonus = first.dataset.matchId === "bonus-match" && second.dataset.matchId === "bonus-match";

if ((sameId && differentTypes) || isBonus) {

  // ✅ Match with shrink and fade animation
  first.classList.add("matched");
  second.classList.add("matched");

  setTimeout(() => {
    first.style.visibility = "hidden";
    second.style.visibility = "hidden";
    first.classList.remove("matched", "selected");
    second.classList.remove("matched", "selected");
    selectedCards = [];

    // Check win condition
    const remaining = document.querySelectorAll('[class^="mcard"]:not([style*="visibility: hidden"])');
    if (remaining.length === 0) {
      document.getElementById("matchSuccessAlert").style.display = "flex";

    }
  }, 500); // Delay to allow animation to play
} else {
  // ❌ Mismatch with shake animation
  first.classList.add("shake");
  second.classList.add("shake");

  setTimeout(() => {
    first.classList.remove("shake", "selected");
    second.classList.remove("shake", "selected");
    selectedCards = [];
  }, 500); // Shake animation duration
}
    }

  });
  // MATCH MODAL BUTTON FUNCTIONS
const closeMatchBtn = document.querySelector(".closematch");
const shuffleMatchBtn = document.querySelector(".shufflematch");
const retryMatchBtn = document.querySelector(".retrymatch");

// Store current matchItems globally for retryMatch
let currentMatchItems = [];

if (closeMatchBtn) {
  closeMatchBtn.addEventListener("click", () => {
    showLoader(5300);
    if (chooseModal) {
      chooseModal.style.display = "none";
      chooseModal.style.backdropFilter = "none";
    }
    if (matchCardModal) {
      matchCardModal.style.display = "none";
      matchCardModal.style.backdropFilter = "none";
    }
    document.body.style.overflow = "";

    // Optional: remove any leftover blur-related classes
    document.querySelectorAll(".blur, .backdrop-active").forEach(el => {
      el.classList.remove("blur", "backdrop-active");
    });

    if (chooseModal) chooseModal.style.display = "none";
    if (matchCardModal) matchCardModal.style.display = "none";
    document.body.style.overflow = "";

    // Remove any backdrop blur effect
    const blurredElements = document.querySelectorAll(".blurred, .backdrop-active");
    blurredElements.forEach(el => el.classList.remove("blurred", "backdrop-active"));
  });
}

if (shuffleMatchBtn) {
  shuffleMatchBtn.addEventListener("click", () => {
    if (!cards || cards.length === 0) return;

    // Generate new randomized match items (same logic as matchBtn)
    const matchPairs = cards.slice(0, 6);
    const matchItems = [];

    matchPairs.forEach((item, i) => {
      matchItems.push({ type: "term", value: item.term, id: `match-${i}` });
      matchItems.push({ type: "definition", value: item.definition, id: `match-${i}` });
    });

    while (matchItems.length < 12) {
  // Always push bonus in pairs with same ID
  matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
  matchItems.push({ type: "bonus", value: "Bonus Card!", id: `bonus-match` });
}
matchItems.length = 12; // Trim in case it exceeds due to pair logic


    for (let i = matchItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matchItems[i], matchItems[j]] = [matchItems[j], matchItems[i]];
    }

    currentMatchItems = matchItems;

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
  });
}

if (retryMatchBtn) {
  retryMatchBtn.addEventListener("click", () => {
    if (!currentMatchItems.length) return;

    currentMatchItems.forEach((item, idx) => {
      const el = document.querySelector(`.mcard${idx + 1}`);
      if (el) {
        el.textContent = item.value;
        el.dataset.matchId = item.id;
        el.dataset.type = item.type;
        el.style.visibility = "visible";
        el.classList.remove("matched", "selected", "mismatch");
      }
    });
  });

}

});
function closeMatchSuccess() {
  const alert = document.getElementById("matchSuccessAlert");
  alert.style.display = "none";
}

