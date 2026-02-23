/* ==========================================================================
   MOSZKVA CAFE - MAIN SCRIPT FILE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
  // --- TICKER 2: BACKGROUND SLIDER LOGIC ---
    const t2Images = document.querySelectorAll('.ticker2-images img');
    const t2Prev = document.getElementById('t2PrevBtn');
    const t2Next = document.getElementById('t2NextBtn');
    let t2Index = 0;

    if (t2Images.length > 0 && t2Prev && t2Next) {
        
        const changeImage = (newIndex) => {
            // Remove active from current
            t2Images[t2Index].classList.remove('active');
            // Update index
            t2Index = newIndex;
            // Add active to new
            t2Images[t2Index].classList.add('active');
        };

        // Manual Navigation
        t2Next.addEventListener('click', () => {
            let next = (t2Index + 1) % t2Images.length;
            changeImage(next);
        });

        t2Prev.addEventListener('click', () => {
            let prev = (t2Index - 1 + t2Images.length) % t2Images.length;
            changeImage(prev);
        });

        // Auto-Play: Changes background every 5 seconds
        setInterval(() => {
            let next = (t2Index + 1) % t2Images.length;
            changeImage(next);
        }, 5000);
    }
    // --- 1. BEER BUBBLES ANIMATION ---
    createBubbles();

    // --- 2. HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

// --- 3. HOME PAGE TICKER (With Swipe & Dots) ---
const tickerItems = document.querySelectorAll('.ticker-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('tickerDots');
let currentIndex = 0;

if (tickerItems.length > 0) {
    // Create Dots dynamically
    tickerItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateUI = () => {
        // Update Arrows (for Desktop)
        if(prevBtn && nextBtn) {
            prevBtn.classList.toggle('hidden', currentIndex === 0);
            nextBtn.classList.toggle('hidden', currentIndex === tickerItems.length - 1);
        }
        // Update Dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        tickerItems[currentIndex].classList.remove('active');
        currentIndex = index;
        tickerItems[currentIndex].classList.add('active');
        updateUI();
    };

    // Button Listeners
    if(nextBtn) nextBtn.addEventListener('click', () => {
        if (currentIndex < tickerItems.length - 1) goToSlide(currentIndex + 1);
    });
    if(prevBtn) prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    });

    // --- SWIPE LOGIC ---
    let touchStartX = 0;
    let touchEndX = 0;

    const tickerImages = document.querySelector('.ticker-images');
    tickerImages.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    tickerImages.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const threshold = 50;
        if (touchEndX < touchStartX - threshold && currentIndex < tickerItems.length - 1) {
            goToSlide(currentIndex + 1); // Swipe Left
        } else if (touchEndX > touchStartX + threshold && currentIndex > 0) {
            goToSlide(currentIndex - 1); // Swipe Right
        }
    }, { passive: true });
}
    // --- 4. MENU PAGE ACCORDION (Enhanced Class Toggle) ---
    const menuHeaders = document.querySelectorAll('.category-header');
    
    menuHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Target the parent ".category" wrapper
            const parentCategory = header.parentElement;
            const toggleIcon = header.querySelector('.toggle');
            
            // Toggle the 'open' class
            const isOpen = parentCategory.classList.toggle('open');
            
            // Update the + / - indicator
            if (toggleIcon) {
                toggleIcon.textContent = isOpen ? '-' : '+';
            }
        });
    });
});

/* ==========================================================================
   GLOBAL FUNCTIONS 
   (Placed outside DOMContentLoaded so HTML 'onclick' can find them)
   ========================================================================== */

// --- BEER BUBBLES GENERATOR ---
function createBubbles() {
    const container = document.getElementById('bubble-container');
    if (!container) return; 

    // Create 50 randomized bubbles
    for (let i = 0; i < 50; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = (Math.random() * 10 + 5) + 'px';
        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = Math.random() * 100 + '%';
        
        // Duration between 3s and 8s
        // Duration between 1s and 4s
        bubble.style.setProperty('--duration', (Math.random() * 3 + 1) + 's');
        bubble.style.animationDelay = (Math.random() * 5) + 's';
        
        container.appendChild(bubble);
    }
}

// --- GALLERY: Toggle Albums ---
function toggleAlbum(card) {
    const currentlyActive = document.querySelector('.album-card.active');

    // Close others if one is clicked (Accordion style)
    if (currentlyActive && currentlyActive !== card) {
        currentlyActive.classList.remove('active');
    }

    card.classList.toggle('active');
}

// --- EVENTS: Toggle Event Cards ---
function toggleEvent(card) {
    const currentlyActive = document.querySelector('.event-card.active');

    if (currentlyActive && currentlyActive !== card) {
        currentlyActive.classList.remove('active');
    }

    card.classList.toggle('active');
    
    // Smooth scroll into view when opened
    if(card.classList.contains('active')) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 250);
    }
}

// --- LIGHTBOX CONTROLS ---
function openLightbox(event, imgSrc) {
    event.stopPropagation(); // Prevents the album card from closing
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}
