const sections = Array.from(document.querySelectorAll("[data-section]"));
const navLinks = Array.from(document.querySelectorAll(".topnav a"));
const progressBar = document.querySelector(".progress span");
const fieldAnimation = document.querySelector(".field-animation");
const fieldStageButtons = Array.from(document.querySelectorAll("[data-field-stage]"));
const fieldCopy = document.querySelector(".field-animation__copy");

const fieldStages = {
  normal: {
    label: "통상적 유동장",
    title: "반복 참여자, 평균 거래대금, 회전율, 가격대별 매물 구조가 비교적 안정된 상태다.",
    body:
      "이 구간에서는 수급과 가격 반응 사이의 관계가 비교적 안정적이다. 신규 수급의 유입은 유동장 내 흐름 속도, 즉 수급의 주가에 대한 영향력을 증가시킨다.",
  },
  delta: {
    label: "수급 Delta",
    title: "기존 시장이 익숙하게 처리하던 흐름 대비 새 압력이 발생한다.",
    body:
      "신규 매수자의 등장, 기존 공급의 소진, 유휴 물량의 출회, 회전율 변화, 가격 민감도 변화가 모두 수급 Delta에 포함된다.",
  },
  sensitivity: {
    label: "민감도 상승",
    title: "매도 가능 물량이 줄어들면 같은 규모의 추가 매수에도 가격은 더 민감하게 움직인다.",
    body:
      "공급 밀도가 낮아지고 흐름 속도가 빨라지면 신규 수요의 절대 규모가 크지 않아도 가격 반응은 커질 수 있다.",
  },
  transition: {
    label: "전이 후 구조",
    title: "참여자 구성, 보유자 행동, 매도 가능 물량, 회전율, 가격대별 매물 구조가 동시에 재배열된다.",
    body:
      "전이 이후에는 같은 수급 압력에 대한 가격 반응이 불규칙해진다. 강한 매수 압력도 새로 열린 공급을 소화하는 데 사용될 수 있다.",
  },
};

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const updateProgress = () => {
  if (!progressBar) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
};

const setFieldStage = (stage) => {
  const nextStage = fieldStages[stage] ? stage : "normal";

  if (fieldAnimation) {
    fieldAnimation.dataset.stage = nextStage;
  }

  fieldStageButtons.forEach((button) => {
    const isActive = button.dataset.fieldStage === nextStage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (fieldCopy) {
    const copy = fieldStages[nextStage];
    fieldCopy.innerHTML = `
      <p class="field-animation__label">${copy.label}</p>
      <h3>${copy.title}</h3>
      <p>${copy.body}</p>
    `;
  }
};

fieldStageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFieldStage(button.dataset.fieldStage);
  });
});

if (fieldAnimation && fieldStageButtons.length > 0) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let intervalId = null;
  const orderedStages = Object.keys(fieldStages);

  const startCycle = () => {
    if (reduceMotion.matches || intervalId) {
      return;
    }

    intervalId = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % orderedStages.length;
      setFieldStage(orderedStages[activeIndex]);
    }, 5200);
  };

  const stopCycle = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  fieldStageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activeIndex = index;
      stopCycle();
    });
  });

  fieldAnimation.addEventListener("mouseenter", stopCycle);
  fieldAnimation.addEventListener("mouseleave", startCycle);
  reduceMotion.addEventListener("change", () => {
    stopCycle();
    startCycle();
  });

  setFieldStage(orderedStages[activeIndex]);
  startCycle();
}

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
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.2, 0.45, 0.7],
  },
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

setActive("top");
updateProgress();
