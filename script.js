const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const welcomeCard = document.getElementById('welcome-card');
const startBtn = document.getElementById('start-btn');
const emojiContainer = document.getElementById('emoji-container');

// Configuración principal
const starsCount = 400;
const repulsionRadius = 180;
const maxEmojis = 50; 
const stars = [];
let mouseX = -1000;
let mouseY = -1000;
let resizeTimer;

// Listado de emojis (Comida, Frutas, Animales, Naturaleza)
const emojiList = [
    // Comida y Fruta
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', 'バター', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🥤', '🧃', '🧉',
    // Animales
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐾', '🐉', '🐲',
    // Naturaleza
    '🌸', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌍', '🌎', '🌏', '🌕', '🌙', '⭐', '🌟', '✨', '🌈', '🔥', '💧', '🌊', '🌋'
];

// Inicialización de las estrellas
function initStars() {
    stars.length = 0;
    for (let i = 0; i < starsCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            origX: 0,
            origY: 0,
            color: `hsl(${Math.random() * 50 + 200}, 100%, 80%)`
        });
    }
}

// Ajuste del tamaño del lienzo con debounce (espera inteligente)
function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }, 250);
}

window.addEventListener('resize', resize);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initStars();

// Control del ratón
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Audio (Efectos de sonido "Pop")
let audioCtx;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playPopSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400 + Math.random() * 400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
}

const fullscreenTip = document.getElementById('fullscreen-tip');

// Botón de Inicio y Pantalla Completa
startBtn.addEventListener('click', () => {
    initAudio();
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    welcomeCard.classList.add('hidden');
    // Oculta el consejo de F11 después de 6 segundos
    setTimeout(() => {
        fullscreenTip.classList.add('hidden');
    }, 6000);
});

// Lógica de pulsación de teclas
window.addEventListener('keydown', (e) => {
    // Evita teclas de función (F1-F12) excepto F11
    if (e.key.startsWith('F') && e.key !== 'F11') {
        e.preventDefault();
        return;
    }
    // Bloquea teclas de sistema para evitar accidentes
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'ContextMenu' || e.key === 'Tab') {
        e.preventDefault();
        return;
    }
    const ignoredKeys = ['Escape', 'F11', 'Control', 'Alt', 'Shift', 'CapsLock', 'Meta', 'Tab'];
    if (ignoredKeys.includes(e.key)) return;

    spawnEmoji();
});

// Generación de emojis con lógica híbrida (coordenadas o azar)
function spawnEmoji(targetX, targetY) {
    // Protección de rendimiento: evita desbordamiento del DOM
    if (emojiContainer.children.length > maxEmojis) return;

    playPopSound();
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    
    // Variables de trayectoria para CSS (Explosión 360°)
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 250 + 150;
    const randomX = Math.cos(angle) * velocity;
    const randomY = Math.sin(angle) * velocity;
    const randomRot = (Math.random() - 0.5) * 360; // rotación completa
    
    emoji.style.setProperty('--random-x', `${randomX}px`);
    emoji.style.setProperty('--random-y', `${randomY}px`);
    emoji.style.setProperty('--random-rot', `${randomRot}deg`);
    
    // Si targetX existe (Touch/Click), lo usamos. Si no (Teclado), usamos azar.
    const x = targetX !== undefined ? targetX : Math.random() * window.innerWidth;
    const y = targetY !== undefined ? targetY : Math.random() * window.innerHeight;
    
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    
    emojiContainer.appendChild(emoji);
    // Elimina el emoji tras terminar la animación
    setTimeout(() => emoji.remove(), 3000);
}

// --- SOPORTE TÁCTIL ---
window.addEventListener('touchstart', (e) => {
    // Para cada dedo que toque la pantalla...
    Array.from(e.touches).forEach(touch => {
        // Actualizamos posición para asustar estrellas
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        // Solo spawneamos si ya hemos empezado (tarjeta oculta)
        if (welcomeCard.classList.contains('hidden')) {
            spawnEmoji(touch.clientX, touch.clientY);
        }
    });
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    // El dedo mueve las estrellas mientras se arrastra
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    e.preventDefault(); // Evita que la pantalla se mueva al arrastrar
}, { passive: false });

window.addEventListener('touchend', () => {
    // Al levantar el dedo, mandamos el "ratón" lejos para que las estrellas vuelvan
    mouseX = -1000;
    mouseY = -1000;
});

// --- SOPORTE RATÓN (Clics precisos) ---
window.addEventListener('mousedown', (e) => {
    if (welcomeCard.classList.contains('hidden')) {
        spawnEmoji(e.clientX, e.clientY);
    }
});

// Si el ratón sale de la ventana, las estrellas regresan a su sitio
window.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
});

// Bucle principal de animación (60 FPS)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        // Movimiento de las estrellas
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Efecto envolvente (Wrap around)
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Lógica de repulsión (agujero negro)
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < repulsionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - distance) / repulsionRadius;
            star.x -= Math.cos(angle) * force * 15;
            star.y -= Math.sin(angle) * force * 15;
        }
        
        // Efecto de parpadeo (Twinkle)
        const twinkle = Math.sin(Date.now() * 0.005 + star.x) * 0.5 + 0.5;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = (star.size * 2) * (twinkle + 0.5);
        ctx.shadowColor = star.color;
        
        // Dibujo de la estrella
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (twinkle + 0.2), 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

animate();
