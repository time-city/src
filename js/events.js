/**
 * Events Section JavaScript
 * Handles event section animations and interactions
 */

export function initEvents() {
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
  
  // Gallery/Video button handlers (placeholder for future expansion)
  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-gallery');
      console.log(`Open gallery for: ${eventType}`);
      // TODO: Implement gallery modal
    });
  });
  
  document.querySelectorAll('[data-video]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventType = btn.getAttribute('data-video');
      console.log(`Open video for: ${eventType}`);
      // TODO: Implement video modal/player
    });
  });
}

