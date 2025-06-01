// Function to set the header height dynamically
function setHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
}

// Set header height on load and resize
window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links with header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const header = document.querySelector('header');
            const navMenu = document.querySelector('nav ul');
            if (!targetElement || !header) return;

            const isMenuOpen = navMenu ? navMenu.classList.contains('active') : false;
            let headerOffset = header.offsetHeight;
            if (isMenuOpen && window.innerWidth <= 768) {
                headerOffset += 60; // Account for nav ul top: 60px
            }

            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close menu on mobile after clicking a link
            if (window.innerWidth <= 768 && navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // FAQ accordion functionality
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            if (!answer) return;
            const isActive = answer.classList.contains('active');

            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0';
            });
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                button.classList.add('active');
            }
        });
    });

    // Theme Toggle
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

    // Load saved theme preference
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('light-mode');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    } catch (e) {
        console.warn('LocalStorage access failed:', e);
    }

    if (darkModeToggle && icon) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            try {
                if (document.body.classList.contains('light-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'light');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'dark');
                }
            } catch (e) {
                console.warn('LocalStorage access failed:', e);
            }
        });
    }

    // Image Lazy-Loading Fallback
    const images = document.querySelectorAll('img.lazy-load');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });

    // Loading Spinner for Images
    document.querySelectorAll('.vehicle-image').forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => img.classList.remove('loading'));
    });

    // Smooth Section Animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Sticky Navigation Highlights
    const navLinks = document.querySelectorAll('nav a');
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: window.innerWidth <= 768 ? '-40px 0px 0px 0px' : '-60px 0px 0px 0px'
    };
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    sections.forEach(section => navObserver.observe(section));

    // Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Съобщението е изпратено! Ще се свържем с вас скоро.');
            e.target.reset();
        });
    }
});

// Header transparency on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Back to Top Button
const backToTopButton = document.querySelector('#back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
    }
});