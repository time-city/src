/**
 * Main App - Orchestrator for all modules
 */

import { includePartials } from './js/includePartials.js';
import { bindLangToggle, applyI18n, getLang } from './js/i18nRuntime.js';
import { initHero } from './js/hero.js';
import { initEvents } from './js/events.js';
import { initTOC } from './js/toc.js';
import { initNavbar } from './js/navbar.js';
import { initModals } from './js/modal.js';
import { initCounters } from './js/counters.js';
import { initReveal } from './js/reveal.js';
import { initGallery } from './js/gallery.js';
import { initImageLoader } from './js/imageLoader.js';
// import { initAccordion } from './js/accordion.js'; // Removed - FAQ section removed

// Initialize app
async function init() {
  try {
    // Step 1: Load partials
    await includePartials();
    
    // Step 2: Initialize i18n (must be after partials are loaded)
    bindLangToggle();
    applyI18n(getLang());
    
    // Step 3: Initialize all modules
    initHero();
    initEvents();
    initNavbar();
    initTOC();
    initModals();
    initCounters();
    initReveal();
    initGallery();
    initImageLoader(); // Initialize smooth image loading
    // initAccordion(); // Removed - FAQ section removed
    
    // Step 4: Re-apply i18n after modules init (some modules may add elements dynamically)
    requestAnimationFrame(() => {
      applyI18n(getLang());
      // Re-init image loader for dynamically added images
      setTimeout(() => initImageLoader(), 200);
    });
    
    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing app:', error);
  }
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
