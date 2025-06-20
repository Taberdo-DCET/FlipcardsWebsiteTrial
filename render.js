window.renderFlashcards = function () {
  const containerSelectors = [
    '.wc', '.wc2', '.wc3', '.wc4', '.wc5',
    '.wc6', '.wc7', '.wc8', '.wc9', '.wc10'
  ];

  function renderToContainer(containerClass, containerRootSelector) {
    const root = document.querySelector(containerRootSelector);
    if (!root) return [];

    return containerSelectors
      .map(sel => root.querySelector(sel))
      .filter(Boolean);
  }

  const containersMain = renderToContainer('.FCcont', '.FCcont');
  const containersFolder = renderToContainer('.FCcont22', '.FCcont22');

  const flashcardKeys = Object.keys(localStorage).filter(key =>
    key.startsWith('flashcardSet_')
  );

  flashcardKeys.sort((a, b) => {
    const aTime = parseInt(a.split('_')[1]);
    const bTime = parseInt(b.split('_')[1]);
    return aTime - bTime;
  });

  function populateContainers(containers) {
    const len = containers.length;
    flashcardKeys.forEach((key, i) => {
      const container = containers[i % len]; 
      if (!container) return;

      const data = JSON.parse(localStorage.getItem(key));
      const subject = data.subject || 'No Subject';
      const date = data.date || 'No Date';

   
      container.setAttribute('data-key', key);
      container.setAttribute('data-storage-key', key);

      const titleEl = container.querySelector('[class^="titleflashcard"]');
      const dateEl = container.querySelector('.date');

      if (titleEl) titleEl.textContent = subject;
      if (dateEl) dateEl.textContent = date;

      container.style.display = 'flex';

      const reviewBtn = container.querySelector('.review.opencardsmodal');
      if (reviewBtn) {
        reviewBtn.onclick = () => {
          const modal = document.getElementById('cardsmodal');
          if (modal) modal.style.display = 'flex';
          window.currentFlashcardSet = data;
        };
      }

   
      if (!container.querySelector('.delete1')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete1';
        deleteBtn.innerHTML = `<img src="delete.png" alt="Button Image" style="width: 31px; height: 19px;">`;
        container.appendChild(deleteBtn);
      }
    });


    for (let i = flashcardKeys.length; i < containers.length; i++) {
      containers[i].style.display = 'none';
    }
  }

  populateContainers(containersMain);
  populateContainers(containersFolder);
};




document.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".delete1");
  if (!deleteBtn) return;

  const cardEl = deleteBtn.closest(".wc, .wc2, .wc3, .wc4, .wc5, .wc6, .wc7, .wc8, .wc9, .wc10");
  if (!cardEl) return;

  const subject = cardEl.querySelector('[class^="titleflashcard"]')?.textContent?.trim();
  const date = cardEl.querySelector('.date')?.textContent?.trim();

  const keys = Object.keys(localStorage);
  for (let key of keys) {
    if (key.startsWith("flashcardSet_")) {
      const data = JSON.parse(localStorage.getItem(key));
      if (data.subject === subject && data.date === date) {
        localStorage.removeItem(key);
        break;
      }
    }
  }

  if (typeof window.renderFlashcards === "function") {
    window.renderFlashcards();
  }
});
