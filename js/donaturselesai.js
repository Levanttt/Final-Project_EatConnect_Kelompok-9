// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("backToHome");

  if (backButton) {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();

      const originalText = this.textContent;
      this.textContent = "Mengarahkan...";
      this.disabled = true;
      setTimeout(() => {
        window.location.href = "mainlandingpage.html";
      }, 500);
    });
  }

  const elements = document.querySelectorAll(
    ".success-icon, .title, .description, .btn-primary"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200 + 300);
  });
});

document.documentElement.style.scrollBehavior = "smooth";
