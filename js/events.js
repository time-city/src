/**
 * Events Section JavaScript
 * Handles event section animations and interactions
 */

import { openModal } from './modal.js';
import { applyI18n } from './i18nRuntime.js';

// Map event types to video file names
const videoMap = {
  'activation': 'asset/video/Activation Event.mp4',
  'gala': 'asset/video/Gala Dinner.mp4',
  'yearend': 'asset/video/Year End Party.mp4'
};

// Map event types to Vietnamese titles
const eventTitles = {
  'activation': 'Activation Event',
  'gala': 'Gala Dinner',
  'yearend': 'Year End Party'
};

export function initEvents() {
  // Ensure i18n is applied to event buttons after DOM is ready
  setTimeout(() => {
    applyI18n();
  }, 100);
  // IntersectionObserver for reveal animations
  const revealElements = document.querySelectorAll('.event-section .reveal-left, .event-section .reveal-right');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
  
  // Gallery button handlers - scroll to gallery section with filter
  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-gallery');
      
      // Scroll to gallery section
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Trigger filter after a short delay to ensure section is visible
        setTimeout(() => {
          const filterBtn = document.querySelector(`[data-filter="${eventType}"]`);
          if (filterBtn) {
            filterBtn.click();
          }
        }, 500);
      }
    });
  });
  
  // Video button handlers - open video modal
  document.querySelectorAll('[data-video]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-video');
      openVideoModal(eventType);
    });
  });
}

function openVideoModal(eventType) {
  const videoPath = videoMap[eventType];
  if (!videoPath) {
    console.error(`No video found for event type: ${eventType}`);
    return;
  }
  
  const videoPlayer = document.getElementById('event-video-player');
  const videoSource = document.getElementById('event-video-source');
  const modalTitle = document.getElementById('video-modal-title');
  
  if (!videoPlayer || !videoSource) {
    console.error('Video modal elements not found');
    return;
  }
  
  // Set video source
  videoSource.src = videoPath;
  videoPlayer.load();
  
  // Update modal title with event name
  const eventTitle = eventTitles[eventType] || 'Video';
  if (modalTitle) {
    modalTitle.textContent = eventTitle;
  }
  
  // Open modal
  openModal('video-modal');
  
  // Play video when modal opens (optional - can be removed if you want user to click play)
  videoPlayer.addEventListener('loadedmetadata', () => {
    // Video is ready, but don't auto-play (better UX)
    // videoPlayer.play().catch(err => console.log('Auto-play prevented:', err));
  }, { once: true });
  
  // Reset video when modal closes
  const modal = document.getElementById('video-modal');
  if (modal) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (!modal.classList.contains('active')) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
          }
        }
      });
    });
    
    observer.observe(modal, { attributes: true });
  }
}

