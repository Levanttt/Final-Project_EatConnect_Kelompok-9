document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const popup = document.getElementById("popup-berhasil");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Kata sandi tidak cocok!");
        return;
      }

      popup.classList.add("active");

      setTimeout(function () {
        window.location.href = "login.html";
      }, 2000);
    });
  }
});

function goBack() {
  window.location.href = "login.html";
}
