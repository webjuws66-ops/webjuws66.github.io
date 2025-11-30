/* ==============================
   1. YEAR AUTO-UPDATE
============================== */
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/* ==============================
   2. SCROLL SHADOW ON HEADER
============================== */
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("header-shadow");
    } else {
        header.classList.remove("header-shadow");
    }
});

/* ==============================
   3. REVEAL ANIMATION ON SECTIONS
============================== */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.18,
    }
);

document.querySelectorAll(".section, .hero").forEach((sec) => {
    sec.classList.add("reveal");
    observer.observe(sec);
});

/* ==============================
   4. ACTIVE NAVIGATION LINK
============================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const top = section.offsetTop - 200;
        if (pageYOffset >= top) current = section.getAttribute("id");
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* ==============================
   5. OPTIONAL – ORBITAL PULSE
============================== */
const orbital = document.querySelector(".orbital-core");
if (orbital) {
    setInterval(() => {
        orbital.classList.toggle("pulse");
    }, 2200);
}
/* Fade-in sections */
.reveal {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Active nav link */
.main-nav a.active {
    color: #111827;
}

.main-nav a.active::after {
    width: 100%;
}

/* Header shadow on scroll */
.header-shadow {
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.15);
}

/* Orbital pulse */
.orbital-core.pulse {
    transform: scale(1.06);
    transition: transform 0.6s ease;
}
