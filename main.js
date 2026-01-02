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
            images: ['image-9.jpg', 'image-13.png', 'image-7.jpg', 'new1.jpeg', 'new2.jpeg', 'image-12.jpg']
        },
        gala3: {
            folder: 'asset/image/Gala3/',
            images: [ 'image-2.jpg', 'new3.jpeg', 'new4.jpeg', 'new5.jpeg','image-1.jpg', 'image-6.jpg']
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
        teambuilding3: {
            folder: 'asset/image/TeamBuilding3/',
            images: ['image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg', 'image-6.jpg']
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
               'IMG_3347.JPG',  'IMG_0162.JPG', 'IMG_9087.JPG', 'SHINHAN (403).jpeg', 
                'SHINHAN (398).jpeg', 'IMG_3348.JPG'
            ]
        },
        otherEvents: {
            folder: 'asset/image/other/',
            images: [
                'SHINHAN (168).jpeg', 'IMG_4501.JPG', 'IMG_7116.JPG', 'IMG_9087.JPG', 'TTD04105.jpeg',
                'TTD03357.jpeg', 'SHINHAN (403).jpeg', 'TTD03828.jpeg', 'SHINHAN (531).jpeg', 'LQT01122.jpeg',
                'IMG_9088.JPG', 'IMG_9099.JPG', 'LQT01470.jpeg', 'IMG_0161.JPG', 'LQT03850 (1).jpeg', 
                'IMG_1564.JPG', 'IMG_9284 (1).JPG', 'LQT07888.jpeg', 'LQT08547.jpeg'
            ]
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
        // Xử lý Collage mặc định (6 ảnh)
        const collage = document.querySelector(`.event-collage[data-event="${eventKey}"]`);
        if (collage) {
            const slots = collage.querySelectorAll('img[data-slot]');
            const images = config.images.slice(0, 6);
            slots.forEach((img, idx) => {
                if (images[idx]) {
                    safeSetImage(img, `${config.folder}${images[idx]}`);
                }
            });
        }

        // Xử lý Dynamic Grid (Tất cả ảnh trong folder) - Dành riêng cho Other Events
        const dynamicGrid = document.querySelector(`.event-dynamic-grid[data-event="${eventKey}"]`);
        if (dynamicGrid) {
            dynamicGrid.innerHTML = ''; // Clear existing
            config.images.forEach((imgName, idx) => {
                const item = document.createElement('div');
                item.className = 'event-collage-item';
                
                const img = document.createElement('img');
                img.alt = `Other event photo ${idx + 1}`;
                img.loading = 'lazy';
                img.decoding = 'async';
                
                item.appendChild(img);
                dynamicGrid.appendChild(item);
                
                safeSetImage(img, `${config.folder}${imgName}`);
            });
        }
    }

  // ============================================
    // HIỆU ỨNG ĐẾM SỐ (STATISTICS)
  // ============================================
  function initCountUp() {
    // Tìm cả ở hero (nếu còn) và about
    const statsRoots = document.querySelectorAll('.hero-stats, .about-stats-grid');
    if (statsRoots.length === 0) return;

    statsRoots.forEach(statsRoot => {
        const numbers = statsRoot.querySelectorAll('.stat-number[data-count-to]');
        
        const animateOne = (el) => {
            if (el.dataset.animated === 'true') return;
            el.dataset.animated = 'true';

            const target = parseInt(el.dataset.countTo);
            const suffix = el.dataset.suffix || '';
            const duration = 2000; // Tăng thời gian đếm lên 2s cho mượt
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
        }, { threshold: 0.2 }); // Giảm threshold để kích hoạt sớm hơn

        observer.observe(statsRoot);
    });
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
    // TRANG TRÍ GALLERY (VỆT SÁNG & BOKEH)
    // ============================================
    function decorateGalleries() {
        const galleries = document.querySelectorAll('.event-section--gallery');
        galleries.forEach(section => {
            // Thêm vệt sáng (Light Streak)
            if (!section.querySelector('.light-streak')) {
                const streak = document.createElement('div');
                streak.className = 'light-streak';
                section.appendChild(streak);
            }

            // Thêm vài hạt Bokeh nổi mờ
            for (let i = 0; i < 2; i++) {
                const bokeh = document.createElement('div');
                bokeh.className = 'bokeh-circle';
                bokeh.style.top = `${Math.random() * 80}%`;
                bokeh.style.left = `${Math.random() * 80}%`;
                bokeh.style.animationDelay = `${Math.random() * 5}s`;
                section.appendChild(bokeh);
            }
        });
    }

  // ============================================
    // HIỆU ỨNG HẠT LẤP LÁNH (SPARKLES) CHO TẤT CẢ SECTION
    // ============================================
    function injectSparkles() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (section.querySelector('.sparkles-container')) return;

            const container = document.createElement('div');
            container.className = 'sparkles-container';
            container.setAttribute('aria-hidden', 'true');

            const count = 10;
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
    // TỰ ĐỘNG PHÁT VIDEO CÓ ÂM THANH KHI CUỘN TỚI
    // ============================================
    function initAutoPlayVideos() {
        const videos = document.querySelectorAll('.profile-video, .hero-video');
        if (videos.length === 0) return;

        let audioUnlocked = false;

        const unlockAndUnmuteAll = () => {
            if (audioUnlocked) return;
            audioUnlocked = true;
            
            videos.forEach(v => {
                // Chỉ tự động mở tiếng nếu không có thuộc tính data-keep-muted
                if (!v.paused && !v.hasAttribute('data-keep-muted')) {
                    v.muted = false;
                    updateMuteUI(v);
                }
            });
            
            document.removeEventListener('click', unlockAndUnmuteAll);
            document.removeEventListener('touchstart', unlockAndUnmuteAll);
        };

        document.addEventListener('click', unlockAndUnmuteAll);
        document.addEventListener('touchstart', unlockAndUnmuteAll);

        const updateMuteUI = (video) => {
            const container = video.closest('.video-container');
            if (!container) return;
            const unmuteIcon = container.querySelector('.unmute-icon');
            const muteIcon = container.querySelector('.mute-icon');
            if (unmuteIcon && muteIcon) {
                unmuteIcon.style.display = video.muted ? 'none' : 'block';
                muteIcon.style.display = video.muted ? 'block' : 'none';
            }
        };

        document.querySelectorAll('.mute-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const video = btn.closest('.video-container').querySelector('video');
                if (video) {
                    video.muted = !video.muted;
                    audioUnlocked = true;
                    updateMuteUI(video);
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting) {
                    // Chỉ tự động mở tiếng nếu đã tương tác và video không được yêu cầu giữ im lặng
                    if (audioUnlocked && !video.hasAttribute('data-keep-muted')) {
                        video.muted = false;
                    } else {
                        video.muted = true;
                    }
                    updateMuteUI(video);
                    
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            video.muted = true;
                            video.play();
                            updateMuteUI(video);
                        });
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.2 });

        videos.forEach(video => observer.observe(video));
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
        initAutoPlayVideos();

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
