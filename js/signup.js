document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    alert("Registrasi berhasil!");
    this.reset();
  });
