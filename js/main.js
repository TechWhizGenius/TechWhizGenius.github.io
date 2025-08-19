/**
 * Data Science Portfolio - Main JavaScript (Fixed Version)
 * Professional interactive functionality for Teja Mandaloju's portfolio
 * 
 * Features:
 * - Dynamic header component loading (fixed duplication issue)
 * - Smooth scrolling navigation
 * - Mobile menu management
 * - Scroll-based effects and animations
 * - Form validation and submission
 * - Active section highlighting
 * - Performance optimized with throttling
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const CONFIG = {
    // Component paths
    HEADER_COMPONENT_PATH: './components/header.html',
    
    // Scroll settings
    SCROLL_THRESHOLD: 50,
    SCROLL_OFFSET: 100,
    
    // Animation settings
    ANIMATION_DELAY: 100,
    THROTTLE_DELAY: 16, // ~60fps
    
    // Form settings
    FORM_SUBMIT_URL: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your form endpoint
    
    // Selectors
    SELECTORS: {
      header: '.portfolio-header',
      headerContainer: '.header-container',
      navLinks: '.nav-link, .mobile-nav-link',
      mobileToggle: '#mobileToggle',
      mobileMenu: '#mobileMenu',
      scrollElements: '.animate-on-scroll',
      contactForm: '#contact-form',
      backToTop: '#back-to-top'
    }
  };
  
  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  /**
   * Throttle function to limit execution frequency
   * @param {Function} func - Function to throttle
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Throttled function
   */
  const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };
  
  /**
   * Debounce function to delay execution
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };
  
  /**
   * Get current page name from URL
   * @returns {string} Current page name
   */
  const getCurrentPage = () => {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  };
  
  /**
   * Show loading indicator
   * @param {Element} element - Element to show loading in
   */
  const showLoading = (element) => {
    if (element) {
      element.innerHTML = '<div class="loading-spinner">Loading header...</div>';
      element.classList.add('loading');
    }
  };
  
  // ============================================
  // HEADER COMPONENT LOADER (FIXED VERSION)
  // ============================================
  
  /**
   * Load header component dynamically - FIXED to prevent duplicates
   * Fetches header HTML and injects into page with error handling
   */
  const loadHeaderComponent = async () => {
    const headerPlaceholder = document.querySelector('[data-component="header"]');
    
    if (!headerPlaceholder) {
      console.warn('Header placeholder not found. Add <div data-component="header"></div> to your HTML.');
      return;
    }
  
    // Check if header is already loaded
    if (document.querySelector('.portfolio-header')) {
      console.log('Header already loaded, skipping...');
      return;
    }
  
    showLoading(headerPlaceholder);
  
    try {
      const response = await fetch(CONFIG.HEADER_COMPONENT_PATH);
      
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
      }
  
      const headerHTML = await response.text();
      
      // Replace the placeholder with the header content
      headerPlaceholder.outerHTML = headerHTML;
      console.log('Header component loaded successfully');
      
      // Small delay to ensure DOM is ready, then initialize functionality
      setTimeout(() => {
        initAdditionalFeatures();
        adjustBodyPadding();
      }, 100);
  
    } catch (error) {
      console.error('Error loading header component:', error);
      
      // Fallback to basic header
      headerPlaceholder.innerHTML = `
        <header class="portfolio-header" id="portfolioHeader">
          <div class="header-container">
            <a href="index.html" class="logo-section">
              <div class="logo-icon">TM</div>
              <div class="logo-text">
                <span class="logo-name">Teja Mandaloju</span>
                <span class="logo-role">MLOps Engineer & Data Scientist</span>
              </div>
            </a>
            <nav class="main-nav">
              <ul class="nav-list">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="experience.html" class="nav-link">Experience</a></li>
                <li><a href="projects.html" class="nav-link">Projects</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
              </ul>
            </nav>
            <button class="mobile-toggle" id="mobileToggle">
              <i class="fas fa-bars"></i>
            </button>
          </div>
          <div class="mobile-menu" id="mobileMenu">
            <ul class="mobile-nav-list">
              <li><a href="index.html" class="mobile-nav-link">Home</a></li>
              <li><a href="experience.html" class="mobile-nav-link">Experience</a></li>
              <li><a href="projects.html" class="mobile-nav-link">Projects</a></li>
              <li><a href="#contact" class="mobile-nav-link">Contact</a></li>
            </ul>
          </div>
        </header>
      `;
      
      setTimeout(() => {
        initAdditionalFeatures();
        adjustBodyPadding();
      }, 100);
    }
  };
  
  /**
   * Initialize additional features (beyond what's in the header component)
   */
  const initAdditionalFeatures = () => {
    initBackToTop();
    initFormHandling();
    initAnimations();
  };
  
  /**
   * Adjust body padding based on header height
   */
  const adjustBodyPadding = () => {
    const header = document.querySelector('.portfolio-header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = `${headerHeight}px`;
    }
  };
  
  // ============================================
  // SCROLL EFFECTS
  // ============================================
  
  /**
   * Initialize back to top functionality
   */
  const initBackToTop = () => {
    // Create back to top button if it doesn't exist
    if (!document.querySelector('#back-to-top')) {
      createBackToTopButton();
    }
    
    const backToTopBtn = document.querySelector('#back-to-top');
    if (!backToTopBtn) return;
  
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Show/hide based on scroll position
    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > window.innerHeight;
      
      if (shouldShow) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(20px)';
      }
    }, CONFIG.THROTTLE_DELAY);
  
    window.addEventListener('scroll', handleScroll, { passive: true });
  };
  
  /**
   * Create back to top button
   */
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-600, #2563eb);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
    `;
    
    document.body.appendChild(button);
  };
  
  // ============================================
  // ANIMATIONS
  // ============================================
  
  /**
   * Initialize scroll-triggered animations
   */
  const initAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate], .animate-on-scroll');
    
    if (animatedElements.length === 0) return;
  
    // Set up intersection observer for performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);
  
    animatedElements.forEach(element => {
      // Add initial hidden state
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      observer.observe(element);
    });
  };
  
  /**
   * Animate element when it enters viewport
   * @param {Element} element - Element to animate
   */
  const animateElement = (element) => {
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.classList.add('animated');
    }, delay);
  };
  
  // ============================================
  // FORM HANDLING
  // ============================================
  
  /**
   * Initialize form validation and submission
   */
  const initFormHandling = () => {
    const forms = document.querySelectorAll('form[data-form="contact"]');
    
    forms.forEach(form => {
      form.addEventListener('submit', handleFormSubmission);
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
      });
    });
  };
  
  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form before submission
    if (!validateForm(form)) {
      showFormMessage(form, 'Please fix the errors below.', 'error');
      return;
    }
    
    // Show loading state
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch(CONFIG.FORM_SUBMIT_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      showFormMessage(form, 'Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Restore button state
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  };
  
  /**
   * Validate entire form
   * @param {Element} form - Form to validate
   * @returns {boolean} True if form is valid
   */
  const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  };
  
  /**
   * Validate individual field
   * @param {Element} field - Field to validate
   * @returns {boolean} True if field is valid
   */
  const validateField = (field) => {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    
    // Minimum length validation
    else if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (value.length < minLength) {
        isValid = false;
        errorMessage = `Minimum ${minLength} characters required.`;
      }
    }
    
    // Show/hide error message
    if (isValid) {
      clearFieldError(field);
    } else {
      showFieldError(field, errorMessage);
    }
    
    return isValid;
  };
  
  /**
   * Show field error message
   * @param {Element} field - Field with error
   * @param {string} message - Error message
   */
  const showFieldError = (field, message) => {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorElement);
  };
  
  /**
   * Clear field error message
   * @param {Element} field - Field to clear error from
   */
  const clearFieldError = (field) => {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  };
  
  /**
   * Show form message (success/error)
   * @param {Element} form - Form element
   * @param {string} message - Message to show
   * @param {string} type - Message type ('success' or 'error')
   */
  const showFormMessage = (form, message, type) => {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      font-weight: 500;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
    `;
    
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  };
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  /**
   * Initialize all portfolio functionality
   */
  const initPortfolio = async () => {
    try {
      console.log('Initializing portfolio...');
      
      // Load header component first (this will handle all header functionality)
      await loadHeaderComponent();
      
      console.log('Portfolio initialized successfully');
      
    } catch (error) {
      console.error('Error initializing portfolio:', error);
    }
  };
  
  // ============================================
  // EVENT LISTENERS & STARTUP
  // ============================================
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    // DOM is already ready
    initPortfolio();
  }
  
  // Export functions for external use if needed
  window.PortfolioJS = {
    loadHeaderComponent,
    initAnimations,
    initFormHandling
  };