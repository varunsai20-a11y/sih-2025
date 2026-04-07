// i18n utility functions
window.SARATHI_I18N = window.SARATHI_I18N || {};

// Current language
let currentLang = localStorage.getItem("lang") || "en";

// Translation function
function t(key, params = {}) {
  const translations =
    window.SARATHI_I18N[currentLang] || window.SARATHI_I18N["en"];
  let text = translations[key] || key;

  // Replace any parameters in the text
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(`{${param}}`, value);
  });

  return text;
}

// Language switcher
function setLanguage(lang) {
  if (window.SARATHI_I18N[lang]) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Dispatch event for components to update
    window.dispatchEvent(
      new CustomEvent("languagechange", {
        detail: { language: lang },
      })
    );

    return true;
  }
  return false;
}

// Get current language
function getCurrentLanguage() {
  return currentLang;
}

// Export the functions
window.SARATHI_I18N.t = t;
window.SARATHI_I18N.setLanguage = setLanguage;
window.SARATHI_I18N.getCurrentLanguage = getCurrentLanguage;

// Initialize language from localStorage or browser preference
(function initLanguage() {
  const savedLang = localStorage.getItem("lang");
  if (savedLang && window.SARATHI_I18N[savedLang]) {
    setLanguage(savedLang);
  } else {
    // Try to match browser language
    const browserLang = navigator.language.split("-")[0];
    if (window.SARATHI_I18N[browserLang]) {
      setLanguage(browserLang);
    } else {
      setLanguage("en"); // fallback to English
    }
  }
})();
