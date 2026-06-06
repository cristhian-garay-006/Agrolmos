document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slideTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentNumEl = document.getElementById('currentSlideNum');
    const totalNumEl = document.getElementById('totalSlideNum');

    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    totalNumEl.textContent = totalSlides;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            slide.style.transform = '';
            slide.style.opacity = '';
            
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else if (index < currentSlideIndex) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        // Update progress and counter
        currentNumEl.textContent = currentSlideIndex + 1;
        const progress = ((currentSlideIndex) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Update buttons state
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlides();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlides();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSlideIndex < totalSlides - 1) {
                currentSlideIndex++;
                updateSlides();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSlides();
            }
        }
    });

    // Fullscreen logic
    const fsBtn = document.getElementById('fullscreenBtn');
    const fsIconExpand = document.getElementById('fsIconExpand');
    const fsIconCompress = document.getElementById('fsIconCompress');
    const fsText = document.getElementById('fsText');

    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error al intentar modo pantalla completa: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fsIconExpand.style.display = 'none';
                fsIconCompress.style.display = 'block';
                fsText.textContent = 'Reducir';
            } else {
                fsIconExpand.style.display = 'block';
                fsIconCompress.style.display = 'none';
                fsText.textContent = 'Ampliar';
            }
        });
    }

    // Initialize
    updateSlides();
});
