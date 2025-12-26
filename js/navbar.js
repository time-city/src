/**
 * Navbar - Sticky navigation with scroll effects
 * Hides navbar on scroll down, shows on scroll up
 */

export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add scrolled class for background change
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('navbar-hidden'); // Always show at top
      return;
    }
    
    // Hide/show based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down - hide navbar
      navbar.classList.add('navbar-hidden');
    } else if (currentScroll < lastScroll) {
      // Scrolling up - show navbar
      navbar.classList.remove('navbar-hidden');
    }
    
    lastScroll = currentScroll;
  });
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

