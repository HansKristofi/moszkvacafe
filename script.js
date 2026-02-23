/* ==========================================================================
   MOSZKVA CAFE - MAIN SCRIPT FILE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
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

    // --- 3. HOME PAGE TICKER ---
    const images = document.querySelectorAll('.ticker-images img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (images.length > 0 && prevBtn && nextBtn) {
        const updateArrows = () => {
            prevBtn.classList.toggle('hidden', currentIndex === 0);
            nextBtn.classList.toggle('hidden', currentIndex === images.length - 1);
        };

        nextBtn.addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                images[currentIndex].classList.remove('active');
                currentIndex++;
                images[currentIndex].classList.add('active');
                updateArrows();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                images[currentIndex].classList.remove('active');
                currentIndex--;
                images[currentIndex].classList.add('active');
                updateArrows();
            }
        });
        
        updateArrows();
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
        bubble.style.setProperty('--duration', (Math.random() * 5 + 3) + 's');
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