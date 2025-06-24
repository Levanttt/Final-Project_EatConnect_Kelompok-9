document
  .getElementById("donaturForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Arahkan ke halaman verifikasi (simulasi)
    window.location.href = "verifikasi.html";
  });
