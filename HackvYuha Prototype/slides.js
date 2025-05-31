document.addEventListener('DOMContentLoaded', () => {
    // Slide management
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelector('.slide-indicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    // Initialize first slide
    slides[0].classList.add('active');
    updateFeatureCards();

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    skipBtn.addEventListener('click', () => goToSlide(slides.length - 1));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'End') {
            goToSlide(slides.length - 1);
        }
    });

    // Functions for slide navigation
    function goToSlide(index) {
        const allIndicators = document.querySelectorAll('.indicator');
        
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        allIndicators[currentSlide].classList.remove('active');
        
        // Add active class to new slide and indicator
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        allIndicators[currentSlide].classList.add('active');
        
        updateFeatureCards();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }

    // Animate feature cards when they become visible
    function updateFeatureCards() {
        if (currentSlide === 2) { // Features slide
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(card => {
                setTimeout(() => {
                    card.classList.add('show');
                }, parseInt(card.getAttribute('data-delay') || '0'));
            });
        }
    }

    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Swipe right
        }
    }
});