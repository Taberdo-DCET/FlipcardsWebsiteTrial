document.addEventListener("DOMContentLoaded", function () {
  const settingsBtn = document.querySelector(".settings");
  const closeSettingsBtn = document.querySelector(".closesettings");
  const settingsModal = document.querySelector(".settingss");

  if (settingsBtn && settingsModal && closeSettingsBtn) {
    settingsBtn.addEventListener("click", () => {
      settingsModal.style.display = "flex";
    });

    closeSettingsBtn.addEventListener("click", () => {
      settingsModal.style.display = "none";
    });
  }
});
