// Advanced animations and effects
class AnimationController {
  constructor() {
    this.observers = [];
    this.init();
  }
  
  init() {
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupHoverAnimations();
  }
  
  // Setup scroll-triggered animations
  setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);
      
      // Observe elements for animation
      const animateElements = document.querySelectorAll('.social-item, .portfolio-item');
      animateElements.forEach(el => {
        observer.observe(el);
      });
      
      this.observers.push(observer);
    }
  }
  
  // Setup parallax scrolling effects
  setupParallaxEffects() {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.portfolio-item');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestParallaxUpdate);
  }
  
  // Setup advanced hover animations
  setupHoverAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e);
        this.animateNeighbors(item, 'expand');
      });
      
      item.addEventListener('mouseleave', (e) => {
        this.animateNeighbors(item, 'contract');
      });
    });
  }
  
  // Create ripple effect on hover
  createRippleEffect(e) {
    const ripple = document.createElement('div');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(184, 142, 47, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Animate neighboring elements
  animateNeighbors(activeItem, action) {
    const allItems = document.querySelectorAll('.portfolio-item');
    
    allItems.forEach(item => {
      if (item !== activeItem) {
        if (action === 'expand') {
          item.style.transform = 'scale(0.95) translateY(10px)';
          item.style.opacity = '0.7';
        } else {
          item.style.transform = '';
          item.style.opacity = '';
        }
      }
    });
  }
  
  // Cleanup observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animationController = new AnimationController();
  
  // Store reference for potential cleanup
  window.animationController = animationController;
});

// Smooth scrolling utility
function smoothScrollTo(target, duration = 1000) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

// Performance monitoring
const performanceMonitor = {
  init() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page Load Performance:', {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            totalTime: perfData.loadEventEnd - perfData.fetchStart
          });
        }, 0);
      });
    }
  }
};

performanceMonitor.init();
