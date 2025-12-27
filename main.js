/**
 * MC Thanh Tiến - Profile Website
 * Main JavaScript - Load images, reveal animations
 */

(function() {
  'use strict';

  // ============================================
  // Image Paths Configuration
  // ============================================
  const imageConfig = {
    activation: {
      folder: 'asset/image/Activation Event/',
      images: [
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-5.jpg', 'image-9.jpg'
      ]
    },
    gala: {
      folder: 'asset/image/Gala Dinner/',
      images: [
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg', 'image-6.jpg'
      ]
    },
    yearend1: {
      folder: 'asset/image/Year End Party/',
      images: [
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg'
      ]
    },
    yearend2: {
      folder: 'asset/image/Year End Party/',
      images: [
        'image-10.jpg', 'image-11.jpg', 'image-12.jpg', 'image-13.jpg', 'image-14.jpg'
      ]
    }
  };

  // ============================================
  // Load Image with Skeleton - Simplified
  // ============================================
  function createCollageItem(imagePath, isHero = false) {
    const item = document.createElement('div');
    item.className = isHero ? 'collage-item collage-item--hero' : 'collage-item';

    const frame = document.createElement('div');
    frame.className = 'frame';

    // Create skeleton
    const skeleton = document.createElement('div');
    skeleton.className = 'image-skeleton';

    // Create image
    const img = document.createElement('img');
    img.alt = 'Event Image';
    img.loading = 'eager';
    img.decoding = 'async';

    // Set image source directly
    img.src = imagePath;

    img.onload = function() {
      img.classList.add('loaded');
    };

    img.onerror = function() {
      // Try alternative extensions if original fails
      const lastDot = imagePath.lastIndexOf('.');
      if (lastDot > 0) {
        const basePath = imagePath.substring(0, lastDot);
        const extensions = ['jpg', 'JPG', 'png', 'PNG', 'webp'];
        const currentExt = imagePath.substring(lastDot + 1);
        
        // Try next extension
        const nextExt = extensions.find(ext => ext !== currentExt && ext.toLowerCase() !== currentExt.toLowerCase());
        if (nextExt) {
          img.src = `${basePath}.${nextExt}`;
        } else {
          // All failed, show placeholder
          skeleton.style.display = 'none';
          frame.innerHTML = '<div class="image-placeholder">Image</div>';
        }
      } else {
        skeleton.style.display = 'none';
        frame.innerHTML = '<div class="image-placeholder">Image</div>';
      }
    };

    frame.appendChild(skeleton);
    frame.appendChild(img);
    item.appendChild(frame);
    return item;
  }

  // ============================================
  // Load Collage Images
  // ============================================
  function mountCollage(selector, config, count) {
    const grid = document.querySelector(selector);
    if (!grid) return;

    const images = config.images.slice(0, count);
    grid.innerHTML = '';
    grid.dataset.count = String(images.length);

    images.forEach((imageFile, index) => {
      const imagePath = `${config.folder}${imageFile}`;
      const isHero = index === 0;
      grid.appendChild(createCollageItem(imagePath, isHero));
    });
  }

  // ============================================
  // Reveal Animation on Scroll - Simplified
  // ============================================
  function initRevealAnimation() {
    // Show all elements immediately - no animation for better performance
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // ============================================
  // Page Loader Management
  // ============================================
  function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }
  }

  // Model PNGs are rendered as floating visuals (no frame/skeleton needed)

  // ============================================
  // Initialize on DOM Ready
  // ============================================
  function init() {
    // Collage: ONLY event photos go into frames/grids
    mountCollage('.collage-grid[data-collage="activation"]', imageConfig.activation, 5);
    mountCollage('.collage-grid[data-collage="gala"]', imageConfig.gala, 6);
    mountCollage('.collage-grid[data-collage="yearend-1"]', imageConfig.yearend1, 5);
    mountCollage('.collage-grid[data-collage="yearend-2"]', imageConfig.yearend2, 5);

    // Initialize reveal animation
    initRevealAnimation();

    // Simplified loader - hide after short delay
    setTimeout(() => {
      hidePageLoader();
    }, 1500);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
