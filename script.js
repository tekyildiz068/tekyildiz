// ========== PARTICLE BACKGROUND ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;

        // KIRMIZI -> MAVİ
        this.color = Math.random() > 0.7 ? '#3b82f6' : '#94a3b8';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }
        }

        if (
            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particles = [];

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                // KIRMIZI -> MAVİ
                ctx.strokeStyle = 
                `rgba(59, 130, 246, ${0.06 * (1 - dist / 150)})`;

                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){
        navbar.classList.add('scrolled');
    }
    else{
        navbar.classList.remove('scrolled');
    }

});


// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');


hamburger.addEventListener('click', () => {

    hamburger.classList.toggle('active');

    mobileMenu.classList.toggle('open');

    document.body.style.overflow =
    mobileMenu.classList.contains('open')
    ? 'hidden'
    : '';

});


function closeMobile(){

    hamburger.classList.remove('active');

    mobileMenu.classList.remove('open');

    document.body.style.overflow='';

}


// ========== TOAST NOTIFICATION ==========
function showToast(message){

    const toast=document.getElementById('toast');
    const toastText=document.getElementById('toastText');

    toastText.textContent=message;

    toast.classList.add('show');


    setTimeout(()=>{

        toast.classList.remove('show');

    },3000);

}


// ========== COPY FUNCTIONS ==========
function copyDiscord(){

navigator.clipboard.writeText(
"https://discord.gg/8ht8deUNQX"
)

.then(()=>{

showToast("Discord linki kopyalandı!");

})

.catch(()=>{

showToast("Kopyalama başarısız oldu.");

});

}



function copyIP(){

const ip=document.getElementById('serverIp').textContent;


navigator.clipboard.writeText(ip)

.then(()=>{

showToast("Sunucu IP adresi kopyalandı!");

})

.catch(()=>{

showToast("Kopyalama başarısız oldu.");

});

}