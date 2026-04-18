const page = document.body.dataset.page;
const navLink = document.querySelector(`[data-nav="${page}"]`);
if (navLink) {
  navLink.dataset.active = "true";
}

const yearTargets = document.querySelectorAll("[data-year]");
const currentYear = new Date().getFullYear();
yearTargets.forEach((target) => {
  target.textContent = currentYear;
});

const toggleButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggleButton && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  element.style.animationPlayState = "paused";
  observer.observe(element);
});
