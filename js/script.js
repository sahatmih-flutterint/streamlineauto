// Function to set the header height dynamically
function setHeaderHeight() {
    const header = document.querySelector('header');
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

// Set header height on load and resize
window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);

// Hamburger menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const toggle = document.querySelector('.menu-toggle');
    toggle.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('active');
});

// Smooth scrolling for navigation links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const header = document.querySelector('header');
        const navMenu = document.querySelector('nav ul');
        const isMenuOpen = navMenu.classList.contains('active');
        
        // Base header height
        let headerOffset = header.offsetHeight;
        // Add extra offset if menu is open on mobile (menu height approximated as 60px)
        if (isMenuOpen && window.innerWidth <= 768) {
            headerOffset += 60; // Account for the nav ul top: 60px
        }

        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.menu-toggle').classList.remove('active');
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
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

// Header transparency on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Back to Top Button
const backToTopButton = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.scrollY > 300);
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Image Lazy-Loading Fallback
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img.lazy-load');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
});

// Loading Spinner for Images
document.querySelectorAll('.vehicle-image').forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', () => img.classList.remove('loading'));
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
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
// Adjust rootMargin based on screen size
const navObserverOptions = {
    threshold: 0.3,
    rootMargin: window.innerWidth <= 768 ? '-40px 0px 0px 0px' : '-60px 0px 0px 0px' // Smaller offset on mobile
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
document.querySelector('#contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Съобщението е изпратено! Ще се свържем с вас скоро.');
    e.target.reset();
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('#preloader');
    preloader.classList.add('fade-out');
});
