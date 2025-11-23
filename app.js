document.addEventListener('DOMContentLoaded', () => {
    const gateSection = document.getElementById('gate');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-invitation');
    const audio = document.getElementById('background-audio');
    const audioControlBtn = document.getElementById('audio-control-btn');

    // Open Invitation
    openButton.addEventListener('click', () => {
        // Start audio playback
        audio.play().catch(error => {
            console.log("Autoplay was prevented by the browser.");
        });

        // Animate out the gate section
        gateSection.style.opacity = '0';
        gateSection.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            gateSection.classList.add('hidden');
            mainContent.classList.remove('hidden');
            audioControlBtn.classList.remove('hidden');
            document.body.style.overflowY = 'auto'; // Allow scrolling
            observeSections(); // Start observing sections for fade-in animation
        }, 1000);
    });

    // Audio Controls
    const speakerIcon = `<svg class="icon-speaker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    const muteIcon = `<svg class="icon-speaker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

    audioControlBtn.innerHTML = audio.muted ? muteIcon : speakerIcon;

    audioControlBtn.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            audioControlBtn.innerHTML = speakerIcon;
        } else {
            audio.muted = true;
            audioControlBtn.innerHTML = muteIcon;
        }
    });

    // Prevent body scroll until invitation is opened
    document.body.style.overflowY = 'hidden';

    // Intersection Observer for fade animations on sections and footer
    function observeSections() {
        const options = {
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const sections = document.querySelectorAll('section, footer');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
});
