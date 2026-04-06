/**
 * 3D Resume Portfolio - Main JavaScript
 * Handles animations, interactions, and form submissions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Navigation.init();
  TypingEffect.init();
  ScrollAnimations.init();
  SkillBars.init();
  ContactForm.init();
  SmoothScroll.init();
  ParallaxEffect.init();
});

/**
 * Navigation Module
 * Handles navbar scroll effects and mobile menu
 */
const Navigation = {
  navbar: null,
  mobileMenuBtn: null,
  mobileMenu: null,

  init() {
    this.navbar = document.getElementById('navbar');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');

    if (!this.navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => this.handleScroll());

    // Mobile menu toggle
    if (this.mobileMenuBtn && this.mobileMenu) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());

      // Close menu on link click
      const links = this.mobileMenu.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }

    // Initial scroll check
    this.handleScroll();
  },

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  },

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('active');
    const icon = this.mobileMenuBtn.querySelector('i');
    if (this.mobileMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  },

  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    const icon = this.mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
};

/**
 * Typing Effect Module
 * Creates typewriter animation for hero section
 */
const TypingEffect = {
  element: null,
  texts: [
    'Software Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Code Enthusiast'
  ],
  textIndex: 0,
  charIndex: 0,
  isDeleting: false,
  typingSpeed: 100,

  init() {
    this.element = document.querySelector('.typing-text');
    if (this.element) {
      this.type();
    }
  },

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingSpeed = 50;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      this.isDeleting = true;
      this.typingSpeed = 2000; // Pause at end
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      this.typingSpeed = 500; // Pause before new word
    }

    setTimeout(() => this.type(), this.typingSpeed);
  }
};

/**
 * Scroll Animations Module
 * Handles fade-in animations on scroll
 */
const ScrollAnimations = {
  elements: [],

  init() {
    // Get all elements that should animate
    this.elements = document.querySelectorAll(
      '.skill-card, .project-card, .timeline-item, .about-image-container, .contact-info-item'
    );

    // Add fade-in class to all elements
    this.elements.forEach(el => {
      el.classList.add('fade-in');
    });

    // Check on scroll and initial load
    window.addEventListener('scroll', () => this.checkScroll());
    this.checkScroll();
  },

  checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    this.elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }
};

/**
 * Skill Bars Module
 * Animates skill progress bars when visible
 */
const SkillBars = {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
              const progress = bar.getAttribute('data-progress');
              bar.style.width = progress + '%';
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }
};

/**
 * Contact Form Module
 * Handles form validation and submission
 */
const ContactForm = {
  form: null,
  submitBtn: null,
  messageEl: null,

  init() {
    this.form = document.getElementById('contact-form');
    this.messageEl = document.getElementById('form-message');

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Real-time validation
      const inputs = this.form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearError(input));
      });
    }
  },

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const name = this.form.querySelector('#name');
    const email = this.form.querySelector('#email');
    const message = this.form.querySelector('#message');

    let isValid = true;
    isValid = this.validateField(name) && isValid;
    isValid = this.validateField(email) && isValid;
    isValid = this.validateField(message) && isValid;

    if (!isValid) return;

    // Get form data
    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: this.form.querySelector('#subject').value.trim(),
      message: message.value.trim()
    };

    // Update button state
    this.setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.showMessage(result.message, 'success');
        this.form.reset();
      } else {
        const errors = result.errors || ['Something went wrong. Please try again.'];
        this.showMessage(errors.join('<br>'), 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Network error. Please try again later.', 'error');
    } finally {
      this.setLoading(false);
    }
  },

  validateField(input) {
    const value = input.value.trim();
    const errorEl = document.getElementById(`${input.id}-error`);
    let error = '';

    switch (input.id) {
      case 'name':
        if (!value) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!this.isValidEmail(value)) {
          error = 'Please enter a valid email';
        }
        break;

      case 'message':
        if (!value) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
    }

    if (errorEl) {
      errorEl.textContent = error;
    }

    return !error;
  },

  clearError(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
    }
  },

  showMessage(message, type) {
    if (!this.messageEl) return;

    this.messageEl.innerHTML = message;
    this.messageEl.className = `form-message ${type}`;

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.messageEl.innerHTML = '';
        this.messageEl.className = 'form-message';
      }, 5000);
    }
  },

  setLoading(isLoading) {
    const btn = this.form.querySelector('button[type="submit"]');
    if (!btn) return;

    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `
        <i class="fas fa-spinner fa-spin mr-2"></i>
        <span>Sending...</span>
      `;
    } else {
      btn.disabled = false;
      btn.innerHTML = `
        <span>Send Message</span>
        <i class="fas fa-paper-plane ml-2"></i>
      `;
    }
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
const SmoothScroll = {
  init() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

/**
 * Parallax Effect Module
 * Adds subtle parallax to background elements
 */
const ParallaxEffect = {
  init() {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
};

/**
 * 3D Tilt Effect for Cards
 * Adds interactive 3D tilt on mouse move
 */
const TiltEffect = {
  init() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  },

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  },

  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }
};

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', () => {
  TiltEffect.init();
});

/**
 * Cursor Glow Effect
 * Adds a subtle glow following the cursor
 */
const CursorGlow = {
  glow: null,

  init() {
    // Create glow element
    this.glow = document.createElement('div');
    this.glow.className = 'cursor-glow';
    this.glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(this.glow);

    // Track cursor
    document.addEventListener('mousemove', (e) => {
      this.glow.style.left = e.clientX + 'px';
      this.glow.style.top = e.clientY + 'px';
    });

    // Hide on touch devices
    document.addEventListener('touchstart', () => {
      this.glow.style.opacity = '0';
    });
  }
};

// Initialize cursor glow
document.addEventListener('DOMContentLoaded', () => {
  CursorGlow.init();
});

/**
 * Performance Optimization
 * Debounce function for scroll events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Preload critical images
 */
function preloadImages() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
}

// Initialize image preloading
window.addEventListener('load', () => {
  preloadImages();
});

console.log(
  '%c👋 Hello, Developer!',
  'font-size: 20px; font-weight: bold; color: #6366f1;'
);
console.log(
  '%cInterested in the code? Feel free to reach out!',
  'font-size: 14px; color: #8b5cf6;'
);
