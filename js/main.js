/**
 * Data Science Portfolio - Main JavaScript
 * Professional interactive functionality for Teja Mandaloju's portfolio
 * 
 * Features:
 * - Dynamic header component loading
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
      header: '#portfolio-header',
      headerContainer: '.header-container',
      navLinks: '.nav-link, .mobile-nav-link',
      mobileToggle: '#mobile-toggle',
      mobileMenu: '#mobile-menu',
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
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is visible
   */
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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
      element.innerHTML = '<div class="loading-spinner">Loading...</div>';
      element.classList.add('loading');
    }
  };
  
  /**
   * Hide loading indicator
   * @param {Element} element - Element to hide loading from
   */
  const hideLoading = (element) => {
    if (element) {
      element.classList.remove('loading');
    }
  };
  
  // ============================================
  // HEADER COMPONENT LOADER
  // ============================================
  
  /**
   * Load header component dynamically
   * Fetches header HTML and injects into page with error handling
   */
  const loadHeaderComponent = async () => {
    const headerPlaceholder = document.querySelector('[data-component="header"]');
    
    if (!headerPlaceholder) {
      console.warn('Header placeholder not found. Add <div data-component="header"></div> to your HTML.');
      return;
    }
  
    showLoading(headerPlaceholder);
  
    try {
      const response = await fetch(CONFIG.HEADER_COMPONENT_PATH);
      
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
      }
  
      const headerHTML = await response.text();
      
      // Extract just the header element from the component file
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headerHTML;
      const headerElement = tempDiv.querySelector('.portfolio-header');
      
      if (headerElement) {
        headerPlaceholder.outerHTML = headerElement.outerHTML;
        console.log('Header component loaded successfully');
        
        // Initialize header-related functionality after loading
        await initHeaderFunctionality();
      } else {
        throw new Error('Header element not found in component file');
      }
  
    } catch (error) {
      console.error('Error loading header component:', error);
      
      // Fallback to basic header
      headerPlaceholder.innerHTML = `
        <header class="portfolio-header">
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
          </div>
        </header>
      `;
      
      await initHeaderFunctionality();
    }
  };
  
  /**
   * Initialize header-specific functionality after component loads
   */
  const initHeaderFunctionality = async () => {
    // Small delay to ensure DOM is ready
    await new Promise(resolve => setTimeout(resolve, 50));
    
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    
    // Ensure proper body padding for fixed header
    adjustBodyPadding();
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
  // NAVIGATION FUNCTIONALITY
  // ============================================
  
  /**
   * Initialize navigation functionality
   * Handles active link highlighting and smooth scrolling
   */
  const initNavigation = () => {
    setActiveNavLink();
    initSmoothScrolling();
    
    // Update active link on navigation
    window.addEventListener('popstate', setActiveNavLink);
  };
  
  /**
   * Set active navigation link based on current page
   */
  const setActiveNavLink = () => {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll(CONFIG.SELECTORS.navLinks);
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      const isCurrentPage = href === currentPage || 
                           (currentPage === '' && href === 'index.html') ||
                           (href.startsWith('#') && currentPage === 'index.html');
      
      if (isCurrentPage) {
        link.classList.add('active');
      }
    });
  };
  
  /**
   * Initialize smooth scrolling for anchor links
   */
  const initSmoothScrolling = () => {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const header = document.querySelector('.portfolio-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - CONFIG.SCROLL_OFFSET;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  };
  
  // ============================================
  // MOBILE MENU FUNCTIONALITY
  // ============================================
  
  /**
   * Initialize mobile menu functionality
   */
  const initMobileMenu = () => {
    const mobileToggle = document.querySelector('[id*="mobile"], [class*="mobile-toggle"]');
    const mobileMenu = document.querySelector('[id*="mobile-menu"], [class*="mobile-menu"]');
    
    if (!mobileToggle || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }
  
    // Toggle mobile menu
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  
    // Close menu when clicking on links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const header = document.querySelector('.portfolio-header');
      if (header && !header.contains(e.target)) {
        closeMobileMenu();
      }
    });
  
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  
    // Close menu on window resize to desktop
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250));
  };
  
  /**
   * Toggle mobile menu open/closed
   */
  const toggleMobileMenu = () => {
    const mobileMenu = document.querySelector('[id*="mobile-menu"], [class*="mobile-menu"]');
    const mobileToggle = document.querySelector('[id*="mobile"], [class*="mobile-toggle"]');
    const toggleIcon = mobileToggle?.querySelector('i');
    
    if (!mobileMenu) return;
  
    const isActive = mobileMenu.classList.toggle('active');
    
    // Update toggle icon
    if (toggleIcon) {
      toggleIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    // Accessibility
    mobileToggle?.setAttribute('aria-expanded', isActive.toString());
    mobileMenu.setAttribute('aria-hidden', (!isActive).toString());
  };
  
  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    const mobileMenu = document.querySelector('[id*="mobile-menu"], [class*="mobile-menu"]');
    const mobileToggle = document.querySelector('[id*="mobile"], [class*="mobile-toggle"]');
    const toggleIcon = mobileToggle?.querySelector('i');
    
    if (!mobileMenu) return;
  
    mobileMenu.classList.remove('active');
    
    // Reset toggle icon
    if (toggleIcon) {
      toggleIcon.className = 'fas fa-bars';
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Accessibility
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };
  
  // ============================================
  // SCROLL EFFECTS
  // ============================================
  
  /**
   * Initialize scroll-based effects
   */
  const initScrollEffects = () => {
    initHeaderScrollEffect();
    initActiveSection();
    initBackToTop();
    
    // Throttled scroll handler for performance
    const handleScroll = throttle(() => {
      updateHeaderOnScroll();
      updateActiveSectionOnScroll();
      updateBackToTopVisibility();
    }, CONFIG.THROTTLE_DELAY);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  };
  
  /**
   * Initialize header transparency effect on scroll
   */
  const initHeaderScrollEffect = () => {
    updateHeaderOnScroll(); // Set initial state
  };
  
  /**
   * Update header appearance based on scroll position
   */
  const updateHeaderOnScroll = () => {
    const header = document.querySelector('.portfolio-header');
    if (!header) return;
  
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  /**
   * Initialize active section highlighting
   */
  const initActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
  
    updateActiveSectionOnScroll();
  };
  
  /**
   * Update active section based on scroll position
   */
  const updateActiveSectionOnScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    if (sections.length === 0) return;
  
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = document.querySelector('.portfolio-header')?.offsetHeight || 0;
    
    let activeSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - CONFIG.SCROLL_OFFSET;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        activeSection = section.getAttribute('id');
      }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeSection}`);
    });
  };
  
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
      background: var(--primary-600);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      transition: var(--transition-normal);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
    `;
    
    document.body.appendChild(button);
  };
  
  /**
   * Update back to top button visibility
   */
  const updateBackToTopVisibility = () => {
    const backToTopBtn = document.querySelector('#back-to-top');
    if (!backToTopBtn) return;
  
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
      color: var(--error);
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
      background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
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
  // PERFORMANCE MONITORING
  // ============================================
  
  /**
   * Monitor and log performance metrics
   */
  const monitorPerformance = () => {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Performance:', {
              'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
              'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
              'Total Load Time': Math.round(perfData.loadEventEnd - perfData.navigationStart)
            });
          }
        }, 0);
      });
    }
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
      
      // Load header component first
      await loadHeaderComponent();
      
      // Initialize all other functionality
      initAnimations();
      initFormHandling();
      
      // Monitor performance in development
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        monitorPerformance();
      }
      
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
  
  // Handle page visibility changes for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden - pause any unnecessary operations
      console.log('Page hidden - pausing operations');
    } else {
      // Page is visible - resume operations
      console.log('Page visible - resuming operations');
    }
  });
  
  // Export functions for external use if needed
  window.PortfolioJS = {
    loadHeaderComponent,
    initNavigation,
    initMobileMenu,
    initScrollEffects,
    initAnimations,
    initFormHandling,
    toggleMobileMenu,
    closeMobileMenu
  };