const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

window.addEventListener("DOMContentLoaded", () => {
  body.classList.add("is-loaded");
  if (year) year.textContent = String(new Date().getFullYear());
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

if (form && formStatus) {
  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields before submitting.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:junedshaikh0531@gmail.com?subject=${subject}&body=${bodyText}`;
    formStatus.textContent = "Opening your email client...";
    form.reset();
  });
}
