// Function to update all translatable elements in the DOM
function updateTranslations() {
  if (!window.SARATHI_I18N?.t) return; // Wait for i18n to be ready

  // Update elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = window.SARATHI_I18N.t(el.dataset.i18n);
    if (text) el.textContent = text;
  });

  // Update elements with data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const text = window.SARATHI_I18N.t(el.dataset.i18nPlaceholder);
    if (text) el.placeholder = text;
  });

  // Update elements with data-i18n-title attribute
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const text = window.SARATHI_I18N.t(el.dataset.i18nTitle);
    if (text) el.title = text;
  });

  // Update document title
  document.title = window.SARATHI_I18N.t("app.title");

  // Update dynamic content
  // setNet and PT_OPTIONS/renderPTOptions may be defined by the main app module.
  // Guard their usage so this file can run safely if modules haven't finished
  // loading (for example when the page is opened from file:// or scripts
  // load in a different order).
  if (typeof setNet === "function") setNet();
  else {
    // Try to call setNet later if it becomes available.
    const trySetNet = () => {
      if (typeof setNet === "function") {
        setNet();
        window.removeEventListener("load", trySetNet);
      }
    };
    window.addEventListener("load", trySetNet);
  }

  if (
    Array.isArray(window.PT_OPTIONS) &&
    window.PT_OPTIONS.length > 0 &&
    typeof renderPTOptions === "function"
  ) {
    renderPTOptions();
  }
}

// Listen for language changes - both standard and our custom event
["languagechange", "langchange"].forEach((event) => {
  window.addEventListener(event, updateTranslations);
});

// Initialize translations
document.addEventListener("DOMContentLoaded", () => {
  // Wire up language switcher
  document.querySelectorAll("#lang .pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const lang = pill.dataset.lang;
      // First update the UI immediately for responsiveness
      document.querySelectorAll("#lang .pill").forEach((p) => {
        p.classList.toggle("active", p.dataset.lang === lang);
      });
      // Then try to switch the language
      if (!window.SARATHI_I18N?.setLanguage(lang)) {
        console.error("Failed to switch language to:", lang);
        // Revert UI if language switch failed
        const currentLang = window.SARATHI_I18N?.getCurrentLanguage() || "en";
        document.querySelectorAll("#lang .pill").forEach((p) => {
          p.classList.toggle("active", p.dataset.lang === currentLang);
        });
      }
    });
  });

  // Make sure we have the initial translations loaded
  setTimeout(updateTranslations, 0);
});
