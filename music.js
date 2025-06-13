
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggleBtn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    btn.textContent = "🔊 Stop Music";
  } else {
    music.pause();
    btn.textContent = "🎵 Play Music";
  }
}
