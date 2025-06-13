  const textArea = document.getElementById('text');

  window.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
      textArea.value = savedContent;
    }
  });

  textArea.addEventListener('input', () => {
    localStorage.setItem('notepadContent', textArea.value);
  });

  function clearNotes() {
    textArea.value = '';
    localStorage.removeItem('notepadContent');
  }