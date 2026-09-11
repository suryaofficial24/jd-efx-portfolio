document.addEventListener('DOMContentLoaded', () => {

    // SAFE PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 300);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    // DYNAMIC VIDEO MODAL LOGIC
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const videoTriggers = document.querySelectorAll('.video-trigger');

    function openModal(videoSrc, title) {
        if (!modal || !modalVideo) return;

        modalVideo.src = videoSrc;
        if (modalTitle) modalTitle.textContent = title || 'Video Project';

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Lock background scroll
        document.body.style.overflow = 'hidden';

        modalVideo.play().catch((err) => {
            console.log("Autoplay blocked or waiting user interaction:", err);
        });
    }

    function closeModal() {
        if (!modal || !modalVideo) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');

        modalVideo.pause();
        modalVideo.src = '';

        // Unlock background scroll
        document.body.style.overflow = '';
    }

    // Click trigger setup
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = trigger.getAttribute('data-video');
            const title = trigger.getAttribute('data-title');
            if (videoSrc) openModal(videoSrc, title);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape Key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});