// Global variables
let cursor, cursorTrail;
let particles = [];
let loadingCommands = [
    "Loading system...",
    "Initializing neural networks...",
    "Connecting to mainframe...",
    "Decrypting encrypted files...",
    "Launching portfolio.exe...",
    "Ready. Welcome to the matrix."
];
let typewriterTexts = [
    "Programmer",
    "Web Developer", 
    "AI Enthusiast",
    "Problem Solver",
    "Full-Stack Developer",
    "Data Scientist",
    "Game Developer",
    "Tech Leader"
];

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initLoadingScreen();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initTypewriter();
    initSkillBars();
    initTimeline();
    initContactForm();
    initMatrixRain();
});

// Custom Cursor System
function initCursor() {
    cursor = $('.cursor');
    cursorTrail = $('.cursor-trail');
    
    if (!cursor || !cursorTrail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    });
    
    // Smooth trail animation
    function updateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
    
    // Cursor effects on hover
    const interactiveElements = $$('a, button, .project-card, .skill-item, .nav-links a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.backgroundColor = '#ff0088';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.backgroundColor = '#00ff88';
        });
    });
}

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = $('#loading-screen');
    const loadingCommand = $('.loading-command');
    const loadingBar = $('.loading-bar');
    
    if (!loadingScreen || !loadingCommand) return;
    
    let commandIndex = 0;
    let charIndex = 0;
    
    function typeCommand() {
        if (commandIndex >= loadingCommands.length) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
            return;
        }
        
        const currentCommand = loadingCommands[commandIndex];
        
        if (charIndex < currentCommand.length) {
            loadingCommand.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCommand, 50);
        } else {
            setTimeout(() => {
                commandIndex++;
                charIndex = 0;
                typeCommand();
            }, 800);
        }
    }
    
    // Start typing animation
    setTimeout(typeCommand, 500);
}

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = $('.matrix-rain');
    if (!matrixContainer) return;
    
    const characters = '01アカサタナハマヤラワ';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = i * 20 + 'px';
        drop.style.color = '#00ff88';
        drop.style.fontFamily = 'monospace';
        drop.style.fontSize = '14px';
        drop.style.animation = `matrixFall ${2 + Math.random() * 3}s linear infinite`;
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixContainer.appendChild(drop);
    }
}

// Navigation System
function initNavigation() {
    const nav = $('#nav');
    const navToggle = $('.nav-toggle');
    const navLinks = $('.nav-links');
    const scrollProgress = $('.scroll-progress');
    
    let lastScrollY = window.scrollY;
    
    // Scroll progress bar
    function updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
    }
    
    // Hide/show navigation on scroll
    function handleNavScroll() {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
        updateScrollProgress();
    }
    
    window.addEventListener('scroll', handleNavScroll);
    
    // Mobile navigation toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });
}

// Particle System
function initParticles() {
    const particleContainer = $('#particles');
    if (!particleContainer) return;
    
    const particleCount = 50;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleContainer.appendChild(particle);
        
        return particle;
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger timeline animations
                if (entry.target.classList.contains('about')) {
                    animateTimeline();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and animate elements
    $$('.section, .timeline-item, .project-card, .experience-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Typewriter Effect for Hero
function initTypewriter() {
    const typewriter = $('#typewriter');
    if (!typewriter) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typewriterTexts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Skill Bar Animations
function initSkillBars() {
    const skillBars = $$('.skill-item');
    skillBars.forEach((item, index) => {
        const skillFill = item.querySelector('.skill-fill');
        const level = item.dataset.level;
        
        if (skillFill && level) {
            // Store the level for later animation
            skillFill.dataset.level = level;
        }
    });
}

function animateSkillBars() {
    const skillFills = $$('.skill-fill');
    skillFills.forEach((fill, index) => {
        const level = fill.dataset.level;
        if (level) {
            setTimeout(() => {
                fill.style.width = level + '%';
            }, index * 100);
        }
    });
}

// Timeline Animation
function initTimeline() {
    const timelineItems = $$('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 0.2) + 's';
    });
}

function animateTimeline() {
    const timelineItems = $$('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('revealed');
        }, index * 200);
    });
}

// Contact Form Handler
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    
    // Form input animations
    const inputs = $$('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Button loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = $$('.project-card');
    
    projectCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        // Glitch effect on click
        card.addEventListener('click', function() {
            card.classList.add('glitch-effect');
            setTimeout(() => {
                card.classList.remove('glitch-effect');
            }, 500);
        });
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    // Reinitialize particles on resize
    particles.forEach(particle => particle.remove());
    particles = [];
    initParticles();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated
            document.body.classList.add('matrix-mode');
            setTimeout(() => {
                document.body.classList.remove('matrix-mode');
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
    
    // Quick navigation shortcuts
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                $('a[href="#hero"]').click();
                break;
            case '2':
                e.preventDefault();
                $('a[href="#about"]').click();
                break;
            case '3':
                e.preventDefault();
                $('a[href="#skills"]').click();
                break;
            case '4':
                e.preventDefault();
                $('a[href="#projects"]').click();
                break;
            case '5':
                e.preventDefault();
                $('a[href="#contact"]').click();
                break;
        }
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll performance
const debouncedScrollHandler = debounce(() => {
    updateScrollProgress();
}, 16);

// Additional CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixFall {
        to {
            transform: translateY(100vh);
        }
    }
    
    .glitch-effect {
        animation: digitalGlitch 0.5s ease-out;
    }
    
    @keyframes digitalGlitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    .matrix-mode {
        filter: hue-rotate(120deg) contrast(1.2);
        animation: matrixPulse 0.5s infinite;
    }
    
    @keyframes matrixPulse {
        0%, 100% { filter: hue-rotate(120deg) contrast(1.2); }
        50% { filter: hue-rotate(180deg) contrast(1.5); }
    }
    
    .floating-skill {
        opacity: 0;
        animation: skillFloat 8s ease-in-out infinite;
    }
    
    .floating-skill:nth-child(1) { top: 10%; left: 10%; }
    .floating-skill:nth-child(2) { top: 20%; right: 15%; }
    .floating-skill:nth-child(3) { top: 60%; left: 5%; }
    .floating-skill:nth-child(4) { bottom: 20%; right: 20%; }
    .floating-skill:nth-child(5) { top: 40%; left: 50%; }
    .floating-skill:nth-child(6) { bottom: 40%; left: 20%; }
    .floating-skill:nth-child(7) { top: 80%; right: 10%; }
    .floating-skill:nth-child(8) { bottom: 60%; right: 40%; }
    
    @keyframes skillFloat {
        0%, 100% { 
            opacity: 0.3;
            transform: translateY(0) rotate(0deg);
        }
        50% { 
            opacity: 0.6;
            transform: translateY(-20px) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating skills animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingSkills = $$('.floating-skill');
    floatingSkills.forEach((skill, index) => {
        skill.style.animationDelay = (index * 0.5) + 's';
    });
});

// Console welcome message
console.log('%c🔥 Welcome to the Matrix! 🔥', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cYou found the developer console! Here are some keyboard shortcuts:', 'color: #0088ff; font-size: 14px;');
console.log('%c• Alt + 1-5: Quick navigation', 'color: #888;');
console.log('%c• Konami Code: ↑↑↓↓←→←→BA for Easter egg', 'color: #888;');
console.log('%c• Built with vanilla JS, CSS, and HTML', 'color: #ff0088;');
