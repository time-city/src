/**
 * Gallery - Filter and show more/less functionality
 * Supports 3 categories: activation, gala, yearend
 */

import { applyI18n } from './i18nRuntime.js';
import { initImageLoader } from './imageLoader.js';

let currentFilter = 'activation'; // Default to Activation Event
let isExpanded = false;
const initialItemsPerCategory = 6; // Show 6 items initially per category
const initialItemsMobile = 6; // Show 6 items total on mobile

// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

function filterGallery(filter) {
  currentFilter = filter;
  isExpanded = false;
  
  const items = document.querySelectorAll('.gallery-item');
  const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
  
  // Update active filter button
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.classList.remove('active');
  });
  if (activeBtn) activeBtn.classList.add('active');
  
  // Get visible items that match the filter
  const visibleItems = Array.from(items).filter(item => {
    const category = item.getAttribute('data-category');
    return category === filter;
  });
  
  // Filter and show/hide items
  items.forEach((item) => {
    const category = item.getAttribute('data-category');
    const shouldShow = category === filter;
    
    if (shouldShow) {
      if (isMobile()) {
        // On mobile: show only first 6 items total (across all categories)
        const itemIndex = visibleItems.indexOf(item);
        
        if (!isExpanded && itemIndex >= initialItemsMobile) {
          // Hide items beyond initial count
          item.classList.add('gallery-item-hidden');
          item.style.display = 'none';
        } else {
          // Show item
          item.classList.remove('gallery-item-hidden');
          item.style.display = '';
        }
      } else {
        // On desktop: show 6 items per category
        const categoryItems = visibleItems.filter(i => 
          i.getAttribute('data-category') === category
        );
        const itemIndex = categoryItems.indexOf(item);
        
        if (!isExpanded && itemIndex >= initialItemsPerCategory) {
          // Hide items beyond initial count
          item.classList.add('gallery-item-hidden');
          item.style.display = 'none';
        } else {
          // Show item
          item.classList.remove('gallery-item-hidden');
          item.style.display = '';
        }
      }
    } else {
      // Hide items that don't match filter
      item.style.display = 'none';
    }
  });
  
  updateToggleButton();
  initImageLoader(); // Re-initialize image loader for new visible images
}

function toggleExpand() {
  const toggleBtn = document.querySelector('.gallery-toggle');
  if (!toggleBtn) return;
  
  // Get current language for loading text
  const currentLang = localStorage.getItem('lang') || 'vi';
  const loadingText = currentLang === 'vi' ? 'Đang tải...' : 'Loading...';
  
  // Show loading state
  toggleBtn.classList.add('loading');
  toggleBtn.disabled = true;
  toggleBtn.innerHTML = `<span class="loading-spinner"></span><span class="loading-text">${loadingText}</span>`;
  
  // Use requestAnimationFrame to ensure UI updates before heavy operation
  requestAnimationFrame(() => {
    // Use setTimeout to allow browser to render loading state
    setTimeout(() => {
      isExpanded = !isExpanded;
      
      const items = document.querySelectorAll('.gallery-item');
      const visibleItems = Array.from(items).filter(item => {
        const category = item.getAttribute('data-category');
        return currentFilter === 'all' || category === currentFilter;
      });
      
      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const shouldShow = category === currentFilter;
        
        if (!shouldShow) return;
        
        if (isExpanded) {
          // Show all items
          item.classList.remove('gallery-item-hidden');
          item.style.display = '';
        } else {
          // Show only initial items
          if (isMobile()) {
            // On mobile: show first 6 items total
            const itemIndex = visibleItems.indexOf(item);
            if (itemIndex < initialItemsMobile) {
              item.classList.remove('gallery-item-hidden');
              item.style.display = '';
            } else {
              item.classList.add('gallery-item-hidden');
              item.style.display = 'none';
            }
          } else {
            // On desktop: show 6 items per category
            const categoryItems = visibleItems.filter(i => 
              i.getAttribute('data-category') === category
            );
            const itemIndex = categoryItems.indexOf(item);
            if (itemIndex < initialItemsPerCategory) {
              item.classList.remove('gallery-item-hidden');
              item.style.display = '';
            } else {
              item.classList.add('gallery-item-hidden');
              item.style.display = 'none';
            }
          }
        }
      });
      
      // Hide loading state and update button
      toggleBtn.classList.remove('loading');
      toggleBtn.disabled = false;
      updateToggleButton();
      
      // Re-init image loader for newly shown images
      setTimeout(() => {
        initImageLoader();
      }, 150);
    }, 100); // Small delay to show loading state
  });
}

function updateToggleButton() {
  const toggleBtn = document.querySelector('.gallery-toggle');
  if (!toggleBtn) return;
  
  // Don't update if button is in loading state
  if (toggleBtn.classList.contains('loading')) {
    return;
  }
  
  const items = document.querySelectorAll('.gallery-item');
  const visibleItems = Array.from(items).filter(item => {
    const category = item.getAttribute('data-category');
    return category === currentFilter;
  });
  
  const totalItems = visibleItems.length;
  const maxInitialItems = isMobile() ? initialItemsMobile : initialItemsPerCategory;
  
  // Only show toggle if there are more items than initial display
  if (totalItems > maxInitialItems) {
    toggleBtn.style.display = 'block';
    toggleBtn.disabled = false;
    toggleBtn.setAttribute('data-i18n', isExpanded ? 'gallery.see_less' : 'gallery.see_more');
    
    // Update text via i18n
    applyI18n();
  } else {
    toggleBtn.style.display = 'none';
  }
}

export function initGallery() {
  // Wait for DOM to be ready
  setTimeout(() => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (filterButtons.length === 0) {
      console.warn('Gallery: No filter buttons found');
      return;
    }
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterGallery(filter);
      });
    });
    
    const toggleBtn = document.querySelector('.gallery-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleExpand);
    }
    
    // Initialize: show initial items for each category
    const items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) {
      console.warn('Gallery: No gallery items found');
      return;
    }
    
    // Initialize with default filter (activation)
    // Set activation button as active
    const activationBtn = document.querySelector('[data-filter="activation"]');
    if (activationBtn) {
      activationBtn.classList.add('active');
    }
    filterGallery('activation');
    
    // Re-filter on window resize (mobile/desktop switch)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        filterGallery(currentFilter);
      }, 250);
    });
    
    // Listen for language changes to update button text
    document.addEventListener('languageChanged', () => {
      updateToggleButton();
    });
  }, 200);
}
