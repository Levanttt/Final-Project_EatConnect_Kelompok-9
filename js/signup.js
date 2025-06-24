document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const popup = document.getElementById('popup-berhasil');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Kata sandi tidak cocok!");
        return;
      }

      // Tampilkan popup
      popup.classList.add('active');

      // Redirect ke login.html setelah 2 detik
      setTimeout(function() {
        window.location.href = 'login.html';
      }, 2000);
    });
  }
});