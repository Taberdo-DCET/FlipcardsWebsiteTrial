const musicModal = document.getElementById("musicModal");
const spotifyPlayer = document.getElementById("spotifyPlayer");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicCloseBtn = document.getElementById("musicCloseBtn");

// 🎵 Toggle Spotify player visibility
function toggleMusic() {
  const isVisible = musicModal.style.display === "block";
  musicModal.style.display = isVisible ? "none" : "block";
  musicToggleBtn.textContent = isVisible ? "🎵 Play Music" : "🔊 Hide Music";
}

// ❌ Optional: Hide the Spotify section
if (musicCloseBtn) {
  musicCloseBtn.addEventListener("click", () => {
    musicModal.style.display = "none";
    musicToggleBtn.textContent = "🎵 Play Music";
  });
}

// ❌ Close the settings modal ONLY
document.querySelectorAll(".closesettings").forEach((btn) => {
  btn.addEventListener("click", () => {
    const settingsModal = document.querySelector(".settingss");
    if (settingsModal) {
      settingsModal.style.display = "none";
    }
  });
});
