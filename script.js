// --- 1. MODO OSCURO / CLARO CON MEMORIA (LOCALSTORAGE) ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cargar preferencia guardada previamente
const savedTheme = localStorage.getItem('gym_theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('gym_theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
}

// --- 2. MENÚ MÓVIL RESPONSIVO ---
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace en móviles
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// --- 3. CALCULADORA DE IMC ---
function calcularIMC() {
    const pesoInput = document.getElementById('peso').value;
    const alturaInput = document.getElementById('altura').value;
    const resultadoDiv = document.getElementById('imc-resultado');

    if (!pesoInput || !alturaInput) {
        resultadoDiv.innerHTML = `<p style="color: #ff4757;">Por favor, ingresa tu peso y altura.</p>`;
        return;
    }

    const peso = parseFloat(pesoInput);
    const alturaCm = parseFloat(alturaInput);
    const alturaM = alturaCm > 3 ? alturaCm / 100 : alturaCm; // Soporta cm o metros

    const imc = (peso / (alturaM * alturaM)).toFixed(1);
    let clasificacion = "";
    let color = "#ff4757";

    if (imc < 18.5) {
        clasificacion = "Bajo peso";
        color = "#f39c12";
    } else if (imc >= 18.5 && imc < 25) {
        clasificacion = "Peso normal (Saludable)";
        color = "#2ecc71";
    } else if (imc >= 25 && imc < 30) {
        clasificacion = "Sobrepeso";
        color = "#e67e22";
    } else {
        clasificacion = "Obesidad";
        color = "#ff4757";
    }

    resultadoDiv.innerHTML = `
        <p>Tu IMC es: <strong style="color: ${color};">${imc}</strong></p>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 5px;">Clasificación: ${clasificacion}</p>
    `;
}

// --- 4. TEST INTERACTIVO DE OBJETIVOS ---
function siguientePasoQuiz(opcion) {
    const questionContainer = document.getElementById('quiz-question-container');
    const resultContainer = document.getElementById('quiz-result-container');
    const resultText = document.getElementById('quiz-result-text');

    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    if (opcion === 1) {
        resultText.textContent = "Te recomendamos nuestro PLAN BÁSICO o la zona de Musculación Libre con pesas, ideal para hipertrofia y desarrollo de fuerza.";
    } else if (opcion === 2) {
        resultText.textContent = "Te recomendamos nuestro PLAN PRO, que incluye acceso total a clases de CrossFit, Spinning y rutinas de alta intensidad para quemar grasa.";
    } else if (opcion === 3) {
        resultText.textContent = "¡El PLAN VIP es para ti! Disfruta de entrenador personal exclusivo, acceso ilimitado, clases grupales y zona de spa.";
    }
}

function reiniciarQuiz() {
    document.getElementById('quiz-question-container').style.display = 'block';
    document.getElementById('quiz-result-container').style.display = 'none';
}

// --- 5. GENERADOR DE RUTINA SORPRESA ---
function generarRutinaSorpresa() {
    const ejercicios = [
        "🔥 4 series de 12 repeticiones de Sentadillas libres + 30 segundos de plancha abdominal.",
        "⚡ 3 series de 15 flexiones de pecho + 20 desplantes por pierna.",
        "💪 4 series de 10 dominadas o jalones en polea + 15 abdominales crunch.",
        "🏃‍♂️ 15 minutos de alta intensidad (Burpees y saltos a la cuerda) + estiramiento.",
        "🔥 Circuito express: 3 rondas de 10 press de hombros y 15 sentadillas con salto."
    ];

    const randomRutina = ejercicios[Math.floor(Math.random() * ejercicios.length)];
    const routineOutput = document.getElementById('routine-output');
    
    routineOutput.style.opacity = 0;
    setTimeout(() => {
        routineOutput.textContent = randomRutina;
        routineOutput.style.opacity = 1;
        routineOutput.style.transition = "opacity 0.4s ease";
    }, 200);
}

// --- 6. CARRUSEL DE INSTALACIONES ---
function scrollCarousel(direction) {
    const container = document.getElementById('carouselContainer');
    const scrollAmount = 260; // Ancho aproximado de la tarjeta + gap
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// --- 7. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        
        // Cerrar los demás abiertos (opcional)
        document.querySelectorAll('.faq-item').forEach(faq => {
            if (faq !== item) faq.classList.remove('active');
        });

        item.classList.toggle('active');
    });
});

// --- 8. LÓGICA DEL ASISTENTE VIRTUAL IA ---
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

    appendMessage(text, 'user');
    chatInput.value = '';

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
        return "Tenemos 3 planes principales: Básico ($29/mes), Pro ($49/mes) and VIP ($79/mes). ¡Además tenemos matrícula GRATIS todo el mes!";
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
