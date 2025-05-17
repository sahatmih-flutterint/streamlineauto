// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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