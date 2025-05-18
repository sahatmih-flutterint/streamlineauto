// Hamburger menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const toggle = document.querySelector('.menu-toggle');
    toggle.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
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

// Dark Mode Toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});