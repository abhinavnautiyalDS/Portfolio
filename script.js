document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // NAVBAR scroll effect
    // ========================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    // Active nav link highlight on scroll
    const navLinks = document.querySelectorAll(".nav-links a");
    const allSections = document.querySelectorAll("section[id], header[id], footer[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { rootMargin: "-40% 0px -55% 0px" });
    allSections.forEach(s => sectionObserver.observe(s));

    // ========================
    // MOBILE NAV
    // ========================
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle("open");
    });
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) mobileNav.classList.remove("open");
    });

    // ========================
    // CERTIFICATES MODAL
    // ========================
    const modal    = document.getElementById("cert-modal");
    const openBtn  = document.getElementById("open-cert-modal");
    const closeBtn = document.querySelector(".close");

    if (modal && openBtn) {
        openBtn.addEventListener("click", () => modal.classList.add("open"));
        closeBtn?.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") modal.classList.remove("open");
        });
    }

    // ========================
    // INTRODUCTION TABS
    // ========================
    const tabs = document.querySelectorAll(".tab");
    const introContents = document.querySelectorAll(".intro-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            introContents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            const target = document.getElementById(tab.dataset.tab + "-content");
            if (target) target.classList.add("active");
        });
    });

    // ========================
    // SECTION VISIBILITY FILTERS
    // ========================
    const sectionFilters = document.querySelectorAll(".section-filter");
    const sectionMap = {
        skills:     document.getElementById("skills-section"),
        experience: document.getElementById("experience-section"),
        education:  document.getElementById("education-section"),
        projects:   document.getElementById("projects-section"),
        blog:       document.getElementById("blog-section")
    };

    function updateSections() {
        sectionFilters.forEach(btn => {
            const sec = sectionMap[btn.dataset.section];
            if (sec) {
                const isActive = btn.classList.contains("active");
                sec.style.display = isActive ? "block" : "none";
                // When a section becomes visible, trigger reveals inside it
                if (isActive) {
                    sec.querySelectorAll(".reveal:not(.visible)").forEach((el, idx) => {
                        setTimeout(() => el.classList.add("visible"), idx * 55 + 50);
                    });
                }
            }
        });
    }

    sectionFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            updateSections();
        });
    });

    // ========================
    // PROJECT CATEGORY FILTERS
    // ========================
    const projectFilters = document.querySelectorAll(".filter");
    const projectCards   = document.querySelectorAll(".project");

    projectFilters.forEach(filter => {
        filter.addEventListener("click", () => {
            projectFilters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");
            const cat = filter.dataset.category;
            projectCards.forEach(card => {
                const show = cat === "all" || card.dataset.category === cat;
                card.style.display = show ? "flex" : "none";
                if (show) {
                    card.classList.remove("visible");
                    requestAnimationFrame(() => {
                        setTimeout(() => card.classList.add("visible"), 30);
                    });
                }
            });
        });
    });
    projectCards.forEach(p => (p.style.display = "flex"));

    // ========================
    // SCROLL REVEAL
    // Uses IntersectionObserver but with a fallback: after 800ms
    // any .reveal still not visible gets forced visible (handles
    // elements inside display:none parents or observer edge cases).
    // ========================
    function makeVisible(el, delay) {
        setTimeout(() => el.classList.add("visible"), delay || 0);
    }

    const revealEls = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentNode.children)
                    .filter(el => el.classList.contains("reveal"));
                const idx = siblings.indexOf(entry.target);
                makeVisible(entry.target, idx * 55);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => revealObserver.observe(el));

    // Fallback: force-reveal everything visible after 900ms in case
    // observer missed them (hidden sections, instant scroll, etc.)
    setTimeout(() => {
        document.querySelectorAll(".reveal:not(.visible)").forEach((el, idx) => {
            // Only force-reveal if its section is currently displayed
            const section = el.closest("section, header, footer, div");
            const isHidden = section && window.getComputedStyle(section).display === "none";
            if (!isHidden) makeVisible(el, idx * 30);
        });
    }, 900);

    // Hero reveal on load — immediate
    document.querySelectorAll(".hero .reveal").forEach((el, i) => {
        makeVisible(el, 100 + i * 80);
    });

    // Section-filters row reveal (it's outside a section)
    document.querySelectorAll(".section-filters .reveal").forEach((el, i) => {
        makeVisible(el, 300 + i * 60);
    });

    // Apply sections on load AFTER reveals are set up
    updateSections();

    // ========================
    // SMOOTH SCROLL (offset for navbar height)
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    // ========================
    // SHOOTING STARS CANVAS
    // Diagonal streaks flying left-to-right across the background
    // ========================
    const shootingCanvas = document.getElementById("shooting-stars-canvas");
    if (shootingCanvas) {
        const sCtx = shootingCanvas.getContext("2d");
        let sW, sH;
        let shootingStars = [];

        function resizeShooting() {
            sW = shootingCanvas.width  = window.innerWidth;
            sH = shootingCanvas.height = window.innerHeight;
        }
        resizeShooting();
        window.addEventListener("resize", resizeShooting);

        function randomShootingStar() {
            const fromTop = Math.random() < 0.5;
            const x = fromTop ? Math.random() * sW * 0.7 : -60;
            const y = fromTop ? -10 : Math.random() * sH * 0.5;
            const angle = (25 + Math.random() * 15) * (Math.PI / 180);
            const speed = 6 + Math.random() * 8;

            return {
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length: 80 + Math.random() * 120,
                alpha: 0,
                maxAlpha: 0.65 + Math.random() * 0.3,
                fade: "in",
                width: 1 + Math.random() * 1.2
            };
        }

        function spawnStar() {
            shootingStars.push(randomShootingStar());
            setTimeout(spawnStar, 1200 + Math.random() * 2300);
        }
        setTimeout(spawnStar, 500);
        setTimeout(spawnStar, 2000);
        setTimeout(spawnStar, 3500);

        function drawShootingStars() {
            sCtx.clearRect(0, 0, sW, sH);

            shootingStars = shootingStars.filter(s => {
                if (s.fade === "in") {
                    s.alpha += 0.06;
                    if (s.alpha >= s.maxAlpha) { s.alpha = s.maxAlpha; s.fade = "out"; }
                } else {
                    s.alpha -= 0.022;
                }

                s.x += s.vx;
                s.y += s.vy;

                const angle = Math.atan2(s.vy, s.vx);
                const tailX = s.x - Math.cos(angle) * s.length;
                const tailY = s.y - Math.sin(angle) * s.length;

                const grad = sCtx.createLinearGradient(tailX, tailY, s.x, s.y);
                grad.addColorStop(0,   `rgba(255,255,255,0)`);
                grad.addColorStop(0.6, `rgba(180,230,255,${s.alpha * 0.4})`);
                grad.addColorStop(1,   `rgba(255,255,255,${s.alpha})`);

                sCtx.beginPath();
                sCtx.moveTo(tailX, tailY);
                sCtx.lineTo(s.x, s.y);
                sCtx.strokeStyle = grad;
                sCtx.lineWidth = s.width;
                sCtx.lineCap = "round";
                sCtx.stroke();

                sCtx.beginPath();
                sCtx.arc(s.x, s.y, s.width * 1.3, 0, Math.PI * 2);
                sCtx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                sCtx.fill();

                return s.alpha > 0 && s.x < sW + 200 && s.y < sH + 200;
            });

            requestAnimationFrame(drawShootingStars);
        }
        drawShootingStars();
    }

    // ========================
    // PARTICLE CANVAS (floating blue dots)
    // ========================
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => { resize(); initParticles(); });

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((W * H) / 18000), 80);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.2 + 0.3,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                alpha: Math.random() * 0.45 + 0.15
            });
        }
    }
    initParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 194, 255, ${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

});

function copyEmail(event) {
    event.preventDefault();
    const email = "abhinavnautiyal96@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Mail ID copied!");
    }).catch(() => {
        alert("Failed to copy email.");
    });
}
