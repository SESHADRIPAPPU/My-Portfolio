// =====================================
// 1. DYNAMIC FOOTER YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =====================================
// 2. MOBILE NAVIGATION MENU
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isExpanded = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isExpanded);

    });

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// =====================================
// 3. DARK AND LIGHT THEME
// =====================================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function updateThemeButton() {

    if (!themeToggle) return;

    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light theme");
        themeToggle.title = "Switch to light theme";
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark theme");
        themeToggle.title = "Switch to dark theme";
    }
}


// Load saved theme

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
    savedTheme = "dark";
}

if (savedTheme !== "light" && savedTheme !== "dark") {
    savedTheme = "dark";
}

body.setAttribute("data-theme", savedTheme);
updateThemeButton();


// Change theme when clicked

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const currentTheme = body.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        body.setAttribute("data-theme", newTheme);

        try {
            localStorage.setItem("portfolio-theme", newTheme);
        } catch (error) {
            // Theme switching still works if storage is unavailable.
        }

        updateThemeButton();

    });

}


// =====================================
// 4. CONTACT FORM VALIDATION
// =====================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        document.querySelectorAll(".error").forEach(function (error) {
            error.textContent = "";
        });

        const formStatus = document.getElementById("form-status");
        formStatus.textContent = "";

        let isValid = true;


        // Validate name
        if (name.length < 2) {

            document.getElementById("name-error").textContent =
                "Please enter your name (at least 2 characters).";

            isValid = false;
        }


        // Validate email
        if (!emailPattern.test(email)) {

            document.getElementById("email-error").textContent =
                "Please enter a valid email address.";

            isValid = false;
        }


        // Validate subject
        if (subject.length < 3) {

            document.getElementById("subject-error").textContent =
                "Subject must contain at least 3 characters.";

            isValid = false;
        }


        // Validate message
        if (message.length < 10) {

            document.getElementById("message-error").textContent =
                "Message must contain at least 10 characters.";

            isValid = false;
        }


        // Display validation result
        if (isValid) {

            formStatus.textContent =
                "All fields are valid! Your message is ready.";

            formStatus.style.color = "#86efac";

            contactForm.reset();

        } else {

            formStatus.textContent =
                "Please correct the errors and try again.";

            formStatus.style.color = "#f87171";

        }

    });

}