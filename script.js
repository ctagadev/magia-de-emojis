const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const welcomeCard = document.getElementById('welcome-card');
const startBtn = document.getElementById('start-btn');
const emojiContainer = document.getElementById('emoji-container');

// Configuration
const starsCount = 400;
const repulsionRadius = 150;
const maxEmojis = 50; // Limiting to protect mobile performance
const stars = [];
let mouseX = -1000;
let mouseY = -1000;
let resizeTimer;

// Emojis lists (Food, Fruits, Animals, Nature, Flags)
const emojiList = [
    // Food & Fruit
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🥤', '🧃', '🧉',
    // Animals
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐾', '🐉', '🐲',
    // Nature
    '🌸', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌍', '🌎', '🌏', '🌕', '🌙', '⭐', '🌟', '✨', '🌈', '🔥', '💧', '🌊', '🌋'
];

// Initialize stars
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
            color: `hsl(${Math.random() * 50 + 200}, 100%, 80%)` // Light blue/whiteish
        });
    }
}

// Adjust canvas size with debounce
function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }, 250);
}

window.addEventListener('resize', resize);
// Initial sync call
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initStars();

// Mouse handling
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

// Web Audio for "Pop" sound
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

// Fullscreen & Start
startBtn.addEventListener('click', () => {
    initAudio();
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    welcomeCard.classList.add('hidden');
    
    // Hide F11 hint after 6 seconds
    setTimeout(() => {
        fullscreenTip.classList.add('hidden');
    }, 6000);
});

// Keypress logic
window.addEventListener('keydown', (e) => {
    // Prevent Function keys (F1-F12) except F11 (Fullscreen)
    // This blocks F5 (reload), F12 (dev tools), F1 (help), etc.
    if (e.key.startsWith('F') && e.key !== 'F11') {
        e.preventDefault();
        return;
    }

    // Attempt to block other system keys like Meta (Windows), Alt, etc.
    // Note: Most browsers will still allow Windows Key to open the Start Menu for security.
    if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'ContextMenu' || e.key === 'Tab') {
        e.preventDefault();
        return;
    }

    // Ignore control keys so they don't spawn emojis
    const ignoredKeys = ['Escape', 'F11', 'Control', 'Alt', 'Shift', 'CapsLock', 'Meta', 'Tab'];
    if (ignoredKeys.includes(e.key)) return;

    spawnEmoji();
});

function spawnEmoji() {
    // Performance guard: prevent DOM overflow
    if (emojiContainer.children.length > maxEmojis) return;

    playPopSound();
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
    
    // Random direction variables for CSS
    const randomX = (Math.random() - 0.5) * 400; // -200 to 200
    const randomY = -(Math.random() * 300 + 100); // -100 to -400 (upwards explosion)
    const randomRot = (Math.random() - 0.5) * 180; // random spin
    
    emoji.style.setProperty('--random-x', `${randomX}px`);
    emoji.style.setProperty('--random-y', `${randomY}px`);
    emoji.style.setProperty('--random-rot', `${randomRot}deg`);
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    
    emojiContainer.appendChild(emoji);
    
    // Remove after animation finishes
    setTimeout(() => {
        emoji.remove();
    }, 3000);
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        // Star movement
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Repulsion logic
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < repulsionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - distance) / repulsionRadius;
            star.x -= Math.cos(angle) * force * 15;
            star.y -= Math.sin(angle) * force * 15;
        }
        
        // Twinkle effect
        const twinkle = Math.sin(Date.now() * 0.005 + star.x) * 0.5 + 0.5;
        
        // Draw star
        ctx.fillStyle = star.color;
        ctx.shadowBlur = (star.size * 2) * (twinkle + 0.5);
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (twinkle + 0.2), 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

animate();
