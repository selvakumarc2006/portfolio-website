// ========================
//  Navbar Scroll Effect
// ========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================
//  Mobile Navigation
// ========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function toggleNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleNav();
        }
    });
});

// ========================
//  Active Nav Link
// ========================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = navLinks.querySelector(`a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================
//  Typewriter Effect
// ========================
const typewriterEl = document.getElementById('typewriter');
const titles = [
    'ECE Student | Embedded Systems Enthusiast',
    'IoT Developer | Firmware Engineer',
    'ARM Cortex-M3 | ESP32 Developer',
    'Building Smart Embedded Solutions'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeWriter() {
    const current = titles[titleIndex];

    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// ========================
//  Scroll Reveal
// ========================
function createRevealObserver() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Reveal sections
    document.querySelectorAll('.about-grid, .github-content, .contact-grid, .contact-form-wrapper').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Reveal grids with staggered children
    document.querySelectorAll('.skills-grid, .projects-grid, .interest-tags, .contact-items').forEach(el => {
        el.classList.add('reveal-children');
        observer.observe(el);
    });

    // Reveal individual items
    document.querySelectorAll('.section-title, .section-line, .about-interests h3').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

createRevealObserver();

// ========================
//  Skill Bar Animation
// ========================
const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                skillObserver.unobserve(bar);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// ========================
//  Particle Background
// ========================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 25 : 50;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.4 + 0.1;

        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        particle.style.animation = `particleFloat ${duration}s ${delay}s ease-in-out infinite`;

        container.appendChild(particle);
    }

    // Add particle keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.2;
            }
            25% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -80 - 20}px) scale(1.2);
                opacity: 0.5;
            }
            50% {
                transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * -120 - 40}px) scale(0.8);
                opacity: 0.3;
            }
            75% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -60 - 10}px) scale(1.1);
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ========================
//  Contact Form
// ========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');

    // Basic validation
    if (!name || !email) return;

    // Show success message
    const wrapper = contactForm.parentElement;
    wrapper.innerHTML = `
        <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you, ${name}! I'll get back to you soon.</p>
        </div>
    `;
});

// ========================
//  Smooth anchor scrolling (fallback)
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
