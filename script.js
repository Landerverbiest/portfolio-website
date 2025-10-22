// ========================================
// Navigation & Mobile Menu
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Skill Bar Animation on Scroll
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (barPosition < screenPosition) {
            bar.style.width = bar.style.width || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const countryCodeSelect = document.getElementById('countryCode');
const customCountryCodeInput = document.getElementById('customCountryCode');

// Show custom country code input when "Anders..." is selected
if (countryCodeSelect && customCountryCodeInput) {
    countryCodeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customCountryCodeInput.style.display = 'block';
            customCountryCodeInput.required = true;
        } else {
            customCountryCodeInput.style.display = 'none';
            customCountryCodeInput.required = false;
            customCountryCodeInput.value = '';
        }
    });
}

// Form validation and submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const serviceType = document.getElementById('eventType').value;
        const company = document.getElementById('company') ? document.getElementById('company').value.trim() : '';
        const message = document.getElementById('message').value.trim();

        // Get country code
        let countryCode = document.getElementById('countryCode').value;
        if (countryCode === 'custom') {
            countryCode = document.getElementById('customCountryCode').value.trim();
        }

        // Validation
        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (name.length < 2) {
            isValid = false;
            errorMessage = 'Vul een geldige naam in.';
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage = 'Vul een geldig e-mailadres in.';
        }

        // Phone validation
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            errorMessage = 'Vul een geldig telefoonnummer in.';
        }

        // Service type validation
        if (!serviceType) {
            isValid = false;
            errorMessage = 'Selecteer een servicetype.';
        }

        // Message validation
        if (message.length < 10) {
            isValid = false;
            errorMessage = 'Uw bericht moet minimaal 10 karakters bevatten.';
        }

        // If validation fails, show error
        if (!isValid) {
            showFeedback(errorMessage, 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoader = submitButton.querySelector('.btn-loader');

        submitButton.disabled = true;
        btnText.textContent = 'Versturen...';

        // Simulate form submission (replace with actual backend call)
        try {
            // Here you would normally send the data to your backend
            // For example using fetch:
            /*
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone: countryCode + ' ' + phone,
                    serviceType,
                    company,
                    message
                })
            });

            if (!response.ok) {
                throw new Error('Er is iets misgegaan');
            }
            */

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showFeedback('Bedankt voor uw aanvraag! Ik neem zo snel mogelijk contact met u op.', 'success');

            // Reset form
            contactForm.reset();

        } catch (error) {
            showFeedback('Er is een fout opgetreden. Probeer het later opnieuw of stuur een e-mail naar lander.verbiest@student.hogent.be', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            btnText.textContent = 'Verstuur Aanvraag';
        }
    });
}

// Show feedback message
function showFeedback(message, type) {
    if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.className = 'form-feedback ' + type;

        // Hide after 5 seconds if success
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.className = 'form-feedback';
            }, 5000);
        }
    }
}

// ========================================
// Initialize EmailJS (Optional - only if you want to use EmailJS)
// ========================================
// Uncomment the following lines and add your EmailJS credentials if you want to use EmailJS
/*
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// EmailJS form submission
async function sendEmailJS(formData) {
    try {
        const response = await emailjs.send(
            "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
            "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                service_type: formData.serviceType,
                company: formData.company,
                message: formData.message
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}
*/

// ========================================
// Add fade-in animation CSS dynamically
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Console message for developers
// ========================================
console.log('%c👨‍💻 Lander Verbiest - Systeembeheerder Portfolio', 'font-size: 16px; font-weight: bold; color: #0066cc;');
console.log('%cVoor vragen of samenwerking: lander.verbiest@student.hogent.be', 'font-size: 12px; color: #00cc99;');
