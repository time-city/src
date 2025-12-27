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

  const logos = [
    'asset/image/Logo/logo-1.png',
    'asset/image/Logo/logo-2.png',
    'asset/image/Logo/logo-3.png',
    'asset/image/Logo/logo-4.jpg',
    'asset/image/Logo/logo-5.png',
    'asset/image/Logo/logo-6.jpg',
    'asset/image/Logo/logo-7.avif',
    'asset/image/Logo/logo-8.jpg',
    'asset/image/Logo/logo-9.webp',
    'asset/image/Logo/logo-10.jpg'
  ];

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

  function renderClientLogos() {
    const grid = document.querySelector('.clients-grid');
    if (!grid) return;

    const isMobile = window.innerWidth <= 768;
    const maxItems = isMobile ? 12 : logos.length;
    const list = logos.slice(0, maxItems);

    grid.innerHTML = list.map((src, idx) => {
      const alt = `Logo đối tác ${idx + 1}`;
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
    }).join('');
  }

  function initMobileGlobalBackground() {
    const globalBg = document.getElementById('global-bg');
    if (!globalBg) return;

    const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      globalBg.style.display = 'none';
      return;
    }

    globalBg.style.display = 'block';

    const sections = Array.from(document.querySelectorAll('.section'));
    if (!sections.length) return;

    const getBg = (section) => {
      const layer = section.querySelector('.bg-layer');
      if (!layer) return '';
      return layer.style.backgroundImage || window.getComputedStyle(layer).backgroundImage || '';
    };

    let currentBg = getBg(sections[0]) || '';
    if (currentBg) {
      globalBg.style.backgroundImage = currentBg;
    }

    let lastChange = performance.now();
    const MIN_DELAY = 700; // avoid rapid swaps that feel laggy

    const io = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      });
      if (!best) return;

      const nextBg = getBg(best.target);
      if (!nextBg || nextBg === currentBg) return;

       // throttle changes to reduce jank on mobile
      const now = performance.now();
      if (now - lastChange < MIN_DELAY) return;
      lastChange = now;

      globalBg.style.opacity = '0';
      setTimeout(() => {
        globalBg.style.backgroundImage = nextBg;
        globalBg.style.opacity = '1';
        currentBg = nextBg;
      }, 220);
    }, { threshold: [0.25, 0.4, 0.6] });

    sections.forEach((section) => io.observe(section));
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

    // Mobile global background swap (parallax-like)
    initMobileGlobalBackground();

    // Render client logos
    renderClientLogos();

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
