const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const planButtons = document.querySelectorAll('.btn-plan');

planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const planName = e.target.parentElement.querySelector('h3').innerText;
        alert(`¡Excelente elección! Has seleccionado el plan ${planName}. Nos pondremos en contacto contigo pronto.`);
    });
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
    contactForm.reset();
});