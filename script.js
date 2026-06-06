document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slideTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentNumEl = document.getElementById('currentSlideNum');
    const totalNumEl = document.getElementById('totalSlideNum');

    let currentSlideIndex = 0;
    const totalSlides = slideData.length;
    
    totalNumEl.textContent = totalSlides;

    // SVG wave for the bottom
    const bottomWave = `
    <div class="bottom-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#2e7d32" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div class="wave-footer-text">
            <span>Ing. River Regalado Villegas<br>Supervisor COI AGROLMOS S.A.</span>
        </div>
    </div>`;

    const logoTopRight = `
    <div class="agrolmos-logo">
        <img src="contenido/logoAgroOlmo.png" alt="Agrolmos" style="height: 50px; display: block;">
    </div>`;

    const largeBottomWave = `
    <div class="bottom-wave large-wave" style="height: 220px; z-index: 5;">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#1b5e20" fill-opacity="1" d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1360,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <path fill="#2e7d32" fill-opacity="0.9" d="M0,192L80,197.3C160,203,320,213,480,197.3C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
        <div class="wave-footer-text" style="bottom: 20px; left: 3rem; display: flex; align-items: center; gap: 1rem; z-index: 10;">
            <div style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; display: flex; justify-content: center; align-items: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <span style="font-size: 0.9rem; font-weight: 600;">Ing. River Regalado Villegas<br><span style="font-weight: 400; font-size: 0.75rem; opacity: 0.9;">Supervisor COI AGROLMOS S.A.</span></span>
        </div>
    </div>`;

    // Build DOM
    let continuousSlideNum = 0;
    slideData.forEach((slide, index) => {
        const slideEl = document.createElement('div');
        slideEl.className = 'slide';
        if (index === 0) slideEl.classList.add('active');

        const isTitle = slide.title.startsWith('TITLE');
        if (isTitle) {
            slideEl.classList.add('title-slide');
            const h1 = document.createElement('h1');
            h1.textContent = slide.content.join(' ');
            if (index === 0) {
                slideEl.style.backgroundImage = "linear-gradient(rgba(245, 245, 245, 0.85), rgba(245, 245, 245, 0.85)), url('contenido/imgq.jpeg')";
                slideEl.style.backgroundSize = "cover";
                slideEl.style.backgroundPosition = "center";
                slideEl.innerHTML = `
                    ${logoTopRight}
                    <div style="position: absolute; top: 1.5rem; left: 2rem; background: var(--agrolmos-dark-green); color: white; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 1.2rem; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 10;">1</div>
                    <div class="title-content-wrapper" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 2rem; width: 100%; padding: 0 3rem; box-sizing: border-box; z-index: 10; height: 100%; padding-bottom: 5rem;">
                        <div style="flex: 1.2; text-align: left; position: relative;">
                            <div style="position: relative; padding-left: 1.5rem; border-left: 3px solid var(--agrolmos-green);">
                                <div style="position: absolute; left: -9px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; background: var(--agrolmos-green); border-radius: 50%;"></div>
                                <h1 style="font-size: 2.2rem; margin: 0; line-height: 1.25; color: var(--agrolmos-blue); font-weight: 800;">${h1.textContent}</h1>
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center;">
                            <div style="position: relative; width: 100%; max-width: 480px; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.2); border: 5px solid white; background: #000; z-index: 3;">
                                <video id="titleVideo" src="contenido/video1.mp4#t=278" style="width: 100%; display: block; max-height: 350px; object-fit: cover;"></video>
                                <div id="playButtonOverlay" onclick="const v=document.getElementById('titleVideo'); v.currentTime=0; v.play(); v.controls=true; this.style.display='none';" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.1); cursor: pointer; transition: all 0.2s;">
                                    <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.95); border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 10px 20px rgba(0,0,0,0.3); padding-left: 6px;">
                                        <svg width="35" height="35" viewBox="0 0 24 24" fill="var(--agrolmos-dark-green)"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${largeBottomWave}
                `;
            } else {
                slideEl.innerHTML = `
                    ${logoTopRight}
                    <div class="title-content-wrapper" style="text-align: center;">
                        <h1 style="font-size: 2.8rem; margin: 0; max-width: 90%;">${h1.textContent}</h1>
                    </div>
                    ${bottomWave}
                `;
            }
        } else {
            const header = document.createElement('div');
            header.className = 'slide-header';
            
            // Increment continuous slide number
            continuousSlideNum++;
            
            header.innerHTML = `
                <div class="slide-number">${continuousSlideNum}</div>
                <h2>${slide.content.length > 0 && (slide.content[0].match(/^\d+\./) || slide.content[0].length < 60) ? slide.content.shift() : slide.title}</h2>
            `;

            const contentWrapper = document.createElement('div');
            contentWrapper.style.display = 'flex';
            contentWrapper.style.flexDirection = 'row';
            contentWrapper.style.gap = '2rem';
            contentWrapper.style.flexGrow = '1';
            contentWrapper.style.minHeight = '0';
            contentWrapper.style.width = '100%';
            contentWrapper.style.marginBottom = '110px';

            const content = document.createElement('div');
            content.className = 'slide-content';
            content.style.flex = '1';
            
            // Format content lines
            let listContainer = null;

            slide.content.forEach(line => {
                if (line.includes('\t') && (line.includes('Parámetro') || line.includes('Variable de Control') || line.includes('Características'))) {
                    let table = content.querySelector('table:last-child');
                    if (!table) {
                        table = document.createElement('table');
                        content.appendChild(table);
                    }
                    const tr = document.createElement('tr');
                    const isHeader = line.includes('Parámetro') || line.includes('Variable de Control') || line.includes('Características');
                    line.split('\t').forEach(cellText => {
                        const cell = document.createElement(isHeader ? 'th' : 'td');
                        cell.textContent = cellText.trim();
                        tr.appendChild(cell);
                    });
                    table.appendChild(tr);
                } else if (line.trim().startsWith('•') || line.trim().match(/^\d+\./)) {
                    if (!listContainer) {
                        listContainer = document.createElement('ul');
                        content.appendChild(listContainer);
                    }
                    const li = document.createElement('li');
                    if (line.trim().startsWith('•')) {
                        li.innerHTML = `<strong>&bull;</strong> ${line.substring(line.indexOf('•') + 1).trim()}`;
                    } else {
                        li.textContent = line;
                    }
                    listContainer.appendChild(li);
                } else {
                    listContainer = null; // reset list
                    const p = document.createElement('p');
                    p.innerHTML = line.replace(/(Zona Ácida.*:)|(Zona Alcalina.*:)/g, '<strong>$&</strong>');
                    content.appendChild(p);
                }
            });
            
            if (slide.media && slide.media.length > 0) {
                const mediaSide = document.createElement('div');
                mediaSide.style.flex = '0.8'; // slightly smaller than text
                mediaSide.style.display = 'flex';
                mediaSide.style.flexDirection = 'row'; // Horizontal layout
                mediaSide.style.gap = '1rem';
                mediaSide.style.justifyContent = 'center'; 
                mediaSide.style.alignItems = 'center'; // Center vertically
                mediaSide.style.minHeight = '0';
                mediaSide.style.minWidth = '0';
                mediaSide.style.overflow = 'hidden'; // No scrollbars

                // For slides with media, force text to 1 column so it stays on left
                content.style.columnCount = '1';
                content.style.overflowY = 'auto'; // allow text to scroll on left side if too long

                slide.media.forEach(mediaItem => {
                    let filename = "";
                    let title = "";
                    if (typeof mediaItem === 'string') {
                        filename = mediaItem;
                    } else {
                        filename = mediaItem.filename;
                        title = mediaItem.title;
                    }
                    if (!filename) return;

                    const mediaExt = filename.split('.').pop().toLowerCase();
                    const mediaPath = 'contenido/' + filename;
                    
                    const figure = document.createElement('figure');
                    figure.style.borderRadius = '8px';
                    figure.style.overflow = 'hidden';
                    figure.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    figure.style.display = 'flex';
                    figure.style.flexDirection = 'column'; // Keep caption below image
                    figure.style.margin = '0'; 
                    figure.style.background = '#fff';
                    figure.style.flex = '1'; // Share horizontal space equally
                    figure.style.minWidth = '0'; // Allow shrinking horizontally
                    figure.style.height = '100%'; // Maximize vertical space
                    figure.style.maxHeight = '100%';

                    if (['mp4', 'webm', 'ogg'].includes(mediaExt)) {
                        const video = document.createElement('video');
                        video.src = mediaPath;
                        video.controls = true;
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.flex = '1';
                        video.style.minHeight = '0';
                        video.style.minWidth = '0';
                        video.style.display = 'block';
                        video.style.objectFit = 'contain';
                        video.style.background = '#000';
                        figure.appendChild(video);
                    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(mediaExt)) {
                        const img = document.createElement('img');
                        img.src = mediaPath;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.flex = '1';
                        img.style.minHeight = '0';
                        img.style.minWidth = '0';
                        img.style.display = 'block';
                        img.style.objectFit = 'contain';
                        figure.appendChild(img);
                    }
                    
                    if (title) {
                        const figcaption = document.createElement('figcaption');
                        figcaption.textContent = title;
                        figcaption.style.padding = '0.5rem';
                        figcaption.style.background = 'var(--agrolmos-dark-green)';
                        figcaption.style.color = 'white';
                        figcaption.style.fontSize = '0.8rem';
                        figcaption.style.fontWeight = 'bold';
                        figcaption.style.textAlign = 'center';
                        figure.appendChild(figcaption);
                    }
                    
                    mediaSide.appendChild(figure);
                });
                
                contentWrapper.appendChild(content);
                contentWrapper.appendChild(mediaSide);
            } else {
                contentWrapper.appendChild(content);
            }
            
            // Video moved back to title slide
            
            slideEl.innerHTML = `
                ${logoTopRight}
            `;
            slideEl.appendChild(header);
            slideEl.appendChild(contentWrapper);
            slideEl.insertAdjacentHTML('beforeend', bottomWave);
        }

        track.appendChild(slideEl);
    });

    const slides = document.querySelectorAll('.slide');

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

    // Initialize
    updateSlides();
});
