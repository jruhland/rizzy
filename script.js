document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        for (const span of spans) {
            span.classList.toggle('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            for (const span of spans) {
                span.classList.remove('active');
            }
        }
    });

    // Smooth scroll for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    for (const anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                for (const span of spans) {
                    span.classList.remove('active');
                }
            }
        });
    }

    // Form submission handling
    const form = document.getElementById('contact-form');
    const formContainer = form.parentElement;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData(form);
            await fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            
            // Replace form with thank you message
            formContainer.innerHTML = `
                <div class="thank-you-message">
                    <h3>Thank You!</h3>
                    <p>Your message has been received. We'll get back to you shortly.</p>
                </div>
            `;
        } catch (error) {
            console.error('Form submission error:', error);
            formContainer.innerHTML = `
                <div class="error-message">
                    <h3>Oops!</h3>
                    <p>Something went wrong. Please try again.</p>
                    <button class="submit-btn" onclick="location.reload()">Try Again</button>
                </div>
            `;
        }
    });

    // Auto-expand textarea
    const textarea = document.querySelector('textarea');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        const newHeight = Math.min(this.scrollHeight, 25 * 24); // 25 rows max, 24px per row
        this.style.height = newHeight + 'px';
    });
}); 