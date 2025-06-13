document.addEventListener("DOMContentLoaded", function () {
    const openCardsButton = document.getElementById("opencardsmodal");
    const cardsModal = document.getElementById("cardsmodal");
    const mainPageContent = document.getElementById("maincontent");
  
    if (openCardsButton && cardsModal) {
      openCardsButton.addEventListener("click", function () {
        cardsModal.style.display = "flex";
        document.body.classList.add("modal-active");
        mainPageContent.classList.add("blur");
      });
  
      cardsModal.addEventListener("click", function (e) {
        const backCard = cardsModal.querySelector(".backcard"); 
        const isClickInsideCard = backCard.contains(e.target);
  
        if (!isClickInsideCard) {
          cardsModal.style.display = "none";
          document.body.classList.remove("modal-active");
          mainPageContent.classList.remove("blur");
        }
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById('menu');
    const menuModal = document.getElementById('menumodal');
  
    if (menuButton && menuModal) {
      menuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        menuModal.classList.toggle('active');
      });
  
      document.addEventListener('click', function(event) {
        if (!menuModal.contains(event.target) && event.target !== menuButton) {
          menuModal.classList.remove('active');
        }
      });
    }
  });
   
  