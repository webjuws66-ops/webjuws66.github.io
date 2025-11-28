// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target page
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// CTA button navigation
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = e.target.getAttribute('data-page');
        
        navLinks.forEach(l => l.classList.remove('active'));
        const targetLink = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        pages.forEach(page => page.classList.remove('active'));
        const targetPageElement = document.getElementById(targetPage);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll initialization
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// Parallax effect for background images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, #music, #images, #about');
    
    parallaxElements.forEach(element => {
        if (element.classList.contains('active') || element.querySelector('.active')) {
            const speed = 0.5;
            element.style.backgroundPositionY = `${scrolled * speed}px`;
        }
    });
});

// Add hover effect to gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Timeline animation on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Music cards interactive effect
const musicCards = document.querySelectorAll('.music-card');
musicCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Feature cards entrance animation
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    featureObserver.observe(card);
});

// Neon glow intensity based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        const glowIntensity = 10 + (scrollPercent / 10);
        logo.style.filter = `drop-shadow(0 0 ${glowIntensity}px var(--accent))`;
    }
});

// Console Easter Egg
console.log('%c◢ INTELLIGENCE ARTIFICIELLE ◣', 'font-size: 24px; color: #c724ff; text-shadow: 0 0 10px #c724ff, 0 0 20px #c724ff;');
console.log('%cBienvenue dans le futur néon de l\'IA', 'font-size: 14px; color: #00f5ff;');
