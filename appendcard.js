document.addEventListener('DOMContentLoaded', () => {
  const addCardButton = document.querySelector('#addcardmdll .addd');
  const cardContainer = document.querySelector('#addcardmdll .mdladdcard');

  addCardButton.addEventListener('click', () => {
    const existingCards = cardContainer.querySelectorAll('.boxinpt1, .boxinpt3');
    const nextNumber = existingCards.length + 1;

    const newCard = document.createElement('div');
    newCard.classList.add('boxinpt3'); 

    newCard.innerHTML = `
      <p1 class="numbercard">${nextNumber}</p1>
      <button class="delete">
        <img src="delete.png" alt="Button Image" style="width: 31px; height: 19px;">
      </button>
      <input class="inpt1" placeholder="Enter Term">
      <input class="inptdef1" placeholder="Enter Definition">
    `;

    const addButtonBox = cardContainer.querySelector('.boxinpt2');
    cardContainer.insertBefore(newCard, addButtonBox);
  });


  cardContainer.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete');
  if (deleteBtn) {
    e.preventDefault(); 
    e.stopPropagation(); 

    const cardToDelete = deleteBtn.closest('.boxinpt1, .boxinpt3');
    cardToDelete.remove();

    const remainingCards = cardContainer.querySelectorAll('.boxinpt1, .boxinpt3');
    remainingCards.forEach((card, index) => {
      const numberLabel = card.querySelector('.numbercard');
      if (numberLabel) numberLabel.textContent = index + 1;
    });
  }
});
});
