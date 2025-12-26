/**
 * i18nRuntime - Runtime functions for i18n system
 * Handles language switching and DOM updates
 */

import { translations } from './i18n.js';

export function getLang() {
  if (typeof window === 'undefined') return 'vi';
  return localStorage.getItem('lang') || 'vi';
}

export function setLang(lang) {
  if (typeof window === 'undefined') return;
  if (lang === 'vi' || lang === 'en') {
    localStorage.setItem('lang', lang);
  }
}

export function applyI18n(lang = null) {
  const currentLang = lang || getLang();
  
  if (!translations[currentLang]) {
    console.warn(`Language "${currentLang}" not found, falling back to "vi"`);
    return;
  }
  
  function getTranslation(key, lang) {
    // Support both flat keys (lang_vi) and nested keys (nav.home)
    const keys = key.includes('.') ? key.split('.') : [key];
    let value = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (value === undefined && lang !== 'vi') {
      value = translations.vi;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }
    
    return value !== undefined ? value : key;
  }
  
  // Update textContent for [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translation = getTranslation(key, currentLang);
      // Handle nested objects (e.g., services.item1.title)
      if (typeof translation === 'object' && translation !== null) {
        console.warn(`Translation key "${key}" returns object, use nested key instead`);
      } else {
        el.textContent = translation;
      }
    }
  });
  
  // Update placeholder for [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = getTranslation(key, currentLang);
    }
  });
  
  // Update aria-label for [data-i18n-aria]
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', getTranslation(key, currentLang));
    }
  });
  
  // Update title for [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = getTranslation(key, currentLang);
    }
  });
  
  // Update HTML lang attribute
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', currentLang);
  }
  
  // Update active state for language toggle buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Dispatch language changed event
  document.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { lang: currentLang } 
  }));
}

export function bindLangToggle() {
  const langButtons = document.querySelectorAll('[data-lang]');
  const currentLang = getLang();
  
  langButtons.forEach(btn => {
    // Clone to remove existing event listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    const btnLang = newBtn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      newBtn.classList.add('active');
    }
    
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = newBtn.getAttribute('data-lang');
      if (lang === 'vi' || lang === 'en') {
        setLang(lang);
        applyI18n(lang);
      }
    });
  });
}
