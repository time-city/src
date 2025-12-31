/**
 * MC THANH TIẾN - PROFILE WEBSITE
 * JavaScript Chính - Quản lý tải ảnh, hiệu ứng cuộn và đếm số
 */

(function() {
  'use strict';

  // ============================================
    // CẤU HÌNH ĐƯỜNG DẪN ẢNH
  // ============================================
  const imageConfig = {
        activation1: {
      folder: 'asset/image/Activation Event/',
      images: [
                'image-1.jpg', '4.jpg', 'image-4.jpg', 'image-5.jpg', 
                'photo-5-16848156045491461276672.png', 'Viettel-21.5.2023-16-of-41.jpg'
      ]
    },
    activation2: {
      folder: 'asset/image/ActivationEvent2/',
      images: [
                'IMG_1566.JPG', 
                'Huda-Carnival-la-dip-e-moi-nguoi-co-them-khong-gian-vui-choi---giai-tri-ben-ban-be.jpeg', 
                'to_chuc_su_kien_tai_nghe_an_10.jpg', 
                'IMG_4496.JPG', 
                'IMG_4497.WEBP', 
                'IMG_4498.WEBP'
            ]
        },
        activation3: {
            folder: 'asset/image/ActivationEvent3/',
            images: [
                'IMG_7069.JPG', 'IMG_7241.JPG', 'IMG_4501.JPG', 
                'IMG_4504.JPG', 'IMG_7116.JPG', 'IMG_4503.JPG'
      ]
    },
        gala1: {
            folder: 'asset/image/Gala Dinner/',
            images: ['image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg', 'image-6.jpg']
        },
        gala2: {
      folder: 'asset/image/Gala Dinner/',
            images: ['image-9.jpg', 'image-13.png', 'image-7.jpg', 'image-10.jpg', 'image-11.jpg', 'image-12.jpg']
        },
        gala3: {
            folder: 'asset/image/Gala3/',
            images: [ 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg','image-1.jpg', 'image-6.jpg']
        },
        teambuilding1: {
            folder: 'asset/image/TeamBuilding/',
            images: [
                'IMG_2514.JPG', 'IMG_9282.JPG', 'IMG_9284.JPG', 
                'IMG_9286.JPG', 'IMG_9287.JPG', 'IMG_9289.JPG'
            ]
        },
        teambuilding2: {
            folder: 'asset/image/TeamBuilding2/',
      images: [
                'LQT03850.jpeg', 'LQT08547.jpeg', 'LQT08080.jpeg', 
                'LQT08001.jpeg', 'LQT07986.jpeg', 'LQT07910.jpeg'
      ]
    },
        clientMeeting1: {
            folder: 'asset/image/client_meeting/',
      images: [
                'LQT01548.jpeg', 'LQT01122.jpeg', 'LQT01058.jpeg', 'IMG_2987.JPG', 
                'IMG_2984.JPG', 'LQT00932.jpeg'
      ]
    },
        yearend1: {
      folder: 'asset/image/Year End Party/',
      images: [
               'IMG_4426.JPG','SHINHAN (352).jpeg', 'SHINHAN (334).jpeg', 'SHINHAN (531).jpeg',  
                'SHINHAN (235).jpeg', 'SHINHAN (168).jpeg', 
            ]
        },
        yearend2: {
            folder: 'asset/image/Year End Party2/',
            images: [
               'IMG_3347.JPG',  'IMG_0162.JPG', 'IMG_0051.JPG', 'SHINHAN (403).jpeg', 
                'SHINHAN (398).jpeg', 'IMG_3348.JPG'
            ]
        },
        otherEvents: {
            folder: 'asset/image/other_events/',
            images: ['image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg']
    }
  };

  const logos = [
        'asset/image/Logo/logo-1.png', 'asset/image/Logo/logo-2.png', 'asset/image/Logo/logo-3.png',
        'asset/image/Logo/logo-4.jpg', 'asset/image/Logo/logo-5.png', 'asset/image/Logo/logo-6.jpg',
        'asset/image/Logo/logo-7.avif', 'asset/image/Logo/logo-8.jpg', 'asset/image/Logo/logo-9.webp',
        'asset/image/Logo/logo-10.jpg', 'asset/image/Logo/logo-11.png', 'asset/image/Logo/logo-12.png',
        'asset/image/Logo/logo-13.png', 'asset/image/Logo/logo-14.png', 'asset/image/Logo/logo-15.png',
        'asset/image/Logo/logo-16.png', 'asset/image/Logo/logo-17.png'
  ];

  // ============================================
    // TẢI ẢNH AN TOÀN VÀ XỬ LÝ LỖI
  // ============================================
  function safeSetImage(img, imagePath) {
    if (!img) return;
    img.src = imagePath;

        img.onload = () => img.classList.add('loaded');

        img.onerror = () => {
      const lastDot = imagePath.lastIndexOf('.');
      if (lastDot > 0) {
        const basePath = imagePath.substring(0, lastDot);
                const extensions = ['jpg', 'png', 'webp', 'JPG', 'PNG', 'WEBP'];
        const currentExt = imagePath.substring(lastDot + 1);
                const nextExt = extensions.find(ext => ext.toLowerCase() !== currentExt.toLowerCase());
        if (nextExt) img.src = `${basePath}.${nextExt}`;
      }
    };
  }

  // ============================================
    // HIỆU ỨNG HẠT LẤP LÁNH (SPARKLES) CHO TẤT CẢ SECTION
    // ============================================
    function injectSparkles() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            // Không thêm nếu đã có container sparkles
            if (section.querySelector('.sparkles-container')) return;

            const container = document.createElement('div');
            container.className = 'sparkles-container';
            container.setAttribute('aria-hidden', 'true');

            // Tạo ngẫu nhiên 10-15 hạt cho mỗi section
            const count = 12;
            for (let i = 0; i < count; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.top = `${Math.random() * 90 + 5}%`;
                sparkle.style.left = `${Math.random() * 90 + 5}%`;
                sparkle.style.animationDelay = `${Math.random() * 4}s`;
                container.appendChild(sparkle);
            }
            section.appendChild(container);
        });
    }

    // ============================================
    // HIỂN THỊ COLLAGE CHO TỪNG SỰ KIỆN
  // ============================================
  function mountEventCollage(eventKey, config) {
    const collage = document.querySelector(`.event-collage[data-event="${eventKey}"]`);
    if (!collage) return;

    const slots = collage.querySelectorAll('img[data-slot]');
    const images = config.images.slice(0, 6);

    slots.forEach((img, idx) => {
            if (images[idx]) {
                safeSetImage(img, `${config.folder}${images[idx]}`);
            }
    });
  }

  // ============================================
    // HIỆU ỨNG ĐẾM SỐ (STATISTICS)
  // ============================================
  function initCountUp() {
    const statsRoot = document.querySelector('.hero-stats');
    if (!statsRoot) return;

        const numbers = statsRoot.querySelectorAll('.stat-number[data-count-to]');
        
        const animateOne = (el) => {
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

            const target = parseInt(el.dataset.countTo);
      const suffix = el.dataset.suffix || '';
            const duration = 1500;
      const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min(1, (now - startTime) / duration);
                const value = Math.floor(progress * target);
                el.textContent = value.toLocaleString('vi-VN') + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            };
      requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0] && entries[0].isIntersecting) {
            numbers.forEach(animateOne);
                observer.disconnect();
          }
        }, { threshold: 0.5 });

        observer.observe(statsRoot);
    }

    // ============================================
    // NÚT CUỘN LÊN ĐẦU TRANG
    // ============================================
    function initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 300);
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
  }

  // ============================================
    // QUẢN LÝ LOADER TRANG
  // ============================================
  function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
          }
  }

  // ============================================
    // KHỞI TẠO TẤT CẢ
  // ============================================
  function init() {
        // Thêm hạt lấp lánh cho tất cả các section
        injectSparkles();

        // Tải collage cho các section
        Object.keys(imageConfig).forEach(key => mountEventCollage(key, imageConfig[key]));

        // Khởi tạo các tính năng khác
    initCountUp();
    initScrollTop();

        // Hiển thị các phần tử reveal
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

        // Ẩn loader
      hidePageLoader();
  }

    // Xuất hàm khởi tạo ra window để index.html có thể gọi
    window.initMCProfile = init;

    // Tự động khởi chạy nếu các phần tử đã có sẵn trong DOM (không dùng loader)
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('hero-placeholder')) {
    init();
  }
    });
})();
