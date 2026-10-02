// Menú Hamburguesa para Móviles
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Selector de Modo Oscuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerText = '🌙';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerText = '☀️';
    }
});

// Alertas en Botones de Planes
const planButtons = document.querySelectorAll('.btn-plan');

planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const planName = e.target.parentElement.querySelector('h3').innerText;
        alert(`¡Excelente elección! Has seleccionado el plan ${planName}. Nos pondremos en contacto contigo pronto.`);
    });
});

// Envío del Formulario de Contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
    contactForm.reset();
});

// Carrusel de Imágenes Dinámico
function scrollCarousel(direction) {
    const container = document.getElementById('carouselContainer');
    const slide = container.querySelector('.slide');
    
    if (slide) {
        const slideWidth = slide.offsetWidth + 20; // Ancho de tarjeta + gap de 20px
        container.scrollBy({
            left: direction * slideWidth,
            behavior: 'smooth'
        });
    }
}

// Calculadora de IMC (Índice de Masa Corporal)
function calcularIMC() {
    const pesoInput = document.getElementById('peso').value;
    const alturaInput = document.getElementById('altura').value;
    const resultadoDiv = document.getElementById('imc-resultado');

    const peso = parseFloat(pesoInput);
    const alturaCm = parseFloat(alturaInput);

    if (!peso || !alturaCm || peso <= 0 || alturaCm <= 0) {
        resultadoDiv.innerHTML = '<p style="color: #ff4757;">Por favor, ingresa un peso y una altura válidos.</p>';
        return;
    }

    // Convertir altura de centímetros a metros
    const alturaM = alturaCm / 100;
    const imc = (peso / (alturaM * alturaM)).toFixed(1);

    let mensaje = '';
    let color = '';

    if (imc < 18.5) {
        mensaje = `Tu IMC es **${imc}**: Estás en Bajo Peso. ¡Te ayudamos a ganar masa muscular!`;
        color = '#3498db';
    } else if (imc >= 18.5 && imc < 25) {
        mensaje = `Tu IMC es **${imc}**: Estás en un Peso Normal. ¡Excelente estado físico!`;
        color = '#2ecc71';
    } else if (imc >= 25 && imc < 30) {
        mensaje = `Tu IMC es **${imc}**: Tienes Sobrepeso. ¡Nuestras rutinas de cardio te servirán muchísimo!`;
        color = '#f1c40f';
    } else {
        mensaje = `Tu IMC es **${imc}**: Estás en Obesidad. ¡Tenemos un plan personalizado para transformar tu salud!`;
        color = '#e74c3c';
    }

    resultadoDiv.style.borderLeftColor = color;
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
}
