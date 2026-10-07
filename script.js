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

// Acordeón Interactivo para Preguntas Frecuentes (FAQ)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        // Cierra los demás abiertos (opcional, si deseas que solo uno esté abierto a la vez)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Alterna el actual
        item.classList.toggle('active');
    });
});

// --- LÓGICA DEL ASISTENTE VIRTUAL IA ---
const chatToggle = document.getElementById('ai-chat-toggle');
const chatBox = document.getElementById('ai-chat-box');
const chatClose = document.getElementById('ai-chat-close');
const chatSend = document.getElementById('ai-chat-send');
const chatInput = document.getElementById('ai-chat-input');
const chatMessages = document.getElementById('ai-chat-messages');

if (chatToggle && chatBox) {
    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('ai-chat-hidden');
    });

    chatClose.addEventListener('click', () => {
        chatBox.classList.add('ai-chat-hidden');
    });

    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
}

function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Mostrar mensaje del usuario
    appendMessage(text, 'user');
    chatInput.value = '';

    // Simular respuesta inteligente de la IA basada en palabras clave
    setTimeout(() => {
        const reply = generateAIReply(text);
        appendMessage(reply, 'bot');
    }, 600);
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('ai-msg', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIReply(query) {
    const q = query.toLowerCase();

    if (q.includes('precio') || q.includes('plan') || q.includes('costo') || q.includes('cuanto') || q.includes('cuánto')) {
        return "Tenemos 3 planes principales: Básico ($29/mes), Pro ($49/mes) y VIP ($79/mes). ¡Además tenemos matrícula GRATIS todo el mes!";
    } else if (q.includes('horario') || q.includes('abren') || q.includes('hora')) {
        return "Atendemos de Lunes a Sábado. Las clases de Spinning, Zumba y CrossFit varían entre las 07:00 AM y las 07:00 PM. Revisa nuestra sección de 'Horarios' para más detalles.";
    } else if (q.includes('ubicacion') || q.includes('ubicación') || q.includes('direccion') || q.includes('dirección') || q.includes('donde') || q.includes('dónde')) {
        return "Estamos ubicados en la Panamericana Sur manzana W lote 12, Sunampe, Chincha Alta, Ica, Perú.";
    } else if (q.includes('clase') || q.includes('zumba') || q.includes('spinning') || q.includes('crossfit')) {
        return "Ofrecemos clases grupales de Spinning, Zumba, Pilates, CrossFit y entrenamiento funcional con instructores certificados.";
    } else if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenas')) {
        return "¡Hola! ¿Te gustaría saber más sobre nuestros planes, horarios o ubicación?";
    } else {
        return "¡Excelente pregunta! Para darte una atención más detallada o inscribirte, puedes escribirnos directamente por el botón de WhatsApp o llamarnos al +51 953 815 602.";
    }
}
