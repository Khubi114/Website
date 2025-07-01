/**
 * Mobile Navigation Toggle
 */
const initMobileMenu = () => {
  const menuToggle = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  const body = document.body;

  if (!menuToggle || !nav) return;

  // Set initial state
  nav.setAttribute('aria-expanded', 'false');
  nav.style.display = 'none';

  menuToggle.addEventListener('click', () => {
    const isExpanded = nav.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu visibility
    nav.style.display = isExpanded ? 'none' : 'flex';
    nav.setAttribute('aria-expanded', String(!isExpanded));
    
    // Update button aria-label
    menuToggle.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    
    // Toggle body scroll lock
    body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // Close menu when clicking on a nav link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.style.display = 'none';
      nav.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
};

/**
 * Smooth Scrolling for Anchor Links
 */
const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Calculate offset (adjust if you have a fixed header)
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
};

/**
 * Close mobile menu on larger screens
 */
const handleResize = () => {
  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.mobile-menu-btn');
  
  if (window.innerWidth >= 768) {
    nav.style.display = '';
    nav.removeAttribute('aria-expanded');
    document.body.style.overflow = '';
  } else if (menuToggle.getAttribute('aria-expanded') === 'false') {
    nav.style.display = 'none';
  }
};

/**
 * Initialize all functions
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScrolling();
  
  // Add resize event listener
  window.addEventListener('resize', handleResize);
  
  // Run once on load
  handleResize();
});

/**
 * Error handling
 */
window.addEventListener('error', (e) => {
  console.error('Error:', e.message);
  // You could add error tracking here
});