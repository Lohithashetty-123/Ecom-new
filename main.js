// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeAnimations();
  initializeInteractions();
  
  console.log('Furniture Landing Page loaded successfully!');
});

// Initialize scroll animations
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.hero-content, .portfolio-item');
  
  // Add animation classes
  document.querySelector('.hero-content').classList.add('fade-in');
  document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
  });
  
  // Trigger animations on load
  setTimeout(() => {
    animatedElements.forEach(element => {
      element.classList.add('visible');
    });
  }, 300);
}

// Initialize interactive elements
function initializeInteractions() {
  // Social links click handlers
  const socialItems = document.querySelectorAll('.social-item');
  
  socialItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.querySelector('.social-text').textContent;
      
      if (text.includes('https://')) {
        window.open(text, '_blank');
      } else if (text.includes('aashifasheikh12')) {
        if (text.includes('/')) {
          window.open('https://behance.net' + text, '_blank');
        } else {
          window.open('https://dribbble.com/' + text, '_blank');
        }
      }
    });
    
    // Add hover effect
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
  
  // Portfolio items click handlers
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Create modal or lightbox effect
      showPortfolioModal(this.querySelector('.portfolio-image').src, index + 1);
    });
  });
}

// Show portfolio modal
function showPortfolioModal(imageSrc, itemNumber) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'portfolio-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="${imageSrc}" alt="Funiro Landing Page Design ${itemNumber}" class="modal-image">
        <div class="modal-info">
          <h3>Funiro Landing Page Design ${itemNumber}</h3>
          <p>E-Commerce website design template showcasing modern furniture layouts and user experience.</p>
        </div>
      </div>
    </div>
  `;
  
  // Add modal styles
  const modalStyles = `
    .portfolio-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-overlay {
      background: rgba(0, 0, 0, 0.8);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 90%;
      max-height: 90%;
      position: relative;
      overflow: hidden;
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1001;
    }
    
    .modal-image {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .modal-info {
      padding: 1.5rem;
    }
    
    .modal-info h3 {
      font-family: 'Poppins', sans-serif;
      color: #B88E2F;
      margin-bottom: 0.5rem;
    }
  `;
  
  // Add styles to head
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Close modal handlers
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.head.removeChild(styleSheet);
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(modal);
      document.head.removeChild(styleSheet);
    }
  });
  
  // ESC key to close
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      document.head.removeChild(styleSheet);
      document.removeEventListener('keydown', escHandler);
    }
  });
}
