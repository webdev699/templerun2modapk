document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const drawerLinks = document.querySelectorAll('.mobile-drawer a');

    function openDrawer() {
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
        if (mobileDrawer) mobileDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });
});

// Initialize all swipers on the page
function initSwiper(swiperElement) {
    const wrapper = swiperElement.querySelector('.swiper-wrapper');
    const slides = swiperElement.querySelectorAll('.swiper-slide');
    const prevBtn = swiperElement.querySelector('.swiper-button.prev');
    const nextBtn = swiperElement.querySelector('.swiper-button.next');

    if (!wrapper || !slides.length || !prevBtn || !nextBtn) {
        console.warn('Swiper missing required elements:', swiperElement);
        return;
    }

    let index = 0;

    function showSlide(i) {
        if (i < 0) {
            index = slides.length - 1;
        } else if (i >= slides.length) {
            index = 0;
        } else {
            index = i;
        }
        wrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(index - 1);
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(index + 1);
    });

    // Optional: Auto-slide every 5 seconds
    // setInterval(() => showSlide(index + 1), 5000);
}

// Initialize all swiper instances when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach(swiper => initSwiper(swiper));
});
