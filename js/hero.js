/**
 * Hero Section JavaScript
 * Handles hero animations and interactions
 */

export function initHero() {
  // Try to load background image from src/background/
  const heroBg = document.querySelector('.hero-background');
  if (heroBg) {
    // Try bg-1.jpg first, then any first image found
    const bgImages = ['bg-1.jpg', 'bg-1.JPG', 'background.jpg', 'background.JPG'];
    let bgLoaded = false;
    
    bgImages.forEach(bgName => {
      if (!bgLoaded) {
        const img = new Image();
        img.src = `../background/${bgName}`;
        img.onload = () => {
          heroBg.style.backgroundImage = `url(../background/${bgName})`;
          heroBg.style.backgroundSize = 'cover';
          heroBg.style.backgroundPosition = 'center';
          heroBg.style.backgroundRepeat = 'no-repeat';
          bgLoaded = true;
        };
      }
    });
  }
  
  // Hero image reveal animation
  const heroImage = document.querySelector('.hero .model-image img');
  if (heroImage) {
    heroImage.addEventListener('load', () => {
      heroImage.style.opacity = '0';
      heroImage.style.transition = 'opacity 0.8s ease';
      setTimeout(() => {
        heroImage.style.opacity = '1';
      }, 100);
    });
    
    // If image already loaded
    if (heroImage.complete) {
      heroImage.style.opacity = '1';
    }
  }
  
  // Parallax effect on scroll (subtle)
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
      const parallaxValue = scrollY * 0.3;
      const heroBackground = hero.querySelector('.hero-background');
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${parallaxValue}px)`;
      }
    }
    
    lastScroll = scrollY;
  });
  
  // Reveal animations
  const revealElements = document.querySelectorAll('.hero .reveal-left, .hero .reveal-right');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  revealElements.forEach(el => observer.observe(el));
}

