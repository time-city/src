/**
 * Accordion - FAQ accordion with keyboard accessibility
 */

export function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
      });
      
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
    
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
    
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('tabindex', '0');
  });
}

