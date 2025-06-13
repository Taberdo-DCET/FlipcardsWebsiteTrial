const folderBtn = document.getElementById('folder');
  const folderModal = document.getElementById('foldermodal');
  const mainContent = document.getElementById('maincontent');

  folderBtn.addEventListener('click', () => {
    folderModal.style.display = 'flex';
    folderModal.style.justifyContent = 'center';
    folderModal.style.alignItems = 'center';
    folderModal.style.position = 'fixed';
    folderModal.style.top = '0';
    folderModal.style.left = '0';
    folderModal.style.width = '100%';
    folderModal.style.height = '100%';
    folderModal.style.background = 'rgba(0, 0, 0, 0.3)';
    folderModal.style.zIndex = '9998';
    mainContent.style.filter = 'blur(8px)';
  });

  // Close modal if clicking outside it
  window.addEventListener('click', (e) => {
    if (e.target === folderModal) {
      folderModal.style.display = 'none';
      mainContent.style.filter = 'none';
    }
  });