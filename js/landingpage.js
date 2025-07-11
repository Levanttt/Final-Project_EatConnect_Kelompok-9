function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOutCubic);
    element.textContent = current.toLocaleString();
    element.classList.add("counting");
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.classList.remove("counting");
    }
  }
  requestAnimationFrame(updateCounter);
}

function createObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber && !statNumber.classList.contains("animated")) {
          const target = parseInt(statNumber.textContent.replace(/,/g, ""));
          statNumber.classList.add("animated");
          animateCounter(statNumber, target);
        }
      }
    });
  }, observerOptions);
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", function () {
  createObserver();
  document.body.classList.add("loaded");
});

document.querySelectorAll('a[href="#hero"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.getElementById("hero");
    if (target) {
      const navbar = document.querySelector(".navbar");
      const offset = navbar ? navbar.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".fitur-edukasi .clickable-card").forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", function () {
    const url = card.getAttribute("data-url");
    if (url) {
      window.location.href = url;
    }
  });
});
