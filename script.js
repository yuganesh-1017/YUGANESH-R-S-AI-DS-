document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded");

    // 1. Loader
    const loader = document.getElementById('loader');
    const hideLoader = () => {
        if (!loader) {
            console.log("Loader element not found");
            return;
        }
        console.log("Hiding loader...");
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            console.log("Loader hidden.");
            startHeroAnimations();
        }, 500);
    };

    // Attempt to hide loader when everything is ready
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Safety fallback: hide loader after 3 seconds anyway
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            console.log("Triggering safety loader removal");
            hideLoader();
        }
    }, 3000);

    // 2. Typing Animation (Handle missing element gracefully)
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["AI & Data Science Student", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 200;

        function type() {
            const currentWord = words[wordIndex % words.length];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                delay = 100;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                delay = 200;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                delay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                delay = 500;
            }

            setTimeout(type, delay);
        }

        type();
    } else {
        console.log("Typing-text element not found - skipping animation");
    }

    // 3. Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    console.log(`Found ${revealElements.length} reveal elements`);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active-mobile');
        });
    }

    // 7. Resume Modal Logic
    const resumeModal = document.getElementById('resume-modal');
    const downloadBtn = document.getElementById('download-cv');
    const closeBtn = document.querySelector('.close-modal');

    if (downloadBtn && resumeModal) {
        downloadBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && resumeModal) {
        closeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function startHeroAnimations() {
        console.log("Starting Hero animations");
        // Ensure reveal elements in viewport trigger immediately
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }
});
