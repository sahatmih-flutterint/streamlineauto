// Hamburger menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
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