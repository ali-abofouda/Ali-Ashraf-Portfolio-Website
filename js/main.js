/**
 * Ali Ashraf - Portfolio Website
 * Main JavaScript File
 * Handles navigation, smooth scrolling, animations, and form interactions
 */

// ========== DOM Elements ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('current-year');
const themeToggle = document.getElementById('theme-toggle');
const loader = document.getElementById('loader');
const typingText = document.getElementById('typing-text');
const scrollProgress = document.getElementById('scroll-progress');

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initScrollEffects();
    initScrollProgress();
    initBackToTop();
    initContactForm();
    setCurrentYear();
    initSmoothScroll();
    initThemeToggle();
    initTypingAnimation();
    initScrollReveal();
    initCertificateModal();
    initParallax();
});

// ========== Navigation ==========
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== Scroll Effects ==========
function initScrollEffects() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class for navbar styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll(
        '.stat-card, .skill-category, .project-card, .timeline-item, .contact-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========== Back to Top Button ==========
function initBackToTop() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== Contact Form ==========
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Check if form action is a real endpoint
            const formAction = contactForm.getAttribute('action');
            
            if (formAction && formAction !== '#' && !formAction.includes('yourformid')) {
                // Submit to actual form endpoint (e.g., Formspree)
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } else {
                // Demo mode - simulate successful submission
                await simulateFormSubmission();
                showNotification('Demo: Message would be sent. Set up Formspree to enable real submissions.', 'info');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again or email directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Simulate form submission for demo
function simulateFormSubmission() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1200;
        animation: slideUp 0.3s ease;
        max-width: 90%;
        font-size: 0.9375rem;
    `;

    // Type-specific colors
    const colors = {
        success: { bg: '#10b981', text: '#ffffff' },
        error: { bg: '#ef4444', text: '#ffffff' },
        info: { bg: '#3b82f6', text: '#ffffff' }
    };

    notification.style.backgroundColor = colors[type].bg;
    notification.style.color = colors[type].text;

    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        margin-left: 8px;
        opacity: 0.8;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========== Set Current Year ==========
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// ========== Theme Toggle (Dark Mode) ==========
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ========== Utility Functions ==========

// Debounce function for performance optimization
function debounce(func, wait = 10) {
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

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== Scroll Progress Indicator ==========
function initScrollProgress() {
    if (!scrollProgress) return;
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    window.addEventListener('scroll', throttle(updateScrollProgress, 10));
    updateScrollProgress(); // Initial call
}

// ========== Parallax Effect ==========
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            const heroVisual = hero.querySelector('.hero-visual');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }, 16));
    }
}

// ========== Keyboard Navigation ==========
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== Performance Optimization ==========
// Optimize scroll event handlers
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

// ========== Lazy Loading for Images (if any) ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Console Easter Egg ==========
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold;');
console.log('%c📧 Interested in working together? Contact me at ali.ashraf.abofouda@gmail.com', 'font-size: 14px;');
console.log('%c🔍 Feel free to explore the code!', 'font-size: 14px;');

// ========== Loading Screen ==========
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
}

// ========== Typing Animation ==========
function initTypingAnimation() {
    const titles = [
        'Data Scientist',
        'Machine Learning Engineer',
        'AI Specialist',
        'Computer Vision Developer',
        'Deep Learning Enthusiast'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation
    if (typingText) {
        setTimeout(type, 1000);
    }
}

// ========== Scroll Reveal Animations ==========
function initScrollReveal() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-title, .about-text, .about-stats, .skill-category, .project-card, .timeline-item, .contact-card, .testimonial-card'
    );
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Add stagger class to grids
    const staggerGrids = document.querySelectorAll('.skills-grid, .projects-grid, .contact-info');
    staggerGrids.forEach(grid => {
        grid.classList.add('stagger-children');
    });
    
    // Intersection Observer for reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });
}

// ========== Certificate Modal ==========
function initCertificateModal() {
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('cert-modal-image');
    const modalClose = document.getElementById('cert-modal-close');
    const zoomButtons = document.querySelectorAll('.cert-zoom');
    
    // Open modal on zoom button click
    zoomButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const imageSrc = btn.getAttribute('data-image');
            modalImage.src = imageSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
