function enter3DView() {
    const button = document.querySelector('.enter-button');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        window.location.href = './3dcampus.html';
    }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollIcon = document.querySelector('.scroll-icon');
    const storiesSection = document.querySelector('.stories-section');
    
    scrollIcon.addEventListener('click', () => {
        storiesSection.scrollIntoView({ behavior: 'smooth' });
    });

    const cards = document.querySelectorAll('.stories-card, .footer-preface');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    let lastScrollY = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        
        if (currentScrollY > 100 && delta > 0) {
            heroSection.style.opacity = Math.max(0, 1 - currentScrollY / 500);
            heroSection.style.transform = `translateY(${Math.min(50, currentScrollY * 0.1)}px)`;
        } else {
            heroSection.style.opacity = Math.min(1, 1 - currentScrollY / 500);
            heroSection.style.transform = `translateY(${Math.max(0, currentScrollY * 0.1)}px)`;
        }
        
        lastScrollY = currentScrollY;
    });
});