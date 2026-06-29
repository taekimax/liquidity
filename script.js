const slides = Array.from(document.querySelectorAll("[data-slide]"));
const railLinks = Array.from(document.querySelectorAll(".rail a"));
const mobileDots = Array.from(document.querySelectorAll(".mobile-dots a"));
const progressBar = document.querySelector(".progress span");
const prevButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeIndex = 0;

const setActive = (id) => {
  railLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });

  const index = slides.findIndex((slide) => slide.id === id);
  activeIndex = index >= 0 ? index : activeIndex;

  mobileDots.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });

  if (progressBar && index >= 0) {
    progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  }

  if (prevButton && nextButton) {
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
  }
};

const scrollToSlide = (index) => {
  const next = Math.min(slides.length - 1, Math.max(0, index));
  slides[next].scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActive(visible.target.id);
    }
  },
  {
    root: null,
    threshold: [0.42, 0.58, 0.72],
  },
);

slides.forEach((slide) => observer.observe(slide));

document.addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) {
    return;
  }

  const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
  const next = Math.min(slides.length - 1, Math.max(0, activeIndex + direction));

  if (next !== activeIndex) {
    event.preventDefault();
    scrollToSlide(next);
  }
});

prevButton?.addEventListener("click", () => scrollToSlide(activeIndex - 1));
nextButton?.addEventListener("click", () => scrollToSlide(activeIndex + 1));

setActive(slides[0].id);
