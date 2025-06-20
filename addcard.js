document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('addcardmdll');
  const modalBox = document.querySelector('.mdladdcard');
  const createBtn = modal.querySelector('.create');
  const subjectInput = modal.querySelector('.inpt');
  const dateInput = modal.querySelector('.date-input');

  const openButtons = [
    document.querySelector('.addcard2'),
    document.querySelector('.FS3'),
  ];


  openButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
        dateInput.setAttribute("max", today);
        dateInput.value = today;
      });
    }
  });


  modal.addEventListener('click', (e) => {
    if (!modalBox.contains(e.target)) {
      modal.style.display = 'none';
    }
  });


  createBtn.addEventListener('click', () => {
    const cardInputs = modal.querySelectorAll('.boxinpt1, .boxinpt3');
    const subject = subjectInput.value.trim();
    const date = dateInput.value;
    const today = new Date().toISOString().split("T")[0];

    if (!subject) {
      alert('Please enter a subject title.');
      return;
    }

    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (date !== today) {
      alert("Please select today's date.");
      return;
    }

    const cards = [];
    let hasError = false;

    cardInputs.forEach((card, index) => {
      const term = card.querySelector('.inpt1')?.value.trim();
      const def = card.querySelector('.inptdef1')?.value.trim();

      if (!term || !def) {
        alert(`Card ${index + 1} is missing a term or definition.`);
        hasError = true;
        return;
      }

      cards.push({ term, definition: def });
    });

    if (hasError) return;


    const flashcardSet = { subject, date, cards };
    const key = `flashcardSet_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(flashcardSet));


    if (typeof window.renderFlashcards === 'function') {
      window.renderFlashcards();
    }


    subjectInput.value = '';
    dateInput.value = '';
    cardInputs.forEach(card => {
      card.querySelector('.inpt1').value = '';
      card.querySelector('.inptdef1').value = '';
    });


    modal.style.display = 'none';

    if (typeof showLoader === "function") {
      showLoader(2300);
    }
  });
});
