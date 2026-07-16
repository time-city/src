/**
 * MC THANH TIẾN - PROFILE WEBSITE
 * JavaScript Chính - Quản lý tải ảnh, hiệu ứng cuộn và đếm số
 */

(function () {
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
            images: ['image-2.jpg', 'new3.jpeg', 'new4.jpeg', 'new5.jpeg', 'image-1.jpg', 'image-6.jpg']
        },
        gala4: {
            folder: 'asset/image/Gala4/',
            images: ['image-3.jpg', 'image-2.jpg', 'image-1.jpg', 'image-4.jpg', 'image-5.jpg', 'image-6.jpg']
        },
        yearend5: {
            folder: 'asset/image/year end party5/',
            images: [
                'DSC03303.jpeg', 'DSC03640.jpeg', 'MCM_2.jpeg', 'DSC02270.jpeg', 
                'DSC02495.jpeg', 'IMG_0605.JPG'
            ]
        },
        gala6: {
            folder: 'asset/image/Gala6/',
            images: [
                'SAG08430.jpg', 'SAG08449.jpg', 'SAG08642.jpg',
                'SAG08716.jpg', 'SAG08883.jpg', 'SAG08905.jpg'
            ]
        },
        gala7: {
            folder: 'asset/image/Gala7/',
            images: [
                '1679d2fc-cf23-493b-9dea-f395ce44bb51.jpeg',
                '27b83388-940c-4b30-8f89-7427354d2d63 (1).jpeg',
                '54d3e174-5194-42dd-a0c7-970b50503c0.jpeg',
                '5da18ff2-c07a-4d00-bf7e-5a281505552c.jpeg',
                '9f35a47c-37e2-45ac-9c57-b0f37b1c4c1c.jpeg',
                'c85e5eb9-d4c0-4c3a-890b-103d098926dd.jpeg'
            ]
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
        teambuilding4: {
            folder: 'asset/image/teambuilding4/',
            images: [
                '2aOboQjrZbFMWbRqNDN5ElAI7Md7RlBYpzUR7g3c.jpg', '2aoboqjrzn2zlhqfkblj1zspkdz2bviixr3qqxu826.jpg',
                '2aoboqjrzo5qrrtimqz5p9b8q8d4bkrgqlwspkiq27.jpg', '2aoboqjrzqd7x4tizd8huxlwzkcuqjovzzl3jpa828.jpg',
                '2aoboqjrzrbmp26wvciblp9jwext9pc1yeq82mjs29.jpg', '2aoboqjrzumd9ubf2zw336gp3x5gkck0y2x6hbuc30.jpg'
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
                'IMG_4426.JPG', 'SHINHAN (352).jpeg', 'SHINHAN (334).jpeg', 'SHINHAN (531).jpeg',
                'SHINHAN (235).jpeg', 'SHINHAN (168).jpeg',
            ]
        },
        yearend2: {
            folder: 'asset/image/Year End Party2/',
            images: [
                'IMG_3347.JPG', 'IMG_0162.JPG', 'IMG_9087.JPG', 'SHINHAN (403).jpeg',
                'SHINHAN (398).jpeg', 'IMG_3348.JPG'
            ]
        },
        yearend3: {
            folder: 'asset/image/Year End Party3/',
            images: [
                'e0706fca-2aec-47a2-8ef4-1bc151563045.jpeg',
                '973ffccc-4e64-49d2-81d5-3aef24650272.jpeg',
                'b73eaf4e-5b91-406e-851d-85dd187ba218.jpeg',

                'a3922ee1-37e6-41ff-a10a-03198835fd88.jpeg',
                'cbc2ef13-3bfb-4bd2-b3cb-64305a3e65b1.jpeg',
                'f2e533ac-14fa-4537-942a-da0c8820ad45.jpeg'
            ]
        },
        yearend4: {
            folder: 'asset/image/Year End Party4/',
            images: [
                'DSC00708.JPG',

                '2beddac8-f829-4497-9967-11afa0cf206a.jpeg',
                '2e3db9b7-8325-4d26-b39c-25321d79d412.jpeg',
                '7c3c1047-6c1b-41ce-883a-b20f0a8b0755.jpeg',
                'b73b0d23-2565-4d4e-9cb1-eecfbb832534.jpeg',
                'f1c83f95-d9c5-4da2-908c-07590e2ac5e1.jpeg',
            ]
        },
        otherEvents: {
            folder: 'asset/image/other/',
            images: [
                'asset/image/Year End Party/SHINHAN (168).jpeg',
                'asset/image/ActivationEvent3/IMG_4501.JPG',
                'asset/image/ActivationEvent3/IMG_7116.JPG',
                'asset/image/Year End Party2/IMG_9087.JPG',
                'asset/image/Year End Party2/SHINHAN (403).jpeg',
                'asset/image/Year End Party/SHINHAN (531).jpeg',
                'asset/image/client_meeting/LQT01122.jpeg',
                'asset/image/Year End Party2/IMG_9088.JPG',
                'asset/image/Year End Party2/IMG_9099.JPG',
                'asset/image/TeamBuilding2/LQT08547.jpeg',
                'asset/image/TeamBuilding2/LQT03850.jpeg',
                'asset/image/TeamBuilding/IMG_9284.JPG'
            ]
        },
        mbs: {
            folder: 'asset/image/MBS/',
            images: [
                'IMG_8212.PNG', 'DUA05854.jpeg', 'DSC01385.jpeg', 'TUS00802.jpeg', 'TUS01816.jpeg', 'TUS01826.jpeg'
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

        img.onload = () => img.classList.add('loaded');

        img.onerror = () => {
            // Ngăn chặn infinite loop bằng cách gỡ sự kiện onerror
            img.onerror = null;
            const lastDot = imagePath.lastIndexOf('.');
            if (lastDot > 0) {
                const basePath = imagePath.substring(0, lastDot);
                const extensions = ['jpg', 'png', 'webp', 'jpeg', 'JPG', 'PNG', 'WEBP', 'JPEG'];
                const currentExt = imagePath.substring(lastDot + 1);
                // Thử các extension khác, tránh thử lại extension cũ
                const nextExt = extensions.find(ext => ext.toLowerCase() !== currentExt.toLowerCase());
                if (nextExt) {
                    img.src = `${basePath}.${nextExt}`;
                }
            }
        };

        img.src = imagePath;
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
                    const imgPath = images[idx].startsWith('asset/') ? images[idx] : `${config.folder}${images[idx]}`;
                    safeSetImage(img, imgPath);
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

                const imgPath = imgName.startsWith('asset/') ? imgName : `${config.folder}${imgName}`;
                safeSetImage(img, imgPath);
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

            // Tìm video đầu tiên đang phát để bật tiếng, đảm bảo chỉ có 1 nguồn âm thanh
            let unmutedAny = false;
            videos.forEach(v => {
                if (!v.paused && !unmutedAny) {
                    v.muted = false;
                    unmutedAny = true;
                    updateMuteUI(v);
                } else {
                    v.muted = true;
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
                    const willBeMuted = !video.muted;

                    if (!willBeMuted) {
                        // Nếu đang bật tiếng video này, tắt tiếng tất cả các video khác
                        videos.forEach(v => {
                            if (v !== video) {
                                v.muted = true;
                                updateMuteUI(v);
                            }
                        });
                    }

                    video.muted = willBeMuted;
                    audioUnlocked = true;
                    updateMuteUI(video);
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;

                if (entry.isIntersecting) {
                    // TỰ ĐỘNG BẬT TIẾNG: 
                    // Khi một video xuất hiện, nếu đã có tương tác người dùng (audioUnlocked), 
                    // ta sẽ tắt tiếng tất cả các video khác trước khi bật tiếng video này.
                    if (audioUnlocked) {
                        videos.forEach(v => {
                            if (v !== video) {
                                v.muted = true;
                                updateMuteUI(v);
                            }
                        });
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
