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
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-5.jpg', 'image-9.jpg', 'image-10.jpg'
      ]
    },
    gala: {
      folder: 'asset/image/Gala Dinner/',
      images: [
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg', 'image-6.jpg'
      ]
    },
    yearend: {
      folder: 'asset/image/Year End Party/',
      images: [
        'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg', 'image-10.jpg'
      ]
    }
  };

  // ============================================
  // Load Image with Skeleton - Simplified
  // ============================================
  function safeSetImage(img, imagePath) {
    if (!img) return;
    img.src = imagePath;

    img.onload = function() {
      img.classList.add('loaded');
    };

    img.onerror = function() {
      const lastDot = imagePath.lastIndexOf('.');
      if (lastDot > 0) {
        const basePath = imagePath.substring(0, lastDot);
        const extensions = ['jpg', 'JPG', 'png', 'PNG', 'webp', 'WEBP'];
        const currentExt = imagePath.substring(lastDot + 1);
        const nextExt = extensions.find(ext => ext !== currentExt && ext.toLowerCase() !== currentExt.toLowerCase());
        if (nextExt) img.src = `${basePath}.${nextExt}`;
      }
    };
  }

  // ============================================
  // Load Collage Images
  // ============================================
  function mountEventCollage(eventKey, config) {
    const collage = document.querySelector(`.event-collage[data-event="${eventKey}"]`);
    if (!collage) return;

    // Fixed 6-slot template; do NOT reorder DOM
    const slots = collage.querySelectorAll('img[data-slot]');
    const images = config.images.slice(0, 6);

    slots.forEach((img, idx) => {
      const imageFile = images[idx];
      if (!imageFile) return;
      const imagePath = `${config.folder}${imageFile}`;
      safeSetImage(img, imagePath);
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
  // Count Up Numbers (Hero Stats)
  // ============================================
  function initCountUp() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const statsRoot = document.querySelector('.hero-stats');
    if (!statsRoot) return;

    const numbers = Array.from(statsRoot.querySelectorAll('.stat-number[data-count-to]'));
    if (numbers.length === 0) return;

    function formatNumber(n) {
      try {
        return new Intl.NumberFormat('vi-VN').format(n);
      } catch (_) {
        return String(n);
      }
    }

    function animateOne(el) {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      const target = Number(el.dataset.countTo || el.getAttribute('data-count-to') || 0);
      const suffix = el.dataset.suffix || '';
      const duration = Number(el.dataset.duration || 1100);

      const startValue = 0;
      const startTime = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function tick(now) {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = easeOutCubic(t);
        const value = Math.round(startValue + (target - startValue) * eased);
        el.textContent = `${formatNumber(value)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      }

      // start from 0 immediately for visual pop
      el.textContent = `${formatNumber(0)}${suffix}`;
      requestAnimationFrame(tick);
    }

    // Run when visible (fallback: run immediately)
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            numbers.forEach(animateOne);
            io.disconnect();
          }
        });
      }, { threshold: 0.35 });

      io.observe(statsRoot);
    } else {
      numbers.forEach(animateOne);
    }
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
    // Collage: master 6-slot template per section
    mountEventCollage('activation', imageConfig.activation);
    mountEventCollage('gala', imageConfig.gala);
    mountEventCollage('yearend', imageConfig.yearend);

    // Initialize reveal animation
    initRevealAnimation();

    // Hero count up
    initCountUp();

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
