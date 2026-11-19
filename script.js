// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Typing effect in hero section
const typingText = document.getElementById("typingText");
const phrases = ["web experiences", "responsive websites", "Python applications"];
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  typingText.textContent = currentPhrase.slice(0, letterIndex);

  if (!deleting && letterIndex < currentPhrase.length) {
    letterIndex++;
    setTimeout(typePhrase, 85);
  } else if (deleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typePhrase, 38);
  } else {
    deleting = !deleting;
    if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, deleting ? 1250 : 250);
  }
}
typePhrase();

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Highlight current navigation section
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

// Scroll progress indicator
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });

// Contact form: validate, then open the visitor's email application.
// Replace the email address below with your real email address.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const contactEmail = "YOUR_EMAIL@example.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  if (contactEmail === "YOUR_EMAIL@example.com") {
    formFeedback.textContent = "Please update YOUR_EMAIL@example.com in script.js with your real email address first.";
    formFeedback.className = "form-feedback error";
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  formFeedback.textContent = "Your email app should open with your message ready to send.";
  formFeedback.className = "form-feedback success";
});

// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();
