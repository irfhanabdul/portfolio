console.log("Portfolio Loaded Successfully");

window.addEventListener("load", () => {
    // Welcome Screen logic
    setTimeout(() => {
        const welcomeScreen = document.getElementById("welcome-screen");
        if (welcomeScreen) {
            welcomeScreen.classList.add("hide");
            document.body.classList.remove("no-scroll");
            setTimeout(() => {
                welcomeScreen.remove();
            }, 800); // Wait for transition
        }
    }, 2500); // Keep screen for 2.5 seconds to allow premium animations to play out
});

document.addEventListener("DOMContentLoaded", () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // GSAP ScrollTrigger Setup
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Text Animations
        gsap.from(".hero-text h1", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
        gsap.from(".hero-text h2", { opacity: 0, y: 30, duration: 1, delay: 0.8 });
        gsap.from(".hero-text p", { opacity: 0, y: 20, duration: 1, delay: 1 });
        gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 1, delay: 1.2 });
        gsap.from(".hero-image", { opacity: 0, scale: 0.8, duration: 1, delay: 0.8 });

        // Timeline Line Drawing Animation
        const timelines = document.querySelectorAll(".timeline-container");
        timelines.forEach(timeline => {
            const line = document.createElement("div");
            line.classList.add("timeline-line");
            timeline.appendChild(line);

            gsap.to(line, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            });
        });

        // Magnetic Buttons
        const magneticElements = document.querySelectorAll('.btn, .project-btn, .article-btn, .contact-btn');
        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', function (e) {
                const position = btn.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.5, duration: 0.5, ease: "power3.out" });
            });
            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    // ScrollReveal Animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '30px',
            duration: 600,
            delay: 50,
            reset: false
        });

        sr.reveal('.section-title', { delay: 50, origin: 'top' });
        sr.reveal('.about-image', { delay: 80, origin: 'left' });
        sr.reveal('.about-text', { delay: 80, origin: 'right' });
        sr.reveal('.skill-category', { delay: 50, origin: 'bottom', interval: 100 });
        sr.reveal('.project-card', { delay: 50, origin: 'bottom', interval: 100 });
        sr.reveal('.timeline-box.left', { delay: 50, origin: 'left', interval: 100 });
        sr.reveal('.timeline-box.right', { delay: 50, origin: 'right', interval: 100 });
        sr.reveal('.contact-card', { delay: 50, origin: 'bottom' });
    }

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutStats = document.querySelector(".about-stats");
    if (aboutStats) {
        counterObserver.observe(aboutStats);
    }

    // Vanilla-Tilt
    if (typeof VanillaTilt !== 'undefined') {
        // Subtle tilt for timeline content (text-heavy) to preserve readability
        VanillaTilt.init(document.querySelectorAll(".timeline-content"), {
            max: 2,
            speed: 300,
            glare: false
        });
    }

    // Particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3b82f6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.3, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});