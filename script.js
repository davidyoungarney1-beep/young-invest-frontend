// ==========================
// MOBILE MENU
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");

menuToggle.addEventListener("click", () => {

    if (navMenu.style.display === "block") {

        navMenu.style.display = "none";

    } else {

        navMenu.style.display = "block";

    }

});

// ==========================
// NAVBAR SCROLL EFFECT
// ==========================

window.addEventListener("scroll", () => {

    const navbar = document.getElementById("navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "#07162c";
        navbar.style.padding = "12px 0";

    } else {

        navbar.style.background = "rgba(8,23,51,.75)";
        navbar.style.padding = "18px 0";

    }

});

// ==========================
// BACK TO TOP
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ==========================
// SCROLL ANIMATION
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(".card, .why-card, .step, .testimonial, .contact-card").forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = ".8s";

    observer.observe(item);

});

// ==========================
// HERO COUNTER
// ==========================

const counters = document.querySelectorAll(".hero-stats h2");

counters.forEach(counter => {

    counter.style.opacity = "0";

    setTimeout(() => {

        counter.style.opacity = "1";
        counter.style.transition = "1s";

    }, 500);

});
