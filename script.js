
// TYPING ANIMATION

const words = [
    "Frontend Developer",
    "Web Designer",
    "Python Programmer",
    "AI Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typeEffect() {

    if (reducedMotion) {
        typing.textContent = words[0];
        return;
    }

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typing.textContent =
        currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1200;
    }

    else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// MOBILE NAVIGATION

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

document.querySelectorAll("#navLinks a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    });

});


// DARK AND LIGHT MODE

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeToggle.textContent = "☾";
    } else {
        themeToggle.textContent = "☀";
    }

});


// SKILL BAR ANIMATION

const skillBars =
    document.querySelectorAll(".progress div");

if ("IntersectionObserver" in window && !reducedMotion) {

    const skillObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const width = getComputedStyle(entry.target)
                    .getPropertyValue("--width");

                entry.target.style.width = width;

                skillObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

} else {

    skillBars.forEach(bar => {
        bar.style.width = getComputedStyle(bar)
            .getPropertyValue("--width");
    });

}


// CONTACT FORM VALIDATION

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const formMessage =
        document.getElementById("formMessage");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {

        formMessage.style.color = "red";
        formMessage.textContent =
            "Please enter your name correctly.";

        return;
    }

    if (!emailPattern.test(email)) {

        formMessage.style.color = "red";
        formMessage.textContent =
            "Please enter a valid email address.";

        return;
    }

    if (message.length < 10) {

        formMessage.style.color = "red";
        formMessage.textContent =
            "Message must contain at least 10 characters.";

        return;
    }

    formMessage.style.color = "#00cc88";

    formMessage.textContent =
        "Form validated successfully! No email was sent.";

    contactForm.reset();

});


// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// BACK TO TOP

document.getElementById("backToTop")
    .addEventListener("click", function(event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });

    });
