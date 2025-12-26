/**
 * Reveal - IntersectionObserver for scroll animations
 */

export function initReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, entry.target.classList.contains('reveal-stagger') ? index * 100 : 0);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  elements.forEach(el => observer.observe(el));
}

