// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuButton = document.querySelector(".menu-toggle");
const nav = document.getElementById("navigation");
const navLinks = [...nav.querySelectorAll("a")];

function closeMenu() {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".site-header")) closeMenu();
});

// Highlight the nav link for the section currently on screen
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-20% 0px -60% 0px" }
  );
  ["home", "work", "experience", "toolkit", "about", "contact"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Fade sections in as they scroll into view
if (!reducedMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".section-heading, .featured-project, .project-card, .experience-row, .toolkit-group, .credentials, .about-copy, .education-panel"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  targets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// Pointer-following light in the hero and on project cards
if (finePointer && !reducedMotion) {
  const hero = document.querySelector(".hero-stage");
  hero.addEventListener("pointermove", (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  });

  document.querySelectorAll("[data-spotlight]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    });
  });
}
