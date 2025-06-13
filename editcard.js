document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('editcardmdll');
  const modalBox = modal.querySelector('.mdladdcard2');
  const editBtn = modal.querySelector('.create');
  const subjectInput = modal.querySelector('.inpt');
  const dateInput = modal.querySelector('.date-input');

  let currentEditKey = null;

  document.addEventListener('click', (e) => {
    const editTrigger = e.target.closest('.edit');
    if (!editTrigger) return;

    const cardEl = editTrigger.closest(".wc, .wc2, .wc3, .wc4, .wc5, .wc6, .wc7, .wc8, .wc9, .wc10");
    if (!cardEl) return;

    const subject = cardEl.querySelector('[class^="titleflashcard"]')?.textContent?.trim();
    const date = cardEl.querySelector('.date')?.textContent?.trim();

    const allKeys = Object.keys(localStorage).filter(k => k.startsWith('flashcardSet_'));
    const matchedKey = allKeys.find(k => {
      const data = JSON.parse(localStorage.getItem(k));
      return data.subject === subject && data.date === date;
    });

    if (!matchedKey) return;

    const flashcardSet = JSON.parse(localStorage.getItem(matchedKey));
    currentEditKey = matchedKey;

    subjectInput.value = flashcardSet.subject;

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
    dateInput.setAttribute("max", today);
    if (!dateInput.value) dateInput.value = today;

    const cardContainer = modal.querySelector('.mdladdcard2');
    cardContainer.querySelectorAll('.boxinpt1, .boxinpt3').forEach(el => el.remove());

    flashcardSet.cards.forEach((card, index) => {
      const cardDiv = document.createElement('div');
      cardDiv.className = index % 2 === 0 ? 'boxinpt1' : 'boxinpt3';
      cardDiv.innerHTML = `
        <p1 class="numbercard">${index + 1}</p1>
        <button type="button" class="delete">
          <img src="delete.png" style="width: 31px; height: 19px;">
        </button>
        <input class="inpt1" value="${card.term}" placeholder="Enter Term">
        <input class="inptdef1" value="${card.definition}" placeholder="Enter Definition">
      `;
      cardContainer.insertBefore(cardDiv, modal.querySelector('.boxinpt2'));
    });

    modal.style.display = 'flex';
    document.body.classList.add('noscroll');
  });

  editBtn.addEventListener('click', () => {
    const cardInputs = modal.querySelectorAll('.boxinpt1, .boxinpt3');
    const subject = subjectInput.value.trim();
    const date = dateInput.value.trim();

    if (!subject || !date) {
      const missingAlert = document.querySelector('.alertmissing.missing');
      if (missingAlert) {
        missingAlert.style.display = 'flex';
      }
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date !== today) {
      alert("You can only use today's date.");
      return;
    }

    const cards = [];
    let hasError = false;

    cardInputs.forEach((card, index) => {
      const term = card.querySelector('.inpt1')?.value.trim();
      const def = card.querySelector('.inptdef1')?.value.trim();

      if (!term || !def) {
        const missingAlert = document.querySelector('.alertmissing.missing');
        if (missingAlert) {
          missingAlert.style.display = 'flex';
        }
        hasError = true;
        return;
      }

      cards.push({ term, definition: def });
    });

    if (hasError) return;

    const updatedSet = { subject, date, cards };

    if (currentEditKey) {
      localStorage.setItem(currentEditKey, JSON.stringify(updatedSet));
      currentEditKey = null;
    }

    const successAlert = document.querySelector('.alertedit.alertt');
    if (successAlert) {
      successAlert.style.display = 'flex';
    }

    modal.style.display = 'none';
    document.body.classList.remove('noscroll');

    if (typeof window.renderFlashcards === 'function') {
      window.renderFlashcards();
    }
  });

  modal.addEventListener('click', (e) => {
    if (!modalBox.contains(e.target)) {
      modal.style.display = 'none';
      document.body.classList.remove('noscroll');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('.delete')) {
      e.target.closest('.boxinpt1, .boxinpt3')?.remove();
    }
  });

  const addBtn = modal.querySelector('.addd');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cardDivs = modal.querySelectorAll('.boxinpt1, .boxinpt3');
      const index = cardDivs.length + 1;
      const newCard = document.createElement('div');
      newCard.className = index % 2 === 0 ? 'boxinpt3' : 'boxinpt1';
      newCard.innerHTML = `
        <p1 class="numbercard">${index}</p1>
        <button type="button" class="delete">
          <img src="delete.png" style="width: 31px; height: 19px;">
        </button>
        <input class="inpt1" placeholder="Enter Term">
        <input class="inptdef1" placeholder="Enter Definition">
      `;
      modal.querySelector('.mdladdcard2').insertBefore(newCard, modal.querySelector('.boxinpt2'));
    });
  }
});

window.closeAlertEdit = function (className) {
  const alert = document.querySelector(`.${className}`);
  if (alert) {
    alert.style.display = 'none';
  }
};

window.closeAlertMissing = function (className) {
  const alert = document.querySelector(`.${className}`);
  if (alert) {
    alert.style.display = 'none';
  }
};
