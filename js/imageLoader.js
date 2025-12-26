/**
 * Image Loader - Smooth fade-in effect when images are fully loaded
 * Prevents showing images until they're completely loaded
 */

export function initImageLoader() {
  // Find all images that need smooth loading
  const images = document.querySelectorAll('img[loading="lazy"], img:not([loading="eager"])');
  
  images.forEach((img) => {
    // Skip if already processed
    if (img.dataset.loaded) return;
    
    // Add loading class and hide image initially
    img.classList.add('image-loading');
    img.style.opacity = '0';
    
    // Create loading placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder-loading';
    placeholder.innerHTML = '<div class="loading-skeleton"></div>';
    
    // Insert placeholder before image
    if (img.parentElement) {
      // Ensure parent has relative positioning for absolute placeholder
      const parent = img.parentElement;
      const parentPosition = getComputedStyle(parent).position;
      if (parentPosition === 'static') {
        parent.style.position = 'relative';
      }
      
      // Position placeholder absolutely to cover image area
      placeholder.style.position = 'absolute';
      placeholder.style.top = '0';
      placeholder.style.left = '0';
      placeholder.style.width = '100%';
      placeholder.style.height = '100%';
      
      parent.insertBefore(placeholder, img);
    }
    
    // Handle image load
    const handleLoad = () => {
      img.classList.remove('image-loading');
      img.classList.add('image-loaded');
      
      // Fade in image
      requestAnimationFrame(() => {
        img.style.transition = 'opacity 0.5s ease-in-out';
        img.style.opacity = '1';
      });
      
      // Remove placeholder after fade-in
      setTimeout(() => {
        if (placeholder && placeholder.parentElement) {
          placeholder.style.transition = 'opacity 0.3s ease-out';
          placeholder.style.opacity = '0';
          setTimeout(() => {
            if (placeholder.parentElement) {
              placeholder.remove();
            }
          }, 300);
        }
      }, 500);
      
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      img.dataset.loaded = 'true';
    };
    
    // Handle image error
    const handleError = () => {
      img.classList.remove('image-loading');
      img.classList.add('image-error');
      
      // Remove placeholder
      if (placeholder && placeholder.parentElement) {
        placeholder.remove();
      }
      
      // Show error state (keep existing onerror handler)
      img.style.opacity = '0.5';
      
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      img.dataset.loaded = 'true';
    };
    
    // Check if image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
      // Image already loaded, show immediately
      setTimeout(handleLoad, 50);
    } else {
      // Wait for load
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
    }
  });
  
  // Re-run for dynamically added images (e.g., when gallery expands)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Check if added node is an image
          if (node.tagName === 'IMG' && !node.dataset.loaded) {
            setTimeout(() => initImageLoader(), 100);
          }
          // Check for images inside added node
          const newImages = node.querySelectorAll && node.querySelectorAll('img:not([data-loaded])');
          if (newImages && newImages.length > 0) {
            setTimeout(() => initImageLoader(), 100);
          }
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

